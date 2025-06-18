export const template = `
<div class="live-stats-panel">
  <div class="stats-header">
    <h3 class="stats-title">Statistiche Live</h3>
    <div class="stats-controls">
      <button class="control-btn refresh-stats-btn" aria-label="Aggiorna statistiche">
        ↻ Aggiorna
      </button>
      <button class="control-btn detailed-view-btn" aria-label="Vista dettagliata">
        📊 Dettagli
      </button>
    </div>
  </div>
  
  <div class="stats-content">
    <div class="possession-section">
      <h4>Possesso Palla</h4>
      <div class="possession-display">
        <div class="team-possession home-possession">
          <span class="possession-percentage home-percentage">58%</span>
          <span class="team-name">Milan</span>
        </div>
        
        <div class="possession-bar">
          <div class="possession-fill home-fill" style="width: 58%"></div>
          <div class="possession-fill away-fill" style="width: 42%"></div>
        </div>
        
        <div class="team-possession away-possession">
          <span class="team-name">Inter</span>
          <span class="possession-percentage away-percentage">42%</span>
        </div>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-category">
        <h4>Attacco</h4>
        <div class="stat-rows">
          <div class="stat-row">
            <span class="stat-label">Tiri Totali</span>
            <div class="stat-comparison">
              <span class="home-stat">12</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">8</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Tiri in Porta</span>
            <div class="stat-comparison">
              <span class="home-stat">6</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">4</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Tiri Fuori</span>
            <div class="stat-comparison">
              <span class="home-stat">6</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">4</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Corner</span>
            <div class="stat-comparison">
              <span class="home-stat">5</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">3</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-category">
        <h4>Difesa</h4>
        <div class="stat-rows">
          <div class="stat-row">
            <span class="stat-label">Contrasti</span>
            <div class="stat-comparison">
              <span class="home-stat">18</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">22</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Intercetti</span>
            <div class="stat-comparison">
              <span class="home-stat">14</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">16</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Salvataggi</span>
            <div class="stat-comparison">
              <span class="home-stat">3</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">5</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Fuorigioco</span>
            <div class="stat-comparison">
              <span class="home-stat">2</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">1</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-category">
        <h4>Disciplina</h4>
        <div class="stat-rows">
          <div class="stat-row">
            <span class="stat-label">Falli Commessi</span>
            <div class="stat-comparison">
              <span class="home-stat">8</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">12</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Cartellini Gialli</span>
            <div class="stat-comparison">
              <span class="home-stat">2</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">3</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Cartellini Rossi</span>
            <div class="stat-comparison">
              <span class="home-stat">0</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">0</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-category">
        <h4>Passaggi</h4>
        <div class="stat-rows">
          <div class="stat-row">
            <span class="stat-label">Passaggi Totali</span>
            <div class="stat-comparison">
              <span class="home-stat">342</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">298</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Precisione %</span>
            <div class="stat-comparison">
              <span class="home-stat">87%</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">82%</span>
            </div>
          </div>
          
          <div class="stat-row">
            <span class="stat-label">Cross</span>
            <div class="stat-comparison">
              <span class="home-stat">15</span>
              <span class="stat-separator">-</span>
              <span class="away-stat">12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="performance-indicators">
      <h4>Indicatori Performance</h4>
      <div class="indicators-grid">
        <div class="indicator-item">
          <div class="indicator-label">Intensità</div>
          <div class="indicator-bars">
            <div class="indicator-bar home-bar">
              <div class="bar-fill" style="width: 78%"></div>
            </div>
            <div class="indicator-bar away-bar">
              <div class="bar-fill" style="width: 82%"></div>
            </div>
          </div>
          <div class="indicator-values">
            <span class="home-value">78%</span>
            <span class="away-value">82%</span>
          </div>
        </div>
        
        <div class="indicator-item">
          <div class="indicator-label">Pressione</div>
          <div class="indicator-bars">
            <div class="indicator-bar home-bar">
              <div class="bar-fill" style="width: 65%"></div>
            </div>
            <div class="indicator-bar away-bar">
              <div class="bar-fill" style="width: 71%"></div>
            </div>
          </div>
          <div class="indicator-values">
            <span class="home-value">65%</span>
            <span class="away-value">71%</span>
          </div>
        </div>
        
        <div class="indicator-item">
          <div class="indicator-label">Controllo</div>
          <div class="indicator-bars">
            <div class="indicator-bar home-bar">
              <div class="bar-fill" style="width: 72%"></div>
            </div>
            <div class="indicator-bar away-bar">
              <div class="bar-fill" style="width: 68%"></div>
            </div>
          </div>
          <div class="indicator-values">
            <span class="home-value">72%</span>
            <span class="away-value">68%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-stats">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Live Stats Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.live-stats-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.stats-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.stats-controls {
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

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.possession-section {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.possession-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
  text-align: center;
}

.possession-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.team-possession {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 80px;
}

.away-possession {
  align-items: center;
}

.possession-percentage {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

.team-name {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.possession-bar {
  flex: 1;
  height: 20px;
  background: var(--border);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  position: relative;
}

.possession-fill {
  height: 100%;
  transition: width 0.8s ease;
}

.home-fill {
  background: linear-gradient(90deg, var(--primary), #1e40af);
}

.away-fill {
  background: linear-gradient(90deg, var(--secondary), #047857);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-category {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.stat-category h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
  text-align: center;
  text-transform: uppercase;
}

.stat-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-comparison {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

.home-stat {
  color: var(--primary);
  min-width: 30px;
  text-align: right;
}

.away-stat {
  color: var(--secondary);
  min-width: 30px;
  text-align: left;
}

.stat-separator {
  color: var(--text-muted);
  font-weight: 400;
}

.performance-indicators {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.performance-indicators h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
  text-align: center;
}

.indicators-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.indicator-label {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
  min-width: 80px;
}

.indicator-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.indicator-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.home-bar .bar-fill {
  background: linear-gradient(90deg, var(--primary), #1e40af);
}

.away-bar .bar-fill {
  background: linear-gradient(90deg, var(--secondary), #047857);
}

.indicator-values {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 40px;
  text-align: center;
}

.home-value {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
}

.away-value {
  font-size: 11px;
  font-weight: 600;
  color: var(--secondary);
}

.sponsor-slot-stats {
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

/* Animation for stat updates */
.stat-comparison.updated {
  animation: statUpdate 0.5s ease;
}

@keyframes statUpdate {
  0% { background: transparent; }
  50% { background: rgba(37, 99, 235, 0.1); }
  100% { background: transparent; }
}

.possession-fill.updated {
  animation: possessionUpdate 0.8s ease;
}

@keyframes possessionUpdate {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .possession-display {
    flex-direction: column;
    gap: 8px;
  }
  
  .possession-bar {
    width: 100%;
    order: -1;
  }
  
  .team-possession {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .stats-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .stats-controls {
    justify-content: center;
  }
  
  .indicator-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .indicator-label {
    min-width: auto;
    text-align: center;
  }
  
  .indicator-values {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .sponsor-slot-stats {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class LiveStatsPanel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoUpdate: true,
      updateInterval: 10000, // 10 seconds
      showAnimations: true,
      ...options
    };
    
    this.stats = {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      shotsOff: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      tackles: { home: 0, away: 0 },
      interceptions: { home: 0, away: 0 },
      saves: { home: 0, away: 0 },
      offsides: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      yellowCards: { home: 0, away: 0 },
      redCards: { home: 0, away: 0 },
      passes: { home: 0, away: 0 },
      passAccuracy: { home: 0, away: 0 },
      crosses: { home: 0, away: 0 },
      performance: {
        intensity: { home: 0, away: 0 },
        pressure: { home: 0, away: 0 },
        control: { home: 0, away: 0 }
      }
    };
    
    this.updateInterval = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startAutoUpdate();
    this.updateDisplay();
  }
  
  bindEvents() {
    // Control buttons
    this.element.querySelector('.refresh-stats-btn').addEventListener('click', () => {
      this.refreshStats();
    });
    
    this.element.querySelector('.detailed-view-btn').addEventListener('click', () => {
      this.showDetailedView();
    });
    
    // Listen for match events that might update stats
    document.addEventListener('matchEvent', (e) => {
      this.handleMatchEvent(e.detail);
    });
  }
  
  startAutoUpdate() {
    if (this.options.autoUpdate) {
      this.updateInterval = setInterval(() => {
        this.requestStatsUpdate();
      }, this.options.updateInterval);
    }
  }
  
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  requestStatsUpdate() {
    // Dispatch event to request updated stats
    this.element.dispatchEvent(new CustomEvent('requestStatsUpdate', {
      detail: { timestamp: Date.now() }
    }));
  }
  
  updateStats(newStats) {
    const oldStats = { ...this.stats };
    this.stats = { ...this.stats, ...newStats };
    
    this.updateDisplay(oldStats);
    
    // Dispatch stats update event
    this.element.dispatchEvent(new CustomEvent('statsUpdated', {
      detail: { stats: this.stats, previousStats: oldStats }
    }));
  }
  
  updateDisplay(oldStats = {}) {
    this.updatePossession(oldStats);
    this.updateStatRows(oldStats);
    this.updatePerformanceIndicators(oldStats);
  }
  
  updatePossession(oldStats) {
    const homePercentage = this.element.querySelector('.home-percentage');
    const awayPercentage = this.element.querySelector('.away-percentage');
    const homeFill = this.element.querySelector('.home-fill');
    const awayFill = this.element.querySelector('.away-fill');
    
    homePercentage.textContent = `${this.stats.possession.home}%`;
    awayPercentage.textContent = `${this.stats.possession.away}%`;
    
    homeFill.style.width = `${this.stats.possession.home}%`;
    awayFill.style.width = `${this.stats.possession.away}%`;
    
    // Animate if changed
    if (oldStats.possession && 
        (oldStats.possession.home !== this.stats.possession.home ||
         oldStats.possession.away !== this.stats.possession.away)) {
      if (this.options.showAnimations) {
        homeFill.classList.add('updated');
        awayFill.classList.add('updated');
        setTimeout(() => {
          homeFill.classList.remove('updated');
          awayFill.classList.remove('updated');
        }, 800);
      }
    }
  }
  
  updateStatRows(oldStats) {
    const statMappings = [
      { selector: '.stat-row:nth-child(1) .stat-comparison', stat: 'shots' },
      { selector: '.stat-row:nth-child(2) .stat-comparison', stat: 'shotsOnTarget' },
      { selector: '.stat-row:nth-child(3) .stat-comparison', stat: 'shotsOff' },
      { selector: '.stat-row:nth-child(4) .stat-comparison', stat: 'corners' }
    ];
    
    // Update attack stats
    const attackCategory = this.element.querySelectorAll('.stat-category')[0];
    this.updateCategoryStats(attackCategory, statMappings, oldStats);
    
    // Update defense stats
    const defenseCategory = this.element.querySelectorAll('.stat-category')[1];
    const defenseMappings = [
      { selector: '.stat-row:nth-child(1) .stat-comparison', stat: 'tackles' },
      { selector: '.stat-row:nth-child(2) .stat-comparison', stat: 'interceptions' },
      { selector: '.stat-row:nth-child(3) .stat-comparison', stat: 'saves' },
      { selector: '.stat-row:nth-child(4) .stat-comparison', stat: 'offsides' }
    ];
    this.updateCategoryStats(defenseCategory, defenseMappings, oldStats);
    
    // Update discipline stats
    const disciplineCategory = this.element.querySelectorAll('.stat-category')[2];
    const disciplineMappings = [
      { selector: '.stat-row:nth-child(1) .stat-comparison', stat: 'fouls' },
      { selector: '.stat-row:nth-child(2) .stat-comparison', stat: 'yellowCards' },
      { selector: '.stat-row:nth-child(3) .stat-comparison', stat: 'redCards' }
    ];
    this.updateCategoryStats(disciplineCategory, disciplineMappings, oldStats);
    
    // Update passing stats
    const passingCategory = this.element.querySelectorAll('.stat-category')[3];
    const passingMappings = [
      { selector: '.stat-row:nth-child(1) .stat-comparison', stat: 'passes' },
      { selector: '.stat-row:nth-child(2) .stat-comparison', stat: 'passAccuracy', isPercentage: true },
      { selector: '.stat-row:nth-child(3) .stat-comparison', stat: 'crosses' }
    ];
    this.updateCategoryStats(passingCategory, passingMappings, oldStats);
  }
  
  updateCategoryStats(category, mappings, oldStats) {
    mappings.forEach(mapping => {
      const element = category.querySelector(mapping.selector);
      if (!element) return;
      
      const homeStat = element.querySelector('.home-stat');
      const awayStat = element.querySelector('.away-stat');
      
      if (homeStat && awayStat) {
        const homeValue = this.stats[mapping.stat]?.home || 0;
        const awayValue = this.stats[mapping.stat]?.away || 0;
        
        homeStat.textContent = mapping.isPercentage ? `${homeValue}%` : homeValue;
        awayStat.textContent = mapping.isPercentage ? `${awayValue}%` : awayValue;
        
        // Animate if changed
        if (oldStats[mapping.stat] && this.options.showAnimations &&
            (oldStats[mapping.stat].home !== homeValue ||
             oldStats[mapping.stat].away !== awayValue)) {
          element.classList.add('updated');
          setTimeout(() => {
            element.classList.remove('updated');
          }, 500);
        }
      }
    });
  }
  
  updatePerformanceIndicators(oldStats) {
    const indicators = ['intensity', 'pressure', 'control'];
    const indicatorItems = this.element.querySelectorAll('.indicator-item');
    
    indicators.forEach((indicator, index) => {
      const item = indicatorItems[index];
      if (!item) return;
      
      const homeBar = item.querySelector('.home-bar .bar-fill');
      const awayBar = item.querySelector('.away-bar .bar-fill');
      const homeValue = item.querySelector('.home-value');
      const awayValue = item.querySelector('.away-value');
      
      const homePercentage = this.stats.performance[indicator]?.home || 0;
      const awayPercentage = this.stats.performance[indicator]?.away || 0;
      
      homeBar.style.width = `${homePercentage}%`;
      awayBar.style.width = `${awayPercentage}%`;
      homeValue.textContent = `${homePercentage}%`;
      awayValue.textContent = `${awayPercentage}%`;
    });
  }
  
  handleMatchEvent(eventData) {
    // Update stats based on match events
    switch (eventData.type) {
      case 'goal':
        this.incrementStat('shots', eventData.team);
        this.incrementStat('shotsOnTarget', eventData.team);
        break;
      case 'shot':
        this.incrementStat('shots', eventData.team);
        if (eventData.onTarget) {
          this.incrementStat('shotsOnTarget', eventData.team);
        } else {
          this.incrementStat('shotsOff', eventData.team);
        }
        break;
      case 'corner':
        this.incrementStat('corners', eventData.team);
        break;
      case 'foul':
        this.incrementStat('fouls', eventData.team);
        break;
      case 'card':
        if (eventData.cardType === 'yellow') {
          this.incrementStat('yellowCards', eventData.team);
        } else if (eventData.cardType === 'red') {
          this.incrementStat('redCards', eventData.team);
        }
        break;
    }
    
    this.updateDisplay();
  }
  
  incrementStat(statName, team) {
    if (this.stats[statName] && this.stats[statName][team] !== undefined) {
      this.stats[statName][team]++;
    }
  }
  
  refreshStats() {
    this.requestStatsUpdate();
    this.showSuccess('Statistiche aggiornate');
  }
  
  showDetailedView() {
    // Dispatch event to show detailed stats view
    this.element.dispatchEvent(new CustomEvent('showDetailedStats', {
      detail: { stats: this.stats }
    }));
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getStats() {
    return { ...this.stats };
  }
  
  setStats(newStats) {
    this.updateStats(newStats);
  }
  
  resetStats() {
    this.stats = {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      shotsOff: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      tackles: { home: 0, away: 0 },
      interceptions: { home: 0, away: 0 },
      saves: { home: 0, away: 0 },
      offsides: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      yellowCards: { home: 0, away: 0 },
      redCards: { home: 0, away: 0 },
      passes: { home: 0, away: 0 },
      passAccuracy: { home: 0, away: 0 },
      crosses: { home: 0, away: 0 },
      performance: {
        intensity: { home: 0, away: 0 },
        pressure: { home: 0, away: 0 },
        control: { home: 0, away: 0 }
      }
    };
    
    this.updateDisplay();
  }
  
  exportStats() {
    return {
      stats: this.stats,
      timestamp: new Date().toISOString()
    };
  }
  
  destroy() {
    this.stopAutoUpdate();
  }
}

export default LiveStatsPanel;