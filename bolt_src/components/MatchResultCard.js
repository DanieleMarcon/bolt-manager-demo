export const template = `
<div class="match-result-card card">
  <div class="result-header">
    <div class="competition-info">
      <span class="competition-name">Serie A</span>
      <span class="match-day">Giornata 15</span>
    </div>
    <div class="match-date">15/01/2025</div>
  </div>
  
  <div class="match-result">
    <div class="team-result home-team">
      <img src="" alt="Home team logo" class="team-logo">
      <span class="team-name"></span>
      <span class="team-score"></span>
    </div>
    
    <div class="result-separator">
      <span class="vs-text">VS</span>
    </div>
    
    <div class="team-result away-team">
      <span class="team-score"></span>
      <span class="team-name"></span>
      <img src="" alt="Away team logo" class="team-logo">
    </div>
  </div>
  
  <div class="match-stats-mini">
    <div class="stat-row">
      <span class="home-stat possession-home">0%</span>
      <span class="stat-name">Possesso</span>
      <span class="away-stat possession-away">0%</span>
    </div>
    <div class="stat-row">
      <span class="home-stat shots-home">0</span>
      <span class="stat-name">Tiri</span>
      <span class="away-stat shots-away">0</span>
    </div>
  </div>
  
  <div class="match-actions">
    <button class="button button-ghost view-details-btn" aria-label="Visualizza dettagli partita">
      📊 Dettagli
    </button>
    <button class="button button-secondary replay-btn" aria-label="Rivedi partita">
      🎮 Rivedi
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-mini">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=120&h=30" 
         alt="Match Result Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.match-result-card {
  position: relative;
  transition: all 0.2s ease;
}

.match-result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.competition-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.competition-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.match-day {
  font-size: 12px;
  color: var(--text-muted);
}

.match-date {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.match-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.team-result {
  display: flex;
  align-items: center;
  gap: 12px;
}

.team-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid var(--border);
}

.team-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.team-score {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  min-width: 30px;
  text-align: center;
}

.result-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.vs-text {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.match-stats-mini {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.home-stat {
  font-weight: 600;
  color: var(--primary);
  min-width: 40px;
  text-align: center;
}

.away-stat {
  font-weight: 600;
  color: var(--secondary);
  min-width: 40px;
  text-align: center;
}

.stat-name {
  font-size: 12px;
  color: var(--text-muted);
  flex: 1;
  text-align: center;
}

.match-actions {
  display: flex;
  gap: 8px;
}

.button {
  flex: 1;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.button-ghost:hover {
  background: var(--background);
}

.button-secondary {
  background: var(--secondary);
  border: 1px solid var(--secondary);
  color: white;
}

.button-secondary:hover {
  background: #059669;
}

.sponsor-slot-mini {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 80px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .match-result {
    flex-direction: column;
    gap: 12px;
  }
  
  .team-result {
    width: 100%;
    justify-content: space-between;
  }
  
  .result-separator {
    display: none;
  }
  
  .match-actions {
    flex-direction: column;
  }
}
</style>
`;

class MatchResultCard {
  constructor(element, matchData) {
    this.element = element;
    this.matchData = matchData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    const match = this.matchData;
    
    // Update competition info
    this.element.querySelector('.competition-name').textContent = match.competition || 'Serie A';
    this.element.querySelector('.match-day').textContent = `Giornata ${match.matchday || 1}`;
    
    // Update match date
    const matchDate = new Date(match.date);
    this.element.querySelector('.match-date').textContent = this.formatDate(matchDate);
    
    // Update team info
    this.element.querySelector('.home-team .team-logo').src = match.homeTeam.logo;
    this.element.querySelector('.home-team .team-logo').alt = `Logo ${match.homeTeam.name}`;
    this.element.querySelector('.home-team .team-name').textContent = match.homeTeam.name;
    this.element.querySelector('.home-team .team-score').textContent = match.homeScore;
    
    this.element.querySelector('.away-team .team-logo').src = match.awayTeam.logo;
    this.element.querySelector('.away-team .team-logo').alt = `Logo ${match.awayTeam.name}`;
    this.element.querySelector('.away-team .team-name').textContent = match.awayTeam.name;
    this.element.querySelector('.away-team .team-score').textContent = match.awayScore;
    
    // Update stats
    this.element.querySelector('.possession-home').textContent = `${match.stats?.possession?.home || 50}%`;
    this.element.querySelector('.possession-away').textContent = `${match.stats?.possession?.away || 50}%`;
    this.element.querySelector('.shots-home').textContent = match.stats?.shots?.home || 0;
    this.element.querySelector('.shots-away').textContent = match.stats?.shots?.away || 0;
  }
  
  formatDate(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  bindEvents() {
    // View details button
    this.element.querySelector('.view-details-btn').addEventListener('click', () => {
      this.viewDetails();
    });
    
    // Replay button
    this.element.querySelector('.replay-btn').addEventListener('click', () => {
      this.replayMatch();
    });
    
    // Card click
    this.element.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.viewDetails();
      }
    });
  }
  
  viewDetails() {
    // Dispatch view details event
    window.dispatchEvent(new CustomEvent('viewMatchDetails', {
      detail: { matchId: this.matchData.id }
    }));
  }
  
  replayMatch() {
    // Dispatch replay match event
    window.dispatchEvent(new CustomEvent('replayMatch', {
      detail: { matchId: this.matchData.id }
    }));
  }
  
  // Public methods
  updateMatchData(newData) {
    this.matchData = { ...this.matchData, ...newData };
    this.render();
  }
  
  getMatchData() {
    return { ...this.matchData };
  }
  
  getResult() {
    const homeScore = this.matchData.homeScore;
    const awayScore = this.matchData.awayScore;
    
    if (homeScore > awayScore) {
      return 'home';
    } else if (awayScore > homeScore) {
      return 'away';
    } else {
      return 'draw';
    }
  }
}

export default MatchResultCard;