export const template = `
<div class="training-scheduler">
  <div class="scheduler-header">
    <h3 class="scheduler-title">Pianificazione Allenamenti</h3>
    <div class="scheduler-actions">
      <button class="action-btn template-btn" aria-label="Carica template">
        📋 Template
      </button>
      <button class="action-btn save-schedule-btn" aria-label="Salva pianificazione">
        💾 Salva
      </button>
    </div>
  </div>
  
  <div class="schedule-period">
    <div class="period-selector">
      <button class="period-btn prev-period-btn" aria-label="Periodo precedente">
        ← Precedente
      </button>
      <div class="current-period">
        <h4 class="period-title">Settimana del <span class="period-date"></span></h4>
      </div>
      <button class="period-btn next-period-btn" aria-label="Periodo successivo">
        Successivo →
      </button>
    </div>
  </div>
  
  <div class="schedule-grid">
    <div class="grid-header">
      <div class="time-column">Orario</div>
      <div class="day-column">Lunedì</div>
      <div class="day-column">Martedì</div>
      <div class="day-column">Mercoledì</div>
      <div class="day-column">Giovedì</div>
      <div class="day-column">Venerdì</div>
      <div class="day-column">Sabato</div>
      <div class="day-column">Domenica</div>
    </div>
    
    <div class="grid-body">
      <!-- Morning slot -->
      <div class="time-slot">
        <div class="time-label">Mattina<br>9:00-11:00</div>
        <div class="schedule-cell" data-day="0" data-time="morning"></div>
        <div class="schedule-cell" data-day="1" data-time="morning"></div>
        <div class="schedule-cell" data-day="2" data-time="morning"></div>
        <div class="schedule-cell" data-day="3" data-time="morning"></div>
        <div class="schedule-cell" data-day="4" data-time="morning"></div>
        <div class="schedule-cell" data-day="5" data-time="morning"></div>
        <div class="schedule-cell" data-day="6" data-time="morning"></div>
      </div>
      
      <!-- Afternoon slot -->
      <div class="time-slot">
        <div class="time-label">Pomeriggio<br>15:00-17:00</div>
        <div class="schedule-cell" data-day="0" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="1" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="2" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="3" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="4" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="5" data-time="afternoon"></div>
        <div class="schedule-cell" data-day="6" data-time="afternoon"></div>
      </div>
    </div>
  </div>
  
  <div class="schedule-summary">
    <div class="summary-header">
      <h4>Riepilogo Settimanale</h4>
    </div>
    <div class="summary-content">
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-value session-count">0</span>
          <span class="stat-label">Sessioni</span>
        </div>
        <div class="stat-item">
          <span class="stat-value avg-intensity">0</span>
          <span class="stat-label">Intensità Media</span>
        </div>
        <div class="stat-item">
          <span class="stat-value rest-days">0</span>
          <span class="stat-label">Giorni Riposo</span>
        </div>
      </div>
      
      <div class="workload-indicator">
        <span class="workload-label">Carico di Lavoro:</span>
        <div class="workload-bar">
          <div class="workload-fill"></div>
        </div>
        <span class="workload-text">Ottimale</span>
      </div>
    </div>
  </div>
  
  <div class="training-templates" style="display: none;">
    <div class="templates-header">
      <h4>Template Allenamento</h4>
      <button class="close-templates-btn" aria-label="Chiudi template">✕</button>
    </div>
    
    <div class="templates-list">
      <div class="template-item" data-template="balanced">
        <div class="template-name">Bilanciato</div>
        <div class="template-description">Equilibrio tra intensità e riposo</div>
        <button class="apply-template-btn">Applica</button>
      </div>
      
      <div class="template-item" data-template="intensive">
        <div class="template-name">Intensivo</div>
        <div class="template-description">Alta intensità con focus su fisico</div>
        <button class="apply-template-btn">Applica</button>
      </div>
      
      <div class="template-item" data-template="technical">
        <div class="template-name">Tecnico</div>
        <div class="template-description">Focus su tecnica e tattica</div>
        <button class="apply-template-btn">Applica</button>
      </div>
      
      <div class="template-item" data-template="recovery">
        <div class="template-name">Recupero</div>
        <div class="template-description">Bassa intensità con molti giorni di riposo</div>
        <button class="apply-template-btn">Applica</button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-schedule">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Training Scheduler Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.training-scheduler {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.scheduler-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.scheduler-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.scheduler-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.schedule-period {
  margin-bottom: 20px;
}

.period-selector {
  display: flex;
  align-items: center;
  gap: 16px;
}

.period-btn {
  padding: 8px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.period-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.current-period {
  flex: 1;
  text-align: center;
}

.period-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.schedule-grid {
  margin-bottom: 24px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.grid-header {
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  background: var(--primary);
  color: white;
}

.time-column,
.day-column {
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.time-column {
  background: var(--primary-dark);
}

.grid-body {
  display: flex;
  flex-direction: column;
}

.time-slot {
  display: grid;
  grid-template-columns: 100px repeat(7, 1fr);
  border-bottom: 1px solid var(--border);
}

.time-slot:last-child {
  border-bottom: none;
}

.time-label {
  padding: 12px 8px;
  background: var(--background);
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid var(--border);
}

.schedule-cell {
  min-height: 80px;
  border-right: 1px solid var(--border);
  padding: 8px;
  background: var(--surface);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.schedule-cell:hover {
  background: var(--background);
}

.schedule-cell:last-child {
  border-right: none;
}

.training-session {
  background: var(--background);
  border-radius: 6px;
  padding: 8px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.training-session:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.session-type {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
}

.session-intensity {
  display: flex;
  gap: 2px;
}

.intensity-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--border);
}

.intensity-dot.active {
  background: var(--primary);
}

.session-details {
  font-size: 10px;
  color: var(--text);
  line-height: 1.3;
}

.session-actions {
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
}

.training-session:hover .session-actions {
  display: block;
}

.session-btn {
  background: none;
  border: none;
  font-size: 10px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.session-btn:hover {
  background: var(--border);
  color: var(--text);
}

.session-btn.delete-btn:hover {
  background: var(--error);
  color: white;
}

.rest-day {
  background: rgba(16, 185, 129, 0.1);
  border: 1px dashed var(--success);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--success);
  font-weight: 500;
}

.match-day {
  background: rgba(239, 68, 68, 0.1);
  border: 1px dashed var(--error);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--error);
  font-weight: 500;
}

.schedule-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.summary-header {
  margin-bottom: 16px;
}

.summary-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.summary-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.workload-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.workload-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.workload-bar {
  width: 100px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.workload-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success), var(--warning), var(--error));
  width: 60%;
  transition: width 0.3s ease;
}

.workload-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.training-templates {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  z-index: 100;
}

.templates-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.templates-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.close-templates-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-templates-btn:hover {
  background: var(--border);
  color: var(--text);
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.template-item:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.template-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.template-description {
  font-size: 12px;
  color: var(--text-muted);
  flex: 1;
}

.apply-template-btn {
  padding: 6px 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.apply-template-btn:hover {
  background: var(--primary-dark);
}

.sponsor-slot-schedule {
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

/* Training type specific colors */
.training-session[data-type="fitness"] {
  border-left: 3px solid #ef4444;
}

.training-session[data-type="technical"] {
  border-left: 3px solid #3b82f6;
}

.training-session[data-type="tactical"] {
  border-left: 3px solid #10b981;
}

.training-session[data-type="mental"] {
  border-left: 3px solid #8b5cf6;
}

.training-session[data-type="recovery"] {
  border-left: 3px solid #f59e0b;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-header,
  .time-slot {
    grid-template-columns: 80px repeat(7, 1fr);
  }
  
  .schedule-cell {
    min-height: 60px;
  }
  
  .summary-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .summary-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .workload-indicator {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .period-selector {
    flex-direction: column;
    gap: 12px;
  }
  
  .period-btn {
    width: 100%;
  }
  
  .grid-header,
  .time-slot {
    display: flex;
    flex-direction: column;
  }
  
  .day-column,
  .schedule-cell {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  
  .time-column,
  .time-label {
    border-right: none;
    border-bottom: 1px solid var(--border);
    background: var(--primary);
    color: white;
  }
  
  .time-label {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .summary-stats {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .sponsor-slot-schedule {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class TrainingScheduler {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onScheduleChange: null,
      onSessionAdd: null,
      onSessionRemove: null,
      ...options
    };
    
    this.currentWeek = new Date();
    this.schedule = {};
    this.events = []; // Matches, rest days, etc.
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updatePeriodDisplay();
    this.loadSchedule();
    this.loadEvents();
  }
  
  bindEvents() {
    // Period navigation
    this.element.querySelector('.prev-period-btn').addEventListener('click', () => {
      this.navigatePeriod(-1);
    });
    
    this.element.querySelector('.next-period-btn').addEventListener('click', () => {
      this.navigatePeriod(1);
    });
    
    // Schedule cells
    this.element.querySelectorAll('.schedule-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        this.handleCellClick(cell);
      });
    });
    
    // Template button
    this.element.querySelector('.template-btn').addEventListener('click', () => {
      this.showTemplates();
    });
    
    // Close templates button
    this.element.querySelector('.close-templates-btn').addEventListener('click', () => {
      this.hideTemplates();
    });
    
    // Apply template buttons
    this.element.querySelectorAll('.apply-template-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const template = e.target.closest('.template-item').dataset.template;
        this.applyTemplate(template);
      });
    });
    
    // Save schedule button
    this.element.querySelector('.save-schedule-btn').addEventListener('click', () => {
      this.saveSchedule();
    });
  }
  
  navigatePeriod(direction) {
    const newDate = new Date(this.currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    this.currentWeek = newDate;
    
    this.updatePeriodDisplay();
    this.loadSchedule();
    this.loadEvents();
  }
  
  updatePeriodDisplay() {
    const weekStart = this.getWeekStart(this.currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Update period title
    const periodDate = this.element.querySelector('.period-date');
    periodDate.textContent = `${this.formatDate(weekStart)} - ${this.formatDate(weekEnd)}`;
    
    // Update day columns with dates
    const dayColumns = this.element.querySelectorAll('.day-column');
    dayColumns.forEach((column, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + index);
      
      const dayNumber = dayDate.getDate();
      const monthNumber = dayDate.getMonth() + 1;
      column.textContent = `${this.getDayName(index)} ${dayNumber}/${monthNumber}`;
    });
  }
  
  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(d.setDate(diff));
  }
  
  formatDate(date) {
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
  }
  
  getDayName(dayIndex) {
    const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    return dayNames[dayIndex];
  }
  
  async loadSchedule() {
    try {
      // In a real app, this would fetch from game state
      const weekKey = this.getWeekKey(this.currentWeek);
      this.schedule = await this.fetchSchedule(weekKey);
      
      this.renderSchedule();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading schedule:', error);
      this.showError('Errore nel caricamento del programma');
    }
  }
  
  async fetchSchedule(weekKey) {
    // Mock data - in real app this would come from game state
    const schedule = {
      // Monday morning
      '0-morning': {
        type: 'fitness',
        intensity: 4,
        description: 'Allenamento fisico ad alta intensità'
      },
      // Tuesday afternoon
      '1-afternoon': {
        type: 'technical',
        intensity: 3,
        description: 'Esercitazioni tecniche'
      },
      // Thursday morning
      '3-morning': {
        type: 'tactical',
        intensity: 3,
        description: 'Tattica di squadra'
      },
      // Friday afternoon
      '4-afternoon': {
        type: 'recovery',
        intensity: 1,
        description: 'Recupero attivo'
      }
    };
    
    return schedule;
  }
  
  async loadEvents() {
    try {
      // In a real app, this would fetch from game state
      const weekStart = this.getWeekStart(this.currentWeek);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      this.events = await this.fetchEvents(weekStart, weekEnd);
      this.renderEvents();
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  
  async fetchEvents(startDate, endDate) {
    // Mock data - in real app this would come from game state
    return [
      {
        type: 'match',
        date: (() => {
          const date = new Date(startDate);
          date.setDate(date.getDate() + 6); // Sunday
          return date;
        })(),
        description: 'Partita vs Juventus'
      },
      {
        type: 'rest',
        date: (() => {
          const date = new Date(startDate);
          date.setDate(date.getDate() + 2); // Wednesday
          return date;
        })(),
        description: 'Giorno di riposo'
      }
    ];
  }
  
  renderSchedule() {
    // Clear all cells
    this.element.querySelectorAll('.schedule-cell').forEach(cell => {
      cell.innerHTML = '';
    });
    
    // Render training sessions
    Object.entries(this.schedule).forEach(([key, session]) => {
      const [day, time] = key.split('-');
      const cell = this.element.querySelector(`.schedule-cell[data-day="${day}"][data-time="${time}"]`);
      
      if (cell) {
        const sessionElement = this.createTrainingSessionElement(session);
        cell.appendChild(sessionElement);
      }
    });
  }
  
  renderEvents() {
    // Clear event markers
    this.element.querySelectorAll('.match-day, .rest-day').forEach(el => {
      el.classList.remove('match-day', 'rest-day');
      el.textContent = '';
    });
    
    // Add event markers
    this.events.forEach(event => {
      const eventDate = new Date(event.date);
      const weekStart = this.getWeekStart(this.currentWeek);
      
      // Calculate day index (0-6)
      const diffDays = Math.floor((eventDate - weekStart) / (24 * 60 * 60 * 1000));
      
      if (diffDays >= 0 && diffDays <= 6) {
        // Mark both morning and afternoon cells
        const morningCell = this.element.querySelector(`.schedule-cell[data-day="${diffDays}"][data-time="morning"]`);
        const afternoonCell = this.element.querySelector(`.schedule-cell[data-day="${diffDays}"][data-time="afternoon"]`);
        
        if (event.type === 'match') {
          morningCell.classList.add('match-day');
          morningCell.textContent = 'PARTITA';
          afternoonCell.classList.add('match-day');
          afternoonCell.textContent = 'PARTITA';
        } else if (event.type === 'rest') {
          morningCell.classList.add('rest-day');
          morningCell.textContent = 'RIPOSO';
          afternoonCell.classList.add('rest-day');
          afternoonCell.textContent = 'RIPOSO';
        }
      }
    });
  }
  
  createTrainingSessionElement(session) {
    const element = document.createElement('div');
    element.className = 'training-session';
    element.dataset.type = session.type;
    
    const intensityDots = Array.from({ length: 5 }, (_, i) => 
      `<div class="intensity-dot ${i < session.intensity ? 'active' : ''}"></div>`
    ).join('');
    
    element.innerHTML = `
      <div class="session-header">
        <span class="session-type">${this.getTrainingTypeName(session.type)}</span>
        <div class="session-intensity">
          ${intensityDots}
        </div>
      </div>
      <div class="session-details">${session.description}</div>
      <div class="session-actions">
        <button class="session-btn edit-btn" aria-label="Modifica sessione">✏️</button>
        <button class="session-btn delete-btn" aria-label="Elimina sessione">✕</button>
      </div>
    `;
    
    // Add event listeners
    element.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.editSession(session, element.closest('.schedule-cell'));
    });
    
    element.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeSession(element.closest('.schedule-cell'));
    });
    
    return element;
  }
  
  getTrainingTypeName(type) {
    const typeNames = {
      fitness: 'Fitness',
      technical: 'Tecnico',
      tactical: 'Tattico',
      mental: 'Mentale',
      recovery: 'Recupero'
    };
    return typeNames[type] || type;
  }
  
  handleCellClick(cell) {
    const day = cell.dataset.day;
    const time = cell.dataset.time;
    
    // Check if cell already has a session
    if (cell.querySelector('.training-session')) {
      return;
    }
    
    // Check if cell has an event (match or rest day)
    if (cell.classList.contains('match-day') || cell.classList.contains('rest-day')) {
      this.showError('Non puoi programmare un allenamento in questo giorno');
      return;
    }
    
    // Show add session dialog
    this.showAddSessionDialog(day, time);
  }
  
  showAddSessionDialog(day, time) {
    // In a real app, this would show a modal dialog
    // For now, we'll use a simple prompt
    const sessionType = prompt('Tipo di allenamento (fitness, technical, tactical, mental, recovery):');
    if (!sessionType) return;
    
    const intensity = parseInt(prompt('Intensità (1-5):'));
    if (isNaN(intensity) || intensity < 1 || intensity > 5) return;
    
    const description = prompt('Descrizione:');
    if (!description) return;
    
    // Add session to schedule
    this.addSession(day, time, {
      type: sessionType,
      intensity,
      description
    });
  }
  
  addSession(day, time, session) {
    const key = `${day}-${time}`;
    this.schedule[key] = session;
    
    // Update UI
    this.renderSchedule();
    this.updateSummary();
    
    // Call onSessionAdd callback if provided
    if (typeof this.options.onSessionAdd === 'function') {
      this.options.onSessionAdd(day, time, session);
    }
    
    // Dispatch session add event
    this.element.dispatchEvent(new CustomEvent('sessionAdded', {
      detail: { day, time, session }
    }));
  }
  
  editSession(session, cell) {
    const day = cell.dataset.day;
    const time = cell.dataset.time;
    
    // In a real app, this would show a modal dialog
    // For now, we'll use a simple prompt
    const sessionType = prompt('Tipo di allenamento (fitness, technical, tactical, mental, recovery):', session.type);
    if (!sessionType) return;
    
    const intensity = parseInt(prompt('Intensità (1-5):', session.intensity));
    if (isNaN(intensity) || intensity < 1 || intensity > 5) return;
    
    const description = prompt('Descrizione:', session.description);
    if (!description) return;
    
    // Update session
    const key = `${day}-${time}`;
    this.schedule[key] = {
      type: sessionType,
      intensity,
      description
    };
    
    // Update UI
    this.renderSchedule();
    this.updateSummary();
    
    // Dispatch session update event
    this.element.dispatchEvent(new CustomEvent('sessionUpdated', {
      detail: { day, time, session: this.schedule[key] }
    }));
  }
  
  removeSession(cell) {
    const day = cell.dataset.day;
    const time = cell.dataset.time;
    const key = `${day}-${time}`;
    
    // Check if session exists
    if (!this.schedule[key]) return;
    
    // Remove session
    const session = this.schedule[key];
    delete this.schedule[key];
    
    // Update UI
    this.renderSchedule();
    this.updateSummary();
    
    // Call onSessionRemove callback if provided
    if (typeof this.options.onSessionRemove === 'function') {
      this.options.onSessionRemove(day, time, session);
    }
    
    // Dispatch session remove event
    this.element.dispatchEvent(new CustomEvent('sessionRemoved', {
      detail: { day, time, session }
    }));
  }
  
  updateSummary() {
    // Count sessions
    const sessionCount = Object.keys(this.schedule).length;
    
    // Calculate average intensity
    let totalIntensity = 0;
    Object.values(this.schedule).forEach(session => {
      totalIntensity += session.intensity;
    });
    const avgIntensity = sessionCount > 0 ? Math.round(totalIntensity / sessionCount) : 0;
    
    // Count rest days
    const restDays = this.events.filter(event => event.type === 'rest').length;
    
    // Update summary stats
    this.element.querySelector('.session-count').textContent = sessionCount;
    this.element.querySelector('.avg-intensity').textContent = avgIntensity;
    this.element.querySelector('.rest-days').textContent = restDays;
    
    // Update workload indicator
    this.updateWorkloadIndicator(sessionCount, avgIntensity, restDays);
  }
  
  updateWorkloadIndicator(sessionCount, avgIntensity, restDays) {
    // Calculate workload percentage (0-100)
    // Formula: (sessions * avg intensity) / (optimal sessions * optimal intensity) * 100
    const optimalSessions = 4; // 4 sessions per week is considered optimal
    const optimalIntensity = 3; // Medium intensity is considered optimal
    const optimalRestDays = 1; // 1 rest day per week is considered optimal
    
    // Adjust for rest days (more rest days = lower workload)
    const restFactor = Math.max(0, 1 - (restDays - optimalRestDays) * 0.1);
    
    const workloadPercentage = Math.min(100, (sessionCount * avgIntensity) / (optimalSessions * optimalIntensity) * 100 * restFactor);
    
    const workloadFill = this.element.querySelector('.workload-fill');
    const workloadText = this.element.querySelector('.workload-text');
    
    workloadFill.style.width = `${workloadPercentage}%`;
    
    // Update workload text
    let workloadLevel = 'Basso';
    if (workloadPercentage > 80) workloadLevel = 'Eccessivo';
    else if (workloadPercentage > 60) workloadLevel = 'Alto';
    else if (workloadPercentage > 40) workloadLevel = 'Ottimale';
    else if (workloadPercentage > 20) workloadLevel = 'Moderato';
    
    workloadText.textContent = workloadLevel;
  }
  
  showTemplates() {
    this.element.querySelector('.training-templates').style.display = 'block';
  }
  
  hideTemplates() {
    this.element.querySelector('.training-templates').style.display = 'none';
  }
  
  applyTemplate(template) {
    // Clear current schedule
    this.schedule = {};
    
    // Apply template
    switch (template) {
      case 'balanced':
        this.schedule = {
          '0-morning': { type: 'fitness', intensity: 3, description: 'Allenamento fisico' },
          '1-afternoon': { type: 'technical', intensity: 3, description: 'Esercitazioni tecniche' },
          '3-morning': { type: 'tactical', intensity: 3, description: 'Tattica di squadra' },
          '4-afternoon': { type: 'recovery', intensity: 2, description: 'Recupero attivo' }
        };
        break;
      case 'intensive':
        this.schedule = {
          '0-morning': { type: 'fitness', intensity: 4, description: 'Allenamento fisico intenso' },
          '0-afternoon': { type: 'technical', intensity: 3, description: 'Esercitazioni tecniche' },
          '1-afternoon': { type: 'fitness', intensity: 5, description: 'Allenamento fisico molto intenso' },
          '3-morning': { type: 'tactical', intensity: 4, description: 'Tattica di squadra' },
          '4-morning': { type: 'fitness', intensity: 4, description: 'Allenamento fisico intenso' },
          '4-afternoon': { type: 'technical', intensity: 3, description: 'Esercitazioni tecniche' }
        };
        break;
      case 'technical':
        this.schedule = {
          '0-morning': { type: 'technical', intensity: 3, description: 'Esercitazioni tecniche' },
          '1-afternoon': { type: 'tactical', intensity: 3, description: 'Tattica di squadra' },
          '2-morning': { type: 'technical', intensity: 4, description: 'Esercitazioni tecniche avanzate' },
          '4-morning': { type: 'tactical', intensity: 4, description: 'Tattica di squadra avanzata' },
          '4-afternoon': { type: 'mental', intensity: 2, description: 'Preparazione mentale' }
        };
        break;
      case 'recovery':
        this.schedule = {
          '1-morning': { type: 'recovery', intensity: 1, description: 'Recupero passivo' },
          '3-afternoon': { type: 'recovery', intensity: 2, description: 'Recupero attivo' },
          '5-morning': { type: 'fitness', intensity: 2, description: 'Allenamento fisico leggero' }
        };
        break;
    }
    
    // Update UI
    this.renderSchedule();
    this.updateSummary();
    
    // Hide templates
    this.hideTemplates();
    
    // Show success message
    this.showSuccess(`Template ${template} applicato con successo`);
    
    // Dispatch template applied event
    this.element.dispatchEvent(new CustomEvent('templateApplied', {
      detail: { template, schedule: this.schedule }
    }));
  }
  
  saveSchedule() {
    // In a real app, this would save to game state
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('scheduleSaved', {
      detail: { 
        week: this.getWeekKey(this.currentWeek),
        schedule: this.schedule
      }
    }));
    
    this.showSuccess('Programma salvato con successo');
  }
  
  getWeekKey(date) {
    const weekStart = this.getWeekStart(date);
    return `${weekStart.getFullYear()}-W${this.getWeekNumber(weekStart)}`;
  }
  
  getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
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
  getSchedule() {
    return { ...this.schedule };
  }
  
  setSchedule(newSchedule) {
    this.schedule = { ...newSchedule };
    this.renderSchedule();
    this.updateSummary();
  }
  
  getCurrentWeek() {
    return new Date(this.currentWeek);
  }
  
  goToWeek(date) {
    this.currentWeek = new Date(date);
    this.updatePeriodDisplay();
    this.loadSchedule();
    this.loadEvents();
  }
  
  setEvents(events) {
    this.events = [...events];
    this.renderEvents();
  }
  
  getSessionsForDay(day) {
    const sessions = [];
    
    const morningKey = `${day}-morning`;
    const afternoonKey = `${day}-afternoon`;
    
    if (this.schedule[morningKey]) {
      sessions.push({
        time: 'morning',
        ...this.schedule[morningKey]
      });
    }
    
    if (this.schedule[afternoonKey]) {
      sessions.push({
        time: 'afternoon',
        ...this.schedule[afternoonKey]
      });
    }
    
    return sessions;
  }
}

export default TrainingScheduler;