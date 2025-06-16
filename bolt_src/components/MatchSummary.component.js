/**
 * MatchSummary Component
 * Used in: MatchAnalysis.page.js
 * Expected data: { match, result, statistics, highlights }
 */

export default class MatchSummary {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.match = props.match || {};
    this.result = props.result || {};
    this.statistics = props.statistics || {};
    this.highlights = props.highlights || [];
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="match-summary">
        <div class="match-header">
          <div class="match-info">
            <div class="competition-info">
              <span class="competition">${this.match.competition || 'Serie A'}</span>
              <span class="matchday">Giornata ${this.match.matchday || 1}</span>
            </div>
            <div class="match-date">
              ${this.formatDate(this.match.date)}
            </div>
          </div>
          
          <div class="venue-info">
            <span class="stadium">${this.match.stadium || 'Stadio San Siro'}</span>
            <span class="attendance">Spettatori: ${this.formatNumber(this.match.attendance || 75000)}</span>
          </div>
        </div>

        <div class="match-result">
          <div class="team home-team">
            <img src="${this.match.homeTeam?.logo}" alt="${this.match.homeTeam?.name}" class="team-logo">
            <div class="team-info">
              <h3 class="team-name">${this.match.homeTeam?.name || 'AC Milan'}</h3>
              <span class="team-form">Forma: ${this.match.homeTeam?.form || 'VVVPV'}</span>
            </div>
          </div>
          
          <div class="score-container">
            <div class="final-score">
              <span class="home-score ${this.getScoreClass('home')}">${this.result.homeScore || 0}</span>
              <span class="score-separator">-</span>
              <span class="away-score ${this.getScoreClass('away')}">${this.result.awayScore || 0}</span>
            </div>
            <div class="match-status">
              <span class="status-badge ${this.match.status}">${this.getStatusText()}</span>
            </div>
          </div>
          
          <div class="team away-team">
            <div class="team-info">
              <h3 class="team-name">${this.match.awayTeam?.name || 'Inter'}</h3>
              <span class="team-form">Forma: ${this.match.awayTeam?.form || 'VVPVV'}</span>
            </div>
            <img src="${this.match.awayTeam?.logo}" alt="${this.match.awayTeam?.name}" class="team-logo">
          </div>
        </div>

        <div class="match-details">
          <div class="match-stats-summary">
            <h4>Statistiche Principali</h4>
            <div class="stats-grid">
              ${this.renderMainStats()}
            </div>
          </div>
          
          <div class="match-highlights-summary">
            <h4>Momenti Salienti</h4>
            <div class="highlights-list">
              ${this.renderHighlights()}
            </div>
          </div>
        </div>

        <div class="match-context">
          <div class="weather-conditions">
            <h5>Condizioni</h5>
            <div class="conditions-info">
              <span class="weather">${this.getWeatherIcon()} ${this.match.weather?.condition || 'Sereno'}</span>
              <span class="temperature">${this.match.weather?.temperature || 18}°C</span>
            </div>
          </div>
          
          <div class="officials">
            <h5>Arbitraggio</h5>
            <div class="officials-info">
              <span class="referee">Arbitro: ${this.match.referee || 'Marco Rossi'}</span>
            </div>
          </div>
        </div>

        <div class="match-actions">
          <button class="button button-secondary share-btn">🔗 Condividi</button>
          <button class="button button-secondary export-btn">📊 Esporta Report</button>
          <button class="button button-primary detailed-analysis-btn">📈 Analisi Dettagliata</button>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderMainStats() {
    const stats = [
      { label: 'Possesso Palla', home: this.statistics.possession?.home || 50, away: this.statistics.possession?.away || 50, unit: '%' },
      { label: 'Tiri Totali', home: this.statistics.shots?.home || 0, away: this.statistics.shots?.away || 0 },
      { label: 'Tiri in Porta', home: this.statistics.shotsOnTarget?.home || 0, away: this.statistics.shotsOnTarget?.away || 0 },
      { label: 'Corner', home: this.statistics.corners?.home || 0, away: this.statistics.corners?.away || 0 }
    ];
    
    return stats.map(stat => `
      <div class="stat-row">
        <span class="stat-home">${stat.home}${stat.unit || ''}</span>
        <span class="stat-label">${stat.label}</span>
        <span class="stat-away">${stat.away}${stat.unit || ''}</span>
      </div>
    `).join('');
  }

