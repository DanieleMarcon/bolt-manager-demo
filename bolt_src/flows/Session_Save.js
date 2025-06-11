/**
 * FLOW: Session_Save
 * 
 * Gestisce il salvataggio completo dello stato di gioco in uno slot specifico.
 * Serializza tutti i dataset e metadati per permettere il ripristino futuro.
 * 
 * Trigger: Salvataggio manuale o automatico
 * Input: Nome slot salvataggio (opzionale), tipo salvataggio (auto/manual)
 * Output: Partita salvata con successo
 * 
 * Dataset coinvolti:
 * - user_sessions (scrittura - stato completo)
 * - Tutti i dataset (lettura - snapshot stato)
 */

export class SessionSaveFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di salvataggio sessione
     * @param {Object} params - Parametri del salvataggio
     * @param {string} params.sessionName - Nome personalizzato della sessione
     * @param {string} params.slotId - ID slot di salvataggio (opzionale, auto-generato se mancante)
     * @param {string} params.saveType - Tipo salvataggio ('manual', 'auto', 'quick')
     * @param {boolean} params.overwrite - Se sovrascrivere slot esistente
     * @param {Object} params.metadata - Metadati aggiuntivi (opzionale)
     * @returns {Object} Risultato del salvataggio
     */
    async execute(params = {}) {
        try {
            console.log('💾 Executing Session_Save flow...', params);

            // 1. Validazione parametri
            const validation = this.validateSaveParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Verifica stato di gioco valido
            const gameStateValidation = this.validateGameState();
            if (!gameStateValidation.isValid) {
                throw new Error(gameStateValidation.error);
            }

            // 3. Genera ID slot se non fornito
            const slotId = params.slotId || this.generateSlotId(params.saveType);

            // 4. Verifica conflitti slot esistenti
            const conflictCheck = this.checkSlotConflicts(slotId, params.overwrite);
            if (!conflictCheck.canSave) {
                throw new Error(conflictCheck.error);
            }

            // 5. Raccoglie stato completo di gioco
            const gameSnapshot = this.createGameSnapshot();

            // 6. Compila metadati sessione
            const sessionMetadata = this.compileSessionMetadata(params, gameSnapshot);

            // 7. Crea record sessione completo
            const sessionRecord = this.createSessionRecord(slotId, params, sessionMetadata, gameSnapshot);

            // 8. Valida integrità dati prima del salvataggio
            const integrityCheck = this.validateDataIntegrity(sessionRecord);
            if (!integrityCheck.isValid) {
                throw new Error(`Errore integrità dati: ${integrityCheck.error}`);
            }

            // 9. Salva nel dataset user_sessions
            const saveResult = this.saveSessionRecord(sessionRecord, params.overwrite);

            // 10. Aggiorna stato sessione corrente
            this.updateCurrentSessionState(sessionRecord);

            // 11. Pulisce salvataggi automatici vecchi (se necessario)
            if (params.saveType === 'auto') {
                this.cleanupOldAutoSaves();
            }

            // 12. Genera evento di conferma
            this.generateSaveEvent(sessionRecord, saveResult);

            console.log('✅ Session saved successfully:', sessionRecord.id);

            return {
                success: true,
                sessionId: sessionRecord.id,
                sessionName: sessionRecord.session_name,
                slotId: slotId,
                saveType: params.saveType,
                dataSize: JSON.stringify(sessionRecord.save_data).length,
                timestamp: sessionRecord.updated_at
            };

        } catch (error) {
            console.error('❌ Session_Save flow error:', error);
            
            // Genera evento di errore
            this.generateSaveErrorEvent(params, error.message);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateSaveParams(params) {
        // Verifica tipo salvataggio
        const validSaveTypes = ['manual', 'auto', 'quick'];
        if (params.saveType && !validSaveTypes.includes(params.saveType)) {
            return { isValid: false, error: 'Tipo salvataggio non valido' };
        }

        // Verifica lunghezza nome sessione
        if (params.sessionName && params.sessionName.length > 50) {
            return { isValid: false, error: 'Nome sessione troppo lungo (max 50 caratteri)' };
        }

        // Verifica caratteri validi nel nome
        if (params.sessionName && !/^[a-zA-Z0-9\s\-_]+$/.test(params.sessionName)) {
            return { isValid: false, error: 'Nome sessione contiene caratteri non validi' };
        }

        return { isValid: true };
    }

    validateGameState() {
        // Verifica esistenza dati di gioco
        if (!this.gameManager.gameData) {
            return { isValid: false, error: 'Dati di gioco non inizializzati' };
        }

        // Verifica dataset essenziali
        const requiredDatasets = ['teams', 'players', 'matches'];
        for (const dataset of requiredDatasets) {
            if (!this.gameManager.gameData[dataset] || this.gameManager.gameData[dataset].length === 0) {
                return { isValid: false, error: `Dataset ${dataset} mancante o vuoto` };
            }
        }

        // Verifica squadra utente
        const userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
        if (!userTeam) {
            return { isValid: false, error: 'Squadra utente non trovata' };
        }

        // Verifica data di gioco valida
        if (!this.gameManager.gameData.currentDate) {
            return { isValid: false, error: 'Data di gioco non impostata' };
        }

        return { isValid: true };
    }

    generateSlotId(saveType) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6);
        
        switch (saveType) {
            case 'auto':
                return `auto_${timestamp}`;
            case 'quick':
                return `quick_${timestamp}`;
            default:
                return `manual_${timestamp}_${random}`;
        }
    }

    checkSlotConflicts(slotId, allowOverwrite) {
        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData.userSessions) {
            this.gameManager.gameData.userSessions = [];
        }

        const existingSession = this.gameManager.gameData.userSessions.find(s => s.id === slotId);
        
        if (existingSession && !allowOverwrite) {
            return { 
                canSave: false, 
                error: 'Slot già occupato. Usa overwrite=true per sovrascrivere.' 
            };
        }

        return { canSave: true };
    }

    createGameSnapshot() {
        // Crea snapshot completo di tutti i dataset
        const snapshot = {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            datasets: {}
        };

        // Lista di tutti i dataset da salvare
        const datasetsToSave = [
            'teams', 'players', 'matches', 'trainings', 'transfers', 'tactics',
            'gameEvents', 'matchReports', 'attributesHistory', 'moraleStatus',
            'staff', 'userSettings'
        ];

        datasetsToSave.forEach(datasetName => {
            if (this.gameManager.gameData[datasetName]) {
                snapshot.datasets[datasetName] = JSON.parse(JSON.stringify(this.gameManager.gameData[datasetName]));
            }
        });

        // Salva stato globale di gioco
        snapshot.gameState = {
            currentDate: this.gameManager.gameData.currentDate,
            currentSeason: this.gameManager.gameData.currentSeason || 1,
            currentMatchday: this.gameManager.gameData.currentMatchday || 1,
            gameVersion: this.gameManager.gameData.gameVersion || '1.0.0'
        };

        return snapshot;
    }

    compileSessionMetadata(params, gameSnapshot) {
        const userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
        const totalPlayers = this.gameManager.gameData.players?.length || 0;
        const completedMatches = this.gameManager.gameData.matches?.filter(m => m.status === 'finished').length || 0;
        
        return {
            sessionName: params.sessionName || this.generateDefaultSessionName(),
            saveType: params.saveType || 'manual',
            userTeamId: userTeam?.id,
            userTeamName: userTeam?.name,
            currentSeason: this.gameManager.gameData.currentSeason || 1,
            currentMatchday: this.gameManager.gameData.currentMatchday || 1,
            currentDate: this.gameManager.gameData.currentDate,
            totalBudget: userTeam?.budget || 0,
            leaguePosition: userTeam?.league_position || null,
            totalPlayers: totalPlayers,
            completedMatches: completedMatches,
            achievements: this.extractAchievements(),
            difficultyLevel: this.gameManager.gameData.difficulty || 'normal',
            gameSpeed: this.gameManager.gameData.gameSpeed || 'normal',
            totalPlaytime: this.calculateTotalPlaytime(),
            dataSize: JSON.stringify(gameSnapshot).length,
            customMetadata: params.metadata || {}
        };
    }

    generateDefaultSessionName() {
        const userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
        const currentDate = new Date();
        const season = this.gameManager.gameData.currentSeason || 1;
        
        return `${userTeam?.name || 'Carriera'} - Stagione ${season} (${currentDate.toLocaleDateString('it-IT')})`;
    }

    extractAchievements() {
        // Estrae achievements dal gameData se esistono
        return this.gameManager.gameData.achievements || [];
    }

    calculateTotalPlaytime() {
        // Calcola tempo di gioco totale (semplificato)
        const existingPlaytime = this.gameManager.gameData.totalPlaytime || 0;
        const sessionStart = this.gameManager.sessionStartTime || Date.now();
        const currentSessionTime = Math.floor((Date.now() - sessionStart) / 60000); // minuti
        
        return existingPlaytime + currentSessionTime;
    }

    createSessionRecord(slotId, params, metadata, gameSnapshot) {
        return {
            id: slotId,
            session_name: metadata.sessionName,
            user_team_id: metadata.userTeamId,
            current_season: metadata.currentSeason,
            current_matchday: metadata.currentMatchday,
            current_date: metadata.currentDate,
            total_budget: metadata.totalBudget,
            achievements: metadata.achievements,
            difficulty_level: metadata.difficultyLevel,
            game_speed: metadata.gameSpeed,
            auto_save: params.saveType === 'auto',
            last_played: new Date().toISOString(),
            total_playtime: metadata.totalPlaytime,
            is_active: true, // Questa diventa la sessione attiva
            save_data: JSON.stringify(gameSnapshot),
            metadata: {
                saveType: metadata.saveType,
                dataSize: metadata.dataSize,
                totalPlayers: metadata.totalPlayers,
                completedMatches: metadata.completedMatches,
                leaguePosition: metadata.leaguePosition,
                customMetadata: metadata.customMetadata
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    validateDataIntegrity(sessionRecord) {
        try {
            // Verifica che save_data sia JSON valido
            const parsedData = JSON.parse(sessionRecord.save_data);
            
            // Verifica presenza dataset essenziali
            if (!parsedData.datasets || !parsedData.datasets.teams || !parsedData.datasets.players) {
                return { isValid: false, error: 'Dataset essenziali mancanti nel salvataggio' };
            }

            // Verifica coerenza metadati
            if (!sessionRecord.user_team_id || !sessionRecord.current_date) {
                return { isValid: false, error: 'Metadati sessione incompleti' };
            }

            // Verifica dimensione ragionevole
            const dataSize = JSON.stringify(sessionRecord).length;
            if (dataSize > 50 * 1024 * 1024) { // 50MB limit
                return { isValid: false, error: 'Dimensione salvataggio troppo grande' };
            }

            return { isValid: true };

        } catch (error) {
            return { isValid: false, error: `Errore validazione JSON: ${error.message}` };
        }
    }

    saveSessionRecord(sessionRecord, allowOverwrite) {
        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData.userSessions) {
            this.gameManager.gameData.userSessions = [];
        }

        // Disattiva altre sessioni
        this.gameManager.gameData.userSessions.forEach(session => {
            session.is_active = false;
        });

        // Verifica se è un aggiornamento o nuovo salvataggio
        const existingIndex = this.gameManager.gameData.userSessions.findIndex(s => s.id === sessionRecord.id);
        
        if (existingIndex >= 0) {
            if (allowOverwrite) {
                // Mantieni data di creazione originale
                sessionRecord.created_at = this.gameManager.gameData.userSessions[existingIndex].created_at;
                
                // Aggiorna record esistente
                this.gameManager.gameData.userSessions[existingIndex] = sessionRecord;
            } else {
                throw new Error('Slot già occupato e overwrite non consentito');
            }
        } else {
            // Aggiungi nuovo record
            this.gameManager.gameData.userSessions.push(sessionRecord);
        }

        // Salva nel game manager
        this.gameManager.saveGameData();

        return {
            isNew: existingIndex < 0,
            slotIndex: existingIndex >= 0 ? existingIndex : this.gameManager.gameData.userSessions.length - 1
        };
    }

    updateCurrentSessionState(sessionRecord) {
        // Aggiorna riferimenti sessione corrente nel game manager
        this.gameManager.currentSessionId = sessionRecord.id;
        this.gameManager.lastSaveTime = new Date().toISOString();
        
        // Aggiorna metadati globali
        if (!this.gameManager.gameData.sessionMetadata) {
            this.gameManager.gameData.sessionMetadata = {};
        }
        
        this.gameManager.gameData.sessionMetadata.lastSave = {
            sessionId: sessionRecord.id,
            timestamp: sessionRecord.updated_at,
            saveType: sessionRecord.metadata.saveType
        };
    }

    cleanupOldAutoSaves() {
        const maxAutoSaves = 5; // Mantieni solo gli ultimi 5 salvataggi automatici
        
        const autoSaves = this.gameManager.gameData.userSessions
            .filter(s => s.auto_save)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (autoSaves.length > maxAutoSaves) {
            const toDelete = autoSaves.slice(maxAutoSaves);
            
            toDelete.forEach(session => {
                const index = this.gameManager.gameData.userSessions.findIndex(s => s.id === session.id);
                if (index >= 0) {
                    this.gameManager.gameData.userSessions.splice(index, 1);
                }
            });

            console.log(`🧹 Cleaned up ${toDelete.length} old auto-saves`);
        }
    }

    generateSaveEvent(sessionRecord, saveResult) {
        // Inizializza gameEvents se non esiste
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'system',
            event_category: 'info',
            title: 'Partita Salvata',
            description: `Sessione "${sessionRecord.session_name}" salvata con successo${saveResult.isNew ? '' : ' (aggiornata)'}`,
            related_entity_type: 'user_session',
            related_entity_id: sessionRecord.id,
            team_id: sessionRecord.user_team_id,
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

    generateSaveErrorEvent(params, errorMessage) {
        // Inizializza gameEvents se non esiste
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'system',
            event_category: 'error',
            title: 'Errore Salvataggio',
            description: `Impossibile salvare la sessione: ${errorMessage}`,
            related_entity_type: 'user_session',
            related_entity_id: params.slotId || 'unknown',
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
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };

        this.gameManager.gameData.gameEvents.push(event);
    }
}