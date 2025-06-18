export const template = `
<div class="event-timeline">
  <div class="timeline-header">
    <h3 class="timeline-title">Cronologia Eventi</h3>
    <div class="timeline-controls">
      <select class="event-filter" aria-label="Filtra eventi">
        <option value="all">Tutti gli Eventi</option>
        <option value="match">Partite</option>
        <option value="training">Allenamenti</option>
        <option value="transfer">Trasferimenti</option>
        <option value="injury">Infortuni</option>
      </select>
      
      <button class="timeline-btn export-btn" aria-label="Esporta timeline">
        📤 Esporta
      </button>
    </div>
  </div>
  
  <div class="timeline-container">
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      
      <div class="timeline-events">
        <!-- Events will be populated dynamically -->
      </div>
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">📅</div>
      <h4>Nessun Evento Trovato</h4>
      <p>Non ci sono eventi nel periodo selezionato</p>
    </div>
    
    <div class="loading-state" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento eventi...</span>
    </div>
  </div>
  
  <div class="timeline-summary">
    <div class="summary-item">
      <span class="summary-value total-events">0</span>
      <span class="summary-label">Eventi Totali</span>
    </div>
    <div class="summary-item">
      <span class="summary-value time-span">0 giorni</span>
      <span class="summary-label">Periodo</span>
    </div>
    <div class="summary-item">
      <span class="summary-value key-events">0</span>
      <span class="summary-label">Eventi Chiave</span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-timeline">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Event Timeline Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.event-timeline {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.timeline-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.event-filter {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.timeline-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.timeline-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.timeline-container {
  margin-bottom: 20px;
  position: relative;
  min-height: 300px;
}

.timeline-wrapper {
  position: relative;
  padding-left: 24px;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px;
  width: 2px;
  background: var(--border);
}

.timeline-events {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-event {
  position: relative;
  padding-bottom: 24px;
}

.timeline-event::before {
  content: '';
  position: absolute;
  top: 0;
  left: -24px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid var(--surface);
  z-index: 1;
}

.timeline-event.match-event::before {
  background: var(--error);
}

.timeline-event.training-event::before {
  background: var(--primary);
}

.timeline-event.transfer-event::before {
  background: var(--secondary);
}

.timeline-event.injury-event::before {
  background: var(--warning);
}

.event-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.event-card {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.event-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.event-type {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
}

.event-type.match {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
}

.event-type.training {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.event-type.transfer {
  background: rgba(16, 185, 129, 0.1);
  color: var(--secondary);
}

.event-type.injury {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.event-content {
  font-size: 14px;
  color: var(--text);
  margin-bottom: 12px;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-muted);
}

.event-location {
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.event-btn {
  padding: 6px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.event-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
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

.timeline-summary {
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
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.summary-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.sponsor-slot-timeline {
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

/* Event animations */
.timeline-event.new-event {
  animation: fadeInLeft 0.5s ease;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .timeline-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .timeline-summary {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .sponsor-slot-timeline {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class EventTimeline {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxEvents: 20,
      ...options
    };
    
    this.events = [];
    this.filteredEvents = [];
    this.currentFilter = 'all';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadEvents();
  }
  
  bindEvents() {
    // Event filter
    this.element.querySelector('.event-filter').addEventListener('change', (e) => {
      this.filterEvents(e.target.value);
    });
    
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportTimeline();
    });
    
    // Event delegation for event actions
    this.element.querySelector('.timeline-events').addEventListener('click', (e) => {
      const viewBtn = e.target.closest('.view-btn');
      if (viewBtn) {
        const eventId = viewBtn.closest('.timeline-event').dataset.eventId;
        this.viewEventDetails(eventId);
      }
      
      const actionBtn = e.target.closest('.action-btn');
      if (actionBtn) {
        const eventId = actionBtn.closest('.timeline-event').dataset.eventId;
        this.performEventAction(eventId, actionBtn.dataset.action);
      }
    });
  }
  
  async loadEvents() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from game state
      this.events = await this.fetchEvents();
      this.filteredEvents = [...this.events];
      this.renderEvents();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading events:', error);
      this.showError('Errore nel caricamento degli eventi');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchEvents() {
    // Mock data - in real app this would come from game state
    const events = [];
    const today = new Date();
    
    // Generate sample events
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i * 3); // One event every 3 days
      
      const eventTypes = ['match', 'training', 'transfer', 'injury'];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      let eventTitle = '';
      let eventContent = '';
      let eventLocation = '';
      let isKeyEvent = Math.random() > 0.7; // 30% chance of being a key event
      
      switch (eventType) {
        case 'match':
          eventTitle = `Partita vs ${['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio'][Math.floor(Math.random() * 5)]}`;
          eventContent = `Risultato: ${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 3)}`;
          eventLocation = 'Stadio San Siro';
          break;
        case 'training':
          eventTitle = `Allenamento ${['Tattico', 'Fisico', 'Tecnico'][Math.floor(Math.random() * 3)]}`;
          eventContent = 'Sessione di allenamento con focus su intensità e precisione';
          eventLocation = 'Centro Sportivo';
          break;
        case 'transfer':
          eventTitle = `Trasferimento ${Math.random() > 0.5 ? 'in entrata' : 'in uscita'}`;
          eventContent = `${['Mario Rossi', 'Luigi Bianchi', 'Giuseppe Verdi'][Math.floor(Math.random() * 3)]} ${Math.random() > 0.5 ? 'acquistato' : 'ceduto'} per €${Math.floor(Math.random() * 50 + 5)}M`;
          eventLocation = 'Sede del Club';
          break;
        case 'injury':
          eventTitle = 'Infortunio Giocatore';
          eventContent = `${['Mario Rossi', 'Luigi Bianchi', 'Giuseppe Verdi'][Math.floor(Math.random() * 3)]} infortunato per ${Math.floor(Math.random() * 6 + 1)} settimane`;
          eventLocation = 'Centro Medico';
          break;
      }
      
      events.push({
        id: i + 1,
        type: eventType,
        title: eventTitle,
        content: eventContent,
        date: date.toISOString(),
        time: `${Math.floor(Math.random() * 12 + 9)}:${Math.random() > 0.5 ? '00' : '30'}`,
        location: eventLocation,
        isKeyEvent
      });
    }
    
    // Sort by date (newest first)
    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  renderEvents() {
    const eventsContainer = this.element.querySelector('.timeline-events');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing events
    eventsContainer.innerHTML = '';
    
    // Show empty state if no events
    if (this.filteredEvents.length === 0) {
      eventsContainer.style.display = 'none';
      this.element.querySelector('.timeline-wrapper').style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show events
    eventsContainer.style.display = 'flex';
    this.element.querySelector('.timeline-wrapper').style.display = 'block';
    emptyState.style.display = 'none';
    
    // Render events
    this.filteredEvents.slice(0, this.options.maxEvents).forEach(event => {
      const eventElement = this.createEventElement(event);
      eventsContainer.appendChild(eventElement);
    });
  }
  
  createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = `timeline-event ${event.type}-event`;
    eventElement.dataset.eventId = event.id;
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const typeText = this.getEventTypeText(event.type);
    
    eventElement.innerHTML = `
      <div class="event-date">${formattedDate}</div>
      <div class="event-card">
        <div class="event-header">
          <h4 class="event-title">${event.title}</h4>
          <span class="event-type ${event.type}">${typeText}</span>
        </div>
        <div class="event-content">${event.content}</div>
        <div class="event-meta">
          <div class="event-location">
            <span>📍</span>
            <span>${event.location}</span>
          </div>
          <div class="event-time">
            <span>🕒</span>
            <span>${event.time}</span>
          </div>
        </div>
        <div class="event-actions">
          <button class="event-btn view-btn" aria-label="Visualizza dettagli">
            👁️ Dettagli
          </button>
          ${this.getEventActionButton(event)}
        </div>
      </div>
    `;
    
    return eventElement;
  }
  
  getEventTypeText(type) {
    const typeTexts = {
      match: 'Partita',
      training: 'Allenamento',
      transfer: 'Trasferimento',
      injury: 'Infortunio'
    };
    return typeTexts[type] || type;
  }
  
  getEventActionButton(event) {
    switch (event.type) {
      case 'match':
        return `<button class="event-btn action-btn" data-action="replay" aria-label="Rivedi partita">
                  🎮 Rivedi
                </button>`;
      case 'training':
        return `<button class="event-btn action-btn" data-action="results" aria-label="Vedi risultati">
                  📊 Risultati
                </button>`;
      case 'transfer':
        return `<button class="event-btn action-btn" data-action="contract" aria-label="Vedi contratto">
                  📝 Contratto
                </button>`;
      case 'injury':
        return `<button class="event-btn action-btn" data-action="medical" aria-label="Report medico">
                  🏥 Report
                </button>`;
      default:
        return '';
    }
  }
  
  filterEvents(filter) {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(event => event.type === filter);
    }
    
    this.renderEvents();
    this.updateSummary();
  }
  
  updateSummary() {
    const totalEvents = this.filteredEvents.length;
    
    // Calculate time span
    let minDate = new Date();
    let maxDate = new Date(0);
    
    this.filteredEvents.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate < minDate) minDate = eventDate;
      if (eventDate > maxDate) maxDate = eventDate;
    });
    
    const diffTime = Math.abs(maxDate - minDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Count key events
    const keyEvents = this.filteredEvents.filter(event => event.isKeyEvent).length;
    
    this.element.querySelector('.total-events').textContent = totalEvents;
    this.element.querySelector('.time-span').textContent = `${diffDays} giorni`;
    this.element.querySelector('.key-events').textContent = keyEvents;
  }
  
  viewEventDetails(eventId) {
    const event = this.events.find(e => e.id == eventId);
    if (!event) return;
    
    // Dispatch view event
    window.dispatchEvent(new CustomEvent('viewEventDetails', {
      detail: { event }
    }));
  }
  
  performEventAction(eventId, action) {
    const event = this.events.find(e => e.id == eventId);
    if (!event) return;
    
    // Dispatch action event
    window.dispatchEvent(new CustomEvent('eventAction', {
      detail: { event, action }
    }));
  }
  
  exportTimeline() {
    const exportData = {
      events: this.filteredEvents,
      filter: this.currentFilter,
      summary: {
        totalEvents: this.filteredEvents.length,
        keyEvents: this.filteredEvents.filter(event => event.isKeyEvent).length
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-timeline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Timeline esportata con successo');
  }
  
  addEvent(event) {
    // Add new event with animation
    event.id = Date.now();
    this.events.unshift(event);
    
    // Apply current filter
    this.filterEvents(this.currentFilter);
    
    // Add animation class to new event
    setTimeout(() => {
      const eventElement = this.element.querySelector(`.timeline-event[data-event-id="${event.id}"]`);
      if (eventElement) {
        eventElement.classList.add('new-event');
        setTimeout(() => {
          eventElement.classList.remove('new-event');
        }, 500);
      }
    }, 10);
    
    // Dispatch event added event
    this.element.dispatchEvent(new CustomEvent('eventAdded', {
      detail: { event }
    }));
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.timeline-wrapper').style.display = show ? 'none' : 'block';
    this.element.querySelector('.empty-state').style.display = 'none';
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  getEvents() {
    return [...this.events];
  }
  
  getFilteredEvents() {
    return [...this.filteredEvents];
  }
  
  getCurrentFilter() {
    return this.currentFilter;
  }
  
  setFilter(filter) {
    this.element.querySelector('.event-filter').value = filter;
    this.filterEvents(filter);
  }
  
  refreshEvents() {
    this.loadEvents();
  }
}

export default EventTimeline;