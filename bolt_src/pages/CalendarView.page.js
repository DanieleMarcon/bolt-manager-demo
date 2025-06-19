import DayAdvancer from '../components/DayAdvancer.js';
import UpcomingEvents from '../components/UpcomingEvents.js';

export default class CalendarViewPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.currentDate = new Date();
    this.selectedDate = null;
    this.events = [];
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="calendar-view-page">
        <div class="page-header">
          <h2 class="page-title">Calendario</h2>
          <div class="page-actions">
            <button class="button button-secondary add-event-btn">📅 Aggiungi Evento</button>
            <button class="button button-primary advance-day-btn">⏩ Avanza Giorno</button>
          </div>
        </div>

        <!-- Calendar Navigation Section -->
        <div class="calendar-navigation-section">
          <div class="navigation-controls">
            <button class="nav-btn prev-month-btn">‹ Mese Precedente</button>
            <h3 class="current-month">${this.formatMonthYear(this.currentDate)}</h3>
            <button class="nav-btn next-month-btn">Mese Successivo ›</button>
          </div>
          <div class="view-controls">
            <button class="view-btn active" data-view="month">📅 Mese</button>
            <button class="view-btn" data-view="week">📆 Settimana</button>
            <button class="view-btn" data-view="day">📋 Giorno</button>
          </div>
          <!-- Componente avanzato di navigazione -->
          <div class="calendar-navigation"></div>
        </div>

        <!-- Calendar Grid Section -->
        <div class="calendar-grid-section">
          <div id="calendarGrid" class="calendar-grid"></div>
        </div>

        <!-- Day Advancer Section -->
        <div class="day-advancer-section">
          <div id="dayAdvancer" class="day-advancer-container"></div>
          <!-- Pulsante avanzato per cambio giorno -->
          <div class="advance-day-button" data-options='{"confirmationRequired":false}'></div>
        </div>

        <!-- Upcoming Events Section -->
        <div class="upcoming-events-section">
          <div id="upcomingEvents" class="upcoming-events-container"></div>
        </div>

        <!-- Event Detail Modal -->
        <div id="eventDetailModal" class="modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Dettagli Evento</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body" id="eventDetailContent">
              <!-- Event details will be rendered here -->
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Chiudi</button>
              <button class="button button-primary modal-edit-btn">Modifica</button>
            </div>
          </div>
        </div>
        <!-- Modal dettagli giorno -->
        <div class="day-detail-modal"></div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  async initComponents() {
    await this.loadEvents();
    this.renderCalendarGrid();
    this.renderDayAdvancer();
    this.renderUpcomingEvents();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  async loadEvents() {
    const { matchesDataset } = await import('../datasets/matches.js');
    const { teamsDataset } = await import('../datasets/teams.js');

    const all = await matchesDataset.all();
    const upcoming = all.filter(m => new Date(m.match_date) >= new Date());

    this.events = await Promise.all(upcoming.map(async m => {
      const home = await teamsDataset.get(m.home_team_id);
      const away = await teamsDataset.get(m.away_team_id);
      return {
        id: m.id,
        type: 'match',
        date: m.match_date,
        title: `${home?.short_name || ''} vs ${away?.short_name || ''}`,
        description: `Giornata ${m.matchday}`,
        importance: m.is_user_match ? 8 : 5
      };
    }));
  }

  generateMockEvents() {
    const events = [];
    const today = new Date();
    
    // Generate events for the next 60 days
    for (let i = 0; i < 60; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);
      
      // Random chance of having events
      if (Math.random() < 0.4) { // 40% chance per day
        const eventTypes = ['match', 'training', 'rest', 'transfer', 'meeting'];
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        let title = '';
        let time = '';
        let location = '';
        let description = '';
        
        switch (type) {
          case 'match':
            const opponents = ['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio', 'Fiorentina'];
            const opponent = opponents[Math.floor(Math.random() * opponents.length)];
            title = `Partita vs ${opponent}`;
            time = '15:00';
            location = Math.random() < 0.5 ? 'Stadio San Siro' : `Stadio ${opponent}`;
            description = `Partita di campionato contro ${opponent}`;
            break;
          case 'training':
            const trainingTypes = ['Tattico', 'Fisico', 'Tecnico', 'Portieri'];
            const trainingType = trainingTypes[Math.floor(Math.random() * trainingTypes.length)];
            title = `Allenamento ${trainingType}`;
            time = '10:00';
            location = 'Centro Sportivo';
            description = `Sessione di allenamento ${trainingType.toLowerCase()}`;
            break;
          case 'rest':
            title = 'Giorno di Riposo';
            description = 'Giornata di recupero per la squadra';
            break;
          case 'transfer':
            title = 'Scadenza Mercato';
            time = '18:00';
            description = 'Scadenza per le trattative di mercato';
            break;
          case 'meeting':
            title = 'Riunione Staff';
            time = '14:00';
            location = 'Sala Riunioni';
            description = 'Riunione settimanale dello staff tecnico';
            break;
        }
        
        events.push({
          id: events.length + 1,
          title,
          date: eventDate.toISOString(),
          time,
          location,
          type,
          description,
          importance: Math.floor(Math.random() * 10) + 1
        });
      }
    }
    
    return events;
  }

  renderCalendarGrid() {
    const container = document.getElementById('calendarGrid');
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let calendarHTML = `
      <div class="calendar-header">
        <div class="day-header">Dom</div>
        <div class="day-header">Lun</div>
        <div class="day-header">Mar</div>
        <div class="day-header">Mer</div>
        <div class="day-header">Gio</div>
        <div class="day-header">Ven</div>
        <div class="day-header">Sab</div>
      </div>
      <div class="calendar-body">
    `;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isToday = this.isToday(dayDate);
      const isSelected = this.selectedDate && this.isSameDay(dayDate, this.selectedDate);
      const dayEvents = this.getEventsForDate(dayDate);
      
      calendarHTML += `
        <div class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" 
             data-date="${dayDate.toISOString()}">
          <div class="day-number">${day}</div>
          <div class="day-events">
            ${dayEvents.slice(0, 3).map(event => `
              <div class="event-indicator ${event.type}" title="${event.title}">
                ${this.getEventIcon(event.type)}
              </div>
            `).join('')}
            ${dayEvents.length > 3 ? `<div class="more-events">+${dayEvents.length - 3}</div>` : ''}
          </div>
        </div>
      `;
    }
    
    calendarHTML += '</div>';
    container.innerHTML = calendarHTML;
  }

  renderDayAdvancer() {
    const container = document.getElementById('dayAdvancer');
    
    new DayAdvancer(container, {
      currentDate: this.currentDate,
      onAdvance: (days, newDate) => this.handleDayAdvance(days, newDate),
      onAdvanceToDate: (targetDate) => this.handleAdvanceToDate(targetDate)
    });
  }

  renderUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    
    new UpcomingEvents(container, {
      events: this.events,
      currentDate: this.currentDate,
      daysAhead: 30,
      maxEvents: 10,
      onEventClick: (event) => this.showEventDetail(event)
    });
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Organizza il tuo calendario sportivo</span>
      </div>
    `;
  }

  bindEvents() {
    // Navigation controls
    const prevMonthBtn = this.container.querySelector('.prev-month-btn');
    const nextMonthBtn = this.container.querySelector('.next-month-btn');
    
    prevMonthBtn?.addEventListener('click', () => this.navigateMonth(-1));
    nextMonthBtn?.addEventListener('click', () => this.navigateMonth(1));

    // View controls
    const viewBtns = this.container.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.changeView(btn.dataset.view);
      });
    });

    // Calendar day clicks
    const calendarDays = this.container.querySelectorAll('.calendar-day:not(.empty)');
    calendarDays.forEach(day => {
      day.addEventListener('click', (e) => {
        const date = new Date(day.dataset.date);
        this.selectDate(date);
      });
    });

    // Action buttons
    const addEventBtn = this.container.querySelector('.add-event-btn');
    const advanceDayBtn = this.container.querySelector('.advance-day-btn');
    
    addEventBtn?.addEventListener('click', () => this.showAddEventModal());
    advanceDayBtn?.addEventListener('click', () => this.showAdvanceDayModal());

    // Modal events
    const modal = this.container.querySelector('#eventDetailModal');
    const closeBtn = modal?.querySelector('.modal-close-btn');
    const cancelBtn = modal?.querySelector('.modal-cancel-btn');
    const editBtn = modal?.querySelector('.modal-edit-btn');
    
    closeBtn?.addEventListener('click', () => this.hideEventDetail());
    cancelBtn?.addEventListener('click', () => this.hideEventDetail());
    editBtn?.addEventListener('click', () => this.editSelectedEvent());

    // Close modal on outside click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideEventDetail();
      }
    });
  }

  navigateMonth(direction) {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    this.currentDate = newDate;
    
    // Update month display
    const monthDisplay = this.container.querySelector('.current-month');
    if (monthDisplay) {
      monthDisplay.textContent = this.formatMonthYear(this.currentDate);
    }
    
    // Re-render calendar
    this.renderCalendarGrid();
  }

  changeView(view) {
    // In a real app, this would change the calendar display
    this.showToast(`Vista cambiata a: ${view}`, 'info');
  }

  selectDate(date) {
    this.selectedDate = date;
    
    // Update calendar display
    const calendarDays = this.container.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
      day.classList.remove('selected');
      if (day.dataset.date && this.isSameDay(new Date(day.dataset.date), date)) {
        day.classList.add('selected');
      }
    });
    
    // Show events for selected date
    const dayEvents = this.getEventsForDate(date);
    if (dayEvents.length > 0) {
      this.showDayEvents(date, dayEvents);
    }
  }

  showDayEvents(date, events) {
    const eventsList = events.map(event => `
      <div class="day-event-item" data-event-id="${event.id}">
        <span class="event-time">${event.time || 'Tutto il giorno'}</span>
        <span class="event-title">${event.title}</span>
        <span class="event-type">${this.getEventIcon(event.type)}</span>
      </div>
    `).join('');
    
    const message = `
      Eventi per ${this.formatDate(date)}:
      
      ${events.map(e => `• ${e.time || ''} ${e.title}`).join('\n')}
    `;
    
    if (confirm(`${message}\n\nVuoi visualizzare i dettagli?`)) {
      this.showEventDetail(events[0]);
    }
  }

  showEventDetail(event) {
    const modal = this.container.querySelector('#eventDetailModal');
    const content = modal.querySelector('#eventDetailContent');
    
    content.innerHTML = `
      <div class="event-detail">
        <div class="event-header">
          <div class="event-icon-large">${this.getEventIcon(event.type)}</div>
          <div class="event-info">
            <h5 class="event-title">${event.title}</h5>
            <span class="event-type-label">${this.getEventTypeLabel(event.type)}</span>
          </div>
        </div>
        
        <div class="event-details">
          <div class="detail-item">
            <span class="detail-label">Data:</span>
            <span class="detail-value">${this.formatDate(new Date(event.date))}</span>
          </div>
          ${event.time ? `
            <div class="detail-item">
              <span class="detail-label">Ora:</span>
              <span class="detail-value">${event.time}</span>
            </div>
          ` : ''}
          ${event.location ? `
            <div class="detail-item">
              <span class="detail-label">Luogo:</span>
              <span class="detail-value">${event.location}</span>
            </div>
          ` : ''}
          ${event.description ? `
            <div class="detail-item">
              <span class="detail-label">Descrizione:</span>
              <span class="detail-value">${event.description}</span>
            </div>
          ` : ''}
          <div class="detail-item">
            <span class="detail-label">Importanza:</span>
            <div class="importance-stars">
              ${this.renderImportanceStars(event.importance || 5)}
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.selectedEvent = event;
    modal.style.display = 'block';
  }

  hideEventDetail() {
    const modal = this.container.querySelector('#eventDetailModal');
    modal.style.display = 'none';
    this.selectedEvent = null;
  }

  editSelectedEvent() {
    if (this.selectedEvent) {
      this.showToast(`Modifica evento: ${this.selectedEvent.title}`, 'info');
      this.hideEventDetail();
    }
  }

  showAddEventModal() {
    const date = prompt('Data evento (YYYY-MM-DD):');
    if (!date) return;
    
    const title = prompt('Titolo evento:');
    if (!title) return;
    
    const type = prompt('Tipo evento (match, training, rest, transfer, meeting):') || 'meeting';
    
    const newEvent = {
      id: this.events.length + 1,
      title,
      date: new Date(date).toISOString(),
      time: '10:00',
      type,
      description: `Evento creato dall'utente: ${title}`,
      importance: 5
    };
    
    this.events.push(newEvent);
    this.renderCalendarGrid();
    this.renderUpcomingEvents();
    
    this.showToast('Evento aggiunto con successo', 'success');
  }

  showAdvanceDayModal() {
    // The DayAdvancer component handles this
    const advancerSection = this.container.querySelector('.day-advancer-section');
    advancerSection.scrollIntoView({ behavior: 'smooth' });
  }

  handleDayAdvance(days, newDate) {
    this.currentDate = new Date(newDate);
    
    // Update calendar display
    const monthDisplay = this.container.querySelector('.current-month');
    if (monthDisplay) {
      monthDisplay.textContent = this.formatMonthYear(this.currentDate);
    }
    
    // Re-render components
    this.renderCalendarGrid();
    this.renderUpcomingEvents();
    
    this.showToast(`Avanzamento completato: ${days} giorni`, 'success');
  }

  handleAdvanceToDate(targetDate) {
    this.currentDate = new Date(targetDate);
    
    // Update display
    const monthDisplay = this.container.querySelector('.current-month');
    if (monthDisplay) {
      monthDisplay.textContent = this.formatMonthYear(this.currentDate);
    }
    
    // Re-render components
    this.renderCalendarGrid();
    this.renderUpcomingEvents();
    
    this.showToast(`Avanzamento a data specifica completato`, 'success');
  }

  getEventsForDate(date) {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return this.isSameDay(eventDate, date);
    });
  }

  getEventIcon(type) {
    const icons = {
      'match': '⚽',
      'training': '🏃',
      'rest': '😴',
      'transfer': '💰',
      'meeting': '👥',
      'medical': '🏥',
      'press': '📰'
    };
    return icons[type] || '📅';
  }

  getEventTypeLabel(type) {
    const labels = {
      'match': 'Partita',
      'training': 'Allenamento',
      'rest': 'Riposo',
      'transfer': 'Mercato',
      'meeting': 'Riunione',
      'medical': 'Medico',
      'press': 'Stampa'
    };
    return labels[type] || 'Evento';
  }

  renderImportanceStars(importance) {
    const stars = [];
    const fullStars = Math.floor(importance);
    const hasHalfStar = importance % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('<span class="star filled">⭐</span>');
    }
    
    if (hasHalfStar) {
      stars.push('<span class="star half">⭐</span>');
    }
    
    const emptyStars = 10 - Math.ceil(importance);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('<span class="star empty">☆</span>');
    }
    
    return stars.join('');
  }

  isToday(date) {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  formatDate(date) {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatMonthYear(date) {
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long'
    });
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}