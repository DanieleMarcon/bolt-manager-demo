export const template = `
<div class="player-rating-card card">
  <div class="rating-header">
    <div class="player-info-rating">
      <img src="" alt="Player photo" class="player-photo-rating" loading="lazy">
      <div class="player-details-rating">
        <h3 class="player-name-rating"></h3>
        <span class="player-position-rating"></span>
      </div>
    </div>
    
    <div class="overall-rating">
      <div class="rating-circle">
        <span class="rating-number"></span>
      </div>
      <span class="rating-label">Voto</span>
    </div>
  </div>
  
  <div class="performance-breakdown">
    <h4>Dettaglio Performance</h4>
    <div class="performance-stats">
      <div class="stat-row">
        <span class="stat-name">Attacco</span>
        <div class="stat-bar">
          <div class="stat-fill attack-rating"></div>
        </div>
        <span class="stat-value attack-value">7.5</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-name">Difesa</span>
        <div class="stat-bar">
          <div class="stat-fill defense-rating"></div>
        </div>
        <span class="stat-value defense-value">6.8</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-name">Passaggi</span>
        <div class="stat-bar">
          <div class="stat-fill passing-rating"></div>
        </div>
        <span class="stat-value passing-value">8.2</span>
      </div>
      
      <div class="stat-row">
        <span class="stat-name">Fisico</span>
        <div class="stat-bar">
          <div class="stat-fill physical-rating"></div>
        </div>
        <span class="stat-value physical-value">7.0</span>
      </div>
    </div>
  </div>
  
  <div class="match-statistics">
    <h4>Statistiche Partita</h4>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-number goals-scored">0</span>
        <span class="stat-label">Gol</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-number assists-made">0</span>
        <span class="stat-label">Assist</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-number passes-completed">45</span>
        <span class="stat-label">Passaggi</span>
      </div>
      
      <div class="stat-item">
        <span class="stat-number tackles-won">3</span>
        <span class="stat-label">Contrasti</span>
      </div>
    </div>
  </div>
  
  <div class="performance-highlights">
    <h4>Momenti Salienti</h4>
    <div class="highlights-list">
      <!-- Highlights will be populated dynamically -->
    </div>
  </div>
  
  <div class="rating-actions">
    <button class="button button-ghost view-details-btn">
      📊 Dettagli Completi
    </button>
    <button class="button button-secondary compare-btn">
      ⚖️ Confronta
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-rating">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=150&h=30" 
         alt="Player Rating Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.player-rating-card {
  position: relative;
  min-height: 400px;
}

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.player-info-rating {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.player-photo-rating {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border);
}

.player-details-rating {
  flex: 1;
}

.player-name-rating {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.player-position-rating {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.overall-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rating-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  position: relative;
}

.rating-circle.excellent {
  background: linear-gradient(135deg, #10b981, #059669);
}

.rating-circle.good {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.rating-circle.average {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.rating-circle.poor {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.rating-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.performance-breakdown {
  margin-bottom: 20px;
}

.performance-breakdown h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.performance-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-name {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 60px;
  font-weight: 500;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.attack-rating {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.defense-rating {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.passing-rating {
  background: linear-gradient(90deg, #10b981, #059669);
}

.physical-rating {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.stat-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 30px;
  text-align: right;
}

.match-statistics {
  margin-bottom: 20px;
}

.match-statistics h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.performance-highlights {
  margin-bottom: 20px;
}

.performance-highlights h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--background);
  border-radius: 4px;
  font-size: 12px;
}

.highlight-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.highlight-text {
  flex: 1;
  color: var(--text);
}

.highlight-time {
  font-weight: 600;
  color: var(--primary);
  font-size: 11px;
}

.rating-actions {
  display: flex;
  gap: 8px;
}

.rating-actions button {
  flex: 1;
  padding: 8px 12px;
  font-size: 12px;
}

.sponsor-slot-rating {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 100px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .rating-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .rating-actions {
    flex-direction: column;
  }
  
  .sponsor-slot-rating {
    position: static;
    width: 100%;
    margin-top: 12px;
  }
}
</style>
`;

class PlayerRatingCard {
  constructor(element, playerData) {
    this.element = element;
    this.playerData = playerData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.animateRatings();
  }
  
