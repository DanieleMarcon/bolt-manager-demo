export const template = `
<div class="intensity-slider">
  <div class="slider-header">
    <label for="intensitySlider" class="slider-label">Intensità Allenamento</label>
    <div class="intensity-value">
      <span class="value-text">3</span>
      <span class="value-label">Media</span>
    </div>
  </div>
  
  <div class="slider-container">
    <div class="slider-track">
      <div class="track-fill"></div>
      <div class="track-markers">
        <div class="marker" data-value="1"></div>
        <div class="marker" data-value="2"></div>
        <div class="marker" data-value="3"></div>
        <div class="marker" data-value="4"></div>
        <div class="marker" data-value="5"></div>
      </div>
      <input type="range" id="intensitySlider" class="slider-input" min="1" max="5" value="3" step="1" 
             aria-label="Intensità allenamento" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3">
    </div>
    
    <div class="slider-labels">
      <span class="min-label">Bassa</span>
      <span class="max-label">Alta</span>
    </div>
  </div>
  
  <div class="intensity-effects">
    <div class="effect-item">
      <div class="effect-icon">💪</div>
      <div class="effect-info">
        <span class="effect-label">Miglioramento</span>
        <div class="effect-meter">
          <div class="effect-fill improvement-fill"></div>
        </div>
      </div>
    </div>
    
    <div class="effect-item">
      <div class="effect-icon">🤕</div>
      <div class="effect-info">
        <span class="effect-label">Rischio Infortuni</span>
        <div class="effect-meter">
          <div class="effect-fill injury-fill"></div>
        </div>
      </div>
    </div>
    
    <div class="effect-item">
      <div class="effect-icon">⚡</div>
      <div class="effect-info">
        <span class="effect-label">Consumo Energia</span>
        <div class="effect-meter">
          <div class="effect-fill energy-fill"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="intensity-description">
    <p class="description-text">Intensità media: buon equilibrio tra miglioramento e rischio infortuni. Adatta per la maggior parte degli allenamenti.</p>
  </div>
</div>
<style>
.intensity-slider {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.slider-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.intensity-value {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.value-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.value-label {
  font-size: 12px;
  color: var(--text-muted);
}

.slider-container {
  margin-bottom: 24px;
}

.slider-track {
  position: relative;
  height: 40px;
  margin-bottom: 8px;
}

.track-fill {
  position: absolute;
  top: 18px;
  left: 0;
  height: 4px;
  background: var(--primary);
  border-radius: 2px;
  width: 50%;
  transition: width 0.2s ease;
}

.track-markers {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border);
  z-index: 1;
  transition: background-color 0.2s ease;
}

.marker.active {
  background: var(--primary);
}

.slider-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.intensity-effects {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.effect-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.effect-icon {
  font-size: 18px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  border-radius: 8px;
  flex-shrink: 0;
}

.effect-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.effect-label {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}

.effect-meter {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.effect-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.improvement-fill {
  background: var(--success);
  width: 60%;
}

.injury-fill {
  background: var(--warning);
  width: 40%;
}

.energy-fill {
  background: var(--error);
  width: 50%;
}

.intensity-description {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid var(--primary);
}

.description-text {
  font-size: 12px;
  color: var(--text);
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .slider-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .intensity-value {
    align-items: flex-start;
  }
}
</style>
`;

class IntensitySlider {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onChange: null,
      defaultValue: 3,
      showEffects: true,
      ...options
    };
    
    this.currentValue = this.options.defaultValue;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setValue(this.currentValue);
  }
  
  bindEvents() {
    // Slider input
    this.element.querySelector('.slider-input').addEventListener('input', (e) => {
      this.setValue(parseInt(e.target.value));
    });
    
    // Marker clicks
    this.element.querySelectorAll('.marker').forEach(marker => {
      marker.addEventListener('click', () => {
        const value = parseInt(marker.dataset.value);
        this.setValue(value);
      });
    });
  }
  
  setValue(value) {
    // Ensure value is within range
    value = Math.max(1, Math.min(5, value));
    
    this.currentValue = value;
    
    // Update slider input
    this.element.querySelector('.slider-input').value = value;
    
    // Update value display
    this.element.querySelector('.value-text').textContent = value;
    this.element.querySelector('.value-label').textContent = this.getIntensityLabel(value);
    
    // Update track fill
    const percentage = ((value - 1) / 4) * 100;
    this.element.querySelector('.track-fill').style.width = `${percentage}%`;
    
    // Update markers
    this.element.querySelectorAll('.marker').forEach(marker => {
      const markerValue = parseInt(marker.dataset.value);
      marker.classList.toggle('active', markerValue <= value);
    });
    
    // Update effects
    this.updateEffects(value);
    
    // Update description
    this.updateDescription(value);
    
    // Update ARIA attributes
    this.element.querySelector('.slider-input').setAttribute('aria-valuenow', value);
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(value);
    }
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('intensityChange', {
      detail: { value, label: this.getIntensityLabel(value) }
    }));
  }
  
  getIntensityLabel(value) {
    const labels = {
      1: 'Molto Bassa',
      2: 'Bassa',
      3: 'Media',
      4: 'Alta',
      5: 'Molto Alta'
    };
    
    return labels[value] || 'Media';
  }
  
  updateEffects(value) {
    if (!this.options.showEffects) return;
    
    // Calculate effect values based on intensity
    const improvementPercentage = Math.min(100, value * 20);
    const injuryPercentage = Math.min(100, value * 15);
    const energyPercentage = Math.min(100, value * 18);
    
    // Update effect meters
    this.element.querySelector('.improvement-fill').style.width = `${improvementPercentage}%`;
    this.element.querySelector('.injury-fill').style.width = `${injuryPercentage}%`;
    this.element.querySelector('.energy-fill').style.width = `${energyPercentage}%`;
  }
  
  updateDescription(value) {
    const descriptions = {
      1: 'Intensità molto bassa: minimo rischio di infortuni ma progressi molto lenti. Ideale per recupero dopo infortuni o partite ravvicinate.',
      2: 'Intensità bassa: rischio infortuni ridotto con progressi moderati. Adatta per allenamenti pre-partita o giocatori affaticati.',
      3: 'Intensità media: buon equilibrio tra miglioramento e rischio infortuni. Adatta per la maggior parte degli allenamenti.',
      4: 'Intensità alta: ottimi miglioramenti ma rischio infortuni elevato. Ideale per periodi senza partite ravvicinate.',
      5: 'Intensità molto alta: massimi miglioramenti ma alto rischio di infortuni e affaticamento. Usare con cautela.'
    };
    
    this.element.querySelector('.description-text').textContent = descriptions[value];
  }
  
  // Public methods
  getValue() {
    return this.currentValue;
  }
  
  getLabel() {
    return this.getIntensityLabel(this.currentValue);
  }
  
  getEffects() {
    return {
      improvement: Math.min(100, this.currentValue * 20),
      injury: Math.min(100, this.currentValue * 15),
      energy: Math.min(100, this.currentValue * 18)
    };
  }
}

export default IntensitySlider;