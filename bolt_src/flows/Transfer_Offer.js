/**
 * FLOW: Transfer_Offer
 * 
 * Gestisce l'inizio di una trattativa di trasferimento per un giocatore.
 * Calcola probabilità di accettazione, crea record trattativa e genera eventi.
 * 
 * Trigger: Invio offerta per giocatore dal mercato
 * Input: ID giocatore, offerta economica, dettagli contrattuali, tipo trasferimento
 * Output: Trattativa avviata, notifiche inviate
 * 
 * Dataset coinvolti:
 * - transfers (scrittura - nuova trattativa)
 * - players (lettura - valore e dati giocatore)
 * - teams (lettura - budget squadre)
 * - game_events (scrittura - notifiche trattativa)
 */

export class TransferOfferFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di offerta trasferimento
     * @param {Object} params - Parametri dell'offerta
     * @param {string} params.playerId - ID del giocatore target
     * @param {string} params.fromTeamId - ID squadra offerente
     * @param {string} params.toTeamId - ID squadra proprietaria
     * @param {number} params.transferFee - Costo del trasferimento
     * @param {number} params.playerSalary - Nuovo stipendio proposto
     * @param {number} params.contractLength - Durata contratto (anni)
     * @param {string} params.transferType - Tipo (permanent, loan, free_transfer)
     * @param {number} params.signingBonus - Bonus alla firma (opzionale)
     * @param {number} params.releaseClause - Clausola rescissoria (opzionale)
     * @returns {Object} Risultato dell'offerta
     */
    async execute(params) {
        try {
            console.log('💰 Executing Transfer_Offer flow...', params);

            // 1. Validazione parametri
            const validation = this.validateOfferParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Verifica budget disponibile squadra offerente
            const budgetCheck = this.verifyBudget(params.fromTeamId, params.transferFee, params.signingBonus);
            if (!budgetCheck.sufficient) {
                throw new Error(`Budget insufficiente. Disponibile: €${budgetCheck.available}, Richiesto: €${budgetCheck.required}`);
            }

            // 3. Calcola valore di mercato giocatore
            const player = this.gameManager.gameData.players.find(p => p.id === params.playerId);
            const marketValue = this.calculateMarketValue(player);

            // 4. Determina probabilità accettazione
            const acceptanceProbability = this.calculateAcceptanceProbability(params, marketValue, player);

            // 5. Genera risposta automatica (accettazione/rifiuto/controproposta)
            const response = this.generateResponse(params, acceptanceProbability, marketValue);

            // 6. Crea record trattativa
            const transferRecord = this.createTransferRecord(params, response, marketValue);

            // 7. Aggiorna dataset transfers
            this.gameManager.gameData.transfers.push(transferRecord);

            // 8. Genera eventi di notifica
            this.generateTransferEvents(transferRecord, response);

            // 9. Imposta scadenza automatica trattativa
            this.setNegotiationDeadline(transferRecord);

            console.log('✅ Transfer offer completed:', transferRecord.id);

            return {
                success: true,
                transferId: transferRecord.id,
                response: response,
                acceptanceProbability: acceptanceProbability,
                marketValue: marketValue,
                negotiationStatus: transferRecord.negotiation_status
            };

        } catch (error) {
            console.error('❌ Transfer_Offer flow error:', error);
            
            // Genera evento di errore
            this.generateErrorEvent(params, error.message);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateOfferParams(params) {
        const required = ['playerId', 'fromTeamId', 'toTeamId', 'transferFee', 'playerSalary', 'contractLength', 'transferType'];
        
        for (const field of required) {
            if (params[field] === undefined || params[field] === null) {
                return { isValid: false, error: `Campo obbligatorio mancante: ${field}` };
            }
        }

        // Verifica esistenza giocatore
        const player = this.gameManager.gameData.players.find(p => p.id === params.playerId);
        if (!player) {
            return { isValid: false, error: 'Giocatore non trovato' };
        }

        // Verifica esistenza squadre
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === params.fromTeamId);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === params.toTeamId);
        
        if (!fromTeam || !toTeam) {
            return { isValid: false, error: 'Una o entrambe le squadre non esistono' };
        }

        // Verifica che il giocatore appartenga alla squadra proprietaria
        if (player.team_id !== params.toTeamId) {
            return { isValid: false, error: 'Il giocatore non appartiene alla squadra specificata' };
        }

        // Verifica valori numerici positivi
        if (params.transferFee < 0 || params.playerSalary <= 0 || params.contractLength <= 0) {
            return { isValid: false, error: 'I valori economici devono essere positivi' };
        }

        // Verifica tipo trasferimento valido
        const validTypes = ['permanent', 'loan', 'free_transfer', 'exchange'];
        if (!validTypes.includes(params.transferType)) {
            return { isValid: false, error: 'Tipo trasferimento non valido' };
        }

        return { isValid: true };
    }

    verifyBudget(teamId, transferFee, signingBonus = 0) {
        const team = this.gameManager.gameData.teams.find(t => t.id === teamId);
        const totalCost = transferFee + signingBonus;
        
        return {
            sufficient: team.budget >= totalCost,
            available: team.budget,
            required: totalCost,
            remaining: team.budget - totalCost
        };
    }

    calculateMarketValue(player) {
        // Calcolo valore di mercato basato su attributi, età, potenziale
        let baseValue = player.overall_rating * 100000; // Base: rating * 100k
        
        // Fattore età (picco a 25-28 anni)
        const ageFactor = player.age <= 20 ? 1.2 : // Giovani promettenti
                         player.age <= 25 ? 1.4 : // Prime
                         player.age <= 28 ? 1.3 : // Picco
                         player.age <= 32 ? 1.0 : // Maturi
                         0.7; // Veterani
        
        // Fattore potenziale
        const potentialFactor = (player.potential - player.overall_rating) * 10000;
        
        // Fattore ruolo (alcuni ruoli valgono di più)
        const roleFactor = player.position === 'GK' ? 0.8 :
                          player.position === 'ATT' ? 1.3 :
                          player.position === 'MID' ? 1.1 : 1.0;
        
        // Fattore forma e morale
        const conditionFactor = (player.fitness + player.morale) / 200;
        
        const marketValue = Math.round(
            (baseValue * ageFactor * roleFactor * conditionFactor) + potentialFactor
        );
        
        return Math.max(marketValue, 50000); // Valore minimo 50k
    }

    calculateAcceptanceProbability(params, marketValue, player) {
        let probability = 50; // Base 50%
        
        // Fattore offerta vs valore di mercato
        const offerRatio = params.transferFee / marketValue;
        if (offerRatio >= 1.5) probability += 40; // Offerta generosa
        else if (offerRatio >= 1.2) probability += 25; // Offerta buona
        else if (offerRatio >= 1.0) probability += 10; // Offerta equa
        else if (offerRatio >= 0.8) probability -= 10; // Offerta bassa
        else probability -= 30; // Offerta molto bassa
        
        // Fattore stipendio proposto vs attuale
        const salaryRatio = params.playerSalary / player.salary;
        if (salaryRatio >= 1.5) probability += 20;
        else if (salaryRatio >= 1.2) probability += 10;
        else if (salaryRatio < 1.0) probability -= 15;
        
        // Fattore morale giocatore
        if (player.morale >= 80) probability -= 10; // Felice, difficile convincere
        else if (player.morale <= 40) probability += 15; // Scontento, vuole andarsene
        
        // Fattore squadra (prestigio simulato tramite posizione in classifica)
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === params.fromTeamId);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === params.toTeamId);
        
        if (fromTeam.league_position && toTeam.league_position) {
            if (fromTeam.league_position < toTeam.league_position) {
                probability += 15; // Squadra migliore
            } else if (fromTeam.league_position > toTeam.league_position) {
                probability -= 10; // Squadra peggiore
            }
        }
        
        // Fattore tipo trasferimento
        if (params.transferType === 'free_transfer') probability += 20;
        else if (params.transferType === 'loan') probability += 10;
        
        return Math.max(0, Math.min(100, probability));
    }

    generateResponse(params, acceptanceProbability, marketValue) {
        const random = Math.random() * 100;
        
        if (random <= acceptanceProbability) {
            return {
                type: 'accepted',
                message: 'Offerta accettata dalla squadra proprietaria',
                finalTerms: {
                    transferFee: params.transferFee,
                    playerSalary: params.playerSalary,
                    contractLength: params.contractLength,
                    signingBonus: params.signingBonus || 0,
                    releaseClause: params.releaseClause || null
                }
            };
        } else if (random <= acceptanceProbability + 30) {
            // Controproposta
            const counterOffer = this.generateCounterOffer(params, marketValue);
            return {
                type: 'counter_offer',
                message: 'Controproposta ricevuta',
                counterTerms: counterOffer
            };
        } else {
            return {
                type: 'rejected',
                message: 'Offerta rifiutata',
                reason: this.generateRejectionReason(params, marketValue)
            };
        }
    }

    generateCounterOffer(params, marketValue) {
        // Genera controproposta più alta del 10-30%
        const increasePercentage = 0.1 + (Math.random() * 0.2); // 10-30%
        
        return {
            transferFee: Math.round(params.transferFee * (1 + increasePercentage)),
            playerSalary: Math.round(params.playerSalary * 1.1), // Stipendio +10%
            contractLength: params.contractLength,
            signingBonus: (params.signingBonus || 0) + 50000, // Bonus +50k
            additionalClauses: [
                'Bonus prestazioni: €100,000',
                'Percentuale su futura rivendita: 10%'
            ]
        };
    }

    generateRejectionReason(params, marketValue) {
        const reasons = [
            'Offerta economica insufficiente',
            'Giocatore non interessato al trasferimento',
            'Squadra non intende vendere in questo momento',
            'Richiesta clausole contrattuali aggiuntive',
            'Periodo di trasferimento non idoneo'
        ];
        
        if (params.transferFee < marketValue * 0.8) {
            return 'Offerta economica troppo bassa rispetto al valore del giocatore';
        }
        
        return reasons[Math.floor(Math.random() * reasons.length)];
    }

    createTransferRecord(params, response, marketValue) {
        const transferId = `transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
            id: transferId,
            player_id: params.playerId,
            from_team_id: params.fromTeamId,
            to_team_id: params.toTeamId,
            transfer_type: params.transferType,
            transfer_fee: params.transferFee,
            player_salary: params.playerSalary,
            contract_length: params.contractLength,
            signing_bonus: params.signingBonus || 0,
            release_clause: params.releaseClause || null,
            agent_fee: Math.round(params.transferFee * 0.05), // 5% commissione agente
            loan_duration: params.transferType === 'loan' ? (params.loanDuration || 12) : null,
            loan_fee: params.transferType === 'loan' ? (params.loanFee || 0) : null,
            buy_option: params.transferType === 'loan' ? params.buyOption : null,
            negotiation_status: response.type === 'accepted' ? 'agreed' : 
                               response.type === 'counter_offer' ? 'negotiating' : 'failed',
            offer_history: [{
                date: new Date().toISOString(),
                type: 'initial_offer',
                terms: {
                    transferFee: params.transferFee,
                    playerSalary: params.playerSalary,
                    contractLength: params.contractLength
                },
                response: response
            }],
            player_agreement: response.type === 'accepted',
            medical_passed: false,
            announcement_date: null,
            transfer_window: this.getCurrentTransferWindow(),
            is_user_involved: this.isUserInvolved(params.fromTeamId, params.toTeamId),
            market_value_at_offer: marketValue,
            created_at: new Date().toISOString(),
            completed_at: null,
            updated_at: new Date().toISOString()
        };
    }

    generateTransferEvents(transferRecord, response) {
        const player = this.gameManager.gameData.players.find(p => p.id === transferRecord.player_id);
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.to_team_id);
        
        const playerName = `${player.first_name} ${player.last_name}`;
        
        let eventTitle, eventDescription, eventCategory;
        
        switch (response.type) {
            case 'accepted':
                eventTitle = `Trasferimento Accordato: ${playerName}`;
                eventDescription = `${fromTeam.name} ha raggiunto un accordo con ${toTeam.name} per il trasferimento di ${playerName} per €${transferRecord.transfer_fee.toLocaleString()}`;
                eventCategory = 'success';
                break;
            case 'counter_offer':
                eventTitle = `Controproposta: ${playerName}`;
                eventDescription = `${toTeam.name} ha fatto una controproposta per ${playerName}. Nuova richiesta: €${response.counterTerms.transferFee.toLocaleString()}`;
                eventCategory = 'warning';
                break;
            case 'rejected':
                eventTitle = `Offerta Rifiutata: ${playerName}`;
                eventDescription = `${toTeam.name} ha rifiutato l'offerta di ${fromTeam.name} per ${playerName}. Motivo: ${response.reason}`;
                eventCategory = 'error';
                break;
        }
        
        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'transfer',
            event_category: eventCategory,
            title: eventTitle,
            description: eventDescription,
            related_entity_type: 'transfer',
            related_entity_id: transferRecord.id,
            team_id: transferRecord.is_user_involved ? (fromTeam.is_user_team ? fromTeam.id : toTeam.id) : null,
            player_id: transferRecord.player_id,
            match_id: null,
            priority: transferRecord.is_user_involved ? 4 : 2,
            is_read: false,
            is_user_relevant: transferRecord.is_user_involved,
            auto_generated: true,
            expires_at: null,
            action_required: response.type === 'counter_offer' && transferRecord.is_user_involved,
            action_type: response.type === 'counter_offer' ? 'respond_to_counter_offer' : null,
            action_data: response.type === 'counter_offer' ? JSON.stringify(response.counterTerms) : null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };
        
        this.gameManager.gameData.gameEvents.push(gameEvent);
    }

    generateErrorEvent(params, errorMessage) {
        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'transfer',
            event_category: 'error',
            title: 'Errore Trasferimento',
            description: `Errore durante la trattativa: ${errorMessage}`,
            related_entity_type: 'player',
            related_entity_id: params.playerId,
            team_id: params.fromTeamId,
            player_id: params.playerId,
            match_id: null,
            priority: 3,
            is_read: false,
            is_user_relevant: this.isUserInvolved(params.fromTeamId, params.toTeamId),
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };
        
        this.gameManager.gameData.gameEvents.push(gameEvent);
    }

    setNegotiationDeadline(transferRecord) {
        // Imposta scadenza automatica a 7 giorni
        const deadline = new Date(this.gameManager.getCurrentDate());
        deadline.setDate(deadline.getDate() + 7);
        
        transferRecord.negotiation_deadline = deadline.toISOString();
    }

    getCurrentTransferWindow() {
        const currentDate = new Date(this.gameManager.getCurrentDate());
        const month = currentDate.getMonth() + 1; // 0-based to 1-based
        
        if (month >= 6 && month <= 8) return 'summer';
        if (month >= 1 && month <= 2) return 'winter';
        return 'emergency';
    }

    isUserInvolved(fromTeamId, toTeamId) {
        const userTeam = this.gameManager.gameData.teams.find(t => t.is_user_team);
        return userTeam && (userTeam.id === fromTeamId || userTeam.id === toTeamId);
    }
}