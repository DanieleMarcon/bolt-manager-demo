export const template = `
<div class="export-import-tools">
  <div class="tools-header">
    <h3 class="tools-title">Strumenti di Esportazione e Importazione</h3>
    <div class="tools-actions">
      <button class="action-btn export-btn" aria-label="Esporta dati">
        📤 Esporta
      </button>
      <button class="action-btn import-btn" aria-label="Importa dati">
        📥 Importa
      </button>
    </div>
  </div>
  
  <div class="tools-content">
    <div class="export-panel" style="display: none;">
      <h4>Esportazione Dati</h4>
      <div class="export-options">
        <div class="option-group">
          <h5>Contenuto da Esportare</h5>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" name="export-game" checked>
              <span>Dati di Gioco</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="export-settings" checked>
              <span>Impostazioni</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="export-stats">
              <span>Statistiche</span>
            </label>
          </div>
        </div>
        
        <div class="option-group">
          <h5>Formato</h5>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="export-format" value="json" checked>
              <span>JSON</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="export-format" value="zip">
              <span>ZIP (Compresso)</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="export-actions">
        <button class="button button-ghost cancel-export-btn">
          Annulla
        </button>
        <button class="button button-primary confirm-export-btn">
          Esporta Dati
        </button>
      </div>
    </div>
    
    <div class="import-panel" style="display: none;">
      <h4>Importazione Dati</h4>
      <div class="import-dropzone">
        <div class="dropzone-content">
          <div class="dropzone-icon">📥</div>
          <div class="dropzone-text">Trascina qui il file di dati o clicca per selezionarlo</div>
        </div>
        <input type="file" class="file-input" accept=".json,.zip" aria-label="Seleziona file di dati">
      </div>
      
      <div class="import-options">
        <div class="option-group">
          <h5>Opzioni di Importazione</h5>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" name="import-overwrite">
              <span>Sovrascrivi dati esistenti</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" name="import-backup" checked>
              <span>Crea backup prima dell'importazione</span>
            </label>
          </div>
        </div>
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
            <span class="preview-label">Tipo:</span>
            <span class="preview-value file-type"></span>
          </div>
          <div class="preview-item">
            <span class="preview-label">Contenuto:</span>
            <span class="preview-value file-content"></span>
          </div>
        </div>
      </div>
      
      <div class="import-actions">
        <button class="button button-ghost cancel-import-btn">
          Annulla
        </button>
        <button class="button button-primary confirm-import-btn" disabled>
          Importa Dati
        </button>
      </div>
    </div>
    
    <div class="progress-panel" style="display: none;">
      <h4 class="progress-title">Operazione in corso...</h4>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-status">Elaborazione dati...</div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-tools">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Export Import Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.export-import-tools {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.tools-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.tools-actions {
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

.tools-content {
  min-height: 200px;
}

.export-panel,
.import-panel {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.export-panel h4,
.import-panel h4,
.progress-panel h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.export-options,
.import-options {
  margin-bottom: 20px;
}

.option-group {
  margin-bottom: 16px;
}

.option-group h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label,
.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
}

.checkbox-label input,
.radio-label input {
  cursor: pointer;
}

.export-actions,
.import-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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

.file-preview {
  background: var(--surface);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
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

.progress-panel {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
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
}

.sponsor-slot-tools {
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
  .tools-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .tools-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .export-actions,
  .import-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-tools {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class ExportImportTools {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onExport: null,
      onImport: null,
      ...options
    };
    
    this.selectedFile = null;
    this.currentPanel = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.showPanel('export');
    });
    
    // Import button
    this.element.querySelector('.import-btn').addEventListener('click', () => {
      this.showPanel('import');
    });
    
    // Cancel export button
    this.element.querySelector('.cancel-export-btn').addEventListener('click', () => {
      this.hidePanel('export');
    });
    
    // Confirm export button
    this.element.querySelector('.confirm-export-btn').addEventListener('click', () => {
      this.startExport();
    });
    
    // Cancel import button
    this.element.querySelector('.cancel-import-btn').addEventListener('click', () => {
      this.hidePanel('import');
    });
    
    // Confirm import button
    this.element.querySelector('.confirm-import-btn').addEventListener('click', () => {
      this.startImport();
    });
    
    // Import dropzone
    const dropzone = this.element.querySelector('.import-dropzone');
    
    dropzone.addEventListener('click', () => {
      this.element.querySelector('.file-input').click();
    });
    
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
        this.handleFileSelect(e.dataTransfer.files[0]);
      }
    });
    
    // File input
    this.element.querySelector('.file-input').addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleFileSelect(e.target.files[0]);
      }
    });
  }
  
  showPanel(panelType) {
    // Hide all panels
    this.element.querySelector('.export-panel').style.display = 'none';
    this.element.querySelector('.import-panel').style.display = 'none';
    this.element.querySelector('.progress-panel').style.display = 'none';
    
    // Show selected panel
    this.element.querySelector(`.${panelType}-panel`).style.display = 'block';
    this.currentPanel = panelType;
  }
  
  hidePanel(panelType) {
    this.element.querySelector(`.${panelType}-panel`).style.display = 'none';
    this.currentPanel = null;
  }
  
  handleFileSelect(file) {
    // Check file type
    if (!file.name.endsWith('.json') && !file.name.endsWith('.zip')) {
      this.showError('Formato file non supportato. Usa .json o .zip');
      return;
    }
    
    this.selectedFile = file;
    
    // Update file preview
    this.element.querySelector('.file-name').textContent = file.name;
    this.element.querySelector('.file-size').textContent = this.formatFileSize(file.size);
    this.element.querySelector('.file-type').textContent = file.type;
    
    // Try to read file content for preview
    this.previewFileContent(file);
    
    // Show file preview
    this.element.querySelector('.file-preview').style.display = 'block';
    
    // Enable import button
    this.element.querySelector('.confirm-import-btn').disabled = false;
  }
  
  previewFileContent(file) {
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const contentPreview = this.getContentSummary(data);
          this.element.querySelector('.file-content').textContent = contentPreview;
        } catch (error) {
          this.element.querySelector('.file-content').textContent = 'Impossibile leggere il contenuto JSON';
        }
      };
      reader.readAsText(file);
    } else {
      this.element.querySelector('.file-content').textContent = 'Anteprima non disponibile per file ZIP';
    }
  }
  
  getContentSummary(data) {
    if (!data) return 'Dati non validi';
    
    const keys = Object.keys(data);
    if (keys.length === 0) return 'Oggetto vuoto';
    
    if (data.gameVersion) {
      return `Dati di gioco (v${data.gameVersion})`;
    } else if (data.settings) {
      return 'File di impostazioni';
    } else if (data.stats) {
      return 'File di statistiche';
    } else {
      return `Oggetto con ${keys.length} proprietà`;
    }
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
  
  startExport() {
    this.showProgress('Esportazione dati in corso...', 'Preparazione dati...');
    
    // Get export options
    const exportGame = this.element.querySelector('input[name="export-game"]').checked;
    const exportSettings = this.element.querySelector('input[name="export-settings"]').checked;
    const exportStats = this.element.querySelector('input[name="export-stats"]').checked;
    const format = this.element.querySelector('input[name="export-format"]:checked').value;
    
    // Simulate progress
    let progress = 0;
    const progressFill = this.element.querySelector('.progress-fill');
    const progressStatus = this.element.querySelector('.progress-status');
    const progressInterval = setInterval(() => {
      progress += 5;
      progressFill.style.width = `${progress}%`;
      
      if (progress === 25) {
        progressStatus.textContent = 'Raccolta dati...';
      } else if (progress === 50) {
        progressStatus.textContent = 'Formattazione dati...';
      } else if (progress === 75) {
        progressStatus.textContent = format === 'zip' ? 'Compressione dati...' : 'Finalizzazione...';
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'Esportazione completata!';
        
        setTimeout(() => {
          this.completeExport(exportGame, exportSettings, exportStats, format);
        }, 500);
      }
    }, 100);
  }
  
  completeExport(exportGame, exportSettings, exportStats, format) {
    try {
      // Prepare export data
      const exportData = {
        metadata: {
          version: '1.0',
          timestamp: new Date().toISOString(),
          format
        }
      };
      
      if (exportGame) {
        exportData.gameData = {
          // This would contain actual game data in a real app
          team: 'AC Milan',
          season: '2024/2025',
          players: [],
          matches: []
        };
      }
      
      if (exportSettings) {
        exportData.settings = {
          // This would contain actual settings in a real app
          difficulty: 'normal',
          autoSave: true,
          language: 'it'
        };
      }
      
      if (exportStats) {
        exportData.stats = {
          // This would contain actual stats in a real app
          gamesPlayed: 15,
          wins: 10,
          draws: 3,
          losses: 2
        };
      }
      
      // Create download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `allenatore-nato-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      // Call export callback if provided
      if (typeof this.options.onExport === 'function') {
        this.options.onExport(exportData);
      }
      
      // Dispatch export event
      this.element.dispatchEvent(new CustomEvent('dataExported', {
        detail: { 
          exportData,
          options: {
            exportGame,
            exportSettings,
            exportStats,
            format
          }
        }
      }));
      
      this.hidePanel('progress');
      this.hidePanel('export');
      this.showSuccess('Dati esportati con successo');
    } catch (error) {
      console.error('Error exporting data:', error);
      this.hidePanel('progress');
      this.showError('Errore durante l\'esportazione dei dati');
    }
  }
  
  startImport() {
    if (!this.selectedFile) return;
    
    this.showProgress('Importazione dati in corso...', 'Lettura file...');
    
    // Get import options
    const overwrite = this.element.querySelector('input[name="import-overwrite"]').checked;
    const createBackup = this.element.querySelector('input[name="import-backup"]').checked;
    
    // Simulate progress
    let progress = 0;
    const progressFill = this.element.querySelector('.progress-fill');
    const progressStatus = this.element.querySelector('.progress-status');
    const progressInterval = setInterval(() => {
      progress += 5;
      progressFill.style.width = `${progress}%`;
      
      if (progress === 25) {
        progressStatus.textContent = 'Analisi dati...';
      } else if (progress === 50) {
        progressStatus.textContent = createBackup ? 'Creazione backup...' : 'Preparazione importazione...';
      } else if (progress === 75) {
        progressStatus.textContent = 'Importazione dati...';
      }
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressStatus.textContent = 'Importazione completata!';
        
        setTimeout(() => {
          this.completeImport(overwrite, createBackup);
        }, 500);
      }
    }, 100);
  }
  
  completeImport(overwrite, createBackup) {
    try {
      // In a real app, this would parse and validate the import file
      
      // Call import callback if provided
      if (typeof this.options.onImport === 'function') {
        this.options.onImport(this.selectedFile, { overwrite, createBackup });
      }
      
      // Dispatch import event
      this.element.dispatchEvent(new CustomEvent('dataImported', {
        detail: { 
          file: this.selectedFile,
          options: {
            overwrite,
            createBackup
          }
        }
      }));
      
      this.hidePanel('progress');
      this.hidePanel('import');
      this.showSuccess('Dati importati con successo');
      
      // Reset selected file
      this.selectedFile = null;
      this.element.querySelector('.file-input').value = '';
      this.element.querySelector('.file-preview').style.display = 'none';
    } catch (error) {
      console.error('Error importing data:', error);
      this.hidePanel('progress');
      this.showError('Errore durante l\'importazione dei dati');
    }
  }
  
  showProgress(title, status) {
    this.hidePanel(this.currentPanel);
    this.showPanel('progress');
    
    this.element.querySelector('.progress-title').textContent = title;
    this.element.querySelector('.progress-status').textContent = status;
    this.element.querySelector('.progress-fill').style.width = '0%';
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
  getCurrentPanel() {
    return this.currentPanel;
  }
  
  getSelectedFile() {
    return this.selectedFile;
  }
  
  triggerExport(options = {}) {
    // Set export options
    if (options.game !== undefined) {
      this.element.querySelector('input[name="export-game"]').checked = options.game;
    }
    
    if (options.settings !== undefined) {
      this.element.querySelector('input[name="export-settings"]').checked = options.settings;
    }
    
    if (options.stats !== undefined) {
      this.element.querySelector('input[name="export-stats"]').checked = options.stats;
    }
    
    if (options.format) {
      const formatRadio = this.element.querySelector(`input[name="export-format"][value="${options.format}"]`);
      if (formatRadio) formatRadio.checked = true;
    }
    
    this.showPanel('export');
  }
  
  triggerImport() {
    this.showPanel('import');
  }
}

export default ExportImportTools;