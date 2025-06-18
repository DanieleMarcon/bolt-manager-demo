export const template = `
<div class="quick-save-button">
  <button class="save-btn" aria-label="Salvataggio rapido">
    <div class="btn-icon">💾</div>
    <div class="btn-text">Salva</div>
  </button>
  
  <div class="save-dropdown" style="display: none;">
    <div class="dropdown-header">
      <h4>Salvataggio Rapido</h4>
      <button class="close-dropdown-btn" aria-label="Chiudi menu">✕</button>
    </div>
    
    <div class="save-slots">
      <div class="slot-item autosave-slot">
        <div class="slot-info">
          <div class="slot-name">Autosave</div>
          <div class="slot-date"></div>
        </div>
        <button class="slot-btn load-btn" aria-label="Carica autosave">
          📂 Carica
        </button>
      </div>
      
      <div class="slot-item quicksave-slot">
        <div class="slot-info">
          <div class="slot-name">Quicksave</div>
          <div class="slot-date"></div>
        </div>
        <div class="slot-actions">
          <button class="slot-btn save-slot-btn" aria-label="Salva in quicksave">
            💾 Salva
          </button>
          <button class="slot-btn load-slot-btn" aria-label="Carica quicksave">
            📂 Carica
          </button>
        </div>
      </div>
    </div>
    
    <div class="save-actions">
      <button class="action-btn autosave-toggle-btn" aria-pressed="true">
        <span class="toggle-indicator"></span>
        <span>Autosave</span>
      </button>
      <button class="action-btn manage-saves-btn">
        ⚙️ Gestisci Salvataggi
      </button>
    </div>
  </div>
  
  <div class="save-progress" style="display: none;">
    <div class="progress-text">Salvataggio in corso...</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>
<style>
.quick-save-button {
  position: relative;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--secondary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 14px;
  font-weight: 500;
}

.save-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 280px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 100;
  padding: 16px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.dropdown-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.close-dropdown-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-dropdown-btn:hover {
  background: var(--border);
  color: var(--text);
}

.save-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.slot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.slot-info {
  flex: 1;
}

.slot-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.slot-date {
  font-size: 11px;
  color: var(--text-muted);
}

.slot-actions {
  display: flex;
  gap: 6px;
}

.slot-btn {
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.slot-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.save-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-btn {
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.toggle-indicator {
  width: 16px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  position: relative;
}

.toggle-indicator::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 12px;
  height: 12px;
  background: var(--text-muted);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.autosave-toggle-btn[aria-pressed="true"] .toggle-indicator::before {
  left: 4px;
  background: var(--success);
}

.save-progress {
  margin-top: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
}

.progress-text {
  font-size: 12px;
  color: var(--text);
  margin-bottom: 8px;
  text-align: center;
}

.progress-bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary), #059669);
  border-radius: 3px;
  width: 0%;
  transition: width 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .save-dropdown {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 280px;
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>
`;

