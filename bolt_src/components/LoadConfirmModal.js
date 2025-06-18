export const template = `
<div class="load-confirm-modal modal" role="dialog" aria-labelledby="load-confirm-title" aria-modal="true">
  <div class="modal-overlay" aria-hidden="true"></div>
  
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="load-confirm-title" class="modal-title">Conferma Caricamento</h2>
      <button class="modal-close-btn" aria-label="Chiudi conferma">
        ✕
      </button>
    </div>
    
    <div class="modal-body">
      <div class="save-preview">
        <div class="save-info">
          <h3 class="save-name"></h3>
          <div class="save-meta">
            <div class="save-date"></div>
            <div class="save-team"></div>
          </div>
        </div>
        
        <div class="save-details">
          <div class="detail-item">
            <span class="detail-label">Data Gioco:</span>
            <span class="detail-value game-date"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Stagione:</span>
            <span class="detail-value season"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Budget:</span>
            <span class="detail-value budget"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Posizione:</span>
            <span class="detail-value position"></span>
          </div>
        </div>
      </div>
      
      <div class="warning-message">
        <div class="warning-icon">⚠️</div>
        <div class="warning-text">
          <p>Sei sicuro di voler caricare questo salvataggio?</p>
          <p>Tutti i progressi non salvati andranno persi.</p>
        </div>
      </div>
      
      <div class="current-save-info">
        <h4>Sessione Corrente</h4>
        <div class="current-save-details">
          <div class="detail-item">
            <span class="detail-label">Squadra:</span>
            <span class="detail-value current-team"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Data Gioco:</span>
            <span class="detail-value current-date"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Tempo di Gioco:</span>
            <span class="detail-value play-time"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="footer-actions">
        <button class="button button-ghost cancel-btn">
          Annulla
        </button>
        <button class="button button-secondary backup-btn">
          Crea Backup Prima
        </button>
        <button class="button button-primary confirm-btn">
          Conferma Caricamento
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-modal">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Load Confirm Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.load-confirm-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.load-confirm-modal.active {
  display: flex;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
}


.save-preview {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.save-info {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.save-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.save-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.save-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 12px;
  color: var(--text-muted);
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.warning-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid var(--warning);
  border-radius: 8px;
  margin-bottom: 20px;
}

.warning-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.warning-text {
  flex: 1;
}

.warning-text p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--text);
}

.warning-text p:last-child {
  margin-bottom: 0;
  font-weight: 500;
}

.current-save-info {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.current-save-info h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.current-save-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  .modal-content {
    max-height: 95vh;
  }
  
  .save-details,
  .current-save-details {
    grid-template-columns: 1fr;
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
`;

class LoadConfirmModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onConfirm: null,
      onCancel: null,
      onBackup: null,
      ...options
    };
    
    this.saveData = null;
    this.currentSaveData = null;
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
    
    // Cancel button
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.hide();
    });
    
    // Backup button
    this.element.querySelector('.backup-btn').addEventListener('click', () => {
      this.createBackup();
    });
    
    // Confirm button
    this.element.querySelector('.confirm-btn').addEventListener('click', () => {
      this.confirmLoad();
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
  
  show(saveData, currentSaveData) {
    this.saveData = saveData;
    this.currentSaveData = currentSaveData;
    
    this.updateDisplay();
    this.element.classList.add('active');
    this.isVisible = true;
    
    // Focus management
    this.element.querySelector('.modal-close-btn').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Dispatch show event
    this.element.dispatchEvent(new CustomEvent('modalShow', {
      detail: { saveData, currentSaveData }
    }));
  }
  
  hide() {
    this.element.classList.remove('active');
    this.isVisible = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Dispatch hide event
    this.element.dispatchEvent(new CustomEvent('modalHide'));
    
    // Call cancel callback if provided
    if (typeof this.options.onCancel === 'function') {
      this.options.onCancel();
    }
  }
  
  updateDisplay() {
    if (!this.saveData) return;
    
    // Update save info
    this.element.querySelector('.save-name').textContent = this.saveData.name || 'Salvataggio';
    
    const saveDate = new Date(this.saveData.timestamp);
    this.element.querySelector('.save-date').textContent = this.formatDate(saveDate);
    
    this.element.querySelector('.save-team').textContent = this.saveData.teamName || 'Team';
    
    // Update save details
    const gameDate = new Date(this.saveData.gameDate);
    this.element.querySelector('.game-date').textContent = this.formatGameDate(gameDate);
    this.element.querySelector('.season').textContent = this.saveData.season || '2024/2025';
    this.element.querySelector('.budget').textContent = this.formatCurrency(this.saveData.budget || 0);
    this.element.querySelector('.position').textContent = this.saveData.position || 'N/A';
    
    // Update current save info
    if (this.currentSaveData) {
      this.element.querySelector('.current-team').textContent = this.currentSaveData.teamName || 'Team';
      
      const currentGameDate = new Date(this.currentSaveData.gameDate);
      this.element.querySelector('.current-date').textContent = this.formatGameDate(currentGameDate);
      
      const playTime = this.formatPlayTime(this.currentSaveData.playTime || 0);
      this.element.querySelector('.play-time').textContent = playTime;
    } else {
      this.element.querySelector('.current-team').textContent = 'Nessuna sessione attiva';
      this.element.querySelector('.current-date').textContent = 'N/A';
      this.element.querySelector('.play-time').textContent = 'N/A';
    }
  }
  
  formatDate(date) {
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  formatGameDate(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  formatPlayTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  }
  
  createBackup() {
    // Call backup callback if provided
    if (typeof this.options.onBackup === 'function') {
      this.options.onBackup(this.currentSaveData);
    }
    
    // Dispatch backup event
    this.element.dispatchEvent(new CustomEvent('createBackup', {
      detail: { currentSaveData: this.currentSaveData }
    }));
    
    this.showSuccess('Backup creato con successo');
  }
  
  confirmLoad() {
    // Call confirm callback if provided
    if (typeof this.options.onConfirm === 'function') {
      this.options.onConfirm(this.saveData);
    }
    
    // Dispatch confirm event
    this.element.dispatchEvent(new CustomEvent('loadConfirmed', {
      detail: { saveData: this.saveData }
    }));
    
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
  
  getSaveData() {
    return this.saveData;
  }
  
  getCurrentSaveData() {
    return this.currentSaveData;
  }
}

// Global function to show load confirm modal
window.showLoadConfirm = function(saveData, currentSaveData) {
  const modal = document.querySelector('.load-confirm-modal');
  if (modal) {
    const instance = modal.loadConfirmModal || 
                    new LoadConfirmModal(modal);
    modal.loadConfirmModal = instance;
    instance.show(saveData, currentSaveData);
  }
};

export default LoadConfirmModal;