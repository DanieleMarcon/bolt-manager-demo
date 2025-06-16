<div class="calendar-grid">
  <div class="weekdays-header">
    <div class="weekday">Lun</div>
    <div class="weekday">Mar</div>
    <div class="weekday">Mer</div>
    <div class="weekday">Gio</div>
    <div class="weekday">Ven</div>
    <div class="weekday">Sab</div>
    <div class="weekday">Dom</div>
  </div>
  
  <div class="days-grid">
    <!-- Calendar days will be generated dynamically -->
  </div>
  
  <div class="calendar-legend">
    <div class="legend-item">
      <div class="legend-color match-color"></div>
      <span>Partita</span>
    </div>
    <div class="legend-item">
      <div class="legend-color training-color"></div>
      <span>Allenamento</span>
    </div>
    <div class="legend-item">
      <div class="legend-color event-color"></div>
      <span>Evento</span>
    </div>
    <div class="legend-item">
      <div class="legend-color rest-color"></div>
      <span>Riposo</span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-calendar">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Calendar Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.calendar-grid {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.weekdays-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--text);
  padding: 8px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
  min-height: 500px;
}

.calendar-day {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  min-height: 80px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.calendar-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.calendar-day.other-month {
  opacity: 0.5;
}

.calendar-day.today {
  border: 2px solid var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.calendar-day.selected {
  background: rgba(37, 99, 235, 0.1);
  border-color: var(--primary);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.day-number {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.day-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}

.day-indicator.match-day {
  background: var(--error);
}

.day-indicator.training-day {
  background: var(--primary);
}

.day-indicator.event-day {
  background: var(--warning);
}

.day-indicator.rest-day {
  background: var(--success);
}

.day-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
}

.day-event {
  padding: 4px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

.day-event.match-event {
  background: rgba(239, 68, 68, 0.2);
  color: var(--error);
}

.day-event.training-event {
  background: rgba(37, 99, 235, 0.2);
  color: var(--primary);
}

.day-event.general-event {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning);
}

.day-event.rest-event {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success);
}

.more-events {
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.match-color {
  background: var(--error);
}

.training-color {
  background: var(--primary);
}

.event-color {
  background: var(--warning);
}

.rest-color {
  background: var(--success);
}

.sponsor-slot-calendar {
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
  .days-grid {
    min-height: 400px;
  }
  
  .calendar-day {
    min-height: 60px;
    padding: 4px;
  }
  
  .day-number {
    font-size: 12px;
  }
  
  .day-event {
    padding: 2px 4px;
    font-size: 9px;
  }
  
  .calendar-legend {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .sponsor-slot-calendar {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class CalendarGrid {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onDayClick: null,
      maxEventsPerDay: 3,
      ...options
    };
    
    this.currentDate = new Date();
    this.selectedDate = null;
    this.events = [];
    
    this.init();
  }
  
  init() {
    this.renderCalendar();
    this.bindEvents();
  }
  
  renderCalendar() {
    const daysGrid = this.element.querySelector('.days-grid');
    daysGrid.innerHTML = '';
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week of first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let firstDayOfWeek = firstDay.getDay() - 1; // Adjust for Monday start
    if (firstDayOfWeek < 0) firstDayOfWeek = 6; // Sunday becomes 6
    
    // Get total days in month
    const totalDays = lastDay.getDate();
    
    // Get days from previous month
    const prevMonthDays = firstDayOfWeek;
    
    // Get days from next month
    const nextMonthDays = 42 - (prevMonthDays + totalDays); // 42 = 6 rows * 7 days
    
    // Get last day of previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Render days from previous month
    for (let i = 0; i < prevMonthDays; i++) {
      const dayNumber = prevMonthLastDay - prevMonthDays + i + 1;
      const dayDate = new Date(year, month - 1, dayNumber);
      const dayElement = this.createDayElement(dayNumber, dayDate, true);
      daysGrid.appendChild(dayElement);
    }
    
    // Render days from current month
    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(year, month, i);
      const dayElement = this.createDayElement(i, dayDate, false);
      daysGrid.appendChild(dayElement);
    }
    
    // Render days from next month
    for (let i = 1; i <= nextMonthDays; i++) {
      const dayDate = new Date(year, month + 1, i);
      const dayElement = this.createDayElement(i, dayDate, true);
      daysGrid.appendChild(dayElement);
    }
    
    // Update events
    this.updateEvents();
  }
  
  createDayElement(dayNumber, date, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    if (isOtherMonth) dayElement.classList.add('other-month');
    
    // Check if it's today
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add('today');
    }
    
    // Check if it's selected
    if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
      dayElement.classList.add('selected');
    }
    
    // Store date as data attribute
    dayElement.dataset.date = date.toISOString().split('T')[0];
    
    // Create day header
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    
    const dayNumberElement = document.createElement('div');
    dayNumberElement.className = 'day-number';
    dayNumberElement.textContent = dayNumber;
    
    const dayIndicator = document.createElement('div');
    dayIndicator.className = 'day-indicator';
    
    dayHeader.appendChild(dayNumberElement);
    dayHeader.appendChild(dayIndicator);
    
    // Create events container
    const dayEvents = document.createElement('div');
    dayEvents.className = 'day-events';
    
    dayElement.appendChild(dayHeader);
    dayElement.appendChild(dayEvents);
    
    return dayElement;
  }
  
  updateEvents() {
    // Clear all indicators and events
    this.element.querySelectorAll('.day-indicator').forEach(indicator => {
      indicator.className = 'day-indicator';
    });
    
    this.element.querySelectorAll('.day-events').forEach(container => {
      container.innerHTML = '';
    });
    
    // Group events by date
    const eventsByDate = {};
    this.events.forEach(event => {
      const dateKey = event.date.split('T')[0];
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });
    
    // Add events to calendar
    Object.entries(eventsByDate).forEach(([dateKey, dateEvents]) => {
      const dayElement = this.element.querySelector(`.calendar-day[data-date="${dateKey}"]`);
      if (!dayElement) return;
      
      // Update day indicator
      const indicator = dayElement.querySelector('.day-indicator');
      const eventTypes = new Set(dateEvents.map(e => e.type));
      
      if (eventTypes.has('match')) {
        indicator.classList.add('match-day');
      } else if (eventTypes.has('training')) {
        indicator.classList.add('training-day');
      } else if (eventTypes.has('event')) {
        indicator.classList.add('event-day');
      } else if (eventTypes.has('rest')) {
        indicator.classList.add('rest-day');
      }
      
      // Add events to day
      const eventsContainer = dayElement.querySelector('.day-events');
      const visibleEvents = dateEvents.slice(0, this.options.maxEventsPerDay);
      const hiddenEvents = dateEvents.length - visibleEvents.length;
      
      visibleEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `day-event ${event.type}-event`;
        eventElement.textContent = event.title;
        eventElement.title = `${event.title} - ${event.time || ''}`;
        eventsContainer.appendChild(eventElement);
      });
      
      if (hiddenEvents > 0) {
        const moreElement = document.createElement('div');
        moreElement.className = 'more-events';
        moreElement.textContent = `+ ${hiddenEvents} altri`;
        eventsContainer.appendChild(moreElement);
      }
    });
  }
  
  bindEvents() {
    // Day click
    this.element.addEventListener('click', (e) => {
      const dayElement = e.target.closest('.calendar-day');
      if (dayElement) {
        this.selectDay(dayElement);
      }
    });
    
    // Listen for date changes from navigation
    document.addEventListener('dateChange', (e) => {
      if (e.detail && e.detail.date) {
        this.setCurrentMonth(e.detail.date);
      }
    });
  }
  
  selectDay(dayElement) {
    // Remove selected class from previously selected day
    const prevSelected = this.element.querySelector('.calendar-day.selected');
    if (prevSelected) {
      prevSelected.classList.remove('selected');
    }
    
    // Add selected class to clicked day
    dayElement.classList.add('selected');
    
    // Update selected date
    const dateString = dayElement.dataset.date;
    this.selectedDate = new Date(dateString);
    
    // Get events for this day
    const dayEvents = this.events.filter(event => event.date.split('T')[0] === dateString);
    
    // Call day click callback if provided
    if (typeof this.options.onDayClick === 'function') {
      this.options.onDayClick(this.selectedDate, dayEvents);
    }
    
    // Dispatch day click event
    this.element.dispatchEvent(new CustomEvent('dayClick', {
      detail: { 
        date: this.selectedDate,
        events: dayEvents,
        element: dayElement
      }
    }));
  }
  
  setCurrentMonth(date) {
    // Only update if month or year changed
    if (date.getMonth() !== this.currentDate.getMonth() || 
        date.getFullYear() !== this.currentDate.getFullYear()) {
      this.currentDate = new Date(date);
      this.renderCalendar();
    }
  }
  
  // Public methods
  setEvents(events) {
    this.events = events;
    this.updateEvents();
  }
  
  addEvent(event) {
    this.events.push(event);
    this.updateEvents();
  }
  
  removeEvent(eventId) {
    this.events = this.events.filter(event => event.id !== eventId);
    this.updateEvents();
  }
  
  getSelectedDate() {
    return this.selectedDate;
  }
  
  getCurrentMonth() {
    return {
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear()
    };
  }
  
  getEventsForDate(date) {
    const dateString = date.toISOString().split('T')[0];
    return this.events.filter(event => event.date.split('T')[0] === dateString);
  }
  
  getEventsForCurrentMonth() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }
  
  highlightDate(date) {
    const dateString = date.toISOString().split('T')[0];
    const dayElement = this.element.querySelector(`.calendar-day[data-date="${dateString}"]`);
    
    if (dayElement) {
      // Scroll into view if needed
      dayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add highlight effect
      dayElement.style.transform = 'scale(1.05)';
      dayElement.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)';
      dayElement.style.borderColor = 'var(--primary)';
      
      // Remove highlight after animation
      setTimeout(() => {
        dayElement.style.transform = '';
        dayElement.style.boxShadow = '';
        dayElement.style.borderColor = '';
      }, 1500);
    }
  }
}

// Auto-initialize calendar grids
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.calendar-grid').forEach(grid => {
    if (!grid.dataset.initialized) {
      const options = JSON.parse(grid.dataset.options || '{}');
      new CalendarGrid(grid, options);
      grid.dataset.initialized = 'true';
    }
  });
});
</script>