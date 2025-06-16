/**
 * ContractDetails Component
 * Used in: TransferMarket.page.js, StaffManagement.page.js
 * Purpose: Display and manage contract details for players and staff
 */

export default class ContractDetails {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      contract: props.contract || null,
      player: props.player || null,
      club: props.club || null,
      onSave: props.onSave || (() => {}),
      onCancel: props.onCancel || (() => {}),
      onRenew: props.onRenew || (() => {}),
      onTerminate: props.onTerminate || (() => {}),
      editable: props.editable || false,
      showActions: props.showActions !== false,
      ...props
    };
    
    this.editMode = false;
    this.originalContract = null;
    
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.props.contract) {
      this.container.innerHTML = `
        <div class="contract-details empty">
          <div class="empty-state">
            <div class="empty-icon">📄</div>
            <h4>Nessun Contratto</h4>
            <p>Seleziona un giocatore per visualizzare i dettagli del contratto</p>
          </div>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="contract-details">
        <div class="contract-header">
          <div class="contract-title">
            <h4>Dettagli Contratto</h4>
            ${this.props.editable ? `
              <div class="contract-actions-header">
                <button class="button button-ghost edit-btn" ${this.editMode ? 'style="display: none;"' : ''}>
                  ✏️ Modifica
                </button>
                <button class="button button-ghost cancel-edit-btn" ${!this.editMode ? 'style="display: none;"' : ''}>
                  ❌ Annulla
                </button>
                <button class="button button-primary save-btn" ${!this.editMode ? 'style="display: none;"' : ''}>
                  💾 Salva
                </button>
              </div>
            ` : ''}
          </div>
          
          ${this.props.player ? `
            <div class="contract-parties">
              <div class="party player-party">
                <img src="${this.props.player.photo}" alt="${this.props.player.name}" class="party-photo">
                <div class="party-info">
                  <h5 class="party-name">${this.props.player.name}</h5>
                  <span class="party-role">${this.props.player.position || 'Giocatore'}</span>
                </div>
              </div>
              
              <div class="contract-connector">
                <div class="connector-line"></div>
                <div class="connector-icon">📝</div>
              </div>
              
              <div class="party club-party">
                ${this.props.club ? `
                  <img src="${this.props.club.logo}" alt="${this.props.club.name}" class="party-photo">
                  <div class="party-info">
                    <h5 class="party-name">${this.props.club.name}</h5>
                    <span class="party-role">Club</span>
                  </div>
                ` : `
                  <div class="party-info">
                    <h5 class="party-name">Club</h5>
                    <span class="party-role">Squadra</span>
                  </div>
                `}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="contract-content">
          <div class="contract-main-details">
            <div class="detail-section">
              <h5 class="section-title">Informazioni Principali</h5>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Stato Contratto:</span>
                  <span class="detail-value">
                    <span class="status-badge ${this.getStatusClass()}">${this.getStatusText()}</span>
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Durata:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <select class="edit-input duration-select">
                        <option value="1" ${this.props.contract.duration === 1 ? 'selected' : ''}>1 anno</option>
                        <option value="2" ${this.props.contract.duration === 2 ? 'selected' : ''}>2 anni</option>
                        <option value="3" ${this.props.contract.duration === 3 ? 'selected' : ''}>3 anni</option>
                        <option value="4" ${this.props.contract.duration === 4 ? 'selected' : ''}>4 anni</option>
                        <option value="5" ${this.props.contract.duration === 5 ? 'selected' : ''}>5 anni</option>
                      </select>
                    ` : `${this.props.contract.duration || 'N/A'} anni`}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Data Inizio:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <input type="date" class="edit-input start-date-input" value="${this.props.contract.startDate || ''}">
                    ` : this.formatDate(this.props.contract.startDate)}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Data Scadenza:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <input type="date" class="edit-input end-date-input" value="${this.props.contract.endDate || ''}">
                    ` : this.formatDate(this.props.contract.endDate)}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Tempo Rimanente:</span>
                  <span class="detail-value">${this.getTimeRemaining()}</span>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h5 class="section-title">Dettagli Economici</h5>
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Stipendio Settimanale:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <div class="currency-input">
                        <span class="currency-symbol">€</span>
                        <input type="number" class="edit-input weekly-wage-input" value="${this.props.contract.weeklyWage || 0}" min="0" step="1000">
                      </div>
                    ` : `€${this.formatCurrency(this.props.contract.weeklyWage || 0)}`}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Stipendio Annuale:</span>
                  <span class="detail-value">€${this.formatCurrency((this.props.contract.weeklyWage || 0) * 52)}</span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Bonus alla Firma:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <div class="currency-input">
                        <span class="currency-symbol">€</span>
                        <input type="number" class="edit-input signing-bonus-input" value="${this.props.contract.signingBonus || 0}" min="0" step="10000">
                      </div>
                    ` : `€${this.formatCurrency(this.props.contract.signingBonus || 0)}`}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Clausola Rescissoria:</span>
                  <span class="detail-value">
                    ${this.editMode ? `
                      <div class="currency-input">
                        <span class="currency-symbol">€</span>
                        <input type="number" class="edit-input release-clause-input" value="${this.props.contract.releaseClause || 0}" min="0" step="1000000">
                      </div>
                    ` : (this.props.contract.releaseClause ? `€${this.formatCurrency(this.props.contract.releaseClause)}` : 'Nessuna')}
                  </span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Costo Totale Contratto:</span>
                  <span class="detail-value total-cost">€${this.calculateTotalCost()}</span>
                </div>
              </div>
            </div>
            
            ${this.props.contract.clauses && this.props.contract.clauses.length > 0 ? `
              <div class="detail-section">
                <h5 class="section-title">Clausole Speciali</h5>
                <div class="clauses-list">
                  ${this.props.contract.clauses.map(clause => `
                    <div class="clause-item">
                      <span class="clause-type">${clause.type}</span>
                      <span class="clause-description">${clause.description}</span>
                      ${clause.value ? `<span class="clause-value">${clause.value}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            ${this.props.contract.history && this.props.contract.history.length > 0 ? `
              <div class="detail-section">
                <h5 class="section-title">Storico Contratto</h5>
                <div class="contract-history">
                  ${this.props.contract.history.map(entry => `
                    <div class="history-entry">
                      <span class="history-date">${this.formatDate(entry.date)}</span>
                      <span class="history-description">${entry.description}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        ${this.props.showActions ? `
          <div class="contract-actions">
            <div class="action-buttons">
              <button class="button button-secondary renew-btn">
                🔄 Rinnova Contratto
              </button>
              <button class="button button-warning terminate-btn">
                ⚠️ Risolvi Contratto
              </button>
              <button class="button button-primary export-btn">
                📄 Esporta PDF
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  bindEvents() {
    // Edit mode buttons
    const editBtn = this.container.querySelector('.edit-btn');
    const cancelEditBtn = this.container.querySelector('.cancel-edit-btn');
    const saveBtn = this.container.querySelector('.save-btn');
    
    editBtn?.addEventListener('click', () => this.enterEditMode());
    cancelEditBtn?.addEventListener('click', () => this.cancelEdit());
    saveBtn?.addEventListener('click', () => this.saveChanges());

    // Action buttons
    const renewBtn = this.container.querySelector('.renew-btn');
    const terminateBtn = this.container.querySelector('.terminate-btn');
    const exportBtn = this.container.querySelector('.export-btn');
    
    renewBtn?.addEventListener('click', () => this.renewContract());
    terminateBtn?.addEventListener('click', () => this.terminateContract());
    exportBtn?.addEventListener('click', () => this.exportContract());

    // Input change events for real-time updates
    if (this.editMode) {
      this.bindEditInputs();
    }
  }

  bindEditInputs() {
    const weeklyWageInput = this.container.querySelector('.weekly-wage-input');
    weeklyWageInput?.addEventListener('input', () => this.updateCalculatedValues());
    
    const durationSelect = this.container.querySelector('.duration-select');
    durationSelect?.addEventListener('change', () => this.updateCalculatedValues());
  }

  enterEditMode() {
    this.editMode = true;
    this.originalContract = { ...this.props.contract };
    this.render();
    this.bindEvents();
  }

  cancelEdit() {
    this.editMode = false;
    this.props.contract = { ...this.originalContract };
    this.render();
    this.bindEvents();
  }

  saveChanges() {
    // Collect values from edit inputs
    const updatedContract = { ...this.props.contract };
    
    const durationSelect = this.container.querySelector('.duration-select');
    if (durationSelect) updatedContract.duration = parseInt(durationSelect.value);
    
    const startDateInput = this.container.querySelector('.start-date-input');
    if (startDateInput) updatedContract.startDate = startDateInput.value;
    
    const endDateInput = this.container.querySelector('.end-date-input');
    if (endDateInput) updatedContract.endDate = endDateInput.value;
    
    const weeklyWageInput = this.container.querySelector('.weekly-wage-input');
    if (weeklyWageInput) updatedContract.weeklyWage = parseInt(weeklyWageInput.value) || 0;
    
    const signingBonusInput = this.container.querySelector('.signing-bonus-input');
    if (signingBonusInput) updatedContract.signingBonus = parseInt(signingBonusInput.value) || 0;
    
    const releaseClauseInput = this.container.querySelector('.release-clause-input');
    if (releaseClauseInput) updatedContract.releaseClause = parseInt(releaseClauseInput.value) || 0;
    
    // Update contract object
    this.props.contract = updatedContract;
    this.editMode = false;
    
    // Trigger save callback
    this.props.onSave(updatedContract);
    
    // Re-render
    this.render();
    this.bindEvents();
  }

  updateCalculatedValues() {
    // Update annual salary display
    const weeklyWageInput = this.container.querySelector('.weekly-wage-input');
    const annualSalaryDisplay = this.container.querySelector('.detail-value');
    
    if (weeklyWageInput && annualSalaryDisplay) {
      const weeklyWage = parseInt(weeklyWageInput.value) || 0;
      const annualSalary = weeklyWage * 52;
      // Find and update the annual salary display
      // This would need more specific targeting in a real implementation
    }
    
    // Update total cost
    const totalCostDisplay = this.container.querySelector('.total-cost');
    if (totalCostDisplay) {
      totalCostDisplay.textContent = `€${this.calculateTotalCost()}`;
    }
  }

  renewContract() {
    if (confirm('Sei sicuro di voler avviare il rinnovo del contratto?')) {
      this.props.onRenew(this.props.contract);
    }
  }

  terminateContract() {
    if (confirm('Sei sicuro di voler risolvere il contratto? Questa azione non può essere annullata.')) {
      this.props.onTerminate(this.props.contract);
    }
  }

  exportContract() {
    // Generate contract data for export
    const contractData = {
      player: this.props.player,
      club: this.props.club,
      contract: this.props.contract,
      exportDate: new Date().toISOString()
    };
    
    // Create downloadable file
    const dataStr = JSON.stringify(contractData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `contract-${this.props.player?.name || 'player'}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  getStatusClass() {
    if (!this.props.contract.endDate) return 'status-unknown';
    
    const endDate = new Date(this.props.contract.endDate);
    const now = new Date();
    const monthsRemaining = (endDate.getFullYear() - now.getFullYear()) * 12 + (endDate.getMonth() - now.getMonth());
    
    if (monthsRemaining < 0) return 'status-expired';
    if (monthsRemaining <= 6) return 'status-expiring';
    if (monthsRemaining <= 12) return 'status-short';
    return 'status-active';
  }

  getStatusText() {
    if (!this.props.contract.endDate) return 'Sconosciuto';
    
    const endDate = new Date(this.props.contract.endDate);
    const now = new Date();
    const monthsRemaining = (endDate.getFullYear() - now.getFullYear()) * 12 + (endDate.getMonth() - now.getMonth());
    
    if (monthsRemaining < 0) return 'Scaduto';
    if (monthsRemaining <= 6) return 'In scadenza';
    if (monthsRemaining <= 12) return 'Breve termine';
    return 'Attivo';
  }

  getTimeRemaining() {
    if (!this.props.contract.endDate) return 'N/A';
    
    const endDate = new Date(this.props.contract.endDate);
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Scaduto';
    if (diffDays === 0) return 'Scade oggi';
    if (diffDays === 1) return '1 giorno';
    if (diffDays < 30) return `${diffDays} giorni`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 mese';
    if (diffMonths < 12) return `${diffMonths} mesi`;
    
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    
    if (diffYears === 1 && remainingMonths === 0) return '1 anno';
    if (remainingMonths === 0) return `${diffYears} anni`;
    return `${diffYears} anni e ${remainingMonths} mesi`;
  }

  calculateTotalCost() {
    if (!this.props.contract) return '0';
    
    const weeklyWage = this.props.contract.weeklyWage || 0;
    const duration = this.props.contract.duration || 0;
    const signingBonus = this.props.contract.signingBonus || 0;
    
    const totalWages = weeklyWage * 52 * duration;
    const totalCost = totalWages + signingBonus;
    
    return this.formatCurrency(totalCost);
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toLocaleString();
  }

  setContract(contract) {
    this.props.contract = contract;
    this.editMode = false;
    this.render();
    this.bindEvents();
  }

  getContract() {
    return this.props.contract;
  }

  setPlayer(player) {
    this.props.player = player;
    this.render();
    this.bindEvents();
  }

  setClub(club) {
    this.props.club = club;
    this.render();
    this.bindEvents();
  }
}