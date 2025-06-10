// User Settings Page implementation
export class UserSettingsPage {
    constructor() {
        this.gameManager = null;
        this.currentSettings = {};
        this.originalSettings = {};
        this.activeTab = 'appearance';
        this.hasUnsavedChanges = false;
    }

    async init() {
        console.log('⚙️ Initializing UserSettingsPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadSettingsData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Impostazioni</span>
                </nav>

                <!-- Settings Header -->
                <div class="settings-header">
                    <h2>Impostazioni Utente</h2>
                    <div class="settings-actions">
                        <button id="resetSettingsBtn" class="button button-ghost">
                            🔄 Ripristina Default
                        </button>
                        <button id="exportSettingsBtn" class="button button-secondary">
                            📤 Esporta
                        </button>
                        <button id="importSettingsBtn" class="button button-secondary">
                            📥 Importa
                        </button>
                        <input type="file" id="importFileInput" accept=".json" style="display: none;">
                    </div>
                </div>

                <!-- Settings Layout -->
                <div class="settings-layout">
                    <!-- Settings Navigation -->
                    <nav class="settings-nav">
                        <div class="settings-tabs">
                            <button class="settings-tab active" data-tab="appearance">
                                <span class="tab-icon">🎨</span>
                                <span class="tab-label">Aspetto</span>
                            </button>
                            <button class="settings-tab" data-tab="localization">
                                <span class="tab-icon">🌐</span>
                                <span class="tab-label">Lingua</span>
                            </button>
                            <button class="settings-tab" data-tab="audio">
                                <span class="tab-icon">🔊</span>
                                <span class="tab-label">Audio</span>
                            </button>
                            <button class="settings-tab" data-tab="notifications">
                                <span class="tab-icon">🔔</span>
                                <span class="tab-label">Notifiche</span>
                            </button>
                            <button class="settings-tab" data-tab="interface">
                                <span class="tab-icon">🖥️</span>
                                <span class="tab-label">Interfaccia</span>
                            </button>
                            <button class="settings-tab" data-tab="gameplay">
                                <span class="tab-icon">🎮</span>
                                <span class="tab-label">Gameplay</span>
                            </button>
                            <button class="settings-tab" data-tab="accessibility">
                                <span class="tab-icon">♿</span>
                                <span class="tab-label">Accessibilità</span>
                            </button>
                            <button class="settings-tab" data-tab="privacy">
                                <span class="tab-icon">🔒</span>
                                <span class="tab-label">Privacy</span>
                            </button>
                            <button class="settings-tab" data-tab="advanced">
                                <span class="tab-icon">⚡</span>
                                <span class="tab-label">Avanzate</span>
                            </button>
                        </div>

                        <!-- Sponsor Slot in Sidebar -->
                        <div class="sponsor-sidebar">
                            <div class="sponsor-content">
                                <span class="sponsor-label">Settings by</span>
                                <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=80&fit=crop" 
                                     alt="Sponsor Settings" class="sponsor-image">
                            </div>
                        </div>
                    </nav>

                    <!-- Settings Content -->
                    <main class="settings-content">
                        <div id="settingsPanel" class="settings-panel">
                            <!-- Will be populated by loadSettingsPanel() -->
                        </div>

                        <!-- Preview Area -->
                        <div id="previewArea" class="preview-area">
                            <h4>Anteprima Live</h4>
                            <div id="previewContent" class="preview-content">
                                <p>Le modifiche verranno applicate in tempo reale</p>
                            </div>
                        </div>
                    </main>
                </div>

                <!-- Settings Footer -->
                <div class="settings-footer">
                    <div class="unsaved-changes" id="unsavedChanges" style="display: none;">
                        <span class="changes-indicator">⚠️ Modifiche non salvate</span>
                    </div>
                    <div class="footer-actions">
                        <button id="cancelChangesBtn" class="button button-ghost">
                            Annulla
                        </button>
                        <button id="applySettingsBtn" class="button button-primary">
                            💾 Applica Modifiche
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Tab navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.settings-tab')) {
                const tab = e.target.closest('.settings-tab');
                const tabId = tab.dataset.tab;
                this.switchTab(tabId);
            }
        });

        // Settings actions
        document.getElementById('resetSettingsBtn')?.addEventListener('click', () => {
            this.resetToDefaults();
        });

        document.getElementById('exportSettingsBtn')?.addEventListener('click', () => {
            this.exportSettings();
        });

        document.getElementById('importSettingsBtn')?.addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });

        document.getElementById('importFileInput')?.addEventListener('change', (e) => {
            this.importSettings(e.target.files[0]);
        });

        // Footer actions
        document.getElementById('cancelChangesBtn')?.addEventListener('click', () => {
            this.cancelChanges();
        });

        document.getElementById('applySettingsBtn')?.addEventListener('click', () => {
            this.applySettings();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.cancelChanges();
            } else if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.applySettings();
            }
        });

        // Warn before leaving with unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (this.hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = 'Hai modifiche non salvate. Sei sicuro di voler uscire?';
            }
        });
    }

    loadSettingsData() {
        if (!this.gameManager) {
            console.log('GameManager not available');
            return;
        }

        // Load current settings
        this.currentSettings = this.gameManager.getUserSettings();
        this.originalSettings = JSON.parse(JSON.stringify(this.currentSettings));

        // Load initial panel
        this.loadSettingsPanel(this.activeTab);
    }

    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        this.activeTab = tabId;
        this.loadSettingsPanel(tabId);
    }

    loadSettingsPanel(category) {
        const panelHTML = this.generateSettingsPanel(category);
        document.getElementById('settingsPanel').innerHTML = panelHTML;

        // Setup panel-specific listeners
        this.setupPanelListeners(category);

        // Update preview
        this.updatePreview(category);
    }

    generateSettingsPanel(category) {
        switch (category) {
            case 'appearance':
                return this.generateAppearancePanel();
            case 'localization':
                return this.generateLocalizationPanel();
            case 'audio':
                return this.generateAudioPanel();
            case 'notifications':
                return this.generateNotificationsPanel();
            case 'interface':
                return this.generateInterfacePanel();
            case 'gameplay':
                return this.generateGameplayPanel();
            case 'accessibility':
                return this.generateAccessibilityPanel();
            case 'privacy':
                return this.generatePrivacyPanel();
            case 'advanced':
                return this.generateAdvancedPanel();
            default:
                return '<p>Categoria non trovata</p>';
        }
    }

    generateAppearancePanel() {
        const settings = this.currentSettings.appearance || {};
        
        return `
            <div class="settings-section">
                <h3>Aspetto e Tema</h3>
                <p class="section-description">Personalizza l'aspetto dell'interfaccia</p>

                <div class="setting-group">
                    <label class="setting-label">Tema</label>
                    <div class="setting-control">
                        <div class="theme-selector">
                            <label class="theme-option">
                                <input type="radio" name="theme" value="light" ${settings.theme === 'light' ? 'checked' : ''}>
                                <div class="theme-preview theme-light">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Chiaro</span>
                            </label>
                            <label class="theme-option">
                                <input type="radio" name="theme" value="dark" ${settings.theme === 'dark' ? 'checked' : ''}>
                                <div class="theme-preview theme-dark">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Scuro</span>
                            </label>
                            <label class="theme-option">
                                <input type="radio" name="theme" value="auto" ${settings.theme === 'auto' ? 'checked' : ''}>
                                <div class="theme-preview theme-auto">
                                    <div class="theme-header"></div>
                                    <div class="theme-content"></div>
                                </div>
                                <span class="theme-name">Automatico</span>
                            </label>
                        </div>
                    </div>
                    <div class="setting-help">Il tema automatico segue le impostazioni del sistema</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="colorScheme">Schema Colori</label>
                    <div class="setting-control">
                        <select id="colorScheme" class="setting-select">
                            <option value="default" ${settings.color_scheme === 'default' ? 'selected' : ''}>Default</option>
                            <option value="blue" ${settings.color_scheme === 'blue' ? 'selected' : ''}>Blu</option>
                            <option value="green" ${settings.color_scheme === 'green' ? 'selected' : ''}>Verde</option>
                            <option value="red" ${settings.color_scheme === 'red' ? 'selected' : ''}>Rosso</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="backgroundStyle">Stile Sfondo</label>
                    <div class="setting-control">
                        <select id="backgroundStyle" class="setting-select">
                            <option value="default" ${settings.background_style === 'default' ? 'selected' : ''}>Standard</option>
                            <option value="minimal" ${settings.background_style === 'minimal' ? 'selected' : ''}>Minimale</option>
                            <option value="rich" ${settings.background_style === 'rich' ? 'selected' : ''}>Ricco</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    generateLocalizationPanel() {
        const settings = this.currentSettings.localization || {};
        
        return `
            <div class="settings-section">
                <h3>Lingua e Localizzazione</h3>
                <p class="section-description">Configura lingua e formati regionali</p>

                <div class="setting-group">
                    <label class="setting-label" for="language">Lingua</label>
                    <div class="setting-control">
                        <select id="language" class="setting-select">
                            <option value="it" ${settings.language === 'it' ? 'selected' : ''}>🇮🇹 Italiano</option>
                            <option value="en" ${settings.language === 'en' ? 'selected' : ''}>🇬🇧 English</option>
                            <option value="es" ${settings.language === 'es' ? 'selected' : ''}>🇪🇸 Español</option>
                            <option value="fr" ${settings.language === 'fr' ? 'selected' : ''}>🇫🇷 Français</option>
                            <option value="de" ${settings.language === 'de' ? 'selected' : ''}>🇩🇪 Deutsch</option>
                        </select>
                    </div>
                    <div class="setting-help">Richiede ricaricamento della pagina</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="currency">Valuta</label>
                    <div class="setting-control">
                        <select id="currency" class="setting-select">
                            <option value="EUR" ${settings.currency === 'EUR' ? 'selected' : ''}>€ Euro</option>
                            <option value="USD" ${settings.currency === 'USD' ? 'selected' : ''}>$ Dollaro USA</option>
                            <option value="GBP" ${settings.currency === 'GBP' ? 'selected' : ''}>£ Sterlina</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="dateFormat">Formato Data</label>
                    <div class="setting-control">
                        <select id="dateFormat" class="setting-select">
                            <option value="DD/MM/YYYY" ${settings.date_format === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY" ${settings.date_format === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD" ${settings.date_format === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div class="setting-help">Esempio: ${this.formatDateExample(settings.date_format)}</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="timeFormat">Formato Ora</label>
                    <div class="setting-control">
                        <select id="timeFormat" class="setting-select">
                            <option value="24h" ${settings.time_format === '24h' ? 'selected' : ''}>24 ore (15:30)</option>
                            <option value="12h" ${settings.time_format === '12h' ? 'selected' : ''}>12 ore (3:30 PM)</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    generateAudioPanel() {
        const settings = this.currentSettings.audio || {};
        
        return `
            <div class="settings-section">
                <h3>Audio e Suoni</h3>
                <p class="section-description">Configura effetti sonori e musica</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="soundEnabled" ${settings.sound_enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Effetti Sonori</span>
                        </label>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="soundVolume">Volume Effetti</label>
                    <div class="setting-control">
                        <div class="volume-control">
                            <input type="range" id="soundVolume" min="0" max="100" value="${settings.sound_volume || 50}" class="volume-slider">
                            <span class="volume-value">${settings.sound_volume || 50}%</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="musicEnabled" ${settings.music_enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Musica di Sottofondo</span>
                        </label>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="musicVolume">Volume Musica</label>
                    <div class="setting-control">
                        <div class="volume-control">
                            <input type="range" id="musicVolume" min="0" max="100" value="${settings.music_volume || 30}" class="volume-slider">
                            <span class="volume-value">${settings.music_volume || 30}%</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <h4>Suoni Specifici</h4>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="uiSounds" ${settings.ui_sounds ? 'checked' : ''}>
                            <span class="checkbox-text">Suoni Interfaccia</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="matchSounds" ${settings.match_sounds ? 'checked' : ''}>
                            <span class="checkbox-text">Suoni Partita</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="notificationSounds" ${settings.notification_sounds ? 'checked' : ''}>
                            <span class="checkbox-text">Suoni Notifiche</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    generateNotificationsPanel() {
        const settings = this.currentSettings.notifications || {};
        
        return `
            <div class="settings-section">
                <h3>Notifiche</h3>
                <p class="section-description">Gestisci quando e come ricevere notifiche</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="notificationsEnabled" ${settings.enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Abilita Notifiche</span>
                        </label>
                    </div>
                    <div class="setting-help">Disabilita tutte le notifiche</div>
                </div>

                <div class="setting-group">
                    <h4>Tipi di Notifiche</h4>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="matchEvents" ${settings.match_events ? 'checked' : ''}>
                            <span class="checkbox-text">Eventi Partita</span>
                            <span class="checkbox-description">Gol, cartellini, sostituzioni</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="transferUpdates" ${settings.transfer_updates ? 'checked' : ''}>
                            <span class="checkbox-text">Aggiornamenti Trasferimenti</span>
                            <span class="checkbox-description">Offerte, trattative, completamenti</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="trainingResults" ${settings.training_results ? 'checked' : ''}>
                            <span class="checkbox-text">Risultati Allenamento</span>
                            <span class="checkbox-description">Progressi e miglioramenti giocatori</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="injuryAlerts" ${settings.injury_alerts ? 'checked' : ''}>
                            <span class="checkbox-text">Avvisi Infortuni</span>
                            <span class="checkbox-description">Infortuni e recuperi</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="contractExpiry" ${settings.contract_expiry ? 'checked' : ''}>
                            <span class="checkbox-text">Scadenze Contratti</span>
                            <span class="checkbox-description">Contratti in scadenza</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="achievementUnlocked" ${settings.achievement_unlocked ? 'checked' : ''}>
                            <span class="checkbox-text">Obiettivi Raggiunti</span>
                            <span class="checkbox-description">Traguardi e riconoscimenti</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="systemMessages" ${settings.system_messages ? 'checked' : ''}>
                            <span class="checkbox-text">Messaggi Sistema</span>
                            <span class="checkbox-description">Aggiornamenti e manutenzione</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    generateInterfacePanel() {
        const settings = this.currentSettings.interface || {};
        
        return `
            <div class="settings-section">
                <h3>Interfaccia Utente</h3>
                <p class="section-description">Personalizza l'aspetto e il comportamento dell'interfaccia</p>

                <div class="setting-group">
                    <label class="setting-label" for="uiDensity">Densità Interfaccia</label>
                    <div class="setting-control">
                        <select id="uiDensity" class="setting-select">
                            <option value="compact" ${settings.ui_density === 'compact' ? 'selected' : ''}>Compatta</option>
                            <option value="normal" ${settings.ui_density === 'normal' ? 'selected' : ''}>Normale</option>
                            <option value="spacious" ${settings.ui_density === 'spacious' ? 'selected' : ''}>Spaziosa</option>
                        </select>
                    </div>
                    <div class="setting-help">Controlla la spaziatura degli elementi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="showTooltips" ${settings.show_tooltips ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Mostra Suggerimenti</span>
                        </label>
                    </div>
                    <div class="setting-help">Suggerimenti al passaggio del mouse</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="showAnimations" ${settings.show_animations ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Animazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Transizioni e effetti animati</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="autoSaveFrequency">Frequenza Salvataggio Automatico</label>
                    <div class="setting-control">
                        <div class="frequency-control">
                            <input type="range" id="autoSaveFrequency" min="1" max="60" value="${settings.auto_save_frequency || 5}" class="frequency-slider">
                            <span class="frequency-value">${settings.auto_save_frequency || 5} minuti</span>
                        </div>
                    </div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="confirmActions" ${settings.confirm_actions ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Conferma Azioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Richiedi conferma per azioni importanti</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="quickNavigation" ${settings.quick_navigation ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Navigazione Rapida</span>
                        </label>
                    </div>
                    <div class="setting-help">Scorciatoie da tastiera e navigazione veloce</div>
                </div>
            </div>
        `;
    }

    generateGameplayPanel() {
        const settings = this.currentSettings.gameplay || {};
        
        return `
            <div class="settings-section">
                <h3>Gameplay</h3>
                <p class="section-description">Configura l'esperienza di gioco</p>

                <div class="setting-group">
                    <label class="setting-label" for="matchSpeed">Velocità Partite</label>
                    <div class="setting-control">
                        <select id="matchSpeed" class="setting-select">
                            <option value="slow" ${settings.match_speed === 'slow' ? 'selected' : ''}>Lenta</option>
                            <option value="normal" ${settings.match_speed === 'normal' ? 'selected' : ''}>Normale</option>
                            <option value="fast" ${settings.match_speed === 'fast' ? 'selected' : ''}>Veloce</option>
                        </select>
                    </div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="matchDetailLevel">Livello Dettaglio Partite</label>
                    <div class="setting-control">
                        <select id="matchDetailLevel" class="setting-select">
                            <option value="low" ${settings.match_detail_level === 'low' ? 'selected' : ''}>Basso</option>
                            <option value="medium" ${settings.match_detail_level === 'medium' ? 'selected' : ''}>Medio</option>
                            <option value="high" ${settings.match_detail_level === 'high' ? 'selected' : ''}>Alto</option>
                        </select>
                    </div>
                    <div class="setting-help">Quantità di eventi e statistiche mostrate</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="autoContinue" ${settings.auto_continue ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Continua Automaticamente</span>
                        </label>
                    </div>
                    <div class="setting-help">Avanza automaticamente dopo gli eventi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="pauseOnEvents" ${settings.pause_on_events ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Pausa su Eventi Importanti</span>
                        </label>
                    </div>
                    <div class="setting-help">Ferma il gioco per eventi critici</div>
                </div>

                <div class="setting-group">
                    <label class="setting-label" for="difficultyLevel">Livello Difficoltà</label>
                    <div class="setting-control">
                        <select id="difficultyLevel" class="setting-select">
                            <option value="easy" ${settings.difficulty_level === 'easy' ? 'selected' : ''}>Facile</option>
                            <option value="normal" ${settings.difficulty_level === 'normal' ? 'selected' : ''}>Normale</option>
                            <option value="hard" ${settings.difficulty_level === 'hard' ? 'selected' : ''}>Difficile</option>
                        </select>
                    </div>
                    <div class="setting-help">Influenza AI, mercato e sviluppo giocatori</div>
                </div>
            </div>
        `;
    }

    generateAccessibilityPanel() {
        const settings = this.currentSettings.accessibility || {};
        
        return `
            <div class="settings-section">
                <h3>Accessibilità</h3>
                <p class="section-description">Opzioni per migliorare l'accessibilità dell'interfaccia</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="reduceMotion" ${settings.reduce_motion ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Riduci Animazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Riduce movimenti e transizioni per sensibilità al movimento</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="highContrast" ${settings.high_contrast ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Alto Contrasto</span>
                        </label>
                    </div>
                    <div class="setting-help">Aumenta il contrasto per migliorare la leggibilità</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="largeText" ${settings.large_text ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Testo Grande</span>
                        </label>
                    </div>
                    <div class="setting-help">Aumenta la dimensione del testo</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="enhancedFocus" ${settings.enhanced_focus ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Focus Migliorato</span>
                        </label>
                    </div>
                    <div class="setting-help">Indicatori di focus più visibili per navigazione da tastiera</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="keyboardNavigation" ${settings.keyboard_navigation ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Navigazione da Tastiera</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita navigazione completa da tastiera</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="colorBlindSupport" ${settings.color_blind_support ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Supporto Daltonismo</span>
                        </label>
                    </div>
                    <div class="setting-help">Utilizza pattern e simboli oltre ai colori</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="screenReaderSupport" ${settings.screen_reader_support ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Supporto Screen Reader</span>
                        </label>
                    </div>
                    <div class="setting-help">Ottimizzazioni per lettori di schermo</div>
                </div>
            </div>
        `;
    }

    generatePrivacyPanel() {
        const settings = this.currentSettings.privacy || {};
        
        return `
            <div class="settings-section">
                <h3>Privacy e Dati</h3>
                <p class="section-description">Controlla come vengono gestiti i tuoi dati</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="analyticsEnabled" ${settings.analytics_enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Analisi Utilizzo</span>
                        </label>
                    </div>
                    <div class="setting-help">Aiuta a migliorare l'esperienza di gioco</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="crashReporting" ${settings.crash_reporting ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Segnalazione Errori</span>
                        </label>
                    </div>
                    <div class="setting-help">Invia automaticamente report di errori</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="usageStatistics" ${settings.usage_statistics ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Statistiche Utilizzo</span>
                        </label>
                    </div>
                    <div class="setting-help">Raccoglie dati anonimi sull'utilizzo</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="dataSharing" ${settings.data_sharing ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Condivisione Dati</span>
                        </label>
                    </div>
                    <div class="setting-help">Condividi dati con partner per miglioramenti</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="backupEnabled" ${settings.backup_enabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Backup Automatico</span>
                        </label>
                    </div>
                    <div class="setting-help">Backup automatico dei salvataggi</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="cloudSync" ${settings.cloud_sync ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Sincronizzazione Cloud</span>
                        </label>
                    </div>
                    <div class="setting-help">Sincronizza salvataggi tra dispositivi</div>
                </div>

                <div class="setting-group">
                    <h4>Gestione Dati</h4>
                    <div class="data-management">
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.clearLocalData()">
                            🗑️ Cancella Dati Locali
                        </button>
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.downloadUserData()">
                            📥 Scarica I Miei Dati
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateAdvancedPanel() {
        const settings = this.currentSettings.advanced || {};
        
        return `
            <div class="settings-section">
                <h3>Impostazioni Avanzate</h3>
                <p class="section-description">Opzioni per utenti esperti</p>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="performanceMode" ${settings.performance_mode ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Modalità Prestazioni</span>
                        </label>
                    </div>
                    <div class="setting-help">Riduce effetti grafici per migliorare le prestazioni</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="debugMode" ${settings.debug_mode ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Modalità Debug</span>
                        </label>
                    </div>
                    <div class="setting-help">Mostra informazioni di debug nella console</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="experimentalFeatures" ${settings.experimental_features ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Funzionalità Sperimentali</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita funzionalità in fase di test</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="betaUpdates" ${settings.beta_updates ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Aggiornamenti Beta</span>
                        </label>
                    </div>
                    <div class="setting-help">Ricevi aggiornamenti in anteprima</div>
                </div>

                <div class="setting-group">
                    <div class="setting-toggle">
                        <label class="toggle-label">
                            <input type="checkbox" id="developerTools" ${settings.developer_tools ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Strumenti Sviluppatore</span>
                        </label>
                    </div>
                    <div class="setting-help">Abilita strumenti per sviluppatori</div>
                </div>

                <div class="setting-group">
                    <h4>Informazioni Sistema</h4>
                    <div class="system-info">
                        <div class="info-item">
                            <span class="info-label">Versione:</span>
                            <span class="info-value">Bolt Manager 1.0.0</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Browser:</span>
                            <span class="info-value">${navigator.userAgent.split(' ')[0]}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Memoria Utilizzata:</span>
                            <span class="info-value">${this.getMemoryUsage()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupPanelListeners(category) {
        // Setup listeners based on category
        switch (category) {
            case 'appearance':
                this.setupAppearanceListeners();
                break;
            case 'localization':
                this.setupLocalizationListeners();
                break;
            case 'audio':
                this.setupAudioListeners();
                break;
            case 'notifications':
                this.setupNotificationsListeners();
                break;
            case 'interface':
                this.setupInterfaceListeners();
                break;
            case 'gameplay':
                this.setupGameplayListeners();
                break;
            case 'accessibility':
                this.setupAccessibilityListeners();
                break;
            case 'privacy':
                this.setupPrivacyListeners();
                break;
            case 'advanced':
                this.setupAdvancedListeners();
                break;
        }
    }

    setupAppearanceListeners() {
        // Theme selection
        document.querySelectorAll('input[name="theme"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateSetting('appearance', 'theme', e.target.value);
                this.previewThemeChange(e.target.value);
            });
        });

        // Color scheme
        document.getElementById('colorScheme')?.addEventListener('change', (e) => {
            this.updateSetting('appearance', 'color_scheme', e.target.value);
        });

        // Background style
        document.getElementById('backgroundStyle')?.addEventListener('change', (e) => {
            this.updateSetting('appearance', 'background_style', e.target.value);
        });
    }

    setupLocalizationListeners() {
        document.getElementById('language')?.addEventListener('change', (e) => {
            this.updateSetting('localization', 'language', e.target.value);
        });

        document.getElementById('currency')?.addEventListener('change', (e) => {
            this.updateSetting('localization', 'currency', e.target.value);
        });

        document.getElementById('dateFormat')?.addEventListener('change', (e) => {
            this.updateSetting('localization', 'date_format', e.target.value);
            this.updateDateFormatExample(e.target.value);
        });

        document.getElementById('timeFormat')?.addEventListener('change', (e) => {
            this.updateSetting('localization', 'time_format', e.target.value);
        });
    }

    setupAudioListeners() {
        // Sound enabled
        document.getElementById('soundEnabled')?.addEventListener('change', (e) => {
            this.updateSetting('audio', 'sound_enabled', e.target.checked);
        });

        // Sound volume
        document.getElementById('soundVolume')?.addEventListener('input', (e) => {
            this.updateSetting('audio', 'sound_volume', parseInt(e.target.value));
            this.updateVolumeDisplay('soundVolume', e.target.value);
        });

        // Music enabled
        document.getElementById('musicEnabled')?.addEventListener('change', (e) => {
            this.updateSetting('audio', 'music_enabled', e.target.checked);
        });

        // Music volume
        document.getElementById('musicVolume')?.addEventListener('input', (e) => {
            this.updateSetting('audio', 'music_volume', parseInt(e.target.value));
            this.updateVolumeDisplay('musicVolume', e.target.value);
        });

        // Specific sounds
        ['uiSounds', 'matchSounds', 'notificationSounds'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                const settingName = id.replace(/([A-Z])/g, '_$1').toLowerCase();
                this.updateSetting('audio', settingName, e.target.checked);
            });
        });
    }

    setupNotificationsListeners() {
        // Main notifications toggle
        document.getElementById('notificationsEnabled')?.addEventListener('change', (e) => {
            this.updateSetting('notifications', 'enabled', e.target.checked);
        });

        // Individual notification types
        const notificationTypes = [
            'matchEvents', 'transferUpdates', 'trainingResults', 
            'injuryAlerts', 'contractExpiry', 'achievementUnlocked', 'systemMessages'
        ];

        notificationTypes.forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                const settingName = id.replace(/([A-Z])/g, '_$1').toLowerCase();
                this.updateSetting('notifications', settingName, e.target.checked);
            });
        });
    }

    setupInterfaceListeners() {
        document.getElementById('uiDensity')?.addEventListener('change', (e) => {
            this.updateSetting('interface', 'ui_density', e.target.value);
            this.previewUIDensity(e.target.value);
        });

        document.getElementById('showTooltips')?.addEventListener('change', (e) => {
            this.updateSetting('interface', 'show_tooltips', e.target.checked);
        });

        document.getElementById('showAnimations')?.addEventListener('change', (e) => {
            this.updateSetting('interface', 'show_animations', e.target.checked);
            this.previewAnimations(e.target.checked);
        });

        document.getElementById('autoSaveFrequency')?.addEventListener('input', (e) => {
            this.updateSetting('interface', 'auto_save_frequency', parseInt(e.target.value));
            this.updateFrequencyDisplay(e.target.value);
        });

        document.getElementById('confirmActions')?.addEventListener('change', (e) => {
            this.updateSetting('interface', 'confirm_actions', e.target.checked);
        });

        document.getElementById('quickNavigation')?.addEventListener('change', (e) => {
            this.updateSetting('interface', 'quick_navigation', e.target.checked);
        });
    }

    setupGameplayListeners() {
        document.getElementById('matchSpeed')?.addEventListener('change', (e) => {
            this.updateSetting('gameplay', 'match_speed', e.target.value);
        });

        document.getElementById('matchDetailLevel')?.addEventListener('change', (e) => {
            this.updateSetting('gameplay', 'match_detail_level', e.target.value);
        });

        document.getElementById('autoContinue')?.addEventListener('change', (e) => {
            this.updateSetting('gameplay', 'auto_continue', e.target.checked);
        });

        document.getElementById('pauseOnEvents')?.addEventListener('change', (e) => {
            this.updateSetting('gameplay', 'pause_on_events', e.target.checked);
        });

        document.getElementById('difficultyLevel')?.addEventListener('change', (e) => {
            this.updateSetting('gameplay', 'difficulty_level', e.target.value);
        });
    }

    setupAccessibilityListeners() {
        const accessibilitySettings = [
            'reduceMotion', 'highContrast', 'largeText', 'enhancedFocus',
            'keyboardNavigation', 'colorBlindSupport', 'screenReaderSupport'
        ];

        accessibilitySettings.forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                const settingName = id.replace(/([A-Z])/g, '_$1').toLowerCase();
                this.updateSetting('accessibility', settingName, e.target.checked);
                this.previewAccessibilityChange(settingName, e.target.checked);
            });
        });
    }

    setupPrivacyListeners() {
        const privacySettings = [
            'analyticsEnabled', 'crashReporting', 'usageStatistics',
            'dataSharing', 'backupEnabled', 'cloudSync'
        ];

        privacySettings.forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                const settingName = id.replace(/([A-Z])/g, '_$1').toLowerCase();
                this.updateSetting('privacy', settingName, e.target.checked);
            });
        });
    }

    setupAdvancedListeners() {
        const advancedSettings = [
            'performanceMode', 'debugMode', 'experimentalFeatures',
            'betaUpdates', 'developerTools'
        ];

        advancedSettings.forEach(id => {
            document.getElementById(id)?.addEventListener('change', (e) => {
                const settingName = id.replace(/([A-Z])/g, '_$1').toLowerCase();
                this.updateSetting('advanced', settingName, e.target.checked);
            });
        });
    }

    updateSetting(category, setting, value) {
        if (!this.currentSettings[category]) {
            this.currentSettings[category] = {};
        }
        
        this.currentSettings[category][setting] = value;
        this.markAsChanged();
    }

    markAsChanged() {
        this.hasUnsavedChanges = true;
        document.getElementById('unsavedChanges').style.display = 'block';
    }

    // Preview methods
    previewThemeChange(theme) {
        // Apply theme immediately for preview
        const body = document.body;
        body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
        
        switch (theme) {
            case 'dark':
                body.classList.add('theme-dark');
                break;
            case 'auto':
                body.classList.add('theme-auto');
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    body.classList.add('theme-dark');
                } else {
                    body.classList.add('theme-light');
                }
                break;
            default:
                body.classList.add('theme-light');
        }
    }

    previewUIDensity(density) {
        const body = document.body;
        body.classList.remove('ui-compact', 'ui-normal', 'ui-spacious');
        body.classList.add(`ui-${density}`);
    }

    previewAnimations(enabled) {
        document.body.dataset.showAnimations = enabled;
    }

    previewAccessibilityChange(setting, enabled) {
        const body = document.body;
        
        switch (setting) {
            case 'reduce_motion':
                if (enabled) body.classList.add('reduce-motion');
                else body.classList.remove('reduce-motion');
                break;
            case 'high_contrast':
                if (enabled) body.classList.add('high-contrast');
                else body.classList.remove('high-contrast');
                break;
            case 'large_text':
                if (enabled) body.classList.add('large-text');
                else body.classList.remove('large-text');
                break;
            case 'enhanced_focus':
                if (enabled) body.classList.add('enhanced-focus');
                else body.classList.remove('enhanced-focus');
                break;
        }
    }

    // Helper methods
    updateVolumeDisplay(sliderId, value) {
        const slider = document.getElementById(sliderId);
        const valueDisplay = slider?.parentElement.querySelector('.volume-value');
        if (valueDisplay) {
            valueDisplay.textContent = `${value}%`;
        }
    }

    updateFrequencyDisplay(value) {
        const valueDisplay = document.querySelector('.frequency-value');
        if (valueDisplay) {
            valueDisplay.textContent = `${value} minuti`;
        }
    }

    updateDateFormatExample(format) {
        const helpElement = document.querySelector('#dateFormat').parentElement.parentElement.querySelector('.setting-help');
        if (helpElement) {
            helpElement.textContent = `Esempio: ${this.formatDateExample(format)}`;
        }
    }

    formatDateExample(format) {
        const date = new Date();
        switch (format) {
            case 'DD/MM/YYYY':
                return date.toLocaleDateString('it-IT');
            case 'MM/DD/YYYY':
                return date.toLocaleDateString('en-US');
            case 'YYYY-MM-DD':
                return date.toISOString().split('T')[0];
            default:
                return date.toLocaleDateString();
        }
    }

    getMemoryUsage() {
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            return `${used} MB`;
        }
        return 'Non disponibile';
    }

    updatePreview(category) {
        const previewContent = document.getElementById('previewContent');
        
        switch (category) {
            case 'appearance':
                previewContent.innerHTML = `
                    <div class="preview-theme">
                        <div class="preview-header">Header</div>
                        <div class="preview-content">Contenuto</div>
                        <div class="preview-sidebar">Sidebar</div>
                    </div>
                `;
                break;
            case 'audio':
                previewContent.innerHTML = `
                    <div class="preview-audio">
                        <button class="preview-sound-btn" onclick="this.textContent = '🔊 Suono riprodotto!'">
                            🔊 Test Audio
                        </button>
                    </div>
                `;
                break;
            case 'accessibility':
                previewContent.innerHTML = `
                    <div class="preview-accessibility">
                        <p>Testo di esempio per testare le impostazioni di accessibilità</p>
                        <button class="preview-focus-btn">Elemento focalizzabile</button>
                    </div>
                `;
                break;
            default:
                previewContent.innerHTML = `
                    <p>Anteprima per ${category}</p>
                    <div class="preview-placeholder">Le modifiche verranno applicate in tempo reale</div>
                `;
        }
    }

    // Action methods
    async applySettings() {
        try {
            window.boltManager.uiManager.showLoading('Applicazione impostazioni...');

            const result = await this.gameManager.executeUserSettingsApply({
                action: 'apply',
                settings: this.currentSettings,
                applyLive: true
            });

            window.boltManager.uiManager.hideLoading();

            if (result.success) {
                this.originalSettings = JSON.parse(JSON.stringify(this.currentSettings));
                this.hasUnsavedChanges = false;
                document.getElementById('unsavedChanges').style.display = 'none';
                
                window.boltManager.uiManager.showToast('Impostazioni applicate con successo!', 'success');
            } else {
                window.boltManager.uiManager.showToast('Errore nell\'applicazione: ' + result.error, 'error');
            }

        } catch (error) {
            console.error('Error applying settings:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'applicazione delle impostazioni', 'error');
        }
    }

    cancelChanges() {
        if (this.hasUnsavedChanges) {
            const content = `
                <div class="cancel-confirm">
                    <h4>Annulla Modifiche</h4>
                    <p>Sei sicuro di voler annullare tutte le modifiche non salvate?</p>
                </div>
            `;

            window.boltManager.uiManager.showModal('Conferma Annullamento', content, [
                {
                    text: 'Annulla Modifiche',
                    class: 'button-error',
                    onclick: 'window.boltManager.uiManager.currentPage.confirmCancelChanges()'
                }
            ]);
        }
    }

    confirmCancelChanges() {
        // Restore original settings
        this.currentSettings = JSON.parse(JSON.stringify(this.originalSettings));
        this.hasUnsavedChanges = false;
        document.getElementById('unsavedChanges').style.display = 'none';
        
        // Reload current panel
        this.loadSettingsPanel(this.activeTab);
        
        // Apply original settings for preview
        this.gameManager.executeUserSettingsApply({
            action: 'apply',
            settings: this.currentSettings,
            applyLive: true
        });

        window.boltManager.uiManager.hideModal();
        window.boltManager.uiManager.showToast('Modifiche annullate', 'info');
    }

    async resetToDefaults() {
        const content = `
            <div class="reset-confirm">
                <h4>Ripristina Impostazioni Default</h4>
                <p>Sei sicuro di voler ripristinare tutte le impostazioni ai valori predefiniti?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Ripristina Default', content, [
            {
                text: 'Ripristina',
                class: 'button-error',
                onclick: 'window.boltManager.uiManager.currentPage.confirmResetToDefaults()'
            }
        ]);
    }

    async confirmResetToDefaults() {
        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Ripristino impostazioni...');

            const result = await this.gameManager.executeUserSettingsApply({
                action: 'reset',
                applyLive: true
            });

            if (result.success) {
                this.currentSettings = result.result.newSettings;
                this.originalSettings = JSON.parse(JSON.stringify(this.currentSettings));
                this.hasUnsavedChanges = false;
                document.getElementById('unsavedChanges').style.display = 'none';
                
                // Reload current panel
                this.loadSettingsPanel(this.activeTab);
                
                window.boltManager.uiManager.hideLoading();
                window.boltManager.uiManager.showToast('Impostazioni ripristinate ai valori predefiniti', 'success');
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Error resetting settings:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel ripristino delle impostazioni', 'error');
        }
    }

    async exportSettings() {
        try {
            const result = await this.gameManager.executeUserSettingsApply({
                action: 'export'
            });

            if (result.success) {
                const exportData = result.result.exportData;
                const dataStr = JSON.stringify(exportData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = `bolt_manager_settings_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                window.boltManager.uiManager.showToast('Impostazioni esportate con successo!', 'success');
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Error exporting settings:', error);
            window.boltManager.uiManager.showToast('Errore nell\'esportazione delle impostazioni', 'error');
        }
    }

    async importSettings(file) {
        if (!file) return;

        try {
            const text = await file.text();
            const importData = JSON.parse(text);

            const content = `
                <div class="import-confirm">
                    <h4>Conferma Importazione</h4>
                    <p>Stai per importare impostazioni dal file:</p>
                    <p><strong>${file.name}</strong></p>
                    <div class="import-details">
                        <p>Data esportazione: ${new Date(importData.exportDate).toLocaleDateString('it-IT')}</p>
                        <p>Versione: ${importData.version}</p>
                    </div>
                    <p class="warning">⚠️ Le impostazioni attuali verranno sostituite.</p>
                </div>
            `;

            window.boltManager.uiManager.showModal('Importa Impostazioni', content, [
                {
                    text: 'Importa',
                    class: 'button-primary',
                    onclick: `window.boltManager.uiManager.currentPage.confirmImportSettings('${btoa(text)}')`
                }
            ]);

        } catch (error) {
            console.error('Error reading import file:', error);
            window.boltManager.uiManager.showToast('Errore nella lettura del file: ' + error.message, 'error');
        }
    }

    async confirmImportSettings(encodedData) {
        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Importazione impostazioni...');

            const text = atob(encodedData);
            const importData = JSON.parse(text);

            const result = await this.gameManager.executeUserSettingsApply({
                action: 'import',
                importData: importData,
                applyLive: true
            });

            if (result.success) {
                this.currentSettings = result.result.newSettings;
                this.originalSettings = JSON.parse(JSON.stringify(this.currentSettings));
                this.hasUnsavedChanges = false;
                document.getElementById('unsavedChanges').style.display = 'none';
                
                // Reload current panel
                this.loadSettingsPanel(this.activeTab);
                
                window.boltManager.uiManager.hideLoading();
                window.boltManager.uiManager.showToast('Impostazioni importate con successo!', 'success');
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Error importing settings:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'importazione: ' + error.message, 'error');
        }
    }

    // Data management methods
    clearLocalData() {
        const content = `
            <div class="clear-data-confirm">
                <h4>Cancella Dati Locali</h4>
                <p>Sei sicuro di voler cancellare tutti i dati locali?</p>
                <p class="warning">⚠️ Questa azione cancellerà:</p>
                <ul>
                    <li>Tutte le partite salvate</li>
                    <li>Impostazioni personalizzate</li>
                    <li>Cache e dati temporanei</li>
                </ul>
                <p class="warning">Questa azione non può essere annullata!</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Cancella Dati', content, [
            {
                text: 'Cancella Tutto',
                class: 'button-error',
                onclick: 'window.boltManager.uiManager.currentPage.confirmClearLocalData()'
            }
        ]);
    }

    confirmClearLocalData() {
        try {
            // Clear all localStorage
            localStorage.clear();
            
            // Clear game data
            if (this.gameManager) {
                this.gameManager.gameData = null;
            }

            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showToast('Dati locali cancellati. Ricarica la pagina per continuare.', 'success');

            // Reload page after a delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Error clearing local data:', error);
            window.boltManager.uiManager.showToast('Errore nella cancellazione dei dati', 'error');
        }
    }

    downloadUserData() {
        try {
            const userData = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                settings: this.currentSettings,
                gameData: this.gameManager.gameData ? {
                    version: this.gameManager.gameData.gameVersion,
                    createdAt: this.gameManager.gameData.createdAt,
                    currentSeason: this.gameManager.gameData.currentSeason,
                    userTeam: this.gameManager.getUserTeam()?.name,
                    totalPlaytime: this.gameManager.gameData.userSession?.totalPlaytime
                } : null
            };

            const dataStr = JSON.stringify(userData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `bolt_manager_user_data_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            window.boltManager.uiManager.showToast('Dati utente scaricati con successo!', 'success');

        } catch (error) {
            console.error('Error downloading user data:', error);
            window.boltManager.uiManager.showToast('Errore nel download dei dati utente', 'error');
        }
    }
}