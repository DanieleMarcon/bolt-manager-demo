/**
 * FLOW: GameFlow_AdvanceDay
 * 
 * Gestisce l'avanzamento temporale del gioco, processando eventi automatici,
 * aggiornamenti stato giocatori, allenamenti programmati e generazione eventi.
 * 
 * Trigger: Click su "Avanza Giorno" o automatico (se impostato)
 * Input: Data attuale di gioco, numero giorni da avanzare (default: 1)
 * Output: Gioco avanzato di 1+ giorni, eventi notificati
 * 
 * Dataset coinvolti:
 * - user_sessions (lettura/scrittura - data corrente)
 * - players (scrittura - recuperi, aging)
 * - trainings (lettura - allenamenti programmati)
 * - morale_status (scrittura - aggiornamenti)
 * - game_events (scrittura - nuovi eventi)
 * - transfers (lettura - scadenze trattative)
 */

export class GameFlowAdvanceDayFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di avanzamento giornaliero
     * @param {Object} params - Parametri dell'avanzamento
     * @param {number} params.days - Numero di giorni da avanzare (default: 1)
     * @param {boolean} params.autoProcess - Se processare automaticamente eventi (default: true)
     * @param {boolean} params.generateEvents - Se generare eventi casuali (default: true)
     * @returns {Object} Risultato dell'avanzamento
     */
    async execute(params = {}) {
        try {
            console.log('📅 Executing GameFlow_AdvanceDay...', params);

            // 1. Validazione parametri
            const validation = this.validateParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            const daysToAdvance = params.days || 1;
            const currentDate = new Date(this.gameManager.getCurrentDate());
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + daysToAdvance);

            // 2. Aggiorna data di gioco
            this.gameManager.gameData.currentDate = newDate.toISOString();

            // 3. Processa eventi per ogni giorno
            const allEvents = [];
            for (let day = 1; day <= daysToAdvance; day++) {
                const dayDate = new Date(currentDate);
                dayDate.setDate(currentDate.getDate() + day);
                
                const dayEvents = await this.processDayEvents(dayDate, params);
                allEvents.push(...dayEvents);
            }

            // 4. Aggiorna stato giocatori
            const playerUpdates = this.updatePlayersStatus(daysToAdvance);

            // 5. Processa allenamenti programmati
            const trainingResults = this.processScheduledTrainings(currentDate, newDate);

            // 6. Aggiorna morale naturale
            const moraleUpdates = this.updateNaturalMorale(daysToAdvance);

            // 7. Processa scadenze trasferimenti
            const transferUpdates = this.processTransferDeadlines(newDate);

            // 8. Genera eventi casuali
            const randomEvents = params.generateEvents !== false ? 
                this.generateRandomEvents(daysToAdvance) : [];

            // 9. Aggiorna sessione utente
            this.updateUserSession(daysToAdvance);

            // 10. Salva tutti i cambiamenti
            this.gameManager.saveGameData();

            const totalEvents = [...allEvents, ...randomEvents];

            console.log(`✅ Advanced ${daysToAdvance} day(s) successfully`);

            return {
                success: true,
                newDate: newDate.toISOString(),
                daysAdvanced: daysToAdvance,
                eventsGenerated: totalEvents,
                playerUpdates: playerUpdates,
                trainingResults: trainingResults,
                moraleUpdates: moraleUpdates,
                transferUpdates: transferUpdates
            };

        } catch (error) {
            console.error('❌ GameFlow_AdvanceDay error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateParams(params) {
        if (params.days && (params.days < 1 || params.days > 30)) {
            return { isValid: false, error: 'Numero giorni deve essere tra 1 e 30' };
        }

        return { isValid: true };
    }

    async processDayEvents(date, params) {
        const events = [];

        // Verifica partite programmate per questo giorno
        const scheduledMatches = this.gameManager.gameData.matches.filter(match => {
            const matchDate = new Date(match.match_date);
            return matchDate.toDateString() === date.toDateString() && 
                   match.status === 'scheduled';
        });

        scheduledMatches.forEach(match => {
            if (match.is_user_match) {
                events.push({
                    type: 'match_reminder',
                    title: 'Partita Oggi',
                    description: `Oggi giochi contro ${this.getOpponentName(match)}`,
                    priority: 5,
                    match_id: match.id
                });
            }
        });

        // Verifica allenamenti programmati
        const scheduledTrainings = this.gameManager.gameData.trainings.filter(training => {
            const trainingDate = new Date(training.training_date);
            return trainingDate.toDateString() === date.toDateString() && 
                   training.status === 'scheduled';
        });

        scheduledTrainings.forEach(training => {
            events.push({
                type: 'training_reminder',
                title: 'Allenamento Programmato',
                description: `Allenamento ${training.training_type} intensità ${training.intensity}`,
                priority: 3,
                training_id: training.id
            });
        });

        return events;
    }

    updatePlayersStatus(days) {
        const updates = {
            injuries_healed: 0,
            fitness_recovered: 0,
            age_updates: 0
        };

        this.gameManager.gameData.players.forEach(player => {
            // Guarigione infortuni
            if (player.injury_days > 0) {
                player.injury_days = Math.max(0, player.injury_days - days);
                if (player.injury_days === 0) {
                    player.injury_status = 'healthy';
                    updates.injuries_healed++;
                    
                    // Genera evento guarigione
                    this.generatePlayerEvent(player, 'recovery', 
                        `${player.first_name} ${player.last_name} è guarito dall'infortunio`);
                }
            }

            // Recupero fitness naturale
            if (player.fitness < 100) {
                const recoveryRate = player.injury_status === 'healthy' ? 3 : 1;
                player.fitness = Math.min(100, player.fitness + (days * recoveryRate));
                updates.fitness_recovered++;
            }

            // Recupero stamina
            player.stamina = Math.min(100, player.stamina + (days * 5));

            // Aging (ogni 30 giorni circa)
            if (Math.random() < (days / 30)) {
                this.processPlayerAging(player);
                updates.age_updates++;
            }

            player.updated_at = new Date().toISOString();
        });

        return updates;
    }

    processPlayerAging(player) {
        // Aging effects based on age
        if (player.age >= 32) {
            // Decline for older players
            const declineChance = (player.age - 30) * 0.1; // 10% per year after 30
            
            if (Math.random() < declineChance) {
                const attributes = ['pace', 'physical', 'stamina'];
                const attrToDecline = attributes[Math.floor(Math.random() * attributes.length)];
                
                if (player[attrToDecline] > 1) {
                    player[attrToDecline] = Math.max(1, player[attrToDecline] - 1);
                    player.overall_rating = this.recalculateOverallRating(player);
                    
                    // Record in attributes history
                    this.recordAttributeChange(player, 'aging', { [attrToDecline]: -1 });
                }
            }
        }
    }

    recalculateOverallRating(player) {
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

    processScheduledTrainings(startDate, endDate) {
        const results = [];
        
        const scheduledTrainings = this.gameManager.gameData.trainings.filter(training => {
            const trainingDate = new Date(training.training_date);
            return trainingDate >= startDate && trainingDate <= endDate && 
                   training.status === 'scheduled';
        });

        scheduledTrainings.forEach(training => {
            // Auto-execute scheduled trainings
            try {
                const result = this.executeScheduledTraining(training);
                results.push(result);
            } catch (error) {
                console.error('Error executing scheduled training:', error);
            }
        });

        return results;
    }

    executeScheduledTraining(training) {
        // Mark as completed
        training.status = 'completed';
        training.updated_at = new Date().toISOString();

        // Apply training effects to participants
        const improvements = [];
        const injuries = [];

        training.participants.forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            if (!player || player.injury_status !== 'healthy') return;

            // Calculate improvements based on training type
            const trainingEffects = this.calculateTrainingEffects(training, player);
            
            // Apply improvements
            Object.entries(trainingEffects.improvements).forEach(([attr, improvement]) => {
                if (improvement > 0) {
                    player[attr] = Math.min(99, player[attr] + improvement);
                    improvements.push({
                        playerId: playerId,
                        attribute: attr,
                        improvement: improvement
                    });
                }
            });

            // Update fitness and morale
            player.fitness = Math.min(100, player.fitness + trainingEffects.fitnessGain);
            player.morale = Math.min(100, player.morale + trainingEffects.moraleGain);

            // Check for injuries
            if (Math.random() < trainingEffects.injuryRisk) {
                const injury = this.generateTrainingInjury(training.intensity);
                player.injury_status = injury.type;
                player.injury_days = injury.days;
                
                injuries.push({
                    playerId: playerId,
                    injury: injury
                });
            }

            // Record attribute changes
            if (Object.keys(trainingEffects.improvements).length > 0) {
                this.recordAttributeChange(player, 'training', trainingEffects.improvements, training.id);
            }

            player.updated_at = new Date().toISOString();
        });

        return {
            trainingId: training.id,
            improvements: improvements,
            injuries: injuries,
            participantsCount: training.participants.length
        };
    }

    calculateTrainingEffects(training, player) {
        const baseImprovement = training.intensity * 0.3;
        const improvements = {};
        
        // Training type effects
        const trainingTypeEffects = {
            'fitness': ['physical', 'pace'],
            'technical': ['shooting', 'passing', 'dribbling'],
            'tactical': ['passing', 'defending']
        };

        const relevantAttributes = trainingTypeEffects[training.training_type] || ['physical'];
        
        relevantAttributes.forEach(attr => {
            if (Math.random() < 0.4) { // 40% chance for improvement
                const improvement = Math.floor(Math.random() * baseImprovement) + 1;
                improvements[attr] = improvement;
            }
        });

        return {
            improvements: improvements,
            fitnessGain: training.intensity * 2,
            moraleGain: 1,
            injuryRisk: training.intensity * 0.01 // 1% per intensity level
        };
    }

    generateTrainingInjury(intensity) {
        const injuryTypes = [
            { type: 'minor', days: 1, description: 'Affaticamento muscolare' },
            { type: 'minor', days: 2, description: 'Contusione lieve' },
            { type: 'minor', days: 3, description: 'Stiramento muscolare' }
        ];

        if (intensity >= 4 && Math.random() < 0.3) {
            injuryTypes.push({ type: 'major', days: 7, description: 'Lesione muscolare' });
        }

        return injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
    }

    updateNaturalMorale(days) {
        const updates = { players: 0, teams: 0 };

        // Update player morale
        this.gameManager.gameData.moraleStatus.forEach(moraleRecord => {
            if (moraleRecord.entity_type === 'player') {
                // Natural morale recovery towards base
                const targetMorale = moraleRecord.base_morale;
                const currentMorale = moraleRecord.current_morale;
                const difference = targetMorale - currentMorale;
                
                if (Math.abs(difference) > 1) {
                    const recovery = Math.sign(difference) * Math.min(Math.abs(difference), days * moraleRecord.recovery_rate);
                    moraleRecord.current_morale = Math.max(0, Math.min(100, currentMorale + recovery));
                    
                    // Update player morale
                    const player = this.gameManager.gameData.players.find(p => p.id === moraleRecord.entity_id);
                    if (player) {
                        player.morale = moraleRecord.current_morale;
                        updates.players++;
                    }
                }
                
                moraleRecord.updated_at = new Date().toISOString();
            }
        });

        return updates;
    }

    processTransferDeadlines(currentDate) {
        const updates = { expired: 0, completed: 0 };

        this.gameManager.gameData.transfers.forEach(transfer => {
            if (transfer.negotiation_status === 'negotiating' && transfer.negotiation_deadline) {
                const deadline = new Date(transfer.negotiation_deadline);
                
                if (currentDate >= deadline) {
                    // Expire the transfer
                    transfer.negotiation_status = 'failed';
                    transfer.updated_at = new Date().toISOString();
                    updates.expired++;
                    
                    // Generate event
                    this.generateTransferEvent(transfer, 'expired');
                }
            }
        });

        return updates;
    }

    generateRandomEvents(days) {
        const events = [];
        const eventChance = 0.1 * days; // 10% chance per day

        if (Math.random() < eventChance) {
            const randomEvent = this.createRandomEvent();
            if (randomEvent) {
                events.push(randomEvent);
                this.addGameEvent(randomEvent);
            }
        }

        return events;
    }

    createRandomEvent() {
        const eventTypes = [
            {
                type: 'news',
                title: 'Notizie di Mercato',
                description: 'Circolano voci su possibili movimenti di mercato',
                priority: 2
            },
            {
                type: 'weather',
                title: 'Condizioni Meteo',
                description: 'Le condizioni meteo potrebbero influenzare le prossime partite',
                priority: 1
            },
            {
                type: 'media',
                title: 'Attenzione Mediatica',
                description: 'I media stanno seguendo con interesse la squadra',
                priority: 2
            }
        ];

        return eventTypes[Math.floor(Math.random() * eventTypes.length)];
    }

    updateUserSession(days) {
        if (this.gameManager.gameData.userSession) {
            this.gameManager.gameData.userSession.totalPlaytime += days * 5; // 5 minutes per day
        }
    }

    // Helper methods
    getOpponentName(match) {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return 'Avversario';

        const opponentId = match.home_team_id === userTeam.id ? match.away_team_id : match.home_team_id;
        const opponent = this.gameManager.gameData.teams.find(t => t.id === opponentId);
        return opponent?.name || 'Avversario';
    }

    generatePlayerEvent(player, type, description) {
        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: type,
            event_category: 'info',
            title: `${player.first_name} ${player.last_name}`,
            description: description,
            related_entity_type: 'player',
            related_entity_id: player.id,
            team_id: player.team_id,
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

        this.addGameEvent(event);
    }

    generateTransferEvent(transfer, type) {
        const player = this.gameManager.gameData.players.find(p => p.id === transfer.player_id);
        
        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'transfer',
            event_category: 'warning',
            title: 'Trattativa Scaduta',
            description: `La trattativa per ${player?.first_name} ${player?.last_name} è scaduta`,
            related_entity_type: 'transfer',
            related_entity_id: transfer.id,
            team_id: null,
            player_id: transfer.player_id,
            match_id: null,
            priority: 3,
            is_read: false,
            is_user_relevant: transfer.is_user_involved,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };

        this.addGameEvent(event);
    }

    recordAttributeChange(player, reason, changes, relatedId = null) {
        const record = {
            id: `attr_history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            player_id: player.id,
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
            change_reason: reason,
            training_id: reason === 'training' ? relatedId : null,
            match_id: reason === 'match' ? relatedId : null,
            attribute_changes: changes,
            season: this.gameManager.gameData.currentSeason,
            player_age_at_time: player.age,
            is_significant_change: Object.values(changes).some(change => Math.abs(change) >= 2),
            created_at: new Date().toISOString()
        };

        if (!this.gameManager.gameData.attributesHistory) {
            this.gameManager.gameData.attributesHistory = [];
        }
        this.gameManager.gameData.attributesHistory.push(record);
    }

    addGameEvent(event) {
        if (!this.gameManager.gameData.gameEvents) {
            this.gameManager.gameData.gameEvents = [];
        }
        this.gameManager.gameData.gameEvents.push(event);
    }
}