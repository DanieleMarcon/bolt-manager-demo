// Team Management Page implementation
export class TeamManagementPage {
    constructor() {
        this.gameManager = null;
        this.currentFilter = 'all';
        this.currentSort = 'name';
    }

    async init() {
        console.log('📊 Initializing TeamManagementPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadTeamData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb" aria-label="Navigazione">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator" aria-hidden="true">></span>
                    <span class="breadcrumb-current">Squadra</span>
                </nav>

                <!-- Team Overview -->
                <div id="teamOverview" class="team-overview">
                    <!-- Will be populated by loadTeamData() -->
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-slot sponsor-horizontal" aria-label="Sponsor">
                    <span class="sponsor-label">Partner Ufficiale</span>
                    <img src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=60&fit=crop" 
                         alt="Sponsor" class="sponsor-image">
                </div>

                <!-- Player Filters -->
                <div class="player-filters" aria-label="Filtri giocatori">
                    <div class="filter-group">
                        <label for="positionFilter">Ruolo:</label>
                        <select id="positionFilter" class="filter-select" aria-label="Filtra per ruolo">
                            <option value="all">Tutti</option>
                            <option value="GK">Portieri</option>
                            <option value="DEF">Difensori</option>
                            <option value="MID">Centrocampisti</option>
                            <option value="ATT">Attaccanti</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="sortSelect">Ordina per:</label>
                        <select id="sortSelect" class="filter-select" aria-label="Ordina per">
                            <option value="name">Nome</option>
                            <option value="age">Età</option>
                            <option value="overall_rating">Rating</option>
                            <option value="morale">Morale</option>
                            <option value="fitness">Forma</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <input type="text" id="searchInput" class="search-input" placeholder="Cerca giocatore..." 
                               aria-label="Cerca giocatore per nome">
                    </div>
                </div>

                <!-- Players Grid -->
                <div id="playersGrid" class="players-grid" aria-label="Lista giocatori">
                    <!-- Will be populated by loadPlayersGrid() -->
                </div>

                <!-- Sponsor Sidebar -->
                <div class="sponsor-slot sponsor-vertical" aria-label="Sponsor">
                    <span class="sponsor-label">Sponsor Tecnico</span>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=160&h=400&fit=crop" 
                         alt="Sponsor Tecnico" class="sponsor-image">
                </div>

                <!-- Test Button -->
                <div class="test-actions">
                    <button id="newGameTestBtn" class="button button-primary">
                        🎮 Test Nuova Partita
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Position filter
        document.getElementById('positionFilter')?.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.loadPlayersGrid();
        });

