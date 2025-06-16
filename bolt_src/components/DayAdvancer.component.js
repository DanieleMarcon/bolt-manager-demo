/**
 * DayAdvancer Component
 * Used in: CalendarView.page.js
 * Expected data: { currentDate, onAdvance }
 */

export default class DayAdvancer {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.currentDate = props.currentDate || new Date();
    this.onAdvance = props.onAdvance || (() => {});
    this.onAdvanceToDate = props.onAdvanceToDate || (() => {});
    this.isAdvancing = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="day-advancer">
        <div class="advancer-header">
          <h4>Avanzamento Temporale</h4>
          <div class="current-date">
            <span class="date-label">Data Attuale:</span>
            <span class="date-value">${this.formatDate(this.currentDate)}</span>
          </div>
        </div>
        
        <div class="advance-options">
          <div class="quick-advance">
            <h5>Avanzamento Rapido</h5>
            <div class="quick-buttons">
              <button class="advance-btn" data-days="1" ${this.isAdvancing ? 'disabled' : ''}>
                <span class="btn-icon">📅</span>
                <span class="btn-text">+1 Giorno</span>
              </button>
              <button class="advance-btn" data-days="7" ${this.isAdvancing ? 'disabled' : ''}>
                <span class="btn-icon">📆</span>
                <span class="btn-text">+1 Settimana</span>
              </button>
              <button class="advance-btn" data-days="30" ${this.isAdvancing ? 'disabled' : ''}>
                <span class="btn-icon">🗓️</span>
                <span class="btn-text">+1 Mese</span>
              </button>
            </div>
          </div>
          
          <div class="custom-advance">
            <h5>Avanzamento Personalizzato</h5>
            <div class="custom-controls">
              <div class="input-group">
                <label for="customDays">Giorni:</label>
                <input type="number" id="customDays" min="1" max="365" value="1" class="days-input">
              </div>
              <button class="advance-btn custom-advance-btn" ${this.isAdvancing ? 'disabled' : ''}>
                <span class="btn-icon">⏩</span>
                <span class="btn-text">Avanza</span>
              </button>
            </div>
          </div>
          
          <div class="date-advance">
            <h5>Avanza a Data Specifica</h5>
            <div class="date-controls">
              <input type="date" id="targetDate" class="date-input" min="${this.formatDateInput(this.currentDate)}">
              <button class="advance-btn date-advance-btn" ${this.isAdvancing ? 'disabled' : ''}>
                <span class="btn-icon">🎯</span>
                <span class="btn-text">Vai alla Data</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="advance-preview">
          <h5>Anteprima Eventi</h5>
          <div class="preview-content" id="eventsPreview">
            <p class="preview-placeholder">Seleziona un periodo per vedere gli eventi futuri</p>
          </div>
        </div>
        
        <div class="advance-warnings">
          <div class="warning-item">
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">L'avanzamento temporale è irreversibile</span>
          </div>
          <div class="warning-item">
            <span class="warning-icon">💾</span>
            <span class="warning-text">Assicurati di aver salvato prima di avanzare</span>
          </div>
        </div>
        
