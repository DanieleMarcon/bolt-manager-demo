<div class="user-settings-page">
  <div class="page-header">
    <h2 class="page-title">Impostazioni</h2>
    <div class="page-actions">
      <button class="button button-ghost reset-all-btn">
        ↻ Reset Globale
      </button>
      <button class="button button-primary save-all-btn">
        💾 Salva Tutto
      </button>
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
      <button class="button button-ghost cancel-btn">
        Annulla
      </button>
      <button class="button button-primary apply-btn">
        Applica Impostazioni
      </button>
    </div>
  </div>

  <!-- Sponsor banner -->
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

/* Responsive styles */
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

<script>
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

async function initializePage() {
  try {
    // Initialize components
    initializeComponents();
    
    // Load settings
    await loadSettings();
    
    // Bind events
    bindEvents();
    
    console.log('User Settings page initialized');
  } catch (error) {
    console.error('Error initializing User Settings page:', error);
    showError('Errore durante l\'inizializzazione della pagina');
  }
}

function initializeComponents() {
  // Settings tab navigation
  const tabNavigationContainer = document.querySelector('.settings-tab-navigation-container');
  const tabNavigation = document.createElement('div');
  tabNavigation.className = 'settings-tab-navigation';
  tabNavigationContainer.appendChild(tabNavigation);
  
  // Settings panels
  const sections = ['general', 'appearance', 'gameplay', 'audio', 'notifications', 'accessibility', 'language', 'data', 'about'];
  
  sections.forEach(section => {
    const panelContainer = document.querySelector(`.settings-panel-container[data-section="${section}"]`);
    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.dataset.section = section;
    panelContainer.appendChild(panel);
  });
  
  // Theme selector (in appearance panel)
  const appearancePanel = document.querySelector('.settings-panel-container[data-section="appearance"]');
  const themeSelector = document.createElement('div');
  themeSelector.className = 'theme-selector';
  appearancePanel.appendChild(themeSelector);
  
  // Language selector (in language panel)
  const languagePanel = document.querySelector('.settings-panel-container[data-section="language"]');
  const languageSelector = document.createElement('div');
  languageSelector.className = 'language-selector';
  languagePanel.appendChild(languageSelector);
  
  // Accessibility options (in accessibility panel)
  const accessibilityPanel = document.querySelector('.settings-panel-container[data-section="accessibility"]');
  const accessibilityOptions = document.createElement('div');
  accessibilityOptions.className = 'accessibility-options';
  accessibilityPanel.appendChild(accessibilityOptions);
  
  // Gameplay settings (in gameplay panel)
  const gameplayPanel = document.querySelector('.settings-panel-container[data-section="gameplay"]');
  const gameplaySettings = document.createElement('div');
  gameplaySettings.className = 'gameplay-settings';
  gameplayPanel.appendChild(gameplaySettings);
  
  // Sponsor banner
  const sponsorBannerContainer = document.querySelector('.sponsor-banner-container');
  const sponsorBanner = document.createElement('div');
  sponsorBanner.className = 'sponsor-banner';
  sponsorBannerContainer.appendChild(sponsorBanner);
}

async function loadSettings() {
  try {
    // In a real app, this would call the UserSettings_Apply flow to get current settings
    const settings = await fetchSettings();
    
    // Apply settings to components
    applySettingsToComponents(settings);
  } catch (error) {
    console.error('Error loading settings:', error);
    showError('Errore nel caricamento delle impostazioni');
  }
}

async function fetchSettings() {
  // In a real app, this would call the backend API
  // For now, return mock data
  return {
    general: {
      autoSave: true,
      autoSaveInterval: 10,
      confirmActions: true,
      showTutorials: true,
      interfaceDensity: 'normal'
    },
    appearance: {
      theme: 'auto',
      accentColor: 'blue',
      fontSize: 'medium',
      enableAnimations: true,
      animationSpeed: 'normal'
    },
    gameplay: {
      difficulty: 'normal',
      matchSpeed: 'normal',
      autoAdvance: false,
      matchDetail: 'medium',
      realism: 'balanced'
    },
    audio: {
      masterVolume: 80,
      musicVolume: 60,
      sfxVolume: 70,
      enableMusic: true,
      enableSfx: true
    },
    notifications: {
      enableNotifications: true,
      matchNotifications: true,
      transferNotifications: true,
      injuryNotifications: true,
      newsNotifications: true
    },
    accessibility: {
      highContrast: false,
      reduceMotion: false,
      textSize: 'normal',
      enhancedDescriptions: false,
      focusHighlight: true
    },
    language: {
      language: 'it'
    }
  };
}

