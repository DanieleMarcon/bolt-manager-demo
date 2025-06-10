// Match Simulation Page implementation
export class MatchSimulationPage {
    constructor() {
        this.gameManager = null;
        this.currentMatch = null;
        this.simulationSpeed = 'normal';
        this.isSimulating = false;
        this.matchEvents = [];
        this.currentMinute = 0;
    }

    async init() {
        console.log('⚽ Initializing MatchSimulationPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadMatchData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb" aria-label="Navigazione">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator" aria-hidden="true">></span>
                    <span class="breadcrumb-current">Partita</span>
                </nav>

                <!-- Match Header -->
                <div id="matchHeader" class="match-header">
                    <!-- Will be populated by loadMatchData() -->
                </div>

                <!-- Live Score -->
                <div id="liveScore" class="live-score" aria-live="polite">
                    <div class="score-display" aria-label="Punteggio attuale">
                        <span id="homeScore" class="home-score">0</span>
                        <span class="score-separator" aria-hidden="true">-</span>
                        <span id="awayScore" class="away-score">0</span>
                    </div>
                    <div id="matchTime" class="match-time" aria-label="Minuto di gioco">0'</div>
                    <div id="matchStatus" class="match-status" aria-label="Stato partita">Pre-Partita</div>
                </div>

                <!-- Match Controls -->
                <div class="match-controls" aria-label="Controlli partita">
                    <button id="startMatchBtn" class="button button-primary button-large" aria-label="Inizia partita">
                        ▶️ Inizia Partita
                    </button>
                    <button id="pauseMatchBtn" class="button button-secondary" style="display: none;" aria-label="Pausa partita">
                        ⏸️ Pausa
                    </button>
                    <button id="resumeMatchBtn" class="button button-secondary" style="display: none;" aria-label="Riprendi partita">
                        ▶️ Riprendi
                    </button>
                    
                    <div class="speed-controls">
                        <label for="speedSelect">Velocità:</label>
                        <select id="speedSelect" aria-label="Seleziona velocità simulazione">
                            <option value="slow">Lenta</option>
                            <option value="normal" selected>Normale</option>
                            <option value="fast">Veloce</option>
                            <option value="instant">Istantanea</option>
                        </select>
                    </div>
                </div>

                <!-- Sponsor Vertical -->
                <div class="sponsor-slot sponsor-vertical" aria-label="Sponsor">
                    <span class="sponsor-label">Partner Stadio</span>
                    <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=200&h=400&fit=crop" 
                         alt="Sponsor Stadium" class="sponsor-image">
                </div>

                <!-- Match Content -->
                <div class="match-content">
                    <!-- Live Events -->
                    <div class="match-events-section">
                        <h3>Eventi Live</h3>
                        <div id="liveEvents" class="live-events" aria-live="polite">
                            <div class="no-events">La partita non è ancora iniziata</div>
                        </div>
                    </div>

                    <!-- Live Stats -->
                    <div class="live-stats-section">
                        <h3>Statistiche Live</h3>
                        <div id="liveStats" class="live-stats" aria-label="Statistiche partita">
                            <!-- Will be populated during simulation -->
                        </div>
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-slot sponsor-banner" aria-label="Sponsor">
                    <span class="sponsor-label">Sponsor Ufficiale</span>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                         alt="Sponsor Banner" class="sponsor-image">
                </div>

                <!-- Lineups -->
                <div class="lineups-section">
                    <h3>Formazioni</h3>
                    <div class="lineups-container">
                        <div id="homeLineup" class="lineup home-lineup">
                            <!-- Will be populated by loadLineups() -->
                        </div>
                        <div id="awayLineup" class="lineup away-lineup">
                            <!-- Will be populated by loadLineups() -->
                        </div>
                    </div>
                </div>

                <!-- Substitutions Panel -->
                <div id="substitutionsPanel" class="substitutions-panel" style="display: none;">
                    <h3>Sostituzioni</h3>
                    <div class="substitutions-content">
                        <!-- Will be populated during match -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Match control buttons
        document.getElementById('startMatchBtn')?.addEventListener('click', () => {
            this.startMatch();
        });

        document.getElementById('pauseMatchBtn')?.addEventListener('click', () => {
            this.pauseMatch();
        });

        document.getElementById('resumeMatchBtn')?.addEventListener('click', () => {
            this.resumeMatch();
        });

        // Speed control
        document.getElementById('speedSelect')?.addEventListener('change', (e) => {
            this.simulationSpeed = e.target.value;
        });
    }

    loadMatchData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Find next user match
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        const upcomingMatches = this.gameManager.getUpcomingMatches(userTeam.id, 1);
        if (upcomingMatches.length === 0) {
            this.showNoMatchesAvailable();
            return;
        }

        this.currentMatch = upcomingMatches[0];
        
        // Load match header
        this.loadMatchHeader();
        
        // Load lineups
        this.loadLineups();
        
        // Initialize live stats
        this.initializeLiveStats();
    }

