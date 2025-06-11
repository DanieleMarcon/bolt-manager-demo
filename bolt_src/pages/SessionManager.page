<div class="session-manager-page">
  <div class="page-header">
    <h2 class="page-title">Gestione Salvataggi</h2>
    <div class="page-actions">
      <div id="quickSaveContainer"></div>
      <button class="button button-secondary import-btn">
        📥 Importa
      </button>
    </div>
  </div>

  <!-- Save Slots Section -->
  <div class="save-slots-section">
    <div class="section-header">
      <h3 class="section-title">Slot Salvataggio</h3>
      <div class="section-controls">
        <button class="button button-ghost refresh-btn">
          ↻ Aggiorna
        </button>
        <button class="button button-primary new-save-btn">
          📝 Nuovo Salvataggio
        </button>
      </div>
    </div>
    
    <div class="save-slots-grid" id="saveSlotContainer">
      <!-- Save slots will be rendered here -->
    </div>
  </div>

  <!-- Session Details Section -->
  <div class="session-details-section" id="sessionDetailsSection" style="display: none;">
    <div class="section-header">
      <h3 class="section-title">Dettagli Sessione</h3>
      <button class="button button-ghost back-btn">
        ← Indietro
      </button>
    </div>
    
    <div id="sessionDetailsContainer"></div>
  </div>

  <!-- Backup Manager Section -->
  <div class="backup-manager-section">
    <div class="section-header">
      <h3 class="section-title">Backup e Ripristino</h3>
    </div>
    
    <div id="backupManagerContainer"></div>
  </div>

  <!-- Export/Import Tools Section -->
  <div class="export-import-section">
    <div class="section-header">
      <h3 class="section-title">Strumenti Avanzati</h3>
    </div>
    
    <div id="exportImportContainer"></div>
  </div>

  <!-- Load Confirm Modal Container -->
  <div id="loadConfirmModalContainer"></div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<style>
.session-manager-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.page-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.section-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.save-slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 16px;
}

