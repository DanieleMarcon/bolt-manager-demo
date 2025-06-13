<div class="transfer-market-page">
  <div class="page-header">
    <h2 class="page-title">Mercato Trasferimenti</h2>
    <div class="page-actions">
      <button class="button button-secondary shortlist-btn">
        ⭐ Osservati
      </button>
      <button class="button button-primary history-btn">
        📜 Storico
      </button>
    </div>
  </div>

  <!-- Market Overview Section -->
  <div class="market-overview">
    <div class="overview-cards">
      <div class="budget-tracker-container" id="budgetTrackerContainer"></div>
      <div class="active-deals-container" id="activeDealsContainer"></div>
    </div>
  </div>

  <!-- Player Search Section -->
  <div class="player-search-section">
    <div id="playerSearchContainer"></div>
  </div>

  <!-- Search Results Section -->
  <div class="search-results-section">
    <div class="section-header">
      <h3 class="section-title">Risultati Ricerca</h3>
      <div class="section-controls">
        <select class="sort-select" aria-label="Ordina risultati">
          <option value="value">Valore</option>
          <option value="name">Nome</option>
          <option value="age">Età</option>
          <option value="rating">Rating</option>
        </select>
        <button class="button button-ghost refresh-btn">
          ↻ Aggiorna
        </button>
      </div>
    </div>
    
    <div class="player-results-grid" id="playerResultsContainer">
      <!-- Player cards will be rendered here -->
    </div>
    
    <div class="empty-results" style="display: none;">
      <div class="empty-icon">🔍</div>
      <h4>Nessun Giocatore Trovato</h4>
      <p>Prova a modificare i filtri di ricerca</p>
    </div>
    
    <div class="loading-results" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Ricerca giocatori in corso...</span>
    </div>
  </div>

  <!-- Negotiation Modal Container -->
  <div id="negotiationModalContainer"></div>

  <!-- Contract Details Container -->
  <div id="contractDetailsContainer"></div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<style>
.transfer-market-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.page-actions {
  display: flex;
  gap: 12px;
}

.market-overview {
  margin-bottom: 16px;
}

.overview-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.section-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
}

