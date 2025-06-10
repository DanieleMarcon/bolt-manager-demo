// Core game logic and flow management
export class GameManager {
    constructor() {
        this.currentSession = null;
        this.gameData = {
            teams: [],
            players: [],
            staff: [],
            matches: [],
            userSession: null,
            tactics: [],
            moraleStatus: [],
            trainings: [],
            gameEvents: [],
            matchReports: [],
            transfers: [],
            attributesHistory: []
        };
        this.currentDate = new Date();
    }

    async init() {
        console.log('🎮 GameManager initializing...');
        // Load existing data if available
        this.loadGameData();
    }

    // === PHASE 1: GAME INITIALIZATION ===
    async startNewGame() {
        console.log('🚀 Executing GameFlow_StartNewGame...');
        
        // Step 1: Generate teams
        const teams = this.generateTeams();
        
        // Step 2: Generate players for each team
        const players = this.generatePlayers(teams);
        
        // Step 3: Generate staff for each team
        const staff = this.generateStaff(teams);
        
        // Step 4: Create calendar/matches
        const matches = this.generateMatches(teams);
        
        // Step 5: Create user session
        const userSession = this.createUserSession(teams[0]); // User controls first team
        
        // Step 6: Create default tactics
        const tactics = this.generateDefaultTactics(teams);
        
        // Step 7: Initialize morale status
        const moraleStatus = this.initializeMoraleStatus(teams, players);
        
        // Step 8: Initialize other datasets
        const trainings = [];
        const gameEvents = [];
        const matchReports = [];
        const transfers = [];
        const attributesHistory = [];
        
        // Store game data
        this.gameData = {
            teams,
            players,
            staff,
            matches,
            userSession,
            tactics,
            moraleStatus,
            trainings,
            gameEvents,
            matchReports,
            transfers,
            attributesHistory
        };
        
        // Set current date
        this.currentDate = new Date();
        
        // Save to localStorage for persistence
        this.saveGameData();
        
        console.log('✅ New game created successfully!');
        return this.gameData;
    }

