export const template = `
<div class="backup-manager">
  <div class="manager-header">
    <h3 class="manager-title">Gestione Backup</h3>
    <div class="manager-actions">
      <button class="action-btn create-backup-btn" aria-label="Crea nuovo backup">
        📦 Crea Backup
      </button>
      <button class="action-btn import-btn" aria-label="Importa backup">
        📥 Importa
      </button>
    </div>
  </div>
  
  <div class="backup-list-container">
    <div class="backup-list">
      <!-- Backup items will be populated dynamically -->
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">📦</div>
      <h4>Nessun Backup Disponibile</h4>
      <p>Crea un backup per proteggere i tuoi progressi</p>
    </div>
    
    <div class="loading-state" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento backup...</span>
    </div>
  </div>
  
  <div class="backup-settings">
    <h4>Impostazioni Backup</h4>
    <div class="settings-grid">
      <div class="setting-item">
        <label class="setting-label">
          <input type="checkbox" class="auto-backup-toggle" checked>
          <span>Backup Automatico</span>
        </label>
        <select class="auto-backup-interval">
          <option value="daily">Giornaliero</option>
          <option value="weekly" selected>Settimanale</option>
          <option value="monthly">Mensile</option>
        </select>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">
          <input type="checkbox" class="cloud-backup-toggle">
          <span>Backup su Cloud</span>
        </label>
        <button class="cloud-settings-btn" disabled>
          ⚙️ Configura
        </button>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Backup da mantenere:</label>
        <select class="backup-retention">
          <option value="3">3 backup</option>
          <option value="5" selected>5 backup</option>
          <option value="10">10 backup</option>
          <option value="0">Illimitati</option>
        </select>
      </div>
      
      <div class="setting-item">
        <label class="setting-label">Compressione:</label>
        <select class="backup-compression">
          <option value="none">Nessuna</option>
          <option value="standard" selected>Standard</option>
          <option value="high">Alta</option>
        </select>
      </div>
    </div>
    
    <div class="settings-actions">
      <button class="button button-secondary save-settings-btn">
        Salva Impostazioni
      </button>
    </div>
  </div>
  
  <div class="import-form" style="display: none;">
    <h4>Importa Backup</h4>
    <div class="import-dropzone">
      <div class="dropzone-content">
        <div class="dropzone-icon">📥</div>
        <div class="dropzone-text">Trascina qui il file di backup o clicca per selezionarlo</div>
      </div>
      <input type="file" class="file-input" accept=".json,.zip" aria-label="Seleziona file di backup">
    </div>
    
    <div class="import-actions">
      <button class="button button-ghost cancel-import-btn">
        Annulla
      </button>
      <button class="button button-primary import-file-btn" disabled>
        Importa File
      </button>
    </div>
  </div>
  
  <div class="backup-progress" style="display: none;">
    <div class="progress-text">Operazione in corso...</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <div class="progress-status">Elaborazione dati...</div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-backup">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Backup Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.backup-manager {
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

.backup-list-container {
  margin-bottom: 20px;
  min-height: 200px;
}

.backup-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.backup-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.backup-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.backup-icon {
  font-size: 24px;
  color: var(--primary);
}

.backup-info {
  flex: 1;
}

.backup-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.backup-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}

.backup-size {
  display: flex;
  align-items: center;
  gap: 4px;
}

.backup-date {
  display: flex;
  align-items: center;
  gap: 4px;
}

.backup-actions {
  display: flex;
  gap: 8px;
}

.backup-btn {
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.backup-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.backup-btn.delete-btn:hover {
  background: var(--error);
  border-color: var(--error);
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

.backup-settings {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.backup-settings h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
}

.setting-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.auto-backup-interval,
.backup-retention,
.backup-compression {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  font-size: 12px;
  min-width: 120px;
}

.cloud-settings-btn {
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.cloud-settings-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.cloud-settings-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
}

.import-form {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.import-form h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.import-dropzone {
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-bottom: 16px;
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

.import-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.backup-progress {
  margin-top: 16px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 12px;
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

.sponsor-slot-backup {
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
  
  .backup-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .backup-actions {
    align-self: flex-end;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .sponsor-slot-backup {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class BackupManager {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxBackups: 5,
      autoBackup: true,
      autoBackupInterval: 'weekly',
      compression: 'standard',
      ...options
    };
    
    this.backups = [];
    this.selectedFile = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadBackups();
    this.loadSettings();
  }
  
  bindEvents() {
    // Create backup button
    this.element.querySelector('.create-backup-btn').addEventListener('click', () => {
      this.createBackup();
    });
    
    // Import button
    this.element.querySelector('.import-btn').addEventListener('click', () => {
      this.showImportForm();
    });
    
    // Settings toggles and selects
    this.element.querySelector('.auto-backup-toggle').addEventListener('change', (e) => {
      this.options.autoBackup = e.target.checked;
      this.updateCloudSettingsState();
    });
    
    this.element.querySelector('.auto-backup-interval').addEventListener('change', (e) => {
      this.options.autoBackupInterval = e.target.value;
    });
    
    this.element.querySelector('.cloud-backup-toggle').addEventListener('change', (e) => {
      this.options.cloudBackup = e.target.checked;
      this.updateCloudSettingsState();
    });
    
    this.element.querySelector('.backup-retention').addEventListener('change', (e) => {
      this.options.maxBackups = parseInt(e.target.value);
    });
    
    this.element.querySelector('.backup-compression').addEventListener('change', (e) => {
      this.options.compression = e.target.value;
    });
    
    // Save settings button
    this.element.querySelector('.save-settings-btn').addEventListener('click', () => {
      this.saveSettings();
    });
    
    // Import form
    this.element.querySelector('.import-dropzone').addEventListener('click', () => {
      this.element.querySelector('.file-input').click();
    });
    
    this.element.querySelector('.file-input').addEventListener('change', (e) => {
      this.handleFileSelect(e);
    });
    
    this.element.querySelector('.cancel-import-btn').addEventListener('click', () => {
      this.hideImportForm();
    });
    
    this.element.querySelector('.import-file-btn').addEventListener('click', () => {
      this.importBackup();
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
  
  async loadBackups() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from localStorage or game state
      this.backups = await this.fetchBackups();
      this.renderBackups();
    } catch (error) {
      console.error('Error loading backups:', error);
      this.showError('Errore nel caricamento dei backup');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchBackups() {
    // Mock data - in real app this would come from game state
    const backups = [];
    
    // Generate some sample backups
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7); // Weekly backups
      
      backups.push({
        id: i + 1,
        name: `Backup ${i + 1}`,
        date: date.toISOString(),
        size: Math.floor(Math.random() * 5) + 1, // 1-5 MB
        type: i === 0 ? 'auto' : 'manual'
      });
    }
    
    return backups;
  }
  
  renderBackups() {
    const backupList = this.element.querySelector('.backup-list');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing backups
    backupList.innerHTML = '';
    
    // Show empty state if no backups
    if (this.backups.length === 0) {
      backupList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show backups
    backupList.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Render backups
    this.backups.forEach(backup => {
      const backupElement = this.createBackupElement(backup);
      backupList.appendChild(backupElement);
    });
  }
  
  createBackupElement(backup) {
    const element = document.createElement('div');
    element.className = 'backup-item';
    element.dataset.backupId = backup.id;
    
    const backupDate = new Date(backup.date);
    const formattedDate = this.formatDate(backupDate);
    
    element.innerHTML = `
      <div class="backup-icon">📦</div>
      <div class="backup-info">
        <div class="backup-name">${backup.name}</div>
        <div class="backup-meta">
          <div class="backup-size">
            <span>📊</span>
            <span>${backup.size} MB</span>
          </div>
          <div class="backup-date">
            <span>🕒</span>
            <span>${formattedDate}</span>
          </div>
          <div class="backup-type">
            ${backup.type === 'auto' ? 'Automatico' : 'Manuale'}
          </div>
        </div>
      </div>
      <div class="backup-actions">
        <button class="backup-btn restore-btn" aria-label="Ripristina backup">
          🔄 Ripristina
        </button>
        <button class="backup-btn export-btn" aria-label="Esporta backup">
          📤 Esporta
        </button>
        <button class="backup-btn delete-btn" aria-label="Elimina backup">
          🗑️ Elimina
        </button>
      </div>
    `;
    
    // Add event listeners
    element.querySelector('.restore-btn').addEventListener('click', () => {
      this.restoreBackup(backup.id);
    });
    
    element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportBackup(backup.id);
    });
    
    element.querySelector('.delete-btn').addEventListener('click', () => {
      this.deleteBackup(backup.id);
    });
    
    return element;
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
  
  loadSettings() {
    // In a real app, this would load from localStorage or game state
    try {
      const settingsJson = localStorage.getItem('bolt_backup_settings');
      if (settingsJson) {
        const settings = JSON.parse(settingsJson);
        this.options = { ...this.options, ...settings };
      }
      
      this.updateSettingsUI();
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }
  
  updateSettingsUI() {
    // Update toggles
    this.element.querySelector('.auto-backup-toggle').checked = this.options.autoBackup;
    this.element.querySelector('.cloud-backup-toggle').checked = this.options.cloudBackup;
    
    // Update selects
    this.element.querySelector('.auto-backup-interval').value = this.options.autoBackupInterval;
    this.element.querySelector('.backup-retention').value = this.options.maxBackups;
    this.element.querySelector('.backup-compression').value = this.options.compression;
    
    // Update cloud settings button state
    this.updateCloudSettingsState();
  }
  
  updateCloudSettingsState() {
    const cloudSettingsBtn = this.element.querySelector('.cloud-settings-btn');
    cloudSettingsBtn.disabled = !this.options.cloudBackup;
  }
  
  saveSettings() {
    // In a real app, this would save to localStorage or game state
    try {
      const settings = {
        autoBackup: this.options.autoBackup,
        autoBackupInterval: this.options.autoBackupInterval,
        cloudBackup: this.options.cloudBackup,
        maxBackups: this.options.maxBackups,
        compression: this.options.compression
      };
      
      localStorage.setItem('bolt_backup_settings', JSON.stringify(settings));
      
      // Dispatch settings saved event
      this.element.dispatchEvent(new CustomEvent('backupSettingsSaved', {
        detail: { settings }
      }));
      
      this.showSuccess('Impostazioni salvate');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showError('Errore nel salvataggio delle impostazioni');
    }
  }
  
  createBackup() {
    this.showProgress('Creazione backup in corso...', 'Preparazione dati...');
    
    // Simulate backup process
    let progress = 0;
    const progressFill = this.element.querySelector('.progress-fill');
    const progressStatus = this.element.querySelector('.progress-status');
    const progressInterval = setInterval(() => {
      progress += 5;
      progressFill.style.width = `${progress}%`;
      
      if (progress === 25) {
        progressStatus.textContent = 'Salvataggio dati di gioco...';
      } else if (progress === 50) {
        progressStatus.textContent = 'Compressione file...';
      } else if (progress === 75) {
        progressStatus.textContent = 'Finalizzazione backup...';
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'Backup completato!';
        
        setTimeout(() => {
          this.hideProgress();
          this.completeBackup();
        }, 500);
      }
    }, 100);
  }
  
  completeBackup() {
    try {
      // Create new backup
      const newBackup = {
        id: Date.now(),
        name: `Backup ${this.backups.length + 1}`,
        date: new Date().toISOString(),
        size: Math.floor(Math.random() * 5) + 1, // 1-5 MB
        type: 'manual'
      };
      
      // Add to backups list
      this.backups.unshift(newBackup);
      
      // Enforce max backups limit
      if (this.options.maxBackups > 0 && this.backups.length > this.options.maxBackups) {
        this.backups = this.backups.slice(0, this.options.maxBackups);
      }
      
      // Update UI
      this.renderBackups();
      
      // Dispatch backup created event
      this.element.dispatchEvent(new CustomEvent('backupCreated', {
        detail: { backup: newBackup }
      }));
      
      this.showSuccess('Backup creato con successo');
    } catch (error) {
      console.error('Error creating backup:', error);
      this.showError('Errore nella creazione del backup');
    }
  }
  
  restoreBackup(backupId) {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) return;
    
    if (confirm(`Sei sicuro di voler ripristinare il backup "${backup.name}"? I progressi non salvati andranno persi.`)) {
      this.showProgress('Ripristino backup in corso...', 'Preparazione dati...');
      
      // Simulate restore process
      let progress = 0;
      const progressFill = this.element.querySelector('.progress-fill');
      const progressStatus = this.element.querySelector('.progress-status');
      const progressInterval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        
        if (progress === 25) {
          progressStatus.textContent = 'Decompressione file...';
        } else if (progress === 50) {
          progressStatus.textContent = 'Ripristino dati di gioco...';
        } else if (progress === 75) {
          progressStatus.textContent = 'Verifica integrità...';
        }
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          progressStatus.textContent = 'Ripristino completato!';
          
          setTimeout(() => {
            this.hideProgress();
            this.completeRestore(backup);
          }, 500);
        }
      }, 100);
    }
  }
  
  completeRestore(backup) {
    try {
      // In a real app, this would restore the game state from the backup
      
      // Dispatch backup restored event
      this.element.dispatchEvent(new CustomEvent('backupRestored', {
        detail: { backup }
      }));
      
      this.showSuccess('Backup ripristinato con successo');
    } catch (error) {
      console.error('Error restoring backup:', error);
      this.showError('Errore nel ripristino del backup');
    }
  }
  
  exportBackup(backupId) {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) return;
    
    this.showProgress('Esportazione backup in corso...', 'Preparazione dati...');
    
    // Simulate export process
    let progress = 0;
    const progressFill = this.element.querySelector('.progress-fill');
    const progressStatus = this.element.querySelector('.progress-status');
    const progressInterval = setInterval(() => {
      progress += 10;
      progressFill.style.width = `${progress}%`;
      
      if (progress === 30) {
        progressStatus.textContent = 'Compressione file...';
      } else if (progress === 60) {
        progressStatus.textContent = 'Generazione download...';
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'Esportazione completata!';
        
        setTimeout(() => {
          this.hideProgress();
          this.completeExport(backup);
        }, 500);
      }
    }, 100);
  }
  
  completeExport(backup) {
    try {
      // Create a JSON representation of the backup
      const backupData = {
        id: backup.id,
        name: backup.name,
        date: backup.date,
        type: backup.type,
        gameData: {
          // This would contain the actual game data in a real app
          team: 'AC Milan',
          season: '2024/2025',
          players: [],
          matches: []
        }
      };
      
      // Create a download link
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${backup.name.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Dispatch backup exported event
      this.element.dispatchEvent(new CustomEvent('backupExported', {
        detail: { backup }
      }));
      
      this.showSuccess('Backup esportato con successo');
    } catch (error) {
      console.error('Error exporting backup:', error);
      this.showError('Errore nell\'esportazione del backup');
    }
  }
  
  deleteBackup(backupId) {
    const backup = this.backups.find(b => b.id === backupId);
    if (!backup) return;
    
    if (confirm(`Sei sicuro di voler eliminare il backup "${backup.name}"? Questa azione non può essere annullata.`)) {
      // Remove backup from list
      this.backups = this.backups.filter(b => b.id !== backupId);
      
      // Update UI
      this.renderBackups();
      
      // Dispatch backup deleted event
      this.element.dispatchEvent(new CustomEvent('backupDeleted', {
        detail: { backupId }
      }));
      
      this.showSuccess('Backup eliminato');
    }
  }
  
  showImportForm() {
    this.element.querySelector('.import-form').style.display = 'block';
    this.selectedFile = null;
    this.element.querySelector('.import-file-btn').disabled = true;
    this.element.querySelector('.file-input').value = '';
  }
  
  hideImportForm() {
    this.element.querySelector('.import-form').style.display = 'none';
  }
  
  handleFileSelect(e) {
    const files = e.target.files;
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Check file type
    if (!file.name.endsWith('.json') && !file.name.endsWith('.zip')) {
      this.showError('Formato file non supportato. Usa .json o .zip');
      return;
    }
    
    // Update dropzone text
    this.element.querySelector('.dropzone-text').textContent = `File selezionato: ${file.name}`;
    
    // Enable import button
    this.element.querySelector('.import-file-btn').disabled = false;
    
    // Store selected file
    this.selectedFile = file;
  }
  
  importBackup() {
    if (!this.selectedFile) return;
    
    this.hideImportForm();
    this.showProgress('Importazione backup in corso...', 'Lettura file...');
    
    // Simulate import process
    let progress = 0;
    const progressFill = this.element.querySelector('.progress-fill');
    const progressStatus = this.element.querySelector('.progress-status');
    const progressInterval = setInterval(() => {
      progress += 5;
      progressFill.style.width = `${progress}%`;
      
      if (progress === 25) {
        progressStatus.textContent = 'Validazione dati...';
      } else if (progress === 50) {
        progressStatus.textContent = 'Decompressione file...';
      } else if (progress === 75) {
        progressStatus.textContent = 'Integrazione dati...';
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'Importazione completata!';
        
        setTimeout(() => {
          this.hideProgress();
          this.completeImport();
        }, 500);
      }
    }, 100);
  }
  
  completeImport() {
    try {
      // In a real app, this would parse and validate the backup file
      
      // Create new backup from imported file
      const newBackup = {
        id: Date.now(),
        name: `Backup Importato`,
        date: new Date().toISOString(),
        size: Math.floor(this.selectedFile.size / (1024 * 1024)) || 1, // Convert to MB
        type: 'imported'
      };
      
      // Add to backups list
      this.backups.unshift(newBackup);
      
      // Enforce max backups limit
      if (this.options.maxBackups > 0 && this.backups.length > this.options.maxBackups) {
        this.backups = this.backups.slice(0, this.options.maxBackups);
      }
      
      // Update UI
      this.renderBackups();
      
      // Dispatch backup imported event
      this.element.dispatchEvent(new CustomEvent('backupImported', {
        detail: { backup: newBackup }
      }));
      
      this.showSuccess('Backup importato con successo');
    } catch (error) {
      console.error('Error importing backup:', error);
      this.showError('Errore nell\'importazione del backup');
    }
  }
  
  showProgress(text, status) {
    const progressElement = this.element.querySelector('.backup-progress');
    progressElement.style.display = 'block';
    
    this.element.querySelector('.progress-text').textContent = text;
    this.element.querySelector('.progress-status').textContent = status;
    this.element.querySelector('.progress-fill').style.width = '0%';
  }
  
  hideProgress() {
    this.element.querySelector('.backup-progress').style.display = 'none';
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.backup-list').style.display = show ? 'none' : 'flex';
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
  getBackups() {
    return [...this.backups];
  }
  
  getSettings() {
    return { ...this.options };
  }
  
  setSettings(settings) {
    this.options = { ...this.options, ...settings };
    this.updateSettingsUI();
  }
  
  refreshBackups() {
    this.loadBackups();
  }
  
  triggerAutoBackup() {
    if (!this.options.autoBackup) return false;
    
    // Create auto backup
    const newBackup = {
      id: Date.now(),
      name: `Backup Automatico`,
      date: new Date().toISOString(),
      size: Math.floor(Math.random() * 5) + 1, // 1-5 MB
      type: 'auto'
    };
    
    // Add to backups list
    this.backups.unshift(newBackup);
    
    // Enforce max backups limit
    if (this.options.maxBackups > 0 && this.backups.length > this.options.maxBackups) {
      this.backups = this.backups.slice(0, this.options.maxBackups);
    }
    
    // Update UI
    this.renderBackups();
    
    // Dispatch auto backup event
    this.element.dispatchEvent(new CustomEvent('autoBackupCreated', {
      detail: { backup: newBackup }
    }));
    
    return true;
  }
}

export default BackupManager;