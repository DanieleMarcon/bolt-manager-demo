/**
 * CompetencyChart Component
 * 
 * Used in: StaffManagement.page.js
 * Purpose: Display radar chart of staff competencies
 * Dataset: staff (staff member attributes for radar visualization)
 */

export default class CompetencyChart {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.competencies = props.competencies || {};
    this.staffName = props.staffName || 'Staff Member';
    this.size = props.size || 200;
    this.maxValue = props.maxValue || 100;
    
    this.render();
  }

  render() {
    const center = this.size / 2;
    const radius = (this.size / 2) - 40;
    
    this.container.innerHTML = `
      <div class="competency-chart">
        <div class="chart-header">
          <h4 class="chart-title">Competenze - ${this.staffName}</h4>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-color" style="background: #2563eb;"></span>
              Livello attuale
            </span>
          </div>
        </div>
        
        <div class="chart-container">
          <svg width="${this.size}" height="${this.size}" class="competency-svg">
            <!-- Background circles -->
            ${this.renderBackgroundCircles(center, radius)}
            
            <!-- Axis lines -->
            ${this.renderAxisLines(center, radius)}
            
            <!-- Labels -->
            ${this.renderLabels(center, radius)}
            
            <!-- Data polygon -->
            ${this.renderDataPolygon(center, radius)}
            
            <!-- Data points -->
            ${this.renderDataPoints(center, radius)}
          </svg>
        </div>
        
        <div class="competency-details">
          ${this.renderCompetencyDetails()}
        </div>
      </div>
    `;
  }

  renderBackgroundCircles(center, radius) {
    const circles = [];
    for (let i = 1; i <= 5; i++) {
      const r = (radius * i) / 5;
      circles.push(`
        <circle 
          cx="${center}" 
          cy="${center}" 
          r="${r}" 
          fill="none" 
          stroke="#e2e8f0" 
          stroke-width="1"
          opacity="0.5"
        />
      `);
    }
    return circles.join('');
  }

  renderAxisLines(center, radius) {
    const competencyKeys = this.getCompetencyKeys();
    const angleStep = (2 * Math.PI) / competencyKeys.length;
    
    return competencyKeys.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      
      return `
        <line 
          x1="${center}" 
          y1="${center}" 
          x2="${x}" 
          y2="${y}" 
          stroke="#e2e8f0" 
          stroke-width="1"
          opacity="0.5"
        />
      `;
    }).join('');
  }

  renderLabels(center, radius) {
    const competencyKeys = this.getCompetencyKeys();
    const angleStep = (2 * Math.PI) / competencyKeys.length;
    const labelRadius = radius + 20;
    
    return competencyKeys.map((key, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      
      return `
        <text 
          x="${x}" 
          y="${y}" 
          text-anchor="middle" 
          dominant-baseline="middle"
          class="competency-label"
          font-size="12"
          fill="#64748b"
        >
          ${this.getCompetencyLabel(key)}
        </text>
      `;
    }).join('');
  }

  renderDataPolygon(center, radius) {
    const competencyKeys = this.getCompetencyKeys();
    const angleStep = (2 * Math.PI) / competencyKeys.length;
    
    const points = competencyKeys.map((key, index) => {
      const value = this.competencies[key] || 0;
      const normalizedValue = value / this.maxValue;
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * normalizedValue * Math.cos(angle);
      const y = center + radius * normalizedValue * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    
    return `
      <polygon 
        points="${points}" 
        fill="rgba(37, 99, 235, 0.2)" 
        stroke="#2563eb" 
        stroke-width="2"
        class="data-polygon"
      />
    `;
  }

  renderDataPoints(center, radius) {
    const competencyKeys = this.getCompetencyKeys();
    const angleStep = (2 * Math.PI) / competencyKeys.length;
    
    return competencyKeys.map((key, index) => {
      const value = this.competencies[key] || 0;
      const normalizedValue = value / this.maxValue;
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * normalizedValue * Math.cos(angle);
      const y = center + radius * normalizedValue * Math.sin(angle);
      
      return `
        <circle 
          cx="${x}" 
          cy="${y}" 
          r="4" 
          fill="#2563eb" 
          stroke="white" 
          stroke-width="2"
          class="data-point"
          data-competency="${key}"
          data-value="${value}"
        >
          <title>${this.getCompetencyLabel(key)}: ${value}</title>
        </circle>
      `;
    }).join('');
  }

  renderCompetencyDetails() {
    const competencyKeys = this.getCompetencyKeys();
    
    return `
      <div class="competency-list">
        ${competencyKeys.map(key => {
          const value = this.competencies[key] || 0;
          const percentage = (value / this.maxValue) * 100;
          
          return `
            <div class="competency-item">
              <div class="competency-info">
                <span class="competency-name">${this.getCompetencyLabel(key)}</span>
                <span class="competency-value">${value}/${this.maxValue}</span>
              </div>
              <div class="competency-bar">
                <div class="competency-fill" style="width: ${percentage}%"></div>
              </div>
              <div class="competency-rating">${this.getCompetencyRating(value)}</div>
            </div>
          `;
        }).join('')}
      </div>
      
      <div class="chart-summary">
        <div class="summary-item">
          <span class="summary-label">Media:</span>
          <span class="summary-value">${this.getAverageCompetency()}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Migliore:</span>
          <span class="summary-value">${this.getBestCompetency()}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Da migliorare:</span>
          <span class="summary-value">${this.getWorstCompetency()}</span>
        </div>
      </div>
    `;
  }

  getCompetencyKeys() {
    const defaultKeys = ['coaching', 'fitness', 'tactical', 'mental', 'medical', 'scouting'];
    const availableKeys = Object.keys(this.competencies);
    
    // Use available keys if provided, otherwise use defaults
    return availableKeys.length > 0 ? availableKeys : defaultKeys;
  }

  getCompetencyLabel(key) {
    const labels = {
      coaching: 'Coaching',
      fitness: 'Fitness',
      tactical: 'Tattico',
      mental: 'Mentale',
      medical: 'Medico',
      scouting: 'Scouting',
      analysis: 'Analisi',
      youth: 'Giovani'
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }

  getCompetencyRating(value) {
    if (value >= 90) return 'Eccellente';
    if (value >= 80) return 'Ottimo';
    if (value >= 70) return 'Buono';
    if (value >= 60) return 'Discreto';
    if (value >= 50) return 'Sufficiente';
    return 'Insufficiente';
  }

  getAverageCompetency() {
    const values = Object.values(this.competencies);
    if (values.length === 0) return '0';
    
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    return average.toFixed(1);
  }

  getBestCompetency() {
    const entries = Object.entries(this.competencies);
    if (entries.length === 0) return 'N/A';
    
    const best = entries.reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, 
      { key: '', value: 0 }
    );
    
    return `${this.getCompetencyLabel(best.key)} (${best.value})`;
  }

  getWorstCompetency() {
    const entries = Object.entries(this.competencies);
    if (entries.length === 0) return 'N/A';
    
    const worst = entries.reduce((min, [key, value]) => 
      value < min.value ? { key, value } : min, 
      { key: '', value: 100 }
    );
    
    return `${this.getCompetencyLabel(worst.key)} (${worst.value})`;
  }

  // Public methods
  updateCompetencies(newCompetencies) {
    this.competencies = newCompetencies;
    this.render();
  }

  setStaffName(name) {
    this.staffName = name;
    const titleElement = this.container.querySelector('.chart-title');
    if (titleElement) {
      titleElement.textContent = `Competenze - ${name}`;
    }
  }

  exportAsImage() {
    const svg = this.container.querySelector('.competency-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = this.size;
      canvas.height = this.size;
      ctx.drawImage(img, 0, 0);
      
      // Download the image
      const link = document.createElement('a');
      link.download = `competenze-${this.staffName.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }
}