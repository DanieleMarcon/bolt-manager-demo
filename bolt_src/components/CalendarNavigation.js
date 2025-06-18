export const template = `
<div class="calendar-navigation">
  <div class="navigation-controls">
    <button class="nav-btn prev-month-btn" aria-label="Mese precedente">
      ← Precedente
    </button>
    
    <div class="current-date-display">
      <h2 class="current-month"></h2>
      <span class="current-year"></span>
    </div>
    
    <button class="nav-btn next-month-btn" aria-label="Mese successivo">
      Successivo →
    </button>
  </div>
  
  <div class="calendar-actions">
    <button class="action-btn today-btn" aria-label="Vai a oggi">
      📅 Oggi
    </button>
    
    <div class="view-selector">
      <button class="view-btn active" data-view="month" aria-label="Vista mensile">
        Mese
      </button>
      <button class="view-btn" data-view="week" aria-label="Vista settimanale">
        Settimana
      </button>
      <button class="view-btn" data-view="day" aria-label="Vista giornaliera">
        Giorno
      </button>
    </div>
    
    <button class="action-btn advance-btn" aria-label="Avanza al giorno successivo">
      ⏩ Avanza
    </button>
  </div>
</div>
<style>
.calendar-navigation {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.nav-btn {
  padding: 8px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.current-date-display {
  text-align: center;
}

.current-month {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.current-year {
  font-size: 14px;
  color: var(--text-muted);
}

.calendar-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-btn {
  padding: 8px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.advance-btn {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.advance-btn:hover {
  background: var(--primary-dark);
  border-color: var(--primary-dark);
}

.view-selector {
  display: flex;
  background: var(--background);
  border-radius: 6px;
  padding: 4px;
}

.view-btn {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-btn.active {
  background: var(--surface);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-weight: 500;
}

.view-btn:hover:not(.active) {
  background: rgba(255,255,255,0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .navigation-controls {
    flex-direction: column;
    gap: 12px;
  }
  
  .calendar-actions {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .view-selector {
    order: -1;
    align-self: center;
  }
}
</style>
`;

class CalendarNavigation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onDateChange: null,
      onViewChange: null,
      onAdvanceDay: null,
      ...options
    };
    
    this.currentDate = new Date();
    this.currentView = 'month';
    
    this.init();
  }
  
  init() {
    this.updateDateDisplay();
    this.bindEvents();
  }
  
  updateDateDisplay() {
    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    
    const monthName = monthNames[this.currentDate.getMonth()];
    const year = this.currentDate.getFullYear();
    
    this.element.querySelector('.current-month').textContent = monthName;
    this.element.querySelector('.current-year').textContent = year;
  }
  
  bindEvents() {
    // Previous month button
    this.element.querySelector('.prev-month-btn').addEventListener('click', () => {
      this.navigateMonth(-1);
    });
    
    // Next month button
    this.element.querySelector('.next-month-btn').addEventListener('click', () => {
      this.navigateMonth(1);
    });
    
    // Today button
    this.element.querySelector('.today-btn').addEventListener('click', () => {
      this.goToToday();
    });
    
    // View selector buttons
    this.element.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.changeView(e.target.dataset.view);
      });
    });
    
    // Advance day button
    this.element.querySelector('.advance-btn').addEventListener('click', () => {
      this.advanceDay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.navigateMonth(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.navigateMonth(1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          this.goToToday();
        }
      }
    });
  }
  
  navigateMonth(direction) {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    this.setDate(newDate);
  }
  
  goToToday() {
    this.setDate(new Date());
  }
  
  changeView(view) {
    if (this.currentView === view) return;
    
    // Update active button
    this.element.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    this.currentView = view;
    
    // Call view change callback if provided
    if (typeof this.options.onViewChange === 'function') {
      this.options.onViewChange(view);
    }
    
    // Dispatch view change event
    this.element.dispatchEvent(new CustomEvent('viewChange', {
      detail: { view }
    }));
  }
  
  advanceDay() {
    // Call advance day callback if provided
    if (typeof this.options.onAdvanceDay === 'function') {
      this.options.onAdvanceDay();
    }
    
    // Dispatch advance day event
    this.element.dispatchEvent(new CustomEvent('advanceDay'));
  }
  
  setDate(date) {
    const oldDate = new Date(this.currentDate);
    this.currentDate = date;
    this.updateDateDisplay();
    
    // Call date change callback if provided
    if (typeof this.options.onDateChange === 'function') {
      this.options.onDateChange(date, oldDate);
    }
    
    // Dispatch date change event
    this.element.dispatchEvent(new CustomEvent('dateChange', {
      detail: { 
        date: date,
        oldDate: oldDate,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }
    }));
  }
  
  // Public methods
  getCurrentDate() {
    return new Date(this.currentDate);
  }
  
  getCurrentView() {
    return this.currentView;
  }
  
  setCurrentDate(date) {
    this.setDate(date);
  }
  
  setCurrentView(view) {
    this.changeView(view);
  }
  
  disableAdvanceButton(disabled = true) {
    const advanceBtn = this.element.querySelector('.advance-btn');
    advanceBtn.disabled = disabled;
    if (disabled) {
      advanceBtn.style.opacity = '0.5';
      advanceBtn.style.cursor = 'not-allowed';
    } else {
      advanceBtn.style.opacity = '';
      advanceBtn.style.cursor = '';
    }
  }
}

export default CalendarNavigation;