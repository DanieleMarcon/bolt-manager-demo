<div class="match-simulation-page">
  <div class="page-header">
    <h2 class="page-title">Simulazione Partita</h2>
    <div class="page-actions">
      <button class="button button-ghost settings-btn">
        ⚙️ Impostazioni
      </button>
      <button class="button button-secondary exit-btn">
        🚪 Esci
      </button>
    </div>
  </div>

  <!-- Match Header Section -->
  <div class="match-header-section">
    <div id="matchHeaderContainer"></div>
  </div>

  <!-- Main Match Content -->
  <div class="match-content">
    <div class="match-main-panel">
      <!-- Live Scoreboard -->
      <div class="live-scoreboard-container">
        <div id="liveScoreboardContainer"></div>
      </div>
      
      <!-- Match Events Timeline -->
      <div class="match-events-container">
        <div id="matchEventsContainer"></div>
      </div>
      
      <!-- Match Controls -->
      <div class="match-controls">
        <div id="matchSpeedContainer"></div>
      </div>
    </div>
    
    <div class="match-side-panel">
      <!-- Live Stats Panel -->
      <div class="live-stats-container">
        <div id="liveStatsContainer"></div>
      </div>
      
      <!-- Substitution Panel -->
      <div class="substitution-container">
        <div id="substitutionContainer"></div>
      </div>
    </div>
  </div>

  <!-- Match Overlay for Goals and Key Events -->
  <div id="matchOverlayContainer" class="match-overlay" style="display: none;"></div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<style>
