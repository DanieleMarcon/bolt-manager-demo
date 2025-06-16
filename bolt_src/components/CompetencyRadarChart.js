<div class="competency-radar-chart">
  <div class="chart-header">
    <h3 class="chart-title">Competenze Staff</h3>
    <div class="chart-controls">
      <button class="control-btn compare-btn" aria-label="Confronta competenze">
        ⚖️ Confronta
      </button>
      <button class="control-btn export-btn" aria-label="Esporta grafico">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="chart-container">
    <svg class="radar-chart" viewBox="0 0 300 300" role="img" aria-labelledby="radar-title radar-desc">
      <title id="radar-title">Grafico radar competenze staff</title>
      <desc id="radar-desc">Visualizzazione delle competenze dello staff in diverse aree</desc>
      
      <!-- Background circles -->
      <circle class="radar-circle" cx="150" cy="150" r="120" fill="none" stroke="var(--border)" stroke-width="1"/>
      <circle class="radar-circle" cx="150" cy="150" r="90" fill="none" stroke="var(--border)" stroke-width="1"/>
      <circle class="radar-circle" cx="150" cy="150" r="60" fill="none" stroke="var(--border)" stroke-width="1"/>
      <circle class="radar-circle" cx="150" cy="150" r="30" fill="none" stroke="var(--border)" stroke-width="1"/>
      
      <!-- Axis lines -->
      <line class="radar-axis" x1="150" y1="30" x2="150" y2="270" stroke="var(--border)" stroke-width="1"/>
      <line class="radar-axis" x1="30" y1="150" x2="270" y2="150" stroke="var(--border)" stroke-width="1"/>
      <line class="radar-axis" x1="66.3" y1="66.3" x2="233.7" y2="233.7" stroke="var(--border)" stroke-width="1"/>
      <line class="radar-axis" x1="66.3" y1="233.7" x2="233.7" y2="66.3" stroke="var(--border)" stroke-width="1"/>
      
      <!-- Axis labels -->
      <text class="radar-label" x="150" y="20" text-anchor="middle">Coaching</text>
      <text class="radar-label" x="150" y="290" text-anchor="middle">Scouting</text>
      <text class="radar-label" x="10" y="150" text-anchor="start" dominant-baseline="middle">Fitness</text>
      <text class="radar-label" x="290" y="150" text-anchor="end" dominant-baseline="middle">Tattica</text>
      <text class="radar-label" x="50" y="50" text-anchor="start">Mentale</text>
      <text class="radar-label" x="250" y="50" text-anchor="end">Medico</text>
      <text class="radar-label" x="50" y="250" text-anchor="start">Analisi</text>
      <text class="radar-label" x="250" y="250" text-anchor="end">Giovani</text>
      
      <!-- Data polygon will be added dynamically -->
    </svg>
    
    <div class="chart-legend">
      <div class="legend-item primary-legend">
        <div class="legend-color primary-color"></div>
        <span class="legend-label">Staff Attuale</span>
      </div>
      <div class="legend-item comparison-legend" style="display: none;">
        <div class="legend-color comparison-color"></div>
        <span class="legend-label">Staff Confronto</span>
      </div>
    </div>
  </div>
  
  <div class="competency-details">
    <h4>Dettaglio Competenze</h4>
    <div class="competency-grid">
      <div class="competency-item">
        <span class="competency-name">Coaching</span>
        <div class="competency-bar">
          <div class="competency-fill coaching-fill"></div>
        </div>
        <span class="competency-value coaching-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Fitness</span>
        <div class="competency-bar">
          <div class="competency-fill fitness-fill"></div>
        </div>
        <span class="competency-value fitness-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Tattica</span>
        <div class="competency-bar">
          <div class="competency-fill tactical-fill"></div>
        </div>
        <span class="competency-value tactical-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Mentale</span>
        <div class="competency-bar">
          <div class="competency-fill mental-fill"></div>
        </div>
        <span class="competency-value mental-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Medico</span>
        <div class="competency-bar">
          <div class="competency-fill medical-fill"></div>
        </div>
        <span class="competency-value medical-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Scouting</span>
        <div class="competency-bar">
          <div class="competency-fill scouting-fill"></div>
        </div>
        <span class="competency-value scouting-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Analisi</span>
        <div class="competency-bar">
          <div class="competency-fill analysis-fill"></div>
        </div>
        <span class="competency-value analysis-value">0</span>
      </div>
      
      <div class="competency-item">
        <span class="competency-name">Giovani</span>
        <div class="competency-bar">
          <div class="competency-fill youth-fill"></div>
        </div>
        <span class="competency-value youth-value">0</span>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-chart">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Competency Chart Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.competency-radar-chart {
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
  gap: 8px;
}

.control-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.radar-chart {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 16px;
}

.radar-label {
  font-size: 10px;
  fill: var(--text-muted);
  font-weight: 500;
}

.data-polygon {
  fill: rgba(37, 99, 235, 0.2);
  stroke: var(--primary);
  stroke-width: 2;
}

.comparison-polygon {
  fill: rgba(245, 158, 11, 0.2);
  stroke: var(--warning);
  stroke-width: 2;
  stroke-dasharray: 4;
}

.data-point {
  fill: var(--primary);
  r: 4;
}

.comparison-point {
  fill: var(--warning);
  r: 4;
}

.chart-legend {
  display: flex;
  gap: 16px;
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
  height: 16px;
  border-radius: 4px;
}

.primary-color {
  background: var(--primary);
}

.comparison-color {
  background: var(--warning);
}

