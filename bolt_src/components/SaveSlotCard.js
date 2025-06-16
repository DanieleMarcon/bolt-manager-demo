<div class="save-slot-card" data-slot-id="" data-slot-status="empty">
  <div class="slot-header">
    <div class="slot-number"></div>
    <div class="slot-status"></div>
  </div>
  
  <div class="slot-content">
    <div class="empty-slot-content">
      <div class="empty-icon">📁</div>
      <div class="empty-text">Slot Vuoto</div>
    </div>
    
    <div class="filled-slot-content" style="display: none;">
      <div class="save-info">
        <h3 class="save-name"></h3>
        <div class="save-meta">
          <div class="save-date"></div>
          <div class="save-team"></div>
        </div>
      </div>
      
      <div class="save-preview">
        <div class="preview-item">
          <span class="preview-label">Data Gioco:</span>
          <span class="preview-value game-date"></span>
        </div>
        <div class="preview-item">
          <span class="preview-label">Stagione:</span>
          <span class="preview-value season"></span>
        </div>
        <div class="preview-item">
          <span class="preview-label">Budget:</span>
          <span class="preview-value budget"></span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="slot-actions">
    <button class="slot-btn save-btn" aria-label="Salva in questo slot">
      💾 Salva
    </button>
    <button class="slot-btn load-btn" aria-label="Carica questo salvataggio" disabled>
      📂 Carica
    </button>
    <button class="slot-btn delete-btn" aria-label="Elimina questo salvataggio" disabled>
      🗑️ Elimina
    </button>
  </div>
  
  <div class="slot-overlay" style="display: none;">
    <div class="overlay-content">
      <div class="overlay-icon"></div>
      <div class="overlay-text"></div>
    </div>
  </div>
</div>

