/**
 * HistoryTimeline Component
 * Used in: PlayerHistory.page.js
 * Purpose: Visual timeline of player career events
 */

export default class HistoryTimeline {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      events: props.events || [],
      maxEvents: props.maxEvents || 50,
      showFilters: props.showFilters !== false,
      onEventClick: props.onEventClick || (() => {}),
      ...props
    };
    
    this.filteredEvents = [];
    this.selectedEventTypes = new Set(['all']);
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="history-timeline">
        <div class="timeline-header">
          <h4 class="timeline-title">Timeline Carriera</h4>
          ${this.props.showFilters ? `
            <div class="timeline-filters">
              <div class="filter-buttons">
                <button class="filter-btn active" data-type="all">Tutti</button>
                <button class="filter-btn" data-type="match">⚽ Partite</button>
                <button class="filter-btn" data-type="training">🏃 Allenamenti</button>
                <button class="filter-btn" data-type="transfer">💰 Trasferimenti</button>
                <button class="filter-btn" data-type="injury">🏥 Infortuni</button>
                <button class="filter-btn" data-type="achievement">🏆 Traguardi</button>
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="timeline-content">
          <div class="timeline-track" id="timelineTrack">
            ${this.renderTimelineEvents()}
          </div>
          
          ${this.filteredEvents.length === 0 ? `
            <div class="timeline-empty">
              <div class="empty-icon">📅</div>
              <h5>Nessun Evento</h5>
              <p>Non ci sono eventi da visualizzare per questo periodo</p>
            </div>
          ` : ''}
        </div>
        
        <div class="timeline-footer">
          <div class="timeline-stats">
            <span class="stat-item">
              <span class="stat-value">${this.filteredEvents.length}</span>
              <span class="stat-label">Eventi</span>
            </span>
            <span class="stat-item">
              <span class="stat-value">${this.getDateRange()}</span>
              <span class="stat-label">Periodo</span>
            </span>
          </div>
          
          <div class="timeline-actions">
            <button class="button button-ghost export-timeline-btn">📤 Esporta</button>
            <button class="button button-ghost zoom-fit-btn">🔍 Adatta</button>
          </div>
        </div>
      </div>
    `;
  }

  renderTimelineEvents() {
    if (this.filteredEvents.length === 0) {
      return '';
    }
    
    // Sort events by date
    const sortedEvents = [...this.filteredEvents].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    return sortedEvents.map((event, index) => `
      <div class="timeline-event ${event.type}" data-event-id="${event.id}">
        <div class="event-marker">
          <div class="event-icon">${this.getEventIcon(event.type)}</div>
        </div>
        
        <div class="event-content">
          <div class="event-header">
            <h6 class="event-title">${event.title}</h6>
            <span class="event-date">${this.formatDate(event.date)}</span>
          </div>
          
          <div class="event-body">
            <p class="event-description">${event.description}</p>
            
            ${event.stats ? `
              <div class="event-stats">
                ${Object.entries(event.stats).map(([key, value]) => `
                  <span class="stat-badge">
                    <span class="stat-name">${this.getStatLabel(key)}</span>
                    <span class="stat-value">${value}</span>
                  </span>
                `).join('')}
              </div>
            ` : ''}
            
            ${event.impact ? `
              <div class="event-impact ${event.impact.type}">
                <span class="impact-icon">${this.getImpactIcon(event.impact.type)}</span>
                <span class="impact-text">${event.impact.description}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="event-footer">
            <span class="event-importance">
              ${this.renderImportanceStars(event.importance || 5)}
            </span>
            <button class="event-action-btn" data-action="details">Dettagli</button>
          </div>
        </div>
        
        ${index < sortedEvents.length - 1 ? '<div class="timeline-connector"></div>' : ''}
      </div>
    `).join('');
  }

  bindEvents() {
    // Filter buttons
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventType = btn.dataset.type;
        this.toggleFilter(eventType);
        this.updateFilterButtons();
        this.updateTimeline();
      });
    });

    // Event clicks
    const eventElements = this.container.querySelectorAll('.timeline-event');
    eventElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const eventId = parseInt(element.dataset.eventId);
        const event = this.props.events.find(ev => ev.id === eventId);
        if (event) {
          this.props.onEventClick(event);
        }
      });
    });

    // Action buttons
    const exportBtn = this.container.querySelector('.export-timeline-btn');
    const zoomFitBtn = this.container.querySelector('.zoom-fit-btn');
    
    exportBtn?.addEventListener('click', () => this.exportTimeline());
    zoomFitBtn?.addEventListener('click', () => this.zoomToFit());

    // Event action buttons
    const actionBtns = this.container.querySelectorAll('.event-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const eventElement = btn.closest('.timeline-event');
        const eventId = parseInt(eventElement.dataset.eventId);
        const event = this.props.events.find(ev => ev.id === eventId);
        
        if (event) {
          this.handleEventAction(action, event);
        }
      });
    });
  }

  toggleFilter(eventType) {
    if (eventType === 'all') {
      this.selectedEventTypes.clear();
      this.selectedEventTypes.add('all');
    } else {
      this.selectedEventTypes.delete('all');
      
      if (this.selectedEventTypes.has(eventType)) {
        this.selectedEventTypes.delete(eventType);
      } else {
        this.selectedEventTypes.add(eventType);
      }
      
      if (this.selectedEventTypes.size === 0) {
        this.selectedEventTypes.add('all');
      }
    }
  }

  updateFilterButtons() {
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      const eventType = btn.dataset.type;
      const isActive = this.selectedEventTypes.has(eventType) || 
                      (this.selectedEventTypes.has('all') && eventType === 'all');
      btn.classList.toggle('active', isActive);
    });
  }

  updateTimeline() {
    this.filterEvents();
    
    const timelineTrack = this.container.querySelector('#timelineTrack');
    timelineTrack.innerHTML = this.renderTimelineEvents();
    
    // Re-bind events for new elements
    this.bindEventElements();
    
    // Update stats
    this.updateTimelineStats();
  }

  bindEventElements() {
    const eventElements = this.container.querySelectorAll('.timeline-event');
    eventElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const eventId = parseInt(element.dataset.eventId);
        const event = this.props.events.find(ev => ev.id === eventId);
        if (event) {
          this.props.onEventClick(event);
        }
      });
    });

    const actionBtns = this.container.querySelectorAll('.event-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const eventElement = btn.closest('.timeline-event');
        const eventId = parseInt(eventElement.dataset.eventId);
        const event = this.props.events.find(ev => ev.id === eventId);
        
        if (event) {
          this.handleEventAction(action, event);
        }
      });
    });
  }

  filterEvents() {
    if (this.selectedEventTypes.has('all')) {
      this.filteredEvents = [...this.props.events];
    } else {
      this.filteredEvents = this.props.events.filter(event => 
        this.selectedEventTypes.has(event.type)
      );
    }
    
    // Limit to max events
    if (this.filteredEvents.length > this.props.maxEvents) {
      this.filteredEvents = this.filteredEvents.slice(-this.props.maxEvents);
    }
  }

  updateTimelineStats() {
    const statsElements = this.container.querySelectorAll('.stat-value');
    if (statsElements.length >= 2) {
      statsElements[0].textContent = this.filteredEvents.length;
      statsElements[1].textContent = this.getDateRange();
    }
  }

  handleEventAction(action, event) {
    switch (action) {
      case 'details':
        this.showEventDetails(event);
        break;
      default:
        console.log(`Action ${action} for event:`, event);
    }
  }

  showEventDetails(event) {
    // Create a simple modal or trigger callback
    const details = `
      Evento: ${event.title}
      Data: ${this.formatDate(event.date)}
      Tipo: ${this.getEventTypeLabel(event.type)}
      Descrizione: ${event.description}
      ${event.stats ? `Statistiche: ${JSON.stringify(event.stats, null, 2)}` : ''}
    `;
    
    alert(details); // In a real app, this would be a proper modal
  }

  exportTimeline() {
    const exportData = {
      events: this.filteredEvents,
      filters: Array.from(this.selectedEventTypes),
      exportDate: new Date().toISOString(),
      playerName: this.props.playerName || 'Unknown Player'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `timeline-${this.props.playerName || 'player'}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  zoomToFit() {
    const timelineTrack = this.container.querySelector('#timelineTrack');
    timelineTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  getEventIcon(type) {
    const icons = {
      'match': '⚽',
      'training': '🏃',
      'transfer': '💰',
      'injury': '🏥',
      'achievement': '🏆',
      'contract': '📄',
      'promotion': '⬆️',
      'demotion': '⬇️'
    };
    return icons[type] || '📅';
  }

  getEventTypeLabel(type) {
    const labels = {
      'match': 'Partita',
      'training': 'Allenamento',
      'transfer': 'Trasferimento',
      'injury': 'Infortunio',
      'achievement': 'Traguardo',
      'contract': 'Contratto',
      'promotion': 'Promozione',
      'demotion': 'Retrocessione'
    };
    return labels[type] || type;
  }

  getImpactIcon(type) {
    const icons = {
      'positive': '📈',
      'negative': '📉',
      'neutral': '➡️'
    };
    return icons[type] || '➡️';
  }

  getStatLabel(key) {
    const labels = {
      'goals': 'Gol',
      'assists': 'Assist',
      'rating': 'Voto',
      'minutes': 'Minuti',
      'cards': 'Cartellini'
    };
    return labels[key] || key;
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

  getDateRange() {
    if (this.filteredEvents.length === 0) return 'N/A';
    
    const dates = this.filteredEvents.map(e => new Date(e.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    if (minDate.getTime() === maxDate.getTime()) {
      return this.formatDate(minDate.toISOString());
    }
    
    return `${this.formatDate(minDate.toISOString())} - ${this.formatDate(maxDate.toISOString())}`;
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  }

  // Public methods
  setEvents(events) {
    this.props.events = events || [];
    this.filterEvents();
    this.updateTimeline();
  }

  getEvents() {
    return this.props.events;
  }

  clearFilters() {
    this.selectedEventTypes.clear();
    this.selectedEventTypes.add('all');
    this.updateFilterButtons();
    this.updateTimeline();
  }
}