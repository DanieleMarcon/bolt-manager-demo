<div class="hire-staff-modal modal" role="dialog" aria-labelledby="hire-staff-title" aria-modal="true">
  <div class="modal-overlay" aria-hidden="true"></div>
  
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="hire-staff-title" class="modal-title">Assumi Nuovo Staff</h2>
      <button class="modal-close-btn" aria-label="Chiudi">
        ✕
      </button>
    </div>
    
    <div class="modal-body">
      <div class="staff-filters">
        <div class="filter-group">
          <label for="roleFilter" class="filter-label">Ruolo</label>
          <select id="roleFilter" class="filter-select" aria-label="Filtra per ruolo">
            <option value="">Tutti i ruoli</option>
            <option value="coach">Allenatore</option>
            <option value="fitness">Preparatore Atletico</option>
            <option value="scout">Osservatore</option>
            <option value="doctor">Medico</option>
            <option value="analyst">Analista</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="ratingFilter" class="filter-label">Rating Minimo</label>
          <select id="ratingFilter" class="filter-select" aria-label="Filtra per rating minimo">
            <option value="0">Qualsiasi</option>
            <option value="60">60+</option>
            <option value="70">70+</option>
            <option value="80">80+</option>
            <option value="90">90+</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="specialtyFilter" class="filter-label">Specialità</label>
          <select id="specialtyFilter" class="filter-select" aria-label="Filtra per specialità">
            <option value="">Tutte le specialità</option>
            <option value="youth">Giovani</option>
            <option value="tactics">Tattica</option>
            <option value="mental">Mentale</option>
            <option value="injury">Infortuni</option>
          </select>
        </div>
        
        <button class="filter-btn apply-filters-btn" aria-label="Applica filtri">
          🔍 Filtra
        </button>
      </div>
      
      <div class="staff-candidates">
        <div class="candidates-header">
          <h3>Candidati Disponibili</h3>
          <div class="budget-info">
            <span class="budget-label">Budget Disponibile:</span>
            <span class="budget-value">€0</span>
          </div>
        </div>
        
        <div class="candidates-list">
          <!-- Candidates will be populated dynamically -->
        </div>
        
        <div class="empty-state" style="display: none;">
          <div class="empty-icon">👥</div>
          <h4>Nessun Candidato Trovato</h4>
          <p>Prova a modificare i filtri di ricerca</p>
        </div>
        
        <div class="loading-state" style="display: none;">
          <div class="loading-spinner"></div>
          <span>Ricerca candidati...</span>
        </div>
      </div>
      
      <div class="candidate-details" style="display: none;">
        <div class="details-header">
          <h3>Dettagli Candidato</h3>
          <button class="back-to-list-btn" aria-label="Torna alla lista">
            ← Indietro
          </button>
        </div>
        
        <div class="candidate-profile">
          <div class="profile-header">
            <div class="candidate-avatar">
              <img src="" alt="Candidate photo" class="candidate-photo" loading="lazy">
            </div>
            <div class="candidate-info">
              <h4 class="candidate-name"></h4>
              <div class="candidate-meta">
                <span class="candidate-role"></span>
                <span class="candidate-age"></span>
                <span class="candidate-nationality"></span>
              </div>
            </div>
            <div class="candidate-rating">
              <div class="rating-circle">
                <span class="rating-value"></span>
              </div>
              <span class="rating-label">Rating</span>
            </div>
          </div>
          
          <div class="candidate-attributes">
            <div class="attributes-grid">
              <div class="attribute-item">
                <span class="attribute-name">Coaching</span>
                <div class="attribute-bar">
                  <div class="attribute-fill coaching-fill"></div>
                </div>
                <span class="attribute-value coaching-value">0</span>
              </div>
              
              <div class="attribute-item">
                <span class="attribute-name">Fitness</span>
                <div class="attribute-bar">
                  <div class="attribute-fill fitness-fill"></div>
                </div>
                <span class="attribute-value fitness-value">0</span>
              </div>
              
              <div class="attribute-item">
                <span class="attribute-name">Tattica</span>
                <div class="attribute-bar">
                  <div class="attribute-fill tactical-fill"></div>
                </div>
                <span class="attribute-value tactical-value">0</span>
              </div>
              
              <div class="attribute-item">
                <span class="attribute-name">Mentale</span>
                <div class="attribute-bar">
                  <div class="attribute-fill mental-fill"></div>
                </div>
                <span class="attribute-value mental-value">0</span>
              </div>
              
              <div class="attribute-item">
                <span class="attribute-name">Medico</span>
                <div class="attribute-bar">
                  <div class="attribute-fill medical-fill"></div>
                </div>
                <span class="attribute-value medical-value">0</span>
              </div>
              
              <div class="attribute-item">
                <span class="attribute-name">Scouting</span>
                <div class="attribute-bar">
                  <div class="attribute-fill scouting-fill"></div>
                </div>
                <span class="attribute-value scouting-value">0</span>
              </div>
            </div>
          </div>
          
          <div class="candidate-specialties">
            <h5>Specialità</h5>
            <div class="specialties-list">
              <!-- Specialties will be populated dynamically -->
            </div>
          </div>
          
          <div class="contract-offer">
            <h5>Offerta Contrattuale</h5>
            <div class="offer-form">
              <div class="form-group">
                <label for="contractLength" class="form-label">Durata Contratto</label>
                <select id="contractLength" class="form-select" aria-label="Durata contratto">
                  <option value="1">1 anno</option>
                  <option value="2" selected>2 anni</option>
                  <option value="3">3 anni</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="salaryCost" class="form-label">Stipendio Annuale</label>
                <div class="amount-input">
                  <span class="currency-symbol">€</span>
                  <input type="number" id="salaryCost" class="form-input" min="0" step="1000" aria-label="Stipendio annuale">
                </div>
              </div>
              
              <div class="form-group">
                <label for="signingBonus" class="form-label">Bonus alla Firma</label>
                <div class="amount-input">
                  <span class="currency-symbol">€</span>
                  <input type="number" id="signingBonus" class="form-input" min="0" step="1000" aria-label="Bonus alla firma">
                </div>
              </div>
            </div>
            
            <div class="offer-summary">
              <div class="summary-item">
                <span class="summary-label">Costo Totale:</span>
                <span class="summary-value total-cost">€0</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Probabilità Accettazione:</span>
                <div class="acceptance-meter">
                  <div class="meter-fill"></div>
                  <span class="meter-value">0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <div class="footer-actions candidate-list-actions">
        <button class="button button-ghost cancel-btn">
          Annulla
        </button>
        <button class="button button-primary refresh-btn">
          ↻ Aggiorna Candidati
        </button>
      </div>
      
      <div class="footer-actions candidate-detail-actions" style="display: none;">
        <button class="button button-ghost back-btn">
          ← Indietro
        </button>
        <button class="button button-secondary negotiate-btn">
          🤝 Negozia
        </button>
        <button class="button button-primary hire-btn">
          ✓ Assumi
        </button>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-modal">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Hire Staff Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.hire-staff-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.hire-staff-modal.active {
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

