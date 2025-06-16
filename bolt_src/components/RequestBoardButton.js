/**
 * RequestBoardButton Component
 * Used in: FinanceOverview.page.js
 * Purpose: Button to send requests to the board (budget, infrastructure, staff)
 */

export default class RequestBoardButton {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      requestType: props.requestType || 'budget',
      disabled: props.disabled || false,
      cooldownTime: props.cooldownTime || 0,
      onRequest: props.onRequest || (() => {}),
      ...props
    };
    
    this.isOnCooldown = this.props.cooldownTime > 0;
    this.cooldownTimer = null;
    
    this.render();
    this.bindEvents();
    
    if (this.isOnCooldown) {
      this.startCooldown();
    }
  }

  render() {
    const buttonText = this.getButtonText();
    const buttonIcon = this.getButtonIcon();
    const isDisabled = this.props.disabled || this.isOnCooldown;
    
    this.container.innerHTML = `
      <div class="request-board-button">
        <button class="board-request-btn ${isDisabled ? 'disabled' : ''}" 
                ${isDisabled ? 'disabled' : ''}>
          <span class="request-icon">${buttonIcon}</span>
          <span class="request-text">${buttonText}</span>
          ${this.isOnCooldown ? `
            <span class="cooldown-indicator">
              <span class="cooldown-time" id="cooldownTime">${this.formatCooldownTime()}</span>
            </span>
          ` : ''}
        </button>
        
        ${this.props.showDescription !== false ? `
          <div class="request-description">
            <p class="description-text">${this.getDescription()}</p>
            ${this.getRequirements() ? `
              <div class="requirements">
                <span class="requirements-label">Requisiti:</span>
                <span class="requirements-text">${this.getRequirements()}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
        
        <!-- Request Modal -->
        <div class="request-modal modal" id="requestModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Richiesta alla Dirigenza</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
              <div class="request-form">
                <div class="request-type-info">
                  <div class="type-icon">${buttonIcon}</div>
                  <div class="type-details">
                    <h5>${this.getRequestTypeLabel()}</h5>
                    <p>${this.getDescription()}</p>
                  </div>
                </div>
                
                <div class="form-field">
                  <label class="field-label">Tipo di Richiesta</label>
                  <select class="request-type-select">
                    <option value="budget" ${this.props.requestType === 'budget' ? 'selected' : ''}>
                      💰 Aumento Budget
                    </option>
                    <option value="infrastructure" ${this.props.requestType === 'infrastructure' ? 'selected' : ''}>
                      🏗️ Miglioramenti Infrastrutture
                    </option>
                    <option value="staff" ${this.props.requestType === 'staff' ? 'selected' : ''}>
                      👥 Nuovo Staff
                    </option>
                    <option value="facilities" ${this.props.requestType === 'facilities' ? 'selected' : ''}>
                      🏟️ Strutture Sportive
                    </option>
                  </select>
                </div>
                
                <div class="form-field">
                  <label class="field-label">Importo Richiesto (se applicabile)</label>
                  <div class="currency-input">
                    <span class="currency-symbol">€</span>
                    <input type="number" class="amount-input" min="0" step="100000" placeholder="0">
                    <span class="currency-suffix">M</span>
                  </div>
                </div>
                
                <div class="form-field">
                  <label class="field-label">Motivazione</label>
                  <textarea class="motivation-input" 
                           placeholder="Spiega perché questa richiesta è necessaria..." 
                           rows="4" maxlength="500"></textarea>
                </div>
                
                <div class="form-field">
                  <label class="field-label">Priorità</label>
                  <select class="priority-select">
                    <option value="low">🟢 Bassa</option>
                    <option value="medium" selected>🟡 Media</option>
                    <option value="high">🟠 Alta</option>
                    <option value="urgent">🔴 Urgente</option>
                  </select>
                </div>
                
                <div class="success-probability">
                  <h6>Probabilità di Successo</h6>
                  <div class="probability-bar">
                    <div class="probability-fill" id="successProbability" style="width: 60%"></div>
                  </div>
                  <span class="probability-text" id="probabilityText">60% - Buone possibilità</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Annulla</button>
              <button class="button button-primary submit-request-btn">📤 Invia Richiesta</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Main button click
    const requestBtn = this.container.querySelector('.board-request-btn');
    requestBtn?.addEventListener('click', () => {
      if (!this.props.disabled && !this.isOnCooldown) {
        this.showRequestModal();
      }
    });

    // Modal events
    const modal = this.container.querySelector('#requestModal');
    const closeBtn = modal?.querySelector('.modal-close-btn');
    const cancelBtn = modal?.querySelector('.modal-cancel-btn');
    const submitBtn = modal?.querySelector('.submit-request-btn');
    
    closeBtn?.addEventListener('click', () => this.hideRequestModal());
    cancelBtn?.addEventListener('click', () => this.hideRequestModal());
    submitBtn?.addEventListener('click', () => this.submitRequest());

    // Form field events
    const requestTypeSelect = modal?.querySelector('.request-type-select');
    const amountInput = modal?.querySelector('.amount-input');
    const motivationInput = modal?.querySelector('.motivation-input');
    const prioritySelect = modal?.querySelector('.priority-select');
    
    requestTypeSelect?.addEventListener('change', () => this.updateSuccessProbability());
    amountInput?.addEventListener('input', () => this.updateSuccessProbability());
    motivationInput?.addEventListener('input', () => this.updateSuccessProbability());
    prioritySelect?.addEventListener('change', () => this.updateSuccessProbability());

    // Close modal on outside click
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideRequestModal();
      }
    });
  }

  showRequestModal() {
    const modal = this.container.querySelector('#requestModal');
    modal.style.display = 'block';
    this.updateSuccessProbability();
  }

  hideRequestModal() {
    const modal = this.container.querySelector('#requestModal');
    modal.style.display = 'none';
  }

  submitRequest() {
    const modal = this.container.querySelector('#requestModal');
    const requestType = modal.querySelector('.request-type-select')?.value;
    const amount = parseInt(modal.querySelector('.amount-input')?.value) || 0;
    const motivation = modal.querySelector('.motivation-input')?.value.trim();
    const priority = modal.querySelector('.priority-select')?.value;
    
    if (!motivation) {
      alert('Inserisci una motivazione per la richiesta');
      return;
    }
    
    const requestData = {
      type: requestType,
      amount: amount,
      motivation: motivation,
      priority: priority,
      timestamp: new Date().toISOString(),
      successProbability: this.calculateSuccessProbability()
    };
    
    // Emit custom event
    const requestEvent = new CustomEvent('requestBoard', {
      detail: requestData,
      bubbles: true
    });
    
    this.container.dispatchEvent(requestEvent);
    
    // Trigger callback
    this.props.onRequest(requestData);
    
    // Start cooldown
    this.startCooldown(24 * 60 * 60 * 1000); // 24 hours
    
    this.hideRequestModal();
  }

  updateSuccessProbability() {
    const probability = this.calculateSuccessProbability();
    const probabilityFill = this.container.querySelector('#successProbability');
    const probabilityText = this.container.querySelector('#probabilityText');
    
    if (probabilityFill && probabilityText) {
      probabilityFill.style.width = `${probability}%`;
      probabilityText.textContent = `${probability}% - ${this.getProbabilityDescription(probability)}`;
    }
  }

  calculateSuccessProbability() {
    const modal = this.container.querySelector('#requestModal');
    if (!modal) return 60;
    
    let baseProbability = 50;
    
    // Request type factor
    const requestType = modal.querySelector('.request-type-select')?.value;
    switch (requestType) {
      case 'budget':
        baseProbability += 10;
        break;
      case 'staff':
        baseProbability += 15;
        break;
      case 'infrastructure':
        baseProbability -= 5;
        break;
      case 'facilities':
        baseProbability -= 10;
        break;
    }
    
    // Amount factor
    const amount = parseInt(modal.querySelector('.amount-input')?.value) || 0;
    if (amount > 50) baseProbability -= 20;
    else if (amount > 20) baseProbability -= 10;
    else if (amount > 10) baseProbability -= 5;
    
    // Motivation factor
    const motivation = modal.querySelector('.motivation-input')?.value.trim() || '';
    if (motivation.length > 200) baseProbability += 15;
    else if (motivation.length > 100) baseProbability += 10;
    else if (motivation.length > 50) baseProbability += 5;
    
    // Priority factor
    const priority = modal.querySelector('.priority-select')?.value;
    switch (priority) {
      case 'urgent':
        baseProbability -= 10;
        break;
      case 'high':
        baseProbability -= 5;
        break;
      case 'low':
        baseProbability += 5;
        break;
    }
    
    return Math.max(5, Math.min(95, baseProbability));
  }

  getProbabilityDescription(probability) {
    if (probability >= 80) return 'Molto probabile';
    if (probability >= 60) return 'Buone possibilità';
    if (probability >= 40) return 'Possibile';
    if (probability >= 20) return 'Difficile';
    return 'Molto difficile';
  }

  startCooldown(duration = this.props.cooldownTime) {
    this.isOnCooldown = true;
    this.cooldownEndTime = Date.now() + duration;
    
    this.updateButtonState();
    
    this.cooldownTimer = setInterval(() => {
      const remaining = this.cooldownEndTime - Date.now();
      
      if (remaining <= 0) {
        this.endCooldown();
      } else {
        this.updateCooldownDisplay();
      }
    }, 1000);
  }

  endCooldown() {
    this.isOnCooldown = false;
    
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
      this.cooldownTimer = null;
    }
    
    this.updateButtonState();
  }

  updateButtonState() {
    const button = this.container.querySelector('.board-request-btn');
    const isDisabled = this.props.disabled || this.isOnCooldown;
    
    button.disabled = isDisabled;
    button.classList.toggle('disabled', isDisabled);
    
    // Update button text
    const textElement = button.querySelector('.request-text');
    if (textElement) {
      textElement.textContent = this.getButtonText();
    }
    
    // Update cooldown indicator
    const cooldownIndicator = button.querySelector('.cooldown-indicator');
    if (this.isOnCooldown && !cooldownIndicator) {
      const indicator = document.createElement('span');
      indicator.className = 'cooldown-indicator';
      indicator.innerHTML = `<span class="cooldown-time" id="cooldownTime">${this.formatCooldownTime()}</span>`;
      button.appendChild(indicator);
    } else if (!this.isOnCooldown && cooldownIndicator) {
      cooldownIndicator.remove();
    }
  }

  updateCooldownDisplay() {
    const cooldownTime = this.container.querySelector('#cooldownTime');
    if (cooldownTime) {
      cooldownTime.textContent = this.formatCooldownTime();
    }
  }

  formatCooldownTime() {
    if (!this.isOnCooldown) return '';
    
    const remaining = Math.max(0, this.cooldownEndTime - Date.now());
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  getButtonText() {
    if (this.isOnCooldown) {
      return 'Richiesta Inviata';
    }
    
    switch (this.props.requestType) {
      case 'budget':
        return 'Richiedi Budget';
      case 'infrastructure':
        return 'Richiedi Miglioramenti';
      case 'staff':
        return 'Richiedi Staff';
      case 'facilities':
        return 'Richiedi Strutture';
      default:
        return 'Richiedi alla Dirigenza';
    }
  }

  getButtonIcon() {
    switch (this.props.requestType) {
      case 'budget':
        return '💰';
      case 'infrastructure':
        return '🏗️';
      case 'staff':
        return '👥';
      case 'facilities':
        return '🏟️';
      default:
        return '📋';
    }
  }

  getRequestTypeLabel() {
    switch (this.props.requestType) {
      case 'budget':
        return 'Richiesta Aumento Budget';
      case 'infrastructure':
        return 'Richiesta Miglioramenti Infrastrutture';
      case 'staff':
        return 'Richiesta Nuovo Staff';
      case 'facilities':
        return 'Richiesta Strutture Sportive';
      default:
        return 'Richiesta Generica';
    }
  }

  getDescription() {
    switch (this.props.requestType) {
      case 'budget':
        return 'Richiedi fondi aggiuntivi per trasferimenti e stipendi';
      case 'infrastructure':
        return 'Richiedi miglioramenti alle strutture del club';
      case 'staff':
        return 'Richiedi l\'assunzione di nuovo staff tecnico';
      case 'facilities':
        return 'Richiedi miglioramenti alle strutture sportive';
      default:
        return 'Invia una richiesta alla dirigenza del club';
    }
  }

  getRequirements() {
    switch (this.props.requestType) {
      case 'budget':
        return 'Prestazioni positive recenti';
      case 'infrastructure':
        return 'Stabilità finanziaria';
      case 'staff':
        return 'Giustificazione del ruolo';
      case 'facilities':
        return 'Piano di sviluppo a lungo termine';
      default:
        return null;
    }
  }

  // Public methods
  setRequestType(type) {
    this.props.requestType = type;
    this.render();
    this.bindEvents();
  }

  setDisabled(disabled) {
    this.props.disabled = disabled;
    this.updateButtonState();
  }

  setCooldown(duration) {
    if (duration > 0) {
      this.startCooldown(duration);
    } else {
      this.endCooldown();
    }
  }

  destroy() {
    if (this.cooldownTimer) {
      clearInterval(this.cooldownTimer);
    }
  }
}