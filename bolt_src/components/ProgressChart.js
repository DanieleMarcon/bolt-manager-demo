<div class="progress-chart">
  <div class="chart-header">
    <div class="chart-title-section">
      <h3 class="chart-title">Progressi Giocatore</h3>
      <span class="chart-subtitle">Evoluzione attributi nel tempo</span>
    </div>
    
    <div class="chart-controls">
      <select class="time-range-select" aria-label="Seleziona periodo">
        <option value="7">Ultima settimana</option>
        <option value="30" selected>Ultimo mese</option>
        <option value="90">Ultimi 3 mesi</option>
        <option value="365">Ultimo anno</option>
        <option value="all">Tutto il periodo</option>
      </select>
      
      <button class="chart-export-btn button button-ghost" aria-label="Esporta grafico">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="chart-legend">
    <div class="legend-items">
      <!-- Legend items will be populated dynamically -->
    </div>
    
    <div class="chart-stats">
      <div class="stat-item">
        <span class="stat-label">Miglioramento Totale</span>
        <span class="stat-value total-improvement">+0</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Trend</span>
        <span class="stat-value trend-indicator">→</span>
      </div>
    </div>
  </div>
  
  <div class="chart-container">
    <div class="chart-canvas-wrapper">
      <svg class="progress-chart-svg" viewBox="0 0 800 400" role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Grafico progressi attributi giocatore</title>
        <desc id="chart-desc">Mostra l'evoluzione degli attributi del giocatore nel tempo selezionato</desc>
        
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
        
        <!-- Data lines -->
        <g class="data-lines">
          <!-- Progress lines will be drawn here -->
        </g>
        
        <!-- Data points -->
        <g class="data-points">
          <!-- Progress points will be drawn here -->
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
        <p>Non ci sono dati di progresso per il periodo selezionato</p>
      </div>
    </div>
  </div>
  
  <div class="chart-insights">
    <h4>Insights Automatici</h4>
    <div class="insights-list">
      <!-- Insights will be populated dynamically -->
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-chart">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=250&h=50" 
         alt="Analytics Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.progress-chart {
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

.time-range-select {
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

.chart-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-label {
  color: var(--text);
  font-weight: 500;
}

.chart-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 2px;
}

