export const template = `
<div class="upcoming-events-list">
  <div class="events-header">
    <h3 class="events-title">Prossimi Eventi</h3>
    <div class="events-filter">
      <select class="filter-select" aria-label="Filtra eventi">
        <option value="all">Tutti gli eventi</option>
        <option value="match">Partite</option>
        <option value="training">Allenamenti</option>
        <option value="transfer">Trasferimenti</option>
        <option value="other">Altri eventi</option>
      </select>
    </div>
  </div>
  
  <div class="events-container">
    <div class="events-list">
      <!-- Events will be populated dynamically -->
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">📅</div>
      <h4>Nessun evento in programma</h4>
      <p>Non ci sono eventi imminenti nel periodo selezionato</p>
    </div>
    
    <div class="loading-state" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento eventi...</span>
    </div>
  </div>
  
  <div class="events-summary">
    <div class="summary-item">
      <span class="summary-value total-events">0</span>
      <span class="summary-label">Eventi Totali</span>
    </div>
    <div class="summary-item">
      <span class="summary-value upcoming-matches">0</span>
      <span class="summary-label">Partite</span>
    </div>
    <div class="summary-item">
      <span class="summary-value upcoming-trainings">0</span>
      <span class="summary-label">Allenamenti</span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-events">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Events Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.upcoming-events-list {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.events-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.filter-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.events-container {
  min-height: 300px;
  margin-bottom: 20px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.event-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
}

.event-day {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.event-month {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.event-details {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-time-icon {
  font-size: 12px;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-location-icon {
  font-size: 12px;
}

.event-type-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
}

.event-type-icon.match {
  background: var(--error);
}

.event-type-icon.training {
  background: var(--primary);
}

.event-type-icon.transfer {
  background: var(--secondary);
}

.event-type-icon.rest {
  background: var(--success);
}

.event-type-icon.other {
  background: var(--text-muted);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.events-summary {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.summary-item {
  text-align: center;
}

.summary-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.summary-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.sponsor-slot-events {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .events-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .event-date {
    flex-direction: row;
    gap: 4px;
    min-width: auto;
  }
  
  .event-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .events-summary {
    flex-direction: column;
    gap: 12px;
  }
  
  .sponsor-slot-events {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class UpcomingEventsList {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      daysAhead: 30,
      maxEvents: 10,
      onEventClick: null,
      ...options
    };
    
    this.events = [];
    this.currentFilter = 'all';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadEvents();
  }
  
  bindEvents() {
    // Filter select
    this.element.querySelector('.filter-select').addEventListener('change', (e) => {
      this.filterEvents(e.target.value);
    });
    
    // Event click delegation
    this.element.querySelector('.events-list').addEventListener('click', (e) => {
      const eventItem = e.target.closest('.event-item');
      if (eventItem) {
        this.handleEventClick(eventItem);
      }
    });
  }
  
  async loadEvents() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from game state
      this.events = await this.fetchUpcomingEvents();
      this.renderEvents();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading events:', error);
      this.showError('Errore nel caricamento degli eventi');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchUpcomingEvents() {
    // Mock data - in real app this would come from game state
    const today = new Date();
    const events = [];
    
    // Generate some sample events
    for (let i = 0; i < 15; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);
      
      const eventTypes = ['match', 'training', 'training', 'rest', 'transfer'];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      let eventTitle = '';
      let eventLocation = '';
      
      switch (eventType) {
        case 'match':
          eventTitle = `Partita vs ${['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio'][Math.floor(Math.random() * 5)]}`;
          eventLocation = 'Stadio San Siro';
          break;
        case 'training':
          eventTitle = `Allenamento ${['Tattico', 'Fisico', 'Tecnico'][Math.floor(Math.random() * 3)]}`;
          eventLocation = 'Centro Sportivo';
          break;
        case 'rest':
          eventTitle = 'Giorno di Riposo';
          eventLocation = '';
          break;
        case 'transfer':
          eventTitle = 'Scadenza Mercato';
          eventLocation = '';
          break;
        default:
          eventTitle = 'Evento Generico';
          eventLocation = '';
      }
      
      events.push({
        id: i + 1,
        title: eventTitle,
        date: eventDate.toISOString(),
        time: eventType === 'match' ? '15:00' : eventType === 'training' ? '10:00' : '',
        location: eventLocation,
        type: eventType
      });
    }
    
    return events;
  }
  
  renderEvents() {
    const eventsList = this.element.querySelector('.events-list');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Filter events based on current filter
    const filteredEvents = this.filterEventsByType(this.currentFilter);
    
    // Clear existing events
    eventsList.innerHTML = '';
    
    // Show empty state if no events
    if (filteredEvents.length === 0) {
      eventsList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show events
    eventsList.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Render events
    filteredEvents.slice(0, this.options.maxEvents).forEach(event => {
      const eventElement = this.createEventElement(event);
      eventsList.appendChild(eventElement);
    });
  }
  
  createEventElement(event) {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const monthNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    const month = monthNames[eventDate.getMonth()];
    
    const element = document.createElement('div');
    element.className = 'event-item';
    element.dataset.eventId = event.id;
    element.dataset.eventType = event.type;
    
    let eventIcon = '';
    switch (event.type) {
      case 'match':
        eventIcon = '⚽';
        break;
      case 'training':
        eventIcon = '🏃';
        break;
      case 'transfer':
        eventIcon = '💰';
        break;
      case 'rest':
        eventIcon = '🛌';
        break;
      default:
        eventIcon = '📅';
    }
    
    element.innerHTML = `
      <div class="event-date">
        <span class="event-day">${day}</span>
        <span class="event-month">${month}</span>
      </div>
      
      <div class="event-content">
        <div class="event-title">${event.title}</div>
        <div class="event-details">
          ${event.time ? `
            <div class="event-time">
              <span class="event-time-icon">🕒</span>
              <span>${event.time}</span>
            </div>
          ` : ''}
          
          ${event.location ? `
            <div class="event-location">
              <span class="event-location-icon">📍</span>
              <span>${event.location}</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="event-type-icon ${event.type}">
        ${eventIcon}
      </div>
    `;
    
    return element;
  }
  
  filterEvents(filter) {
    this.currentFilter = filter;
    this.renderEvents();
  }
  
  filterEventsByType(filter) {
    if (filter === 'all') return this.events;
    
    return this.events.filter(event => {
      if (filter === 'other') {
        return !['match', 'training', 'transfer'].includes(event.type);
      }
      return event.type === filter;
    });
  }
  
  updateSummary() {
    const totalEvents = this.events.length;
    const matches = this.events.filter(event => event.type === 'match').length;
    const trainings = this.events.filter(event => event.type === 'training').length;
    
    this.element.querySelector('.total-events').textContent = totalEvents;
    this.element.querySelector('.upcoming-matches').textContent = matches;
    this.element.querySelector('.upcoming-trainings').textContent = trainings;
  }
  
  handleEventClick(eventItem) {
    const eventId = parseInt(eventItem.dataset.eventId);
    const event = this.events.find(e => e.id === eventId);
    
    if (!event) return;
    
    // Call event click callback if provided
    if (typeof this.options.onEventClick === 'function') {
      this.options.onEventClick(event);
    }
    
    // Dispatch event click event
    this.element.dispatchEvent(new CustomEvent('eventClick', {
      detail: { 
        event,
        element: eventItem
      }
    }));
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.events-list').style.display = show ? 'none' : 'flex';
    this.element.querySelector('.empty-state').style.display = 'none';
  }
  
  showError(message) {
    // Create and show error toast
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  getEvents() {
    return [...this.events];
  }
  
  setEvents(events) {
    this.events = events;
    this.renderEvents();
    this.updateSummary();
  }
  
  addEvent(event) {
    this.events.push(event);
    this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
    this.renderEvents();
    this.updateSummary();
  }
  
  removeEvent(eventId) {
    this.events = this.events.filter(event => event.id !== eventId);
    this.renderEvents();
    this.updateSummary();
  }
  
  refreshEvents() {
    this.loadEvents();
  }
  
  getCurrentFilter() {
    return this.currentFilter;
  }
  
  highlightEvent(eventId) {
    const eventItem = this.element.querySelector(`.event-item[data-event-id="${eventId}"]`);
    
    if (eventItem) {
      // Scroll into view if needed
      eventItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add highlight effect
      eventItem.style.transform = 'translateY(-4px)';
      eventItem.style.boxShadow = '0 8px 16px rgba(37, 99, 235, 0.2)';
      eventItem.style.borderColor = 'var(--primary)';
      
      // Remove highlight after animation
      setTimeout(() => {
        eventItem.style.transform = '';
        eventItem.style.boxShadow = '';
        eventItem.style.borderColor = '';
      }, 1500);
    }
  }
}

export default UpcomingEventsList;