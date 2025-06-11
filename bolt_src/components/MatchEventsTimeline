<div class="match-events-timeline">
  <div class="timeline-header">
    <h3 class="timeline-title">Timeline Eventi</h3>
    <div class="timeline-controls">
      <button class="filter-btn" data-filter="all" aria-label="Mostra tutti gli eventi">
        Tutti
      </button>
      <button class="filter-btn" data-filter="goals" aria-label="Mostra solo gol">
        ⚽ Gol
      </button>
      <button class="filter-btn" data-filter="cards" aria-label="Mostra solo cartellini">
        🟨 Cartellini
      </button>
      <button class="filter-btn" data-filter="subs" aria-label="Mostra solo sostituzioni">
        🔄 Sostituzioni
      </button>
    </div>
  </div>
  
  <div class="timeline-container">
    <div class="timeline-track">
      <div class="timeline-line"></div>
      <div class="timeline-markers">
        <div class="time-marker" data-time="0">0'</div>
        <div class="time-marker" data-time="15">15'</div>
        <div class="time-marker" data-time="30">30'</div>
        <div class="time-marker" data-time="45">45'</div>
        <div class="time-marker halftime" data-time="45">HT</div>
        <div class="time-marker" data-time="60">60'</div>
        <div class="time-marker" data-time="75">75'</div>
        <div class="time-marker" data-time="90">90'</div>
      </div>
      
      <div class="events-track">
        <!-- Events will be positioned here dynamically -->
      </div>
    </div>
  </div>
  
  <div class="events-list">
    <div class="events-scroll">
      <!-- Event details will be listed here -->
    </div>
  </div>
  
  <div class="timeline-summary">
    <div class="summary-stats">
      <div class="stat-item">
        <span class="stat-value total-events">0</span>
        <span class="stat-label">Eventi Totali</span>
      </div>
      <div class="stat-item">
        <span class="stat-value total-goals">0</span>
        <span class="stat-label">Gol</span>
      </div>
      <div class="stat-item">
        <span class="stat-value total-cards">0</span>
        <span class="stat-label">Cartellini</span>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-timeline">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Timeline Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.match-events-timeline {
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
  gap: 4px;
  background: var(--background);
  padding: 4px;
  border-radius: 8px;
}

.filter-btn {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-btn:hover:not(.active) {
  color: var(--text);
  background: rgba(255,255,255,0.5);
}

.timeline-container {
  margin-bottom: 20px;
  padding: 20px 0;
}

.timeline-track {
  position: relative;
  height: 80px;
}

.timeline-line {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 2px;
}

.timeline-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
}

.time-marker {
  position: relative;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 4px 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  z-index: 2;
}

.time-marker.halftime {
  background: var(--warning);
  color: white;
  border-color: var(--warning);
}

.time-marker::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 12px;
  background: var(--border);
}

.events-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
}

.timeline-event {
  position: absolute;
  top: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 3;
  transform: translateX(-50%);
}

