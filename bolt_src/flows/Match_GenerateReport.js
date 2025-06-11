/**
 * FLOW: Match_GenerateReport
 * 
 * Genera un report dettagliato al termine di una partita simulata.
 * Calcola valutazioni individuali, statistiche comparative e analisi tattica.
 * 
 * Trigger: Automatico al termine di Match_Simulate
 * Input: ID partita completata, eventi partita generati, statistiche calcolate
 * Output: Report dettagliato disponibile per consultazione
 * 
 * Dataset coinvolti:
 * - match_reports (scrittura - report completo)
 * - matches (lettura - dati partita)
 * - players (lettura - performance individuali)
 */

export class MatchGenerateReportFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di generazione report partita
     * @param {Object} params - Parametri della generazione
     * @param {string} params.matchId - ID della partita completata
     * @param {Array} params.matchEvents - Eventi generati durante la partita
     * @param {Object} params.matchStats - Statistiche calcolate
     * @param {Array} params.playerRatings - Valutazioni giocatori
     * @returns {Object} Risultato della generazione
     */
    async execute(params) {
        try {
            console.log('📊 Executing Match_GenerateReport flow...', params);

            // 1. Validazione parametri
            const validation = this.validateReportParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Carica dati partita
            const match = this.gameManager.gameData.matches.find(m => m.id === params.matchId);
            if (!match || match.status !== 'finished') {
                throw new Error('Partita non trovata o non completata');
            }

            // 3. Carica squadre e giocatori
            const homeTeam = this.gameManager.gameData.teams.find(t => t.id === match.home_team_id);
            const awayTeam = this.gameManager.gameData.teams.find(t => t.id === match.away_team_id);

            // 4. Genera valutazioni giocatori se non fornite
            const playerRatings = params.playerRatings || this.generatePlayerRatings(match, params.matchEvents);

            // 5. Identifica momenti salienti
            const keyMoments = this.identifyKeyMoments(params.matchEvents, match);

            // 6. Calcola statistiche comparative
            const comparativeStats = this.calculateComparativeStats(params.matchStats, homeTeam, awayTeam);

            // 7. Genera analisi tattica
            const tacticalAnalysis = this.generateTacticalAnalysis(match, params.matchStats, homeTeam, awayTeam);

            // 8. Determina migliore in campo
            const manOfTheMatch = this.determineManOfTheMatch(playerRatings, params.matchEvents);

            // 9. Calcola impatto condizioni esterne
            const externalFactors = this.analyzeExternalFactors(match);

            // 10. Compila report completo
            const report = this.compileMatchReport({
                match,
                homeTeam,
                awayTeam,
                matchEvents: params.matchEvents,
                matchStats: params.matchStats,
                playerRatings,
                keyMoments,
                comparativeStats,
                tacticalAnalysis,
                manOfTheMatch,
                externalFactors
            });

            // 11. Salva report nel dataset
            this.saveMatchReport(report);

            // 12. Aggiorna riferimento nel match
            match.match_report_id = report.id;
            match.updated_at = new Date().toISOString();

            console.log('✅ Match report generated successfully:', report.id);

            return {
                success: true,
                reportId: report.id,
                manOfTheMatch: manOfTheMatch,
                keyMoments: keyMoments.length,
                tacticalRating: tacticalAnalysis.overallRating
            };

        } catch (error) {
            console.error('❌ Match_GenerateReport flow error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateReportParams(params) {
        if (!params.matchId) {
            return { isValid: false, error: 'ID partita mancante' };
        }

        if (!params.matchEvents || !Array.isArray(params.matchEvents)) {
            return { isValid: false, error: 'Eventi partita mancanti o non validi' };
        }

        if (!params.matchStats || typeof params.matchStats !== 'object') {
            return { isValid: false, error: 'Statistiche partita mancanti o non valide' };
        }

        return { isValid: true };
    }

    generatePlayerRatings(match, events) {
        const ratings = [];
        const lineup = [...(match.home_lineup || []), ...(match.away_lineup || [])];

        lineup.forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            if (!player) return;

            // Rating base tra 5.5 e 8.0
            let rating = 5.5 + (Math.random() * 2.5);

            // Bonus per eventi positivi
            const playerEvents = events.filter(e => e.player_id === playerId);
            playerEvents.forEach(event => {
                switch (event.type) {
                    case 'goal':
                        rating += 1.0;
                        break;
                    case 'assist':
                        rating += 0.7;
                        break;
                    case 'yellow_card':
                        rating -= 0.3;
                        break;
                    case 'red_card':
                        rating -= 1.0;
                        break;
                }
            });

            // Bonus per portieri (clean sheet)
            if (player.position === 'GK') {
                const isHome = match.home_lineup?.includes(playerId);
                const goalsConceded = isHome ? match.away_goals : match.home_goals;
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

    identifyKeyMoments(events, match) {
        const keyMoments = [];

        // Gol sono sempre momenti salienti
        const goals = events.filter(e => e.type === 'goal');
        goals.forEach(goal => {
            keyMoments.push({
                minute: goal.minute,
                type: 'goal',
                description: goal.description,
                importance: 'high',
                team: goal.team
            });
        });

        // Cartellini rossi
        const redCards = events.filter(e => e.type === 'red_card');
        redCards.forEach(card => {
            keyMoments.push({
                minute: card.minute,
                type: 'red_card',
                description: card.description,
                importance: 'high',
                team: card.team
            });
        });

        // Sostituzioni tattiche importanti
        const substitutions = events.filter(e => e.type === 'substitution');
        substitutions.forEach(sub => {
            if (sub.minute < 60) { // Sostituzioni precoci sono tatticamente significative
                keyMoments.push({
                    minute: sub.minute,
                    type: 'tactical_substitution',
                    description: sub.description,
                    importance: 'medium',
                    team: sub.team
                });
            }
        });

        // Ordina per minuto
        return keyMoments.sort((a, b) => a.minute - b.minute);
    }

    calculateComparativeStats(stats, homeTeam, awayTeam) {
        return {
            possession: {
                home: stats.home_possession,
                away: stats.away_possession,
                dominance: stats.home_possession > 60 ? 'home' : stats.away_possession > 60 ? 'away' : 'balanced'
            },
            shots: {
                home: stats.home_shots,
                away: stats.away_shots,
                efficiency_home: stats.home_shots > 0 ? (stats.home_shots_on_target / stats.home_shots * 100) : 0,
                efficiency_away: stats.away_shots > 0 ? (stats.away_shots_on_target / stats.away_shots * 100) : 0
            },
            passing: {
                home_accuracy: stats.home_pass_accuracy,
                away_accuracy: stats.away_pass_accuracy,
                better_passing: stats.home_pass_accuracy > stats.away_pass_accuracy ? 'home' : 'away'
            },
            discipline: {
                home_cards: stats.home_yellow_cards + stats.home_red_cards,
                away_cards: stats.away_yellow_cards + stats.away_red_cards,
                more_disciplined: (stats.home_yellow_cards + stats.home_red_cards) < (stats.away_yellow_cards + stats.away_red_cards) ? 'home' : 'away'
            }
        };
    }

    generateTacticalAnalysis(match, stats, homeTeam, awayTeam) {
        const analysis = {
            homeFormation: match.home_formation,
            awayFormation: match.away_formation,
            tacticalBattle: '',
            keyTacticalPoints: [],
            overallRating: 7
        };

        // Analisi possesso palla
        if (stats.home_possession > 65) {
            analysis.keyTacticalPoints.push(`${homeTeam.name} ha dominato il possesso palla (${stats.home_possession}%)`);
            analysis.tacticalBattle = `${homeTeam.name} ha imposto il proprio gioco`;
        } else if (stats.away_possession > 65) {
            analysis.keyTacticalPoints.push(`${awayTeam.name} ha dominato il possesso palla (${stats.away_possession}%)`);
            analysis.tacticalBattle = `${awayTeam.name} ha imposto il proprio gioco`;
        } else {
            analysis.tacticalBattle = 'Partita equilibrata dal punto di vista tattico';
        }

        // Analisi efficacia offensiva
        const homeEfficiency = stats.home_shots > 0 ? (match.home_goals / stats.home_shots * 100) : 0;
        const awayEfficiency = stats.away_shots > 0 ? (match.away_goals / stats.away_shots * 100) : 0;

        if (homeEfficiency > 20) {
            analysis.keyTacticalPoints.push(`${homeTeam.name} molto efficace in attacco (${homeEfficiency.toFixed(1)}% conversione)`);
        }
        if (awayEfficiency > 20) {
            analysis.keyTacticalPoints.push(`${awayTeam.name} molto efficace in attacco (${awayEfficiency.toFixed(1)}% conversione)`);
        }

        // Analisi disciplina tattica
        const totalCards = stats.home_yellow_cards + stats.home_red_cards + stats.away_yellow_cards + stats.away_red_cards;
        if (totalCards > 6) {
            analysis.keyTacticalPoints.push('Partita molto fisica con numerosi interventi fallosi');
            analysis.overallRating -= 1;
        }

        return analysis;
    }

    determineManOfTheMatch(playerRatings, events) {
        if (!playerRatings || playerRatings.length === 0) return null;

        // Ordina per rating
        const sortedRatings = [...playerRatings].sort((a, b) => b.rating - a.rating);
        const topPlayer = sortedRatings[0];

        // Verifica se ha fatto qualcosa di significativo
        const playerEvents = events.filter(e => e.player_id === topPlayer.player_id);
        const hasSignificantEvent = playerEvents.some(e => 
            e.type === 'goal' || e.type === 'assist' || e.type === 'penalty_save'
        );

        return {
            player_id: topPlayer.player_id,
            player_name: topPlayer.player_name,
            position: topPlayer.position,
            rating: topPlayer.rating,
            reason: hasSignificantEvent ? 'Performance eccellente con contributi decisivi' : 'Prestazione di alto livello'
        };
    }

    analyzeExternalFactors(match) {
        const factors = {
            weather_impact: 'neutral',
            attendance_impact: 'neutral',
            referee_performance: 7
        };

        // Analisi meteo
        switch (match.weather) {
            case 'rainy':
                factors.weather_impact = 'negative';
                factors.weather_description = 'La pioggia ha reso difficile il controllo del pallone';
                break;
            case 'sunny':
                factors.weather_impact = 'positive';
                factors.weather_description = 'Condizioni ideali per il gioco';
                break;
            default:
                factors.weather_description = 'Condizioni meteo normali';
        }

        // Analisi pubblico
        if (match.attendance > 40000) {
            factors.attendance_impact = 'positive';
            factors.attendance_description = 'Atmosfera elettrizzante con grande supporto del pubblico';
        } else if (match.attendance < 15000) {
            factors.attendance_impact = 'negative';
            factors.attendance_description = 'Stadio poco pieno, atmosfera spenta';
        } else {
            factors.attendance_description = 'Buona presenza di pubblico';
        }

        // Performance arbitro (casuale ma realistica)
        factors.referee_performance = 6 + Math.floor(Math.random() * 3); // 6-8

        return factors;
    }

    compileMatchReport(data) {
        const reportId = `report_${data.match.id}_${Date.now()}`;

        return {
            id: reportId,
            match_id: data.match.id,
            match_events: data.matchEvents,
            home_possession: data.matchStats.home_possession,
            away_possession: data.matchStats.away_possession,
            home_shots: data.matchStats.home_shots,
            away_shots: data.matchStats.away_shots,
            home_shots_on_target: data.matchStats.home_shots_on_target,
            away_shots_on_target: data.matchStats.away_shots_on_target,
            home_corners: data.matchStats.home_corners,
            away_corners: data.matchStats.away_corners,
            home_fouls: data.matchStats.home_fouls,
            away_fouls: data.matchStats.away_fouls,
            home_yellow_cards: data.matchStats.home_yellow_cards,
            away_yellow_cards: data.matchStats.away_yellow_cards,
            home_red_cards: data.matchStats.home_red_cards,
            away_red_cards: data.matchStats.away_red_cards,
            home_passes: data.matchStats.home_passes || 0,
            away_passes: data.matchStats.away_passes || 0,
            home_pass_accuracy: data.matchStats.home_pass_accuracy,
            away_pass_accuracy: data.matchStats.away_pass_accuracy,
            player_ratings: data.playerRatings,
            man_of_the_match: data.manOfTheMatch?.player_id || null,
            key_moments: data.keyMoments,
            tactical_analysis: JSON.stringify(data.tacticalAnalysis),
            weather_impact: data.externalFactors.weather_impact,
            referee_performance: data.externalFactors.referee_performance,
            attendance_impact: data.externalFactors.attendance_impact,
            injury_time_home: Math.floor(Math.random() * 4) + 1, // 1-4 minuti
            injury_time_away: Math.floor(Math.random() * 4) + 1, // 1-4 minuti
            created_at: new Date().toISOString()
        };
    }

    saveMatchReport(report) {
        // Inizializza dataset se non esiste
        if (!this.gameManager.gameData.matchReports) {
            this.gameManager.gameData.matchReports = [];
        }

        this.gameManager.gameData.matchReports.push(report);
        this.gameManager.saveGameData();

        console.log(`📊 Match report saved: ${report.id}`);
    }
}