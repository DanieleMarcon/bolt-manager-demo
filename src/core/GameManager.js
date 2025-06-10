// Core game logic and data management
import { DataManager } from '../data/DataManager.js';

// Import Flow classes
import { TransferOfferFlow } from '../../bolt_src/flows/Transfer_Offer.js';
import { TransferProcessFlow } from '../../bolt_src/flows/Transfer_Process.js';
import { StaffAssignRoleFlow } from '../../bolt_src/flows/Staff_AssignRole.js';
import { ReportCompileHistoryFlow } from '../../bolt_src/flows/Report_CompileHistory.js';

export class GameManager {
    constructor() {
        this.dataManager = new DataManager();
        this.gameData = null;
        
        // Initialize Flow instances
        this.transferOfferFlow = new TransferOfferFlow(this);
        this.transferProcessFlow = new TransferProcessFlow(this);
        this.staffAssignRoleFlow = new StaffAssignRoleFlow(this);
        this.reportCompileHistoryFlow = new ReportCompileHistoryFlow(this);
    }

    async init() {
        console.log('🎮 GameManager initializing...');
        await this.dataManager.init();
        this.gameData = this.dataManager.getGameData();
        
        if (!this.gameData) {
            console.log('No existing game data found');
        } else {
            console.log('Game data loaded:', Object.keys(this.gameData));
        }
    }

    // Transfer Market Flow Methods
    async executeTransferOffer(params) {
        return await this.transferOfferFlow.execute(params);
    }

    async executeTransferProcess(params) {
        return await this.transferProcessFlow.execute(params);
    }

    // Staff Management Flow Methods
    async executeStaffAssignRole(params) {
        return await this.staffAssignRoleFlow.execute(params);
    }

    // History Report Flow Methods
    async executeReportCompileHistory(params) {
        return await this.reportCompileHistoryFlow.execute(params);
    }

    // Game state methods
    getCurrentDate() {
        return this.gameData?.currentDate || new Date().toISOString();
    }

    getUserTeam() {
        return this.gameData?.teams?.find(team => team.is_user_team);
    }

    getUserPlayers() {
        const userTeam = this.getUserTeam();
        if (!userTeam) return [];
        
        return this.gameData?.players?.filter(player => player.team_id === userTeam.id) || [];
    }

    getPlayersByTeam(teamId) {
        return this.gameData?.players?.filter(player => player.team_id === teamId) || [];
    }

    getTeamTactics(teamId) {
        return this.gameData?.tactics?.find(tactic => tactic.team_id === teamId && tactic.is_default);
    }

    getPlayerMorale(playerId) {
        return this.gameData?.moraleStatus?.find(m => m.entity_id === playerId && m.entity_type === 'player');
    }

    getUpcomingMatches(teamId, limit = 5) {
        const currentDate = new Date(this.getCurrentDate());
        
        return this.gameData?.matches?.filter(match => 
            (match.home_team_id === teamId || match.away_team_id === teamId) &&
            new Date(match.match_date) > currentDate &&
            match.status === 'scheduled'
        ).sort((a, b) => new Date(a.match_date) - new Date(b.match_date)).slice(0, limit) || [];
    }

    getRecentMatches(teamId, limit = 5) {
        const currentDate = new Date(this.getCurrentDate());
        
        return this.gameData?.matches?.filter(match => 
            (match.home_team_id === teamId || match.away_team_id === teamId) &&
            new Date(match.match_date) <= currentDate &&
            match.status === 'finished'
        ).sort((a, b) => new Date(b.match_date) - new Date(a.match_date)).slice(0, limit) || [];
    }

    getMatchReport(matchId) {
        return this.gameData?.matchReports?.find(report => report.match_id === matchId);
    }

    getUpcomingEvents(days = 7) {
        const currentDate = new Date(this.getCurrentDate());
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + days);

        const events = [];

        // Add matches
        this.gameData?.matches?.forEach(match => {
            const matchDate = new Date(match.match_date);
            if (matchDate >= currentDate && matchDate <= endDate && match.is_user_match) {
                const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
                const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
                
                events.push({
                    date: matchDate,
                    type: 'match',
                    title: `${homeTeam?.short_name || 'HOME'} vs ${awayTeam?.short_name || 'AWAY'}`,
                    description: `Giornata ${match.matchday}`,
                    priority: 4
                });
            }
        });

        // Add trainings
        this.gameData?.trainings?.forEach(training => {
            const trainingDate = new Date(training.training_date);
            if (trainingDate >= currentDate && trainingDate <= endDate) {
                events.push({
                    date: trainingDate,
                    type: 'training',
                    title: `Allenamento ${training.training_type}`,
                    description: `Intensità ${training.intensity}`,
                    priority: 2
                });
            }
        });

