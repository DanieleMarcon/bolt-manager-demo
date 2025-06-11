<div class="save-slot-manager">
  <div class="manager-header">
    <h3 class="manager-title">Gestione Salvataggi</h3>
    <div class="manager-actions">
      <button class="action-btn new-save-btn" aria-label="Nuovo salvataggio">
        📝 Nuovo
      </button>
      <button class="action-btn import-btn" aria-label="Importa salvataggio">
        📥 Importa
      </button>
    </div>
  </div>
  
  <div class="slots-container">
    <div class="slots-grid">
      <!-- Save slots will be populated here -->
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">💾</div>
      <h4>Nessun Salvataggio</h4>
      <p>Crea un nuovo salvataggio per iniziare a giocare</p>
    </div>
    
    <div class="loading-state" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento salvataggi...</span>
    </div>
  </div>
  
  <div class="slot-details" style="display: none;">
    <h4>Dettagli Salvataggio</h4>
    <div class="details-content">
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
      
      <div class="save-actions">
        <button class="button button-ghost rename-btn" aria-label="Rinomina salvataggio">
          ✏️ Rinomina
        </button>
        <button class="button button-secondary duplicate-btn" aria-label="Duplica salvataggio">
          🔄 Duplica
        </button>
        <button class="button button-warning delete-btn" aria-label="Elimina salvataggio">
          🗑️ Elimina
        </button>
      </div>
      
      <div class="load-actions">
        <button class="button button-ghost back-btn" aria-label="Torna alla lista">
          ← Indietro
        </button>
        <button class="button button-primary load-btn" aria-label="Carica salvataggio">
          ✓ Carica
        </button>
      </div>
    </div>
  </div>
  
  <div class="new-save-form" style="display: none;">
    <h4>Nuovo Salvataggio</h4>
    <div class="form-content">
      <div class="form-group">
        <label for="saveName" class="form-label">Nome Salvataggio</label>
        <input type="text" id="saveName" class="form-input" placeholder="Inserisci un nome" aria-label="Nome salvataggio">
      </div>
      
      <div class="form-group">
        <label for="teamSelect" class="form-label">Squadra</label>
        <select id="teamSelect" class="form-select" aria-label="Seleziona squadra">
          <option value="">Seleziona squadra</option>
          <option value="1">AC Milan</option>
          <option value="2">Inter</option>
          <option value="3">Juventus</option>
          <option value="4">Roma</option>
          <option value="5">Napoli</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="difficultySelect" class="form-label">Difficoltà</label>
        <select id="difficultySelect" class="form-select" aria-label="Seleziona difficoltà">
          <option value="easy">Facile</option>
          <option value="normal" selected>Normale</option>
          <option value="hard">Difficile</option>
          <option value="expert">Esperto</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button class="button button-ghost cancel-new-btn" aria-label="Annulla">
          Annulla
        </button>
        <button class="button button-primary create-save-btn" aria-label="Crea salvataggio">
          Crea Salvataggio
        </button>
      </div>
    </div>
  </div>
  
  <div class="import-form" style="display: none;">
    <h4>Importa Salvataggio</h4>
    <div class="form-content">
      <div class="import-dropzone">
        <div class="dropzone-content">
          <div class="dropzone-icon">📥</div>
          <div class="dropzone-text">Trascina qui il file di salvataggio o clicca per selezionarlo</div>
        </div>
        <input type="file" class="file-input" accept=".json" aria-label="Seleziona file di salvataggio">
      </div>
      
      <div class="file-preview" style="display: none;">
        <h5>Anteprima File</h5>
        <div class="preview-content">
          <div class="preview-item">
            <span class="preview-label">Nome File:</span>
            <span class="preview-value file-name"></span>
          </div>
          <div class="preview-item">
            <span class="preview-label">Dimensione:</span>
            <span class="preview-value file-size"></span>
          </div>
          <div class="preview-item">
            <span class="preview-label">Contenuto:</span>
            <span class="preview-value file-content"></span>
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <button class="button button-ghost cancel-import-btn" aria-label="Annulla">
          Annulla
        </button>
        <button class="button button-primary import-save-btn" disabled aria-label="Importa salvataggio">
          Importa Salvataggio
        </button>
      </div>
    </div>
  </div>
  
  <div class="rename-form" style="display: none;">
    <h4>Rinomina Salvataggio</h4>
    <div class="form-content">
      <div class="form-group">
        <label for="newSaveName" class="form-label">Nuovo Nome</label>
        <input type="text" id="newSaveName" class="form-input" placeholder="Inserisci un nuovo nome" aria-label="Nuovo nome salvataggio">
      </div>
      
      <div class="form-actions">
        <button class="button button-ghost cancel-rename-btn" aria-label="Annulla">
          Annulla
        </button>
        <button class="button button-primary confirm-rename-btn" aria-label="Conferma rinomina">
          Conferma
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-manager">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Save Manager Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.save-slot-manager {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.manager-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.manager-actions {
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

