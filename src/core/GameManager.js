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
            gameEvents: []
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
        
        // Step 8: Initialize empty trainings and events
        const trainings = [];
        const gameEvents = [];
        
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
            gameEvents
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

    // ===== TRAINING SYSTEM =====

    async executePlayerTrain({ playerIds, trainingType, intensity, teamId }) {
        console.log('🏃 Executing Player_Train flow...');

        // Step 1: Verify player availability
        const availablePlayers = this.gameData.players.filter(player => 
            playerIds.includes(player.id) && 
            player.injury_status === 'healthy' &&
            player.team_id === teamId
        );

        if (availablePlayers.length === 0) {
            throw new Error('Nessun giocatore disponibile per l\'allenamento');
        }

        // Step 2: Get staff bonuses
        const teamStaff = this.gameData.staff.filter(staff => staff.team_id === teamId);
        const staffBonus = this.calculateStaffBonus(teamStaff, trainingType);

        // Step 3: Create training record
        const trainingRecord = {
            id: `training_${Date.now()}`,
            team_id: teamId,
            training_date: this.getCurrentDate(),
            training_type: trainingType,
            intensity: intensity,
            focus_area: trainingType,
            duration_minutes: 90,
            participants: availablePlayers.map(p => p.id),
            individual_programs: [],
            staff_id: teamStaff.find(s => s.role === 'head_coach')?.id || null,
            weather_conditions: 'good',
            facility_quality: 75,
            injury_risk: this.calculateInjuryRisk(intensity),
            morale_impact: 0,
            fitness_gain: 0,
            skill_improvements: [],
            injuries_occurred: [],
            status: 'completed',
            notes: `Allenamento ${trainingType} completato`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Step 4: Process each player
        const results = [];
        
        for (const player of availablePlayers) {
            const result = this.processPlayerTraining(player, trainingType, intensity, staffBonus);
            results.push(result);

            // Update player in gameData
            const playerIndex = this.gameData.players.findIndex(p => p.id === player.id);
            if (playerIndex !== -1) {
                Object.assign(this.gameData.players[playerIndex], result.updatedPlayer);
            }

            // Save to attributes history
            if (Object.keys(result.attributeChanges).length > 0) {
                this.saveAttributeHistory(player.id, result.attributeChanges, trainingRecord.id);
            }
        }

        // Step 5: Update training record with results
        trainingRecord.injuries_occurred = results.filter(r => r.injury).map(r => ({
            player_id: r.playerId,
            injury_type: r.injury.type,
            days: r.injury.days
        }));

        trainingRecord.skill_improvements = results.filter(r => Object.keys(r.attributeChanges).length > 0);

        // Step 6: Save training record
        this.gameData.trainings.push(trainingRecord);

        // Step 7: Update morale
        this.updateMoraleAfterTraining(teamId, availablePlayers, intensity, results);

        // Step 8: Save game data
        this.saveGameData();

        console.log('✅ Player training completed successfully');
        return { trainingRecord, results };
    }

    processPlayerTraining(player, trainingType, intensity, staffBonus) {
        const result = {
            playerId: player.id,
            attributeChanges: {},
            fitnessChange: 0,
            moraleChange: 0,
            injury: null,
            updatedPlayer: { ...player }
        };

        // Calculate attribute improvements based on training type
        const improvements = this.calculateAttributeImprovements(player, trainingType, intensity, staffBonus);
        result.attributeChanges = improvements;

        // Apply improvements to player
        Object.entries(improvements).forEach(([attribute, change]) => {
            result.updatedPlayer[attribute] = Math.min(100, Math.max(1, player[attribute] + change));
        });

        // Calculate fitness change
        const fitnessChange = this.calculateFitnessChange(intensity);
        result.fitnessChange = fitnessChange;
        result.updatedPlayer.fitness = Math.min(100, Math.max(0, player.fitness + fitnessChange));

        // Check for injuries
        const injuryRisk = this.calculateInjuryRisk(intensity) * (1 - staffBonus.injuryReduction);
        if (Math.random() < injuryRisk) {
            const injury = this.generateInjury(intensity);
            result.injury = injury;
            result.updatedPlayer.injury_status = injury.type;
            result.updatedPlayer.injury_days = injury.days;
        }

        // Calculate morale change
        const moraleChange = this.calculateMoraleChange(improvements, result.injury);
        result.moraleChange = moraleChange;
        result.updatedPlayer.morale = Math.min(100, Math.max(0, player.morale + moraleChange));

        // Update timestamps
        result.updatedPlayer.updated_at = new Date().toISOString();

        return result;
    }

    calculateAttributeImprovements(player, trainingType, intensity, staffBonus) {
        const improvements = {};
        const baseImprovement = intensity * 0.5; // 0.5 to 2.5 base improvement
        const bonusMultiplier = 1 + (staffBonus.efficiency / 100);

        switch (trainingType) {
            case 'fitness':
                improvements.physical = Math.round((baseImprovement + Math.random()) * bonusMultiplier);
                improvements.pace = Math.round((baseImprovement * 0.7 + Math.random()) * bonusMultiplier);
                break;
            case 'technical':
                improvements.dribbling = Math.round((baseImprovement + Math.random()) * bonusMultiplier);
                improvements.passing = Math.round((baseImprovement * 0.8 + Math.random()) * bonusMultiplier);
                improvements.shooting = Math.round((baseImprovement * 0.6 + Math.random()) * bonusMultiplier);
                break;
            case 'tactical':
                improvements.passing = Math.round((baseImprovement + Math.random()) * bonusMultiplier);
                improvements.defending = Math.round((baseImprovement * 0.8 + Math.random()) * bonusMultiplier);
                break;
        }

        // Remove zero improvements
        Object.keys(improvements).forEach(key => {
            if (improvements[key] <= 0) {
                delete improvements[key];
            }
        });

        return improvements;
    }

    calculateStaffBonus(teamStaff, trainingType) {
        let efficiency = 0;
        let injuryReduction = 0;

        teamStaff.forEach(staff => {
            if (staff.role === 'head_coach') {
                efficiency += (staff.coaching_ability || 0) * 0.1;
            }
            if (staff.role === 'fitness_coach') {
                efficiency += (staff.fitness_expertise || 0) * 0.15;
                injuryReduction += (staff.injury_proneness_reduction || 0) * 0.01;
            }
        });

        return {
            efficiency: Math.min(50, efficiency), // Max 50% bonus
            injuryReduction: Math.min(0.5, injuryReduction) // Max 50% injury reduction
        };
    }

    calculateFitnessChange(intensity) {
        // Higher intensity reduces fitness more
        return Math.round(-intensity * 0.5 - Math.random() * 2);
    }

    calculateInjuryRisk(intensity) {
        // Risk increases exponentially with intensity
        const baseRisk = 0.01; // 1% base risk
        return baseRisk * Math.pow(intensity, 1.5);
    }

    generateInjury(intensity) {
        const injuryTypes = [
            { type: 'minor', description: 'Affaticamento muscolare', minDays: 1, maxDays: 3 },
            { type: 'minor', description: 'Contusione', minDays: 2, maxDays: 5 },
            { type: 'major', description: 'Stiramento muscolare', minDays: 7, maxDays: 14 },
            { type: 'major', description: 'Distorsione', minDays: 10, maxDays: 21 }
        ];

        // Higher intensity = more severe injuries
        const severityThreshold = intensity >= 4 ? 0.3 : 0.1;
        const isMajor = Math.random() < severityThreshold;
        
        const availableInjuries = injuryTypes.filter(inj => 
            isMajor ? inj.type === 'major' : inj.type === 'minor'
        );

        const injury = availableInjuries[Math.floor(Math.random() * availableInjuries.length)];
        const days = injury.minDays + Math.floor(Math.random() * (injury.maxDays - injury.minDays + 1));

        return {
            type: injury.type,
            description: injury.description,
            days: days
        };
    }

    calculateMoraleChange(improvements, injury) {
        let moraleChange = 0;

        // Positive morale from improvements
        const improvementCount = Object.keys(improvements).length;
        moraleChange += improvementCount * 2;

        // Negative morale from injury
        if (injury) {
            moraleChange -= injury.type === 'major' ? 10 : 5;
        }

        return Math.round(moraleChange);
    }

    saveAttributeHistory(playerId, attributeChanges, trainingId) {
        const player = this.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        const historyRecord = {
            id: `history_${Date.now()}_${playerId}`,
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
            training_id: trainingId,
            match_id: null,
            attribute_changes: attributeChanges,
            season: this.gameData.userSession.current_season,
            player_age_at_time: player.age,
            is_significant_change: Object.values(attributeChanges).some(change => Math.abs(change) >= 2),
            created_at: new Date().toISOString()
        };

        // Initialize attributes_history if not exists
        if (!this.gameData.attributesHistory) {
            this.gameData.attributesHistory = [];
        }

        this.gameData.attributesHistory.push(historyRecord);
    }

    updateMoraleAfterTraining(teamId, players, intensity, results) {
        // Update team morale
        const teamMorale = this.gameData.moraleStatus.find(m => 
            m.entity_type === 'team' && m.entity_id === teamId
        );

        if (teamMorale) {
            const avgMoraleChange = results.reduce((sum, r) => sum + r.moraleChange, 0) / results.length;
            teamMorale.current_morale = Math.min(100, Math.max(0, teamMorale.current_morale + avgMoraleChange));
            teamMorale.training_impact = avgMoraleChange;
            teamMorale.updated_at = new Date().toISOString();
        }

        // Update individual player morale
        results.forEach(result => {
            const playerMorale = this.gameData.moraleStatus.find(m => 
                m.entity_type === 'player' && m.entity_id === result.playerId
            );

            if (playerMorale) {
                playerMorale.current_morale = Math.min(100, Math.max(0, playerMorale.current_morale + result.moraleChange));
                playerMorale.training_impact = result.moraleChange;
                playerMorale.updated_at = new Date().toISOString();
            }
        });
    }

    scheduleTraining({ playerIds, type, intensity, teamId, date }) {
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

    // ===== CALENDAR SYSTEM =====

    async executeAdvanceDay(days = 1) {
        console.log(`📅 Executing GameFlow_AdvanceDay (${days} days)...`);

        const currentDate = new Date(this.getCurrentDate());
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);

        const eventsGenerated = [];

        // Process each day
        for (let i = 0; i < days; i++) {
            const processDate = new Date(currentDate);
            processDate.setDate(currentDate.getDate() + i + 1);

            // Step 1: Process scheduled trainings
            const scheduledTrainings = this.gameData.trainings.filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate.toDateString() === processDate.toDateString() && 
                       training.status === 'scheduled';
            });

            for (const training of scheduledTrainings) {
                try {
                    const result = await this.executePlayerTrain({
                        playerIds: training.participants,
                        trainingType: training.training_type,
                        intensity: training.intensity,
                        teamId: training.team_id
                    });

                    // Update training status
                    training.status = 'completed';
                    training.updated_at = new Date().toISOString();

                    eventsGenerated.push({
                        type: 'training',
                        title: 'Allenamento Completato',
                        description: `Allenamento ${training.training_type} eseguito con ${training.participants.length} giocatori`,
                        priority: 2,
                        date: processDate.toISOString()
                    });

                } catch (error) {
                    console.error('Error executing scheduled training:', error);
                    training.status = 'failed';
                    training.notes = `Errore: ${error.message}`;
                }
            }

            // Step 2: Update player recovery
            this.processPlayerRecovery();

            // Step 3: Generate random events
            const randomEvents = this.generateRandomEvents(processDate);
            eventsGenerated.push(...randomEvents);

            // Step 4: Check for upcoming matches
            const upcomingMatches = this.gameData.matches.filter(match => {
                const matchDate = new Date(match.match_date);
                const daysDiff = Math.ceil((matchDate - processDate) / (1000 * 60 * 60 * 24));
                return daysDiff <= 3 && daysDiff >= 0 && match.is_user_match && match.status === 'scheduled';
            });

            upcomingMatches.forEach(match => {
                const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
                const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
                const daysDiff = Math.ceil((new Date(match.match_date) - processDate) / (1000 * 60 * 60 * 24));

                eventsGenerated.push({
                    type: 'match',
                    title: `Partita in arrivo`,
                    description: `${homeTeam?.name || 'HOME'} vs ${awayTeam?.name || 'AWAY'} tra ${daysDiff} giorni`,
                    priority: 4,
                    date: processDate.toISOString()
                });
            });
        }

        // Step 5: Update current date
        this.gameData.userSession.current_date = newDate.toISOString();
        this.gameData.userSession.updated_at = new Date().toISOString();

        // Step 6: Save generated events
        eventsGenerated.forEach(event => {
            this.addGameEvent(event);
        });

        // Step 7: Save game data
        this.saveGameData();

        console.log(`✅ Advanced ${days} day(s) successfully`);
        return {
            newDate: newDate.toISOString(),
            eventsGenerated
        };
    }

    processPlayerRecovery() {
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

            // Morale natural decay/recovery
            if (player.morale > 60) {
                player.morale = Math.max(60, player.morale - 0.5);
            } else if (player.morale < 40) {
                player.morale = Math.min(40, player.morale + 0.5);
            }

            player.updated_at = new Date().toISOString();
        });
    }

    generateRandomEvents(date) {
        const events = [];
        
        // 10% chance of random news
        if (Math.random() < 0.1) {
            const newsEvents = [
                'Nuovo sponsor interessato alla squadra',
                'Miglioramenti alle strutture di allenamento',
                'Interesse mediatico per un giovane talento',
                'Rumors di mercato su un giocatore',
                'Riconoscimento per le prestazioni della squadra'
            ];

            events.push({
                type: 'news',
                title: 'Notizie dal Club',
                description: newsEvents[Math.floor(Math.random() * newsEvents.length)],
                priority: 1,
                date: date.toISOString()
            });
        }

        // 5% chance of minor injury during rest
        if (Math.random() < 0.05) {
            const userPlayers = this.getUserPlayers().filter(p => p.injury_status === 'healthy');
            if (userPlayers.length > 0) {
                const randomPlayer = userPlayers[Math.floor(Math.random() * userPlayers.length)];
                const minorInjury = this.generateInjury(1); // Low intensity injury

                randomPlayer.injury_status = minorInjury.type;
                randomPlayer.injury_days = minorInjury.days;
                randomPlayer.updated_at = new Date().toISOString();

                events.push({
                    type: 'injury',
                    title: 'Infortunio Giocatore',
                    description: `${randomPlayer.first_name} ${randomPlayer.last_name}: ${minorInjury.description}`,
                    priority: 3,
                    date: date.toISOString()
                });
            }
        }

        return events;
    }

    addGameEvent(eventData) {
        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: eventData.type,
            event_category: this.getEventCategory(eventData.priority),
            title: eventData.title,
            description: eventData.description,
            related_entity_type: null,
            related_entity_id: null,
            team_id: this.getUserTeam()?.id || null,
            player_id: null,
            match_id: null,
            priority: eventData.priority,
            is_read: false,
            is_user_relevant: true,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: eventData.date,
            created_at: new Date().toISOString()
        };

        this.gameData.gameEvents.push(gameEvent);
    }

    getEventCategory(priority) {
        if (priority >= 4) return 'error';
        if (priority >= 3) return 'warning';
        if (priority >= 2) return 'success';
        return 'info';
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
                    title: `${homeTeam?.name || 'HOME'} vs ${awayTeam?.name || 'AWAY'}`,
                    description: `Giornata ${match.matchday}`,
                    date: match.match_date,
                    priority: 4
                });
            });

        // Add scheduled trainings
        this.gameData.trainings
            .filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate >= currentDate && trainingDate <= endDate && training.status === 'scheduled';
            })
            .forEach(training => {
                events.push({
                    type: 'training',
                    title: `Allenamento ${training.training_type}`,
                    description: `Intensità ${training.intensity} - ${training.participants.length} giocatori`,
                    date: training.training_date,
                    priority: 2
                });
            });

        // Add game events
        this.gameData.gameEvents
            .filter(event => {
                const eventDate = new Date(event.game_date);
                return eventDate >= currentDate && eventDate <= endDate && !event.is_read;
            })
            .forEach(event => {
                events.push({
                    type: event.event_type,
                    title: event.title,
                    description: event.description,
                    date: event.game_date,
                    priority: event.priority
                });
            });

        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // ===== UTILITY METHODS =====

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
}