    loadMatchHeader() {
        if (!this.currentMatch) return;

        const homeTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.home_team_id);
        const awayTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.away_team_id);

        const matchDate = new Date(this.currentMatch.match_date);

        const headerHTML = `
            <div class="match-teams">
                <div class="team home-team">
                    <div class="team-info">
                        <h2 class="team-name">${homeTeam?.name || 'Home Team'}</h2>
                        <span class="team-city">${homeTeam?.city || ''}</span>
                    </div>
                    <div class="team-form">
                        <span class="form-label">Forma:</span>
                        <span class="form-value">${homeTeam?.formation || '4-4-2'}</span>
                    </div>
                </div>
                
                <div class="match-info">
                    <div class="match-details">
                        <span class="match-date">${matchDate.toLocaleDateString('it-IT')}</span>
                        <span class="match-time">${matchDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span class="match-day">Giornata ${this.currentMatch.matchday}</span>
                    </div>
                    <div class="match-venue">
                        <span class="venue-name">Stadio ${homeTeam?.city || 'Casa'}</span>
                    </div>
                </div>
                
                <div class="team away-team">
                    <div class="team-info">
                        <h2 class="team-name">${awayTeam?.name || 'Away Team'}</h2>
                        <span class="team-city">${awayTeam?.city || ''}</span>
                    </div>
                    <div class="team-form">
                        <span class="form-label">Forma:</span>
                        <span class="form-value">${awayTeam?.formation || '4-4-2'}</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('matchHeader').innerHTML = headerHTML;
    }

    loadLineups() {
        if (!this.currentMatch) return;

        const homePlayers = this.gameManager.getPlayersByTeam(this.currentMatch.home_team_id)
            .filter(p => p.injury_status === 'healthy')
            .sort((a, b) => b.overall_rating - a.overall_rating)
            .slice(0, 11);

        const awayPlayers = this.gameManager.getPlayersByTeam(this.currentMatch.away_team_id)
            .filter(p => p.injury_status === 'healthy')
            .sort((a, b) => b.overall_rating - a.overall_rating)
            .slice(0, 11);

        // Home lineup
        const homeLineupHTML = `
            <h4>Formazione Casa</h4>
            <div class="lineup-players">
                ${homePlayers.map(player => `
                    <div class="lineup-player">
                        <span class="player-position">${player.position}</span>
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="player-rating">${player.overall_rating}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Away lineup
        const awayLineupHTML = `
            <h4>Formazione Ospite</h4>
            <div class="lineup-players">
                ${awayPlayers.map(player => `
                    <div class="lineup-player">
                        <span class="player-position">${player.position}</span>
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="player-rating">${player.overall_rating}</span>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('homeLineup').innerHTML = homeLineupHTML;
        document.getElementById('awayLineup').innerHTML = awayLineupHTML;
    }

    initializeLiveStats() {
        const statsHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Possesso</span>
                    <div class="stat-bar">
                        <div class="stat-home" style="width: 50%">50%</div>
                        <div class="stat-away" style="width: 50%">50%</div>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tiri</span>
                    
                    <div class="stat-values">
                        <span id="homeShotsCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayShotsCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Tiri in Porta</span>
                    <div class="stat-values">
                        <span id="homeShotsOnTargetCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayShotsOnTargetCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Corner</span>
                    <div class="stat-values">
                        <span id="homeCornersCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayCornersCount">0</span>
                    </div>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Falli</span>
                    <div class="stat-values">
                        <span id="homeFoulsCount">0</span>
                        <span class="stat-separator">-</span>
                        <span id="awayFoulsCount">0</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('liveStats').innerHTML = statsHTML;
    }

    async startMatch() {
        if (!this.currentMatch) {
            window.boltManager.uiManager.showToast('Nessuna partita disponibile', 'warning');
            return;
        }

        try {
            this.isSimulating = true;
            
            // Update UI
            document.getElementById('startMatchBtn').style.display = 'none';
            document.getElementById('pauseMatchBtn').style.display = 'inline-block';
            document.getElementById('matchStatus').textContent = 'In Corso';
            
            // Clear events
            this.matchEvents = [];
            this.currentMinute = 0;
            document.getElementById('liveEvents').innerHTML = '';

            window.boltManager.uiManager.showToast('Partita iniziata!', 'success');

            // Start simulation based on speed
            if (this.simulationSpeed === 'instant') {
                await this.simulateInstantMatch();
            } else {
                await this.simulateLiveMatch();
            }

        } catch (error) {
            console.error('Error starting match:', error);
            window.boltManager.uiManager.showToast('Errore nell\'avvio della partita: ' + error.message, 'error');
            this.isSimulating = false;
        }
    }

    async simulateInstantMatch() {
        window.boltManager.uiManager.showLoading('Simulazione partita in corso...');

        try {
            const result = await this.gameManager.simulateMatch(this.currentMatch.id);
            
            // Update UI with final result
            this.updateFinalScore(result.match.home_goals, result.match.away_goals);
            this.displayMatchEvents(result.events);
            this.updateLiveStats(result.stats);
            
            // Update match status
            document.getElementById('matchStatus').textContent = 'Terminata';
            document.getElementById('matchTime').textContent = "90'";
            
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Partita completata!', 'success');
            
            // Show match analysis option
            setTimeout(() => {
                this.showMatchAnalysisOption(result.match.id);
            }, 2000);

        } catch (error) {
            window.boltManager.uiManager.hideLoading();
            throw error;
        }
    }

    async simulateLiveMatch() {
        // Simulate match with live updates
        const speedMultiplier = {
            'slow': 2000,
            'normal': 1000,
            'fast': 500
        };

        const interval = speedMultiplier[this.simulationSpeed] || 1000;

        // Simulate 90 minutes
        for (let minute = 1; minute <= 90 && this.isSimulating; minute++) {
            this.currentMinute = minute;
            
            // Update time display
            document.getElementById('matchTime').textContent = `${minute}'`;
            
            // Generate random events
            if (Math.random() < 0.1) { // 10% chance per minute
                const event = this.generateRandomEvent(minute);
                if (event) {
                    this.addLiveEvent(event);
                }
            }
            
            // Wait for next minute
            await new Promise(resolve => setTimeout(resolve, interval));
        }

        if (this.isSimulating) {
            // Complete match simulation
            await this.completeMatch();
        }
    }

    generateRandomEvent(minute) {
        const eventTypes = ['shot', 'corner', 'foul', 'goal', 'yellow_card'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const isHome = Math.random() < 0.5;

        const players = isHome ? 
            this.gameManager.getPlayersByTeam(this.currentMatch.home_team_id) :
            this.gameManager.getPlayersByTeam(this.currentMatch.away_team_id);

        const randomPlayer = players[Math.floor(Math.random() * players.length)];

        switch (eventType) {
            case 'goal':
                if (Math.random() < 0.05) { // 5% chance for goal
                    this.updateScore(isHome);
                    return {
                        minute,
                        type: 'goal',
                        team: isHome ? 'home' : 'away',
                        description: `⚽ Gol di ${randomPlayer.first_name} ${randomPlayer.last_name}!`,
                        importance: 'high'
                    };
                }
                break;
            case 'shot':
                this.updateShotStats(isHome);
                return {
                    minute,
                    type: 'shot',
                    team: isHome ? 'home' : 'away',
                    description: `🎯 Tiro di ${randomPlayer.first_name} ${randomPlayer.last_name}`,
                    importance: 'medium'
                };
            case 'corner':
                this.updateCornerStats(isHome);
                return {
                    minute,
                    type: 'corner',
                    team: isHome ? 'home' : 'away',
                    description: `📐 Calcio d'angolo per ${isHome ? 'casa' : 'ospiti'}`,
                    importance: 'low'
                };
            case 'foul':
                this.updateFoulStats(isHome);
                return {
                    minute,
                    type: 'foul',
                    team: isHome ? 'home' : 'away',
                    description: `⚠️ Fallo di ${randomPlayer.first_name} ${randomPlayer.last_name}`,
                    importance: 'low'
                };
            case 'yellow_card':
                if (Math.random() < 0.03) { // 3% chance for card
                    return {
                        minute,
                        type: 'yellow_card',
                        team: isHome ? 'home' : 'away',
                        description: `🟨 Cartellino giallo per ${randomPlayer.first_name} ${randomPlayer.last_name}`,
                        importance: 'medium'
                    };
                }
                break;
        }

        return null;
    }

    addLiveEvent(event) {
        this.matchEvents.push(event);

        const eventElement = document.createElement('div');
        eventElement.className = `live-event ${event.importance}`;
        eventElement.setAttribute('aria-live', 'polite');
        eventElement.innerHTML = `
            <span class="event-minute">${event.minute}'</span>
            <span class="event-description">${event.description}</span>
        `;

        const eventsContainer = document.getElementById('liveEvents');
        eventsContainer.insertBefore(eventElement, eventsContainer.firstChild);

        // Animate new event
        setTimeout(() => {
            eventElement.classList.add('event-show');
        }, 10);
    }

    updateScore(isHome) {
        const scoreElement = document.getElementById(isHome ? 'homeScore' : 'awayScore');
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore + 1;
    }

    updateShotStats(isHome) {
        const shotElement = document.getElementById(isHome ? 'homeShotsCount' : 'awayShotsCount');
        const currentShots = parseInt(shotElement.textContent);
        shotElement.textContent = currentShots + 1;
    }

    updateCornerStats(isHome) {
        const cornerElement = document.getElementById(isHome ? 'homeCornersCount' : 'awayCornersCount');
        const currentCorners = parseInt(cornerElement.textContent);
        cornerElement.textContent = currentCorners + 1;
    }

    updateFoulStats(isHome) {
        const foulElement = document.getElementById(isHome ? 'homeFoulsCount' : 'awayFoulsCount');
        const currentFouls = parseInt(foulElement.textContent);
        foulElement.textContent = currentFouls + 1;
    }

    async completeMatch() {
        try {
            // Run full simulation to get final result
            const result = await this.gameManager.simulateMatch(this.currentMatch.id);
            
            // Update final score
            this.updateFinalScore(result.match.home_goals, result.match.away_goals);
            
            // Update match status
            document.getElementById('matchStatus').textContent = 'Terminata';
            document.getElementById('pauseMatchBtn').style.display = 'none';
            
            window.boltManager.uiManager.showToast('Partita terminata!', 'success');
            
            // Show match analysis option
            setTimeout(() => {
                this.showMatchAnalysisOption(result.match.id);
            }, 2000);

        } catch (error) {
            console.error('Error completing match:', error);
            window.boltManager.uiManager.showToast('Errore nel completamento della partita', 'error');
        }
    }

    updateFinalScore(homeGoals, awayGoals) {
        document.getElementById('homeScore').textContent = homeGoals;
        document.getElementById('awayScore').textContent = awayGoals;
    }

    displayMatchEvents(events) {
        const eventsContainer = document.getElementById('liveEvents');
        eventsContainer.innerHTML = '';

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `live-event ${event.type === 'goal' ? 'high' : 'medium'}`;
            eventElement.innerHTML = `
                <span class="event-minute">${event.minute}'</span>
                <span class="event-description">${event.description}</span>
            `;
            eventsContainer.appendChild(eventElement);
        });
    }

    updateLiveStats(stats) {
        // Update possession
        const homePossession = stats.home_possession;
        const awayPossession = stats.away_possession;
        
        document.querySelector('.stat-home').style.width = `${homePossession}%`;
        document.querySelector('.stat-home').textContent = `${homePossession}%`;
        document.querySelector('.stat-away').style.width = `${awayPossession}%`;
        document.querySelector('.stat-away').textContent = `${awayPossession}%`;

        // Update other stats
        document.getElementById('homeShotsCount').textContent = stats.home_shots;
        document.getElementById('awayShotsCount').textContent = stats.away_shots;
        document.getElementById('homeShotsOnTargetCount').textContent = stats.home_shots_on_target;
        document.getElementById('awayShotsOnTargetCount').textContent = stats.away_shots_on_target;
        document.getElementById('homeCornersCount').textContent = stats.home_corners;
        document.getElementById('awayCornersCount').textContent = stats.away_corners;
        document.getElementById('homeFoulsCount').textContent = stats.home_fouls;
        document.getElementById('awayFoulsCount').textContent = stats.away_fouls;
    }

    pauseMatch() {
        this.isSimulating = false;
        document.getElementById('pauseMatchBtn').style.display = 'none';
        document.getElementById('resumeMatchBtn').style.display = 'inline-block';
        document.getElementById('matchStatus').textContent = 'In Pausa';
        
        window.boltManager.uiManager.showToast('Partita in pausa', 'info');
    }

    resumeMatch() {
        this.isSimulating = true;
        document.getElementById('resumeMatchBtn').style.display = 'none';
        document.getElementById('pauseMatchBtn').style.display = 'inline-block';
        document.getElementById('matchStatus').textContent = 'In Corso';
        
        window.boltManager.uiManager.showToast('Partita ripresa', 'info');
        
        // Continue simulation from current minute
        this.simulateLiveMatch();
    }

    showMatchAnalysisOption(matchId) {
        const content = `
            <div class="match-completed">
                <h4>Partita Completata!</h4>
                <p>La partita è terminata. Vuoi visualizzare l'analisi dettagliata?</p>
                <div class="completion-actions">
                    <button class="button button-primary" onclick="window.boltManager.navigateToPage('match-analysis')">
                        📊 Visualizza Analisi
                    </button>
                    <button class="button button-secondary" onclick="window.boltManager.uiManager.hideModal()">
                        ✅ Continua
                    </button>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Partita Completata', content);
    }

    showNoMatchesAvailable() {
        const content = `
            <div class="no-matches">
                <h3>Nessuna Partita Disponibile</h3>
                <p>Non ci sono partite programmate al momento.</p>
                <p>Controlla il calendario per vedere le prossime partite o avanza nel tempo.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Vai al Calendario
                </button>
            </div>
        `;

        document.getElementById('matchHeader').innerHTML = content;
        
        // Hide other sections
        document.querySelector('.live-score').style.display = 'none';
        document.querySelector('.match-controls').style.display = 'none';
        document.querySelector('.match-content').style.display = 'none';
        document.querySelector('.lineups-section').style.display = 'none';
    }
}