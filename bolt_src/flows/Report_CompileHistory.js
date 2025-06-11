/**
 * FLOW: Report_CompileHistory
 * 
 * Analizza e raccoglie l'evoluzione di uno o più giocatori nel tempo.
 * Genera report completi con timeline attributi, tendenze morale e rendimento partite.
 * 
 * Trigger: Richiesta visualizzazione storico o fine stagione
 * Input: ID giocatore(i), intervallo temporale, tipologia dati
 * Output: Report storico completo (JSON) per visualizzazione grafica
 * 
 * Dataset coinvolti:
 * - attributes_history (lettura - dati storici)
 * - players (lettura - statistiche attuali)
 * - matches (lettura - performance partite)
 * - morale_status (lettura - evoluzione morale)
 * - history_reports (scrittura - salvataggio report, opzionale)
 */

export class ReportCompileHistoryFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di compilazione storico
     * @param {Object} params - Parametri della compilazione
     * @param {string|Array} params.playerIds - ID giocatore singolo o array di ID
     * @param {string} params.startDate - Data inizio analisi (ISO string)
     * @param {string} params.endDate - Data fine analisi (ISO string)
     * @param {Array} params.dataTypes - Tipi dati da analizzare ['attributes', 'morale', 'matches', 'all']
     * @param {string} params.analysisType - Tipo analisi ('individual', 'comparison', 'team_average')
     * @param {boolean} params.includeProjections - Se includere proiezioni future
     * @param {boolean} params.saveReport - Se salvare il report generato
     * @param {string} params.reportName - Nome del report (se salvato)
     * @returns {Object} Report storico completo
     */
    async execute(params) {
        try {
            console.log('📈 Executing Report_CompileHistory flow...', params);

            // 1. Validazione parametri
            const validation = this.validateReportParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Normalizza input giocatori
            const playerIds = Array.isArray(params.playerIds) ? params.playerIds : [params.playerIds];
            
            // 3. Verifica esistenza giocatori
            const players = this.validatePlayers(playerIds);
            if (players.length === 0) {
                throw new Error('Nessun giocatore valido trovato');
            }

            // 4. Carica dati storici filtrati
            const historicalData = this.loadHistoricalData(playerIds, params.startDate, params.endDate);

            // 5. Compila report per ogni giocatore
            const playerReports = [];
            for (const player of players) {
                const playerReport = await this.compilePlayerReport(player, historicalData, params);
                playerReports.push(playerReport);
            }

            // 6. Genera analisi comparative (se richieste)
            const comparativeAnalysis = this.generateComparativeAnalysis(playerReports, params);

            // 7. Calcola statistiche aggregate
            const aggregateStats = this.calculateAggregateStatistics(playerReports, params);

            // 8. Genera insights e raccomandazioni
            const insights = this.generateInsights(playerReports, comparativeAnalysis);

            // 9. Compila report finale
            const finalReport = this.compileFinalReport({
                playerReports,
                comparativeAnalysis,
                aggregateStats,
                insights,
                metadata: {
                    generatedAt: new Date().toISOString(),
                    period: { start: params.startDate, end: params.endDate },
                    dataTypes: params.dataTypes,
                    analysisType: params.analysisType,
                    playersAnalyzed: players.length
                }
            });

            // 10. Salva report se richiesto
            if (params.saveReport) {
                await this.saveHistoryReport(finalReport, params.reportName);
            }

            console.log('✅ History report compiled successfully');

            return {
                success: true,
                report: finalReport,
                playersAnalyzed: players.length,
                dataPointsProcessed: this.countDataPoints(historicalData),
                reportId: params.saveReport ? finalReport.id : null
            };

        } catch (error) {
            console.error('❌ Report_CompileHistory flow error:', error);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateReportParams(params) {
        // Verifica parametri obbligatori
        if (!params.playerIds) {
            return { isValid: false, error: 'ID giocatore/i mancante' };
        }

        if (!params.startDate || !params.endDate) {
            return { isValid: false, error: 'Intervallo temporale incompleto' };
        }

        // Verifica validità date
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return { isValid: false, error: 'Date non valide' };
        }

        if (startDate >= endDate) {
            return { isValid: false, error: 'Data inizio deve essere precedente alla data fine' };
        }

        // Verifica intervallo ragionevole (max 2 anni)
        const maxInterval = 2 * 365 * 24 * 60 * 60 * 1000; // 2 anni in ms
        if (endDate - startDate > maxInterval) {
            return { isValid: false, error: 'Intervallo temporale troppo ampio (max 2 anni)' };
        }

        // Verifica tipi dati
        const validDataTypes = ['attributes', 'morale', 'matches', 'all'];
        const dataTypes = params.dataTypes || ['all'];
        
        if (!dataTypes.every(type => validDataTypes.includes(type))) {
            return { isValid: false, error: 'Tipi dati non validi' };
        }

        // Verifica tipo analisi
        const validAnalysisTypes = ['individual', 'comparison', 'team_average'];
        if (params.analysisType && !validAnalysisTypes.includes(params.analysisType)) {
            return { isValid: false, error: 'Tipo analisi non valido' };
        }

        return { isValid: true };
    }

    validatePlayers(playerIds) {
        const validPlayers = [];
        
        playerIds.forEach(playerId => {
            const player = this.gameManager.gameData.players.find(p => p.id === playerId);
            if (player) {
                validPlayers.push(player);
            } else {
                console.warn(`Player not found: ${playerId}`);
            }
        });

        return validPlayers;
    }

    loadHistoricalData(playerIds, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Carica attributes_history filtrato
        const attributesHistory = this.gameManager.gameData.attributesHistory?.filter(record => {
            const recordDate = new Date(record.record_date);
            return playerIds.includes(record.player_id) &&
                   recordDate >= start &&
                   recordDate <= end;
        }) || [];

        // Carica morale_status filtrato
        const moraleHistory = this.gameManager.gameData.moraleStatus?.filter(record => {
            const recordDate = new Date(record.updated_at);
            return record.entity_type === 'player' &&
                   playerIds.includes(record.entity_id) &&
                   recordDate >= start &&
                   recordDate <= end;
        }) || [];

        // Carica matches con performance giocatori
        const matchesHistory = this.gameManager.gameData.matches?.filter(match => {
            const matchDate = new Date(match.match_date);
            return matchDate >= start &&
                   matchDate <= end &&
                   match.status === 'finished';
        }) || [];

        // Carica match reports per statistiche dettagliate
        const matchReports = this.gameManager.gameData.matchReports?.filter(report => {
            const match = matchesHistory.find(m => m.id === report.match_id);
            return match && report.player_ratings?.some(rating => 
                playerIds.includes(rating.player_id)
            );
        }) || [];

        return {
            attributesHistory,
            moraleHistory,
            matchesHistory,
            matchReports
        };
    }

    async compilePlayerReport(player, historicalData, params) {
        console.log(`📊 Compiling report for ${player.first_name} ${player.last_name}...`);

        const playerReport = {
            playerId: player.id,
            playerName: `${player.first_name} ${player.last_name}`,
            position: player.position,
            age: player.age,
            currentRating: player.overall_rating,
            potential: player.potential
        };

        // Analizza evoluzione attributi
        if (this.shouldIncludeDataType('attributes', params.dataTypes)) {
            playerReport.attributesEvolution = this.analyzeAttributesEvolution(player.id, historicalData.attributesHistory);
        }

        // Analizza evoluzione morale
        if (this.shouldIncludeDataType('morale', params.dataTypes)) {
            playerReport.moraleEvolution = this.analyzeMoraleEvolution(player.id, historicalData.moraleHistory);
        }

        // Analizza performance partite
        if (this.shouldIncludeDataType('matches', params.dataTypes)) {
            playerReport.matchPerformance = this.analyzeMatchPerformance(player.id, historicalData.matchesHistory, historicalData.matchReports);
        }

        // Calcola trend generali
        playerReport.overallTrends = this.calculateOverallTrends(playerReport);

        // Identifica momenti salienti
        playerReport.keyMoments = this.identifyKeyMoments(player.id, historicalData);

        // Genera proiezioni future (se richieste)
        if (params.includeProjections) {
            playerReport.futureProjections = this.generateFutureProjections(playerReport, player);
        }

        return playerReport;
    }

    shouldIncludeDataType(dataType, requestedTypes) {
        return requestedTypes.includes('all') || requestedTypes.includes(dataType);
    }

    analyzeAttributesEvolution(playerId, attributesHistory) {
        const playerHistory = attributesHistory.filter(record => record.player_id === playerId)
                                             .sort((a, b) => new Date(a.record_date) - new Date(b.record_date));

        if (playerHistory.length === 0) {
            return {
                timeline: [],
                trends: {},
                significantChanges: [],
                totalImprovement: 0
            };
        }

        // Crea timeline evoluzione
        const timeline = playerHistory.map(record => ({
            date: record.record_date,
            overall_rating: record.overall_rating,
            pace: record.pace,
            shooting: record.shooting,
            passing: record.passing,
            dribbling: record.dribbling,
            defending: record.defending,
            physical: record.physical,
            fitness: record.fitness,
            morale: record.morale,
            changeReason: record.change_reason,
            isSignificant: record.is_significant_change
        }));

        // Calcola trend per ogni attributo
        const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
        const trends = {};

        attributes.forEach(attr => {
            const values = timeline.map(t => t[attr]).filter(v => v !== undefined);
            if (values.length >= 2) {
                const firstValue = values[0];
                const lastValue = values[values.length - 1];
                const change = lastValue - firstValue;
                const changePercentage = (change / firstValue) * 100;

                trends[attr] = {
                    startValue: firstValue,
                    endValue: lastValue,
                    totalChange: change,
                    changePercentage: changePercentage,
                    trend: change > 1 ? 'improving' : change < -1 ? 'declining' : 'stable',
                    averageValue: values.reduce((sum, v) => sum + v, 0) / values.length
                };
            }
        });

        // Identifica cambiamenti significativi
        const significantChanges = playerHistory
            .filter(record => record.is_significant_change)
            .map(record => ({
                date: record.record_date,
                reason: record.change_reason,
                changes: record.attribute_changes,
                overallImpact: Object.values(record.attribute_changes || {}).reduce((sum, change) => sum + Math.abs(change), 0)
            }));

        // Calcola miglioramento totale
        const firstRecord = playerHistory[0];
        const lastRecord = playerHistory[playerHistory.length - 1];
        const totalImprovement = lastRecord.overall_rating - firstRecord.overall_rating;

        return {
            timeline,
            trends,
            significantChanges,
            totalImprovement,
            recordsAnalyzed: playerHistory.length,
            periodCovered: {
                start: firstRecord.record_date,
                end: lastRecord.record_date
            }
        };
    }

    analyzeMoraleEvolution(playerId, moraleHistory) {
        const playerMorale = moraleHistory.filter(record => record.entity_id === playerId)
                                         .sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));

        if (playerMorale.length === 0) {
            return {
                timeline: [],
                averageMorale: 50,
                moraleStability: 'unknown',
                impactFactors: {}
            };
        }

        // Crea timeline morale
        const timeline = playerMorale.map(record => ({
            date: record.updated_at,
            morale: record.current_morale,
            trend: record.morale_trend,
            lastEvent: record.last_significant_event,
            impactFactors: {
                results: record.recent_results_impact,
                training: record.training_impact,
                transfer: record.transfer_impact,
                injury: record.injury_impact,
                chemistry: record.team_chemistry_impact
            }
        }));

        // Calcola statistiche morale
        const moraleValues = timeline.map(t => t.morale);
        const averageMorale = moraleValues.reduce((sum, m) => sum + m, 0) / moraleValues.length;
        const moraleVariance = this.calculateVariance(moraleValues);
        
        // Determina stabilità morale
        let moraleStability;
        if (moraleVariance < 100) moraleStability = 'very_stable';
        else if (moraleVariance < 300) moraleStability = 'stable';
        else if (moraleVariance < 600) moraleStability = 'variable';
        else moraleStability = 'very_variable';

        // Analizza fattori di impatto
        const impactFactors = {
            results: this.calculateAverageImpact(timeline, 'results'),
            training: this.calculateAverageImpact(timeline, 'training'),
            transfer: this.calculateAverageImpact(timeline, 'transfer'),
            injury: this.calculateAverageImpact(timeline, 'injury'),
            chemistry: this.calculateAverageImpact(timeline, 'chemistry')
        };

        return {
            timeline,
            averageMorale: Math.round(averageMorale),
            moraleStability,
            impactFactors,
            moraleVariance: Math.round(moraleVariance),
            recordsAnalyzed: playerMorale.length
        };
    }

    calculateVariance(values) {
        const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
        const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
        return squaredDiffs.reduce((sum, d) => sum + d, 0) / values.length;
    }

    calculateAverageImpact(timeline, factor) {
        const impacts = timeline.map(t => t.impactFactors[factor]).filter(i => i !== undefined && i !== 0);
        return impacts.length > 0 ? impacts.reduce((sum, i) => sum + i, 0) / impacts.length : 0;
    }

    analyzeMatchPerformance(playerId, matchesHistory, matchReports) {
        // Trova partite in cui il giocatore ha giocato
        const playerMatches = [];
        
        matchReports.forEach(report => {
            const playerRating = report.player_ratings?.find(rating => rating.player_id === playerId);
            if (playerRating) {
                const match = matchesHistory.find(m => m.id === report.match_id);
                if (match) {
                    playerMatches.push({
                        matchId: match.id,
                        date: match.match_date,
                        homeTeam: match.home_team_id,
                        awayTeam: match.away_team_id,
                        result: `${match.home_goals}-${match.away_goals}`,
                        rating: playerRating.rating,
                        position: playerRating.position
                    });
                }
            }
        });

        if (playerMatches.length === 0) {
            return {
                matchesPlayed: 0,
                averageRating: 0,
                performanceTrend: 'no_data',
                bestPerformance: null,
                worstPerformance: null
            };
        }

        // Ordina per data
        playerMatches.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Calcola statistiche performance
        const ratings = playerMatches.map(m => m.rating);
        const averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        
        // Trova migliore e peggiore performance
        const bestPerformance = playerMatches.reduce((best, match) => 
            match.rating > best.rating ? match : best
        );
        
        const worstPerformance = playerMatches.reduce((worst, match) => 
            match.rating < worst.rating ? match : worst
        );

        // Calcola trend performance (ultimi vs primi match)
        const recentMatches = playerMatches.slice(-5); // Ultime 5 partite
        const earlyMatches = playerMatches.slice(0, 5); // Prime 5 partite
        
        const recentAvg = recentMatches.reduce((sum, m) => sum + m.rating, 0) / recentMatches.length;
        const earlyAvg = earlyMatches.reduce((sum, m) => sum + m.rating, 0) / earlyMatches.length;
        
        let performanceTrend;
        const trendDiff = recentAvg - earlyAvg;
        if (trendDiff > 0.3) performanceTrend = 'improving';
        else if (trendDiff < -0.3) performanceTrend = 'declining';
        else performanceTrend = 'stable';

        // Analizza consistenza
        const ratingVariance = this.calculateVariance(ratings);
        let consistency;
        if (ratingVariance < 0.5) consistency = 'very_consistent';
        else if (ratingVariance < 1.0) consistency = 'consistent';
        else if (ratingVariance < 2.0) consistency = 'variable';
        else consistency = 'inconsistent';

        return {
            matchesPlayed: playerMatches.length,
            averageRating: Math.round(averageRating * 10) / 10,
            performanceTrend,
            consistency,
            bestPerformance: {
                rating: bestPerformance.rating,
                date: bestPerformance.date,
                result: bestPerformance.result
            },
            worstPerformance: {
                rating: worstPerformance.rating,
                date: worstPerformance.date,
                result: worstPerformance.result
            },
            timeline: playerMatches.map(match => ({
                date: match.date,
                rating: match.rating,
                result: match.result
            }))
        };
    }

    calculateOverallTrends(playerReport) {
        const trends = {
            development: 'stable',
            consistency: 'average',
            potential: 'unknown',
            riskFactors: [],
            strengths: []
        };

        // Analizza sviluppo generale
        if (playerReport.attributesEvolution?.totalImprovement > 3) {
            trends.development = 'excellent';
        } else if (playerReport.attributesEvolution?.totalImprovement > 1) {
            trends.development = 'good';
        } else if (playerReport.attributesEvolution?.totalImprovement < -2) {
            trends.development = 'concerning';
        }

        // Analizza consistenza
        if (playerReport.matchPerformance?.consistency === 'very_consistent') {
            trends.consistency = 'excellent';
        } else if (playerReport.matchPerformance?.consistency === 'consistent') {
            trends.consistency = 'good';
        } else if (playerReport.matchPerformance?.consistency === 'inconsistent') {
            trends.consistency = 'poor';
        }

        // Identifica fattori di rischio
        if (playerReport.moraleEvolution?.averageMorale < 40) {
            trends.riskFactors.push('low_morale');
        }
        if (playerReport.moraleEvolution?.moraleStability === 'very_variable') {
            trends.riskFactors.push('morale_instability');
        }
        if (playerReport.matchPerformance?.performanceTrend === 'declining') {
            trends.riskFactors.push('declining_performance');
        }

        // Identifica punti di forza
        if (playerReport.attributesEvolution?.totalImprovement > 2) {
            trends.strengths.push('rapid_development');
        }
        if (playerReport.moraleEvolution?.averageMorale > 70) {
            trends.strengths.push('high_morale');
        }
        if (playerReport.matchPerformance?.averageRating > 7.5) {
            trends.strengths.push('excellent_performer');
        }

        return trends;
    }

    identifyKeyMoments(playerId, historicalData) {
        const keyMoments = [];

        // Momenti significativi da attributes_history
        const significantChanges = historicalData.attributesHistory
            .filter(record => record.player_id === playerId && record.is_significant_change)
            .map(record => ({
                date: record.record_date,
                type: 'attribute_change',
                description: `Cambiamento significativo attributi: ${record.change_reason}`,
                impact: Object.values(record.attribute_changes || {}).reduce((sum, change) => sum + Math.abs(change), 0),
                details: record.attribute_changes
            }));

        keyMoments.push(...significantChanges);

        // Momenti significativi da morale
        const moraleEvents = historicalData.moraleHistory
            .filter(record => record.entity_id === playerId && Math.abs(record.transfer_impact || 0) > 10)
            .map(record => ({
                date: record.event_date,
                type: 'morale_event',
                description: `Evento morale significativo: ${record.last_significant_event}`,
                impact: Math.abs(record.transfer_impact || 0),
                details: {
                    moraleChange: record.transfer_impact,
                    newMorale: record.current_morale
                }
            }));

        keyMoments.push(...moraleEvents);

        // Ordina per data e impatto
        keyMoments.sort((a, b) => {
            const dateCompare = new Date(b.date) - new Date(a.date);
            return dateCompare !== 0 ? dateCompare : b.impact - a.impact;
        });

        return keyMoments.slice(0, 10); // Top 10 momenti più significativi
    }

    generateFutureProjections(playerReport, player) {
        const projections = {
            nextSeason: {},
            longTerm: {},
            recommendations: []
        };

        // Proiezione attributi prossima stagione
        if (playerReport.attributesEvolution?.trends) {
            Object.keys(playerReport.attributesEvolution.trends).forEach(attr => {
                const trend = playerReport.attributesEvolution.trends[attr];
                const currentValue = trend.endValue;
                
                // Calcola proiezione basata su trend e età
                let projectedChange = 0;
                if (trend.trend === 'improving') {
                    projectedChange = Math.max(1, trend.totalChange * 0.5);
                } else if (trend.trend === 'declining') {
                    projectedChange = Math.min(-1, trend.totalChange * 0.3);
                }

                // Fattore età
                if (player.age > 30) projectedChange *= 0.5;
                else if (player.age < 23) projectedChange *= 1.2;

                projections.nextSeason[attr] = Math.max(1, Math.min(99, currentValue + projectedChange));
            });
        }

        // Proiezione overall rating
        const currentOverall = player.overall_rating;
        const potentialGap = player.potential - currentOverall;
        
        if (potentialGap > 0 && player.age < 28) {
            const developmentRate = playerReport.attributesEvolution?.totalImprovement || 0;
            projections.nextSeason.overall_rating = Math.min(player.potential, currentOverall + Math.max(0, developmentRate * 0.7));
        } else {
            projections.nextSeason.overall_rating = currentOverall;
        }

        // Raccomandazioni
        if (playerReport.overallTrends?.riskFactors.includes('low_morale')) {
            projections.recommendations.push('Migliorare il morale del giocatore attraverso tempo di gioco e allenamenti mirati');
        }
        
        if (playerReport.overallTrends?.development === 'excellent') {
            projections.recommendations.push('Continuare il programma di allenamento attuale per mantenere lo sviluppo');
        }

        if (player.age > 32 && playerReport.matchPerformance?.performanceTrend === 'declining') {
            projections.recommendations.push('Considerare la riduzione del carico di lavoro o la ricerca di un sostituto');
        }

        return projections;
    }

    generateComparativeAnalysis(playerReports, params) {
        if (params.analysisType !== 'comparison' || playerReports.length < 2) {
            return null;
        }

        const comparison = {
            playersCompared: playerReports.length,
            attributeComparison: {},
            performanceComparison: {},
            developmentComparison: {},
            rankings: {}
        };

        // Confronto attributi
        const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
        attributes.forEach(attr => {
            const values = playerReports.map(report => ({
                playerId: report.playerId,
                playerName: report.playerName,
                value: report.attributesEvolution?.trends?.[attr]?.endValue || 0,
                trend: report.attributesEvolution?.trends?.[attr]?.trend || 'stable'
            })).filter(item => item.value > 0);

            if (values.length > 0) {
                values.sort((a, b) => b.value - a.value);
                comparison.attributeComparison[attr] = values;
            }
        });

        // Confronto performance
        comparison.performanceComparison = playerReports.map(report => ({
            playerId: report.playerId,
            playerName: report.playerName,
            averageRating: report.matchPerformance?.averageRating || 0,
            matchesPlayed: report.matchPerformance?.matchesPlayed || 0,
            consistency: report.matchPerformance?.consistency || 'unknown'
        })).sort((a, b) => b.averageRating - a.averageRating);

        // Confronto sviluppo
        comparison.developmentComparison = playerReports.map(report => ({
            playerId: report.playerId,
            playerName: report.playerName,
            totalImprovement: report.attributesEvolution?.totalImprovement || 0,
            development: report.overallTrends?.development || 'stable'
        })).sort((a, b) => b.totalImprovement - a.totalImprovement);

        // Rankings generali
        comparison.rankings = {
            bestPerformer: comparison.performanceComparison[0],
            mostImproved: comparison.developmentComparison[0],
            mostConsistent: playerReports.reduce((best, report) => {
                const consistency = report.matchPerformance?.consistency;
                if (consistency === 'very_consistent') return report;
                if (consistency === 'consistent' && best.matchPerformance?.consistency !== 'very_consistent') return report;
                return best;
            }, playerReports[0])
        };

        return comparison;
    }

    calculateAggregateStatistics(playerReports, params) {
        const stats = {
            totalPlayersAnalyzed: playerReports.length,
            averageImprovement: 0,
            averagePerformance: 0,
            developmentDistribution: {
                excellent: 0,
                good: 0,
                stable: 0,
                concerning: 0
            },
            moraleDistribution: {
                high: 0,
                medium: 0,
                low: 0
            }
        };

        // Calcola medie
        const improvements = playerReports.map(r => r.attributesEvolution?.totalImprovement || 0);
        const performances = playerReports.map(r => r.matchPerformance?.averageRating || 0).filter(p => p > 0);
        
        stats.averageImprovement = improvements.reduce((sum, i) => sum + i, 0) / improvements.length;
        stats.averagePerformance = performances.length > 0 ? 
            performances.reduce((sum, p) => sum + p, 0) / performances.length : 0;

        // Distribuzione sviluppo
        playerReports.forEach(report => {
            const development = report.overallTrends?.development || 'stable';
            stats.developmentDistribution[development]++;
        });

        // Distribuzione morale
        playerReports.forEach(report => {
            const morale = report.moraleEvolution?.averageMorale || 50;
            if (morale >= 70) stats.moraleDistribution.high++;
            else if (morale >= 40) stats.moraleDistribution.medium++;
            else stats.moraleDistribution.low++;
        });

        return stats;
    }

    generateInsights(playerReports, comparativeAnalysis) {
        const insights = {
            keyFindings: [],
            recommendations: [],
            riskAlerts: [],
            opportunities: []
        };

        // Analizza findings generali
        const excellentDevelopers = playerReports.filter(r => r.overallTrends?.development === 'excellent');
        if (excellentDevelopers.length > 0) {
            insights.keyFindings.push(`${excellentDevelopers.length} giocatore/i mostrano uno sviluppo eccellente`);
        }

        const lowMoralePlayers = playerReports.filter(r => r.moraleEvolution?.averageMorale < 40);
        if (lowMoralePlayers.length > 0) {
            insights.riskAlerts.push(`${lowMoralePlayers.length} giocatore/i hanno morale basso che richiede attenzione`);
        }

        const decliningPerformers = playerReports.filter(r => r.matchPerformance?.performanceTrend === 'declining');
        if (decliningPerformers.length > 0) {
            insights.riskAlerts.push(`${decliningPerformers.length} giocatore/i mostrano un calo nelle prestazioni`);
        }

        // Raccomandazioni specifiche
        playerReports.forEach(report => {
            if (report.overallTrends?.riskFactors.length > 0) {
                insights.recommendations.push(`${report.playerName}: Affrontare ${report.overallTrends.riskFactors.join(', ')}`);
            }
            
            if (report.overallTrends?.strengths.includes('rapid_development')) {
                insights.opportunities.push(`${report.playerName}: Potenziale di sviluppo rapido da sfruttare`);
            }
        });

        return insights;
    }

    compileFinalReport(data) {
        const reportId = `history_report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
            id: reportId,
            type: 'player_history_analysis',
            ...data,
            summary: {
                playersAnalyzed: data.playerReports.length,
                periodAnalyzed: `${data.metadata.period.start} - ${data.metadata.period.end}`,
                dataTypes: data.metadata.dataTypes,
                keyInsights: data.insights.keyFindings.slice(0, 3),
                mainRecommendations: data.insights.recommendations.slice(0, 5)
            }
        };
    }

    async saveHistoryReport(report, reportName) {
        // Inizializza dataset history_reports se non esiste
        if (!this.gameManager.gameData.historyReports) {
            this.gameManager.gameData.historyReports = [];
        }

        const savedReport = {
            id: report.id,
            name: reportName || `Report ${new Date().toLocaleDateString('it-IT')}`,
            type: report.type,
            created_at: new Date().toISOString(),
            metadata: report.metadata,
            summary: report.summary,
            full_report_data: JSON.stringify(report) // Salva report completo come JSON
        };

        this.gameManager.gameData.historyReports.push(savedReport);
        this.gameManager.saveGameData();

        console.log(`💾 History report saved: ${savedReport.name}`);
        return savedReport;
    }

    countDataPoints(historicalData) {
        return (historicalData.attributesHistory?.length || 0) +
               (historicalData.moraleHistory?.length || 0) +
               (historicalData.matchesHistory?.length || 0) +
               (historicalData.matchReports?.length || 0);
    }
}