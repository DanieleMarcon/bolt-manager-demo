<div class="active-deals-panel">
  <div class="panel-header">
    <h3 class="panel-title">Trattative in Corso</h3>
    <div class="deals-count">
      <span class="count-value">0</span>
      <span class="count-label">Trattative</span>
    </div>
  </div>
  
  <div class="deals-list">
    <!-- Active deals will be populated here -->
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">🤝</div>
      <h4>Nessuna Trattativa Attiva</h4>
      <p>Inizia una nuova trattativa cercando giocatori nel mercato</p>
    </div>
  </div>
  
  <div class="deals-summary">
    <div class="summary-item">
      <span class="summary-label">Budget Impegnato:</span>
      <span class="summary-value committed-budget">€0</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Stipendi Proposti:</span>
      <span class="summary-value proposed-wages">€0/sett</span>
    </div>
  </div>
  
  <div class="deals-actions">
    <button class="button button-ghost cancel-all-btn" disabled>
      ✕ Annulla Tutte
    </button>
    <button class="button button-primary view-market-btn">
      🔍 Cerca Giocatori
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-deals">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Transfers Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.active-deals-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.deals-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: var(--primary);
  color: white;
  border-radius: 8px;
}

.count-value {
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.count-label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.9;
}

.deals-list {
  min-height: 200px;
  margin-bottom: 20px;
}

.deal-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
}

.deal-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.player-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.player-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.player-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-details {
  flex: 1;
}

.player-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 4px 0;
}

