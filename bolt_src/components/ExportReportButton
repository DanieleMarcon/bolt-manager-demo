<div class="export-report-button">
  <button class="export-btn button button-secondary" aria-label="Esporta report">
    <span class="export-icon">📊</span>
    <span class="export-text">Esporta Report</span>
  </button>
  
  <div class="export-options" style="display: none;">
    <div class="options-header">
      <h4>Opzioni Esportazione</h4>
      <button class="close-options-btn" aria-label="Chiudi opzioni">✕</button>
    </div>
    
    <div class="format-options">
      <h5>Formato</h5>
      <div class="format-selector">
        <label class="format-option">
          <input type="radio" name="export-format" value="pdf" checked>
          <span class="format-icon">📄</span>
          <span class="format-name">PDF</span>
        </label>
        
        <label class="format-option">
          <input type="radio" name="export-format" value="json">
          <span class="format-icon">📋</span>
          <span class="format-name">JSON</span>
        </label>
        
        <label class="format-option">
          <input type="radio" name="export-format" value="csv">
          <span class="format-icon">📝</span>
          <span class="format-name">CSV</span>
        </label>
        
        <label class="format-option">
          <input type="radio" name="export-format" value="image">
          <span class="format-icon">🖼️</span>
          <span class="format-name">Immagine</span>
        </label>
      </div>
    </div>
    
    <div class="content-options">
      <h5>Contenuto</h5>
      <div class="content-checkboxes">
        <label class="content-option">
          <input type="checkbox" name="include-summary" checked>
          <span>Riepilogo Partita</span>
        </label>
        
        <label class="content-option">
          <input type="checkbox" name="include-stats" checked>
          <span>Statistiche Dettagliate</span>
        </label>
        
        <label class="content-option">
          <input type="checkbox" name="include-player-ratings" checked>
          <span>Valutazioni Giocatori</span>
        </label>
        
        <label class="content-option">
          <input type="checkbox" name="include-key-moments" checked>
          <span>Momenti Chiave</span>
        </label>
        
        <label class="content-option">
          <input type="checkbox" name="include-tactical">
          <span>Analisi Tattica</span>
        </label>
      </div>
    </div>
    
    <div class="export-actions">
      <button class="button button-ghost cancel-export-btn">
        Annulla
      </button>
      <button class="button button-primary confirm-export-btn">
        Esporta
      </button>
    </div>
  </div>
  
  <div class="export-progress" style="display: none;">
    <div class="progress-text">Generazione report in corso...</div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
  </div>
</div>

<style>
.export-report-button {
  position: relative;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
}

.export-icon {
  font-size: 16px;
}

.export-options {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  z-index: 100;
  padding: 16px;
}

.options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.options-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.close-options-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-options-btn:hover {
  background: var(--border);
  color: var(--text);
}

.format-options,
.content-options {
  margin-bottom: 16px;
}

.format-options h5,
.content-options h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.format-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.format-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.format-option:hover {
  background: rgba(37, 99, 235, 0.05);
  border-color: var(--primary);
}

.format-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.format-option input[type="radio"]:checked + .format-icon {
  color: var(--primary);
}

.format-option input[type="radio"]:checked ~ .format-name {
  color: var(--primary);
  font-weight: 600;
}

.format-option input[type="radio"]:focus + .format-icon {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

.format-icon {
  font-size: 20px;
}

.format-name {
  font-size: 11px;
  color: var(--text);
}

.content-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text);
  cursor: pointer;
}

.content-option input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
}

