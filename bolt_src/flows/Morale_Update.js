/**
 * FLOW: Morale_Update
 * 
 * Gestisce l'aggiornamento del morale di giocatori e squadre in risposta a eventi significativi.
 * Calcola variazioni basate su fattori multipli e aggiorna tendenze.
 * 
 * Trigger: Eventi significativi (risultati, trasferimenti, allenamenti)
 * Input: Entità coinvolte (giocatore/squadra), tipo evento scatenante, intensità impatto
 * Output: Morale aggiornato, tendenze calcolate
 * 
 * Dataset coinvolti:
 * - morale_status (scrittura - nuovo stato morale)
 * - players (scrittura - morale individuale)
 * - teams (scrittura - morale squadra)
 * - game_events (scrittura - notifiche cambiamenti)
 */

export class MoraleUpdateFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di aggiornamento morale
     * @param {Object} params - Parametri dell'aggiornamento
     * @param {Array} params.entities - Lista entità da aggiornare [{type: 'player'|'team', id: string}]
     * @param {string} params.eventType - Tipo evento (match_result, transfer, training, injury, etc.)
     * @param {Object} params.eventData - Dati specifici dell'evento
     * @param {number} params.impactIntensity - Intensità impatto (1-10)
     * @param {string} params.eventDescription - Descrizione evento per logging
     * @returns {Object} Risultato dell'aggiornamento
     */
    async execute(params) {
        try {
            console.log('😊 Executing Morale_Update flow...', params);

            // 1. Validazione parametri
            const validation = this.validateMoraleParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Inizializza dataset morale se necessario
            this.initializeMoraleDataset();

            // 3. Processa aggiornamento per ogni entità
            const updateResults = [];
            
            for (const entity of params.entities) {
                const result = await this.processEntityMoraleUpdate(entity, params);
                updateResults.push(result);
            }

            // 4. Calcola effetti a cascata (morale squadra influenza giocatori e viceversa)
            const cascadeEffects = this.calculateCascadeEffects(updateResults, params);

            // 5. Applica effetti a cascata
            for (const effect of cascadeEffects) {
                const cascadeResult = await this.processEntityMoraleUpdate(effect.entity, {
                    ...params,
                    eventType: 'cascade_effect',
                    impactIntensity: effect.intensity
                });
                updateResults.push(cascadeResult);
            }

            // 6. Aggiorna tendenze globali
            this.updateGlobalMoraleTrends(updateResults);

            // 7. Genera eventi per cambiamenti significativi
            this.generateMoraleEvents(updateResults, params);

            // 8. Programma prossime valutazioni automatiche
            this.scheduleNextEvaluations(updateResults);

            console.log('✅ Morale update completed successfully');

            return {
                success: true,
                entitiesUpdated: updateResults.length,
                significantChanges: updateResults.filter(r => r.isSignificantChange).length,
                cascadeEffects: cascadeEffects.length,
                averageMoraleChange: this.calculateAverageMoraleChange(updateResults)
            };

        } catch (error) {
            console.error('❌ Morale_Update flow error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateMoraleParams(params) {
        if (!params.entities || !Array.isArray(params.entities) || params.entities.length === 0) {
            return { isValid: false, error: 'Lista entità mancante o vuota' };
        }

        // Verifica formato entità
        for (const entity of params.entities) {
            if (!entity.type || !entity.id) {
                return { isValid: false, error: 'Formato entità non valido (richiesti type e id)' };
            }
            
            if (!['player', 'team'].includes(entity.type)) {
                return { isValid: false, error: 'Tipo entità non valido (player o team)' };
            }
        }

        if (!params.eventType) {
            return { isValid: false, error: 'Tipo evento mancante' };
        }

        // Verifica intensità impatto
        if (params.impactIntensity && (params.impactIntensity < 1 || params.impactIntensity > 10)) {
            return { isValid: false, error: 'Intensità impatto deve essere tra 1 e 10' };
        }

        return { isValid: true };
    }

    initializeMoraleDataset() {
        if (!this.gameManager.gameData.moraleStatus) {
            this.gameManager.gameData.moraleStatus = [];
        }
    }

    async processEntityMoraleUpdate(entity, params) {
        // Trova o crea record morale
        let moraleRecord = this.findMoraleRecord(entity.type, entity.id);
        
        if (!moraleRecord) {
            moraleRecord = this.createMoraleRecord(entity.type, entity.id);
        }

        // Calcola impatto morale basato su evento
        const moraleImpact = this.calculateMoraleImpact(moraleRecord, params);

        // Applica cambiamento morale
        const previousMorale = moraleRecord.current_morale;
        moraleRecord.current_morale = this.applyMoraleChange(moraleRecord, moraleImpact);

        // Aggiorna fattori di influenza
        this.updateInfluenceFactors(moraleRecord, params, moraleImpact);

        // Calcola nuova tendenza
        moraleRecord.morale_trend = this.calculateMoraleTrend(moraleRecord, moraleImpact);

        // Aggiorna metadati
        this.updateMoraleMetadata(moraleRecord, params);

        // Sincronizza con entità principale (player o team)
        this.syncMoraleWithEntity(entity.type, entity.id, moraleRecord.current_morale);

        const result = {
            entityType: entity.type,
            entityId: entity.id,
            previousMorale: previousMorale,
            newMorale: moraleRecord.current_morale,
            moraleChange: moraleRecord.current_morale - previousMorale,
            trend: moraleRecord.morale_trend,
            isSignificantChange: Math.abs(moraleRecord.current_morale - previousMorale) >= 10,
            impactFactors: moraleImpact
        };

        return result;
    }

    findMoraleRecord(entityType, entityId) {
        return this.gameManager.gameData.moraleStatus.find(
            record => record.entity_type === entityType && record.entity_id === entityId
        );
    }

    createMoraleRecord(entityType, entityId) {
        // Ottieni morale base dall'entità
        let baseMorale = 50;
        let currentMorale = 50;

        if (entityType === 'player') {
            const player = this.gameManager.gameData.players.find(p => p.id === entityId);
            if (player) {
                currentMorale = player.morale || 50;
                baseMorale = 50; // Base standard per giocatori
            }
        } else if (entityType === 'team') {
            const team = this.gameManager.gameData.teams.find(t => t.id === entityId);
            if (team) {
                currentMorale = team.team_morale || 50;
                baseMorale = 50; // Base standard per squadre
            }
        }

        const newRecord = {
            id: `morale_${entityType}_${entityId}_${Date.now()}`,
            entity_type: entityType,
            entity_id: entityId,
            current_morale: currentMorale,
            base_morale: baseMorale,
            recent_results_impact: 0,
            playing_time_impact: entityType === 'player' ? 0 : null,
            training_impact: 0,
            transfer_impact: 0,
            injury_impact: 0,
            contract_impact: entityType === 'player' ? 0 : null,
            team_chemistry_impact: 0,
            manager_relationship: entityType === 'player' ? 0 : null,
            fan_support_impact: 0,
            media_pressure_impact: 0,
            personal_issues_impact: 0,
            achievement_impact: 0,
            morale_trend: 'stable',
            last_significant_event: 'initialization',
            event_date: new Date().toISOString(),
            recovery_rate: 1,
            stability_factor: 1,
            next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.gameManager.gameData.moraleStatus.push(newRecord);
        return newRecord;
    }

    calculateMoraleImpact(moraleRecord, params) {
        const impact = {
            totalChange: 0,
            factorChanges: {},
            description: params.eventDescription || 'Evento non specificato'
        };

        const baseIntensity = params.impactIntensity || 5;
        const eventData = params.eventData || {};

        switch (params.eventType) {
            case 'match_result':
                impact.factorChanges.recent_results_impact = this.calculateMatchResultImpact(eventData, baseIntensity);
                break;

            case 'transfer':
                impact.factorChanges.transfer_impact = this.calculateTransferImpact(eventData, baseIntensity, moraleRecord);
                break;

            case 'training':
                impact.factorChanges.training_impact = this.calculateTrainingImpact(eventData, baseIntensity);
                break;

            case 'injury':
                impact.factorChanges.injury_impact = this.calculateInjuryImpact(eventData, baseIntensity);
                break;

            case 'contract':
                if (moraleRecord.entity_type === 'player') {
                    impact.factorChanges.contract_impact = this.calculateContractImpact(eventData, baseIntensity);
                }
                break;

            case 'playing_time':
                if (moraleRecord.entity_type === 'player') {
                    impact.factorChanges.playing_time_impact = this.calculatePlayingTimeImpact(eventData, baseIntensity);
                }
                break;

            case 'achievement':
                impact.factorChanges.achievement_impact = this.calculateAchievementImpact(eventData, baseIntensity);
                break;

            case 'media_pressure':
                impact.factorChanges.media_pressure_impact = this.calculateMediaPressureImpact(eventData, baseIntensity);
                break;

            case 'fan_support':
                impact.factorChanges.fan_support_impact = this.calculateFanSupportImpact(eventData, baseIntensity);
                break;

            case 'team_chemistry':
                impact.factorChanges.team_chemistry_impact = this.calculateTeamChemistryImpact(eventData, baseIntensity);
                break;

            case 'cascade_effect':
                // Effetto a cascata più leggero
                impact.factorChanges.team_chemistry_impact = baseIntensity * 0.3;
                break;

            default:
                // Evento generico
                impact.factorChanges.personal_issues_impact = baseIntensity * 0.5;
        }

        // Calcola cambiamento totale
        impact.totalChange = Object.values(impact.factorChanges).reduce((sum, change) => sum + change, 0);

        return impact;
    }

    calculateMatchResultImpact(eventData, intensity) {
        const result = eventData.result || 'draw'; // win, draw, loss
        const importance = eventData.importance || 1; // 1-3 (normale, importante, cruciale)
        
        let impact = 0;
        switch (result) {
            case 'win':
                impact = intensity * 2 * importance;
                break;
            case 'draw':
                impact = intensity * 0.5 * importance;
                break;
            case 'loss':
                impact = -intensity * 1.5 * importance;
                break;
        }

        // Fattore performance individuale (per giocatori)
        if (eventData.playerPerformance) {
            const performanceMultiplier = (eventData.playerPerformance - 6) * 0.2; // Rating 6 = neutro
            impact *= (1 + performanceMultiplier);
        }

        return Math.round(impact);
    }

    calculateTransferImpact(eventData, intensity, moraleRecord) {
        const transferType = eventData.type || 'unknown'; // incoming, outgoing, failed
        const playerDesire = eventData.playerDesire || 0; // -10 a +10
        
        let impact = 0;
        
        switch (transferType) {
            case 'incoming':
                // Nuovo giocatore: positivo se desiderato
                impact = intensity + playerDesire;
                break;
            case 'outgoing':
                // Giocatore venduto: negativo se non voleva andarsene
                impact = -intensity - playerDesire;
                break;
            case 'failed':
                // Trasferimento fallito: negativo se molto desiderato
                impact = -Math.abs(playerDesire) * 0.5;
                break;
        }

        return Math.round(impact);
    }

    calculateTrainingImpact(eventData, intensity) {
        const trainingQuality = eventData.quality || 5; // 1-10
        const improvement = eventData.improvement || false;
        const injury = eventData.injury || false;
        
        let impact = (trainingQuality - 5) * 0.5; // Base da qualità allenamento
        
        if (improvement) impact += intensity * 0.5;
        if (injury) impact -= intensity * 1.5;
        
        return Math.round(impact);
    }

    calculateInjuryImpact(eventData, intensity) {
        const severity = eventData.severity || 'minor'; // minor, major, severe
        const duration = eventData.duration || 1; // giorni
        
        let impact = -intensity;
        
        switch (severity) {
            case 'minor':
                impact *= 0.5;
                break;
            case 'major':
                impact *= 1.5;
                break;
            case 'severe':
                impact *= 2.5;
                break;
        }
        
        // Durata influenza l'impatto
        impact *= Math.min(2, duration / 7); // Max 2x per infortuni lunghi
        
        return Math.round(impact);
    }

    calculateContractImpact(eventData, intensity) {
        const contractType = eventData.type || 'renewal'; // renewal, improvement, dispute
        const salaryChange = eventData.salaryChange || 0; // percentuale
        
        let impact = 0;
        
        switch (contractType) {
            case 'renewal':
                impact = intensity * 0.5;
                break;
            case 'improvement':
                impact = intensity + (salaryChange * 0.1);
                break;
            case 'dispute':
                impact = -intensity * 1.5;
                break;
        }
        
        return Math.round(impact);
    }

    calculatePlayingTimeImpact(eventData, intensity) {
        const playingTime = eventData.playingTime || 50; // percentuale partite giocate
        const expectation = eventData.expectation || 70; // aspettativa giocatore
        
        const difference = playingTime - expectation;
        const impact = (difference / 10) * intensity * 0.3;
        
        return Math.round(impact);
    }

    calculateAchievementImpact(eventData, intensity) {
        const achievementType = eventData.type || 'minor'; // minor, major, historic
        
        let impact = intensity;
        
        switch (achievementType) {
            case 'minor':
                impact *= 0.5;
                break;
            case 'major':
                impact *= 1.5;
                break;
            case 'historic':
                impact *= 2.5;
                break;
        }
        
        return Math.round(impact);
    }

    calculateMediaPressureImpact(eventData, intensity) {
        const pressureType = eventData.type || 'neutral'; // positive, neutral, negative, intense
        
        let impact = 0;
        
        switch (pressureType) {
            case 'positive':
                impact = intensity * 0.3;
                break;
            case 'neutral':
                impact = 0;
                break;
            case 'negative':
                impact = -intensity * 0.5;
                break;
            case 'intense':
                impact = -intensity * 1.2;
                break;
        }
        
        return Math.round(impact);
    }

    calculateFanSupportImpact(eventData, intensity) {
        const supportLevel = eventData.level || 'normal'; // low, normal, high, fanatic
        
        let impact = 0;
        
        switch (supportLevel) {
            case 'low':
                impact = -intensity * 0.3;
                break;
            case 'normal':
                impact = 0;
                break;
            case 'high':
                impact = intensity * 0.5;
                break;
            case 'fanatic':
                impact = intensity * 0.8;
                break;
        }
        
        return Math.round(impact);
    }

    calculateTeamChemistryImpact(eventData, intensity) {
        const chemistryChange = eventData.chemistryChange || 0; // -10 a +10
        const impact = chemistryChange * intensity * 0.2;
        
        return Math.round(impact);
    }

    applyMoraleChange(moraleRecord, moraleImpact) {
        let newMorale = moraleRecord.current_morale + moraleImpact.totalChange;
        
        // Applica fattore stabilità (giocatori più stabili cambiano meno)
        const stabilityFactor = moraleRecord.stability_factor || 1;
        const adjustedChange = moraleImpact.totalChange / stabilityFactor;
        newMorale = moraleRecord.current_morale + adjustedChange;
        
        // Limita tra 0 e 100
        newMorale = Math.max(0, Math.min(100, newMorale));
        
        return Math.round(newMorale);
    }

    updateInfluenceFactors(moraleRecord, params, moraleImpact) {
        // Aggiorna fattori di influenza specifici
        Object.entries(moraleImpact.factorChanges).forEach(([factor, change]) => {
            if (moraleRecord[factor] !== null && moraleRecord[factor] !== undefined) {
                moraleRecord[factor] = Math.max(-20, Math.min(20, moraleRecord[factor] + change));
            }
        });
        
        // Decadimento naturale dei fattori nel tempo
        this.applyNaturalDecay(moraleRecord);
    }

    applyNaturalDecay(moraleRecord) {
        const decayRate = 0.1; // 10% di decadimento per aggiornamento
        
        const factorsToDecay = [
            'recent_results_impact', 'training_impact', 'transfer_impact',
            'media_pressure_impact', 'achievement_impact'
        ];
        
        factorsToDecay.forEach(factor => {
            if (moraleRecord[factor] !== null && moraleRecord[factor] !== undefined) {
                moraleRecord[factor] *= (1 - decayRate);
                if (Math.abs(moraleRecord[factor]) < 0.5) {
                    moraleRecord[factor] = 0; // Reset se troppo piccolo
                }
            }
        });
    }

    calculateMoraleTrend(moraleRecord, moraleImpact) {
        const totalChange = moraleImpact.totalChange;
        
        if (totalChange > 5) return 'rising';
        if (totalChange < -5) return 'declining';
        
        // Considera anche la tendenza dei fattori
        const positiveFactors = Object.values(moraleImpact.factorChanges).filter(change => change > 0).length;
        const negativeFactors = Object.values(moraleImpact.factorChanges).filter(change => change < 0).length;
        
        if (positiveFactors > negativeFactors) return 'rising';
        if (negativeFactors > positiveFactors) return 'declining';
        
        return 'stable';
    }

    updateMoraleMetadata(moraleRecord, params) {
        moraleRecord.last_significant_event = params.eventType;
        moraleRecord.event_date = new Date().toISOString();
        moraleRecord.updated_at = new Date().toISOString();
        
        // Programma prossima valutazione (7 giorni)
        moraleRecord.next_evaluation = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    }

    syncMoraleWithEntity(entityType, entityId, newMorale) {
        if (entityType === 'player') {
            const player = this.gameManager.gameData.players.find(p => p.id === entityId);
            if (player) {
                player.morale = newMorale;
                player.updated_at = new Date().toISOString();
            }
        } else if (entityType === 'team') {
            const team = this.gameManager.gameData.teams.find(t => t.id === entityId);
            if (team) {
                team.team_morale = newMorale;
                team.updated_at = new Date().toISOString();
            }
        }
    }

    calculateCascadeEffects(updateResults, params) {
        const cascadeEffects = [];
        
        // Effetti squadra -> giocatori
        const teamUpdates = updateResults.filter(r => r.entityType === 'team');
        teamUpdates.forEach(teamUpdate => {
            if (Math.abs(teamUpdate.moraleChange) >= 10) {
                // Trova giocatori della squadra
                const teamPlayers = this.gameManager.gameData.players.filter(p => p.team_id === teamUpdate.entityId);
                
                teamPlayers.forEach(player => {
                    cascadeEffects.push({
                        entity: { type: 'player', id: player.id },
                        intensity: teamUpdate.moraleChange * 0.2 // 20% dell'effetto squadra
                    });
                });
            }
        });
        
        // Effetti giocatori -> squadra (se molti giocatori cambiano)
        const playerUpdates = updateResults.filter(r => r.entityType === 'player');
        const teamPlayerGroups = {};
        
        playerUpdates.forEach(playerUpdate => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerUpdate.entityId);
            if (player) {
                if (!teamPlayerGroups[player.team_id]) {
                    teamPlayerGroups[player.team_id] = [];
                }
                teamPlayerGroups[player.team_id].push(playerUpdate);
            }
        });
        
        Object.entries(teamPlayerGroups).forEach(([teamId, playerUpdates]) => {
            if (playerUpdates.length >= 3) { // Almeno 3 giocatori interessati
                const averageChange = playerUpdates.reduce((sum, update) => sum + update.moraleChange, 0) / playerUpdates.length;
                
                if (Math.abs(averageChange) >= 5) {
                    cascadeEffects.push({
                        entity: { type: 'team', id: teamId },
                        intensity: averageChange * 0.3 // 30% dell'effetto medio giocatori
                    });
                }
            }
        });
        
        return cascadeEffects;
    }

    updateGlobalMoraleTrends(updateResults) {
        // Aggiorna statistiche globali morale (per future analisi)
        if (!this.gameManager.gameData.globalStats) {
            this.gameManager.gameData.globalStats = {};
        }
        
        const moraleStats = {
            lastUpdate: new Date().toISOString(),
            entitiesAffected: updateResults.length,
            averageChange: this.calculateAverageMoraleChange(updateResults),
            significantChanges: updateResults.filter(r => r.isSignificantChange).length
        };
        
        this.gameManager.gameData.globalStats.morale = moraleStats;
    }

    calculateAverageMoraleChange(updateResults) {
        if (updateResults.length === 0) return 0;
        
        const totalChange = updateResults.reduce((sum, result) => sum + result.moraleChange, 0);
        return Math.round((totalChange / updateResults.length) * 10) / 10; // 1 decimale
    }

    generateMoraleEvents(updateResults, params) {
        // Genera eventi solo per cambiamenti significativi
        const significantChanges = updateResults.filter(r => r.isSignificantChange);
        
        significantChanges.forEach(change => {
            let entityName = 'Entità sconosciuta';
            
            if (change.entityType === 'player') {
                const player = this.gameManager.gameData.players.find(p => p.id === change.entityId);
                entityName = player ? `${player.first_name} ${player.last_name}` : 'Giocatore';
            } else if (change.entityType === 'team') {
                const team = this.gameManager.gameData.teams.find(t => t.id === change.entityId);
                entityName = team ? team.name : 'Squadra';
            }
            
            const isPositive = change.moraleChange > 0;
            const event = {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                event_type: 'morale',
                event_category: isPositive ? 'success' : 'warning',
                title: `Cambiamento Morale: ${entityName}`,
                description: `Il morale di ${entityName} è ${isPositive ? 'migliorato' : 'peggiorato'} significativamente (${change.moraleChange > 0 ? '+' : ''}${change.moraleChange})`,
                related_entity_type: change.entityType,
                related_entity_id: change.entityId,
                team_id: change.entityType === 'team' ? change.entityId : null,
                player_id: change.entityType === 'player' ? change.entityId : null,
                match_id: null,
                priority: Math.abs(change.moraleChange) >= 20 ? 4 : 2,
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
            
            if (!this.gameManager.gameData.gameEvents) {
                this.gameManager.gameData.gameEvents = [];
            }
            this.gameManager.gameData.gameEvents.push(event);
        });
    }

    scheduleNextEvaluations(updateResults) {
        // Programma valutazioni automatiche future per entità con morale instabile
        const unstableEntities = updateResults.filter(r => 
            r.trend === 'declining' || Math.abs(r.moraleChange) >= 15
        );
        
        unstableEntities.forEach(entity => {
            const moraleRecord = this.findMoraleRecord(entity.entityType, entity.entityId);
            if (moraleRecord) {
                // Valutazione più frequente per entità instabili (3 giorni invece di 7)
                moraleRecord.next_evaluation = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
            }
        });
    }
}