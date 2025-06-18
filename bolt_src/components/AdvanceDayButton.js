export const template = `
<div class="advance-day-button">
  <button class="advance-btn" aria-label="Avanza al giorno successivo">
    <div class="btn-content">
      <div class="btn-icon">⏩</div>
      <div class="btn-text">Avanza Giorno</div>
    </div>
    <div class="btn-date"></div>
  </button>
  
  <div class="advance-confirmation" style="display: none;">
    <div class="confirmation-header">
      <h4>Conferma Avanzamento</h4>
      <button class="close-confirmation-btn" aria-label="Chiudi conferma">✕</button>
    </div>
    
    <div class="confirmation-content">
      <p class="confirmation-text">Sei sicuro di voler avanzare al giorno successivo?</p>
      
      <div class="pending-items">
        <h5>Attività in Sospeso:</h5>
        <ul class="pending-list">
          <!-- Pending items will be populated dynamically -->
        </ul>
      </div>
      
      <div class="upcoming-events">
        <h5>Eventi Imminenti:</h5>
        <ul class="events-list">
          <!-- Upcoming events will be populated dynamically -->
        </ul>
      </div>
    </div>
    
    <div class="confirmation-actions">
      <button class="button button-ghost cancel-advance-btn">
        Annulla
      </button>
      <button class="button button-primary confirm-advance-btn">
        ✓ Conferma Avanzamento
      </button>
    </div>
  </div>
  
  <div class="advance-progress" style="display: none;">
    <div class="progress-text">Avanzamento in corso...</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <div class="progress-status">Elaborazione eventi...</div>
  </div>
</div>
<style>
.advance-day-button {
  position: relative;
}

.advance-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.advance-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  font-size: 18px;
}

.btn-text {
  font-size: 16px;
  font-weight: 600;
}

.btn-date {
  font-size: 12px;
  opacity: 0.9;
}

.advance-confirmation {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 100;
  padding: 16px;
}

.confirmation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.confirmation-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.close-confirmation-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-confirmation-btn:hover {
  background: var(--border);
  color: var(--text);
}

.confirmation-content {
  margin-bottom: 16px;
}

.confirmation-text {
  font-size: 14px;
  color: var(--text);
  margin: 0 0 16px 0;
}

.pending-items,
.upcoming-events {
  margin-bottom: 12px;
}

.pending-items h5,
.upcoming-events h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.pending-list,
.events-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pending-list li,
.events-list li {
  font-size: 12px;
  color: var(--text);
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.pending-list li::before,
.events-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 600;
}

.confirmation-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.advance-progress {
  margin-top: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 8px;
  text-align: center;
}

.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #1e40af);
  border-radius: 4px;
  width: 0%;
  transition: width 0.3s ease;
}

.progress-status {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .advance-confirmation {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>
`;

