<div class="set-piece-manager">
  <div class="manager-header">
    <h3 class="section-title">Gestione Calci Piazzati</h3>
    <div class="header-actions">
      <button class="action-btn copy-formation-btn" aria-label="Copia da formazione principale">
        📋 Copia Formazione
      </button>
      <button class="action-btn save-setpieces-btn" aria-label="Salva calci piazzati">
        💾 Salva
      </button>
    </div>
  </div>
  
  <div class="setpiece-tabs">
    <button class="tab-btn active" data-tab="corners" aria-label="Gestione corner">
      ⚽ Corner
    </button>
    <button class="tab-btn" data-tab="freekicks" aria-label="Gestione punizioni">
      🎯 Punizioni
    </button>
    <button class="tab-btn" data-tab="penalties" aria-label="Gestione rigori">
      🥅 Rigori
    </button>
    <button class="tab-btn" data-tab="throwins" aria-label="Gestione rimesse laterali">
      🤾 Rimesse
    </button>
  </div>
  
  <div class="setpiece-content">
    <!-- Corner Tab -->
    <div class="tab-panel active" id="corners-panel">
      <div class="setpiece-section">
        <h4>Corner Offensivi</h4>
        <div class="corner-setup">
          <div class="corner-field">
            <svg class="corner-diagram" viewBox="0 0 300 200" role="img" aria-label="Diagramma corner">
              <!-- Corner area -->
              <rect class="field-area" x="0" y="0" width="300" height="200" fill="#2d5a27"/>
              <rect class="penalty-area" x="0" y="50" width="120" height="100" fill="none" stroke="white" stroke-width="2"/>
              <rect class="goal-area" x="0" y="80" width="40" height="40" fill="none" stroke="white" stroke-width="2"/>
              <rect class="goal" x="-5" y="90" width="5" height="20" fill="white"/>
              
              <!-- Corner arc -->
              <path class="corner-arc" d="M 0 0 A 10 10 0 0 1 10 0" fill="none" stroke="white" stroke-width="2"/>
              
              <!-- Player positions will be added here -->
            </svg>
            
            <div class="corner-positions">
              <!-- Corner positions will be rendered here -->
            </div>
          </div>
          
          <div class="corner-controls">
            <div class="role-assignments">
              <h5>Assegnazione Ruoli</h5>
              
              <div class="role-item">
                <label class="role-label">Battitore:</label>
                <select class="player-selector corner-taker" aria-label="Seleziona battitore corner">
                  <option value="">Seleziona giocatore</option>
                </select>
              </div>
              
              <div class="role-item">
                <label class="role-label">Primo Palo:</label>
                <select class="player-selector near-post" aria-label="Seleziona giocatore primo palo">
                  <option value="">Seleziona giocatore</option>
                </select>
              </div>
              
              <div class="role-item">
                <label class="role-label">Secondo Palo:</label>
                <select class="player-selector far-post" aria-label="Seleziona giocatore secondo palo">
                  <option value="">Seleziona giocatore</option>
                </select>
              </div>
              
              <div class="role-item">
                <label class="role-label">Centro Area:</label>
                <select class="player-selector center-area" aria-label="Seleziona giocatore centro area">
                  <option value="">Seleziona giocatore</option>
                </select>
              </div>
              
              <div class="role-item">
                <label class="role-label">Supporto:</label>
                <select class="player-selector support" aria-label="Seleziona giocatore supporto">
                  <option value="">Seleziona giocatore</option>
                </select>
              </div>
            </div>
            
            <div class="corner-strategy">
              <h5>Strategia</h5>
              <div class="strategy-options">
                <label class="strategy-option">
                  <input type="radio" name="corner-strategy" value="direct" checked>
                  <span>Cross Diretto</span>
                </label>
                <label class="strategy-option">
                  <input type="radio" name="corner-strategy" value="short">
                  <span>Corner Corto</span>
                </label>
                <label class="strategy-option">
                  <input type="radio" name="corner-strategy" value="mixed">
                  <span>Misto</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Free Kicks Tab -->
    <div class="tab-panel" id="freekicks-panel">
      <div class="setpiece-section">
        <h4>Punizioni Dirette</h4>
        <div class="freekick-setup">
          <div class="distance-ranges">
            <div class="range-item">
              <h5>Vicino alla Porta (0-25m)</h5>
              <div class="role-assignments">
                <div class="role-item">
                  <label class="role-label">Battitore Principale:</label>
                  <select class="player-selector fk-close-primary" aria-label="Battitore punizioni vicine">
                    <option value="">Seleziona giocatore</option>
                  </select>
                </div>
                <div class="role-item">
                  <label class="role-label">Battitore Alternativo:</label>
                  <select class="player-selector fk-close-secondary" aria-label="Battitore alternativo punizioni vicine">
                    <option value="">Seleziona giocatore</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="range-item">
              <h5>Lontano dalla Porta (25m+)</h5>
              <div class="role-assignments">
                <div class="role-item">
                  <label class="role-label">Battitore Principale:</label>
                  <select class="player-selector fk-far-primary" aria-label="Battitore punizioni lontane">
                    <option value="">Seleziona giocatore</option>
                  </select>
                </div>
                <div class="role-item">
                  <label class="role-label">Battitore Alternativo:</label>
                  <select class="player-selector fk-far-secondary" aria-label="Battitore alternativo punizioni lontane">
                    <option value="">Seleziona giocatore</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Penalties Tab -->
    <div class="tab-panel" id="penalties-panel">
      <div class="setpiece-section">
        <h4>Rigoristi</h4>
        <div class="penalty-setup">
          <div class="penalty-order">
            <h5>Ordine di Battuta</h5>
            <div class="penalty-list">
              <div class="penalty-item" data-order="1">
                <span class="order-number">1°</span>
                <select class="player-selector penalty-taker-1" aria-label="Primo rigorista">
                  <option value="">Seleziona giocatore</option>
                </select>
                <button class="remove-penalty-btn" aria-label="Rimuovi rigorista">✕</button>
              </div>
              
              <div class="penalty-item" data-order="2">
                <span class="order-number">2°</span>
                <select class="player-selector penalty-taker-2" aria-label="Secondo rigorista">
                  <option value="">Seleziona giocatore</option>
                </select>
                <button class="remove-penalty-btn" aria-label="Rimuovi rigorista">✕</button>
              </div>
              
              <div class="penalty-item" data-order="3">
                <span class="order-number">3°</span>
                <select class="player-selector penalty-taker-3" aria-label="Terzo rigorista">
                  <option value="">Seleziona giocatore</option>
                </select>
                <button class="remove-penalty-btn" aria-label="Rimuovi rigorista">✕</button>
              </div>
            </div>
            
            <button class="add-penalty-btn button button-ghost" aria-label="Aggiungi rigorista">
              + Aggiungi Rigorista
            </button>
          </div>
          
          <div class="penalty-stats">
            <h5>Statistiche Rigori</h5>
            <div class="stats-list">
              <!-- Stats will be populated dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Throw-ins Tab -->
    <div class="tab-panel" id="throwins-panel">
      <div class="setpiece-section">
        <h4>Rimesse Laterali</h4>
        <div class="throwin-setup">
          <div class="throwin-roles">
            <div class="role-item">
              <label class="role-label">Rimesse Difensive:</label>
              <select class="player-selector throwin-defensive" aria-label="Rimesse laterali difensive">
                <option value="">Seleziona giocatore</option>
              </select>
            </div>
            
            <div class="role-item">
              <label class="role-label">Rimesse Offensive:</label>
              <select class="player-selector throwin-offensive" aria-label="Rimesse laterali offensive">
                <option value="">Seleziona giocatore</option>
              </select>
            </div>
            
            <div class="role-item">
              <label class="role-label">Rimesse Lunghe:</label>
              <select class="player-selector throwin-long" aria-label="Rimesse laterali lunghe">
                <option value="">Seleziona giocatore</option>
              </select>
            </div>
          </div>
          
          <div class="throwin-strategy">
            <h5>Strategia Rimesse</h5>
            <div class="strategy-options">
              <label class="strategy-option">
                <input type="radio" name="throwin-strategy" value="short" checked>
                <span>Passaggi Corti</span>
              </label>
              <label class="strategy-option">
                <input type="radio" name="throwin-strategy" value="long">
                <span>Lanci Lunghi</span>
              </label>
              <label class="strategy-option">
                <input type="radio" name="throwin-strategy" value="mixed">
                <span>Strategia Mista</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="setpiece-summary">
    <h4>Riepilogo Assegnazioni</h4>
    <div class="summary-grid">
      <div class="summary-item">
        <span class="summary-label">Corner:</span>
        <span class="summary-value corner-summary">Non assegnato</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Punizioni:</span>
        <span class="summary-value freekick-summary">Non assegnato</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Rigori:</span>
        <span class="summary-value penalty-summary">Non assegnato</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Rimesse:</span>
        <span class="summary-value throwin-summary">Non assegnato</span>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-setpiece">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Set Piece Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.set-piece-manager {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.setpiece-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: var(--background);
  padding: 4px;
  border-radius: 8px;
}

