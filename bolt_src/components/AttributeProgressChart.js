export const template = `
<div class="attribute-progress-chart">
  <div class="chart-header">
    <h3 class="chart-title">Progresso Attributi</h3>
    <div class="chart-controls">
      <select class="attribute-select" aria-label="Seleziona attributo">
        <option value="all">Tutti gli Attributi</option>
        <option value="pace">Velocità</option>
        <option value="shooting">Tiro</option>
        <option value="passing">Passaggio</option>
        <option value="dribbling">Dribbling</option>
        <option value="defending">Difesa</option>
        <option value="physical">Fisico</option>
      </select>
      
      <button class="chart-export-btn button button-ghost" aria-label="Esporta grafico">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="chart-container">
    <div class="chart-canvas-wrapper">
      <svg class="attribute-chart-svg" viewBox="0 0 800 400" role="img" aria-labelledby="attribute-chart-title attribute-chart-desc">
        <title id="attribute-chart-title">Grafico progresso attributi</title>
        <desc id="attribute-chart-desc">Mostra l'evoluzione degli attributi del giocatore nel tempo</desc>
        
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
        <g class="data-lines"></g>
        
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
  
  <div class="chart-legend">
    <div class="legend-items">
      <!-- Legend items will be populated dynamically -->
    </div>
  </div>
  
  <div class="attribute-summary">
    <h4>Riepilogo Progressi</h4>
    <div class="summary-grid">
      <!-- Summary items will be populated dynamically -->
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-chart">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Attribute Chart Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.attribute-progress-chart {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.chart-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.attribute-select {
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

.attribute-chart-svg {
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
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.data-point {
  cursor: pointer;
  transition: r 0.2s ease;
}

.data-point:hover {
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

.chart-legend {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text);
}

.legend-color {
  width: 16px;
  height: 4px;
  border-radius: 2px;
}

.attribute-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.attribute-summary h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-attribute {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.summary-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-value {
  font-size: 16px;
  font-weight: 600;
}

.progress-value.positive {
  color: var(--success);
}

.progress-value.negative {
  color: var(--error);
}

.progress-value.neutral {
  color: var(--text);
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

/* Attribute-specific colors */
.pace-color { stroke: #ef4444; }
.shooting-color { stroke: #f97316; }
.passing-color { stroke: #eab308; }
.dribbling-color { stroke: #22c55e; }
.defending-color { stroke: #3b82f6; }
.physical-color { stroke: #8b5cf6; }

/* Responsive */
@media (max-width: 1024px) {
  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .chart-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }
  
  .legend-items {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .sponsor-slot-chart {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class AttributeProgressChart {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      data: [],
      selectedAttribute: 'all',
      ...options
    };
    
    this.currentAttribute = this.options.selectedAttribute;
    this.data = this.options.data;
    this.attributeColors = {
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
    this.renderChart();
  }
  
  bindEvents() {
    // Attribute selector
    this.element.querySelector('.attribute-select').addEventListener('change', (e) => {
      this.currentAttribute = e.target.value;
      this.renderChart();
    });
    
    // Export button
    this.element.querySelector('.chart-export-btn').addEventListener('click', () => {
      this.exportChart();
    });
    
    // SVG interactions
    const svg = this.element.querySelector('.attribute-chart-svg');
    
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
        this.data = await this.fetchAttributeData();
        this.showLoading(false);
      } catch (error) {
        console.error('Error loading attribute data:', error);
        this.showEmpty(true);
        return;
      }
    }
    
    if (this.data.length === 0) {
      this.showEmpty(true);
      return;
    }
    
    this.showEmpty(false);
    
    // Draw chart
    this.drawChart();
    
    // Update legend
    this.updateLegend();
    
    // Update summary
    this.updateSummary();
  }
  
  async fetchAttributeData() {
    // Mock data - in real app this would come from game state
    const data = [];
    const today = new Date();
    const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    
    // Generate sample data for the last 10 time points
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (i * 30)); // One data point per month
      
      const entry = {
        date: date.toISOString().split('T')[0],
        timestamp: date.getTime()
      };
      
      // Generate attribute values with some progression
      attributes.forEach(attr => {
        // Start with base value and add some progression and noise
        const baseValue = 60 + Math.random() * 20; // Base 60-80
        const progression = (10 - i) * 0.5; // More recent entries have higher values
        const noise = (Math.random() - 0.5) * 2; // Small random variations
        entry[attr] = Math.round(Math.max(1, Math.min(99, baseValue + progression + noise)));
      });
      
      data.push(entry);
    }
    
    // Sort by date (oldest first)
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  drawChart() {
    const svg = this.element.querySelector('.attribute-chart-svg');
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
    svg.querySelector('.data-lines').innerHTML = '';
    
    // Get min and max values for y-axis
    let minValue = 0;
    let maxValue = 100;
    
    // Draw horizontal grid lines and y-axis labels
    const yStep = 10; // Step size for y-axis
    for (let y = minValue; y <= maxValue; y += yStep) {
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
      text.textContent = y;
      svg.querySelector('.y-labels').appendChild(text);
    }
    
    // Draw vertical grid lines and x-axis labels
    const xStep = Math.max(1, Math.floor(this.data.length / 5)); // Show max 5 labels
    for (let i = 0; i < this.data.length; i += xStep) {
      const x = margin.left + (i / (this.data.length - 1)) * chartWidth;
      
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
      text.textContent = this.formatDate(this.data[i].date);
      svg.querySelector('.x-labels').appendChild(text);
    }
    
    // Draw data lines
    const dataLinesGroup = svg.querySelector('.data-lines');
    
    if (this.currentAttribute === 'all') {
      // Draw all attribute lines
      Object.keys(this.attributeColors).forEach(attr => {
        this.drawAttributeLine(attr, dataLinesGroup, margin, chartWidth, chartHeight, minValue, maxValue);
      });
    } else {
      // Draw only selected attribute line
      this.drawAttributeLine(this.currentAttribute, dataLinesGroup, margin, chartWidth, chartHeight, minValue, maxValue);
    }
  }
  
  drawAttributeLine(attribute, container, margin, chartWidth, chartHeight, minValue, maxValue) {
    // Create path for line
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', `data-line ${attribute}-color`);
    
    // Create points group
    const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pointsGroup.setAttribute('class', `data-points ${attribute}-points`);
    
    // Generate path data
    let pathData = '';
    
    this.data.forEach((entry, i) => {
      const x = margin.left + (i / (this.data.length - 1)) * chartWidth;
      const y = margin.top + chartHeight * (1 - (entry[attribute] - minValue) / (maxValue - minValue));
      
      if (i === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
      
      // Add data point
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', `data-point ${attribute}-point`);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 4);
      circle.setAttribute('fill', 'var(--surface)');
      circle.setAttribute('stroke', this.attributeColors[attribute]);
      circle.setAttribute('stroke-width', 2);
      circle.setAttribute('data-attribute', attribute);
      circle.setAttribute('data-value', entry[attribute]);
      circle.setAttribute('data-date', entry.date);
      
      pointsGroup.appendChild(circle);
    });
    
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', this.attributeColors[attribute]);
    
    container.appendChild(path);
    container.appendChild(pointsGroup);
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      month: 'short',
      year: '2-digit'
    });
  }
  
  handleMouseMove(e) {
    const svg = this.element.querySelector('.attribute-chart-svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find nearest data point
    const circles = svg.querySelectorAll('.data-point');
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
    
    const attribute = circle.getAttribute('data-attribute');
    const value = circle.getAttribute('data-value');
    const date = circle.getAttribute('data-date');
    
    const attributeName = this.getAttributeName(attribute);
    const formattedDate = this.formatDate(date);
    
    tooltipText.textContent = `${attributeName}: ${value} - ${formattedDate}`;
    
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
    const circles = this.element.querySelectorAll('.data-point');
    circles.forEach(circle => {
      circle.setAttribute('r', 4);
    });
  }
  
  getAttributeName(attribute) {
    const attributeNames = {
      pace: 'Velocità',
      shooting: 'Tiro',
      passing: 'Passaggio',
      dribbling: 'Dribbling',
      defending: 'Difesa',
      physical: 'Fisico'
    };
    return attributeNames[attribute] || attribute;
  }
  
  updateLegend() {
    const legendItems = this.element.querySelector('.legend-items');
    legendItems.innerHTML = '';
    
    if (this.currentAttribute === 'all') {
      // Show all attributes in legend
      Object.entries(this.attributeColors).forEach(([attr, color]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = color;
        
        const label = document.createElement('span');
        label.textContent = this.getAttributeName(attr);
        
        item.appendChild(colorBox);
        item.appendChild(label);
        legendItems.appendChild(item);
      });
    } else {
      // Show only selected attribute in legend
      const item = document.createElement('div');
      item.className = 'legend-item';
      
      const colorBox = document.createElement('div');
      colorBox.className = 'legend-color';
      colorBox.style.backgroundColor = this.attributeColors[this.currentAttribute];
      
      const label = document.createElement('span');
      label.textContent = this.getAttributeName(this.currentAttribute);
      
      item.appendChild(colorBox);
      item.appendChild(label);
      legendItems.appendChild(item);
    }
  }
  
  updateSummary() {
    const summaryGrid = this.element.querySelector('.summary-grid');
    summaryGrid.innerHTML = '';
    
    const attributes = this.currentAttribute === 'all' 
      ? Object.keys(this.attributeColors)
      : [this.currentAttribute];
    
    attributes.forEach(attr => {
      const progress = this.calculateProgress(attr);
      if (progress !== null) {
        const item = document.createElement('div');
        item.className = 'summary-item';
        
        const attributeName = document.createElement('div');
        attributeName.className = 'summary-attribute';
        attributeName.textContent = this.getAttributeName(attr);
        
        const progressElement = document.createElement('div');
        progressElement.className = 'summary-progress';
        
        const progressValue = document.createElement('span');
        progressValue.className = `progress-value ${this.getProgressClass(progress)}`;
        progressValue.textContent = this.formatProgress(progress);
        
        progressElement.appendChild(progressValue);
        
        item.appendChild(attributeName);
        item.appendChild(progressElement);
        summaryGrid.appendChild(item);
      }
    });
  }
  
  calculateProgress(attribute) {
    if (this.data.length < 2) return null;
    
    const firstValue = this.data[0][attribute];
    const lastValue = this.data[this.data.length - 1][attribute];
    
    return lastValue - firstValue;
  }
  
  getProgressClass(progress) {
    if (progress > 0) return 'positive';
    if (progress < 0) return 'negative';
    return 'neutral';
  }
  
  formatProgress(progress) {
    if (progress > 0) return `+${progress}`;
    return progress.toString();
  }
  
  exportChart() {
    const exportData = {
      attribute: this.currentAttribute,
      data: this.data,
      progress: this.currentAttribute === 'all'
        ? Object.keys(this.attributeColors).reduce((acc, attr) => {
            acc[attr] = this.calculateProgress(attr);
            return acc;
          }, {})
        : { [this.currentAttribute]: this.calculateProgress(this.currentAttribute) },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attribute-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Grafico esportato con successo');
  }
  
  showLoading(show) {
    this.element.querySelector('.chart-loading').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.attribute-chart-svg').style.display = show ? 'none' : 'block';
  }
  
  showEmpty(show) {
    this.element.querySelector('.chart-empty').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.attribute-chart-svg').style.display = show ? 'none' : 'block';
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
  
  setAttribute(attribute) {
    this.currentAttribute = attribute;
    this.element.querySelector('.attribute-select').value = attribute;
    this.renderChart();
  }
  
  getData() {
    return [...this.data];
  }
  
  getCurrentAttribute() {
    return this.currentAttribute;
  }
}

export default AttributeProgressChart;