  render() {
    const player = this.playerData.player;
    const performance = this.playerData.performance;
    
    // Update player info
    this.element.querySelector('.player-photo-rating').src = player.photo;
    this.element.querySelector('.player-name-rating').textContent = player.name;
    this.element.querySelector('.player-position-rating').textContent = player.position;
    
    // Update overall rating
    this.updateOverallRating(performance.overall_rating);
    
    // Update performance breakdown
    this.updatePerformanceBreakdown(performance.breakdown);
    
    // Update match statistics
    this.updateMatchStatistics(performance.statistics);
    
    // Update highlights
    this.updateHighlights(performance.highlights);
  }
  
  updateOverallRating(rating) {
    const ratingCircle = this.element.querySelector('.rating-circle');
    const ratingNumber = this.element.querySelector('.rating-number');
    
    ratingNumber.textContent = rating.toFixed(1);
    
    // Apply rating class based on value
    ratingCircle.classList.remove('excellent', 'good', 'average', 'poor');
    
    if (rating >= 8.5) {
      ratingCircle.classList.add('excellent');
    } else if (rating >= 7.0) {
      ratingCircle.classList.add('good');
    } else if (rating >= 6.0) {
      ratingCircle.classList.add('average');
    } else {
      ratingCircle.classList.add('poor');
    }
  }
  
  updatePerformanceBreakdown(breakdown) {
    const categories = ['attack', 'defense', 'passing', 'physical'];
    
    categories.forEach(category => {
      const value = breakdown[category] || 0;
      const fill = this.element.querySelector(`.${category}-rating`);
      const valueElement = this.element.querySelector(`.${category}-value`);
      
      fill.style.width = `${(value / 10) * 100}%`;
      valueElement.textContent = value.toFixed(1);
    });
  }
  
  updateMatchStatistics(statistics) {
    this.element.querySelector('.goals-scored').textContent = statistics.goals || 0;
    this.element.querySelector('.assists-made').textContent = statistics.assists || 0;
    this.element.querySelector('.passes-completed').textContent = statistics.passes || 0;
    this.element.querySelector('.tackles-won').textContent = statistics.tackles || 0;
  }
  
  updateHighlights(highlights) {
    const container = this.element.querySelector('.highlights-list');
    container.innerHTML = '';
    
    highlights.forEach(highlight => {
      const item = document.createElement('div');
      item.className = 'highlight-item';
      
      item.innerHTML = `
        <span class="highlight-icon">${this.getHighlightIcon(highlight.type)}</span>
        <span class="highlight-text">${highlight.description}</span>
        <span class="highlight-time">${highlight.time}'</span>
      `;
      
      container.appendChild(item);
    });
  }
  
  getHighlightIcon(type) {
    const icons = {
      goal: '⚽',
      assist: '🎯',
      save: '🥅',
      tackle: '💪',
      pass: '📍',
      shot: '🎯',
      card: '🟨',
      substitution: '🔄'
    };
    return icons[type] || '⭐';
  }
  
  animateRatings() {
    setTimeout(() => {
      this.element.querySelectorAll('.stat-fill').forEach(fill => {
        fill.style.transition = 'width 1s ease-out';
      });
    }, 100);
  }
  
  bindEvents() {
    // View details button
    this.element.querySelector('.view-details-btn').addEventListener('click', () => {
      this.showDetailedStats();
    });
    
    // Compare button
    this.element.querySelector('.compare-btn').addEventListener('click', () => {
      this.showComparison();
    });
    
    // Card click for quick view
    this.element.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.showQuickStats();
      }
    });
  }
  
  showDetailedStats() {
    window.dispatchEvent(new CustomEvent('showPlayerDetailedStats', {
      detail: { 
        playerId: this.playerData.player.id,
        performance: this.playerData.performance 
      }
    }));
  }
  
  showComparison() {
    window.dispatchEvent(new CustomEvent('showPlayerComparison', {
      detail: { 
        playerId: this.playerData.player.id,
        performance: this.playerData.performance 
      }
    }));
  }
  
  showQuickStats() {
    window.dispatchEvent(new CustomEvent('showPlayerQuickStats', {
      detail: { 
        playerId: this.playerData.player.id,
        performance: this.playerData.performance 
      }
    }));
  }
  
  // Public methods
  updateRating(newPerformance) {
    this.playerData.performance = newPerformance;
    this.render();
    this.animateRatings();
  }
  
  getRating() {
    return this.playerData.performance.overall_rating;
  }
  
  getPerformanceData() {
    return this.playerData.performance;
  }
}

export default PlayerRatingCard;