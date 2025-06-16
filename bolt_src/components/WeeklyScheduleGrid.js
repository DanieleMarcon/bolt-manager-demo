<div class="weekly-schedule-grid">
  <div class="schedule-header">
    <div class="week-navigation">
      <button class="nav-btn prev-week-btn" aria-label="Settimana precedente">
        ← Precedente
      </button>
      <div class="current-week-info">
        <h3 class="week-title">Settimana del <span class="week-date"></span></h3>
        <span class="week-subtitle">Stagione <span class="season-year"></span></span>
      </div>
      <button class="nav-btn next-week-btn" aria-label="Settimana successiva">
        Successiva →
      </button>
    </div>
    
    <div class="schedule-actions">
      <button class="button button-secondary auto-schedule-btn">
        🤖 Auto Pianifica
      </button>
      <button class="button button-ghost clear-schedule-btn">
        🗑️ Pulisci
      </button>
    </div>
  </div>
  
  <div class="schedule-grid" role="grid" aria-label="Calendario allenamenti settimanale">
    <div class="grid-header">
      <div class="day-header">Lunedì</div>
      <div class="day-header">Martedì</div>
      <div class="day-header">Mercoledì</div>
      <div class="day-header">Giovedì</div>
      <div class="day-header">Venerdì</div>
      <div class="day-header">Sabato</div>
      <div class="day-header">Domenica</div>
    </div>
    
    <div class="grid-body">
      <div class="day-column" data-day="monday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="0">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento lunedì">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="tuesday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="1">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento martedì">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="wednesday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="2">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento mercoledì">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="thursday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="3">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento giovedì">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="friday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="4">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento venerdì">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="saturday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="5">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento sabato">
          + Aggiungi
        </button>
      </div>
      
      <div class="day-column" data-day="sunday" role="gridcell">
        <div class="day-date"></div>
        <div class="training-slots" data-day="6">
          <!-- Training sessions will be added here -->
        </div>
        <button class="add-training-btn" aria-label="Aggiungi allenamento domenica">
          + Aggiungi
        </button>
      </div>
    </div>
  </div>
  
  <div class="schedule-summary">
    <div class="summary-stats">
      <div class="stat-item">
        <span class="stat-value total-sessions">0</span>
        <span class="stat-label">Sessioni</span>
      </div>
      <div class="stat-item">
        <span class="stat-value total-players">0</span>
        <span class="stat-label">Giocatori</span>
      </div>
      <div class="stat-item">
        <span class="stat-value avg-intensity">0</span>
        <span class="stat-label">Intensità Media</span>
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
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-schedule">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=350&h=70" 
         alt="Training Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.weekly-schedule-grid {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  position: relative;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.week-navigation {
  display: flex;
  align-items: center;
  gap: 16px;
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

.current-week-info {
  text-align: center;
}

.week-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.week-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}

.schedule-actions {
  display: flex;
  gap: 12px;
}

.schedule-grid {
  margin-bottom: 24px;
}

.grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.day-header {
  background: var(--primary);
  color: white;
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

.grid-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  min-height: 300px;
}

.day-column {
  background: var(--surface);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 280px;
  position: relative;
}

.day-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.training-slots {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 180px;
}