    generateTeams() {
        const teamNames = [
            { name: 'AC Milano', shortName: 'MIL', city: 'Milano' },
            { name: 'Inter Milano', shortName: 'INT', city: 'Milano' },
            { name: 'Juventus FC', shortName: 'JUV', city: 'Torino' },
            { name: 'AS Roma', shortName: 'ROM', city: 'Roma' },
            { name: 'SSC Napoli', shortName: 'NAP', city: 'Napoli' },
            { name: 'ACF Fiorentina', shortName: 'FIO', city: 'Firenze' }
        ];

        return teamNames.map((team, index) => ({
            id: `team_${index + 1}`,
            name: team.name,
            short_name: team.shortName,
            city: team.city,
            league_position: null,
            points: 0,
            matches_played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goals_for: 0,
            goals_against: 0,
            budget: 10000000 + Math.random() * 5000000, // 10-15M budget
            is_user_team: index === 0, // First team is user's team
            formation: '4-4-2',
            team_morale: 50 + Math.random() * 20, // 50-70 initial morale
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));
    }

    generatePlayers(teams) {
        const firstNames = [
            'Marco', 'Luca', 'Andrea', 'Francesco', 'Alessandro', 'Matteo', 'Lorenzo', 'Davide',
            'Simone', 'Federico', 'Gabriele', 'Riccardo', 'Stefano', 'Antonio', 'Giuseppe',
            'Roberto', 'Paolo', 'Fabio', 'Massimo', 'Daniele'
        ];

        const lastNames = [
            'Rossi', 'Bianchi', 'Ferrari', 'Russo', 'Romano', 'Gallo', 'Costa', 'Fontana',
            'Ricci', 'Marino', 'Greco', 'Bruno', 'Galli', 'Conti', 'De Luca', 'Mancini',
            'Lombardi', 'Moretti', 'Barbieri', 'Fontana'
        ];

        const positions = ['GK', 'DEF', 'MID', 'ATT'];
        const positionCounts = { 'GK': 2, 'DEF': 6, 'MID': 6, 'ATT': 6 }; // 20 players per team

        const allPlayers = [];

        teams.forEach(team => {
            let playerIndex = 0;
            
            Object.entries(positionCounts).forEach(([position, count]) => {
                for (let i = 0; i < count; i++) {
                    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                    
                    // Generate age between 18-35
                    const age = 18 + Math.floor(Math.random() * 18);
                    
                    // Generate attributes (1-20 scale, converted to 1-100 for display)
                    const baseRating = 40 + Math.random() * 40; // 40-80 base
                    
                    const player = {
                        id: `${team.id}_player_${playerIndex + 1}`,
                        team_id: team.id,
                        first_name: firstName,
                        last_name: lastName,
                        age: age,
                        position: position,
                        secondary_position: null,
                        overall_rating: Math.round(baseRating),
                        potential: Math.round(baseRating + Math.random() * 20),
                        pace: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        shooting: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        passing: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        dribbling: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        defending: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        physical: Math.round(baseRating + (Math.random() - 0.5) * 20),
                        stamina: 90 + Math.random() * 10,
                        fitness: 90 + Math.random() * 10,
                        morale: 40 + Math.random() * 40,
                        injury_status: 'healthy',
                        injury_days: 0,
                        market_value: Math.round((baseRating * 50000) + Math.random() * 1000000),
                        salary: Math.round((baseRating * 1000) + Math.random() * 5000),
                        contract_expires: new Date(Date.now() + (1 + Math.random() * 4) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                        goals_scored: 0,
                        assists: 0,
                        yellow_cards: 0,
                        red_cards: 0,
                        matches_played: 0,
                        is_captain: playerIndex === 0 && position === 'MID', // First midfielder is captain
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };

                    // Adjust attributes based on position
                    this.adjustPlayerAttributesByPosition(player);
                    
                    allPlayers.push(player);
                    playerIndex++;
                }
            });
        });

        return allPlayers;
    }

    adjustPlayerAttributesByPosition(player) {
        switch (player.position) {
            case 'GK':
                // Goalkeepers: high defending, low shooting/dribbling
                player.defending = Math.min(100, player.defending + 15);
                player.shooting = Math.max(1, player.shooting - 20);
                player.dribbling = Math.max(1, player.dribbling - 10);
                break;
            case 'DEF':
                // Defenders: high defending/physical, lower shooting
                player.defending = Math.min(100, player.defending + 10);
                player.physical = Math.min(100, player.physical + 5);
                player.shooting = Math.max(1, player.shooting - 10);
                break;
            case 'MID':
                // Midfielders: high passing, balanced
                player.passing = Math.min(100, player.passing + 10);
                break;
            case 'ATT':
                // Attackers: high shooting/dribbling, lower defending
                player.shooting = Math.min(100, player.shooting + 15);
                player.dribbling = Math.min(100, player.dribbling + 10);
                player.defending = Math.max(1, player.defending - 15);
                break;
        }

        // Recalculate overall rating based on adjusted attributes
        const avgAttributes = (player.pace + player.shooting + player.passing + 
                             player.dribbling + player.defending + player.physical) / 6;
        player.overall_rating = Math.round(avgAttributes);
    }

    generateStaff(teams) {
        const staffNames = [
            { first: 'Carlo', last: 'Ancelotti' },
            { first: 'Massimiliano', last: 'Allegri' },
            { first: 'Antonio', last: 'Conte' },
            { first: 'Gian Piero', last: 'Gasperini' },
            { first: 'Stefano', last: 'Pioli' },
            { first: 'Simone', last: 'Inzaghi' }
        ];

        const allStaff = [];

        teams.forEach((team, teamIndex) => {
            // Head Coach
            const headCoach = {
                id: `${team.id}_staff_1`,
                team_id: team.id,
                first_name: staffNames[teamIndex].first,
                last_name: staffNames[teamIndex].last,
                age: 45 + Math.random() * 15,
                role: 'head_coach',
                experience_years: 10 + Math.random() * 20,
                coaching_ability: 60 + Math.random() * 30,
                tactical_knowledge: 60 + Math.random() * 30,
                motivational_skills: 60 + Math.random() * 30,
                fitness_expertise: null,
                scouting_ability: null,
                medical_expertise: null,
                specialization: 'general',
                preferred_formation: '4-4-2',
                preferred_style: 'balanced',
                salary: 50000 + Math.random() * 100000,
                contract_expires: new Date(Date.now() + (1 + Math.random() * 3) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                reputation: 60 + Math.random() * 30,
                morale: 60 + Math.random() * 30,
                loyalty: 60 + Math.random() * 30,
                is_head_of_department: true,
                languages: ['Italian', 'English'],
                achievements: [],
                injury_proneness_reduction: 5 + Math.random() * 10,
                training_efficiency_bonus: 5 + Math.random() * 15,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Fitness Coach
            const fitnessCoach = {
                id: `${team.id}_staff_2`,
                team_id: team.id,
                first_name: 'Marco',
                last_name: 'Fitness',
                age: 35 + Math.random() * 15,
                role: 'fitness_coach',
                experience_years: 5 + Math.random() * 15,
                coaching_ability: null,
                tactical_knowledge: null,
                motivational_skills: 50 + Math.random() * 20,
                fitness_expertise: 70 + Math.random() * 25,
                scouting_ability: null,
                medical_expertise: 40 + Math.random() * 20,
                specialization: 'fitness',
                preferred_formation: null,
                preferred_style: null,
                salary: 20000 + Math.random() * 40000,
                contract_expires: new Date(Date.now() + (1 + Math.random() * 3) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                reputation: 50 + Math.random() * 25,
                morale: 60 + Math.random() * 30,
                loyalty: 60 + Math.random() * 30,
                is_head_of_department: false,
                languages: ['Italian'],
                achievements: [],
                injury_proneness_reduction: 10 + Math.random() * 15,
                training_efficiency_bonus: 10 + Math.random() * 20,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            allStaff.push(headCoach, fitnessCoach);
        });

        return allStaff;
    }

    generateMatches(teams) {
        const matches = [];
        let matchId = 1;
        let matchday = 1;

        // Generate round-robin tournament (each team plays each other twice)
        for (let round = 0; round < 2; round++) { // Home and away
            for (let i = 0; i < teams.length; i++) {
                for (let j = i + 1; j < teams.length; j++) {
                    const homeTeam = round === 0 ? teams[i] : teams[j];
                    const awayTeam = round === 0 ? teams[j] : teams[i];

                    const match = {
                        id: `match_${matchId}`,
                        home_team_id: homeTeam.id,
                        away_team_id: awayTeam.id,
                        match_date: new Date(Date.now() + matchday * 7 * 24 * 60 * 60 * 1000).toISOString(),
                        matchday: matchday,
                        status: 'scheduled',
                        home_goals: null,
                        away_goals: null,
                        home_formation: null,
                        away_formation: null,
                        home_lineup: null,
                        away_lineup: null,
                        home_substitutions: null,
                        away_substitutions: null,
                        attendance: null,
                        weather: null,
                        referee: null,
                        match_report_id: null,
                        is_user_match: homeTeam.is_user_team || awayTeam.is_user_team,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };

                    matches.push(match);
                    matchId++;
                    matchday++;
                }
            }
        }

        return matches;
    }

    createUserSession(userTeam) {
        return {
            id: 'session_1',
            session_name: `Carriera con ${userTeam.name}`,
            user_team_id: userTeam.id,
            current_season: 1,
            current_matchday: 1,
            current_date: new Date().toISOString(),
            total_budget: userTeam.budget,
            achievements: [],
            difficulty_level: 'normal',
            game_speed: 'normal',
            auto_save: true,
            last_played: new Date().toISOString(),
            total_playtime: 0,
            is_active: true,
            save_data: JSON.stringify({}), // Will be populated with full game state
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    generateDefaultTactics(teams) {
        const formations = ['4-4-2', '4-3-3', '3-5-2', '4-2-3-1'];
        
        return teams.map(team => ({
            id: `tactics_${team.id}`,
            team_id: team.id,
            tactic_name: 'Default Formation',
            formation: formations[Math.floor(Math.random() * formations.length)],
            mentality: 'balanced',
            tempo: 'normal',
            width: 'normal',
            pressing: 'medium',
            defensive_line: 'normal',
            passing_style: 'mixed',
            crossing: 'normal',
            player_positions: [],
            player_roles: [],
            set_pieces: [],
            captain_id: null,
            penalty_taker_id: null,
            free_kick_taker_id: null,
            corner_taker_id: null,
            is_default: true,
            effectiveness_rating: null,
            matches_used: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));
    }

    initializeMoraleStatus(teams, players) {
        const moraleStatuses = [];

        // Team morale status
        teams.forEach(team => {
            moraleStatuses.push({
                id: `morale_team_${team.id}`,
                entity_type: 'team',
                entity_id: team.id,
                current_morale: team.team_morale,
                base_morale: 50,
                recent_results_impact: 0,
                playing_time_impact: null,
                training_impact: 0,
                transfer_impact: 0,
                injury_impact: 0,
                contract_impact: null,
                team_chemistry_impact: 0,
                manager_relationship: null,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: 'stable',
                last_significant_event: null,
                event_date: null,
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });

        // Player morale status
        players.forEach(player => {
            moraleStatuses.push({
                id: `morale_player_${player.id}`,
                entity_type: 'player',
                entity_id: player.id,
                current_morale: player.morale,
                base_morale: 50,
                recent_results_impact: 0,
                playing_time_impact: 0,
                training_impact: 0,
                transfer_impact: 0,
                injury_impact: 0,
                contract_impact: 0,
                team_chemistry_impact: 0,
                manager_relationship: 0,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: 'stable',
                last_significant_event: null,
                event_date: null,
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });

        return moraleStatuses;
    }

    // === PHASE 2: TRAINING AND CALENDAR ===
    async executePlayerTrain(params) {
        console.log('🏃 Executing Player_Train flow...');
        
        const { playerIds, trainingType, intensity, teamId } = params;
        
        // Create training record
        const trainingRecord = {
            id: `training_${Date.now()}`,
            team_id: teamId,
            training_date: this.currentDate.toISOString(),
            training_type: trainingType,
            intensity: intensity.toString(),
            focus_area: trainingType,
            duration_minutes: 90,
            participants: playerIds,
            individual_programs: [],
            staff_id: null,
            weather_conditions: 'normal',
            facility_quality: 75,
            injury_risk: this.calculateInjuryRisk(intensity),
            morale_impact: this.calculateMoraleImpact(trainingType, intensity),
            fitness_gain: this.calculateFitnessGain(intensity),
            skill_improvements: [],
            injuries_occurred: [],
            status: 'completed',
            notes: `Allenamento ${trainingType} completato con intensità ${intensity}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Process each player
        const results = [];
        
        for (const playerId of playerIds) {
            const player = this.gameData.players.find(p => p.id === playerId);
            if (!player || player.injury_status !== 'healthy') continue;

            const result = {
                playerId: playerId,
                attributeChanges: {},
                fitnessChange: 0,
                moraleChange: 0,
                injury: null
            };

            // Calculate attribute improvements
            const improvements = this.calculateAttributeImprovements(player, trainingType, intensity);
            result.attributeChanges = improvements;

            // Apply improvements to player
            Object.entries(improvements).forEach(([attribute, change]) => {
                if (player[attribute] !== undefined) {
                    player[attribute] = Math.min(100, player[attribute] + change);
                }
            });

            // Calculate fitness change
            const fitnessChange = this.calculateFitnessChange(intensity);
            result.fitnessChange = fitnessChange;
            player.fitness = Math.max(0, Math.min(100, player.fitness + fitnessChange));

            // Calculate morale change
            const moraleChange = this.calculatePlayerMoraleChange(trainingType, intensity);
            result.moraleChange = moraleChange;
            player.morale = Math.max(0, Math.min(100, player.morale + moraleChange));

            // Check for injuries
            if (Math.random() < (trainingRecord.injury_risk / 100)) {
                const injury = this.generateInjury(intensity);
                result.injury = injury;
                player.injury_status = injury.severity;
                player.injury_days = injury.days;
                trainingRecord.injuries_occurred.push({
                    player_id: playerId,
                    injury_type: injury.type,
                    severity: injury.severity,
                    days: injury.days
                });
            }

            // Update player timestamp
            player.updated_at = new Date().toISOString();

            // Create attribute history record
            if (Object.keys(improvements).length > 0) {
                const historyRecord = {
                    id: `history_${playerId}_${Date.now()}`,
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
                    training_id: trainingRecord.id,
                    match_id: null,
                    attribute_changes: improvements,
                    season: 1,
                    player_age_at_time: player.age,
                    is_significant_change: Object.values(improvements).some(change => Math.abs(change) >= 2),
                    created_at: new Date().toISOString()
                };

                this.gameData.attributesHistory.push(historyRecord);
            }

            results.push(result);
        }

        // Add training record to game data
        this.gameData.trainings.push(trainingRecord);

        // Save game data
        this.saveGameData();

        return { trainingRecord, results };
    }

    calculateAttributeImprovements(player, trainingType, intensity) {
        const improvements = {};
        const baseImprovement = intensity * 0.5; // 0.5 to 2.5 base improvement

        switch (trainingType) {
            case 'fitness':
                if (Math.random() < 0.7) improvements.physical = Math.round(baseImprovement + Math.random());
                if (Math.random() < 0.5) improvements.pace = Math.round(baseImprovement * 0.5);
                break;
            case 'technical':
                if (Math.random() < 0.7) improvements.dribbling = Math.round(baseImprovement + Math.random());
                if (Math.random() < 0.6) improvements.passing = Math.round(baseImprovement * 0.8);
                if (Math.random() < 0.4) improvements.shooting = Math.round(baseImprovement * 0.6);
                break;
            case 'tactical':
                if (Math.random() < 0.6) improvements.passing = Math.round(baseImprovement + Math.random());
                if (Math.random() < 0.5) improvements.defending = Math.round(baseImprovement * 0.7);
                break;
        }

        return improvements;
    }

    calculateInjuryRisk(intensity) {
        return Math.min(15, intensity * 2 + Math.random() * 5);
    }

    calculateMoraleImpact(trainingType, intensity) {
        return Math.round((intensity - 3) * 2 + (Math.random() - 0.5) * 4);
    }

    calculateFitnessGain(intensity) {
        return Math.round(intensity * 1.5 + Math.random() * 2);
    }

    calculateFitnessChange(intensity) {
        // Higher intensity = more fitness loss during training
        return Math.round(-intensity * 0.5 + Math.random() * 2);
    }

    calculatePlayerMoraleChange(trainingType, intensity) {
        // Moderate intensity is best for morale
        const optimalIntensity = 3;
        const deviation = Math.abs(intensity - optimalIntensity);
        return Math.round(-deviation + Math.random() * 3);
    }

    generateInjury(intensity) {
        const injuryTypes = ['muscle_strain', 'minor_knock', 'fatigue'];
        const severities = ['minor', 'moderate'];
        
        const type = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        const days = severity === 'minor' ? 1 + Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 7);
        
        return {
            type,
            severity,
            days,
            description: `${type.replace('_', ' ')} (${severity})`
        };
    }

    scheduleTraining(params) {
        const { playerIds, type, intensity, teamId, date } = params;
        
        const training = {
            id: `training_scheduled_${Date.now()}`,
            team_id: teamId,
            training_date: date,
            training_type: type,
            intensity: intensity.toString(),
            focus_area: type,
            duration_minutes: 90,
            participants: playerIds,
            individual_programs: [],
            staff_id: null,
            weather_conditions: null,
            facility_quality: 75,
            injury_risk: this.calculateInjuryRisk(intensity),
            morale_impact: null,
            fitness_gain: null,
            skill_improvements: [],
            injuries_occurred: [],
            status: 'scheduled',
            notes: `Allenamento ${type} programmato`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.gameData.trainings.push(training);
        this.saveGameData();

        return training;
    }

    async executeAdvanceDay(days = 1) {
        console.log(`📅 Executing GameFlow_AdvanceDay (${days} days)...`);
        
        const eventsGenerated = [];
        
        for (let i = 0; i < days; i++) {
            // Advance current date
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            
            // Process scheduled trainings for this date
            const todayTrainings = this.gameData.trainings.filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate.toDateString() === this.currentDate.toDateString() && 
                       training.status === 'scheduled';
            });

            for (const training of todayTrainings) {
                try {
                    const result = await this.executePlayerTrain({
                        playerIds: training.participants,
                        trainingType: training.training_type,
                        intensity: parseInt(training.intensity),
                        teamId: training.team_id
                    });

                    // Update training status
                    training.status = 'completed';
                    training.updated_at = new Date().toISOString();

                    eventsGenerated.push({
                        type: 'training',
                        title: 'Allenamento Completato',
                        description: `Allenamento ${training.training_type} completato`,
                        priority: 2
                    });
                } catch (error) {
                    console.error('Error executing scheduled training:', error);
                }
            }

            // Update player recovery
            this.gameData.players.forEach(player => {
                if (player.injury_days > 0) {
                    player.injury_days--;
                    if (player.injury_days === 0) {
                        player.injury_status = 'healthy';
                        eventsGenerated.push({
                            type: 'recovery',
                            title: 'Giocatore Recuperato',
                            description: `${player.first_name} ${player.last_name} è tornato disponibile`,
                            priority: 3
                        });
                    }
                }

                // Natural fitness recovery
                if (player.fitness < 100) {
                    player.fitness = Math.min(100, player.fitness + 1 + Math.random() * 2);
                }

                player.updated_at = new Date().toISOString();
            });

            // Generate random events
            if (Math.random() < 0.1) { // 10% chance per day
                const randomEvent = this.generateRandomEvent();
                if (randomEvent) {
                    eventsGenerated.push(randomEvent);
                    this.gameData.gameEvents.push({
                        id: `event_${Date.now()}_${Math.random()}`,
                        event_type: randomEvent.type,
                        event_category: 'info',
                        title: randomEvent.title,
                        description: randomEvent.description,
                        related_entity_type: null,
                        related_entity_id: null,
                        team_id: null,
                        player_id: null,
                        match_id: null,
                        priority: randomEvent.priority,
                        is_read: false,
                        is_user_relevant: true,
                        auto_generated: true,
                        expires_at: null,
                        action_required: false,
                        action_type: null,
                        action_data: null,
                        event_date: new Date().toISOString(),
                        game_date: this.currentDate.toISOString(),
                        created_at: new Date().toISOString()
                    });
                }
            }
        }

        // Update user session
        if (this.gameData.userSession) {
            this.gameData.userSession.current_date = this.currentDate.toISOString();
            this.gameData.userSession.updated_at = new Date().toISOString();
        }

        // Save game data
        this.saveGameData();

        return {
            newDate: this.currentDate.toISOString(),
            eventsGenerated
        };
    }

    generateRandomEvent() {
        const eventTypes = [
            { type: 'news', title: 'Notizie di Mercato', description: 'Voci di mercato interessanti', priority: 1 },
            { type: 'weather', title: 'Condizioni Meteo', description: 'Previsioni per le prossime partite', priority: 1 },
            { type: 'training', title: 'Aggiornamento Allenamenti', description: 'Nuove metodologie di allenamento disponibili', priority: 2 }
        ];

        const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        return randomEvent;
    }

    // === PHASE 3: TACTICS AND MATCHES ===
    async updateTactics(params) {
        console.log('⚙️ Executing Tactics_Update flow...');
        
        const {
            teamId,
            formation,
            mentality,
            tempo,
            width,
            pressing,
            defensiveLine,
            passingStyle,
            crossing,
            playerPositions,
            playerRoles,
            setPieces,
            captainId,
            penaltyTakerId,
            freeKickTakerId,
            cornerTakerId,
            tacticName
        } = params;

        // Find existing tactics or create new
        let tactics = this.gameData.tactics.find(t => t.team_id === teamId && t.is_default);
        
        if (!tactics) {
            tactics = {
                id: `tactics_${teamId}_${Date.now()}`,
                team_id: teamId,
                tactic_name: tacticName || 'Tattica Principale',
                formation,
                mentality,
                tempo,
                width,
                pressing,
                defensive_line: defensiveLine,
                passing_style: passingStyle,
                crossing,
                player_positions: playerPositions,
                player_roles: playerRoles,
                set_pieces: setPieces,
                captain_id: captainId,
                penalty_taker_id: penaltyTakerId,
                free_kick_taker_id: freeKickTakerId,
                corner_taker_id: cornerTakerId,
                is_default: true,
                effectiveness_rating: this.calculateTacticalEffectiveness(params),
                matches_used: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            this.gameData.tactics.push(tactics);
        } else {
            // Update existing tactics
            tactics.formation = formation;
            tactics.mentality = mentality;
            tactics.tempo = tempo;
            tactics.width = width;
            tactics.pressing = pressing;
            tactics.defensive_line = defensiveLine;
            tactics.passing_style = passingStyle;
            tactics.crossing = crossing;
            tactics.player_positions = playerPositions;
            tactics.player_roles = playerRoles;
            tactics.set_pieces = setPieces;
            tactics.captain_id = captainId;
            tactics.penalty_taker_id = penaltyTakerId;
            tactics.free_kick_taker_id = freeKickTakerId;
            tactics.corner_taker_id = cornerTakerId;
            tactics.effectiveness_rating = this.calculateTacticalEffectiveness(params);
            tactics.updated_at = new Date().toISOString();
        }

        // Update team formation
        const team = this.gameData.teams.find(t => t.id === teamId);
        if (team) {
            team.formation = formation;
            team.updated_at = new Date().toISOString();
        }

        // Save game data
        this.saveGameData();

        return tactics;
    }

    calculateTacticalEffectiveness(params) {
        let effectiveness = 50; // Base effectiveness

        // Formation balance
        effectiveness += 10;

        // Player assignments
        const assignedCount = params.playerPositions?.filter(pos => pos.playerId).length || 0;
        effectiveness += (assignedCount / 11) * 20;

        // Tactical coherence
        if (params.mentality === 'attacking' && params.tempo === 'fast') {
            effectiveness += 5;
        }
        if (params.mentality === 'defensive' && params.pressing === 'low') {
            effectiveness += 5;
        }

        return Math.min(100, Math.max(0, Math.round(effectiveness)));
    }

    async simulateMatch(matchId) {
        console.log('⚽ Executing Match_Simulate flow...');
        
        const match = this.gameData.matches.find(m => m.id === matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        // Get teams and their data
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
        
        const homePlayers = this.getPlayersByTeam(match.home_team_id)
            .filter(p => p.injury_status === 'healthy')
            .sort((a, b) => b.overall_rating - a.overall_rating)
            .slice(0, 11);
            
        const awayPlayers = this.getPlayersByTeam(match.away_team_id)
            .filter(p => p.injury_status === 'healthy')
            .sort((a, b) => b.overall_rating - a.overall_rating)
            .slice(0, 11);

        // Calculate team strengths
        const homeStrength = this.calculateTeamStrength(homePlayers, homeTeam);
        const awayStrength = this.calculateTeamStrength(awayPlayers, awayTeam);

        // Simulate match events
        const events = [];
        const stats = {
            home_possession: 45 + Math.random() * 10,
            away_possession: 45 + Math.random() * 10,
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

        let homeGoals = 0;
        let awayGoals = 0;

        // Simulate 90 minutes
        for (let minute = 1; minute <= 90; minute++) {
            // Generate random events
            if (Math.random() < 0.15) { // 15% chance per minute
                const event = this.generateMatchEvent(minute, homeStrength, awayStrength, homePlayers, awayPlayers);
                if (event) {
                    events.push(event);
                    
                    // Update stats based on event
                    if (event.type === 'goal') {
                        if (event.team === 'home') {
                            homeGoals++;
                        } else {
                            awayGoals++;
                        }
                    } else if (event.type === 'shot') {
                        if (event.team === 'home') {
                            stats.home_shots++;
                            if (Math.random() < 0.4) stats.home_shots_on_target++;
                        } else {
                            stats.away_shots++;
                            if (Math.random() < 0.4) stats.away_shots_on_target++;
                        }
                    } else if (event.type === 'corner') {
                        if (event.team === 'home') {
                            stats.home_corners++;
                        } else {
                            stats.away_corners++;
                        }
                    } else if (event.type === 'foul') {
                        if (event.team === 'home') {
                            stats.home_fouls++;
                        } else {
                            stats.away_fouls++;
                        }
                    } else if (event.type === 'yellow_card') {
                        if (event.team === 'home') {
                            stats.home_yellow_cards++;
                        } else {
                            stats.away_yellow_cards++;
                        }
                    }
                }
            }
        }

        // Normalize possession
        const totalPossession = stats.home_possession + stats.away_possession;
        stats.home_possession = Math.round((stats.home_possession / totalPossession) * 100);
        stats.away_possession = 100 - stats.home_possession;

        // Generate additional stats
        stats.home_passes = Math.round(stats.home_possession * 5 + Math.random() * 100);
        stats.away_passes = Math.round(stats.away_possession * 5 + Math.random() * 100);

        // Update match
        match.status = 'finished';
        match.home_goals = homeGoals;
        match.away_goals = awayGoals;
        match.home_formation = homeTeam.formation || '4-4-2';
        match.away_formation = awayTeam.formation || '4-4-2';
        match.home_lineup = homePlayers.map(p => p.id);
        match.away_lineup = awayPlayers.map(p => p.id);
        match.attendance = 20000 + Math.random() * 30000;
        match.weather = ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)];
        match.referee = 'Arbitro ' + Math.floor(Math.random() * 100);
        match.updated_at = new Date().toISOString();

        // Update team standings
        this.updateTeamStandings(homeTeam, awayTeam, homeGoals, awayGoals);

        // Update player statistics
        this.updatePlayerStatistics(homePlayers, awayPlayers, events);

        // Generate match report
        const matchReport = await this.generateMatchReport(match, events, stats, homePlayers, awayPlayers);

        // Update morale based on result
        this.updatePostMatchMorale(homeTeam, awayTeam, homeGoals, awayGoals);

        // Save game data
        this.saveGameData();

        return { match, events, stats, matchReport };
    }

    calculateTeamStrength(players, team) {
        const avgRating = players.reduce((sum, p) => sum + p.overall_rating, 0) / players.length;
        const moraleBonus = (team.team_morale - 50) * 0.2;
        return avgRating + moraleBonus;
    }

    generateMatchEvent(minute, homeStrength, awayStrength, homePlayers, awayPlayers) {
        const eventTypes = ['shot', 'corner', 'foul', 'goal', 'yellow_card'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        // Determine which team based on strength
        const strengthRatio = homeStrength / (homeStrength + awayStrength);
        const isHome = Math.random() < strengthRatio;
        
        const players = isHome ? homePlayers : awayPlayers;
        const randomPlayer = players[Math.floor(Math.random() * players.length)];

        switch (eventType) {
            case 'goal':
                if (Math.random() < 0.03) { // 3% chance for goal
                    return {
                        minute,
                        type: 'goal',
                        team: isHome ? 'home' : 'away',
                        player_id: randomPlayer.id,
                        player_name: `${randomPlayer.first_name} ${randomPlayer.last_name}`,
                        description: `⚽ Gol di ${randomPlayer.first_name} ${randomPlayer.last_name}!`
                    };
                }
                break;
            case 'shot':
                return {
                    minute,
                    type: 'shot',
                    team: isHome ? 'home' : 'away',
                    player_id: randomPlayer.id,
                    player_name: `${randomPlayer.first_name} ${randomPlayer.last_name}`,
                    description: `🎯 Tiro di ${randomPlayer.first_name} ${randomPlayer.last_name}`
                };
            case 'corner':
                return {
                    minute,
                    type: 'corner',
                    team: isHome ? 'home' : 'away',
                    description: `📐 Calcio d'angolo per ${isHome ? 'casa' : 'ospiti'}`
                };
            case 'foul':
                return {
                    minute,
                    type: 'foul',
                    team: isHome ? 'home' : 'away',
                    player_id: randomPlayer.id,
                    player_name: `${randomPlayer.first_name} ${randomPlayer.last_name}`,
                    description: `⚠️ Fallo di ${randomPlayer.first_name} ${randomPlayer.last_name}`
                };
            case 'yellow_card':
                if (Math.random() < 0.02) { // 2% chance for card
                    return {
                        minute,
                        type: 'yellow_card',
                        team: isHome ? 'home' : 'away',
                        player_id: randomPlayer.id,
                        player_name: `${randomPlayer.first_name} ${randomPlayer.last_name}`,
                        description: `🟨 Cartellino giallo per ${randomPlayer.first_name} ${randomPlayer.last_name}`
                    };
                }
                break;
        }

        return null;
    }

    updateTeamStandings(homeTeam, awayTeam, homeGoals, awayGoals) {
        homeTeam.matches_played++;
        awayTeam.matches_played++;
        
        homeTeam.goals_for += homeGoals;
        homeTeam.goals_against += awayGoals;
        awayTeam.goals_for += awayGoals;
        awayTeam.goals_against += homeGoals;

        if (homeGoals > awayGoals) {
            homeTeam.wins++;
            homeTeam.points += 3;
            awayTeam.losses++;
        } else if (awayGoals > homeGoals) {
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

    updatePlayerStatistics(homePlayers, awayPlayers, events) {
        const allPlayers = [...homePlayers, ...awayPlayers];
        
        // Update matches played
        allPlayers.forEach(player => {
            player.matches_played++;
            player.updated_at = new Date().toISOString();
        });

        // Update stats based on events
        events.forEach(event => {
            if (event.player_id) {
                const player = allPlayers.find(p => p.id === event.player_id);
                if (player) {
                    switch (event.type) {
                        case 'goal':
                            player.goals_scored++;
                            break;
                        case 'yellow_card':
                            player.yellow_cards++;
                            break;
                        case 'red_card':
                            player.red_cards++;
                            break;
                    }
                }
            }
        });
    }

    async generateMatchReport(match, events, stats, homePlayers, awayPlayers) {
        console.log('📊 Executing Match_GenerateReport flow...');
        
        const allPlayers = [...homePlayers, ...awayPlayers];
        
        // Generate player ratings
        const playerRatings = allPlayers.map(player => {
            const baseRating = 5.5 + Math.random() * 2; // 5.5-7.5 base
            
            // Bonus for goals/assists
            let bonus = 0;
            events.forEach(event => {
                if (event.player_id === player.id && event.type === 'goal') {
                    bonus += 1.5;
                }
            });
            
            const finalRating = Math.min(10, Math.max(1, baseRating + bonus));
            
            return {
                player_id: player.id,
                player_name: `${player.first_name} ${player.last_name}`,
                position: player.position,
                rating: Math.round(finalRating * 10) / 10
            };
        });

        // Find man of the match
        const manOfTheMatch = playerRatings.reduce((best, current) => 
            current.rating > best.rating ? current : best
        );

        // Generate key moments
        const keyMoments = events
            .filter(event => ['goal', 'red_card', 'penalty'].includes(event.type))
            .map(event => ({
                minute: event.minute,
                type: event.type,
                description: event.description,
                importance: event.type === 'goal' ? 'high' : 'medium'
            }));

        // Generate tactical analysis
        const tacticalAnalysis = this.generateTacticalAnalysis(match, stats, events);

        const matchReport = {
            id: `report_${match.id}`,
            match_id: match.id,
            match_events: events,
            home_possession: stats.home_possession,
            away_possession: stats.away_possession,
            home_shots: stats.home_shots,
            away_shots: stats.away_shots,
            home_shots_on_target: stats.home_shots_on_target,
            away_shots_on_target: stats.away_shots_on_target,
            home_corners: stats.home_corners,
            away_corners: stats.away_corners,
            home_fouls: stats.home_fouls,
            away_fouls: stats.away_fouls,
            home_yellow_cards: stats.home_yellow_cards,
            away_yellow_cards: stats.away_yellow_cards,
            home_red_cards: stats.home_red_cards,
            away_red_cards: stats.away_red_cards,
            home_passes: stats.home_passes,
            away_passes: stats.away_passes,
            home_pass_accuracy: stats.home_pass_accuracy,
            away_pass_accuracy: stats.away_pass_accuracy,
            player_ratings: playerRatings,
            man_of_the_match: manOfTheMatch.player_id,
            key_moments: keyMoments,
            tactical_analysis: tacticalAnalysis,
            weather_impact: this.getWeatherImpact(match.weather),
            referee_performance: 6 + Math.random() * 3,
            attendance_impact: 'Supporto positivo del pubblico di casa',
            injury_time_home: Math.floor(Math.random() * 4),
            injury_time_away: Math.floor(Math.random() * 4),
            created_at: new Date().toISOString()
        };

        // Update match with report reference
        match.match_report_id = matchReport.id;

        // Add to game data
        this.gameData.matchReports.push(matchReport);

        return matchReport;
    }

    generateTacticalAnalysis(match, stats, events) {
        const homeGoals = match.home_goals;
        const awayGoals = match.away_goals;
        
        let analysis = '';
        
        if (homeGoals > awayGoals) {
            analysis = 'La squadra di casa ha dominato la partita con un gioco offensivo efficace. ';
        } else if (awayGoals > homeGoals) {
            analysis = 'Gli ospiti hanno saputo sfruttare le loro occasioni meglio della squadra di casa. ';
        } else {
            analysis = 'Partita equilibrata con entrambe le squadre che hanno avuto le loro occasioni. ';
        }

        if (stats.home_possession > 60) {
            analysis += 'Il controllo del possesso palla è stato determinante per il risultato finale.';
        } else if (stats.away_possession > 60) {
            analysis += 'Gli ospiti hanno controllato il gioco per gran parte della partita.';
        } else {
            analysis += 'Il possesso palla è stato equamente distribuito tra le due squadre.';
        }

        return analysis;
    }

    getWeatherImpact(weather) {
        const impacts = {
            'sunny': 'Condizioni ideali per il gioco',
            'cloudy': 'Condizioni normali senza particolari influenze',
            'rainy': 'La pioggia ha reso il terreno scivoloso influenzando il gioco'
        };
        return impacts[weather] || 'Condizioni normali';
    }

    updatePostMatchMorale(homeTeam, awayTeam, homeGoals, awayGoals) {
        let homeMoraleChange = 0;
        let awayMoraleChange = 0;

        if (homeGoals > awayGoals) {
            homeMoraleChange = 5 + Math.random() * 5; // +5 to +10
            awayMoraleChange = -(3 + Math.random() * 4); // -3 to -7
        } else if (awayGoals > homeGoals) {
            awayMoraleChange = 5 + Math.random() * 5;
            homeMoraleChange = -(3 + Math.random() * 4);
        } else {
            homeMoraleChange = 1 + Math.random() * 2; // +1 to +3
            awayMoraleChange = 1 + Math.random() * 2;
        }

        // Update team morale
        homeTeam.team_morale = Math.max(0, Math.min(100, homeTeam.team_morale + homeMoraleChange));
        awayTeam.team_morale = Math.max(0, Math.min(100, awayTeam.team_morale + awayMoraleChange));

        // Update player morale
        const homePlayers = this.getPlayersByTeam(homeTeam.id);
        const awayPlayers = this.getPlayersByTeam(awayTeam.id);

        homePlayers.forEach(player => {
            player.morale = Math.max(0, Math.min(100, player.morale + homeMoraleChange));
            player.updated_at = new Date().toISOString();
        });

        awayPlayers.forEach(player => {
            player.morale = Math.max(0, Math.min(100, player.morale + awayMoraleChange));
            player.updated_at = new Date().toISOString();
        });
    }

    // === PHASE 4: SESSION MANAGEMENT ===
    async saveSession(sessionName = null, slotId = null) {
        console.log('💾 Executing Session_Save flow...');
        
        try {
            // Create session data snapshot
            const sessionData = {
                teams: this.gameData.teams,
                players: this.gameData.players,
                staff: this.gameData.staff,
                matches: this.gameData.matches,
                tactics: this.gameData.tactics,
                moraleStatus: this.gameData.moraleStatus,
                trainings: this.gameData.trainings,
                gameEvents: this.gameData.gameEvents,
                matchReports: this.gameData.matchReports,
                transfers: this.gameData.transfers,
                attributesHistory: this.gameData.attributesHistory,
                currentDate: this.currentDate.toISOString()
            };

            // Create or update user session
            let userSession = this.gameData.userSession;
            if (!userSession) {
                const userTeam = this.getUserTeam();
                userSession = this.createUserSession(userTeam);
                this.gameData.userSession = userSession;
            }

            // Update session metadata
            userSession.session_name = sessionName || userSession.session_name;
            userSession.current_date = this.currentDate.toISOString();
            userSession.last_played = new Date().toISOString();
            userSession.save_data = JSON.stringify(sessionData);
            userSession.updated_at = new Date().toISOString();

            // Save to localStorage
            this.saveGameData();

            console.log('✅ Session saved successfully');
            return {
                success: true,
                sessionId: userSession.id,
                sessionName: userSession.session_name,
                saveDate: userSession.updated_at
            };

        } catch (error) {
            console.error('Error saving session:', error);
            throw new Error('Errore durante il salvataggio: ' + error.message);
        }
    }

    async loadSession(sessionId) {
        console.log('📂 Executing Session_Load flow...');
        
        try {
            // Load from localStorage
            const savedData = this.loadGameData();
            if (!savedData || !savedData.userSession) {
                throw new Error('Nessuna sessione trovata');
            }

            // Verify session integrity
            if (!savedData.userSession.save_data) {
                throw new Error('Dati sessione corrotti');
            }

            // Deserialize session data
            const sessionData = JSON.parse(savedData.userSession.save_data);
            
            // Restore game state
            this.gameData = {
                teams: sessionData.teams || [],
                players: sessionData.players || [],
                staff: sessionData.staff || [],
                matches: sessionData.matches || [],
                userSession: savedData.userSession,
                tactics: sessionData.tactics || [],
                moraleStatus: sessionData.moraleStatus || [],
                trainings: sessionData.trainings || [],
                gameEvents: sessionData.gameEvents || [],
                matchReports: sessionData.matchReports || [],
                transfers: sessionData.transfers || [],
                attributesHistory: sessionData.attributesHistory || []
            };

            // Restore current date
            if (sessionData.currentDate) {
                this.currentDate = new Date(sessionData.currentDate);
            }

            // Update last played
            this.gameData.userSession.last_played = new Date().toISOString();
            this.gameData.userSession.is_active = true;

            // Save updated session
            this.saveGameData();

            console.log('✅ Session loaded successfully');
            return {
                success: true,
                sessionData: this.gameData,
                currentDate: this.currentDate.toISOString()
            };

        } catch (error) {
            console.error('Error loading session:', error);
            throw new Error('Errore durante il caricamento: ' + error.message);
        }
    }

    getSavedSessions() {
        try {
            const savedData = localStorage.getItem('boltManager_gameData');
            if (!savedData) return [];

            const gameData = JSON.parse(savedData);
            if (!gameData.userSession) return [];

            return [{
                id: gameData.userSession.id,
                session_name: gameData.userSession.session_name,
                user_team_name: this.getUserTeam()?.name || 'Squadra Sconosciuta',
                current_season: gameData.userSession.current_season,
                current_matchday: gameData.userSession.current_matchday,
                current_date: gameData.userSession.current_date,
                last_played: gameData.userSession.last_played,
                total_playtime: gameData.userSession.total_playtime,
                is_active: gameData.userSession.is_active
            }];
        } catch (error) {
            console.error('Error getting saved sessions:', error);
            return [];
        }
    }

    // === UTILITY METHODS ===
    saveGameData() {
        try {
            localStorage.setItem('boltManager_gameData', JSON.stringify(this.gameData));
            localStorage.setItem('boltManager_currentSession', JSON.stringify(this.gameData.userSession));
            console.log('💾 Game data saved to localStorage');
        } catch (error) {
            console.error('Error saving game data:', error);
        }
    }

    loadGameData() {
        try {
            const savedData = localStorage.getItem('boltManager_gameData');
            if (savedData) {
                this.gameData = JSON.parse(savedData);
                
                // Restore current date if available
                if (this.gameData.userSession?.current_date) {
                    this.currentDate = new Date(this.gameData.userSession.current_date);
                }
                
                console.log('📂 Game data loaded from localStorage');
                return this.gameData;
            }
        } catch (error) {
            console.error('Error loading game data:', error);
        }
        return null;
    }

    getCurrentSession() {
        try {
            const savedSession = localStorage.getItem('boltManager_currentSession');
            if (savedSession) {
                return JSON.parse(savedSession);
            }
        } catch (error) {
            console.error('Error loading current session:', error);
        }
        return null;
    }

    getCurrentDate() {
        return this.currentDate.toISOString();
    }

    getUserTeam() {
        return this.gameData.teams.find(team => team.is_user_team);
    }

    getUserPlayers() {
        const userTeam = this.getUserTeam();
        if (!userTeam) return [];
        
        return this.gameData.players.filter(player => player.team_id === userTeam.id);
    }

    getPlayersByTeam(teamId) {
        return this.gameData.players.filter(player => player.team_id === teamId);
    }

    getTeamMorale(teamId) {
        return this.gameData.moraleStatus.find(status => 
            status.entity_type === 'team' && status.entity_id === teamId
        );
    }

    getPlayerMorale(playerId) {
        return this.gameData.moraleStatus.find(status => 
            status.entity_type === 'player' && status.entity_id === playerId
        );
    }

    getTeamTactics(teamId) {
        return this.gameData.tactics.find(tactics => 
            tactics.team_id === teamId && tactics.is_default
        );
    }

    getUpcomingMatches(teamId, limit = 5) {
        const currentDate = new Date(this.getCurrentDate());
        return this.gameData.matches
            .filter(match => 
                (match.home_team_id === teamId || match.away_team_id === teamId) &&
                match.status === 'scheduled' &&
                new Date(match.match_date) >= currentDate
            )
            .sort((a, b) => new Date(a.match_date) - new Date(b.match_date))
            .slice(0, limit);
    }

    getRecentMatches(teamId, limit = 5) {
        return this.gameData.matches
            .filter(match => 
                (match.home_team_id === teamId || match.away_team_id === teamId) &&
                match.status === 'finished'
            )
            .sort((a, b) => new Date(b.match_date) - new Date(a.match_date))
            .slice(0, limit);
    }

    getMatchReport(matchId) {
        return this.gameData.matchReports.find(report => report.match_id === matchId);
    }

    getUpcomingEvents(days = 7) {
        const currentDate = new Date(this.getCurrentDate());
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + days);

        const events = [];

        // Add matches
        this.gameData.matches
            .filter(match => {
                const matchDate = new Date(match.match_date);
                return matchDate >= currentDate && matchDate <= endDate && match.is_user_match;
            })
            .forEach(match => {
                const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
                const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
                
                events.push({
                    type: 'match',
                    date: match.match_date,
                    title: `${homeTeam?.short_name || 'HOME'} vs ${awayTeam?.short_name || 'AWAY'}`,
                    description: `Giornata ${match.matchday}`,
                    priority: 4
                });
            });

        // Add trainings
        this.gameData.trainings
            .filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate >= currentDate && trainingDate <= endDate && training.status === 'scheduled';
            })
            .forEach(training => {
                events.push({
                    type: 'training',
                    date: training.training_date,
                    title: `Allenamento ${training.training_type}`,
                    description: `Intensità ${training.intensity}`,
                    priority: 2
                });
            });

        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}