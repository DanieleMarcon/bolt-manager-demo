export const template = `
<div class="substitution-panel">
  <div class="panel-header">
    <h3 class="panel-title">Sostituzioni</h3>
    <div class="substitutions-remaining">
      <span class="remaining-count">3</span>
      <span class="remaining-label">Rimaste</span>
    </div>
  </div>
  
  <div class="substitution-content">
    <div class="active-substitutions">
      <h4>Sostituzioni Effettuate</h4>
      <div class="substitutions-list">
        <!-- Active substitutions will be listed here -->
      </div>
    </div>
    
    <div class="substitution-maker">
      <h4>Nuova Sostituzione</h4>
      <div class="substitution-form">
        <div class="player-selection">
          <div class="selection-group">
            <label for="playerOut" class="selection-label">Giocatore da sostituire:</label>
            <select id="playerOut" class="player-selector" aria-label="Seleziona giocatore da sostituire">
              <option value="">Seleziona giocatore in campo</option>
            </select>
          </div>
          
          <div class="substitution-arrow">
            <span class="arrow-icon">🔄</span>
          </div>
          
          <div class="selection-group">
            <label for="playerIn" class="selection-label">Giocatore sostituto:</label>
            <select id="playerIn" class="player-selector" aria-label="Seleziona giocatore sostituto">
              <option value="">Seleziona dalla panchina</option>
            </select>
          </div>
        </div>
        
        <div class="substitution-reason">
          <label for="substitutionReason" class="reason-label">Motivo sostituzione:</label>
          <select id="substitutionReason" class="reason-selector" aria-label="Motivo sostituzione">
            <option value="tactical">Tattico</option>
            <option value="injury">Infortunio</option>
            <option value="fatigue">Stanchezza</option>
            <option value="performance">Performance</option>
            <option value="disciplinary">Disciplinare</option>
          </select>
        </div>
        
        <div class="substitution-timing">
          <label for="substitutionTime" class="timing-label">Minuto sostituzione:</label>
          <input type="number" id="substitutionTime" class="timing-input" 
                 min="1" max="120" placeholder="Auto" aria-label="Minuto sostituzione">
        </div>
        
        <button class="make-substitution-btn button button-primary" disabled>
          Effettua Sostituzione
        </button>
      </div>
    </div>
    
    <div class="substitution-suggestions">
      <h4>Suggerimenti</h4>
      <div class="suggestions-list">
        <div class="suggestion-item">
          <div class="suggestion-icon">💡</div>
          <div class="suggestion-content">
            <div class="suggestion-title">Sostituzione Tattica</div>
            <div class="suggestion-description">
              Sostituisci M. Rossi con L. Bianchi per rinforzare l'attacco
            </div>
          </div>
          <button class="apply-suggestion-btn button button-ghost">
            Applica
          </button>
        </div>
        
        <div class="suggestion-item">
          <div class="suggestion-icon">⚡</div>
          <div class="suggestion-content">
            <div class="suggestion-title">Gestione Energie</div>
            <div class="suggestion-description">
              G. Verdi mostra segni di stanchezza, considera una sostituzione
            </div>
          </div>
          <button class="apply-suggestion-btn button button-ghost">
            Applica
          </button>
        </div>
      </div>
    </div>
    
    <div class="formation-preview">
      <h4>Anteprima Formazione</h4>
      <div class="formation-display">
        <div class="formation-field">
          <svg class="mini-field" viewBox="0 0 200 150" role="img" aria-label="Anteprima formazione">
            <rect class="field-bg" x="0" y="0" width="200" height="150" fill="#2d5a27"/>
            <line class="center-line" x1="0" y1="75" x2="200" y2="75" stroke="white" stroke-width="1"/>
            <circle class="center-circle" cx="100" cy="75" r="20" fill="none" stroke="white" stroke-width="1"/>
            
            <!-- Player positions will be added dynamically -->
          </svg>
        </div>
        
        <div class="formation-changes">
          <div class="change-indicator out">
            <span class="change-icon">↓</span>
            <span class="change-text">Esce</span>
          </div>
          <div class="change-indicator in">
            <span class="change-icon">↑</span>
            <span class="change-text">Entra</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-substitution">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Substitution Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.substitution-panel {
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

.substitutions-remaining {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: var(--primary);
  color: white;
  border-radius: 8px;
}

.remaining-count {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.remaining-label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.9;
}

.substitution-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.active-substitutions,
.substitution-maker,
.substitution-suggestions,
.formation-preview {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.active-substitutions h4,
.substitution-maker h4,
.substitution-suggestions h4,
.formation-preview h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.substitutions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.substitution-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.substitution-time {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  min-width: 30px;
}

.substitution-details {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-out,
.player-in {
  font-size: 12px;
  color: var(--text);
}

.player-out {
  text-decoration: line-through;
  opacity: 0.7;
}

.substitution-arrow-small {
  color: var(--primary);
  font-size: 14px;
}

.substitution-reason-badge {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--warning);
  color: white;
  border-radius: 10px;
  text-transform: uppercase;
}

.substitution-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.player-selection {
  display: flex;
  align-items: center;
  gap: 16px;
}

.selection-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.selection-label {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}

.player-selector {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 13px;
  cursor: pointer;
}

.substitution-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-size: 18px;
  margin-top: 18px;
}

.substitution-reason,
.substitution-timing {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.reason-label,
.timing-label {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}

.reason-selector,
.timing-input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 13px;
}

.timing-input {
  max-width: 100px;
}

.make-substitution-btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  align-self: flex-start;
}

.make-substitution-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.suggestion-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.suggestion-content {
  flex: 1;
}

.suggestion-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.suggestion-description {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.apply-suggestion-btn {
  padding: 6px 12px;
  font-size: 11px;
  white-space: nowrap;
}

.formation-display {
  display: flex;
  gap: 16px;
  align-items: center;
}

.formation-field {
  flex: 1;
  background: #2d5a27;
  border-radius: 6px;
  overflow: hidden;
}

.mini-field {
  width: 100%;
  height: 120px;
  display: block;
}

.field-player {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  fill: var(--primary);
  stroke: white;
  stroke-width: 2;
  cursor: pointer;
}

.field-player.player-out {
  fill: var(--error);
  opacity: 0.7;
}

.field-player.player-in {
  fill: var(--success);
  animation: playerIn 0.5s ease;
}

@keyframes playerIn {
  0% { 
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
}

.formation-changes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.change-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.change-indicator.out {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
}

.change-indicator.in {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.change-icon {
  font-size: 14px;
}

.sponsor-slot-substitution {
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
@media (max-width: 768px) {
  .player-selection {
    flex-direction: column;
    gap: 12px;
  }
  
  .substitution-arrow {
    transform: rotate(90deg);
    margin-top: 0;
  }
  
  .formation-display {
    flex-direction: column;
  }
  
  .suggestion-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .apply-suggestion-btn {
    align-self: flex-start;
  }
  
  .sponsor-slot-substitution {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class SubstitutionPanel {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxSubstitutions: 5,
      showSuggestions: true,
      showFormationPreview: true,
      ...options
    };
    
    this.substitutions = [];
    this.availablePlayers = [];
    this.fieldPlayers = [];
    this.benchPlayers = [];
    this.currentTime = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadPlayers();
    this.updateSubstitutionsRemaining();
    this.generateSuggestions();
  }
  
  bindEvents() {
    // Player selectors
    this.element.querySelector('#playerOut').addEventListener('change', () => {
      this.validateSubstitution();
      this.updateFormationPreview();
    });
    
    this.element.querySelector('#playerIn').addEventListener('change', () => {
      this.validateSubstitution();
      this.updateFormationPreview();
    });
    
    // Make substitution button
    this.element.querySelector('.make-substitution-btn').addEventListener('click', () => {
      this.makeSubstitution();
    });
    
    // Apply suggestion buttons
    this.element.querySelectorAll('.apply-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.applySuggestion(e.target.closest('.suggestion-item'));
      });
    });
    
    // Listen for match time updates
    document.addEventListener('matchTimeUpdate', (e) => {
      this.currentTime = e.detail.time;
      this.updateTimingInput();
    });
  }
  
  async loadPlayers() {
    try {
      // In a real app, this would fetch from game state
      const playersData = await this.fetchPlayersData();
      this.fieldPlayers = playersData.field;
      this.benchPlayers = playersData.bench;
      
      this.populatePlayerSelectors();
    } catch (error) {
      console.error('Error loading players:', error);
    }
  }
  
  async fetchPlayersData() {
    // Mock data - in real app this would come from game state
    return {
      field: [
        { id: 1, name: 'Mario Rossi', position: 'FW', fitness: 65, morale: 80 },
        { id: 2, name: 'Luigi Bianchi', position: 'MF', fitness: 70, morale: 75 },
        { id: 3, name: 'Giuseppe Verdi', position: 'DF', fitness: 45, morale: 85 }
      ],
      bench: [
        { id: 11, name: 'Franco Blu', position: 'FW', fitness: 95, morale: 70 },
        { id: 12, name: 'Antonio Neri', position: 'MF', fitness: 90, morale: 80 },
        { id: 13, name: 'Paolo Gialli', position: 'DF', fitness: 85, morale: 75 }
      ]
    };
  }
  
  populatePlayerSelectors() {
    const playerOutSelect = this.element.querySelector('#playerOut');
    const playerInSelect = this.element.querySelector('#playerIn');
    
    // Clear existing options
    playerOutSelect.innerHTML = '<option value="">Seleziona giocatore in campo</option>';
    playerInSelect.innerHTML = '<option value="">Seleziona dalla panchina</option>';
    
    // Populate field players (excluding already substituted)
    this.fieldPlayers.forEach(player => {
      if (!this.isPlayerSubstituted(player.id)) {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} (${player.position}) - Forma: ${player.fitness}%`;
        playerOutSelect.appendChild(option);
      }
    });
    
    // Populate bench players (excluding already used)
    this.benchPlayers.forEach(player => {
      if (!this.isPlayerUsed(player.id)) {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} (${player.position}) - Forma: ${player.fitness}%`;
        playerInSelect.appendChild(option);
      }
    });
  }
  
  isPlayerSubstituted(playerId) {
    return this.substitutions.some(sub => sub.playerOut.id === playerId);
  }
  
  isPlayerUsed(playerId) {
    return this.substitutions.some(sub => sub.playerIn.id === playerId);
  }
  
  validateSubstitution() {
    const playerOutId = this.element.querySelector('#playerOut').value;
    const playerInId = this.element.querySelector('#playerIn').value;
    const makeBtn = this.element.querySelector('.make-substitution-btn');
    
    const isValid = playerOutId && playerInId && 
                   this.substitutions.length < this.options.maxSubstitutions;
    
    makeBtn.disabled = !isValid;
    
    return isValid;
  }
  
  makeSubstitution() {
    if (!this.validateSubstitution()) return;
    
    const playerOutId = parseInt(this.element.querySelector('#playerOut').value);
    const playerInId = parseInt(this.element.querySelector('#playerIn').value);
    const reason = this.element.querySelector('#substitutionReason').value;
    const time = this.element.querySelector('#substitutionTime').value || this.currentTime;
    
    const playerOut = this.fieldPlayers.find(p => p.id === playerOutId);
    const playerIn = this.benchPlayers.find(p => p.id === playerInId);
    
    if (!playerOut || !playerIn) return;
    
    const substitution = {
      id: Date.now(),
      playerOut,
      playerIn,
      reason,
      time: parseInt(time),
      timestamp: new Date().toISOString()
    };
    
    this.substitutions.push(substitution);
    
    // Update UI
    this.renderSubstitutions();
    this.populatePlayerSelectors();
    this.updateSubstitutionsRemaining();
    this.resetForm();
    this.updateFormationPreview();
    
    // Dispatch substitution event
    this.element.dispatchEvent(new CustomEvent('substitutionMade', {
      detail: { substitution, totalSubstitutions: this.substitutions.length }
    }));
    
    this.showSuccess(`Sostituzione effettuata: ${playerIn.name} entra per ${playerOut.name}`);
  }
  
  renderSubstitutions() {
    const substitutionsList = this.element.querySelector('.substitutions-list');
    substitutionsList.innerHTML = '';
    
    this.substitutions.forEach(sub => {
      const subElement = this.createSubstitutionElement(sub);
      substitutionsList.appendChild(subElement);
    });
  }
  
  createSubstitutionElement(substitution) {
    const element = document.createElement('div');
    element.className = 'substitution-item';
    element.dataset.substitutionId = substitution.id;
    
    element.innerHTML = `
      <div class="substitution-time">${substitution.time}'</div>
      <div class="substitution-details">
        <span class="player-out">${substitution.playerOut.name}</span>
        <span class="substitution-arrow-small">🔄</span>
        <span class="player-in">${substitution.playerIn.name}</span>
      </div>
      <div class="substitution-reason-badge">${this.getReasonText(substitution.reason)}</div>
    `;
    
    return element;
  }
  
  getReasonText(reason) {
    const reasonTexts = {
      tactical: 'Tattico',
      injury: 'Infortunio',
      fatigue: 'Stanchezza',
      performance: 'Performance',
      disciplinary: 'Disciplinare'
    };
    return reasonTexts[reason] || reason;
  }
  
  updateSubstitutionsRemaining() {
    const remaining = this.options.maxSubstitutions - this.substitutions.length;
    this.element.querySelector('.remaining-count').textContent = remaining;
    
    // Update color based on remaining substitutions
    const remainingElement = this.element.querySelector('.substitutions-remaining');
    if (remaining === 0) {
      remainingElement.style.background = 'var(--error)';
    } else if (remaining === 1) {
      remainingElement.style.background = 'var(--warning)';
    } else {
      remainingElement.style.background = 'var(--primary)';
    }
  }
  
  resetForm() {
    this.element.querySelector('#playerOut').value = '';
    this.element.querySelector('#playerIn').value = '';
    this.element.querySelector('#substitutionReason').value = 'tactical';
    this.element.querySelector('#substitutionTime').value = '';
    this.element.querySelector('.make-substitution-btn').disabled = true;
  }
  
  updateTimingInput() {
    const timingInput = this.element.querySelector('#substitutionTime');
    timingInput.placeholder = this.currentTime.toString();
  }
  
  generateSuggestions() {
    if (!this.options.showSuggestions) return;
    
    const suggestions = this.calculateSuggestions();
    this.renderSuggestions(suggestions);
  }
  
  calculateSuggestions() {
    const suggestions = [];
    
    // Check for tired players
    this.fieldPlayers.forEach(player => {
      if (player.fitness < 50) {
        const replacement = this.findBestReplacement(player);
        if (replacement) {
          suggestions.push({
            type: 'fatigue',
            icon: '⚡',
            title: 'Gestione Energie',
            description: `${player.name} mostra segni di stanchezza, considera una sostituzione`,
            playerOut: player,
            playerIn: replacement,
            priority: 3
          });
        }
      }
    });
    
    // Check for tactical suggestions
    if (this.currentTime > 60) {
      const attackingPlayer = this.benchPlayers.find(p => p.position === 'FW');
      const defensivePlayer = this.fieldPlayers.find(p => p.position === 'MF');
      
      if (attackingPlayer && defensivePlayer) {
        suggestions.push({
          type: 'tactical',
          icon: '💡',
          title: 'Sostituzione Tattica',
          description: `Sostituisci ${defensivePlayer.name} con ${attackingPlayer.name} per rinforzare l'attacco`,
          playerOut: defensivePlayer,
          playerIn: attackingPlayer,
          priority: 2
        });
      }
    }
    
    // Sort by priority
    return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 3);
  }
  
  findBestReplacement(player) {
    return this.benchPlayers
      .filter(p => p.position === player.position && !this.isPlayerUsed(p.id))
      .sort((a, b) => b.fitness - a.fitness)[0];
  }
  
  renderSuggestions(suggestions) {
    const suggestionsList = this.element.querySelector('.suggestions-list');
    suggestionsList.innerHTML = '';
    
    suggestions.forEach(suggestion => {
      const suggestionElement = this.createSuggestionElement(suggestion);
      suggestionsList.appendChild(suggestionElement);
    });
  }
  
  createSuggestionElement(suggestion) {
    const element = document.createElement('div');
    element.className = 'suggestion-item';
    element.dataset.suggestionType = suggestion.type;
    
    element.innerHTML = `
      <div class="suggestion-icon">${suggestion.icon}</div>
      <div class="suggestion-content">
        <div class="suggestion-title">${suggestion.title}</div>
        <div class="suggestion-description">${suggestion.description}</div>
      </div>
      <button class="apply-suggestion-btn button button-ghost">
        Applica
      </button>
    `;
    
    // Store suggestion data
    element.suggestionData = suggestion;
    
    return element;
  }
  
  applySuggestion(suggestionElement) {
    const suggestion = suggestionElement.suggestionData;
    if (!suggestion) return;
    
    // Pre-fill the form
    this.element.querySelector('#playerOut').value = suggestion.playerOut.id;
    this.element.querySelector('#playerIn').value = suggestion.playerIn.id;
    this.element.querySelector('#substitutionReason').value = suggestion.type;
    
    this.validateSubstitution();
    this.updateFormationPreview();
    
    // Scroll to form
    this.element.querySelector('.substitution-maker').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
  
  updateFormationPreview() {
    if (!this.options.showFormationPreview) return;
    
    const playerOutId = this.element.querySelector('#playerOut').value;
    const playerInId = this.element.querySelector('#playerIn').value;
    
    // Update mini field visualization
    this.renderFormationField(playerOutId, playerInId);
  }
  
  renderFormationField(playerOutId, playerInId) {
    const field = this.element.querySelector('.mini-field');
    
    // Clear existing players
    field.querySelectorAll('.field-player').forEach(player => player.remove());
    
    // Add current field players
    this.fieldPlayers.forEach((player, index) => {
      if (!this.isPlayerSubstituted(player.id)) {
        const playerElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        playerElement.setAttribute('class', 'field-player');
        playerElement.setAttribute('cx', 20 + (index % 5) * 35);
        playerElement.setAttribute('cy', 30 + Math.floor(index / 5) * 40);
        playerElement.setAttribute('r', 6);
        
        if (player.id == playerOutId) {
          playerElement.classList.add('player-out');
        }
        
        playerElement.title = player.name;
        field.appendChild(playerElement);
      }
    });
    
    // Add incoming player if selected
    if (playerInId) {
      const playerIn = this.benchPlayers.find(p => p.id == playerInId);
      if (playerIn) {
        const playerElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        playerElement.setAttribute('class', 'field-player player-in');
        playerElement.setAttribute('cx', 100);
        playerElement.setAttribute('cy', 120);
        playerElement.setAttribute('r', 6);
        playerElement.title = `${playerIn.name} (Entra)`;
        field.appendChild(playerElement);
      }
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getSubstitutions() {
    return [...this.substitutions];
  }
  
  addSubstitution(substitution) {
    this.substitutions.push(substitution);
    this.renderSubstitutions();
    this.populatePlayerSelectors();
    this.updateSubstitutionsRemaining();
    this.generateSuggestions();
  }
  
  canMakeSubstitution() {
    return this.substitutions.length < this.options.maxSubstitutions;
  }
  
  getSubstitutionsRemaining() {
    return this.options.maxSubstitutions - this.substitutions.length;
  }
  
  setMatchTime(time) {
    this.currentTime = time;
    this.updateTimingInput();
  }
  
  updatePlayerFitness(playerId, fitness) {
    const player = this.fieldPlayers.find(p => p.id === playerId) ||
                  this.benchPlayers.find(p => p.id === playerId);
    
    if (player) {
      player.fitness = fitness;
      this.populatePlayerSelectors();
      this.generateSuggestions();
    }
  }
}

export default SubstitutionPanel;