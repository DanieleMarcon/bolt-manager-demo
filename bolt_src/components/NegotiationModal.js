<div class="negotiation-modal modal" role="dialog" aria-labelledby="negotiation-title" aria-modal="true">
  <div class="modal-overlay" aria-hidden="true"></div>
  
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="negotiation-title" class="modal-title">Negoziazione Trasferimento</h2>
      <button class="modal-close-btn" aria-label="Chiudi negoziazione">
        ✕
      </button>
    </div>
    
    <div class="modal-body">
      <div class="player-overview">
        <div class="player-info-large">
          <img src="" alt="Player photo" class="player-photo-large" loading="lazy">
          <div class="player-details-large">
            <h3 class="player-name-large"></h3>
            <div class="player-meta-large">
              <span class="player-position-large"></span>
              <span class="player-age-large"></span>
              <span class="player-team-large"></span>
            </div>
          </div>
        </div>
        
        <div class="player-valuation">
          <div class="valuation-item">
            <span class="valuation-label">Valore di Mercato</span>
            <span class="valuation-value market-value"></span>
          </div>
          <div class="valuation-item">
            <span class="valuation-label">Stipendio Attuale</span>
            <span class="valuation-value current-wage"></span>
          </div>
          <div class="valuation-item">
            <span class="valuation-label">Scadenza Contratto</span>
            <span class="valuation-value contract-expiry"></span>
          </div>
        </div>
      </div>
      
      <div class="negotiation-tabs">
        <button class="tab-btn active" data-tab="transfer" aria-selected="true" role="tab">
          Trasferimento
        </button>
        <button class="tab-btn" data-tab="contract" aria-selected="false" role="tab">
          Contratto
        </button>
        <button class="tab-btn" data-tab="clauses" aria-selected="false" role="tab">
          Clausole
        </button>
      </div>
      
      <div class="tab-panels">
        <div class="tab-panel active" data-panel="transfer" role="tabpanel">
          <div class="transfer-form">
            <div class="form-group">
              <label for="transferType" class="form-label">Tipo di Trasferimento</label>
              <select id="transferType" class="form-select">
                <option value="permanent">Trasferimento Definitivo</option>
                <option value="loan">Prestito</option>
                <option value="loan_with_option">Prestito con Diritto di Riscatto</option>
                <option value="loan_with_obligation">Prestito con Obbligo di Riscatto</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="offerAmount" class="form-label">Offerta</label>
              <div class="amount-input">
                <span class="currency-symbol">€</span>
                <input type="number" id="offerAmount" class="form-input" min="0" step="100000">
              </div>
              <div class="value-range">
                <span class="min-value"></span>
                <div class="range-slider">
                  <div class="range-fill"></div>
                  <div class="range-marker low"></div>
                  <div class="range-marker medium"></div>
                  <div class="range-marker high"></div>
                </div>
                <span class="max-value"></span>
              </div>
            </div>
            
            <div class="form-group loan-options" style="display: none;">
              <label for="loanDuration" class="form-label">Durata Prestito</label>
              <select id="loanDuration" class="form-select">
                <option value="6">6 mesi</option>
                <option value="12" selected>1 anno</option>
                <option value="18">18 mesi</option>
                <option value="24">2 anni</option>
              </select>
            </div>
            
            <div class="form-group loan-options" style="display: none;">
              <label for="buyOption" class="form-label">Opzione di Acquisto</label>
              <div class="amount-input">
                <span class="currency-symbol">€</span>
                <input type="number" id="buyOption" class="form-input" min="0" step="100000">
              </div>
            </div>
            
            <div class="form-group">
              <label for="paymentStructure" class="form-label">Struttura Pagamento</label>
              <select id="paymentStructure" class="form-select">
                <option value="upfront">Pagamento Immediato</option>
                <option value="installments">Rate (3 anni)</option>
                <option value="performance">Basato su Performance</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Probabilità Accettazione</label>
              <div class="acceptance-meter">
                <div class="meter-fill"></div>
                <span class="meter-value">0%</span>
              </div>
              <div class="acceptance-feedback"></div>
            </div>
          </div>
        </div>
        
        <div class="tab-panel" data-panel="contract" role="tabpanel">
          <div class="contract-form">
            <div class="form-group">
              <label for="contractLength" class="form-label">Durata Contratto</label>
              <select id="contractLength" class="form-select">
                <option value="1">1 anno</option>
                <option value="2">2 anni</option>
                <option value="3" selected>3 anni</option>
                <option value="4">4 anni</option>
                <option value="5">5 anni</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="wageAmount" class="form-label">Stipendio Settimanale</label>
              <div class="amount-input">
                <span class="currency-symbol">€</span>
                <input type="number" id="wageAmount" class="form-input" min="0" step="1000">
              </div>
              <div class="value-range">
                <span class="min-wage"></span>
                <div class="range-slider">
                  <div class="range-fill"></div>
                  <div class="range-marker low"></div>
                  <div class="range-marker medium"></div>
                  <div class="range-marker high"></div>
                </div>
                <span class="max-wage"></span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="signingBonus" class="form-label">Bonus alla Firma</label>
              <div class="amount-input">
                <span class="currency-symbol">€</span>
                <input type="number" id="signingBonus" class="form-input" min="0" step="10000">
              </div>
            </div>
            
            <div class="form-group">
              <label for="releaseClause" class="form-label">Clausola Rescissoria</label>
              <div class="amount-input">
                <span class="currency-symbol">€</span>
                <input type="number" id="releaseClause" class="form-input" min="0" step="1000000">
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Probabilità Accettazione</label>
              <div class="contract-acceptance-meter">
                <div class="meter-fill"></div>
                <span class="meter-value">0%</span>
              </div>
              <div class="contract-acceptance-feedback"></div>
            </div>
          </div>
        </div>
        
        <div class="tab-panel" data-panel="clauses" role="tabpanel">
          <div class="clauses-form">
            <div class="clauses-section">
              <h4>Bonus Performance</h4>
              <div class="clause-items">
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="appearance-bonus">
                    <span>Bonus Presenze</span>
                  </label>
                  <div class="clause-details">
                    <span>€100.000 dopo 20 presenze</span>
                  </div>
                </div>
                
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="goal-bonus">
                    <span>Bonus Gol</span>
                  </label>
                  <div class="clause-details">
                    <span>€50.000 per 10 gol segnati</span>
                  </div>
                </div>
                
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="trophy-bonus">
                    <span>Bonus Trofei</span>
                  </label>
                  <div class="clause-details">
                    <span>€200.000 per vittoria campionato</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="clauses-section">
              <h4>Clausole Speciali</h4>
              <div class="clause-items">
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="sell-on-clause">
                    <span>Percentuale Rivendita</span>
                  </label>
                  <div class="clause-details">
                    <select class="clause-select">
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="25">25%</option>
                    </select>
                  </div>
                </div>
                
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="future-fee">
                    <span>Pagamenti Futuri</span>
                  </label>
                  <div class="clause-details">
                    <span>€1.000.000 dopo 50 presenze</span>
                  </div>
                </div>
                
                <div class="clause-item">
                  <label class="clause-checkbox">
                    <input type="checkbox" name="buy-back">
                    <span>Diritto di Recompra</span>
                  </label>
                  <div class="clause-details">
                    <span>€8.000.000 entro 2 anni</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="negotiation-summary">
        <div class="summary-section">
          <h4>Riepilogo Offerta</h4>
          <div class="summary-items">
            <div class="summary-item">
              <span class="summary-label">Costo Trasferimento:</span>
              <span class="summary-value transfer-cost">€0</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Stipendio Totale:</span>
              <span class="summary-value total-wages">€0</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Bonus e Clausole:</span>
              <span class="summary-value total-bonuses">€0</span>
            </div>
            <div class="summary-item total-item">
              <span class="summary-label">Costo Totale:</span>
              <span class="summary-value total-cost">€0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="negotiation-actions">
        <button class="button button-ghost cancel-btn">
          Annulla
        </button>
        <button class="button button-secondary save-btn">
          Salva Bozza
        </button>
        <button class="button button-primary submit-btn">
          Invia Offerta
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-negotiation">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Negotiation Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.negotiation-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.negotiation-modal.active {
  display: flex;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background: var(--surface);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--text);
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: var(--border);
  color: var(--text);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.player-overview {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.player-info-large {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.player-photo-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--border);
}

