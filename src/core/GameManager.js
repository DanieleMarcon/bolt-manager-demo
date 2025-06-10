// Core game management and data handling
import { DataManager } from '../data/DataManager.js';

// Import Flow classes
import { TransferOfferFlow } from '../../bolt_src/flows/Transfer_Offer.js';
import { TransferProcessFlow } from '../../bolt_src/flows/Transfer_Process.js';
import { StaffAssignRoleFlow } from '../../bolt_src/flows/Staff_AssignRole.js';
import { ReportCompileHistoryFlow } from '../../bolt_src/flows/Report_CompileHistory.js';
import { UserSettingsApplyFlow } from '../../bolt_src/flows/UserSettings_Apply.js';

export class GameManager {
    constructor() {
        this.dataManager = new DataManager();
        this.gameData = null;
        
        // Initialize flows
        this.transferOfferFlow = new TransferOfferFlow(this);
        this.transferProcessFlow = new TransferProcessFlow(this);
        this.staffAssignRoleFlow = new StaffAssignRoleFlow(this);
        this.reportCompileHistoryFlow = new ReportCompileHistoryFlow(this);
        this.userSettingsApplyFlow = new UserSettingsApplyFlow(this);
    }

    async init() {
        console.log('🎮 GameManager initializing...');
        await this.dataManager.init();
        this.gameData = this.dataManager.getGameData();
        
        if (!this.gameData) {
            console.log('No existing game data found');
        }

        // Load and apply user settings
        await this.loadUserSettings();
    }

    async loadUserSettings() {
        try {
            // Load user settings and apply them
            const result = await this.userSettingsApplyFlow.execute({
                action: 'apply',
                settings: this.userSettingsApplyFlow.loadUserSettings('default'),
                applyLive: true
            });

            if (result.success) {
                console.log('✅ User settings loaded and applied');
            } else {
                console.warn('⚠️ Failed to load user settings:', result.error);
            }
        } catch (error) {
            console.error('Error loading user settings:', error);
        }
    }

    // Game state management
    async startNewGame() {
        console.log('🎯 Starting new game...');
        
        try {
            // Generate initial game data
            this.gameData = this.generateInitialGameData();
            
            // Save to storage
            this.saveGameData();
            
            console.log('✅ New game created successfully');
            return this.gameData;
            
        } catch (error) {
            console.error('Error starting new game:', error);
            throw error;
        }
    }

    generateInitialGameData() {
        const currentDate = new Date();
        
        return {
            // Game metadata
            gameVersion: '1.0.0',
            createdAt: currentDate.toISOString(),
            currentDate: currentDate.toISOString(),
            currentSeason: 1,
            currentMatchday: 1,
            
            // Core datasets
            teams: this.generateTeams(),
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
            userSettings: [],
            
            // User session
            userSession: {
                sessionName: 'Nuova Carriera',
                userTeamId: null,
                totalPlaytime: 0,
                achievements: [],
                settings: {}
            }
        };
    }

