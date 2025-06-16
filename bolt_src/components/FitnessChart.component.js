/**
 * FitnessChart Component
 * 
 * Used in: TrainingManagement.page.js
 * Purpose: Display fitness progression chart for players
 * Dataset: attributes_history (fitness progression over time)
 */

export default class FitnessChart {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.playerId = props.playerId;
    this.timeRange = props.timeRange || 30; // days
    this.data = props.data || this.generateMockData();
    
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="fitness-chart">
        <div class="chart-header">
          <h4 class="chart-title">Progressione Fitness</h4>
          <div class="chart-controls">
            <select class="time-range-select">
              <option value="7" ${this.timeRange === 7 ? 'selected' : ''}>7 giorni</option>
              <option value="30" ${this.timeRange === 30 ? 'selected' : ''}>30 giorni</option>
              <option value="90" ${this.timeRange === 90 ? 'selected' : ''}>90 giorni</option>
            </select>
          </div>
        </div>
        
        <div class="chart-container">
          <svg class="fitness-svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
            <!-- Grid lines -->
            <defs>
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <!-- Y-axis labels -->
            <g class="y-axis">
              <text x="15" y="25" text-anchor="middle" class="axis-label">100</text>
              <text x="15" y="75" text-anchor="middle" class="axis-label">75</text>
              <text x="15" y="125" text-anchor="middle" class="axis-label">50</text>
              <text x="15" y="175" text-anchor="middle" class="axis-label">25</text>
            </g>
            
            <!-- Fitness line -->
            <polyline
              fill="none"
              stroke="#10b981"
              stroke-width="2"
              points="${this.generateChartPoints()}"
              class="fitness-line"
            />
            
            <!-- Data points -->
            ${this.generateDataPoints()}
          </svg>
        </div>
        
        <div class="chart-stats">
          <div class="stat-item">
            <span class="stat-label">Attuale</span>
            <span class="stat-value">${this.getCurrentFitness()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Variazione</span>
            <span class="stat-value ${this.getFitnessChange() >= 0 ? 'positive' : 'negative'}">
              ${this.getFitnessChange() >= 0 ? '+' : ''}${this.getFitnessChange()}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Trend</span>
            <span class="stat-value">${this.getTrend()}</span>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  bindEvents() {
    const timeRangeSelect = this.container.querySelector('.time-range-select');
    timeRangeSelect?.addEventListener('change', (e) => {
      this.timeRange = parseInt(e.target.value);
      this.data = this.generateMockData();
      this.render();
    });
  }

  generateMockData() {
    const data = [];
    const now = new Date();
    
    for (let i = this.timeRange; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate realistic fitness progression
      const baseValue = 70;
      const variation = Math.sin(i * 0.1) * 10 + Math.random() * 5;
      const trend = (this.timeRange - i) * 0.2; // slight upward trend
      
      data.push({
        date: date.toISOString().split('T')[0],
        fitness: Math.max(0, Math.min(100, baseValue + variation + trend))
      });
    }
    
    return data;
  }

  generateChartPoints() {
    const points = this.data.map((point, index) => {
      const x = 30 + (index * (340 / (this.data.length - 1)));
      const y = 180 - (point.fitness * 1.5); // Scale to chart height
      return `${x},${y}`;
    });
    
    return points.join(' ');
  }

  generateDataPoints() {
    return this.data.map((point, index) => {
      const x = 30 + (index * (340 / (this.data.length - 1)));
      const y = 180 - (point.fitness * 1.5);
      
      return `
        <circle 
          cx="${x}" 
          cy="${y}" 
          r="3" 
          fill="#10b981" 
          class="data-point"
          data-fitness="${point.fitness}"
          data-date="${point.date}"
        >
          <title>Fitness: ${point.fitness.toFixed(1)} - ${point.date}</title>
        </circle>
      `;
    }).join('');
  }

  getCurrentFitness() {
    return this.data.length > 0 ? this.data[this.data.length - 1].fitness.toFixed(1) : '0';
  }

  getFitnessChange() {
    if (this.data.length < 2) return 0;
    const current = this.data[this.data.length - 1].fitness;
    const previous = this.data[0].fitness;
    return (current - previous).toFixed(1);
  }

  getTrend() {
    const change = this.getFitnessChange();
    if (change > 2) return '📈 In crescita';
    if (change < -2) return '📉 In calo';
    return '➡️ Stabile';
  }

  updateData(newData) {
    this.data = newData;
    this.render();
  }

  setTimeRange(days) {
    this.timeRange = days;
    this.data = this.generateMockData();
    this.render();
  }
}