function applySettingsToComponents(settings) {
  // Apply settings to each component
  const settingsPanels = document.querySelectorAll('.settings-panel');
  settingsPanels.forEach(panel => {
    if (panel.settingsPanel) {
      const section = panel.dataset.section;
      if (settings[section]) {
        panel.settingsPanel.setSettings(settings[section]);
      }
    }
  });
  
  // Apply theme settings
  const themeSelector = document.querySelector('.theme-selector');
  if (themeSelector && themeSelector.themeSelector) {
    themeSelector.themeSelector.setTheme(settings.appearance.theme, settings.appearance.accentColor);
  }
  
  // Apply language settings
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector && languageSelector.languageSelector) {
    languageSelector.languageSelector.setLanguage(settings.language.language);
  }
  
  // Apply accessibility settings
  const accessibilityOptions = document.querySelector('.accessibility-options');
  if (accessibilityOptions && accessibilityOptions.accessibilityOptions) {
    accessibilityOptions.accessibilityOptions.setSettings(settings.accessibility);
  }
  
  // Apply gameplay settings
  const gameplaySettings = document.querySelector('.gameplay-settings');
  if (gameplaySettings && gameplaySettings.gameplaySettings) {
    gameplaySettings.gameplaySettings.setSettings(settings.gameplay);
  }
}

function bindEvents() {
  // Tab navigation
  document.querySelector('.settings-tab-navigation').addEventListener('tabChange', (e) => {
    switchSettingsTab(e.detail.tab);
  });
  
  // Settings changes
  document.querySelectorAll('.settings-panel').forEach(panel => {
    panel.addEventListener('settingsChange', () => {
      checkForUnsavedChanges();
    });
  });
  
  // Save all button
  document.querySelector('.save-all-btn').addEventListener('click', () => {
    saveAllSettings();
  });
  
  // Reset all button
  document.querySelector('.reset-all-btn').addEventListener('click', () => {
    resetAllSettings();
  });
  
  // Cancel button
  document.querySelector('.cancel-btn').addEventListener('click', () => {
    cancelChanges();
  });
  
  // Apply button
  document.querySelector('.apply-btn').addEventListener('click', () => {
    applySettings();
  });
}

function switchSettingsTab(tab) {
  // Hide all panels
  document.querySelectorAll('.settings-panel-container').forEach(panel => {
    panel.style.display = 'none';
  });
  
  // Show selected panel
  const selectedPanel = document.querySelector(`.settings-panel-container[data-section="${tab}"]`);
  if (selectedPanel) {
    selectedPanel.style.display = 'block';
  }
}

function checkForUnsavedChanges() {
  let hasChanges = false;
  
  // Check each settings panel for changes
  document.querySelectorAll('.settings-panel').forEach(panel => {
    if (panel.settingsPanel && panel.settingsPanel.hasUnsavedChanges()) {
      hasChanges = true;
    }
  });
  
  // Update UI
  document.querySelector('.unsaved-changes-indicator').style.display = hasChanges ? 'flex' : 'none';
}

async function saveAllSettings() {
  try {
    // Collect settings from all panels
    const settings = collectAllSettings();
    
    // In a real app, this would call the UserSettings_Apply flow
    await saveSettings(settings);
    
    // Update UI
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
    
    showSuccess('Tutte le impostazioni salvate con successo');
  } catch (error) {
    console.error('Error saving settings:', error);
    showError('Errore nel salvataggio delle impostazioni');
  }
}

function collectAllSettings() {
  const settings = {};
  
  // Collect settings from each panel
  document.querySelectorAll('.settings-panel').forEach(panel => {
    if (panel.settingsPanel) {
      const section = panel.dataset.section;
      settings[section] = panel.settingsPanel.getSettings();
    }
  });
  
  return settings;
}

async function saveSettings(settings) {
  // In a real app, this would call the UserSettings_Apply flow
  console.log('Saving settings:', settings);
  
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

function resetAllSettings() {
  if (confirm('Sei sicuro di voler ripristinare tutte le impostazioni ai valori predefiniti? Questa azione non può essere annullata.')) {
    // Reset each settings panel
    document.querySelectorAll('.settings-panel').forEach(panel => {
      if (panel.settingsPanel) {
        panel.settingsPanel.resetSettings();
      }
    });
    
    // Reset theme selector
    const themeSelector = document.querySelector('.theme-selector');
    if (themeSelector && themeSelector.themeSelector) {
      themeSelector.themeSelector.setTheme('auto', 'blue');
    }
    
    // Reset language selector
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector && languageSelector.languageSelector) {
      languageSelector.languageSelector.setLanguage('it');
    }
    
    // Update UI
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
    
    showSuccess('Tutte le impostazioni ripristinate ai valori predefiniti');
  }
}

function cancelChanges() {
  if (confirm('Sei sicuro di voler annullare tutte le modifiche non salvate?')) {
    // Reload settings
    loadSettings();
    
    // Update UI
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
  }
}

async function applySettings() {
  try {
    // Collect settings from all panels
    const settings = collectAllSettings();
    
    // In a real app, this would call the UserSettings_Apply flow
    await saveSettings(settings);
    
    // Apply settings immediately
    applySettingsToComponents(settings);
    
    // Update UI
    document.querySelector('.unsaved-changes-indicator').style.display = 'none';
    
    showSuccess('Impostazioni applicate con successo');
  } catch (error) {
    console.error('Error applying settings:', error);
    showError('Errore nell\'applicazione delle impostazioni');
  }
}

function showError(message) {
  // Show error toast
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message, type: 'error' }
  }));
}

function showSuccess(message) {
  // Show success toast
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message, type: 'success' }
  }));
}
</script>