.tab-btn {
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
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

.setpiece-content {
  margin-bottom: 20px;
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.setpiece-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.corner-setup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.corner-field {
  position: relative;
  background: #2d5a27;
  border-radius: 8px;
  overflow: hidden;
}

.corner-diagram {
  width: 100%;
  height: 200px;
  display: block;
}

.corner-positions {
  position: absolute;
  inset: 0;
}

.corner-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.role-assignments h5,
.corner-strategy h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.role-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.role-label {
  font-size: 12px;
  color: var(--text);
  min-width: 100px;
  font-weight: 500;
}

.player-selector {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.strategy-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.strategy-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
}

.strategy-option input[type="radio"] {
  margin: 0;
}

.freekick-setup {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.distance-ranges {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.range-item {
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
}

.range-item h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.penalty-setup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.penalty-order h5,
.penalty-stats h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.penalty-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.penalty-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--background);
  border-radius: 6px;
}

.order-number {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  min-width: 20px;
}

.remove-penalty-btn {
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
}

.remove-penalty-btn:hover {
  background: var(--error);
  color: white;
}

.add-penalty-btn {
  padding: 8px 12px;
  font-size: 12px;
}

.penalty-stats {
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.stat-name {
  color: var(--text);
}

.stat-percentage {
  font-weight: 600;
  color: var(--primary);
}

.throwin-setup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.throwin-roles,
.throwin-strategy {
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
}

.throwin-roles h5,
.throwin-strategy h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.setpiece-summary {
  background: var(--background);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.setpiece-summary h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: var(--surface);
  border-radius: 4px;
}

.summary-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.summary-value {
  font-size: 12px;
  color: var(--text);
  font-weight: 600;
}

.sponsor-slot-setpiece {
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
  .corner-setup,
  .distance-ranges,
  .penalty-setup,
  .throwin-setup {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .manager-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .setpiece-tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    text-align: center;
  }
  
  .role-item {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
  
  .role-label {
    min-width: auto;
  }
  
  .sponsor-slot-setpiece {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class SetPieceManager {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoSave: false,
      showStats: true,
      ...options
    };
    
    this.players = [];
    this.assignments = {
      corners: {
        taker: null,
        nearPost: null,
        farPost: null,
        centerArea: null,
        support: null,
        strategy: 'direct'
      },
      freekicks: {
        closePrimary: null,
        closeSecondary: null,
        farPrimary: null,
        farSecondary: null
      },
      penalties: {
        takers: []
      },
      throwins: {
        defensive: null,
        offensive: null,
        long: null,
        strategy: 'short'
      }
    };
    
    this.currentTab = 'corners';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadPlayers();
    this.populatePlayerSelectors();
    this.updateSummary();
  }
  
  bindEvents() {
    // Tab navigation
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });
    
    // Header actions
    this.element.querySelector('.copy-formation-btn').addEventListener('click', () => {
      this.copyFromFormation();
    });
    
    this.element.querySelector('.save-setpieces-btn').addEventListener('click', () => {
      this.saveSetPieces();
    });
    
    // Player selectors
    this.element.querySelectorAll('.player-selector').forEach(selector => {
      selector.addEventListener('change', (e) => {
        this.handlePlayerAssignment(e.target);
      });
    });
    
    // Strategy options
    this.element.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.handleStrategyChange(e.target);
      });
    });
    
    // Penalty management
    this.element.querySelector('.add-penalty-btn').addEventListener('click', () => {
      this.addPenaltyTaker();
    });
    
    this.element.querySelectorAll('.remove-penalty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.removePenaltyTaker(e.target.closest('.penalty-item'));
      });
    });
  }
  
  switchTab(tabName) {
    // Update tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab panels
    this.element.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });
    
    this.currentTab = tabName;
    
    // Load tab-specific data
    this.loadTabData(tabName);
  }
  
  async loadPlayers() {
    try {
      // In a real app, this would fetch from game state
      this.players = await this.fetchAvailablePlayers();
      this.populatePlayerSelectors();
    } catch (error) {
      console.error('Error loading players:', error);
    }
  }
  
  async fetchAvailablePlayers() {
    // Mock data - in real app this would come from game state
    return [
      {
        id: 1,
        name: 'Mario Rossi',
        position: 'MF',
        setpiece_stats: {
          corner_accuracy: 85,
          freekick_accuracy: 78,
          penalty_accuracy: 92,
          throwin_distance: 70
        }
      },
      // Add more players...
    ];
  }
  
  populatePlayerSelectors() {
    this.element.querySelectorAll('.player-selector').forEach(selector => {
      // Clear existing options except first
      while (selector.children.length > 1) {
        selector.removeChild(selector.lastChild);
      }
      
      // Add player options
      this.players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} (${player.position})`;
        selector.appendChild(option);
      });
    });
  }
  
  handlePlayerAssignment(selector) {
    const playerId = selector.value ? parseInt(selector.value) : null;
    const selectorClass = selector.className.split(' ').find(cls => cls !== 'player-selector');
    
    // Update assignments based on selector type
    switch (selectorClass) {
      case 'corner-taker':
        this.assignments.corners.taker = playerId;
        break;
      case 'near-post':
        this.assignments.corners.nearPost = playerId;
        break;
      case 'far-post':
        this.assignments.corners.farPost = playerId;
        break;
      case 'center-area':
        this.assignments.corners.centerArea = playerId;
        break;
      case 'support':
        this.assignments.corners.support = playerId;
        break;
      case 'fk-close-primary':
        this.assignments.freekicks.closePrimary = playerId;
        break;
      case 'fk-close-secondary':
        this.assignments.freekicks.closeSecondary = playerId;
        break;
      case 'fk-far-primary':
        this.assignments.freekicks.farPrimary = playerId;
        break;
      case 'fk-far-secondary':
        this.assignments.freekicks.farSecondary = playerId;
        break;
      case 'throwin-defensive':
        this.assignments.throwins.defensive = playerId;
        break;
      case 'throwin-offensive':
        this.assignments.throwins.offensive = playerId;
        break;
      case 'throwin-long':
        this.assignments.throwins.long = playerId;
        break;
      default:
        if (selectorClass.startsWith('penalty-taker-')) {
          const index = parseInt(selectorClass.split('-')[2]) - 1;
          this.assignments.penalties.takers[index] = playerId;
        }
    }
    
    this.updateSummary();
    this.updateStats();
    
    if (this.options.autoSave) {
      this.saveSetPieces();
    }
    
    // Dispatch assignment event
    this.element.dispatchEvent(new CustomEvent('playerAssigned', {
      detail: {
        type: selectorClass,
        playerId,
        assignments: this.assignments
      }
    }));
  }
  
  handleStrategyChange(radio) {
    const strategyType = radio.name;
    const strategyValue = radio.value;
    
    if (strategyType === 'corner-strategy') {
      this.assignments.corners.strategy = strategyValue;
    } else if (strategyType === 'throwin-strategy') {
      this.assignments.throwins.strategy = strategyValue;
    }
    
    this.updateSummary();
    
    if (this.options.autoSave) {
      this.saveSetPieces();
    }
  }
  
  addPenaltyTaker() {
    const penaltyList = this.element.querySelector('.penalty-list');
    const currentCount = this.assignments.penalties.takers.length;
    const newIndex = currentCount + 1;
    
    if (newIndex > 5) {
      this.showError('Massimo 5 rigoristi');
      return;
    }
    
    const penaltyItem = document.createElement('div');
    penaltyItem.className = 'penalty-item';
    penaltyItem.dataset.order = newIndex;
    
    penaltyItem.innerHTML = `
      <span class="order-number">${newIndex}°</span>
      <select class="player-selector penalty-taker-${newIndex}" aria-label="${newIndex}° rigorista">
        <option value="">Seleziona giocatore</option>
      </select>
      <button class="remove-penalty-btn" aria-label="Rimuovi rigorista">✕</button>
    `;
    
    penaltyList.appendChild(penaltyItem);
    
    // Populate new selector
    const newSelector = penaltyItem.querySelector('.player-selector');
    this.players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id;
      option.textContent = `${player.name} (${player.position})`;
      newSelector.appendChild(option);
    });
    
    // Bind events
    newSelector.addEventListener('change', (e) => {
      this.handlePlayerAssignment(e.target);
    });
    
    penaltyItem.querySelector('.remove-penalty-btn').addEventListener('click', (e) => {
      this.removePenaltyTaker(e.target.closest('.penalty-item'));
    });
    
    // Update assignments array
    this.assignments.penalties.takers.push(null);
  }
  
  removePenaltyTaker(penaltyItem) {
    const order = parseInt(penaltyItem.dataset.order);
    const index = order - 1;
    
    // Remove from assignments
    this.assignments.penalties.takers.splice(index, 1);
    
    // Remove from DOM
    penaltyItem.remove();
    
    // Reorder remaining items
    this.reorderPenaltyTakers();
    
    this.updateSummary();
  }
  
  reorderPenaltyTakers() {
    const penaltyItems = this.element.querySelectorAll('.penalty-item');
    penaltyItems.forEach((item, index) => {
      const newOrder = index + 1;
      item.dataset.order = newOrder;
      item.querySelector('.order-number').textContent = `${newOrder}°`;
      
      const selector = item.querySelector('.player-selector');
      selector.className = `player-selector penalty-taker-${newOrder}`;
      selector.setAttribute('aria-label', `${newOrder}° rigorista`);
    });
  }
  
  updateSummary() {
    // Corner summary
    const cornerTaker = this.getPlayerName(this.assignments.corners.taker);
    this.element.querySelector('.corner-summary').textContent = 
      cornerTaker || 'Non assegnato';
    
    // Freekick summary
    const fkPrimary = this.getPlayerName(this.assignments.freekicks.closePrimary);
    this.element.querySelector('.freekick-summary').textContent = 
      fkPrimary || 'Non assegnato';
    
    // Penalty summary
    const penaltyPrimary = this.getPlayerName(this.assignments.penalties.takers[0]);
    this.element.querySelector('.penalty-summary').textContent = 
      penaltyPrimary || 'Non assegnato';
    
    // Throwin summary
    const throwInPlayer = this.getPlayerName(this.assignments.throwins.offensive);
    this.element.querySelector('.throwin-summary').textContent = 
      throwInPlayer || 'Non assegnato';
  }
  
  updateStats() {
    if (!this.options.showStats) return;
    
    const statsList = this.element.querySelector('.stats-list');
    if (!statsList) return;
    
    statsList.innerHTML = '';
    
    // Show penalty stats for assigned takers
    this.assignments.penalties.takers.forEach((playerId, index) => {
      if (playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player && player.setpiece_stats) {
          const statRow = document.createElement('div');
          statRow.className = 'stat-row';
          statRow.innerHTML = `
            <span class="stat-name">${player.name}</span>
            <span class="stat-percentage">${player.setpiece_stats.penalty_accuracy}%</span>
          `;
          statsList.appendChild(statRow);
        }
      }
    });
  }
  
  getPlayerName(playerId) {
    if (!playerId) return null;
    const player = this.players.find(p => p.id === playerId);
    return player ? player.name : null;
  }
  
  loadTabData(tabName) {
    // Load specific data for the active tab
    switch (tabName) {
      case 'corners':
        this.renderCornerPositions();
        break;
      case 'penalties':
        this.updateStats();
        break;
    }
  }
  
  renderCornerPositions() {
    const positionsContainer = this.element.querySelector('.corner-positions');
    if (!positionsContainer) return;
    
    positionsContainer.innerHTML = '';
    
    // Render assigned players on corner diagram
    const positions = {
      nearPost: { x: 15, y: 85 },
      farPost: { x: 15, y: 115 },
      centerArea: { x: 35, y: 100 },
      support: { x: 80, y: 100 }
    };
    
    Object.entries(positions).forEach(([role, pos]) => {
      const playerId = this.assignments.corners[role];
      if (playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
          const playerDot = document.createElement('div');
          playerDot.className = 'corner-player-dot';
          playerDot.style.position = 'absolute';
          playerDot.style.left = `${pos.x}%`;
          playerDot.style.top = `${pos.y}%`;
          playerDot.style.width = '12px';
          playerDot.style.height = '12px';
          playerDot.style.borderRadius = '50%';
          playerDot.style.background = 'var(--primary)';
          playerDot.style.border = '2px solid white';
          playerDot.style.transform = 'translate(-50%, -50%)';
          playerDot.title = player.name;
          
          positionsContainer.appendChild(playerDot);
        }
      }
    });
  }
  
  copyFromFormation() {
    // Dispatch event to copy from main formation
    this.element.dispatchEvent(new CustomEvent('copyFromFormation', {
      detail: { assignments: this.assignments }
    }));
    
    this.showSuccess('Impostazioni copiate dalla formazione principale');
  }
  
  saveSetPieces() {
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveSetPieces', {
      detail: { assignments: this.assignments }
    }));
    
    this.showSuccess('Calci piazzati salvati');
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
  getAssignments() {
    return { ...this.assignments };
  }
  
  setAssignments(newAssignments) {
    this.assignments = { ...this.assignments, ...newAssignments };
    this.updateAllSelectors();
    this.updateSummary();
    this.updateStats();
  }
  
  updateAllSelectors() {
    // Update all selectors with current assignments
    Object.entries(this.assignments.corners).forEach(([role, playerId]) => {
      const selector = this.element.querySelector(`.${role.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      if (selector && typeof playerId === 'number') {
        selector.value = playerId;
      }
    });
    
    // Update other selectors similarly...
  }
  
  getPlayerStats(playerId) {
    const player = this.players.find(p => p.id === playerId);
    return player ? player.setpiece_stats : null;
  }
  
  validateAssignments() {
    const errors = [];
    
    // Check for duplicate assignments
    const allAssignments = [
      ...Object.values(this.assignments.corners),
      ...Object.values(this.assignments.freekicks),
      ...this.assignments.penalties.takers,
      ...Object.values(this.assignments.throwins)
    ].filter(id => id !== null);
    
    const duplicates = allAssignments.filter((id, index) => 
      allAssignments.indexOf(id) !== index
    );
    
    if (duplicates.length > 0) {
      errors.push('Alcuni giocatori sono assegnati a più ruoli');
    }
    
    return errors;
  }
}

// Auto-initialize set piece managers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.set-piece-manager').forEach(manager => {
    if (!manager.dataset.initialized) {
      const options = JSON.parse(manager.dataset.options || '{}');
      new SetPieceManager(manager, options);
      manager.dataset.initialized = 'true';
    }
  });
});
</script>