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
    this.homeScore = 0;
    this.awayScore = 0;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="match-simulation-page">
        <!-- Match Header -->
        <div class="match-header">
          <div class="match-info">
            <div class="team home-team">
              <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" alt="Home Team" class="team-logo">
              <div class="team-details">
                <h3 class="team-name" id="homeTeamName">Home Team</h3>
                <span class="team-formation" id="homeFormation">4-4-2</span>
              </div>
            </div>
            
            <div class="match-center">
              <div class="match-score">
                <span class="score home-score" id="homeScore">0</span>
                <span class="score-separator">-</span>
                <span class="score away-score" id="awayScore">0</span>
              </div>
              <div class="match-time">
                <span class="time-display" id="timeDisplay">0'</span>
                <span class="match-status" id="matchStatus">In attesa</span>
              </div>
            </div>
            
            <div class="team away-team">
              <div class="team-details">
                <h3 class="team-name" id="awayTeamName">Away Team</h3>
                <span class="team-formation" id="awayFormation">4-4-2</span>
              </div>
              <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" alt="Away Team" class="team-logo">
            </div>
          </div>
        </div>

        <!-- Football Field Visualization -->
        <div class="football-field-container">
          <div class="football-field" id="footballField">
            <!-- Field markings -->
            <div class="field-markings">
              <div class="center-circle"></div>
              <div class="center-line"></div>
              <div class="penalty-area home-penalty"></div>
              <div class="penalty-area away-penalty"></div>
              <div class="goal-area home-goal-area"></div>
              <div class="goal-area away-goal-area"></div>
              <div class="corner-arc corner-1"></div>
              <div class="corner-arc corner-2"></div>
              <div class="corner-arc corner-3"></div>
              <div class="corner-arc corner-4"></div>
            </div>
            
            <!-- Ball -->
            <div class="ball" id="ball"></div>
            
            <!-- Event Animations -->
            <div class="event-animation" id="eventAnimation"></div>
          </div>
        </div>

        <!-- Live Commentary -->
        <div class="live-commentary">
          <div class="commentary-header">
            <h4>📺 Telecronaca Live</h4>
            <div class="commentary-controls">
              <button class="commentary-toggle active" id="commentaryToggle">🔊</button>
            </div>
          </div>
          <div class="commentary-feed" id="commentaryFeed">
            <div class="commentary-item welcome">
              <span class="commentary-time">--'</span>
              <span class="commentary-text">Benvenuti alla diretta di questa emozionante partita!</span>
            </div>
          </div>
        </div>

        <!-- Match Controls -->
        <div class="match-controls">
          <div class="control-section">
            <h5>Controlli Partita</h5>
            <div class="control-buttons">
              <button class="control-btn start-btn" id="startMatchBtn">
                <span class="btn-icon">▶️</span>
                <span class="btn-text">Inizia Partita</span>
              </button>
              <button class="control-btn pause-btn" id="pauseBtn" disabled>
                <span class="btn-icon">⏸️</span>
                <span class="btn-text">Pausa</span>
              </button>
              <button class="control-btn stop-btn" id="stopBtn" disabled>
                <span class="btn-icon">⏹️</span>
                <span class="btn-text">Termina</span>
              </button>
            </div>
          </div>
          
          <div class="speed-section">
            <h5>Velocità Simulazione</h5>
            <div class="speed-controls">
              <button class="speed-btn" data-speed="slow">🐌 Lento</button>
              <button class="speed-btn active" data-speed="normal">⚡ Normale</button>
              <button class="speed-btn" data-speed="fast">🚀 Veloce</button>
              <button class="speed-btn" data-speed="instant">⚡⚡ Istantaneo</button>
            </div>
          </div>
        </div>

        <!-- Match Statistics -->
        <div class="live-stats">
          <h5>Statistiche Live</h5>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Possesso Palla</span>
              <div class="stat-bar">
                <div class="stat-fill home" id="possessionHome" style="width: 50%"></div>
                <div class="stat-fill away" id="possessionAway" style="width: 50%"></div>
              </div>
              <div class="stat-values">
                <span class="home-value" id="possessionHomeValue">50%</span>
                <span class="away-value" id="possessionAwayValue">50%</span>
              </div>
            </div>
            
            <div class="stat-item">
              <span class="stat-label">Tiri</span>
              <div class="stat-numbers">
                <span class="home-stat" id="shotsHome">0</span>
                <span class="stat-separator">-</span>
                <span class="away-stat" id="shotsAway">0</span>
              </div>
            </div>
            
            <div class="stat-item">
              <span class="stat-label">Tiri in Porta</span>
              <div class="stat-numbers">
                <span class="home-stat" id="shotsOnTargetHome">0</span>
                <span class="stat-separator">-</span>
                <span class="away-stat" id="shotsOnTargetAway">0</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lineup Section (Initially visible) -->
        <div class="lineup-section" id="lineupSection">
          <h3 class="section-title">Selezione Formazione</h3>
          <div id="lineupSelector" class="lineup-selector-container"></div>
        </div>
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
    this.bindEvents();
    this.initializeField();
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
      homeTeam: {
        id: homeTeam?.id,
        name: homeTeam?.name || 'Home Team',
        formation: homeTeam?.formation || '4-4-2'
      },
      awayTeam: {
        id: awayTeam?.id,
        name: awayTeam?.name || 'Away Team',
        formation: awayTeam?.formation || '4-4-2'
      },
      weather: match.weather || 'sunny',
      referee: match.referee || 'Arbitro'
    };
  }

  renderMatchInfo() {
    document.getElementById('homeTeamName').textContent = this.matchData.homeTeam.name;
    document.getElementById('awayTeamName').textContent = this.matchData.awayTeam.name;
    document.getElementById('homeFormation').textContent = this.matchData.homeTeam.formation;
    document.getElementById('awayFormation').textContent = this.matchData.awayTeam.formation;
  }

  async renderLineupSelector() {
    const container = document.getElementById('lineupSelector');
    const players = await this.getTeamPlayers();
    const formation = this.matchData.homeTeam.id === this.userTeamId
      ? this.matchData.homeTeam.formation
      : this.matchData.awayTeam.formation;

    new LineupSelector(container, {
      formation,
      availablePlayers: players,
      onLineupChange: (lineupData) => this.handleLineupChange(lineupData)
    });
  }

  initializeField() {
    const ball = document.getElementById('ball');
    this.moveBallToCenter();
  }

  moveBallToCenter() {
    const ball = document.getElementById('ball');
    ball.style.left = '50%';
    ball.style.top = '50%';
  }

  bindEvents() {
    // Control buttons
    const startBtn = document.getElementById('startMatchBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    startBtn?.addEventListener('click', () => this.startMatch());
    pauseBtn?.addEventListener('click', () => this.togglePause());
    stopBtn?.addEventListener('click', () => this.stopMatch());

    // Speed controls
    const speedBtns = this.container.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setSimulationSpeed(btn.dataset.speed);
      });
    });

    // Commentary toggle
    const commentaryToggle = document.getElementById('commentaryToggle');
    commentaryToggle?.addEventListener('click', () => this.toggleCommentary());
  }

  handleLineupChange(lineupData) {
    this.lineup = lineupData;
    const startBtn = document.getElementById('startMatchBtn');
    if (startBtn) {
      startBtn.disabled = !lineupData.isComplete;
      if (lineupData.isComplete) {
        startBtn.innerHTML = '<span class="btn-icon">▶️</span><span class="btn-text">Inizia Partita</span>';
      } else {
        startBtn.innerHTML = '<span class="btn-icon">⚠️</span><span class="btn-text">Completa Formazione</span>';
      }
    }
  }

  startMatch() {
    if (!this.lineup || !this.lineup.isComplete) {
      this.showToast('Completa la formazione prima di iniziare', 'error');
      return;
    }

    this.isSimulating = true;
    this.isPaused = false;
    this.currentMinute = 0;
    this.homeScore = 0;
    this.awayScore = 0;

    // Hide lineup section
    document.getElementById('lineupSection').style.display = 'none';

    // Update controls
    document.getElementById('startMatchBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;

    // Add match start commentary
    this.addCommentary(0, `🏁 Fischio d'inizio! Inizia ${this.matchData.homeTeam.name} vs ${this.matchData.awayTeam.name}!`, 'match-start');

    // Start simulation
    this.startSimulationInterval();
    this.showToast('Partita iniziata!', 'success');
  }

  startSimulationInterval() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
    }
    
    const speedMap = { 
      slow: 2000, 
      normal: 1000, 
      fast: 500, 
      instant: 100 
    };
    const interval = speedMap[this.simulationSpeed] || 1000;
    
    this.matchInterval = setInterval(() => this.simulationTick(), interval);
  }

  simulationTick() {
    if (this.isPaused) return;

    this.currentMinute++;
    this.updateMatchTime();

    // Generate random events
    if (Math.random() < 0.08) { // 8% chance per minute
      const event = this.generateRandomEvent();
      this.processMatchEvent(event);
    }

    // Update possession randomly
    this.updatePossession();

    // Check for match end
    if (this.currentMinute >= 90) {
      this.endMatch();
    }
  }

  generateRandomEvent() {
    const eventTypes = [
      { type: 'goal', weight: 0.05, commentary: 'GOOOOOL!' },
      { type: 'shot', weight: 0.25, commentary: 'Tiro!' },
      { type: 'shot_on_target', weight: 0.15, commentary: 'Tiro in porta!' },
      { type: 'corner', weight: 0.20, commentary: 'Corner!' },
      { type: 'foul', weight: 0.20, commentary: 'Fallo!' },
      { type: 'yellow_card', weight: 0.08, commentary: 'Cartellino giallo!' },
      { type: 'substitution', weight: 0.05, commentary: 'Sostituzione!' },
      { type: 'offside', weight: 0.12, commentary: 'Fuorigioco!' }
    ];

    const totalWeight = eventTypes.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const event of eventTypes) {
      random -= event.weight;
      if (random <= 0) {
        return {
          type: event.type,
          minute: this.currentMinute,
          team: Math.random() < 0.5 ? 'home' : 'away',
          player: this.getRandomPlayer(),
          commentary: event.commentary
        };
      }
    }

    return eventTypes[0];
  }

  processMatchEvent(event) {
    this.matchEvents.push(event);
    
    // Update statistics
    this.updateStatistics(event);
    
    // Add commentary
    this.addCommentary(event.minute, this.generateCommentaryText(event), event.type);
    
    // Animate on field
    this.animateEvent(event);
    
    // Update score if goal
    if (event.type === 'goal') {
      if (event.team === 'home') {
        this.homeScore++;
      } else {
        this.awayScore++;
      }
      this.updateScore();
    }
  }

  updateStatistics(event) {
    const homeStats = {
      shots: document.getElementById('shotsHome'),
      shotsOnTarget: document.getElementById('shotsOnTargetHome')
    };
    
    const awayStats = {
      shots: document.getElementById('shotsAway'),
      shotsOnTarget: document.getElementById('shotsOnTargetAway')
    };

    const stats = event.team === 'home' ? homeStats : awayStats;

    switch (event.type) {
      case 'shot':
      case 'goal':
        const currentShots = parseInt(stats.shots.textContent) || 0;
        stats.shots.textContent = currentShots + 1;
        break;
      case 'shot_on_target':
        const currentShotsOnTarget = parseInt(stats.shotsOnTarget.textContent) || 0;
        stats.shotsOnTarget.textContent = currentShotsOnTarget + 1;
        break;
    }
  }

  updatePossession() {
    const homePossession = 40 + Math.random() * 20; // 40-60%
    const awayPossession = 100 - homePossession;

    document.getElementById('possessionHome').style.width = `${homePossession}%`;
    document.getElementById('possessionAway').style.width = `${awayPossession}%`;
    document.getElementById('possessionHomeValue').textContent = `${Math.round(homePossession)}%`;
    document.getElementById('possessionAwayValue').textContent = `${Math.round(awayPossession)}%`;
  }

  generateCommentaryText(event) {
    const teamName = event.team === 'home' ? this.matchData.homeTeam.name : this.matchData.awayTeam.name;
    
    const commentaries = {
      goal: [
        `🥅 GOOOOOOL! ${event.player} segna per ${teamName}!`,
        `⚽ Rete fantastica di ${event.player}! ${teamName} in vantaggio!`,
        `🎯 ${event.player} non sbaglia! Gol per ${teamName}!`
      ],
      shot: [
        `🎯 ${event.player} ci prova per ${teamName}!`,
        `⚽ Tentativo di ${event.player}, palla fuori!`,
        `🏹 ${event.player} calcia, ma non inquadra la porta!`
      ],
      shot_on_target: [
        `🥅 ${event.player} impegna il portiere!`,
        `⚽ Bella parata su tiro di ${event.player}!`,
        `🧤 Il portiere respinge il tiro di ${event.player}!`
      ],
      corner: [
        `📐 Corner per ${teamName}, batte ${event.player}`,
        `🏃 Calcio d'angolo, occasione per ${teamName}`,
        `📐 ${event.player} si prepara per il corner`
      ],
      foul: [
        `🟨 Fallo di ${event.player}, punizione per l'avversario`,
        `⚠️ Intervento irregolare di ${event.player}`,
        `🚫 L'arbitro fischia fallo contro ${event.player}`
      ],
      yellow_card: [
        `🟨 Cartellino giallo per ${event.player}!`,
        `⚠️ Ammonizione per ${event.player} di ${teamName}`,
        `🟨 L'arbitro estrae il giallo per ${event.player}`
      ],
      substitution: [
        `🔄 Cambio per ${teamName}: entra ${event.player}`,
        `👥 Sostituzione: ${event.player} in campo per ${teamName}`,
        `🔄 Mossa tattica: ${event.player} sostituisce un compagno`
      ],
      offside: [
        `🚩 Fuorigioco di ${event.player}`,
        `⚠️ ${event.player} in posizione irregolare`,
        `🚩 L'assistente alza la bandierina: offside`
      ]
    };

    const options = commentaries[event.type] || [`Azione di ${event.player} per ${teamName}`];
    return options[Math.floor(Math.random() * options.length)];
  }

  addCommentary(minute, text, type = 'normal') {
    const feed = document.getElementById('commentaryFeed');
    const commentaryItem = document.createElement('div');
    commentaryItem.className = `commentary-item ${type}`;
    
    commentaryItem.innerHTML = `
      <span class="commentary-time">${minute}'</span>
      <span class="commentary-text">${text}</span>
    `;
    
    feed.appendChild(commentaryItem);
    feed.scrollTop = feed.scrollHeight;

    // Add animation
    commentaryItem.style.animation = 'slideInCommentary 0.3s ease';
  }

  animateEvent(event) {
    const field = document.getElementById('footballField');
    const ball = document.getElementById('ball');
    const eventAnimation = document.getElementById('eventAnimation');

    // Move ball based on event
    const positions = {
      goal: { left: event.team === 'home' ? '95%' : '5%', top: '50%' },
      shot: { left: event.team === 'home' ? '85%' : '15%', top: `${40 + Math.random() * 20}%` },
      corner: { 
        left: Math.random() < 0.5 ? '5%' : '95%', 
        top: Math.random() < 0.5 ? '5%' : '95%' 
      },
      default: { left: `${30 + Math.random() * 40}%`, top: `${30 + Math.random() * 40}%` }
    };

    const position = positions[event.type] || positions.default;
    ball.style.left = position.left;
    ball.style.top = position.top;

    // Add event animation
    if (event.type === 'goal') {
      eventAnimation.innerHTML = '🥅 GOAL!';
      eventAnimation.className = 'event-animation goal-animation';
      eventAnimation.style.display = 'block';
      
      setTimeout(() => {
        eventAnimation.style.display = 'none';
        this.moveBallToCenter();
      }, 2000);
    }
  }

  updateMatchTime() {
    document.getElementById('timeDisplay').textContent = `${this.currentMinute}'`;
    document.getElementById('matchStatus').textContent = this.isPaused ? 'In pausa' : 'In corso';
  }

  updateScore() {
    document.getElementById('homeScore').textContent = this.homeScore;
    document.getElementById('awayScore').textContent = this.awayScore;
    
    // Add score animation
    const scoreElements = [document.getElementById('homeScore'), document.getElementById('awayScore')];
    scoreElements.forEach(el => {
      el.style.animation = 'scoreUpdate 0.5s ease';
      setTimeout(() => el.style.animation = '', 500);
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (this.isPaused) {
      pauseBtn.innerHTML = '<span class="btn-icon">▶️</span><span class="btn-text">Riprendi</span>';
      this.addCommentary(this.currentMinute, '⏸️ Partita in pausa', 'system');
    } else {
      pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span><span class="btn-text">Pausa</span>';
      this.addCommentary(this.currentMinute, '▶️ Partita ripresa', 'system');
    }
  }

  stopMatch() {
    if (confirm('Sei sicuro di voler terminare la partita?')) {
      this.endMatch();
    }
  }

  endMatch() {
    this.isSimulating = false;
    this.isPaused = false;

    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
    }

    // Update controls
    document.getElementById('startMatchBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('matchStatus').textContent = 'Finita';

    // Add final commentary
    this.addCommentary(90, `🏁 Fischio finale! ${this.matchData.homeTeam.name} ${this.homeScore}-${this.awayScore} ${this.matchData.awayTeam.name}`, 'match-end');

    this.showToast(`Partita terminata! Risultato: ${this.homeScore}-${this.awayScore}`, 'success');

    // Save match report
    this.saveMatchReport();

    // Redirect to analysis after delay
    setTimeout(() => {
      window.location.hash = 'match-analysis';
    }, 3000);
  }

  saveMatchReport() {
    const report = {
      match: this.matchData,
      result: { homeScore: this.homeScore, awayScore: this.awayScore },
      events: this.matchEvents,
      statistics: this.generateFinalStatistics(),
      commentary: this.getCommentaryHistory()
    };

    window.lastMatchReport = report;
  }

  generateFinalStatistics() {
    return {
      possession: {
        home: parseInt(document.getElementById('possessionHomeValue').textContent) || 50,
        away: parseInt(document.getElementById('possessionAwayValue').textContent) || 50
      },
      shots: {
        home: parseInt(document.getElementById('shotsHome').textContent) || 0,
        away: parseInt(document.getElementById('shotsAway').textContent) || 0
      },
      shotsOnTarget: {
        home: parseInt(document.getElementById('shotsOnTargetHome').textContent) || 0,
        away: parseInt(document.getElementById('shotsOnTargetAway').textContent) || 0
      }
    };
  }

  getCommentaryHistory() {
    const items = document.querySelectorAll('.commentary-item');
    return Array.from(items).map(item => ({
      time: item.querySelector('.commentary-time').textContent,
      text: item.querySelector('.commentary-text').textContent
    }));
  }

  setSimulationSpeed(speed) {
    this.simulationSpeed = speed;
    if (this.isSimulating && !this.isPaused) {
      this.startSimulationInterval();
    }
  }

  toggleCommentary() {
    const toggle = document.getElementById('commentaryToggle');
    const feed = document.getElementById('commentaryFeed');
    
    if (toggle.classList.contains('active')) {
      toggle.classList.remove('active');
      toggle.textContent = '🔇';
      feed.style.opacity = '0.5';
    } else {
      toggle.classList.add('active');
      toggle.textContent = '🔊';
      feed.style.opacity = '1';
    }
  }

  getRandomPlayer() {
    const players = ['Rossi', 'Bianchi', 'Verdi', 'Neri', 'Gialli', 'Blu', 'Viola', 'Rosa'];
    return players[Math.floor(Math.random() * players.length)];
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
      photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
    }));
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