<div class="theme-selector">
  <div class="selector-header">
    <h4 class="selector-title">Tema</h4>
    <div class="selector-actions">
      <button class="action-btn preview-btn" aria-label="Anteprima tema">
        👁️ Anteprima
      </button>
    </div>
  </div>
  
  <div class="theme-options">
    <label class="theme-option">
      <input type="radio" name="theme" value="light" aria-label="Tema chiaro">
      <div class="option-content">
        <div class="theme-preview light-preview">
          <div class="preview-header"></div>
          <div class="preview-sidebar"></div>
          <div class="preview-content"></div>
        </div>
        <span class="theme-name">Chiaro</span>
      </div>
    </label>
    
    <label class="theme-option">
      <input type="radio" name="theme" value="dark" aria-label="Tema scuro">
      <div class="option-content">
        <div class="theme-preview dark-preview">
          <div class="preview-header"></div>
          <div class="preview-sidebar"></div>
          <div class="preview-content"></div>
        </div>
        <span class="theme-name">Scuro</span>
      </div>
    </label>
    
    <label class="theme-option">
      <input type="radio" name="theme" value="auto" checked aria-label="Tema automatico">
      <div class="option-content">
        <div class="theme-preview auto-preview">
          <div class="preview-header"></div>
          <div class="preview-sidebar"></div>
          <div class="preview-content"></div>
        </div>
        <span class="theme-name">Auto</span>
      </div>
    </label>
  </div>
  
  <div class="color-options">
    <h4>Colore Principale</h4>
    <div class="color-swatches">
      <label class="color-swatch">
        <input type="radio" name="color" value="blue" checked aria-label="Colore blu">
        <span class="swatch-color blue-color"></span>
      </label>
      
      <label class="color-swatch">
        <input type="radio" name="color" value="green" aria-label="Colore verde">
        <span class="swatch-color green-color"></span>
      </label>
      
      <label class="color-swatch">
        <input type="radio" name="color" value="purple" aria-label="Colore viola">
        <span class="swatch-color purple-color"></span>
      </label>
      
      <label class="color-swatch">
        <input type="radio" name="color" value="orange" aria-label="Colore arancione">
        <span class="swatch-color orange-color"></span>
      </label>
      
      <label class="color-swatch">
        <input type="radio" name="color" value="red" aria-label="Colore rosso">
        <span class="swatch-color red-color"></span>
      </label>
    </div>
  </div>
  
  <div class="theme-actions">
    <button class="button button-primary apply-theme-btn">
      Applica Tema
    </button>
  </div>
</div>

