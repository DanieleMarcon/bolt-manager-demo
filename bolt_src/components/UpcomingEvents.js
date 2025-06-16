/**
 * UpcomingEvents Component
 * Used in: CalendarView.page.js
 * Expected data: { events, daysAhead, maxEvents }
 */

export default class UpcomingEvents {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.events = props.events || [];
    this.daysAhead = props.daysAhead || 30;
    this.maxEvents = props.maxEvents || 10;
    this.currentDate = props.currentDate || new Date();
    this.onEventClick = props.onEventClick || (() => {});
    this.selectedFilter = 'all';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="upcoming-events">
        <div class="events-header">
          <h4>Eventi Imminenti</h4>
          <div class="events-controls">
            <select class="filter-select">
              <option value="all">Tutti gli eventi</option>
              <option value="match">Solo partite</option>
              <option value="training">Solo allenamenti</option>
              <option value="transfer">Solo mercato</option>
              <option value="important">Solo importanti</option>
            </select>
            <select class="period-select">
              <option value="7">Prossimi 7 giorni</option>
              <option value="14">Prossimi 14 giorni</option>
              <option value="30" selected>Prossimi 30 giorni</option>
              <option value="60">Prossimi 60 giorni</option>
            </select>
          </div>
        </div>
        
        <div class="events-summary">
          <div class="summary-stats">
            ${this.renderSummaryStats()}
          </div>
        </div>
        
        <div class="events-list">
          ${this.renderEventsList()}
        </div>
        
        <div class="events-actions">
          <button class="button button-secondary export-calendar-btn">📅 Esporta Calendario</button>
          <button class="button button-primary add-event-btn">➕ Aggiungi Evento</button>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderSummaryStats() {
    const filteredEvents = this.getFilteredEvents();
    const eventsByType = this.groupEventsByType(filteredEvents);
    
    return `
      <div class="stat-item">
        <span class="stat-value">${filteredEvents.length}</span>
        <span class="stat-label">Eventi Totali</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${eventsByType.match?.length || 0}</span>
        <span class="stat-label">Partite</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${eventsByType.training?.length || 0}</span>
        <span class="stat-label">Allenamenti</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${this.getImportantEventsCount(filteredEvents)}</span>
        <span class="stat-label">Importanti</span>
      </div>
    `;
  }

  renderEventsList() {
    const filteredEvents = this.getFilteredEvents();
    
    if (filteredEvents.length === 0) {
      return `
        <div class="no-events">
          <div class="no-events-icon">📅</div>
          <h5>Nessun evento programmato</h5>
          <p>Non ci sono eventi nei prossimi ${this.daysAhead} giorni per i filtri selezionati.</p>
        </div>
      `;
    }
    
    // Group events by date
    const eventsByDate = this.groupEventsByDate(filteredEvents);
    
    return Object.entries(eventsByDate).map(([date, dayEvents]) => `
      <div class="events-day">
        <div class="day-header">
          <h5 class="day-date">${this.formatDateHeader(new Date(date))}</h5>
          <span class="day-count">${dayEvents.length} evento${dayEvents.length > 1 ? 'i' : ''}</span>
        </div>
        
        <div class="day-events">
          ${dayEvents.map(event => this.renderEventItem(event)).join('')}
        </div>
      </div>
    `).join('');
  }

  renderEventItem(event) {
    const isImportant = this.isImportantEvent(event);
    const timeUntil = this.getTimeUntilEvent(event);
    
    return `
      <div class="event-item ${event.type} ${isImportant ? 'important' : ''}" 
           data-event-id="${event.id}">
        <div class="event-icon">
          ${this.getEventIcon(event.type)}
        </div>
        
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-details">
            ${event.time ? `<span class="event-time">🕐 ${event.time}</span>` : ''}
            ${event.location ? `<span class="event-location">📍 ${event.location}</span>` : ''}
            ${timeUntil ? `<span class="event-countdown">⏰ ${timeUntil}</span>` : ''}
          </div>
          ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
        </div>
        
        <div class="event-actions">
          ${isImportant ? '<span class="importance-badge">❗</span>' : ''}
          <button class="event-action-btn" title="Visualizza dettagli">👁️</button>
          <button class="event-action-btn" title="Modifica evento">✏️</button>
        </div>
      </div>
    `;
  }

