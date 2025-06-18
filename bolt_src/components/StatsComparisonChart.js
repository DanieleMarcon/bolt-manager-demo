export const template = `
<div class="stats-comparison-chart">
  <div class="chart-header">
    <h3 class="chart-title">Confronto Statistiche</h3>
    <div class="chart-controls">
      <select class="stat-category-select" aria-label="Seleziona categoria statistiche">
        <option value="all">Tutte le Statistiche</option>
        <option value="attack">Attacco</option>
        <option value="defense">Difesa</option>
        <option value="possession">Possesso</option>
      </select>
      <button class="chart-export-btn button button-ghost" aria-label="Esporta grafico">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="teams-comparison">
    <div class="team-header home-team-header">
      <img src="" alt="Home team logo" class="team-logo-chart">
      <span class="team-name-chart home-team-name"></span>
    </div>
    
    <div class="vs-divider">VS</div>
    
    <div class="team-header away-team-header">
      <span class="team-name-chart away-team-name"></span>
      <img src="" alt="Away team logo" class="team-logo-chart">
    </div>
  </div>
  
  <div class="stats-chart-container">
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Possesso Palla</span>
        <div class="stat-values">
          <span class="home-value">58%</span>
          <span class="away-value">42%</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 58%"></div>
        <div class="away-bar" style="width: 42%"></div>
      </div>
    </div>
    
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Tiri Totali</span>
        <div class="stat-values">
          <span class="home-value">12</span>
          <span class="away-value">8</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 60%"></div>
        <div class="away-bar" style="width: 40%"></div>
      </div>
    </div>
    
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Tiri in Porta</span>
        <div class="stat-values">
          <span class="home-value">6</span>
          <span class="away-value">4</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 60%"></div>
        <div class="away-bar" style="width: 40%"></div>
      </div>
    </div>
    
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Precisione Passaggi</span>
        <div class="stat-values">
          <span class="home-value">87%</span>
          <span class="away-value">82%</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 51.5%"></div>
        <div class="away-bar" style="width: 48.5%"></div>
      </div>
    </div>
    
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Contrasti Vinti</span>
        <div class="stat-values">
          <span class="home-value">18</span>
          <span class="away-value">22</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 45%"></div>
        <div class="away-bar" style="width: 55%"></div>
      </div>
    </div>
    
    <div class="stat-comparison-item">
      <div class="stat-info">
        <span class="stat-label">Corner</span>
        <div class="stat-values">
          <span class="home-value">5</span>
          <span class="away-value">3</span>
        </div>
      </div>
      <div class="comparison-bar">
        <div class="home-bar" style="width: 62.5%"></div>
        <div class="away-bar" style="width: 37.5%"></div>
      </div>
    </div>
  </div>
  
  <div class="chart-summary">
    <div class="summary-item">
      <span class="summary-label">Squadra Dominante:</span>
      <span class="dominant-team"></span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Statistica Chiave:</span>
      <span class="key-stat"></span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-chart">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Stats Chart Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.stats-comparison-chart {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.chart-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.stat-category-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.chart-export-btn {
  padding: 6px 12px;
  font-size: 12px;
}

.teams-comparison {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.team-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.away-team-header {
  flex-direction: row-reverse;
}

.team-logo-chart {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--border);
}

.team-name-chart {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.vs-divider {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 0 20px;
}

.stats-chart-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-comparison-item {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.stat-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.stat-values {
  display: flex;
  gap: 16px;
}

.home-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  min-width: 40px;
  text-align: right;
}

.away-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--secondary);
  min-width: 40px;
  text-align: left;
}

.comparison-bar {
  position: relative;
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
}

.home-bar {
  background: linear-gradient(90deg, var(--primary), #1e40af);
  transition: width 0.8s ease;
  border-radius: 6px 0 0 6px;
}

.away-bar {
  background: linear-gradient(90deg, #047857, var(--secondary));
  transition: width 0.8s ease;
  border-radius: 0 6px 6px 0;
  margin-left: auto;
}

.chart-summary {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  margin-bottom: 16px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.dominant-team,
.key-stat {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.sponsor-slot-chart {
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

/* Animation for bars */
.comparison-bar.animate .home-bar,
.comparison-bar.animate .away-bar {
  animation: barGrow 1s ease-out;
}

@keyframes barGrow {
  0% { width: 0; }
  100% { width: var(--final-width); }
}

/* Responsive */
@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .chart-controls {
    justify-content: center;
  }
  
  .teams-comparison {
    flex-direction: column;
    gap: 12px;
  }
  
  .team-header {
    justify-content: center;
  }
  
  .away-team-header {
    flex-direction: row;
  }
  
  .vs-divider {
    padding: 0;
  }
  
  .chart-summary {
    flex-direction: column;
    gap: 12px;
  }
  
  .sponsor-slot-chart {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class StatsComparisonChart {
  constructor(element, matchData) {
    this.element = element;
    this.matchData = matchData;
    this.currentCategory = 'all';
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.animateBars();
  }
  
  render() {
    const match = this.matchData;
    
    // Update team headers
    this.element.querySelector('.home-team-name').textContent = match.homeTeam.name;
    this.element.querySelector('.away-team-name').textContent = match.awayTeam.name;
    this.element.querySelector('.home-team-header .team-logo-chart').src = match.homeTeam.logo;
    this.element.querySelector('.away-team-header .team-logo-chart').src = match.awayTeam.logo;
    
    // Update statistics
    this.updateStats(match.stats);
    
    // Update summary
    this.updateSummary();
  }
  
  updateStats(stats) {
    const items = this.element.querySelectorAll('.stat-comparison-item');
    
    const statsData = [
      {
        label: 'Possesso Palla',
        home: stats.possession?.home || 50,
        away: stats.possession?.away || 50,
        isPercentage: true
      },
      {
        label: 'Tiri Totali',
        home: stats.shots?.home || 0,
        away: stats.shots?.away || 0
      },
      {
        label: 'Tiri in Porta',
        home: stats.shotsOnTarget?.home || 0,
        away: stats.shotsOnTarget?.away || 0
      },
      {
        label: 'Precisione Passaggi',
        home: stats.passAccuracy?.home || 0,
        away: stats.passAccuracy?.away || 0,
        isPercentage: true
      },
      {
        label: 'Contrasti Vinti',
        home: stats.tackles?.home || 0,
        away: stats.tackles?.away || 0
      },
      {
        label: 'Corner',
        home: stats.corners?.home || 0,
        away: stats.corners?.away || 0
      }
    ];
    
    items.forEach((item, index) => {
      if (statsData[index]) {
        this.updateStatItem(item, statsData[index]);
      }
    });
  }
  
  updateStatItem(item, statData) {
    const label = item.querySelector('.stat-label');
    const homeValue = item.querySelector('.home-value');
    const awayValue = item.querySelector('.away-value');
    const homeBar = item.querySelector('.home-bar');
    const awayBar = item.querySelector('.away-bar');
    
    label.textContent = statData.label;
    
    const homeDisplay = statData.isPercentage ? `${statData.home}%` : statData.home;
    const awayDisplay = statData.isPercentage ? `${statData.away}%` : statData.away;
    
    homeValue.textContent = homeDisplay;
    awayValue.textContent = awayDisplay;
    
    // Calculate bar widths
    const total = statData.home + statData.away;
    const homeWidth = total > 0 ? (statData.home / total) * 100 : 50;
    const awayWidth = total > 0 ? (statData.away / total) * 100 : 50;
    
    homeBar.style.width = `${homeWidth}%`;
    awayBar.style.width = `${awayWidth}%`;
  }
  
  updateSummary() {
    const dominantTeam = this.calculateDominantTeam();
    const keyStatistic = this.findKeyStatistic();
    
    this.element.querySelector('.dominant-team').textContent = dominantTeam;
    this.element.querySelector('.key-stat').textContent = keyStatistic;
  }
  
  calculateDominantTeam() {
    const stats = this.matchData.stats;
    let homeScore = 0;
    let awayScore = 0;
    
    // Simple scoring system based on key stats
    if (stats.possession) {
      homeScore += stats.possession.home > stats.possession.away ? 1 : 0;
      awayScore += stats.possession.away > stats.possession.home ? 1 : 0;
    }
    
    if (stats.shots) {
      homeScore += stats.shots.home > stats.shots.away ? 1 : 0;
      awayScore += stats.shots.away > stats.shots.home ? 1 : 0;
    }
    
    if (stats.shotsOnTarget) {
      homeScore += stats.shotsOnTarget.home > stats.shotsOnTarget.away ? 1 : 0;
      awayScore += stats.shotsOnTarget.away > stats.shotsOnTarget.home ? 1 : 0;
    }
    
    if (homeScore > awayScore) {
      return this.matchData.homeTeam.name;
    } else if (awayScore > homeScore) {
      return this.matchData.awayTeam.name;
    } else {
      return 'Equilibrio';
    }
  }
  
  findKeyStatistic() {
    const stats = this.matchData.stats;
    
    // Find the stat with the biggest difference
    let maxDiff = 0;
    let keyStat = 'Possesso equilibrato';
    
    if (stats.possession) {
      const diff = Math.abs(stats.possession.home - stats.possession.away);
      if (diff > maxDiff) {
        maxDiff = diff;
        keyStat = `Possesso: ${diff}% di differenza`;
      }
    }
    
    if (stats.shots) {
      const diff = Math.abs(stats.shots.home - stats.shots.away);
      if (diff > maxDiff && diff > 2) {
        maxDiff = diff;
        keyStat = `Tiri: +${diff} per la squadra dominante`;
      }
    }
    
    return keyStat;
  }
  
  bindEvents() {
    // Category filter
    this.element.querySelector('.stat-category-select').addEventListener('change', (e) => {
      this.currentCategory = e.target.value;
      this.filterStats();
    });
    
    // Export button
    this.element.querySelector('.chart-export-btn').addEventListener('click', () => {
      this.exportChart();
    });
  }
  
  filterStats() {
    const items = this.element.querySelectorAll('.stat-comparison-item');
    
    items.forEach((item, index) => {
      const shouldShow = this.shouldShowStat(index);
      item.style.display = shouldShow ? 'block' : 'none';
    });
  }
  
  shouldShowStat(index) {
    if (this.currentCategory === 'all') return true;
    
    const categories = {
      attack: [1, 2, 5], // Shots, shots on target, corners
      defense: [4], // Tackles
      possession: [0, 3] // Possession, pass accuracy
    };
    
    return categories[this.currentCategory]?.includes(index) || false;
  }
  
  animateBars() {
    setTimeout(() => {
      this.element.querySelectorAll('.comparison-bar').forEach(bar => {
        bar.classList.add('animate');
      });
    }, 100);
  }
  
  exportChart() {
    const chartData = {
      teams: {
        home: this.matchData.homeTeam.name,
        away: this.matchData.awayTeam.name
      },
      stats: this.matchData.stats,
      summary: {
        dominantTeam: this.element.querySelector('.dominant-team').textContent,
        keyStatistic: this.element.querySelector('.key-stat').textContent
      }
    };
    
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stats-comparison-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Grafico esportato con successo');
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
}

export default StatsComparisonChart;