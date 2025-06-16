<div class="training-type-card" data-type="" role="button" tabindex="0" aria-pressed="false">
  <div class="card-header">
    <div class="type-icon"></div>
    <div class="type-info">
      <h3 class="type-name"></h3>
      <span class="type-category"></span>
    </div>
    <div class="selection-indicator">
      <div class="check-mark">✓</div>
    </div>
  </div>
  
  <div class="card-body">
    <p class="type-description"></p>
    
    <div class="attributes-affected">
      <h4>Attributi Migliorati:</h4>
      <div class="attribute-tags"></div>
    </div>
    
    <div class="training-stats">
      <div class="stat-row">
        <span class="stat-label">Intensità Consigliata:</span>
        <div class="intensity-indicator">
          <div class="intensity-dots"></div>
        </div>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Durata:</span>
        <span class="stat-value duration-value"></span>
      </div>
      
      <div class="stat-row">
        <span class="stat-label">Rischio Infortuni:</span>
        <span class="stat-value risk-value"></span>
      </div>
    </div>
    
    <div class="effectiveness-preview">
      <h4>Efficacia per Ruolo:</h4>
      <div class="role-effectiveness"></div>
    </div>
  </div>
  
  <div class="card-footer">
    <div class="requirements">
      <span class="req-label">Richiede:</span>
      <div class="requirement-tags"></div>
    </div>
    
    <button class="select-btn button button-primary" aria-label="Seleziona tipo allenamento">
      Seleziona
    </button>
  </div>
  
  <!-- Sponsor slot mini -->
  <div class="sponsor-slot sponsor-slot-card">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=120&h=30" 
         alt="Training Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.training-type-card {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

.training-type-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-color: var(--primary);
}

.training-type-card:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.training-type-card.selected {
  border-color: var(--primary);
  background: linear-gradient(135deg, var(--surface) 0%, rgba(37, 99, 235, 0.05) 100%);
}

.training-type-card.selected .selection-indicator {
  opacity: 1;
  transform: scale(1);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
}

.type-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.type-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0.1;
}

.type-icon::after {
  position: relative;
  z-index: 1;
}

.type-info {
  flex: 1;
}

.type-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: var(--text);
}

.type-category {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 500;
}

.selection-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s ease;
}

.check-mark {
  font-size: 14px;
  font-weight: 700;
}

.card-body {
  flex: 1;
  margin-bottom: 16px;
}

