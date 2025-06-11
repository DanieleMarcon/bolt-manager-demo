<div class="match-summary-card card">
  <div class="summary-header">
    <div class="match-result">
      <div class="team-result home-team">
        <img src="" alt="Home team logo" class="team-logo-small">
        <span class="team-name-result"></span>
        <span class="team-score-large home-score"></span>
      </div>
      
      <div class="result-separator">
        <span class="vs-text">VS</span>
        <div class="match-date-result"></div>
      </div>
      
      <div class="team-result away-team">
        <span class="team-score-large away-score"></span>
        <span class="team-name-result"></span>
        <img src="" alt="Away team logo" class="team-logo-small">
      </div>
    </div>
    
    <div class="match-info-summary">
      <div class="info-item">
        <span class="info-icon">🏟️</span>
        <span class="info-text stadium-name"></span>
      </div>
      <div class="info-item">
        <span class="info-icon">👥</span>
        <span class="info-text attendance-count"></span>
      </div>
      <div class="info-item">
        <span class="info-icon">👨‍⚖️</span>
        <span class="info-text referee-name"></span>
      </div>
    </div>
  </div>
  
  <div class="summary-stats">
    <div class="stat-comparison-row">
      <span class="home-stat-value">58%</span>
      <span class="stat-name">Possesso Palla</span>
      <span class="away-stat-value">42%</span>
    </div>
    
    <div class="stat-comparison-row">
      <span class="home-stat-value">12</span>
      <span class="stat-name">Tiri Totali</span>
      <span class="away-stat-value">8</span>
    </div>
    
    <div class="stat-comparison-row">
      <span class="home-stat-value">6</span>
      <span class="stat-name">Tiri in Porta</span>
      <span class="away-stat-value">4</span>
    </div>
    
    <div class="stat-comparison-row">
      <span class="home-stat-value">2</span>
      <span class="stat-name">Cartellini</span>
      <span class="away-stat-value">3</span>
    </div>
  </div>
  
  <div class="match-highlights">
    <h4>Momenti Salienti</h4>
    <div class="highlights-list">
      <!-- Highlights will be populated dynamically -->
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-summary">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Match Summary Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.match-summary-card {
  position: relative;
  margin-bottom: 24px;
}

.summary-header {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.match-result {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.team-result {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.away-team {
  flex-direction: row-reverse;
}

.team-logo-small {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--border);
}

.team-name-result {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.team-score-large {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary);
  min-width: 60px;
  text-align: center;
}

.result-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
}

.vs-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.match-date-result {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
}

.match-info-summary {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.info-icon {
  font-size: 14px;
}

.summary-stats {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.stat-comparison-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.stat-comparison-row:last-child {
  border-bottom: none;
}

.home-stat-value {
  font-weight: 600;
  color: var(--primary);
  min-width: 60px;
  text-align: center;
}

.away-stat-value {
  font-weight: 600;
  color: var(--secondary);
  min-width: 60px;
  text-align: center;
}

.stat-name {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
  flex: 1;
  text-align: center;
}

.match-highlights h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
  border-left: 3px solid var(--primary);
}

.highlight-time {
  font-weight: 600;
  color: var(--primary);
  min-width: 30px;
  font-size: 12px;
}

.highlight-text {
  flex: 1;
  font-size: 13px;
  color: var(--text);
}

.sponsor-slot-summary {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .match-result {
    flex-direction: column;
    gap: 16px;
  }
  
  .team-result {
    justify-content: center;
  }
  
  .away-team {
    flex-direction: row;
  }
  
  .result-separator {
    order: -1;
  }
  
  .match-info-summary {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-summary {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class MatchSummaryCard {
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
    
    // Update team info
    this.element.querySelector('.home-team .team-logo-small').src = match.homeTeam.logo;
    this.element.querySelector('.away-team .team-logo-small').src = match.awayTeam.logo;
    this.element.querySelector('.home-team .team-name-result').textContent = match.homeTeam.name;
    this.element.querySelector('.away-team .team-name-result').textContent = match.awayTeam.name;
    
    // Update scores
    this.element.querySelector('.home-score').textContent = match.homeScore;
    this.element.querySelector('.away-score').textContent = match.awayScore;
    
    // Update match info
    this.element.querySelector('.match-date-result').textContent = new Date(match.date).toLocaleDateString('it-IT');
    this.element.querySelector('.stadium-name').textContent = match.stadium;
    this.element.querySelector('.attendance-count').textContent = match.attendance?.toLocaleString();
    this.element.querySelector('.referee-name').textContent = match.referee;
    
    // Update stats
    this.updateStats(match.stats);
    
    // Update highlights
    this.updateHighlights(match.highlights);
  }
  
  updateStats(stats) {
    const rows = this.element.querySelectorAll('.stat-comparison-row');
    
    if (stats.possession) {
      rows[0].querySelector('.home-stat-value').textContent = `${stats.possession.home}%`;
      rows[0].querySelector('.away-stat-value').textContent = `${stats.possession.away}%`;
    }
    
    if (stats.shots) {
      rows[1].querySelector('.home-stat-value').textContent = stats.shots.home;
      rows[1].querySelector('.away-stat-value').textContent = stats.shots.away;
    }
    
    if (stats.shotsOnTarget) {
      rows[2].querySelector('.home-stat-value').textContent = stats.shotsOnTarget.home;
      rows[2].querySelector('.away-stat-value').textContent = stats.shotsOnTarget.away;
    }
    
    if (stats.cards) {
      rows[3].querySelector('.home-stat-value').textContent = stats.cards.home;
      rows[3].querySelector('.away-stat-value').textContent = stats.cards.away;
    }
  }
  
  updateHighlights(highlights) {
    const container = this.element.querySelector('.highlights-list');
    container.innerHTML = '';
    
    highlights.forEach(highlight => {
      const item = document.createElement('div');
      item.className = 'highlight-item';
      item.innerHTML = `
        <span class="highlight-time">${highlight.time}'</span>
        <span class="highlight-text">${highlight.description}</span>
      `;
      container.appendChild(item);
    });
  }
  
  bindEvents() {
    // Add click handlers for interactive elements
    this.element.addEventListener('click', () => {
      this.showDetailedReport();
    });
  }
  
  showDetailedReport() {
    window.dispatchEvent(new CustomEvent('showMatchReport', {
      detail: { matchData: this.matchData }
    }));
  }
}

// Auto-initialize match summary cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.match-summary-card').forEach(card => {
    if (!card.dataset.initialized) {
      const matchData = JSON.parse(card.dataset.matchData || '{}');
      new MatchSummaryCard(card, matchData);
      card.dataset.initialized = 'true';
    }
  });
});
</script>