        <div class="advance-progress" style="display: none;">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
          </div>
          <div class="progress-text">Avanzamento in corso...</div>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  bindEvents() {
    // Quick advance buttons
    const quickButtons = this.container.querySelectorAll('.advance-btn[data-days]');
    quickButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const days = parseInt(btn.dataset.days);
        this.showAdvanceConfirmation(days);
      });
    });

    // Custom advance
    const customAdvanceBtn = this.container.querySelector('.custom-advance-btn');
    customAdvanceBtn?.addEventListener('click', () => {
      const daysInput = this.container.querySelector('#customDays');
      const days = parseInt(daysInput.value) || 1;
      this.showAdvanceConfirmation(days);
    });

    // Date advance
    const dateAdvanceBtn = this.container.querySelector('.date-advance-btn');
    dateAdvanceBtn?.addEventListener('click', () => {
      const dateInput = this.container.querySelector('#targetDate');
      const targetDate = new Date(dateInput.value);
      
      if (targetDate <= this.currentDate) {
        this.showToast('La data selezionata deve essere futura', 'error');
        return;
      }
      
      const daysDiff = Math.ceil((targetDate - this.currentDate) / (1000 * 60 * 60 * 24));
      this.showAdvanceConfirmation(daysDiff, targetDate);
    });

    // Preview events on input change
    const daysInput = this.container.querySelector('#customDays');
    const dateInput = this.container.querySelector('#targetDate');
    
    daysInput?.addEventListener('input', () => this.updatePreview(parseInt(daysInput.value) || 1));
    dateInput?.addEventListener('change', () => {
      const targetDate = new Date(dateInput.value);
      if (targetDate > this.currentDate) {
        const days = Math.ceil((targetDate - this.currentDate) / (1000 * 60 * 60 * 24));
        this.updatePreview(days);
      }
    });
  }

  showAdvanceConfirmation(days, targetDate = null) {
    const finalDate = targetDate || new Date(this.currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const eventsPreview = this.generateEventsPreview(days);
    
    const confirmMessage = `
      Confermi l'avanzamento di ${days} giorno${days > 1 ? 'i' : ''}?
      
      Data finale: ${this.formatDate(finalDate)}
      
      Eventi previsti:
      ${eventsPreview.map(event => `• ${event.date}: ${event.description}`).join('\n')}
      
      Questa operazione non può essere annullata.
    `;
    
    if (confirm(confirmMessage)) {
      this.executeAdvance(days, targetDate);
    }
  }

  async executeAdvance(days, targetDate = null) {
    this.isAdvancing = true;
    this.showProgress(true);
    
    try {
      // Simulate advance process with progress updates
      for (let i = 0; i <= days; i++) {
        const progress = (i / days) * 100;
        this.updateProgress(progress, `Avanzamento giorno ${i}/${days}...`);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Update current date
      if (targetDate) {
        this.currentDate = new Date(targetDate);
      } else {
        this.currentDate = new Date(this.currentDate.getTime() + (days * 24 * 60 * 60 * 1000));
      }
      
      // Call the advance callback
      this.onAdvance(days, this.currentDate);
      
      this.showToast(`Avanzamento completato: ${days} giorno${days > 1 ? 'i' : ''}`, 'success');
      
    } catch (error) {
      console.error('Error during advance:', error);
      this.showToast('Errore durante l\'avanzamento', 'error');
    } finally {
      this.isAdvancing = false;
      this.showProgress(false);
      this.render(); // Re-render with new date
    }
  }

  updatePreview(days) {
    const previewContainer = this.container.querySelector('#eventsPreview');
    const events = this.generateEventsPreview(days);
    
    if (events.length === 0) {
      previewContainer.innerHTML = '<p class="preview-placeholder">Nessun evento previsto nel periodo selezionato</p>';
      return;
    }
    
    previewContainer.innerHTML = `
      <div class="events-preview-list">
        ${events.map(event => `
          <div class="preview-event ${event.type}">
            <span class="event-date">${event.date}</span>
            <span class="event-description">${event.description}</span>
            <span class="event-type">${this.getEventTypeLabel(event.type)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  generateEventsPreview(days) {
    const events = [];
    const startDate = new Date(this.currentDate);
    
    for (let i = 1; i <= Math.min(days, 30); i++) {
      const eventDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      
      // Generate random events (in a real app, this would come from the game state)
      if (Math.random() < 0.3) { // 30% chance of event per day
        const eventTypes = ['match', 'training', 'transfer', 'injury', 'news'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        let description = '';
        switch (eventType) {
          case 'match':
            description = `Partita vs ${['Juventus', 'Inter', 'Roma', 'Napoli'][Math.floor(Math.random() * 4)]}`;
            break;
          case 'training':
            description = 'Sessione di allenamento programmata';
            break;
          case 'transfer':
            description = 'Scadenza trattativa di mercato';
            break;
          case 'injury':
            description = 'Rientro giocatore da infortunio';
            break;
          case 'news':
            description = 'Conferenza stampa programmata';
            break;
        }
        
        events.push({
          date: this.formatDateShort(eventDate),
          description,
          type: eventType
        });
      }
    }
    
    return events.slice(0, 10); // Limit to 10 events for preview
  }

  getEventTypeLabel(type) {
    const labels = {
      'match': 'Partita',
      'training': 'Allenamento',
      'transfer': 'Mercato',
      'injury': 'Infortunio',
      'news': 'Notizie'
    };
    
    return labels[type] || type;
  }

  showProgress(show) {
    const progressContainer = this.container.querySelector('.advance-progress');
    const buttons = this.container.querySelectorAll('.advance-btn');
    
    progressContainer.style.display = show ? 'block' : 'none';
    
    buttons.forEach(btn => {
      btn.disabled = show;
    });
  }

  updateProgress(percentage, text) {
    const progressFill = this.container.querySelector('.progress-fill');
    const progressText = this.container.querySelector('.progress-text');
    
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
      progressText.textContent = text;
    }
  }

  formatDate(date) {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateShort(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  formatDateInput(date) {
    return date.toISOString().split('T')[0];
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  setCurrentDate(date) {
    this.currentDate = new Date(date);
    this.render();
  }

  getCurrentDate() {
    return new Date(this.currentDate);
  }
}