/**
 * FLOW: Match_Simulate
 * 
 * Simula una partita completa con eventi, statistiche e risultati realistici.
 * Gestisce formazioni, tattiche, eventi live e aggiornamenti post-partita.
 * 
 * Trigger: Click su "Gioca Partita" o automatico se partita programmata
 * Input: ID partita da simulare, formazione e tattica squadra utente, sostituzioni programmate
 * Output: Partita completata, risultato salvato, report generato
 * 
 * Dataset coinvolti:
 * - matches (lettura/scrittura - dati partita e risultato)
 * - players (lettura formazioni, scrittura statistiche)
 * - tactics (lettura - impostazioni tattiche)
 * - teams (scrittura - aggiornamento classifica)
 * - match_reports (scrittura - report dettagliato)
 * - morale_status (scrittura - impatto risultato)
 * - game_events (scrittura - eventi partita)
 */

export class MatchSimulateFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue la simulazione completa di una partita
     * @param {Object} params - Parametri della simulazione
     * @param {string} params.matchId - ID della partita da simulare
     * @param {Array} params.homeLineup - Formazione squadra casa (opzionale)
     * @param {Array} params.awayLineup - Formazione squadra ospite (opzionale)
     * @param {Object} params.homeTactics - Tattiche squadra casa (opzionale)
     * @param {Object} params.awayTactics - Tattiche squadra ospite (opzionale)
     * @param {string} params.simulationSpeed - Velocità simulazione (instant, fast, normal, slow)
     * @returns {Object} Risultato della simulazione
     */
    async execute(params) {
        try {
            console.log('⚽ Executing Match_Simulate...', params);

            // 1. Validazione parametri
            const validation = this.validateParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Carica dati partita
            const match = this.gameManager.gameData.matches.find(m => m.id === params.matchId);
            if (!match) {
                throw new Error('Partita non trovata');
            }

            if (match.status !== 'scheduled') {
                throw new Error('La partita non è programmata');
            }

            // 3. Carica squadre e giocatori
            const homeTeam = this.gameManager.gameData.teams.find(t => t.id === match.home_team_id);
            const awayTeam = this.gameManager.gameData.teams.find(t => t.id === match.away_team_id);
            const homePlayers = this.gameManager.getPlayersByTeam(match.home_team_id);
            const awayPlayers = this.gameManager.getPlayersByTeam(match.away_team_id);

            // 4. Prepara formazioni
            const homeLineup = params.homeLineup || this.generateAutoLineup(homePlayers);
            const awayLineup = params.awayLineup || this.generateAutoLineup(awayPlayers);

            // 5. Carica tattiche
            const homeTactics = params.homeTactics || this.getTeamTactics(match.home_team_id);
            const awayTactics = params.awayTactics || this.getTeamTactics(match.away_team_id);

            // 6. Calcola forza squadre
            const homeStrength = this.calculateTeamStrength(homeLineup, homeTactics, homeTeam);
            const awayStrength = this.calculateTeamStrength(awayLineup, awayTactics, awayTeam);

            // 7. Simula la partita
            const simulationResult = this.simulateMatch(
                match, homeTeam, awayTeam, 
                homeLineup, awayLineup,
                homeTactics, awayTactics,
                homeStrength, awayStrength
            );

            // 8. Aggiorna dati partita
            this.updateMatchData(match, simulationResult, homeLineup, awayLineup);

            // 9. Aggiorna statistiche squadre
            this.updateTeamStats(homeTeam, awayTeam, simulationResult);

            // 10. Aggiorna statistiche giocatori
            this.updatePlayerStats(homeLineup, awayLineup, simulationResult);

            // 11. Aggiorna morale post-partita
            this.updatePostMatchMorale(homeTeam, awayTeam, simulationResult);

            // 12. Genera eventi partita
            this.generateMatchEvents(match, simulationResult);

            // 13. Salva dati
            this.gameManager.saveGameData();

            console.log('✅ Match simulation completed');

            return {
                success: true,
                match: match,
                result: {
                    homeGoals: simulationResult.homeGoals,
                    awayGoals: simulationResult.awayGoals
                },
                events: simulationResult.events,
                stats: simulationResult.stats,
                playerRatings: simulationResult.playerRatings
            };

        } catch (error) {
            console.error('❌ Match_Simulate error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateParams(params) {
        if (!params.matchId) {
            return { isValid: false, error: 'ID partita mancante' };
        }

        return { isValid: true };
    }

    generateAutoLineup(players) {
        const availablePlayers = players.filter(p => p.injury_status === 'healthy');
        
        // Sort by overall rating
        availablePlayers.sort((a, b) => b.overall_rating - a.overall_rating);

        // Select best 11 players by position
        const lineup = [];
        const positions = ['GK', 'DEF', 'MID', 'ATT'];
        const positionCounts = { 'GK': 1, 'DEF': 4, 'MID': 4, 'ATT': 2 };

        positions.forEach(position => {
            const positionPlayers = availablePlayers.filter(p => 
                p.position === position && !lineup.includes(p.id)
            );
            
            for (let i = 0; i < positionCounts[position] && i < positionPlayers.length; i++) {
                lineup.push(positionPlayers[i].id);
            }
        });

        return lineup;
    }

    getTeamTactics(teamId) {
        const tactics = this.gameManager.gameData.tactics?.find(t => 
            t.team_id === teamId && t.is_default
        );

        return tactics || {
            formation: '4-4-2',
            mentality: 'balanced',
            tempo: 'normal',
            pressing: 'medium'
        };
    }

    calculateTeamStrength(lineup, tactics, team) {
        const lineupPlayers = lineup.map(playerId => 
            this.gameManager.gameData.players.find(p => p.id === playerId)
        ).filter(p => p);

        // Base strength from player ratings
        const avgRating = lineupPlayers.reduce((sum, p) => sum + p.overall_rating, 0) / lineupPlayers.length;
        
        // Morale bonus
        const moraleBonus = (team.team_morale - 50) / 10; // -5 to +5
        
        // Fitness penalty
        const avgFitness = lineupPlayers.reduce((sum, p) => sum + p.fitness, 0) / lineupPlayers.length;
        const fitnessBonus = (avgFitness - 80) / 10; // -8 to +2
        
        // Tactical bonus
        const tacticalBonus = tactics.effectiveness_rating ? (tactics.effectiveness_rating - 70) / 10 : 0;

        return Math.max(30, avgRating + moraleBonus + fitnessBonus + tacticalBonus);
    }

    simulateMatch(match, homeTeam, awayTeam, homeLineup, awayLineup, homeTactics, awayTactics, homeStrength, awayStrength) {
        const events = [];
        let homeGoals = 0;
        let awayGoals = 0;
        
        // Match statistics
        const stats = {
            home_possession: 50,
            away_possession: 50,
            home_shots: 0,
            away_shots: 0,
            home_shots_on_target: 0,
            away_shots_on_target: 0,
            home_corners: 0,
            away_corners: 0,
            home_fouls: 0,
            away_fouls: 0,
            home_yellow_cards: 0,
            away_yellow_cards: 0,
            home_red_cards: 0,
            away_red_cards: 0,
            home_passes: 0,
            away_passes: 0,
            home_pass_accuracy: 75 + Math.random() * 20,
            away_pass_accuracy: 75 + Math.random() * 20
        };

        // Calculate possession based on team strength and tactics
        const strengthDiff = homeStrength - awayStrength;
        stats.home_possession = Math.max(25, Math.min(75, 50 + strengthDiff));
        stats.away_possession = 100 - stats.home_possession;

        // Simulate 90 minutes
        for (let minute = 1; minute <= 90; minute++) {
            const events_this_minute = this.simulateMinute(
                minute, homeTeam, awayTeam, homeLineup, awayLineup,
                homeStrength, awayStrength, stats
            );

            events.push(...events_this_minute);

            // Count goals
            events_this_minute.forEach(event => {
                if (event.type === 'goal') {
                    if (event.team === 'home') homeGoals++;
                    else awayGoals++;
                }
            });
        }

        // Generate player ratings
        const playerRatings = this.generatePlayerRatings(homeLineup, awayLineup, events, stats);

        return {
            homeGoals,
            awayGoals,
            events,
            stats,
            playerRatings
        };
    }

    simulateMinute(minute, homeTeam, awayTeam, homeLineup, awayLineup, homeStrength, awayStrength, stats) {
        const events = [];
        const eventChance = 0.15; // 15% chance per minute

        if (Math.random() < eventChance) {
            const isHomeEvent = Math.random() < (homeStrength / (homeStrength + awayStrength));
            const event = this.generateMatchEvent(minute, isHomeEvent, homeLineup, awayLineup, stats);
            
            if (event) {
                events.push(event);
            }
        }

        return events;
    }

    generateMatchEvent(minute, isHome, homeLineup, awayLineup, stats) {
        const eventTypes = ['shot', 'corner', 'foul', 'goal', 'yellow_card'];
        const eventWeights = [0.4, 0.25, 0.2, 0.1, 0.05];
        
        const randomValue = Math.random();
        let cumulativeWeight = 0;
        let selectedEvent = 'shot';

        for (let i = 0; i < eventTypes.length; i++) {
            cumulativeWeight += eventWeights[i];
            if (randomValue <= cumulativeWeight) {
                selectedEvent = eventTypes[i];
                break;
            }
        }

        const lineup = isHome ? homeLineup : awayLineup;
        const randomPlayer = this.getRandomPlayer(lineup);
        const team = isHome ? 'home' : 'away';

        // Update stats
        switch (selectedEvent) {
            case 'shot':
                if (isHome) {
                    stats.home_shots++;
                    if (Math.random() < 0.4) stats.home_shots_on_target++;
                } else {
                    stats.away_shots++;
                    if (Math.random() < 0.4) stats.away_shots_on_target++;
                }
                break;
            case 'corner':
                if (isHome) stats.home_corners++;
                else stats.away_corners++;
                break;
            case 'foul':
                if (isHome) stats.home_fouls++;
                else stats.away_fouls++;
                break;
            case 'yellow_card':
                if (isHome) stats.home_yellow_cards++;
                else stats.away_yellow_cards++;
                break;
        }

        return {
            minute,
            type: selectedEvent,
            team,
            player_id: randomPlayer?.id,
            description: this.getEventDescription(selectedEvent, randomPlayer, team)
        };
    }

    getRandomPlayer(lineup) {
        if (!lineup || lineup.length === 0) return null;
        
        const playerId = lineup[Math.floor(Math.random() * lineup.length)];
        return this.gameManager.gameData.players.find(p => p.id === playerId);
    }

    getEventDescription(eventType, player, team) {
        const playerName = player ? `${player.first_name} ${player.last_name}` : 'Giocatore';
        const teamName = team === 'home' ? 'Casa' : 'Ospiti';

        switch (eventType) {
            case 'goal':
                return `⚽ Gol di ${playerName}!`;
            case 'shot':
                return `🎯 Tiro di ${playerName}`;
            case 'corner':
                return `📐 Calcio d'angolo per ${teamName}`;
            case 'foul':
                return `⚠️ Fallo di ${playerName}`;
            case 'yellow_card':
                return `🟨 Cartellino giallo per ${playerName}`;
            case 'red_card':
                return `🟥 Cartellino rosso per ${playerName}`;
            default:
                return `Evento: ${eventType}`;
        }
    }

    generatePlayerRatings(homeLineup, awayLineup, events, stats) {
        const ratings = [];

        [...homeLineup, ...awayLineup].forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            if (!player) return;

            // Base rating between 5.5 and 8.5
            let rating = 5.5 + (Math.random() * 3);

            // Bonus for goals
            const goals = events.filter(e => e.type === 'goal' && e.player_id === playerId).length;
            rating += goals * 0.8;

            // Penalty for cards
            const cards = events.filter(e => 
                (e.type === 'yellow_card' || e.type === 'red_card') && e.player_id === playerId
            ).length;
            rating -= cards * 0.3;

            // Position-based adjustments
            if (player.position === 'GK') {
                // Goalkeepers get bonus for clean sheets
                const isHome = homeLineup.includes(playerId);
                const goalsConceded = isHome ? stats.away_shots_on_target : stats.home_shots_on_target;
                if (goalsConceded === 0) rating += 0.5;
            }

            ratings.push({
                player_id: playerId,
                player_name: `${player.first_name} ${player.last_name}`,
                position: player.position,
                rating: Math.max(1, Math.min(10, Math.round(rating * 10) / 10))
            });
        });

        return ratings;
    }

    updateMatchData(match, simulationResult, homeLineup, awayLineup) {
        match.status = 'finished';
        match.home_goals = simulationResult.homeGoals;
        match.away_goals = simulationResult.awayGoals;
        match.home_lineup = homeLineup;
        match.away_lineup = awayLineup;
        match.attendance = 20000 + Math.floor(Math.random() * 40000);
        match.updated_at = new Date().toISOString();
    }

    updateTeamStats(homeTeam, awayTeam, simulationResult) {
        // Update matches played
        homeTeam.matches_played++;
        awayTeam.matches_played++;

        // Update goals
        homeTeam.goals_for += simulationResult.homeGoals;
        homeTeam.goals_against += simulationResult.awayGoals;
        awayTeam.goals_for += simulationResult.awayGoals;
        awayTeam.goals_against += simulationResult.homeGoals;

        // Update results and points
        if (simulationResult.homeGoals > simulationResult.awayGoals) {
            homeTeam.wins++;
            homeTeam.points += 3;
            awayTeam.losses++;
        } else if (simulationResult.awayGoals > simulationResult.homeGoals) {
            awayTeam.wins++;
            awayTeam.points += 3;
            homeTeam.losses++;
        } else {
            homeTeam.draws++;
            awayTeam.draws++;
            homeTeam.points++;
            awayTeam.points++;
        }

        homeTeam.updated_at = new Date().toISOString();
        awayTeam.updated_at = new Date().toISOString();
    }

    updatePlayerStats(homeLineup, awayLineup, simulationResult) {
        [...homeLineup, ...awayLineup].forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            if (!player) return;

            // Update matches played
            player.matches_played++;

            // Update goals and assists
            const goals = simulationResult.events.filter(e => 
                e.type === 'goal' && e.player_id === playerId
            ).length;
            player.goals_scored += goals;

            // Update cards
            const yellowCards = simulationResult.events.filter(e => 
                e.type === 'yellow_card' && e.player_id === playerId
            ).length;
            const redCards = simulationResult.events.filter(e => 
                e.type === 'red_card' && e.player_id === playerId
            ).length;
            
            player.yellow_cards += yellowCards;
            player.red_cards += redCards;

            // Update fitness (playing reduces fitness)
            player.fitness = Math.max(60, player.fitness - 10);
            player.stamina = Math.max(50, player.stamina - 15);

            player.updated_at = new Date().toISOString();
        });
    }

    updatePostMatchMorale(homeTeam, awayTeam, simulationResult) {
        const homeWin = simulationResult.homeGoals > simulationResult.awayGoals;
        const awayWin = simulationResult.awayGoals > simulationResult.homeGoals;
        const draw = simulationResult.homeGoals === simulationResult.awayGoals;

        // Team morale changes
        if (homeWin) {
            homeTeam.team_morale = Math.min(100, homeTeam.team_morale + 8);
            awayTeam.team_morale = Math.max(0, awayTeam.team_morale - 5);
        } else if (awayWin) {
            awayTeam.team_morale = Math.min(100, awayTeam.team_morale + 8);
            homeTeam.team_morale = Math.max(0, homeTeam.team_morale - 5);
        } else {
            homeTeam.team_morale = Math.min(100, homeTeam.team_morale + 2);
            awayTeam.team_morale = Math.min(100, awayTeam.team_morale + 2);
        }

        // Update morale status records
        this.updateMoraleStatusForResult(homeTeam.id, homeWin, draw);
        this.updateMoraleStatusForResult(awayTeam.id, awayWin, draw);
    }

    updateMoraleStatusForResult(teamId, won, draw) {
        const teamPlayers = this.gameManager.gameData.players.filter(p => p.team_id === teamId);
        
        teamPlayers.forEach(player => {
            const moraleChange = won ? 5 : draw ? 1 : -3;
            player.morale = Math.max(0, Math.min(100, player.morale + moraleChange));

            // Update morale status record
            let moraleRecord = this.gameManager.gameData.moraleStatus?.find(m => 
                m.entity_id === player.id && m.entity_type === 'player'
            );

            if (moraleRecord) {
                moraleRecord.recent_results_impact += moraleChange;
                moraleRecord.current_morale = player.morale;
                moraleRecord.updated_at = new Date().toISOString();
            }
        });
    }

    generateMatchEvents(match, simulationResult) {
        const homeTeam = this.gameManager.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameManager.gameData.teams.find(t => t.id === match.away_team_id);

        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'match',
            event_category: 'info',
            title: `${homeTeam?.short_name || 'HOME'} ${simulationResult.homeGoals}-${simulationResult.awayGoals} ${awayTeam?.short_name || 'AWAY'}`,
            description: `Partita terminata: ${homeTeam?.name || 'Casa'} vs ${awayTeam?.name || 'Ospiti'}`,
            related_entity_type: 'match',
            related_entity_id: match.id,
            team_id: match.is_user_match ? (homeTeam?.is_user_team ? homeTeam.id : awayTeam?.id) : null,
            player_id: null,
            match_id: match.id,
            priority: match.is_user_match ? 4 : 2,
            is_read: false,
            is_user_relevant: match.is_user_match,
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
    }
}