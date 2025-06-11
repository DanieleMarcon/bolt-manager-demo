<div class="comparison-tool">
  <div class="tool-header">
    <h3 class="tool-title">Strumento di Confronto</h3>
    <div class="tool-controls">
      <button class="control-btn reset-btn" aria-label="Reimposta confronto">
        ↻ Reset
      </button>
      <button class="control-btn export-btn" aria-label="Esporta confronto">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="comparison-subjects">
    <div class="subject-selector first-subject">
      <h4>Primo Soggetto</h4>
      <div class="selector-container">
        <select class="subject-select first-select" aria-label="Seleziona primo soggetto">
          <option value="">Seleziona...</option>
          <!-- Options will be populated dynamically -->
        </select>
      </div>
      <div class="subject-preview" style="display: none;">
        <div class="preview-content">
          <img src="" alt="Subject photo" class="subject-photo" loading="lazy">
          <div class="subject-info">
            <span class="subject-name"></span>
            <span class="subject-meta"></span>
          </div>
        </div>
        <button class="clear-subject-btn" aria-label="Rimuovi soggetto">✕</button>
      </div>
    </div>
    
    <div class="vs-separator">
      <div class="vs-text">VS</div>
    </div>
    
    <div class="subject-selector second-subject">
      <h4>Secondo Soggetto</h4>
      <div class="selector-container">
        <select class="subject-select second-select" aria-label="Seleziona secondo soggetto">
          <option value="">Seleziona...</option>
          <!-- Options will be populated dynamically -->
        </select>
      </div>
      <div class="subject-preview" style="display: none;">
        <div class="preview-content">
          <img src="" alt="Subject photo" class="subject-photo" loading="lazy">
          <div class="subject-info">
            <span class="subject-name"></span>
            <span class="subject-meta"></span>
          </div>
        </div>
        <button class="clear-subject-btn" aria-label="Rimuovi soggetto">✕</button>
      </div>
    </div>
  </div>
  
  <div class="comparison-content" style="display: none;">
    <div class="comparison-tabs">
      <button class="tab-btn active" data-tab="attributes" aria-pressed="true" role="tab">
        Attributi
      </button>
      <button class="tab-btn" data-tab="stats" aria-pressed="false" role="tab">
        Statistiche
      </button>
      <button class="tab-btn" data-tab="performance" aria-pressed="false" role="tab">
        Performance
      </button>
    </div>
    
    <div class="tab-panels">
      <div class="tab-panel active" data-panel="attributes" role="tabpanel">
        <div class="attributes-comparison">
          <div class="comparison-grid">
            <!-- Attribute comparisons will be populated dynamically -->
          </div>
        </div>
      </div>
      
      <div class="tab-panel" data-panel="stats" role="tabpanel">
        <div class="stats-comparison">
          <div class="comparison-grid">
            <!-- Stats comparisons will be populated dynamically -->
          </div>
        </div>
      </div>
      
      <div class="tab-panel" data-panel="performance" role="tabpanel">
        <div class="performance-comparison">
          <div class="comparison-grid">
            <!-- Performance comparisons will be populated dynamically -->
          </div>
        </div>
      </div>
    </div>
    
    <div class="comparison-summary">
      <h4>Riepilogo Confronto</h4>
      <div class="summary-content">
        <div class="summary-chart">
          <div class="chart-bar first-bar">
            <div class="bar-fill"></div>
            <span class="bar-value">0%</span>
          </div>
          <div class="chart-bar second-bar">
            <div class="bar-fill"></div>
            <span class="bar-value">0%</span>
          </div>
        </div>
        <div class="summary-text">
          <p class="comparison-result">Seleziona due soggetti per confrontarli</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="empty-state">
    <div class="empty-icon">⚖️</div>
    <h4>Confronta Giocatori o Squadre</h4>
    <p>Seleziona due soggetti per iniziare il confronto</p>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-comparison">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Comparison Tool Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.comparison-tool {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.tool-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.tool-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.comparison-subjects {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.subject-selector {
  flex: 1;
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.subject-selector h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.selector-container {
  margin-bottom: 12px;
}

.subject-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
  cursor: pointer;
}

.subject-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--surface);
  border-radius: 6px;
}

.preview-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.subject-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.subject-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.subject-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.subject-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.clear-subject-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-subject-btn:hover {
  background: var(--border);
  color: var(--text);
}

.vs-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
}

.comparison-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: var(--background);
  padding: 4px;
  border-radius: 8px;
}

