export const template = `
<div class="live-scoreboard">
  <div class="scoreboard-header">
    <div class="match-time">
      <span class="time-display">45'</span>
      <span class="period-indicator">1T</span>
    </div>
    
    <div class="match-status">
      <div class="status-dot live"></div>
      <span class="status-text">In corso</span>
    </div>
  </div>
  
  <div class="score-section">
    <div class="team-score home-team-score">
      <div class="team-info">
        <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60" 
             alt="Logo squadra casa" class="team-logo">
        <span class="team-name">Milan</span>
      </div>
      <div class="score-display">
        <span class="score-number">2</span>
      </div>
    </div>
    
    <div class="score-separator">
      <div class="vs-text">VS</div>
      <div class="score-line"></div>
    </div>
    
    <div class="team-score away-team-score">
      <div class="score-display">
        <span class="score-number">1</span>
      </div>
      <div class="team-info">
        <span class="team-name">Inter</span>
        <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60" 
             alt="Logo squadra ospite" class="team-logo">
      </div>
    </div>
  </div>
  
  <div class="match-stats-mini">
    <div class="stat-item">
      <span class="stat-label">Possesso</span>
      <div class="possession-bar">
        <div class="possession-home" style="width: 58%"></div>
        <div class="possession-away" style="width: 42%"></div>
      </div>
      <div class="possession-values">
        <span class="home-possession">58%</span>
        <span class="away-possession">42%</span>
      </div>
    </div>
    
    <div class="stat-item">
      <span class="stat-label">Tiri</span>
      <div class="stat-comparison">
        <span class="home-stat">8</span>
        <span class="stat-vs">-</span>
        <span class="away-stat">5</span>
      </div>
    </div>
    
    <div class="stat-item">
      <span class="stat-label">Tiri in porta</span>
      <div class="stat-comparison">
        <span class="home-stat">4</span>
        <span class="stat-vs">-</span>
        <span class="away-stat">3</span>
      </div>
    </div>
  </div>
  
  <div class="recent-events">
    <h4>Eventi Recenti</h4>
    <div class="events-list">
      <div class="event-item goal">
        <span class="event-time">43'</span>
        <span class="event-icon">⚽</span>
        <span class="event-text">Gol di M. Rossi (Milan)</span>
      </div>
      
      <div class="event-item card">
        <span class="event-time">38'</span>
        <span class="event-icon">🟨</span>
        <span class="event-text">Ammonito L. Bianchi (Inter)</span>
      </div>
      
      <div class="event-item goal">
        <span class="event-time">25'</span>
        <span class="event-icon">⚽</span>
        <span class="event-text">Gol di G. Verdi (Inter)</span>
      </div>
    </div>
  </div>
  
  <div class="scoreboard-actions">
    <button class="action-btn view-details-btn" aria-label="Visualizza dettagli partita">
      📊 Dettagli
    </button>
    <button class="action-btn fullscreen-btn" aria-label="Modalità schermo intero">
      🔍 Espandi
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-scoreboard">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Live Score Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.live-scoreboard {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.live-scoreboard.live {
  border-color: var(--error);
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.2);
}

.scoreboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.match-time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-display {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

.period-indicator {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--background);
  padding: 4px 8px;
  border-radius: 12px;
}

.match-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-dot.live {
  background: var(--error);
  animation: pulse 2s infinite;
}

.status-dot.finished {
  background: var(--success);
}

.status-dot.scheduled {
  background: var(--warning);
}

.status-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.score-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.team-score {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.away-team-score {
  flex-direction: row-reverse;
}

.team-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.away-team-score .team-info {
  flex-direction: row-reverse;
  text-align: right;
}

.team-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--border);
}

.team-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
}

.score-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.score-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 40px;
}

.vs-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.score-line {
  width: 2px;
  height: 30px;
  background: var(--border);
  border-radius: 1px;
}

.match-stats-mini {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

.possession-bar {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--border);
}

.possession-home {
  background: var(--primary);
  transition: width 0.5s ease;
}

.possession-away {
  background: var(--secondary);
  transition: width 0.5s ease;
}

.possession-values {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
}

.home-possession {
  color: var(--primary);
}

.away-possession {
  color: var(--secondary);
}

.stat-comparison {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

.home-stat {
  color: var(--primary);
}

.away-stat {
  color: var(--secondary);
}

.stat-vs {
  color: var(--text-muted);
}

.recent-events {
  margin-bottom: 20px;
}

.recent-events h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
  border-left: 3px solid var(--border);
  font-size: 12px;
}

.event-item.goal {
  border-left-color: var(--success);
}

.event-item.card {
  border-left-color: var(--warning);
}

.event-item.substitution {
  border-left-color: var(--primary);
}

.event-time {
  font-weight: 700;
  color: var(--primary);
  min-width: 30px;
}

.event-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.event-text {
  color: var(--text);
  flex: 1;
}

.scoreboard-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  padding: 8px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  flex: 1;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.sponsor-slot-scoreboard {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Score animation */
.score-number.score-change {
  animation: scoreUpdate 0.5s ease;
}

@keyframes scoreUpdate {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); color: var(--success); }
  100% { transform: scale(1); }
}

/* Event animations */
.event-item.new-event {
  animation: newEvent 0.5s ease;
}

@keyframes newEvent {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .live-scoreboard {
    padding: 16px;
  }
  
  .score-section {
    flex-direction: column;
    gap: 12px;
  }
  
  .team-score {
    width: 100%;
    justify-content: space-between;
  }
  
  .away-team-score {
    flex-direction: row;
  }
  
  .away-team-score .team-info {
    flex-direction: row;
    text-align: left;
  }
  
  .score-separator {
    order: -1;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
  
  .vs-text {
    display: none;
  }
  
  .score-line {
    width: 60px;
    height: 2px;
  }
  
  .team-logo {
    width: 32px;
    height: 32px;
  }
  
  .team-name {
    font-size: 14px;
  }
  
  .score-number {
    font-size: 36px;
  }
  
  .scoreboard-actions {
    flex-direction: column;
  }
  
  .sponsor-slot-scoreboard {
    position: static;
    width: 100%;
    margin-top: 12px;
  }
}
</style>
`;