.slots-container {
  margin-bottom: 20px;
  min-height: 300px;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.slot-details {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.slot-details h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.save-preview {
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

.save-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
}

.load-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-save-form,
.import-form,
.rename-form {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.new-save-form h4,
.import-form h4,
.rename-form h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.form-input,
.form-select {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.import-dropzone {
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.import-dropzone:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dropzone-icon {
  font-size: 32px;
  color: var(--text-muted);
}

.dropzone-text {
  font-size: 14px;
  color: var(--text);
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.file-preview {
  background: var(--surface);
  border-radius: 6px;
  padding: 12px;
}

.file-preview h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.preview-value {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.button-ghost:hover {
  background: var(--background);
}

.button-primary {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: white;
}

.button-primary:hover {
  background: var(--primary-dark);
}

.button-secondary {
  background: var(--secondary);
  border: 1px solid var(--secondary);
  color: white;
}

.button-secondary:hover {
  background: #059669;
}

.button-warning {
  background: var(--warning);
  border: 1px solid var(--warning);
  color: white;
}

.button-warning:hover {
  background: #d97706;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sponsor-slot-manager {
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

/* Responsive */
@media (max-width: 1024px) {
  .slots-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .manager-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .manager-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .slots-grid {
    grid-template-columns: 1fr;
  }
  
  .save-details {
    grid-template-columns: 1fr;
  }
  
  .save-actions,
  .load-actions,
  .form-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .button {
    width: 100%;
  }
  
  .sponsor-slot-manager {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class SaveSlotManager {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxSlots: 6,
      onSave: null,
      onLoad: null,
      onDelete: null,
      ...options
    };
    
    this.saveSlots = [];
    this.selectedSlotId = null;
    this.currentView = 'slots'; // slots, details, new, import, rename
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadSaveSlots();
  }
  
  bindEvents() {
    // Header actions
    this.element.querySelector('.new-save-btn').addEventListener('click', () => {
      this.showNewSaveForm();
    });
    
    this.element.querySelector('.import-btn').addEventListener('click', () => {
      this.showImportForm();
    });
    
    // New save form
    this.element.querySelector('.cancel-new-btn').addEventListener('click', () => {
      this.showSlotsList();
    });
    
    this.element.querySelector('.create-save-btn').addEventListener('click', () => {
      this.createNewSave();
    });
    
    // Import form
    this.element.querySelector('.import-dropzone').addEventListener('click', () => {
      this.element.querySelector('.file-input').click();
    });
    
    this.element.querySelector('.file-input').addEventListener('change', (e) => {
      this.handleFileSelect(e);
    });
    
    this.element.querySelector('.cancel-import-btn').addEventListener('click', () => {
      this.showSlotsList();
    });
    
    this.element.querySelector('.import-save-btn').addEventListener('click', () => {
      this.importSave();
    });
    
    // Rename form
    this.element.querySelector('.cancel-rename-btn').addEventListener('click', () => {
      this.showSlotDetails(this.selectedSlotId);
    });
    
    this.element.querySelector('.confirm-rename-btn').addEventListener('click', () => {
      this.renameSave();
    });
    
    // Slot details
    this.element.querySelector('.back-btn').addEventListener('click', () => {
      this.showSlotsList();
    });
    
    this.element.querySelector('.rename-btn').addEventListener('click', () => {
      this.showRenameForm();
    });
    
    this.element.querySelector('.duplicate-btn').addEventListener('click', () => {
      this.duplicateSave();
    });
    
    this.element.querySelector('.delete-btn').addEventListener('click', () => {
      this.deleteSave();
    });
    
    this.element.querySelector('.load-btn').addEventListener('click', () => {
      this.loadSave();
    });
    
    // Drag and drop for import
    const dropzone = this.element.querySelector('.import-dropzone');
    
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--primary)';
      dropzone.style.background = 'rgba(37, 99, 235, 0.05)';
    });
    
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = '';
      dropzone.style.background = '';
    });
    
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '';
      dropzone.style.background = '';
      
      if (e.dataTransfer.files.length > 0) {
        this.handleFileSelect({ target: { files: e.dataTransfer.files } });
      }
    });
  }
  
  async loadSaveSlots() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from localStorage or game state
      this.saveSlots = await this.fetchSaveSlots();
      this.renderSaveSlots();
    } catch (error) {
      console.error('Error loading save slots:', error);
      this.showError('Errore nel caricamento dei salvataggi');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchSaveSlots() {
    // Mock data - in real app this would come from localStorage or game state
    const slots = [];
    
    // Check localStorage for saved slots
    for (let i = 1; i <= this.options.maxSlots; i++) {
      const slotKey = `bolt_save_slot_${i}`;
      const slotData = localStorage.getItem(slotKey);
      
      if (slotData) {
        try {
          const saveData = JSON.parse(slotData);
          slots.push(saveData);
        } catch (error) {
          console.error(`Error parsing save slot ${i}:`, error);
        }
      }
    }
    
    // If no slots found, create sample data
    if (slots.length === 0) {
      slots.push({
        id: 1,
        name: 'Carriera Milan',
        timestamp: new Date().toISOString(),
        gameDate: new Date().toISOString(),
        teamName: 'AC Milan',
        season: '2024/2025',
        budget: 50000000,
        position: 1,
        status: 'active'
      });
    }
    
    return slots;
  }
  
  renderSaveSlots() {
    const slotsGrid = this.element.querySelector('.slots-grid');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing slots
    slotsGrid.innerHTML = '';
    
    // Show empty state if no slots
    if (this.saveSlots.length === 0) {
      slotsGrid.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show slots
    slotsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    // Create slots for all possible positions
    for (let i = 1; i <= this.options.maxSlots; i++) {
      const slot = this.saveSlots.find(s => s.id === i);
      const slotElement = this.createSlotElement(i, slot);
      slotsGrid.appendChild(slotElement);
    }
  }
  
  createSlotElement(slotId, slotData) {
    const element = document.createElement('div');
    element.className = 'save-slot-card';
    element.dataset.slotId = slotId;
    
    if (slotData) {
      element.dataset.slotStatus = slotData.status || 'active';
      
      const saveDate = new Date(slotData.timestamp);
      const gameDate = new Date(slotData.gameDate);
      
      element.innerHTML = `
        <div class="slot-header">
          <div class="slot-number">Slot ${slotId}</div>
          <div class="slot-status">${this.getStatusText(slotData.status)}</div>
        </div>
        
        <div class="slot-content">
          <div class="filled-slot-content">
            <div class="save-info">
              <h3 class="save-name">${slotData.name}</h3>
              <div class="save-meta">
                <div class="save-date">${this.formatDate(saveDate)}</div>
                <div class="save-team">${slotData.teamName}</div>
              </div>
            </div>
            
            <div class="save-preview">
              <div class="preview-item">
                <span class="preview-label">Data Gioco:</span>
                <span class="preview-value">${this.formatGameDate(gameDate)}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">Stagione:</span>
                <span class="preview-value">${slotData.season}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">Budget:</span>
                <span class="preview-value">${this.formatCurrency(slotData.budget)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="slot-actions">
          <button class="slot-btn view-btn" aria-label="Visualizza dettagli">
            👁️ Dettagli
          </button>
          <button class="slot-btn load-btn" aria-label="Carica salvataggio">
            📂 Carica
          </button>
        </div>
      `;
      
      // Add event listeners
      element.querySelector('.view-btn').addEventListener('click', () => {
        this.showSlotDetails(slotId);
      });
      
      element.querySelector('.load-btn').addEventListener('click', () => {
        this.loadSaveSlot(slotId);
      });
    } else {
      // Empty slot
      element.dataset.slotStatus = 'empty';
      
      element.innerHTML = `
        <div class="slot-header">
          <div class="slot-number">Slot ${slotId}</div>
          <div class="slot-status">Vuoto</div>
        </div>
        
        <div class="slot-content">
          <div class="empty-slot-content">
            <div class="empty-icon">📁</div>
            <div class="empty-text">Slot Vuoto</div>
          </div>
        </div>
        
        <div class="slot-actions">
          <button class="slot-btn save-btn" aria-label="Salva in questo slot">
            💾 Salva
          </button>
        </div>
      `;
      
      // Add event listener
      element.querySelector('.save-btn').addEventListener('click', () => {
        this.showNewSaveForm(slotId);
      });
    }
    
    return element;
  }
  
  getStatusText(status) {
    const statusMap = {
      empty: 'Vuoto',
      active: 'Attivo',
      backup: 'Backup'
    };
    
    return statusMap[status] || 'Attivo';
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
  
  showSlotsList() {
    this.currentView = 'slots';
    
    // Show slots container
    this.element.querySelector('.slots-container').style.display = 'block';
    
    // Hide other views
    this.element.querySelector('.slot-details').style.display = 'none';
    this.element.querySelector('.new-save-form').style.display = 'none';
    this.element.querySelector('.import-form').style.display = 'none';
    this.element.querySelector('.rename-form').style.display = 'none';
    
    // Reset selected slot
    this.selectedSlotId = null;
  }
  
  showSlotDetails(slotId) {
    const slot = this.saveSlots.find(s => s.id === slotId);
    if (!slot) return;
    
    this.selectedSlotId = slotId;
    this.currentView = 'details';
    
    // Update details view
    const detailsView = this.element.querySelector('.slot-details');
    
    detailsView.querySelector('.save-name').textContent = slot.name;
    
    const saveDate = new Date(slot.timestamp);
    detailsView.querySelector('.save-date').textContent = this.formatDate(saveDate);
    
    detailsView.querySelector('.save-team').textContent = slot.teamName;
    
    const gameDate = new Date(slot.gameDate);
    detailsView.querySelector('.game-date').textContent = this.formatGameDate(gameDate);
    
    detailsView.querySelector('.season').textContent = slot.season;
    detailsView.querySelector('.budget').textContent = this.formatCurrency(slot.budget);
    detailsView.querySelector('.position').textContent = `${slot.position}°`;
    
    // Show details view
    detailsView.style.display = 'block';
    
    // Hide other views
    this.element.querySelector('.slots-container').style.display = 'none';
    this.element.querySelector('.new-save-form').style.display = 'none';
    this.element.querySelector('.import-form').style.display = 'none';
    this.element.querySelector('.rename-form').style.display = 'none';
  }
  
  showNewSaveForm(slotId = null) {
    this.currentView = 'new';
    
    // If slotId is provided, pre-fill the form
    if (slotId) {
      this.selectedSlotId = slotId;
    }
    
    // Reset form
    this.element.querySelector('#saveName').value = '';
    this.element.querySelector('#teamSelect').value = '';
    this.element.querySelector('#difficultySelect').value = 'normal';
    
    // Show new save form
    this.element.querySelector('.new-save-form').style.display = 'block';
    
    // Hide other views
    this.element.querySelector('.slots-container').style.display = 'none';
    this.element.querySelector('.slot-details').style.display = 'none';
    this.element.querySelector('.import-form').style.display = 'none';
    this.element.querySelector('.rename-form').style.display = 'none';
    
    // Focus on name input
    setTimeout(() => {
      this.element.querySelector('#saveName').focus();
    }, 10);
  }
  
  showImportForm() {
    this.currentView = 'import';
    
    // Reset form
    this.element.querySelector('.file-input').value = '';
    this.element.querySelector('.file-preview').style.display = 'none';
    this.element.querySelector('.import-save-btn').disabled = true;
    
    // Show import form
    this.element.querySelector('.import-form').style.display = 'block';
    
    // Hide other views
    this.element.querySelector('.slots-container').style.display = 'none';
    this.element.querySelector('.slot-details').style.display = 'none';
    this.element.querySelector('.new-save-form').style.display = 'none';
    this.element.querySelector('.rename-form').style.display = 'none';
  }
  
  showRenameForm() {
    if (!this.selectedSlotId) return;
    
    const slot = this.saveSlots.find(s => s.id === this.selectedSlotId);
    if (!slot) return;
    
    this.currentView = 'rename';
    
    // Pre-fill form
    this.element.querySelector('#newSaveName').value = slot.name;
    
    // Show rename form
    this.element.querySelector('.rename-form').style.display = 'block';
    
    // Hide other views
    this.element.querySelector('.slots-container').style.display = 'none';
    this.element.querySelector('.slot-details').style.display = 'none';
    this.element.querySelector('.new-save-form').style.display = 'none';
    this.element.querySelector('.import-form').style.display = 'none';
    
    // Focus on name input
    setTimeout(() => {
      this.element.querySelector('#newSaveName').focus();
    }, 10);
  }
  
  createNewSave() {
    const name = this.element.querySelector('#saveName').value.trim();
    const teamId = this.element.querySelector('#teamSelect').value;
    const difficulty = this.element.querySelector('#difficultySelect').value;
    
    if (!name) {
      this.showError('Inserisci un nome per il salvataggio');
      return;
    }
    
    if (!teamId) {
      this.showError('Seleziona una squadra');
      return;
    }
    
    // Create new save data
    const newSave = {
      id: this.selectedSlotId || this.getNextAvailableSlotId(),
      name,
      timestamp: new Date().toISOString(),
      gameDate: new Date().toISOString(),
      teamId,
      teamName: this.getTeamName(teamId),
      season: '2024/2025',
      budget: 50000000,
      position: 1,
      difficulty,
      status: 'active'
    };
    
    // Add to save slots
    this.saveSaveSlot(newSave);
    
    // Show success message
    this.showSuccess('Salvataggio creato con successo');
    
    // Return to slots list
    this.showSlotsList();
  }
  
  getTeamName(teamId) {
    const teams = {
      '1': 'AC Milan',
      '2': 'Inter',
      '3': 'Juventus',
      '4': 'Roma',
      '5': 'Napoli'
    };
    
    return teams[teamId] || 'Team';
  }
  
  getNextAvailableSlotId() {
    for (let i = 1; i <= this.options.maxSlots; i++) {
      if (!this.saveSlots.some(s => s.id === i)) {
        return i;
      }
    }
    
    // If all slots are taken, return the first slot ID
    return 1;
  }
  
  handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.name.endsWith('.json')) {
      this.showError('Formato file non supportato. Usa .json');
      return;
    }
    
    // Update file preview
    this.element.querySelector('.file-name').textContent = file.name;
    this.element.querySelector('.file-size').textContent = this.formatFileSize(file.size);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.element.querySelector('.file-content').textContent = this.getContentSummary(data);
        this.element.querySelector('.file-preview').style.display = 'block';
        this.element.querySelector('.import-save-btn').disabled = false;
        
        // Store file data
        this.importFileData = data;
      } catch (error) {
        this.showError('File non valido. Il file deve essere in formato JSON');
        this.element.querySelector('.file-preview').style.display = 'none';
        this.element.querySelector('.import-save-btn').disabled = true;
      }
    };
    
    reader.readAsText(file);
  }
  
  formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  }
  
  getContentSummary(data) {
    if (!data) return 'Dati non validi';
    
    if (data.name && data.teamName) {
      return `${data.name} (${data.teamName})`;
    } else if (data.id) {
      return `Salvataggio ID: ${data.id}`;
    } else {
      return 'Dati di salvataggio';
    }
  }
  
  importSave() {
    if (!this.importFileData) {
      this.showError('Nessun file selezionato');
      return;
    }
    
    // Validate import data
    if (!this.validateSaveData(this.importFileData)) {
      this.showError('File di salvataggio non valido');
      return;
    }
    
    // Assign a slot ID if not present
    if (!this.importFileData.id) {
      this.importFileData.id = this.getNextAvailableSlotId();
    }
    
    // Save to slot
    this.saveSaveSlot(this.importFileData);
    
    // Show success message
    this.showSuccess('Salvataggio importato con successo');
    
    // Return to slots list
    this.showSlotsList();
  }
  
  validateSaveData(data) {
    // Basic validation
    return data && data.name && data.timestamp && data.gameDate && data.teamName;
  }
  
  renameSave() {
    if (!this.selectedSlotId) return;
    
    const newName = this.element.querySelector('#newSaveName').value.trim();
    
    if (!newName) {
      this.showError('Inserisci un nome per il salvataggio');
      return;
    }
    
    // Find the save slot
    const slotIndex = this.saveSlots.findIndex(s => s.id === this.selectedSlotId);
    if (slotIndex === -1) return;
    
    // Update name
    this.saveSlots[slotIndex].name = newName;
    
    // Save to storage
    this.saveSaveSlot(this.saveSlots[slotIndex]);
    
    // Show success message
    this.showSuccess('Salvataggio rinominato con successo');
    
    // Return to slot details
    this.showSlotDetails(this.selectedSlotId);
  }
  
  duplicateSave() {
    if (!this.selectedSlotId) return;
    
    const slot = this.saveSlots.find(s => s.id === this.selectedSlotId);
    if (!slot) return;
    
    // Create a copy
    const newSlot = { ...slot };
    newSlot.id = this.getNextAvailableSlotId();
    newSlot.name = `${slot.name} (Copia)`;
    newSlot.timestamp = new Date().toISOString();
    
    // Save to storage
    this.saveSaveSlot(newSlot);
    
    // Show success message
    this.showSuccess('Salvataggio duplicato con successo');
    
    // Return to slots list
    this.showSlotsList();
  }
  
  deleteSave() {
    if (!this.selectedSlotId) return;
    
    if (confirm('Sei sicuro di voler eliminare questo salvataggio? Questa azione non può essere annullata.')) {
      // Remove from save slots
      this.saveSlots = this.saveSlots.filter(s => s.id !== this.selectedSlotId);
      
      // Remove from storage
      const slotKey = `bolt_save_slot_${this.selectedSlotId}`;
      localStorage.removeItem(slotKey);
      
      // Call onDelete callback if provided
      if (typeof this.options.onDelete === 'function') {
        this.options.onDelete(this.selectedSlotId);
      }
      
      // Dispatch delete event
      this.element.dispatchEvent(new CustomEvent('saveDeleted', {
        detail: { slotId: this.selectedSlotId }
      }));
      
      // Show success message
      this.showSuccess('Salvataggio eliminato con successo');
      
      // Return to slots list
      this.showSlotsList();
      
      // Refresh slots
      this.renderSaveSlots();
    }
  }
  
  loadSaveSlot(slotId) {
    const slot = this.saveSlots.find(s => s.id === slotId);
    if (!slot) return;
    
    if (confirm('Sei sicuro di voler caricare questo salvataggio? I progressi non salvati andranno persi.')) {
      // Call onLoad callback if provided
      if (typeof this.options.onLoad === 'function') {
        this.options.onLoad(slot);
      }
      
      // Dispatch load event
      this.element.dispatchEvent(new CustomEvent('saveLoaded', {
        detail: { saveData: slot }
      }));
      
      // Show success message
      this.showSuccess('Salvataggio caricato con successo');
    }
  }
  
  loadSave() {
    if (!this.selectedSlotId) return;
    this.loadSaveSlot(this.selectedSlotId);
  }
  
  saveSaveSlot(saveData) {
    // Update save slots
    const existingIndex = this.saveSlots.findIndex(s => s.id === saveData.id);
    if (existingIndex !== -1) {
      this.saveSlots[existingIndex] = saveData;
    } else {
      this.saveSlots.push(saveData);
    }
    
    // Save to storage
    const slotKey = `bolt_save_slot_${saveData.id}`;
    localStorage.setItem(slotKey, JSON.stringify(saveData));
    
    // Call onSave callback if provided
    if (typeof this.options.onSave === 'function') {
      this.options.onSave(saveData);
    }
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveSaved', {
      detail: { saveData }
    }));
    
    // Refresh slots
    this.renderSaveSlots();
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.slots-grid').style.display = show ? 'none' : 'grid';
    this.element.querySelector('.empty-state').style.display = 'none';
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
  getSaveSlots() {
    return [...this.saveSlots];
  }
  
  getSelectedSlot() {
    return this.saveSlots.find(s => s.id === this.selectedSlotId);
  }
  
  refreshSlots() {
    this.loadSaveSlots();
  }
  
  getCurrentView() {
    return this.currentView;
  }
  
  createQuickSave() {
    // Create a quick save in the next available slot
    const slotId = this.getNextAvailableSlotId();
    
    const quickSave = {
      id: slotId,
      name: `Salvataggio Rapido ${new Date().toLocaleDateString('it-IT')}`,
      timestamp: new Date().toISOString(),
      gameDate: new Date().toISOString(),
      teamName: 'AC Milan', // This would come from game state
      season: '2024/2025',
      budget: 50000000,
      position: 1,
      status: 'active'
    };
    
    this.saveSaveSlot(quickSave);
    
    return quickSave;
  }
}

// Auto-initialize save slot managers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.save-slot-manager').forEach(manager => {
    if (!manager.dataset.initialized) {
      const options = JSON.parse(manager.dataset.options || '{}');
      new SaveSlotManager(manager, options);
      manager.dataset.initialized = 'true';
    }
  });
});
</script>