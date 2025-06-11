<div class="day-detail-modal modal" role="dialog" aria-labelledby="day-detail-title" aria-modal="true">
  <div class="modal-overlay" aria-hidden="true"></div>
  
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="day-detail-title" class="modal-title">Dettagli Giorno</h2>
      <button class="modal-close-btn" aria-label="Chiudi dettagli">
        ✕
      </button>
    </div>
    
    <div class="modal-body">
      <div class="day-overview">
        <div class="day-date-display">
          <div class="date-number"></div>
          <div class="date-month-year"></div>
        </div>
        
        <div class="day-status">
          <div class="status-indicator"></div>
          <div class="status-text"></div>
        </div>
      </div>
      
      <div class="day-events-list">
        <h3>Eventi Programmati</h3>
        <div class="events-container">
          <!-- Events will be populated dynamically -->
          <div class="empty-events" style="display: none;">
            <div class="empty-icon">📅</div>
            <p>Nessun evento programmato per questo giorno</p>
          </div>
        </div>
      </div>
      
      <div class="day-actions">
        <h3>Azioni Disponibili</h3>
        <div class="actions-grid">
          <button class="action-btn add-training-btn" aria-label="Aggiungi allenamento">
            <div class="action-icon">🏃</div>
            <div class="action-text">Allenamento</div>
          </button>
          
          <button class="action-btn view-match-btn" aria-label="Visualizza partita">
            <div class="action-icon">⚽</div>
            <div class="action-text">Partita</div>
          </button>
          
          <button class="action-btn add-rest-btn" aria-label="Aggiungi giorno di riposo">
            <div class="action-icon">🛌</div>
            <div class="action-text">Riposo</div>
          </button>
          
          <button class="action-btn add-note-btn" aria-label="Aggiungi nota">
            <div class="action-icon">📝</div>
            <div class="action-text">Nota</div>
          </button>
        </div>
      </div>
      
      <div class="day-notes">
        <h3>Note</h3>
        <textarea class="notes-input" placeholder="Aggiungi note per questo giorno..." rows="3" aria-label="Note per questo giorno"></textarea>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="footer-actions">
        <button class="button button-ghost cancel-btn">
          Annulla
        </button>
        <button class="button button-secondary advance-btn">
          ⏩ Avanza a Questo Giorno
        </button>
        <button class="button button-primary save-btn">
          Salva
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-modal">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Day Detail Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.day-detail-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.day-detail-modal.active {
  display: flex;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: var(--border);
  color: var(--text);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.day-overview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.day-date-display {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
}

.date-month-year {
  font-size: 14px;
  color: var(--text-muted);
}

.day-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-indicator.match-day {
  background: var(--error);
}

.status-indicator.training-day {
  background: var(--primary);
}