.export-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.export-progress {
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
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #1e40af);
  border-radius: 4px;
  width: 0%;
  transition: width 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .export-options {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .format-selector {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

<script>
class ExportReportButton {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      reportData: null,
      defaultFormat: 'pdf',
      showProgress: true,
      ...options
    };
    
    this.isOptionsOpen = false;
    this.selectedFormat = this.options.defaultFormat;
    this.selectedContent = {
      summary: true,
      stats: true,
      playerRatings: true,
      keyMoments: true,
      tactical: false
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.toggleOptions();
    });
    
    // Close options button
    this.element.querySelector('.close-options-btn').addEventListener('click', () => {
      this.toggleOptions(false);
    });
    
    // Format radio buttons
    this.element.querySelectorAll('input[name="export-format"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.selectedFormat = e.target.value;
      });
    });
    
    // Content checkboxes
    this.element.querySelectorAll('.content-option input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const contentType = e.target.name.replace('include-', '');
        this.selectedContent[contentType] = e.target.checked;
      });
    });
    
    // Cancel button
    this.element.querySelector('.cancel-export-btn').addEventListener('click', () => {
      this.toggleOptions(false);
    });
    
    // Confirm button
    this.element.querySelector('.confirm-export-btn').addEventListener('click', () => {
      this.startExport();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOptionsOpen && !this.element.contains(e.target)) {
        this.toggleOptions(false);
      }
    });
    
    // Keyboard support
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOptionsOpen) {
        this.toggleOptions(false);
      }
    });
  }
  
  toggleOptions(show = null) {
    this.isOptionsOpen = show !== null ? show : !this.isOptionsOpen;
    
    const optionsPanel = this.element.querySelector('.export-options');
    optionsPanel.style.display = this.isOptionsOpen ? 'block' : 'none';
    
    if (this.isOptionsOpen) {
      // Focus first element for keyboard navigation
      setTimeout(() => {
        const firstInput = optionsPanel.querySelector('input[type="radio"]:checked');
        if (firstInput) firstInput.focus();
      }, 10);
    }
  }
  
  startExport() {
    if (this.options.showProgress) {
      this.toggleOptions(false);
      this.showProgress(true);
      
      // Simulate progress
      let progress = 0;
      const progressFill = this.element.querySelector('.progress-fill');
      const progressInterval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            this.showProgress(false);
            this.completeExport();
          }, 500);
        }
      }, 100);
    } else {
      this.toggleOptions(false);
      this.completeExport();
    }
  }
  
  showProgress(show) {
    const progressElement = this.element.querySelector('.export-progress');
    progressElement.style.display = show ? 'block' : 'none';
    
    if (show) {
      this.element.querySelector('.progress-fill').style.width = '0%';
    }
  }
  
  completeExport() {
    // Prepare export data
    const exportData = this.prepareExportData();
    
    // Handle different formats
    switch (this.selectedFormat) {
      case 'pdf':
        this.exportAsPDF(exportData);
        break;
      case 'json':
        this.exportAsJSON(exportData);
        break;
      case 'csv':
        this.exportAsCSV(exportData);
        break;
      case 'image':
        this.exportAsImage(exportData);
        break;
    }
    
    // Dispatch export event
    this.element.dispatchEvent(new CustomEvent('reportExported', {
      detail: {
        format: this.selectedFormat,
        content: this.selectedContent,
        data: exportData
      }
    }));
    
    this.showSuccess(`Report esportato in formato ${this.selectedFormat.toUpperCase()}`);
  }
  
  prepareExportData() {
    const reportData = this.options.reportData || {};
    const filteredData = {};
    
    // Filter data based on selected content
    if (this.selectedContent.summary) {
      filteredData.summary = reportData.summary;
    }
    
    if (this.selectedContent.stats) {
      filteredData.stats = reportData.stats;
    }
    
    if (this.selectedContent.playerRatings) {
      filteredData.playerRatings = reportData.playerRatings;
    }
    
    if (this.selectedContent.keyMoments) {
      filteredData.keyMoments = reportData.keyMoments;
    }
    
    if (this.selectedContent.tactical) {
      filteredData.tactical = reportData.tactical;
    }
    
    // Add metadata
    filteredData.metadata = {
      exportDate: new Date().toISOString(),
      format: this.selectedFormat,
      version: '1.0'
    };
    
    return filteredData;
  }
  
  exportAsPDF(data) {
    // In a real implementation, this would generate a PDF
    // For now, we'll just simulate it
    console.log('Exporting as PDF:', data);
    
    // Dispatch event for PDF generation
    window.dispatchEvent(new CustomEvent('generatePDF', {
      detail: { data }
    }));
  }
  
  exportAsJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `match-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  exportAsCSV(data) {
    // Convert data to CSV format
    let csv = '';
    
    // Add headers
    csv += 'Category,Name,Value\n';
    
    // Add summary data
    if (data.summary) {
      Object.entries(data.summary).forEach(([key, value]) => {
        csv += `Summary,${key},${value}\n`;
      });
    }
    
    // Add stats data
    if (data.stats) {
      Object.entries(data.stats).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            csv += `Stats,${key}_${subKey},${subValue}\n`;
          });
        } else {
          csv += `Stats,${key},${value}\n`;
        }
      });
    }
    
    // Add player ratings
    if (data.playerRatings) {
      data.playerRatings.forEach(player => {
        csv += `PlayerRating,${player.name},${player.rating}\n`;
      });
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `match-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  exportAsImage(data) {
    // In a real implementation, this would generate an image
    // For now, we'll just simulate it
    console.log('Exporting as Image:', data);
    
    // Dispatch event for image generation
    window.dispatchEvent(new CustomEvent('generateImage', {
      detail: { data }
    }));
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  setReportData(data) {
    this.options.reportData = data;
  }
  
  getSelectedFormat() {
    return this.selectedFormat;
  }
  
  getSelectedContent() {
    return { ...this.selectedContent };
  }
  
  triggerExport(format = null) {
    if (format) {
      this.selectedFormat = format;
      
      // Update radio button
      const radio = this.element.querySelector(`input[name="export-format"][value="${format}"]`);
      if (radio) radio.checked = true;
    }
    
    this.startExport();
  }
}

// Auto-initialize export report buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.export-report-button').forEach(button => {
    if (!button.dataset.initialized) {
      const options = JSON.parse(button.dataset.options || '{}');
      new ExportReportButton(button, options);
      button.dataset.initialized = 'true';
    }
  });
});
</script>