.sponsor-banner-container {
  margin-top: 24px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .save-slots-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .page-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .section-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .save-slots-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
class SessionManagerPage {
  constructor() {
    this.saveSlots = [];
    this.selectedSlot = null;
    this.currentSession = null;
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadData();
    this.renderComponents();
  }

  bindEvents() {
    document.querySelector('.import-btn')?.addEventListener('click', () => this.showImportForm());
    document.querySelector('.refresh-btn')?.addEventListener('click', () => this.refreshSaveSlots());
    document.querySelector('.new-save-btn')?.addEventListener('click', () => this.createNewSave());
    document.querySelector('.back-btn')?.addEventListener('click', () => this.showSaveSlots());
    
    // Listen for events from components
    document.addEventListener('slotSaved', (e) => this.handleSlotSaved(e.detail));
    document.addEventListener('slotLoaded', (e) => this.handleSlotLoaded(e.detail));
    document.addEventListener('slotDeleted', (e) => this.handleSlotDeleted(e.detail));
    document.addEventListener('saveDeleted', (e) => this.handleSaveDeleted(e.detail));
    document.addEventListener('sessionLoad', (e) => this.handleSessionLoad(e.detail));
    document.addEventListener('sessionExported', (e) => this.handleSessionExported(e.detail));
    document.addEventListener('sessionDuplicate', (e) => this.handleSessionDuplicate(e.detail));
    document.addEventListener('dataExported', (e) => this.handleDataExported(e.detail));
    document.addEventListener('dataImported', (e) => this.handleDataImported(e.detail));
  }

  async loadData() {
    try {
      // In a real app, these would fetch from the game state or API
      this.saveSlots = await this.fetchSaveSlots();
      this.currentSession = await this.fetchCurrentSession();
    } catch (error) {
      console.error('Error loading data:', error);
      this.showToast('Errore nel caricamento dei dati', 'error');
    }
  }

  async fetchSaveSlots() {
    // Mock data - in a real app this would come from game state
    const slots = [];
    
    // Generate some sample slots
    for (let i = 1; i <= 6; i++) {
      if (i <= 3) { // First 3 slots have data
        const date = new Date();
        date.setDate(date.getDate() - i * 3); // Each save is 3 days apart
        
        slots.push({
          id: i,
          name: `Carriera ${i}`,
          timestamp: date.toISOString(),
          gameDate: date.toISOString(),
          teamName: 'AC Milan',
          season: '2024/2025',
          budget: 50000000 - (i * 5000000),
          position: i,
          status: i === 1 ? 'active' : i === 3 ? 'backup' : ''
        });
      }
    }
    
    return slots;
  }

  async fetchCurrentSession() {
    // Mock data - in a real app this would come from game state
    return {
      id: 1,
      name: 'Carriera 1',
      createdAt: new Date().toISOString(),
      gameDate: new Date().toISOString(),
      teamName: 'AC Milan',
      season: '2024/2025',
      budget: 50000000,
      position: 1,
      status: 'active',
      playTime: 120, // minutes
      saveCount: 5,
      stats: {
        matchesPlayed: 15,
        wins: 10,
        draws: 3,
        losses: 2
      }
    };
  }

  renderComponents() {
    this.renderQuickSave();
    this.renderSaveSlots();
    this.renderBackupManager();
    this.renderExportImportTools();
    this.renderLoadConfirmModal();
    this.renderSponsorBanner();
  }

  renderQuickSave() {
    const container = document.getElementById('quickSaveContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'quick-save-button';
    container.appendChild(el);

    // Initialize QuickSaveButton component
    new QuickSaveButton(el, {
      autoSave: true,
      onSave: (data) => this.handleQuickSave(data),
      onLoad: (data) => this.handleQuickLoad(data)
    });
  }

  renderSaveSlots() {
    const container = document.getElementById('saveSlotContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create 6 save slots (filled or empty)
    for (let i = 1; i <= 6; i++) {
      const el = document.createElement('div');
      el.className = 'save-slot-card';
      el.dataset.slotId = i;
      container.appendChild(el);

      // Initialize SaveSlotCard component
      const slotData = this.saveSlots.find(slot => slot.id === i);
      const card = new SaveSlotCard(el, {
        slotId: i,
        onSave: (data) => this.handleSlotSaved({ saveData: data }),
        onLoad: (data) => this.handleSlotLoaded({ saveData: data }),
        onDelete: (id) => this.handleSlotDeleted({ slotId: id })
      });
      
      if (slotData) {
        card.setSaveData(slotData);
      }
    }
  }

  renderBackupManager() {
    const container = document.getElementById('backupManagerContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'backup-manager';
    container.appendChild(el);

    // Initialize BackupManager component
    new BackupManager(el, {
      maxSlots: 6,
      autoSave: true
    });
  }

  renderExportImportTools() {
    const container = document.getElementById('exportImportContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'export-import-tools';
    container.appendChild(el);

    // Initialize ExportImportTools component
    new ExportImportTools(el, {
      onExport: (data) => this.handleDataExported({ exportData: data }),
      onImport: (file, options) => this.handleDataImported({ file, options })
    });
  }

  renderLoadConfirmModal() {
    const container = document.getElementById('loadConfirmModalContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'load-confirm-modal modal';
    container.appendChild(el);

    // Initialize LoadConfirmModal component
    new LoadConfirmModal(el, {
      onConfirm: (data) => this.handleConfirmLoad(data),
      onCancel: () => console.log('Load cancelled'),
      onBackup: (data) => this.createBackupBeforeLoad(data)
    });
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    // Initialize SponsorBanner component
    new SponsorBanner(el, {
      autoClose: true,
      duration: 10000,
      sponsorData: {
        name: 'Bolt Manager Pro',
        description: 'Sblocca funzionalità avanzate con la versione Pro',
        logo: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        cta: 'Scopri di più',
        url: 'https://example.com/bolt-manager-pro',
        theme: 'premium'
      }
    });
  }

  renderSessionDetails(sessionData) {
    const container = document.getElementById('sessionDetailsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const el = document.createElement('div');
    el.className = 'session-details-panel';
    container.appendChild(el);

    // Initialize SessionDetailsPanel component
    new SessionDetailsPanel(el, sessionData);
    
    // Show session details section
    document.getElementById('sessionDetailsSection').style.display = 'block';
    document.querySelector('.save-slots-section').style.display = 'none';
  }

  showSaveSlots() {
    document.getElementById('sessionDetailsSection').style.display = 'none';
    document.querySelector('.save-slots-section').style.display = 'block';
  }

  showImportForm() {
    // Find ExportImportTools instance and trigger import
    const exportImportTools = document.querySelector('.export-import-tools');
    if (exportImportTools && exportImportTools.exportImportTools) {
      exportImportTools.exportImportTools.triggerImport();
    }
  }

  refreshSaveSlots() {
    this.loadData().then(() => {
      this.renderSaveSlots();
      this.showToast('Slot di salvataggio aggiornati', 'success');
    });
  }

  createNewSave() {
    // Find SaveSlotManager instance and trigger new save
    const saveSlotManager = document.querySelector('.save-slot-manager');
    if (saveSlotManager && saveSlotManager.saveSlotManager) {
      saveSlotManager.saveSlotManager.showNewSaveForm();
    } else {
      // Fallback if component not found
      const slotId = this.getNextAvailableSlotId();
      this.showToast(`Creazione nuovo salvataggio nello slot ${slotId}`, 'success');
      
      // Call Session_Save flow
      this.callSessionSaveFlow({
        slot_id: slotId,
        name: `Nuovo Salvataggio ${new Date().toLocaleDateString('it-IT')}`,
        overwrite: false
      });
    }
  }

  getNextAvailableSlotId() {
    for (let i = 1; i <= 6; i++) {
      if (!this.saveSlots.some(slot => slot.id === i)) {
        return i;
      }
    }
    return 1; // Default to first slot if all are taken
  }

  async callSessionSaveFlow(params) {
    try {
      // In a real app, this would call the actual flow
      console.log('Calling Session_Save flow with params:', params);
      
      // Mock successful response
      const result = {
        success: true,
        slot_id: params.slot_id,
        timestamp: new Date().toISOString()
      };
      
      // Refresh slots after save
      await this.loadData();
      this.renderSaveSlots();
      
      return result;
    } catch (error) {
      console.error('Error in Session_Save flow:', error);
      this.showToast('Errore durante il salvataggio', 'error');
      throw error;
    }
  }

  async callSessionLoadFlow(params) {
    try {
      // In a real app, this would call the actual flow
      console.log('Calling Session_Load flow with params:', params);
      
      // Mock successful response
      const result = {
        success: true,
        session_id: params.session_id,
        timestamp: new Date().toISOString()
      };
      
      return result;
    } catch (error) {
      console.error('Error in Session_Load flow:', error);
      this.showToast('Errore durante il caricamento', 'error');
      throw error;
    }
  }

  // Event handlers
  handleSlotSaved(detail) {
    console.log('Slot saved:', detail);
    this.showToast(`Salvataggio completato nello slot ${detail.saveData.id}`, 'success');
    this.refreshSaveSlots();
  }

  handleSlotLoaded(detail) {
    console.log('Slot loaded:', detail);
    
    // Show load confirmation modal
    const loadConfirmModal = document.querySelector('.load-confirm-modal');
    if (loadConfirmModal && loadConfirmModal.loadConfirmModal) {
      loadConfirmModal.loadConfirmModal.show(detail.saveData, this.currentSession);
    } else {
      // Fallback if modal not found
      if (confirm('Sei sicuro di voler caricare questo salvataggio? I progressi non salvati andranno persi.')) {
        this.handleConfirmLoad(detail.saveData);
      }
    }
  }

  handleSlotDeleted(detail) {
    console.log('Slot deleted:', detail);
    this.showToast(`Slot ${detail.slotId} eliminato`, 'success');
    this.refreshSaveSlots();
  }

  handleSaveDeleted(detail) {
    console.log('Save deleted:', detail);
    this.showToast(`Salvataggio eliminato`, 'success');
    this.refreshSaveSlots();
  }

  handleSessionLoad(detail) {
    console.log('Session load requested:', detail);
    
    // Call Session_Load flow
    this.callSessionLoadFlow({
      session_id: detail.sessionData.id
    }).then(() => {
      this.showToast(`Sessione "${detail.sessionData.name}" caricata con successo`, 'success');
    });
  }

  handleSessionExported(detail) {
    console.log('Session exported:', detail);
    this.showToast('Sessione esportata con successo', 'success');
  }

  handleSessionDuplicate(detail) {
    console.log('Session duplicate requested:', detail);
    
    // Find next available slot
    const slotId = this.getNextAvailableSlotId();
    
    // Call Session_Save flow with duplicate data
    this.callSessionSaveFlow({
      slot_id: slotId,
      name: `${detail.sessionData.name} (Copia)`,
      overwrite: false,
      source_session_id: detail.sessionData.id
    }).then(() => {
      this.showToast(`Sessione duplicata nello slot ${slotId}`, 'success');
      this.refreshSaveSlots();
    });
  }

  handleDataExported(detail) {
    console.log('Data exported:', detail);
    this.showToast('Dati esportati con successo', 'success');
  }

  handleDataImported(detail) {
    console.log('Data imported:', detail);
    this.showToast('Dati importati con successo', 'success');
    this.refreshSaveSlots();
  }

  handleQuickSave(data) {
    console.log('Quick save:', data);
    
    // Call Session_Save flow
    this.callSessionSaveFlow({
      slot_id: 1, // Use first slot for quick save
      name: 'Salvataggio Rapido',
      overwrite: true
    }).then(() => {
      this.showToast('Salvataggio rapido completato', 'success');
      this.refreshSaveSlots();
    });
  }

  handleQuickLoad(data) {
    console.log('Quick load:', data);
    
    // Show load confirmation
    const loadConfirmModal = document.querySelector('.load-confirm-modal');
    if (loadConfirmModal && loadConfirmModal.loadConfirmModal) {
      loadConfirmModal.loadConfirmModal.show(data, this.currentSession);
    } else {
      // Fallback if modal not found
      if (confirm('Sei sicuro di voler caricare il salvataggio rapido? I progressi non salvati andranno persi.')) {
        this.handleConfirmLoad(data);
      }
    }
  }

  handleConfirmLoad(saveData) {
    console.log('Confirm load:', saveData);
    
    // Call Session_Load flow
    this.callSessionLoadFlow({
      session_id: saveData.id
    }).then(() => {
      this.showToast(`Salvataggio "${saveData.name}" caricato con successo`, 'success');
    });
  }

  createBackupBeforeLoad(currentSessionData) {
    console.log('Creating backup before load:', currentSessionData);
    
    // Find BackupManager instance and trigger auto backup
    const backupManager = document.querySelector('.backup-manager');
    if (backupManager && backupManager.backupManager) {
      const result = backupManager.backupManager.triggerAutoBackup();
      if (result) {
        this.showToast('Backup creato prima del caricamento', 'success');
      }
    }
  }

  showToast(message, type = 'info') {
    // Dispatch event to show toast
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type }
    }));
  }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SessionManagerPage();
});
</script>