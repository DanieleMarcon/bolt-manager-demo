/**
 * NegotiationPanel Component
 * Used in: TransferMarket.page.js
 * Purpose: Advanced negotiation interface for player transfers
 */

export default class NegotiationPanel {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      player: props.player || null,
      onOfferSubmit: props.onOfferSubmit || (() => {}),
      onDraftSave: props.onDraftSave || (() => {}),
      onCancel: props.onCancel || (() => {}),
      maxBudget: props.maxBudget || 50000000,
      ...props
    };
    
    this.offerData = {
      transferFee: 0,
      weeklyWage: 0,
      contractLength: 3,
      signingBonus: 0,
      sellOnClause: 0,
      buyBackClause: 0,
      loanDuration: 0,
      isLoan: false
    };
    
    this.negotiationHistory = [];
    this.currentStep = 'offer'; // 'offer', 'contract', 'review'
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="negotiation-panel">
        <div class="negotiation-header">
          <div class="player-info">
            ${this.props.player ? `
              <img src="${this.props.player.photo}" alt="${this.props.player.name}" class="player-photo">
              <div class="player-details">
                <h4 class="player-name">${this.props.player.name}</h4>
                <span class="player-position">${this.props.player.position}</span>
                <span class="player-age">${this.props.player.age} anni</span>
                <span class="player-value">Valore: €${this.formatCurrency(this.props.player.marketValue)}</span>
              </div>
            ` : '<h4>Seleziona un giocatore</h4>'}
          </div>
          
          <div class="negotiation-progress">
            <div class="progress-steps">
              <div class="progress-step ${this.currentStep === 'offer' ? 'active' : ''}" data-step="offer">
                <span class="step-number">1</span>
                <span class="step-label">Offerta</span>
              </div>
              <div class="progress-step ${this.currentStep === 'contract' ? 'active' : ''}" data-step="contract">
                <span class="step-number">2</span>
                <span class="step-label">Contratto</span>
              </div>
              <div class="progress-step ${this.currentStep === 'review' ? 'active' : ''}" data-step="review">
                <span class="step-number">3</span>
                <span class="step-label">Revisione</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="negotiation-content">
          <!-- Offer Step -->
          <div class="negotiation-step offer-step ${this.currentStep === 'offer' ? 'active' : 'hidden'}" id="offerStep">
            <div class="step-content">
              <div class="offer-type-selection">
                <h5>Tipo di Trasferimento</h5>
                <div class="offer-types">
                  <label class="offer-type-option">
                    <input type="radio" name="offerType" value="permanent" checked>
                    <span class="option-label">Trasferimento Definitivo</span>
                  </label>
                  <label class="offer-type-option">
                    <input type="radio" name="offerType" value="loan">
                    <span class="option-label">Prestito</span>
                  </label>
                </div>
              </div>
              
              <div class="offer-details permanent-offer" id="permanentOffer">
                <div class="offer-field">
                  <label class="field-label">Offerta di Trasferimento</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="transfer-fee-input" min="0" max="${this.props.maxBudget}" step="100000" value="0">
                    <span class="currency-suffix">M</span>
                  </div>
                  <div class="field-info">
                    <span class="market-value">Valore di mercato: €${this.props.player ? this.formatCurrency(this.props.player.marketValue) : '0'}</span>
                    <span class="budget-remaining">Budget rimanente: €${this.formatCurrency(this.props.maxBudget)}</span>
                  </div>
                </div>
                
                <div class="offer-field">
                  <label class="field-label">Clausole Aggiuntive</label>
                  <div class="clauses-grid">
                    <div class="clause-item">
                      <label class="clause-label">Clausola di Rivendita (%)</label>
                      <input type="number" class="sell-on-input" min="0" max="50" step="5" value="0">
                    </div>
                    <div class="clause-item">
                      <label class="clause-label">Clausola di Riacquisto (€M)</label>
                      <input type="number" class="buyback-input" min="0" step="1" value="0">
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="offer-details loan-offer hidden" id="loanOffer">
                <div class="offer-field">
                  <label class="field-label">Durata Prestito</label>
                  <select class="loan-duration-select">
                    <option value="6">6 mesi</option>
                    <option value="12" selected>1 anno</option>
                    <option value="24">2 anni</option>
                  </select>
                </div>
                
                <div class="offer-field">
                  <label class="field-label">Costo Prestito</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="loan-fee-input" min="0" step="100000" value="0">
                    <span class="currency-suffix">M</span>
                  </div>
                </div>
                
                <div class="offer-field">
                  <label class="field-label">Opzioni</label>
                  <div class="loan-options">
                    <label class="option-checkbox">
                      <input type="checkbox" class="option-to-buy">
                      <span>Diritto di riscatto</span>
                    </label>
                    <label class="option-checkbox">
                      <input type="checkbox" class="obligation-to-buy">
                      <span>Obbligo di riscatto</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contract Step -->
          <div class="negotiation-step contract-step ${this.currentStep === 'contract' ? 'active' : 'hidden'}" id="contractStep">
            <div class="step-content">
              <div class="contract-details">
                <div class="contract-field">
                  <label class="field-label">Stipendio Settimanale</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="weekly-wage-input" min="1000" step="1000" value="10000">
                    <span class="currency-suffix">k</span>
                  </div>
                  <div class="field-info">
                    <span class="annual-cost">Costo annuale: €<span class="annual-cost-value">520</span>k</span>
                  </div>
                </div>
                
                <div class="contract-field">
                  <label class="field-label">Durata Contratto</label>
                  <select class="contract-length-select">
                    <option value="1">1 anno</option>
                    <option value="2">2 anni</option>
                    <option value="3" selected>3 anni</option>
                    <option value="4">4 anni</option>
                    <option value="5">5 anni</option>
                  </select>
                </div>
                
                <div class="contract-field">
                  <label class="field-label">Bonus alla Firma</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="signing-bonus-input" min="0" step="10000" value="0">
                    <span class="currency-suffix">k</span>
                  </div>
                </div>
                
                <div class="contract-field">
                  <label class="field-label">Clausola Rescissoria</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="release-clause-input" min="0" step="1000000" value="0">
                    <span class="currency-suffix">M</span>
                  </div>
                  <div class="field-info">
                    <span class="clause-note">0 = Nessuna clausola</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Review Step -->
          <div class="negotiation-step review-step ${this.currentStep === 'review' ? 'active' : 'hidden'}" id="reviewStep">
            <div class="step-content">
              <div class="offer-summary">
                <h5>Riepilogo Offerta</h5>
                <div class="summary-grid" id="offerSummary">
                  <!-- Summary will be populated dynamically -->
                </div>
              </div>
              
              <div class="cost-breakdown">
                <h5>Analisi Costi</h5>
                <div class="cost-items" id="costBreakdown">
                  <!-- Cost breakdown will be populated dynamically -->
                </div>
                <div class="total-cost">
                  <span class="total-label">Costo Totale:</span>
                  <span class="total-value" id="totalCost">€0</span>
                </div>
              </div>
              
              <div class="success-probability">
                <h5>Probabilità di Successo</h5>
                <div class="probability-bar">
                  <div class="probability-fill" id="successProbability" style="width: 0%"></div>
                </div>
                <span class="probability-text" id="probabilityText">0% - Calcolo in corso...</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="negotiation-actions">
          <div class="action-buttons">
            <button class="button button-ghost cancel-btn">Annulla</button>
            <button class="button button-secondary save-draft-btn">💾 Salva Bozza</button>
            <button class="button button-secondary prev-step-btn" style="display: none;">← Indietro</button>
            <button class="button button-primary next-step-btn">Avanti →</button>
            <button class="button button-primary submit-offer-btn" style="display: none;">🚀 Invia Offerta</button>
          </div>
        </div>
        
        <!-- Negotiation History -->
        <div class="negotiation-history" id="negotiationHistory" style="display: none;">
          <h5>Storico Negoziazione</h5>
          <div class="history-items">
            <!-- History items will be populated dynamically -->
          </div>
        </div>
      </div>
    `;
    
    this.updateStepVisibility();
  }

  bindEvents() {
    // Offer type selection
    const offerTypeInputs = this.container.querySelectorAll('input[name="offerType"]');
    offerTypeInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        this.offerData.isLoan = e.target.value === 'loan';
        this.toggleOfferType();
      });
    });

    // Input field events
    this.bindInputEvents();

    // Navigation buttons
    const cancelBtn = this.container.querySelector('.cancel-btn');
    const saveDraftBtn = this.container.querySelector('.save-draft-btn');
    const prevStepBtn = this.container.querySelector('.prev-step-btn');
    const nextStepBtn = this.container.querySelector('.next-step-btn');
    const submitOfferBtn = this.container.querySelector('.submit-offer-btn');
    
    cancelBtn?.addEventListener('click', () => this.props.onCancel());
    saveDraftBtn?.addEventListener('click', () => this.saveDraft());
    prevStepBtn?.addEventListener('click', () => this.previousStep());
    nextStepBtn?.addEventListener('click', () => this.nextStep());
    submitOfferBtn?.addEventListener('click', () => this.submitOffer());

    // Progress step clicks
    const progressSteps = this.container.querySelectorAll('.progress-step');
    progressSteps.forEach(step => {
      step.addEventListener('click', (e) => {
        const stepName = step.dataset.step;
        if (this.canNavigateToStep(stepName)) {
          this.currentStep = stepName;
          this.updateStepVisibility();
        }
      });
    });
  }

  bindInputEvents() {
    // Transfer fee input
    const transferFeeInput = this.container.querySelector('.transfer-fee-input');
    transferFeeInput?.addEventListener('input', (e) => {
      this.offerData.transferFee = parseInt(e.target.value) || 0;
      this.updateBudgetDisplay();
    });

    // Weekly wage input
    const weeklyWageInput = this.container.querySelector('.weekly-wage-input');
    weeklyWageInput?.addEventListener('input', (e) => {
      this.offerData.weeklyWage = parseInt(e.target.value) || 0;
      this.updateAnnualCost();
    });

    // Contract length select
    const contractLengthSelect = this.container.querySelector('.contract-length-select');
    contractLengthSelect?.addEventListener('change', (e) => {
      this.offerData.contractLength = parseInt(e.target.value) || 3;
      this.updateAnnualCost();
    });

    // Signing bonus input
    const signingBonusInput = this.container.querySelector('.signing-bonus-input');
    signingBonusInput?.addEventListener('input', (e) => {
      this.offerData.signingBonus = parseInt(e.target.value) || 0;
    });

    // Sell-on clause input
    const sellOnInput = this.container.querySelector('.sell-on-input');
    sellOnInput?.addEventListener('input', (e) => {
      this.offerData.sellOnClause = parseInt(e.target.value) || 0;
    });

    // Buy-back clause input
    const buyBackInput = this.container.querySelector('.buyback-input');
    buyBackInput?.addEventListener('input', (e) => {
      this.offerData.buyBackClause = parseInt(e.target.value) || 0;
    });

    // Loan duration select
    const loanDurationSelect = this.container.querySelector('.loan-duration-select');
    loanDurationSelect?.addEventListener('change', (e) => {
      this.offerData.loanDuration = parseInt(e.target.value) || 12;
    });
  }

  toggleOfferType() {
    const permanentOffer = this.container.querySelector('#permanentOffer');
    const loanOffer = this.container.querySelector('#loanOffer');
    
    if (this.offerData.isLoan) {
      permanentOffer?.classList.add('hidden');
      loanOffer?.classList.remove('hidden');
    } else {
      permanentOffer?.classList.remove('hidden');
      loanOffer?.classList.add('hidden');
    }
  }

  updateBudgetDisplay() {
    const budgetRemaining = this.container.querySelector('.budget-remaining');
    if (budgetRemaining) {
      const remaining = this.props.maxBudget - this.offerData.transferFee;
      budgetRemaining.textContent = `Budget rimanente: €${this.formatCurrency(remaining)}`;
      
      if (remaining < 0) {
        budgetRemaining.classList.add('over-budget');
      } else {
        budgetRemaining.classList.remove('over-budget');
      }
    }
  }

  updateAnnualCost() {
    const annualCostValue = this.container.querySelector('.annual-cost-value');
    if (annualCostValue) {
      const annualCost = this.offerData.weeklyWage * 52;
      annualCostValue.textContent = (annualCost / 1000).toFixed(0);
    }
  }

  nextStep() {
    switch (this.currentStep) {
      case 'offer':
        if (this.validateOfferStep()) {
          this.currentStep = 'contract';
        }
        break;
      case 'contract':
        if (this.validateContractStep()) {
          this.currentStep = 'review';
          this.updateReviewStep();
        }
        break;
    }
    this.updateStepVisibility();
  }

  previousStep() {
    switch (this.currentStep) {
      case 'contract':
        this.currentStep = 'offer';
        break;
      case 'review':
        this.currentStep = 'contract';
        break;
    }
    this.updateStepVisibility();
  }

  updateStepVisibility() {
    // Update progress steps
    const progressSteps = this.container.querySelectorAll('.progress-step');
    progressSteps.forEach(step => {
      step.classList.toggle('active', step.dataset.step === this.currentStep);
    });

    // Update step content
    const stepContents = this.container.querySelectorAll('.negotiation-step');
    stepContents.forEach(step => {
      step.classList.toggle('active', step.classList.contains(`${this.currentStep}-step`));
      step.classList.toggle('hidden', !step.classList.contains(`${this.currentStep}-step`));
    });

    // Update navigation buttons
    const prevStepBtn = this.container.querySelector('.prev-step-btn');
    const nextStepBtn = this.container.querySelector('.next-step-btn');
    const submitOfferBtn = this.container.querySelector('.submit-offer-btn');
    
    prevStepBtn.style.display = this.currentStep === 'offer' ? 'none' : 'inline-block';
    nextStepBtn.style.display = this.currentStep === 'review' ? 'none' : 'inline-block';
    submitOfferBtn.style.display = this.currentStep === 'review' ? 'inline-block' : 'none';
  }

  validateOfferStep() {
    if (!this.offerData.isLoan && this.offerData.transferFee <= 0) {
      alert('Inserisci un\'offerta di trasferimento valida');
      return false;
    }
    
    if (this.offerData.transferFee > this.props.maxBudget) {
      alert('L\'offerta supera il budget disponibile');
      return false;
    }
    
    return true;
  }

  validateContractStep() {
    if (this.offerData.weeklyWage <= 0) {
      alert('Inserisci uno stipendio settimanale valido');
      return false;
    }
    
    return true;
  }

  updateReviewStep() {
    this.updateOfferSummary();
    this.updateCostBreakdown();
    this.calculateSuccessProbability();
  }

  updateOfferSummary() {
    const summaryContainer = this.container.querySelector('#offerSummary');
    if (!summaryContainer) return;
    
    const summaryItems = [];
    
    if (this.offerData.isLoan) {
      summaryItems.push(`<div class="summary-item"><span>Tipo:</span><span>Prestito</span></div>`);
      summaryItems.push(`<div class="summary-item"><span>Durata:</span><span>${this.offerData.loanDuration} mesi</span></div>`);
    } else {
      summaryItems.push(`<div class="summary-item"><span>Tipo:</span><span>Trasferimento Definitivo</span></div>`);
      summaryItems.push(`<div class="summary-item"><span>Offerta:</span><span>€${this.formatCurrency(this.offerData.transferFee)}</span></div>`);
    }
    
    summaryItems.push(`<div class="summary-item"><span>Stipendio:</span><span>€${this.formatCurrency(this.offerData.weeklyWage)}/settimana</span></div>`);
    summaryItems.push(`<div class="summary-item"><span>Contratto:</span><span>${this.offerData.contractLength} anni</span></div>`);
    
    if (this.offerData.signingBonus > 0) {
      summaryItems.push(`<div class="summary-item"><span>Bonus Firma:</span><span>€${this.formatCurrency(this.offerData.signingBonus)}</span></div>`);
    }
    
    summaryContainer.innerHTML = summaryItems.join('');
  }

  updateCostBreakdown() {
    const costContainer = this.container.querySelector('#costBreakdown');
    const totalCostElement = this.container.querySelector('#totalCost');
    
    if (!costContainer || !totalCostElement) return;
    
    let totalCost = 0;
    const costItems = [];
    
    if (!this.offerData.isLoan) {
      costItems.push(`<div class="cost-item"><span>Costo Trasferimento:</span><span>€${this.formatCurrency(this.offerData.transferFee)}</span></div>`);
      totalCost += this.offerData.transferFee;
    }
    
    const totalWages = this.offerData.weeklyWage * 52 * this.offerData.contractLength;
    costItems.push(`<div class="cost-item"><span>Stipendi Totali:</span><span>€${this.formatCurrency(totalWages)}</span></div>`);
    totalCost += totalWages;
    
    if (this.offerData.signingBonus > 0) {
      costItems.push(`<div class="cost-item"><span>Bonus Firma:</span><span>€${this.formatCurrency(this.offerData.signingBonus)}</span></div>`);
      totalCost += this.offerData.signingBonus;
    }
    
    costContainer.innerHTML = costItems.join('');
    totalCostElement.textContent = `€${this.formatCurrency(totalCost)}`;
  }

  calculateSuccessProbability() {
    const probabilityFill = this.container.querySelector('#successProbability');
    const probabilityText = this.container.querySelector('#probabilityText');
    
    if (!probabilityFill || !probabilityText || !this.props.player) return;
    
    // Simple probability calculation based on offer vs market value
    let probability = 50; // Base probability
    
    if (!this.offerData.isLoan) {
      const offerRatio = this.offerData.transferFee / this.props.player.marketValue;
      
      if (offerRatio >= 1.2) probability = 90;
      else if (offerRatio >= 1.0) probability = 75;
      else if (offerRatio >= 0.8) probability = 60;
      else if (offerRatio >= 0.6) probability = 40;
      else probability = 20;
    }
    
    // Adjust for wage offer
    const expectedWage = this.props.player.marketValue / 1000; // Rough wage calculation
    const wageRatio = this.offerData.weeklyWage / expectedWage;
    
    if (wageRatio >= 1.5) probability += 15;
    else if (wageRatio >= 1.2) probability += 10;
    else if (wageRatio >= 1.0) probability += 5;
    else if (wageRatio < 0.8) probability -= 10;
    
    probability = Math.max(5, Math.min(95, probability));
    
    probabilityFill.style.width = `${probability}%`;
    probabilityText.textContent = `${probability}% - ${this.getProbabilityDescription(probability)}`;
  }

  getProbabilityDescription(probability) {
    if (probability >= 80) return 'Molto probabile';
    if (probability >= 60) return 'Probabile';
    if (probability >= 40) return 'Possibile';
    if (probability >= 20) return 'Difficile';
    return 'Molto difficile';
  }

  canNavigateToStep(stepName) {
    // Allow navigation only to completed steps or next step
    const steps = ['offer', 'contract', 'review'];
    const currentIndex = steps.indexOf(this.currentStep);
    const targetIndex = steps.indexOf(stepName);
    
    return targetIndex <= currentIndex + 1;
  }

  saveDraft() {
    const draftData = {
      player: this.props.player,
      offerData: { ...this.offerData },
      timestamp: new Date().toISOString()
    };
    
    this.props.onDraftSave(draftData);
  }

  submitOffer() {
    if (!this.validateOfferStep() || !this.validateContractStep()) {
      return;
    }
    
    const offerData = {
      player: this.props.player,
      offer: { ...this.offerData },
      timestamp: new Date().toISOString()
    };
    
    this.props.onOfferSubmit(offerData);
  }

  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toString();
  }

  setPlayer(player) {
    this.props.player = player;
    this.render();
  }

  getOfferData() {
    return { ...this.offerData };
  }

  setOfferData(data) {
    this.offerData = { ...this.offerData, ...data };
    this.updateInputValues();
  }

  updateInputValues() {
    // Update all input values to match current offer data
    const transferFeeInput = this.container.querySelector('.transfer-fee-input');
    if (transferFeeInput) transferFeeInput.value = this.offerData.transferFee;
    
    const weeklyWageInput = this.container.querySelector('.weekly-wage-input');
    if (weeklyWageInput) weeklyWageInput.value = this.offerData.weeklyWage;
    
    const contractLengthSelect = this.container.querySelector('.contract-length-select');
    if (contractLengthSelect) contractLengthSelect.value = this.offerData.contractLength;
    
    const signingBonusInput = this.container.querySelector('.signing-bonus-input');
    if (signingBonusInput) signingBonusInput.value = this.offerData.signingBonus;
    
    // Update calculated displays
    this.updateBudgetDisplay();
    this.updateAnnualCost();
  }
}