.stat-value {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.total-improvement.positive {
  color: var(--success);
}

.total-improvement.negative {
  color: var(--error);
}

.trend-indicator.up {
  color: var(--success);
}

.trend-indicator.down {
  color: var(--error);
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

.progress-chart-svg {
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

.data-lines path {
  fill: none;
  stroke-width: 2;
  transition: stroke-width 0.2s ease;
}

.data-lines path:hover {
  stroke-width: 3;
}

.data-points circle {
  r: 4;
  fill: var(--surface);
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

.chart-insights {
  margin-bottom: 16px;
}

.chart-insights h4 {
  font-size: 14px;
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
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 6px;
  font-size: 12px;
}

.insight-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.insight-text {
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
  width: 100%;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* Attribute-specific colors */
.attribute-pace { stroke: #ef4444; }
.attribute-shooting { stroke: #f97316; }
.attribute-passing { stroke: #eab308; }
.attribute-dribbling { stroke: #22c55e; }
.attribute-defending { stroke: #3b82f6; }
.attribute-physical { stroke: #8b5cf6; }

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
  
  .chart-legend {
    flex-direction: column;
    gap: 12px;
  }
  
  .legend-items {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .progress-chart {
    padding: 16px;
  }
  
  .chart-container {
    height: 300px;
  }
  
  .progress-chart-svg {
    viewBox: 0 0 600 300;
  }
  
  .legend-items {
    flex-direction: column;
    gap: 8px;
  }
  
  .chart-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>

<script>
class ProgressChart {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      attributes: ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'],
      timeRange: 30, // days
      showGrid: true,
      showTooltips: true,
      showInsights: true,
      ...options
    };
    
    this.data = [];
    this.filteredData = [];
    this.svg = this.element.querySelector('.progress-chart-svg');
    this.currentTimeRange = this.options.timeRange;
    
    this.colors = {
      pace: '#ef4444',
      shooting: '#f97316',
      passing: '#eab308',
      dribbling: '#22c55e',
      defending: '#3b82f6',
      physical: '#8b5cf6'
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadData();
    this.setupChart();
  }
  
  bindEvents() {
    // Time range selector
    this.element.querySelector('.time-range-select').addEventListener('change', (e) => {
      this.currentTimeRange = e.target.value === 'all' ? null : parseInt(e.target.value);
      this.filterData();
      this.renderChart();
      this.updateInsights();
    });
    
    // Export button
    this.element.querySelector('.chart-export-btn').addEventListener('click', () => {
      this.exportChart();
    });
    
    // SVG interactions
    this.svg.addEventListener('mousemove', (e) => {
      if (this.options.showTooltips) {
        this.handleMouseMove(e);
      }
    });
    
    this.svg.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
  }
  
  async loadData() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from game state
      this.data = await this.fetchProgressData();
      this.filterData();
      this.renderChart();
      this.updateInsights();
    } catch (error) {
      console.error('Error loading progress data:', error);
      this.showError('Errore nel caricamento dei dati');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchProgressData() {
    // Mock data - in real app this would come from game state
    const now = new Date();
    const data = [];
    
    // Generate sample progress data for the last 90 days
    for (let i = 90; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const entry = {
        date: date.toISOString().split('T')[0],
        timestamp: date.getTime(),
        attributes: {}
      };
      
      // Generate realistic attribute progression
      this.options.attributes.forEach(attr => {
        const baseValue = 60 + Math.random() * 20; // Base 60-80
        const progression = Math.sin(i / 30) * 5; // Gradual improvement
        const noise = (Math.random() - 0.5) * 2; // Small random variations
        entry.attributes[attr] = Math.max(0, Math.min(100, baseValue + progression + noise));
      });
      
      data.push(entry);
    }
    
    return data;
  }
  
  filterData() {
    if (!this.currentTimeRange) {
      this.filteredData = [...this.data];
    } else {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.currentTimeRange);
      
      this.filteredData = this.data.filter(entry => 
        new Date(entry.date) >= cutoffDate
      );
    }
  }
  
  setupChart() {
    this.renderLegend();
    this.renderChart();
  }
  
  renderLegend() {
    const legendContainer = this.element.querySelector('.legend-items');
    legendContainer.innerHTML = '';
    
    this.options.attributes.forEach(attr => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      
      const color = document.createElement('div');
      color.className = 'legend-color';
      color.style.backgroundColor = this.colors[attr];
      
      const label = document.createElement('span');
      label.className = 'legend-label';
      label.textContent = this.getAttributeName(attr);
      
      item.appendChild(color);
      item.appendChild(label);
      legendContainer.appendChild(item);
    });
  }
  
  getAttributeName(attr) {
    const names = {
      pace: 'Velocità',
      shooting: 'Tiro',
      passing: 'Passaggio',
      dribbling: 'Dribbling',
      defending: 'Difesa',
      physical: 'Fisico'
    };
    return names[attr] || attr;
  }
  
  renderChart() {
    if (this.filteredData.length === 0) {
      this.showEmpty(true);
      return;
    }
    
    this.showEmpty(false);
    
    // Clear previous chart
    this.svg.querySelector('.data-lines').innerHTML = '';
    this.svg.querySelector('.data-points').innerHTML = '';
    this.svg.querySelector('.horizontal-grid').innerHTML = '';
    this.svg.querySelector('.vertical-grid').innerHTML = '';
    this.svg.querySelector('.y-labels').innerHTML = '';
    this.svg.querySelector('.x-labels').innerHTML = '';
    
    // Calculate dimensions
    const margin = { top: 50, right: 50, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Calculate scales
    const xScale = this.calculateXScale(width);
    const yScale = this.calculateYScale(height);
    
    // Render grid
    if (this.options.showGrid) {
      this.renderGrid(xScale, yScale, width, height, margin);
    }
    
    // Render axes labels
    this.renderAxesLabels(xScale, yScale, margin);
    
    // Render data lines and points
    this.options.attributes.forEach(attr => {
      this.renderAttributeLine(attr, xScale, yScale, margin);
      this.renderAttributePoints(attr, xScale, yScale, margin);
    });
    
    // Update statistics
    this.updateStatistics();
  }
  
  calculateXScale(width) {
    const minTime = Math.min(...this.filteredData.map(d => d.timestamp));
    const maxTime = Math.max(...this.filteredData.map(d => d.timestamp));
    
    return {
      domain: [minTime, maxTime],
      range: [0, width],
      scale: (value) => ((value - minTime) / (maxTime - minTime)) * width
    };
  }
  
  calculateYScale(height) {
    return {
      domain: [0, 100],
      range: [height, 0],
      scale: (value) => height - (value / 100) * height
    };
  }
  
  renderGrid(xScale, yScale, width, height, margin) {
    const horizontalGrid = this.svg.querySelector('.horizontal-grid');
    const verticalGrid = this.svg.querySelector('.vertical-grid');
    
    // Horizontal grid lines (for Y values)
    for (let y = 0; y <= 100; y += 20) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', margin.left);
      line.setAttribute('y1', margin.top + yScale.scale(y));
      line.setAttribute('x2', margin.left + width);
      line.setAttribute('y2', margin.top + yScale.scale(y));
      horizontalGrid.appendChild(line);
    }
    
    // Vertical grid lines (for time)
    const timeStep = (xScale.domain[1] - xScale.domain[0]) / 5;
    for (let i = 0; i <= 5; i++) {
      const time = xScale.domain[0] + (timeStep * i);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', margin.left + xScale.scale(time));
      line.setAttribute('y1', margin.top);
      line.setAttribute('x2', margin.left + xScale.scale(time));
      line.setAttribute('y2', margin.top + height);
      verticalGrid.appendChild(line);
    }
  }
  
  renderAxesLabels(xScale, yScale, margin) {
    const yLabels = this.svg.querySelector('.y-labels');
    const xLabels = this.svg.querySelector('.x-labels');
    
    // Y-axis labels
    for (let y = 0; y <= 100; y += 20) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', margin.left - 10);
      text.setAttribute('y', margin.top + yScale.scale(y) + 4);
      text.textContent = y;
      yLabels.appendChild(text);
    }
    
    // X-axis labels
    const timeStep = (xScale.domain[1] - xScale.domain[0]) / 5;
    for (let i = 0; i <= 5; i++) {
      const time = xScale.domain[0] + (timeStep * i);
      const date = new Date(time);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', margin.left + xScale.scale(time));
      text.setAttribute('y', margin.top + yScale.range[0] + 20);
      text.textContent = date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' });
      xLabels.appendChild(text);
    }
  }
  
  renderAttributeLine(attribute, xScale, yScale, margin) {
    const dataLines = this.svg.querySelector('.data-lines');
    
    const points = this.filteredData.map(d => ({
      x: margin.left + xScale.scale(d.timestamp),
      y: margin.top + yScale.scale(d.attributes[attribute])
    }));
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', this.colors[attribute]);
    path.setAttribute('class', `attribute-${attribute}`);
    path.setAttribute('data-attribute', attribute);
    
    dataLines.appendChild(path);
  }
  
  renderAttributePoints(attribute, xScale, yScale, margin) {
    const dataPoints = this.svg.querySelector('.data-points');
    
    this.filteredData.forEach(d => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', margin.left + xScale.scale(d.timestamp));
      circle.setAttribute('cy', margin.top + yScale.scale(d.attributes[attribute]));
      circle.setAttribute('stroke', this.colors[attribute]);
      circle.setAttribute('data-attribute', attribute);
      circle.setAttribute('data-date', d.date);
      circle.setAttribute('data-value', d.attributes[attribute].toFixed(1));
      
      dataPoints.appendChild(circle);
    });
  }
  
  handleMouseMove(e) {
    const rect = this.svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find nearest data point
    const circles = this.svg.querySelectorAll('.data-points circle');
    let nearestCircle = null;
    let minDistance = Infinity;
    
    circles.forEach(circle => {
      const cx = parseFloat(circle.getAttribute('cx'));
      const cy = parseFloat(circle.getAttribute('cy'));
      const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      
      if (distance < minDistance && distance < 20) {
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
    const tooltip = this.svg.querySelector('.chart-tooltip');
    const tooltipBg = tooltip.querySelector('.tooltip-bg');
    const tooltipText = tooltip.querySelector('.tooltip-text');
    
    const attribute = circle.getAttribute('data-attribute');
    const date = circle.getAttribute('data-date');
    const value = circle.getAttribute('data-value');
    
    const text = `${this.getAttributeName(attribute)}: ${value} (${new Date(date).toLocaleDateString('it-IT')})`;
    tooltipText.textContent = text;
    
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
  }
  
  hideTooltip() {
    const tooltip = this.svg.querySelector('.chart-tooltip');
    tooltip.style.display = 'none';
  }
  
  updateStatistics() {
    if (this.filteredData.length < 2) return;
    
    const firstEntry = this.filteredData[0];
    const lastEntry = this.filteredData[this.filteredData.length - 1];
    
    let totalImprovement = 0;
    let improvementCount = 0;
    
    this.options.attributes.forEach(attr => {
      const improvement = lastEntry.attributes[attr] - firstEntry.attributes[attr];
      totalImprovement += improvement;
      improvementCount++;
    });
    
    const avgImprovement = totalImprovement / improvementCount;
    
    // Update total improvement
    const totalImprovementEl = this.element.querySelector('.total-improvement');
    totalImprovementEl.textContent = avgImprovement >= 0 ? `+${avgImprovement.toFixed(1)}` : avgImprovement.toFixed(1);
    totalImprovementEl.className = `stat-value total-improvement ${avgImprovement >= 0 ? 'positive' : 'negative'}`;
    
    // Update trend indicator
    const trendEl = this.element.querySelector('.trend-indicator');
    if (avgImprovement > 1) {
      trendEl.textContent = '↗️';
      trendEl.className = 'stat-value trend-indicator up';
    } else if (avgImprovement < -1) {
      trendEl.textContent = '↘️';
      trendEl.className = 'stat-value trend-indicator down';
    } else {
      trendEl.textContent = '→';
      trendEl.className = 'stat-value trend-indicator';
    }
  }
  
  updateInsights() {
    if (!this.options.showInsights) return;
    
    const insightsList = this.element.querySelector('.insights-list');
    insightsList.innerHTML = '';
    
    const insights = this.generateInsights();
    
    insights.forEach(insight => {
      const item = document.createElement('div');
      item.className = `insight-item ${insight.type}`;
      
      const icon = document.createElement('span');
      icon.className = 'insight-icon';
      icon.textContent = insight.icon;
      
      const text = document.createElement('span');
      text.className = 'insight-text';
      text.textContent = insight.text;
      
      item.appendChild(icon);
      item.appendChild(text);
      insightsList.appendChild(item);
    });
  }
  
  generateInsights() {
    const insights = [];
    
    if (this.filteredData.length < 2) {
      insights.push({
        type: 'neutral',
        icon: 'ℹ️',
        text: 'Servono più dati per generare insights significativi'
      });
      return insights;
    }
    
    const firstEntry = this.filteredData[0];
    const lastEntry = this.filteredData[this.filteredData.length - 1];
    
    // Find best and worst improving attributes
    const improvements = {};
    this.options.attributes.forEach(attr => {
      improvements[attr] = lastEntry.attributes[attr] - firstEntry.attributes[attr];
    });
    
    const sortedImprovements = Object.entries(improvements).sort((a, b) => b[1] - a[1]);
    const bestImprovement = sortedImprovements[0];
    const worstImprovement = sortedImprovements[sortedImprovements.length - 1];
    
    if (bestImprovement[1] > 2) {
      insights.push({
        type: 'positive',
        icon: '📈',
        text: `Ottimo miglioramento in ${this.getAttributeName(bestImprovement[0])} (+${bestImprovement[1].toFixed(1)})`
      });
    }
    
    if (worstImprovement[1] < -2) {
      insights.push({
        type: 'negative',
        icon: '📉',
        text: `Calo in ${this.getAttributeName(worstImprovement[0])} (${worstImprovement[1].toFixed(1)})`
      });
    }
    
    // Check for consistency
    const recentData = this.filteredData.slice(-7); // Last 7 entries
    if (recentData.length >= 3) {
      const recentTrend = this.calculateTrend(recentData);
      if (recentTrend > 0.5) {
        insights.push({
          type: 'positive',
          icon: '🔥',
          text: 'Trend di miglioramento costante negli ultimi allenamenti'
        });
      } else if (recentTrend < -0.5) {
        insights.push({
          type: 'negative',
          icon: '⚠️',
          text: 'Possibile stanchezza o sovrallenamento rilevato'
        });
      }
    }
    
    if (insights.length === 0) {
      insights.push({
        type: 'neutral',
        icon: '📊',
        text: 'Progressi stabili, continua con l\'allenamento attuale'
      });
    }
    
    return insights;
  }
  
  calculateTrend(data) {
    if (data.length < 2) return 0;
    
    let totalTrend = 0;
    let trendCount = 0;
    
    this.options.attributes.forEach(attr => {
      const values = data.map(d => d.attributes[attr]);
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      totalTrend += (lastValue - firstValue);
      trendCount++;
    });
    
    return totalTrend / trendCount;
  }
  
  exportChart() {
    // Create export data
    const exportData = {
      timeRange: this.currentTimeRange,
      data: this.filteredData,
      statistics: {
        totalImprovement: this.element.querySelector('.total-improvement').textContent,
        trend: this.element.querySelector('.trend-indicator').textContent
      },
      insights: Array.from(this.element.querySelectorAll('.insight-text')).map(el => el.textContent)
    };
    
    // Export as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-chart-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Show success message
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message: 'Grafico esportato con successo', type: 'success' }
    }));
  }
  
  showLoading(show) {
    this.element.querySelector('.chart-loading').style.display = show ? 'flex' : 'none';
    this.svg.style.display = show ? 'none' : 'block';
  }
  
  showEmpty(show) {
    this.element.querySelector('.chart-empty').style.display = show ? 'flex' : 'none';
    this.svg.style.display = show ? 'none' : 'block';
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  updateData(newData) {
    this.data = newData;
    this.filterData();
    this.renderChart();
    this.updateInsights();
  }
  
  setTimeRange(days) {
    this.currentTimeRange = days;
    this.element.querySelector('.time-range-select').value = days || 'all';
    this.filterData();
    this.renderChart();
    this.updateInsights();
  }
  
  setAttributes(attributes) {
    this.options.attributes = attributes;
    this.setupChart();
  }
  
  getData() {
    return this.filteredData;
  }
}

// Auto-initialize progress charts
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.progress-chart').forEach(chart => {
    if (!chart.dataset.initialized) {
      const options = JSON.parse(chart.dataset.options || '{}');
      new ProgressChart(chart, options);
      chart.dataset.initialized = 'true';
    }
  });
});
</script>