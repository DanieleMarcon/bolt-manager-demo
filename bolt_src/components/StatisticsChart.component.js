/**
 * StatisticsChart Component
 * Used in: MatchAnalysis.page.js
 * Expected data: { homeTeam, awayTeam, statistics }
 */

export default class StatisticsChart {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.homeTeam = props.homeTeam || { name: 'Home' };
    this.awayTeam = props.awayTeam || { name: 'Away' };
    this.statistics = props.statistics || {};
    this.chartType = props.chartType || 'comparison';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="statistics-chart">
        <div class="chart-header">
          <h4>Statistiche Comparative</h4>
          <div class="chart-controls">
            <select class="chart-type-select">
              <option value="comparison" ${this.chartType === 'comparison' ? 'selected' : ''}>Confronto</option>
              <option value="possession" ${this.chartType === 'possession' ? 'selected' : ''}>Possesso</option>
              <option value="shots" ${this.chartType === 'shots' ? 'selected' : ''}>Tiri</option>
              <option value="passing" ${this.chartType === 'passing' ? 'selected' : ''}>Passaggi</option>
            </select>
          </div>
        </div>
        
        <div class="chart-content">
          ${this.renderChart()}
        </div>
        
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-color home-color"></span>
            <span class="legend-label">${this.homeTeam.name}</span>
          </div>
          <div class="legend-item">
            <span class="legend-color away-color"></span>
            <span class="legend-label">${this.awayTeam.name}</span>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderChart() {
    switch (this.chartType) {
      case 'comparison':
        return this.renderComparisonChart();
      case 'possession':
        return this.renderPossessionChart();
      case 'shots':
        return this.renderShotsChart();
      case 'passing':
        return this.renderPassingChart();
      default:
        return this.renderComparisonChart();
    }
  }

