<div class="contract-details-panel">
  <div class="panel-header">
    <h3 class="panel-title">Dettagli Contratto</h3>
    <div class="contract-status">
      <div class="status-indicator"></div>
      <span class="status-text"></span>
    </div>
  </div>
  
  <div class="contract-overview">
    <div class="contract-parties">
      <div class="party-item">
        <span class="party-label">Giocatore</span>
        <div class="party-info">
          <img src="" alt="Player photo" class="party-avatar" loading="lazy">
          <div class="party-details">
            <span class="party-name player-name"></span>
            <span class="party-meta player-meta"></span>
          </div>
        </div>
      </div>
      
      <div class="party-item">
        <span class="party-label">Club</span>
        <div class="party-info">
          <img src="" alt="Club logo" class="party-avatar" loading="lazy">
          <div class="party-details">
            <span class="party-name club-name"></span>
            <span class="party-meta club-meta"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="contract-terms">
      <div class="term-item">
        <span class="term-label">Durata</span>
        <span class="term-value contract-duration"></span>
      </div>
      <div class="term-item">
        <span class="term-label">Data Inizio</span>
        <span class="term-value contract-start"></span>
      </div>
      <div class="term-item">
        <span class="term-label">Data Scadenza</span>
        <span class="term-value contract-end"></span>
      </div>
    </div>
  </div>
  
  <div class="financial-details">
    <h4>Dettagli Finanziari</h4>
    <div class="financial-grid">
      <div class="financial-item">
        <span class="financial-label">Stipendio Settimanale</span>
        <span class="financial-value weekly-wage"></span>
      </div>
      <div class="financial-item">
        <span class="financial-label">Stipendio Annuale</span>
        <span class="financial-value annual-wage"></span>
      </div>
      <div class="financial-item">
        <span class="financial-label">Bonus alla Firma</span>
        <span class="financial-value signing-bonus"></span>
      </div>
      <div class="financial-item">
        <span class="financial-label">Valore Totale</span>
        <span class="financial-value total-value"></span>
      </div>
    </div>
  </div>
  
  <div class="contract-clauses">
    <h4>Clausole Contrattuali</h4>
    <div class="clauses-list">
      <!-- Clauses will be populated dynamically -->
    </div>
  </div>
  
  <div class="contract-history">
    <h4>Cronologia Contratto</h4>
    <div class="history-timeline">
      <!-- History events will be populated dynamically -->
    </div>
  </div>
  
  <div class="contract-actions">
    <button class="button button-ghost print-btn" aria-label="Stampa contratto">
      🖨️ Stampa
    </button>
    <button class="button button-secondary extend-btn" aria-label="Estendi contratto">
      📝 Estendi
    </button>
    <button class="button button-primary edit-btn" aria-label="Modifica contratto">
      ✏️ Modifica
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-contract">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Contract Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.contract-details-panel {
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

.contract-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--background);
  border-radius: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-indicator.active {
  background: var(--success);
}

.status-indicator.expiring {
  background: var(--warning);
}

