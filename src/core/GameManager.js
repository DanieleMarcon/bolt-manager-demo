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
            matchReports: []
        };
    }

    async init() {
        console.log('🎮 GameManager initializing...');
    }

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
        
        // Store game data
        this.gameData = {
            teams,
            players,
            staff,
            matches,
            userSession,
            tactics,
            moraleStatus,
            trainings: [],
            gameEvents: [],
            matchReports: []
        };
        
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

    // === PHASE 2 METHODS ===

    async executePlayerTrain(params) {
        const { playerIds, trainingType, intensity, teamId } = params;
        
        console.log(`🏃 Executing Player_Train for ${playerIds.length} players`);

        // Create training record
        const trainingRecord = {
            id: `training_${Date.now()}`,
            team_id: teamId,
            training_date: new Date().toISOString(),
            training_type: trainingType,
            intensity: intensity,
            focus_area: trainingType,
            duration_minutes: 90,
            participants: playerIds,
            individual_programs: [],
            staff_id: null,
            weather_conditions: 'normal',
            facility_quality: 75,
            injury_risk: this.calculateInjuryRisk(intensity),
            morale_impact: this.calculateMoraleImpact(intensity),
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

            const result = this.processPlayerTraining(player, trainingType, intensity);
            results.push(result);

            // Update player in gameData
            const playerIndex = this.gameData.players.findIndex(p => p.id === playerId);
            if (playerIndex !== -1) {
                this.gameData.players[playerIndex] = { ...player, ...result.playerUpdates };
            }

            // Add to training record
            if (Object.keys(result.attributeChanges).length > 0) {
                trainingRecord.skill_improvements.push({
                    player_id: playerId,
                    improvements: result.attributeChanges
                });
            }

            if (result.injury) {
                trainingRecord.injuries_occurred.push({
                    player_id: playerId,
                    injury: result.injury
                });
            }
        }

        // Add training to gameData
        this.gameData.trainings.push(trainingRecord);

        // Generate game event
        this.generateGameEvent({
            type: 'training',
            title: `Allenamento ${trainingType} completato`,
            description: `${playerIds.length} giocatori hanno partecipato all'allenamento`,
            priority: 2,
            team_id: teamId
        });

        // Save data
        this.saveGameData();

        return { trainingRecord, results };
    }

    processPlayerTraining(player, trainingType, intensity) {
        const result = {
            playerId: player.id,
            attributeChanges: {},
            playerUpdates: {},
            injury: null
        };

        // Calculate attribute improvements based on training type
        const improvements = this.calculateAttributeImprovements(trainingType, intensity);
        
        // Apply improvements
        Object.entries(improvements).forEach(([attribute, improvement]) => {
            if (improvement > 0) {
                const oldValue = player[attribute];
                const newValue = Math.min(100, oldValue + improvement);
                
                if (newValue > oldValue) {
                    result.attributeChanges[attribute] = newValue - oldValue;
                    result.playerUpdates[attribute] = newValue;
                }
            }
        });

        // Update fitness (decreases with training)
        const fitnessLoss = Math.max(1, intensity * 2 + Math.random() * 3);
        result.playerUpdates.fitness = Math.max(20, player.fitness - fitnessLoss);

        // Check for injuries
        const injuryChance = this.calculateInjuryRisk(intensity) / 100;
        if (Math.random() < injuryChance) {
            const injury = this.generateTrainingInjury();
            result.injury = injury;
            result.playerUpdates.injury_status = 'minor';
            result.playerUpdates.injury_days = injury.days;
        }

        // Update morale slightly
        const moraleChange = Math.random() * 4 - 2; // -2 to +2
        result.playerUpdates.morale = Math.max(0, Math.min(100, player.morale + moraleChange));

        return result;
    }

    calculateAttributeImprovements(trainingType, intensity) {
        const baseImprovement = intensity * 0.5; // 0.5 to 2.5 base improvement
        
        const improvements = {
            pace: 0,
            shooting: 0,
            passing: 0,
            dribbling: 0,
            defending: 0,
            physical: 0
        };

        switch (trainingType) {
            case 'fitness':
                improvements.physical = baseImprovement + Math.random() * 2;
                improvements.pace = (baseImprovement / 2) + Math.random();
                break;
            case 'technical':
                improvements.dribbling = baseImprovement + Math.random() * 2;
                improvements.passing = (baseImprovement / 2) + Math.random();
                improvements.shooting = Math.random();
                break;
            case 'tactical':
                improvements.passing = baseImprovement + Math.random() * 2;
                improvements.defending = (baseImprovement / 2) + Math.random();
                break;
        }

        // Round improvements
        Object.keys(improvements).forEach(key => {
            improvements[key] = Math.round(improvements[key]);
        });

        return improvements;
    }

    calculateInjuryRisk(intensity) {
        return Math.min(15, intensity * 2 + Math.random() * 5); // 0-15% risk
    }

    calculateMoraleImpact(intensity) {
        return Math.round((intensity - 3) * 2); // -4 to +4
    }

    calculateFitnessGain(intensity) {
        return Math.round(intensity * 0.5); // 0.5 to 2.5
    }

    generateTrainingInjury() {
        const injuries = [
            { description: 'Affaticamento muscolare', days: 3 },
            { description: 'Stiramento', days: 7 },
            { description: 'Contusione', days: 5 },
            { description: 'Crampi', days: 2 }
        ];

        return injuries[Math.floor(Math.random() * injuries.length)];
    }

    scheduleTraining(params) {
        const { playerIds, type, intensity, teamId, date } = params;
        
        const training = {
            id: `training_scheduled_${Date.now()}`,
            team_id: teamId,
            training_date: date,
            training_type: type,
            intensity: intensity,
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
        console.log(`📅 Executing GameFlow_AdvanceDay for ${days} days`);

        const currentDate = new Date(this.getCurrentDate());
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);

        const eventsGenerated = [];

        // Process each day
        for (let i = 0; i < days; i++) {
            const processDate = new Date(currentDate);
            processDate.setDate(currentDate.getDate() + i + 1);

            // Execute scheduled trainings
            const scheduledTrainings = this.gameData.trainings.filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate.toDateString() === processDate.toDateString() && 
                       training.status === 'scheduled';
            });

            for (const training of scheduledTrainings) {
                try {
                    await this.executePlayerTrain({
                        playerIds: training.participants,
                        trainingType: training.training_type,
                        intensity: training.intensity,
                        teamId: training.team_id
                    });

                    // Mark as completed
                    const trainingIndex = this.gameData.trainings.findIndex(t => t.id === training.id);
                    if (trainingIndex !== -1) {
                        this.gameData.trainings[trainingIndex].status = 'completed';
                    }

                    eventsGenerated.push({
                        type: 'training',
                        title: 'Allenamento Eseguito',
                        description: `Allenamento ${training.training_type} completato automaticamente`,
                        priority: 2
                    });
                } catch (error) {
                    console.error('Error executing scheduled training:', error);
                }
            }

            // Update player recovery
            this.updatePlayerRecovery();

            // Generate random events
            if (Math.random() < 0.3) { // 30% chance per day
                const randomEvent = this.generateRandomGameEvent();
                if (randomEvent) {
                    eventsGenerated.push(randomEvent);
                }
            }

            // Check for upcoming matches (3 days notice)
            const upcomingMatches = this.getUpcomingMatches(this.getUserTeam().id, 1);
            upcomingMatches.forEach(match => {
                const matchDate = new Date(match.match_date);
                const daysUntilMatch = Math.ceil((matchDate - processDate) / (1000 * 60 * 60 * 24));
                
                if (daysUntilMatch === 3) {
                    const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
                    const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
                    
                    eventsGenerated.push({
                        type: 'match',
                        title: 'Partita in Arrivo',
                        description: `${homeTeam?.name} vs ${awayTeam?.name} tra 3 giorni`,
                        priority: 4
                    });
                }
            });
        }

        // Update current date
        this.gameData.userSession.current_date = newDate.toISOString();
        this.gameData.userSession.updated_at = new Date().toISOString();

        // Add events to game data
        eventsGenerated.forEach(event => {
            this.generateGameEvent(event);
        });

        // Save data
        this.saveGameData();

        return {
            newDate: newDate.toISOString(),
            eventsGenerated
        };
    }

    updatePlayerRecovery() {
        this.gameData.players.forEach(player => {
            // Fitness recovery
            if (player.fitness < 100) {
                player.fitness = Math.min(100, player.fitness + 1 + Math.random() * 2);
            }

            // Injury recovery
            if (player.injury_days > 0) {
                player.injury_days = Math.max(0, player.injury_days - 1);
                if (player.injury_days === 0) {
                    player.injury_status = 'healthy';
                }
            }

            // Morale natural variation
            const moraleChange = (Math.random() - 0.5) * 2; // -1 to +1
            player.morale = Math.max(0, Math.min(100, player.morale + moraleChange));

            player.updated_at = new Date().toISOString();
        });
    }

    generateRandomGameEvent() {
        const eventTypes = [
            {
                type: 'news',
                title: 'Notizie dal Mondo del Calcio',
                description: 'Aggiornamenti dal campionato',
                priority: 1
            },
            {
                type: 'injury',
                title: 'Infortunio in Allenamento',
                description: 'Un giocatore si è infortunato durante la sessione',
                priority: 3
            },
            {
                type: 'transfer',
                title: 'Rumors di Mercato',
                description: 'Voci su possibili trasferimenti',
                priority: 2
            }
        ];

        return eventTypes[Math.floor(Math.random() * eventTypes.length)];
    }

    generateGameEvent(eventData) {
        const event = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: eventData.type,
            event_category: 'info',
            title: eventData.title,
            description: eventData.description,
            related_entity_type: eventData.entityType || null,
            related_entity_id: eventData.entityId || null,
            team_id: eventData.team_id || null,
            player_id: eventData.player_id || null,
            match_id: eventData.match_id || null,
            priority: eventData.priority || 1,
            is_read: false,
            is_user_relevant: true,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.getCurrentDate(),
            created_at: new Date().toISOString()
        };

        this.gameData.gameEvents = this.gameData.gameEvents || [];
        this.gameData.gameEvents.push(event);

        return event;
    }

    // === PHASE 3 METHODS ===

    async updateTactics(params) {
        const { 
            teamId, formation, mentality, tempo, width, pressing, 
            defensiveLine, passingStyle, crossing, playerPositions, 
            playerRoles, setPieces, captainId, penaltyTakerId, 
            freeKickTakerId, cornerTakerId, tacticName 
        } = params;

        console.log(`⚙️ Executing Tactics_Update for team ${teamId}`);

        // Find existing tactics or create new
        let tacticsIndex = this.gameData.tactics.findIndex(t => t.team_id === teamId && t.is_default);
        
        const tacticsData = {
            id: tacticsIndex >= 0 ? this.gameData.tactics[tacticsIndex].id : `tactics_${teamId}_${Date.now()}`,
            team_id: teamId,
            tactic_name: tacticName || 'Tattica Principale',
            formation: formation,
            mentality: mentality,
            tempo: tempo,
            width: width,
            pressing: pressing,
            defensive_line: defensiveLine,
            passing_style: passingStyle,
            crossing: crossing,
            player_positions: playerPositions,
            player_roles: playerRoles,
            set_pieces: setPieces,
            captain_id: captainId,
            penalty_taker_id: penaltyTakerId,
            free_kick_taker_id: freeKickTakerId,
            corner_taker_id: cornerTakerId,
            is_default: true,
            effectiveness_rating: this.calculateTacticalEffectiveness(params),
            matches_used: tacticsIndex >= 0 ? this.gameData.tactics[tacticsIndex].matches_used : 0,
            created_at: tacticsIndex >= 0 ? this.gameData.tactics[tacticsIndex].created_at : new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        if (tacticsIndex >= 0) {
            this.gameData.tactics[tacticsIndex] = tacticsData;
        } else {
            this.gameData.tactics.push(tacticsData);
        }

        // Update team formation
        const teamIndex = this.gameData.teams.findIndex(t => t.id === teamId);
        if (teamIndex >= 0) {
            this.gameData.teams[teamIndex].formation = formation;
            this.gameData.teams[teamIndex].updated_at = new Date().toISOString();
        }

        // Generate event
        this.generateGameEvent({
            type: 'tactical',
            title: 'Tattica Aggiornata',
            description: `Nuova formazione ${formation} salvata`,
            priority: 2,
            team_id: teamId
        });

        this.saveGameData();
        return tacticsData;
    }

    calculateTacticalEffectiveness(params) {
        let effectiveness = 50; // Base

        // Formation balance bonus
        effectiveness += 10;

        // Player assignment bonus
        if (params.playerPositions && params.playerPositions.length === 11) {
            effectiveness += 20;
        }

        // Tactical coherence
        if (params.mentality === 'attacking' && params.tempo === 'fast') {
            effectiveness += 5;
        }
        if (params.mentality === 'defensive' && params.pressing === 'low') {
            effectiveness += 5;
        }

        return Math.min(100, Math.max(0, effectiveness));
    }

    async simulateMatch(matchId) {
        console.log(`⚽ Executing Match_Simulate for match ${matchId}`);

        const match = this.gameData.matches.find(m => m.id === matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        // Get teams and players
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
        const homePlayers = this.getPlayersByTeam(match.home_team_id).filter(p => p.injury_status === 'healthy').slice(0, 11);
        const awayPlayers = this.getPlayersByTeam(match.away_team_id).filter(p => p.injury_status === 'healthy').slice(0, 11);

        // Calculate team strengths
        const homeStrength = this.calculateTeamStrength(homePlayers, homeTeam);
        const awayStrength = this.calculateTeamStrength(awayPlayers, awayTeam);

        // Simulate match events
        const events = this.simulateMatchEvents(homeStrength, awayStrength, homePlayers, awayPlayers);
        
        // Calculate final score
        const homeGoals = events.filter(e => e.type === 'goal' && e.team === 'home').length;
        const awayGoals = events.filter(e => e.type === 'goal' && e.team === 'away').length;

        // Generate statistics
        const stats = this.generateMatchStatistics(homeStrength, awayStrength, events);

        // Update match
        const matchIndex = this.gameData.matches.findIndex(m => m.id === matchId);
        if (matchIndex >= 0) {
            this.gameData.matches[matchIndex] = {
                ...match,
                status: 'finished',
                home_goals: homeGoals,
                away_goals: awayGoals,
                home_formation: homeTeam.formation,
                away_formation: awayTeam.formation,
                home_lineup: homePlayers.map(p => p.id),
                away_lineup: awayPlayers.map(p => p.id),
                attendance: Math.floor(20000 + Math.random() * 30000),
                weather: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
                referee: 'Arbitro ' + Math.floor(Math.random() * 100),
                updated_at: new Date().toISOString()
            };
        }

        // Generate match report
        const matchReport = await this.generateMatchReport(matchId, events, stats, homePlayers, awayPlayers);

        // Update team standings
        this.updateTeamStandings(match.home_team_id, match.away_team_id, homeGoals, awayGoals);

        // Update player statistics
        this.updatePlayerStatistics(events, homePlayers, awayPlayers);

        // Generate game event
        this.generateGameEvent({
            type: 'match',
            title: `${homeTeam.name} ${homeGoals}-${awayGoals} ${awayTeam.name}`,
            description: `Partita completata - Giornata ${match.matchday}`,
            priority: 4,
            match_id: matchId
        });

        this.saveGameData();

        return {
            match: this.gameData.matches[matchIndex],
            events,
            stats,
            report: matchReport
        };
    }

    calculateTeamStrength(players, team) {
        const avgRating = players.reduce((sum, p) => sum + p.overall_rating, 0) / players.length;
        const moraleBonus = (team.team_morale - 50) / 10; // -5 to +5
        const homeBonus = 2; // Assume home advantage for now
        
        return avgRating + moraleBonus + homeBonus;
    }

    simulateMatchEvents(homeStrength, awayStrength, homePlayers, awayPlayers) {
        const events = [];
        const totalStrength = homeStrength + awayStrength;
        const homeAdvantage = homeStrength / totalStrength;

        // Simulate 90 minutes in 10-minute blocks
        for (let block = 0; block < 9; block++) {
            const minute = (block * 10) + Math.floor(Math.random() * 10) + 1;

            // Goal chance (higher for stronger team)
            if (Math.random() < 0.15) { // 15% chance per block
                const isHome = Math.random() < homeAdvantage;
                const players = isHome ? homePlayers : awayPlayers;
                const scorer = players[Math.floor(Math.random() * players.length)];

                events.push({
                    minute,
                    type: 'goal',
                    team: isHome ? 'home' : 'away',
                    player_id: scorer.id,
                    description: `⚽ Gol di ${scorer.first_name} ${scorer.last_name}!`
                });
            }

            // Other events
            if (Math.random() < 0.3) { // 30% chance for other events
                const eventTypes = ['yellow_card', 'corner', 'shot', 'foul'];
                const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                const isHome = Math.random() < 0.5;
                const players = isHome ? homePlayers : awayPlayers;
                const player = players[Math.floor(Math.random() * players.length)];

                events.push({
                    minute,
                    type: eventType,
                    team: isHome ? 'home' : 'away',
                    player_id: player.id,
                    description: this.getEventDescription(eventType, player)
                });
            }
        }

        return events.sort((a, b) => a.minute - b.minute);
    }

    getEventDescription(eventType, player) {
        const descriptions = {
            'yellow_card': `🟨 Cartellino giallo per ${player.first_name} ${player.last_name}`,
            'corner': `📐 Calcio d'angolo`,
            'shot': `🎯 Tiro di ${player.first_name} ${player.last_name}`,
            'foul': `⚠️ Fallo di ${player.first_name} ${player.last_name}`
        };
        return descriptions[eventType] || 'Evento di gioco';
    }

    generateMatchStatistics(homeStrength, awayStrength, events) {
        const totalStrength = homeStrength + awayStrength;
        const homePossession = Math.round((homeStrength / totalStrength) * 100);
        const awayPossession = 100 - homePossession;

        return {
            home_possession: homePossession,
            away_possession: awayPossession,
            home_shots: 8 + Math.floor(Math.random() * 10),
            away_shots: 6 + Math.floor(Math.random() * 8),
            home_shots_on_target: 3 + Math.floor(Math.random() * 5),
            away_shots_on_target: 2 + Math.floor(Math.random() * 4),
            home_corners: events.filter(e => e.type === 'corner' && e.team === 'home').length + Math.floor(Math.random() * 5),
            away_corners: events.filter(e => e.type === 'corner' && e.team === 'away').length + Math.floor(Math.random() * 5),
            home_fouls: events.filter(e => e.type === 'foul' && e.team === 'home').length + Math.floor(Math.random() * 8),
            away_fouls: events.filter(e => e.type === 'foul' && e.team === 'away').length + Math.floor(Math.random() * 8),
            home_yellow_cards: events.filter(e => e.type === 'yellow_card' && e.team === 'home').length,
            away_yellow_cards: events.filter(e => e.type === 'yellow_card' && e.team === 'away').length,
            home_red_cards: 0,
            away_red_cards: 0,
            home_passes: 200 + Math.floor(Math.random() * 300),
            away_passes: 180 + Math.floor(Math.random() * 250),
            home_pass_accuracy: 75 + Math.floor(Math.random() * 20),
            away_pass_accuracy: 70 + Math.floor(Math.random() * 25)
        };
    }

    async generateMatchReport(matchId, events, stats, homePlayers, awayPlayers) {
        console.log(`📊 Executing Match_GenerateReport for match ${matchId}`);

        const match = this.gameData.matches.find(m => m.id === matchId);
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);

        // Generate player ratings
        const playerRatings = [];
        
        [...homePlayers, ...awayPlayers].forEach(player => {
            const baseRating = 6.0;
            const performanceVariation = (Math.random() - 0.5) * 2; // -1 to +1
            const goalBonus = events.filter(e => e.type === 'goal' && e.player_id === player.id).length * 0.5;
            const cardPenalty = events.filter(e => e.type === 'yellow_card' && e.player_id === player.id).length * -0.2;
            
            const rating = Math.max(1, Math.min(10, baseRating + performanceVariation + goalBonus + cardPenalty));
            
            playerRatings.push({
                player_id: player.id,
                player_name: `${player.first_name} ${player.last_name}`,
                position: player.position,
                rating: Math.round(rating * 10) / 10 // Round to 1 decimal
            });
        });

        // Find man of the match (highest rating)
        const manOfTheMatch = playerRatings.reduce((best, current) => 
            current.rating > best.rating ? current : best
        );

        // Generate key moments
        const keyMoments = events
            .filter(e => ['goal', 'red_card', 'penalty'].includes(e.type))
            .map(event => ({
                minute: event.minute,
                type: event.type,
                description: event.description,
                importance: event.type === 'goal' ? 'high' : 'medium'
            }));

        const matchReport = {
            id: `report_${matchId}`,
            match_id: matchId,
            match_events: events,
            ...stats,
            player_ratings: playerRatings,
            man_of_the_match: manOfTheMatch.player_id,
            key_moments: keyMoments,
            tactical_analysis: this.generateTacticalAnalysis(homeTeam, awayTeam, stats),
            weather_impact: 'Condizioni normali, nessun impatto significativo',
            referee_performance: 7 + Math.floor(Math.random() * 3), // 7-9
            attendance_impact: 'Il pubblico ha sostenuto la squadra di casa',
            injury_time_home: Math.floor(Math.random() * 4),
            injury_time_away: Math.floor(Math.random() * 6),
            created_at: new Date().toISOString()
        };

        // Add to game data
        this.gameData.matchReports = this.gameData.matchReports || [];
        this.gameData.matchReports.push(matchReport);

        // Update match with report reference
        const matchIndex = this.gameData.matches.findIndex(m => m.id === matchId);
        if (matchIndex >= 0) {
            this.gameData.matches[matchIndex].match_report_id = matchReport.id;
        }

        return matchReport;
    }

    generateTacticalAnalysis(homeTeam, awayTeam, stats) {
        const homeDominance = stats.home_possession > 60;
        const awayDominance = stats.away_possession > 60;
        const balanced = !homeDominance && !awayDominance;

        if (homeDominance) {
            return `${homeTeam.name} ha dominato il possesso palla (${stats.home_possession}%) e ha creato più occasioni da gol. La formazione ${homeTeam.formation} si è dimostrata efficace nel controllo del gioco.`;
        } else if (awayDominance) {
            return `${awayTeam.name} ha controllato il gioco con ${stats.away_possession}% di possesso. La tattica ospite ha limitato le occasioni della squadra di casa.`;
        } else {
            return `Partita equilibrata con entrambe le squadre che hanno avuto le loro occasioni. Il risultato rispecchia l'andamento del match.`;
        }
    }

    updateTeamStandings(homeTeamId, awayTeamId, homeGoals, awayGoals) {
        const homeTeamIndex = this.gameData.teams.findIndex(t => t.id === homeTeamId);
        const awayTeamIndex = this.gameData.teams.findIndex(t => t.id === awayTeamId);

        if (homeTeamIndex >= 0) {
            const homeTeam = this.gameData.teams[homeTeamIndex];
            homeTeam.matches_played += 1;
            homeTeam.goals_for += homeGoals;
            homeTeam.goals_against += awayGoals;

            if (homeGoals > awayGoals) {
                homeTeam.wins += 1;
                homeTeam.points += 3;
            } else if (homeGoals === awayGoals) {
                homeTeam.draws += 1;
                homeTeam.points += 1;
            } else {
                homeTeam.losses += 1;
            }

            homeTeam.updated_at = new Date().toISOString();
        }

        if (awayTeamIndex >= 0) {
            const awayTeam = this.gameData.teams[awayTeamIndex];
            awayTeam.matches_played += 1;
            awayTeam.goals_for += awayGoals;
            awayTeam.goals_against += homeGoals;

            if (awayGoals > homeGoals) {
                awayTeam.wins += 1;
                awayTeam.points += 3;
            } else if (awayGoals === homeGoals) {
                awayTeam.draws += 1;
                awayTeam.points += 1;
            } else {
                awayTeam.losses += 1;
            }

            awayTeam.updated_at = new Date().toISOString();
        }
    }

    updatePlayerStatistics(events, homePlayers, awayPlayers) {
        events.forEach(event => {
            if (event.player_id) {
                const playerIndex = this.gameData.players.findIndex(p => p.id === event.player_id);
                if (playerIndex >= 0) {
                    const player = this.gameData.players[playerIndex];

                    switch (event.type) {
                        case 'goal':
                            player.goals_scored += 1;
                            break;
                        case 'yellow_card':
                            player.yellow_cards += 1;
                            break;
                        case 'red_card':
                            player.red_cards += 1;
                            break;
                    }

                    player.updated_at = new Date().toISOString();
                }
            }
        });

        // Update matches played for all participants
        [...homePlayers, ...awayPlayers].forEach(player => {
            const playerIndex = this.gameData.players.findIndex(p => p.id === player.id);
            if (playerIndex >= 0) {
                this.gameData.players[playerIndex].matches_played += 1;
                this.gameData.players[playerIndex].updated_at = new Date().toISOString();
            }
        });
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
        return this.gameData.userSession?.current_date || new Date().toISOString();
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
        return this.gameData.matchReports?.find(report => report.match_id === matchId);
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
                    date: match.match_date,
                    type: 'match',
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
                    date: training.training_date,
                    type: 'training',
                    title: `Allenamento ${training.training_type}`,
                    description: `Intensità ${training.intensity}`,
                    priority: 2
                });
            });

        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}