export default class UserSettingsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    this.container.innerHTML = `
      <div class="user-settings-page">
        <div class="page-header">
          <h2 class="page-title">Impostazioni</h2>
          <div class="page-actions">
            <button class="button button-ghost reset-all-btn">↻ Reset Globale</button>
            <button class="button button-primary save-all-btn">💾 Salva Tutto</button>
          </div>
        </div>

        <div class="settings-layout">
          <div class="settings-sidebar">
            <div class="settings-tab-navigation-container"></div>
          </div>

          <div class="settings-content">
            <div class="settings-panel-container" data-section="general"></div>
            <div class="settings-panel-container" data-section="appearance" style="display: none;"></div>
            <div class="settings-panel-container" data-section="gameplay" style="display: none;"></div>
            <div class="settings-panel-container" data-section="audio" style="display: none;"></div>
            <div class="settings-panel-container" data-section="notifications" style="display: none;"></div>
            <div class="settings-panel-container" data-section="accessibility" style="display: none;"></div>
            <div class="settings-panel-container" data-section="language" style="display: none;"></div>
            <div class="settings-panel-container" data-section="data" style="display: none;"></div>
            <div class="settings-panel-container" data-section="about" style="display: none;"></div>
          </div>
        </div>

        <div class="settings-footer">
          <div class="unsaved-changes-indicator" style="display: none;">
            <span class="changes-icon">⚠️</span>
            <span class="changes-text">Modifiche non salvate</span>
          </div>

          <div class="settings-actions">
            <button class="button button-ghost cancel-btn">Annulla</button>
            <button class="button button-primary apply-btn">Applica Impostazioni</button>
          </div>
        </div>

        <div class="sponsor-banner-container"></div>
      </div>

      <style>
        .user-settings-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          min-height: 600px;
        }

        .settings-sidebar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .settings-content {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
        }

        .settings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
        }

        .unsaved-changes-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid var(--warning);
          border-radius: 8px;
          color: var(--warning);
        }

        .changes-icon {
          font-size: 16px;
        }

        .changes-text {
          font-size: 14px;
          font-weight: 500;
        }

        .settings-actions {
          display: flex;
          gap: 12px;
        }

        .sponsor-banner-container {
          margin-top: 16px;
        }

        @media (max-width: 1024px) {
          .settings-layout {
            grid-template-columns: 220px 1fr;
          }
        }

        @media (max-width: 768px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }

          .page-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .settings-footer {
            flex-direction: column;
            gap: 16px;
          }

          .settings-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      </style>
    `;

    await this.init();
  }

  async init() {
    try {
      this.initializeComponents();
      await this.loadSettings();
      this.bindEvents();
      console.log('User Settings page initialized');
    } catch (error) {
      console.error('Error initializing User Settings page:', error);
      this.showError("Errore durante l'inizializzazione della pagina");
    }
  }

  initializeComponents() {
    const tabNavigationContainer = document.querySelector('.settings-tab-navigation-container');
    const tabNavigation = document.createElement('div');
    tabNavigation.className = 'settings-tab-navigation';
    tabNavigationContainer?.appendChild(tabNavigation);

    const sections = ['general', 'appearance', 'gameplay', 'audio', 'notifications', 'accessibility', 'language', 'data', 'about'];
    sections.forEach(section => {
      const panelContainer = document.querySelector(`.settings-panel-container[data-section="${section}"]`);
      const panel = document.createElement('div');
      panel.className = 'settings-panel';
      panel.dataset.section = section;
      panelContainer?.appendChild(panel);
    });

    document.querySelector('.settings-panel-container[data-section="appearance"]')?.appendChild(this.createDiv('theme-selector'));
    document.querySelector('.settings-panel-container[data-section="language"]')?.appendChild(this.createDiv('language-selector'));
    document.querySelector('.settings-panel-container[data-section="accessibility"]')?.appendChild(document.createElement('accessibility-options'));
    document.querySelector('.settings-panel-container[data-section="gameplay"]')?.appendChild(this.createDiv('gameplay-settings'));
    document.querySelector('.sponsor-banner-container')?.appendChild(this.createDiv('sponsor-banner'));
  }

  async loadSettings() {
    try {
      const settings = await this.fetchSettings();
      this.applySettingsToComponents(settings);
    } catch (error) {
      console.error('Error loading settings:', error);
      this.showError('Errore nel caricamento delle impostazioni');
    }
  }

  async fetchSettings() {
    return {
      general: { autoSave: true, autoSaveInterval: 10, confirmActions: true, showTutorials: true, interfaceDensity: 'normal' },
      appearance: { theme: 'auto', accentColor: 'blue', fontSize: 'medium', enableAnimations: true, animationSpeed: 'normal' },
      gameplay: { difficulty: 'normal', matchSpeed: 'normal', autoAdvance: false, matchDetail: 'medium', realism: 'balanced' },
      audio: { masterVolume: 80, musicVolume: 60, sfxVolume: 70, enableMusic: true, enableSfx: true },
      notifications: { enableNotifications: true, matchNotifications: true, transferNotifications: true, injuryNotifications: true, newsNotifications: true },
      accessibility: { highContrast: false, reduceMotion: false, textSize: 'normal', enhancedDescriptions: false, focusHighlight: true },
      language: { language: 'it' }
    };
  }

  applySettingsToComponents(settings) {
    document.querySelectorAll('.settings-panel').forEach(panel => {
      const section = panel.dataset.section;
      if (panel.settingsPanel && settings[section]) {
        panel.settingsPanel.setSettings(settings[section]);
      }
    });

    this.safeSet('theme-selector', 'setTheme', [settings.appearance.theme, settings.appearance.accentColor]);
    this.safeSet('language-selector', 'setLanguage', [settings.language.language]);
    document.querySelector('accessibility-options')?.setSettings(settings.accessibility);
    this.safeSet('gameplay-settings', 'setSettings', [settings.gameplay]);
  }

  bindEvents() {
    document.querySelector('.settings-tab-navigation')?.addEventListener('tabChange', (e) => this.switchTab(e.detail.tab));

    document.querySelectorAll('.settings-panel').forEach(panel =>
      panel.addEventListener('settingsChange', () => this.checkForUnsavedChanges())
    );

    document.querySelector('.save-all-btn')?.addEventListener('click', () => this.saveAllSettings());
    document.querySelector('.reset-all-btn')?.addEventListener('click', () => this.resetAllSettings());
    document.querySelector('.cancel-btn')?.addEventListener('click', () => this.cancelChanges());
    document.querySelector('.apply-btn')?.addEventListener('click', () => this.applySettings());
  }

  switchTab(tab) {
    document.querySelectorAll('.settings-panel-container').forEach(panel => {
      panel.style.display = 'none';
    });
    document.querySelector(`.settings-panel-container[data-section="${tab}"]`)?.style.setProperty('display', 'block');
  }

  checkForUnsavedChanges() {
    const hasChanges = [...document.querySelectorAll('.settings-panel')].some(panel =>
      panel.settingsPanel?.hasUnsavedChanges?.()
    );
    document.querySelector('.unsaved-changes-indicator').style.display = hasChanges ? 'flex' : 'none';
  }

  collectAllSettings() {
    const settings = {};
    document.querySelectorAll('.settings-panel').forEach(panel => {
      const section = panel.dataset.section;
      if (panel.settingsPanel) {
        settings[section] = panel.settingsPanel.getSettings();
      }
    });
    return settings;
  }

  async saveAllSettings() {
    try {
      const settings = this.collectAllSettings();
      await this.saveSettings(settings);
      document.querySelector('.unsaved-changes-indicator').style.display = 'none';
      this.showSuccess('Tutte le impostazioni salvate con successo');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showError('Errore nel salvataggio delle impostazioni');
    }
  }

  async applySettings() {
    try {
      const settings = this.collectAllSettings();
      await this.saveSettings(settings);
      this.applySettingsToComponents(settings);
      document.querySelector('.unsaved-changes-indicator').style.display = 'none';
      this.showSuccess('Impostazioni applicate con successo');
    } catch (error) {
      console.error('Error applying settings:', error);
      this.showError('Errore nell\'applicazione delle impostazioni');
    }
  }

  async saveSettings(settings) {
    console.log('Saving settings:', settings);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  }

  resetAllSettings() {
    if (!confirm('Sei sicuro di voler ripristinare tutte le impostazioni ai valori predefiniti?')) return;
    document.querySelectorAll('.settings-panel').forEach(panel => {
      panel.settingsPanel?.resetSettings();
    });
    this.safeSet('theme-selector', 'setTheme', ['auto', 'blue']);
    this.safeSet('language-selector', 'setLanguage', ['it']);
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
    this.showSuccess('Tutte le impostazioni ripristinate ai valori predefiniti');
  }

  cancelChanges() {
    if (!confirm('Sei sicuro di voler annullare tutte le modifiche non salvate?')) return;
    this.loadSettings();
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
  }

  safeSet(selectorClass, method, args) {
    const el = document.querySelector(`.${selectorClass}`);
    const instance = el?.[selectorClass.replace(/-([a-z])/g, (_, l) => l.toUpperCase())];
    if (instance && typeof instance[method] === 'function') {
      instance[method](...args);
    }
  }

  createDiv(className) {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }

  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'error' } }));
  }

  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'success' } }));
  }
}
