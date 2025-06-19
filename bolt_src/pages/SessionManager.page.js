import SaveSlotManager from '../components/SaveSlotManager.js';
import SessionList from '../components/SessionList.js';

export default class SessionManagerPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.saveSlots = [];
    this.sessions = [];
    this.selectedSession = null;
    this.currentView = 'slots'; // 'slots' or 'sessions'
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="session-manager-page">
        <div class="page-header">
          <h2 class="page-title">Gestione Salvataggi</h2>
          <div class="page-actions">
            <button class="button button-secondary import-btn">📥 Importa</button>
            <button class="button button-secondary export-all-btn">📤 Esporta Tutto</button>
            <button class="button button-primary quick-save-btn">💾 Salvataggio Rapido</button>
          </div>
        </div>

        <!-- View Toggle -->
        <div class="view-toggle-section">
          <div class="view-toggle">
            <button class="view-toggle-btn ${this.currentView === 'slots' ? 'active' : ''}" data-view="slots">
              📁 Slot di Salvataggio
            </button>
            <button class="view-toggle-btn ${this.currentView === 'sessions' ? 'active' : ''}" data-view="sessions">
              📋 Lista Sessioni
            </button>
          </div>
          
          <div class="view-info">
            <span class="info-text" id="viewInfoText">
              ${this.currentView === 'slots' ? 'Gestisci i tuoi slot di salvataggio' : 'Visualizza tutte le sessioni salvate'}
            </span>
          </div>
        </div>

        <!-- Save Slots View -->
        <div class="save-slots-view ${this.currentView === 'slots' ? 'active' : 'hidden'}" id="saveSlotsView">
          <div class="slots-section">
            <div id="saveSlotManager" class="save-slot-manager-container"></div>
          </div>
        </div>

        <!-- Sessions List View -->
        <div class="sessions-list-view ${this.currentView === 'sessions' ? 'active' : 'hidden'}" id="sessionsListView">
          <div class="sessions-section">
            <div id="sessionList" class="session-list-container"></div>
          </div>
        </div>

        <!-- Session Details Panel -->
        <div class="session-details-panel" id="sessionDetailsPanel" style="display: none;">
          <div class="details-header">
            <h3 class="details-title">Dettagli Sessione</h3>
            <button class="button button-ghost back-to-list-btn">← Torna alla Lista</button>
          </div>
          
          <div class="details-content" id="sessionDetailsContent">
            <!-- Session details will be rendered here -->
          </div>
        </div>

        <!-- Backup & Recovery Section -->
        <div class="backup-recovery-section">
          <h3 class="section-title">Backup e Ripristino</h3>
          <div class="backup-tools">
            <div class="backup-info">
              <div class="info-item">
                <span class="info-label">Ultimo Backup:</span>
                <span class="info-value" id="lastBackupTime">Mai</span>
              </div>
              <div class="info-item">
                <span class="info-label">Backup Automatico:</span>
                <span class="info-value">
                  <label class="toggle-switch">
                    <input type="checkbox" class="auto-backup-toggle" checked>
                    <span class="toggle-slider"></span>
                  </label>
                </span>
              </div>
            </div>
            
            <div class="backup-actions">
              <button class="button button-secondary create-backup-btn">🛡️ Crea Backup</button>
              <button class="button button-secondary restore-backup-btn">🔄 Ripristina Backup</button>
              <button class="button button-ghost clean-old-backups-btn">🧹 Pulisci Vecchi Backup</button>
            </div>
          </div>
        </div>

        <!-- Import/Export Tools -->
        <div class="import-export-section">
          <h3 class="section-title">Strumenti Avanzati</h3>
          <div class="tools-grid">
            <div class="tool-card">
              <div class="tool-icon">📥</div>
              <h5 class="tool-title">Importa Dati</h5>
              <p class="tool-description">Importa salvataggi da file esterni</p>
              <input type="file" class="import-file-input" accept=".json" style="display: none;">
              <button class="button button-secondary import-file-btn">Seleziona File</button>
            </div>
            
            <div class="tool-card">
              <div class="tool-icon">📤</div>
              <h5 class="tool-title">Esporta Dati</h5>
              <p class="tool-description">Esporta tutti i salvataggi in un file</p>
              <button class="button button-secondary export-all-data-btn">Esporta Tutto</button>
            </div>
            
            <div class="tool-card">
              <div class="tool-icon">🔄</div>
              <h5 class="tool-title">Sincronizzazione</h5>
              <p class="tool-description">Sincronizza con cloud storage</p>
              <button class="button button-secondary sync-cloud-btn">Configura Sync</button>
            </div>
            
            <div class="tool-card">
              <div class="tool-icon">🧹</div>
              <h5 class="tool-title">Pulizia</h5>
              <p class="tool-description">Rimuovi salvataggi duplicati o corrotti</p>
              <button class="button button-secondary cleanup-btn">Avvia Pulizia</button>
            </div>
          </div>
          <!-- Versione avanzata con componente riutilizzabile -->
          <div class="export-import-tools"></div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.loadSessionData();
    this.renderSaveSlotManager();
    this.renderSessionList();
    this.renderSponsorBanner();
    this.bindEvents();
    this.updateLastBackupTime();
  }

  loadSessionData() {
    // Mock data - in a real app this would load from localStorage or API
    this.saveSlots = this.generateMockSaveSlots();
    this.sessions = this.generateMockSessions();
  }

  renderSaveSlotManager() {
    const container = document.getElementById('saveSlotManager');
    
    new SaveSlotManager(container, {
      maxSlots: 6,
      onSave: (saveData) => this.handleSlotSave(saveData),
      onLoad: (slotData) => this.handleSlotLoad(slotData),
      onDelete: (slotId) => this.handleSlotDelete(slotId),
      onSlotClick: (slotId, slotData) => this.handleSlotClick(slotId, slotData),
      showPreview: true
    });
  }

  renderSessionList() {
    const container = document.getElementById('sessionList');
    
    new SessionList(container, {
      sessions: this.sessions,
      onSessionSelect: (session) => this.handleSessionSelect(session),
      onSessionLoad: (session) => this.handleSessionLoad(session),
      onSessionDelete: (session) => this.handleSessionDelete(session),
      onSessionExport: (session) => this.handleSessionExport(session),
      onSessionDuplicate: (session) => this.handleSessionDuplicate(session),
      showActions: true,
      sortBy: 'timestamp',
      sortOrder: 'desc'
    });
  }

  renderSessionDetails(session) {
    const container = document.getElementById('sessionDetailsContent');
    
    container.innerHTML = `
      <div class="session-details">
        <div class="session-overview">
          <div class="overview-header">
            <h4>${session.name}</h4>
            <span class="session-status ${session.status}">${this.getStatusText(session.status)}</span>
          </div>
          
          <div class="overview-stats">
            <div class="stat-card">
              <span class="stat-value">${session.teamName}</span>
              <span class="stat-label">Squadra</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">${session.season}</span>
              <span class="stat-label">Stagione</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">€${this.formatCurrency(session.budget)}</span>
              <span class="stat-label">Budget</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">${session.position}°</span>
              <span class="stat-label">Posizione</span>
            </div>
          </div>
        </div>
        
        <div class="session-metadata">
          <h5>Informazioni Sessione</h5>
          <div class="metadata-grid">
            <div class="metadata-item">
              <span class="metadata-label">Creata il:</span>
              <span class="metadata-value">${this.formatDateTime(session.createdAt)}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">Ultimo salvataggio:</span>
              <span class="metadata-value">${this.formatDateTime(session.timestamp)}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">Tempo di gioco:</span>
              <span class="metadata-value">${this.formatPlayTime(session.playTime)}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-label">Numero salvataggi:</span>
              <span class="metadata-value">${session.saveCount || 0}</span>
            </div>
          </div>
        </div>
        
        ${session.stats ? `
          <div class="session-statistics">
            <h5>Statistiche Partite</h5>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">${session.stats.matchesPlayed}</span>
                <span class="stat-name">Partite Giocate</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${session.stats.wins}</span>
                <span class="stat-name">Vittorie</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${session.stats.draws}</span>
                <span class="stat-name">Pareggi</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">${session.stats.losses}</span>
                <span class="stat-name">Sconfitte</span>
              </div>
            </div>
            
            <div class="win-rate">
              <span class="win-rate-label">Percentuale Vittorie:</span>
              <span class="win-rate-value">${this.calculateWinRate(session.stats)}%</span>
            </div>
          </div>
        ` : ''}
        
        <div class="session-actions-detailed">
          <button class="button button-primary load-session-detailed-btn">📂 Carica Sessione</button>
          <button class="button button-secondary duplicate-session-detailed-btn">📋 Duplica</button>
          <button class="button button-secondary export-session-detailed-btn">📤 Esporta</button>
          <button class="button button-danger delete-session-detailed-btn">🗑️ Elimina</button>
        </div>
      </div>
    `;
    
    // Bind detailed action buttons
    const loadBtn = container.querySelector('.load-session-detailed-btn');
    const duplicateBtn = container.querySelector('.duplicate-session-detailed-btn');
    const exportBtn = container.querySelector('.export-session-detailed-btn');
    const deleteBtn = container.querySelector('.delete-session-detailed-btn');
    
    loadBtn?.addEventListener('click', () => this.handleSessionLoad(session));
    duplicateBtn?.addEventListener('click', () => this.handleSessionDuplicate(session));
    exportBtn?.addEventListener('click', () => this.handleSessionExport(session));
    deleteBtn?.addEventListener('click', () => this.handleSessionDelete(session));
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Gestione professionale dei tuoi salvataggi</span>
      </div>
    `;
  }

  bindEvents() {
    // View toggle
    const viewToggleBtns = this.container.querySelectorAll('.view-toggle-btn');
    viewToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // Page action buttons
    const importBtn = this.container.querySelector('.import-btn');
    const exportAllBtn = this.container.querySelector('.export-all-btn');
    const quickSaveBtn = this.container.querySelector('.quick-save-btn');
    
    importBtn?.addEventListener('click', () => this.showImportDialog());
    exportAllBtn?.addEventListener('click', () => this.exportAllData());
    quickSaveBtn?.addEventListener('click', () => this.performQuickSave());

    // Session details navigation
    const backToListBtn = this.container.querySelector('.back-to-list-btn');
    backToListBtn?.addEventListener('click', () => this.hideSessionDetails());

    // Backup tools
    const autoBackupToggle = this.container.querySelector('.auto-backup-toggle');
    const createBackupBtn = this.container.querySelector('.create-backup-btn');
    const restoreBackupBtn = this.container.querySelector('.restore-backup-btn');
    const cleanBackupsBtn = this.container.querySelector('.clean-old-backups-btn');
    
    autoBackupToggle?.addEventListener('change', (e) => this.toggleAutoBackup(e.target.checked));
    createBackupBtn?.addEventListener('click', () => this.createBackup());
    restoreBackupBtn?.addEventListener('click', () => this.restoreBackup());
    cleanBackupsBtn?.addEventListener('click', () => this.cleanOldBackups());

    // Import/Export tools
    const importFileBtn = this.container.querySelector('.import-file-btn');
    const importFileInput = this.container.querySelector('.import-file-input');
    const exportAllDataBtn = this.container.querySelector('.export-all-data-btn');
    const syncCloudBtn = this.container.querySelector('.sync-cloud-btn');
    const cleanupBtn = this.container.querySelector('.cleanup-btn');
    
    importFileBtn?.addEventListener('click', () => importFileInput?.click());
    importFileInput?.addEventListener('change', (e) => this.handleFileImport(e));
    exportAllDataBtn?.addEventListener('click', () => this.exportAllData());
    syncCloudBtn?.addEventListener('click', () => this.configureCloudSync());
    cleanupBtn?.addEventListener('click', () => this.performCleanup());
  }

  switchView(view) {
    this.currentView = view;
    
    // Update toggle buttons
    const viewToggleBtns = this.container.querySelectorAll('.view-toggle-btn');
    viewToggleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update view containers
    const slotsView = this.container.querySelector('#saveSlotsView');
    const sessionsView = this.container.querySelector('#sessionsListView');
    const viewInfoText = this.container.querySelector('#viewInfoText');
    
    slotsView.classList.toggle('active', view === 'slots');
    slotsView.classList.toggle('hidden', view !== 'slots');
    sessionsView.classList.toggle('active', view === 'sessions');
    sessionsView.classList.toggle('hidden', view !== 'sessions');
    
    // Update info text
    if (viewInfoText) {
      viewInfoText.textContent = view === 'slots' ? 
        'Gestisci i tuoi slot di salvataggio' : 
        'Visualizza tutte le sessioni salvate';
    }
  }

  handleSlotSave(saveData) {
    console.log('Slot save:', saveData);
    
    // Simulate save operation
    const newSlot = {
      id: saveData.slotId,
      name: saveData.name,
      timestamp: saveData.timestamp,
      gameDate: new Date().toISOString(),
      teamName: 'AC Milan',
      season: '2024/2025',
      budget: 50000000,
      position: 1,
      status: 'active',
      playTime: 120,
      description: saveData.description
    };
    
    // Update save slots
    const existingIndex = this.saveSlots.findIndex(s => s.id === saveData.slotId);
    if (existingIndex >= 0) {
      this.saveSlots[existingIndex] = newSlot;
    } else {
      this.saveSlots.push(newSlot);
    }
    
    // Update save slot manager
    const saveSlotManager = document.getElementById('saveSlotManager');
    if (saveSlotManager?.saveSlotManager) {
      saveSlotManager.saveSlotManager.addSaveSlot(newSlot);
    }
    
    this.showToast(`Salvataggio completato nello slot ${saveData.slotId}`, 'success');
  }

  handleSlotLoad(slotData) {
    console.log('Slot load:', slotData);
    
    if (confirm(`Sei sicuro di voler caricare "${slotData.name}"? I progressi non salvati andranno persi.`)) {
      this.showToast(`Caricamento di "${slotData.name}" in corso...`, 'info');
      
      // Simulate load operation
      setTimeout(() => {
        this.showToast(`"${slotData.name}" caricato con successo!`, 'success');
      }, 2000);
    }
  }

  handleSlotDelete(slotId) {
    console.log('Slot delete:', slotId);
    
    // Remove from save slots
    this.saveSlots = this.saveSlots.filter(s => s.id !== slotId);
    
    this.showToast(`Slot ${slotId} eliminato`, 'success');
  }

  handleSlotClick(slotId, slotData) {
    console.log('Slot click:', slotId, slotData);
    
    if (slotData) {
      this.showToast(`Slot ${slotId}: ${slotData.name}`, 'info');
    }
  }

  handleSessionSelect(session) {
    this.selectedSession = session;
    this.showSessionDetails(session);
  }

  handleSessionLoad(session) {
    console.log('Session load:', session);
    
    if (confirm(`Sei sicuro di voler caricare "${session.name}"? I progressi non salvati andranno persi.`)) {
      this.showToast(`Caricamento di "${session.name}" in corso...`, 'info');
      
      // Simulate load operation
      setTimeout(() => {
        this.showToast(`"${session.name}" caricato con successo!`, 'success');
      }, 2000);
    }
  }

  handleSessionDelete(session) {
    console.log('Session delete:', session);
    
    if (confirm(`Sei sicuro di voler eliminare "${session.name}"? Questa azione non può essere annullata.`)) {
      // Remove from sessions
      this.sessions = this.sessions.filter(s => s.id !== session.id);
      
      // Update session list
      const sessionList = document.getElementById('sessionList');
      if (sessionList?.sessionList) {
        sessionList.sessionList.removeSession(session.id);
      }
      
      this.showToast(`Sessione "${session.name}" eliminata`, 'success');
    }
  }

  handleSessionExport(session) {
    console.log('Session export:', session);
    
    const exportData = {
      ...session,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `session-${session.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    
    this.showToast(`Sessione "${session.name}" esportata`, 'success');
  }

  handleSessionDuplicate(session) {
    console.log('Session duplicate:', session);
    
    const duplicateSession = {
      ...session,
      id: Date.now(),
      name: `${session.name} (Copia)`,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    this.sessions.push(duplicateSession);
    
    // Update session list
    const sessionList = document.getElementById('sessionList');
    if (sessionList?.sessionList) {
      sessionList.sessionList.addSession(duplicateSession);
    }
    
    this.showToast(`Sessione "${session.name}" duplicata`, 'success');
  }

  showSessionDetails(session) {
    this.renderSessionDetails(session);
    
    const detailsPanel = this.container.querySelector('#sessionDetailsPanel');
    const sessionsView = this.container.querySelector('#sessionsListView');
    
    detailsPanel.style.display = 'block';
    sessionsView.style.display = 'none';
  }

  hideSessionDetails() {
    const detailsPanel = this.container.querySelector('#sessionDetailsPanel');
    const sessionsView = this.container.querySelector('#sessionsListView');
    
    detailsPanel.style.display = 'none';
    sessionsView.style.display = 'block';
    
    this.selectedSession = null;
  }

  showImportDialog() {
    const importFileInput = this.container.querySelector('.import-file-input');
    importFileInput?.click();
  }

  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        this.processImportData(importData);
      } catch (error) {
        this.showToast('Errore nel file importato', 'error');
      }
    };
    reader.readAsText(file);
  }

  processImportData(importData) {
    console.log('Processing import data:', importData);
    
    // Validate and process import data
    if (importData.sessions) {
      this.sessions.push(...importData.sessions);
    }
    
    if (importData.saveSlots) {
      this.saveSlots.push(...importData.saveSlots);
    }
    
    // Update components
    this.renderSessionList();
    this.renderSaveSlotManager();
    
    this.showToast('Dati importati con successo', 'success');
  }

  exportAllData() {
    const exportData = {
      sessions: this.sessions,
      saveSlots: this.saveSlots,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `allenatore-nato-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    this.showToast('Tutti i dati esportati con successo', 'success');
  }

  performQuickSave() {
    const quickSaveData = {
      slotId: 1, // Use first slot for quick save
      name: `Salvataggio Rapido ${new Date().toLocaleTimeString('it-IT')}`,
      description: 'Salvataggio rapido automatico',
      timestamp: new Date().toISOString()
    };
    
    this.handleSlotSave(quickSaveData);
  }

  toggleAutoBackup(enabled) {
    console.log('Auto backup:', enabled);
    this.showToast(`Backup automatico ${enabled ? 'attivato' : 'disattivato'}`, 'info');
  }

  createBackup() {
    this.showToast('Creazione backup in corso...', 'info');
    
    setTimeout(() => {
      this.updateLastBackupTime();
      this.showToast('Backup creato con successo', 'success');
    }, 2000);
  }

  restoreBackup() {
    if (confirm('Sei sicuro di voler ripristinare l\'ultimo backup? I dati attuali andranno persi.')) {
      this.showToast('Ripristino backup in corso...', 'info');
      
      setTimeout(() => {
        this.showToast('Backup ripristinato con successo', 'success');
      }, 2000);
    }
  }

  cleanOldBackups() {
    if (confirm('Sei sicuro di voler eliminare i backup più vecchi di 30 giorni?')) {
      this.showToast('Pulizia backup completata', 'success');
    }
  }

  configureCloudSync() {
    this.showToast('Configurazione sincronizzazione cloud', 'info');
  }

  performCleanup() {
    if (confirm('Sei sicuro di voler avviare la pulizia? Verranno rimossi salvataggi duplicati e corrotti.')) {
      this.showToast('Pulizia completata: 0 file rimossi', 'success');
    }
  }

  updateLastBackupTime() {
    const lastBackupTime = this.container.querySelector('#lastBackupTime');
    if (lastBackupTime) {
      lastBackupTime.textContent = new Date().toLocaleString('it-IT');
    }
  }

  generateMockSaveSlots() {
    return [
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

  generateMockSessions() {
    return [
      {
        id: 1,
        name: 'Carriera AC Milan',
        createdAt: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        gameDate: new Date().toISOString(),
        teamName: 'AC Milan',
        season: '2024/2025',
        budget: 50000000,
        position: 1,
        status: 'active',
        playTime: 1200,
        saveCount: 15,
        stats: {
          matchesPlayed: 25,
          wins: 18,
          draws: 4,
          losses: 3
        }
      },
      {
        id: 2,
        name: 'Sfida Juventus',
        createdAt: new Date(Date.now() - 1296000000).toISOString(), // 15 days ago
        timestamp: new Date(Date.now() - 432000000).toISOString(),
        gameDate: new Date(Date.now() - 86400000).toISOString(),
        teamName: 'Juventus',
        season: '2024/2025',
        budget: 75000000,
        position: 3,
        status: 'backup',
        playTime: 480,
        saveCount: 8,
        stats: {
          matchesPlayed: 12,
          wins: 7,
          draws: 3,
          losses: 2
        }
      }
    ];
  }

  getStatusText(status) {
    const statusMap = {
      'active': 'Attiva',
      'backup': 'Backup',
      'completed': 'Completata',
      'archived': 'Archiviata'
    };
    return statusMap[status] || 'Normale';
  }

  calculateWinRate(stats) {
    if (!stats || stats.matchesPlayed === 0) return 0;
    return Math.round((stats.wins / stats.matchesPlayed) * 100);
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

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}