  renderHighlights() {
    if (this.highlights.length === 0) {
      return '<p class="no-highlights">Nessun momento saliente registrato</p>';
    }
    
    return this.highlights.slice(0, 5).map(highlight => `
      <div class="highlight-item">
        <span class="highlight-time">${highlight.time}'</span>
        <span class="highlight-icon">${this.getHighlightIcon(highlight.type)}</span>
        <span class="highlight-description">${highlight.description}</span>
        <span class="highlight-player">${highlight.player || ''}</span>
      </div>
    `).join('');
  }

  getScoreClass(team) {
    const homeScore = this.result.homeScore || 0;
    const awayScore = this.result.awayScore || 0;
    
    if (homeScore === awayScore) return 'draw';
    
    if (team === 'home') {
      return homeScore > awayScore ? 'win' : 'loss';
    } else {
      return awayScore > homeScore ? 'win' : 'loss';
    }
  }

  getStatusText() {
    const statusMap = {
      'finished': 'Finita',
      'live': 'In Corso',
      'scheduled': 'Programmata',
      'postponed': 'Rinviata',
      'cancelled': 'Annullata'
    };
    
    return statusMap[this.match.status] || 'Sconosciuto';
  }

  getHighlightIcon(type) {
    const icons = {
      'goal': '⚽',
      'card': '🟨',
      'red_card': '🟥',
      'substitution': '🔄',
      'penalty': '⚽',
      'own_goal': '⚽',
      'key-play': '🎯'
    };
    
    return icons[type] || '📝';
  }

  getWeatherIcon() {
    const condition = this.match.weather?.condition?.toLowerCase() || 'sunny';
    const icons = {
      'sunny': '☀️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'windy': '💨'
    };
    
    return icons[condition] || '☀️';
  }

  formatDate(dateString) {
    if (!dateString) return 'Data non disponibile';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatNumber(num) {
    return new Intl.NumberFormat('it-IT').format(num);
  }

  bindEvents() {
    const shareBtn = this.container.querySelector('.share-btn');
    const exportBtn = this.container.querySelector('.export-btn');
    const detailedAnalysisBtn = this.container.querySelector('.detailed-analysis-btn');
    
    shareBtn?.addEventListener('click', () => this.shareMatch());
    exportBtn?.addEventListener('click', () => this.exportReport());
    detailedAnalysisBtn?.addEventListener('click', () => this.showDetailedAnalysis());
  }

  shareMatch() {
    const shareData = {
      title: `${this.match.homeTeam?.name} vs ${this.match.awayTeam?.name}`,
      text: `Risultato finale: ${this.result.homeScore}-${this.result.awayScore}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.text}`);
      this.showToast('Link copiato negli appunti', 'success');
    }
  }

  exportReport() {
    const reportData = {
      match: this.match,
      result: this.result,
      statistics: this.statistics,
      highlights: this.highlights,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `match-report-${this.match.homeTeam?.name}-vs-${this.match.awayTeam?.name}.json`;
    link.click();
    
    this.showToast('Report esportato con successo', 'success');
  }

  showDetailedAnalysis() {
    // Trigger event for parent component to show detailed analysis
    const event = new CustomEvent('showDetailedAnalysis', {
      detail: {
        match: this.match,
        result: this.result,
        statistics: this.statistics
      }
    });
    
    this.container.dispatchEvent(event);
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  updateMatch(matchData) {
    this.match = matchData.match || this.match;
    this.result = matchData.result || this.result;
    this.statistics = matchData.statistics || this.statistics;
    this.highlights = matchData.highlights || this.highlights;
    this.render();
  }
}