.match-simulation-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.match-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.match-main-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.match-side-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.match-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.sponsor-banner-container {
  margin-top: 24px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .match-content {
    grid-template-columns: 1fr;
  }
  
  .match-side-panel {
    order: -1;
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
}
</style>

<script>
class MatchSimulationPage {
  constructor() {
    this.matchData = null;
    this.isPlaying = false;
    this.currentSpeed = 'normal';
    this.currentTime = 0;
    this.matchInterval = null;
    this.events = [];
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadMatchData();
    this.renderComponents();
    
    // Auto-start match if specified in URL params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === 'true') {
      this.startMatch();
    }
  }

  bindEvents() {
    document.querySelector('.settings-btn')?.addEventListener('click', () => this.showSettings());
    document.querySelector('.exit-btn')?.addEventListener('click', () => this.exitMatch());
    
    // Listen for events from components
    document.addEventListener('speedChange', (e) => this.handleSpeedChange(e.detail.speed));
    document.addEventListener('substitutionMade', (e) => this.handleSubstitution(e.detail));
    document.addEventListener('matchEvent', (e) => this.handleMatchEvent(e.detail));
  }

  async loadMatchData() {
    try {
      // In a real app, this would fetch from the game state or API
      this.matchData = await this.fetchMatchData();
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
      homeScore: 0,
      awayScore: 0,
      status: 'scheduled',
      minute: 0,
      addedTime: 0,
      weather: {
        condition: 'sunny',
        temperature: 18
      },
      referee: 'Marco Rossi',
      tvChannel: 'Sky Sport 1',
      stats: {
        possession: { home: 50, away: 50 },
        shots: { home: 0, away: 0 },
        shotsOnTarget: { home: 0, away: 0 },
        corners: { home: 0, away: 0 },
        fouls: { home: 0, away: 0 },
        yellowCards: { home: 0, away: 0 },
        redCards: { home: 0, away: 0 },
        offsides: { home: 0, away: 0 },
        passes: { home: 0, away: 0 },
        passAccuracy: { home: 0, away: 0 }
      }
    };
  }

  renderComponents() {
    this.renderMatchHeader();
    this.renderLiveScoreboard();
    this.renderMatchEvents();
    this.renderMatchSpeed();
    this.renderLiveStats();
    this.renderSubstitutionPanel();
    this.renderSponsorBanner();
  }

  renderMatchHeader() {
    const container = document.getElementById('matchHeaderContainer');
    const el = document.createElement('div');
    el.className = 'match-header';
    container.appendChild(el);

    if (typeof MatchHeader !== "undefined") {
      new MatchHeader(el, this.matchData);
    }
  }

  renderLiveScoreboard() {
    const container = document.getElementById('liveScoreboardContainer');
    const el = document.createElement('div');
    el.className = 'live-scoreboard';
    container.appendChild(el);

    if (typeof LiveScoreBoard !== "undefined") {
      new LiveScoreBoard(el, {
        autoUpdate: true,
        updateInterval: 30000
      });
    }
  }

  renderMatchEvents() {
    const container = document.getElementById('matchEventsContainer');
    const el = document.createElement('div');
    el.className = 'match-events-timeline';
    container.appendChild(el);

    if (typeof MatchEventsTimeline !== "undefined") {
      new MatchEventsTimeline(el, {
        autoUpdate: true,
        showFilters: true
      });
    }
  }

  renderMatchSpeed() {
    const container = document.getElementById('matchSpeedContainer');
    const el = document.createElement('div');
    el.className = 'match-speed-control';
    container.appendChild(el);

    if (typeof MatchSpeedControl !== "undefined") {
      new MatchSpeedControl(el, {
        defaultSpeed: 'slow',
        allowPause: true,
        showProgress: true
      });
    }
  }

  renderLiveStats() {
    const container = document.getElementById('liveStatsContainer');
    const el = document.createElement('div');
    el.className = 'live-stats-panel';
    container.appendChild(el);

    if (typeof LiveStatsPanel !== "undefined") {
      new LiveStatsPanel(el, {
        autoUpdate: true,
        updateInterval: 10000,
        showAnimations: true
      });
    }
  }

  renderSubstitutionPanel() {
    const container = document.getElementById('substitutionContainer');
    const el = document.createElement('div');
    el.className = 'substitution-panel';
    container.appendChild(el);

    if (typeof SubstitutionPanel !== "undefined") {
      new SubstitutionPanel(el, {
        maxSubstitutions: 5,
        showSuggestions: true,
        showFormationPreview: true
      });
    }
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    const sponsorData = {
      id: 1,
      name: 'SportTech Pro',
      description: 'Attrezzature sportive di alta qualità per professionisti e appassionati',
      logo: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      cta: 'Scopri di più',
      url: 'https://example.com/sponsor1',
      theme: 'premium'
    };

    if (typeof SponsorBanner !== "undefined") {
      new SponsorBanner(el, { sponsorData, autoClose: true, duration: 10000 });
    }
  }

  startMatch() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.currentTime = 0;
    
    // Update match status
    this.updateMatchStatus('live');
    
    // Start match interval
    this.startMatchInterval();
    
    // Dispatch match start event
    document.dispatchEvent(new CustomEvent('matchStart', {
      detail: { matchData: this.matchData }
    }));
  }

  pauseMatch() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    
    // Clear match interval
    this.clearMatchInterval();
    
    // Update match status
    this.updateMatchStatus('paused');
    
    // Dispatch match pause event
    document.dispatchEvent(new CustomEvent('matchPause', {
      detail: { matchData: this.matchData, currentTime: this.currentTime }
    }));
  }

  resumeMatch() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    
    // Start match interval
    this.startMatchInterval();
    
    // Update match status
    this.updateMatchStatus('live');
    
    // Dispatch match resume event
    document.dispatchEvent(new CustomEvent('matchResume', {
      detail: { matchData: this.matchData, currentTime: this.currentTime }
    }));
  }

  endMatch() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    
    // Clear match interval
    this.clearMatchInterval();
    
    // Update match status
    this.updateMatchStatus('finished');
    
    // Dispatch match end event
    document.dispatchEvent(new CustomEvent('matchEnd', {
      detail: { matchData: this.matchData }
    }));
  }

  startMatchInterval() {
    // Clear any existing interval
    this.clearMatchInterval();
    
    // Set interval based on speed
    const intervalTime = this.getIntervalTime();
    
    this.matchInterval = setInterval(() => {
      this.updateMatchTime();
    }, intervalTime);
  }

  clearMatchInterval() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
    }
  }

  getIntervalTime() {
    // Return interval time in milliseconds based on speed
    const speedMap = {
      slow: 1000, // 1 second = 1 minute of match time
      normal: 500, // 0.5 seconds = 1 minute of match time
      fast: 250, // 0.25 seconds = 1 minute of match time
      instant: 50 // 0.05 seconds = 1 minute of match time
    };
    
    return speedMap[this.currentSpeed] || speedMap.normal;
  }

  updateMatchTime() {
    this.currentTime++;
    
    // Check for half time
    if (this.currentTime === 45) {
      this.handleHalfTime();
      return;
    }
    
    // Check for full time
    if (this.currentTime === 90) {
      this.handleFullTime();
      return;
    }
    
    // Dispatch time update event
    document.dispatchEvent(new CustomEvent('matchTimeUpdate', {
      detail: { time: this.currentTime }
    }));
    
    // Generate random events
    this.generateRandomEvents();
  }

  handleHalfTime() {
    // Pause match
    this.pauseMatch();
    
    // Update match status
    this.updateMatchStatus('halftime');
    
    // Dispatch half time event
    document.dispatchEvent(new CustomEvent('matchHalfTime', {
      detail: { matchData: this.matchData }
    }));
    
    // Show half time overlay
    this.showOverlay('INTERVALLO', 'Fine primo tempo', '45\'');
  }

  handleFullTime() {
    // End match
    this.endMatch();
    
    // Dispatch full time event
    document.dispatchEvent(new CustomEvent('matchFullTime', {
      detail: { matchData: this.matchData }
    }));
    
    // Show full time overlay
    this.showOverlay('FINE PARTITA', 'Partita terminata', '90\'');
  }

  updateMatchStatus(status) {
    if (!this.matchData) return;
    
    this.matchData.status = status;
    
    // Dispatch status change event
    document.dispatchEvent(new CustomEvent('matchStatusChange', {
      detail: { status, matchData: this.matchData }
    }));
  }

  handleSpeedChange(speed) {
    this.currentSpeed = speed;
    
    if (this.isPlaying) {
      // Restart interval with new speed
      this.startMatchInterval();
    }
    
    // Dispatch speed change event
    document.dispatchEvent(new CustomEvent('matchSpeedChange', {
      detail: { speed, matchData: this.matchData }
    }));
  }

  handleSubstitution(substitution) {
    console.log('Substitution made:', substitution);
    
    // Dispatch substitution event
    document.dispatchEvent(new CustomEvent('matchEvent', {
      detail: {
        type: 'substitution',
        time: this.currentTime,
        team: 'home',
        playerOut: substitution.playerOut,
        playerIn: substitution.playerIn,
        reason: substitution.reason
      }
    }));
  }

  handleMatchEvent(event) {
    // Add event to events list
    this.events.push(event);
    
    // Update match data based on event
    this.updateMatchDataFromEvent(event);
    
    // Show overlay for important events
    if (event.type === 'goal') {
      this.showGoalOverlay(event);
    }
  }

  updateMatchDataFromEvent(event) {
    if (!this.matchData) return;
    
    // Update score for goals
    if (event.type === 'goal') {
      if (event.team === 'home') {
        this.matchData.homeScore++;
      } else {
        this.matchData.awayScore++;
      }
    }
    
    // Update stats
    if (event.type === 'shot') {
      if (event.team === 'home') {
        this.matchData.stats.shots.home++;
        if (event.onTarget) this.matchData.stats.shotsOnTarget.home++;
      } else {
        this.matchData.stats.shots.away++;
        if (event.onTarget) this.matchData.stats.shotsOnTarget.away++;
      }
    }
    
    // Update other stats as needed...
  }

  showGoalOverlay(goalEvent) {
    const overlay = document.getElementById('matchOverlayContainer');
    overlay.innerHTML = `
      <div class="overlay-content">
        <div class="overlay-icon">⚽</div>
        <h2 class="overlay-title">GOL!</h2>
        <div class="overlay-details">
          <div class="goal-scorer">${goalEvent.player}</div>
          <div class="goal-time">${goalEvent.time}'</div>
        </div>
      </div>
    `;
    
    overlay.style.display = 'flex';
    
    // Hide overlay after 3 seconds
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 3000);
  }

  showOverlay(title, details, time) {
    const overlay = document.getElementById('matchOverlayContainer');
    overlay.innerHTML = `
      <div class="overlay-content">
        <div class="overlay-icon">⚽</div>
        <h2 class="overlay-title">${title}</h2>
        <div class="overlay-details">
          <div class="goal-scorer">${details}</div>
          <div class="goal-time">${time}</div>
        </div>
      </div>
    `;
    
    overlay.style.display = 'flex';
    
    // Hide overlay after 3 seconds
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 3000);
  }

  generateRandomEvents() {
    // In a real app, this would be based on match simulation logic
    // For now, we'll just generate random events
    
    // Goal chance (1% per minute)
    if (Math.random() < 0.01) {
      const team = Math.random() < 0.5 ? 'home' : 'away';
      const player = team === 'home' ? 'Mario Rossi' : 'Luigi Bianchi';
      
      // Dispatch goal event
      document.dispatchEvent(new CustomEvent('matchEvent', {
        detail: {
          type: 'goal',
          time: this.currentTime,
          team,
          player
        }
      }));
    }
    
    // Card chance (0.5% per minute)
    if (Math.random() < 0.005) {
      const team = Math.random() < 0.5 ? 'home' : 'away';
      const player = team === 'home' ? 'Giuseppe Verdi' : 'Antonio Neri';
      const cardType = Math.random() < 0.2 ? 'red_card' : 'card';
      
      // Dispatch card event
      document.dispatchEvent(new CustomEvent('matchEvent', {
        detail: {
          type: cardType,
          time: this.currentTime,
          team,
          player
        }
      }));
    }
  }

  showSettings() {
    alert('Impostazioni partita');
  }

  exitMatch() {
    if (confirm('Sei sicuro di voler uscire dalla partita?')) {
      window.location.href = '#calendar';
    }
  }

  // Simulate Match_Simulate flow
  async simulateMatch() {
    try {
      // In a real app, this would call the Match_Simulate flow
      console.log('Calling Match_Simulate flow...');
      
      // Start the match
      this.startMatch();
      
      return { success: true };
    } catch (error) {
      console.error('Error simulating match:', error);
      return { success: false, error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new MatchSimulationPage();
  
  // Auto-start simulation after a short delay
  setTimeout(() => {
    page.simulateMatch();
  }, 1000);
});
</script>