.competency-details {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.competency-details h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.competency-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.competency-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.competency-name {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 60px;
  font-weight: 500;
}

.competency-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.competency-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.coaching-fill {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.fitness-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.tactical-fill {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.mental-fill {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.medical-fill {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.scouting-fill {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
}

.analysis-fill {
  background: linear-gradient(90deg, #0ea5e9, #0284c7);
}

.youth-fill {
  background: linear-gradient(90deg, #14b8a6, #0d9488);
}

.competency-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 20px;
  text-align: right;
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
@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .chart-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .competency-grid {
    grid-template-columns: 1fr;
  }
  
  .sponsor-slot-chart {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class CompetencyRadarChart {
  constructor(element, competencyData) {
    this.element = element;
    this.competencyData = competencyData;
    this.comparisonData = null;
    this.isComparing = false;
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.animateBars();
  }
  
  render() {
    this.updateRadarChart();
    this.updateCompetencyBars();
  }
  
  updateRadarChart() {
    const svg = this.element.querySelector('.radar-chart');
    
    // Remove existing data polygons
    const existingPolygons = svg.querySelectorAll('.data-polygon, .comparison-polygon, .data-point, .comparison-point');
    existingPolygons.forEach(polygon => polygon.remove());
    
    // Create primary data polygon
    const primaryPoints = this.calculatePolygonPoints(this.competencyData);
    const primaryPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    primaryPolygon.setAttribute('class', 'data-polygon');
    primaryPolygon.setAttribute('points', primaryPoints.map(p => `${p.x},${p.y}`).join(' '));
    svg.appendChild(primaryPolygon);
    
    // Add data points
    primaryPoints.forEach(point => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'data-point');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', 4);
      svg.appendChild(circle);
    });
    
    // Add comparison polygon if comparing
    if (this.isComparing && this.comparisonData) {
      const comparisonPoints = this.calculatePolygonPoints(this.comparisonData);
      const comparisonPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      comparisonPolygon.setAttribute('class', 'comparison-polygon');
      comparisonPolygon.setAttribute('points', comparisonPoints.map(p => `${p.x},${p.y}`).join(' '));
      svg.appendChild(comparisonPolygon);
      
      // Add comparison points
      comparisonPoints.forEach(point => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'comparison-point');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', 4);
        svg.appendChild(circle);
      });
      
      // Show comparison legend
      this.element.querySelector('.comparison-legend').style.display = 'flex';
    } else {
      // Hide comparison legend
      this.element.querySelector('.comparison-legend').style.display = 'none';
    }
  }
  
  calculatePolygonPoints(data) {
    const center = { x: 150, y: 150 };
    const maxRadius = 120;
    
    // Define the angles for each attribute (in radians)
    const angles = {
      coaching: 0, // Top
      fitness: Math.PI * 0.25, // Top-left
      tactical: Math.PI * 0.5, // Right
      mental: Math.PI * 0.75, // Top-right
      medical: Math.PI, // Bottom
      scouting: Math.PI * 1.25, // Bottom-left
      analysis: Math.PI * 1.5, // Left
      youth: Math.PI * 1.75 // Bottom-right
    };
    
    // Calculate points
    const points = [];
    
    Object.entries(angles).forEach(([attribute, angle]) => {
      const value = data[attribute] || 0;
      const radius = (value / 100) * maxRadius;
      
      const x = center.x + radius * Math.sin(angle);
      const y = center.y - radius * Math.cos(angle);
      
      points.push({ x, y });
    });
    
    return points;
  }
  
  updateCompetencyBars() {
    Object.entries(this.competencyData).forEach(([key, value]) => {
      const fill = this.element.querySelector(`.${key}-fill`);
      const valueElement = this.element.querySelector(`.${key}-value`);
      
      if (fill) fill.style.width = `${value}%`;
      if (valueElement) valueElement.textContent = value;
    });
  }
  
  animateBars() {
    setTimeout(() => {
      this.element.querySelectorAll('.competency-fill').forEach(fill => {
        fill.style.transition = 'width 1s ease-out';
      });
    }, 100);
  }
  
  bindEvents() {
    // Compare button
    this.element.querySelector('.compare-btn').addEventListener('click', () => {
      this.toggleComparison();
    });
    
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportChart();
    });
  }
  
  toggleComparison() {
    if (this.isComparing) {
      this.isComparing = false;
      this.updateRadarChart();
      return;
    }
    
    // In a real app, this would open a modal to select staff to compare with
    window.dispatchEvent(new CustomEvent('openStaffComparison', {
      detail: { 
        currentData: this.competencyData,
        callback: (comparisonData) => {
          this.setComparisonData(comparisonData);
        }
      }
    }));
  }
  
  setComparisonData(data) {
    this.comparisonData = data;
    this.isComparing = true;
    this.updateRadarChart();
  }
  
  exportChart() {
    // In a real app, this would generate an image or PDF of the chart
    const exportData = {
      competencies: this.competencyData,
      comparison: this.isComparing ? this.comparisonData : null,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `competency-chart-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Grafico esportato con successo');
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  updateData(newData) {
    this.competencyData = newData;
    this.render();
  }
  
  getData() {
    return { ...this.competencyData };
  }
  
  getComparisonData() {
    return this.isComparing ? { ...this.comparisonData } : null;
  }
  
  clearComparison() {
    this.isComparing = false;
    this.comparisonData = null;
    this.updateRadarChart();
  }
}

// Auto-initialize competency radar charts
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.competency-radar-chart').forEach(chart => {
    if (!chart.dataset.initialized) {
      const competencyData = JSON.parse(chart.dataset.competencyData || '{}');
      new CompetencyRadarChart(chart, competencyData);
      chart.dataset.initialized = 'true';
    }
  });
});
</script>