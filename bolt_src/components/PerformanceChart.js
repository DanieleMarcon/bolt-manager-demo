export const template = `
<div class="performance-chart">
  <div class="chart-header">
    <div class="chart-title-section">
      <h3 class="chart-title">Performance Stagionale</h3>
      <span class="chart-subtitle">Andamento prestazioni nel tempo</span>
    </div>
    
    <div class="chart-controls">
      <select class="metric-select" aria-label="Seleziona metrica">
        <option value="rating">Rating Medio</option>
        <option value="goals">Gol</option>
        <option value="assists">Assist</option>
        <option value="clean_sheets">Clean Sheet</option>
      </select>
      
      <button class="chart-export-btn button button-ghost" aria-label="Esporta grafico">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="chart-container">
    <div class="chart-canvas-wrapper">
      <svg class="performance-chart-svg" viewBox="0 0 800 400" role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Grafico performance stagionale</title>
        <desc id="chart-desc">Mostra l'andamento delle performance nel corso della stagione</desc>
        
        <!-- Grid lines -->
        <g class="grid-lines">
          <!-- Horizontal grid lines -->
          <g class="horizontal-grid"></g>
          <!-- Vertical grid lines -->
          <g class="vertical-grid"></g>
        </g>
        
        <!-- Axes -->
        <g class="axes">
          <!-- Y-axis -->
          <line class="y-axis" x1="60" y1="50" x2="60" y2="350" stroke="var(--border)" stroke-width="2"/>
          <!-- X-axis -->
          <line class="x-axis" x1="60" y1="350" x2="750" y2="350" stroke="var(--border)" stroke-width="2"/>
        </g>
        
        <!-- Axis labels -->
        <g class="axis-labels">
          <!-- Y-axis labels -->
          <g class="y-labels"></g>
          <!-- X-axis labels -->
          <g class="x-labels"></g>
        </g>
        
        <!-- Data line -->
        <path class="data-line" fill="none" stroke="var(--primary)" stroke-width="3"/>
        
        <!-- Data points -->
        <g class="data-points"></g>
        
        <!-- Average line -->
        <g class="average-line">
          <line x1="60" y1="0" x2="750" y2="0" stroke="var(--warning)" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="745" y="0" fill="var(--warning)" text-anchor="end" font-size="12">Media</text>
        </g>
        
        <!-- Tooltip -->
        <g class="chart-tooltip" style="display: none;">
          <rect class="tooltip-bg" rx="4" ry="4" fill="var(--surface)" stroke="var(--border)"/>
          <text class="tooltip-text" fill="var(--text)"></text>
        </g>
      </svg>
      
      <div class="chart-loading" style="display: none;">
        <div class="loading-spinner"></div>
        <span>Caricamento dati...</span>
      </div>
      
      <div class="chart-empty" style="display: none;">
        <div class="empty-icon">📈</div>
        <h4>Nessun dato disponibile</h4>
        <p>Non ci sono dati di performance per il periodo selezionato</p>
      </div>
    </div>
  </div>
  
  <div class="chart-stats">
    <div class="stat-item">
      <span class="stat-value highest-value">0</span>
      <span class="stat-label">Massimo</span>
    </div>
    <div class="stat-item">
      <span class="stat-value average-value">0</span>
      <span class="stat-label">Media</span>
    </div>
    <div class="stat-item">
      <span class="stat-value lowest-value">0</span>
      <span class="stat-label">Minimo</span>
    </div>
    <div class="stat-item">
      <span class="stat-value trend-value">-</span>
      <span class="stat-label">Trend</span>
    </div>
  </div>
  
  <div class="chart-insights">
    <h4>Insights</h4>
    <div class="insights-list">
      <!-- Insights will be populated dynamically -->
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-chart">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Performance Chart Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.performance-chart {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.chart-title-section {
  flex: 1;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.chart-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}

.chart-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.metric-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.chart-export-btn {
  padding: 6px 12px;
  font-size: 12px;
}

.chart-container {
  margin-bottom: 20px;
  position: relative;
  height: 400px;
}

.chart-canvas-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.performance-chart-svg {
  width: 100%;
  height: 100%;
  background: var(--surface);
  border-radius: 8px;
}

.grid-lines line {
  stroke: var(--border);
  stroke-width: 1;
  opacity: 0.5;
}

.axis-labels text {
  font-size: 11px;
  fill: var(--text-muted);
  text-anchor: middle;
}

.y-labels text {
  text-anchor: end;
}

.data-line {
  fill: none;
  stroke: var(--primary);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.data-points circle {
  fill: var(--surface);
  stroke: var(--primary);
  stroke-width: 2;
  cursor: pointer;
  transition: r 0.2s ease;
}

.data-points circle:hover {
  r: 6;
}

.chart-tooltip {
  pointer-events: none;
}

.tooltip-bg {
  fill: var(--surface);
  stroke: var(--border);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.tooltip-text {
  font-size: 11px;
  font-weight: 500;
}

.chart-loading,
.chart-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-radius: 8px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chart-empty .empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.chart-empty h4 {
  margin: 0 0 8px 0;
  color: var(--text);
}

.chart-empty p {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

.chart-stats {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.trend-value.positive {
  color: var(--success);
}

.trend-value.negative {
  color: var(--error);
}

.chart-insights {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.chart-insights h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.insight-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  background: var(--surface);
  border-radius: 6px;
  font-size: 12px;
}

.insight-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.insight-text {
  flex: 1;
  color: var(--text);
  line-height: 1.4;
}

.insight-item.positive .insight-icon {
  color: var(--success);
}

.insight-item.negative .insight-icon {
  color: var(--error);
}

.insight-item.neutral .insight-icon {
  color: var(--warning);
}

.sponsor-slot-chart {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1024px) {
  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .chart-controls {
    justify-content: center;
  }
  
  .chart-stats {
    flex-wrap: wrap;
  }
  
  .stat-item {
    flex: 1;
    min-width: 100px;
  }
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }
  
  .chart-stats {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  .sponsor-slot-chart {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class PerformanceChart {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      data: [],
      metric: 'rating',
      ...options
    };
    
    this.currentMetric = this.options.metric;
    this.data = this.options.data;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.renderChart();
  }
  
  bindEvents() {
    // Metric selector
    this.element.querySelector('.metric-select').addEventListener('change', (e) => {
      this.currentMetric = e.target.value;
      this.renderChart();
    });
    
    // Export button
    this.element.querySelector('.chart-export-btn').addEventListener('click', () => {
      this.exportChart();
    });
    
    // SVG interactions
    const svg = this.element.querySelector('.performance-chart-svg');
    
    svg.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });
    
    svg.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
  }
  
  async renderChart() {
    if (this.data.length === 0) {
      this.showLoading(true);
      
      try {
        // In a real app, this would fetch from game state
        this.data = await this.fetchPerformanceData();
        this.showLoading(false);
      } catch (error) {
        console.error('Error loading performance data:', error);
        this.showEmpty(true);
        return;
      }
    }
    
    if (this.data.length === 0) {
      this.showEmpty(true);
      return;
    }
    
    this.showEmpty(false);
    
    // Filter data for current metric
    const filteredData = this.data.filter(item => item[this.currentMetric] !== undefined);
    
    if (filteredData.length === 0) {
      this.showEmpty(true);
      return;
    }
    
    // Draw chart
    this.drawChart(filteredData);
    
    // Update stats
    this.updateStats(filteredData);
    
    // Update insights
    this.updateInsights(filteredData);
  }
  
  async fetchPerformanceData() {
    // Mock data - in real app this would come from game state
    const data = [];
    const today = new Date();
    
    // Generate sample data for the last 20 matches
    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 7)); // One match per week
      
      data.push({
        date: date.toISOString().split('T')[0],
        match: `Match ${20 - i}`,
        opponent: `Opponent ${20 - i}`,
        rating: 5 + Math.random() * 5, // Rating between 5-10
        goals: Math.floor(Math.random() * 3), // 0-2 goals
        assists: Math.floor(Math.random() * 3), // 0-2 assists
        clean_sheets: Math.random() > 0.7 ? 1 : 0 // 30% chance of clean sheet
      });
    }
    
    // Sort by date (oldest first)
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  drawChart(data) {
    const svg = this.element.querySelector('.performance-chart-svg');
    const width = 800;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Clear previous chart
    svg.querySelector('.horizontal-grid').innerHTML = '';
    svg.querySelector('.vertical-grid').innerHTML = '';
    svg.querySelector('.y-labels').innerHTML = '';
    svg.querySelector('.x-labels').innerHTML = '';
    svg.querySelector('.data-points').innerHTML = '';
    
    // Get min and max values for y-axis
    const values = data.map(d => d[this.currentMetric]);
    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);
    
    // Add some padding to min/max
    const padding = (maxValue - minValue) * 0.1;
    minValue = Math.max(0, minValue - padding);
    maxValue = maxValue + padding;
    
    // Draw horizontal grid lines and y-axis labels
    const yStep = this.getYAxisStep(minValue, maxValue);
    for (let y = Math.ceil(minValue / yStep) * yStep; y <= maxValue; y += yStep) {
      // Grid line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', margin.left);
      line.setAttribute('y1', margin.top + chartHeight * (1 - (y - minValue) / (maxValue - minValue)));
      line.setAttribute('x2', margin.left + chartWidth);
      line.setAttribute('y2', margin.top + chartHeight * (1 - (y - minValue) / (maxValue - minValue)));
      svg.querySelector('.horizontal-grid').appendChild(line);
      
      // Y-axis label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', margin.left - 10);
      text.setAttribute('y', margin.top + chartHeight * (1 - (y - minValue) / (maxValue - minValue)) + 4);
      text.textContent = this.formatYValue(y);
      svg.querySelector('.y-labels').appendChild(text);
    }
    
    // Draw vertical grid lines and x-axis labels
    const xStep = Math.max(1, Math.floor(data.length / 10)); // Show max 10 labels
    for (let i = 0; i < data.length; i += xStep) {
      const x = margin.left + (i / (data.length - 1)) * chartWidth;
      
      // Grid line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x);
      line.setAttribute('y1', margin.top);
      line.setAttribute('x2', x);
      line.setAttribute('y2', margin.top + chartHeight);
      svg.querySelector('.vertical-grid').appendChild(line);
      
      // X-axis label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', margin.top + chartHeight + 20);
      text.textContent = this.formatDate(data[i].date);
      svg.querySelector('.x-labels').appendChild(text);
    }
    
    // Draw data line
    const points = data.map((d, i) => {
      const x = margin.left + (i / (data.length - 1)) * chartWidth;
      const y = margin.top + chartHeight * (1 - (d[this.currentMetric] - minValue) / (maxValue - minValue));
      return `${x},${y}`;
    });
    
    const dataLine = svg.querySelector('.data-line');
    dataLine.setAttribute('d', `M ${points.join(' L ')}`);
    
    // Draw data points
    const dataPoints = svg.querySelector('.data-points');
    dataPoints.innerHTML = '';
    
    data.forEach((d, i) => {
      const x = margin.left + (i / (data.length - 1)) * chartWidth;
      const y = margin.top + chartHeight * (1 - (d[this.currentMetric] - minValue) / (maxValue - minValue));
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 4);
      circle.setAttribute('data-index', i);
      circle.setAttribute('data-value', d[this.currentMetric]);
      circle.setAttribute('data-date', d.date);
      circle.setAttribute('data-match', d.match);
      circle.setAttribute('data-opponent', d.opponent);
      
      dataPoints.appendChild(circle);
    });
    
    // Draw average line
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const averageY = margin.top + chartHeight * (1 - (average - minValue) / (maxValue - minValue));
    
    const averageLine = svg.querySelector('.average-line line');
    averageLine.setAttribute('y1', averageY);
    averageLine.setAttribute('y2', averageY);
    
    const averageText = svg.querySelector('.average-line text');
    averageText.setAttribute('y', averageY - 5);
    averageText.textContent = `Media: ${this.formatYValue(average)}`;
  }
  
  getYAxisStep(min, max) {
    const range = max - min;
    
    if (range <= 1) return 0.2;
    if (range <= 5) return 1;
    if (range <= 10) return 2;
    if (range <= 50) return 10;
    if (range <= 100) return 20;
    
    return Math.ceil(range / 5);
  }
  
  formatYValue(value) {
    if (this.currentMetric === 'rating') {
      return value.toFixed(1);
    }
    return value.toString();
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit'
    });
  }
  
  handleMouseMove(e) {
    const svg = this.element.querySelector('.performance-chart-svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find nearest data point
    const circles = svg.querySelectorAll('.data-points circle');
    let nearestCircle = null;
    let minDistance = Infinity;
    
    circles.forEach(circle => {
      const cx = parseFloat(circle.getAttribute('cx'));
      const cy = parseFloat(circle.getAttribute('cy'));
      const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
      if (distance < minDistance && distance < 30) {
        minDistance = distance;
        nearestCircle = circle;
      }
    });
    
    if (nearestCircle) {
      this.showTooltip(nearestCircle, x, y);
    } else {
      this.hideTooltip();
    }
  }
  
  showTooltip(circle, x, y) {
    const tooltip = this.element.querySelector('.chart-tooltip');
    const tooltipBg = tooltip.querySelector('.tooltip-bg');
    const tooltipText = tooltip.querySelector('.tooltip-text');
    
    const value = circle.getAttribute('data-value');
    const date = circle.getAttribute('data-date');
    const match = circle.getAttribute('data-match');
    const opponent = circle.getAttribute('data-opponent');
    
    const metricName = this.getMetricName();
    const formattedDate = this.formatDate(date);
    
    tooltipText.textContent = `${metricName}: ${value} - ${formattedDate} vs ${opponent}`;
    
    // Position tooltip
    const textBBox = tooltipText.getBBox();
    const padding = 8;
    const tooltipWidth = textBBox.width + (padding * 2);
    const tooltipHeight = textBBox.height + (padding * 2);
    
    let tooltipX = x + 10;
    let tooltipY = y - tooltipHeight - 10;
    
    // Keep tooltip in bounds
    if (tooltipX + tooltipWidth > 800) tooltipX = x - tooltipWidth - 10;
    if (tooltipY < 0) tooltipY = y + 10;
    
    tooltipBg.setAttribute('x', tooltipX);
    tooltipBg.setAttribute('y', tooltipY);
    tooltipBg.setAttribute('width', tooltipWidth);
    tooltipBg.setAttribute('height', tooltipHeight);
    
    tooltipText.setAttribute('x', tooltipX + padding);
    tooltipText.setAttribute('y', tooltipY + padding + textBBox.height);
    
    tooltip.style.display = 'block';
    
    // Highlight point
    circle.setAttribute('r', 6);
  }
  
  hideTooltip() {
    const tooltip = this.element.querySelector('.chart-tooltip');
    tooltip.style.display = 'none';
    
    // Reset all points
    const circles = this.element.querySelectorAll('.data-points circle');
    circles.forEach(circle => {
      circle.setAttribute('r', 4);
    });
  }
  
  getMetricName() {
    const metricNames = {
      rating: 'Rating',
      goals: 'Gol',
      assists: 'Assist',
      clean_sheets: 'Clean Sheet'
    };
    return metricNames[this.currentMetric] || this.currentMetric;
  }
  
  updateStats(data) {
    const values = data.map(d => d[this.currentMetric]);
    
    const highest = Math.max(...values);
    const lowest = Math.min(...values);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Calculate trend (positive, negative, or neutral)
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    let trend = '→';
    let trendClass = '';
    
    if (secondHalfAvg > firstHalfAvg * 1.1) {
      trend = '↗️';
      trendClass = 'positive';
    } else if (secondHalfAvg < firstHalfAvg * 0.9) {
      trend = '↘️';
      trendClass = 'negative';
    }
    
    // Update stats display
    this.element.querySelector('.highest-value').textContent = this.formatStatValue(highest);
    this.element.querySelector('.average-value').textContent = this.formatStatValue(average);
    this.element.querySelector('.lowest-value').textContent = this.formatStatValue(lowest);
    
    const trendElement = this.element.querySelector('.trend-value');
    trendElement.textContent = trend;
    trendElement.className = `stat-value trend-value ${trendClass}`;
  }
  
  formatStatValue(value) {
    if (this.currentMetric === 'rating') {
      return value.toFixed(1);
    }
    return value.toString();
  }
  
  updateInsights(data) {
    const insightsList = this.element.querySelector('.insights-list');
    insightsList.innerHTML = '';
    
    const insights = this.generateInsights(data);
    
    insights.forEach(insight => {
      const insightElement = document.createElement('div');
      insightElement.className = `insight-item ${insight.type}`;
      
      insightElement.innerHTML = `
        <div class="insight-icon">${insight.icon}</div>
        <div class="insight-text">${insight.text}</div>
      `;
      
      insightsList.appendChild(insightElement);
    });
  }
  
  generateInsights(data) {
    const insights = [];
    const values = data.map(d => d[this.currentMetric]);
    const metricName = this.getMetricName().toLowerCase();
    
    // Check for trend
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    if (secondHalfAvg > firstHalfAvg * 1.1) {
      insights.push({
        type: 'positive',
        icon: '📈',
        text: `Trend positivo nel ${metricName} nelle ultime partite`
      });
    } else if (secondHalfAvg < firstHalfAvg * 0.9) {
      insights.push({
        type: 'negative',
        icon: '📉',
        text: `Trend negativo nel ${metricName} nelle ultime partite`
      });
    }
    
    // Check for consistency
    const stdDev = this.calculateStandardDeviation(values);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const cv = stdDev / mean; // Coefficient of variation
    
    if (cv < 0.1) {
      insights.push({
        type: 'positive',
        icon: '🎯',
        text: `Performance molto costante nel ${metricName}`
      });
    } else if (cv > 0.3) {
      insights.push({
        type: 'negative',
        icon: '🎢',
        text: `Performance altalenante nel ${metricName}`
      });
    }
    
    // Check for recent performance
    const lastFive = values.slice(-5);
    const lastFiveAvg = lastFive.reduce((sum, val) => sum + val, 0) / lastFive.length;
    
    if (lastFiveAvg > mean * 1.1) {
      insights.push({
        type: 'positive',
        icon: '🔥',
        text: `Ottima performance recente nel ${metricName}`
      });
    } else if (lastFiveAvg < mean * 0.9) {
      insights.push({
        type: 'negative',
        icon: '❄️',
        text: `Performance recente sotto la media nel ${metricName}`
      });
    }
    
    // If no insights, add a neutral one
    if (insights.length === 0) {
      insights.push({
        type: 'neutral',
        icon: '📊',
        text: `Performance nella media per ${metricName}`
      });
    }
    
    return insights;
  }
  
  calculateStandardDeviation(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => {
      const diff = value - mean;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
  }
  
  exportChart() {
    const exportData = {
      metric: this.currentMetric,
      data: this.data,
      stats: {
        highest: Math.max(...this.data.map(d => d[this.currentMetric])),
        lowest: Math.min(...this.data.map(d => d[this.currentMetric])),
        average: this.data.reduce((sum, d) => sum + d[this.currentMetric], 0) / this.data.length
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-chart-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Grafico esportato con successo');
  }
  
  showLoading(show) {
    this.element.querySelector('.chart-loading').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.performance-chart-svg').style.display = show ? 'none' : 'block';
  }
  
  showEmpty(show) {
    this.element.querySelector('.chart-empty').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.performance-chart-svg').style.display = show ? 'none' : 'block';
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  updateData(newData) {
    this.data = newData;
    this.renderChart();
  }
  
  setMetric(metric) {
    this.currentMetric = metric;
    this.element.querySelector('.metric-select').value = metric;
    this.renderChart();
  }
  
  getData() {
    return [...this.data];
  }
  
  getCurrentMetric() {
    return this.currentMetric;
  }
}

export default PerformanceChart;