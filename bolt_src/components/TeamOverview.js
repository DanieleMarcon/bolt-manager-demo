export const template = `
<div class="team-overview card">
  <div class="team-overview-header">
    <div class="team-logo">
      <img src="" alt="Team logo" class="team-logo-image">
    </div>
    <div class="team-basic-info">
      <h2 class="team-name"></h2>
      <p class="team-league"></p>
    </div>
    <div class="team-position">
      <span class="position-label">Posizione</span>
      <span class="position-value"></span>
    </div>
  </div>
  
  <div class="team-stats-grid">
    <div class="stat-card">
      <div class="stat-icon">⚽</div>
      <div class="stat-content">
        <span class="stat-value matches-played">0</span>
        <span class="stat-label">Partite</span>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🏆</div>
      <div class="stat-content">
        <span class="stat-value wins">0</span>
        <span class="stat-label">Vittorie</span>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">🤝</div>
      <div class="stat-content">
        <span class="stat-value draws">0</span>
        <span class="stat-label">Pareggi</span>
      </div>
    </div>
    
    <div class="stat-card">
      <div class="stat-icon">❌</div>
      <div class="stat-content">
        <span class="stat-value losses">0</span>
        <span class="stat-label">Sconfitte</span>
      </div>
    </div>
  </div>
  
  <div class="team-performance-section">
    <h3>Performance Squadra</h3>
    <div class="performance-metrics">
      <div class="metric-item">
        <span class="metric-label">Morale Medio</span>
        <div class="morale-indicator-large" data-morale="0">
          <div class="morale-fill"></div>
          <span class="morale-text">0%</span>
        </div>
      </div>
      
      <div class="metric-item">
        <span class="metric-label">Forma Fisica</span>
        <div class="fitness-indicator-large" data-fitness="0">
          <div class="fitness-fill"></div>
          <span class="fitness-text">0%</span>
        </div>
      </div>
      
      <div class="metric-item">
        <span class="metric-label">Efficacia Tattica</span>
        <div class="tactics-indicator-large" data-tactics="0">
          <div class="tactics-fill"></div>
          <span class="tactics-text">0%</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="team-budget-section">
    <h3>Budget</h3>
    <div class="budget-info">
      <div class="budget-item">
        <span class="budget-label">Disponibile</span>
        <span class="budget-value available-budget">€0</span>
      </div>
      <div class="budget-item">
        <span class="budget-label">Stipendi</span>
        <span class="budget-value wage-budget">€0</span>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot principale -->
  <div class="sponsor-slot sponsor-slot-large">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=80" 
         alt="Main Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.team-overview {
  position: relative;
  background: linear-gradient(135deg, var(--surface) 0%, #f1f5f9 100%);
  border: 2px solid var(--border);
  margin-bottom: 24px;
}

.team-overview-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.team-logo {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--border);
}

.team-logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-basic-info {
  flex: 1;
}

.team-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: var(--text);
}

.team-league {
  font-size: 16px;
  color: var(--text-muted);
  margin: 0;
}

.team-position {
  text-align: center;
  padding: 12px;
  background: var(--primary);
  color: white;
  border-radius: 8px;
  min-width: 80px;
}

.position-label {
  display: block;
  font-size: 12px;
  opacity: 0.9;
}

.position-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
}

.team-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  border-radius: 8px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.team-performance-section,
.team-budget-section {
  margin-bottom: 24px;
}

.team-performance-section h3,
.team-budget-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.performance-metrics {
  display: grid;
  gap: 16px;
}

.metric-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.metric-label {
  font-weight: 500;
  color: var(--text);
  min-width: 120px;
}

.morale-indicator-large,
.fitness-indicator-large,
.tactics-indicator-large {
  position: relative;
  flex: 1;
  height: 24px;
  background: var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.morale-fill,
.fitness-fill,
.tactics-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 12px;
}

.morale-fill {
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
}

.fitness-fill {
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
}

.tactics-fill {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.morale-text,
.fitness-text,
.tactics-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.budget-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.budget-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.budget-label {
  font-weight: 500;
  color: var(--text-muted);
}

.budget-value {
  font-weight: 700;
  color: var(--text);
}

.available-budget {
  color: var(--success);
}

.sponsor-slot-large {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 200px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
}

/* Responsive */
@media (max-width: 1024px) {
  .team-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .sponsor-slot-large {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}

@media (max-width: 768px) {
  .team-overview-header {
    flex-direction: column;
    text-align: center;
  }
  
  .team-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .budget-info {
    grid-template-columns: 1fr;
  }
  
  .metric-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .metric-label {
    min-width: auto;
    text-align: center;
  }
}
</style>
`;

class TeamOverview {
  constructor(element, teamData) {
    this.element = element;
    this.teamData = teamData;
    this.init();
  }
  
  init() {
    this.render();
    this.startPerformanceAnimation();
  }
  
  render() {
    const { team, stats, budget } = this.teamData;
    
    // Basic team info
    this.element.querySelector('.team-logo-image').src = team.logo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=160&h=160';
    this.element.querySelector('.team-logo-image').alt = `Logo ${team.name}`;
    this.element.querySelector('.team-name').textContent = team.name;
    this.element.querySelector('.team-league').textContent = team.league || 'Serie A';
    this.element.querySelector('.position-value').textContent = `${team.position || 1}°`;
    
    // Match statistics
    this.element.querySelector('.matches-played').textContent = stats.matches_played || 0;
    this.element.querySelector('.wins').textContent = stats.wins || 0;
    this.element.querySelector('.draws').textContent = stats.draws || 0;
    this.element.querySelector('.losses').textContent = stats.losses || 0;
    
    // Performance metrics
    this.updatePerformanceMetric('morale', stats.average_morale || 0);
    this.updatePerformanceMetric('fitness', stats.average_fitness || 0);
    this.updatePerformanceMetric('tactics', stats.tactical_effectiveness || 0);
    
    // Budget info
    this.element.querySelector('.available-budget').textContent = this.formatCurrency(budget.available || 0);
    this.element.querySelector('.wage-budget').textContent = this.formatCurrency(budget.wages || 0);
    
    // Accessibility
    this.element.setAttribute('aria-label', `Panoramica squadra ${team.name}`);
  }
  
  updatePerformanceMetric(type, value) {
    const indicator = this.element.querySelector(`.${type}-indicator-large`);
    const fill = indicator.querySelector(`.${type}-fill`);
    const text = indicator.querySelector(`.${type}-text`);
    
    indicator.dataset[type] = value;
    fill.style.width = `${value}%`;
    text.textContent = `${Math.round(value)}%`;
    
    // Add color classes based on value
    indicator.className = `${type}-indicator-large ${this.getPerformanceClass(value)}`;
  }
  
  getPerformanceClass(value) {
    if (value >= 80) return 'performance-excellent';
    if (value >= 60) return 'performance-good';
    if (value >= 40) return 'performance-average';
    if (value >= 20) return 'performance-poor';
    return 'performance-terrible';
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  startPerformanceAnimation() {
    // Animate performance bars on load
    setTimeout(() => {
      const fills = this.element.querySelectorAll('.morale-fill, .fitness-fill, .tactics-fill');
      fills.forEach(fill => {
        fill.style.transition = 'width 1s ease-out';
      });
    }, 100);
  }
  
  updateTeamData(newData) {
    this.teamData = { ...this.teamData, ...newData };
    this.render();
  }
}

export default TeamOverview;