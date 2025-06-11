/**
 * FLOW: Session_Load
 * 
 * Gestisce il caricamento di una sessione salvata ripristinando completamente
 * lo stato di gioco da uno slot specifico.
 * 
 * Trigger: Caricamento partita salvata
 * Input: ID sessione da caricare, conferma sovrascrittura stato attuale
 * Output: Partita caricata e pronta
 * 
 * Dataset coinvolti:
 * - user_sessions (lettura - dati salvati)
 * - Tutti i dataset (scrittura - ripristino stato)
 */

export class SessionLoadFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di caricamento sessione
     * @param {Object} params - Parametri del caricamento
     * @param {string} params.sessionId - ID della sessione da caricare
     * @param {boolean} params.confirmOverwrite - Conferma sovrascrittura stato attuale
     * @param {boolean} params.createBackup - Se creare backup dello stato attuale prima del caricamento
     * @param {boolean} params.validateIntegrity - Se validare integrità dati prima del caricamento
     * @returns {Object} Risultato del caricamento
     */
    async execute(params) {
        try {
            console.log('📂 Executing Session_Load flow...', params);

            // 1. Validazione parametri
            const validation = this.validateLoadParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Verifica esistenza sessione
            const sessionRecord = this.findSessionRecord(params.sessionId);
            if (!sessionRecord) {
                throw new Error('Sessione non trovata');
            }

            // 3. Crea backup stato attuale se richiesto
            let backupResult = null;
            if (params.createBackup && this.gameManager.gameData) {
                backupResult = await this.createCurrentStateBackup();
            }

            // 4. Valida integrità dati sessione
            if (params.validateIntegrity !== false) {
                const integrityCheck = this.validateSessionIntegrity(sessionRecord);
                if (!integrityCheck.isValid) {
                    throw new Error(`Dati sessione corrotti: ${integrityCheck.error}`);
                }
            }

            // 5. Deserializza dati salvati
            const gameSnapshot = this.deserializeGameData(sessionRecord);

            // 6. Verifica compatibilità versione
            const compatibilityCheck = this.checkVersionCompatibility(gameSnapshot);
            if (!compatibilityCheck.isCompatible) {
                console.warn('⚠️ Version compatibility warning:', compatibilityCheck.warning);
                
                if (compatibilityCheck.requiresMigration) {
                    gameSnapshot = this.migrateGameData(gameSnapshot);
                }
            }

            // 7. Ripristina stato di gioco
            const restoreResult = this.restoreGameState(gameSnapshot);

            // 8. Aggiorna metadati sessione
            this.updateSessionMetadata(sessionRecord);

            // 9. Aggiorna stato sessione corrente
            this.updateCurrentSessionState(sessionRecord);

            // 10. Valida stato ripristinato
            const postLoadValidation = this.validateRestoredState();
            if (!postLoadValidation.isValid) {
                // Tentativo di rollback se disponibile
                if (backupResult) {
                    console.warn('⚠️ Attempting rollback due to validation failure...');
                    await this.rollbackToBackup(backupResult);
                }
                throw new Error(`Stato ripristinato non valido: ${postLoadValidation.error}`);
            }

            // 11. Genera evento di successo
            this.generateLoadEvent(sessionRecord, restoreResult);

            console.log('✅ Session loaded successfully:', sessionRecord.id);

            return {
                success: true,
                sessionId: sessionRecord.id,
                sessionName: sessionRecord.session_name,
                loadedDate: sessionRecord.current_date,
                userTeam: restoreResult.userTeam,
                backupCreated: backupResult !== null,
                migrationApplied: compatibilityCheck.requiresMigration,
                datasetsRestored: restoreResult.datasetsRestored
            };

        } catch (error) {
            console.error('❌ Session_Load flow error:', error);
            
            // Genera evento di errore
            this.generateLoadErrorEvent(params, error.message);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateLoadParams(params) {
        if (!params.sessionId) {
            return { isValid: false, error: 'ID sessione mancante' };
        }

        // Verifica formato ID sessione
        if (typeof params.sessionId !== 'string' || params.sessionId.length < 5) {
            return { isValid: false, error: 'ID sessione non valido' };
        }

        return { isValid: true };
    }

    findSessionRecord(sessionId) {
        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData?.userSessions) {
            return null;
        }

        return this.gameManager.gameData.userSessions.find(session => session.id === sessionId);
    }

    async createCurrentStateBackup() {
        try {
            // Usa il flow Session_Save per creare backup
            const sessionSaveFlow = new (await import('./Session_Save.js')).SessionSaveFlow(this.gameManager);
            
            const backupResult = await sessionSaveFlow.execute({
                sessionName: `Backup ${new Date().toLocaleString('it-IT')}`,
                saveType: 'auto',
                slotId: `backup_${Date.now()}`,
                overwrite: true,
                metadata: {
                    isBackup: true,
                    backupReason: 'Pre-load backup'
                }
            });

            if (backupResult.success) {
                console.log('💾 Current state backup created:', backupResult.sessionId);
                return backupResult;
            } else {
                console.warn('⚠️ Failed to create backup:', backupResult.error);
                return null;
            }

        } catch (error) {
            console.warn('⚠️ Backup creation failed:', error.message);
            return null;
        }
    }

    validateSessionIntegrity(sessionRecord) {
        try {
            // Verifica presenza save_data
            if (!sessionRecord.save_data) {
                return { isValid: false, error: 'Dati di salvataggio mancanti' };
            }

            // Verifica che save_data sia JSON valido
            const parsedData = JSON.parse(sessionRecord.save_data);
            
            // Verifica struttura base
            if (!parsedData.datasets || !parsedData.gameState) {
                return { isValid: false, error: 'Struttura dati non valida' };
            }

            // Verifica dataset essenziali
            const requiredDatasets = ['teams', 'players', 'matches'];
            for (const dataset of requiredDatasets) {
                if (!parsedData.datasets[dataset]) {
                    return { isValid: false, error: `Dataset ${dataset} mancante` };
                }
            }

            // Verifica metadati sessione
            if (!sessionRecord.user_team_id || !sessionRecord.current_date) {
                return { isValid: false, error: 'Metadati sessione incompleti' };
            }

            // Verifica coerenza dati
            const userTeam = parsedData.datasets.teams.find(t => t.id === sessionRecord.user_team_id);
            if (!userTeam) {
                return { isValid: false, error: 'Squadra utente non trovata nei dati salvati' };
            }

            return { isValid: true };

        } catch (error) {
            return { isValid: false, error: `Errore parsing JSON: ${error.message}` };
        }
    }

    deserializeGameData(sessionRecord) {
        try {
            const gameSnapshot = JSON.parse(sessionRecord.save_data);
            
            // Aggiungi metadati sessione al snapshot
            gameSnapshot.sessionMetadata = {
                sessionId: sessionRecord.id,
                sessionName: sessionRecord.session_name,
                lastPlayed: sessionRecord.last_played,
                totalPlaytime: sessionRecord.total_playtime,
                difficultyLevel: sessionRecord.difficulty_level,
                gameSpeed: sessionRecord.game_speed
            };

            return gameSnapshot;

        } catch (error) {
            throw new Error(`Impossibile deserializzare dati: ${error.message}`);
        }
    }

    checkVersionCompatibility(gameSnapshot) {
        const currentVersion = '1.0.0';
        const savedVersion = gameSnapshot.version || '1.0.0';

        // Semplice controllo versione (espandibile in futuro)
        if (savedVersion === currentVersion) {
            return { isCompatible: true, requiresMigration: false };
        }

        // Versioni compatibili senza migrazione
        const compatibleVersions = ['1.0.0'];
        if (compatibleVersions.includes(savedVersion)) {
            return { 
                isCompatible: true, 
                requiresMigration: false,
                warning: `Caricamento da versione ${savedVersion} a ${currentVersion}`
            };
        }

        // Versioni che richiedono migrazione
        const migratableVersions = ['0.9.0', '0.9.1'];
        if (migratableVersions.includes(savedVersion)) {
            return { 
                isCompatible: true, 
                requiresMigration: true,
                warning: `Migrazione richiesta da versione ${savedVersion} a ${currentVersion}`
            };
        }

        // Versioni incompatibili
        return { 
            isCompatible: false, 
            error: `Versione ${savedVersion} non compatibile con ${currentVersion}`
        };
    }

    migrateGameData(gameSnapshot) {
        console.log('🔄 Applying data migration...');
        
        // Placeholder per future migrazioni
        // Esempio: aggiungere campi mancanti, convertire formati, etc.
        
        // Aggiorna versione dopo migrazione
        gameSnapshot.version = '1.0.0';
        
        return gameSnapshot;
    }

    restoreGameState(gameSnapshot) {
        const restoreResult = {
            datasetsRestored: [],
            userTeam: null,
            errors: []
        };

        try {
            // Ripristina stato globale di gioco
            this.gameManager.gameData = {
                gameVersion: gameSnapshot.version || '1.0.0',
                currentDate: gameSnapshot.gameState.currentDate,
                currentSeason: gameSnapshot.gameState.currentSeason,
                currentMatchday: gameSnapshot.gameState.currentMatchday,
                difficulty: gameSnapshot.sessionMetadata?.difficultyLevel || 'normal',
                gameSpeed: gameSnapshot.sessionMetadata?.gameSpeed || 'normal'
            };

            // Ripristina tutti i dataset
            Object.entries(gameSnapshot.datasets).forEach(([datasetName, datasetData]) => {
                try {
                    this.gameManager.gameData[datasetName] = datasetData;
                    restoreResult.datasetsRestored.push(datasetName);
                } catch (error) {
                    restoreResult.errors.push(`Errore ripristino ${datasetName}: ${error.message}`);
                }
            });

            // Trova squadra utente
            if (this.gameManager.gameData.teams) {
                restoreResult.userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
            }

            // Ripristina metadati aggiuntivi
            if (gameSnapshot.sessionMetadata) {
                this.gameManager.gameData.sessionMetadata = gameSnapshot.sessionMetadata;
                this.gameManager.gameData.totalPlaytime = gameSnapshot.sessionMetadata.totalPlaytime;
            }

            console.log(`📊 Restored ${restoreResult.datasetsRestored.length} datasets`);

            return restoreResult;

        } catch (error) {
            throw new Error(`Errore ripristino stato: ${error.message}`);
        }
    }

    updateSessionMetadata(sessionRecord) {
        // Aggiorna data ultimo accesso
        sessionRecord.last_played = new Date().toISOString();
        
        // Disattiva altre sessioni
        if (this.gameManager.gameData.userSessions) {
            this.gameManager.gameData.userSessions.forEach(session => {
                session.is_active = (session.id === sessionRecord.id);
            });
        }

        sessionRecord.updated_at = new Date().toISOString();
    }

    updateCurrentSessionState(sessionRecord) {
        // Aggiorna riferimenti sessione corrente nel game manager
        this.gameManager.currentSessionId = sessionRecord.id;
        this.gameManager.lastLoadTime = new Date().toISOString();
        this.gameManager.sessionStartTime = Date.now();

        // Salva stato aggiornato
        this.gameManager.saveGameData();
    }

    validateRestoredState() {
        try {
            // Verifica esistenza dati essenziali
            if (!this.gameManager.gameData) {
                return { isValid: false, error: 'Dati di gioco non ripristinati' };
            }

            // Verifica dataset essenziali
            const requiredDatasets = ['teams', 'players', 'matches'];
            for (const dataset of requiredDatasets) {
                if (!this.gameManager.gameData[dataset] || this.gameManager.gameData[dataset].length === 0) {
                    return { isValid: false, error: `Dataset ${dataset} vuoto dopo ripristino` };
                }
            }

            // Verifica squadra utente
            const userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
            if (!userTeam) {
                return { isValid: false, error: 'Squadra utente non trovata dopo ripristino' };
            }

            // Verifica coerenza dati
            const teamPlayers = this.gameManager.gameData.players.filter(p => p.team_id === userTeam.id);
            if (teamPlayers.length < 11) {
                return { isValid: false, error: 'Squadra utente ha meno di 11 giocatori' };
            }

            // Verifica data di gioco
            if (!this.gameManager.gameData.currentDate) {
                return { isValid: false, error: 'Data di gioco non impostata' };
            }

            return { isValid: true };

        } catch (error) {
            return { isValid: false, error: `Errore validazione: ${error.message}` };
        }
    }

    async rollbackToBackup(backupResult) {
        try {
            console.log('🔄 Rolling back to backup...');
            
            // Carica il backup creato
            const rollbackResult = await this.execute({
                sessionId: backupResult.sessionId,
                confirmOverwrite: true,
                createBackup: false,
                validateIntegrity: false
            });

            if (rollbackResult.success) {
                console.log('✅ Rollback completed successfully');
            } else {
                console.error('❌ Rollback failed:', rollbackResult.error);
            }

        } catch (error) {
            console.error('❌ Rollback error:', error.message);
        }
    }

    generateLoadEvent(sessionRecord, restoreResult) {
        // Inizializza gameEvents se non esiste
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'system',
            event_category: 'info',
            title: 'Sessione Caricata',
            description: `Sessione "${sessionRecord.session_name}" caricata con successo. Ripristinati ${restoreResult.datasetsRestored.length} dataset.`,
            related_entity_type: 'user_session',
            related_entity_id: sessionRecord.id,
            team_id: restoreResult.userTeam?.id || null,
            player_id: null,
            match_id: null,
            priority: 2,
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

    generateLoadErrorEvent(params, errorMessage) {
        // Inizializza gameEvents se non esiste
        if (!this.gameManager.gameData) {
            this.gameManager.gameData = { gameEvents: [] };
        }
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'system',
            event_category: 'error',
            title: 'Errore Caricamento',
            description: `Impossibile caricare la sessione: ${errorMessage}`,
            related_entity_type: 'user_session',
            related_entity_id: params.sessionId || 'unknown',
            team_id: null,
            player_id: null,
            match_id: null,
            priority: 4,
            is_read: false,
            is_user_relevant: true,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: new Date().toISOString(), // Fallback se gameManager non disponibile
            created_at: new Date().toISOString()
        };

        this.gameManager.gameData.gameEvents.push(event);
    }
}