.player-details-large {
  flex: 1;
}

.player-name-large {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--text);
}

.player-meta-large {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: var(--text-muted);
}

.player-position-large {
  background: var(--primary);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.player-valuation {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.valuation-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.valuation-label {
  font-size: 12px;
  color: var(--text-muted);
}

.valuation-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.negotiation-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: var(--background);
  padding: 4px;
  border-radius: 8px;
}

.tab-btn {
  flex: 1;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tab-btn:hover:not(.active) {
  color: var(--text);
  background: rgba(255,255,255,0.5);
}

.tab-panels {
  margin-bottom: 24px;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.form-group {
  margin-bottom: 20px;
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
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
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

.value-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.range-slider {
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  position: relative;
}

.range-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 2px;
  width: 0%;
  transition: width 0.3s ease;
}

.range-marker {
  position: absolute;
  top: -4px;
  width: 2px;
  height: 12px;
  background: var(--border);
}

.range-marker.low {
  left: 25%;
}

.range-marker.medium {
  left: 50%;
}

.range-marker.high {
  left: 75%;
}

.acceptance-meter,
.contract-acceptance-meter {
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 6px;
  width: 0%;
  transition: width 0.5s ease;
}

.meter-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.acceptance-feedback,
.contract-acceptance-feedback {
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.clauses-section {
  margin-bottom: 24px;
}

.clauses-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.clause-items {
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
  font-size: 12px;
  color: var(--text-muted);
}

.clause-select {
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  font-size: 12px;
}

.negotiation-summary {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.summary-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.total-item {
  border-top: 1px solid var(--border);
  padding-top: 8px;
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

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--background);
}

.negotiation-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sponsor-slot-negotiation {
  position: absolute;
  bottom: 16px;
  left: 24px;
  width: 150px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }
  
  .player-overview {
    flex-direction: column;
    gap: 16px;
  }
  
  .player-valuation {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .valuation-item {
    flex: 1;
    min-width: 120px;
  }
  
  .negotiation-tabs {
    flex-direction: column;
  }
  
  .clause-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .negotiation-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-negotiation {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class NegotiationModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      playerData: null,
      dealData: null,
      isEdit: false,
      ...options
    };
    
    this.isVisible = false;
    this.currentTab = 'transfer';
    this.offerData = {
      transferType: 'permanent',
      offerAmount: 0,
      loanDuration: 12,
      buyOption: 0,
      paymentStructure: 'upfront',
      contractLength: 3,
      wageAmount: 0,
      signingBonus: 0,
      releaseClause: 0,
      clauses: []
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupAccessibility();
  }
  
  bindEvents() {
    // Close button
    this.element.querySelector('.modal-close-btn').addEventListener('click', () => {
      this.hide();
    });
    
    // Overlay click
    this.element.querySelector('.modal-overlay').addEventListener('click', () => {
      this.hide();
    });
    
    // Tabs
    this.element.querySelectorAll('.tab-btn').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
    
    // Transfer type change
    this.element.querySelector('#transferType').addEventListener('change', (e) => {
      this.handleTransferTypeChange(e.target.value);
    });
    
    // Offer amount change
    this.element.querySelector('#offerAmount').addEventListener('input', (e) => {
      this.updateOfferAmount(e.target.value);
    });
    
    // Wage amount change
    this.element.querySelector('#wageAmount').addEventListener('input', (e) => {
      this.updateWageAmount(e.target.value);
    });
    
    // Contract length change
    this.element.querySelector('#contractLength').addEventListener('change', (e) => {
      this.updateContractLength(e.target.value);
    });
    
    // Other form inputs
    this.element.querySelector('#loanDuration').addEventListener('change', (e) => {
      this.offerData.loanDuration = parseInt(e.target.value);
      this.updateSummary();
    });
    
    this.element.querySelector('#buyOption').addEventListener('input', (e) => {
      this.offerData.buyOption = parseInt(e.target.value) || 0;
      this.updateSummary();
    });
    
    this.element.querySelector('#paymentStructure').addEventListener('change', (e) => {
      this.offerData.paymentStructure = e.target.value;
      this.updateSummary();
    });
    
    this.element.querySelector('#signingBonus').addEventListener('input', (e) => {
      this.offerData.signingBonus = parseInt(e.target.value) || 0;
      this.updateSummary();
    });
    
    this.element.querySelector('#releaseClause').addEventListener('input', (e) => {
      this.offerData.releaseClause = parseInt(e.target.value) || 0;
      this.updateSummary();
    });
    
    // Clause checkboxes
    this.element.querySelectorAll('.clause-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateClauses();
      });
    });
    
    // Action buttons
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.hide();
    });
    
    this.element.querySelector('.save-btn').addEventListener('click', () => {
      this.saveDraft();
    });
    
    this.element.querySelector('.submit-btn').addEventListener('click', () => {
      this.submitOffer();
    });
  }
  
  setupAccessibility() {
    // Focus trap
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      } else if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
  }
  
  show(playerData, dealData = null) {
    this.options.playerData = playerData;
    this.options.dealData = dealData;
    this.options.isEdit = !!dealData;
    
    this.resetForm();
    this.populatePlayerInfo();
    
    if (dealData) {
      this.populateDealData();
    } else {
      this.initializeDefaultValues();
    }
    
    this.element.classList.add('active');
    this.isVisible = true;
    
    // Focus management
    this.element.querySelector('.modal-close-btn').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Update title
    const title = this.element.querySelector('.modal-title');
    title.textContent = this.options.isEdit ? 'Modifica Offerta' : 'Nuova Offerta';
    
    // Dispatch show event
    this.element.dispatchEvent(new CustomEvent('modalShow', {
      detail: { 
        playerData: this.options.playerData,
        dealData: this.options.dealData,
        isEdit: this.options.isEdit
      }
    }));
  }
  
  hide() {
    this.element.classList.remove('active');
    this.isVisible = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Dispatch hide event
    this.element.dispatchEvent(new CustomEvent('modalHide'));
  }
  
  resetForm() {
    // Reset form inputs
    this.element.querySelectorAll('input, select').forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else if (input.type === 'number') {
        input.value = 0;
      } else {
        input.value = input.options ? input.options[0].value : '';
      }
    });
    
    // Reset offer data
    this.offerData = {
      transferType: 'permanent',
      offerAmount: 0,
      loanDuration: 12,
      buyOption: 0,
      paymentStructure: 'upfront',
      contractLength: 3,
      wageAmount: 0,
      signingBonus: 0,
      releaseClause: 0,
      clauses: []
    };
    
    // Reset UI elements
    this.element.querySelector('.range-fill').style.width = '0%';
    this.element.querySelector('.meter-fill').style.width = '0%';
    this.element.querySelector('.meter-value').textContent = '0%';
    this.element.querySelector('.acceptance-feedback').textContent = '';
    
    // Switch to first tab
    this.switchTab('transfer');
  }
  
  populatePlayerInfo() {
    const player = this.options.playerData;
    
    // Update player info
    this.element.querySelector('.player-photo-large').src = player.photo;
    this.element.querySelector('.player-name-large').textContent = player.name;
    this.element.querySelector('.player-position-large').textContent = player.position;
    this.element.querySelector('.player-age-large').textContent = `${player.age} anni`;
    this.element.querySelector('.player-team-large').textContent = player.team;
    
    // Update valuation
    this.element.querySelector('.market-value').textContent = this.formatCurrency(player.marketValue);
    this.element.querySelector('.current-wage').textContent = `${this.formatCurrency(player.currentWage)}/sett`;
    this.element.querySelector('.contract-expiry').textContent = this.formatDate(player.contractExpiry);
    
    // Update value range
    const minValue = Math.round(player.marketValue * 0.7);
    const maxValue = Math.round(player.marketValue * 1.3);
    this.element.querySelector('.min-value').textContent = this.formatCurrency(minValue, true);
    this.element.querySelector('.max-value').textContent = this.formatCurrency(maxValue, true);
    
    // Update wage range
    const minWage = Math.round(player.currentWage * 0.8);
    const maxWage = Math.round(player.currentWage * 1.5);
    this.element.querySelector('.min-wage').textContent = this.formatCurrency(minWage, true);
    this.element.querySelector('.max-wage').textContent = this.formatCurrency(maxWage, true);
  }
  
  populateDealData() {
    const deal = this.options.dealData;
    
    // Set form values from deal data
    this.element.querySelector('#transferType').value = deal.transferType || 'permanent';
    this.element.querySelector('#offerAmount').value = deal.offerAmount || 0;
    this.element.querySelector('#loanDuration').value = deal.loanDuration || 12;
    this.element.querySelector('#buyOption').value = deal.buyOption || 0;
    this.element.querySelector('#paymentStructure').value = deal.paymentStructure || 'upfront';
    this.element.querySelector('#contractLength').value = deal.contractLength || 3;
    this.element.querySelector('#wageAmount').value = deal.wageAmount || 0;
    this.element.querySelector('#signingBonus').value = deal.signingBonus || 0;
    this.element.querySelector('#releaseClause').value = deal.releaseClause || 0;
    
    // Update offer data
    this.offerData = { ...deal };
    
    // Show/hide loan options
    this.handleTransferTypeChange(deal.transferType);
    
    // Update UI
    this.updateOfferAmount(deal.offerAmount);
    this.updateWageAmount(deal.wageAmount);
    this.updateSummary();
    
    // Set clauses
    if (deal.clauses && deal.clauses.length > 0) {
      deal.clauses.forEach(clause => {
        const checkbox = this.element.querySelector(`input[name="${clause.id}"]`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }
  }
  
  initializeDefaultValues() {
    const player = this.options.playerData;
    
    // Set default offer amount to market value
    const defaultOffer = player.marketValue || 0;
    this.element.querySelector('#offerAmount').value = defaultOffer;
    this.offerData.offerAmount = defaultOffer;
    
    // Set default wage to current wage + 10%
    const defaultWage = Math.round((player.currentWage || 0) * 1.1);
    this.element.querySelector('#wageAmount').value = defaultWage;
    this.offerData.wageAmount = defaultWage;
    
    // Update UI
    this.updateOfferAmount(defaultOffer);
    this.updateWageAmount(defaultWage);
    this.updateSummary();
  }
  
  switchTab(tabName) {
    // Update tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
    
    // Update tab panels
    this.element.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === tabName);
    });
    
    this.currentTab = tabName;
  }
  
  handleTransferTypeChange(type) {
    const loanOptions = this.element.querySelector('.loan-options');
    
    if (type === 'permanent') {
      loanOptions.style.display = 'none';
    } else {
      loanOptions.style.display = 'block';
    }
    
    this.offerData.transferType = type;
    this.updateSummary();
    this.updateAcceptanceProbability();
  }
  
  updateOfferAmount(amount) {
    amount = parseInt(amount) || 0;
    this.offerData.offerAmount = amount;
    
    // Update range fill
    const player = this.options.playerData;
    const marketValue = player.marketValue || 0;
    const minValue = marketValue * 0.7;
    const maxValue = marketValue * 1.3;
    const range = maxValue - minValue;
    
    let percentage = 0;
    if (range > 0) {
      percentage = Math.min(100, Math.max(0, ((amount - minValue) / range) * 100));
    }
    
    this.element.querySelector('.range-fill').style.width = `${percentage}%`;
    
    this.updateSummary();
    this.updateAcceptanceProbability();
  }
  
  updateWageAmount(amount) {
    amount = parseInt(amount) || 0;
    this.offerData.wageAmount = amount;
    
    // Update range fill
    const player = this.options.playerData;
    const currentWage = player.currentWage || 0;
    const minWage = currentWage * 0.8;
    const maxWage = currentWage * 1.5;
    const range = maxWage - minWage;
    
    let percentage = 0;
    if (range > 0) {
      percentage = Math.min(100, Math.max(0, ((amount - minWage) / range) * 100));
    }
    
    this.element.querySelector('.contract-acceptance-meter .meter-fill').style.width = `${percentage}%`;
    this.element.querySelector('.contract-acceptance-meter .meter-value').textContent = `${Math.round(percentage)}%`;
    
    this.updateSummary();
  }
  
  updateContractLength(length) {
    this.offerData.contractLength = parseInt(length);
    this.updateSummary();
  }
  
  updateClauses() {
    const clauses = [];
    
    this.element.querySelectorAll('.clause-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
      const clauseId = checkbox.name;
      const clauseItem = checkbox.closest('.clause-item');
      const clauseValue = clauseItem.querySelector('.clause-select')?.value || '';
      
      clauses.push({
        id: clauseId,
        value: clauseValue
      });
    });
    
    this.offerData.clauses = clauses;
    this.updateSummary();
  }
  
  updateSummary() {
    // Calculate transfer cost
    let transferCost = this.offerData.offerAmount;
    if (this.offerData.transferType.includes('loan')) {
      transferCost = this.offerData.transferType.includes('option') ? this.offerData.buyOption : 0;
    }
    
    // Calculate total wages
    const totalWages = this.offerData.wageAmount * 52 * this.offerData.contractLength;
    
    // Calculate bonuses
    const bonuses = this.offerData.signingBonus;
    
    // Calculate total cost
    const totalCost = transferCost + totalWages + bonuses;
    
    // Update summary values
    this.element.querySelector('.transfer-cost').textContent = this.formatCurrency(transferCost);
    this.element.querySelector('.total-wages').textContent = this.formatCurrency(totalWages);
    this.element.querySelector('.total-bonuses').textContent = this.formatCurrency(bonuses);
    this.element.querySelector('.total-cost').textContent = this.formatCurrency(totalCost);
  }
  
  updateAcceptanceProbability() {
    const player = this.options.playerData;
    const marketValue = player.marketValue || 0;
    const offerAmount = this.offerData.offerAmount;
    
    // Simple probability calculation
    let probability = 0;
    
    if (offerAmount >= marketValue * 1.2) {
      probability = 90; // Very likely to accept
    } else if (offerAmount >= marketValue) {
      probability = 70; // Likely to accept
    } else if (offerAmount >= marketValue * 0.8) {
      probability = 50; // 50/50 chance
    } else if (offerAmount >= marketValue * 0.6) {
      probability = 30; // Unlikely to accept
    } else {
      probability = 10; // Very unlikely to accept
    }
    
    // Update UI
    const meterFill = this.element.querySelector('.acceptance-meter .meter-fill');
    const meterValue = this.element.querySelector('.acceptance-meter .meter-value');
    const feedback = this.element.querySelector('.acceptance-feedback');
    
    meterFill.style.width = `${probability}%`;
    meterValue.textContent = `${probability}%`;
    
    // Update feedback text
    if (probability >= 80) {
      feedback.textContent = 'Offerta molto attraente, alta probabilità di accettazione';
      feedback.style.color = 'var(--success)';
    } else if (probability >= 60) {
      feedback.textContent = 'Buona offerta, probabilmente accettata';
      feedback.style.color = 'var(--success)';
    } else if (probability >= 40) {
      feedback.textContent = 'Offerta nella media, potrebbero esserci controproposte';
      feedback.style.color = 'var(--warning)';
    } else if (probability >= 20) {
      feedback.textContent = 'Offerta bassa, difficilmente accettata';
      feedback.style.color = 'var(--error)';
    } else {
      feedback.textContent = 'Offerta molto bassa, quasi certamente rifiutata';
      feedback.style.color = 'var(--error)';
    }
  }
  
  formatCurrency(amount, short = false) {
    if (short && amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    } else if (short && amount >= 1000) {
      return `€${(amount / 1000).toFixed(0)}K`;
    }
    
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short'
    });
  }
  
  saveDraft() {
    // Prepare offer data
    const offerData = {
      ...this.offerData,
      playerId: this.options.playerData.id,
      playerName: this.options.playerData.name,
      teamId: this.options.playerData.teamId,
      teamName: this.options.playerData.team,
      status: 'draft',
      timestamp: new Date().toISOString()
    };
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveDraft', {
      detail: {
        offerData,
        isEdit: this.options.isEdit,
        originalDealId: this.options.dealData?.id
      }
    }));
    
    this.showSuccess('Bozza salvata con successo');
    this.hide();
  }
  
  submitOffer() {
    // Validate offer
    if (!this.validateOffer()) {
      return;
    }
    
    // Prepare offer data
    const offerData = {
      ...this.offerData,
      playerId: this.options.playerData.id,
      playerName: this.options.playerData.name,
      teamId: this.options.playerData.teamId,
      teamName: this.options.playerData.team,
      status: 'negotiating',
      timestamp: new Date().toISOString()
    };
    
    // Dispatch submit event
    this.element.dispatchEvent(new CustomEvent('submitOffer', {
      detail: {
        offerData,
        isEdit: this.options.isEdit,
        originalDealId: this.options.dealData?.id
      }
    }));
    
    this.showSuccess('Offerta inviata con successo');
    this.hide();
  }
  
  validateOffer() {
    // Check if offer amount is greater than 0
    if (this.offerData.offerAmount <= 0 && this.offerData.transferType === 'permanent') {
      this.showError('L\'offerta deve essere maggiore di 0');
      return false;
    }
    
    // Check if wage amount is greater than 0
    if (this.offerData.wageAmount <= 0) {
      this.showError('Lo stipendio deve essere maggiore di 0');
      return false;
    }
    
    return true;
  }
  
  handleTabNavigation(e) {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
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
  isOpen() {
    return this.isVisible;
  }
  
  getOfferData() {
    return { ...this.offerData };
  }
  
  getCurrentTab() {
    return this.currentTab;
  }
}

// Auto-initialize negotiation modals
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.negotiation-modal').forEach(modal => {
    if (!modal.dataset.initialized) {
      const options = JSON.parse(modal.dataset.options || '{}');
      new NegotiationModal(modal, options);
      modal.dataset.initialized = 'true';
    }
  });
});

// Global function to show negotiation modal
window.showNegotiationModal = function(playerData, dealData = null) {
  const modal = document.querySelector('.negotiation-modal');
  if (modal) {
    const instance = modal.negotiationModal || 
                    new NegotiationModal(modal);
    modal.negotiationModal = instance;
    instance.show(playerData, dealData);
  }
};
</script>