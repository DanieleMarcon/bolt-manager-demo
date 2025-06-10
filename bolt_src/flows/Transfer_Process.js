/**
 * FLOW: Transfer_Process
 * 
 * Gestisce il completamento o fallimento di una trattativa di trasferimento.
 * Trasferisce il giocatore, aggiorna budget, contratti e morale.
 * 
 * Trigger: Accettazione offerta o scadenza trattativa
 * Input: ID trattativa, decisione finale, eventuali modifiche contrattuali
 * Output: Trasferimento completato o fallito
 * 
 * Dataset coinvolti:
 * - transfers (scrittura - stato finale)
 * - players (scrittura - nuova squadra e contratto)
 * - teams (scrittura - budget aggiornato)
 * - morale_status (scrittura - impatto trasferimento)
 * - game_events (scrittura - annuncio trasferimento)
 */

export class TransferProcessFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di completamento trasferimento
     * @param {Object} params - Parametri del completamento
     * @param {string} params.transferId - ID della trattativa
     * @param {string} params.decision - Decisione finale (accept, reject, expire)
     * @param {Object} params.finalTerms - Termini finali (se modificati)
     * @param {boolean} params.medicalPassed - Esito visite mediche
     * @returns {Object} Risultato del processo
     */
    async execute(params) {
        try {
            console.log('🔄 Executing Transfer_Process flow...', params);

            // 1. Validazione parametri
            const validation = this.validateProcessParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Recupera record trattativa
            const transferRecord = this.gameManager.gameData.transfers.find(t => t.id === params.transferId);
            if (!transferRecord) {
                throw new Error('Trattativa non trovata');
            }

            // 3. Verifica stato trattativa
            if (transferRecord.negotiation_status === 'completed' || transferRecord.negotiation_status === 'failed') {
                throw new Error('Trattativa già conclusa');
            }

            let result;

            // 4. Processa in base alla decisione
            switch (params.decision) {
                case 'accept':
                    result = await this.processAcceptedTransfer(transferRecord, params);
                    break;
                case 'reject':
                    result = await this.processRejectedTransfer(transferRecord, params);
                    break;
                case 'expire':
                    result = await this.processExpiredTransfer(transferRecord);
                    break;
                default:
                    throw new Error('Decisione non valida');
            }

            // 5. Aggiorna record trattativa
            this.updateTransferRecord(transferRecord, params, result);

            // 6. Genera eventi finali
            this.generateCompletionEvents(transferRecord, result);

            console.log('✅ Transfer process completed:', result.status);

            return {
                success: true,
                transferId: transferRecord.id,
                status: result.status,
                details: result
            };

        } catch (error) {
            console.error('❌ Transfer_Process flow error:', error);
            
            // Genera evento di errore
            this.generateErrorEvent(params, error.message);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateProcessParams(params) {
        if (!params.transferId) {
            return { isValid: false, error: 'ID trattativa mancante' };
        }

        const validDecisions = ['accept', 'reject', 'expire'];
        if (!validDecisions.includes(params.decision)) {
            return { isValid: false, error: 'Decisione non valida' };
        }

        return { isValid: true };
    }

    async processAcceptedTransfer(transferRecord, params) {
        console.log('✅ Processing accepted transfer...');

        // 1. Verifica visite mediche (se richieste)
        if (params.medicalPassed === false) {
            return {
                status: 'failed',
                reason: 'Visite mediche non superate',
                refundRequired: true
            };
        }

        // 2. Verifica budget finale
        const finalTerms = params.finalTerms || this.extractTermsFromRecord(transferRecord);
        const budgetCheck = this.verifyFinalBudget(transferRecord.from_team_id, finalTerms);
        
        if (!budgetCheck.sufficient) {
            return {
                status: 'failed',
                reason: 'Budget insufficiente per completare il trasferimento',
                budgetShortfall: budgetCheck.shortfall
            };
        }

        // 3. Trasferisci giocatore tra squadre
        const transferResult = this.executePlayerTransfer(transferRecord, finalTerms);

        // 4. Aggiorna budget squadre
        this.updateTeamBudgets(transferRecord, finalTerms);

        // 5. Aggiorna contratto giocatore
        this.updatePlayerContract(transferRecord, finalTerms);

        // 6. Aggiorna morale giocatore e squadre
        this.updateMoraleAfterTransfer(transferRecord, 'completed');

        return {
            status: 'completed',
            playerTransferred: true,
            finalTerms: finalTerms,
            transferDetails: transferResult
        };
    }

    async processRejectedTransfer(transferRecord, params) {
        console.log('❌ Processing rejected transfer...');

        // 1. Aggiorna morale (delusione per squadra acquirente)
        this.updateMoraleAfterTransfer(transferRecord, 'rejected');

        // 2. Libera eventuali fondi bloccati
        this.releaseBudgetHold(transferRecord);

        return {
            status: 'failed',
            reason: params.rejectionReason || 'Trattativa rifiutata',
            playerTransferred: false
        };
    }

    async processExpiredTransfer(transferRecord) {
        console.log('⏰ Processing expired transfer...');

        // 1. Aggiorna morale (frustrazione per mancata conclusione)
        this.updateMoraleAfterTransfer(transferRecord, 'expired');

        // 2. Libera fondi bloccati
        this.releaseBudgetHold(transferRecord);

        return {
            status: 'failed',
            reason: 'Trattativa scaduta per timeout',
            playerTransferred: false
        };
    }

    extractTermsFromRecord(transferRecord) {
        return {
            transferFee: transferRecord.transfer_fee,
            playerSalary: transferRecord.player_salary,
            contractLength: transferRecord.contract_length,
            signingBonus: transferRecord.signing_bonus,
            releaseClause: transferRecord.release_clause,
            agentFee: transferRecord.agent_fee
        };
    }

    verifyFinalBudget(teamId, finalTerms) {
        const team = this.gameManager.gameData.teams.find(t => t.id === teamId);
        const totalCost = finalTerms.transferFee + finalTerms.signingBonus + finalTerms.agentFee;
        
        return {
            sufficient: team.budget >= totalCost,
            available: team.budget,
            required: totalCost,
            shortfall: Math.max(0, totalCost - team.budget)
        };
    }

    executePlayerTransfer(transferRecord, finalTerms) {
        const player = this.gameManager.gameData.players.find(p => p.id === transferRecord.player_id);
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.to_team_id);

        // Cambia squadra del giocatore
        const previousTeamId = player.team_id;
        player.team_id = transferRecord.from_team_id;

        // Reset statistiche stagionali (nuovo inizio)
        player.matches_played = 0;
        player.goals_scored = 0;
        player.assists = 0;
        player.yellow_cards = 0;
        player.red_cards = 0;

        // Aggiorna timestamp
        player.updated_at = new Date().toISOString();

        return {
            playerId: player.id,
            playerName: `${player.first_name} ${player.last_name}`,
            fromTeam: fromTeam.name,
            toTeam: toTeam.name,
            previousTeamId: previousTeamId,
            newTeamId: player.team_id,
            transferDate: new Date().toISOString()
        };
    }

    updateTeamBudgets(transferRecord, finalTerms) {
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.to_team_id);

        // Squadra acquirente: sottrae costi
        const totalCost = finalTerms.transferFee + finalTerms.signingBonus + finalTerms.agentFee;
        fromTeam.budget -= totalCost;

        // Squadra venditrice: aggiunge ricavo (meno commissioni)
        const netRevenue = finalTerms.transferFee * 0.95; // 5% commissioni varie
        toTeam.budget += netRevenue;

        // Aggiorna timestamp
        fromTeam.updated_at = new Date().toISOString();
        toTeam.updated_at = new Date().toISOString();

        console.log(`💰 Budget updated - ${fromTeam.name}: -€${totalCost}, ${toTeam.name}: +€${netRevenue}`);
    }

    updatePlayerContract(transferRecord, finalTerms) {
        const player = this.gameManager.gameData.players.find(p => p.id === transferRecord.player_id);

        // Aggiorna dettagli contrattuali
        player.salary = finalTerms.playerSalary;
        
        // Calcola nuova scadenza contratto
        const contractExpiry = new Date(this.gameManager.getCurrentDate());
        contractExpiry.setFullYear(contractExpiry.getFullYear() + finalTerms.contractLength);
        player.contract_expires = contractExpiry.toISOString();

        // Aggiorna valore di mercato (può aumentare con il trasferimento)
        const marketValueIncrease = finalTerms.transferFee * 0.1; // 10% del costo
        player.market_value = Math.round(player.market_value + marketValueIncrease);

        player.updated_at = new Date().toISOString();

        console.log(`📝 Contract updated for ${player.first_name} ${player.last_name}: €${finalTerms.playerSalary}/week until ${contractExpiry.toDateString()}`);
    }

    updateMoraleAfterTransfer(transferRecord, outcome) {
        const player = this.gameManager.gameData.players.find(p => p.id === transferRecord.player_id);
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.to_team_id);

        let playerMoraleChange = 0;
        let fromTeamMoraleChange = 0;
        let toTeamMoraleChange = 0;

        switch (outcome) {
            case 'completed':
                // Giocatore: felice per il trasferimento
                playerMoraleChange = +15;
                // Squadra acquirente: soddisfatta per l'acquisto
                fromTeamMoraleChange = +5;
                // Squadra venditrice: neutrale o leggermente negativa
                toTeamMoraleChange = -2;
                break;
            case 'rejected':
                // Giocatore: deluso per il trasferimento mancato
                playerMoraleChange = -10;
                // Squadra acquirente: frustrata
                fromTeamMoraleChange = -3;
                // Squadra venditrice: neutrale
                toTeamMoraleChange = 0;
                break;
            case 'expired':
                // Tutti leggermente frustrati
                playerMoraleChange = -5;
                fromTeamMoraleChange = -2;
                toTeamMoraleChange = -1;
                break;
        }

        // Applica cambiamenti morale
        player.morale = Math.max(0, Math.min(100, player.morale + playerMoraleChange));
        fromTeam.team_morale = Math.max(0, Math.min(100, fromTeam.team_morale + fromTeamMoraleChange));
        toTeam.team_morale = Math.max(0, Math.min(100, toTeam.team_morale + toTeamMoraleChange));

        // Aggiorna o crea record morale_status
        this.updateMoraleStatus(player.id, 'player', playerMoraleChange, 'transfer');
        this.updateMoraleStatus(fromTeam.id, 'team', fromTeamMoraleChange, 'transfer');
        this.updateMoraleStatus(toTeam.id, 'team', toTeamMoraleChange, 'transfer');
    }

    updateMoraleStatus(entityId, entityType, moraleChange, reason) {
        let moraleRecord = this.gameManager.gameData.moraleStatus.find(
            m => m.entity_id === entityId && m.entity_type === entityType
        );

        if (!moraleRecord) {
            // Crea nuovo record morale
            moraleRecord = {
                id: `morale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                entity_type: entityType,
                entity_id: entityId,
                current_morale: entityType === 'player' ? 
                    this.gameManager.gameData.players.find(p => p.id === entityId)?.morale || 50 :
                    this.gameManager.gameData.teams.find(t => t.id === entityId)?.team_morale || 50,
                base_morale: 50,
                recent_results_impact: 0,
                training_impact: 0,
                transfer_impact: moraleChange,
                injury_impact: 0,
                team_chemistry_impact: 0,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: moraleChange > 0 ? 'rising' : moraleChange < 0 ? 'declining' : 'stable',
                last_significant_event: reason,
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 giorni
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            this.gameManager.gameData.moraleStatus.push(moraleRecord);
        } else {
            // Aggiorna record esistente
            moraleRecord.transfer_impact += moraleChange;
            moraleRecord.current_morale = Math.max(0, Math.min(100, moraleRecord.current_morale + moraleChange));
            moraleRecord.morale_trend = moraleChange > 0 ? 'rising' : moraleChange < 0 ? 'declining' : 'stable';
            moraleRecord.last_significant_event = reason;
            moraleRecord.event_date = new Date().toISOString();
            moraleRecord.updated_at = new Date().toISOString();
        }
    }

    releaseBudgetHold(transferRecord) {
        // In un sistema più complesso, qui si libererebbero i fondi "bloccati"
        // Per ora è solo un placeholder per future implementazioni
        console.log(`💰 Released budget hold for transfer ${transferRecord.id}`);
    }

    updateTransferRecord(transferRecord, params, result) {
        transferRecord.negotiation_status = result.status === 'completed' ? 'completed' : 'failed';
        transferRecord.player_agreement = result.status === 'completed';
        transferRecord.medical_passed = params.medicalPassed !== false;
        transferRecord.completed_at = new Date().toISOString();
        transferRecord.updated_at = new Date().toISOString();

        if (result.status === 'completed') {
            transferRecord.announcement_date = new Date().toISOString();
        }

        // Aggiungi entry alla cronologia offerte
        transferRecord.offer_history.push({
            date: new Date().toISOString(),
            type: 'final_decision',
            decision: params.decision,
            result: result
        });
    }

    generateCompletionEvents(transferRecord, result) {
        const player = this.gameManager.gameData.players.find(p => p.id === transferRecord.player_id);
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transferRecord.to_team_id);
        
        const playerName = `${player.first_name} ${player.last_name}`;
        
        let eventTitle, eventDescription, eventCategory;
        
        if (result.status === 'completed') {
            eventTitle = `Trasferimento Ufficiale: ${playerName}`;
            eventDescription = `${playerName} si trasferisce ufficialmente da ${toTeam.name} a ${fromTeam.name} per €${transferRecord.transfer_fee.toLocaleString()}. Contratto fino al ${new Date(player.contract_expires).toLocaleDateString()}.`;
            eventCategory = 'success';
        } else {
            eventTitle = `Trasferimento Fallito: ${playerName}`;
            eventDescription = `Il trasferimento di ${playerName} da ${toTeam.name} a ${fromTeam.name} è fallito. Motivo: ${result.reason}`;
            eventCategory = 'error';
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
            priority: transferRecord.is_user_involved ? 5 : 3,
            is_read: false,
            is_user_relevant: transferRecord.is_user_involved,
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

    generateErrorEvent(params, errorMessage) {
        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'transfer',
            event_category: 'error',
            title: 'Errore Completamento Trasferimento',
            description: `Errore durante il completamento della trattativa: ${errorMessage}`,
            related_entity_type: 'transfer',
            related_entity_id: params.transferId,
            team_id: null,
            player_id: null,
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
        
        this.gameManager.gameData.gameEvents.push(gameEvent);
    }
}