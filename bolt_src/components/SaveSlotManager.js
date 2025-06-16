/**
 * SaveSlotManager Component
 * Used in: SessionManager.page.js
 * Purpose: Manage save slots with preview, save, load, and delete functionality
 */

export default class SaveSlotManager {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      maxSlots: props.maxSlots || 6,
      onSave: props.onSave || (() => {}),
      onLoad: props.onLoad || (() => {}),
      onDelete: props.onDelete || (() => {}),
      onSlotClick: props.onSlotClick || (() => {}),
      showPreview: props.showPreview !== false,
      ...props
    };
    
    this.saveSlots = [];
    this.selectedSlot = null;
    
    this.render();
    this.bindEvents();
    this.loadSaveSlots();
  }

  render() {
    this.container.innerHTML = `
      <div class="save-slot-manager">
        <div class="slot-manager-header">
          <h4 class="manager-title">Slot di Salvataggio</h4>
          <div class="manager-actions">
            <button class="button button-ghost refresh-slots-btn">🔄 Aggiorna</button>
            <button class="button button-primary new-save-btn">💾 Nuovo Salvataggio</button>
          </div>
        </div>
        
        <div class="save-slots-grid" id="saveSlotsGrid">
          ${this.renderSaveSlots()}
        </div>
        
        ${this.props.showPreview ? `
          <div class="slot-preview-panel" id="slotPreviewPanel">
            <div class="preview-placeholder">
              <div class="preview-icon">👆</div>
              <h5>Seleziona uno slot</h5>
              <p>Clicca su uno slot per visualizzare i dettagli del salvataggio</p>
            </div>
          </div>
        ` : ''}
        
        <!-- New Save Modal -->
        <div class="new-save-modal modal" id="newSaveModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Nuovo Salvataggio</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
              <div class="save-form">
                <div class="form-field">
                  <label class="field-label">Nome Salvataggio</label>
                  <input type="text" class="save-name-input" placeholder="Inserisci nome salvataggio..." maxlength="50">
                </div>
                
                <div class="form-field">
                  <label class="field-label">Slot di Destinazione</label>
                  <select class="slot-select" id="slotSelect">
                    ${this.generateSlotOptions()}
                  </select>
                </div>
                
                <div class="form-field">
                  <label class="field-label">Descrizione (opzionale)</label>
                  <textarea class="save-description-input" placeholder="Aggiungi una descrizione..." rows="3" maxlength="200"></textarea>
                </div>
                
                <div class="save-options">
                  <label class="option-checkbox">
                    <input type="checkbox" class="auto-save-checkbox">
                    <span>Salvataggio automatico</span>
                  </label>
                  <label class="option-checkbox">
                    <input type="checkbox" class="backup-checkbox" checked>
                    <span>Crea backup prima di sovrascrivere</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Annulla</button>
              <button class="button button-primary save-confirm-btn">💾 Salva</button>
            </div>
          </div>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <div class="delete-confirm-modal modal" id="deleteConfirmModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Conferma Eliminazione</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
              <div class="confirm-message">
                <div class="confirm-icon">⚠️</div>
                <h5>Sei sicuro di voler eliminare questo salvataggio?</h5>
                <p class="delete-warning">Questa azione non può essere annullata.</p>
                <div class="slot-info" id="deleteSlotInfo">
                  <!-- Slot info will be populated dynamically -->
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Annulla</button>
              <button class="button button-danger delete-confirm-btn">🗑️ Elimina</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSaveSlots() {
    let slotsHTML = '';
    
    for (let i = 1; i <= this.props.maxSlots; i++) {
      const slot = this.saveSlots.find(s => s.id === i);
      slotsHTML += this.renderSaveSlot(i, slot);
    }
    
    return slotsHTML;
  }

  renderSaveSlot(slotId, slotData) {
    const isEmpty = !slotData;
    const isSelected = this.selectedSlot === slotId;
    
    return `
      <div class="save-slot ${isEmpty ? 'empty' : 'filled'} ${isSelected ? 'selected' : ''}" 
           data-slot-id="${slotId}">
        <div class="slot-header">
          <span class="slot-number">Slot ${slotId}</span>
          ${!isEmpty ? `
            <div class="slot-actions">
              <button class="slot-action-btn load-btn" title="Carica">📂</button>
              <button class="slot-action-btn delete-btn" title="Elimina">🗑️</button>
            </div>
          ` : ''}
        </div>
        
        <div class="slot-content">
          ${isEmpty ? `
            <div class="empty-slot">
              <div class="empty-icon">📁</div>
              <span class="empty-text">Slot Vuoto</span>
              <button class="button button-ghost save-here-btn">💾 Salva Qui</button>
            </div>
          ` : `
            <div class="slot-preview">
              <div class="save-info">
                <h5 class="save-name">${slotData.name}</h5>
                <span class="save-date">${this.formatDate(slotData.timestamp)}</span>
              </div>
              
              <div class="save-details">
                <div class="detail-item">
                  <span class="detail-label">Squadra:</span>
                  <span class="detail-value">${slotData.teamName}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Stagione:</span>
                  <span class="detail-value">${slotData.season}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Budget:</span>
                  <span class="detail-value">€${this.formatCurrency(slotData.budget)}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Posizione:</span>
                  <span class="detail-value">${slotData.position}°</span>
                </div>
              </div>
              
              <div class="save-status">
                <span class="status-badge ${slotData.status || 'normal'}">${this.getStatusText(slotData.status)}</span>
                <span class="play-time">${this.formatPlayTime(slotData.playTime)}</span>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Slot clicks
    const saveSlots = this.container.querySelectorAll('.save-slot');
    saveSlots.forEach(slot => {
      slot.addEventListener('click', (e) => {
        // Don't trigger slot selection if clicking on action buttons
        if (e.target.closest('.slot-action-btn') || e.target.closest('.save-here-btn')) {
          return;
        }
        
        const slotId = parseInt(slot.dataset.slotId);
        this.selectSlot(slotId);
      });
    });

    // Action buttons
    this.bindActionButtons();

    // Header actions
    const refreshBtn = this.container.querySelector('.refresh-slots-btn');
    const newSaveBtn = this.container.querySelector('.new-save-btn');
    
    refreshBtn?.addEventListener('click', () => this.refreshSlots());
    newSaveBtn?.addEventListener('click', () => this.showNewSaveModal());

    // Modal events
    this.bindModalEvents();
  }

  bindActionButtons() {
    // Load buttons
    const loadBtns = this.container.querySelectorAll('.load-btn');
    loadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotId = parseInt(btn.closest('.save-slot').dataset.slotId);
        this.loadSlot(slotId);
      });
    });

    // Delete buttons
    const deleteBtns = this.container.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotId = parseInt(btn.closest('.save-slot').dataset.slotId);
        this.showDeleteConfirmation(slotId);
      });
    });

    // Save here buttons
    const saveHereBtns = this.container.querySelectorAll('.save-here-btn');
    saveHereBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotId = parseInt(btn.closest('.save-slot').dataset.slotId);
        this.showNewSaveModal(slotId);
      });
    });
  }

  bindModalEvents() {
    // New Save Modal
    const newSaveModal = this.container.querySelector('#newSaveModal');
    const newSaveCloseBtn = newSaveModal?.querySelector('.modal-close-btn');
    const newSaveCancelBtn = newSaveModal?.querySelector('.modal-cancel-btn');
    const saveConfirmBtn = newSaveModal?.querySelector('.save-confirm-btn');
    
    newSaveCloseBtn?.addEventListener('click', () => this.hideNewSaveModal());
    newSaveCancelBtn?.addEventListener('click', () => this.hideNewSaveModal());
    saveConfirmBtn?.addEventListener('click', () => this.confirmNewSave());

    // Delete Confirmation Modal
    const deleteModal = this.container.querySelector('#deleteConfirmModal');
    const deleteCloseBtn = deleteModal?.querySelector('.modal-close-btn');
    const deleteCancelBtn = deleteModal?.querySelector('.modal-cancel-btn');
    const deleteConfirmBtn = deleteModal?.querySelector('.delete-confirm-btn');
    
    deleteCloseBtn?.addEventListener('click', () => this.hideDeleteConfirmation());
    deleteCancelBtn?.addEventListener('click', () => this.hideDeleteConfirmation());
    deleteConfirmBtn?.addEventListener('click', () => this.confirmDelete());

    // Close modals on outside click
    newSaveModal?.addEventListener('click', (e) => {
      if (e.target === newSaveModal) this.hideNewSaveModal();
    });
    
    deleteModal?.addEventListener('click', (e) => {
      if (e.target === deleteModal) this.hideDeleteConfirmation();
    });
  }

  selectSlot(slotId) {
    this.selectedSlot = slotId;
    
    // Update visual selection
    const saveSlots = this.container.querySelectorAll('.save-slot');
    saveSlots.forEach(slot => {
      slot.classList.toggle('selected', parseInt(slot.dataset.slotId) === slotId);
    });
    
    // Update preview panel
    this.updatePreviewPanel(slotId);
    
    // Trigger callback
    this.props.onSlotClick(slotId, this.saveSlots.find(s => s.id === slotId));
  }

  updatePreviewPanel(slotId) {
    const previewPanel = this.container.querySelector('#slotPreviewPanel');
    if (!previewPanel) return;
    
    const slotData = this.saveSlots.find(s => s.id === slotId);
    
    if (!slotData) {
      previewPanel.innerHTML = `
        <div class="preview-empty">
          <div class="preview-icon">📁</div>
          <h5>Slot ${slotId} - Vuoto</h5>
          <p>Questo slot non contiene alcun salvataggio</p>
          <button class="button button-primary save-to-slot-btn" data-slot-id="${slotId}">
            💾 Salva in questo slot
          </button>
        </div>
      `;
      
      // Bind save button
      const saveBtn = previewPanel.querySelector('.save-to-slot-btn');
      saveBtn?.addEventListener('click', () => this.showNewSaveModal(slotId));
      
    } else {
      previewPanel.innerHTML = `
        <div class="preview-content">
          <div class="preview-header">
            <h5 class="preview-title">${slotData.name}</h5>
            <span class="preview-slot">Slot ${slotId}</span>
          </div>
          
          <div class="preview-details">
            <div class="detail-row">
              <span class="detail-label">Data Salvataggio:</span>
              <span class="detail-value">${this.formatDateTime(slotData.timestamp)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Data di Gioco:</span>
              <span class="detail-value">${this.formatDate(slotData.gameDate)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Squadra:</span>
              <span class="detail-value">${slotData.teamName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Stagione:</span>
              <span class="detail-value">${slotData.season}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Budget:</span>
              <span class="detail-value">€${this.formatCurrency(slotData.budget)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Posizione in Classifica:</span>
              <span class="detail-value">${slotData.position}°</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Tempo di Gioco:</span>
              <span class="detail-value">${this.formatPlayTime(slotData.playTime)}</span>
            </div>
            ${slotData.description ? `
              <div class="detail-row">
                <span class="detail-label">Descrizione:</span>
                <span class="detail-value">${slotData.description}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="preview-actions">
            <button class="button button-secondary load-preview-btn">📂 Carica</button>
            <button class="button button-ghost duplicate-btn">📋 Duplica</button>
            <button class="button button-ghost export-btn">📤 Esporta</button>
            <button class="button button-danger delete-preview-btn">🗑️ Elimina</button>
          </div>
        </div>
      `;
      
      // Bind preview action buttons
      const loadBtn = previewPanel.querySelector('.load-preview-btn');
      const duplicateBtn = previewPanel.querySelector('.duplicate-btn');
      const exportBtn = previewPanel.querySelector('.export-btn');
      const deleteBtn = previewPanel.querySelector('.delete-preview-btn');
      
      loadBtn?.addEventListener('click', () => this.loadSlot(slotId));
      duplicateBtn?.addEventListener('click', () => this.duplicateSlot(slotId));
      exportBtn?.addEventListener('click', () => this.exportSlot(slotId));
      deleteBtn?.addEventListener('click', () => this.showDeleteConfirmation(slotId));
    }
  }

  showNewSaveModal(targetSlotId = null) {
    const modal = this.container.querySelector('#newSaveModal');
    const slotSelect = modal?.querySelector('#slotSelect');
    
    if (targetSlotId && slotSelect) {
      slotSelect.value = targetSlotId;
    }
    
    // Generate default save name
    const saveNameInput = modal?.querySelector('.save-name-input');
    if (saveNameInput) {
      const now = new Date();
      const defaultName = `Salvataggio ${now.toLocaleDateString('it-IT')} ${now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
      saveNameInput.value = defaultName;
    }
    
    modal.style.display = 'block';
  }

  hideNewSaveModal() {
    const modal = this.container.querySelector('#newSaveModal');
    modal.style.display = 'none';
    
    // Clear form
    const saveNameInput = modal?.querySelector('.save-name-input');
    const saveDescriptionInput = modal?.querySelector('.save-description-input');
    
    if (saveNameInput) saveNameInput.value = '';
    if (saveDescriptionInput) saveDescriptionInput.value = '';
  }

  confirmNewSave() {
    const modal = this.container.querySelector('#newSaveModal');
    const saveNameInput = modal?.querySelector('.save-name-input');
    const saveDescriptionInput = modal?.querySelector('.save-description-input');
    const slotSelect = modal?.querySelector('#slotSelect');
    const autoSaveCheckbox = modal?.querySelector('.auto-save-checkbox');
    const backupCheckbox = modal?.querySelector('.backup-checkbox');
    
    const saveName = saveNameInput?.value.trim();
    if (!saveName) {
      alert('Inserisci un nome per il salvataggio');
      return;
    }
    
    const saveData = {
      slotId: parseInt(slotSelect?.value) || 1,
      name: saveName,
      description: saveDescriptionInput?.value.trim() || '',
      autoSave: autoSaveCheckbox?.checked || false,
      createBackup: backupCheckbox?.checked || false,
      timestamp: new Date().toISOString()
    };
    
    // Check if slot is occupied
    const existingSlot = this.saveSlots.find(s => s.id === saveData.slotId);
    if (existingSlot && !confirm(`Lo slot ${saveData.slotId} contiene già un salvataggio. Vuoi sovrascriverlo?`)) {
      return;
    }
    
    this.props.onSave(saveData);
    this.hideNewSaveModal();
  }

  showDeleteConfirmation(slotId) {
    const modal = this.container.querySelector('#deleteConfirmModal');
    const slotInfo = modal?.querySelector('#deleteSlotInfo');
    const slotData = this.saveSlots.find(s => s.id === slotId);
    
    if (slotInfo && slotData) {
      slotInfo.innerHTML = `
        <div class="delete-slot-preview">
          <h6>${slotData.name}</h6>
          <p>Slot ${slotId} - ${this.formatDateTime(slotData.timestamp)}</p>
          <p>Squadra: ${slotData.teamName} - ${slotData.season}</p>
        </div>
      `;
    }
    
    this.slotToDelete = slotId;
    modal.style.display = 'block';
  }

  hideDeleteConfirmation() {
    const modal = this.container.querySelector('#deleteConfirmModal');
    modal.style.display = 'none';
    this.slotToDelete = null;
  }

  confirmDelete() {
    if (this.slotToDelete) {
      this.props.onDelete(this.slotToDelete);
      this.hideDeleteConfirmation();
    }
  }

  loadSlot(slotId) {
    const slotData = this.saveSlots.find(s => s.id === slotId);
    if (slotData) {
      this.props.onLoad(slotData);
    }
  }

  duplicateSlot(slotId) {
    const slotData = this.saveSlots.find(s => s.id === slotId);
    if (slotData) {
      // Find next available slot
      const nextSlot = this.findNextAvailableSlot();
      if (nextSlot) {
        const duplicateData = {
          ...slotData,
          slotId: nextSlot,
          name: `${slotData.name} (Copia)`,
          timestamp: new Date().toISOString()
        };
        this.props.onSave(duplicateData);
      } else {
        alert('Nessuno slot disponibile per la duplicazione');
      }
    }
  }

  exportSlot(slotId) {
    const slotData = this.saveSlots.find(s => s.id === slotId);
    if (slotData) {
      const exportData = {
        ...slotData,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `save-slot-${slotId}-${slotData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      link.click();
    }
  }

  refreshSlots() {
    this.loadSaveSlots();
    this.render();
    this.bindEvents();
  }

  loadSaveSlots() {
    // Mock data - in a real app this would load from localStorage or API
    this.saveSlots = [
      {
        id: 1,
        name: 'Carriera Principale',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        gameDate: new Date().toISOString(),
        teamName: 'AC Milan',
        season: '2024/2025',
        budget: 50000000,
        position: 1,
        status: 'active',
        playTime: 120,
        description: 'Salvataggio principale della carriera'
      },
      {
        id: 3,
        name: 'Backup Pre-Mercato',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        gameDate: new Date(Date.now() - 86400000).toISOString(),
        teamName: 'AC Milan',
        season: '2024/2025',
        budget: 45000000,
        position: 2,
        status: 'backup',
        playTime: 95
      }
    ];
  }

  generateSlotOptions() {
    let options = '';
    for (let i = 1; i <= this.props.maxSlots; i++) {
      const slot = this.saveSlots.find(s => s.id === i);
      const label = slot ? `Slot ${i} - ${slot.name} (Sovrascrive)` : `Slot ${i} - Vuoto`;
      options += `<option value="${i}">${label}</option>`;
    }
    return options;
  }

  findNextAvailableSlot() {
    for (let i = 1; i <= this.props.maxSlots; i++) {
      if (!this.saveSlots.find(s => s.id === i)) {
        return i;
      }
    }
    return null;
  }

  getStatusText(status) {
    const statusMap = {
      'active': 'Attivo',
      'backup': 'Backup',
      'auto': 'Auto',
      'manual': 'Manuale'
    };
    return statusMap[status] || 'Normale';
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  }

  formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('it-IT');
  }

  formatPlayTime(minutes) {
    if (!minutes) return '0 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toLocaleString();
  }

  setSaveSlots(slots) {
    this.saveSlots = slots;
    this.render();
    this.bindEvents();
  }

  getSaveSlots() {
    return this.saveSlots;
  }

  addSaveSlot(slotData) {
    const existingIndex = this.saveSlots.findIndex(s => s.id === slotData.id);
    if (existingIndex >= 0) {
      this.saveSlots[existingIndex] = slotData;
    } else {
      this.saveSlots.push(slotData);
    }
    this.render();
    this.bindEvents();
  }

  removeSaveSlot(slotId) {
    this.saveSlots = this.saveSlots.filter(s => s.id !== slotId);
    if (this.selectedSlot === slotId) {
      this.selectedSlot = null;
    }
    this.render();
    this.bindEvents();
  }
}