    generateTeams() {
        const teamNames = [
            { name: 'AC Milano', city: 'Milano', short: 'MIL' },
            { name: 'Inter Milano', city: 'Milano', short: 'INT' },
            { name: 'Juventus FC', city: 'Torino', short: 'JUV' },
            { name: 'AS Roma', city: 'Roma', short: 'ROM' },
            { name: 'SSC Napoli', city: 'Napoli', short: 'NAP' },
            { name: 'ACF Fiorentina', city: 'Firenze', short: 'FIO' },
            { name: 'Atalanta BC', city: 'Bergamo', short: 'ATA' },
            { name: 'SS Lazio', city: 'Roma', short: 'LAZ' },
            { name: 'Torino FC', city: 'Torino', short: 'TOR' },
            { name: 'UC Sampdoria', city: 'Genova', short: 'SAM' },
            { name: 'Genoa CFC', city: 'Genova', short: 'GEN' },
            { name: 'Bologna FC', city: 'Bologna', short: 'BOL' },
            { name: 'Udinese Calcio', city: 'Udine', short: 'UDI' },
            { name: 'Parma Calcio', city: 'Parma', short: 'PAR' },
            { name: 'Cagliari Calcio', city: 'Cagliari', short: 'CAG' },
            { name: 'Hellas Verona', city: 'Verona', short: 'VER' },
            { name: 'US Sassuolo', city: 'Sassuolo', short: 'SAS' },
            { name: 'Spezia Calcio', city: 'La Spezia', short: 'SPE' },
            { name: 'Benevento Calcio', city: 'Benevento', short: 'BEN' },
            { name: 'Crotone FC', city: 'Crotone', short: 'CRO' }
        ];

        const teams = teamNames.map((teamData, index) => {
            const team = {
                id: `team_${index + 1}`,
                name: teamData.name,
                short_name: teamData.short,
                city: teamData.city,
                league_position: null,
                points: 0,
                matches_played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                goals_for: 0,
                goals_against: 0,
                budget: 1000000 + (Math.random() * 5000000), // 1-6M budget
                is_user_team: index === 0, // First team is user team
                formation: '4-4-2',
                team_morale: 50 + (Math.random() * 30), // 50-80 morale
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Generate players for this team
            const teamPlayers = this.generatePlayersForTeam(team.id);
            this.gameData?.players ? this.gameData.players.push(...teamPlayers) : (this.gameData = { players: teamPlayers });

            // Generate staff for this team
            const teamStaff = this.generateStaffForTeam(team.id);
            this.gameData?.staff ? this.gameData.staff.push(...teamStaff) : (this.gameData = { ...this.gameData, staff: teamStaff });

            return team;
        });

        // Set user team
        if (teams.length > 0) {
            this.gameData.userSession.userTeamId = teams[0].id;
        }

        return teams;
    }

    generatePlayersForTeam(teamId) {
        const positions = [
            { pos: 'GK', count: 2 },
            { pos: 'DEF', count: 8 },
            { pos: 'MID', count: 8 },
            { pos: 'ATT', count: 6 }
        ];

        const firstNames = ['Marco', 'Luca', 'Andrea', 'Francesco', 'Alessandro', 'Matteo', 'Lorenzo', 'Davide', 'Simone', 'Federico', 'Gabriele', 'Riccardo', 'Stefano', 'Antonio', 'Giuseppe'];
        const lastNames = ['Rossi', 'Bianchi', 'Ferrari', 'Russo', 'Romano', 'Gallo', 'Costa', 'Fontana', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Galli', 'Conti', 'De Luca'];

        const players = [];
        let playerIndex = 0;

        positions.forEach(posData => {
            for (let i = 0; i < posData.count; i++) {
                const age = 18 + Math.floor(Math.random() * 17); // 18-34 years
                const baseRating = 45 + Math.floor(Math.random() * 40); // 45-85 rating
                const potential = Math.min(99, baseRating + Math.floor(Math.random() * 20)); // Up to +20 potential

                const player = {
                    id: `player_${teamId}_${playerIndex++}`,
                    team_id: teamId,
                    first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
                    last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: age,
                    position: posData.pos,
                    secondary_position: Math.random() < 0.3 ? this.getRandomSecondaryPosition(posData.pos) : null,
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

    generateStaffForTeam(teamId) {
        const staffRoles = [
            { role: 'head_coach', count: 1 },
            { role: 'assistant_coach', count: 2 },
            { role: 'fitness_coach', count: 1 },
            { role: 'scout', count: 2 },
            { role: 'physio', count: 1 }
        ];

        const firstNames = ['Roberto', 'Massimo', 'Claudio', 'Fabio', 'Gianluca', 'Paolo', 'Maurizio', 'Vincenzo', 'Gianluigi', 'Daniele'];
        const lastNames = ['Mancini', 'Allegri', 'Ancelotti', 'Conte', 'Spalletti', 'Sarri', 'Pioli', 'Gasperini', 'Inzaghi', 'Mourinho'];

        const staff = [];
        let staffIndex = 0;

        staffRoles.forEach(roleData => {
            for (let i = 0; i < roleData.count; i++) {
                const experience = 1 + Math.floor(Math.random() * 15); // 1-15 years
                const baseSkill = 40 + Math.floor(Math.random() * 40); // 40-80 skill

                const staffMember = {
                    id: `staff_${teamId}_${staffIndex++}`,
                    team_id: teamId,
                    first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
                    last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
                    age: 30 + Math.floor(Math.random() * 25), // 30-55 years
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

    generateAttributeValue(baseRating, position, attribute) {
        let modifier = 0;
        
        // Position-based modifiers
        switch (position) {
            case 'GK':
                if (attribute === 'defending') modifier = 10;
                if (attribute === 'shooting') modifier = -20;
                if (attribute === 'dribbling') modifier = -10;
                break;
            case 'DEF':
                if (attribute === 'defending') modifier = 15;
                if (attribute === 'physical') modifier = 10;
                if (attribute === 'shooting') modifier = -15;
                break;
            case 'MID':
                if (attribute === 'passing') modifier = 10;
                if (attribute === 'dribbling') modifier = 5;
                break;
            case 'ATT':
                if (attribute === 'shooting') modifier = 15;
                if (attribute === 'pace') modifier = 10;
                if (attribute === 'defending') modifier = -15;
                break;
        }

        const value = baseRating + modifier + (Math.random() * 20 - 10);
        return Math.max(1, Math.min(99, Math.round(value)));
    }

    getRandomSecondaryPosition(primaryPosition) {
        const secondaryPositions = {
            'GK': [],
            'DEF': ['MID'],
            'MID': ['DEF', 'ATT'],
            'ATT': ['MID']
        };
        
        const options = secondaryPositions[primaryPosition] || [];
        return options.length > 0 ? options[Math.floor(Math.random() * options.length)] : null;
    }

    calculateMarketValue(rating, age, potential) {
        let baseValue = rating * 50000; // Base: 50k per rating point
        
        // Age factor
        if (age <= 20) baseValue *= 1.5; // Young talent
        else if (age <= 25) baseValue *= 1.3; // Prime development
        else if (age <= 28) baseValue *= 1.2; // Peak years
        else if (age <= 32) baseValue *= 1.0; // Mature
        else baseValue *= 0.7; // Veteran

        // Potential factor
        const potentialGap = potential - rating;
        baseValue += potentialGap * 25000;

        return Math.round(baseValue);
    }

    calculateSalary(rating, age) {
        let baseSalary = rating * 500; // Base: 500 per rating point per week
        
        // Age factor
        if (age >= 30) baseSalary *= 1.2; // Experience premium
        else if (age <= 22) baseSalary *= 0.8; // Young player discount

        return Math.round(baseSalary);
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
        const experienceBonus = experience * 200;
        
        return base + experienceBonus;
    }

    // Data access methods
    getUserTeam() {
        if (!this.gameData || !this.gameData.teams) return null;
        return this.gameData.teams.find(team => team.is_user_team);
    }

    getUserPlayers() {
        const userTeam = this.getUserTeam();
        if (!userTeam || !this.gameData.players) return [];
        return this.gameData.players.filter(player => player.team_id === userTeam.id);
    }

    getPlayersByTeam(teamId) {
        if (!this.gameData.players) return [];
        return this.gameData.players.filter(player => player.team_id === teamId);
    }

    getCurrentDate() {
        return this.gameData?.currentDate || new Date().toISOString();
    }

    // Flow execution methods
    async executePlayerTrain(params) {
        console.log('🏃 Executing player training...');
        
        // Simulate training results
        const results = params.playerIds.map(playerId => {
            const player = this.gameData.players.find(p => p.id === playerId);
            if (!player) return null;

            // Calculate attribute improvements based on training type
            const attributeChanges = {};
            const improvementChance = 0.3; // 30% chance per attribute
            
            const trainingEffects = {
                fitness: ['physical', 'pace'],
                technical: ['shooting', 'passing', 'dribbling'],
                tactical: ['passing', 'defending']
            };

            const relevantAttributes = trainingEffects[params.trainingType] || ['physical'];
            
            relevantAttributes.forEach(attr => {
                if (Math.random() < improvementChance) {
                    const improvement = Math.floor(Math.random() * params.intensity) + 1;
                    attributeChanges[attr] = improvement;
                    player[attr] = Math.min(99, player[attr] + improvement);
                }
            });

            // Update fitness and morale
            player.fitness = Math.min(100, player.fitness + (params.intensity * 2));
            player.morale = Math.min(100, player.morale + 1);
            player.updated_at = new Date().toISOString();

            // Check for injuries (low chance)
            let injury = null;
            if (Math.random() < 0.02 * params.intensity) { // 2% per intensity level
                injury = {
                    type: 'minor',
                    description: 'Affaticamento muscolare',
                    days: Math.floor(Math.random() * 3) + 1
                };
                player.injury_status = 'minor';
                player.injury_days = injury.days;
            }

            return {
                playerId: playerId,
                attributeChanges: attributeChanges,
                injury: injury
            };
        }).filter(result => result !== null);

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
            injury_risk: params.intensity * 2,
            morale_impact: 2,
            fitness_gain: params.intensity * 2,
            skill_improvements: results.filter(r => Object.keys(r.attributeChanges).length > 0),
            injuries_occurred: results.filter(r => r.injury).map(r => r.injury),
            status: 'completed',
            notes: `Allenamento ${params.trainingType} completato con intensità ${params.intensity}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Add to trainings dataset
        if (!this.gameData.trainings) this.gameData.trainings = [];
        this.gameData.trainings.push(trainingRecord);

        // Save updated data
        this.saveGameData();

        return {
            trainingRecord: trainingRecord,
            results: results
        };
    }

    async executeAdvanceDay(days = 1) {
        console.log(`📅 Advancing ${days} day(s)...`);
        
        const currentDate = new Date(this.getCurrentDate());
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);
        
        // Update game date
        this.gameData.currentDate = newDate.toISOString();
        
        // Process daily events
        const eventsGenerated = [];
        
        // Heal injured players
        if (this.gameData.players) {
            this.gameData.players.forEach(player => {
                if (player.injury_days > 0) {
                    player.injury_days = Math.max(0, player.injury_days - days);
                    if (player.injury_days === 0) {
                        player.injury_status = 'healthy';
                        eventsGenerated.push({
                            type: 'recovery',
                            title: `${player.first_name} ${player.last_name} è guarito`,
                            description: 'Il giocatore è tornato disponibile',
                            priority: 2
                        });
                    }
                }
                
                // Natural fitness recovery
                if (player.fitness < 100) {
                    player.fitness = Math.min(100, player.fitness + (days * 2));
                }
            });
        }
        
        // Save updated data
        this.saveGameData();
        
        return {
            newDate: newDate.toISOString(),
            eventsGenerated: eventsGenerated
        };
    }

    async simulateMatch(matchId) {
        console.log(`⚽ Simulating match: ${matchId}`);
        
        // Find the match
        const match = this.gameData.matches?.find(m => m.id === matchId);
        if (!match) {
            throw new Error('Match not found');
        }

        // Get teams and players
        const homeTeam = this.gameData.teams.find(t => t.id === match.home_team_id);
        const awayTeam = this.gameData.teams.find(t => t.id === match.away_team_id);
        const homePlayers = this.getPlayersByTeam(match.home_team_id);
        const awayPlayers = this.getPlayersByTeam(match.away_team_id);

        // Calculate team strengths
        const homeStrength = this.calculateTeamStrength(homePlayers, homeTeam);
        const awayStrength = this.calculateTeamStrength(awayPlayers, awayTeam);

        // Simulate match events
        const events = [];
        let homeGoals = 0;
        let awayGoals = 0;

        // Generate random events throughout the match
        for (let minute = 1; minute <= 90; minute++) {
            if (Math.random() < 0.05) { // 5% chance per minute for an event
                const eventType = this.getRandomEventType();
                const isHomeEvent = Math.random() < (homeStrength / (homeStrength + awayStrength));
                
                if (eventType === 'goal') {
                    if (isHomeEvent) {
                        homeGoals++;
                        const scorer = homePlayers[Math.floor(Math.random() * homePlayers.length)];
                        events.push({
                            minute: minute,
                            type: 'goal',
                            team: 'home',
                            player: scorer.id,
                            description: `⚽ Gol di ${scorer.first_name} ${scorer.last_name}!`
                        });
                        scorer.goals_scored++;
                    } else {
                        awayGoals++;
                        const scorer = awayPlayers[Math.floor(Math.random() * awayPlayers.length)];
                        events.push({
                            minute: minute,
                            type: 'goal',
                            team: 'away',
                            player: scorer.id,
                            description: `⚽ Gol di ${scorer.first_name} ${scorer.last_name}!`
                        });
                        scorer.goals_scored++;
                    }
                }
            }
        }

        // Update match result
        match.home_goals = homeGoals;
        match.away_goals = awayGoals;
        match.status = 'finished';
        match.updated_at = new Date().toISOString();

        // Update team stats
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

        // Generate match report
        const matchReport = this.generateMatchReport(match, events, homePlayers, awayPlayers);

        // Save data
        this.saveGameData();

        return {
            match: match,
            events: events,
            stats: {
                home_possession: 45 + Math.random() * 20,
                away_possession: 45 + Math.random() * 20,
                home_shots: Math.floor(Math.random() * 15) + 5,
                away_shots: Math.floor(Math.random() * 15) + 5,
                home_shots_on_target: Math.floor(Math.random() * 8) + 2,
                away_shots_on_target: Math.floor(Math.random() * 8) + 2,
                home_corners: Math.floor(Math.random() * 10),
                away_corners: Math.floor(Math.random() * 10),
                home_fouls: Math.floor(Math.random() * 15) + 5,
                away_fouls: Math.floor(Math.random() * 15) + 5
            }
        };
    }

    calculateTeamStrength(players, team) {
        const avgRating = players.reduce((sum, p) => sum + p.overall_rating, 0) / players.length;
        const moraleBonus = (team.team_morale - 50) / 10; // -5 to +5 bonus
        return avgRating + moraleBonus;
    }

    getRandomEventType() {
        const events = ['goal', 'shot', 'corner', 'foul'];
        const weights = [0.1, 0.4, 0.3, 0.2]; // Goal is rarest
        
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < events.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return events[i];
            }
        }
        
        return 'shot';
    }

    generateMatchReport(match, events, homePlayers, awayPlayers) {
        const reportId = `report_${match.id}_${Date.now()}`;
        
        // Generate player ratings
        const playerRatings = [];
        
        [...homePlayers, ...awayPlayers].forEach(player => {
            const baseRating = 5.5 + (Math.random() * 3); // 5.5-8.5 base
            const goalBonus = player.goals_scored * 0.5;
            const finalRating = Math.min(10, Math.max(1, baseRating + goalBonus));
            
            playerRatings.push({
                player_id: player.id,
                player_name: `${player.first_name} ${player.last_name}`,
                position: player.position,
                rating: Math.round(finalRating * 10) / 10
            });
        });

        const matchReport = {
            id: reportId,
            match_id: match.id,
            match_events: events,
            home_possession: 45 + Math.random() * 20,
            away_possession: 45 + Math.random() * 20,
            home_shots: Math.floor(Math.random() * 15) + 5,
            away_shots: Math.floor(Math.random() * 15) + 5,
            home_shots_on_target: Math.floor(Math.random() * 8) + 2,
            away_shots_on_target: Math.floor(Math.random() * 8) + 2,
            home_corners: Math.floor(Math.random() * 10),
            away_corners: Math.floor(Math.random() * 10),
            home_fouls: Math.floor(Math.random() * 15) + 5,
            away_fouls: Math.floor(Math.random() * 15) + 5,
            home_yellow_cards: Math.floor(Math.random() * 4),
            away_yellow_cards: Math.floor(Math.random() * 4),
            home_red_cards: Math.random() < 0.1 ? 1 : 0,
            away_red_cards: Math.random() < 0.1 ? 1 : 0,
            home_passes: Math.floor(Math.random() * 200) + 300,
            away_passes: Math.floor(Math.random() * 200) + 300,
            home_pass_accuracy: 70 + Math.random() * 25,
            away_pass_accuracy: 70 + Math.random() * 25,
            player_ratings: playerRatings,
            man_of_the_match: playerRatings.reduce((best, current) => 
                current.rating > best.rating ? current : best
            ).player_id,
            key_moments: events.filter(e => e.type === 'goal'),
            tactical_analysis: 'Partita equilibrata con buone occasioni da entrambe le parti.',
            weather_impact: null,
            referee_performance: 6 + Math.random() * 3,
            attendance_impact: null,
            injury_time_home: Math.floor(Math.random() * 4),
            injury_time_away: Math.floor(Math.random() * 4),
            created_at: new Date().toISOString()
        };

        // Add to match reports
        if (!this.gameData.matchReports) this.gameData.matchReports = [];
        this.gameData.matchReports.push(matchReport);

        return matchReport;
    }

    updateTactics(tacticsData) {
        console.log('⚙️ Updating tactics...');
        
        const tacticId = `tactic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const tactic = {
            id: tacticId,
            team_id: tacticsData.teamId,
            tactic_name: tacticsData.tacticName || 'Tattica Principale',
            formation: tacticsData.formation,
            mentality: tacticsData.mentality,
            tempo: tacticsData.tempo,
            width: tacticsData.width,
            pressing: tacticsData.pressing,
            defensive_line: tacticsData.defensiveLine,
            passing_style: tacticsData.passingStyle,
            crossing: tacticsData.crossing,
            player_positions: tacticsData.playerPositions,
            player_roles: tacticsData.playerRoles,
            set_pieces: tacticsData.setPieces || [],
            captain_id: tacticsData.captainId,
            penalty_taker_id: tacticsData.penaltyTakerId,
            free_kick_taker_id: tacticsData.freeKickTakerId,
            corner_taker_id: tacticsData.cornerTakerId,
            is_default: true,
            effectiveness_rating: this.calculateTacticalEffectiveness(tacticsData),
            matches_used: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Add to tactics dataset
        if (!this.gameData.tactics) this.gameData.tactics = [];
        
        // Remove old default tactic for this team
        this.gameData.tactics = this.gameData.tactics.filter(t => 
            !(t.team_id === tacticsData.teamId && t.is_default)
        );
        
        this.gameData.tactics.push(tactic);
        
        // Update team formation
        const team = this.gameData.teams.find(t => t.id === tacticsData.teamId);
        if (team) {
            team.formation = tacticsData.formation;
            team.updated_at = new Date().toISOString();
        }

        this.saveGameData();
        
        return tactic;
    }

    calculateTacticalEffectiveness(tacticsData) {
        // Simple effectiveness calculation
        let effectiveness = 70; // Base effectiveness
        
        // Formation balance bonus
        effectiveness += 5;
        
        // Player assignment bonus
        if (tacticsData.playerPositions && tacticsData.playerPositions.length >= 11) {
            effectiveness += 10;
        }
        
        return Math.min(100, effectiveness);
    }

    getTeamTactics(teamId) {
        if (!this.gameData.tactics) return null;
        return this.gameData.tactics.find(t => t.team_id === teamId && t.is_default);
    }

    getUpcomingMatches(teamId, limit = 5) {
        if (!this.gameData.matches) return [];
        
        const currentDate = new Date(this.getCurrentDate());
        
        return this.gameData.matches
            .filter(match => 
                (match.home_team_id === teamId || match.away_team_id === teamId) &&
                new Date(match.match_date) > currentDate &&
                match.status === 'scheduled'
            )
            .sort((a, b) => new Date(a.match_date) - new Date(b.match_date))
            .slice(0, limit);
    }

    getRecentMatches(teamId, limit = 5) {
        if (!this.gameData.matches) return [];
        
        return this.gameData.matches
            .filter(match => 
                (match.home_team_id === teamId || match.away_team_id === teamId) &&
                match.status === 'finished'
            )
            .sort((a, b) => new Date(b.match_date) - new Date(a.match_date))
            .slice(0, limit);
    }

    getMatchReport(matchId) {
        if (!this.gameData.matchReports) return null;
        return this.gameData.matchReports.find(r => r.match_id === matchId);
    }

    getUpcomingEvents(days = 7) {
        const events = [];
        const currentDate = new Date(this.getCurrentDate());
        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + days);

        // Add upcoming matches
        if (this.gameData.matches) {
            const upcomingMatches = this.gameData.matches.filter(match => {
                const matchDate = new Date(match.match_date);
                return matchDate >= currentDate && matchDate <= endDate && match.is_user_match;
            });

            upcomingMatches.forEach(match => {
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
        }

        // Add scheduled trainings
        if (this.gameData.trainings) {
            const upcomingTrainings = this.gameData.trainings.filter(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate >= currentDate && trainingDate <= endDate && training.status === 'scheduled';
            });

            upcomingTrainings.forEach(training => {
                events.push({
                    type: 'training',
                    date: training.training_date,
                    title: `Allenamento ${training.training_type}`,
                    description: `Intensità ${training.intensity}`,
                    priority: 2
                });
            });
        }

        return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    scheduleTraining(trainingData) {
        const trainingId = `training_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const training = {
            id: trainingId,
            team_id: trainingData.teamId,
            training_date: trainingData.date,
            training_type: trainingData.type,
            intensity: trainingData.intensity,
            focus_area: trainingData.type,
            duration_minutes: 90,
            participants: trainingData.playerIds,
            individual_programs: [],
            staff_id: null,
            weather_conditions: null,
            facility_quality: 70,
            injury_risk: trainingData.intensity * 2,
            morale_impact: null,
            fitness_gain: null,
            skill_improvements: [],
            injuries_occurred: [],
            status: 'scheduled',
            notes: `Allenamento ${trainingData.type} programmato`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        if (!this.gameData.trainings) this.gameData.trainings = [];
        this.gameData.trainings.push(training);
        
        this.saveGameData();
        return training;
    }

    // Transfer and Staff Flow Methods
    async executeTransferOffer(params) {
        return await this.transferOfferFlow.execute(params);
    }

    async executeTransferProcess(params) {
        return await this.transferProcessFlow.execute(params);
    }

    async executeStaffAssignRole(params) {
        return await this.staffAssignRoleFlow.execute(params);
    }

    // History Report Flow Methods
    async executeReportCompileHistory(params) {
        return await this.reportCompileHistoryFlow.execute(params);
    }

    getPlayerAttributesHistory(playerId, startDate, endDate) {
        if (!this.gameData.attributesHistory) return [];
        
        return this.gameData.attributesHistory.filter(record => {
            const recordDate = new Date(record.record_date);
            return record.player_id === playerId &&
                   recordDate >= new Date(startDate) &&
                   recordDate <= new Date(endDate);
        });
    }

    getPlayerMatchHistory(playerId, startDate, endDate) {
        if (!this.gameData.matchReports) return [];
        
        const playerMatches = [];
        
        this.gameData.matchReports.forEach(report => {
            const playerRating = report.player_ratings?.find(rating => rating.player_id === playerId);
            if (playerRating) {
                const match = this.gameData.matches?.find(m => m.id === report.match_id);
                if (match) {
                    const matchDate = new Date(match.match_date);
                    if (matchDate >= new Date(startDate) && matchDate <= new Date(endDate)) {
                        playerMatches.push({
                            matchId: match.id,
                            date: match.match_date,
                            rating: playerRating.rating,
                            homeTeam: match.home_team_id,
                            awayTeam: match.away_team_id,
                            result: `${match.home_goals}-${match.away_goals}`
                        });
                    }
                }
            }
        });
        
        return playerMatches;
    }

    getSavedHistoryReports() {
        return this.gameData.historyReports || [];
    }

    getHistoryReport(reportId) {
        const savedReport = this.getSavedHistoryReports().find(r => r.id === reportId);
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

    getPlayerMorale(playerId) {
        if (!this.gameData.moraleStatus) return null;
        return this.gameData.moraleStatus.find(m => m.entity_id === playerId && m.entity_type === 'player');
    }

    // User Settings Flow Methods
    async executeUserSettingsApply(params) {
        return await this.userSettingsApplyFlow.execute(params);
    }

    getUserSettings(userId = 'default') {
        return this.userSettingsApplyFlow.loadUserSettings(userId);
    }

    // Session management
    async saveSession(sessionName) {
        console.log('💾 Saving session...');
        
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const userTeam = this.getUserTeam();
        
        const sessionData = {
            id: sessionId,
            session_name: sessionName || `Sessione ${new Date().toLocaleDateString('it-IT')}`,
            user_team_id: userTeam?.id,
            user_team_name: userTeam?.name,
            current_season: this.gameData.currentSeason,
            current_matchday: this.gameData.currentMatchday,
            current_date: this.gameData.currentDate,
            total_budget: userTeam?.budget || 0,
            achievements: this.gameData.userSession?.achievements || [],
            difficulty_level: 'normal',
            game_speed: 'normal',
            auto_save: true,
            last_played: new Date().toISOString(),
            total_playtime: (this.gameData.userSession?.totalPlaytime || 0) + 60, // Add 1 hour
            is_active: true,
            save_data: JSON.stringify(this.gameData),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Save to data manager
        this.dataManager.saveToStorage(this.gameData, sessionData);
        
        return sessionData;
    }

    async loadSession(sessionId) {
        console.log(`📂 Loading session: ${sessionId}`);
        
        // For now, just load from current storage
        // In a full implementation, this would load specific session data
        const currentSession = this.dataManager.getCurrentSession();
        if (currentSession) {
            this.gameData = this.dataManager.getGameData();
            return true;
        }
        
        return false;
    }

    getSavedSessions() {
        // For now, return current session if exists
        const currentSession = this.dataManager.getCurrentSession();
        return currentSession ? [currentSession] : [];
    }

    getCurrentSession() {
        return this.dataManager.getCurrentSession();
    }

    saveGameData() {
        if (this.gameData) {
            this.dataManager.saveToStorage(this.gameData, null);
        }
    }
}