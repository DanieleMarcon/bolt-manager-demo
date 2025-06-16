<div class="contract-details-form">
  <div class="form-header">
    <h3 class="form-title">Dettagli Contratto</h3>
    <div class="player-info-mini">
      <img src="" alt="Player photo" class="player-photo-mini" loading="lazy">
      <div class="player-details-mini">
        <span class="player-name-mini"></span>
        <span class="player-position-mini"></span>
      </div>
    </div>
  </div>
  
  <div class="form-content">
    <div class="form-section">
      <h4>Termini Base</h4>
      <div class="form-grid">
        <div class="form-group">
          <label for="contractLength" class="form-label">Durata Contratto</label>
          <select id="contractLength" class="form-select" aria-label="Seleziona durata contratto">
            <option value="1">1 anno</option>
            <option value="2">2 anni</option>
            <option value="3" selected>3 anni</option>
            <option value="4">4 anni</option>
            <option value="5">5 anni</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="contractStart" class="form-label">Data Inizio</label>
          <input type="date" id="contractStart" class="form-input" aria-label="Data inizio contratto">
        </div>
        
        <div class="form-group">
          <label for="wageAmount" class="form-label">Stipendio Settimanale</label>
          <div class="amount-input">
            <span class="currency-symbol">€</span>
            <input type="number" id="wageAmount" class="form-input" min="0" step="1000" aria-label="Stipendio settimanale">
          </div>
        </div>
        
        <div class="form-group">
          <label for="signingBonus" class="form-label">Bonus alla Firma</label>
          <div class="amount-input">
            <span class="currency-symbol">€</span>
            <input type="number" id="signingBonus" class="form-input" min="0" step="10000" aria-label="Bonus alla firma">
          </div>
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h4>Clausole</h4>
      <div class="form-grid">
        <div class="form-group">
          <label for="releaseClause" class="form-label">Clausola Rescissoria</label>
          <div class="amount-input">
            <span class="currency-symbol">€</span>
            <input type="number" id="releaseClause" class="form-input" min="0" step="1000000" aria-label="Clausola rescissoria">
          </div>
        </div>
        
        <div class="form-group">
          <label for="minimumFee" class="form-label">Prezzo Minimo Cessione</label>
          <div class="amount-input">
            <span class="currency-symbol">€</span>
            <input type="number" id="minimumFee" class="form-input" min="0" step="100000" aria-label="Prezzo minimo cessione">
          </div>
        </div>
      </div>
      
      <div class="clauses-section">
        <div class="clause-item">
          <label class="clause-checkbox">
            <input type="checkbox" name="appearance-bonus" aria-label="Bonus presenze">
            <span>Bonus Presenze</span>
          </label>
          <div class="clause-details">
            <div class="amount-input">
              <span class="currency-symbol">€</span>
              <input type="number" class="form-input clause-input" min="0" step="10000" placeholder="Importo" aria-label="Importo bonus presenze">
            </div>
            <span>dopo</span>
            <input type="number" class="form-input clause-input-small" min="0" max="100" placeholder="20" aria-label="Numero presenze">
            <span>presenze</span>
          </div>
        </div>
        
        <div class="clause-item">
          <label class="clause-checkbox">
            <input type="checkbox" name="goal-bonus" aria-label="Bonus gol">
            <span>Bonus Gol</span>
          </label>
          <div class="clause-details">
            <div class="amount-input">
              <span class="currency-symbol">€</span>
              <input type="number" class="form-input clause-input" min="0" step="10000" placeholder="Importo" aria-label="Importo bonus gol">
            </div>
            <span>per</span>
            <input type="number" class="form-input clause-input-small" min="0" max="100" placeholder="10" aria-label="Numero gol">
            <span>gol</span>
          </div>
        </div>
        
        <div class="clause-item">
          <label class="clause-checkbox">
            <input type="checkbox" name="trophy-bonus" aria-label="Bonus trofei">
            <span>Bonus Trofei</span>
          </label>
          <div class="clause-details">
            <div class="amount-input">
              <span class="currency-symbol">€</span>
              <input type="number" class="form-input clause-input" min="0" step="10000" placeholder="Importo" aria-label="Importo bonus trofei">
            </div>
            <span>per</span>
            <select class="form-select clause-select" aria-label="Tipo trofeo">
              <option value="league">Campionato</option>
              <option value="cup">Coppa</option>
              <option value="europe">Competizione Europea</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <div class="form-section">
      <h4>Riepilogo Costi</h4>
      <div class="cost-summary">
        <div class="summary-item">
          <span class="summary-label">Stipendio Annuale:</span>
          <span class="summary-value annual-wage">€0</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Bonus alla Firma:</span>
          <span class="summary-value signing-bonus-value">€0</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Bonus Potenziali:</span>
          <span class="summary-value potential-bonuses">€0</span>
        </div>
        <div class="summary-item total-item">
          <span class="summary-label">Costo Totale Contratto:</span>
          <span class="summary-value total-cost">€0</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="form-actions">
    <button class="button button-ghost cancel-btn" aria-label="Annulla">
      Annulla
    </button>
    <button class="button button-secondary save-draft-btn" aria-label="Salva bozza">
      Salva Bozza
    </button>
    <button class="button button-primary submit-btn" aria-label="Conferma contratto">
      Conferma Contratto
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-contract">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Contract Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.contract-details-form {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.player-info-mini {
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-photo-mini {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.player-details-mini {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.player-name-mini {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.player-position-mini {
  font-size: 12px;
  color: var(--text-muted);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

.form-section {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.form-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 8px;
}

.form-select,
.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
  transition: all 0.2s ease;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.amount-input {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--text-muted);
}

.amount-input .form-input {
  padding-left: 24px;
}

.clauses-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.clause-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: var(--surface);
  border-radius: 6px;
}

.clause-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
}

.clause-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
}