        return events.sort((a, b) => a.date - b.date);
    }

    // History and Reports methods
    getPlayerAttributesHistory(playerId, startDate = null, endDate = null) {
        let history = this.gameData?.attributesHistory?.filter(record => record.player_id === playerId) || [];
        
        if (startDate) {
            const start = new Date(startDate);
            history = history.filter(record => new Date(record.record_date) >= start);
        }
        
        if (endDate) {
            const end = new Date(endDate);
            history = history.filter(record => new Date(record.record_date) <= end);
        }
        
        return history.sort((a, b) => new Date(a.record_date) - new Date(b.record_date));
    }

    getPlayerMatchHistory(playerId, startDate = null, endDate = null) {
        const playerMatches = [];
        
        this.gameData?.matchReports?.forEach(report => {
            const playerRating = report.player_ratings?.find(rating => rating.player_id === playerId);
            if (playerRating) {
                const match = this.gameData.matches.find(m => m.id === report.match_id);
                if (match) {
                    const matchDate = new Date(match.match_date);
                    
                    // Apply date filters
                    if (startDate && matchDate < new Date(startDate)) return;
                    if (endDate && matchDate > new Date(endDate)) return;
                    
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
        
        return playerMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getSavedHistoryReports() {
        return this.gameData?.historyReports || [];
    }

    getHistoryReport(reportId) {
        const savedReport = this.gameData?.historyReports?.find(r => r.id === reportId);
        if (savedReport && savedReport.full_report_data) {
            try {
                return JSON.parse(savedReport.full_report_data);
            } catch (error) {
                console.error('Error parsing saved report:', error);
                return null;
            }
        }
        return null;
    }

    // Save/Load methods
    saveGameData() {
        this.dataManager.saveToStorage(this.gameData, null);
    }

    getCurrentSession() {
        return this.dataManager.getCurrentSession();
    }

    getSavedSessions() {
        // For now, return mock sessions. In a real implementation, 
        // this would load from localStorage or a database
        const currentSession = this.getCurrentSession();
        const sessions = [];
        
        if (currentSession) {
            sessions.push({
                id: 'session_1',
                session_name: currentSession.session_name || 'Sessione Corrente',
                user_team_name: this.getUserTeam()?.name || 'Squadra Sconosciuta',
                current_season: currentSession.current_season || 1,
                current_matchday: currentSession.current_matchday || 1,
                current_date: this.getCurrentDate(),
                last_played: new Date().toISOString(),
                total_playtime: currentSession.total_playtime || 0,
                is_active: true
            });
        }

        return sessions;
    }

    async saveSession(sessionName = null) {
        const userTeam = this.getUserTeam();
        const session = {
            id: 'session_' + Date.now(),
            session_name: sessionName || `Carriera ${userTeam?.name || 'Manager'}`,
            user_team_id: userTeam?.id,
            user_team_name: userTeam?.name,
            current_season: 1,
            current_matchday: 1,
            current_date: this.getCurrentDate(),
            total_budget: userTeam?.budget || 0,
            achievements: [],
            difficulty_level: 'normal',
            game_speed: 'normal',
            auto_save: true,
            last_played: new Date().toISOString(),
            total_playtime: 0,
            is_active: true,
            save_data: JSON.stringify(this.gameData),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        this.dataManager.saveToStorage(this.gameData, session);
        return session;
    }

    async loadSession(sessionId) {
        // For now, just load from current storage
        // In a real implementation, this would load specific session data
        const savedData = this.dataManager.getGameData();
        if (savedData) {
            this.gameData = savedData;
            return true;
        }
        return false;
    }

    // Game initialization
    async startNewGame() {
        console.log('🎯 Starting new game...');
        
        // Initialize game data structure
        this.gameData = {
            teams: [],
            players: [],
            staff: [],
            matches: [],
            tactics: [],
            trainings: [],
            transfers: [],
            gameEvents: [],
            matchReports: [],
            moraleStatus: [],
            userSessions: [],
            userSettings: [],
            attributesHistory: [],
            historyReports: [], // Add history reports dataset
            currentDate: new Date().toISOString()
        };

        // Generate teams
        this.generateTeams();
        
        // Generate players for each team
        this.generatePlayers();
        
        // Generate staff for each team
        this.generateStaff();
        
        // Generate season calendar
        this.generateSeasonCalendar();
        
        // Set user team
        this.setUserTeam();
        
        // Initialize morale status
        this.initializeMoraleStatus();
        
        // Save initial state
        this.saveGameData();
        
        console.log('✅ New game created successfully');
        return this.gameData;
    }

    generateTeams() {
        const teamNames = [
            { name: 'AC Milano', city: 'Milano', short_name: 'MIL' },
            { name: 'Inter Milano', city: 'Milano', short_name: 'INT' },
            { name: 'Juventus FC', city: 'Torino', short_name: 'JUV' },
            { name: 'AS Roma', city: 'Roma', short_name: 'ROM' },
            { name: 'SSC Napoli', city: 'Napoli', short_name: 'NAP' },
            { name: 'ACF Fiorentina', city: 'Firenze', short_name: 'FIO' },
            { name: 'SS Lazio', city: 'Roma', short_name: 'LAZ' },
            { name: 'Atalanta BC', city: 'Bergamo', short_name: 'ATA' },
            { name: 'Torino FC', city: 'Torino', short_name: 'TOR' },
            { name: 'UC Sampdoria', city: 'Genova', short_name: 'SAM' },
            { name: 'Genoa CFC', city: 'Genova', short_name: 'GEN' },
            { name: 'Bologna FC', city: 'Bologna', short_name: 'BOL' },
            { name: 'Udinese Calcio', city: 'Udine', short_name: 'UDI' },
            { name: 'Hellas Verona', city: 'Verona', short_name: 'VER' },
            { name: 'Cagliari Calcio', city: 'Cagliari', short_name: 'CAG' },
            { name: 'Spezia Calcio', city: 'La Spezia', short_name: 'SPE' },
            { name: 'US Sassuolo', city: 'Sassuolo', short_name: 'SAS' },
            { name: 'Venezia FC', city: 'Venezia', short_name: 'VEN' },
            { name: 'Empoli FC', city: 'Empoli', short_name: 'EMP' },
            { name: 'US Salernitana', city: 'Salerno', short_name: 'SAL' }
        ];

        this.gameData.teams = teamNames.map((team, index) => ({
            id: `team_${index + 1}`,
            name: team.name,
            short_name: team.short_name,
            city: team.city,
            league_position: null,
            points: 0,
            matches_played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goals_for: 0,
            goals_against: 0,
            budget: 1000000 + Math.random() * 50000000, // 1M to 51M
            is_user_team: false,
            formation: '4-4-2',
            team_morale: 50 + Math.random() * 30, // 50-80
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));
    }

    generatePlayers() {
        const firstNames = ['Marco', 'Luca', 'Andrea', 'Francesco', 'Alessandro', 'Matteo', 'Lorenzo', 'Davide', 'Simone', 'Federico', 'Gabriele', 'Riccardo', 'Stefano', 'Antonio', 'Giuseppe'];
        const lastNames = ['Rossi', 'Bianchi', 'Ferrari', 'Russo', 'Romano', 'Gallo', 'Costa', 'Fontana', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Galli', 'Conti', 'De Luca'];
        const positions = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'ATT', 'ATT'];

        this.gameData.players = [];
        let playerId = 1;

        this.gameData.teams.forEach(team => {
            // Generate 25 players per team
            for (let i = 0; i < 25; i++) {
                const position = positions[i % positions.length];
                const age = 18 + Math.floor(Math.random() * 17); // 18-34
                const baseRating = 45 + Math.random() * 40; // 45-85
                
                const player = {
                    id: `player_${playerId++}`,
                    team_id: team.id,
                    first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
                    last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: age,
                    position: position,
                    secondary_position: Math.random() > 0.7 ? positions[Math.floor(Math.random() * positions.length)] : null,
                    overall_rating: Math.round(baseRating),
                    potential: Math.round(baseRating + Math.random() * 15),
                    pace: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    shooting: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    passing: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    dribbling: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    defending: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    physical: Math.round(baseRating + (Math.random() - 0.5) * 20),
                    stamina: 80 + Math.random() * 20,
                    fitness: 80 + Math.random() * 20,
                    morale: 40 + Math.random() * 40,
                    injury_status: Math.random() > 0.9 ? 'minor' : 'healthy',
                    injury_days: Math.random() > 0.9 ? Math.floor(Math.random() * 14) : 0,
                    market_value: Math.round((baseRating * 100000) + Math.random() * 5000000),
                    salary: Math.round((baseRating * 1000) + Math.random() * 10000),
                    contract_expires: new Date(Date.now() + (1 + Math.random() * 4) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                    goals_scored: 0,
                    assists: 0,
                    yellow_cards: 0,
                    red_cards: 0,
                    matches_played: 0,
                    is_captain: i === 0, // First player is captain
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                // Adjust attributes based on position
                this.adjustPlayerAttributesByPosition(player);
                
                this.gameData.players.push(player);
            }
        });
    }

    adjustPlayerAttributesByPosition(player) {
        switch (player.position) {
            case 'GK':
                player.defending = Math.max(60, player.defending + 10);
                player.physical = Math.max(60, player.physical + 5);
                player.pace = Math.max(30, player.pace - 10);
                player.shooting = Math.max(20, player.shooting - 20);
                break;
            case 'DEF':
                player.defending = Math.max(60, player.defending + 15);
                player.physical = Math.max(60, player.physical + 10);
                player.shooting = Math.max(30, player.shooting - 10);
                player.dribbling = Math.max(40, player.dribbling - 5);
                break;
            case 'MID':
                player.passing = Math.max(60, player.passing + 15);
                player.dribbling = Math.max(55, player.dribbling + 10);
                player.physical = Math.max(50, player.physical + 5);
                break;
            case 'ATT':
                player.shooting = Math.max(60, player.shooting + 15);
                player.dribbling = Math.max(60, player.dribbling + 10);
                player.pace = Math.max(60, player.pace + 10);
                player.defending = Math.max(20, player.defending - 15);
                break;
        }

        // Ensure all attributes are within 1-99 range
        ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].forEach(attr => {
            player[attr] = Math.max(1, Math.min(99, player[attr]));
        });

        // Recalculate overall rating
        player.overall_rating = Math.round(
            (player.pace + player.shooting + player.passing + player.dribbling + player.defending + player.physical) / 6
        );
    }

    generateStaff() {
        const staffFirstNames = ['Roberto', 'Carlo', 'Massimo', 'Gianluca', 'Fabio', 'Claudio', 'Maurizio', 'Vincenzo', 'Gennaro', 'Luciano'];
        const staffLastNames = ['Mancini', 'Ancelotti', 'Allegri', 'Gasperini', 'Capello', 'Ranieri', 'Sarri', 'Spalletti', 'Gattuso', 'Pioli'];
        
        const staffRoles = [
            { role: 'head_coach', count: 1 },
            { role: 'assistant_coach', count: 2 },
            { role: 'fitness_coach', count: 1 },
            { role: 'scout', count: 2 },
            { role: 'physio', count: 1 }
        ];

        this.gameData.staff = [];
        let staffId = 1;

        this.gameData.teams.forEach(team => {
            staffRoles.forEach(roleInfo => {
                for (let i = 0; i < roleInfo.count; i++) {
                    const experience = 1 + Math.floor(Math.random() * 15); // 1-15 years
                    const baseSkill = 40 + Math.random() * 40; // 40-80

                    const staff = {
                        id: `staff_${staffId++}`,
                        team_id: team.id,
                        first_name: staffFirstNames[Math.floor(Math.random() * staffFirstNames.length)],
                        last_name: staffLastNames[Math.floor(Math.random() * staffLastNames.length)],
                        age: 30 + Math.floor(Math.random() * 25), // 30-54
                        role: roleInfo.role,
                        experience_years: experience,
                        coaching_ability: roleInfo.role.includes('coach') ? Math.round(baseSkill + Math.random() * 20) : null,
                        tactical_knowledge: roleInfo.role.includes('coach') ? Math.round(baseSkill + Math.random() * 20) : null,
                        motivational_skills: Math.round(baseSkill + Math.random() * 15),
                        fitness_expertise: roleInfo.role === 'fitness_coach' ? Math.round(baseSkill + 20) : null,
                        scouting_ability: roleInfo.role === 'scout' ? Math.round(baseSkill + 15) : null,
                        medical_expertise: roleInfo.role === 'physio' ? Math.round(baseSkill + 15) : null,
                        specialization: null,
                        preferred_formation: roleInfo.role === 'head_coach' ? '4-4-2' : null,
                        preferred_style: roleInfo.role === 'head_coach' ? 'balanced' : null,
                        salary: Math.round((baseSkill * 100) + (experience * 500)),
                        contract_expires: new Date(Date.now() + (1 + Math.random() * 3) * 365 * 24 * 60 * 60 * 1000).toISOString(),
                        reputation: Math.round(baseSkill + (experience * 2)),
                        morale: 50 + Math.random() * 30,
                        loyalty: 50 + Math.random() * 30,
                        is_head_of_department: i === 0, // First of each role is head
                        languages: ['Italiano'],
                        achievements: [],
                        injury_proneness_reduction: roleInfo.role === 'physio' ? Math.round(Math.random() * 20) : null,
                        training_efficiency_bonus: roleInfo.role.includes('coach') ? Math.round(Math.random() * 15) : null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    };

                    this.gameData.staff.push(staff);
                }
            });
        });
    }

    generateSeasonCalendar() {
        this.gameData.matches = [];
        const teams = this.gameData.teams;
        const numTeams = teams.length;
        let matchId = 1;

        // Generate round-robin schedule (each team plays every other team twice)
        for (let round = 0; round < (numTeams - 1) * 2; round++) {
            const matchday = Math.floor(round / (numTeams / 2)) + 1;
            const isSecondLeg = round >= numTeams - 1;

            for (let match = 0; match < numTeams / 2; match++) {
                let home = (round + match) % (numTeams - 1);
                let away = (numTeams - 1 - match + round) % (numTeams - 1);

                // Last team stays in place
                if (match === 0) {
                    away = numTeams - 1;
                }

                // Swap home/away for second leg
                if (isSecondLeg) {
                    [home, away] = [away, home];
                }

                // Calculate match date (weekly matches)
                const matchDate = new Date();
                matchDate.setDate(matchDate.getDate() + (matchday * 7));

                const matchData = {
                    id: `match_${matchId++}`,
                    home_team_id: teams[home].id,
                    away_team_id: teams[away].id,
                    match_date: matchDate.toISOString(),
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
                    is_user_match: false, // Will be set when user team is selected
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                this.gameData.matches.push(matchData);
            }
        }
    }

    setUserTeam() {
        // Set first team as user team for now
        if (this.gameData.teams.length > 0) {
            this.gameData.teams[0].is_user_team = true;
            
            // Update matches to mark user matches
            const userTeamId = this.gameData.teams[0].id;
            this.gameData.matches.forEach(match => {
                if (match.home_team_id === userTeamId || match.away_team_id === userTeamId) {
                    match.is_user_match = true;
                }
            });
        }
    }

    initializeMoraleStatus() {
        this.gameData.moraleStatus = [];
        
        // Initialize morale for all players
        this.gameData.players.forEach(player => {
            this.gameData.moraleStatus.push({
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
                last_significant_event: 'initialization',
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });

        // Initialize morale for all teams
        this.gameData.teams.forEach(team => {
            this.gameData.moraleStatus.push({
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
                last_significant_event: 'initialization',
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        });
    }

    // Training methods (from previous implementation)
    async executePlayerTrain(params) {
        console.log('🏃 Executing player training...', params);

        try {
            // Validate parameters
            if (!params.playerIds || !Array.isArray(params.playerIds) || params.playerIds.length === 0) {
                throw new Error('Lista giocatori mancante o vuota');
            }

            if (!params.trainingType || !params.intensity || !params.teamId) {
                throw new Error('Parametri allenamento incompleti');
            }

            // Create training record
            const trainingRecord = {
                id: `training_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                team_id: params.teamId,
                training_date: new Date().toISOString(),
                training_type: params.trainingType,
                intensity: params.intensity,
                focus_area: params.trainingType,
                duration_minutes: 90,
                participants: params.playerIds,
                individual_programs: [],
                staff_id: null,
                weather_conditions: 'normal',
                facility_quality: 70,
                injury_risk: this.calculateInjuryRisk(params.intensity),
                morale_impact: this.calculateMoraleImpact(params.trainingType, params.intensity),
                fitness_gain: this.calculateFitnessGain(params.intensity),
                skill_improvements: [],
                injuries_occurred: [],
                status: 'completed',
                notes: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Process each player
            const results = [];
            params.playerIds.forEach(playerId => {
                const player = this.gameData.players.find(p => p.id === playerId);
                if (!player) return;

                const result = this.processPlayerTraining(player, params.trainingType, params.intensity);
                results.push(result);

                // Update player attributes
                Object.keys(result.attributeChanges).forEach(attr => {
                    if (player[attr] !== undefined) {
                        player[attr] = Math.min(99, Math.max(1, player[attr] + result.attributeChanges[attr]));
                    }
                });

                // Update fitness and morale
                player.fitness = Math.min(100, Math.max(0, player.fitness + result.fitnessChange));
                player.morale = Math.min(100, Math.max(0, player.morale + result.moraleChange));

                // Handle injuries
                if (result.injury) {
                    player.injury_status = result.injury.severity;
                    player.injury_days = result.injury.days;
                    trainingRecord.injuries_occurred.push({
                        player_id: playerId,
                        injury_type: result.injury.type,
                        severity: result.injury.severity,
                        days: result.injury.days
                    });
                }

                // Create attribute history record
                this.createAttributeHistoryRecord(player, result.attributeChanges, trainingRecord.id);

                player.updated_at = new Date().toISOString();
            });

            // Add training to game data
            if (!this.gameData.trainings) {
                this.gameData.trainings = [];
            }
            this.gameData.trainings.push(trainingRecord);

            // Save game data
            this.saveGameData();

            return {
                success: true,
                trainingRecord: trainingRecord,
                results: results
            };

        } catch (error) {
            console.error('Error in executePlayerTrain:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    calculateInjuryRisk(intensity) {
        return Math.min(100, intensity * 5 + Math.random() * 20);
    }

    calculateMoraleImpact(trainingType, intensity) {
        let impact = 0;
        
        if (intensity <= 2) impact += 2; // Light training boosts morale
        else if (intensity >= 4) impact -= 1; // Heavy training can reduce morale
        
        return impact;
    }

    calculateFitnessGain(intensity) {
        return Math.min(10, intensity * 2 + Math.random() * 3);
    }

    processPlayerTraining(player, trainingType, intensity) {
        const result = {
            playerId: player.id,
            attributeChanges: {},
            fitnessChange: 0,
            moraleChange: 0,
            injury: null
        };

        // Calculate attribute improvements based on training type
        switch (trainingType) {
            case 'fitness':
                result.attributeChanges.physical = this.calculateAttributeImprovement(player.physical, intensity);
                result.attributeChanges.pace = this.calculateAttributeImprovement(player.pace, intensity * 0.7);
                result.fitnessChange = intensity * 2;
                break;
            case 'technical':
                result.attributeChanges.dribbling = this.calculateAttributeImprovement(player.dribbling, intensity);
                result.attributeChanges.passing = this.calculateAttributeImprovement(player.passing, intensity * 0.8);
                result.attributeChanges.shooting = this.calculateAttributeImprovement(player.shooting, intensity * 0.6);
                break;
            case 'tactical':
                result.attributeChanges.passing = this.calculateAttributeImprovement(player.passing, intensity * 0.8);
                result.attributeChanges.defending = this.calculateAttributeImprovement(player.defending, intensity * 0.7);
                result.moraleChange = 1; // Tactical training boosts understanding
                break;
        }

        // Calculate injury risk
        const injuryRoll = Math.random() * 100;
        const injuryThreshold = 95 - (intensity * 2); // Higher intensity = higher injury risk
        
        if (injuryRoll > injuryThreshold && player.fitness < 70) {
            result.injury = this.generateInjury();
        }

        // Calculate morale change
        result.moraleChange += this.calculateMoraleImpact(trainingType, intensity);
        
        // Age factor (older players improve less)
        if (player.age > 30) {
            Object.keys(result.attributeChanges).forEach(attr => {
                result.attributeChanges[attr] = Math.round(result.attributeChanges[attr] * 0.7);
            });
        }

        return result;
    }

    calculateAttributeImprovement(currentValue, intensity) {
        // Higher current value = slower improvement
        const improvementFactor = Math.max(0.1, (100 - currentValue) / 100);
        const baseImprovement = intensity * 0.5 * improvementFactor;
        const randomFactor = (Math.random() - 0.3) * 2; // -0.6 to 1.4
        
        return Math.max(0, Math.round(baseImprovement * randomFactor));
    }

    generateInjury() {
        const injuries = [
            { type: 'muscle_strain', severity: 'minor', days: 3 + Math.floor(Math.random() * 7) },
            { type: 'ankle_sprain', severity: 'minor', days: 5 + Math.floor(Math.random() * 10) },
            { type: 'knee_injury', severity: 'major', days: 14 + Math.floor(Math.random() * 21) },
            { type: 'hamstring', severity: 'minor', days: 7 + Math.floor(Math.random() * 14) }
        ];

        const injury = injuries[Math.floor(Math.random() * injuries.length)];
        return {
            ...injury,
            description: `${injury.type.replace('_', ' ')} - ${injury.days} giorni`
        };
    }

    createAttributeHistoryRecord(player, attributeChanges, trainingId) {
        if (!this.gameData.attributesHistory) {
            this.gameData.attributesHistory = [];
        }

        const historyRecord = {
            id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            player_id: player.id,
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
            season: 1,
            player_age_at_time: player.age,
            is_significant_change: Object.values(attributeChanges).some(change => Math.abs(change) >= 2),
            created_at: new Date().toISOString()
        };

        this.gameData.attributesHistory.push(historyRecord);
    }

    scheduleTraining(params) {
        const training = {
            id: `training_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            team_id: params.teamId,
            training_date: params.date,
            training_type: params.type,
            intensity: params.intensity,
            focus_area: params.type,
            duration_minutes: 90,
            participants: params.playerIds,
            individual_programs: [],
            staff_id: null,
            weather_conditions: null,
            facility_quality: 70,
            injury_risk: this.calculateInjuryRisk(params.intensity),
            morale_impact: null,
            fitness_gain: null,
            skill_improvements: [],
            injuries_occurred: [],
            status: 'scheduled',
            notes: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        if (!this.gameData.trainings) {
            this.gameData.trainings = [];
        }
        this.gameData.trainings.push(training);
        this.saveGameData();

        return training;
    }

    // Tactical methods (from previous implementation)
    async updateTactics(params) {
        console.log('⚙️ Updating tactics...', params);

        try {
            // Validate parameters
            if (!params.teamId || !params.formation) {
                throw new Error('Parametri tattici incompleti');
            }

            // Find existing tactics or create new
            let tactics = this.gameData.tactics?.find(t => t.team_id === params.teamId && t.is_default);
            
            if (!tactics) {
                // Create new tactics record
                tactics = {
                    id: `tactics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    team_id: params.teamId,
                    tactic_name: params.tacticName || 'Tattica Principale',
                    formation: params.formation,
                    mentality: params.mentality || 'balanced',
                    tempo: params.tempo || 'normal',
                    width: params.width || 'normal',
                    pressing: params.pressing || 'medium',
                    defensive_line: params.defensiveLine || 'normal',
                    passing_style: params.passingStyle || 'mixed',
                    crossing: params.crossing || 'normal',
                    player_positions: params.playerPositions || [],
                    player_roles: params.playerRoles || [],
                    set_pieces: params.setPieces || [],
                    captain_id: params.captainId || null,
                    penalty_taker_id: params.penaltyTakerId || null,
                    free_kick_taker_id: params.freeKickTakerId || null,
                    corner_taker_id: params.cornerTakerId || null,
                    is_default: true,
                    effectiveness_rating: null,
                    matches_used: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                if (!this.gameData.tactics) {
                    this.gameData.tactics = [];
                }
                this.gameData.tactics.push(tactics);
            } else {
                // Update existing tactics
                tactics.formation = params.formation;
                tactics.mentality = params.mentality || tactics.mentality;
                tactics.tempo = params.tempo || tactics.tempo;
                tactics.width = params.width || tactics.width;
                tactics.pressing = params.pressing || tactics.pressing;
                tactics.defensive_line = params.defensiveLine || tactics.defensive_line;
                tactics.passing_style = params.passingStyle || tactics.passing_style;
                tactics.crossing = params.crossing || tactics.crossing;
                tactics.player_positions = params.playerPositions || tactics.player_positions;
                tactics.player_roles = params.playerRoles || tactics.player_roles;
                tactics.set_pieces = params.setPieces || tactics.set_pieces;
                tactics.captain_id = params.captainId || tactics.captain_id;
                tactics.penalty_taker_id = params.penaltyTakerId || tactics.penalty_taker_id;
                tactics.free_kick_taker_id = params.freeKickTakerId || tactics.free_kick_taker_id;
                tactics.corner_taker_id = params.cornerTakerId || tactics.corner_taker_id;
                tactics.updated_at = new Date().toISOString();
            }

            // Update team formation
            const team = this.gameData.teams.find(t => t.id === params.teamId);
            if (team) {
                team.formation = params.formation;
                team.updated_at = new Date().toISOString();
            }

            // Save game data
            this.saveGameData();

            return {
                success: true,
                tactics: tactics
            };

        } catch (error) {
            console.error('Error updating tactics:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Match simulation methods (from previous implementation)
    async simulateMatch(matchId) {
        console.log('⚽ Simulating match...', matchId);

        try {
            const match = this.gameData.matches.find(m => m.id === matchId);
            if (!match) {
                throw new Error('Partita non trovata');
            }

            if (match.status !== 'scheduled') {
                throw new Error('La partita non è programmata');
            }

            // Get teams and players
            const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
            const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
            const homePlayers = this.getPlayersByTeam(match.home_team_id).filter(p => p.injury_status === 'healthy').slice(0, 11);
            const awayPlayers = this.getPlayersByTeam(match.away_team_id).filter(p => p.injury_status === 'healthy').slice(0,11);

            // Calculate team strengths
            const homeStrength = this.calculateTeamStrength(homePlayers, homeTeam);
            const awayStrength = this.calculateTeamStrength(awayPlayers, awayTeam);

            // Simulate match events
            const simulation = this.runMatchSimulation(homeStrength, awayStrength, homePlayers, awayPlayers);

            // Update match record
            match.status = 'finished';
            match.home_goals = simulation.homeGoals;
            match.away_goals = simulation.awayGoals;
            match.home_formation = homeTeam.formation || '4-4-2';
            match.away_formation = awayTeam.formation || '4-4-2';
            match.home_lineup = homePlayers.map(p => p.id);
            match.away_lineup = awayPlayers.map(p => p.id);
            match.attendance = Math.floor(20000 + Math.random() * 60000);
            match.weather = ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)];
            match.referee = 'Arbitro ' + Math.floor(Math.random() * 100);
            match.updated_at = new Date().toISOString();

            // Update team standings
            this.updateTeamStandings(match);

            // Update player statistics
            this.updatePlayerStatistics(simulation.events, homePlayers, awayPlayers);

            // Create match report
            const matchReport = this.createMatchReport(match, simulation);
            match.match_report_id = matchReport.id;

            // Update morale based on result
            this.updateMoraleAfterMatch(match, homeTeam, awayTeam);

            // Save game data
            this.saveGameData();

            return {
                success: true,
                match: match,
                report: matchReport,
                events: simulation.events,
                stats: simulation.stats
            };

        } catch (error) {
            console.error('Error simulating match:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    calculateTeamStrength(players, team) {
        const avgRating = players.reduce((sum, p) => sum + p.overall_rating, 0) / players.length;
        const moraleBonus = (team.team_morale - 50) / 10; // -5 to +5
        const homeBonus = 2; // Assume home advantage for now
        
        return avgRating + moraleBonus + homeBonus;
    }

    runMatchSimulation(homeStrength, awayStrength, homePlayers, awayPlayers) {
        const events = [];
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

        let homeGoals = 0;
        let awayGoals = 0;

        // Adjust possession based on team strength
        const strengthDiff = homeStrength - awayStrength;
        stats.home_possession = Math.max(30, Math.min(70, 50 + strengthDiff));
        stats.away_possession = 100 - stats.home_possession;

        // Simulate 90 minutes
        for (let minute = 1; minute <= 90; minute++) {
            // Random events based on team strength and possession
            if (Math.random() < 0.15) { // 15% chance of event per minute
                const isHomeEvent = Math.random() < (stats.home_possession / 100);
                const eventType = this.getRandomEventType();
                
                switch (eventType) {
                    case 'shot':
                        if (isHomeEvent) {
                            stats.home_shots++;
                            if (Math.random() < 0.4) stats.home_shots_on_target++;
                            
                            // Goal chance
                            if (Math.random() < 0.15) {
                                homeGoals++;
                                const scorer = homePlayers[Math.floor(Math.random() * homePlayers.length)];
                                events.push({
                                    minute,
                                    type: 'goal',
                                    team: 'home',
                                    player: scorer.id,
                                    description: `⚽ Gol di ${scorer.first_name} ${scorer.last_name}!`
                                });
                            }
                        } else {
                            stats.away_shots++;
                            if (Math.random() < 0.4) stats.away_shots_on_target++;
                            
                            if (Math.random() < 0.15) {
                                awayGoals++;
                                const scorer = awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
                                events.push({
                                    minute,
                                    type: 'goal',
                                    team: 'away',
                                    player: scorer.id,
                                    description: `⚽ Gol di ${scorer.first_name} ${scorer.last_name}!`
                                });
                            }
                        }
                        break;
                        
                    case 'corner':
                        if (isHomeEvent) {
                            stats.home_corners++;
                        } else {
                            stats.away_corners++;
                        }
                        break;
                        
                    case 'foul':
                        if (isHomeEvent) {
                            stats.home_fouls++;
                        } else {
                            stats.away_fouls++;
                        }
                        
                        // Yellow card chance
                        if (Math.random() < 0.2) {
                            const players = isHomeEvent ? homePlayers : awayPlayers;
                            const player = players[Math.floor(Math.random() * players.length)];
                            
                            if (isHomeEvent) {
                                stats.home_yellow_cards++;
                            } else {
                                stats.away_yellow_cards++;
                            }
                            
                            events.push({
                                minute,
                                type: 'yellow_card',
                                team: isHomeEvent ? 'home' : 'away',
                                player: player.id,
                                description: `🟨 Cartellino giallo per ${player.first_name} ${player.last_name}`
                            });
                        }
                        break;
                }
            }
        }

        // Generate additional stats
        stats.home_passes = Math.floor(300 + (stats.home_possession * 5) + Math.random() * 200);
        stats.away_passes = Math.floor(300 + (stats.away_possession * 5) + Math.random() * 200);

        return {
            homeGoals,
            awayGoals,
            events,
            stats
        };
    }

    getRandomEventType() {
        const events = ['shot', 'shot', 'shot', 'corner', 'foul', 'foul'];
        return events[Math.floor(Math.random() * events.length)];
    }

    updateTeamStandings(match) {
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);

        // Update matches played
        homeTeam.matches_played++;
        awayTeam.matches_played++;

        // Update goals
        homeTeam.goals_for += match.home_goals;
        homeTeam.goals_against += match.away_goals;
        awayTeam.goals_for += match.away_goals;
        awayTeam.goals_against += match.home_goals;

        // Update results and points
        if (match.home_goals > match.away_goals) {
            // Home win
            homeTeam.wins++;
            homeTeam.points += 3;
            awayTeam.losses++;
        } else if (match.away_goals > match.home_goals) {
            // Away win
            awayTeam.wins++;
            awayTeam.points += 3;
            homeTeam.losses++;
        } else {
            // Draw
            homeTeam.draws++;
            awayTeam.draws++;
            homeTeam.points++;
            awayTeam.points++;
        }

        homeTeam.updated_at = new Date().toISOString();
        awayTeam.updated_at = new Date().toISOString();
    }

    updatePlayerStatistics(events, homePlayers, awayPlayers) {
        // Update matches played for all players
        [...homePlayers, ...awayPlayers].forEach(player => {
            player.matches_played++;
        });

        // Update stats based on events
        events.forEach(event => {
            const player = this.gameData.players.find(p => p.id === event.player);
            if (!player) return;

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

            player.updated_at = new Date().toISOString();
        });
    }

    createMatchReport(match, simulation) {
        const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Generate player ratings
        const playerRatings = [];
        const homePlayers = this.getPlayersByTeam(match.home_team_id).slice(0, 11);
        const awayPlayers = this.getPlayersByTeam(match.away_team_id).slice(0, 11);

        [...homePlayers, ...awayPlayers].forEach(player => {
            const baseRating = 6 + Math.random() * 2; // 6-8 base
            const performanceBonus = (Math.random() - 0.5) * 2; // -1 to +1
            const rating = Math.max(1, Math.min(10, baseRating + performanceBonus));

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

        const matchReport = {
            id: reportId,
            match_id: match.id,
            match_events: simulation.events,
            home_possession: simulation.stats.home_possession,
            away_possession: simulation.stats.away_possession,
            home_shots: simulation.stats.home_shots,
            away_shots: simulation.stats.away_shots,
            home_shots_on_target: simulation.stats.home_shots_on_target,
            away_shots_on_target: simulation.stats.away_shots_on_target,
            home_corners: simulation.stats.home_corners,
            away_corners: simulation.stats.away_corners,
            home_fouls: simulation.stats.home_fouls,
            away_fouls: simulation.stats.away_fouls,
            home_yellow_cards: simulation.stats.home_yellow_cards,
            away_yellow_cards: simulation.stats.away_yellow_cards,
            home_red_cards: simulation.stats.home_red_cards,
            away_red_cards: simulation.stats.away_red_cards,
            home_passes: simulation.stats.home_passes,
            away_passes: simulation.stats.away_passes,
            home_pass_accuracy: simulation.stats.home_pass_accuracy,
            away_pass_accuracy: simulation.stats.away_pass_accuracy,
            player_ratings: playerRatings,
            man_of_the_match: manOfTheMatch.player_id,
            key_moments: simulation.events.filter(e => ['goal', 'red_card'].includes(e.type)),
            tactical_analysis: this.generateTacticalAnalysis(match, simulation),
            weather_impact: this.getWeatherImpact(match.weather),
            referee_performance: Math.round(6 + Math.random() * 3), // 6-9
            attendance_impact: 'Supporto caloroso del pubblico',
            injury_time_home: Math.floor(Math.random() * 4),
            injury_time_away: Math.floor(Math.random() * 4),
            created_at: new Date().toISOString()
        };

        if (!this.gameData.matchReports) {
            this.gameData.matchReports = [];
        }
        this.gameData.matchReports.push(matchReport);

        return matchReport;
    }

    generateTacticalAnalysis(match, simulation) {
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
        
        const analyses = [
            `${homeTeam.name} ha dominato il possesso palla con il ${simulation.stats.home_possession}%, ma ${awayTeam.name} si è dimostrata più efficace negli ultimi metri.`,
            `Partita equilibrata con entrambe le squadre che hanno creato diverse occasioni da gol.`,
            `${simulation.stats.home_shots > simulation.stats.away_shots ? homeTeam.name : awayTeam.name} ha mostrato maggiore aggressività offensiva con più tiri verso la porta.`,
            `Le sostituzioni hanno influenzato l'andamento della partita nel secondo tempo.`
        ];

        return analyses[Math.floor(Math.random() * analyses.length)];
    }

    getWeatherImpact(weather) {
        const impacts = {
            'sunny': 'Condizioni ideali per il gioco',
            'cloudy': 'Tempo nuvoloso senza particolari influenze',
            'rainy': 'La pioggia ha reso il terreno scivoloso, influenzando i passaggi'
        };
        return impacts[weather] || 'Condizioni normali';
    }

    updateMoraleAfterMatch(match, homeTeam, awayTeam) {
        let homeMoraleChange = 0;
        let awayMoraleChange = 0;

        if (match.home_goals > match.away_goals) {
            // Home win
            homeMoraleChange = +5;
            awayMoraleChange = -3;
        } else if (match.away_goals > match.home_goals) {
            // Away win
            awayMoraleChange = +5;
            homeMoraleChange = -3;
        } else {
            // Draw
            homeMoraleChange = +1;
            awayMoraleChange = +1;
        }

        // Apply morale changes
        homeTeam.team_morale = Math.max(0, Math.min(100, homeTeam.team_morale + homeMoraleChange));
        awayTeam.team_morale = Math.max(0, Math.min(100, awayTeam.team_morale + awayMoraleChange));

        // Update player morale
        const homePlayers = this.getPlayersByTeam(homeTeam.id);
        const awayPlayers = this.getPlayersByTeam(awayTeam.id);

        homePlayers.forEach(player => {
            player.morale = Math.max(0, Math.min(100, player.morale + homeMoraleChange));
        });

        awayPlayers.forEach(player => {
            player.morale = Math.max(0, Math.min(100, player.morale + awayMoraleChange));
        });
    }

    // Calendar advancement methods (from previous implementation)
    async executeAdvanceDay(days = 1) {
        console.log(`📅 Advancing ${days} day(s)...`);

        try {
            const currentDate = new Date(this.getCurrentDate());
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + days);

            // Update current date
            this.gameData.currentDate = newDate.toISOString();

            const eventsGenerated = [];

            // Process each day
            for (let i = 0; i < days; i++) {
                const processDate = new Date(currentDate);
                processDate.setDate(currentDate.getDate() + i + 1);

                // Process scheduled trainings
                const dayTrainings = this.gameData.trainings?.filter(training => {
                    const trainingDate = new Date(training.training_date);
                    return trainingDate.toDateString() === processDate.toDateString() && 
                           training.status === 'scheduled';
                }) || [];

                for (const training of dayTrainings) {
                    const result = await this.executePlayerTrain({
                        playerIds: training.participants,
                        trainingType: training.training_type,
                        intensity: training.intensity,
                        teamId: training.team_id
                    });

                    if (result.success) {
                        training.status = 'completed';
                        eventsGenerated.push({
                            type: 'training',
                            title: 'Allenamento Completato',
                            description: `Allenamento ${training.training_type} completato`,
                            priority: 2
                        });
                    }
                }

                // Update player recovery (injuries, fitness)
                this.gameData.players.forEach(player => {
                    // Injury recovery
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
                        player.fitness = Math.min(100, player.fitness + 1);
                    }

                    player.updated_at = new Date().toISOString();
                });

                // Generate random events
                if (Math.random() < 0.1) { // 10% chance per day
                    const randomEvent = this.generateRandomEvent();
                    if (randomEvent) {
                        eventsGenerated.push(randomEvent);
                    }
                }
            }

            // Save game data
            this.saveGameData();

            return {
                success: true,
                newDate: newDate.toISOString(),
                daysAdvanced: days,
                eventsGenerated: eventsGenerated
            };

        } catch (error) {
            console.error('Error advancing day:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    generateRandomEvent() {
        const events = [
            {
                type: 'news',
                title: 'Notizie di Mercato',
                description: 'Voci di corridoio parlano di possibili movimenti di mercato',
                priority: 1
            },
            {
                type: 'weather',
                title: 'Condizioni Meteo',
                description: 'Le condizioni meteo potrebbero influenzare i prossimi allenamenti',
                priority: 1
            }
        ];

        return events[Math.floor(Math.random() * events.length)];
    }
}