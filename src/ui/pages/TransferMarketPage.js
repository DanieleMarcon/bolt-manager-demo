// Transfer Market Page implementation
export class TransferMarketPage {
    constructor() {
        this.gameManager = null;
        this.searchFilters = {
            position: 'all',
            minAge: 16,
            maxAge: 40,
            minValue: 0,
            maxValue: 50000000,
            contractStatus: 'all'
        };
        this.searchTerm = '';
        this.availablePlayers = [];
        this.activeTransfers = [];
        this.selectedPlayer = null;
    }

    async init() {
        console.log('💰 Initializing TransferMarketPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadMarketData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Mercato Trasferimenti</span>
                </nav>

                <!-- Market Overview -->
                <div class="market-overview">
                    <h2>Mercato Trasferimenti</h2>
                    <div id="budgetTracker" class="budget-tracker">
                        <!-- Will be populated by loadBudgetTracker() -->
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="market-search-section">
                    <div class="search-controls">
                        <div class="search-bar">
                            <input type="text" id="playerSearchInput" class="search-input" placeholder="Cerca giocatore per nome...">
                            <button id="searchBtn" class="button button-primary">🔍 Cerca</button>
                        </div>
                        
                        <div class="search-filters">
                            <div class="filter-group">
                                <label>Ruolo:</label>
                                <select id="positionFilter">
                                    <option value="all">Tutti</option>
                                    <option value="GK">Portieri</option>
                                    <option value="DEF">Difensori</option>
                                    <option value="MID">Centrocampisti</option>
                                    <option value="ATT">Attaccanti</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label>Età:</label>
                                <input type="range" id="ageMinSlider" min="16" max="40" value="16" class="age-slider">
                                <span id="ageMinValue">16</span>
                                <span> - </span>
                                <input type="range" id="ageMaxSlider" min="16" max="40" value="40" class="age-slider">
                                <span id="ageMaxValue">40</span>
                            </div>
                            
                            <div class="filter-group">
                                <label>Valore Max:</label>
                                <input type="range" id="valueSlider" min="0" max="50000000" value="50000000" step="100000" class="value-slider">
                                <span id="valueDisplay">€50M</span>
                            </div>
                            
                            <div class="filter-group">
                                <label>Contratto:</label>
                                <select id="contractFilter">
                                    <option value="all">Tutti</option>
                                    <option value="expiring">In scadenza</option>
                                    <option value="long_term">Lungo termine</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Transfers -->
                <div class="active-transfers-section">
                    <h3>Trattative in Corso</h3>
                    <div id="activeTransfersList" class="active-transfers-list">
                        <!-- Will be populated by loadActiveTransfers() -->
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-banner">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Mercato powered by</span>
                        <img src="https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                             alt="Sponsor Market" class="sponsor-image">
                    </div>
                </div>

                <!-- Player Search Results -->
                <div class="search-results-section">
                    <h3>Giocatori Disponibili</h3>
                    <div class="results-header">
                        <span id="resultsCount">-- giocatori trovati</span>
                        <div class="sort-controls">
                            <label>Ordina per:</label>
                            <select id="sortSelect">
                                <option value="name">Nome</option>
                                <option value="age">Età</option>
                                <option value="overall_rating">Rating</option>
                                <option value="market_value">Valore</option>
                                <option value="contract_expires">Scadenza Contratto</option>
                            </select>
                        </div>
                    </div>
                    <div id="playerSearchResults" class="player-search-results">
                        <!-- Will be populated by loadSearchResults() -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('playerSearchInput')?.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.performSearch();
        });

        document.getElementById('searchBtn')?.addEventListener('click', () => {
            this.performSearch();
        });

        // Filter controls
        document.getElementById('positionFilter')?.addEventListener('change', (e) => {
            this.searchFilters.position = e.target.value;
            this.performSearch();
        });