        // Sort select
        document.getElementById('sortSelect')?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.loadPlayersGrid();
        });

        // Search input
        document.getElementById('searchInput')?.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.loadPlayersGrid();
        });

        // Test new game button
        document.getElementById('newGameTestBtn')?.addEventListener('click', () => {
            this.testNewGame();
        });
    }

    async testNewGame() {
        console.log('🧪 Testing new game creation...');
        
        try {
            // Show loading
            window.boltManager.uiManager.showLoading('Creazione nuova partita di test...');
            
            // Create new game
            await this.gameManager.startNewGame();
            
            // Reload page data
            this.loadTeamData();
            
            // Hide loading
            window.boltManager.uiManager.hideLoading();
            
            // Show success
            window.boltManager.uiManager.showToast('Nuova partita creata con successo!', 'success');
            
        } catch (error) {
            console.error('Error in test new game:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nella creazione della partita', 'error');
        }
    }

    loadTeamData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            document.getElementById('teamOverview').innerHTML = `
                <div class="no-data">
                    <h3>Nessuna partita attiva</h3>
                    <p>Clicca su "Test Nuova Partita" per iniziare</p>
                </div>
            `;
            return;
        }

        const userTeam = this.gameManager.getUserTeam();
        const userPlayers = this.gameManager.getUserPlayers();
        
        if (!userTeam || !userPlayers.length) {
            console.log('No user team or players found');
            return;
        }

        // Calculate team statistics
        const avgAge = userPlayers.reduce((sum, p) => sum + p.age, 0) / userPlayers.length;
        const avgMorale = userPlayers.reduce((sum, p) => sum + p.morale, 0) / userPlayers.length;
        const avgFitness = userPlayers.reduce((sum, p) => sum + p.fitness, 0) / userPlayers.length;
        const totalValue = userPlayers.reduce((sum, p) => sum + p.market_value, 0);

        // Render team overview
        document.getElementById('teamOverview').innerHTML = `
            <div class="team-overview-card">
                <div class="team-header">
                    <h2 class="team-name">${userTeam.name}</h2>
                    <span class="team-city">${userTeam.city}</span>
                </div>
                
                <div class="team-stats">
                    <div class="stat-item">
                        <span class="stat-label">Giocatori</span>
                        <span class="stat-value">${userPlayers.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Età Media</span>
                        <span class="stat-value">${avgAge.toFixed(1)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Morale</span>
                        <span class="stat-value">
                            <div class="morale-indicator">
                                <div class="morale-bar" style="width: ${avgMorale}%; background-color: ${this.getMoraleColor(avgMorale)}"></div>
                                <span class="morale-text">${avgMorale.toFixed(0)}%</span>
                            </div>
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Forma Media</span>
                        <span class="stat-value">${avgFitness.toFixed(0)}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Valore Rosa</span>
                        <span class="stat-value">${this.formatCurrency(totalValue)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Budget</span>
                        <span class="stat-value">${this.formatCurrency(userTeam.budget)}</span>
                    </div>
                </div>
            </div>
        `;

        // Load players grid
        this.loadPlayersGrid();
    }

    loadPlayersGrid() {
        if (!this.gameManager || !this.gameManager.gameData) {
            return;
        }

        let players = this.gameManager.getUserPlayers();
        
        // Apply filters
        if (this.currentFilter !== 'all') {
            players = players.filter(player => player.position === this.currentFilter);
        }

        // Apply search
        if (this.searchTerm) {
            players = players.filter(player => 
                player.first_name.toLowerCase().includes(this.searchTerm) ||
                player.last_name.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply sorting
        players.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
                case 'age':
                    return a.age - b.age;
                case 'overall_rating':
                    return b.overall_rating - a.overall_rating;
                case 'morale':
                    return b.morale - a.morale;
                case 'fitness':
                    return b.fitness - a.fitness;
                default:
                    return 0;
            }
        });

        // Render players grid
        const playersHTML = players.map(player => this.renderPlayerCard(player)).join('');
        
        document.getElementById('playersGrid').innerHTML = playersHTML;

        // Setup player card event listeners
        this.setupPlayerCardListeners();
    }

    renderPlayerCard(player) {
        const moraleColor = this.getMoraleColor(player.morale);
        const fitnessColor = this.getFitnessColor(player.fitness);
        
        return `
            <div class="player-card" data-player-id="${player.id}" tabindex="0" 
                 aria-label="Giocatore ${player.first_name} ${player.last_name}, ${player.position}, rating ${player.overall_rating}">
                <div class="player-header">
                    <div class="player-avatar">
                        <span class="player-position" aria-hidden="true">${player.position}</span>
                    </div>
                    <div class="player-info">
                        <h4 class="player-name">${player.first_name} ${player.last_name}</h4>
                        <span class="player-age">${player.age} anni</span>
                    </div>
                    <div class="player-rating">
                        <span class="rating-value">${player.overall_rating}</span>
                    </div>
                </div>
                
                <div class="player-stats">
                    <div class="stat-row">
                        <span class="stat-label">Morale</span>
                        <div class="progress-bar" role="progressbar" aria-valuenow="${Math.round(player.morale)}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-fill" style="width: ${player.morale}%; background-color: ${moraleColor}"></div>
                            <span class="progress-text">${Math.round(player.morale)}%</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Forma</span>
                        <div class="progress-bar" role="progressbar" aria-valuenow="${Math.round(player.fitness)}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-fill" style="width: ${player.fitness}%; background-color: ${fitnessColor}"></div>
                            <span class="progress-text">${Math.round(player.fitness)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="player-status">
                    ${player.injury_status !== 'healthy' ? 
                        `<span class="status-badge status-injury" aria-label="Infortunato per ${player.injury_days} giorni">🤕 ${player.injury_days} giorni</span>` : 
                        `<span class="status-badge status-healthy" aria-label="Giocatore disponibile">✅ Disponibile</span>`
                    }
                    ${player.is_captain ? '<span class="status-badge status-captain" aria-label="Capitano della squadra">👑 Capitano</span>' : ''}
                </div>
            </div>
        `;
    }

    setupPlayerCardListeners() {
        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('click', () => {
                const playerId = card.dataset.playerId;
                this.showPlayerDetails(playerId);
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const playerId = card.dataset.playerId;
                    this.showPlayerDetails(playerId);
                }
            });
        });
    }

    showPlayerDetails(playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        const playerMorale = this.gameManager.getPlayerMorale(playerId);
        
        const content = `
            <div class="player-details">
                <div class="player-tabs">
                    <div class="tab-nav" role="tablist">
                        <button class="tab-btn active" data-tab="profile" role="tab" aria-selected="true" id="tab-profile" aria-controls="profile">Profilo</button>
                        <button class="tab-btn" data-tab="injuries" role="tab" aria-selected="false" id="tab-injuries" aria-controls="injuries">Infortuni</button>
                        <button class="tab-btn" data-tab="contract" role="tab" aria-selected="false" id="tab-contract" aria-controls="contract">Contratto</button>
                        <button class="tab-btn" data-tab="transfer" role="tab" aria-selected="false" id="tab-transfer" aria-controls="transfer">Trasferimento</button>
                        <button class="tab-btn" data-tab="history" role="tab" aria-selected="false" id="tab-history" aria-controls="history">Storia</button>
                    </div>
                    
                    <div class="tab-content">
                        <div class="tab-panel active" id="profile" role="tabpanel" aria-labelledby="tab-profile">
                            <h4>Attributi</h4>
                            <div class="attributes-grid">
                                <div class="attribute-item">
                                    <span class="attr-label">Velocità</span>
                                    <span class="attr-value">${player.pace}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Tiro</span>
                                    <span class="attr-value">${player.shooting}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Passaggio</span>
                                    <span class="attr-value">${player.passing}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Dribbling</span>
                                    <span class="attr-value">${player.dribbling}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Difesa</span>
                                    <span class="attr-value">${player.defending}</span>
                                </div>
                                <div class="attribute-item">
                                    <span class="attr-label">Fisico</span>
                                    <span class="attr-value">${player.physical}</span>
                                </div>
                            </div>
                            
                            <h4>Informazioni</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Età</span>
                                    <span class="info-value">${player.age} anni</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Ruolo</span>
                                    <span class="info-value">${player.position}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Potenziale</span>
                                    <span class="info-value">${player.potential}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="injuries" role="tabpanel" aria-labelledby="tab-injuries">
                            <h4>Stato Fisico</h4>
                            <div class="injury-status">
                                ${player.injury_status === 'healthy' ? 
                                    '<p class="status-healthy">✅ Il giocatore è in perfetta forma</p>' :
                                    `<p class="status-injured">🤕 Infortunato - ${player.injury_days} giorni rimanenti</p>`
                                }
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="contract" role="tabpanel" aria-labelledby="tab-contract">
                            <h4>Dettagli Contratto</h4>
                            <div class="contract-info">
                                <div class="contract-item">
                                    <span class="contract-label">Stipendio</span>
                                    <span class="contract-value">${this.formatCurrency(player.salary)}/settimana</span>
                                </div>
                                <div class="contract-item">
                                    <span class="contract-label">Scadenza</span>
                                    <span class="contract-value">${new Date(player.contract_expires).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="transfer" role="tabpanel" aria-labelledby="tab-transfer">
                            <h4>Valore di Mercato</h4>
                            <div class="transfer-info">
                                <div class="value-display">
                                    <span class="value-amount">${this.formatCurrency(player.market_value)}</span>
                                    <span class="value-label">Valore attuale</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tab-panel" id="history" role="tabpanel" aria-labelledby="tab-history">
                            <h4>Statistiche Stagione</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <span class="stat-label">Partite</span>
                                    <span class="stat-value">${player.matches_played}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Gol</span>
                                    <span class="stat-value">${player.goals_scored}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Assist</span>
                                    <span class="stat-value">${player.assists}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Cartellini Gialli</span>
                                    <span class="stat-value">${player.yellow_cards}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Cartellini Rossi</span>
                                    <span class="stat-value">${player.red_cards}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal(
            `${player.first_name} ${player.last_name}`,
            content
        );

        // Setup tab navigation
        this.setupTabNavigation();
    }

    setupTabNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Remove active class from all tabs and panels
                document.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    getMoraleColor(morale) {
        if (morale >= 70) return 'var(--success)';
        if (morale >= 40) return 'var(--warning)';
        return 'var(--error)';
    }

    getFitnessColor(fitness) {
        if (fitness >= 80) return 'var(--success)';
        if (fitness >= 60) return 'var(--warning)';
        return 'var(--error)';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}