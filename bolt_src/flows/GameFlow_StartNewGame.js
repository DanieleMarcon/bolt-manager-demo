/**
 * FLOW: GameFlow_StartNewGame
 * 
 * Inizializza una nuova partita generando squadre, giocatori, staff, calendario e sessione utente.
 * Questo è il flow principale che avvia tutto il sistema di gioco.
 * 
 * Trigger: Click su "Nuova Partita" nella schermata principale
 * Input: Nome sessione, squadra scelta, livello difficoltà, impostazioni iniziali
 * Output: Nuova partita pronta, reindirizzamento a TeamManagement.page
 * 
 * Dataset coinvolti:
 * - teams (scrittura - creazione squadre)
 * - players (scrittura - generazione rose)
 * - staff (scrittura - assegnazione staff)
 * - matches (scrittura - calendario stagione)
 * - user_sessions (scrittura - nuova sessione)
 * - tactics (scrittura - formazioni default)
 * - morale_status (scrittura - stato iniziale)
 */

export class GameFlowStartNewGameFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di creazione nuova partita
     * @param {Object} params - Parametri della nuova partita
     * @param {string} params.sessionName - Nome della sessione
     * @param {string} params.userTeamName - Nome squadra utente (opzionale)
     * @param {string} params.difficulty - Livello difficoltà (easy, normal, hard)
     * @param {Object} params.settings - Impostazioni iniziali
     * @returns {Object} Risultato della creazione
     */
    async execute(params = {}) {
        try {
            console.log('🎮 Executing GameFlow_StartNewGame...', params);

            // 1. Validazione parametri
            const validation = this.validateParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Inizializza struttura dati di gioco
            const gameData = this.initializeGameData(params);

            // 3. Genera squadre del campionato
            const teams = this.generateTeams(params);
            gameData.teams = teams;

            // 4. Genera giocatori per ogni squadra
            const players = this.generateAllPlayers(teams);
            gameData.players = players;

            // 5. Genera staff per ogni squadra
            const staff = this.generateAllStaff(teams);
            gameData.staff = staff;

            // 6. Genera calendario della stagione
            const matches = this.generateSeasonCalendar(teams);
            gameData.matches = matches;

            // 7. Crea tattiche default per ogni squadra
            const tactics = this.generateDefaultTactics(teams, players);
            gameData.tactics = tactics;

            // 8. Inizializza stato morale
            const moraleStatus = this.initializeMoraleStatus(players, teams);
            gameData.moraleStatus = moraleStatus;

            // 9. Crea sessione utente
            const userSession = this.createUserSession(params, teams);
            gameData.userSession = userSession;

            // 10. Salva dati nel game manager
            this.gameManager.gameData = gameData;
            this.gameManager.saveGameData();

            console.log('✅ New game created successfully');

            return {
                success: true,
                gameData: gameData,
                userTeam: teams.find(t => t.is_user_team),
                totalPlayers: players.length,
                totalMatches: matches.length
            };

        } catch (error) {
            console.error('❌ GameFlow_StartNewGame error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateParams(params) {
        // Parametri opzionali con default
        if (!params.sessionName) {
            params.sessionName = `Carriera ${new Date().getFullYear()}`;
        }
        if (!params.difficulty) {
            params.difficulty = 'normal';
        }
        if (!params.settings) {
            params.settings = {};
        }

        return { isValid: true };
    }

    initializeGameData(params) {
        const currentDate = new Date();
        
        return {
            gameVersion: '1.0.0',
            createdAt: currentDate.toISOString(),
            currentDate: currentDate.toISOString(),
            currentSeason: 1,
            currentMatchday: 1,
            difficulty: params.difficulty,
            
            // Initialize empty datasets
            teams: [],
            players: [],
            staff: [],
            matches: [],
            trainings: [],
            transfers: [],
            tactics: [],
            gameEvents: [],
            matchReports: [],
            attributesHistory: [],
            moraleStatus: [],
            historyReports: [],
            userSettings: []
        };
    }

    generateTeams(params) {
        const teamTemplates = [
            { name: 'AC Milano', city: 'Milano', short: 'MIL', strength: 85 },
            { name: 'Inter Milano', city: 'Milano', short: 'INT', strength: 84 },
            { name: 'Juventus FC', city: 'Torino', short: 'JUV', strength: 83 },
            { name: 'AS Roma', city: 'Roma', short: 'ROM', strength: 78 },
            { name: 'SSC Napoli', city: 'Napoli', short: 'NAP', strength: 82 },
            { name: 'ACF Fiorentina', city: 'Firenze', short: 'FIO', strength: 72 },
            { name: 'Atalanta BC', city: 'Bergamo', short: 'ATA', strength: 76 },
            { name: 'SS Lazio', city: 'Roma', short: 'LAZ', strength: 74 },
            { name: 'Torino FC', city: 'Torino', short: 'TOR', strength: 68 },
            { name: 'UC Sampdoria', city: 'Genova', short: 'SAM', strength: 65 },
            { name: 'Genoa CFC', city: 'Genova', short: 'GEN', strength: 63 },
            { name: 'Bologna FC', city: 'Bologna', short: 'BOL', strength: 66 },
            { name: 'Udinese Calcio', city: 'Udine', short: 'UDI', strength: 64 },
            { name: 'Parma Calcio', city: 'Parma', short: 'PAR', strength: 62 },
            { name: 'Cagliari Calcio', city: 'Cagliari', short: 'CAG', strength: 60 },
            { name: 'Hellas Verona', city: 'Verona', short: 'VER', strength: 61 },
            { name: 'US Sassuolo', city: 'Sassuolo', short: 'SAS', strength: 67 },
            { name: 'Spezia Calcio', city: 'La Spezia', short: 'SPE', strength: 58 },
            { name: 'Benevento Calcio', city: 'Benevento', short: 'BEN', strength: 55 },
            { name: 'Crotone FC', city: 'Crotone', short: 'CRO', strength: 52 }
        ];

        return teamTemplates.map((template, index) => {
            const budgetMultiplier = this.getBudgetMultiplier(params.difficulty);
            const baseBudget = (template.strength / 100) * 10000000; // 10M base for top teams
            
            return {
                id: `team_${index + 1}`,
                name: template.name,
                short_name: template.short,
                city: template.city,
                league_position: null,
                points: 0,
                matches_played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goals_for: 0,
                goals_against: 0,
                budget: Math.round(baseBudget * budgetMultiplier),
                is_user_team: index === 0, // First team is user team
                formation: '4-4-2',
                team_morale: 50 + (Math.random() * 20), // 50-70 base morale
                team_strength: template.strength,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        });
    }

    getBudgetMultiplier(difficulty) {
        switch (difficulty) {
            case 'easy': return 1.5;
            case 'hard': return 0.7;
            default: return 1.0;
        }
    }

    generateAllPlayers(teams) {
        const allPlayers = [];
        
        teams.forEach(team => {
            const teamPlayers = this.generateTeamPlayers(team);
            allPlayers.push(...teamPlayers);
        });

        return allPlayers;
    }

    generateTeamPlayers(team) {
        const positions = [
            { pos: 'GK', count: 2 },
            { pos: 'DEF', count: 8 },
            { pos: 'MID', count: 8 },
            { pos: 'ATT', count: 6 }
        ];

        const firstNames = [
            'Marco', 'Luca', 'Andrea', 'Francesco', 'Alessandro', 'Matteo', 
            'Lorenzo', 'Davide', 'Simone', 'Federico', 'Gabriele', 'Riccardo',
            'Stefano', 'Antonio', 'Giuseppe', 'Roberto', 'Paolo', 'Fabio'
        ];
        
        const lastNames = [
            'Rossi', 'Bianchi', 'Ferrari', 'Russo', 'Romano', 'Gallo', 
            'Costa', 'Fontana', 'Ricci', 'Marino', 'Greco', 'Bruno',
            'Galli', 'Conti', 'De Luca', 'Mancini', 'Rizzo', 'Lombardi'
        ];

        const players = [];
        let playerIndex = 0;

        positions.forEach(posData => {
            for (let i = 0; i < posData.count; i++) {
                const age = 18 + Math.floor(Math.random() * 17); // 18-34 years
                const baseRating = this.calculatePlayerRating(team.team_strength, posData.pos, age);
                const potential = Math.min(99, baseRating + Math.floor(Math.random() * 15) + 5);

                const player = {
                    id: `player_${team.id}_${playerIndex++}`,
                    team_id: team.id,
                    first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
                    last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: age,
                    position: posData.pos,
                    secondary_position: Math.random() < 0.3 ? this.getSecondaryPosition(posData.pos) : null,
                    overall_rating: baseRating,
                    potential: potential,
                    pace: this.generateAttributeValue(baseRating, posData.pos, 'pace'),
                    shooting: this.generateAttributeValue(baseRating, posData.pos, 'shooting'),
                    passing: this.generateAttributeValue(baseRating, posData.pos, 'passing'),
                    dribbling: this.generateAttributeValue(baseRating, posData.pos, 'dribbling'),
                    defending: this.generateAttributeValue(baseRating, posData.pos, 'defending'),
                    physical: this.generateAttributeValue(baseRating, posData.pos, 'physical'),
                    stamina: 80 + Math.floor(Math.random() * 20),
                    fitness: 85 + Math.floor(Math.random() * 15),
                    morale: 40 + Math.floor(Math.random() * 40),
                    injury_status: 'healthy',
                    injury_days: 0,
                    market_value: this.calculateMarketValue(baseRating, age, potential),
                    salary: this.calculateSalary(baseRating, age),
                    contract_expires: new Date(Date.now() + (1 + Math.random() * 4) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                    goals_scored: 0,
                    assists: 0,
                    yellow_cards: 0,
                    red_cards: 0,
                    matches_played: 0,
                    is_captain: i === 0 && posData.pos === 'DEF', // First defender is captain
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                players.push(player);
            }
        });

        return players;
    }

    calculatePlayerRating(teamStrength, position, age) {
        // Base rating influenced by team strength
        let baseRating = teamStrength * 0.6 + Math.random() * 30; // 60% team influence + 30% randomness
        
        // Age factor
        if (age <= 22) baseRating *= 0.85; // Young players start lower
        else if (age >= 32) baseRating *= 0.9; // Older players decline
        
        // Position adjustments for team balance
        if (position === 'GK') baseRating += Math.random() * 10 - 5;
        
        return Math.max(45, Math.min(95, Math.round(baseRating)));
    }

    generateAttributeValue(baseRating, position, attribute) {
        let modifier = 0;
        
        // Position-based modifiers
        const positionModifiers = {
            'GK': {
                'defending': 15, 'shooting': -25, 'dribbling': -15, 
                'passing': -5, 'pace': -10, 'physical': 5
            },
            'DEF': {
                'defending': 20, 'physical': 15, 'shooting': -20, 
                'dribbling': -10, 'pace': -5, 'passing': 5
            },
            'MID': {
                'passing': 15, 'dribbling': 10, 'defending': 5, 
                'shooting': 0, 'pace': 5, 'physical': 0
            },
            'ATT': {
                'shooting': 20, 'pace': 15, 'dribbling': 10, 
                'defending': -20, 'physical': 5, 'passing': 0
            }
        };

        modifier = positionModifiers[position]?.[attribute] || 0;
        
        const value = baseRating + modifier + (Math.random() * 20 - 10);
        return Math.max(1, Math.min(99, Math.round(value)));
    }

    getSecondaryPosition(primaryPosition) {
        const secondaryMap = {
            'GK': [],
            'DEF': ['MID'],
            'MID': ['DEF', 'ATT'],
            'ATT': ['MID']
        };
        
        const options = secondaryMap[primaryPosition] || [];
        return options.length > 0 ? options[Math.floor(Math.random() * options.length)] : null;
    }

    calculateMarketValue(rating, age, potential) {
        let baseValue = rating * 100000; // 100k per rating point
        
        // Age factor
        const ageFactor = age <= 20 ? 1.4 : 
                         age <= 25 ? 1.6 : 
                         age <= 28 ? 1.5 : 
                         age <= 32 ? 1.0 : 0.6;
        
        // Potential factor
        const potentialBonus = (potential - rating) * 50000;
        
        return Math.round((baseValue * ageFactor) + potentialBonus);
    }

    calculateSalary(rating, age) {
        let baseSalary = rating * 800; // 800 per rating point per week
        
        // Experience premium for older players
        if (age >= 28) baseSalary *= 1.3;
        else if (age <= 21) baseSalary *= 0.7;

        return Math.round(baseSalary);
    }

    generateAllStaff(teams) {
        const allStaff = [];
        
        teams.forEach(team => {
            const teamStaff = this.generateTeamStaff(team);
            allStaff.push(...teamStaff);
        });

        return allStaff;
    }

    generateTeamStaff(team) {
        const staffRoles = [
            { role: 'head_coach', count: 1 },
            { role: 'assistant_coach', count: 2 },
            { role: 'fitness_coach', count: 1 },
            { role: 'scout', count: 2 },
            { role: 'physio', count: 1 }
        ];

        const firstNames = ['Roberto', 'Massimo', 'Claudio', 'Fabio', 'Gianluca', 'Paolo', 'Maurizio', 'Vincenzo'];
        const lastNames = ['Mancini', 'Allegri', 'Ancelotti', 'Conte', 'Spalletti', 'Sarri', 'Pioli', 'Gasperini'];

        const staff = [];
        let staffIndex = 0;

        staffRoles.forEach(roleData => {
            for (let i = 0; i < roleData.count; i++) {
                const experience = 1 + Math.floor(Math.random() * 15);
                const baseSkill = 40 + Math.floor(Math.random() * 40);

                const staffMember = {
                    id: `staff_${team.id}_${staffIndex++}`,
                    team_id: team.id,
                    first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
                    last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: 30 + Math.floor(Math.random() * 25),
                    role: roleData.role,
                    experience_years: experience,
                    coaching_ability: roleData.role.includes('coach') ? baseSkill + Math.floor(Math.random() * 20) : null,
                    tactical_knowledge: roleData.role.includes('coach') ? baseSkill + Math.floor(Math.random() * 20) : null,
                    motivational_skills: baseSkill + Math.floor(Math.random() * 15),
                    fitness_expertise: roleData.role === 'fitness_coach' ? baseSkill + 20 : null,
                    scouting_ability: roleData.role === 'scout' ? baseSkill + 15 : null,
                    medical_expertise: roleData.role === 'physio' ? baseSkill + 15 : null,
                    specialization: null,
                    preferred_formation: roleData.role === 'head_coach' ? '4-4-2' : null,
                    preferred_style: roleData.role === 'head_coach' ? 'balanced' : null,
                    salary: this.calculateStaffSalary(roleData.role, experience),
                    contract_expires: new Date(Date.now() + (2 + Math.random() * 3) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                    reputation: baseSkill,
                    morale: 50 + Math.floor(Math.random() * 30),
                    loyalty: 50 + Math.floor(Math.random() * 30),
                    is_head_of_department: i === 0,
                    languages: ['Italiano'],
                    achievements: [],
                    injury_proneness_reduction: roleData.role === 'physio' ? 5 + Math.floor(Math.random() * 10) : null,
                    training_efficiency_bonus: roleData.role.includes('coach') ? 2 + Math.floor(Math.random() * 8) : null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                staff.push(staffMember);
            }
        });

        return staff;
    }

    calculateStaffSalary(role, experience) {
        const baseSalaries = {
            'head_coach': 8000,
            'assistant_coach': 3000,
            'fitness_coach': 2000,
            'scout': 1500,
            'physio': 1800
        };

        const base = baseSalaries[role] || 1000;
        return base + (experience * 200);
    }

    generateSeasonCalendar(teams) {
        const matches = [];
        const totalTeams = teams.length;
        const matchesPerTeam = (totalTeams - 1) * 2; // Home and away
        
        let matchId = 1;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 7); // Start in a week

        // Generate round-robin schedule
        for (let round = 0; round < totalTeams - 1; round++) {
            for (let match = 0; match < totalTeams / 2; match++) {
                const home = (round + match) % (totalTeams - 1);
                let away = (totalTeams - 1 - match + round) % (totalTeams - 1);
                
                if (match === 0) {
                    away = totalTeams - 1;
                }

                // First half of season
                matches.push(this.createMatch(
                    matchId++, 
                    teams[home], 
                    teams[away], 
                    new Date(currentDate), 
                    round + 1
                ));

                // Second half of season (return fixtures)
                const returnDate = new Date(currentDate);
                returnDate.setDate(currentDate.getDate() + (totalTeams - 1) * 7);
                
                matches.push(this.createMatch(
                    matchId++, 
                    teams[away], 
                    teams[home], 
                    returnDate, 
                    round + 1 + (totalTeams - 1)
                ));
            }
            
            // Next matchday
            currentDate.setDate(currentDate.getDate() + 7);
        }

        return matches.sort((a, b) => new Date(a.match_date) - new Date(b.match_date));
    }

    createMatch(id, homeTeam, awayTeam, date, matchday) {
        const isUserMatch = homeTeam.is_user_team || awayTeam.is_user_team;
        
        return {
            id: `match_${id}`,
            home_team_id: homeTeam.id,
            away_team_id: awayTeam.id,
            match_date: date.toISOString(),
            matchday: matchday,
            status: 'scheduled',
            home_goals: null,
            away_goals: null,
            home_formation: homeTeam.formation,
            away_formation: awayTeam.formation,
            home_lineup: null,
            away_lineup: null,
            home_substitutions: null,
            away_substitutions: null,
            attendance: null,
            weather: this.getRandomWeather(),
            referee: this.getRandomReferee(),
            match_report_id: null,
            is_user_match: isUserMatch,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    getRandomWeather() {
        const conditions = ['sunny', 'cloudy', 'rainy'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    }

    getRandomReferee() {
        const referees = ['Orsato', 'Rocchi', 'Doveri', 'Mariani', 'Massa', 'Valeri', 'Irrati', 'Chiffi'];
        return referees[Math.floor(Math.random() * referees.length)];
    }

    generateDefaultTactics(teams, players) {
        const tactics = [];

        teams.forEach(team => {
            const teamPlayers = players.filter(p => p.team_id === team.id);
            
            const tactic = {
                id: `tactic_${team.id}_default`,
                team_id: team.id,
                tactic_name: 'Tattica Principale',
                formation: team.formation,
                mentality: 'balanced',
                tempo: 'normal',
                width: 'normal',
                pressing: 'medium',
                defensive_line: 'normal',
                passing_style: 'mixed',
                crossing: 'normal',
                player_positions: this.generateDefaultPositions(team.formation),
                player_roles: this.generateDefaultRoles(team.formation),
                set_pieces: [],
                captain_id: teamPlayers.find(p => p.is_captain)?.id || null,
                penalty_taker_id: null,
                free_kick_taker_id: null,
                corner_taker_id: null,
                is_default: true,
                effectiveness_rating: 70,
                matches_used: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            tactics.push(tactic);
        });

        return tactics;
    }

    generateDefaultPositions(formation) {
        const formations = {
            '4-4-2': [
                { x: 50, y: 90 }, // GK
                { x: 20, y: 75 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 75 }, // DEF
                { x: 20, y: 50 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 80, y: 50 }, // MID
                { x: 35, y: 25 }, { x: 65, y: 25 } // ATT
            ]
        };

        return formations[formation] || formations['4-4-2'];
    }

    generateDefaultRoles(formation) {
        return [
            'goalkeeper', 'defender', 'defender', 'defender', 'defender',
            'midfielder', 'midfielder', 'midfielder', 'midfielder',
            'forward', 'forward'
        ];
    }

    initializeMoraleStatus(players, teams) {
        const moraleStatus = [];

        // Player morale status
        players.forEach(player => {
            moraleStatus.push({
                id: `morale_player_${player.id}`,
                entity_type: 'player',
                entity_id: player.id,
                current_morale: player.morale,
                base_morale: 50,
                recent_results_impact: 0,
                training_impact: 0,
                transfer_impact: 0,
                injury_impact: 0,
                team_chemistry_impact: 0,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: 'stable',
                last_significant_event: 'season_start',
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });

        // Team morale status
        teams.forEach(team => {
            moraleStatus.push({
                id: `morale_team_${team.id}`,
                entity_type: 'team',
                entity_id: team.id,
                current_morale: team.team_morale,
                base_morale: 50,
                recent_results_impact: 0,
                training_impact: 0,
                transfer_impact: 0,
                injury_impact: 0,
                team_chemistry_impact: 0,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: 'stable',
                last_significant_event: 'season_start',
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });

        return moraleStatus;
    }

    createUserSession(params, teams) {
        const userTeam = teams.find(t => t.is_user_team);
        
        return {
            sessionName: params.sessionName,
            userTeamId: userTeam?.id,
            totalPlaytime: 0,
            achievements: [],
            settings: params.settings
        };
    }
}