        document.getElementById('ageMinSlider')?.addEventListener('input', (e) => {
            this.searchFilters.minAge = parseInt(e.target.value);
            document.getElementById('ageMinValue').textContent = e.target.value;
            this.performSearch();
        });

        document.getElementById('ageMaxSlider')?.addEventListener('input', (e) => {
            this.searchFilters.maxAge = parseInt(e.target.value);
            document.getElementById('ageMaxValue').textContent = e.target.value;
            this.performSearch();
        });

        document.getElementById('valueSlider')?.addEventListener('input', (e) => {
            this.searchFilters.maxValue = parseInt(e.target.value);
            document.getElementById('valueDisplay').textContent = this.formatCurrency(e.target.value);
            this.performSearch();
        });

        document.getElementById('contractFilter')?.addEventListener('change', (e) => {
            this.searchFilters.contractStatus = e.target.value;
            this.performSearch();
        });

        // Sort controls
        document.getElementById('sortSelect')?.addEventListener('change', () => {
            this.performSearch();
        });
    }

    loadMarketData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Load budget tracker
        this.loadBudgetTracker();

        // Load active transfers
        this.loadActiveTransfers();

        // Load available players
        this.loadAvailablePlayers();

        // Perform initial search
        this.performSearch();
    }

    loadBudgetTracker() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        const budgetHTML = `
            <div class="budget-display">
                <div class="budget-item">
                    <span class="budget-label">Budget Disponibile:</span>
                    <span class="budget-value">${this.formatCurrency(userTeam.budget)}</span>
                </div>
                <div class="budget-item">
                    <span class="budget-label">Speso in Trattative:</span>
                    <span class="budget-value pending">${this.formatCurrency(this.calculatePendingSpending())}</span>
                </div>
                <div class="budget-item">
                    <span class="budget-label">Budget Effettivo:</span>
                    <span class="budget-value available">${this.formatCurrency(userTeam.budget - this.calculatePendingSpending())}</span>
                </div>
            </div>
            <div class="budget-bar">
                <div class="budget-progress" style="width: ${Math.min(100, (this.calculatePendingSpending() / userTeam.budget) * 100)}%"></div>
            </div>
        `;

        document.getElementById('budgetTracker').innerHTML = budgetHTML;
    }

    calculatePendingSpending() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return 0;

        return this.gameManager.gameData.transfers
            .filter(t => t.from_team_id === userTeam.id && t.negotiation_status === 'negotiating')
            .reduce((total, t) => total + t.transfer_fee + (t.signing_bonus || 0), 0);
    }

    loadActiveTransfers() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        this.activeTransfers = this.gameManager.gameData.transfers.filter(t => 
            (t.from_team_id === userTeam.id || t.to_team_id === userTeam.id) &&
            ['negotiating', 'agreed'].includes(t.negotiation_status)
        );

        if (this.activeTransfers.length === 0) {
            document.getElementById('activeTransfersList').innerHTML = `
                <div class="no-transfers">
                    <p>Nessuna trattativa in corso</p>
                </div>
            `;
            return;
        }

        const transfersHTML = this.activeTransfers.map(transfer => {
            const player = this.gameManager.gameData.players.find(p => p.id === transfer.player_id);
            const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transfer.from_team_id);
            const toTeam = this.gameManager.gameData.teams.find(t => t.id === transfer.to_team_id);
            
            const isUserBuying = transfer.from_team_id === userTeam.id;
            const statusClass = transfer.negotiation_status === 'agreed' ? 'agreed' : 'negotiating';

            return `
                <div class="active-transfer-item ${statusClass}">
                    <div class="transfer-player">
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="player-position">${player.position}</span>
                        <span class="player-rating">${player.overall_rating}</span>
                    </div>
                    <div class="transfer-details">
                        <div class="transfer-direction">
                            ${isUserBuying ? 
                                `<span class="direction-in">← Da ${toTeam.name}</span>` :
                                `<span class="direction-out">→ A ${fromTeam.name}</span>`
                            }
                        </div>
                        <div class="transfer-amount">${this.formatCurrency(transfer.transfer_fee)}</div>
                        <div class="transfer-status status-${statusClass}">${this.getStatusText(transfer.negotiation_status)}</div>
                    </div>
                    <div class="transfer-actions">
                        ${transfer.negotiation_status === 'negotiating' ? `
                            <button class="button button-small button-secondary" onclick="window.boltManager.uiManager.currentPage.viewTransferDetails('${transfer.id}')">
                                Dettagli
                            </button>
                            ${isUserBuying ? `
                                <button class="button button-small button-ghost" onclick="window.boltManager.uiManager.currentPage.withdrawOffer('${transfer.id}')">
                                    Ritira
                                </button>
                            ` : ''}
                        ` : `
                            <button class="button button-small button-primary" onclick="window.boltManager.uiManager.currentPage.finalizeTransfer('${transfer.id}')">
                                Finalizza
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('activeTransfersList').innerHTML = transfersHTML;
    }

    getStatusText(status) {
        const statusMap = {
            'negotiating': 'In Trattativa',
            'agreed': 'Accordo Raggiunto',
            'completed': 'Completato',
            'failed': 'Fallito'
        };
        return statusMap[status] || status;
    }

    loadAvailablePlayers() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        // Get all players except those from user team
        this.availablePlayers = this.gameManager.gameData.players.filter(player => 
            player.team_id !== userTeam.id && 
            player.injury_status === 'healthy'
        );
    }

    performSearch() {
        let filteredPlayers = [...this.availablePlayers];

        // Apply search term
        if (this.searchTerm) {
            filteredPlayers = filteredPlayers.filter(player =>
                player.first_name.toLowerCase().includes(this.searchTerm) ||
                player.last_name.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply filters
        if (this.searchFilters.position !== 'all') {
            filteredPlayers = filteredPlayers.filter(player => player.position === this.searchFilters.position);
        }

        filteredPlayers = filteredPlayers.filter(player => 
            player.age >= this.searchFilters.minAge && 
            player.age <= this.searchFilters.maxAge &&
            player.market_value <= this.searchFilters.maxValue
        );

        if (this.searchFilters.contractStatus === 'expiring') {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            filteredPlayers = filteredPlayers.filter(player => 
                new Date(player.contract_expires) <= oneYearFromNow
            );
        } else if (this.searchFilters.contractStatus === 'long_term') {
            const twoYearsFromNow = new Date();
            twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
            filteredPlayers = filteredPlayers.filter(player => 
                new Date(player.contract_expires) > twoYearsFromNow
            );
        }

        // Apply sorting
        const sortBy = document.getElementById('sortSelect')?.value || 'name';
        filteredPlayers.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
                case 'age':
                    return a.age - b.age;
                case 'overall_rating':
                    return b.overall_rating - a.overall_rating;
                case 'market_value':
                    return b.market_value - a.market_value;
                case 'contract_expires':
                    return new Date(a.contract_expires) - new Date(b.contract_expires);
                default:
                    return 0;
            }
        });

        // Update results count
        document.getElementById('resultsCount').textContent = `${filteredPlayers.length} giocatori trovati`;

        // Render results
        this.renderSearchResults(filteredPlayers);
    }

    renderSearchResults(players) {
        if (players.length === 0) {
            document.getElementById('playerSearchResults').innerHTML = `
                <div class="no-results">
                    <p>Nessun giocatore trovato con i criteri di ricerca attuali</p>
                    <button class="button button-secondary" onclick="window.boltManager.uiManager.currentPage.clearFilters()">
                        Cancella Filtri
                    </button>
                </div>
            `;
            return;
        }

        const playersHTML = players.slice(0, 50).map(player => { // Limit to 50 results
            const team = this.gameManager.gameData.teams.find(t => t.id === player.team_id);
            const contractExpiry = new Date(player.contract_expires);
            const isExpiringContract = contractExpiry <= new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year

            return `
                <div class="player-market-card" data-player-id="${player.id}" tabindex="0">
                    <div class="player-header">
                        <div class="player-avatar">
                            <span class="player-position">${player.position}</span>
                        </div>
                        <div class="player-info">
                            <h4 class="player-name">${player.first_name} ${player.last_name}</h4>
                            <span class="player-team">${team?.name || 'Unknown'}</span>
                            <span class="player-age">${player.age} anni</span>
                        </div>
                        <div class="player-rating">
                            <span class="rating-value">${player.overall_rating}</span>
                            <span class="rating-potential">Pot: ${player.potential}</span>
                        </div>
                    </div>

                    <div class="player-attributes">
                        <div class="attribute-item">
                            <span class="attr-label">VEL</span>
                            <span class="attr-value">${player.pace}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">TIR</span>
                            <span class="attr-value">${player.shooting}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">PAS</span>
                            <span class="attr-value">${player.passing}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">DRI</span>
                            <span class="attr-value">${player.dribbling}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">DIF</span>
                            <span class="attr-value">${player.defending}</span>
                        </div>
                        <div class="attribute-item">
                            <span class="attr-label">FIS</span>
                            <span class="attr-value">${player.physical}</span>
                        </div>
                    </div>

                    <div class="player-market-info">
                        <div class="market-value">
                            <span class="value-label">Valore:</span>
                            <span class="value-amount">${this.formatCurrency(player.market_value)}</span>
                        </div>
                        <div class="contract-info">
                            <span class="contract-label">Contratto:</span>
                            <span class="contract-expiry ${isExpiringContract ? 'expiring' : ''}">
                                ${contractExpiry.toLocaleDateString('it-IT')}
                            </span>
                        </div>
                        <div class="salary-info">
                            <span class="salary-label">Stipendio:</span>
                            <span class="salary-amount">${this.formatCurrency(player.salary)}/sett</span>
                        </div>
                    </div>

                    <div class="player-actions">
                        <button class="button button-primary" onclick="window.boltManager.uiManager.currentPage.makeOffer('${player.id}')">
                            💰 Fai Offerta
                        </button>
                        <button class="button button-ghost" onclick="window.boltManager.uiManager.currentPage.viewPlayerDetails('${player.id}')">
                            👁️ Dettagli
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('playerSearchResults').innerHTML = playersHTML;

        // Setup card click listeners
        document.querySelectorAll('.player-market-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.player-actions')) {
                    const playerId = card.dataset.playerId;
                    this.viewPlayerDetails(playerId);
                }
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const playerId = card.dataset.playerId;
                    this.viewPlayerDetails(playerId);
                }
            });
        });
    }

    clearFilters() {
        this.searchFilters = {
            position: 'all',
            minAge: 16,
            maxAge: 40,
            minValue: 0,
            maxValue: 50000000,
            contractStatus: 'all'
        };
        this.searchTerm = '';

        // Reset UI elements
        document.getElementById('playerSearchInput').value = '';
        document.getElementById('positionFilter').value = 'all';
        document.getElementById('ageMinSlider').value = 16;
        document.getElementById('ageMaxSlider').value = 40;
        document.getElementById('valueSlider').value = 50000000;
        document.getElementById('contractFilter').value = 'all';
        document.getElementById('ageMinValue').textContent = '16';
        document.getElementById('ageMaxValue').textContent = '40';
        document.getElementById('valueDisplay').textContent = '€50M';

        this.performSearch();
    }

    makeOffer(playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        const team = this.gameManager.gameData.teams.find(t => t.id === player.team_id);
        const userTeam = this.gameManager.getUserTeam();

        if (!player || !team || !userTeam) return;

        const suggestedOffer = Math.round(player.market_value * 1.1); // 110% of market value
        const suggestedSalary = Math.round(player.salary * 1.2); // 120% of current salary

        const content = `
            <div class="negotiation-panel">
                <div class="player-summary">
                    <h4>${player.first_name} ${player.last_name}</h4>
                    <p>Da ${team.name} a ${userTeam.name}</p>
                    <p>Valore di mercato: ${this.formatCurrency(player.market_value)}</p>
                </div>

                <div class="offer-form">
                    <div class="form-group">
                        <label for="transferFeeInput">Offerta Trasferimento:</label>
                        <input type="number" id="transferFeeInput" value="${suggestedOffer}" min="0" step="50000" class="form-input">
                        <span class="input-help">Suggerito: ${this.formatCurrency(suggestedOffer)}</span>
                    </div>

                    <div class="form-group">
                        <label for="playerSalaryInput">Stipendio Settimanale:</label>
                        <input type="number" id="playerSalaryInput" value="${suggestedSalary}" min="0" step="1000" class="form-input">
                        <span class="input-help">Attuale: ${this.formatCurrency(player.salary)}</span>
                    </div>

                    <div class="form-group">
                        <label for="contractLengthInput">Durata Contratto (anni):</label>
                        <select id="contractLengthInput" class="form-select">
                            <option value="1">1 anno</option>
                            <option value="2">2 anni</option>
                            <option value="3" selected>3 anni</option>
                            <option value="4">4 anni</option>
                            <option value="5">5 anni</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="signingBonusInput">Bonus alla Firma (opzionale):</label>
                        <input type="number" id="signingBonusInput" value="0" min="0" step="10000" class="form-input">
                    </div>

                    <div class="form-group">
                        <label for="transferTypeSelect">Tipo Trasferimento:</label>
                        <select id="transferTypeSelect" class="form-select">
                            <option value="permanent" selected>Definitivo</option>
                            <option value="loan">Prestito</option>
                        </select>
                    </div>
                </div>

                <div class="offer-summary">
                    <div class="cost-breakdown">
                        <div class="cost-item">
                            <span>Costo Trasferimento:</span>
                            <span id="transferCostDisplay">${this.formatCurrency(suggestedOffer)}</span>
                        </div>
                        <div class="cost-item">
                            <span>Bonus Firma:</span>
                            <span id="bonusCostDisplay">€0</span>
                        </div>
                        <div class="cost-item">
                            <span>Commissioni (5%):</span>
                            <span id="agentFeeDisplay">${this.formatCurrency(suggestedOffer * 0.05)}</span>
                        </div>
                        <div class="cost-item total">
                            <span>Costo Totale:</span>
                            <span id="totalCostDisplay">${this.formatCurrency(suggestedOffer * 1.05)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal(`Offerta per ${player.first_name} ${player.last_name}`, content, [
            {
                text: 'Invia Offerta',
                class: 'button-primary',
                onclick: `window.boltManager.uiManager.currentPage.submitOffer('${playerId}')`
            }
        ]);

        // Setup real-time cost calculation
        this.setupOfferCalculation();
    }

    setupOfferCalculation() {
        const inputs = ['transferFeeInput', 'signingBonusInput'];
        
        inputs.forEach(inputId => {
            document.getElementById(inputId)?.addEventListener('input', () => {
                this.updateOfferCalculation();
            });
        });

        this.updateOfferCalculation();
    }

    updateOfferCalculation() {
        const transferFee = parseInt(document.getElementById('transferFeeInput')?.value || 0);
        const signingBonus = parseInt(document.getElementById('signingBonusInput')?.value || 0);
        const agentFee = transferFee * 0.05;
        const totalCost = transferFee + signingBonus + agentFee;

        document.getElementById('transferCostDisplay').textContent = this.formatCurrency(transferFee);
        document.getElementById('bonusCostDisplay').textContent = this.formatCurrency(signingBonus);
        document.getElementById('agentFeeDisplay').textContent = this.formatCurrency(agentFee);
        document.getElementById('totalCostDisplay').textContent = this.formatCurrency(totalCost);
    }

    async submitOffer(playerId) {
        const transferFee = parseInt(document.getElementById('transferFeeInput').value);
        const playerSalary = parseInt(document.getElementById('playerSalaryInput').value);
        const contractLength = parseInt(document.getElementById('contractLengthInput').value);
        const signingBonus = parseInt(document.getElementById('signingBonusInput').value || 0);
        const transferType = document.getElementById('transferTypeSelect').value;

        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        const userTeam = this.gameManager.getUserTeam();

        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Invio offerta...');

            const result = await this.gameManager.executeTransferOffer({
                playerId: playerId,
                fromTeamId: userTeam.id,
                toTeamId: player.team_id,
                transferFee: transferFee,
                playerSalary: playerSalary,
                contractLength: contractLength,
                transferType: transferType,
                signingBonus: signingBonus
            });

            window.boltManager.uiManager.hideLoading();

            if (result.success) {
                const responseMessage = this.getOfferResponseMessage(result.response);
                window.boltManager.uiManager.showToast(responseMessage, result.response.type === 'accepted' ? 'success' : 'info', 5000);
                
                // Refresh data
                this.loadMarketData();
            } else {
                window.boltManager.uiManager.showToast('Errore nell\'invio dell\'offerta: ' + result.error, 'error');
            }

        } catch (error) {
            console.error('Error submitting offer:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'invio dell\'offerta', 'error');
        }
    }

    getOfferResponseMessage(response) {
        switch (response.type) {
            case 'accepted':
                return '✅ Offerta accettata! Procedi con le visite mediche.';
            case 'counter_offer':
                return `💬 Controproposta ricevuta: €${response.counterTerms.transferFee.toLocaleString()}`;
            case 'rejected':
                return `❌ Offerta rifiutata: ${response.reason}`;
            default:
                return 'Risposta ricevuta';
        }
    }

    viewPlayerDetails(playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        const team = this.gameManager.gameData.teams.find(t => t.id === player.team_id);

        if (!player) return;

        const content = `
            <div class="player-details-modal">
                <div class="player-header">
                    <h3>${player.first_name} ${player.last_name}</h3>
                    <div class="player-meta">
                        <span class="player-position">${player.position}</span>
                        <span class="player-age">${player.age} anni</span>
                        <span class="player-team">${team?.name}</span>
                    </div>
                </div>

                <div class="player-ratings">
                    <div class="rating-item">
                        <span class="rating-label">Overall:</span>
                        <span class="rating-value">${player.overall_rating}</span>
                    </div>
                    <div class="rating-item">
                        <span class="rating-label">Potenziale:</span>
                        <span class="rating-value">${player.potential}</span>
                    </div>
                </div>

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

                <div class="contract-details">
                    <h4>Dettagli Contrattuali</h4>
                    <div class="contract-info">
                        <div class="info-item">
                            <span class="info-label">Valore di Mercato:</span>
                            <span class="info-value">${this.formatCurrency(player.market_value)}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Stipendio Attuale:</span>
                            <span class="info-value">${this.formatCurrency(player.salary)}/settimana</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Scadenza Contratto:</span>
                            <span class="info-value">${new Date(player.contract_expires).toLocaleDateString('it-IT')}</span>
                        </div>
                    </div>
                </div>

                <div class="season-stats">
                    <h4>Statistiche Stagione</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Partite:</span>
                            <span class="stat-value">${player.matches_played}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Gol:</span>
                            <span class="stat-value">${player.goals_scored}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Assist:</span>
                            <span class="stat-value">${player.assists}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Cartellini:</span>
                            <span class="stat-value">🟨${player.yellow_cards} 🟥${player.red_cards}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal(`${player.first_name} ${player.last_name}`, content);
    }

    viewTransferDetails(transferId) {
        const transfer = this.gameManager.gameData.transfers.find(t => t.id === transferId);
        if (!transfer) return;

        const player = this.gameManager.gameData.players.find(p => p.id === transfer.player_id);
        const fromTeam = this.gameManager.gameData.teams.find(t => t.id === transfer.from_team_id);
        const toTeam = this.gameManager.gameData.teams.find(t => t.id === transfer.to_team_id);

        const content = `
            <div class="transfer-details">
                <h4>Dettagli Trattativa</h4>
                <div class="transfer-summary">
                    <p><strong>Giocatore:</strong> ${player.first_name} ${player.last_name}</p>
                    <p><strong>Da:</strong> ${toTeam.name}</p>
                    <p><strong>A:</strong> ${fromTeam.name}</p>
                    <p><strong>Stato:</strong> ${this.getStatusText(transfer.negotiation_status)}</p>
                </div>

                <div class="transfer-terms">
                    <h5>Termini Offerta</h5>
                    <div class="terms-grid">
                        <div class="term-item">
                            <span>Costo Trasferimento:</span>
                            <span>${this.formatCurrency(transfer.transfer_fee)}</span>
                        </div>
                        <div class="term-item">
                            <span>Stipendio:</span>
                            <span>${this.formatCurrency(transfer.player_salary)}/settimana</span>
                        </div>
                        <div class="term-item">
                            <span>Durata Contratto:</span>
                            <span>${transfer.contract_length} anni</span>
                        </div>
                        <div class="term-item">
                            <span>Bonus Firma:</span>
                            <span>${this.formatCurrency(transfer.signing_bonus || 0)}</span>
                        </div>
                    </div>
                </div>

                <div class="offer-history">
                    <h5>Cronologia Offerte</h5>
                    <div class="history-list">
                        ${transfer.offer_history.map(offer => `
                            <div class="history-item">
                                <span class="history-date">${new Date(offer.date).toLocaleDateString('it-IT')}</span>
                                <span class="history-type">${offer.type}</span>
                                <span class="history-amount">${this.formatCurrency(offer.terms.transferFee)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Dettagli Trattativa', content);
    }

    async withdrawOffer(transferId) {
        const content = `
            <div class="withdraw-confirm">
                <h4>Conferma Ritiro Offerta</h4>
                <p>Sei sicuro di voler ritirare questa offerta?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Ritira Offerta', content, [
            {
                text: 'Ritira',
                class: 'button-error',
                onclick: `window.boltManager.uiManager.currentPage.confirmWithdrawOffer('${transferId}')`
            }
        ]);
    }

    async confirmWithdrawOffer(transferId) {
        try {
            window.boltManager.uiManager.hideModal();
            
            // Update transfer status to failed
            const transfer = this.gameManager.gameData.transfers.find(t => t.id === transferId);
            if (transfer) {
                transfer.negotiation_status = 'failed';
                transfer.updated_at = new Date().toISOString();
            }

            window.boltManager.uiManager.showToast('Offerta ritirata', 'info');
            this.loadActiveTransfers();

        } catch (error) {
            console.error('Error withdrawing offer:', error);
            window.boltManager.uiManager.showToast('Errore nel ritiro dell\'offerta', 'error');
        }
    }

    async finalizeTransfer(transferId) {
        try {
            window.boltManager.uiManager.showLoading('Finalizzazione trasferimento...');

            const result = await this.gameManager.executeTransferProcess({
                transferId: transferId,
                decision: 'accept',
                medicalPassed: true
            });

            window.boltManager.uiManager.hideLoading();

            if (result.success) {
                window.boltManager.uiManager.showToast('Trasferimento completato con successo!', 'success');
                this.loadMarketData();
            } else {
                window.boltManager.uiManager.showToast('Errore nel completamento: ' + result.error, 'error');
            }

        } catch (error) {
            console.error('Error finalizing transfer:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nella finalizzazione', 'error');
        }
    }

    formatCurrency(amount) {
        if (amount >= 1000000) {
            return `€${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `€${(amount / 1000).toFixed(0)}K`;
        } else {
            return `€${amount.toLocaleString()}`;
        }
    }
}