<style>
.theme-selector {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.selector-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.selector-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.theme-options {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.theme-option {
  flex: 1;
  cursor: pointer;
}

.theme-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.theme-preview {
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 2px solid var(--border);
  transition: all 0.2s ease;
}

.theme-option input[type="radio"]:checked + .option-content .theme-preview {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.theme-option input[type="radio"]:focus + .option-content .theme-preview {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.preview-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20%;
}

.preview-sidebar {
  position: absolute;
  top: 20%;
  left: 0;
  bottom: 0;
  width: 30%;
}

.preview-content {
  position: absolute;
  top: 20%;
  left: 30%;
  right: 0;
  bottom: 0;
}

.light-preview .preview-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.light-preview .preview-sidebar {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
}

.light-preview .preview-content {
  background: #f8fafc;
}

.dark-preview .preview-header {
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.dark-preview .preview-sidebar {
  background: #1e293b;
  border-right: 1px solid #334155;
}

.dark-preview .preview-content {
  background: #0f172a;
}

.auto-preview .preview-header {
  background: linear-gradient(90deg, #ffffff 50%, #1e293b 50%);
  border-bottom: 1px solid #e2e8f0;
}

.auto-preview .preview-sidebar {
  background: linear-gradient(180deg, #ffffff 50%, #1e293b 50%);
  border-right: 1px solid #e2e8f0;
}

.auto-preview .preview-content {
  background: linear-gradient(135deg, #f8fafc 50%, #0f172a 50%);
}

.theme-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.color-options {
  margin-bottom: 24px;
}

.color-options h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.color-swatches {
  display: flex;
  gap: 12px;
}

.color-swatch {
  cursor: pointer;
}

.color-swatch input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.swatch-color {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid var(--border);
  transition: all 0.2s ease;
}

.color-swatch input[type="radio"]:checked + .swatch-color {
  border-color: var(--text);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.color-swatch input[type="radio"]:focus + .swatch-color {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.blue-color {
  background: #2563eb;
}

.green-color {
  background: #10b981;
}

.purple-color {
  background: #8b5cf6;
}

.orange-color {
  background: #f59e0b;
}

.red-color {
  background: #ef4444;
}

.theme-actions {
  display: flex;
  justify-content: flex-end;
}

.button {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary {
  background: var(--primary);
  border: 1px solid var(--primary);
  color: white;
}

.button-primary:hover {
  background: var(--primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .selector-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .theme-options {
    flex-direction: column;
  }
  
  .color-swatches {
    flex-wrap: wrap;
  }
}
</style>

<script>
class ThemeSelector {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onChange: null,
      defaultTheme: 'auto',
      defaultColor: 'blue',
      ...options
    };
    
    this.currentTheme = this.options.defaultTheme;
    this.currentColor = this.options.defaultColor;
    
    this.init();
  }
  
  init() {
    this.loadThemeSettings();
    this.bindEvents();
  }
  
  loadThemeSettings() {
    // In a real app, this would load from localStorage or game state
    try {
      const themeSettings = localStorage.getItem('bolt_theme_settings');
      if (themeSettings) {
        const settings = JSON.parse(themeSettings);
        this.currentTheme = settings.theme || this.options.defaultTheme;
        this.currentColor = settings.color || this.options.defaultColor;
      }
      
      // Update UI
      this.element.querySelector(`input[name="theme"][value="${this.currentTheme}"]`).checked = true;
      this.element.querySelector(`input[name="color"][value="${this.currentColor}"]`).checked = true;
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  }
  
  bindEvents() {
    // Theme radio buttons
    this.element.querySelectorAll('input[name="theme"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.currentTheme = radio.value;
      });
    });
    
    // Color radio buttons
    this.element.querySelectorAll('input[name="color"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.currentColor = radio.value;
      });
    });
    
    // Preview button
    this.element.querySelector('.preview-btn').addEventListener('click', () => {
      this.previewTheme();
    });
    
    // Apply button
    this.element.querySelector('.apply-theme-btn').addEventListener('click', () => {
      this.applyTheme();
    });
  }
  
  previewTheme() {
    // Apply theme temporarily
    this.applyThemeToDocument(this.currentTheme, this.currentColor, true);
    
    // Show preview message
    this.showSuccess('Anteprima tema applicata temporaneamente');
    
    // Reset after 5 seconds
    setTimeout(() => {
      this.loadCurrentTheme();
    }, 5000);
  }
  
  applyTheme() {
    // Save theme settings
    const themeSettings = {
      theme: this.currentTheme,
      color: this.currentColor
    };
    
    localStorage.setItem('bolt_theme_settings', JSON.stringify(themeSettings));
    
    // Apply theme
    this.applyThemeToDocument(this.currentTheme, this.currentColor);
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(themeSettings);
    }
    
    // Dispatch theme change event
    this.element.dispatchEvent(new CustomEvent('themeChange', {
      detail: themeSettings
    }));
    
    this.showSuccess('Tema applicato con successo');
  }
  
  applyThemeToDocument(theme, color, isPreview = false) {
    // Apply theme class to document
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
    } else {
      // Auto theme based on system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('theme-dark');
      } else {
        document.documentElement.classList.add('theme-light');
      }
    }
    
    // Apply color
    document.documentElement.style.setProperty('--primary', this.getColorValue(color));
    document.documentElement.style.setProperty('--primary-dark', this.getDarkColorValue(color));
    
    // Add preview indicator if needed
    if (isPreview) {
      this.showPreviewIndicator();
    } else {
      this.hidePreviewIndicator();
    }
  }
  
  getColorValue(color) {
    const colors = {
      blue: '#2563eb',
      green: '#10b981',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      red: '#ef4444'
    };
    return colors[color] || colors.blue;
  }
  
  getDarkColorValue(color) {
    const colors = {
      blue: '#1e40af',
      green: '#059669',
      purple: '#7c3aed',
      orange: '#d97706',
      red: '#dc2626'
    };
    return colors[color] || colors.blue;
  }
  
  showPreviewIndicator() {
    // Create or update preview indicator
    let indicator = document.getElementById('theme-preview-indicator');
    
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'theme-preview-indicator';
      indicator.style.position = 'fixed';
      indicator.style.bottom = '20px';
      indicator.style.left = '50%';
      indicator.style.transform = 'translateX(-50%)';
      indicator.style.background = 'rgba(0, 0, 0, 0.8)';
      indicator.style.color = 'white';
      indicator.style.padding = '8px 16px';
      indicator.style.borderRadius = '20px';
      indicator.style.fontSize = '12px';
      indicator.style.zIndex = '9999';
      document.body.appendChild(indicator);
    }
    
    indicator.textContent = 'Anteprima tema (5s)';
  }
  
  hidePreviewIndicator() {
    const indicator = document.getElementById('theme-preview-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  loadCurrentTheme() {
    try {
      const themeSettings = localStorage.getItem('bolt_theme_settings');
      if (themeSettings) {
        const settings = JSON.parse(themeSettings);
        this.applyThemeToDocument(settings.theme, settings.color);
      } else {
        this.applyThemeToDocument(this.options.defaultTheme, this.options.defaultColor);
      }
    } catch (error) {
      console.error('Error loading current theme:', error);
      this.applyThemeToDocument(this.options.defaultTheme, this.options.defaultColor);
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getCurrentTheme() {
    return {
      theme: this.currentTheme,
      color: this.currentColor
    };
  }
  
  setTheme(theme, color) {
    if (theme) {
      this.currentTheme = theme;
      this.element.querySelector(`input[name="theme"][value="${theme}"]`).checked = true;
    }
    
    if (color) {
      this.currentColor = color;
      this.element.querySelector(`input[name="color"][value="${color}"]`).checked = true;
    }
  }
  
  applyCurrentTheme() {
    this.applyTheme();
  }
}

// Auto-initialize theme selectors
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.theme-selector').forEach(selector => {
    if (!selector.dataset.initialized) {
      const options = JSON.parse(selector.dataset.options || '{}');
      new ThemeSelector(selector, options);
      selector.dataset.initialized = 'true';
    }
  });
});
</script>