class AdvanceDayButton {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onAdvance: null,
      confirmationRequired: true,
      showProgress: true,
      ...options
    };
    
    this.currentDate = new Date();
    this.nextDate = new Date(this.currentDate);
    this.nextDate.setDate(this.nextDate.getDate() + 1);
    
    this.pendingItems = [];
    this.upcomingEvents = [];
    this.isConfirmationOpen = false;
    
    this.init();
  }
  
  init() {
    this.updateDateDisplay();
    this.bindEvents();
  }
  
  updateDateDisplay() {
    const dateElement = this.element.querySelector('.btn-date');
    const nextDate = this.nextDate;
    
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const monthNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    
    const dayName = dayNames[nextDate.getDay()];
    const day = nextDate.getDate();
    const month = monthNames[nextDate.getMonth()];
    
    dateElement.textContent = `${dayName} ${day} ${month}`;
  }
  
  bindEvents() {
    // Advance button
    this.element.querySelector('.advance-btn').addEventListener('click', () => {
      if (this.options.confirmationRequired) {
        this.showConfirmation();
      } else {
        this.advanceDay();
      }
    });
    
    // Close confirmation button
    this.element.querySelector('.close-confirmation-btn').addEventListener('click', () => {
      this.hideConfirmation();
    });
    
    // Cancel advance button
    this.element.querySelector('.cancel-advance-btn').addEventListener('click', () => {
      this.hideConfirmation();
    });
    
    // Confirm advance button
    this.element.querySelector('.confirm-advance-btn').addEventListener('click', () => {
      this.hideConfirmation();
      this.advanceDay();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isConfirmationOpen && !this.element.contains(e.target)) {
        this.hideConfirmation();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isConfirmationOpen) {
        this.hideConfirmation();
      }
    });
  }
  
  showConfirmation() {
    const confirmation = this.element.querySelector('.advance-confirmation');
    confirmation.style.display = 'block';
    this.isConfirmationOpen = true;
    
    // Update pending items and upcoming events
    this.updatePendingItems();
    this.updateUpcomingEvents();
    
    // Focus first element for keyboard navigation
    setTimeout(() => {
      confirmation.querySelector('.close-confirmation-btn').focus();
    }, 10);
  }
  
  hideConfirmation() {
    this.element.querySelector('.advance-confirmation').style.display = 'none';
    this.isConfirmationOpen = false;
  }
  
  updatePendingItems() {
    const pendingList = this.element.querySelector('.pending-list');
    pendingList.innerHTML = '';
    
    if (this.pendingItems.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nessuna attività in sospeso';
      pendingList.appendChild(li);
      return;
    }
    
    this.pendingItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.description;
      pendingList.appendChild(li);
    });
  }
  
  updateUpcomingEvents() {
    const eventsList = this.element.querySelector('.events-list');
    eventsList.innerHTML = '';
    
    if (this.upcomingEvents.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nessun evento imminente';
      eventsList.appendChild(li);
      return;
    }
    
    this.upcomingEvents.forEach(event => {
      const li = document.createElement('li');
      li.textContent = event.title;
      eventsList.appendChild(li);
    });
  }
  
  advanceDay() {
    if (this.options.showProgress) {
      this.showProgress();
      
      // Simulate progress
      let progress = 0;
      const progressFill = this.element.querySelector('.progress-fill');
      const progressStatus = this.element.querySelector('.progress-status');
      const progressInterval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        
        if (progress === 25) {
          progressStatus.textContent = 'Aggiornamento calendario...';
        } else if (progress === 50) {
          progressStatus.textContent = 'Elaborazione allenamenti...';
        } else if (progress === 75) {
          progressStatus.textContent = 'Aggiornamento giocatori...';
        }
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          progressStatus.textContent = 'Completato!';
          
          setTimeout(() => {
            this.hideProgress();
            this.completeAdvance();
          }, 500);
        }
      }, 50);
    } else {
      this.completeAdvance();
    }
  }
  
  showProgress() {
    const progressElement = this.element.querySelector('.advance-progress');
    progressElement.style.display = 'block';
    
    // Reset progress
    this.element.querySelector('.progress-fill').style.width = '0%';
    this.element.querySelector('.progress-status').textContent = 'Elaborazione eventi...';
  }
  
  hideProgress() {
    this.element.querySelector('.advance-progress').style.display = 'none';
  }
  
  completeAdvance() {
    // Update current date
    this.currentDate = new Date(this.nextDate);
    this.nextDate = new Date(this.currentDate);
    this.nextDate.setDate(this.nextDate.getDate() + 1);
    
    // Update date display
    this.updateDateDisplay();
    
    // Call advance callback if provided
    if (typeof this.options.onAdvance === 'function') {
      this.options.onAdvance(this.currentDate);
    }
    
    // Dispatch advance event
    this.element.dispatchEvent(new CustomEvent('dayAdvanced', {
      detail: { 
        date: this.currentDate,
        nextDate: this.nextDate
      }
    }));
    
    this.showSuccess('Avanzato al giorno successivo');
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getCurrentDate() {
    return new Date(this.currentDate);
  }
  
  getNextDate() {
    return new Date(this.nextDate);
  }
  
  setCurrentDate(date) {
    this.currentDate = new Date(date);
    this.nextDate = new Date(this.currentDate);
    this.nextDate.setDate(this.nextDate.getDate() + 1);
    this.updateDateDisplay();
  }
  
  setPendingItems(items) {
    this.pendingItems = items;
    if (this.isConfirmationOpen) {
      this.updatePendingItems();
    }
  }
  
  setUpcomingEvents(events) {
    this.upcomingEvents = events;
    if (this.isConfirmationOpen) {
      this.updateUpcomingEvents();
    }
  }
  
  disable() {
    const advanceBtn = this.element.querySelector('.advance-btn');
    advanceBtn.disabled = true;
    advanceBtn.style.opacity = '0.5';
    advanceBtn.style.cursor = 'not-allowed';
  }
  
  enable() {
    const advanceBtn = this.element.querySelector('.advance-btn');
    advanceBtn.disabled = false;
    advanceBtn.style.opacity = '';
    advanceBtn.style.cursor = '';
  }
}

export default AdvanceDayButton;