.timeline-event:hover {
  transform: translateX(-50%) scale(1.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.timeline-event.goal {
  background: var(--success);
  color: white;
  border: 2px solid white;
}

.timeline-event.card {
  background: var(--warning);
  color: white;
  border: 2px solid white;
}

.timeline-event.red-card {
  background: var(--error);
  color: white;
  border: 2px solid white;
}

.timeline-event.substitution {
  background: var(--primary);
  color: white;
  border: 2px solid white;
}

.timeline-event.other {
  background: var(--text-muted);
  color: white;
  border: 2px solid white;
}

.timeline-event.hidden {
  display: none;
}

.events-list {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow: hidden;
}

.events-scroll {
  max-height: 268px;
  overflow-y: auto;
  padding-right: 8px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: var(--background);
  border-color: var(--primary);
  transform: translateX(4px);
}

.event-item.hidden {
  display: none;
}

.event-time {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  min-width: 35px;
}

.event-icon {
  font-size: 18px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.event-details {
  flex: 1;
}

.event-description {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.event-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.event-team {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 80px;
}

.team-badge {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.team-badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
}

.timeline-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  display: block;
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
  animation: eventAppear 0.5s ease;
}

@keyframes eventAppear {
  0% { 
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) scale(1.3);
  }
  100% { 
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.event-item.new-event {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  0% { 
    transform: translateX(-100%);
    opacity: 0;
  }
  100% { 
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .timeline-controls {
    justify-content: center;
  }
  
  .timeline-markers {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .time-marker {
    font-size: 10px;
    padding: 2px 4px;
  }
  
  .timeline-event {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .event-team {
    align-self: flex-end;
  }
  
  .summary-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-timeline {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class MatchEventsTimeline {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoUpdate: true,
      showFilters: true,
      maxEvents: 50,
      ...options
    };
    
    this.events = [];
    this.currentFilter = 'all';
    this.matchDuration = 90;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadEvents();
    this.renderTimeline();
    this.updateSummary();
  }
  
  bindEvents() {
    // Filter buttons
    this.element.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter(e.target.dataset.filter);
      });
    });
    
    // Timeline event clicks
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('timeline-event')) {
        this.showEventDetails(e.target.dataset.eventId);
      }
    });
    
    // Event item clicks
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.event-item')) {
        const eventId = e.target.closest('.event-item').dataset.eventId;
        this.showEventDetails(eventId);
      }
    });
  }
  
  async loadEvents() {
    try {
      // In a real app, this would fetch from match data
      this.events = await this.fetchMatchEvents();
      this.renderTimeline();
      this.renderEventsList();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  
  async fetchMatchEvents() {
    // Mock data - in real app this would come from match simulation
    return [
      {
        id: 1,
        type: 'goal',
        time: 23,
        team: 'home',
        player: 'Mario Rossi',
        description: 'Gol di Mario Rossi',
        details: 'Tiro da fuori area dopo assist di Luigi Bianchi'
      },
      {
        id: 2,
        type: 'card',
        time: 38,
        team: 'away',
        player: 'Giuseppe Verdi',
        description: 'Ammonito Giuseppe Verdi',
        details: 'Cartellino giallo per fallo su Mario Rossi'
      },
      {
        id: 3,
        type: 'goal',
        time: 67,
        team: 'away',
        player: 'Antonio Neri',
        description: 'Gol di Antonio Neri',
        details: 'Colpo di testa su cross dalla destra'
      },
      {
        id: 4,
        type: 'substitution',
        time: 75,
        team: 'home',
        player: 'Franco Blu',
        description: 'Sostituzione: Franco Blu entra per Mario Rossi',
        details: 'Cambio tattico per rinforzare il centrocampo'
      }
    ];
  }
  
  renderTimeline() {
    const eventsTrack = this.element.querySelector('.events-track');
    eventsTrack.innerHTML = '';
    
    this.events.forEach(event => {
      if (this.shouldShowEvent(event)) {
        const eventElement = this.createTimelineEvent(event);
        eventsTrack.appendChild(eventElement);
      }
    });
  }
  
  createTimelineEvent(event) {
    const eventElement = document.createElement('div');
    eventElement.className = `timeline-event ${event.type}`;
    eventElement.dataset.eventId = event.id;
    eventElement.style.left = `${(event.time / this.matchDuration) * 100}%`;
    
    eventElement.innerHTML = this.getEventIcon(event.type);
    eventElement.title = `${event.time}' - ${event.description}`;
    
    return eventElement;
  }
  
  getEventIcon(eventType) {
    const icons = {
      goal: '⚽',
      card: '🟨',
      red_card: '🟥',
      substitution: '🔄',
      corner: '📐',
      offside: '🚩',
      foul: '⚠️'
    };
    return icons[eventType] || '📝';
  }
  
  renderEventsList() {
    const eventsScroll = this.element.querySelector('.events-scroll');
    eventsScroll.innerHTML = '';
    
    // Sort events by time (most recent first for display)
    const sortedEvents = [...this.events].sort((a, b) => b.time - a.time);
    
    sortedEvents.forEach(event => {
      if (this.shouldShowEvent(event)) {
        const eventElement = this.createEventItem(event);
        eventsScroll.appendChild(eventElement);
      }
    });
  }
  
  createEventItem(event) {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.dataset.eventId = event.id;
    
    eventItem.innerHTML = `
      <div class="event-time">${event.time}'</div>
      <div class="event-icon">${this.getEventIcon(event.type)}</div>
      <div class="event-details">
        <div class="event-description">${event.description}</div>
        <div class="event-meta">${event.details || ''}</div>
      </div>
      <div class="event-team">
        <div class="team-badge">
          <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40" 
               alt="Team badge" loading="lazy">
        </div>
        <span class="team-name">${event.team === 'home' ? 'Casa' : 'Ospite'}</span>
      </div>
    `;
    
    return eventItem;
  }
  
  shouldShowEvent(event) {
    if (this.currentFilter === 'all') return true;
    
    switch (this.currentFilter) {
      case 'goals':
        return event.type === 'goal';
      case 'cards':
        return event.type === 'card' || event.type === 'red_card';
      case 'subs':
        return event.type === 'substitution';
      default:
        return true;
    }
  }
  
  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update filter buttons
    this.element.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Update timeline and list
    this.renderTimeline();
    this.renderEventsList();
    
    // Dispatch filter change event
    this.element.dispatchEvent(new CustomEvent('filterChange', {
      detail: { filter, events: this.getFilteredEvents() }
    }));
  }
  
  getFilteredEvents() {
    return this.events.filter(event => this.shouldShowEvent(event));
  }
  
  updateSummary() {
    const totalEvents = this.events.length;
    const totalGoals = this.events.filter(e => e.type === 'goal').length;
    const totalCards = this.events.filter(e => e.type === 'card' || e.type === 'red_card').length;
    
    this.element.querySelector('.total-events').textContent = totalEvents;
    this.element.querySelector('.total-goals').textContent = totalGoals;
    this.element.querySelector('.total-cards').textContent = totalCards;
  }
  
  addEvent(event) {
    // Add new event with animation
    event.id = Date.now() + Math.random();
    this.events.push(event);
    
    // Sort events by time
    this.events.sort((a, b) => a.time - b.time);
    
    // Re-render with animation
    this.renderTimeline();
    this.renderEventsList();
    this.updateSummary();
    
    // Animate new event
    const timelineEvent = this.element.querySelector(`[data-event-id="${event.id}"]`);
    if (timelineEvent) {
      timelineEvent.classList.add('new-event');
      setTimeout(() => {
        timelineEvent.classList.remove('new-event');
      }, 500);
    }
    
    // Dispatch new event
    this.element.dispatchEvent(new CustomEvent('newEvent', {
      detail: { event, totalEvents: this.events.length }
    }));
  }
  
  showEventDetails(eventId) {
    const event = this.events.find(e => e.id == eventId);
    if (!event) return;
    
    // Dispatch event details request
    this.element.dispatchEvent(new CustomEvent('showEventDetails', {
      detail: { event }
    }));
  }
  
  highlightEvent(eventId) {
    // Remove existing highlights
    this.element.querySelectorAll('.timeline-event, .event-item').forEach(el => {
      el.classList.remove('highlighted');
    });
    
    // Add highlight to specific event
    const timelineEvent = this.element.querySelector(`.timeline-event[data-event-id="${eventId}"]`);
    const listEvent = this.element.querySelector(`.event-item[data-event-id="${eventId}"]`);
    
    if (timelineEvent) timelineEvent.classList.add('highlighted');
    if (listEvent) {
      listEvent.classList.add('highlighted');
      listEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  setMatchDuration(duration) {
    this.matchDuration = duration;
    this.renderTimeline();
  }
  
  clearEvents() {
    this.events = [];
    this.renderTimeline();
    this.renderEventsList();
    this.updateSummary();
  }
  
  // Public methods
  getEvents() {
    return [...this.events];
  }
  
  getEventsByType(type) {
    return this.events.filter(event => event.type === type);
  }
  
  getEventsByTeam(team) {
    return this.events.filter(event => event.team === team);
  }
  
  getEventsByTimeRange(startTime, endTime) {
    return this.events.filter(event => 
      event.time >= startTime && event.time <= endTime
    );
  }
  
  exportEvents() {
    const exportData = {
      events: this.events,
      summary: {
        totalEvents: this.events.length,
        totalGoals: this.events.filter(e => e.type === 'goal').length,
        totalCards: this.events.filter(e => e.type === 'card' || e.type === 'red_card').length
      },
      timestamp: new Date().toISOString()
    };
    
    return exportData;
  }
}

// Auto-initialize match events timelines
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.match-events-timeline').forEach(timeline => {
    if (!timeline.dataset.initialized) {
      const options = JSON.parse(timeline.dataset.options || '{}');
      new MatchEventsTimeline(timeline, options);
      timeline.dataset.initialized = 'true';
    }
  });
});
</script>