.player-meta {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.player-position {
  background: var(--primary);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.deal-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 120px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

.status-badge.negotiating {
  background: var(--warning);
  color: white;
}

.status-badge.accepted {
  background: var(--success);
  color: white;
}

.status-badge.pending {
  background: var(--primary);
  color: white;
}

.status-badge.rejected {
  background: var(--error);
  color: white;
}

.deal-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.deal-actions {
  display: flex;
  gap: 8px;
}

.deal-btn {
  padding: 6px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.deal-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.deal-btn.cancel-btn:hover {
  background: var(--error);
  border-color: var(--error);
}

.empty-state {
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

.empty-state h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.deals-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.summary-label {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.summary-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.deals-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.sponsor-slot-deals {
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .deals-count {
    align-self: flex-start;
  }
  
  .deal-item {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .deal-status {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: auto;
  }
  
  .deals-actions {
    flex-direction: column;
  }
  
  .sponsor-slot-deals {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class ActiveDealsPanel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxDeals: 10,
      autoRefresh: true,
      refreshInterval: 60000, // 1 minute
      ...options
    };
    
    this.activeDeals = [];
    this.refreshInterval = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadDeals();
    
    if (this.options.autoRefresh) {
      this.startAutoRefresh();
    }
  }
  
  bindEvents() {
    // View market button
    this.element.querySelector('.view-market-btn').addEventListener('click', () => {
      this.viewTransferMarket();
    });
    
    // Cancel all button
    this.element.querySelector('.cancel-all-btn').addEventListener('click', () => {
      this.confirmCancelAllDeals();
    });
    
    // Deal actions will be bound when deals are rendered
  }
  
  async loadDeals() {
    try {
      // In a real app, this would fetch from game state
      this.activeDeals = await this.fetchActiveDeals();
      this.renderDeals();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading active deals:', error);
      this.showError('Errore nel caricamento delle trattative');
    }
  }
  
  async fetchActiveDeals() {
    // Mock data - in real app this would come from game state
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
  
  renderDeals() {
    const dealsList = this.element.querySelector('.deals-list');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing deals
    dealsList.querySelectorAll('.deal-item').forEach(item => item.remove());
    
    // Show empty state if no deals
    if (this.activeDeals.length === 0) {
      emptyState.style.display = 'flex';
      this.element.querySelector('.cancel-all-btn').disabled = true;
      return;
    }
    
    // Hide empty state and show deals
    emptyState.style.display = 'none';
    this.element.querySelector('.cancel-all-btn').disabled = false;
    
    // Update deals count
    this.element.querySelector('.count-value').textContent = this.activeDeals.length;
    
    // Render each deal
    this.activeDeals.forEach(deal => {
      const dealElement = this.createDealElement(deal);
      dealsList.appendChild(dealElement);
    });
  }
  
  createDealElement(deal) {
    const element = document.createElement('div');
    element.className = 'deal-item';
    element.dataset.dealId = deal.id;
    
    const statusText = this.getStatusText(deal.status);
    const statusClass = deal.status;
    
    element.innerHTML = `
      <div class="player-info">
        <div class="player-avatar">
          <img src="${deal.player.photo}" alt="Foto di ${deal.player.name}" loading="lazy">
        </div>
        <div class="player-details">
          <h4 class="player-name">${deal.player.name}</h4>
          <div class="player-meta">
            <span class="player-position">${deal.player.position}</span>
            <span>${deal.player.age} anni</span>
            <span>${deal.player.team}</span>
          </div>
        </div>
      </div>
      
      <div class="deal-status">
        <span class="status-badge ${statusClass}">${statusText}</span>
        <span class="deal-value">${this.formatCurrency(deal.offerAmount)}</span>
      </div>
      
      <div class="deal-actions">
        <button class="deal-btn view-btn" aria-label="Visualizza dettagli trattativa">
          👁️
        </button>
        <button class="deal-btn edit-btn" aria-label="Modifica offerta" ${deal.status === 'accepted' ? 'disabled' : ''}>
          ✏️
        </button>
        <button class="deal-btn cancel-btn" aria-label="Annulla trattativa">
          ✕
        </button>
      </div>
    `;
    
    // Bind action buttons
    element.querySelector('.view-btn').addEventListener('click', () => {
      this.viewDealDetails(deal.id);
    });
    
    element.querySelector('.edit-btn').addEventListener('click', () => {
      this.editDeal(deal.id);
    });
    
    element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.cancelDeal(deal.id);
    });
    
    return element;
  }
  
  getStatusText(status) {
    const statusMap = {
      negotiating: 'In Trattativa',
      accepted: 'Accettata',
      pending: 'In Attesa',
      rejected: 'Rifiutata'
    };
    return statusMap[status] || status;
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  updateSummary() {
    let totalCommitted = 0;
    let totalWages = 0;
    
    this.activeDeals.forEach(deal => {
      if (deal.status !== 'rejected') {
        totalCommitted += deal.offerAmount;
        totalWages += deal.proposedWages;
      }
    });
    
    this.element.querySelector('.committed-budget').textContent = this.formatCurrency(totalCommitted);
    this.element.querySelector('.proposed-wages').textContent = `${this.formatCurrency(totalWages)}/sett`;
  }
  
  viewDealDetails(dealId) {
    const deal = this.activeDeals.find(d => d.id === dealId);
    if (!deal) return;
    
    // Dispatch event to show deal details
    window.dispatchEvent(new CustomEvent('showDealDetails', {
      detail: { deal }
    }));
  }
  
  editDeal(dealId) {
    const deal = this.activeDeals.find(d => d.id === dealId);
    if (!deal || deal.status === 'accepted') return;
    
    // Dispatch event to edit deal
    window.dispatchEvent(new CustomEvent('editDeal', {
      detail: { deal }
    }));
  }
  
  cancelDeal(dealId) {
    const deal = this.activeDeals.find(d => d.id === dealId);
    if (!deal) return;
    
    if (confirm(`Sei sicuro di voler annullare la trattativa per ${deal.player.name}?`)) {
      // In a real app, this would call a game flow to cancel the deal
      this.activeDeals = this.activeDeals.filter(d => d.id !== dealId);
      this.renderDeals();
      this.updateSummary();
      
      // Dispatch cancel event
      this.element.dispatchEvent(new CustomEvent('dealCancelled', {
        detail: { dealId, deal }
      }));
      
      this.showSuccess(`Trattativa per ${deal.player.name} annullata`);
    }
  }
  
  confirmCancelAllDeals() {
    if (this.activeDeals.length === 0) return;
    
    if (confirm('Sei sicuro di voler annullare tutte le trattative in corso?')) {
      const dealsCopy = [...this.activeDeals];
      this.activeDeals = [];
      this.renderDeals();
      this.updateSummary();
      
      // Dispatch cancel all event
      this.element.dispatchEvent(new CustomEvent('allDealsCancelled', {
        detail: { deals: dealsCopy }
      }));
      
      this.showSuccess('Tutte le trattative sono state annullate');
    }
  }
  
  viewTransferMarket() {
    // Dispatch event to navigate to transfer market
    window.dispatchEvent(new CustomEvent('navigateToTransferMarket'));
  }
  
  startAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      this.loadDeals();
    }, this.options.refreshInterval);
  }
  
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  getActiveDeals() {
    return [...this.activeDeals];
  }
  
  addDeal(deal) {
    if (this.activeDeals.length >= this.options.maxDeals) {
      this.showError(`Massimo ${this.options.maxDeals} trattative contemporanee`);
      return false;
    }
    
    this.activeDeals.push(deal);
    this.renderDeals();
    this.updateSummary();
    
    // Dispatch add event
    this.element.dispatchEvent(new CustomEvent('dealAdded', {
      detail: { deal }
    }));
    
    return true;
  }
  
  updateDeal(dealId, updates) {
    const index = this.activeDeals.findIndex(d => d.id === dealId);
    if (index === -1) return false;
    
    this.activeDeals[index] = { ...this.activeDeals[index], ...updates };
    this.renderDeals();
    this.updateSummary();
    
    // Dispatch update event
    this.element.dispatchEvent(new CustomEvent('dealUpdated', {
      detail: { 
        dealId, 
        deal: this.activeDeals[index],
        updates 
      }
    }));
    
    return true;
  }
  
  refreshDeals() {
    this.loadDeals();
  }
  
  destroy() {
    this.stopAutoRefresh();
  }
}

// Auto-initialize active deals panels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.active-deals-panel').forEach(panel => {
    if (!panel.dataset.initialized) {
      const options = JSON.parse(panel.dataset.options || '{}');
      new ActiveDealsPanel(panel, options);
      panel.dataset.initialized = 'true';
    }
  });
});
</script>