.status-indicator.expired {
  background: var(--error);
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.contract-overview {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.contract-parties {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.party-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.party-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.party-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.party-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--border);
}

.party-details {
  flex: 1;
}

.party-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.party-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.contract-terms {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.term-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.term-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.term-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.financial-details {
  margin-bottom: 24px;
}

.financial-details h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.financial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.financial-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.financial-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.financial-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.contract-clauses {
  margin-bottom: 24px;
}

.contract-clauses h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.clauses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.clause-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.clause-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.clause-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.contract-history {
  margin-bottom: 24px;
}

.contract-history h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.history-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.history-date {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  min-width: 80px;
}

.history-event {
  flex: 1;
  font-size: 14px;
  color: var(--text);
}

.contract-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sponsor-slot-contract {
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
  .contract-overview {
    flex-direction: column;
  }
  
  .financial-grid {
    grid-template-columns: 1fr;
  }
  
  .contract-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-contract {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class ContractDetailsPanel {
  constructor(element, contractData) {
    this.element = element;
    this.contractData = contractData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    const contract = this.contractData;
    
    // Update contract status
    this.updateContractStatus(contract.status);
    
    // Update parties
    this.updateParties(contract.player, contract.club);
    
    // Update terms
    this.updateTerms(contract);
    
    // Update financial details
    this.updateFinancialDetails(contract);
    
    // Update clauses
    this.updateClauses(contract.clauses);
    
    // Update history
    this.updateHistory(contract.history);
  }
  
  updateContractStatus(status) {
    const statusIndicator = this.element.querySelector('.status-indicator');
    const statusText = this.element.querySelector('.status-text');
    
    // Remove existing status classes
    statusIndicator.classList.remove('active', 'expiring', 'expired');
    
    // Set status based on value
    switch (status) {
      case 'active':
        statusIndicator.classList.add('active');
        statusText.textContent = 'Attivo';
        break;
      case 'expiring':
        statusIndicator.classList.add('expiring');
        statusText.textContent = 'In Scadenza';
        break;
      case 'expired':
        statusIndicator.classList.add('expired');
        statusText.textContent = 'Scaduto';
        break;
      default:
        statusText.textContent = status || 'Sconosciuto';
    }
  }
  
  updateParties(player, club) {
    // Update player info
    this.element.querySelector('.player-name').textContent = player.name;
    this.element.querySelector('.player-meta').textContent = `${player.position} • ${player.age} anni`;
    this.element.querySelector('.party-item:first-child .party-avatar').src = player.photo;
    
    // Update club info
    this.element.querySelector('.club-name').textContent = club.name;
    this.element.querySelector('.club-meta').textContent = club.league;
    this.element.querySelector('.party-item:last-child .party-avatar').src = club.logo;
  }
  
  updateTerms(contract) {
    this.element.querySelector('.contract-duration').textContent = `${contract.duration} anni`;
    
    const startDate = new Date(contract.startDate);
    this.element.querySelector('.contract-start').textContent = this.formatDate(startDate);
    
    const endDate = new Date(contract.endDate);
    this.element.querySelector('.contract-end').textContent = this.formatDate(endDate);
  }
  
  updateFinancialDetails(contract) {
    this.element.querySelector('.weekly-wage').textContent = this.formatCurrency(contract.weeklyWage);
    this.element.querySelector('.annual-wage').textContent = this.formatCurrency(contract.weeklyWage * 52);
    this.element.querySelector('.signing-bonus').textContent = this.formatCurrency(contract.signingBonus);
    
    const totalValue = (contract.weeklyWage * 52 * contract.duration) + contract.signingBonus;
    this.element.querySelector('.total-value').textContent = this.formatCurrency(totalValue);
  }
  
  updateClauses(clauses) {
    const clausesList = this.element.querySelector('.clauses-list');
    clausesList.innerHTML = '';
    
    if (!clauses || clauses.length === 0) {
      const emptyClause = document.createElement('div');
      emptyClause.className = 'clause-item';
      emptyClause.innerHTML = `
        <span class="clause-title">Nessuna clausola presente</span>
      `;
      clausesList.appendChild(emptyClause);
      return;
    }
    
    clauses.forEach(clause => {
      const clauseElement = document.createElement('div');
      clauseElement.className = 'clause-item';
      
      clauseElement.innerHTML = `
        <span class="clause-title">${clause.name}</span>
        <span class="clause-value">${clause.value}</span>
      `;
      
      clausesList.appendChild(clauseElement);
    });
  }
  
  updateHistory(history) {
    const historyTimeline = this.element.querySelector('.history-timeline');
    historyTimeline.innerHTML = '';
    
    if (!history || history.length === 0) {
      const emptyHistory = document.createElement('div');
      emptyHistory.className = 'history-item';
      emptyHistory.innerHTML = `
        <span class="history-event">Nessun evento storico registrato</span>
      `;
      historyTimeline.appendChild(emptyHistory);
      return;
    }
    
    history.forEach(event => {
      const historyElement = document.createElement('div');
      historyElement.className = 'history-item';
      
      const eventDate = new Date(event.date);
      
      historyElement.innerHTML = `
        <span class="history-date">${this.formatDate(eventDate)}</span>
        <span class="history-event">${event.description}</span>
      `;
      
      historyTimeline.appendChild(historyElement);
    });
  }
  
  formatDate(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  bindEvents() {
    // Print button
    this.element.querySelector('.print-btn').addEventListener('click', () => {
      this.printContract();
    });
    
    // Extend button
    this.element.querySelector('.extend-btn').addEventListener('click', () => {
      this.extendContract();
    });
    
    // Edit button
    this.element.querySelector('.edit-btn').addEventListener('click', () => {
      this.editContract();
    });
  }
  
  printContract() {
    // In a real app, this would generate a printable version of the contract
    window.dispatchEvent(new CustomEvent('printContract', {
      detail: { contractData: this.contractData }
    }));
    
    this.showSuccess('Contratto inviato alla stampa');
  }
  
  extendContract() {
    window.dispatchEvent(new CustomEvent('extendContract', {
      detail: { contractData: this.contractData }
    }));
  }
  
  editContract() {
    window.dispatchEvent(new CustomEvent('editContract', {
      detail: { contractData: this.contractData }
    }));
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  updateContract(newData) {
    this.contractData = { ...this.contractData, ...newData };
    this.render();
  }
  
  getContractData() {
    return { ...this.contractData };
  }
  
  getRemainingDays() {
    const endDate = new Date(this.contractData.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }
}

// Auto-initialize contract details panels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contract-details-panel').forEach(panel => {
    if (!panel.dataset.initialized) {
      const contractData = JSON.parse(panel.dataset.contractData || '{}');
      new ContractDetailsPanel(panel, contractData);
      panel.dataset.initialized = 'true';
    }
  });
});
</script>