<div class="match-analysis-page">
  <div class="page-header">
    <h2 class="page-title">Analisi Partita</h2>
    <div class="page-actions">
      <button class="button button-ghost share-btn">
        🔗 Condividi
      </button>
      <button class="button button-secondary back-btn">
        ← Indietro
      </button>
    </div>
  </div>

  <!-- Match Summary Section -->
  <div class="match-summary-section">
    <div id="matchSummaryContainer"></div>
  </div>

  <!-- Stats Comparison Section -->
  <div class="stats-comparison-section">
    <h3 class="section-title">Statistiche Partita</h3>
    <div id="statsComparisonContainer"></div>
  </div>

  <!-- Player Ratings Section -->
  <div class="player-ratings-section">
    <div class="section-header">
      <h3 class="section-title">Valutazioni Giocatori</h3>
      <div class="section-controls">
        <select class="team-selector" aria-label="Seleziona squadra">
          <option value="home">AC Milan</option>
          <option value="away">Inter</option>
        </select>
      </div>
    </div>
    
    <div class="player-ratings-grid" id="playerRatingsContainer">
      <!-- Player rating cards will be rendered here -->
    </div>
  </div>

  <!-- Key Moments Section -->
  <div class="key-moments-section">
    <h3 class="section-title">Momenti Chiave</h3>
    <div id="keyMomentsContainer"></div>
  </div>

  <!-- Tactical Analysis Section -->
  <div class="tactical-analysis-section">
    <h3 class="section-title">Analisi Tattica</h3>
    <div id="tacticalAnalysisContainer"></div>
  </div>

  <!-- Export Report Section -->
  <div class="export-report-section">
    <div id="exportReportContainer"></div>
  </div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<style>
