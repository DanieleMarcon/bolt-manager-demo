/**
 * FLOW: UserSettings_Apply
 * 
 * Gestisce il salvataggio, applicazione e ripristino delle preferenze di gioco dell'utente.
 * Valida le impostazioni, applica modifiche live e salva persistentemente.
 * 
 * Trigger: Salvataggio impostazioni dall'interfaccia utente
 * Input: Oggetto impostazioni (tema, lingua, audio, notifiche, accessibilità)
 * Output: Configurazione utente aggiornata e attiva, notifica di conferma
 * 
 * Dataset coinvolti:
 * - user_settings (lettura/scrittura)
 */

export class UserSettingsApplyFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.defaultSettings = this.getDefaultSettings();
    }

    /**
     * Esegue il flow di applicazione impostazioni utente
     * @param {Object} params - Parametri delle impostazioni
     * @param {string} params.action - Azione da eseguire ('apply', 'reset', 'import', 'export')
     * @param {Object} params.settings - Nuove impostazioni da applicare
     * @param {string} params.userId - ID utente (opzionale, default: 'default')
     * @param {Object} params.importData - Dati da importare (per action='import')
     * @param {boolean} params.applyLive - Se applicare modifiche immediatamente
     * @returns {Object} Risultato dell'applicazione
     */
    async execute(params) {
        try {
            console.log('⚙️ Executing UserSettings_Apply flow...', params);

            // 1. Validazione parametri
            const validation = this.validateSettingsParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Determina azione da eseguire
            const action = params.action || 'apply';
            let result;

            switch (action) {
                case 'apply':
                    result = await this.applySettings(params);
                    break;
                case 'reset':
                    result = await this.resetSettings(params);
                    break;
                case 'import':
                    result = await this.importSettings(params);
                    break;
                case 'export':
                    result = await this.exportSettings(params);
                    break;
                default:
                    throw new Error(`Azione non supportata: ${action}`);
            }

            console.log('✅ UserSettings_Apply completed successfully');

            return {
                success: true,
                action: action,
                result: result
            };

        } catch (error) {
            console.error('❌ UserSettings_Apply flow error:', error);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateSettingsParams(params) {
        const validActions = ['apply', 'reset', 'import', 'export'];
        
        if (params.action && !validActions.includes(params.action)) {
            return { isValid: false, error: 'Azione non valida' };
        }

        if (params.action === 'apply' && !params.settings) {
            return { isValid: false, error: 'Impostazioni mancanti per applicazione' };
        }

        if (params.action === 'import' && !params.importData) {
            return { isValid: false, error: 'Dati di importazione mancanti' };
        }

        return { isValid: true };
    }

    async applySettings(params) {
        const userId = params.userId || 'default';
        const newSettings = params.settings;

        // 1. Carica impostazioni attuali
        const currentSettings = this.loadUserSettings(userId);

        // 2. Valida nuove impostazioni
        const validatedSettings = this.validateAndSanitizeSettings(newSettings);

        // 3. Merge con impostazioni esistenti
        const mergedSettings = this.mergeSettings(currentSettings, validatedSettings);

        // 4. Applica modifiche live se richiesto
        if (params.applyLive !== false) {
            const liveResult = this.applyLiveChanges(currentSettings, mergedSettings);
            if (!liveResult.success) {
                console.warn('⚠️ Some live changes failed:', liveResult.errors);
            }
        }

        // 5. Salva impostazioni persistenti
        const saveResult = this.saveUserSettings(userId, mergedSettings);

        // 6. Genera evento di conferma
        this.generateSettingsEvent(userId, 'settings_applied', {
            changedCategories: this.getChangedCategories(currentSettings, mergedSettings),
            totalChanges: this.countChanges(currentSettings, mergedSettings)
        });

        return {
            previousSettings: currentSettings,
            newSettings: mergedSettings,
            changesApplied: this.getChangedCategories(currentSettings, mergedSettings),
            liveChangesApplied: params.applyLive !== false,
            saved: saveResult.success
        };
    }

    async resetSettings(params) {
        const userId = params.userId || 'default';

        // 1. Carica impostazioni attuali
        const currentSettings = this.loadUserSettings(userId);

        // 2. Ottieni impostazioni default
        const defaultSettings = this.getDefaultSettings();

        // 3. Applica modifiche live
        if (params.applyLive !== false) {
            this.applyLiveChanges(currentSettings, defaultSettings);
        }

        // 4. Salva impostazioni default
        const saveResult = this.saveUserSettings(userId, defaultSettings);

        // 5. Genera evento
        this.generateSettingsEvent(userId, 'settings_reset', {
            resetToDefaults: true
        });

        return {
            previousSettings: currentSettings,
            newSettings: defaultSettings,
            resetToDefaults: true,
            saved: saveResult.success
        };
    }

    async importSettings(params) {
        const userId = params.userId || 'default';
        const importData = params.importData;

        // 1. Valida formato dati importazione
        const validation = this.validateImportData(importData);
        if (!validation.isValid) {
            throw new Error(`Dati importazione non validi: ${validation.error}`);
        }

        // 2. Estrai impostazioni dai dati importati
        const importedSettings = this.extractSettingsFromImport(importData);

        // 3. Valida e sanitizza impostazioni importate
        const validatedSettings = this.validateAndSanitizeSettings(importedSettings);

        // 4. Carica impostazioni attuali per backup
        const currentSettings = this.loadUserSettings(userId);

        // 5. Applica impostazioni importate
        if (params.applyLive !== false) {
            this.applyLiveChanges(currentSettings, validatedSettings);
        }

        // 6. Salva nuove impostazioni
        const saveResult = this.saveUserSettings(userId, validatedSettings);

        // 7. Genera evento
        this.generateSettingsEvent(userId, 'settings_imported', {
            importSource: importData.source || 'unknown',
            importVersion: importData.version || 'unknown'
        });

        return {
            previousSettings: currentSettings,
            newSettings: validatedSettings,
            importedFrom: importData.source || 'file',
            compatibilityVersion: importData.version || '1.0',
            saved: saveResult.success
        };
    }

    async exportSettings(params) {
        const userId = params.userId || 'default';

        // 1. Carica impostazioni attuali
        const currentSettings = this.loadUserSettings(userId);

        // 2. Crea struttura export
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            source: 'Bolt Manager 01/02',
            userId: userId,
            settings: currentSettings,
            metadata: {
                gameVersion: this.gameManager.gameData?.gameVersion || '1.0.0',
                totalPlaytime: this.gameManager.gameData?.userSession?.totalPlaytime || 0,
                exportedBy: 'UserSettings_Apply Flow'
            }
        };

        // 3. Genera evento
        this.generateSettingsEvent(userId, 'settings_exported', {
            exportFormat: 'json',
            includesMetadata: true
        });

        return {
            exportData: exportData,
            exportFormat: 'json',
            exportSize: JSON.stringify(exportData).length,
            exportDate: exportData.exportDate
        };
    }

    loadUserSettings(userId) {
        // CORREZIONE: Verifica che gameData esista prima di accedere alle userSettings
        if (!this.gameManager.gameData) {
            console.log('⚠️ GameData not available, returning default settings');
            return this.getDefaultSettings();
        }

        // Inizializza dataset user_settings se non esiste
        if (!this.gameManager.gameData.userSettings) {
            this.gameManager.gameData.userSettings = [];
        }

        // Cerca impostazioni utente esistenti
        const userSettings = this.gameManager.gameData.userSettings.find(
            settings => settings.user_id === userId
        );

        if (userSettings) {
            // Rimuovi metadati e restituisci solo le impostazioni
            const { id, user_id, created_at, updated_at, ...settings } = userSettings;
            return settings;
        }

        // Restituisci impostazioni default se non trovate
        return this.getDefaultSettings();
    }

    validateAndSanitizeSettings(settings) {
        const validated = {};
        const schema = this.getSettingsSchema();

        Object.keys(schema).forEach(category => {
            if (settings[category]) {
                validated[category] = {};
                
                Object.keys(schema[category]).forEach(setting => {
                    const settingSchema = schema[category][setting];
                    const value = settings[category][setting];

                    if (value !== undefined) {
                        validated[category][setting] = this.validateSettingValue(
                            value, 
                            settingSchema
                        );
                    } else {
                        // Usa valore default se non fornito
                        validated[category][setting] = settingSchema.default;
                    }
                });
            } else {
                // Usa categoria default se non fornita
                validated[category] = this.getDefaultSettings()[category];
            }
        });

        return validated;
    }

    validateSettingValue(value, schema) {
        switch (schema.type) {
            case 'string':
                if (typeof value !== 'string') return schema.default;
                if (schema.options && !schema.options.includes(value)) return schema.default;
                if (schema.maxLength && value.length > schema.maxLength) return value.substring(0, schema.maxLength);
                return value;

            case 'number':
                const numValue = Number(value);
                if (isNaN(numValue)) return schema.default;
                if (schema.min !== undefined && numValue < schema.min) return schema.min;
                if (schema.max !== undefined && numValue > schema.max) return schema.max;
                return numValue;

            case 'boolean':
                return Boolean(value);

            case 'array':
                if (!Array.isArray(value)) return schema.default;
                if (schema.maxItems && value.length > schema.maxItems) return value.slice(0, schema.maxItems);
                return value.filter(item => schema.itemType ? typeof item === schema.itemType : true);

            case 'object':
                if (typeof value !== 'object' || value === null) return schema.default;
                return value;

            default:
                return schema.default;
        }
    }

    mergeSettings(currentSettings, newSettings) {
        const merged = { ...currentSettings };

        Object.keys(newSettings).forEach(category => {
            if (!merged[category]) {
                merged[category] = {};
            }

            Object.keys(newSettings[category]).forEach(setting => {
                merged[category][setting] = newSettings[category][setting];
            });
        });

        return merged;
    }

    applyLiveChanges(oldSettings, newSettings) {
        const results = {
            success: true,
            applied: [],
            errors: []
        };

        try {
            // Applica cambiamenti tema
            if (this.hasChanged(oldSettings.appearance?.theme, newSettings.appearance?.theme)) {
                this.applyThemeChange(newSettings.appearance.theme);
                results.applied.push('theme');
            }

            // Applica cambiamenti lingua
            if (this.hasChanged(oldSettings.localization?.language, newSettings.localization?.language)) {
                this.applyLanguageChange(newSettings.localization.language);
                results.applied.push('language');
            }

            // Applica cambiamenti audio
            if (this.hasChanged(oldSettings.audio?.sound_enabled, newSettings.audio?.sound_enabled) ||
                this.hasChanged(oldSettings.audio?.sound_volume, newSettings.audio?.sound_volume)) {
                this.applyAudioChanges(newSettings.audio);
                results.applied.push('audio');
            }

            // Applica cambiamenti accessibilità
            if (this.hasSettingsCategoryChanged(oldSettings.accessibility, newSettings.accessibility)) {
                this.applyAccessibilityChanges(newSettings.accessibility);
                results.applied.push('accessibility');
            }

            // Applica cambiamenti UI
            if (this.hasSettingsCategoryChanged(oldSettings.interface, newSettings.interface)) {
                this.applyInterfaceChanges(newSettings.interface);
                results.applied.push('interface');
            }

        } catch (error) {
            results.success = false;
            results.errors.push(error.message);
        }

        return results;
    }

    hasChanged(oldValue, newValue) {
        return oldValue !== newValue;
    }

    hasSettingsCategoryChanged(oldCategory, newCategory) {
        if (!oldCategory && !newCategory) return false;
        if (!oldCategory || !newCategory) return true;
        
        return JSON.stringify(oldCategory) !== JSON.stringify(newCategory);
    }

    applyThemeChange(theme) {
        const body = document.body;
        
        // Rimuovi classi tema esistenti
        body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
        
        // Applica nuovo tema
        switch (theme) {
            case 'dark':
                body.classList.add('theme-dark');
                break;
            case 'auto':
                body.classList.add('theme-auto');
                // Rileva preferenza sistema
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    body.classList.add('theme-dark');
                } else {
                    body.classList.add('theme-light');
                }
                break;
            default:
                body.classList.add('theme-light');
        }

        console.log(`🎨 Theme applied: ${theme}`);
    }

    applyLanguageChange(language) {
        // Imposta attributo lang del documento
        document.documentElement.lang = language;
        
        // Salva in localStorage per persistenza
        localStorage.setItem('boltManager_language', language);
        
        console.log(`🌐 Language applied: ${language}`);
    }

    applyAudioChanges(audioSettings) {
        // Applica impostazioni audio globali
        if (typeof audioSettings.sound_enabled === 'boolean') {
            document.body.dataset.soundEnabled = audioSettings.sound_enabled;
        }
        
        if (typeof audioSettings.sound_volume === 'number') {
            document.body.dataset.soundVolume = audioSettings.sound_volume;
        }
        
        if (typeof audioSettings.music_enabled === 'boolean') {
            document.body.dataset.musicEnabled = audioSettings.music_enabled;
        }
        
        if (typeof audioSettings.music_volume === 'number') {
            document.body.dataset.musicVolume = audioSettings.music_volume;
        }

        console.log('🔊 Audio settings applied:', audioSettings);
    }

    applyAccessibilityChanges(accessibilitySettings) {
        const body = document.body;
        
        // Riduci animazioni
        if (accessibilitySettings.reduce_motion) {
            body.classList.add('reduce-motion');
        } else {
            body.classList.remove('reduce-motion');
        }
        
        // Alto contrasto
        if (accessibilitySettings.high_contrast) {
            body.classList.add('high-contrast');
        } else {
            body.classList.remove('high-contrast');
        }
        
        // Dimensione testo
        if (accessibilitySettings.large_text) {
            body.classList.add('large-text');
        } else {
            body.classList.remove('large-text');
        }
        
        // Focus visibile
        if (accessibilitySettings.enhanced_focus) {
            body.classList.add('enhanced-focus');
        } else {
            body.classList.remove('enhanced-focus');
        }

        console.log('♿ Accessibility settings applied:', accessibilitySettings);
    }

    applyInterfaceChanges(interfaceSettings) {
        const body = document.body;
        
        // Densità UI
        body.classList.remove('ui-compact', 'ui-normal', 'ui-spacious');
        if (interfaceSettings.ui_density) {
            body.classList.add(`ui-${interfaceSettings.ui_density}`);
        }
        
        // Tooltips
        body.dataset.showTooltips = interfaceSettings.show_tooltips;
        
        // Animazioni
        body.dataset.showAnimations = interfaceSettings.show_animations;

        console.log('🖥️ Interface settings applied:', interfaceSettings);
    }

    saveUserSettings(userId, settings) {
        try {
            // CORREZIONE: Verifica che gameData esista prima di salvare
            if (!this.gameManager.gameData) {
                console.warn('⚠️ GameData not available, cannot save settings to dataset');
                // Salva solo in localStorage come fallback
                localStorage.setItem(`boltManager_userSettings_${userId}`, JSON.stringify(settings));
                return { success: true, fallback: true };
            }

            // Inizializza dataset se non esiste
            if (!this.gameManager.gameData.userSettings) {
                this.gameManager.gameData.userSettings = [];
            }

            // Trova o crea record utente
            let userSettingsIndex = this.gameManager.gameData.userSettings.findIndex(
                s => s.user_id === userId
            );

            const settingsRecord = {
                id: userSettingsIndex >= 0 ? 
                    this.gameManager.gameData.userSettings[userSettingsIndex].id :
                    `settings_${userId}_${Date.now()}`,
                user_id: userId,
                ...settings,
                updated_at: new Date().toISOString()
            };

            if (userSettingsIndex >= 0) {
                // Aggiorna esistente
                settingsRecord.created_at = this.gameManager.gameData.userSettings[userSettingsIndex].created_at;
                this.gameManager.gameData.userSettings[userSettingsIndex] = settingsRecord;
            } else {
                // Crea nuovo
                settingsRecord.created_at = new Date().toISOString();
                this.gameManager.gameData.userSettings.push(settingsRecord);
            }

            // Salva nel game manager
            this.gameManager.saveGameData();

            // Salva anche in localStorage per accesso rapido
            localStorage.setItem(`boltManager_userSettings_${userId}`, JSON.stringify(settings));

            console.log(`💾 User settings saved for user: ${userId}`);

            return { success: true };

        } catch (error) {
            console.error('Error saving user settings:', error);
            return { success: false, error: error.message };
        }
    }

    validateImportData(importData) {
        if (!importData || typeof importData !== 'object') {
            return { isValid: false, error: 'Dati non validi' };
        }

        if (!importData.version) {
            return { isValid: false, error: 'Versione mancante' };
        }

        if (!importData.settings) {
            return { isValid: false, error: 'Impostazioni mancanti' };
        }

        // Verifica compatibilità versione
        const supportedVersions = ['1.0'];
        if (!supportedVersions.includes(importData.version)) {
            return { isValid: false, error: `Versione non supportata: ${importData.version}` };
        }

        return { isValid: true };
    }

    extractSettingsFromImport(importData) {
        return importData.settings;
    }

    getChangedCategories(oldSettings, newSettings) {
        const changed = [];
        
        Object.keys(newSettings).forEach(category => {
            if (this.hasSettingsCategoryChanged(oldSettings[category], newSettings[category])) {
                changed.push(category);
            }
        });

        return changed;
    }

    countChanges(oldSettings, newSettings) {
        let count = 0;
        
        Object.keys(newSettings).forEach(category => {
            if (oldSettings[category] && newSettings[category]) {
                Object.keys(newSettings[category]).forEach(setting => {
                    if (oldSettings[category][setting] !== newSettings[category][setting]) {
                        count++;
                    }
                });
            }
        });

        return count;
    }

    generateSettingsEvent(userId, eventType, details) {
        // CORREZIONE: Verifica che gameData esista prima di generare eventi
        if (!this.gameManager.gameData) {
            console.warn('⚠️ GameData not available, cannot generate settings event');
            return;
        }

        // Inizializza gameEvents se non esiste
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'settings',
            event_category: 'info',
            title: this.getEventTitle(eventType),
            description: this.getEventDescription(eventType, details),
            related_entity_type: 'user_settings',
            related_entity_id: userId,
            team_id: null,
            player_id: null,
            match_id: null,
            priority: 1,
            is_read: false,
            is_user_relevant: true,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };

        this.gameManager.gameData.gameEvents.push(event);
    }

    getEventTitle(eventType) {
        const titles = {
            'settings_applied': 'Impostazioni Applicate',
            'settings_reset': 'Impostazioni Ripristinate',
            'settings_imported': 'Impostazioni Importate',
            'settings_exported': 'Impostazioni Esportate'
        };
        return titles[eventType] || 'Impostazioni Aggiornate';
    }

    getEventDescription(eventType, details) {
        switch (eventType) {
            case 'settings_applied':
                return `Applicate modifiche a: ${details.changedCategories.join(', ')}. Totale cambiamenti: ${details.totalChanges}`;
            case 'settings_reset':
                return 'Tutte le impostazioni sono state ripristinate ai valori predefiniti';
            case 'settings_imported':
                return `Impostazioni importate da ${details.importSource} (versione ${details.importVersion})`;
            case 'settings_exported':
                return `Impostazioni esportate in formato ${details.exportFormat}`;
            default:
                return 'Impostazioni utente modificate';
        }
    }

    getDefaultSettings() {
        return {
            // Aspetto e Tema
            appearance: {
                theme: 'light',
                color_scheme: 'default',
                background_style: 'default'
            },

            // Localizzazione
            localization: {
                language: 'it',
                currency: 'EUR',
                date_format: 'DD/MM/YYYY',
                time_format: '24h',
                number_format: 'european'
            },

            // Audio
            audio: {
                sound_enabled: true,
                sound_volume: 50,
                music_enabled: false,
                music_volume: 30,
                ui_sounds: true,
                match_sounds: true,
                notification_sounds: true
            },

            // Notifiche
            notifications: {
                enabled: true,
                match_events: true,
                transfer_updates: true,
                training_results: true,
                injury_alerts: true,
                contract_expiry: true,
                achievement_unlocked: true,
                system_messages: true
            },

            // Interfaccia
            interface: {
                ui_density: 'normal',
                show_tooltips: true,
                show_animations: true,
                auto_save_frequency: 5,
                confirm_actions: true,
                quick_navigation: true,
                sidebar_collapsed: false
            },

            // Gameplay
            gameplay: {
                match_speed: 'normal',
                match_detail_level: 'medium',
                auto_continue: false,
                pause_on_events: true,
                simulation_speed: 'normal',
                difficulty_level: 'normal'
            },

            // Accessibilità
            accessibility: {
                reduce_motion: false,
                high_contrast: false,
                large_text: false,
                enhanced_focus: false,
                screen_reader_support: false,
                keyboard_navigation: true,
                color_blind_support: false
            },

            // Privacy e Dati
            privacy: {
                analytics_enabled: true,
                crash_reporting: true,
                usage_statistics: true,
                data_sharing: false,
                backup_enabled: true,
                cloud_sync: false
            },

            // Avanzate
            advanced: {
                performance_mode: false,
                debug_mode: false,
                experimental_features: false,
                beta_updates: false,
                developer_tools: false
            }
        };
    }

    getSettingsSchema() {
        return {
            appearance: {
                theme: { type: 'string', options: ['light', 'dark', 'auto'], default: 'light' },
                color_scheme: { type: 'string', options: ['default', 'blue', 'green', 'red'], default: 'default' },
                background_style: { type: 'string', options: ['default', 'minimal', 'rich'], default: 'default' }
            },
            localization: {
                language: { type: 'string', options: ['it', 'en', 'es', 'fr', 'de'], default: 'it' },
                currency: { type: 'string', options: ['EUR', 'USD', 'GBP'], default: 'EUR' },
                date_format: { type: 'string', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'], default: 'DD/MM/YYYY' },
                time_format: { type: 'string', options: ['12h', '24h'], default: '24h' },
                number_format: { type: 'string', options: ['european', 'american'], default: 'european' }
            },
            audio: {
                sound_enabled: { type: 'boolean', default: true },
                sound_volume: { type: 'number', min: 0, max: 100, default: 50 },
                music_enabled: { type: 'boolean', default: false },
                music_volume: { type: 'number', min: 0, max: 100, default: 30 },
                ui_sounds: { type: 'boolean', default: true },
                match_sounds: { type: 'boolean', default: true },
                notification_sounds: { type: 'boolean', default: true }
            },
            notifications: {
                enabled: { type: 'boolean', default: true },
                match_events: { type: 'boolean', default: true },
                transfer_updates: { type: 'boolean', default: true },
                training_results: { type: 'boolean', default: true },
                injury_alerts: { type: 'boolean', default: true },
                contract_expiry: { type: 'boolean', default: true },
                achievement_unlocked: { type: 'boolean', default: true },
                system_messages: { type: 'boolean', default: true }
            },
            interface: {
                ui_density: { type: 'string', options: ['compact', 'normal', 'spacious'], default: 'normal' },
                show_tooltips: { type: 'boolean', default: true },
                show_animations: { type: 'boolean', default: true },
                auto_save_frequency: { type: 'number', min: 1, max: 60, default: 5 },
                confirm_actions: { type: 'boolean', default: true },
                quick_navigation: { type: 'boolean', default: true },
                sidebar_collapsed: { type: 'boolean', default: false }
            },
            gameplay: {
                match_speed: { type: 'string', options: ['slow', 'normal', 'fast'], default: 'normal' },
                match_detail_level: { type: 'string', options: ['low', 'medium', 'high'], default: 'medium' },
                auto_continue: { type: 'boolean', default: false },
                pause_on_events: { type: 'boolean', default: true },
                simulation_speed: { type: 'string', options: ['slow', 'normal', 'fast'], default: 'normal' },
                difficulty_level: { type: 'string', options: ['easy', 'normal', 'hard'], default: 'normal' }
            },
            accessibility: {
                reduce_motion: { type: 'boolean', default: false },
                high_contrast: { type: 'boolean', default: false },
                large_text: { type: 'boolean', default: false },
                enhanced_focus: { type: 'boolean', default: false },
                screen_reader_support: { type: 'boolean', default: false },
                keyboard_navigation: { type: 'boolean', default: true },
                color_blind_support: { type: 'boolean', default: false }
            },
            privacy: {
                analytics_enabled: { type: 'boolean', default: true },
                crash_reporting: { type: 'boolean', default: true },
                usage_statistics: { type: 'boolean', default: true },
                data_sharing: { type: 'boolean', default: false },
                backup_enabled: { type: 'boolean', default: true },
                cloud_sync: { type: 'boolean', default: false }
            },
            advanced: {
                performance_mode: { type: 'boolean', default: false },
                debug_mode: { type: 'boolean', default: false },
                experimental_features: { type: 'boolean', default: false },
                beta_updates: { type: 'boolean', default: false },
                developer_tools: { type: 'boolean', default: false }
            }
        };
    }
}