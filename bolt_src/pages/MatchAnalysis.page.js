import MatchSummary from '../components/MatchSummary.component.js';
import StatisticsChart from '../components/StatisticsChart.component.js';
import KeyMoments from '../components/KeyMoments.component.js';
import PlayerRatings from '../components/PlayerRatings.component.js';

export default class MatchAnalysisPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.matchData = null;
    this.analysisData = null;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="match-analysis-page">
        <div class="page-header">
          <h2 class="page-title">Analisi Partita</h2>
          <div class="page-actions">
            <button class="button button-secondary export-btn">📊 Esporta Report</button>
            <button class="button button-secondary share-btn">🔗 Condividi</button>
            <button class="button button-primary back-to-calendar-btn">📅 Torna al Calendario</button>
          </div>
        </div>

        <!-- Match Summary Section -->
        <div class="match-summary-section">
          <div id="matchSummary" class="match-summary-container"></div>
        </div>

        <!-- Statistics Analysis Section -->
        <div class="statistics-section">
          <h3 class="section-title">Analisi Statistiche</h3>
          <div id="statisticsChart" class="statistics-chart-container"></div>
        </div>

        <!-- Key Moments Section -->
        <div class="key-moments-section">
          <div id="keyMoments" class="key-moments-container"></div>
        </div>

        <!-- Player Ratings Section -->
        <div class="player-ratings-section">
          <h3 class="section-title">Valutazioni Giocatori</h3>
          <div id="playerRatings" class="player-ratings-container"></div>
        </div>

        <!-- Tactical Analysis Section -->
        <div class="tactical-analysis-section">
          <h3 class="section-title">Analisi Tattica</h3>
          <div id="tacticalAnalysis" class="tactical-analysis-container"></div>
        </div>

        <!-- Post-Match Actions Section -->
        <div class="post-match-actions">
          <h3 class="section-title">Azioni Post-Partita</h3>
          <div class="actions-grid">
            <button class="action-btn">📝 Commenti Stampa</button>
            <button class="action-btn">🎯 Analizza Prestazioni</button>
            <button class="action-btn">📈 Aggiorna Morale</button>
            <button class="action-btn">🏥 Controlla Infortuni</button>
          </div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.loadMatchData();
    this.renderMatchSummary();
    this.renderStatisticsChart();
    this.renderKeyMoments();
    this.renderPlayerRatings();
    this.renderTacticalAnalysis();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  loadMatchData() {
    // Mock match data - in a real app this would come from the previous simulation
    this.matchData = {
      match: {
        id: 1,
        competition: 'Serie A',
        matchday: 15,
        date: new Date().toISOString(),
        stadium: 'Stadio San Siro',
        attendance: 75000,
        homeTeam: {
          id: 1,
          name: 'AC Milan',
          logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
          form: 'VVVPV'
        },
        awayTeam: {
          id: 2,
          name: 'Inter',
          logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
          form: 'VVPVV'
        },
        status: 'finished',
        weather: {
          condition: 'sunny',
          temperature: 18
        },
        referee: 'Marco Rossi'
      },
      result: {
        homeScore: 2,
        awayScore: 1
      },
      statistics: {
        possession: { home: 58, away: 42 },
        shots: { home: 12, away: 8 },
        shotsOnTarget: { home: 6, away: 4 },
        corners: { home: 5, away: 3 },
        fouls: { home: 8, away: 12 },
        yellowCards: { home: 2, away: 3 },
        redCards: { home: 0, away: 0 },
        offsides: { home: 2, away: 1 },
        passes: { home: 342, away: 298 },
        passAccuracy: { home: 87, away: 82 }
      },
      highlights: [
        {
          id: 1,
          time: 23,
          type: 'goal',
          team: 'home',
          player: 'Mario Rossi',
          description: 'Gol di testa su cross dalla destra',
          importance: 9
        },
        {
          id: 2,
          time: 38,
          type: 'goal',
          team: 'away',
          player: 'Giuseppe Verdi',
          description: 'Gol su calcio di punizione',
          importance: 9
        },
        {
          id: 3,
          time: 52,
          type: 'key-play',
          team: 'home',
          player: 'Luigi Bianchi',
          description: 'Occasione sprecata a tu per tu con il portiere',
          importance: 7
        },
        {
          id: 4,
          time: 67,
          type: 'goal',
          team: 'home',
          player: 'Luigi Bianchi',
          description: 'Gol su assist di Rossi',
          importance: 9
        },
        {
          id: 5,
          time: 75,
          type: 'substitution',
          team: 'home',
          player: 'Franco Blu',
          description: 'Sostituzione tattica per consolidare il vantaggio',
          importance: 5
        }
      ]
    };
  }

  renderMatchSummary() {
    const container = document.getElementById('matchSummary');
    
    new MatchSummary(container, {
      match: this.matchData.match,
      result: this.matchData.result,
      statistics: this.matchData.statistics,
      highlights: this.matchData.highlights
    });
  }

  renderStatisticsChart() {
    const container = document.getElementById('statisticsChart');
    
    new StatisticsChart(container, {
      homeTeam: this.matchData.match.homeTeam,
      awayTeam: this.matchData.match.awayTeam,
      statistics: this.matchData.statistics,
      chartType: 'comparison'
    });
  }

  renderKeyMoments() {
    const container = document.getElementById('keyMoments');
    
    new KeyMoments(container, {
      moments: this.matchData.highlights,
      match: this.matchData.match,
      autoPlay: false
    });
  }

  renderPlayerRatings() {
    const container = document.getElementById('playerRatings');
    
    const playerRatings = this.generatePlayerRatings();
    
    new PlayerRatings(container, {
      ratings: playerRatings,
      sortBy: 'rating',
      sortOrder: 'desc',
      showStats: true,
      onPlayerClick: (player) => this.handlePlayerClick(player)
    });
  }

  renderTacticalAnalysis() {
    const container = document.getElementById('tacticalAnalysis');
    
    container.innerHTML = `
      <div class="tactical-analysis-grid">
        <div class="formation-analysis">
          <h5>Analisi Formazioni</h5>
          <div class="formation-comparison">
            <div class="formation-item">
              <h6>${this.matchData.match.homeTeam.name}</h6>
              <span class="formation">4-4-2</span>
              <div class="effectiveness-bar">
                <div class="effectiveness-fill" style="width: 78%"></div>
              </div>
              <span class="effectiveness-value">78% efficacia</span>
            </div>
            <div class="formation-item">
              <h6>${this.matchData.match.awayTeam.name}</h6>
              <span class="formation">4-3-3</span>
              <div class="effectiveness-bar">
                <div class="effectiveness-fill" style="width: 72%"></div>
              </div>
              <span class="effectiveness-value">72% efficacia</span>
            </div>
          </div>
        </div>
        
        <div class="tactical-insights">
          <h5>Insights Tattici</h5>
          <div class="insights-list">
            <div class="insight-item">
              <span class="insight-icon">✅</span>
              <span class="insight-text">Controllo del centrocampo efficace</span>
            </div>
            <div class="insight-item">
              <span class="insight-icon">⚠️</span>
              <span class="insight-text">Vulnerabilità sulle fasce</span>
            </div>
            <div class="insight-item">
              <span class="insight-icon">📈</span>
              <span class="insight-text">Transizioni veloci decisive</span>
            </div>
          </div>
        </div>
        
        <div class="heat-map">
          <h5>Mappa di Calore</h5>
          <div class="heat-map-placeholder">
            <p>Visualizzazione mappa di calore - Implementazione futura</p>
          </div>
        </div>
      </div>
    `;
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Analisi avanzate per il calcio moderno</span>
      </div>
    `;
  }

  bindEvents() {
    // Action buttons
    const exportBtn = this.container.querySelector('.export-btn');
    const shareBtn = this.container.querySelector('.share-btn');
    const backBtn = this.container.querySelector('.back-to-calendar-btn');
    
    exportBtn?.addEventListener('click', () => this.exportReport());
    shareBtn?.addEventListener('click', () => this.shareAnalysis());
    backBtn?.addEventListener('click', () => this.goBackToCalendar());

    // Post-match action buttons
    const actionBtns = this.container.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.textContent.trim();
        this.handlePostMatchAction(action);
      });
    });

    // Listen for detailed analysis requests
    this.container.addEventListener('showDetailedAnalysis', (e) => {
      this.showDetailedAnalysis(e.detail);
    });
  }

  generatePlayerRatings() {
    const players = [
      {
        id: 1,
        name: 'Mario Rossi',
        position: 'FW',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        rating: 8.5,
        breakdown: { attack: 9.0, defense: 7.0, passing: 8.5 },
        minutes: 90,
        goals: 1,
        assists: 1,
        passes: 35,
        captain: true,
        motm: true
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        position: 'MF',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        rating: 7.8,
        breakdown: { attack: 8.0, defense: 7.5, passing: 8.2 },
        minutes: 90,
        goals: 1,
        assists: 0,
        passes: 45
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        position: 'DF',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        rating: 7.2,
        breakdown: { attack: 6.0, defense: 8.5, passing: 7.0 },
        minutes: 90,
        goals: 0,
        assists: 0,
        passes: 52,
        cards: { yellow: 1 }
      },
      {
        id: 4,
        name: 'Antonio Neri',
        position: 'GK',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        rating: 7.5,
        breakdown: { attack: 5.0, defense: 9.0, passing: 6.5 },
        minutes: 90,
        goals: 0,
        assists: 0,
        passes: 28
      }
    ];
    
    return players;
  }

  handlePlayerClick(player) {
    console.log('Player clicked:', player);
    this.showToast(`Visualizzazione dettagli di ${player.name}`, 'info');
  }

  exportReport() {
    const reportData = {
      match: this.matchData.match,
      result: this.matchData.result,
      statistics: this.matchData.statistics,
      highlights: this.matchData.highlights,
      playerRatings: this.generatePlayerRatings(),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `match-analysis-${this.matchData.match.homeTeam.name}-vs-${this.matchData.match.awayTeam.name}.json`;
    link.click();
    
    this.showToast('Report esportato con successo', 'success');
  }

  shareAnalysis() {
    const shareText = `Analisi partita: ${this.matchData.match.homeTeam.name} ${this.matchData.result.homeScore}-${this.matchData.result.awayScore} ${this.matchData.match.awayTeam.name}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Analisi Partita',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      this.showToast('Analisi copiata negli appunti', 'success');
    }
  }

  goBackToCalendar() {
    window.location.hash = 'calendar';
  }

  handlePostMatchAction(action) {
    switch (action) {
      case '📝 Commenti Stampa':
        this.showToast('Apertura pannello commenti stampa', 'info');
        break;
      case '🎯 Analizza Prestazioni':
        this.showToast('Analisi prestazioni avviata', 'info');
        break;
      case '📈 Aggiorna Morale':
        this.showToast('Aggiornamento morale squadra', 'info');
        break;
      case '🏥 Controlla Infortuni':
        this.showToast('Controllo infortuni completato', 'info');
        break;
    }
  }

  showDetailedAnalysis(data) {
    this.showToast('Apertura analisi dettagliata', 'info');
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