.training-session {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.training-session:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.training-session.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
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

.session-time {
  font-size: 10px;
  color: var(--text-muted);
}

.session-details {
  font-size: 10px;
  color: var(--text);
  line-height: 1.3;
}

.session-intensity {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.intensity-dots {
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

.session-players {
  font-size: 9px;
  color: var(--text-muted);
  margin-top: 2px;
}

.add-training-btn {
  background: none;
  border: 2px dashed var(--border);
  border-radius: 6px;
  padding: 12px 8px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  margin-top: auto;
}

.add-training-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.day-column.drag-over {
  background: rgba(37, 99, 235, 0.1);
  border: 2px dashed var(--primary);
}

.schedule-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  margin-bottom: 16px;
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
  transition: width 0.3s ease;
}

.workload-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.sponsor-slot-schedule {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* Training type specific colors */
.training-session[data-type="fitness"] {
  border-left: 4px solid #ef4444;
}

.training-session[data-type="technical"] {
  border-left: 4px solid #3b82f6;
}

.training-session[data-type="tactical"] {
  border-left: 4px solid #10b981;
}

.training-session[data-type="mental"] {
  border-left: 4px solid #8b5cf6;
}

.training-session[data-type="recovery"] {
  border-left: 4px solid #f59e0b;
}

/* Responsive */
@media (max-width: 1024px) {
  .schedule-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .week-navigation {
    justify-content: center;
  }
  
  .schedule-actions {
    justify-content: center;
  }
  
  .day-header {
    font-size: 12px;
    padding: 8px 4px;
  }
  
  .day-column {
    padding: 8px 4px;
    min-height: 240px;
  }
}

@media (max-width: 768px) {
  .weekly-schedule-grid {
    padding: 16px;
  }
  
  .grid-header,
  .grid-body {
    grid-template-columns: 1fr;
  }
  
  .day-column {
    min-height: 120px;
    border-bottom: 1px solid var(--border);
  }
  
  .day-header {
    border-radius: 6px;
    margin-bottom: 8px;
  }
  
  .summary-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .schedule-summary {
    flex-direction: column;
    gap: 16px;
  }
  
  .workload-indicator {
    justify-content: center;
  }
}
</style>

<script>
class WeeklyScheduleGrid {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      allowDragDrop: true,
      autoSave: true,
      maxSessionsPerDay: 3,
      ...options
    };
    
    this.currentWeek = new Date();
    this.schedule = {};
    this.draggedElement = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateWeekDisplay();
    this.loadSchedule();
    this.setupDragAndDrop();
  }
  
  bindEvents() {
    // Week navigation
    this.element.querySelector('.prev-week-btn').addEventListener('click', () => {
      this.navigateWeek(-1);
    });
    
    this.element.querySelector('.next-week-btn').addEventListener('click', () => {
      this.navigateWeek(1);
    });
    
    // Schedule actions
    this.element.querySelector('.auto-schedule-btn').addEventListener('click', () => {
      this.autoSchedule();
    });
    
    this.element.querySelector('.clear-schedule-btn').addEventListener('click', () => {
      this.clearSchedule();
    });
    
    // Add training buttons
    this.element.querySelectorAll('.add-training-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dayColumn = e.target.closest('.day-column');
        const day = parseInt(dayColumn.querySelector('.training-slots').dataset.day);
        this.showAddTrainingModal(day);
      });
    });
  }
  
  setupDragAndDrop() {
    if (!this.options.allowDragDrop) return;
    
    // Make training sessions draggable
    this.element.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('training-session')) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      }
    });
    
    this.element.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('training-session')) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
      }
    });
    
    // Setup drop zones
    this.element.querySelectorAll('.day-column').forEach(column => {
      column.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        column.classList.add('drag-over');
      });
      
      column.addEventListener('dragleave', (e) => {
        if (!column.contains(e.relatedTarget)) {
          column.classList.remove('drag-over');
        }
      });
      
      column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('drag-over');
        
        if (this.draggedElement) {
          const targetDay = parseInt(column.querySelector('.training-slots').dataset.day);
          this.moveTrainingSession(this.draggedElement, targetDay);
        }
      });
    });
  }
  
  navigateWeek(direction) {
    const newDate = new Date(this.currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    this.currentWeek = newDate;
    
    this.updateWeekDisplay();
    this.loadSchedule();
  }
  
  updateWeekDisplay() {
    const weekStart = this.getWeekStart(this.currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Update week title
    const weekDate = this.element.querySelector('.week-date');
    weekDate.textContent = `${this.formatDate(weekStart)} - ${this.formatDate(weekEnd)}`;
    
    // Update season year
    const seasonYear = this.element.querySelector('.season-year');
    seasonYear.textContent = weekStart.getFullYear();
    
    // Update day dates
    const dayColumns = this.element.querySelectorAll('.day-column');
    dayColumns.forEach((column, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + index);
      
      const dateElement = column.querySelector('.day-date');
      dateElement.textContent = `${dayDate.getDate()}/${dayDate.getMonth() + 1}`;
      
      // Highlight today
      const today = new Date();
      if (this.isSameDay(dayDate, today)) {
        column.classList.add('today');
      } else {
        column.classList.remove('today');
      }
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
  
  isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
  }
  
  async loadSchedule() {
    try {
      // In a real app, this would fetch from the game state
      const weekKey = this.getWeekKey(this.currentWeek);
      this.schedule = await this.fetchWeekSchedule(weekKey);
      
      this.renderSchedule();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading schedule:', error);
      this.showError('Errore nel caricamento del programma');
    }
  }
  
  async fetchWeekSchedule(weekKey) {
    // Mock data - in real app this would come from game state
    return {
      0: [], // Monday
      1: [], // Tuesday
      2: [], // Wednesday
      3: [], // Thursday
      4: [], // Friday
      5: [], // Saturday
      6: []  // Sunday
    };
  }
  
  renderSchedule() {
    // Clear existing sessions
    this.element.querySelectorAll('.training-slots').forEach(slot => {
      slot.innerHTML = '';
    });
    
    // Render sessions for each day
    Object.keys(this.schedule).forEach(day => {
      const dayInt = parseInt(day);
      const sessions = this.schedule[day];
      const slotsContainer = this.element.querySelector(`[data-day="${dayInt}"]`);
      
      sessions.forEach(session => {
        const sessionElement = this.createTrainingSessionElement(session);
        slotsContainer.appendChild(sessionElement);
      });
    });
  }
  
  createTrainingSessionElement(session) {
    const element = document.createElement('div');
    element.className = 'training-session';
    element.draggable = this.options.allowDragDrop;
    element.dataset.sessionId = session.id;
    element.dataset.type = session.type;
    
    const intensityDots = Array.from({ length: 5 }, (_, i) => 
      `<div class="intensity-dot ${i < session.intensity ? 'active' : ''}"></div>`
    ).join('');
    
    element.innerHTML = `
      <div class="session-header">
        <span class="session-type">${this.getTrainingTypeName(session.type)}</span>
        <span class="session-time">${session.time || '10:00'}</span>
      </div>
      <div class="session-details">${session.description || ''}</div>
      <div class="session-intensity">
        <div class="intensity-dots">${intensityDots}</div>
      </div>
      <div class="session-players">${session.players?.length || 0} giocatori</div>
    `;
    
    // Add click handler
    element.addEventListener('click', () => {
      this.editTrainingSession(session);
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
  
  showAddTrainingModal(day) {
    // Dispatch event to show training modal
    window.dispatchEvent(new CustomEvent('showAddTraining', {
      detail: {
        day,
        week: this.getWeekKey(this.currentWeek),
        callback: (trainingData) => this.addTrainingSession(day, trainingData)
      }
    }));
  }
  
  addTrainingSession(day, sessionData) {
    if (!this.schedule[day]) {
      this.schedule[day] = [];
    }
    
    // Check max sessions per day
    if (this.schedule[day].length >= this.options.maxSessionsPerDay) {
      this.showError(`Massimo ${this.options.maxSessionsPerDay} sessioni per giorno`);
      return;
    }
    
    // Add unique ID
    sessionData.id = Date.now() + Math.random();
    
    this.schedule[day].push(sessionData);
    this.renderSchedule();
    this.updateSummary();
    
    if (this.options.autoSave) {
      this.saveSchedule();
    }
    
    // Show success message
    this.showSuccess('Allenamento aggiunto con successo');
  }
  
  moveTrainingSession(sessionElement, targetDay) {
    const sessionId = sessionElement.dataset.sessionId;
    let session = null;
    let sourceDay = null;
    
    // Find and remove session from current day
    Object.keys(this.schedule).forEach(day => {
      const dayInt = parseInt(day);
      const sessionIndex = this.schedule[day].findIndex(s => s.id == sessionId);
      if (sessionIndex !== -1) {
        session = this.schedule[day].splice(sessionIndex, 1)[0];
        sourceDay = dayInt;
      }
    });
    
    if (session && sourceDay !== targetDay) {
      // Add to target day
      if (!this.schedule[targetDay]) {
        this.schedule[targetDay] = [];
      }
      
      // Check max sessions per day
      if (this.schedule[targetDay].length >= this.options.maxSessionsPerDay) {
        // Revert move
        this.schedule[sourceDay].push(session);
        this.showError(`Massimo ${this.options.maxSessionsPerDay} sessioni per giorno`);
        return;
      }
      
      this.schedule[targetDay].push(session);
      this.renderSchedule();
      this.updateSummary();
      
      if (this.options.autoSave) {
        this.saveSchedule();
      }
      
      this.showSuccess('Allenamento spostato');
    }
  }
  
  editTrainingSession(session) {
    // Dispatch event to show edit training modal
    window.dispatchEvent(new CustomEvent('editTraining', {
      detail: {
        session,
        callback: (updatedData) => this.updateTrainingSession(session.id, updatedData)
      }
    }));
  }
  
  updateTrainingSession(sessionId, updatedData) {
    Object.keys(this.schedule).forEach(day => {
      const sessionIndex = this.schedule[day].findIndex(s => s.id == sessionId);
      if (sessionIndex !== -1) {
        this.schedule[day][sessionIndex] = { ...this.schedule[day][sessionIndex], ...updatedData };
      }
    });
    
    this.renderSchedule();
    this.updateSummary();
    
    if (this.options.autoSave) {
      this.saveSchedule();
    }
  }
  
  autoSchedule() {
    // Simple auto-scheduling logic
    const trainingTypes = ['fitness', 'technical', 'tactical'];
    const daysToSchedule = [1, 2, 4]; // Tuesday, Wednesday, Friday
    
    // Clear current schedule
    this.schedule = {};
    
    daysToSchedule.forEach((day, index) => {
      this.schedule[day] = [{
        id: Date.now() + index,
        type: trainingTypes[index % trainingTypes.length],
        intensity: 3,
        time: '10:00',
        description: 'Allenamento programmato automaticamente',
        players: [] // Would be populated with actual player IDs
      }];
    });
    
    this.renderSchedule();
    this.updateSummary();
    
    if (this.options.autoSave) {
      this.saveSchedule();
    }
    
    this.showSuccess('Programma generato automaticamente');
  }
  
  clearSchedule() {
    if (confirm('Sei sicuro di voler cancellare tutto il programma della settimana?')) {
      this.schedule = {};
      this.renderSchedule();
      this.updateSummary();
      
      if (this.options.autoSave) {
        this.saveSchedule();
      }
      
      this.showSuccess('Programma cancellato');
    }
  }
  
  updateSummary() {
    let totalSessions = 0;
    let totalPlayers = 0;
    let totalIntensity = 0;
    let sessionCount = 0;
    
    Object.values(this.schedule).forEach(daySessions => {
      totalSessions += daySessions.length;
      daySessions.forEach(session => {
        totalPlayers += session.players?.length || 0;
        totalIntensity += session.intensity || 0;
        sessionCount++;
      });
    });
    
    const avgIntensity = sessionCount > 0 ? Math.round(totalIntensity / sessionCount) : 0;
    
    // Update summary stats
    this.element.querySelector('.total-sessions').textContent = totalSessions;
    this.element.querySelector('.total-players').textContent = totalPlayers;
    this.element.querySelector('.avg-intensity').textContent = avgIntensity;
    
    // Update workload indicator
    this.updateWorkloadIndicator(avgIntensity, totalSessions);
  }
  
  updateWorkloadIndicator(avgIntensity, totalSessions) {
    const workloadFill = this.element.querySelector('.workload-fill');
    const workloadText = this.element.querySelector('.workload-text');
    
    // Calculate workload percentage (0-100)
    const workloadPercentage = Math.min(100, (avgIntensity * totalSessions) / 15 * 100);
    
    workloadFill.style.width = `${workloadPercentage}%`;
    
    // Update workload text
    let workloadLevel = 'Basso';
    if (workloadPercentage > 80) workloadLevel = 'Molto Alto';
    else if (workloadPercentage > 60) workloadLevel = 'Alto';
    else if (workloadPercentage > 40) workloadLevel = 'Ottimale';
    else if (workloadPercentage > 20) workloadLevel = 'Moderato';
    
    workloadText.textContent = workloadLevel;
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
  
  async saveSchedule() {
    try {
      const weekKey = this.getWeekKey(this.currentWeek);
      // In a real app, this would save to game state
      await this.saveWeekSchedule(weekKey, this.schedule);
    } catch (error) {
      console.error('Error saving schedule:', error);
      this.showError('Errore nel salvataggio del programma');
    }
  }
  
  async saveWeekSchedule(weekKey, schedule) {
    // Mock save - in real app this would save to game state
    localStorage.setItem(`schedule_${weekKey}`, JSON.stringify(schedule));
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
    return this.schedule;
  }
  
  setSchedule(newSchedule) {
    this.schedule = newSchedule;
    this.renderSchedule();
    this.updateSummary();
  }
  
  getCurrentWeek() {
    return this.currentWeek;
  }
  
  goToWeek(date) {
    this.currentWeek = new Date(date);
    this.updateWeekDisplay();
    this.loadSchedule();
  }
}

// Auto-initialize weekly schedule grids
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.weekly-schedule-grid').forEach(grid => {
    if (!grid.dataset.initialized) {
      const options = JSON.parse(grid.dataset.options || '{}');
      new WeeklyScheduleGrid(grid, options);
      grid.dataset.initialized = 'true';
    }
  });
});
</script>