.tab-btn {
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tab-btn:hover:not(.active) {
  color: var(--text);
  background: rgba(255,255,255,0.5);
}

.tab-panels {
  margin-bottom: 24px;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.comparison-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comparison-row {
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.attribute-name {
  width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.comparison-bars {
  flex: 1;
  display: flex;
  gap: 8px;
}

.first-subject-bar,
.second-subject-bar {
  flex: 1;
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s ease;
}

.first-subject-bar .bar-fill {
  background: linear-gradient(90deg, var(--primary), #1e40af);
}

.second-subject-bar .bar-fill {
  background: linear-gradient(90deg, var(--secondary), #047857);
}

.bar-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.comparison-values {
  display: flex;
  gap: 16px;
  min-width: 100px;
  justify-content: space-between;
}

.first-value,
.second-value {
  font-size: 14px;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.first-value {
  color: var(--primary);
}

.second-value {
  color: var(--secondary);
}

.comparison-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.comparison-summary h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.summary-content {
  display: flex;
  gap: 24px;
  align-items: center;
}

.summary-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
}

.chart-bar {
  height: 24px;
  background: var(--border);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.first-bar .bar-fill {
  background: linear-gradient(90deg, var(--primary), #1e40af);
}

.second-bar .bar-fill {
  background: linear-gradient(90deg, var(--secondary), #047857);
}

.summary-text {
  flex: 1;
}

.comparison-result {
  font-size: 14px;
  color: var(--text);
  margin: 0;
  line-height: 1.5;
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

.sponsor-slot-comparison {
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
  .comparison-subjects {
    flex-direction: column;
  }
  
  .vs-separator {
    margin: 8px 0;
  }
  
  .summary-content {
    flex-direction: column;
  }
  
  .summary-chart {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .tool-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .tool-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .comparison-row {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .attribute-name {
    width: 100%;
    text-align: center;
  }
  
  .comparison-values {
    width: 100%;
  }
  
  .sponsor-slot-comparison {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class ComparisonTool {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      subjectType: 'player', // player, team, staff
      subjects: [],
      ...options
    };
    
    this.firstSubject = null;
    this.secondSubject = null;
    this.currentTab = 'attributes';
    
    this.init();
  }
  
  init() {
    this.populateSubjects();
    this.bindEvents();
  }
  
  populateSubjects() {
    const firstSelect = this.element.querySelector('.first-select');
    const secondSelect = this.element.querySelector('.second-select');
    
    // Clear existing options except first
    while (firstSelect.options.length > 1) {
      firstSelect.remove(1);
    }
    
    while (secondSelect.options.length > 1) {
      secondSelect.remove(1);
    }
    
    // Add subject options
    this.options.subjects.forEach(subject => {
      const firstOption = document.createElement('option');
      firstOption.value = subject.id;
      firstOption.textContent = subject.name;
      firstSelect.appendChild(firstOption);
      
      const secondOption = document.createElement('option');
      secondOption.value = subject.id;
      secondOption.textContent = subject.name;
      secondSelect.appendChild(secondOption);
    });
  }
  
  bindEvents() {
    // Subject selectors
    this.element.querySelector('.first-select').addEventListener('change', (e) => {
      const subjectId = e.target.value;
      if (subjectId) {
        this.selectFirstSubject(subjectId);
      } else {
        this.clearFirstSubject();
      }
    });
    
    this.element.querySelector('.second-select').addEventListener('change', (e) => {
      const subjectId = e.target.value;
      if (subjectId) {
        this.selectSecondSubject(subjectId);
      } else {
        this.clearSecondSubject();
      }
    });
    
    // Clear subject buttons
    this.element.querySelectorAll('.clear-subject-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selector = e.target.closest('.subject-selector');
        if (selector.classList.contains('first-subject')) {
          this.clearFirstSubject();
        } else {
          this.clearSecondSubject();
        }
      });
    });
    
    // Tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
    
    // Reset button
    this.element.querySelector('.reset-btn').addEventListener('click', () => {
      this.resetComparison();
    });
    
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportComparison();
    });
  }
  
  selectFirstSubject(subjectId) {
    const subject = this.options.subjects.find(s => s.id == subjectId);
    if (!subject) return;
    
    this.firstSubject = subject;
    
    // Update preview
    const preview = this.element.querySelector('.first-subject .subject-preview');
    preview.querySelector('.subject-photo').src = subject.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80';
    preview.querySelector('.subject-name').textContent = subject.name;
    preview.querySelector('.subject-meta').textContent = this.getSubjectMeta(subject);
    preview.style.display = 'flex';
    
    this.updateComparison();
  }
  
  selectSecondSubject(subjectId) {
    const subject = this.options.subjects.find(s => s.id == subjectId);
    if (!subject) return;
    
    this.secondSubject = subject;
    
    // Update preview
    const preview = this.element.querySelector('.second-subject .subject-preview');
    preview.querySelector('.subject-photo').src = subject.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80';
    preview.querySelector('.subject-name').textContent = subject.name;
    preview.querySelector('.subject-meta').textContent = this.getSubjectMeta(subject);
    preview.style.display = 'flex';
    
    this.updateComparison();
  }
  
  getSubjectMeta(subject) {
    if (this.options.subjectType === 'player') {
      return `${subject.position} • ${subject.age} anni`;
    } else if (this.options.subjectType === 'team') {
      return subject.league;
    } else if (this.options.subjectType === 'staff') {
      return subject.role;
    }
    return '';
  }
  
  clearFirstSubject() {
    this.firstSubject = null;
    this.element.querySelector('.first-select').value = '';
    this.element.querySelector('.first-subject .subject-preview').style.display = 'none';
    this.updateComparison();
  }
  
  clearSecondSubject() {
    this.secondSubject = null;
    this.element.querySelector('.second-select').value = '';
    this.element.querySelector('.second-subject .subject-preview').style.display = 'none';
    this.updateComparison();
  }
  
  updateComparison() {
    if (this.firstSubject && this.secondSubject) {
      // Show comparison content, hide empty state
      this.element.querySelector('.comparison-content').style.display = 'block';
      this.element.querySelector('.empty-state').style.display = 'none';
      
      // Update comparison based on current tab
      this.updateTabContent();
      
      // Update summary
      this.updateSummary();
    } else {
      // Hide comparison content, show empty state
      this.element.querySelector('.comparison-content').style.display = 'none';
      this.element.querySelector('.empty-state').style.display = 'flex';
    }
  }
  
  switchTab(tab) {
    this.currentTab = tab;
    
    // Update tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
    
    // Update tab panels
    this.element.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === tab);
    });
    
    // Update content for the selected tab
    if (this.firstSubject && this.secondSubject) {
      this.updateTabContent();
    }
  }
  
  updateTabContent() {
    switch (this.currentTab) {
      case 'attributes':
        this.updateAttributesComparison();
        break;
      case 'stats':
        this.updateStatsComparison();
        break;
      case 'performance':
        this.updatePerformanceComparison();
        break;
    }
  }
  
  updateAttributesComparison() {
    const grid = this.element.querySelector('[data-panel="attributes"] .comparison-grid');
    grid.innerHTML = '';
    
    if (!this.firstSubject.attributes || !this.secondSubject.attributes) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'comparison-row';
      emptyRow.textContent = 'Nessun attributo disponibile per il confronto';
      grid.appendChild(emptyRow);
      return;
    }
    
    // Get all unique attributes
    const attributes = new Set([
      ...Object.keys(this.firstSubject.attributes),
      ...Object.keys(this.secondSubject.attributes)
    ]);
    
    // Create comparison rows for each attribute
    attributes.forEach(attr => {
      const firstValue = this.firstSubject.attributes[attr] || 0;
      const secondValue = this.secondSubject.attributes[attr] || 0;
      
      const row = this.createComparisonRow(
        this.getAttributeName(attr),
        firstValue,
        secondValue,
        100, // max value
        0    // min value
      );
      
      grid.appendChild(row);
    });
  }
  
  updateStatsComparison() {
    const grid = this.element.querySelector('[data-panel="stats"] .comparison-grid');
    grid.innerHTML = '';
    
    if (!this.firstSubject.stats || !this.secondSubject.stats) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'comparison-row';
      emptyRow.textContent = 'Nessuna statistica disponibile per il confronto';
      grid.appendChild(emptyRow);
      return;
    }
    
    // Get all unique stats
    const stats = new Set([
      ...Object.keys(this.firstSubject.stats),
      ...Object.keys(this.secondSubject.stats)
    ]);
    
    // Create comparison rows for each stat
    stats.forEach(stat => {
      const firstValue = this.firstSubject.stats[stat] || 0;
      const secondValue = this.secondSubject.stats[stat] || 0;
      
      // Calculate max value for the bars
      const maxValue = Math.max(firstValue, secondValue) * 1.2;
      
      const row = this.createComparisonRow(
        this.getStatName(stat),
        firstValue,
        secondValue,
        maxValue,
        0
      );
      
      grid.appendChild(row);
    });
  }
  
  updatePerformanceComparison() {
    const grid = this.element.querySelector('[data-panel="performance"] .comparison-grid');
    grid.innerHTML = '';
    
    if (!this.firstSubject.performance || !this.secondSubject.performance) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'comparison-row';
      emptyRow.textContent = 'Nessun dato di performance disponibile per il confronto';
      grid.appendChild(emptyRow);
      return;
    }
    
    // Get all unique performance metrics
    const metrics = new Set([
      ...Object.keys(this.firstSubject.performance),
      ...Object.keys(this.secondSubject.performance)
    ]);
    
    // Create comparison rows for each metric
    metrics.forEach(metric => {
      const firstValue = this.firstSubject.performance[metric] || 0;
      const secondValue = this.secondSubject.performance[metric] || 0;
      
      const row = this.createComparisonRow(
        this.getPerformanceName(metric),
        firstValue,
        secondValue,
        10, // max value for performance is typically 0-10
        0
      );
      
      grid.appendChild(row);
    });
  }
  
  createComparisonRow(name, firstValue, secondValue, maxValue, minValue) {
    const row = document.createElement('div');
    row.className = 'comparison-row';
    
    // Calculate percentages for bars
    const range = maxValue - minValue;
    const firstPercentage = range > 0 ? ((firstValue - minValue) / range) * 100 : 0;
    const secondPercentage = range > 0 ? ((secondValue - minValue) / range) * 100 : 0;
    
    row.innerHTML = `
      <div class="attribute-name">${name}</div>
      <div class="comparison-bars">
        <div class="first-subject-bar">
          <div class="bar-fill" style="width: ${firstPercentage}%"></div>
          <span class="bar-value">${firstPercentage.toFixed(0)}%</span>
        </div>
        <div class="second-subject-bar">
          <div class="bar-fill" style="width: ${secondPercentage}%"></div>
          <span class="bar-value">${secondPercentage.toFixed(0)}%</span>
        </div>
      </div>
      <div class="comparison-values">
        <span class="first-value">${this.formatValue(firstValue)}</span>
        <span class="second-value">${this.formatValue(secondValue)}</span>
      </div>
    `;
    
    return row;
  }
  
  formatValue(value) {
    if (typeof value === 'number') {
      // Check if it's a percentage
      if (value <= 1 && value >= 0) {
        return `${(value * 100).toFixed(0)}%`;
      }
      // Check if it's a decimal
      if (value % 1 !== 0) {
        return value.toFixed(1);
      }
      return value.toString();
    }
    return value;
  }
  
  getAttributeName(attribute) {
    const attributeNames = {
      pace: 'Velocità',
      shooting: 'Tiro',
      passing: 'Passaggio',
      dribbling: 'Dribbling',
      defending: 'Difesa',
      physical: 'Fisico',
      technical: 'Tecnica',
      mental: 'Mentale',
      tactical: 'Tattica'
    };
    return attributeNames[attribute] || attribute;
  }
  
  getStatName(stat) {
    const statNames = {
      goals: 'Gol',
      assists: 'Assist',
      appearances: 'Presenze',
      minutes: 'Minuti',
      yellow_cards: 'Cartellini Gialli',
      red_cards: 'Cartellini Rossi',
      clean_sheets: 'Clean Sheet',
      tackles: 'Contrasti',
      interceptions: 'Intercetti',
      passes: 'Passaggi',
      key_passes: 'Passaggi Chiave',
      shots: 'Tiri',
      shots_on_target: 'Tiri in Porta'
    };
    return statNames[stat] || stat;
  }
  
  getPerformanceName(metric) {
    const metricNames = {
      rating: 'Rating Medio',
      form: 'Forma',
      consistency: 'Costanza',
      big_matches: 'Grandi Partite',
      improvement: 'Miglioramento',
      teamwork: 'Gioco di Squadra'
    };
    return metricNames[metric] || metric;
  }
  
  updateSummary() {
    if (!this.firstSubject || !this.secondSubject) return;
    
    let firstScore = 0;
    let secondScore = 0;
    let totalComparisons = 0;
    
    // Calculate scores based on current tab
    switch (this.currentTab) {
      case 'attributes':
        if (this.firstSubject.attributes && this.secondSubject.attributes) {
          const attributes = new Set([
            ...Object.keys(this.firstSubject.attributes),
            ...Object.keys(this.secondSubject.attributes)
          ]);
          
          attributes.forEach(attr => {
            const firstValue = this.firstSubject.attributes[attr] || 0;
            const secondValue = this.secondSubject.attributes[attr] || 0;
            
            if (firstValue > secondValue) firstScore++;
            else if (secondValue > firstValue) secondScore++;
            
            totalComparisons++;
          });
        }
        break;
      
      case 'stats':
        if (this.firstSubject.stats && this.secondSubject.stats) {
          const stats = new Set([
            ...Object.keys(this.firstSubject.stats),
            ...Object.keys(this.secondSubject.stats)
          ]);
          
          stats.forEach(stat => {
            const firstValue = this.firstSubject.stats[stat] || 0;
            const secondValue = this.secondSubject.stats[stat] || 0;
            
            if (firstValue > secondValue) firstScore++;
            else if (secondValue > firstValue) secondScore++;
            
            totalComparisons++;
          });
        }
        break;
      
      case 'performance':
        if (this.firstSubject.performance && this.secondSubject.performance) {
          const metrics = new Set([
            ...Object.keys(this.firstSubject.performance),
            ...Object.keys(this.secondSubject.performance)
          ]);
          
          metrics.forEach(metric => {
            const firstValue = this.firstSubject.performance[metric] || 0;
            const secondValue = this.secondSubject.performance[metric] || 0;
            
            if (firstValue > secondValue) firstScore++;
            else if (secondValue > firstValue) secondScore++;
            
            totalComparisons++;
          });
        }
        break;
    }
    
    // Calculate percentages
    const firstPercentage = totalComparisons > 0 ? (firstScore / totalComparisons) * 100 : 0;
    const secondPercentage = totalComparisons > 0 ? (secondScore / totalComparisons) * 100 : 0;
    
    // Update summary chart
    const firstBar = this.element.querySelector('.first-bar .bar-fill');
    const secondBar = this.element.querySelector('.second-bar .bar-fill');
    const firstValue = this.element.querySelector('.first-bar .bar-value');
    const secondValue = this.element.querySelector('.second-bar .bar-value');
    
    firstBar.style.width = `${firstPercentage}%`;
    secondBar.style.width = `${secondPercentage}%`;
    firstValue.textContent = `${Math.round(firstPercentage)}%`;
    secondValue.textContent = `${Math.round(secondPercentage)}%`;
    
    // Update summary text
    const resultText = this.element.querySelector('.comparison-result');
    
    if (firstScore > secondScore) {
      resultText.textContent = `${this.firstSubject.name} è superiore in ${firstScore} su ${totalComparisons} categorie (${Math.round(firstPercentage)}%)`;
    } else if (secondScore > firstScore) {
      resultText.textContent = `${this.secondSubject.name} è superiore in ${secondScore} su ${totalComparisons} categorie (${Math.round(secondPercentage)}%)`;
    } else {
      resultText.textContent = `${this.firstSubject.name} e ${this.secondSubject.name} sono alla pari (${totalComparisons - firstScore - secondScore} pareggi)`;
    }
  }
  
  resetComparison() {
    this.clearFirstSubject();
    this.clearSecondSubject();
    this.switchTab('attributes');
  }
  
  exportComparison() {
    if (!this.firstSubject || !this.secondSubject) {
      this.showError('Seleziona due soggetti per esportare il confronto');
      return;
    }
    
    const exportData = {
      subjects: {
        first: {
          id: this.firstSubject.id,
          name: this.firstSubject.name,
          type: this.options.subjectType
        },
        second: {
          id: this.secondSubject.id,
          name: this.secondSubject.name,
          type: this.options.subjectType
        }
      },
      comparison: {
        tab: this.currentTab,
        data: this.getComparisonData()
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Confronto esportato con successo');
  }
  
  getComparisonData() {
    switch (this.currentTab) {
      case 'attributes':
        return {
          first: this.firstSubject.attributes,
          second: this.secondSubject.attributes
        };
      case 'stats':
        return {
          first: this.firstSubject.stats,
          second: this.secondSubject.stats
        };
      case 'performance':
        return {
          first: this.firstSubject.performance,
          second: this.secondSubject.performance
        };
      default:
        return {};
    }
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
  getSubjects() {
    return {
      first: this.firstSubject,
      second: this.secondSubject
    };
  }
  
  setSubjects(firstId, secondId) {
    if (firstId) {
      this.element.querySelector('.first-select').value = firstId;
      this.selectFirstSubject(firstId);
    }
    
    if (secondId) {
      this.element.querySelector('.second-select').value = secondId;
      this.selectSecondSubject(secondId);
    }
  }
  
  setSubjectsList(subjects) {
    this.options.subjects = subjects;
    this.populateSubjects();
  }
  
  getCurrentTab() {
    return this.currentTab;
  }
}

// Auto-initialize comparison tools
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.comparison-tool').forEach(tool => {
    if (!tool.dataset.initialized) {
      const options = JSON.parse(tool.dataset.options || '{}');
      new ComparisonTool(tool, options);
      tool.dataset.initialized = 'true';
    }
  });
});
</script>