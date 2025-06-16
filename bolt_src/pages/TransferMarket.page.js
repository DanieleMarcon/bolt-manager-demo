import PlayerSearch from '../components/PlayerSearch.component.js';
import NegotiationPanel from '../components/NegotiationPanel.component.js';
import ContractDetails from '../components/ContractDetails.component.js';

export default class TransferMarketPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.players = [];
    this.filteredPlayers = [];
    this.selectedPlayer = null;
    this.activeDeals = [];
    this.budget = {
      available: 50000000,
      spent: 0,
      pending: 0
    };
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="transfer-market-page">
        <div class="page-header">
          <h2 class="page-title">Mercato Trasferimenti</h2>
          <div class="page-actions">
            <button class="button button-secondary shortlist-btn">⭐ Lista Osservati</button>
            <button class="button button-secondary history-btn">📜 Storico Trasferimenti</button>
            <button class="button button-primary refresh-btn">🔄 Aggiorna Mercato</button>
          </div>
        </div>

        <!-- Market Overview Section -->
        <div class="market-overview-section">
          <div class="overview-cards">
            <div class="budget-card">
              <h4>Budget Disponibile</h4>
              <div class="budget-amount">€${this.formatCurrency(this.budget.available)}</div>
              <div class="budget-details">
                <span>Speso: €${this.formatCurrency(this.budget.spent)}</span>
                <span>In sospeso: €${this.formatCurrency(this.budget.pending)}</span>
              </div>
            </div>
            
            <div class="deals-card">
              <h4>Trattative Attive</h4>
              <div class="deals-count">${this.activeDeals.length}</div>
              <div class="deals-status">
                <span>${this.getDealsInProgress()} in corso</span>
                <span>${this.getDealsAccepted()} accettate</span>
              </div>
            </div>
            
            <div class="market-stats-card">
              <h4>Statistiche Mercato</h4>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-value">${this.players.length}</span>
                  <span class="stat-label">Giocatori</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${this.getAvailablePlayersCount()}</span>
                  <span class="stat-label">Disponibili</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Player Search Section -->
        <div class="player-search-section">
          <div id="playerSearch" class="player-search-container"></div>
        </div>

        <!-- Main Content -->
        <div class="market-main-content">
          <div class="market-left-panel">
            <!-- Search Results -->
            <div class="search-results-section">
              <div class="results-header">
                <h3 class="section-title">Risultati Ricerca</h3>
                <div class="results-info">
                  <span class="results-count" id="resultsCount">0 giocatori trovati</span>
                </div>
              </div>
              
              <div class="player-results-grid" id="playerResultsGrid">
                <!-- Player cards will be rendered here -->
              </div>
              
              <div class="empty-results" id="emptyResults" style="display: none;">
                <div class="empty-icon">🔍</div>
                <h4>Nessun Giocatore Trovato</h4>
                <p>Prova a modificare i filtri di ricerca per trovare giocatori</p>
              </div>
              
              <div class="loading-results" id="loadingResults" style="display: none;">
                <div class="loading-spinner"></div>
                <span>Ricerca giocatori in corso...</span>
              </div>
            </div>
          </div>
          
          <div class="market-right-panel">
            <!-- Negotiation Panel -->
            <div class="negotiation-section">
              <div id="negotiationPanel" class="negotiation-panel-container"></div>
            </div>
            
            <!-- Contract Details -->
            <div class="contract-section">
              <div id="contractDetails" class="contract-details-container"></div>
            </div>
            
            <!-- Active Deals -->
            <div class="active-deals-section">
              <h4>Trattative in Corso</h4>
              <div id="activeDealsContainer" class="active-deals-container">
                ${this.renderActiveDeals()}
              </div>
            </div>
          </div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.loadMarketData();
    this.renderPlayerSearch();
    this.renderNegotiationPanel();
    this.renderContractDetails();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  loadMarketData() {
    // Mock data - in a real app this would fetch from game state or API
    this.players = this.generateMockPlayers();
    this.activeDeals = this.generateMockDeals();
    this.filteredPlayers = [...this.players];
  }

  renderPlayerSearch() {
    const container = document.getElementById('playerSearch');
    
    new PlayerSearch(container, {
      onSearch: (searchParams) => this.handlePlayerSearch(searchParams),
      onFilterChange: (filters) => this.handleFilterChange(filters),
      autoSearch: true,
      searchDelay: 300
    });
  }

  renderNegotiationPanel() {
    const container = document.getElementById('negotiationPanel');
    
    new NegotiationPanel(container,{
      
      player: this.selectedPlayer,
      maxBudget: this.budget.available,
      onOfferSubmit: (offerData) => this.handleOfferSubmit(offerData),
      onDraftSave: (draftData) => this.handleDraftSave(draftData),
      onCancel: () => this.handleNegotiationCancel()
    });
  }

  renderContractDetails() {
    const container = document.getElementById('contractDetails');
    
    new ContractDetails(container, {
      contract: null,
      player: this.selectedPlayer,
      club: { name: 'AC Milan', logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60' },
      editable: false,
      showActions: false
    });
  }

  renderPlayerResults() {
    const container = document.getElementById('playerResultsGrid');
    const emptyResults = document.getElementById('emptyResults');
    const resultsCount = document.getElementById('resultsCount');
    
    // Update results count
    resultsCount.textContent = `${this.filteredPlayers.length} giocatori trovati`;
    
    if (this.filteredPlayers.length === 0) {
      container.style.display = 'none';
      emptyResults.style.display = 'flex';
      return;
    }
    
    container.style.display = 'grid';
    emptyResults.style.display = 'none';
    container.innerHTML = '';
    
    this.filteredPlayers.forEach(player => {
      const playerCard = this.createPlayerCard(player);
      container.appendChild(playerCard);
    });
  }

  createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-market-card';
    card.dataset.playerId = player.id;
    
    card.innerHTML = `
      <div class="player-card-header">
        <img src="${player.photo}" alt="${player.name}" class="player-photo">
        <div class="player-basic-info">
          <h5 class="player-name">${player.name}</h5>
          <span class="player-position">${player.position}</span>
          <span class="player-age">${player.age} anni</span>
        </div>
        <div class="player-rating">
          <span class="rating-value">${player.overall_rating}</span>
        </div>
      </div>
      
      <div class="player-card-body">
        <div class="player-details">
          <div class="detail-item">
            <span class="detail-label">Squadra:</span>
            <span class="detail-value">${player.team}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Nazionalità:</span>
            <span class="detail-value">${player.nationality}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Valore:</span>
            <span class="detail-value">€${this.formatCurrency(player.marketValue)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Stipendio:</span>
            <span class="detail-value">€${this.formatCurrency(player.currentWage)}/sett</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Contratto:</span>
            <span class="detail-value">${this.formatContractExpiry(player.contractExpiry)}</span>
          </div>
        </div>
      </div>
      
      <div class="player-card-actions">
        <button class="button button-ghost view-details-btn">👁️ Dettagli</button>
        <button class="button button-primary make-offer-btn">💰 Fai Offerta</button>
      </div>
    `;
    
    // Bind events
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    const makeOfferBtn = card.querySelector('.make-offer-btn');
    
    viewDetailsBtn?.addEventListener('click', () => this.viewPlayerDetails(player));
    makeOfferBtn?.addEventListener('click', () => this.makeOffer(player));
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.selectPlayer(player);
      }
    });
    
    return card;
  }

  renderActiveDeals() {
    if (this.activeDeals.length === 0) {
      return `
        <div class="no-deals">
          <div class="no-deals-icon">📋</div>
          <p>Nessuna trattativa in corso</p>
        </div>
      `;
    }
    
    return this.activeDeals.map(deal => `
      <div class="deal-item ${deal.status}">
        <div class="deal-player">
          <img src="${deal.player.photo}" alt="${deal.player.name}" class="deal-player-photo">
          <div class="deal-player-info">
            <h6>${deal.player.name}</h6>
            <span>${deal.player.position} - ${deal.player.team}</span>
          </div>
        </div>
        
        <div class="deal-details">
          <div class="deal-amount">€${this.formatCurrency(deal.offerAmount)}</div>
          <div class="deal-status">${this.getDealStatusText(deal.status)}</div>
          <div class="deal-deadline">${this.formatDeadline(deal.responseDeadline)}</div>
        </div>
        
        <div class="deal-actions">
          <button class="deal-action-btn view-btn" data-deal-id="${deal.id}">👁️</button>
          <button class="deal-action-btn cancel-btn" data-deal-id="${deal.id}">❌</button>
        </div>
      </div>
    `).join('');
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Il mercato dei campioni</span>
      </div>
    `;
  }

  bindEvents() {
    // Page action buttons
    const shortlistBtn = this.container.querySelector('.shortlist-btn');
    const historyBtn = this.container.querySelector('.history-btn');
    const refreshBtn = this.container.querySelector('.refresh-btn');
    
    shortlistBtn?.addEventListener('click', () => this.showShortlist());
    historyBtn?.addEventListener('click', () => this.showTransferHistory());
    refreshBtn?.addEventListener('click', () => this.refreshMarket());

    // Deal action buttons
    this.bindDealActions();
  }

  bindDealActions() {
    const dealViewBtns = this.container.querySelectorAll('.deal-action-btn.view-btn');
    const dealCancelBtns = this.container.querySelectorAll('.deal-action-btn.cancel-btn');
    
    dealViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dealId = parseInt(btn.dataset.dealId);
        this.viewDeal(dealId);
      });
    });
    
    dealCancelBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dealId = parseInt(btn.dataset.dealId);
        this.cancelDeal(dealId);
      });
    });
  }

  handlePlayerSearch(searchParams) {
    this.showLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      this.filteredPlayers = this.players.filter(player => {
        return this.matchesSearchCriteria(player, searchParams.filters);
      });
      
      // Sort results
      this.sortPlayers(searchParams.sortBy || 'name');
      
      this.renderPlayerResults();
      this.showLoading(false);
    }, 500);
  }

  handleFilterChange(filters) {
    // Update search component with results count
    const playerSearch = document.querySelector('.player-search');
    if (playerSearch?.setResultsCount) {
      playerSearch.setResultsCount(this.filteredPlayers.length);
    }
  }

  matchesSearchCriteria(player, filters) {
    // Search term filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!player.name.toLowerCase().includes(searchTerm) &&
          !player.team.toLowerCase().includes(searchTerm) &&
          !player.nationality.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }
    
    // Position filter
    if (filters.position && player.position !== filters.position) {
      return false;
    }
    
    // Age filter
    if (filters.age) {
      if (player.age < filters.age.min || player.age > filters.age.max) {
        return false;
      }
    }
    
    // Rating filter
    if (filters.rating) {
      if (player.overall_rating < filters.rating.min || player.overall_rating > filters.rating.max) {
        return false;
      }
    }
    
    // Value filter
    if (filters.value) {
      if (player.marketValue < filters.value.min || player.marketValue > filters.value.max) {
        return false;
      }
    }
    
    // Nationality filter
    if (filters.nationality && player.nationality !== filters.nationality) {
      return false;
    }
    
    // Contract filter
    if (filters.contract) {
      const now = new Date();
      const expiry = new Date(player.contractExpiry);
      const monthsRemaining = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
      
      switch (filters.contract) {
        case 'expiring':
          if (monthsRemaining > 6) return false;
          break;
        case 'short':
          if (monthsRemaining > 12) return false;
          break;
        case 'long':
          if (monthsRemaining <= 24) return false;
          break;
        case 'free':
          if (monthsRemaining > 0) return false;
          break;
      }
    }
    
    return true;
  }

  sortPlayers(sortBy) {
    this.filteredPlayers.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.overall_rating - a.overall_rating;
        case 'age':
          return a.age - b.age;
        case 'value':
          return b.marketValue - a.marketValue;
        case 'position':
          return a.position.localeCompare(b.position);
        default:
          return 0;
      }
    });
  }

  selectPlayer(player) {
    this.selectedPlayer = player;
    
    // Update visual selection
    const playerCards = this.container.querySelectorAll('.player-market-card');
    playerCards.forEach(card => {
      card.classList.toggle('selected', parseInt(card.dataset.playerId) === player.id);
    });
    
    // Update negotiation panel
    const negotiationPanel = document.getElementById('negotiationPanel');
    if (negotiationPanel?.negotiationPanel) {
      negotiationPanel.negotiationPanel.setPlayer(player);
    }
    
    // Update contract details
    const contractDetails = document.getElementById('contractDetails');
    if (contractDetails?.contractDetails) {
      const mockContract = this.generateMockContract(player);
      contractDetails.contractDetails.setContract(mockContract);
      contractDetails.contractDetails.setPlayer(player);
    }
  }

  viewPlayerDetails(player) {
    this.selectPlayer(player);
    this.showToast(`Visualizzazione dettagli di ${player.name}`, 'info');
  }

  makeOffer(player) {
    this.selectPlayer(player);
    
    // Scroll to negotiation panel
    const negotiationPanel = document.getElementById('negotiationPanel');
    negotiationPanel?.scrollIntoView({ behavior: 'smooth' });
    
    this.showToast(`Inizia negoziazione per ${player.name}`, 'info');
  }

  handleOfferSubmit(offerData) {
    console.log('Offer submitted:', offerData);
    
    // Create new deal
    const newDeal = {
      id: Date.now(),
      player: offerData.player,
      status: 'negotiating',
      offerAmount: offerData.offer.transferFee,
      proposedWages: offerData.offer.weeklyWage,
      responseDeadline: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
    };
    
    this.activeDeals.push(newDeal);
    
    // Update budget
    this.budget.pending += offerData.offer.transferFee;
    this.budget.available -= offerData.offer.transferFee;
    
    // Re-render active deals
    const activeDealsContainer = document.getElementById('activeDealsContainer');
    activeDealsContainer.innerHTML = this.renderActiveDeals();
    this.bindDealActions();
    
    // Update budget display
    this.updateBudgetDisplay();
    
    this.showToast(`Offerta inviata per ${offerData.player.name}`, 'success');
  }

  handleDraftSave(draftData) {
    console.log('Draft saved:', draftData);
    this.showToast('Bozza salvata', 'success');
  }

  handleNegotiationCancel() {
    this.selectedPlayer = null;
    
    // Clear visual selection
    const playerCards = this.container.querySelectorAll('.player-market-card');
    playerCards.forEach(card => card.classList.remove('selected'));
    
    this.showToast('Negoziazione annullata', 'info');
  }

  viewDeal(dealId) {
    const deal = this.activeDeals.find(d => d.id === dealId);
    if (deal) {
      this.showToast(`Visualizzazione trattativa per ${deal.player.name}`, 'info');
    }
  }

  cancelDeal(dealId) {
    const deal = this.activeDeals.find(d => d.id === dealId);
    if (deal && confirm(`Sei sicuro di voler annullare la trattativa per ${deal.player.name}?`)) {
      // Remove deal
      this.activeDeals = this.activeDeals.filter(d => d.id !== dealId);
      
      // Update budget
      this.budget.pending -= deal.offerAmount;
      this.budget.available += deal.offerAmount;
      
      // Re-render
      const activeDealsContainer = document.getElementById('activeDealsContainer');
      activeDealsContainer.innerHTML = this.renderActiveDeals();
      this.bindDealActions();
      this.updateBudgetDisplay();
      
      this.showToast(`Trattativa per ${deal.player.name} annullata`, 'success');
    }
  }

  showShortlist() {
    this.showToast('Apertura lista osservati', 'info');
  }

  showTransferHistory() {
    this.showToast('Apertura storico trasferimenti', 'info');
  }

  refreshMarket() {
    this.showLoading(true);
    
    setTimeout(() => {
      this.loadMarketData();
      this.renderPlayerResults();
      this.updateBudgetDisplay();
      this.showLoading(false);
      this.showToast('Mercato aggiornato', 'success');
    }, 1000);
  }

  showLoading(show) {
    const loadingResults = document.getElementById('loadingResults');
    const playerResultsGrid = document.getElementById('playerResultsGrid');
    const emptyResults = document.getElementById('emptyResults');
    
    loadingResults.style.display = show ? 'flex' : 'none';
    playerResultsGrid.style.display = show ? 'none' : 'grid';
    emptyResults.style.display = 'none';
  }

  updateBudgetDisplay() {
    const budgetAmount = this.container.querySelector('.budget-amount');
    const budgetDetails = this.container.querySelector('.budget-details');
    
    if (budgetAmount) {
      budgetAmount.textContent = `€${this.formatCurrency(this.budget.available)}`;
    }
    
    if (budgetDetails) {
      budgetDetails.innerHTML = `
        <span>Speso: €${this.formatCurrency(this.budget.spent)}</span>
        <span>In sospeso: €${this.formatCurrency(this.budget.pending)}</span>
      `;
    }
  }

  generateMockPlayers() {
    const players = [];
    const positions = ['GK', 'DF', 'MF', 'FW'];
    const teams = ['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio', 'Fiorentina', 'Atalanta', 'Torino'];
    const nationalities = ['Italy', 'Spain', 'France', 'Germany', 'Brazil', 'Argentina', 'England', 'Portugal'];
    
    for (let i = 1; i <= 100; i++) {
      const position = positions[Math.floor(Math.random() * positions.length)];
      const age = Math.floor(Math.random() * 15) + 18; // 18-32
      const rating = Math.floor(Math.random() * 30) + 70; // 70-99
      const value = Math.floor(Math.random() * 50 + 1) * 1000000; // 1M-50M
      
      players.push({
        id: i,
        name: `Player ${i}`,
        position,
        age,
        team: teams[Math.floor(Math.random() * teams.length)],
        nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
        marketValue: value,
        currentWage: Math.floor(value / 100),
        contractExpiry: new Date(2025 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString(),
        overall_rating: rating,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      });
    }
    
    return players;
  }

  generateMockDeals() {
    return [
      {
        id: 1,
        player: {
          id: 101,
          name: 'Mario Rossi',
          position: 'FW',
          team: 'Juventus',
          photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
        },
        status: 'negotiating',
        offerAmount: 15000000,
        proposedWages: 75000,
        responseDeadline: new Date(Date.now() + 86400000).toISOString()
      }
    ];
  }

  generateMockContract(player) {
    return {
      duration: 3,
      startDate: '2024-07-01',
      endDate: player.contractExpiry,
      weeklyWage: player.currentWage,
      signingBonus: 0,
      releaseClause: player.marketValue * 1.5,
      status: 'active'
    };
  }

  getDealsInProgress() {
    return this.activeDeals.filter(d => d.status === 'negotiating').length;
  }

  getDealsAccepted() {
    return this.activeDeals.filter(d => d.status === 'accepted').length;
  }

  getAvailablePlayersCount() {
    return this.players.filter(p => {
      const expiry = new Date(p.contractExpiry);
      const now = new Date();
      const monthsRemaining = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
      return monthsRemaining <= 12; // Available if contract expires within a year
    }).length;
  }

  getDealStatusText(status) {
    const statusMap = {
      'negotiating': 'In negoziazione',
      'accepted': 'Accettata',
      'rejected': 'Rifiutata',
      'completed': 'Completata'
    };
    return statusMap[status] || status;
  }

  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toLocaleString();
  }

  formatContractExpiry(dateString) {
    const expiry = new Date(dateString);
    const now = new Date();
    const monthsRemaining = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
    
    if (monthsRemaining <= 0) return 'Scaduto';
    if (monthsRemaining <= 6) return 'In scadenza';
    return expiry.getFullYear().toString();
  }

  formatDeadline(dateString) {
    const deadline = new Date(dateString);
    const now = new Date();
    const diffHours = Math.ceil((deadline - now) / (1000 * 60 * 60));
    
    if (diffHours <= 0) return 'Scaduta';
    if (diffHours <= 24) return `${diffHours}h rimanenti`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}g rimanenti`;
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}