<div class="mentality-sliders">
  <div class="sliders-header">
    <h3 class="section-title">Impostazioni Tattiche</h3>
    <div class="preset-controls">
      <select class="preset-selector" aria-label="Seleziona preset tattico">
        <option value="">Preset personalizzato</option>
        <option value="defensive">Difensivo</option>
        <option value="balanced">Equilibrato</option>
        <option value="attacking">Offensivo</option>
        <option value="counter">Contropiede</option>
      </select>
      <button class="reset-btn button button-ghost" aria-label="Reset impostazioni">
        ↻ Reset
      </button>
    </div>
  </div>
  
  <div class="sliders-grid">
    <div class="slider-group">
      <div class="slider-item">
        <div class="slider-header">
          <label for="mentalitySlider" class="slider-label">Mentalità</label>
          <span class="slider-value" id="mentalityValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Difensiva</span>
          <input type="range" id="mentalitySlider" class="slider" min="0" max="100" value="50" 
                 aria-describedby="mentalityDescription">
          <span class="slider-max-label">Offensiva</span>
        </div>
        <p class="slider-description" id="mentalityDescription">
          Determina l'approccio generale della squadra: difensivo o offensivo
        </p>
      </div>
      
      <div class="slider-item">
        <div class="slider-header">
          <label for="tempoSlider" class="slider-label">Ritmo di Gioco</label>
          <span class="slider-value" id="tempoValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Lento</span>
          <input type="range" id="tempoSlider" class="slider" min="0" max="100" value="50"
                 aria-describedby="tempoDescription">
          <span class="slider-max-label">Veloce</span>
        </div>
        <p class="slider-description" id="tempoDescription">
          Velocità con cui la squadra sviluppa le azioni offensive
        </p>
      </div>
      
      <div class="slider-item">
        <div class="slider-header">
          <label for="widthSlider" class="slider-label">Ampiezza</label>
          <span class="slider-value" id="widthValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Stretta</span>
          <input type="range" id="widthSlider" class="slider" min="0" max="100" value="50"
                 aria-describedby="widthDescription">
          <span class="slider-max-label">Larga</span>
        </div>
        <p class="slider-description" id="widthDescription">
          Quanto la squadra utilizza la larghezza del campo
        </p>
      </div>
    </div>
    
    <div class="slider-group">
      <div class="slider-item">
        <div class="slider-header">
          <label for="pressingSlider" class="slider-label">Pressing</label>
          <span class="slider-value" id="pressingValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Basso</span>
          <input type="range" id="pressingSlider" class="slider" min="0" max="100" value="50"
                 aria-describedby="pressingDescription">
          <span class="slider-max-label">Alto</span>
        </div>
        <p class="slider-description" id="pressingDescription">
          Intensità del pressing quando la squadra non ha il possesso
        </p>
      </div>
      
      <div class="slider-item">
        <div class="slider-header">
          <label for="creativitySlider" class="slider-label">Creatività</label>
          <span class="slider-value" id="creativityValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Disciplinata</span>
          <input type="range" id="creativitySlider" class="slider" min="0" max="100" value="50"
                 aria-describedby="creativityDescription">
          <span class="slider-max-label">Creativa</span>
        </div>
        <p class="slider-description" id="creativityDescription">
          Libertà dei giocatori di prendere iniziative individuali
        </p>
      </div>
      
      <div class="slider-item">
        <div class="slider-header">
          <label for="directnessSlider" class="slider-label">Stile di Gioco</label>
          <span class="slider-value" id="directnessValue">50</span>
        </div>
        <div class="slider-container">
          <span class="slider-min-label">Elaborato</span>
          <input type="range" id="directnessSlider" class="slider" min="0" max="100" value="50"
                 aria-describedby="directnessDescription">
          <span class="slider-max-label">Diretto</span>
        </div>
        <p class="slider-description" id="directnessDescription">
          Preferenza per gioco elaborato o passaggi diretti
        </p>
      </div>
    </div>
  </div>
  
  <div class="tactical-preview">
    <h4>Anteprima Tattica</h4>
    <div class="preview-stats">
      <div class="preview-stat">
        <span class="stat-icon">🛡️</span>
        <span class="stat-label">Solidità Difensiva</span>
        <div class="stat-bar">
          <div class="stat-fill defense-fill"></div>
        </div>
        <span class="stat-percentage defense-percentage">50%</span>
      </div>
      
      <div class="preview-stat">
        <span class="stat-icon">⚽</span>
        <span class="stat-label">Potenziale Offensivo</span>
        <div class="stat-bar">
          <div class="stat-fill attack-fill"></div>
        </div>
        <span class="stat-percentage attack-percentage">50%</span>
      </div>
      
      <div class="preview-stat">
        <span class="stat-icon">🏃</span>
        <span class="stat-label">Intensità</span>
        <div class="stat-bar">
          <div class="stat-fill intensity-fill"></div>
        </div>
        <span class="stat-percentage intensity-percentage">50%</span>
      </div>
      
      <div class="preview-stat">
        <span class="stat-icon">🎯</span>
        <span class="stat-label">Controllo</span>
        <div class="stat-bar">
          <div class="stat-fill control-fill"></div>
        </div>
        <span class="stat-percentage control-percentage">50%</span>
      </div>
    </div>
    
    <div class="tactical-advice">
      <div class="advice-icon">💡</div>
      <div class="advice-content">
        <h5 class="advice-title">Consiglio Tattico</h5>
        <p class="advice-text">Impostazioni equilibrate adatte a qualsiasi avversario</p>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-tactics">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Tactics Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.mentality-sliders {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.sliders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.preset-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.preset-selector {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
  min-width: 140px;
}