class LiveScoreBoard {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoUpdate: true,
      updateInterval: 30000, // 30 seconds
      showEvents: true,
      maxEvents: 5,
      ...options
    };
    
    this.matchData = {
      homeTeam: { name: 'Milan', logo: '', score: 0 },
      awayTeam: { name: 'Inter', logo: '', score: 0 },
      time: 0,
      period: '1T',
      status: 'live',
      stats: {
        possession: { home: 50, away: 50 },
        shots: { home: 0, away: 0 },
        shotsOnTarget: { home: 0, away: 0 }
      },
      events: []
    };
    
    this.updateInterval = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startAutoUpdate();
  }
  
  bindEvents() {
    // Action buttons
    this.element.querySelector('.view-details-btn').addEventListener('click', () => {
      this.showMatchDetails();
    });
    
    this.element.querySelector('.fullscreen-btn').addEventListener('click', () => {
      this.toggleFullscreen();
    });
    
    // Team logos click
    this.element.querySelectorAll('.team-logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        this.showTeamInfo(e.target);
      });
    });
    
    // Score click for goal details
    this.element.querySelectorAll('.score-number').forEach(score => {
      score.addEventListener('click', () => {
        this.showGoalDetails();
      });
    });
  }
  
  startAutoUpdate() {
    if (this.options.autoUpdate && this.matchData.status === 'live') {
      this.updateInterval = setInterval(() => {
        this.requestLiveUpdate();
      }, this.options.updateInterval);
    }
  }
  
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  requestLiveUpdate() {
    // Dispatch event to request live data
    this.element.dispatchEvent(new CustomEvent('requestLiveData', {
      detail: { matchId: this.matchData.id }
    }));
  }
  
  updateMatchData(newData) {
    const oldData = { ...this.matchData };
    this.matchData = { ...this.matchData, ...newData };
    
    this.updateDisplay(oldData);
    
    // Handle status changes
    if (oldData.status !== this.matchData.status) {
      this.handleStatusChange();
    }
  }
  
  updateDisplay(oldData = {}) {
    this.updateTime();
    this.updateScore(oldData);
    this.updateStatus();
    this.updateStats();
    this.updateEvents();
  }
  
  updateTime() {
    const timeDisplay = this.element.querySelector('.time-display');
    const periodIndicator = this.element.querySelector('.period-indicator');
    
    timeDisplay.textContent = `${this.matchData.time}'`;
    periodIndicator.textContent = this.matchData.period;
  }
  
  updateScore(oldData = {}) {
    const homeScoreEl = this.element.querySelector('.home-team-score .score-number');
    const awayScoreEl = this.element.querySelector('.away-team-score .score-number');
    
    // Check for score changes and animate
    if (oldData.homeTeam && oldData.homeTeam.score !== this.matchData.homeTeam.score) {
      this.animateScoreChange(homeScoreEl);
    }
    if (oldData.awayTeam && oldData.awayTeam.score !== this.matchData.awayTeam.score) {
      this.animateScoreChange(awayScoreEl);
    }
    
    homeScoreEl.textContent = this.matchData.homeTeam.score;
    awayScoreEl.textContent = this.matchData.awayTeam.score;
    
    // Update team names and logos
    this.element.querySelector('.home-team-score .team-name').textContent = this.matchData.homeTeam.name;
    this.element.querySelector('.away-team-score .team-name').textContent = this.matchData.awayTeam.name;
    
    if (this.matchData.homeTeam.logo) {
      this.element.querySelector('.home-team-score .team-logo').src = this.matchData.homeTeam.logo;
    }
    if (this.matchData.awayTeam.logo) {
      this.element.querySelector('.away-team-score .team-logo').src = this.matchData.awayTeam.logo;
    }
  }
  
  animateScoreChange(scoreElement) {
    scoreElement.classList.add('score-change');
    setTimeout(() => {
      scoreElement.classList.remove('score-change');
    }, 500);
  }
  
  updateStatus() {
    const statusDot = this.element.querySelector('.status-dot');
    const statusText = this.element.querySelector('.status-text');
    
    // Remove existing status classes
    statusDot.classList.remove('live', 'finished', 'scheduled');
    
    switch (this.matchData.status) {
      case 'live':
        statusDot.classList.add('live');
        statusText.textContent = 'In corso';
        this.element.classList.add('live');
        break;
      case 'finished':
        statusDot.classList.add('finished');
        statusText.textContent = 'Finita';
        this.element.classList.remove('live');
        break;
      case 'halftime':
        statusDot.classList.add('live');
        statusText.textContent = 'Intervallo';
        break;
      case 'scheduled':
        statusDot.classList.add('scheduled');
        statusText.textContent = 'Programmata';
        this.element.classList.remove('live');
        break;
      default:
        statusText.textContent = 'In attesa';
    }
  }
  
  updateStats() {
    const stats = this.matchData.stats;
    
    // Update possession
    const possessionHome = this.element.querySelector('.possession-home');
    const possessionAway = this.element.querySelector('.possession-away');
    const homePossessionText = this.element.querySelector('.home-possession');
    const awayPossessionText = this.element.querySelector('.away-possession');
    
    possessionHome.style.width = `${stats.possession.home}%`;
    possessionAway.style.width = `${stats.possession.away}%`;
    homePossessionText.textContent = `${stats.possession.home}%`;
    awayPossessionText.textContent = `${stats.possession.away}%`;
    
    // Update shots
    const shotStats = this.element.querySelectorAll('.stat-comparison');
    if (shotStats[0]) {
      shotStats[0].querySelector('.home-stat').textContent = stats.shots.home;
      shotStats[0].querySelector('.away-stat').textContent = stats.shots.away;
    }
    if (shotStats[1]) {
      shotStats[1].querySelector('.home-stat').textContent = stats.shotsOnTarget.home;
      shotStats[1].querySelector('.away-stat').textContent = stats.shotsOnTarget.away;
    }
  }
  
  updateEvents() {
    if (!this.options.showEvents) return;
    
    const eventsList = this.element.querySelector('.events-list');
    eventsList.innerHTML = '';
    
    // Show latest events (limited by maxEvents)
    const recentEvents = this.matchData.events
      .slice(-this.options.maxEvents)
      .reverse();
    
    recentEvents.forEach((event, index) => {
      const eventElement = this.createEventElement(event);
      if (index === 0 && event.isNew) {
        eventElement.classList.add('new-event');
      }
      eventsList.appendChild(eventElement);
    });
  }
  
  createEventElement(event) {
    const eventItem = document.createElement('div');
    eventItem.className = `event-item ${event.type}`;
    
    eventItem.innerHTML = `
      <span class="event-time">${event.time}'</span>
      <span class="event-icon">${this.getEventIcon(event.type)}</span>
      <span class="event-text">${event.description}</span>
    `;
    
    return eventItem;
  }
  
  getEventIcon(eventType) {
    const icons = {
      goal: '⚽',
      card: '🟨',
      red_card: '🟥',
      substitution: '🔄',
      corner: '📐',
      offside: '🚩',
      foul: '⚠️'
    };
    return icons[eventType] || '📝';
  }
  
  handleStatusChange() {
    if (this.matchData.status === 'live') {
      this.startAutoUpdate();
    } else {
      this.stopAutoUpdate();
    }
    
    // Dispatch status change event
    this.element.dispatchEvent(new CustomEvent('matchStatusChange', {
      detail: { 
        status: this.matchData.status,
        matchData: this.matchData 
      }
    }));
  }
  
  addEvent(event) {
    event.isNew = true;
    this.matchData.events.push(event);
    this.updateEvents();
    
    // Remove new flag after animation
    setTimeout(() => {
      event.isNew = false;
    }, 1000);
    
    // Dispatch new event
    this.element.dispatchEvent(new CustomEvent('newMatchEvent', {
      detail: { event, matchData: this.matchData }
    }));
  }
  
  showMatchDetails() {
    // Dispatch event to show detailed match view
    this.element.dispatchEvent(new CustomEvent('showMatchDetails', {
      detail: { matchData: this.matchData }
    }));
  }
  
  toggleFullscreen() {
    this.element.classList.toggle('fullscreen');
    
    // Dispatch fullscreen toggle event
    this.element.dispatchEvent(new CustomEvent('toggleFullscreen', {
      detail: { isFullscreen: this.element.classList.contains('fullscreen') }
    }));
  }
  
  showTeamInfo(logoElement) {
    const isHome = logoElement.closest('.home-team-score');
    const team = isHome ? this.matchData.homeTeam : this.matchData.awayTeam;
    
    // Dispatch team info event
    this.element.dispatchEvent(new CustomEvent('showTeamInfo', {
      detail: { team, isHome: !!isHome }
    }));
  }
  
  showGoalDetails() {
    const goals = this.matchData.events.filter(event => event.type === 'goal');
    
    // Dispatch goal details event
    this.element.dispatchEvent(new CustomEvent('showGoalDetails', {
      detail: { goals, matchData: this.matchData }
    }));
  }
  
  // Public methods
  setScore(homeScore, awayScore) {
    const oldData = { ...this.matchData };
    this.matchData.homeTeam.score = homeScore;
    this.matchData.awayTeam.score = awayScore;
    this.updateScore(oldData);
  }
  
  setTime(time, period = null) {
    this.matchData.time = time;
    if (period) this.matchData.period = period;
    this.updateTime();
  }
  
  setStatus(status) {
    const oldStatus = this.matchData.status;
    this.matchData.status = status;
    this.updateStatus();
    
    if (oldStatus !== status) {
      this.handleStatusChange();
    }
  }
  
  updatePossession(homePercentage, awayPercentage) {
    this.matchData.stats.possession.home = homePercentage;
    this.matchData.stats.possession.away = awayPercentage;
    this.updateStats();
  }
  
  updateShots(homeShots, awayShots, homeShotsOnTarget, awayShotsOnTarget) {
    this.matchData.stats.shots.home = homeShots;
    this.matchData.stats.shots.away = awayShots;
    this.matchData.stats.shotsOnTarget.home = homeShotsOnTarget;
    this.matchData.stats.shotsOnTarget.away = awayShotsOnTarget;
    this.updateStats();
  }
  
  getMatchData() {
    return { ...this.matchData };
  }
  
  destroy() {
    this.stopAutoUpdate();
  }
}

export default LiveScoreBoard;