export const template = `
<div class="training-results-modal modal" role="dialog" aria-labelledby="results-title" aria-modal="true">
  <div class="modal-overlay" aria-hidden="true"></div>
  
  <div class="modal-content">
    <div class="modal-header">
      <div class="header-info">
        <h2 id="results-title" class="modal-title">Risultati Allenamento</h2>
        <span class="training-date"></span>
      </div>
      
      <button class="modal-close-btn" aria-label="Chiudi risultati">
        ✕
      </button>
    </div>
    
    <div class="modal-body">
      <div class="training-summary">
        <div class="summary-header">
          <div class="training-type-info">
            <div class="type-icon"></div>
            <div class="type-details">
              <h3 class="type-name"></h3>
              <span class="type-description"></span>
            </div>
          </div>
          
          <div class="training-stats">
            <div class="stat-item">
              <span class="stat-label">Intensità</span>
              <div class="intensity-display">
                <div class="intensity-dots"></div>
              </div>
            </div>
            <div class="stat-item">
              <span class="stat-label">Durata</span>
              <span class="stat-value duration-value"></span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Partecipanti</span>
              <span class="stat-value participants-count"></span>
            </div>
          </div>
        </div>
        
        <div class="overall-effectiveness">
          <h4>Efficacia Complessiva</h4>
          <div class="effectiveness-meter">
            <div class="effectiveness-fill"></div>
            <span class="effectiveness-percentage">0%</span>
          </div>
          <p class="effectiveness-description"></p>
        </div>
      </div>
      
      <div class="player-results">
        <div class="results-header">
          <h4>Risultati Individuali</h4>
          <div class="results-filters">
            <select class="improvement-filter" aria-label="Filtra per miglioramento">
              <option value="">Tutti i giocatori</option>
              <option value="excellent">Miglioramento eccellente</option>
              <option value="good">Buon miglioramento</option>
              <option value="average">Miglioramento medio</option>
              <option value="poor">Miglioramento scarso</option>
            </select>
          </div>
        </div>
        
        <div class="player-results-list">
          <!-- Player results will be populated here -->
        </div>
      </div>
      
      <div class="training-insights">
        <h4>Insights e Raccomandazioni</h4>
        <div class="insights-list">
          <!-- Insights will be populated here -->
        </div>
      </div>
      
      <div class="injury-report" style="display: none;">
        <h4>⚠️ Report Infortuni</h4>
        <div class="injury-list">
          <!-- Injury reports will be populated here -->
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="footer-actions">
        <button class="button button-ghost export-btn">
          📊 Esporta Report
        </button>
        <button class="button button-secondary schedule-next-btn">
          📅 Pianifica Prossimo
        </button>
        <button class="button button-primary continue-btn">
          ✓ Continua
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-modal">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Training Results Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.training-results-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.training-results-modal.active {
  display: flex;
}

.modal-content {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
}


.training-summary {
  background: var(--background);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.training-type-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.type-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.type-details {
  flex: 1;
}

.type-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.type-description {
  font-size: 14px;
  color: var(--text-muted);
}

.training-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 150px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.intensity-display {
  display: flex;
  align-items: center;
}

.intensity-dots {
  display: flex;
  gap: 3px;
}

.intensity-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
}

.intensity-dot.active {
  background: var(--primary);
}

.overall-effectiveness {
  text-align: center;
}

.overall-effectiveness h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.effectiveness-meter {
  position: relative;
  width: 100%;
  height: 32px;
  background: var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 8px;
}

.effectiveness-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 16px;
  transition: width 1s ease-out;
  position: relative;
}

.effectiveness-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.effectiveness-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.effectiveness-description {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  font-style: italic;
}

.player-results {
  margin-bottom: 24px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.results-header h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.improvement-filter {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.player-results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.player-result-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.player-result-item:hover {
  background: var(--background);
  border-color: var(--primary);
}

.player-avatar-result {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.player-avatar-result img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-info-result {
  flex: 1;
}

.player-name-result {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.player-position-result {
  font-size: 12px;
  color: var(--text-muted);
}

.improvement-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.attribute-improvement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.attribute-name {
  color: var(--text-muted);
}

.improvement-value {
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
}

.improvement-value.positive {
  background: var(--success);
  color: white;
}

.improvement-value.negative {
  background: var(--error);
  color: white;
}

.improvement-value.neutral {
  background: var(--border);
  color: var(--text);
}

.overall-improvement {
  text-align: center;
  min-width: 80px;
}

.improvement-score {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.improvement-score.excellent {
  color: var(--success);
}

.improvement-score.good {
  color: var(--primary);
}

.improvement-score.average {
  color: var(--warning);
}

.improvement-score.poor {
  color: var(--error);
}

.improvement-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.training-insights {
  margin-bottom: 24px;
}

.training-insights h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.insight-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.insight-content {
  flex: 1;
}

.insight-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.insight-description {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0;
}

.insight-item.positive {
  border-left-color: var(--success);
}

.insight-item.negative {
  border-left-color: var(--error);
}

.insight-item.warning {
  border-left-color: var(--warning);
}

.injury-report {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--error);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.injury-report h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--error);
}

.injury-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border-radius: 6px;
  margin-bottom: 8px;
}

.injury-severity {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.injury-severity.minor {
  background: var(--warning);
}

.injury-severity.major {
  background: var(--error);
}

.injury-details {
  flex: 1;
}

.injury-player {
  font-weight: 600;
  color: var(--text);
}

.injury-description {
  font-size: 12px;
  color: var(--text-muted);
}


.sponsor-slot-modal {
  position: absolute;
  bottom: 16px;
  left: 24px;
  width: 150px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Training type specific colors */
.type-icon.fitness {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.type-icon.technical {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.type-icon.tactical {
  background: linear-gradient(135deg, #10b981, #059669);
}

.type-icon.mental {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.type-icon.recovery {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

/* Responsive */
@media (max-width: 768px) {
  .training-results-modal {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .summary-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .training-type-info {
    align-self: stretch;
  }
  
  .training-stats {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .player-result-item {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .improvement-details {
    min-width: auto;
  }
  
  .footer-actions {
    flex-direction: column;
  }
  
  .sponsor-slot-modal {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class TrainingResultsModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoShow: false,
      showAnimations: true,
      ...options
    };
    
    this.trainingData = null;
    this.resultsData = null;
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupAccessibility();
  }
  
  bindEvents() {
    // Close button
    this.element.querySelector('.modal-close-btn').addEventListener('click', () => {
      this.hide();
    });
    
    // Overlay click
    this.element.querySelector('.modal-overlay').addEventListener('click', () => {
      this.hide();
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
    
    // Filter
    this.element.querySelector('.improvement-filter').addEventListener('change', (e) => {
      this.filterResults(e.target.value);
    });
    
    // Footer actions
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportReport();
    });
    
    this.element.querySelector('.schedule-next-btn').addEventListener('click', () => {
      this.scheduleNext();
    });
    
    this.element.querySelector('.continue-btn').addEventListener('click', () => {
      this.continue();
    });
  }
  
  setupAccessibility() {
    // Focus trap
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
  }
  
  show(trainingData, resultsData) {
    this.trainingData = trainingData;
    this.resultsData = resultsData;
    
    this.render();
    this.element.classList.add('active');
    this.isVisible = true;
    
    // Focus management
    this.element.querySelector('.modal-close-btn').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate effectiveness meter
    if (this.options.showAnimations) {
      setTimeout(() => {
        this.animateEffectiveness();
      }, 300);
    }
    
    // Dispatch show event
    this.element.dispatchEvent(new CustomEvent('modalShow', {
      detail: { trainingData, resultsData }
    }));
  }
  
  hide() {
    this.element.classList.remove('active');
    this.isVisible = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Dispatch hide event
    this.element.dispatchEvent(new CustomEvent('modalHide', {
      detail: { trainingData: this.trainingData, resultsData: this.resultsData }
    }));
  }
  
  render() {
    this.renderTrainingSummary();
    this.renderPlayerResults();
    this.renderInsights();
    this.renderInjuryReport();
    this.updateDate();
  }
  
  renderTrainingSummary() {
    const training = this.trainingData;
    const results = this.resultsData;
    
    // Update training type info
    const typeIcon = this.element.querySelector('.type-icon');
    const typeName = this.element.querySelector('.type-name');
    const typeDescription = this.element.querySelector('.type-description');
    
    typeIcon.className = `type-icon ${training.type}`;
    typeIcon.textContent = this.getTypeIcon(training.type);
    typeName.textContent = training.name;
    typeDescription.textContent = training.description;
    
    // Update training stats
    this.renderIntensityDots(training.intensity);
    this.element.querySelector('.duration-value').textContent = training.duration || '90 min';
    this.element.querySelector('.participants-count').textContent = training.participants?.length || 0;
    
    // Update overall effectiveness
    const effectiveness = results.overall_effectiveness || 0;
    this.element.querySelector('.effectiveness-percentage').textContent = `${Math.round(effectiveness)}%`;
    this.element.querySelector('.effectiveness-description').textContent = this.getEffectivenessDescription(effectiveness);
  }
  
  getTypeIcon(type) {
    const icons = {
      fitness: '💪',
      technical: '⚽',
      tactical: '🧠',
      mental: '🎯',
      recovery: '🛌'
    };
    return icons[type] || '🏃';
  }
  
  renderIntensityDots(intensity) {
    const container = this.element.querySelector('.intensity-dots');
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = document.createElement('div');
      dot.className = `intensity-dot ${i <= intensity ? 'active' : ''}`;
      container.appendChild(dot);
    }
  }
  
  getEffectivenessDescription(effectiveness) {
    if (effectiveness >= 90) return 'Allenamento eccezionale! Risultati straordinari.';
    if (effectiveness >= 75) return 'Ottimo allenamento con risultati molto positivi.';
    if (effectiveness >= 60) return 'Buon allenamento con miglioramenti evidenti.';
    if (effectiveness >= 40) return 'Allenamento nella media con alcuni miglioramenti.';
    return 'Allenamento poco efficace, considera di modificare l\'approccio.';
  }
  
  animateEffectiveness() {
    const fill = this.element.querySelector('.effectiveness-fill');
    const effectiveness = this.resultsData.overall_effectiveness || 0;
    fill.style.width = `${effectiveness}%`;
  }
  
  renderPlayerResults() {
    const container = this.element.querySelector('.player-results-list');
    container.innerHTML = '';
    
    const playerResults = this.resultsData.player_results || [];
    
    playerResults.forEach(result => {
      const item = this.createPlayerResultItem(result);
      container.appendChild(item);
    });
  }
  
  createPlayerResultItem(result) {
    const item = document.createElement('div');
    item.className = 'player-result-item';
    item.dataset.improvementLevel = this.getImprovementLevel(result.overall_improvement);
    
    const improvementClass = this.getImprovementClass(result.overall_improvement);
    const improvementScore = this.getImprovementScore(result.overall_improvement);
    
    item.innerHTML = `
      <div class="player-avatar-result">
        <img src="${result.player.photo}" alt="Foto di ${result.player.name}" loading="lazy">
      </div>
      
      <div class="player-info-result">
        <h5 class="player-name-result">${result.player.name}</h5>
        <span class="player-position-result">${result.player.position} • ${result.player.age} anni</span>
      </div>
      
      <div class="improvement-details">
        ${this.renderAttributeImprovements(result.attribute_improvements)}
      </div>
      
      <div class="overall-improvement">
        <div class="improvement-score ${improvementClass}">${improvementScore}</div>
        <div class="improvement-label">${this.getImprovementLabel(result.overall_improvement)}</div>
      </div>
    `;
    
    return item;
  }
  
  renderAttributeImprovements(improvements) {
    return Object.entries(improvements).map(([attr, value]) => {
      const valueClass = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
      const displayValue = value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1);
      
      return `
        <div class="attribute-improvement">
          <span class="attribute-name">${this.getAttributeName(attr)}</span>
          <span class="improvement-value ${valueClass}">${displayValue}</span>
        </div>
      `;
    }).join('');
  }
  
  getAttributeName(attr) {
    const names = {
      pace: 'Velocità',
      shooting: 'Tiro',
      passing: 'Passaggio',
      dribbling: 'Dribbling',
      defending: 'Difesa',
      physical: 'Fisico'
    };
    return names[attr] || attr;
  }
  
  getImprovementLevel(improvement) {
    if (improvement >= 3) return 'excellent';
    if (improvement >= 2) return 'good';
    if (improvement >= 1) return 'average';
    return 'poor';
  }
  
  getImprovementClass(improvement) {
    return this.getImprovementLevel(improvement);
  }
  
  getImprovementScore(improvement) {
    if (improvement >= 3) return 'A+';
    if (improvement >= 2) return 'A';
    if (improvement >= 1) return 'B';
    if (improvement >= 0) return 'C';
    return 'D';
  }
  
  getImprovementLabel(improvement) {
    if (improvement >= 3) return 'Eccellente';
    if (improvement >= 2) return 'Buono';
    if (improvement >= 1) return 'Medio';
    return 'Scarso';
  }
  
  renderInsights() {
    const container = this.element.querySelector('.insights-list');
    container.innerHTML = '';
    
    const insights = this.generateInsights();
    
    insights.forEach(insight => {
      const item = this.createInsightItem(insight);
      container.appendChild(item);
    });
  }
  
  generateInsights() {
    const insights = [];
    const results = this.resultsData;
    
    // Overall effectiveness insight
    const effectiveness = results.overall_effectiveness || 0;
    if (effectiveness >= 80) {
      insights.push({
        type: 'positive',
        icon: '🎉',
        title: 'Allenamento Eccellente',
        description: 'L\'allenamento ha prodotto risultati straordinari. Continua con questo approccio!'
      });
    } else if (effectiveness < 50) {
      insights.push({
        type: 'negative',
        icon: '⚠️',
        title: 'Efficacia Limitata',
        description: 'L\'allenamento non ha prodotto i risultati sperati. Considera di modificare intensità o tipo.'
      });
    }
    
    // Player-specific insights
    const playerResults = results.player_results || [];
    const excellentPlayers = playerResults.filter(r => r.overall_improvement >= 3).length;
    const poorPlayers = playerResults.filter(r => r.overall_improvement < 1).length;
    
    if (excellentPlayers > 0) {
      insights.push({
        type: 'positive',
        icon: '⭐',
        title: 'Giocatori in Evidenza',
        description: `${excellentPlayers} giocatori hanno mostrato miglioramenti eccellenti.`
      });
    }
    
    if (poorPlayers > playerResults.length / 2) {
      insights.push({
        type: 'warning',
        icon: '📊',
        title: 'Risultati Misti',
        description: 'Molti giocatori non hanno beneficiato appieno dell\'allenamento. Valuta un approccio più personalizzato.'
      });
    }
    
    // Injury risk insight
    if (results.injury_risk > 0.3) {
      insights.push({
        type: 'warning',
        icon: '🏥',
        title: 'Rischio Infortuni Elevato',
        description: 'L\'intensità dell\'allenamento ha aumentato il rischio di infortuni. Considera sessioni di recupero.'
      });
    }
    
    return insights;
  }
  
  createInsightItem(insight) {
    const item = document.createElement('div');
    item.className = `insight-item ${insight.type}`;
    
    item.innerHTML = `
      <div class="insight-icon">${insight.icon}</div>
      <div class="insight-content">
        <h5 class="insight-title">${insight.title}</h5>
        <p class="insight-description">${insight.description}</p>
      </div>
    `;
    
    return item;
  }
  
  renderInjuryReport() {
    const injuries = this.resultsData.injuries || [];
    const injuryReport = this.element.querySelector('.injury-report');
    
    if (injuries.length === 0) {
      injuryReport.style.display = 'none';
      return;
    }
    
    injuryReport.style.display = 'block';
    const injuryList = injuryReport.querySelector('.injury-list');
    injuryList.innerHTML = '';
    
    injuries.forEach(injury => {
      const item = this.createInjuryItem(injury);
      injuryList.appendChild(item);
    });
  }
  
  createInjuryItem(injury) {
    const item = document.createElement('div');
    item.className = 'injury-item';
    
    const severity = injury.severity > 5 ? 'major' : 'minor';
    
    item.innerHTML = `
      <div class="injury-severity ${severity}"></div>
      <div class="injury-details">
        <div class="injury-player">${injury.player.name}</div>
        <div class="injury-description">${injury.type} - ${injury.estimated_recovery} giorni di recupero</div>
      </div>
    `;
    
    return item;
  }
  
  updateDate() {
    const dateElement = this.element.querySelector('.training-date');
    const date = this.trainingData.date || new Date().toISOString().split('T')[0];
    dateElement.textContent = new Date(date).toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  filterResults(filterValue) {
    const items = this.element.querySelectorAll('.player-result-item');
    
    items.forEach(item => {
      const improvementLevel = item.dataset.improvementLevel;
      
      if (!filterValue || improvementLevel === filterValue) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  exportReport() {
    const reportData = {
      training: this.trainingData,
      results: this.resultsData,
      date: new Date().toISOString(),
      summary: {
        effectiveness: this.resultsData.overall_effectiveness,
        participants: this.trainingData.participants?.length || 0,
        injuries: this.resultsData.injuries?.length || 0
      }
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `training-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Report esportato con successo');
  }
  
  scheduleNext() {
    // Dispatch event to schedule next training
    this.element.dispatchEvent(new CustomEvent('scheduleNextTraining', {
      detail: {
        trainingData: this.trainingData,
        resultsData: this.resultsData
      }
    }));
    
    this.hide();
  }
  
  continue() {
    // Dispatch event to continue
    this.element.dispatchEvent(new CustomEvent('trainingComplete', {
      detail: {
        trainingData: this.trainingData,
        resultsData: this.resultsData
      }
    }));
    
    this.hide();
  }
  
  handleTabNavigation(e) {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  isOpen() {
    return this.isVisible;
  }
  
  getTrainingData() {
    return this.trainingData;
  }
  
  getResultsData() {
    return this.resultsData;
  }
  
  updateResults(newResults) {
    this.resultsData = newResults;
    this.render();
  }
}

// Global function to show training results
window.showTrainingResults = function(trainingData, resultsData) {
  const modal = document.querySelector('.training-results-modal');
  if (modal && modal.trainingResultsModal) {
    modal.trainingResultsModal.show(trainingData, resultsData);
  }
};

export default TrainingResultsModal;