<style>
.save-slot-card {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  position: relative;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.save-slot-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.save-slot-card[data-slot-status="active"] {
  border-color: var(--primary);
  background: linear-gradient(135deg, var(--surface) 0%, rgba(37, 99, 235, 0.05) 100%);
}

.save-slot-card[data-slot-status="backup"] {
  border-color: var(--warning);
  background: linear-gradient(135deg, var(--surface) 0%, rgba(245, 158, 11, 0.05) 100%);
}

.slot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.slot-number {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.slot-status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.save-slot-card[data-slot-status="empty"] .slot-status {
  background: var(--border);
  color: var(--text-muted);
}

.save-slot-card[data-slot-status="active"] .slot-status {
  background: var(--primary);
  color: white;
}

.save-slot-card[data-slot-status="backup"] .slot-status {
  background: var(--warning);
  color: white;
}

.slot-content {
  flex: 1;
  margin-bottom: 16px;
}

.empty-slot-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.5;
}

.empty-text {
  font-size: 14px;
  font-weight: 500;
}

.filled-slot-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.save-info {
  margin-bottom: 12px;
}

.save-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.save-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.save-preview {
  background: var(--background);
  border-radius: 6px;
  padding: 12px;
  flex: 1;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.preview-item:last-child {
  margin-bottom: 0;
}

.preview-label {
  color: var(--text-muted);
}

.preview-value {
  font-weight: 500;
  color: var(--text);
}

.slot-actions {
  display: flex;
  gap: 8px;
}

.slot-btn {
  flex: 1;
  padding: 6px 0;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.slot-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.slot-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-btn:hover:not(:disabled) {
  background: var(--error);
  border-color: var(--error);
}

.slot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 16px;
}

.overlay-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.overlay-text {
  font-size: 14px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .slot-actions {
    flex-direction: column;
  }
}
</style>

<script>
class SaveSlotCard {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      slotId: 1,
      onSave: null,
      onLoad: null,
      onDelete: null,
      ...options
    };
    
    this.saveData = null;
    this.slotStatus = 'empty';
    
    this.init();
  }
  
  init() {
    this.setSlotId(this.options.slotId);
    this.bindEvents();
    this.loadSlotData();
  }
  
  setSlotId(id) {
    this.options.slotId = id;
    this.element.dataset.slotId = id;
    this.element.querySelector('.slot-number').textContent = `Slot ${id}`;
  }
  
  bindEvents() {
    // Save button
    this.element.querySelector('.save-btn').addEventListener('click', () => {
      this.saveToSlot();
    });
    
    // Load button
    this.element.querySelector('.load-btn').addEventListener('click', () => {
      this.loadFromSlot();
    });
    
    // Delete button
    this.element.querySelector('.delete-btn').addEventListener('click', () => {
      this.deleteSlot();
    });
  }
  
  loadSlotData() {
    // In a real app, this would load from localStorage or game state
    try {
      const slotKey = `bolt_save_slot_${this.options.slotId}`;
      const saveJson = localStorage.getItem(slotKey);
      
      if (saveJson) {
        this.saveData = JSON.parse(saveJson);
        this.slotStatus = this.saveData.status || 'active';
        this.updateSlotDisplay();
      } else {
        this.slotStatus = 'empty';
        this.updateSlotDisplay();
      }
    } catch (error) {
      console.error('Error loading slot data:', error);
      this.slotStatus = 'empty';
      this.updateSlotDisplay();
    }
  }
  
  updateSlotDisplay() {
    // Update slot status
    this.element.dataset.slotStatus = this.slotStatus;
    
    const statusText = {
      empty: 'Vuoto',
      active: 'Attivo',
      backup: 'Backup'
    };
    
    this.element.querySelector('.slot-status').textContent = statusText[this.slotStatus] || 'Vuoto';
    
    // Update content visibility
    const emptyContent = this.element.querySelector('.empty-slot-content');
    const filledContent = this.element.querySelector('.filled-slot-content');
    
    if (this.slotStatus === 'empty') {
      emptyContent.style.display = 'flex';
      filledContent.style.display = 'none';
    } else {
      emptyContent.style.display = 'none';
      filledContent.style.display = 'flex';
      this.updateSaveInfo();
    }
    
    // Update button states
    this.element.querySelector('.load-btn').disabled = this.slotStatus === 'empty';
    this.element.querySelector('.delete-btn').disabled = this.slotStatus === 'empty';
  }
  
  updateSaveInfo() {
    if (!this.saveData) return;
    
    // Update save name
    this.element.querySelector('.save-name').textContent = this.saveData.name || `Salvataggio ${this.options.slotId}`;
    
    // Update save date
    const saveDate = new Date(this.saveData.timestamp);
    this.element.querySelector('.save-date').textContent = this.formatDate(saveDate);
    
    // Update save team
    this.element.querySelector('.save-team').textContent = this.saveData.teamName || 'Team';
    
    // Update preview values
    const gameDate = new Date(this.saveData.gameDate);
    this.element.querySelector('.game-date').textContent = this.formatGameDate(gameDate);
    this.element.querySelector('.season').textContent = this.saveData.season || '2024/2025';
    this.element.querySelector('.budget').textContent = this.formatCurrency(this.saveData.budget || 0);
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
  
  saveToSlot() {
    if (this.slotStatus !== 'empty' && !confirm('Sovrascrivere il salvataggio esistente?')) {
      return;
    }
    
    this.showOverlay('saving', 'Salvataggio in corso...');
    
    // Simulate save process
    setTimeout(() => {
      this.performSave();
    }, 800);
  }
  
  performSave() {
    try {
      // In a real app, this would call a game flow to save the game state
      const saveData = {
        id: this.options.slotId,
        name: `Salvataggio ${this.options.slotId}`,
        timestamp: new Date().toISOString(),
        gameDate: new Date().toISOString(),
        teamName: 'AC Milan',
        season: '2024/2025',
        budget: 50000000,
        status: 'active'
      };
      
      // Store save data
      const slotKey = `bolt_save_slot_${this.options.slotId}`;
      localStorage.setItem(slotKey, JSON.stringify(saveData));
      
      this.saveData = saveData;
      this.slotStatus = 'active';
      this.updateSlotDisplay();
      
      // Call save callback if provided
      if (typeof this.options.onSave === 'function') {
        this.options.onSave(saveData);
      }
      
      // Dispatch save event
      this.element.dispatchEvent(new CustomEvent('slotSaved', {
        detail: { 
          slotId: this.options.slotId,
          saveData
        }
      }));
      
      this.hideOverlay();
      this.showSuccess('Gioco salvato con successo');
    } catch (error) {
      console.error('Error saving game:', error);
      this.hideOverlay();
      this.showError('Errore durante il salvataggio');
    }
  }
  
  loadFromSlot() {
    if (!this.saveData) return;
    
    if (confirm('Sei sicuro di voler caricare questo salvataggio? I progressi non salvati andranno persi.')) {
      this.showOverlay('loading', 'Caricamento in corso...');
      
      // Simulate load process
      setTimeout(() => {
        this.performLoad();
      }, 800);
    }
  }
  
  performLoad() {
    try {
      // In a real app, this would call a game flow to load the game state
      
      // Call load callback if provided
      if (typeof this.options.onLoad === 'function') {
        this.options.onLoad(this.saveData);
      }
      
      // Dispatch load event
      this.element.dispatchEvent(new CustomEvent('slotLoaded', {
        detail: { 
          slotId: this.options.slotId,
          saveData: this.saveData
        }
      }));
      
      this.hideOverlay();
      this.showSuccess('Gioco caricato con successo');
    } catch (error) {
      console.error('Error loading game:', error);
      this.hideOverlay();
      this.showError('Errore durante il caricamento');
    }
  }
  
  deleteSlot() {
    if (!this.saveData) return;
    
    if (confirm('Sei sicuro di voler eliminare questo salvataggio? Questa azione non può essere annullata.')) {
      this.showOverlay('deleting', 'Eliminazione in corso...');
      
      // Simulate delete process
      setTimeout(() => {
        this.performDelete();
      }, 500);
    }
  }
  
  performDelete() {
    try {
      // In a real app, this would call a game flow to delete the save
      const slotKey = `bolt_save_slot_${this.options.slotId}`;
      localStorage.removeItem(slotKey);
      
      this.saveData = null;
      this.slotStatus = 'empty';
      this.updateSlotDisplay();
      
      // Call delete callback if provided
      if (typeof this.options.onDelete === 'function') {
        this.options.onDelete(this.options.slotId);
      }
      
      // Dispatch delete event
      this.element.dispatchEvent(new CustomEvent('slotDeleted', {
        detail: { slotId: this.options.slotId }
      }));
      
      this.hideOverlay();
      this.showSuccess('Salvataggio eliminato');
    } catch (error) {
      console.error('Error deleting save:', error);
      this.hideOverlay();
      this.showError('Errore durante l\'eliminazione');
    }
  }
  
  showOverlay(type, text) {
    const overlay = this.element.querySelector('.slot-overlay');
    const overlayIcon = overlay.querySelector('.overlay-icon');
    const overlayText = overlay.querySelector('.overlay-text');
    
    // Set icon based on type
    switch (type) {
      case 'saving':
        overlayIcon.textContent = '💾';
        break;
      case 'loading':
        overlayIcon.textContent = '📂';
        break;
      case 'deleting':
        overlayIcon.textContent = '🗑️';
        break;
      default:
        overlayIcon.textContent = '⏳';
    }
    
    overlayText.textContent = text;
    overlay.style.display = 'flex';
  }
  
  hideOverlay() {
    this.element.querySelector('.slot-overlay').style.display = 'none';
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
  getSlotId() {
    return this.options.slotId;
  }
  
  getSlotStatus() {
    return this.slotStatus;
  }
  
  getSaveData() {
    return this.saveData;
  }
  
  setSaveData(data) {
    this.saveData = data;
    
    if (data) {
      this.slotStatus = data.status || 'active';
      
      // Store save data
      const slotKey = `bolt_save_slot_${this.options.slotId}`;
      localStorage.setItem(slotKey, JSON.stringify(data));
    } else {
      this.slotStatus = 'empty';
      
      // Remove save data
      const slotKey = `bolt_save_slot_${this.options.slotId}`;
      localStorage.removeItem(slotKey);
    }
    
    this.updateSlotDisplay();
  }
  
  setSlotStatus(status) {
    if (['empty', 'active', 'backup'].includes(status)) {
      this.slotStatus = status;
      
      if (this.saveData) {
        this.saveData.status = status;
        
        // Update stored data
        const slotKey = `bolt_save_slot_${this.options.slotId}`;
        localStorage.setItem(slotKey, JSON.stringify(this.saveData));
      }
      
      this.updateSlotDisplay();
    }
  }
  
  refresh() {
    this.loadSlotData();
  }
}

// Auto-initialize save slot cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.save-slot-card').forEach(card => {
    if (!card.dataset.initialized) {
      const options = {
        slotId: parseInt(card.dataset.slotId) || 1
      };
      new SaveSlotCard(card, options);
      card.dataset.initialized = 'true';
    }
  });
});
</script>