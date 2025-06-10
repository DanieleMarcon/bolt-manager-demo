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
            moraleStatus: []
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
            moraleStatus
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