.type-description {
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.attributes-affected,
.effectiveness-preview {
  margin-bottom: 16px;
}

.attributes-affected h4,
.effectiveness-preview h4 {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  margin: 0 0 8px 0;
}

.attribute-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.attribute-tag {
  background: var(--background);
  color: var(--text);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid var(--border);
}

.training-stats {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.stat-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.intensity-indicator {
  display: flex;
  align-items: center;
}

.intensity-dots {
  display: flex;
  gap: 3px;
}

.intensity-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
}

.intensity-dot.active {
  background: var(--primary);
}

.role-effectiveness {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.role-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.role-name {
  color: var(--text-muted);
}

.role-rating {
  font-weight: 600;
  color: var(--text);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  margin-top: auto;
}

.requirements {
  flex: 1;
}

.req-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.requirement-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.requirement-tag {
  background: var(--warning);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 600;
}

.select-btn {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.sponsor-slot-card {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 80px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.sponsor-slot-card:hover {
  opacity: 1;
}

/* Training type specific styles */
.training-type-card[data-type="fitness"] .type-icon {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.training-type-card[data-type="fitness"] .type-icon::after {
  content: '💪';
}

.training-type-card[data-type="technical"] .type-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.training-type-card[data-type="technical"] .type-icon::after {
  content: '⚽';
}

.training-type-card[data-type="tactical"] .type-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.training-type-card[data-type="tactical"] .type-icon::after {
  content: '🧠';
}

.training-type-card[data-type="mental"] .type-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.training-type-card[data-type="mental"] .type-icon::after {
  content: '🎯';
}

.training-type-card[data-type="recovery"] .type-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.training-type-card[data-type="recovery"] .type-icon::after {
  content: '🛌';
}

/* Risk level colors */
.risk-value.low {
  color: var(--success);
}

.risk-value.medium {
  color: var(--warning);
}

.risk-value.high {
  color: var(--error);
}

/* Role effectiveness colors */
.role-rating.excellent {
  color: var(--success);
}

.role-rating.good {
  color: var(--primary);
}

.role-rating.average {
  color: var(--warning);
}

.role-rating.poor {
  color: var(--error);
}

/* Responsive */
@media (max-width: 768px) {
  .training-type-card {
    padding: 16px;
    min-height: 280px;
  }
  
  .type-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .type-name {
    font-size: 16px;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .select-btn {
    width: 100%;
  }
  
  .role-effectiveness {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
class TrainingTypeCard {
  constructor(element, trainingType) {
    this.element = element;
    this.trainingType = trainingType;
    this.selected = false;
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    const type = this.trainingType;
    
    // Set data attribute
    this.element.dataset.type = type.id;
    
    // Update basic info
    this.element.querySelector('.type-name').textContent = type.name;
    this.element.querySelector('.type-category').textContent = type.category;
    this.element.querySelector('.type-description').textContent = type.description;
    
    // Update stats
    this.element.querySelector('.duration-value').textContent = type.duration;
    this.updateRiskValue(type.injury_risk);
    this.updateIntensityIndicator(type.recommended_intensity);
    
    // Update attributes
    this.renderAttributeTags(type.attributes_improved);
    
    // Update role effectiveness
    this.renderRoleEffectiveness(type.role_effectiveness);
    
    // Update requirements
    this.renderRequirements(type.requirements);
    
    // Update accessibility
    this.updateAccessibility();
  }
  
  updateRiskValue(risk) {
    const riskElement = this.element.querySelector('.risk-value');
    const riskText = this.getRiskText(risk);
    const riskLevel = this.getRiskLevel(risk);
    
    riskElement.textContent = riskText;
    riskElement.className = `stat-value risk-value ${riskLevel}`;
  }
  
  getRiskText(risk) {
    if (risk <= 2) return 'Basso';
    if (risk <= 5) return 'Medio';
    return 'Alto';
  }
  
  getRiskLevel(risk) {
    if (risk <= 2) return 'low';
    if (risk <= 5) return 'medium';
    return 'high';
  }
  
  updateIntensityIndicator(intensity) {
    const dotsContainer = this.element.querySelector('.intensity-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = document.createElement('div');
      dot.className = `intensity-dot ${i <= intensity ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
    }
  }
  
  renderAttributeTags(attributes) {
    const container = this.element.querySelector('.attribute-tags');
    container.innerHTML = '';
    
    attributes.forEach(attr => {
      const tag = document.createElement('span');
      tag.className = 'attribute-tag';
      tag.textContent = this.getAttributeName(attr);
      container.appendChild(tag);
    });
  }
  
  getAttributeName(attr) {
    const attributeNames = {
      pace: 'Velocità',
      shooting: 'Tiro',
      passing: 'Passaggio',
      dribbling: 'Dribbling',
      defending: 'Difesa',
      physical: 'Fisico',
      mental: 'Mentale',
      technical: 'Tecnica',
      tactical: 'Tattica'
    };
    return attributeNames[attr] || attr;
  }
  
  renderRoleEffectiveness(effectiveness) {
    const container = this.element.querySelector('.role-effectiveness');
    container.innerHTML = '';
    
    Object.entries(effectiveness).forEach(([role, rating]) => {
      const item = document.createElement('div');
      item.className = 'role-item';
      
      const roleName = document.createElement('span');
      roleName.className = 'role-name';
      roleName.textContent = this.getRoleName(role);
      
      const roleRating = document.createElement('span');
      roleRating.className = `role-rating ${this.getRatingClass(rating)}`;
      roleRating.textContent = this.getRatingText(rating);
      
      item.appendChild(roleName);
      item.appendChild(roleRating);
      container.appendChild(item);
    });
  }
  
  getRoleName(role) {
    const roleNames = {
      GK: 'Portiere',
      DF: 'Difensore',
      MF: 'Centrocampista',
      FW: 'Attaccante'
    };
    return roleNames[role] || role;
  }
  
  getRatingClass(rating) {
    if (rating >= 8) return 'excellent';
    if (rating >= 6) return 'good';
    if (rating >= 4) return 'average';
    return 'poor';
  }
  
  getRatingText(rating) {
    if (rating >= 8) return 'Ottimo';
    if (rating >= 6) return 'Buono';
    if (rating >= 4) return 'Medio';
    return 'Scarso';
  }
  
  renderRequirements(requirements) {
    const container = this.element.querySelector('.requirement-tags');
    container.innerHTML = '';
    
    requirements.forEach(req => {
      const tag = document.createElement('span');
      tag.className = 'requirement-tag';
      tag.textContent = this.getRequirementName(req);
      container.appendChild(tag);
    });
  }
  
  getRequirementName(req) {
    const requirementNames = {
      field: 'Campo',
      gym: 'Palestra',
      pool: 'Piscina',
      coach: 'Allenatore',
      equipment: 'Attrezzature'
    };
    return requirementNames[req] || req;
  }
  
  updateAccessibility() {
    const typeName = this.trainingType.name;
    const description = this.trainingType.description;
    
    this.element.setAttribute('aria-label', `Tipo allenamento: ${typeName}. ${description}`);
    this.element.setAttribute('aria-describedby', `training-${this.trainingType.id}-details`);
  }
  
  bindEvents() {
    // Card click
    this.element.addEventListener('click', () => {
      this.toggleSelection();
    });
    
    // Keyboard support
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleSelection();
      }
    });
    
    // Select button
    this.element.querySelector('.select-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.select();
    });
    
    // Hover effects
    this.element.addEventListener('mouseenter', () => {
      this.showPreview();
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.hidePreview();
    });
  }
  
  toggleSelection() {
    if (this.selected) {
      this.deselect();
    } else {
      this.select();
    }
  }
  
  select() {
    this.selected = true;
    this.element.classList.add('selected');
    this.element.setAttribute('aria-pressed', 'true');
    
    // Dispatch selection event
    this.element.dispatchEvent(new CustomEvent('trainingTypeSelected', {
      detail: {
        trainingType: this.trainingType,
        element: this.element
      },
      bubbles: true
    }));
    
    // Update button text
    this.element.querySelector('.select-btn').textContent = 'Selezionato';
  }
  
  deselect() {
    this.selected = false;
    this.element.classList.remove('selected');
    this.element.setAttribute('aria-pressed', 'false');
    
    // Dispatch deselection event
    this.element.dispatchEvent(new CustomEvent('trainingTypeDeselected', {
      detail: {
        trainingType: this.trainingType,
        element: this.element
      },
      bubbles: true
    }));
    
    // Update button text
    this.element.querySelector('.select-btn').textContent = 'Seleziona';
  }
  
  showPreview() {
    // Dispatch preview event
    this.element.dispatchEvent(new CustomEvent('trainingTypePreview', {
      detail: {
        trainingType: this.trainingType,
        element: this.element
      },
      bubbles: true
    }));
  }
  
  hidePreview() {
    // Dispatch hide preview event
    this.element.dispatchEvent(new CustomEvent('trainingTypeHidePreview', {
      detail: {
        trainingType: this.trainingType,
        element: this.element
      },
      bubbles: true
    }));
  }
  
  // Public methods
  isSelected() {
    return this.selected;
  }
  
  getTrainingType() {
    return this.trainingType;
  }
  
  updateTrainingType(newType) {
    this.trainingType = newType;
    this.render();
  }
  
  setEnabled(enabled) {
    if (enabled) {
      this.element.style.opacity = '1';
      this.element.style.pointerEvents = 'auto';
      this.element.setAttribute('aria-disabled', 'false');
    } else {
      this.element.style.opacity = '0.5';
      this.element.style.pointerEvents = 'none';
      this.element.setAttribute('aria-disabled', 'true');
    }
  }
}

// Auto-initialize training type cards
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.training-type-card').forEach(card => {
    if (!card.dataset.initialized) {
      const trainingType = JSON.parse(card.dataset.trainingType || '{}');
      new TrainingTypeCard(card, trainingType);
      card.dataset.initialized = 'true';
    }
  });
});

// Sample training types data
const SAMPLE_TRAINING_TYPES = {
  fitness: {
    id: 'fitness',
    name: 'Allenamento Fisico',
    category: 'Preparazione Fisica',
    description: 'Migliora la resistenza, velocità e forza fisica dei giocatori',
    duration: '90 min',
    injury_risk: 3,
    recommended_intensity: 4,
    attributes_improved: ['pace', 'physical'],
    role_effectiveness: {
      GK: 6,
      DF: 8,
      MF: 9,
      FW: 8
    },
    requirements: ['field', 'equipment']
  },
  technical: {
    id: 'technical',
    name: 'Allenamento Tecnico',
    category: 'Abilità Tecniche',
    description: 'Sviluppa le abilità tecniche individuali come tiro, passaggio e dribbling',
    duration: '75 min',
    injury_risk: 1,
    recommended_intensity: 3,
    attributes_improved: ['shooting', 'passing', 'dribbling'],
    role_effectiveness: {
      GK: 4,
      DF: 6,
      MF: 9,
      FW: 10
    },
    requirements: ['field', 'coach']
  },
  tactical: {
    id: 'tactical',
    name: 'Allenamento Tattico',
    category: 'Preparazione Tattica',
    description: 'Migliora la comprensione tattica e il posizionamento in campo',
    duration: '60 min',
    injury_risk: 1,
    recommended_intensity: 2,
    attributes_improved: ['tactical', 'mental'],
    role_effectiveness: {
      GK: 7,
      DF: 9,
      MF: 10,
      FW: 8
    },
    requirements: ['field', 'coach']
  }
};
</script>