  getFilteredEvents() {
    const endDate = new Date(this.currentDate);
    endDate.setDate(endDate.getDate() + this.daysAhead);
    
    let filtered = this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= this.currentDate && eventDate <= endDate;
    });
    
    // Apply type filter
    if (this.selectedFilter !== 'all') {
      if (this.selectedFilter === 'important') {
        filtered = filtered.filter(event => this.isImportantEvent(event));
      } else {
        filtered = filtered.filter(event => event.type === this.selectedFilter);
      }
    }
    
    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (dateA.getTime() === dateB.getTime()) {
        // Same date, sort by time
        const timeA = a.time || '00:00';
        const timeB = b.time || '00:00';
        return timeA.localeCompare(timeB);
      }
      
      return dateA - dateB;
    });
    
    return filtered.slice(0, this.maxEvents);
  }

  groupEventsByType(events) {
    return events.reduce((groups, event) => {
      const type = event.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(event);
      return groups;
    }, {});
  }

  groupEventsByDate(events) {
    return events.reduce((groups, event) => {
      const date = new Date(event.date).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  }

  isImportantEvent(event) {
    const importantTypes = ['match', 'transfer'];
    return importantTypes.includes(event.type) || event.importance > 7;
  }

  getImportantEventsCount(events) {
    return events.filter(event => this.isImportantEvent(event)).length;
  }

  getEventIcon(type) {
    const icons = {
      'match': '⚽',
      'training': '🏃',
      'rest': '😴',
      'transfer': '💰',
      'meeting': '👥',
      'medical': '🏥',
      'press': '📰',
      'travel': '✈️'
    };
    
    return icons[type] || '📅';
  }

  getTimeUntilEvent(event) {
    const eventDate = new Date(event.date);
    const now = new Date();
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Oggi';
    } else if (diffDays === 1) {
      return 'Domani';
    } else if (diffDays < 7) {
      return `Tra ${diffDays} giorni`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Tra ${weeks} settimana${weeks > 1 ? 'e' : ''}`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `Tra ${months} mese${months > 1 ? 'i' : ''}`;
    }
  }

  formatDateHeader(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Oggi';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Domani';
    } else {
      return date.toLocaleDateString('it-IT', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
  }

  bindEvents() {
    // Filter controls
    const filterSelect = this.container.querySelector('.filter-select');
    const periodSelect = this.container.querySelector('.period-select');
    
    filterSelect?.addEventListener('change', (e) => {
      this.selectedFilter = e.target.value;
      this.render();
    });
    
    periodSelect?.addEventListener('change', (e) => {
      this.daysAhead = parseInt(e.target.value);
      this.render();
    });

    // Event items
    const eventItems = this.container.querySelectorAll('.event-item');
    eventItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('event-action-btn')) {
          const eventId = parseInt(item.dataset.eventId);
          const event = this.events.find(e => e.id === eventId);
          if (event) {
            this.onEventClick(event);
          }
        }
      });
    });

    // Action buttons in events
    const actionBtns = this.container.querySelectorAll('.event-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventItem = btn.closest('.event-item');
        const eventId = parseInt(eventItem.dataset.eventId);
        const action = btn.title.includes('Visualizza') ? 'view' : 'edit';
        
        this.handleEventAction(eventId, action);
      });
    });

    // Main action buttons
    const exportBtn = this.container.querySelector('.export-calendar-btn');
    const addEventBtn = this.container.querySelector('.add-event-btn');
    
    exportBtn?.addEventListener('click', () => this.exportCalendar());
    addEventBtn?.addEventListener('click', () => this.showAddEventModal());
  }

  handleEventAction(eventId, action) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;
    
    switch (action) {
      case 'view':
        this.onEventClick(event);
        break;
      case 'edit':
        this.showEditEventModal(event);
        break;
    }
  }

  showEditEventModal(event) {
    this.showToast(`Modifica evento: ${event.title}`, 'info');
  }

  showAddEventModal() {
    this.showToast('Apertura form nuovo evento', 'info');
  }

  exportCalendar() {
    const filteredEvents = this.getFilteredEvents();
    const calendarData = {
      events: filteredEvents,
      exportDate: new Date().toISOString(),
      period: this.daysAhead,
      filter: this.selectedFilter
    };
    
    const dataStr = JSON.stringify(calendarData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `calendario-eventi-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    this.showToast('Calendario esportato con successo', 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  setEvents(events) {
    this.events = events;
    this.render();
  }

  setCurrentDate(date) {
    this.currentDate = new Date(date);
    this.render();
  }

  setDaysAhead(days) {
    this.daysAhead = days;
    this.render();
  }

  getEventsCount() {
    return this.getFilteredEvents().length;
  }
}