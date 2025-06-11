<div class="player-card card" data-player-id="">
  <div class="player-card-header">
    <div class="player-avatar">
      <img src="" alt="Player photo" class="player-photo" loading="lazy">
      <div class="player-position-badge"></div>
    </div>
    <div class="player-basic-info">
      <h3 class="player-name"></h3>
      <span class="player-age"></span>
    </div>
  </div>
  
  <div class="player-card-body">
    <div class="player-stats-grid">
      <div class="stat-item">
        <span class="stat-label">Rating</span>
        <span class="stat-value player-rating"></span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Forma</span>
        <div class="fitness-bar">
          <div class="fitness-fill"></div>
        </div>
      </div>
    </div>
    
    <div class="player-status-indicators">
      <div class="morale-indicator-mini"></div>
      <div class="injury-status-mini"></div>
    </div>
  </div>
  
  <div class="player-card-actions">
    <button class="button button-ghost button-sm view-details-btn" aria-label="Visualizza dettagli giocatore">
      👁️ Dettagli
    </button>
    <button class="button button-secondary button-sm train-player-btn" aria-label="Allena giocatore">
      🏃 Allena
    </button>
  </div>
  
  <!-- Sponsor slot integrato -->
  <div class="sponsor-slot sponsor-slot-mini">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=50" 
         alt="Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.player-card {
  position: relative;
  min-height: 280px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.player-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.player-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.player-avatar {
  position: relative;
  width: 60px;
  height: 60px;
}

.player-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.player-position-badge {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--surface);
}

.player-basic-info {
  flex: 1;
}

.player-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.player-age {
  font-size: 14px;
  color: var(--text-muted);
}

.player-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

.player-rating {
  color: var(--primary);
}

.fitness-bar {
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.fitness-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  transition: width 0.3s ease;
}

.player-status-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.player-card-actions {
  display: flex;
  gap: 8px;
}

.button-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.sponsor-slot-mini {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 60px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0.8;
}

.sponsor-slot-mini:hover {
  opacity: 1;
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 768px) {
  .player-card {
    min-height: 240px;
  }
  
  .player-stats-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .player-card-actions {
    flex-direction: column;
  }
}
</style>

<script>
class PlayerCard {
  constructor(element, playerData) {
    this.element = element;
    this.playerData = playerData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    const { player } = this.playerData;
    
    // Set player data
    this.element.dataset.playerId = player.id;
    this.element.querySelector('.player-photo').src = player.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120';
    this.element.querySelector('.player-photo').alt = `Foto di ${player.name}`;
    this.element.querySelector('.player-position-badge').textContent = player.position;
    this.element.querySelector('.player-name').textContent = player.name;
    this.element.querySelector('.player-age').textContent = `${player.age} anni`;
    this.element.querySelector('.player-rating').textContent = player.overall_rating;
    
    // Set fitness bar
    const fitnessPercentage = (player.fitness / 100) * 100;
    this.element.querySelector('.fitness-fill').style.width = `${fitnessPercentage}%`;
    
    // Set status indicators
    this.updateMoraleIndicator(player.morale);
    this.updateInjuryStatus(player.injury_status);
    
    // Set accessibility
    this.element.setAttribute('aria-label', `Giocatore ${player.name}, ${player.position}, Rating ${player.overall_rating}`);
  }
  
  updateMoraleIndicator(morale) {
    const indicator = this.element.querySelector('.morale-indicator-mini');
    indicator.className = `morale-indicator-mini morale-${this.getMoraleLevel(morale)}`;
    indicator.setAttribute('aria-label', `Morale: ${morale}/100`);
  }
  
  updateInjuryStatus(injuryStatus) {
    const indicator = this.element.querySelector('.injury-status-mini');
    if (injuryStatus && injuryStatus !== 'healthy') {
      indicator.innerHTML = '🤕';
      indicator.setAttribute('aria-label', `Infortunato: ${injuryStatus}`);
    } else {
      indicator.innerHTML = '✅';
      indicator.setAttribute('aria-label', 'In forma');
    }
  }
  
  getMoraleLevel(morale) {
    if (morale >= 80) return 'excellent';
    if (morale >= 60) return 'good';
    if (morale >= 40) return 'average';
    if (morale >= 20) return 'poor';
    return 'terrible';
  }
  
  bindEvents() {
    // View details
    this.element.querySelector('.view-details-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.showPlayerDetails();
    });
    
    // Train player
    this.element.querySelector('.train-player-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.trainPlayer();
    });
    
    // Card click
    this.element.addEventListener('click', () => {
      this.showPlayerDetails();
    });
    
    // Keyboard support
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.showPlayerDetails();
      }
    });
  }
  
  showPlayerDetails() {
    // Trigger player details modal
    window.dispatchEvent(new CustomEvent('showPlayerDetails', {
      detail: { playerId: this.playerData.player.id }
    }));
  }
  
  trainPlayer() {
    // Trigger training flow
    window.dispatchEvent(new CustomEvent('trainPlayer', {
      detail: { playerId: this.playerData.player.id }
    }));
  }
}

// Auto-initialize player cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.player-card').forEach(card => {
    if (!card.dataset.initialized) {
      // Player data would be passed from the parent component
      const playerData = JSON.parse(card.dataset.playerData || '{}');
      new PlayerCard(card, playerData);
      card.dataset.initialized = 'true';
    }
  });
});
</script>