class QuickSaveButton {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onSave: null,
      onLoad: null,
      autoSaveEnabled: true,
      ...options
    };
    
    this.isDropdownOpen = false;
    this.autoSaveData = null;
    this.quickSaveData = null;
    
    this.init();
  }
  
  init() {
    this.loadSaveData();
    this.updateSaveSlots();
    this.bindEvents();
  }
  
  loadSaveData() {
    // In a real app, this would load from localStorage or game state
    try {
      const autoSaveJson = localStorage.getItem('bolt_autosave');
      if (autoSaveJson) {
        this.autoSaveData = JSON.parse(autoSaveJson);
      }
      
      const quickSaveJson = localStorage.getItem('bolt_quicksave');
      if (quickSaveJson) {
        this.quickSaveData = JSON.parse(quickSaveJson);
      }
    } catch (error) {
      console.error('Error loading save data:', error);
    }
  }
  
  updateSaveSlots() {
    // Update autosave slot
    const autoSaveDate = this.element.querySelector('.autosave-slot .slot-date');
    if (this.autoSaveData) {
      const date = new Date(this.autoSaveData.timestamp);
      autoSaveDate.textContent = this.formatDate(date);
    } else {
      autoSaveDate.textContent = 'Nessun salvataggio';
    }
    
    // Update quicksave slot
    const quickSaveDate = this.element.querySelector('.quicksave-slot .slot-date');
    if (this.quickSaveData) {
      const date = new Date(this.quickSaveData.timestamp);
      quickSaveDate.textContent = this.formatDate(date);
    } else {
      quickSaveDate.textContent = 'Nessun salvataggio';
    }
    
    // Update load buttons state
    this.element.querySelector('.autosave-slot .load-btn').disabled = !this.autoSaveData;
    this.element.querySelector('.quicksave-slot .load-slot-btn').disabled = !this.quickSaveData;
    
    // Update autosave toggle
    this.element.querySelector('.autosave-toggle-btn').setAttribute('aria-pressed', this.options.autoSaveEnabled);
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
  
  bindEvents() {
    // Save button
    this.element.querySelector('.save-btn').addEventListener('click', () => {
      this.toggleDropdown();
    });
    
    // Close dropdown button
    this.element.querySelector('.close-dropdown-btn').addEventListener('click', () => {
      this.hideDropdown();
    });
    
    // Quick save button
    this.element.querySelector('.save-slot-btn').addEventListener('click', () => {
      this.quickSave();
    });
    
    // Load quicksave button
    this.element.querySelector('.load-slot-btn').addEventListener('click', () => {
      this.loadQuickSave();
    });
    
    // Load autosave button
    this.element.querySelector('.autosave-slot .load-btn').addEventListener('click', () => {
      this.loadAutoSave();
    });
    
    // Autosave toggle
    this.element.querySelector('.autosave-toggle-btn').addEventListener('click', () => {
      this.toggleAutoSave();
    });
    
    // Manage saves button
    this.element.querySelector('.manage-saves-btn').addEventListener('click', () => {
      this.openSaveManager();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isDropdownOpen && !this.element.contains(e.target)) {
        this.hideDropdown();
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDropdownOpen) {
        this.hideDropdown();
      }
    });
    
    // Keyboard shortcut (Ctrl+S)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.quickSave();
      }
    });
  }
  
  toggleDropdown() {
    if (this.isDropdownOpen) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }
  
  showDropdown() {
    this.element.querySelector('.save-dropdown').style.display = 'block';
    this.isDropdownOpen = true;
    
    // Focus first element for keyboard navigation
    setTimeout(() => {
      this.element.querySelector('.close-dropdown-btn').focus();
    }, 10);
  }
  
  hideDropdown() {
    this.element.querySelector('.save-dropdown').style.display = 'none';
    this.isDropdownOpen = false;
  }
  
  quickSave() {
    this.hideDropdown();
    this.showProgress();
    
    // Simulate save process
    setTimeout(() => {
      this.performQuickSave();
    }, 500);
  }
  
  performQuickSave() {
    try {
      // In a real app, this would call a game flow to save the game state
      const saveData = {
        timestamp: new Date().toISOString(),
        gameDate: new Date().toISOString(),
        teamName: 'AC Milan',
        saveType: 'quicksave'
      };
      
      // Store save data
      localStorage.setItem('bolt_quicksave', JSON.stringify(saveData));
      this.quickSaveData = saveData;
      
      // Update UI
      this.updateSaveSlots();
      
      // Call save callback if provided
      if (typeof this.options.onSave === 'function') {
        this.options.onSave(saveData);
      }
      
      // Dispatch save event
      this.element.dispatchEvent(new CustomEvent('gameSaved', {
        detail: { 
          saveData,
          saveType: 'quicksave'
        }
      }));
      
      this.hideProgress();
      this.showSuccess('Gioco salvato con successo');
    } catch (error) {
      console.error('Error saving game:', error);
      this.hideProgress();
      this.showError('Errore durante il salvataggio');
    }
  }
  
  loadQuickSave() {
    if (!this.quickSaveData) return;
    
    if (confirm('Sei sicuro di voler caricare il salvataggio rapido? I progressi non salvati andranno persi.')) {
      this.hideDropdown();
      this.showProgress();
      
      // Simulate load process
      setTimeout(() => {
        this.performLoad(this.quickSaveData);
      }, 500);
    }
  }
  
  loadAutoSave() {
    if (!this.autoSaveData) return;
    
    if (confirm('Sei sicuro di voler caricare l\'autosave? I progressi non salvati andranno persi.')) {
      this.hideDropdown();
      this.showProgress();
      
      // Simulate load process
      setTimeout(() => {
        this.performLoad(this.autoSaveData);
      }, 500);
    }
  }
  
  performLoad(saveData) {
    try {
      // In a real app, this would call a game flow to load the game state
      
      // Call load callback if provided
      if (typeof this.options.onLoad === 'function') {
        this.options.onLoad(saveData);
      }
      
      // Dispatch load event
      this.element.dispatchEvent(new CustomEvent('gameLoaded', {
        detail: { 
          saveData,
          saveType: saveData.saveType
        }
      }));
      
      this.hideProgress();
      this.showSuccess('Gioco caricato con successo');
    } catch (error) {
      console.error('Error loading game:', error);
      this.hideProgress();
      this.showError('Errore durante il caricamento');
    }
  }
  
  toggleAutoSave() {
    this.options.autoSaveEnabled = !this.options.autoSaveEnabled;
    
    // Update toggle button
    this.element.querySelector('.autosave-toggle-btn').setAttribute('aria-pressed', this.options.autoSaveEnabled);
    
    // Dispatch autosave toggle event
    this.element.dispatchEvent(new CustomEvent('autoSaveToggled', {
      detail: { enabled: this.options.autoSaveEnabled }
    }));
    
    this.showSuccess(`Autosave ${this.options.autoSaveEnabled ? 'attivato' : 'disattivato'}`);
  }
  
  openSaveManager() {
    this.hideDropdown();
    
    // Dispatch open save manager event
    window.dispatchEvent(new CustomEvent('openSaveManager'));
  }
  
  showProgress() {
    const progressElement = this.element.querySelector('.save-progress');
    progressElement.style.display = 'block';
    
    // Animate progress bar
    const progressFill = progressElement.querySelector('.progress-fill');
    progressFill.style.width = '0%';
    
    setTimeout(() => {
      progressFill.style.width = '100%';
    }, 10);
  }
  
  hideProgress() {
    this.element.querySelector('.save-progress').style.display = 'none';
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
  isAutoSaveEnabled() {
    return this.options.autoSaveEnabled;
  }
  
  setAutoSaveEnabled(enabled) {
    this.options.autoSaveEnabled = enabled;
    this.element.querySelector('.autosave-toggle-btn').setAttribute('aria-pressed', enabled);
  }
  
  getQuickSaveData() {
    return this.quickSaveData;
  }
  
  getAutoSaveData() {
    return this.autoSaveData;
  }
  
  triggerQuickSave() {
    this.quickSave();
  }
  
  updateAutoSaveData(data) {
    this.autoSaveData = data;
    localStorage.setItem('bolt_autosave', JSON.stringify(data));
    this.updateSaveSlots();
  }
}

export default QuickSaveButton;