.player-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.empty-results,
.loading-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-results h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-results p {
  font-size: 14px;
  margin: 0;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sponsor-banner-container {
  margin-top: 24px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .overview-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .player-results-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .page-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .section-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .player-results-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script type="module">
export default class TransferMarketPage {
  constructor() {
    this.players = [];
    this.filteredPlayers = [];
    this.activeDeals = [];
    this.budget = {
      available: 50000000,
      spent: 0,
      pending: 0
    };
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadData();
    this.renderComponents();
  }

  bindEvents() {
    document.querySelector('.shortlist-btn')?.addEventListener('click', () => this.showShortlist());
    document.querySelector('.history-btn')?.addEventListener('click', () => this.showTransferHistory());
    document.querySelector('.refresh-btn')?.addEventListener('click', () => this.refreshPlayers());
    document.querySelector('.sort-select')?.addEventListener('change', (e) => this.sortPlayers(e.target.value));
    
    // Listen for events from components
    document.addEventListener('playerSearch', (e) => this.handleSearch(e.detail));
    document.addEventListener('dealAdded', (e) => this.handleNewDeal(e.detail));
    document.addEventListener('contractSubmit', (e) => this.handleContractSubmit(e.detail));
  }

  async loadData() {
    try {
      // In a real app, these would fetch from the game state or API
      this.players = await this.fetchPlayers();
      this.activeDeals = await this.fetchActiveDeals();
      this.budget = await this.fetchBudget();
      
      this.filteredPlayers = [...this.players];
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Errore nel caricamento dei dati');
    }
  }

  async fetchPlayers() {
    // Mock data - in a real app this would come from game state
    const players = [];
    
    // Generate sample players
    for (let i = 1; i <= 50; i++) {
      const positions = ['GK', 'DF', 'MF', 'FW'];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const age = Math.floor(Math.random() * 15) + 18; // 18-32
      const value = Math.floor(Math.random() * 50 + 1) * 1000000; // 1M-50M
      
      players.push({
        id: i,
        name: `Player ${i}`,
        position,
        age,
        team: `Team ${Math.floor(i / 5) + 1}`,
        nationality: `Country ${Math.floor(i / 10) + 1}`,
        marketValue: value,
        currentWage: Math.floor(value / 100),
        contractExpiry: new Date(2025 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString(),
        overall_rating: Math.floor(Math.random() * 30) + 70, // 70-99
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      });
    }
    
    return players;
  }

  async fetchActiveDeals() {
    // Mock data - in a real app this would come from game state
    return [
      {
        id: 1,
        player: {
          id: 101,
          name: 'Mario Rossi',
          position: 'FW',
          age: 25,
          team: 'AC Milan',
          photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=96&h=96'
        },
        status: 'negotiating',
        offerAmount: 5000000,
        proposedWages: 50000,
        responseDeadline: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
      },
      {
        id: 2,
        player: {
          id: 102,
          name: 'Luigi Bianchi',
          position: 'MF',
          age: 28,
          team: 'Juventus',
          photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=96&h=96'
        },
        status: 'accepted',
        offerAmount: 3500000,
        proposedWages: 40000,
        responseDeadline: new Date(Date.now() + 43200000).toISOString() // 12 hours from now
      }
    ];
  }

  async fetchBudget() {
    // Mock data - in a real app this would come from game state
    return {
      available: 50000000,
      spent: 10000000,
      pending: 8500000
    };
  }

  renderComponents() {
    this.renderBudgetTracker();
    this.renderActiveDeals();
    this.renderPlayerSearch();
    this.renderPlayerResults();
    this.renderNegotiationModal();
    this.renderContractDetails();
    this.renderSponsorBanner();
  }

  renderBudgetTracker() {
    const container = document.getElementById('budgetTrackerContainer');
    const el = document.createElement('div');
    el.className = 'budget-tracker';
    container.appendChild(el);

    if (typeof BudgetTracker !== "undefined") {
      new BudgetTracker(el, this.budget);
    }
  }

  renderActiveDeals() {
    const container = document.getElementById('activeDealsContainer');
    const el = document.createElement('div');
    el.className = 'active-deals-panel';
    container.appendChild(el);

    if (typeof ActiveDealsPanel !== "undefined") {
      const panel = new ActiveDealsPanel(el, {
        maxDeals: 10,
        autoRefresh: true
      });
      
      // Add active deals
      if (panel.setDeals) {
        panel.setDeals(this.activeDeals);
      }
    }
  }

  renderPlayerSearch() {
    const container = document.getElementById('playerSearchContainer');
    const el = document.createElement('div');
    el.className = 'player-search-bar';
    container.appendChild(el);

    if (typeof PlayerSearchBar !== "undefined") {
      new PlayerSearchBar(el, {
        autoSearch: true,
        searchDelay: 300
      });
    }
  }

  renderPlayerResults() {
    const container = document.getElementById('playerResultsContainer');
    container.innerHTML = '';
    
    if (this.filteredPlayers.length === 0) {
      document.querySelector('.empty-results').style.display = 'flex';
      return;
    }
    
    document.querySelector('.empty-results').style.display = 'none';
    
    this.filteredPlayers.forEach(player => {
      const el = document.createElement('div');
      el.className = 'player-card';
      container.appendChild(el);

      // Create a player card with market-specific data
      const playerData = {
        player: {
          ...player,
          marketValue: player.marketValue,
          currentWage: player.currentWage,
          contractExpiry: player.contractExpiry
        }
      };

      if (typeof PlayerCard !== "undefined") {
        const card = new PlayerCard(el, playerData);
        
        // Override default actions for market context
        el.querySelector('.view-details-btn').textContent = '👁️ Dettagli';
        el.querySelector('.train-player-btn').textContent = '💰 Offerta';
        
        // Change event listener for the offer button
        const offerBtn = el.querySelector('.train-player-btn');
        if (offerBtn) {
          offerBtn.removeEventListener('click', offerBtn.clickHandler);
          offerBtn.clickHandler = () => this.showNegotiationModal(player);
          offerBtn.addEventListener('click', offerBtn.clickHandler);
        }
      }
    });
  }

  renderNegotiationModal() {
    const container = document.getElementById('negotiationModalContainer');
    const el = document.createElement('div');
    el.className = 'negotiation-modal modal';
    container.appendChild(el);

    if (typeof NegotiationModal !== "undefined") {
      this.negotiationModal = new NegotiationModal(el, {
        onSave: (data) => this.handleDraftSave(data),
        onSubmit: (data) => this.handleOfferSubmit(data)
      });
    }
  }

  renderContractDetails() {
    const container = document.getElementById('contractDetailsContainer');
    const el = document.createElement('div');
    el.className = 'contract-details-form';
    container.appendChild(el);

    if (typeof ContractDetailsForm !== "undefined") {
      this.contractForm = new ContractDetailsForm(el, {
        autoSave: false
      });
    }
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    const sponsorData = {
      id: 2,
      name: 'Energy Boost',
      description: 'La bevanda energetica ufficiale dei campioni di calcio',
      logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      cta: 'Prova ora',
      url: 'https://example.com/sponsor2',
      theme: 'featured'
    };

    if (typeof SponsorBanner !== "undefined") {
      new SponsorBanner(el, { sponsorData, autoClose: true, duration: 10000 });
    }
  }

  handleSearch(searchParams) {
    this.showLoading(true);
    
    // Filter players based on search parameters
    this.filteredPlayers = this.players.filter(player => {
      // Search term filter
      if (searchParams.filters.search) {
        const searchTerm = searchParams.filters.search.toLowerCase();
        if (!player.name.toLowerCase().includes(searchTerm) &&
            !player.team.toLowerCase().includes(searchTerm) &&
            !player.position.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      // Position filter
      if (searchParams.filters.position && player.position !== searchParams.filters.position) {
        return false;
      }
      
      // Age filter
      if (searchParams.filters.age) {
        const { min, max } = searchParams.filters.age;
        if (player.age < min || player.age > max) {
          return false;
        }
      }
      
      // Rating filter
      if (searchParams.filters.rating) {
        const { min, max } = searchParams.filters.rating;
        if (player.overall_rating < min || player.overall_rating > max) {
          return false;
        }
      }
      
      // Team filter
      if (searchParams.filters.team && player.team !== searchParams.filters.team) {
        return false;
      }
      
      // Nationality filter
      if (searchParams.filters.nationality && player.nationality !== searchParams.filters.nationality) {
        return false;
      }
      
      // Contract filter
      if (searchParams.filters.contract) {
        const now = new Date();
        const expiry = new Date(player.contractExpiry);
        const monthsRemaining = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
        
        if (searchParams.filters.contract === 'expiring' && monthsRemaining > 6) {
          return false;
        } else if (searchParams.filters.contract === 'long' && monthsRemaining <= 12) {
          return false;
        }
      }
      
      return true;
    });
    
    // Update search results count
    const searchBar = document.querySelector('.player-search-bar');
    if (searchBar?.setResultsCount) {
      searchBar.setResultsCount(this.filteredPlayers.length);
    }
    
    setTimeout(() => {
      this.renderPlayerResults();
      this.showLoading(false);
    }, 500);
  }

  sortPlayers(sortBy) {
    this.filteredPlayers.sort((a, b) => {
      switch (sortBy) {
        case 'value':
          return b.marketValue - a.marketValue;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'rating':
          return b.overall_rating - a.overall_rating;
        default:
          return 0;
      }
    });
    
    this.renderPlayerResults();
  }

  showNegotiationModal(player) {
    if (this.negotiationModal?.show) {
      this.negotiationModal.show(player);
    } else {
      window?.showNegotiationModal?.(player);
    }
  }

  handleDraftSave(data) {
    console.log('Draft saved:', data);
    // In a real app, this would save the draft to the game state
  }

  handleOfferSubmit(data) {
    console.log('Offer submitted:', data);
    // In a real app, this would call the Transfer_Offer flow
    this.makeTransferOffer(data);
  }

  handleNewDeal(deal) {
    this.activeDeals.push(deal);
    
    // Update active deals panel
    const dealsPanel = document.querySelector('.active-deals-panel');
    if (dealsPanel?.setDeals) {
      dealsPanel.setDeals(this.activeDeals);
    }
    
    // Update budget
    this.budget.pending += deal.offerAmount;
    this.budget.available -= deal.offerAmount;
    
    // Update budget tracker
    const budgetTracker = document.querySelector('.budget-tracker');
    if (budgetTracker?.updateBudget) {
      budgetTracker.updateBudget(this.budget);
    }
  }

  handleContractSubmit(data) {
    console.log('Contract submitted:', data);
    // In a real app, this would finalize the transfer
    this.finalizeTransfer(data);
  }

  showShortlist() {
    alert('Funzione lista osservati');
  }

  showTransferHistory() {
    alert('Funzione storico trasferimenti');
  }

  refreshPlayers() {
    this.showLoading(true);
    
    // Simulate refresh
    setTimeout(() => {
      this.loadData().then(() => {
        this.renderPlayerResults();
        this.showLoading(false);
      });
    }, 1000);
  }

  showLoading(show) {
    document.querySelector('.loading-results').style.display = show ? 'flex' : 'none';
    document.querySelector('.player-results-grid').style.display = show ? 'none' : 'grid';
    document.querySelector('.empty-results').style.display = 'none';
  }

  // Simulate Transfer_Offer flow
  async makeTransferOffer(offerData) {
    try {
      // In a real app, this would call the Transfer_Offer flow
      console.log('Calling Transfer_Offer flow...', offerData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to active deals
      const newDeal = {
        id: Date.now(),
        player: offerData.player,
        status: 'negotiating',
        offerAmount: offerData.offerAmount,
        proposedWages: offerData.wageAmount,
        responseDeadline: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
      };
      
      this.handleNewDeal(newDeal);
      
      return { success: true, deal: newDeal };
    } catch (error) {
      console.error('Error making transfer offer:', error);
      return { success: false, error: error.message };
    }
  }

  // Simulate Transfer_Process flow
  async finalizeTransfer(contractData) {
    try {
      // In a real app, this would call the Transfer_Process flow
      console.log('Calling Transfer_Process flow...', contractData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update budget
      const deal = this.activeDeals.find(d => d.player.id === contractData.playerId);
      if (deal) {
        this.budget.spent += deal.offerAmount;
        this.budget.pending -= deal.offerAmount;
        
        // Update deal status
        deal.status = 'completed';
        
        // Update budget tracker
        const budgetTracker = document.querySelector('.budget-tracker');
        if (budgetTracker?.updateBudget) {
          budgetTracker.updateBudget(this.budget);
        }
        
        // Update active deals panel
        const dealsPanel = document.querySelector('.active-deals-panel');
        if (dealsPanel?.setDeals) {
          dealsPanel.setDeals(this.activeDeals);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error finalizing transfer:', error);
      return { success: false, error: error.message };
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TransferMarketPage();
});
</script>