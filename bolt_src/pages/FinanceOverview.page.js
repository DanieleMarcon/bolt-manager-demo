import BudgetTracker from '../components/BudgetTracker.component.js';
import SponsorBanner from '../components/SponsorBanner.component.js';
import RequestBoardButton from '../components/RequestBoardButton.component.js';

export default class FinanceOverviewPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="finance-overview-page">
        <div class="page-header">
          <h2 class="page-title">Finanze del Club</h2>
          <div class="page-actions">
            <button class="button button-secondary export-btn">📊 Esporta Report</button>
            <button class="button button-secondary history-btn">📜 Storico Finanziario</button>
          </div>
        </div>

        <!-- Budget Overview Section -->
        <div class="budget-overview-section">
          <div id="budgetTracker" class="budget-tracker-container"></div>
        </div>

        <!-- Sponsor Section -->
        <div class="sponsor-section">
          <h3 class="section-title">Sponsor e Partnership</h3>
          <div id="sponsorBanner" class="sponsor-banner-container"></div>
        </div>

        <!-- Board Requests Section -->
        <div class="board-requests-section">
          <h3 class="section-title">Richieste alla Dirigenza</h3>
          <div class="requests-grid">
            <div class="request-card">
              <h4>Richiesta Budget</h4>
              <p>Richiedi fondi aggiuntivi per trasferimenti e operazioni di mercato</p>
              <div id="budgetRequestButton" class="request-button-container"></div>
            </div>
            
            <div class="request-card">
              <h4>Miglioramenti Infrastrutture</h4>
              <p>Richiedi investimenti per migliorare le strutture del club</p>
              <div id="infrastructureRequestButton" class="request-button-container"></div>
            </div>
            
            <div class="request-card">
              <h4>Nuovo Staff</h4>
              <p>Richiedi l'assunzione di nuovo staff tecnico o amministrativo</p>
              <div id="staffRequestButton" class="request-button-container"></div>
            </div>
          </div>
        </div>

        <!-- Financial Summary Section -->
        <div class="financial-summary-section">
          <h3 class="section-title">Riepilogo Finanziario</h3>
          <div class="summary-cards">
            <div class="summary-card">
              <div class="card-icon">💰</div>
              <div class="card-content">
                <h5>Budget Totale</h5>
                <span class="card-value">€50.0M</span>
                <span class="card-change positive">+5.2%</span>
              </div>
            </div>
            
            <div class="summary-card">
              <div class="card-icon">📈</div>
              <div class="card-content">
                <h5>Entrate Mensili</h5>
                <span class="card-value">€8.5M</span>
                <span class="card-change positive">+12.1%</span>
              </div>
            </div>
            
            <div class="summary-card">
              <div class="card-icon">📉</div>
              <div class="card-content">
                <h5>Uscite Mensili</h5>
                <span class="card-value">€6.2M</span>
                <span class="card-change negative">+3.8%</span>
              </div>
            </div>
            
            <div class="summary-card">
              <div class="card-icon">💎</div>
              <div class="card-content">
                <h5>Valore Club</h5>
                <span class="card-value">€125M</span>
                <span class="card-change positive">+8.7%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sponsor Banner -->
        <div id="globalSponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.renderBudgetTracker();
    this.renderSponsorBanner();
    this.renderRequestButtons();
    this.renderGlobalSponsorBanner();
    this.bindEvents();
  }

  renderBudgetTracker() {
    const container = document.getElementById('budgetTracker');
    
    new BudgetTracker(container, {
      dataSet: 'finances',
      teamId: this.getUserTeamId(),
      showDetails: true,
      showTrends: true
    });
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    new SponsorBanner(container, {
      teamId: this.getUserTeamId(),
      showDetails: true,
      showRevenue: true
    });
  }

  renderRequestButtons() {
    // Budget Request Button
    const budgetContainer = document.getElementById('budgetRequestButton');
    new RequestBoardButton(budgetContainer, {
      requestType: 'budget',
      cooldownTime: this.getRequestCooldown('budget'),
      onRequest: (requestData) => this.handleBoardRequest(requestData)
    });

    // Infrastructure Request Button
    const infrastructureContainer = document.getElementById('infrastructureRequestButton');
    new RequestBoardButton(infrastructureContainer, {
      requestType: 'infrastructure',
      cooldownTime: this.getRequestCooldown('infrastructure'),
      onRequest: (requestData) => this.handleBoardRequest(requestData)
    });

    // Staff Request Button
    const staffContainer = document.getElementById('staffRequestButton');
    new RequestBoardButton(staffContainer, {
      requestType: 'staff',
      cooldownTime: this.getRequestCooldown('staff'),
      onRequest: (requestData) => this.handleBoardRequest(requestData)
    });
  }

  renderGlobalSponsorBanner() {
    const container = document.getElementById('globalSponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Gestione finanziaria professionale per il calcio</span>
      </div>
    `;
  }

  bindEvents() {
    // Page action buttons
    const exportBtn = this.container.querySelector('.export-btn');
    const historyBtn = this.container.querySelector('.history-btn');
    
    exportBtn?.addEventListener('click', () => this.exportFinancialReport());
    historyBtn?.addEventListener('click', () => this.showFinancialHistory());

    // Listen for board request events
    this.container.addEventListener('requestBoard', (e) => {
      this.handleBoardRequestEvent(e.detail);
    });
  }

  handleBoardRequest(requestData) {
    console.log('Board request submitted:', requestData);
    
    // Simulate request processing
    this.showToast('Richiesta inviata alla dirigenza', 'success');
    
    // Update UI to reflect request sent
    this.updateRequestStatus(requestData.type, 'sent');
  }

  handleBoardRequestEvent(requestData) {
    console.log('Board request event received:', requestData);
    
    // Process the request
    this.processBoardRequest(requestData);
  }

  processBoardRequest(requestData) {
    // Simulate board response
    const responseTime = Math.random() * 5000 + 2000; // 2-7 seconds
    
    setTimeout(() => {
      const isApproved = Math.random() > 0.4; // 60% approval rate
      
      if (isApproved) {
        this.showToast(`Richiesta ${requestData.type} approvata!`, 'success');
        this.applyRequestBenefits(requestData);
      } else {
        this.showToast(`Richiesta ${requestData.type} rifiutata`, 'error');
      }
      
      this.updateRequestStatus(requestData.type, isApproved ? 'approved' : 'rejected');
    }, responseTime);
  }

  applyRequestBenefits(requestData) {
    switch (requestData.type) {
      case 'budget':
        // Increase budget
        this.showToast(`Budget aumentato di €${requestData.amount}M`, 'success');
        break;
      case 'infrastructure':
        // Improve facilities
        this.showToast('Miglioramenti infrastrutture approvati', 'success');
        break;
      case 'staff':
        // Allow new staff hiring
        this.showToast('Assunzione nuovo staff autorizzata', 'success');
        break;
    }
  }

  updateRequestStatus(requestType, status) {
    // Update the visual status of request buttons
    const buttonContainer = document.getElementById(`${requestType}RequestButton`);
    const button = buttonContainer?.querySelector('.board-request-btn');
    
    if (button) {
      button.classList.add(`status-${status}`);
      
      // Add status indicator
      const statusIndicator = document.createElement('span');
      statusIndicator.className = `status-indicator ${status}`;
      statusIndicator.textContent = this.getStatusText(status);
      button.appendChild(statusIndicator);
    }
  }

  getStatusText(status) {
    const statusMap = {
      'sent': '📤 Inviata',
      'approved': '✅ Approvata',
      'rejected': '❌ Rifiutata'
    };
    return statusMap[status] || '';
  }

  getRequestCooldown(requestType) {
    // Mock cooldown times (in milliseconds)
    const cooldowns = {
      'budget': 0, // No cooldown for demo
      'infrastructure': 0,
      'staff': 0
    };
    return cooldowns[requestType] || 0;
  }

  exportFinancialReport() {
    const reportData = {
      budget: {
        total: 50000000,
        available: 35000000,
        spent: 15000000
      },
      monthlyIncome: 8500000,
      monthlyExpenses: 6200000,
      clubValue: 125000000,
      sponsors: [
        { name: 'SportTech Pro', value: 2000000, type: 'main' }
      ],
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `financial-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    this.showToast('Report finanziario esportato', 'success');
  }

  showFinancialHistory() {
    this.showToast('Apertura storico finanziario', 'info');
  }

  getUserTeamId() {
    return window.currentSession?.user_team_id || null;
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