.clause-details {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.clause-input {
  max-width: 120px;
}

.clause-input-small {
  max-width: 60px;
  text-align: center;
}

.clause-select {
  max-width: 150px;
  font-size: 12px;
  padding: 6px 8px;
}

.cost-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
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

.total-item {
  border-top: 1px solid var(--border);
  padding-top: 12px;
  margin-top: 4px;
}

.total-item .summary-label {
  font-weight: 600;
  color: var(--text);
}

.total-item .summary-value {
  font-size: 16px;
  color: var(--primary);
}

.form-actions {
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
  .form-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .clause-details {
    flex-wrap: wrap;
  }
  
  .form-actions {
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
class ContractDetailsForm {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      playerData: null,
      existingContract: null,
      isEdit: false,
      ...options
    };
    
    this.contractData = {
      length: 3,
      startDate: new Date().toISOString().split('T')[0],
      wageAmount: 0,
      signingBonus: 0,
      releaseClause: 0,
      minimumFee: 0,
      clauses: []
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    
    if (this.options.playerData) {
      this.setPlayerData(this.options.playerData);
    }
    
    if (this.options.existingContract) {
      this.setContractData(this.options.existingContract);
    } else {
      this.initializeDefaultValues();
    }
  }
  
  bindEvents() {
    // Contract length change
    this.element.querySelector('#contractLength').addEventListener('change', (e) => {
      this.contractData.length = parseInt(e.target.value);
      this.updateCostSummary();
    });
    
    // Contract start date change
    this.element.querySelector('#contractStart').addEventListener('change', (e) => {
      this.contractData.startDate = e.target.value;
    });
    
    // Wage amount change
    this.element.querySelector('#wageAmount').addEventListener('input', (e) => {
      this.contractData.wageAmount = parseInt(e.target.value) || 0;
      this.updateCostSummary();
    });
    
    // Signing bonus change
    this.element.querySelector('#signingBonus').addEventListener('input', (e) => {
      this.contractData.signingBonus = parseInt(e.target.value) || 0;
      this.updateCostSummary();
    });
    
    // Release clause change
    this.element.querySelector('#releaseClause').addEventListener('input', (e) => {
      this.contractData.releaseClause = parseInt(e.target.value) || 0;
    });
    
    // Minimum fee change
    this.element.querySelector('#minimumFee').addEventListener('input', (e) => {
      this.contractData.minimumFee = parseInt(e.target.value) || 0;
    });
    
    // Clause checkboxes
    this.element.querySelectorAll('.clause-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateClauses();
      });
    });
    
    // Clause inputs
    this.element.querySelectorAll('.clause-details input, .clause-details select').forEach(input => {
      input.addEventListener('change', () => {
        this.updateClauses();
      });
    });
    
    // Form actions
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.cancel();
    });
    
    this.element.querySelector('.save-draft-btn').addEventListener('click', () => {
      this.saveDraft();
    });
    
    this.element.querySelector('.submit-btn').addEventListener('click', () => {
      this.submitContract();
    });
  }
  
  setPlayerData(playerData) {
    this.options.playerData = playerData;
    
    // Update player info
    this.element.querySelector('.player-photo-mini').src = playerData.photo;
    this.element.querySelector('.player-name-mini').textContent = playerData.name;
    this.element.querySelector('.player-position-mini').textContent = playerData.position;
    
    // Initialize default values based on player
    this.initializeDefaultValues();
  }
  
  setContractData(contractData) {
    this.contractData = { ...this.contractData, ...contractData };
    
    // Update form fields
    this.element.querySelector('#contractLength').value = this.contractData.length;
    this.element.querySelector('#contractStart').value = this.contractData.startDate;
    this.element.querySelector('#wageAmount').value = this.contractData.wageAmount;
    this.element.querySelector('#signingBonus').value = this.contractData.signingBonus;
    this.element.querySelector('#releaseClause').value = this.contractData.releaseClause;
    this.element.querySelector('#minimumFee').value = this.contractData.minimumFee;
    
    // Update clauses
    this.updateClauseInputs();
    
    // Update cost summary
    this.updateCostSummary();
  }
  
  initializeDefaultValues() {
    const player = this.options.playerData;
    if (!player) return;
    
    // Set default start date to today
    const today = new Date().toISOString().split('T')[0];
    this.element.querySelector('#contractStart').value = today;
    this.contractData.startDate = today;
    
    // Set default wage based on player value
    const defaultWage = this.calculateDefaultWage(player);
    this.element.querySelector('#wageAmount').value = defaultWage;
    this.contractData.wageAmount = defaultWage;
    
    // Set default release clause based on player value
    const defaultReleaseClause = this.calculateDefaultReleaseClause(player);
    this.element.querySelector('#releaseClause').value = defaultReleaseClause;
    this.contractData.releaseClause = defaultReleaseClause;
    
    // Update cost summary
    this.updateCostSummary();
  }
  
  calculateDefaultWage(player) {
    // Simple formula based on player value and age
    const baseWage = player.value ? player.value / 100 : 10000;
    const ageMultiplier = player.age < 23 ? 0.8 : player.age > 30 ? 1.2 : 1;
    return Math.round(baseWage * ageMultiplier / 1000) * 1000; // Round to nearest 1000
  }
  
  calculateDefaultReleaseClause(player) {
    // Simple formula based on player value
    return player.value ? Math.round(player.value * 1.5 / 1000000) * 1000000 : 0; // Round to nearest million
  }
  
  updateClauseInputs() {
    this.contractData.clauses.forEach(clause => {
      const checkbox = this.element.querySelector(`input[name="${clause.id}"]`);
      if (checkbox) {
        checkbox.checked = true;
        
        const clauseItem = checkbox.closest('.clause-item');
        const inputs = clauseItem.querySelectorAll('input[type="number"], select');
        
        inputs.forEach(input => {
          if (input.classList.contains('clause-input')) {
            input.value = clause.amount;
          } else if (input.classList.contains('clause-input-small')) {
            input.value = clause.threshold;
          } else if (input.classList.contains('clause-select')) {
            input.value = clause.type;
          }
        });
      }
    });
  }
  
  updateClauses() {
    const clauses = [];
    
    this.element.querySelectorAll('.clause-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
      const clauseId = checkbox.name;
      const clauseItem = checkbox.closest('.clause-item');
      
      const amountInput = clauseItem.querySelector('.clause-input');
      const thresholdInput = clauseItem.querySelector('.clause-input-small');
      const typeSelect = clauseItem.querySelector('.clause-select');
      
      const amount = parseInt(amountInput?.value) || 0;
      const threshold = parseInt(thresholdInput?.value) || 0;
      const type = typeSelect?.value || '';
      
      clauses.push({
        id: clauseId,
        amount,
        threshold,
        type
      });
    });
    
    this.contractData.clauses = clauses;
    this.updateCostSummary();
  }
  
  updateCostSummary() {
    // Calculate annual wage
    const annualWage = this.contractData.wageAmount * 52; // 52 weeks in a year
    
    // Calculate potential bonuses
    let potentialBonuses = 0;
    this.contractData.clauses.forEach(clause => {
      potentialBonuses += clause.amount;
    });
    
    // Calculate total cost
    const totalCost = (annualWage * this.contractData.length) + this.contractData.signingBonus + potentialBonuses;
    
    // Update summary values
    this.element.querySelector('.annual-wage').textContent = this.formatCurrency(annualWage);
    this.element.querySelector('.signing-bonus-value').textContent = this.formatCurrency(this.contractData.signingBonus);
    this.element.querySelector('.potential-bonuses').textContent = this.formatCurrency(potentialBonuses);
    this.element.querySelector('.total-cost').textContent = this.formatCurrency(totalCost);
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  validateContract() {
    const errors = [];
    
    // Check if wage amount is greater than 0
    if (this.contractData.wageAmount <= 0) {
      errors.push('Lo stipendio deve essere maggiore di 0');
    }
    
    // Check if start date is valid
    const startDate = new Date(this.contractData.startDate);
    if (isNaN(startDate.getTime())) {
      errors.push('La data di inizio non è valida');
    }
    
    return errors;
  }
  
  cancel() {
    // Dispatch cancel event
    this.element.dispatchEvent(new CustomEvent('contractCancel'));
  }
  
  saveDraft() {
    // Prepare contract data
    const contractData = {
      ...this.contractData,
      playerId: this.options.playerData?.id,
      playerName: this.options.playerData?.name,
      status: 'draft',
      timestamp: new Date().toISOString()
    };
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('contractSaveDraft', {
      detail: {
        contractData,
        isEdit: this.options.isEdit
      }
    }));
    
    this.showSuccess('Bozza contratto salvata');
  }
  
  submitContract() {
    // Validate contract
    const errors = this.validateContract();
    if (errors.length > 0) {
      this.showError(errors[0]);
      return;
    }
    
    // Prepare contract data
    const contractData = {
      ...this.contractData,
      playerId: this.options.playerData?.id,
      playerName: this.options.playerData?.name,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    // Dispatch submit event
    this.element.dispatchEvent(new CustomEvent('contractSubmit', {
      detail: {
        contractData,
        isEdit: this.options.isEdit
      }
    }));
    
    this.showSuccess('Contratto inviato con successo');
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
  getContractData() {
    return { ...this.contractData };
  }
  
  reset() {
    // Reset form to default values
    this.contractData = {
      length: 3,
      startDate: new Date().toISOString().split('T')[0],
      wageAmount: 0,
      signingBonus: 0,
      releaseClause: 0,
      minimumFee: 0,
      clauses: []
    };
    
    // Reset form fields
    this.element.querySelector('#contractLength').value = 3;
    this.element.querySelector('#contractStart').value = this.contractData.startDate;
    this.element.querySelector('#wageAmount').value = 0;
    this.element.querySelector('#signingBonus').value = 0;
    this.element.querySelector('#releaseClause').value = 0;
    this.element.querySelector('#minimumFee').value = 0;
    
    // Reset clauses
    this.element.querySelectorAll('.clause-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    this.element.querySelectorAll('.clause-details input[type="number"]').forEach(input => {
      input.value = '';
    });
    
    // Update cost summary
    this.updateCostSummary();
  }
}

// Auto-initialize contract details forms
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contract-details-form').forEach(form => {
    if (!form.dataset.initialized) {
      const options = JSON.parse(form.dataset.options || '{}');
      new ContractDetailsForm(form, options);
      form.dataset.initialized = 'true';
    }
  });
});
</script>