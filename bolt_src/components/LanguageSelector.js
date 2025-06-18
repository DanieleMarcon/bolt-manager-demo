export const template = `
<div class="language-selector">
  <div class="selector-header">
    <h4 class="selector-title">Lingua</h4>
    <div class="selector-actions">
      <button class="action-btn auto-detect-btn" aria-label="Rileva automaticamente">
        🔍 Auto
      </button>
    </div>
  </div>
  
  <div class="languages-grid">
    <label class="language-option">
      <input type="radio" name="language" value="it" checked aria-label="Italiano">
      <div class="option-content">
        <div class="language-flag">🇮🇹</div>
        <div class="language-info">
          <span class="language-name">Italiano</span>
          <span class="language-native">Italiano</span>
        </div>
      </div>
    </label>
    
    <label class="language-option">
      <input type="radio" name="language" value="en" aria-label="English">
      <div class="option-content">
        <div class="language-flag">🇬🇧</div>
        <div class="language-info">
          <span class="language-name">Inglese</span>
          <span class="language-native">English</span>
        </div>
      </div>
    </label>
    
    <label class="language-option">
      <input type="radio" name="language" value="es" aria-label="Español">
      <div class="option-content">
        <div class="language-flag">🇪🇸</div>
        <div class="language-info">
          <span class="language-name">Spagnolo</span>
          <span class="language-native">Español</span>
        </div>
      </div>
    </label>
    
    <label class="language-option">
      <input type="radio" name="language" value="fr" aria-label="Français">
      <div class="option-content">
        <div class="language-flag">🇫🇷</div>
        <div class="language-info">
          <span class="language-name">Francese</span>
          <span class="language-native">Français</span>
        </div>
      </div>
    </label>
    
    <label class="language-option">
      <input type="radio" name="language" value="de" aria-label="Deutsch">
      <div class="option-content">
        <div class="language-flag">🇩🇪</div>
        <div class="language-info">
          <span class="language-name">Tedesco</span>
          <span class="language-native">Deutsch</span>
        </div>
      </div>
    </label>
    
    <label class="language-option">
      <input type="radio" name="language" value="pt" aria-label="Português">
      <div class="option-content">
        <div class="language-flag">🇵🇹</div>
        <div class="language-info">
          <span class="language-name">Portoghese</span>
          <span class="language-native">Português</span>
        </div>
      </div>
    </label>
  </div>
  
  <div class="language-info-panel">
    <div class="info-item">
      <span class="info-label">Stato Traduzione:</span>
      <span class="info-value translation-status">Completa</span>
    </div>
    <div class="info-item">
      <span class="info-label">Ultima Modifica:</span>
      <span class="info-value last-update">01/01/2025</span>
    </div>
  </div>
  
  <div class="language-actions">
    <button class="button button-primary apply-language-btn">
      Applica Lingua
    </button>
  </div>
</div>
<style>
.language-selector {
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

.languages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.language-option {
  cursor: pointer;
}

.language-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.language-option input[type="radio"]:checked + .option-content {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.language-option input[type="radio"]:focus + .option-content {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.language-flag {
  font-size: 24px;
}

.language-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.language-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.language-native {
  font-size: 12px;
  color: var(--text-muted);
}

.language-info-panel {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.info-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.info-value {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.translation-status.complete {
  color: var(--success);
}

.translation-status.partial {
  color: var(--warning);
}

.translation-status.incomplete {
  color: var(--error);
}

.language-actions {
  display: flex;
  justify-content: flex-end;
}


/* Responsive */
@media (max-width: 1024px) {
  .languages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .selector-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .languages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
`;

class LanguageSelector {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onChange: null,
      defaultLanguage: 'it',
      ...options
    };
    
    this.currentLanguage = this.options.defaultLanguage;
    this.languages = {
      it: { name: 'Italiano', native: 'Italiano', flag: '🇮🇹', status: 'complete', lastUpdate: '01/01/2025' },
      en: { name: 'Inglese', native: 'English', flag: '🇬🇧', status: 'complete', lastUpdate: '01/01/2025' },
      es: { name: 'Spagnolo', native: 'Español', flag: '🇪🇸', status: 'complete', lastUpdate: '01/01/2025' },
      fr: { name: 'Francese', native: 'Français', flag: '🇫🇷', status: 'partial', lastUpdate: '01/01/2025' },
      de: { name: 'Tedesco', native: 'Deutsch', flag: '🇩🇪', status: 'partial', lastUpdate: '01/01/2025' },
      pt: { name: 'Portoghese', native: 'Português', flag: '🇵🇹', status: 'incomplete', lastUpdate: '01/01/2025' }
    };
    
    this.init();
  }
  
  init() {
    this.loadLanguageSettings();
    this.bindEvents();
  }
  
  loadLanguageSettings() {
    // In a real app, this would load from localStorage or game state
    try {
      const languageSettings = localStorage.getItem('bolt_language');
      if (languageSettings) {
        this.currentLanguage = languageSettings;
      }
      
      // Update UI
      this.element.querySelector(`input[name="language"][value="${this.currentLanguage}"]`).checked = true;
      this.updateLanguageInfo();
    } catch (error) {
      console.error('Error loading language settings:', error);
    }
  }
  
  bindEvents() {
    // Language radio buttons
    this.element.querySelectorAll('input[name="language"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.currentLanguage = radio.value;
        this.updateLanguageInfo();
      });
    });
    
    // Auto detect button
    this.element.querySelector('.auto-detect-btn').addEventListener('click', () => {
      this.autoDetectLanguage();
    });
    
    // Apply button
    this.element.querySelector('.apply-language-btn').addEventListener('click', () => {
      this.applyLanguage();
    });
  }
  
  updateLanguageInfo() {
    const language = this.languages[this.currentLanguage];
    if (!language) return;
    
    const statusElement = this.element.querySelector('.translation-status');
    statusElement.textContent = this.getStatusText(language.status);
    statusElement.className = `info-value translation-status ${language.status}`;
    
    this.element.querySelector('.last-update').textContent = language.lastUpdate;
  }
  
  getStatusText(status) {
    const statusTexts = {
      complete: 'Completa',
      partial: 'Parziale',
      incomplete: 'Incompleta'
    };
    return statusTexts[status] || status;
  }
  
  autoDetectLanguage() {
    // Get browser language
    const browserLang = navigator.language.split('-')[0];
    
    // Check if we support this language
    if (this.languages[browserLang]) {
      this.currentLanguage = browserLang;
      this.element.querySelector(`input[name="language"][value="${browserLang}"]`).checked = true;
      this.updateLanguageInfo();
      this.showSuccess('Lingua rilevata: ' + this.languages[browserLang].name);
    } else {
      this.showInfo('Lingua non supportata, utilizzo italiano');
    }
  }
  
  applyLanguage() {
    // Save language setting
    localStorage.setItem('bolt_language', this.currentLanguage);
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(this.currentLanguage);
    }
    
    // Dispatch language change event
    this.element.dispatchEvent(new CustomEvent('languageChange', {
      detail: { language: this.currentLanguage }
    }));
    
    this.showSuccess(`Lingua impostata: ${this.languages[this.currentLanguage].name}`);
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  showInfo(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'info' }
    }));
  }
  
  // Public methods
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  setLanguage(language) {
    if (this.languages[language]) {
      this.currentLanguage = language;
      this.element.querySelector(`input[name="language"][value="${language}"]`).checked = true;
      this.updateLanguageInfo();
    }
  }
  
  getAvailableLanguages() {
    return Object.keys(this.languages);
  }
  
  getLanguageInfo(language) {
    return this.languages[language];
  }
}

export default LanguageSelector;