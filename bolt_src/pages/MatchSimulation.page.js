import LineupSelector from '../components/LineupSelector.js';

export default class MatchSimulationPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.matchData = null;
    this.lineup = null;
    this.isSimulating = false;
    this.matchEvents = [];
    this.currentMinute = 0;
    this.simulationSpeed = 'normal';
    this.isPaused = false;
    this.userTeamId = window.currentSession?.user_team_id || null;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="match-simulation-page">
        <div class="page-header">
          <h2 class="page-title">Simulazione Partita</h2>
          <div class="page-actions">
            <button class="button button-secondary tactics-btn">⚙️ Tattiche</button>
            <button class="button button-primary start-match-btn" ${this.isSimulating ? 'disabled' : ''}>
              ▶️ Inizia Partita
            </button>
          </div>
        </div>

        <!-- Match Info Section -->
        <div class="match-info-section">
          <div id="matchInfo" class="match-info-card"></div>
        </div>

        <!-- Lineup Selection Section -->
        <div class="lineup-section">
          <h3 class="section-title">Selezione Formazione</h3>
          <div id="lineupSelector" class="lineup-selector-container"></div>
        </div>

        <!-- Pre-Match Analysis Section -->
        <div class="pre-match-analysis">
          <h3 class="section-title">Analisi Pre-Partita</h3>
          <div id="preMatchAnalysis" class="analysis-container"></div>
        </div>

        <!-- Simulation Controls (hidden initially) -->
        <div class="simulation-controls" id="simulationControls" style="display: none;">
          <div class="controls-header">
            <h3>Controlli Simulazione</h3>
            <div class="match-time">
              <span class="time-display">0'</span>
              <span class="match-status">In attesa</span>
            </div>
          </div>
          
          <div class="speed-controls">
            <button class="speed-btn" data-speed="slow">🐌 Lento</button>
            <button class="speed-btn active" data-speed="normal">⚡ Normale</button>
            <button class="speed-btn" data-speed="fast">🚀 Veloce</button>
            <button class="pause-btn">⏸️ Pausa</button>
          </div>
          
          <div class="live-score">
            <div class="score-display">
              <span class="home-score">0</span>
              <span class="score-separator">-</span>
              <span class="away-score">0</span>
            </div>
          </div>
          
          <div class="match-events" id="matchEvents">
            <!-- Live events will appear here -->
          </div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  async initComponents() {
    await this.loadMatchData();
    if (!this.matchData) {
      this.container.innerHTML = '<p>Nessuna partita da simulare</p>';
      return;
    }
    this.renderMatchInfo();
    await this.renderLineupSelector();
    this.renderPreMatchAnalysis();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  async loadMatchData() {
    const matchId = window.currentMatchId;
    if (!matchId) {
      this.matchData = null;
      return;
    }

    const { matchesDataset } = await import('../datasets/matches.js');
    const { teamsDataset } = await import('../datasets/teams.js');
    const match = await matchesDataset.get(matchId);
    if (!match) {
      this.matchData = null;
      return;
    }

    const homeTeam = await teamsDataset.get(match.home_team_id);
    const awayTeam = await teamsDataset.get(match.away_team_id);

    this.matchData = {
      id: match.id,
      competition: 'Campionato',
      matchday: match.matchday,
      date: match.match_date,
      stadium: homeTeam?.city ? `Stadio di ${homeTeam.city}` : 'Stadio Comunale',
      homeTeam: {
        id: homeTeam?.id,
        name: homeTeam?.name || 'Sconosciuta',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        formation: homeTeam?.formation || '4-4-2',
        rating: homeTeam?.team_strength || 0
      },
      awayTeam: {
        id: awayTeam?.id,
        name: awayTeam?.name || 'Sconosciuta',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        formation: awayTeam?.formation || '4-4-2',
        rating: awayTeam?.team_strength || 0
      },
      weather: {
        condition: match.weather,
        temperature: 18
      },
      referee: match.referee
    };
  }

  renderMatchInfo() {
    const container = document.getElementById('matchInfo');
    
    container.innerHTML = `
      <div class="match-header">
        <div class="competition-info">
          <span class="competition">${this.matchData.competition}</span>
          <span class="matchday">Giornata ${this.matchData.matchday}</span>
        </div>
        <div class="match-date">${this.formatDate(this.matchData.date)}</div>
      </div>
      
      <div class="teams-display">
        <div class="team home-team">
          <img src="${this.matchData.homeTeam.logo}" alt="${this.matchData.homeTeam.name}" class="team-logo">
          <div class="team-info">
            <h3 class="team-name">${this.matchData.homeTeam.name}</h3>
            <span class="team-rating">Rating: ${this.matchData.homeTeam.rating}</span>
            <span class="team-formation">${this.matchData.homeTeam.formation}</span>
          </div>
        </div>
        
        <div class="vs-section">
          <span class="vs-text">VS</span>
          <div class="match-details">
            <span class="stadium">📍 ${this.matchData.stadium}</span>
            <span class="weather">🌤️ ${this.matchData.weather.condition} ${this.matchData.weather.temperature}°C</span>
            <span class="referee">👨‍⚖️ ${this.matchData.referee}</span>
          </div>
        </div>
        
        <div class="team away-team">
          <div class="team-info">
            <h3 class="team-name">${this.matchData.awayTeam.name}</h3>
            <span class="team-rating">Rating: ${this.matchData.awayTeam.rating}</span>
            <span class="team-formation">${this.matchData.awayTeam.formation}</span>
          </div>
          <img src="${this.matchData.awayTeam.logo}" alt="${this.matchData.awayTeam.name}" class="team-logo">
        </div>
      </div>
    `;
  }

  async renderLineupSelector() {
    const container = document.getElementById('lineupSelector');

    const players = await this.getTeamPlayers();
    const formation =
      this.matchData.homeTeam.id === this.userTeamId
        ? this.matchData.homeTeam.formation
        : this.matchData.awayTeam.formation;

        new LineupSelector(container, {
      formation,
      availablePlayers: players,
      onLineupChange: (lineupData) => this.handleLineupChange(lineupData)
    });
  }

  renderPreMatchAnalysis() {
    const container = document.getElementById('preMatchAnalysis');
    
    container.innerHTML = `
      <div class="analysis-grid">
        <div class="analysis-item">
          <h5>Probabilità Vittoria</h5>
          <div class="probability-bars">
            <div class="prob-bar home">
              <span class="prob-label">${this.matchData.homeTeam.name}</span>
              <div class="prob-fill" style="width: 45%"></div>
              <span class="prob-value">45%</span>
            </div>
            <div class="prob-bar draw">
              <span class="prob-label">Pareggio</span>
              <div class="prob-fill" style="width: 25%"></div>
              <span class="prob-value">25%</span>
            </div>
            <div class="prob-bar away">
              <span class="prob-label">${this.matchData.awayTeam.name}</span>
              <div class="prob-fill" style="width: 30%"></div>
              <span class="prob-value">30%</span>
            </div>
          </div>
        </div>
        
        <div class="analysis-item">
          <h5>Confronto Squadre</h5>
          <div class="team-comparison">
            <div class="comparison-stat">
              <span class="stat-label">Attacco</span>
              <div class="stat-bars">
                <div class="stat-bar home" style="width: 80%">80</div>
                <div class="stat-bar away" style="width: 85%">85</div>
              </div>
            </div>
            <div class="comparison-stat">
              <span class="stat-label">Difesa</span>
              <div class="stat-bars">
                <div class="stat-bar home" style="width: 75%">75</div>
                <div class="stat-bar away" style="width: 78%">78</div>
              </div>
            </div>
            <div class="comparison-stat">
              <span class="stat-label">Centrocampo</span>
              <div class="stat-bars">
                <div class="stat-bar home" style="width: 82%">82</div>
                <div class="stat-bar away" style="width: 80%">80</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="analysis-item">
          <h5>Fattori Chiave</h5>
          <div class="key-factors">
            <div class="factor">
              <span class="factor-icon">🏠</span>
              <span class="factor-text">Vantaggio casa</span>
            </div>
            <div class="factor">
              <span class="factor-icon">📈</span>
              <span class="factor-text">Forma recente positiva</span>
            </div>
            <div class="factor">
              <span class="factor-icon">⚡</span>
              <span class="factor-text">Morale alto</span>
            </div>
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
        <span class="sponsor-text">SportTech Pro - La tecnologia al servizio del calcio</span>
      </div>
    `;
  }

  bindEvents() {
    // Action buttons
    const tacticsBtn = this.container.querySelector('.tactics-btn');
    const startMatchBtn = this.container.querySelector('.start-match-btn');
    
    tacticsBtn?.addEventListener('click', () => this.showTacticsPanel());
    startMatchBtn?.addEventListener('click', () => this.startMatch());

    // Speed controls (initially hidden)
    const speedBtns = this.container.querySelectorAll('.speed-btn');
    const pauseBtn = this.container.querySelector('.pause-btn');
    
    speedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setSimulationSpeed(btn.dataset.speed);
      });
    });
    
    pauseBtn?.addEventListener('click', () => this.togglePause());
  }

  handleLineupChange(lineupData) {
    this.lineup = lineupData;
    console.log('Lineup updated:', lineupData);
    
    // Update start button state
    const startBtn = this.container.querySelector('.start-match-btn');
    if (startBtn) {
      startBtn.disabled = !lineupData.isComplete;
      startBtn.textContent = lineupData.isComplete ? '▶️ Inizia Partita' : '⚠️ Completa Formazione';
    }
  }

  showTacticsPanel() {
    this.showToast('Apertura pannello tattiche', 'info');
  }

  startMatch() {
    if (!this.lineup || !this.lineup.isComplete) {
      this.showToast('Completa la formazione prima di iniziare', 'error');
      return;
    }

    this.isSimulating = true;
    this.isPaused = false;
    this.currentMinute = 0;
    this.simulationSpeed = 'normal';

    // Show simulation controls
    const simulationControls = this.container.querySelector('#simulationControls');
    simulationControls.style.display = 'block';
    
    // Hide lineup section
    const lineupSection = this.container.querySelector('.lineup-section');
    lineupSection.style.display = 'none';
    
    // Update page header
    const startBtn = this.container.querySelector('.start-match-btn');
    startBtn.textContent = '⏹️ Termina Partita';
    startBtn.onclick = () => this.endMatch();
    
    // Start simulation
    this.simulateMatch();
    
    this.showToast('Partita iniziata!', 'success');
  }

  simulateMatch() {
    this.matchEvents = [];
    this.startSimulationInterval();
  }

  startSimulationInterval() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
    }
    const speedMap = { slow: 1500, normal: 1000, fast: 500 };
    const interval = speedMap[this.simulationSpeed] || 1000;
    this.matchInterval = setInterval(() => this.simulationTick(), interval);
  }

  simulationTick() {
    this.currentMinute++;

    const timeDisplay = this.container.querySelector('.time-display');
    const statusDisplay = this.container.querySelector('.match-status');
    if (timeDisplay) timeDisplay.textContent = `${this.currentMinute}'`;
    if (statusDisplay) statusDisplay.textContent = 'In corso';

    if (Math.random() < 0.05) {
      const event = this.generateRandomEvent(this.currentMinute);
      this.matchEvents.push(event);
      this.addMatchEvent(event);
    }

    if (this.currentMinute >= 90) {
      this.endMatch();
    }
  }

  generateRandomEvent(minute) {
    const eventTypes = ['goal', 'card', 'substitution', 'shot', 'corner'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const team = Math.random() < 0.5 ? 'home' : 'away';
    const players = ['Mario Rossi', 'Luigi Bianchi', 'Giuseppe Verdi', 'Antonio Neri'];
    const player = players[Math.floor(Math.random() * players.length)];
    
    let description = '';
    switch (type) {
      case 'goal':
        description = `Gol di ${player}!`;
        this.updateScore(team);
        break;
      case 'card':
        description = `Cartellino giallo per ${player}`;
        break;
      case 'substitution':
        description = `Sostituzione: entra ${player}`;
        break;
      case 'shot':
        description = `Tiro di ${player}`;
        break;
      case 'corner':
        description = `Corner per ${team === 'home' ? this.matchData.homeTeam.name : this.matchData.awayTeam.name}`;
        break;
    }
    
    return {
      id: Date.now(),
      minute,
      type,
      team,
      player,
      description
    };
  }

  addMatchEvent(event) {
    const eventsContainer = this.container.querySelector('#matchEvents');
    
    const eventElement = document.createElement('div');
    eventElement.className = `match-event ${event.type}`;
    eventElement.innerHTML = `
      <span class="event-time">${event.minute}'</span>
      <span class="event-icon">${this.getEventIcon(event.type)}</span>
      <span class="event-description">${event.description}</span>
    `;
    
    eventsContainer.insertBefore(eventElement, eventsContainer.firstChild);
    
    // Keep only last 10 events visible
    const events = eventsContainer.querySelectorAll('.match-event');
    if (events.length > 10) {
      events[events.length - 1].remove();
    }
  }

  updateScore(team) {
    const scoreElement = this.container.querySelector(team === 'home' ? '.home-score' : '.away-score');
    if (scoreElement) {
      const currentScore = parseInt(scoreElement.textContent) || 0;
      scoreElement.textContent = currentScore + 1;
    }
  }

  getEventIcon(type) {
    const icons = {
      'goal': '⚽',
      'card': '🟨',
      'substitution': '🔄',
      'shot': '🎯',
      'corner': '📐'
    };
    return icons[type] || '📝';
  }

  setSimulationSpeed(speed) {
    this.simulationSpeed = speed;
    if (this.isSimulating && !this.isPaused) {
      this.startSimulationInterval();
    }
  }

  togglePause() {
    if (this.isPaused) {
      this.isPaused = false;
      this.startSimulationInterval();
      this.container.querySelector('.pause-btn').textContent = '⏸️ Pausa';
      this.container.querySelector('.match-status').textContent = 'In corso';
    } else {
      this.isPaused = true;
      if (this.matchInterval) {
        clearInterval(this.matchInterval);
        this.matchInterval = null;
      }
      this.container.querySelector('.pause-btn').textContent = '▶️ Riprendi';
      this.container.querySelector('.match-status').textContent = 'In pausa';
    }
  }

  endMatch() {
    this.isSimulating = false;
    this.isPaused = false;

    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
    }
    
    // Update status
    const statusDisplay = this.container.querySelector('.match-status');
    if (statusDisplay) statusDisplay.textContent = 'Finita';
    
    // Show final result
    const homeScore = parseInt(this.container.querySelector('.home-score').textContent) || 0;
    const awayScore = parseInt(this.container.querySelector('.away-score').textContent) || 0;

    this.showToast(`Partita terminata! Risultato finale: ${homeScore}-${awayScore}`, 'success');

    // Save result for analysis page
    window.lastMatchReport = this.generateMatchReport(homeScore, awayScore);

    // Redirect to analysis after 3 seconds
    setTimeout(() => {
      window.location.hash = 'match-analysis';
    }, 3000);
  }

  generateMatchReport(homeScore, awayScore) {
    const stats = {
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      yellowCards: { home: 0, away: 0 },
      redCards: { home: 0, away: 0 },
      offsides: { home: Math.floor(Math.random() * 3), away: Math.floor(Math.random() * 3) },
      passes: { home: 250 + Math.floor(Math.random() * 100), away: 250 + Math.floor(Math.random() * 100) },
      passAccuracy: { home: 80 + Math.floor(Math.random() * 10), away: 80 + Math.floor(Math.random() * 10) }
    };

    this.matchEvents.forEach(ev => {
      const t = ev.team;
      switch (ev.type) {
        case 'goal':
          stats.shots[t]++;
          stats.shotsOnTarget[t]++;
          break;
        case 'shot':
          stats.shots[t]++;
          if (Math.random() < 0.4) stats.shotsOnTarget[t]++;
          break;
        case 'corner':
          stats.corners[t]++;
          break;
        case 'card':
          stats.fouls[t]++;
          stats.yellowCards[t]++;
          break;
      }
    });

    const possHome = 45 + Math.floor(Math.random() * 11);
    stats.possession.home = possHome;
    stats.possession.away = 100 - possHome;

    const highlights = this.matchEvents.map((ev, idx) => ({
      id: idx + 1,
      time: ev.minute,
      type: ev.type,
      team: ev.team,
      player: ev.player,
      description: ev.description,
      importance: ev.type === 'goal' ? 9 : 5
    }));

    return {
      match: this.matchData,
      result: { homeScore, awayScore },
      statistics: stats,
      highlights
    };
  }

  async getTeamPlayers() {
    const { teamsDataset } = await import('../datasets/teams.js');
    const { default: playersData } = await import('../data/playersData.js');

    if (!this.userTeamId) return [];

    const team = await teamsDataset.get(this.userTeamId);
    const short = team?.short_name;
    const rawPlayers = playersData[short] || [];

    const ROLE_MAP = { POR: 'GK', DIF: 'DF', CEN: 'MF', ATT: 'FW' };

    return rawPlayers.map((p, idx) => ({
      id: idx + 1,
      name: `${p.first_name} ${p.last_name}`,
      position: ROLE_MAP[p.role] || p.role,
      overall_rating: p.overall_rating,
      photo:
        'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
    }));
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
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