.staff-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 6px;
}

.filter-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  font-size: 13px;
  cursor: pointer;
}

.filter-btn {
  align-self: flex-end;
  padding: 8px 16px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.staff-candidates {
  margin-bottom: 20px;
}

.candidates-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.candidates-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.budget-info {
  font-size: 14px;
  color: var(--text);
}

.budget-label {
  font-weight: 500;
  margin-right: 4px;
}

.budget-value {
  font-weight: 600;
  color: var(--success);
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.candidate-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.candidate-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--primary);
}

.candidate-avatar-small {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.candidate-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-info-small {
  flex: 1;
}

.candidate-name-small {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.candidate-meta-small {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.candidate-role-small {
  color: var(--primary);
  font-weight: 500;
}

.candidate-stats-small {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 80px;
}

.stat-row-small {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

.stat-label-small {
  color: var(--text-muted);
}

.stat-value-small {
  font-weight: 600;
  color: var(--text);
}

.candidate-cost {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  min-width: 80px;
  text-align: right;
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

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.candidate-details {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.details-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.back-to-list-btn {
  padding: 6px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.back-to-list-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.candidate-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--border);
  flex-shrink: 0;
}

.candidate-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-info {
  flex: 1;
}

.candidate-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.candidate-meta {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: var(--text-muted);
}

.candidate-role {
  color: var(--primary);
  font-weight: 500;
}

.candidate-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rating-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

.rating-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.candidate-attributes {
  margin-bottom: 20px;
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.attribute-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.attribute-name {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 60px;
  font-weight: 500;
}

.attribute-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.attribute-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.coaching-fill {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.fitness-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.tactical-fill {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.mental-fill {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.medical-fill {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.scouting-fill {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
}

.attribute-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 20px;
  text-align: right;
}

.candidate-specialties {
  margin-bottom: 20px;
}

.candidate-specialties h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.specialties-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.specialty-tag {
  padding: 4px 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
}

.contract-offer {
  background: var(--surface);
  border-radius: 8px;
  padding: 16px;
}

.contract-offer h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.offer-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.form-select,
.form-input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  font-size: 13px;
}

.amount-input {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--text-muted);
}

.amount-input .form-input {
  padding-left: 24px;
}

.offer-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.summary-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.acceptance-meter {
  width: 100px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 4px;
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

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--background);
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sponsor-slot-modal {
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
  
  .staff-filters {
    flex-direction: column;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .candidate-rating {
    margin-top: 8px;
  }
  
  .attributes-grid {
    grid-template-columns: 1fr;
  }
  
  .offer-form {
    grid-template-columns: 1fr;
  }
  
  .offer-summary {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .footer-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-modal {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class HireStaffModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onHire: null,
      staffBudget: 1000000,
      ...options
    };
    
    this.candidates = [];
    this.filteredCandidates = [];
    this.selectedCandidate = null;
    this.isVisible = false;
    
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
    
    // Apply filters button
    this.element.querySelector('.apply-filters-btn').addEventListener('click', () => {
      this.applyFilters();
    });
    
    // Back to list button
    this.element.querySelector('.back-to-list-btn').addEventListener('click', () => {
      this.showCandidateList();
    });
    
    // Back button in footer
    this.element.querySelector('.back-btn').addEventListener('click', () => {
      this.showCandidateList();
    });
    
    // Cancel button
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.hide();
    });
    
    // Refresh button
    this.element.querySelector('.refresh-btn').addEventListener('click', () => {
      this.refreshCandidates();
    });
    
    // Negotiate button
    this.element.querySelector('.negotiate-btn').addEventListener('click', () => {
      this.negotiateContract();
    });
    
    // Hire button
    this.element.querySelector('.hire-btn').addEventListener('click', () => {
      this.hireCandidate();
    });
    
    // Contract form inputs
    this.element.querySelector('#contractLength').addEventListener('change', () => {
      this.updateOfferSummary();
    });
    
    this.element.querySelector('#salaryCost').addEventListener('input', () => {
      this.updateOfferSummary();
    });
    
    this.element.querySelector('#signingBonus').addEventListener('input', () => {
      this.updateOfferSummary();
    });
    
    // Candidate list delegation
    this.element.querySelector('.candidates-list').addEventListener('click', (e) => {
      const candidateItem = e.target.closest('.candidate-item');
      if (candidateItem) {
        const candidateId = parseInt(candidateItem.dataset.candidateId);
        this.selectCandidate(candidateId);
      }
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        if (this.selectedCandidate) {
          this.showCandidateList();
        } else {
          this.hide();
        }
      }
    });
  }
  
  setupAccessibility() {
    // Focus trap
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
    });
  }
  
  show() {
    this.element.classList.add('active');
    this.isVisible = true;
    
    // Focus management
    this.element.querySelector('.modal-close-btn').focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Load candidates
    this.loadCandidates();
    
    // Update budget display
    this.element.querySelector('.budget-value').textContent = this.formatCurrency(this.options.staffBudget);
    
    // Dispatch show event
    this.element.dispatchEvent(new CustomEvent('modalShow'));
  }
  
  hide() {
    this.element.classList.remove('active');
    this.isVisible = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Reset state
    this.selectedCandidate = null;
    this.showCandidateList();
    
    // Dispatch hide event
    this.element.dispatchEvent(new CustomEvent('modalHide'));
  }
  
  async loadCandidates() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from game state
      this.candidates = await this.fetchCandidates();
      this.filteredCandidates = [...this.candidates];
      this.renderCandidates();
    } catch (error) {
      console.error('Error loading candidates:', error);
      this.showError('Errore nel caricamento dei candidati');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchCandidates() {
    // Mock data - in real app this would come from game state
    return [
      {
        id: 1,
        name: 'Marco Rossi',
        role: 'coach',
        roleDisplay: 'Allenatore',
        age: 45,
        nationality: 'Italia',
        rating: 82,
        salary: 120000,
        attributes: {
          coaching: 85,
          fitness: 70,
          tactical: 80,
          mental: 75,
          medical: 50,
          scouting: 60
        },
        specialties: ['Tattica', 'Giovani'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        role: 'fitness',
        roleDisplay: 'Preparatore Atletico',
        age: 38,
        nationality: 'Italia',
        rating: 78,
        salary: 90000,
        attributes: {
          coaching: 65,
          fitness: 85,
          tactical: 60,
          mental: 70,
          medical: 75,
          scouting: 50
        },
        specialties: ['Recupero Infortuni'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        role: 'scout',
        roleDisplay: 'Osservatore',
        age: 42,
        nationality: 'Italia',
        rating: 75,
        salary: 80000,
        attributes: {
          coaching: 55,
          fitness: 50,
          tactical: 70,
          mental: 65,
          medical: 40,
          scouting: 85
        },
        specialties: ['Talenti Internazionali'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      }
    ];
  }
  
  renderCandidates() {
    const candidatesList = this.element.querySelector('.candidates-list');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing candidates
    candidatesList.innerHTML = '';
    
    // Show empty state if no candidates
    if (this.filteredCandidates.length === 0) {
      candidatesList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show candidates
    candidatesList.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // Render candidates
    this.filteredCandidates.forEach(candidate => {
      const candidateElement = this.createCandidateElement(candidate);
      candidatesList.appendChild(candidateElement);
    });
  }
  
  createCandidateElement(candidate) {
    const element = document.createElement('div');
    element.className = 'candidate-item';
    element.dataset.candidateId = candidate.id;
    
    element.innerHTML = `
      <div class="candidate-avatar-small">
        <img src="${candidate.photo}" alt="Foto di ${candidate.name}" loading="lazy">
      </div>
      <div class="candidate-info-small">
        <div class="candidate-name-small">${candidate.name}</div>
        <div class="candidate-meta-small">
          <span class="candidate-role-small">${candidate.roleDisplay}</span>
          <span>${candidate.age} anni</span>
          <span>${candidate.nationality}</span>
        </div>
      </div>
      <div class="candidate-stats-small">
        <div class="stat-row-small">
          <span class="stat-label-small">Rating:</span>
          <span class="stat-value-small">${candidate.rating}</span>
        </div>
        <div class="stat-row-small">
          <span class="stat-label-small">${this.getPrimaryAttribute(candidate)}:</span>
          <span class="stat-value-small">${this.getPrimaryAttributeValue(candidate)}</span>
        </div>
      </div>
      <div class="candidate-cost">${this.formatCurrency(candidate.salary)}/anno</div>
    `;
    
    return element;
  }
  
  getPrimaryAttribute(candidate) {
    switch (candidate.role) {
      case 'coach':
        return 'Coaching';
      case 'fitness':
        return 'Fitness';
      case 'scout':
        return 'Scouting';
      case 'doctor':
        return 'Medico';
      case 'analyst':
        return 'Tattica';
      default:
        return 'Rating';
    }
  }
  
  getPrimaryAttributeValue(candidate) {
    switch (candidate.role) {
      case 'coach':
        return candidate.attributes.coaching;
      case 'fitness':
        return candidate.attributes.fitness;
      case 'scout':
        return candidate.attributes.scouting;
      case 'doctor':
        return candidate.attributes.medical;
      case 'analyst':
        return candidate.attributes.tactical;
      default:
        return candidate.rating;
    }
  }
  
  applyFilters() {
    const roleFilter = this.element.querySelector('#roleFilter').value;
    const ratingFilter = parseInt(this.element.querySelector('#ratingFilter').value);
    const specialtyFilter = this.element.querySelector('#specialtyFilter').value;
    
    this.filteredCandidates = this.candidates.filter(candidate => {
      // Role filter
      if (roleFilter && candidate.role !== roleFilter) {
        return false;
      }
      
      // Rating filter
      if (ratingFilter > 0 && candidate.rating < ratingFilter) {
        return false;
      }
      
      // Specialty filter
      if (specialtyFilter && !candidate.specialties.some(s => s.toLowerCase().includes(specialtyFilter))) {
        return false;
      }
      
      return true;
    });
    
    this.renderCandidates();
  }
  
  selectCandidate(candidateId) {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (!candidate) return;
    
    this.selectedCandidate = candidate;
    this.showCandidateDetails();
  }
  
  showCandidateDetails() {
    // Hide candidate list
    this.element.querySelector('.staff-candidates').style.display = 'none';
    this.element.querySelector('.candidate-list-actions').style.display = 'none';
    
    // Show candidate details
    this.element.querySelector('.candidate-details').style.display = 'block';
    this.element.querySelector('.candidate-detail-actions').style.display = 'flex';
    
    // Update candidate details
    this.updateCandidateDetails();
  }
  
  showCandidateList() {
    // Hide candidate details
    this.element.querySelector('.candidate-details').style.display = 'none';
    this.element.querySelector('.candidate-detail-actions').style.display = 'none';
    
    // Show candidate list
    this.element.querySelector('.staff-candidates').style.display = 'block';
    this.element.querySelector('.candidate-list-actions').style.display = 'flex';
    
    // Reset selected candidate
    this.selectedCandidate = null;
  }
  
  updateCandidateDetails() {
    if (!this.selectedCandidate) return;
    
    const candidate = this.selectedCandidate;
    
    // Update basic info
    this.element.querySelector('.candidate-photo').src = candidate.photo;
    this.element.querySelector('.candidate-name').textContent = candidate.name;
    this.element.querySelector('.candidate-role').textContent = candidate.roleDisplay;
    this.element.querySelector('.candidate-age').textContent = `${candidate.age} anni`;
    this.element.querySelector('.candidate-nationality').textContent = candidate.nationality;
    this.element.querySelector('.rating-value').textContent = candidate.rating;
    
    // Update attributes
    Object.entries(candidate.attributes).forEach(([key, value]) => {
      const fill = this.element.querySelector(`.${key}-fill`);
      const valueElement = this.element.querySelector(`.${key}-value`);
      
      if (fill) fill.style.width = `${value}%`;
      if (valueElement) valueElement.textContent = value;
    });
    
    // Update specialties
    const specialtiesList = this.element.querySelector('.specialties-list');
    specialtiesList.innerHTML = '';
    
    if (candidate.specialties.length === 0) {
      const emptyTag = document.createElement('div');
      emptyTag.className = 'specialty-tag';
      emptyTag.textContent = 'Nessuna specialità';
      specialtiesList.appendChild(emptyTag);
    } else {
      candidate.specialties.forEach(specialty => {
        const tag = document.createElement('div');
        tag.className = 'specialty-tag';
        tag.textContent = specialty;
        specialtiesList.appendChild(tag);
      });
    }
    
    // Set default contract values
    this.element.querySelector('#salaryCost').value = candidate.salary;
    this.element.querySelector('#signingBonus').value = 0;
    
    // Update offer summary
    this.updateOfferSummary();
  }
  
  updateOfferSummary() {
    if (!this.selectedCandidate) return;
    
    const contractLength = parseInt(this.element.querySelector('#contractLength').value);
    const salaryCost = parseInt(this.element.querySelector('#salaryCost').value) || 0;
    const signingBonus = parseInt(this.element.querySelector('#signingBonus').value) || 0;
    
    // Calculate total cost
    const totalCost = (salaryCost * contractLength) + signingBonus;
    this.element.querySelector('.total-cost').textContent = this.formatCurrency(totalCost);
    
    // Calculate acceptance probability
    const baseSalary = this.selectedCandidate.salary;
    let acceptanceProbability = 0;
    
    if (salaryCost >= baseSalary * 1.2) {
      acceptanceProbability = 90; // Very likely to accept
    } else if (salaryCost >= baseSalary) {
      acceptanceProbability = 70; // Likely to accept
    } else if (salaryCost >= baseSalary * 0.8) {
      acceptanceProbability = 50; // 50/50 chance
    } else if (salaryCost >= baseSalary * 0.6) {
      acceptanceProbability = 30; // Unlikely to accept
    } else {
      acceptanceProbability = 10; // Very unlikely to accept
    }
    
    // Bonus increases probability
    if (signingBonus > 0) {
      acceptanceProbability += Math.min(20, signingBonus / 1000);
    }
    
    // Cap at 100%
    acceptanceProbability = Math.min(100, acceptanceProbability);
    
    // Update meter
    const meterFill = this.element.querySelector('.meter-fill');
    const meterValue = this.element.querySelector('.meter-value');
    
    meterFill.style.width = `${acceptanceProbability}%`;
    meterValue.textContent = `${Math.round(acceptanceProbability)}%`;
  }
  
  refreshCandidates() {
    this.loadCandidates();
    this.showSuccess('Candidati aggiornati');
  }
  
  negotiateContract() {
    // In a real app, this would open a negotiation dialog
    // For now, we'll just increase the acceptance probability
    
    const currentSalary = parseInt(this.element.querySelector('#salaryCost').value) || 0;
    const suggestedSalary = Math.round(currentSalary * 1.1); // 10% increase
    
    this.element.querySelector('#salaryCost').value = suggestedSalary;
    this.updateOfferSummary();
    
    this.showSuccess('Negoziazione avviata');
  }
  
  hireCandidate() {
    if (!this.selectedCandidate) return;
    
    const contractLength = parseInt(this.element.querySelector('#contractLength').value);
    const salaryCost = parseInt(this.element.querySelector('#salaryCost').value) || 0;
    const signingBonus = parseInt(this.element.querySelector('#signingBonus').value) || 0;
    
    // Check if we have enough budget
    const totalCost = (salaryCost * contractLength) + signingBonus;
    if (totalCost > this.options.staffBudget) {
      this.showError('Budget insufficiente per questa assunzione');
      return;
    }
    
    // Prepare hire data
    const hireData = {
      candidateId: this.selectedCandidate.id,
      candidate: this.selectedCandidate,
      contract: {
        length: contractLength,
        salary: salaryCost,
        signingBonus: signingBonus,
        totalCost: totalCost
      }
    };
    
    // Call hire callback if provided
    if (typeof this.options.onHire === 'function') {
      this.options.onHire(hireData);
    }
    
    // Dispatch hire event
    this.element.dispatchEvent(new CustomEvent('staffHired', {
      detail: hireData
    }));
    
    this.showSuccess(`${this.selectedCandidate.name} assunto con successo!`);
    this.hide();
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.candidates-list').style.display = show ? 'none' : 'flex';
    this.element.querySelector('.empty-state').style.display = 'none';
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
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
  
  getSelectedCandidate() {
    return this.selectedCandidate;
  }
  
  getCandidates() {
    return [...this.candidates];
  }
  
  setStaffBudget(budget) {
    this.options.staffBudget = budget;
    if (this.isVisible) {
      this.element.querySelector('.budget-value').textContent = this.formatCurrency(budget);
    }
  }
}

// Auto-initialize hire staff modals
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hire-staff-modal').forEach(modal => {
    if (!modal.dataset.initialized) {
      const options = JSON.parse(modal.dataset.options || '{}');
      new HireStaffModal(modal, options);
      modal.dataset.initialized = 'true';
    }
  });
});

// Global function to show hire staff modal
window.showHireStaffModal = function(options = {}) {
  const modal = document.querySelector('.hire-staff-modal');
  if (modal) {
    const instance = modal.hireStaffModal || 
                    new HireStaffModal(modal, options);
    modal.hireStaffModal = instance;
    instance.show();
  }
};
</script>