.status-indicator.rest-day {
  background: var(--success);
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.day-events-list {
  margin-bottom: 24px;
}

.day-events-list h3,
.day-actions h3,
.day-notes h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.events-container {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  min-height: 100px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  margin-bottom: 8px;
}

.event-item:last-child {
  margin-bottom: 0;
}

.event-time {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  min-width: 60px;
}

.event-details {
  flex: 1;
}

.event-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.event-description {
  font-size: 12px;
  color: var(--text-muted);
}

.event-actions {
  display: flex;
  gap: 8px;
}

.event-btn {
  padding: 4px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.event-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.event-btn.delete-btn:hover {
  background: var(--error);
  border-color: var(--error);
}

.empty-events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-events p {
  margin: 0;
  font-size: 14px;
}

.day-actions {
  margin-bottom: 24px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.action-icon {
  font-size: 24px;
}

.action-text {
  font-size: 12px;
  font-weight: 500;
}

.day-notes {
  margin-bottom: 16px;
}

.notes-input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  font-size: 14px;
  resize: vertical;
  transition: all 0.2s ease;
}

.notes-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--background);
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sponsor-slot-modal {
  position: absolute;
  bottom: 16px;
  left: 24px;
  width: 150px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .day-detail-modal {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .day-overview {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-modal {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class DayDetailModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onSave: null,
      onAdvance: null,
      ...options
    };
    
    this.currentDate = null;
    this.dayEvents = [];
    this.dayNotes = '';
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupAccessibility();
  }
  
  bindEvents() {
    // Close button
    this.element.querySelector('.modal-close-btn').addEventListener('click', () => {
      this.hide();
    });
    
    // Overlay click
    this.element.querySelector('.modal-overlay').addEventListener('click', () => {
      this.hide();
    });
    
    // Action buttons
    this.element.querySelector('.add-training-btn').addEventListener('click', () => {
      this.addTraining();
    });
    
    this.element.querySelector('.view-match-btn').addEventListener('click', () => {
      this.viewMatch();
    });
    
    this.element.querySelector('.add-rest-btn').addEventListener('click', () => {
      this.addRest();
    });
    
    this.element.querySelector('.add-note-btn').addEventListener('click', () => {
      this.focusNotes();
    });
    
    // Notes input
    this.element.querySelector('.notes-input').addEventListener('input', (e) => {
      this.dayNotes = e.target.value;
    });
    
    // Footer actions
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.hide();
    });
    
    this.element.querySelector('.advance-btn').addEventListener('click', () => {
      this.advanceToDay();
    });
    
    this.element.querySelector('.save-btn').addEventListener('click', () => {
      this.save();
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }
  
  setupAccessibility() {
    // Focus trap
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
  }
  
  show(date, events = [], notes = '') {
    this.currentDate = date;
    this.dayEvents = events;
    this.dayNotes = notes;
    
    this.updateDisplay();
    this.element.classList.add('active');
    this.isVisible = true;
    
    // Focus management
    this.element.querySelector('.modal-close-btn').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Dispatch show event
    this.element.dispatchEvent(new CustomEvent('modalShow', {
      detail: { date, events, notes }
    }));
  }
  
  hide() {
    this.element.classList.remove('active');
    this.isVisible = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Dispatch hide event
    this.element.dispatchEvent(new CustomEvent('modalHide'));
  }
  
  updateDisplay() {
    // Update date display
    const date = this.currentDate;
    const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    
    this.element.querySelector('.date-number').textContent = date.getDate();
    this.element.querySelector('.date-month-year').textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
    // Update modal title
    this.element.querySelector('.modal-title').textContent = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
    
    // Update day status
    this.updateDayStatus();
    
    // Update events list
    this.renderEvents();
    
    // Update notes
    this.element.querySelector('.notes-input').value = this.dayNotes;
    
    // Update action buttons
    this.updateActionButtons();
  }
  
  updateDayStatus() {
    const statusIndicator = this.element.querySelector('.status-indicator');
    const statusText = this.element.querySelector('.status-text');
    
    // Remove existing status classes
    statusIndicator.classList.remove('match-day', 'training-day', 'rest-day');
    
    // Determine day status based on events
    if (this.dayEvents.some(event => event.type === 'match')) {
      statusIndicator.classList.add('match-day');
      statusText.textContent = 'Giorno Partita';
    } else if (this.dayEvents.some(event => event.type === 'training')) {
      statusIndicator.classList.add('training-day');
      statusText.textContent = 'Giorno Allenamento';
    } else if (this.dayEvents.some(event => event.type === 'rest')) {
      statusIndicator.classList.add('rest-day');
      statusText.textContent = 'Giorno di Riposo';
    } else {
      statusText.textContent = 'Nessuna Attività';
    }
  }
  
  renderEvents() {
    const eventsContainer = this.element.querySelector('.events-container');
    const emptyEvents = this.element.querySelector('.empty-events');
    
    // Clear existing events
    eventsContainer.querySelectorAll('.event-item').forEach(item => item.remove());
    
    // Show empty state if no events
    if (this.dayEvents.length === 0) {
      emptyEvents.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show events
    emptyEvents.style.display = 'none';
    
    // Render events
    this.dayEvents.forEach(event => {
      const eventElement = this.createEventElement(event);
      eventsContainer.appendChild(eventElement);
    });
  }
  
  createEventElement(event) {
    const element = document.createElement('div');
    element.className = 'event-item';
    element.dataset.eventId = event.id;
    
    element.innerHTML = `
      <div class="event-time">${event.time || ''}</div>
      <div class="event-details">
        <div class="event-title">${event.title}</div>
        <div class="event-description">${event.description || ''}</div>
      </div>
      <div class="event-actions">
        <button class="event-btn edit-btn" aria-label="Modifica evento">
          ✏️
        </button>
        <button class="event-btn delete-btn" aria-label="Elimina evento">
          ✕
        </button>
      </div>
    `;
    
    // Add event listeners
    element.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.editEvent(event.id);
    });
    
    element.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteEvent(event.id);
    });
    
    return element;
  }
  
  updateActionButtons() {
    const viewMatchBtn = this.element.querySelector('.view-match-btn');
    const hasMatch = this.dayEvents.some(event => event.type === 'match');
    
    // Enable/disable view match button
    viewMatchBtn.disabled = !hasMatch;
    if (hasMatch) {
      viewMatchBtn.style.opacity = '';
      viewMatchBtn.style.cursor = '';
    } else {
      viewMatchBtn.style.opacity = '0.5';
      viewMatchBtn.style.cursor = 'not-allowed';
    }
  }
  
  addTraining() {
    // Dispatch add training event
    window.dispatchEvent(new CustomEvent('showAddTraining', {
      detail: {
        date: this.currentDate,
        callback: (trainingData) => {
          this.dayEvents.push({
            id: Date.now(),
            title: `Allenamento ${trainingData.type}`,
            description: trainingData.description || '',
            time: trainingData.time || '10:00',
            type: 'training',
            trainingData
          });
          
          this.updateDisplay();
        }
      }
    }));
  }
  
  viewMatch() {
    const match = this.dayEvents.find(event => event.type === 'match');
    if (!match) return;
    
    // Dispatch view match event
    window.dispatchEvent(new CustomEvent('viewMatch', {
      detail: { match }
    }));
  }
  
  addRest() {
    // Add rest day event
    this.dayEvents.push({
      id: Date.now(),
      title: 'Giorno di Riposo',
      description: 'Recupero programmato per la squadra',
      type: 'rest'
    });
    
    this.updateDisplay();
  }
  
  focusNotes() {
    this.element.querySelector('.notes-input').focus();
  }
  
  editEvent(eventId) {
    const event = this.dayEvents.find(e => e.id === eventId);
    if (!event) return;
    
    // Dispatch edit event based on type
    if (event.type === 'training') {
      window.dispatchEvent(new CustomEvent('editTraining', {
        detail: {
          event,
          callback: (updatedData) => {
            const index = this.dayEvents.findIndex(e => e.id === eventId);
            if (index !== -1) {
              this.dayEvents[index] = {
                ...this.dayEvents[index],
                title: `Allenamento ${updatedData.type}`,
                description: updatedData.description || '',
                time: updatedData.time || '10:00',
                trainingData: updatedData
              };
              
              this.updateDisplay();
            }
          }
        }
      }));
    } else {
      // Generic event edit
      const newTitle = prompt('Modifica titolo evento:', event.title);
      if (newTitle) {
        const index = this.dayEvents.findIndex(e => e.id === eventId);
        if (index !== -1) {
          this.dayEvents[index].title = newTitle;
          this.updateDisplay();
        }
      }
    }
  }
  
  deleteEvent(eventId) {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      this.dayEvents = this.dayEvents.filter(event => event.id !== eventId);
      this.updateDisplay();
    }
  }
  
  advanceToDay() {
    // Call advance callback if provided
    if (typeof this.options.onAdvance === 'function') {
      this.options.onAdvance(this.currentDate);
    }
    
    // Dispatch advance event
    this.element.dispatchEvent(new CustomEvent('advanceToDay', {
      detail: { date: this.currentDate }
    }));
    
    this.hide();
  }
  
  save() {
    const dayData = {
      date: this.currentDate,
      events: this.dayEvents,
      notes: this.dayNotes
    };
    
    // Call save callback if provided
    if (typeof this.options.onSave === 'function') {
      this.options.onSave(dayData);
    }
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveDay', {
      detail: dayData
    }));
    
    this.showSuccess('Dettagli giorno salvati');
    this.hide();
  }
  
  handleTabNavigation(e) {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  isOpen() {
    return this.isVisible;
  }
  
  getCurrentDate() {
    return this.currentDate;
  }
  
  getEvents() {
    return [...this.dayEvents];
  }
  
  getNotes() {
    return this.dayNotes;
  }
  
  setEvents(events) {
    this.dayEvents = events;
    if (this.isVisible) {
      this.updateDisplay();
    }
  }
  
  setNotes(notes) {
    this.dayNotes = notes;
    if (this.isVisible) {
      this.element.querySelector('.notes-input').value = notes;
    }
  }
}

// Auto-initialize day detail modals
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.day-detail-modal').forEach(modal => {
    if (!modal.dataset.initialized) {
      const options = JSON.parse(modal.dataset.options || '{}');
      new DayDetailModal(modal, options);
      modal.dataset.initialized = 'true';
    }
  });
});

// Global function to show day detail modal
window.showDayDetail = function(date, events = [], notes = '') {
  const modal = document.querySelector('.day-detail-modal');
  if (modal && modal.dayDetailModal) {
    modal.dayDetailModal.show(date, events, notes);
  }
};
</script>