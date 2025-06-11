/**
 * FLOW: Tactics_Update
 * 
 * Gestisce l'aggiornamento e salvataggio delle impostazioni tattiche di una squadra.
 * Valida formazioni, posizioni giocatori e calcola efficacia tattica.
 * 
 * Trigger: Salvataggio nuova tattica dall'interfaccia
 * Input: ID squadra, formazione selezionata, posizioni giocatori, impostazioni tattiche
 * Output: Tattica salvata e validata
 * 
 * Dataset coinvolti:
 * - tactics (scrittura - nuova configurazione)
 * - players (lettura - attributi per validazione)
 * - teams (lettura/scrittura - tattica default)
 */

export class TacticsUpdateFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di aggiornamento tattico
     * @param {Object} params - Parametri della tattica
     * @param {string} params.teamId - ID squadra
     * @param {string} params.tacticName - Nome personalizzato tattica
     * @param {string} params.formation - Modulo (es. 4-4-2, 3-5-2)
     * @param {string} params.mentality - Mentalità (defensive, balanced, attacking)
     * @param {Object} params.tacticalSettings - Impostazioni tattiche dettagliate
     * @param {Array} params.playerPositions - Posizioni giocatori sul campo
     * @param {Array} params.playerRoles - Ruoli tattici assegnati
     * @param {Object} params.setPieces - Impostazioni calci piazzati
     * @param {boolean} params.setAsDefault - Se impostare come tattica principale
     * @returns {Object} Risultato dell'aggiornamento
     */
    async execute(params) {
        try {
            console.log('⚽ Executing Tactics_Update flow...', params);

            // 1. Validazione parametri
            const validation = this.validateTacticsParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Verifica esistenza squadra
            const team = this.gameManager.gameData.teams.find(t => t.id === params.teamId);
            if (!team) {
                throw new Error('Squadra non trovata');
            }

            // 3. Carica giocatori squadra per validazione
            const teamPlayers = this.gameManager.gameData.players.filter(p => p.team_id === params.teamId);

            // 4. Valida formazione e posizioni
            const formationValidation = this.validateFormation(params.formation, params.playerPositions, teamPlayers);
            if (!formationValidation.isValid) {
                throw new Error(formationValidation.error);
            }

            // 5. Valida compatibilità ruoli giocatori
            const roleValidation = this.validatePlayerRoles(params.playerRoles, teamPlayers);
            if (!roleValidation.isValid) {
                console.warn('⚠️ Role compatibility issues:', roleValidation.warnings);
            }

            // 6. Calcola efficacia tattica
            const tacticalEffectiveness = this.calculateTacticalEffectiveness(params, teamPlayers);

            // 7. Crea o aggiorna record tattico
            const tacticRecord = this.createTacticRecord(params, tacticalEffectiveness);

            // 8. Salva nel dataset
            this.saveTacticRecord(tacticRecord);

            // 9. Aggiorna tattica default squadra se richiesto
            if (params.setAsDefault) {
                this.setAsDefaultTactic(params.teamId, tacticRecord.id);
            }

            // 10. Genera suggerimenti automatici
            const suggestions = this.generateTacticalSuggestions(params, teamPlayers, tacticalEffectiveness);

            console.log('✅ Tactics updated successfully:', tacticRecord.id);

            return {
                success: true,
                tacticId: tacticRecord.id,
                effectiveness: tacticalEffectiveness,
                suggestions: suggestions,
                roleCompatibility: roleValidation,
                isDefault: params.setAsDefault
            };

        } catch (error) {
            console.error('❌ Tactics_Update flow error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateTacticsParams(params) {
        if (!params.teamId) {
            return { isValid: false, error: 'ID squadra mancante' };
        }

        if (!params.formation) {
            return { isValid: false, error: 'Formazione mancante' };
        }

        // Verifica formazioni supportate
        const validFormations = ['4-4-2', '4-3-3', '3-5-2', '4-2-3-1', '5-3-2', '3-4-3', '4-5-1'];
        if (!validFormations.includes(params.formation)) {
            return { isValid: false, error: 'Formazione non supportata' };
        }

        if (!params.playerPositions || !Array.isArray(params.playerPositions)) {
            return { isValid: false, error: 'Posizioni giocatori mancanti o non valide' };
        }

        if (params.playerPositions.length !== 11) {
            return { isValid: false, error: 'Devono essere specificate esattamente 11 posizioni' };
        }

        // Verifica mentalità
        const validMentalities = ['defensive', 'balanced', 'attacking'];
        if (params.mentality && !validMentalities.includes(params.mentality)) {
            return { isValid: false, error: 'Mentalità non valida' };
        }

        return { isValid: true };
    }

    validateFormation(formation, playerPositions, teamPlayers) {
        // Mappa formazioni -> struttura attesa
        const formationStructures = {
            '4-4-2': { GK: 1, DEF: 4, MID: 4, ATT: 2 },
            '4-3-3': { GK: 1, DEF: 4, MID: 3, ATT: 3 },
            '3-5-2': { GK: 1, DEF: 3, MID: 5, ATT: 2 },
            '4-2-3-1': { GK: 1, DEF: 4, MID: 5, ATT: 1 },
            '5-3-2': { GK: 1, DEF: 5, MID: 3, ATT: 2 },
            '3-4-3': { GK: 1, DEF: 3, MID: 4, ATT: 3 },
            '4-5-1': { GK: 1, DEF: 4, MID: 5, ATT: 1 }
        };

        const expectedStructure = formationStructures[formation];
        if (!expectedStructure) {
            return { isValid: false, error: 'Struttura formazione non definita' };
        }

        // Conta posizioni per ruolo
        const positionCounts = { GK: 0, DEF: 0, MID: 0, ATT: 0 };
        
        playerPositions.forEach(position => {
            if (!position.playerId) return;
            
            const player = teamPlayers.find(p => p.id === position.playerId);
            if (player) {
                positionCounts[player.position]++;
            }
        });

        // Verifica corrispondenza struttura
        for (const [role, expectedCount] of Object.entries(expectedStructure)) {
            if (positionCounts[role] !== expectedCount) {
                return { 
                    isValid: false, 
                    error: `Formazione ${formation} richiede ${expectedCount} ${role}, trovati ${positionCounts[role]}` 
                };
            }
        }

        return { isValid: true };
    }

    validatePlayerRoles(playerRoles, teamPlayers) {
        const warnings = [];
        let compatibilityScore = 100;

        playerRoles.forEach((roleAssignment, index) => {
            if (!roleAssignment.playerId) return;

            const player = teamPlayers.find(p => p.id === roleAssignment.playerId);
            if (!player) return;

            const assignedRole = roleAssignment.role;
            const playerPosition = player.position;

            // Verifica compatibilità ruolo-posizione
            const compatibility = this.checkRoleCompatibility(playerPosition, assignedRole);
            
            if (compatibility.score < 70) {
                warnings.push({
                    playerId: player.id,
                    playerName: `${player.first_name} ${player.last_name}`,
                    issue: compatibility.issue,
                    suggestion: compatibility.suggestion
                });
                compatibilityScore -= (100 - compatibility.score) * 0.1;
            }
        });

        return {
            isValid: warnings.length < 3, // Max 2 incompatibilità accettabili
            warnings: warnings,
            compatibilityScore: Math.max(0, compatibilityScore)
        };
    }

    checkRoleCompatibility(playerPosition, assignedRole) {
        // Matrice compatibilità posizione-ruolo
        const compatibilityMatrix = {
            'GK': {
                'goalkeeper': { score: 100, issue: null },
                'sweeper_keeper': { score: 90, issue: null },
                'default': { score: 0, issue: 'Portiere non può giocare in altri ruoli' }
            },
            'DEF': {
                'centre_back': { score: 100, issue: null },
                'full_back': { score: 95, issue: null },
                'wing_back': { score: 85, issue: null },
                'defensive_midfielder': { score: 75, issue: 'Difensore adattato a centrocampo' },
                'default': { score: 50, issue: 'Ruolo non ottimale per difensore' }
            },
            'MID': {
                'defensive_midfielder': { score: 100, issue: null },
                'central_midfielder': { score: 100, issue: null },
                'attacking_midfielder': { score: 95, issue: null },
                'winger': { score: 80, issue: null },
                'centre_back': { score: 70, issue: 'Centrocampista adattato in difesa' },
                'striker': { score: 65, issue: 'Centrocampista adattato in attacco' },
                'default': { score: 60, issue: 'Ruolo non standard per centrocampista' }
            },
            'ATT': {
                'striker': { score: 100, issue: null },
                'winger': { score: 95, issue: null },
                'attacking_midfielder': { score: 85, issue: null },
                'false_nine': { score: 90, issue: null },
                'default': { score: 50, issue: 'Ruolo non ottimale per attaccante' }
            }
        };

        const positionRoles = compatibilityMatrix[playerPosition];
        if (!positionRoles) {
            return { score: 50, issue: 'Posizione non riconosciuta', suggestion: 'Verifica posizione giocatore' };
        }

        const roleCompatibility = positionRoles[assignedRole] || positionRoles['default'];
        
        return {
            score: roleCompatibility.score,
            issue: roleCompatibility.issue,
            suggestion: roleCompatibility.score < 70 ? 'Considera un ruolo più adatto' : null
        };
    }

    calculateTacticalEffectiveness(params, teamPlayers) {
        let effectiveness = {
            overall: 70, // Base
            attack: 70,
            midfield: 70,
            defense: 70,
            chemistry: 70
        };

        // Calcola rating medio per reparto
        const departmentRatings = this.calculateDepartmentRatings(params.playerPositions, teamPlayers);
        
        effectiveness.attack = departmentRatings.attack;
        effectiveness.midfield = departmentRatings.midfield;
        effectiveness.defense = departmentRatings.defense;

        // Fattore formazione
        const formationBonus = this.getFormationBonus(params.formation, params.mentality);
        effectiveness.overall += formationBonus;

        // Fattore impostazioni tattiche
        const tacticalBonus = this.calculateTacticalBonus(params.tacticalSettings, departmentRatings);
        effectiveness.overall += tacticalBonus;

        // Fattore chimica squadra
        effectiveness.chemistry = this.calculateTeamChemistry(params.playerPositions, teamPlayers);

        // Calcola overall finale
        effectiveness.overall = Math.round(
            (effectiveness.attack + effectiveness.midfield + effectiveness.defense + effectiveness.chemistry) / 4
        );

        // Limita valori 0-100
        Object.keys(effectiveness).forEach(key => {
            effectiveness[key] = Math.max(0, Math.min(100, effectiveness[key]));
        });

        return effectiveness;
    }

    calculateDepartmentRatings(playerPositions, teamPlayers) {
        const departments = { attack: [], midfield: [], defense: [], goalkeeper: [] };

        playerPositions.forEach(position => {
            if (!position.playerId) return;
            
            const player = teamPlayers.find(p => p.id === position.playerId);
            if (!player) return;

            switch (player.position) {
                case 'GK':
                    departments.goalkeeper.push(player.overall_rating);
                    break;
                case 'DEF':
                    departments.defense.push(player.overall_rating);
                    break;
                case 'MID':
                    departments.midfield.push(player.overall_rating);
                    break;
                case 'ATT':
                    departments.attack.push(player.overall_rating);
                    break;
            }
        });

        return {
            attack: departments.attack.length > 0 ? 
                departments.attack.reduce((sum, r) => sum + r, 0) / departments.attack.length : 50,
            midfield: departments.midfield.length > 0 ? 
                departments.midfield.reduce((sum, r) => sum + r, 0) / departments.midfield.length : 50,
            defense: departments.defense.length > 0 ? 
                departments.defense.reduce((sum, r) => sum + r, 0) / departments.defense.length : 50,
            goalkeeper: departments.goalkeeper.length > 0 ? departments.goalkeeper[0] : 50
        };
    }

    getFormationBonus(formation, mentality) {
        // Bonus/malus per combinazioni formazione-mentalità
        const formationMentality = {
            '4-4-2': { defensive: 5, balanced: 10, attacking: 0 },
            '4-3-3': { defensive: -5, balanced: 5, attacking: 10 },
            '3-5-2': { defensive: 0, balanced: 10, attacking: 5 },
            '4-2-3-1': { defensive: 5, balanced: 10, attacking: 5 },
            '5-3-2': { defensive: 10, balanced: 0, attacking: -5 },
            '3-4-3': { defensive: -10, balanced: 0, attacking: 15 },
            '4-5-1': { defensive: 15, balanced: 5, attacking: -10 }
        };

        return formationMentality[formation]?.[mentality] || 0;
    }

    calculateTacticalBonus(tacticalSettings, departmentRatings) {
        if (!tacticalSettings) return 0;

        let bonus = 0;

        // Bonus pressing basato su fitness media
        if (tacticalSettings.pressing === 'high' && departmentRatings.midfield > 75) {
            bonus += 5;
        } else if (tacticalSettings.pressing === 'high' && departmentRatings.midfield < 60) {
            bonus -= 5;
        }

        // Bonus ritmo basato su pace media
        if (tacticalSettings.tempo === 'fast' && departmentRatings.attack > 75) {
            bonus += 3;
        }

        // Bonus ampiezza
        if (tacticalSettings.width === 'wide') {
            bonus += 2;
        }

        return bonus;
    }

    calculateTeamChemistry(playerPositions, teamPlayers) {
        let chemistry = 70; // Base

        // Calcola chimica basata su giocatori adiacenti
        playerPositions.forEach((position, index) => {
            if (!position.playerId) return;

            const player = teamPlayers.find(p => p.id === position.playerId);
            if (!player) return;

            // Trova giocatori adiacenti (semplificato)
            const adjacentPositions = this.getAdjacentPositions(index, playerPositions);
            
            adjacentPositions.forEach(adjPos => {
                const adjPlayer = teamPlayers.find(p => p.id === adjPos.playerId);
                if (adjPlayer) {
                    // Bonus chimica per giocatori con rating simili
                    const ratingDiff = Math.abs(player.overall_rating - adjPlayer.overall_rating);
                    if (ratingDiff < 10) chemistry += 1;
                    else if (ratingDiff > 20) chemistry -= 1;
                }
            });
        });

        return chemistry;
    }

    getAdjacentPositions(index, positions) {
        // Semplificata: considera posizioni vicine nell'array
        const adjacent = [];
        if (index > 0) adjacent.push(positions[index - 1]);
        if (index < positions.length - 1) adjacent.push(positions[index + 1]);
        return adjacent.filter(pos => pos && pos.playerId);
    }

    createTacticRecord(params, effectiveness) {
        const tacticId = params.tacticId || `tactic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        return {
            id: tacticId,
            team_id: params.teamId,
            tactic_name: params.tacticName || 'Tattica Personalizzata',
            formation: params.formation,
            mentality: params.mentality || 'balanced',
            tempo: params.tacticalSettings?.tempo || 'normal',
            width: params.tacticalSettings?.width || 'normal',
            pressing: params.tacticalSettings?.pressing || 'medium',
            defensive_line: params.tacticalSettings?.defensiveLine || 'normal',
            passing_style: params.tacticalSettings?.passingStyle || 'mixed',
            crossing: params.tacticalSettings?.crossing || 'normal',
            player_positions: params.playerPositions,
            player_roles: params.playerRoles || [],
            set_pieces: params.setPieces || [],
            captain_id: params.setPieces?.captain || null,
            penalty_taker_id: params.setPieces?.penaltyTaker || null,
            free_kick_taker_id: params.setPieces?.freeKickTaker || null,
            corner_taker_id: params.setPieces?.cornerTaker || null,
            is_default: params.setAsDefault || false,
            effectiveness_rating: effectiveness.overall,
            matches_used: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    saveTacticRecord(tacticRecord) {
        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData.tactics) {
            this.gameManager.gameData.tactics = [];
        }

        // Verifica se è un aggiornamento o nuovo record
        const existingIndex = this.gameManager.gameData.tactics.findIndex(t => t.id === tacticRecord.id);
        
        if (existingIndex >= 0) {
            // Mantieni matches_used dal record esistente
            tacticRecord.matches_used = this.gameManager.gameData.tactics[existingIndex].matches_used;
            tacticRecord.created_at = this.gameManager.gameData.tactics[existingIndex].created_at;
            
            // Aggiorna record esistente
            this.gameManager.gameData.tactics[existingIndex] = tacticRecord;
        } else {
            // Aggiungi nuovo record
            this.gameManager.gameData.tactics.push(tacticRecord);
        }

        this.gameManager.saveGameData();
        console.log(`💾 Tactic saved: ${tacticRecord.tactic_name}`);
    }

    setAsDefaultTactic(teamId, tacticId) {
        // Rimuovi flag default da altre tattiche della squadra
        this.gameManager.gameData.tactics.forEach(tactic => {
            if (tactic.team_id === teamId && tactic.id !== tacticId) {
                tactic.is_default = false;
            }
        });

        // Aggiorna formazione default squadra
        const team = this.gameManager.gameData.teams.find(t => t.id === teamId);
        if (team) {
            const tactic = this.gameManager.gameData.tactics.find(t => t.id === tacticId);
            if (tactic) {
                team.formation = tactic.formation;
                team.updated_at = new Date().toISOString();
            }
        }
    }

    generateTacticalSuggestions(params, teamPlayers, effectiveness) {
        const suggestions = [];

        // Suggerimenti basati su efficacia
        if (effectiveness.attack < 60) {
            suggestions.push({
                type: 'attack',
                priority: 'high',
                message: 'Considera una formazione più offensiva o giocatori con maggiori capacità offensive'
            });
        }

        if (effectiveness.defense < 60) {
            suggestions.push({
                type: 'defense',
                priority: 'high',
                message: 'La difesa sembra vulnerabile, considera rinforzi o una formazione più difensiva'
            });
        }

        if (effectiveness.chemistry < 65) {
            suggestions.push({
                type: 'chemistry',
                priority: 'medium',
                message: 'La chimica di squadra può essere migliorata con giocatori di livello simile'
            });
        }

        // Suggerimenti specifici per formazione
        const formationSuggestions = this.getFormationSpecificSuggestions(params.formation, teamPlayers);
        suggestions.push(...formationSuggestions);

        return suggestions;
    }

    getFormationSpecificSuggestions(formation, teamPlayers) {
        const suggestions = [];

        // Analizza composizione squadra
        const positionCounts = { GK: 0, DEF: 0, MID: 0, ATT: 0 };
        teamPlayers.forEach(player => {
            positionCounts[player.position]++;
        });

        switch (formation) {
            case '4-3-3':
                if (positionCounts.ATT < 3) {
                    suggestions.push({
                        type: 'formation',
                        priority: 'medium',
                        message: 'Il 4-3-3 richiede almeno 3 attaccanti di qualità'
                    });
                }
                break;
            case '3-5-2':
                if (positionCounts.MID < 5) {
                    suggestions.push({
                        type: 'formation',
                        priority: 'medium',
                        message: 'Il 3-5-2 richiede un centrocampo numeroso e di qualità'
                    });
                }
                break;
            case '5-3-2':
                if (positionCounts.DEF < 5) {
                    suggestions.push({
                        type: 'formation',
                        priority: 'medium',
                        message: 'Il 5-3-2 richiede molti difensori, considera alternative'
                    });
                }
                break;
        }

        return suggestions;
    }
}