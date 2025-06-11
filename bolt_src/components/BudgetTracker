<div class="budget-tracker">
  <div class="tracker-header">
    <h3 class="tracker-title">Budget Trasferimenti</h3>
    <div class="budget-actions">
      <button class="budget-btn history-btn" aria-label="Storico transazioni">
        📜 Storico
      </button>
      <button class="budget-btn forecast-btn" aria-label="Previsione budget">
        📊 Previsione
      </button>
    </div>
  </div>
  
  <div class="budget-overview">
    <div class="budget-card available-budget">
      <div class="budget-icon">💰</div>
      <div class="budget-content">
        <span class="budget-value">€0</span>
        <span class="budget-label">Disponibile</span>
      </div>
    </div>
    
    <div class="budget-card pending-budget">
      <div class="budget-icon">⏳</div>
      <div class="budget-content">
        <span class="budget-value">€0</span>
        <span class="budget-label">In Sospeso</span>
      </div>
    </div>
    
    <div class="budget-card spent-budget">
      <div class="budget-icon">💸</div>
      <div class="budget-content">
        <span class="budget-value">€0</span>
        <span class="budget-label">Speso</span>
      </div>
    </div>
  </div>
  
  <div class="budget-details">
    <div class="budget-progress">
      <div class="progress-label">
        <span>Utilizzo Budget</span>
        <span class="usage-percentage">0%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
    
    <div class="budget-breakdown">
      <div class="breakdown-item">
        <span class="breakdown-label">Budget Iniziale</span>
        <span class="breakdown-value initial-budget">€0</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Entrate</span>
        <span class="breakdown-value income-value">€0</span>
      </div>
      <div class="breakdown-item">
        <span class="breakdown-label">Uscite</span>
        <span class="breakdown-value expenses-value">€0</span>
      </div>
      <div class="breakdown-item total-item">
        <span class="breakdown-label">Saldo Attuale</span>
        <span class="breakdown-value current-balance">€0</span>
      </div>
    </div>
  </div>
  
  <div class="wage-budget">
    <div class="section-header">
      <h4>Budget Stipendi</h4>
      <span class="wage-percentage">0% utilizzato</span>
    </div>
    
    <div class="wage-progress">
      <div class="progress-bar">
        <div class="progress-fill wage-fill"></div>
      </div>
    </div>
    
    <div class="wage-details">
      <div class="wage-item">
        <span class="wage-label">Stipendi Attuali</span>
        <span class="wage-value current-wages">€0/sett</span>
      </div>
      <div class="wage-item">
        <span class="wage-label">Budget Massimo</span>
        <span class="wage-value max-wages">€0/sett</span>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-budget">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Budget Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.budget-tracker {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.tracker-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.budget-actions {
  display: flex;
  gap: 8px;
}

.budget-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.budget-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.budget-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.budget-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.budget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.available-budget {
  border-left: 4px solid var(--success);
}

.pending-budget {
  border-left: 4px solid var(--warning);
}

.spent-budget {
  border-left: 4px solid var(--error);
}

.budget-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border-radius: 8px;
  flex-shrink: 0;
}

.budget-content {
  flex: 1;
}

.budget-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.budget-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.budget-details {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.budget-progress {
  margin-bottom: 16px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

.usage-percentage {
  font-weight: 600;
  color: var(--primary);
}

.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--success), var(--warning), var(--error));
  border-radius: 4px;
  transition: width 0.8s ease;
}

.budget-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.breakdown-label {
  color: var(--text-muted);
}

.breakdown-value {
  font-weight: 600;
  color: var(--text);
}

.total-item {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  margin-top: 4px;
}

.total-item .breakdown-label {
  font-weight: 500;
  color: var(--text);
}

.total-item .breakdown-value {
  font-weight: 700;
  color: var(--primary);
}

