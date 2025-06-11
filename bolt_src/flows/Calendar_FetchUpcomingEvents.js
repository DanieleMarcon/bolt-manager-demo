/**
 * FLOW: Calendar_FetchUpcomingEvents
 * 
 * Raccoglie e organizza tutti gli eventi futuri programmati per la visualizzazione
 * nel calendario di gioco. Include partite, allenamenti, scadenze e eventi automatici.
 * 
 * Trigger: Apertura calendario o avanzamento giorno
 * Input: Data corrente, periodo di visualizzazione (settimana/mese)
 * Output: Lista eventi ordinata cronologicamente
 * 
 * Dataset coinvolti:
 * - matches (lettura - partite programmate)
 * - trainings (lettura - allenamenti schedulati)
 * - transfers (lettura - scadenze trattative)
 * - game_events (lettura - eventi programmati)
 */

export class CalendarFetchUpcomingEventsFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di recupero eventi futuri
     * @param {Object} params - Parametri della ricerca
     * @param {string} params.startDate - Data inizio periodo (ISO string)
     * @param {string} params.endDate - Data fine periodo (ISO string)
     * @param {string} params.viewType - Tipo vista ('week', 'month', 'season')
     * @param {Array} params.eventTypes - Tipi eventi da includere (opzionale)
     * @param {boolean} params.userRelevantOnly - Solo eventi rilevanti per l'utente
     * @returns {Object} Lista eventi organizzata
     */
    async execute(params) {
        try {
            console.log('📅 Executing Calendar_FetchUpcomingEvents flow...', params);

            // 1. Validazione parametri
            const validation = this.validateCalendarParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Normalizza periodo di ricerca
            const period = this.normalizePeriod(params);

            // 3. Raccoglie partite programmate
            const upcomingMatches = this.fetchUpcomingMatches(period, params.userRelevantOnly);

            // 4. Raccoglie allenamenti schedulati
            const scheduledTrainings = this.fetchScheduledTrainings(period, params.userRelevantOnly);

            // 5. Raccoglie scadenze trasferimenti
            const transferDeadlines = this.fetchTransferDeadlines(period, params.userRelevantOnly);

            // 6. Raccoglie eventi programmati
            const programmedEvents = this.fetchProgrammedEvents(period, params.userRelevantOnly);

            // 7. Genera eventi automatici previsti
            const automaticEvents = this.generateAutomaticEvents(period);

            // 8. Combina e ordina tutti gli eventi
            const allEvents = this.combineAndSortEvents({
                matches: upcomingMatches,
                trainings: scheduledTrainings,
                transfers: transferDeadlines,
                events: programmedEvents,
                automatic: automaticEvents
            }, params.eventTypes);

            // 9. Categorizza eventi per importanza
            const categorizedEvents = this.categorizeEventsByImportance(allEvents);

            // 10. Genera preview eventi critici
            const criticalEvents = this.identifyCriticalEvents(allEvents, period);

            console.log('✅ Calendar events fetched successfully');

            return {
                success: true,
                period: period,
                totalEvents: allEvents.length,
                events: allEvents,
                categorized: categorizedEvents,
                criticalEvents: criticalEvents,
                summary: this.generateEventsSummary(allEvents)
            };

        } catch (error) {
            console.error('❌ Calendar_FetchUpcomingEvents flow error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateCalendarParams(params) {
        // Verifica date
        if (!params.startDate || !params.endDate) {
            return { isValid: false, error: 'Date inizio e fine richieste' };
        }

        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return { isValid: false, error: 'Date non valide' };
        }

        if (startDate >= endDate) {
            return { isValid: false, error: 'Data inizio deve essere precedente alla data fine' };
        }

        // Verifica periodo ragionevole (max 1 anno)
        const maxPeriod = 365 * 24 * 60 * 60 * 1000; // 1 anno in ms
        if (endDate - startDate > maxPeriod) {
            return { isValid: false, error: 'Periodo troppo ampio (max 1 anno)' };
        }

        // Verifica tipo vista
        const validViewTypes = ['week', 'month', 'season'];
        if (params.viewType && !validViewTypes.includes(params.viewType)) {
            return { isValid: false, error: 'Tipo vista non valido' };
        }

        return { isValid: true };
    }

    normalizePeriod(params) {
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);

        // Aggiusta periodo basato su tipo vista
        switch (params.viewType) {
            case 'week':
                // Assicura che sia esattamente una settimana
                endDate.setTime(startDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                break;
            case 'month':
                // Assicura che sia un mese completo
                endDate.setMonth(startDate.getMonth() + 1);
                endDate.setDate(0); // Ultimo giorno del mese
                break;
        }

        return {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            viewType: params.viewType || 'month',
            daysSpan: Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000))
        };
    }

    fetchUpcomingMatches(period, userRelevantOnly = false) {
        const matches = this.gameManager.gameData.matches || [];
        const userTeam = this.gameManager.gameData.teams?.find(t => t.is_user_team);

        return matches
            .filter(match => {
                const matchDate = new Date(match.match_date);
                const inPeriod = matchDate >= new Date(period.start) && matchDate <= new Date(period.end);
                const isScheduled = match.status === 'scheduled';
                const isUserRelevant = !userRelevantOnly || match.is_user_match;

                return inPeriod && isScheduled && isUserRelevant;
            })
            .map(match => {
                const homeTeam = this.gameManager.gameData.teams?.find(t => t.id === match.home_team_id);
                const awayTeam = this.gameManager.gameData.teams?.find(t => t.id === match.away_team_id);

                return {
                    id: match.id,
                    type: 'match',
                    date: match.match_date,
                    title: `${homeTeam?.short_name || 'HOME'} vs ${awayTeam?.short_name || 'AWAY'}`,
                    description: `Giornata ${match.matchday} - ${homeTeam?.name || 'Casa'} vs ${awayTeam?.name || 'Ospiti'}`,
                    priority: match.is_user_match ? 'high' : 'medium',
                    category: 'match',
                    isUserRelevant: match.is_user_match,
                    metadata: {
                        matchday: match.matchday,
                        homeTeam: homeTeam?.name,
                        awayTeam: awayTeam?.name,
                        venue: 'home', // Semplificato
                        weather: match.weather
                    }
                };
            });
    }

    fetchScheduledTrainings(period, userRelevantOnly = false) {
        const trainings = this.gameManager.gameData.trainings || [];
        const userTeam = this.gameManager.gameData.teams?.find(t => t.is_user_team);

        return trainings
            .filter(training => {
                const trainingDate = new Date(training.training_date);
                const inPeriod = trainingDate >= new Date(period.start) && trainingDate <= new Date(period.end);
                const isScheduled = training.status === 'scheduled';
                const isUserRelevant = !userRelevantOnly || training.team_id === userTeam?.id;

                return inPeriod && isScheduled && isUserRelevant;
            })
            .map(training => ({
                id: training.id,
                type: 'training',
                date: training.training_date,
                title: `Allenamento ${training.training_type}`,
                description: `${training.training_type} - Intensità ${training.intensity} (${training.duration_minutes || 90} min)`,
                priority: 'medium',
                category: 'training',
                isUserRelevant: training.team_id === userTeam?.id,
                metadata: {
                    trainingType: training.training_type,
                    intensity: training.intensity,
                    duration: training.duration_minutes,
                    participants: training.participants?.length || 0,
                    focusArea: training.focus_area
                }
            }));
    }

    fetchTransferDeadlines(period, userRelevantOnly = false) {
        const transfers = this.gameManager.gameData.transfers || [];

        return transfers
            .filter(transfer => {
                if (!transfer.negotiation_deadline) return false;
                
                const deadline = new Date(transfer.negotiation_deadline);
                const inPeriod = deadline >= new Date(period.start) && deadline <= new Date(period.end);
                const isActive = ['negotiating', 'agreed'].includes(transfer.negotiation_status);
                const isUserRelevant = !userRelevantOnly || transfer.is_user_involved;

                return inPeriod && isActive && isUserRelevant;
            })
            .map(transfer => {
                const player = this.gameManager.gameData.players?.find(p => p.id === transfer.player_id);
                const fromTeam = this.gameManager.gameData.teams?.find(t => t.id === transfer.from_team_id);
                const toTeam = this.gameManager.gameData.teams?.find(t => t.id === transfer.to_team_id);

                return {
                    id: transfer.id,
                    type: 'transfer_deadline',
                    date: transfer.negotiation_deadline,
                    title: `Scadenza: ${player?.first_name} ${player?.last_name}`,
                    description: `Trattativa ${fromTeam?.name} → ${toTeam?.name} (€${transfer.transfer_fee?.toLocaleString()})`,
                    priority: transfer.is_user_involved ? 'high' : 'medium',
                    category: 'transfer',
                    isUserRelevant: transfer.is_user_involved,
                    metadata: {
                        playerName: `${player?.first_name} ${player?.last_name}`,
                        fromTeam: fromTeam?.name,
                        toTeam: toTeam?.name,
                        transferFee: transfer.transfer_fee,
                        status: transfer.negotiation_status
                    }
                };
            });
    }

    fetchProgrammedEvents(period, userRelevantOnly = false) {
        const events = this.gameManager.gameData.gameEvents || [];

        return events
            .filter(event => {
                if (!event.expires_at) return false;
                
                const eventDate = new Date(event.expires_at);
                const inPeriod = eventDate >= new Date(period.start) && eventDate <= new Date(period.end);
                const isActive = !event.is_read;
                const isUserRelevant = !userRelevantOnly || event.is_user_relevant;

                return inPeriod && isActive && isUserRelevant;
            })
            .map(event => ({
                id: event.id,
                type: 'game_event',
                date: event.expires_at,
                title: event.title,
                description: event.description,
                priority: this.mapEventPriorityToCalendar(event.priority),
                category: event.event_category,
                isUserRelevant: event.is_user_relevant,
                metadata: {
                    eventType: event.event_type,
                    category: event.event_category,
                    actionRequired: event.action_required,
                    relatedEntity: event.related_entity_type
                }
            }));
    }

    generateAutomaticEvents(period) {
        const automaticEvents = [];
        const currentDate = new Date(this.gameManager.getCurrentDate());
        const startDate = new Date(period.start);
        const endDate = new Date(period.end);

        // Genera eventi automatici previsti
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            // Controlli contrattuali (ogni lunedì)
            if (date.getDay() === 1) {
                automaticEvents.push({
                    id: `auto_contracts_${date.getTime()}`,
                    type: 'automatic',
                    date: date.toISOString(),
                    title: 'Controllo Contratti',
                    description: 'Verifica automatica scadenze contrattuali',
                    priority: 'low',
                    category: 'system',
                    isUserRelevant: false,
                    metadata: {
                        autoType: 'contract_check',
                        frequency: 'weekly'
                    }
                });
            }

            // Aggiornamenti morale (ogni 3 giorni)
            if ((date.getTime() - currentDate.getTime()) % (3 * 24 * 60 * 60 * 1000) === 0) {
                automaticEvents.push({
                    id: `auto_morale_${date.getTime()}`,
                    type: 'automatic',
                    date: date.toISOString(),
                    title: 'Aggiornamento Morale',
                    description: 'Valutazione automatica morale squadra',
                    priority: 'low',
                    category: 'system',
                    isUserRelevant: true,
                    metadata: {
                        autoType: 'morale_update',
                        frequency: 'tri_daily'
                    }
                });
            }

            // Fine mese: report statistiche
            if (date.getDate() === 1) {
                const prevMonth = new Date(date);
                prevMonth.setMonth(prevMonth.getMonth() - 1);
                
                automaticEvents.push({
                    id: `auto_monthly_report_${date.getTime()}`,
                    type: 'automatic',
                    date: date.toISOString(),
                    title: 'Report Mensile',
                    description: `Statistiche e progressi di ${prevMonth.toLocaleDateString('it-IT', { month: 'long' })}`,
                    priority: 'medium',
                    category: 'report',
                    isUserRelevant: true,
                    metadata: {
                        autoType: 'monthly_report',
                        frequency: 'monthly'
                    }
                });
            }
        }

        return automaticEvents;
    }

    combineAndSortEvents(eventGroups, eventTypes = null) {
        let allEvents = [];

        // Combina tutti i gruppi di eventi
        Object.values(eventGroups).forEach(group => {
            allEvents = allEvents.concat(group);
        });

        // Filtra per tipi se specificato
        if (eventTypes && Array.isArray(eventTypes)) {
            allEvents = allEvents.filter(event => eventTypes.includes(event.type));
        }

        // Ordina per data
        allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Aggiungi informazioni aggiuntive
        return allEvents.map((event, index) => ({
            ...event,
            dayOfWeek: new Date(event.date).toLocaleDateString('it-IT', { weekday: 'long' }),
            timeUntil: this.calculateTimeUntil(event.date),
            sortOrder: index
        }));
    }

    categorizeEventsByImportance(events) {
        const categories = {
            critical: [],
            high: [],
            medium: [],
            low: []
        };

        events.forEach(event => {
            switch (event.priority) {
                case 'critical':
                    categories.critical.push(event);
                    break;
                case 'high':
                    categories.high.push(event);
                    break;
                case 'medium':
                    categories.medium.push(event);
                    break;
                default:
                    categories.low.push(event);
            }
        });

        return categories;
    }

    identifyCriticalEvents(events, period) {
        const critical = [];
        const now = new Date();
        const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        events.forEach(event => {
            const eventDate = new Date(event.date);
            
            // Eventi nelle prossime 24 ore
            if (eventDate <= next24Hours && eventDate >= now) {
                critical.push({
                    ...event,
                    urgency: 'immediate',
                    hoursUntil: Math.ceil((eventDate - now) / (60 * 60 * 1000))
                });
            }
            // Eventi ad alta priorità nella prossima settimana
            else if (event.priority === 'high' && eventDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                critical.push({
                    ...event,
                    urgency: 'soon',
                    daysUntil: Math.ceil((eventDate - now) / (24 * 60 * 60 * 1000))
                });
            }
        });

        return critical.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    calculateTimeUntil(eventDate) {
        const now = new Date();
        const event = new Date(eventDate);
        const diffMs = event - now;

        if (diffMs < 0) return 'Passato';

        const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

        if (days > 0) {
            return `${days} giorno${days > 1 ? 'i' : ''}`;
        } else if (hours > 0) {
            return `${hours} ora${hours > 1 ? 'e' : ''}`;
        } else {
            const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));
            return `${minutes} minuto${minutes > 1 ? 'i' : ''}`;
        }
    }

    mapEventPriorityToCalendar(priority) {
        const mapping = {
            5: 'critical',
            4: 'high',
            3: 'medium',
            2: 'medium',
            1: 'low'
        };
        return mapping[priority] || 'low';
    }

    generateEventsSummary(events) {
        const summary = {
            total: events.length,
            byType: {},
            byPriority: {},
            nextEvent: null,
            thisWeek: 0
        };

        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        events.forEach(event => {
            // Conta per tipo
            summary.byType[event.type] = (summary.byType[event.type] || 0) + 1;
            
            // Conta per priorità
            summary.byPriority[event.priority] = (summary.byPriority[event.priority] || 0) + 1;
            
            // Eventi questa settimana
            const eventDate = new Date(event.date);
            if (eventDate >= now && eventDate <= nextWeek) {
                summary.thisWeek++;
            }
        });

        // Prossimo evento
        const upcomingEvents = events.filter(e => new Date(e.date) >= now);
        if (upcomingEvents.length > 0) {
            summary.nextEvent = upcomingEvents[0];
        }

        return summary;
    }
}