.match-analysis-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.page-actions {
  display: flex;
  gap: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.section-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.team-selector {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
}

.player-ratings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.sponsor-banner-container {
  margin-top: 24px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .player-ratings-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .page-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .player-ratings-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
class MatchAnalysisPage {
  constructor() {
    this.matchData = null;
    this.matchReport = null;
    this.selectedTeam = 'home';
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadData();
    this.renderComponents();
  }

  bindEvents() {
    document.querySelector('.share-btn')?.addEventListener('click', () => this.shareReport());
    document.querySelector('.back-btn')?.addEventListener('click', () => this.goBack());
    document.querySelector('.team-selector')?.addEventListener('change', (e) => {
      this.selectedTeam = e.target.value;
      this.renderPlayerRatings();
    });
  }

  async loadData() {
    try {
      // In a real app, these would fetch from the game state or API
      this.matchData = await this.fetchMatchData();
      this.matchReport = await this.fetchMatchReport();
    } catch (error) {
      console.error('Error loading match data:', error);
      alert('Errore nel caricamento dei dati della partita');
    }
  }

  async fetchMatchData() {
    // Mock data - in a real app this would come from game state
    return {
      id: 1,
      competition: 'Serie A',
      matchday: 15,
      date: '2025-01-15T15:00:00Z',
      stadium: 'Stadio San Siro',
      attendance: 75000,
      homeTeam: {
        id: 1,
        name: 'AC Milan',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        position: 1,
        form: 'VVVPV'
      },
      awayTeam: {
        id: 2,
        name: 'Inter',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        position: 2,
        form: 'VVPVV'
      },
      homeScore: 2,
      awayScore: 1,
      status: 'finished',
      stats: {
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
      }
    };
  }

  async fetchMatchReport() {
    // Mock data - in a real app this would come from Match_GenerateReport flow
    return {
      matchId: 1,
      summary: {
        result: 'win',
        scoreline: '2-1',
        dominantTeam: 'AC Milan',
        keyStatistic: 'Possesso palla: 58% vs 42%'
      },
      playerRatings: {
        home: [
          {
            player: {
              id: 1,
              name: 'Mario Rossi',
              position: 'FW',
              photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
            },
            performance: {
              overall_rating: 8.5,
              breakdown: {
                attack: 9.0,
                defense: 7.0,
                passing: 8.5,
                physical: 8.0
              },
              statistics: {
                goals: 1,
                assists: 1,
                shots: 4,
                passes: 35,
                tackles: 2
              },
              highlights: [
                { time: 23, type: 'goal', description: 'Gol di testa su cross dalla destra' },
                { time: 67, type: 'assist', description: 'Assist per il gol di Bianchi' }
              ]
            }
          },
          {
            player: {
              id: 2,
              name: 'Luigi Bianchi',
              position: 'MF',
              photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
            },
            performance: {
              overall_rating: 7.8,
              breakdown: {
                attack: 8.0,
                defense: 7.5,
                passing: 8.2,
                physical: 7.0
              },
              statistics: {
                goals: 1,
                assists: 0,
                shots: 3,
                passes: 45,
                tackles: 5
              },
              highlights: [
                { time: 67, type: 'goal', description: 'Gol su assist di Rossi' }
              ]
            }
          }
        ],
        away: [
          {
            player: {
              id: 101,
              name: 'Giuseppe Verdi',
              position: 'FW',
              photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
            },
            performance: {
              overall_rating: 7.5,
              breakdown: {
                attack: 8.0,
                defense: 6.5,
                passing: 7.0,
                physical: 7.5
              },
              statistics: {
                goals: 1,
                assists: 0,
                shots: 3,
                passes: 25,
                tackles: 1
              },
              highlights: [
                { time: 38, type: 'goal', description: 'Gol su calcio di punizione' }
              ]
            }
          }
        ]
      },
      highlights: [
        { id: 1, time: 23, type: 'goal', team: 'home', player: 'Mario Rossi', description: 'Gol di testa su cross dalla destra', importance: 9 },
        { id: 2, time: 38, type: 'goal', team: 'away', player: 'Giuseppe Verdi', description: 'Gol su calcio di punizione', importance: 9 },
        { id: 3, time: 52, type: 'key-play', team: 'home', player: 'Luigi Bianchi', description: 'Occasione sprecata', importance: 7 },
        { id: 4, time: 67, type: 'goal', team: 'home', player: 'Luigi Bianchi', description: 'Gol su assist di Rossi', importance: 9 },
        { id: 5, time: 75, type: 'substitution', team: 'home', player: 'Franco Blu', description: 'Sostituzione tattica', importance: 5 }
      ],
      tactics: {
        home: {
          formation: '4-4-2',
          effectiveness: 78,
          strengths: ['Controllo del centrocampo', 'Solidità difensiva', 'Transizioni veloci'],
          weaknesses: ['Vulnerabilità sulle fasce', 'Isolamento degli attaccanti']
        },
        away: {
          formation: '4-3-3',
          effectiveness: 72,
          strengths: ['Ampiezza offensiva', 'Pressing alto', 'Creatività'],
          weaknesses: ['Vulnerabilità ai contropiedi', 'Centrocampo numericamente inferiore']
        },
        matchup: 'Favorevole'
      }
    };
  }

  renderComponents() {
    this.renderMatchSummary();
    this.renderStatsComparison();
    this.renderPlayerRatings();
    this.renderKeyMoments();
    this.renderTacticalAnalysis();
    this.renderExportReport();
    this.renderSponsorBanner();
  }

  renderMatchSummary() {
    const container = document.getElementById('matchSummaryContainer');
    const el = document.createElement('div');
    el.className = 'match-summary-card';
    container.appendChild(el);

    if (typeof MatchSummaryCard !== "undefined") {
      new MatchSummaryCard(el, {
        ...this.matchData,
        highlights: this.matchReport.highlights.slice(0, 3)
      });
    }
  }

  renderStatsComparison() {
    const container = document.getElementById('statsComparisonContainer');
    const el = document.createElement('div');
    el.className = 'stats-comparison-chart';
    container.appendChild(el);

    if (typeof StatsComparisonChart !== "undefined") {
      new StatsComparisonChart(el, this.matchData);
    }
  }

  renderPlayerRatings() {
    const container = document.getElementById('playerRatingsContainer');
    container.innerHTML = '';
    
    const teamRatings = this.matchReport.playerRatings[this.selectedTeam] || [];
    
    teamRatings.forEach(playerData => {
      const el = document.createElement('div');
      el.className = 'player-rating-card';
      container.appendChild(el);

      if (typeof PlayerRatingCard !== "undefined") {
        new PlayerRatingCard(el, playerData);
      }
    });
    
    if (teamRatings.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Nessuna valutazione disponibile per questa squadra</p></div>';
    }
  }

  renderKeyMoments() {
    const container = document.getElementById('keyMomentsContainer');
    const el = document.createElement('div');
    el.className = 'key-moments-timeline';
    container.appendChild(el);

    if (typeof KeyMomentsTimeline !== "undefined") {
      const timeline = new KeyMomentsTimeline(el, {
        autoPlay: false,
        showProgress: true
      });
      
      // Add highlights to timeline
      if (timeline.setMoments) {
        timeline.setMoments(this.matchReport.highlights);
      }
    }
  }

  renderTacticalAnalysis() {
    const container = document.getElementById('tacticalAnalysisContainer');
    const el = document.createElement('div');
    el.className = 'tactical-analysis-panel';
    container.appendChild(el);

    if (typeof TacticalAnalysisPanel !== "undefined") {
      new TacticalAnalysisPanel(el, {
        ...this.matchData,
        formations: this.matchReport.tactics
      });
    }
  }

  renderExportReport() {
    const container = document.getElementById('exportReportContainer');
    const el = document.createElement('div');
    el.className = 'export-report-button';
    container.appendChild(el);

    if (typeof ExportReportButton !== "undefined") {
      new ExportReportButton(el, {
        reportData: {
          match: this.matchData,
          report: this.matchReport
        },
        defaultFormat: 'pdf',
        showProgress: true
      });
    }
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    const sponsorData = {
      id: 3,
      name: 'Football Legends',
      description: 'Il nuovo videogioco di calcio che sta conquistando il mondo',
      logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      cta: 'Preordina',
      url: 'https://example.com/sponsor3',
      theme: 'special'
    };

    if (typeof SponsorBanner !== "undefined") {
      new SponsorBanner(el, { sponsorData, autoClose: true, duration: 10000 });
    }
  }

  shareReport() {
    // In a real app, this would generate a shareable link or export
    alert('Funzione di condivisione report');
  }

  goBack() {
    window.location.href = '#calendar';
  }

  // Simulate Match_GenerateReport flow
  async generateReport() {
    try {
      // In a real app, this would call the Match_GenerateReport flow
      console.log('Calling Match_GenerateReport flow...');
      
      // Return mock report data
      return this.matchReport;
    } catch (error) {
      console.error('Error generating match report:', error);
      return null;
    }
  }

  // Simulate Report_CompileHistory flow
  async compileHistory() {
    try {
      // In a real app, this would call the Report_CompileHistory flow
      console.log('Calling Report_CompileHistory flow...');
      
      // Mock history compilation
      return { success: true };
    } catch (error) {
      console.error('Error compiling history:', error);
      return { success: false, error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MatchAnalysisPage();
});
</script>