/**
 * FLOW: Player_Train
 * 
 * Gestisce l'esecuzione di una sessione di allenamento con miglioramenti attributi,
 * calcolo rischi infortuni e aggiornamento morale giocatori.
 * 
 * Trigger: Esecuzione allenamento programmato o manuale
 * Input: ID sessione allenamento, lista giocatori partecipanti, tipo e intensità
 * Output: Giocatori allenati, attributi aggiornati, eventi generati
 * 
 * Dataset coinvolti:
 * - trainings (lettura - parametri allenamento)
 * - players (scrittura - attributi, fitness, infortuni)
 * - staff (lettura - bonus allenatori)
 * - attributes_history (scrittura - tracking cambiamenti)
 * - morale_status (scrittura - impatto allenamento)
 * - game_events (scrittura - notifiche infortuni/progressi)
 */

export class PlayerTrainFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di allenamento giocatori
     * @param {Object} params - Parametri dell'allenamento
     * @param {string} params.trainingId - ID sessione allenamento
     * @param {Array} params.participants - Lista ID giocatori partecipanti
     * @param {string} params.trainingType - Tipo allenamento (fitness, technical, tactical, recovery)
     * @param {string} params.intensity - Intensità (light, medium, high, very_high)
     * @param {string} params.focusArea - Area focus (pace, shooting, passing, defending, etc.)
     * @param {number} params.duration - Durata in minuti (default: 90)
     * @returns {Object} Risultato dell'allenamento
     */
    async execute(params) {
        try {
            console.log('🏃 Executing Player_Train flow...', params);

            // 1. Validazione parametri
            const validation = this.validateTrainingParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Carica sessione allenamento
            const training = this.gameManager.gameData.trainings?.find(t => t.id === params.trainingId);
            if (!training) {
                throw new Error('Sessione allenamento non trovata');
            }

            // 3. Verifica disponibilità giocatori
            const availablePlayers = this.checkPlayerAvailability(params.participants);

            // 4. Calcola bonus staff tecnico
            const staffBonuses = this.calculateStaffBonuses(training.team_id, params.trainingType);

            // 5. Processa allenamento per ogni giocatore
            const trainingResults = [];
            const injuries = [];
            const significantImprovements = [];

            for (const playerId of availablePlayers) {
                const result = this.processPlayerTraining(playerId, params, staffBonuses);
                trainingResults.push(result);

                // Gestisci infortuni
                if (result.injury) {
                    injuries.push(result.injury);
                    this.applyInjury(playerId, result.injury);
                }

                // Gestisci miglioramenti significativi
                if (result.significantImprovement) {
                    significantImprovements.push({
                        playerId: playerId,
                        improvements: result.improvements
                    });
                }

                // Aggiorna giocatore
                this.updatePlayerAfterTraining(playerId, result);

                // Registra nello storico attributi
                if (Object.keys(result.improvements).length > 0) {
                    this.recordAttributeChanges(playerId, result.improvements, params.trainingId);
                }
            }

            // 6. Aggiorna morale squadra
            this.updateTeamMoraleAfterTraining(training.team_id, params, trainingResults);

            // 7. Aggiorna stato sessione allenamento
            this.updateTrainingSession(training, trainingResults, injuries);

            // 8. Genera eventi di notifica
            this.generateTrainingEvents(training, injuries, significantImprovements);

            console.log('✅ Player training completed successfully');

            return {
                success: true,
                trainingId: params.trainingId,
                participantsProcessed: trainingResults.length,
                totalImprovements: trainingResults.reduce((sum, r) => sum + Object.keys(r.improvements).length, 0),
                injuries: injuries.length,
                significantImprovements: significantImprovements.length,
                averageFitnessGain: trainingResults.reduce((sum, r) => sum + r.fitnessGain, 0) / trainingResults.length
            };

        } catch (error) {
            console.error('❌ Player_Train flow error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateTrainingParams(params) {
        if (!params.trainingId) {
            return { isValid: false, error: 'ID allenamento mancante' };
        }

        if (!params.participants || !Array.isArray(params.participants) || params.participants.length === 0) {
            return { isValid: false, error: 'Lista partecipanti mancante o vuota' };
        }

        const validTypes = ['fitness', 'technical', 'tactical', 'recovery'];
        if (!validTypes.includes(params.trainingType)) {
            return { isValid: false, error: 'Tipo allenamento non valido' };
        }

        const validIntensities = ['light', 'medium', 'high', 'very_high'];
        if (!validIntensities.includes(params.intensity)) {
            return { isValid: false, error: 'Intensità allenamento non valida' };
        }

        return { isValid: true };
    }

    checkPlayerAvailability(participantIds) {
        const availablePlayers = [];

        participantIds.forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            
            if (!player) {
                console.warn(`Player not found: ${playerId}`);
                return;
            }

            // Verifica se il giocatore può allenarsi
            if (player.injury_status === 'healthy' && player.fitness > 20) {
                availablePlayers.push(playerId);
            } else {
                console.warn(`Player ${player.first_name} ${player.last_name} not available for training: ${player.injury_status}, fitness: ${player.fitness}`);
            }
        });

        return availablePlayers;
    }

    calculateStaffBonuses(teamId, trainingType) {
        const teamStaff = this.gameManager.gameData.staff?.filter(s => s.team_id === teamId) || [];
        
        let bonuses = {
            efficiency: 0,
            injuryPrevention: 0,
            specialization: 0
        };

        teamStaff.forEach(staff => {
            switch (staff.role) {
                case 'head_coach':
                    bonuses.efficiency += (staff.coaching_ability || 50) * 0.1;
                    break;
                case 'fitness_coach':
                    bonuses.efficiency += (staff.fitness_expertise || 50) * 0.15;
                    bonuses.injuryPrevention += (staff.fitness_expertise || 50) * 0.2;
                    break;
                case 'assistant_coach':
                    bonuses.efficiency += (staff.coaching_ability || 50) * 0.05;
                    break;
                case 'physio':
                    bonuses.injuryPrevention += (staff.medical_expertise || 50) * 0.3;
                    break;
            }

            // Bonus specializzazione
            if (staff.specialization === trainingType) {
                bonuses.specialization += 10;
            }
        });

        // Normalizza bonus (0-100)
        Object.keys(bonuses).forEach(key => {
            bonuses[key] = Math.min(100, Math.max(0, bonuses[key]));
        });

        return bonuses;
    }

    processPlayerTraining(playerId, params, staffBonuses) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        
        const result = {
            playerId: playerId,
            improvements: {},
            fitnessGain: 0,
            moraleChange: 0,
            injury: null,
            significantImprovement: false
        };

        // Calcola intensità numerica
        const intensityValues = { light: 1, medium: 2, high: 3, very_high: 4 };
        const intensityLevel = intensityValues[params.intensity];

        // Calcola miglioramenti attributi
        result.improvements = this.calculateAttributeImprovements(player, params, intensityLevel, staffBonuses);

        // Calcola guadagno fitness
        result.fitnessGain = this.calculateFitnessGain(player, params.trainingType, intensityLevel);

        // Calcola cambio morale
        result.moraleChange = this.calculateMoraleChange(player, params, intensityLevel);

        // Calcola rischio infortuni
        const injuryRisk = this.calculateInjuryRisk(player, intensityLevel, staffBonuses);
        if (Math.random() < injuryRisk) {
            result.injury = this.generateTrainingInjury(intensityLevel);
        }

        // Verifica se è un miglioramento significativo
        const totalImprovement = Object.values(result.improvements).reduce((sum, val) => sum + val, 0);
        result.significantImprovement = totalImprovement >= 3;

        return result;
    }

    calculateAttributeImprovements(player, params, intensityLevel, staffBonuses) {
        const improvements = {};
        
        // Mappa tipo allenamento -> attributi interessati
        const trainingEffects = {
            fitness: ['physical', 'pace'],
            technical: ['shooting', 'passing', 'dribbling'],
            tactical: ['passing', 'defending'],
            recovery: [] // Solo fitness, nessun attributo
        };

        const targetAttributes = trainingEffects[params.trainingType] || [];
        
        // Focus area specifica
        if (params.focusArea && !targetAttributes.includes(params.focusArea)) {
            targetAttributes.push(params.focusArea);
        }

        targetAttributes.forEach(attribute => {
            // Probabilità base miglioramento
            let improvementChance = 0.3 + (intensityLevel * 0.1); // 40-70%
            
            // Bonus staff
            improvementChance += (staffBonuses.efficiency / 100) * 0.2;
            improvementChance += (staffBonuses.specialization / 100) * 0.1;
            
            // Fattore età (giovani migliorano più facilmente)
            if (player.age <= 23) improvementChance += 0.15;
            else if (player.age >= 30) improvementChance -= 0.1;
            
            // Fattore potenziale
            const potentialGap = player.potential - player[attribute];
            if (potentialGap > 10) improvementChance += 0.1;
            else if (potentialGap < 3) improvementChance -= 0.2;

            if (Math.random() < improvementChance) {
                // Calcola entità miglioramento
                let improvement = 1;
                if (Math.random() < 0.2) improvement = 2; // 20% chance per +2
                if (Math.random() < 0.05) improvement = 3; // 5% chance per +3
                
                // Limita al potenziale
                const maxImprovement = Math.max(0, player.potential - player[attribute]);
                improvement = Math.min(improvement, maxImprovement);
                
                if (improvement > 0) {
                    improvements[attribute] = improvement;
                }
            }
        });

        return improvements;
    }

    calculateFitnessGain(player, trainingType, intensityLevel) {
        let baseGain = intensityLevel * 2; // 2-8 punti base
        
        // Tipo allenamento
        if (trainingType === 'fitness') baseGain *= 1.5;
        else if (trainingType === 'recovery') baseGain *= 2;
        else if (trainingType === 'tactical') baseGain *= 0.7;
        
        // Fattore fitness attuale (più basso = guadagno maggiore)
        if (player.fitness < 60) baseGain *= 1.3;
        else if (player.fitness > 90) baseGain *= 0.7;
        
        return Math.round(baseGain);
    }

    calculateMoraleChange(player, params, intensityLevel) {
        let moraleChange = 1; // Base positivo
        
        // Intensità troppo alta può frustrare
        if (intensityLevel >= 4 && player.fitness < 70) {
            moraleChange = -2;
        }
        
        // Allenamento recovery sempre positivo
        if (params.trainingType === 'recovery') {
            moraleChange = 2;
        }
        
        // Fattore morale attuale
        if (player.morale < 40) moraleChange += 1; // Boost per giocatori scontenti
        
        return moraleChange;
    }

    calculateInjuryRisk(player, intensityLevel, staffBonuses) {
        let baseRisk = intensityLevel * 0.01; // 1-4% base
        
        // Fattore fitness (bassa fitness = più rischio)
        if (player.fitness < 60) baseRisk *= 2;
        else if (player.fitness > 90) baseRisk *= 0.5;
        
        // Fattore età
        if (player.age >= 32) baseRisk *= 1.5;
        else if (player.age <= 20) baseRisk *= 1.2; // Giovani più fragili
        
        // Bonus staff medico
        baseRisk *= (1 - (staffBonuses.injuryPrevention / 100) * 0.5);
        
        return Math.max(0, Math.min(0.1, baseRisk)); // Max 10%
    }

    generateTrainingInjury(intensityLevel) {
        const injuries = [
            { type: 'minor', days: 1, description: 'Affaticamento muscolare' },
            { type: 'minor', days: 2, description: 'Contusione lieve' },
            { type: 'minor', days: 3, description: 'Stiramento muscolare' }
        ];

        if (intensityLevel >= 3) {
            injuries.push(
                { type: 'major', days: 5, description: 'Lesione muscolare' },
                { type: 'major', days: 7, description: 'Distorsione' }
            );
        }

        return injuries[Math.floor(Math.random() * injuries.length)];
    }

    applyInjury(playerId, injury) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        player.injury_status = injury.type;
        player.injury_days = injury.days;
        player.fitness = Math.max(30, player.fitness - 10); // Calo fitness
        player.morale = Math.max(0, player.morale - 5); // Calo morale
        player.updated_at = new Date().toISOString();
    }

    updatePlayerAfterTraining(playerId, result) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        // Applica miglioramenti attributi
        Object.entries(result.improvements).forEach(([attribute, improvement]) => {
            player[attribute] = Math.min(99, player[attribute] + improvement);
        });

        // Aggiorna fitness
        player.fitness = Math.min(100, player.fitness + result.fitnessGain);

        // Aggiorna morale
        player.morale = Math.max(0, Math.min(100, player.morale + result.moraleChange));

        // Ricalcola overall rating se ci sono stati miglioramenti
        if (Object.keys(result.improvements).length > 0) {
            player.overall_rating = this.recalculateOverallRating(player);
        }

        player.updated_at = new Date().toISOString();
    }

    recalculateOverallRating(player) {
        // Pesi per posizione
        const weights = {
            'GK': { defending: 0.3, physical: 0.2, pace: 0.1, shooting: 0.05, passing: 0.15, dribbling: 0.2 },
            'DEF': { defending: 0.35, physical: 0.25, pace: 0.15, shooting: 0.05, passing: 0.1, dribbling: 0.1 },
            'MID': { passing: 0.3, dribbling: 0.2, defending: 0.15, physical: 0.15, pace: 0.1, shooting: 0.1 },
            'ATT': { shooting: 0.3, pace: 0.25, dribbling: 0.2, physical: 0.1, passing: 0.1, defending: 0.05 }
        };

        const positionWeights = weights[player.position] || weights['MID'];
        
        let newRating = 0;
        Object.entries(positionWeights).forEach(([attr, weight]) => {
            newRating += player[attr] * weight;
        });

        return Math.round(newRating);
    }

    recordAttributeChanges(playerId, improvements, trainingId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        const record = {
            id: `attr_history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            player_id: playerId,
            record_date: new Date().toISOString(),
            overall_rating: player.overall_rating,
            pace: player.pace,
            shooting: player.shooting,
            passing: player.passing,
            dribbling: player.dribbling,
            defending: player.defending,
            physical: player.physical,
            fitness: player.fitness,
            morale: player.morale,
            market_value: player.market_value,
            change_reason: 'training',
            training_id: trainingId,
            match_id: null,
            attribute_changes: improvements,
            season: this.gameManager.gameData.currentSeason || 1,
            player_age_at_time: player.age,
            is_significant_change: Object.values(improvements).reduce((sum, val) => sum + val, 0) >= 2,
            created_at: new Date().toISOString()
        };

        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData.attributesHistory) {
            this.gameManager.gameData.attributesHistory = [];
        }

        this.gameManager.gameData.attributesHistory.push(record);
    }

    updateTeamMoraleAfterTraining(teamId, params, results) {
        const team = this.gameManager.gameData.teams.find(t => t.id === teamId);
        if (!team) return;

        // Calcola impatto medio morale
        const averageMoraleChange = results.reduce((sum, r) => sum + r.moraleChange, 0) / results.length;
        
        // Aggiorna morale squadra
        team.team_morale = Math.max(0, Math.min(100, team.team_morale + averageMoraleChange));
        team.updated_at = new Date().toISOString();
    }

    updateTrainingSession(training, results, injuries) {
        training.status = 'completed';
        training.fitness_gain = results.reduce((sum, r) => sum + r.fitnessGain, 0) / results.length;
        training.skill_improvements = results.map(r => ({
            playerId: r.playerId,
            improvements: r.improvements
        })).filter(r => Object.keys(r.improvements).length > 0);
        training.injuries_occurred = injuries;
        training.morale_impact = results.reduce((sum, r) => sum + r.moraleChange, 0) / results.length;
        training.updated_at = new Date().toISOString();
    }

    generateTrainingEvents(training, injuries, significantImprovements) {
        // Eventi infortuni
        injuries.forEach(injury => {
            const player = this.gameManager.gameData.players.find(p => p.id === injury.playerId);
            if (!player) return;

            const event = {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                event_type: 'training',
                event_category: 'warning',
                title: `Infortunio in Allenamento`,
                description: `${player.first_name} ${player.last_name} si è infortunato durante l'allenamento: ${injury.description}`,
                related_entity_type: 'player',
                related_entity_id: player.id,
                team_id: training.team_id,
                player_id: player.id,
                match_id: null,
                priority: 3,
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
        });

        // Eventi miglioramenti significativi
        significantImprovements.forEach(improvement => {
            const player = this.gameManager.gameData.players.find(p => p.id === improvement.playerId);
            if (!player) return;

            const improvedAttributes = Object.keys(improvement.improvements).join(', ');

            const event = {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                event_type: 'training',
                event_category: 'success',
                title: `Progressi in Allenamento`,
                description: `${player.first_name} ${player.last_name} ha mostrato miglioramenti significativi in: ${improvedAttributes}`,
                related_entity_type: 'player',
                related_entity_id: player.id,
                team_id: training.team_id,
                player_id: player.id,
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
        });
    }
}