  renderComparisonChart() {
    const stats = [
      { label: 'Possesso', home: this.statistics.possession?.home || 50, away: this.statistics.possession?.away || 50, max: 100 },
      { label: 'Tiri', home: this.statistics.shots?.home || 0, away: this.statistics.shots?.away || 0, max: 20 },
      { label: 'Tiri in Porta', home: this.statistics.shotsOnTarget?.home || 0, away: this.statistics.shotsOnTarget?.away || 0, max: 10 },
      { label: 'Corner', home: this.statistics.corners?.home || 0, away: this.statistics.corners?.away || 0, max: 15 },
      { label: 'Falli', home: this.statistics.fouls?.home || 0, away: this.statistics.fouls?.away || 0, max: 20 },
      { label: 'Cartellini', home: this.statistics.yellowCards?.home || 0, away: this.statistics.yellowCards?.away || 0, max: 5 }
    ];
    
    return `
      <div class="comparison-chart">
        ${stats.map(stat => `
          <div class="stat-comparison">
            <div class="stat-label">${stat.label}</div>
            <div class="stat-bars">
              <div class="stat-bar-container home-side">
                <span class="stat-value">${stat.home}</span>
                <div class="stat-bar home-bar" style="width: ${(stat.home / stat.max) * 100}%"></div>
              </div>
              <div class="stat-bar-container away-side">
                <div class="stat-bar away-bar" style="width: ${(stat.away / stat.max) * 100}%"></div>
                <span class="stat-value">${stat.away}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderPossessionChart() {
    const homePossession = this.statistics.possession?.home || 50;
    const awayPossession = this.statistics.possession?.away || 50;
    
    return `
      <div class="possession-chart">
        <div class="possession-pie">
          <svg viewBox="0 0 200 200" class="pie-chart">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" stroke-width="20"/>
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--primary)" stroke-width="20"
                    stroke-dasharray="${(homePossession / 100) * 502.65} 502.65"
                    stroke-dashoffset="125.66" transform="rotate(-90 100 100)"/>
            <text x="100" y="100" text-anchor="middle" dy="0.3em" class="possession-text">
              ${homePossession}%
            </text>
          </svg>
        </div>
        
        <div class="possession-details">
          <div class="possession-breakdown">
            <div class="possession-item">
              <span class="team-name">${this.homeTeam.name}</span>
              <span class="possession-value">${homePossession}%</span>
              <div class="possession-bar">
                <div class="possession-fill home-fill" style="width: ${homePossession}%"></div>
              </div>
            </div>
            <div class="possession-item">
              <span class="team-name">${this.awayTeam.name}</span>
              <span class="possession-value">${awayPossession}%</span>
              <div class="possession-bar">
                <div class="possession-fill away-fill" style="width: ${awayPossession}%"></div>
              </div>
            </div>
          </div>
          
          <div class="possession-analysis">
            <p class="analysis-text">
              ${this.getPossessionAnalysis(homePossession, awayPossession)}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  renderShotsChart() {
    const homeShots = this.statistics.shots?.home || 0;
    const awayShots = this.statistics.shots?.away || 0;
    const homeShotsOnTarget = this.statistics.shotsOnTarget?.home || 0;
    const awayShotsOnTarget = this.statistics.shotsOnTarget?.away || 0;
    
    return `
      <div class="shots-chart">
        <div class="shots-comparison">
          <div class="team-shots home-shots">
            <h5>${this.homeTeam.name}</h5>
            <div class="shots-visual">
              <div class="shots-total">
                <span class="shots-number">${homeShots}</span>
                <span class="shots-label">Tiri Totali</span>
              </div>
              <div class="shots-on-target">
                <span class="shots-number">${homeShotsOnTarget}</span>
                <span class="shots-label">In Porta</span>
              </div>
              <div class="accuracy">
                <span class="accuracy-value">${homeShots > 0 ? Math.round((homeShotsOnTarget / homeShots) * 100) : 0}%</span>
                <span class="accuracy-label">Precisione</span>
              </div>
            </div>
          </div>
          
          <div class="shots-divider">
            <div class="vs-text">VS</div>
          </div>
          
          <div class="team-shots away-shots">
            <h5>${this.awayTeam.name}</h5>
            <div class="shots-visual">
              <div class="shots-total">
                <span class="shots-number">${awayShots}</span>
                <span class="shots-label">Tiri Totali</span>
              </div>
              <div class="shots-on-target">
                <span class="shots-number">${awayShotsOnTarget}</span>
                <span class="shots-label">In Porta</span>
              </div>
              <div class="accuracy">
                <span class="accuracy-value">${awayShots > 0 ? Math.round((awayShotsOnTarget / awayShots) * 100) : 0}%</span>
                <span class="accuracy-label">Precisione</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="shots-analysis">
          <p>${this.getShotsAnalysis(homeShots, awayShots, homeShotsOnTarget, awayShotsOnTarget)}</p>
        </div>
      </div>
    `;
  }

  renderPassingChart() {
    const homePasses = this.statistics.passes?.home || 0;
    const awayPasses = this.statistics.passes?.away || 0;
    const homeAccuracy = this.statistics.passAccuracy?.home || 0;
    const awayAccuracy = this.statistics.passAccuracy?.away || 0;
    
    return `
      <div class="passing-chart">
        <div class="passing-stats">
          <div class="team-passing">
            <h5>${this.homeTeam.name}</h5>
            <div class="passing-circle">
              <svg viewBox="0 0 120 120" class="accuracy-circle">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" stroke-width="8"
                        stroke-dasharray="${(homeAccuracy / 100) * 314.16} 314.16"
                        stroke-dashoffset="78.54" transform="rotate(-90 60 60)"/>
                <text x="60" y="60" text-anchor="middle" dy="0.3em" class="accuracy-text">
                  ${homeAccuracy}%
                </text>
              </svg>
            </div>
            <div class="passing-details">
              <span class="passes-count">${homePasses} passaggi</span>
            </div>
          </div>
          
          <div class="team-passing">
            <h5>${this.awayTeam.name}</h5>
            <div class="passing-circle">
              <svg viewBox="0 0 120 120" class="accuracy-circle">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" stroke-width="8"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--secondary)" stroke-width="8"
                        stroke-dasharray="${(awayAccuracy / 100) * 314.16} 314.16"
                        stroke-dashoffset="78.54" transform="rotate(-90 60 60)"/>
                <text x="60" y="60" text-anchor="middle" dy="0.3em" class="accuracy-text">
                  ${awayAccuracy}%
                </text>
              </svg>
            </div>
            <div class="passing-details">
              <span class="passes-count">${awayPasses} passaggi</span>
            </div>
          </div>
        </div>
        
        <div class="passing-comparison">
          <div class="comparison-item">
            <span class="comparison-label">Passaggi Totali</span>
            <div class="comparison-bar">
              <div class="bar-segment home-segment" style="width: ${(homePasses / (homePasses + awayPasses)) * 100}%">
                ${homePasses}
              </div>
              <div class="bar-segment away-segment" style="width: ${(awayPasses / (homePasses + awayPasses)) * 100}%">
                ${awayPasses}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getPossessionAnalysis(home, away) {
    const diff = Math.abs(home - away);
    
    if (diff < 5) {
      return "Possesso palla equilibrato tra le due squadre.";
    } else if (home > away) {
      return `${this.homeTeam.name} ha dominato il possesso palla con ${diff} punti percentuali di vantaggio.`;
    } else {
      return `${this.awayTeam.name} ha controllato maggiormente il gioco con ${diff}% di possesso in più.`;
    }
  }

  getShotsAnalysis(homeShots, awayShots, homeOnTarget, awayOnTarget) {
    const homeAccuracy = homeShots > 0 ? (homeOnTarget / homeShots) * 100 : 0;
    const awayAccuracy = awayShots > 0 ? (awayOnTarget / awayShots) * 100 : 0;
    
    if (homeShots > awayShots) {
      return `${this.homeTeam.name} ha creato più occasioni da gol (${homeShots} vs ${awayShots}) con una precisione del ${Math.round(homeAccuracy)}%.`;
    } else if (awayShots > homeShots) {
      return `${this.awayTeam.name} ha avuto più tentativi verso la porta (${awayShots} vs ${homeShots}) con ${Math.round(awayAccuracy)}% di precisione.`;
    } else {
      return `Entrambe le squadre hanno avuto lo stesso numero di tiri (${homeShots}).`;
    }
  }

  bindEvents() {
    const chartTypeSelect = this.container.querySelector('.chart-type-select');
    
    chartTypeSelect?.addEventListener('change', (e) => {
      this.chartType = e.target.value;
      this.render();
    });
  }

  updateStatistics(statistics) {
    this.statistics = statistics;
    this.render();
  }

  setTeams(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.render();
  }
}