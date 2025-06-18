export const template = `
<div class="match-header">
  <div class="match-info">
    <div class="competition-info">
      <span class="competition-name">Serie A</span>
      <span class="match-day">Giornata 15</span>
    </div>
    
    <div class="match-details">
      <div class="match-date">
        <span class="date-text">Domenica, 15 Gennaio 2025</span>
        <span class="time-text">15:00</span>
      </div>
      
      <div class="stadium-info">
        <span class="stadium-icon">🏟️</span>
        <span class="stadium-name">Stadio San Siro</span>
        <span class="attendance">Spettatori: 75,000</span>
      </div>
    </div>
  </div>
  
  <div class="teams-section">
    <div class="team home-team">
      <div class="team-logo">
        <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" 
             alt="Logo squadra casa" class="logo-image">
      </div>
      <div class="team-info">
        <h2 class="team-name">AC Milan</h2>
        <div class="team-stats">
          <span class="team-position">1° in classifica</span>
          <span class="team-form">VVVPV</span>
        </div>
      </div>
    </div>
    
    <div class="match-score">
      <div class="score-display">
        <span class="home-score">2</span>
        <span class="score-separator">-</span>
        <span class="away-score">1</span>
      </div>
      <div class="match-status">
        <span class="status-text">90' + 3'</span>
        <div class="status-indicator live"></div>
      </div>
    </div>
    
    <div class="team away-team">
      <div class="team-info">
        <h2 class="team-name">Inter Milan</h2>
        <div class="team-stats">
          <span class="team-position">2° in classifica</span>
          <span class="team-form">VVPVV</span>
        </div>
      </div>
      <div class="team-logo">
        <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80" 
             alt="Logo squadra ospite" class="logo-image">
      </div>
    </div>
  </div>
  
  <div class="match-conditions">
    <div class="weather-info">
      <span class="weather-icon">☀️</span>
      <span class="weather-text">Soleggiato, 18°C</span>
    </div>
    
    <div class="referee-info">
      <span class="referee-icon">👨‍⚖️</span>
      <span class="referee-name">Marco Rossi</span>
    </div>
    
    <div class="tv-info">
      <span class="tv-icon">📺</span>
      <span class="tv-channel">Sky Sport 1</span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-match">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=60" 
         alt="Match Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.match-header {
  background: linear-gradient(135deg, var(--surface) 0%, #f1f5f9 100%);
  border: 2px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.match-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

.match-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.competition-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.competition-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.match-day {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 500;
}

.match-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.match-date {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.date-text {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.time-text {
  font-size: 16px;
  color: var(--primary);
  font-weight: 700;
}

.stadium-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.stadium-icon {
  font-size: 14px;
}

.stadium-name {
  font-weight: 500;
}

.attendance {
  opacity: 0.8;
}

.teams-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
}

.team {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.away-team {
  flex-direction: row-reverse;
}

.team-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-info {
  flex: 1;
}

.away-team .team-info {
  text-align: right;
}

.team-name {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text);
}

.team-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.away-team .team-stats {
  align-items: flex-end;
}

.team-position {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.team-form {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
}

.match-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 36px;
  font-weight: 700;
  color: var(--text);
}

.home-score,
.away-score {
  min-width: 40px;
  text-align: center;
}

.score-separator {
  color: var(--text-muted);
  font-weight: 400;
}

.match-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--background);
  border-radius: 12px;
}

.status-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}

.status-indicator.live {
  background: var(--error);
  animation: pulse 2s infinite;
}

.status-indicator.finished {
  background: var(--success);
}

.status-indicator.scheduled {
  background: var(--warning);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.match-conditions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--background);
  border-radius: 8px;
  margin-bottom: 16px;
}

.weather-info,
.referee-info,
.tv-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text);
}

.weather-icon,
.referee-icon,
.tv-icon {
  font-size: 14px;
}

.weather-text,
.referee-name,
.tv-channel {
  font-weight: 500;
}

.sponsor-slot-match {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 200px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.9;
}

/* Form indicators */
.team-form {
  display: flex;
  gap: 2px;
}

.form-letter {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: white;
}

.form-letter.win {
  background: var(--success);
}

.form-letter.draw {
  background: var(--warning);
}

.form-letter.loss {
  background: var(--error);
}

/* Responsive */
@media (max-width: 1024px) {
  .teams-section {
    flex-direction: column;
    gap: 16px;
  }
  
  .team {
    width: 100%;
    justify-content: center;
  }
  
  .away-team {
    flex-direction: row;
  }
  
  .away-team .team-info {
    text-align: left;
  }
  
  .away-team .team-stats {
    align-items: flex-start;
  }
  
  .match-score {
    order: -1;
  }
}

@media (max-width: 768px) {
  .match-header {
    padding: 16px;
  }
  
  .match-info {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .match-details {
    align-items: flex-start;
  }
  
  .team {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .team-logo {
    width: 48px;
    height: 48px;
  }
  
  .team-name {
    font-size: 16px;
  }
  
  .score-display {
    font-size: 28px;
  }
  
  .match-conditions {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  
  .weather-info,
  .referee-info,
  .tv-info {
    justify-content: center;
  }
  
  .sponsor-slot-match {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class MatchHeader {
  constructor(element, matchData) {
    this.element = element;
    this.matchData = matchData;
    this.updateInterval = null;
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.startLiveUpdates();
  }
  
  render() {
    this.updateMatchInfo();
    this.updateTeams();
    this.updateScore();
    this.updateConditions();
    this.updateStatus();
  }
  
  updateMatchInfo() {
    const match = this.matchData;
    
    // Competition info
    this.element.querySelector('.competition-name').textContent = match.competition || 'Serie A';
    this.element.querySelector('.match-day').textContent = `Giornata ${match.matchday || 1}`;
    
    // Date and time
    const matchDate = new Date(match.date);
    this.element.querySelector('.date-text').textContent = matchDate.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.element.querySelector('.time-text').textContent = matchDate.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Stadium
    this.element.querySelector('.stadium-name').textContent = match.stadium || 'Stadio San Siro';
    this.element.querySelector('.attendance').textContent = 
      `Spettatori: ${(match.attendance || 75000).toLocaleString('it-IT')}`;
  }
  
  updateTeams() {
    const { homeTeam, awayTeam } = this.matchData;
    
    // Home team
    const homeTeamElement = this.element.querySelector('.home-team');
    homeTeamElement.querySelector('.team-name').textContent = homeTeam.name;
    homeTeamElement.querySelector('.team-position').textContent = 
      `${homeTeam.position}° in classifica`;
    homeTeamElement.querySelector('.logo-image').src = homeTeam.logo;
    homeTeamElement.querySelector('.logo-image').alt = `Logo ${homeTeam.name}`;
    
    // Away team
    const awayTeamElement = this.element.querySelector('.away-team');
    awayTeamElement.querySelector('.team-name').textContent = awayTeam.name;
    awayTeamElement.querySelector('.team-position').textContent = 
      `${awayTeam.position}° in classifica`;
    awayTeamElement.querySelector('.logo-image').src = awayTeam.logo;
    awayTeamElement.querySelector('.logo-image').alt = `Logo ${awayTeam.name}`;
    
    // Team form
    this.updateTeamForm(homeTeamElement, homeTeam.form);
    this.updateTeamForm(awayTeamElement, awayTeam.form);
  }
  
  updateTeamForm(teamElement, formData) {
    const formElement = teamElement.querySelector('.team-form');
    
    if (typeof formData === 'string') {
      // Simple string format like "VVVPV"
      formElement.innerHTML = '';
      formData.split('').forEach(result => {
        const span = document.createElement('span');
        span.className = `form-letter ${this.getFormClass(result)}`;
        span.textContent = result;
        formElement.appendChild(span);
      });
    } else {
      // Fallback to simple text
      formElement.textContent = formData || 'VVVPV';
    }
  }
  
  getFormClass(result) {
    switch (result.toLowerCase()) {
      case 'v': case 'w': return 'win';
      case 'p': case 'd': return 'draw';
      case 's': case 'l': return 'loss';
      default: return 'draw';
    }
  }
  
  updateScore() {
    const { homeScore, awayScore } = this.matchData;
    
    this.element.querySelector('.home-score').textContent = homeScore || 0;
    this.element.querySelector('.away-score').textContent = awayScore || 0;
  }
  
  updateConditions() {
    const match = this.matchData;
    
    // Weather
    const weatherText = this.element.querySelector('.weather-text');
    if (match.weather) {
      weatherText.textContent = `${match.weather.condition}, ${match.weather.temperature}°C`;
      this.element.querySelector('.weather-icon').textContent = this.getWeatherIcon(match.weather.condition);
    }
    
    // Referee
    this.element.querySelector('.referee-name').textContent = match.referee || 'Marco Rossi';
    
    // TV
    this.element.querySelector('.tv-channel').textContent = match.tvChannel || 'Sky Sport 1';
  }
  
  getWeatherIcon(condition) {
    const icons = {
      'sunny': '☀️',
      'cloudy': '☁️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'windy': '💨'
    };
    return icons[condition.toLowerCase()] || '☀️';
  }
  
  updateStatus() {
    const match = this.matchData;
    const statusText = this.element.querySelector('.status-text');
    const statusIndicator = this.element.querySelector('.status-indicator');
    
    // Remove existing status classes
    statusIndicator.classList.remove('live', 'finished', 'scheduled');
    
    switch (match.status) {
      case 'live':
        statusText.textContent = `${match.minute || 0}'${match.addedTime ? ` + ${match.addedTime}'` : ''}`;
        statusIndicator.classList.add('live');
        break;
      case 'finished':
        statusText.textContent = 'Finita';
        statusIndicator.classList.add('finished');
        break;
      case 'scheduled':
        statusText.textContent = 'Programmata';
        statusIndicator.classList.add('scheduled');
        break;
      case 'halftime':
        statusText.textContent = 'Intervallo';
        statusIndicator.classList.add('live');
        break;
      default:
        statusText.textContent = 'In attesa';
        statusIndicator.classList.add('scheduled');
    }
  }
  
  bindEvents() {
    // Click on team logos for team details
    this.element.querySelectorAll('.team-logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        const team = e.target.closest('.team');
        const isHome = team.classList.contains('home-team');
        this.showTeamDetails(isHome ? this.matchData.homeTeam : this.matchData.awayTeam);
      });
    });
    
    // Click on score for match details
    this.element.querySelector('.score-display').addEventListener('click', () => {
      this.showMatchDetails();
    });
    
    // Click on stadium for venue details
    this.element.querySelector('.stadium-info').addEventListener('click', () => {
      this.showVenueDetails();
    });
  }
  
  startLiveUpdates() {
    if (this.matchData.status === 'live') {
      this.updateInterval = setInterval(() => {
        this.requestLiveUpdate();
      }, 30000); // Update every 30 seconds during live matches
    }
  }
  
  stopLiveUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
  
  requestLiveUpdate() {
    // Dispatch event to request live match data
    this.element.dispatchEvent(new CustomEvent('requestLiveUpdate', {
      detail: { matchId: this.matchData.id }
    }));
  }
  
  showTeamDetails(team) {
    // Dispatch event to show team details
    this.element.dispatchEvent(new CustomEvent('showTeamDetails', {
      detail: { team }
    }));
  }
  
  showMatchDetails() {
    // Dispatch event to show detailed match info
    this.element.dispatchEvent(new CustomEvent('showMatchDetails', {
      detail: { match: this.matchData }
    }));
  }
  
  showVenueDetails() {
    // Dispatch event to show venue details
    this.element.dispatchEvent(new CustomEvent('showVenueDetails', {
      detail: { 
        stadium: this.matchData.stadium,
        attendance: this.matchData.attendance 
      }
    }));
  }
  
  // Public methods
  updateMatchData(newData) {
    this.matchData = { ...this.matchData, ...newData };
    this.render();
    
    // Restart live updates if match becomes live
    if (newData.status === 'live' && !this.updateInterval) {
      this.startLiveUpdates();
    } else if (newData.status !== 'live' && this.updateInterval) {
      this.stopLiveUpdates();
    }
  }
  
  getMatchData() {
    return this.matchData;
  }
  
  setScore(homeScore, awayScore) {
    this.matchData.homeScore = homeScore;
    this.matchData.awayScore = awayScore;
    this.updateScore();
  }
  
  setStatus(status, minute = null, addedTime = null) {
    this.matchData.status = status;
    if (minute !== null) this.matchData.minute = minute;
    if (addedTime !== null) this.matchData.addedTime = addedTime;
    this.updateStatus();
  }
  
  destroy() {
    this.stopLiveUpdates();
  }
}

// Sample match data structure
const SAMPLE_MATCH_DATA = {
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
    name: 'Inter Milan',
    logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80',
    position: 2,
    form: 'VVPVV'
  },
  homeScore: 2,
  awayScore: 1,
  status: 'live',
  minute: 90,
  addedTime: 3,
  weather: {
    condition: 'sunny',
    temperature: 18
  },
  referee: 'Marco Rossi',
  tvChannel: 'Sky Sport 1'
};

export default MatchHeader;