import LineupSelector from '../components/LineupSelector.component.js';

export default class MatchSimulationPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.matchData = null;
    this.lineup = null;
    this.isSimulating = false;
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

  initComponents() {
    this.loadMatchData();
    this.renderMatchInfo();
    this.renderLineupSelector();
    this.renderPreMatchAnalysis();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  loadMatchData() {
    // Mock match data - in a real app this would come from game state
    this.matchData = {
      id: 1,
      competition: 'Serie A',
      matchday: 15,
      date: new Date().toISOString(),
      stadium: 'Stadio San Siro',
      homeTeam: {
        id: 1,
        name: 'AC Milan',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        formation: '4-4-2',
        rating: 82
      },
      awayTeam: {
        id: 2,
        name: 'Inter',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
        formation: '4-3-3',
        rating: 85
      },
      weather: {
        condition: 'sunny',
        temperature: 18
      },
      referee: 'Marco Rossi'
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

  renderLineupSelector() {
    const container = document.getElementById('lineupSelector');
    
    new LineupSelector(container, {
      formation: this.matchData.homeTeam.formation,
      availablePlayers: this.getMockPlayers(),
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
    let currentMinute = 0;
    const matchEvents = [];
    
    this.matchInterval = setInterval(() => {
      currentMinute++;
      
      // Update time display
      const timeDisplay = this.container.querySelector('.time-display');
      const statusDisplay = this.container.querySelector('.match-status');
      
      if (timeDisplay) timeDisplay.textContent = `${currentMinute}'`;
      if (statusDisplay) statusDisplay.textContent = 'In corso';
      
      // Generate random events
      if (Math.random() < 0.05) { // 5% chance per minute
        const event = this.generateRandomEvent(currentMinute);
        matchEvents.push(event);
        this.addMatchEvent(event);
      }
      
      // End match at 90 minutes
      if (currentMinute >= 90) {
        this.endMatch();
      }
      
    }, 1000); // 1 second = 1 minute of match time
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
    // Adjust simulation speed
    console.log('Simulation speed set to:', speed);
  }

  togglePause() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
      this.container.querySelector('.pause-btn').textContent = '▶️ Riprendi';
      this.container.querySelector('.match-status').textContent = 'In pausa';
    } else {
      this.simulateMatch();
      this.container.querySelector('.pause-btn').textContent = '⏸️ Pausa';
      this.container.querySelector('.match-status').textContent = 'In corso';
    }
  }

  endMatch() {
    this.isSimulating = false;
    
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
    }
    
    // Update status
    const statusDisplay = this.container.querySelector('.match-status');
    if (statusDisplay) statusDisplay.textContent = 'Finita';
    
    // Show final result
    const homeScore = this.container.querySelector('.home-score').textContent;
    const awayScore = this.container.querySelector('.away-score').textContent;
    
    this.showToast(`Partita terminata! Risultato finale: ${homeScore}-${awayScore}`, 'success');
    
    // Redirect to analysis after 3 seconds
    setTimeout(() => {
      window.location.hash = 'match-analysis';
    }, 3000);
  }

  getMockPlayers() {
    return [
      {
        id: 1,
        name: 'Mario Rossi',
        position: 'FW',
        rating: 85,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        position: 'MF',
        rating: 82,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        position: 'DF',
        rating: 78,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 4,
        name: 'Antonio Neri',
        position: 'GK',
        rating: 80,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      }
    ];
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