.wage-budget {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.wage-percentage {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
}

.wage-progress {
  margin-bottom: 12px;
}

.wage-fill {
  background: linear-gradient(90deg, var(--primary), #1e40af);
}

.wage-details {
  display: flex;
  justify-content: space-between;
}

.wage-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wage-label {
  font-size: 12px;
  color: var(--text-muted);
}

.wage-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.sponsor-slot-budget {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1024px) {
  .budget-overview {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .wage-details {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 768px) {
  .tracker-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .budget-actions {
    justify-content: center;
  }
  
  .sponsor-slot-budget {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class BudgetTracker {
  constructor(element, budgetData) {
    this.element = element;
    this.budgetData = budgetData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.animateBars();
  }
  
  render() {
    const budget = this.budgetData;
    
    // Update budget overview
    this.element.querySelector('.available-budget .budget-value').textContent = this.formatCurrency(budget.available);
    this.element.querySelector('.pending-budget .budget-value').textContent = this.formatCurrency(budget.pending);
    this.element.querySelector('.spent-budget .budget-value').textContent = this.formatCurrency(budget.spent);
    
    // Update budget progress
    const totalBudget = budget.initial + budget.income;
    const usedPercentage = totalBudget > 0 ? (budget.spent / totalBudget) * 100 : 0;
    this.element.querySelector('.usage-percentage').textContent = `${Math.round(usedPercentage)}%`;
    this.element.querySelector('.progress-fill').style.width = `${usedPercentage}%`;
    
    // Update budget breakdown
    this.element.querySelector('.initial-budget').textContent = this.formatCurrency(budget.initial);
    this.element.querySelector('.income-value').textContent = this.formatCurrency(budget.income);
    this.element.querySelector('.expenses-value').textContent = this.formatCurrency(budget.spent);
    this.element.querySelector('.current-balance').textContent = this.formatCurrency(budget.available);
    
    // Update wage budget
    const wagePercentage = budget.maxWages > 0 ? (budget.currentWages / budget.maxWages) * 100 : 0;
    this.element.querySelector('.wage-percentage').textContent = `${Math.round(wagePercentage)}% utilizzato`;
    this.element.querySelector('.wage-fill').style.width = `${wagePercentage}%`;
    this.element.querySelector('.current-wages').textContent = `${this.formatCurrency(budget.currentWages)}/sett`;
    this.element.querySelector('.max-wages').textContent = `${this.formatCurrency(budget.maxWages)}/sett`;
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  animateBars() {
    setTimeout(() => {
      this.element.querySelectorAll('.progress-fill').forEach(fill => {
        fill.style.transition = 'width 1s ease-out';
      });
    }, 100);
  }
  
  bindEvents() {
    // History button
    this.element.querySelector('.history-btn').addEventListener('click', () => {
      this.showTransactionHistory();
    });
    
    // Forecast button
    this.element.querySelector('.forecast-btn').addEventListener('click', () => {
      this.showBudgetForecast();
    });
    
    // Budget cards hover effects
    this.element.querySelectorAll('.budget-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.showCardTooltip(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.hideCardTooltip();
      });
    });
  }
  
  showTransactionHistory() {
    // Dispatch event to show transaction history
    window.dispatchEvent(new CustomEvent('showTransactionHistory', {
      detail: { budgetData: this.budgetData }
    }));
  }
  
  showBudgetForecast() {
    // Dispatch event to show budget forecast
    window.dispatchEvent(new CustomEvent('showBudgetForecast', {
      detail: { budgetData: this.budgetData }
    }));
  }
  
  showCardTooltip(card) {
    // In a real implementation, this would show a detailed tooltip
    // For now, we'll just add a highlight effect
    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  }
  
  hideCardTooltip() {
    this.element.querySelectorAll('.budget-card').forEach(card => {
      card.style.boxShadow = '';
    });
  }
  
  // Public methods
  updateBudget(newData) {
    this.budgetData = { ...this.budgetData, ...newData };
    this.render();
  }
  
  getBudgetData() {
    return { ...this.budgetData };
  }
  
  getAvailableBudget() {
    return this.budgetData.available;
  }
  
  addPendingTransaction(amount) {
    this.budgetData.pending += amount;
    this.budgetData.available -= amount;
    this.render();
    
    return this.budgetData.available >= 0;
  }
  
  removePendingTransaction(amount) {
    this.budgetData.pending -= amount;
    this.budgetData.available += amount;
    this.render();
  }
  
  confirmTransaction(amount, description) {
    this.budgetData.pending -= amount;
    this.budgetData.spent += amount;
    
    // Add to transaction history
    if (!this.budgetData.transactions) {
      this.budgetData.transactions = [];
    }
    
    this.budgetData.transactions.push({
      amount,
      description,
      date: new Date().toISOString(),
      type: amount > 0 ? 'income' : 'expense'
    });
    
    this.render();
    
    // Dispatch transaction event
    this.element.dispatchEvent(new CustomEvent('transactionConfirmed', {
      detail: {
        amount,
        description,
        budgetData: this.budgetData
      }
    }));
  }
}

// Auto-initialize budget trackers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.budget-tracker').forEach(tracker => {
    if (!tracker.dataset.initialized) {
      const budgetData = JSON.parse(tracker.dataset.budgetData || '{}');
      new BudgetTracker(tracker, budgetData);
      tracker.dataset.initialized = 'true';
    }
  });
});
</script>