.reset-btn {
  padding: 6px 12px;
  font-size: 12px;
}

.sliders-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 24px;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.slider-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}

.slider-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  min-width: 30px;
  text-align: right;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-min-label,
.slider-max-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  min-width: 60px;
}

.slider-min-label {
  text-align: right;
}

.slider-max-label {
  text-align: left;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--border);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.slider:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.slider-description {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0;
  font-style: italic;
}

.tactical-preview {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.tactical-preview h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.preview-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.preview-stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 80px;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.defense-fill {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.attack-fill {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.intensity-fill {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.control-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.stat-percentage {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  min-width: 35px;
  text-align: right;
}

.tactical-advice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.advice-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.advice-content {
  flex: 1;
}

.advice-title {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.advice-text {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 0;
}

.sponsor-slot-tactics {
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

/* Slider track styling for different browsers */
.slider::-webkit-slider-track {
  background: linear-gradient(to right, 
    var(--error) 0%, 
    var(--warning) 50%, 
    var(--success) 100%);
  border-radius: 3px;
}

.slider::-moz-range-track {
  background: linear-gradient(to right, 
    var(--error) 0%, 
    var(--warning) 50%, 
    var(--success) 100%);
  border-radius: 3px;
  border: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .sliders-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .preview-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .sliders-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .preset-controls {
    justify-content: center;
  }
  
  .slider-container {
    flex-direction: column;
    gap: 8px;
  }
  
  .slider-min-label,
  .slider-max-label {
    text-align: center;
    min-width: auto;
  }
  
  .preview-stat {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  
  .stat-label {
    min-width: auto;
    text-align: center;
  }
  
  .sponsor-slot-tactics {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class MentalitySliders {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      showPreview: true,
      showAdvice: true,
      autoSave: false,
      ...options
    };
    
    this.values = {
      mentality: 50,
      tempo: 50,
      width: 50,
      pressing: 50,
      creativity: 50,
      directness: 50
    };
    
    this.presets = {
      defensive: {
        mentality: 20,
        tempo: 30,
        width: 40,
        pressing: 30,
        creativity: 40,
        directness: 60
      },
      balanced: {
        mentality: 50,
        tempo: 50,
        width: 50,
        pressing: 50,
        creativity: 50,
        directness: 50
      },
      attacking: {
        mentality: 80,
        tempo: 70,
        width: 70,
        pressing: 70,
        creativity: 70,
        directness: 40
      },
      counter: {
        mentality: 30,
        tempo: 80,
        width: 60,
        pressing: 40,
        creativity: 60,
        directness: 70
      }
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateAllDisplays();
    this.updatePreview();
    this.updateAdvice();
  }
  
  bindEvents() {
    // Slider events
    Object.keys(this.values).forEach(key => {
      const slider = this.element.querySelector(`#${key}Slider`);
      if (slider) {
        slider.addEventListener('input', (e) => {
          this.updateValue(key, parseInt(e.target.value));
        });
        
        slider.addEventListener('change', (e) => {
          this.onSliderChange(key, parseInt(e.target.value));
        });
      }
    });
    
    // Preset selector
    const presetSelector = this.element.querySelector('.preset-selector');
    presetSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        this.applyPreset(e.target.value);
      }
    });
    
    // Reset button
    this.element.querySelector('.reset-btn').addEventListener('click', () => {
      this.resetToDefaults();
    });
    
    // Keyboard shortcuts
    this.element.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });
  }
  
  updateValue(key, value) {
    this.values[key] = value;
    this.updateDisplay(key);
    this.updatePreview();
    this.updateAdvice();
    
    // Check if matches a preset
    this.updatePresetSelector();
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('tacticsChange', {
      detail: { key, value, values: { ...this.values } }
    }));
    
    // Auto-save if enabled
    if (this.options.autoSave) {
      this.saveTactics();
    }
  }
  
  updateDisplay(key) {
    const valueElement = this.element.querySelector(`#${key}Value`);
    if (valueElement) {
      valueElement.textContent = this.values[key];
    }
    
    const slider = this.element.querySelector(`#${key}Slider`);
    if (slider) {
      slider.value = this.values[key];
    }
  }
  
  updateAllDisplays() {
    Object.keys(this.values).forEach(key => {
      this.updateDisplay(key);
    });
  }
  
  updatePreview() {
    if (!this.options.showPreview) return;
    
    const stats = this.calculateTacticalStats();
    
    // Update defense
    const defenseFill = this.element.querySelector('.defense-fill');
    const defensePercentage = this.element.querySelector('.defense-percentage');
    defenseFill.style.width = `${stats.defense}%`;
    defensePercentage.textContent = `${stats.defense}%`;
    
    // Update attack
    const attackFill = this.element.querySelector('.attack-fill');
    const attackPercentage = this.element.querySelector('.attack-percentage');
    attackFill.style.width = `${stats.attack}%`;
    attackPercentage.textContent = `${stats.attack}%`;
    
    // Update intensity
    const intensityFill = this.element.querySelector('.intensity-fill');
    const intensityPercentage = this.element.querySelector('.intensity-percentage');
    intensityFill.style.width = `${stats.intensity}%`;
    intensityPercentage.textContent = `${stats.intensity}%`;
    
    // Update control
    const controlFill = this.element.querySelector('.control-fill');
    const controlPercentage = this.element.querySelector('.control-percentage');
    controlFill.style.width = `${stats.control}%`;
    controlPercentage.textContent = `${stats.control}%`;
  }
  
  calculateTacticalStats() {
    const { mentality, tempo, width, pressing, creativity, directness } = this.values;
    
    // Calculate composite stats
    const defense = Math.round((100 - mentality + pressing + (100 - directness)) / 3);
    const attack = Math.round((mentality + creativity + width) / 3);
    const intensity = Math.round((pressing + tempo + mentality) / 3);
    const control = Math.round(((100 - directness) + creativity + (100 - tempo)) / 3);
    
    return { defense, attack, intensity, control };
  }
  
  updateAdvice() {
    if (!this.options.showAdvice) return;
    
    const advice = this.generateTacticalAdvice();
    const adviceTitle = this.element.querySelector('.advice-title');
    const adviceText = this.element.querySelector('.advice-text');
    
    adviceTitle.textContent = advice.title;
    adviceText.textContent = advice.text;
  }
  
  generateTacticalAdvice() {
    const { mentality, tempo, pressing, creativity, directness } = this.values;
    
    // Analyze tactical approach
    if (mentality < 30 && pressing < 40) {
      return {
        title: 'Approccio Difensivo',
        text: 'Tattica solida e compatta, ideale contro squadre offensive. Attenzione alle ripartenze.'
      };
    }
    
    if (mentality > 70 && creativity > 60) {
      return {
        title: 'Gioco Offensivo',
        text: 'Tattica aggressiva che punta al controllo del gioco. Vulnerabile ai contropiedi.'
      };
    }
    
    if (tempo > 70 && directness > 60) {
      return {
        title: 'Contropiede Veloce',
        text: 'Perfetto per sfruttare gli spazi lasciati dall\'avversario. Efficace contro squadre che attaccano.'
      };
    }
    
    if (pressing > 70 && tempo > 60) {
      return {
        title: 'Pressing Alto',
        text: 'Tattica intensa che richiede giocatori con buona forma fisica. Molto efficace ma rischiosa.'
      };
    }
    
    return {
      title: 'Approccio Equilibrato',
      text: 'Impostazioni bilanciate che si adattano a qualsiasi situazione di gioco.'
    };
  }
  
  updatePresetSelector() {
    const selector = this.element.querySelector('.preset-selector');
    
    // Check if current values match any preset
    const matchingPreset = Object.entries(this.presets).find(([name, preset]) => {
      return Object.keys(preset).every(key => 
        Math.abs(preset[key] - this.values[key]) <= 5
      );
    });
    
    selector.value = matchingPreset ? matchingPreset[0] : '';
  }
  
  applyPreset(presetName) {
    const preset = this.presets[presetName];
    if (!preset) return;
    
    // Animate to new values
    this.animateToValues(preset);
    
    this.showSuccess(`Preset "${this.getPresetDisplayName(presetName)}" applicato`);
  }
  
  getPresetDisplayName(presetName) {
    const displayNames = {
      defensive: 'Difensivo',
      balanced: 'Equilibrato',
      attacking: 'Offensivo',
      counter: 'Contropiede'
    };
    return displayNames[presetName] || presetName;
  }
  
  animateToValues(targetValues) {
    const startValues = { ...this.values };
    const duration = 800; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      Object.keys(targetValues).forEach(key => {
        const start = startValues[key];
        const target = targetValues[key];
        const current = start + (target - start) * easeOut;
        
        this.values[key] = Math.round(current);
        this.updateDisplay(key);
      });
      
      this.updatePreview();
      this.updateAdvice();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact final values
        Object.assign(this.values, targetValues);
        this.updateAllDisplays();
        this.updatePreview();
        this.updateAdvice();
        
        // Dispatch completion event
        this.element.dispatchEvent(new CustomEvent('presetApplied', {
          detail: { values: { ...this.values } }
        }));
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  resetToDefaults() {
    this.animateToValues(this.presets.balanced);
    this.showSuccess('Impostazioni resettate ai valori predefiniti');
  }
  
  handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '1':
          e.preventDefault();
          this.applyPreset('defensive');
          break;
        case '2':
          e.preventDefault();
          this.applyPreset('balanced');
          break;
        case '3':
          e.preventDefault();
          this.applyPreset('attacking');
          break;
        case '4':
          e.preventDefault();
          this.applyPreset('counter');
          break;
        case 'r':
          e.preventDefault();
          this.resetToDefaults();
          break;
      }
    }
  }
  
  onSliderChange(key, value) {
    // Dispatch change completion event
    this.element.dispatchEvent(new CustomEvent('tacticsChangeComplete', {
      detail: { key, value, values: { ...this.values } }
    }));
  }
  
  saveTactics() {
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveTactics', {
      detail: { values: { ...this.values } }
    }));
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getValues() {
    return { ...this.values };
  }
  
  setValues(newValues) {
    Object.assign(this.values, newValues);
    this.updateAllDisplays();
    this.updatePreview();
    this.updateAdvice();
    this.updatePresetSelector();
  }
  
  setValue(key, value) {
    if (this.values.hasOwnProperty(key)) {
      this.updateValue(key, value);
    }
  }
  
  getTacticalStats() {
    return this.calculateTacticalStats();
  }
  
  exportSettings() {
    return {
      values: { ...this.values },
      stats: this.calculateTacticalStats(),
      timestamp: new Date().toISOString()
    };
  }
  
  importSettings(settings) {
    if (settings.values) {
      this.setValues(settings.values);
    }
  }
}

// Auto-initialize mentality sliders
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mentality-sliders').forEach(sliders => {
    if (!sliders.dataset.initialized) {
      const options = JSON.parse(sliders.dataset.options || '{}');
      new MentalitySliders(sliders, options);
      sliders.dataset.initialized = 'true';
    }
  });
});
</script>