export const template = `
<div class="tactical-field">
  <div class="field-header">
    <h3 class="field-title">Campo Tattico</h3>
    <div class="field-actions">
      <button class="action-btn reset-positions-btn" aria-label="Reimposta posizioni">
        ↻ Reset
      </button>
      <button class="action-btn save-positions-btn" aria-label="Salva posizioni">
        💾 Salva
      </button>
    </div>
  </div>
  
  <div class="field-container">
    <div class="field-background">
      <svg class="football-field" viewBox="0 0 800 600" role="img" aria-label="Campo da calcio tattico">
        <!-- Field markings -->
        <rect class="field-grass" x="0" y="0" width="800" height="600" fill="#2d5a27"/>
        
        <!-- Penalty areas -->
        <rect class="field-marking" x="0" y="180" width="120" height="240" fill="none" stroke="white" stroke-width="2"/>
        <rect class="field-marking" x="680" y="180" width="120" height="240" fill="none" stroke="white" stroke-width="2"/>
        
        <!-- Goal areas -->
        <rect class="field-marking" x="0" y="240" width="40" height="120" fill="none" stroke="white" stroke-width="2"/>
        <rect class="field-marking" x="760" y="240" width="40" height="120" fill="none" stroke="white" stroke-width="2"/>
        
        <!-- Goals -->
        <rect class="goal" x="-10" y="270" width="10" height="60" fill="white"/>
        <rect class="goal" x="800" y="270" width="10" height="60" fill="white"/>
        
        <!-- Center circle -->
        <circle class="field-marking" cx="400" cy="300" r="80" fill="none" stroke="white" stroke-width="2"/>
        <circle class="center-spot" cx="400" cy="300" r="3" fill="white"/>
        
        <!-- Center line -->
        <line class="field-marking" x1="0" y1="300" x2="800" y2="300" stroke="white" stroke-width="2"/>
        
        <!-- Corner arcs -->
        <path class="field-marking" d="M 0 0 A 10 10 0 0 1 10 0" fill="none" stroke="white" stroke-width="2"/>
        <path class="field-marking" d="M 790 0 A 10 10 0 0 0 800 10" fill="none" stroke="white" stroke-width="2"/>
        <path class="field-marking" d="M 0 600 A 10 10 0 0 0 10 600" fill="none" stroke="white" stroke-width="2"/>
        <path class="field-marking" d="M 790 600 A 10 10 0 0 1 800 590" fill="none" stroke="white" stroke-width="2"/>
      </svg>
      
      <!-- Player positions overlay -->
      <div class="player-positions-overlay">
        <!-- Players will be positioned here dynamically -->
      </div>
      
      <!-- Formation guidelines -->
      <div class="formation-guidelines">
        <div class="guideline defense-line"></div>
        <div class="guideline midfield-line"></div>
        <div class="guideline attack-line"></div>
      </div>
    </div>
  </div>
  
  <div class="field-controls">
    <div class="control-section">
      <h4>Giocatori Disponibili</h4>
      <div class="available-players">
        <!-- Available players will be listed here -->
      </div>
    </div>
    
    <div class="control-section">
      <h4>Formazione Attuale</h4>
      <div class="formation-info">
        <div class="formation-name">4-4-2</div>
        <div class="formation-positions">
          <div class="position-count">
            <span class="position-label">DF:</span>
            <span class="position-value">4</span>
          </div>
          <div class="position-count">
            <span class="position-label">MF:</span>
            <span class="position-value">4</span>
          </div>
          <div class="position-count">
            <span class="position-label">FW:</span>
            <span class="position-value">2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="field-validation">
    <div class="validation-status valid">
      <span class="status-icon">✓</span>
      <span class="status-text">Formazione valida</span>
    </div>
    
    <div class="validation-issues" style="display: none;">
      <h4>Problemi Rilevati:</h4>
      <ul class="issues-list">
        <!-- Validation issues will be listed here -->
      </ul>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-tactical">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=250&h=50" 
         alt="Tactical Field Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.tactical-field {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.field-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.field-actions {
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

.field-container {
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  background: #2d5a27;
}

.field-background {
  position: relative;
  width: 100%;
  height: 400px;
}

.football-field {
  width: 100%;
  height: 100%;
  display: block;
}

.field-marking {
  opacity: 0.8;
}

.player-positions-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.player-position {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  pointer-events: auto;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
}

.player-position:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.player-position.dragging {
  transform: translate(-50%, -50%) scale(1.2);
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

.player-position.invalid-position {
  background: var(--error);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translate(-50%, -50%); }
  25% { transform: translate(-52%, -50%); }
  75% { transform: translate(-48%, -50%); }
}

.player-number {
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.player-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 10px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.player-position:hover .player-tooltip {
  opacity: 1;
}

.formation-guidelines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.guideline {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1px;
}

.defense-line {
  top: 20%;
}

.midfield-line {
  top: 50%;
}

.attack-line {
  top: 80%;
}

.field-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.control-section {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.control-section h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.available-players {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.available-player {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: move;
  font-size: 12px;
  transition: all 0.2s ease;
}

.available-player:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.available-player.dragging {
  opacity: 0.5;
}

.player-avatar-mini {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--border);
}

.player-avatar-mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.formation-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.formation-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
  text-align: center;
}

.formation-positions {
  display: flex;
  justify-content: space-around;
}

.position-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.position-label {
  font-size: 12px;
  color: var(--text-muted);
}

.position-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.field-validation {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.validation-status.valid .status-icon {
  color: var(--success);
}

.validation-status.invalid .status-icon {
  color: var(--error);
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.validation-issues h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.issues-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.issues-list li {
  font-size: 12px;
  color: var(--error);
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.issues-list li::before {
  content: '⚠';
  position: absolute;
  left: 0;
  color: var(--error);
}

.sponsor-slot-tactical {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-top: 16px;
}

/* Position-specific colors */
.player-position[data-position="GK"] {
  background: #f59e0b;
}

.player-position[data-position="DF"] {
  background: #3b82f6;
}

.player-position[data-position="MF"] {
  background: #10b981;
}

.player-position[data-position="FW"] {
  background: #ef4444;
}

/* Responsive */
@media (max-width: 1024px) {
  .field-controls {
    grid-template-columns: 1fr;
  }
  
  .field-background {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .field-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .field-actions {
    align-self: flex-end;
  }
  
  .field-background {
    height: 300px;
  }
  
  .player-position {
    width: 32px;
    height: 32px;
  }
  
  .player-number {
    font-size: 12px;
  }
}
</style>
`;

class TacticalField {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      formation: '4-4-2',
      allowDragDrop: true,
      showGuidelines: true,
      autoValidate: true,
      ...options
    };
    
    this.players = [];
    this.positions = {};
    this.draggedElement = null;
    this.formation = this.options.formation;
    
    this.init();
  }
  
  init() {
    this.setupFormation();
    this.bindEvents();
    this.loadPlayers();
    this.renderPositions();
    this.updateValidation();
    
    if (this.options.showGuidelines) {
      this.showGuidelines();
    }
  }
  
  setupFormation() {
    this.formationTemplates = {
      '4-4-2': {
        name: '4-4-2',
        positions: {
          GK: [{ x: 50, y: 300 }],
          DF: [
            { x: 150, y: 150 },
            { x: 150, y: 250 },
            { x: 150, y: 350 },
            { x: 150, y: 450 }
          ],
          MF: [
            { x: 300, y: 150 },
            { x: 300, y: 250 },
            { x: 300, y: 350 },
            { x: 300, y: 450 }
          ],
          FW: [
            { x: 500, y: 200 },
            { x: 500, y: 400 }
          ]
        }
      },
      '4-3-3': {
        name: '4-3-3',
        positions: {
          GK: [{ x: 50, y: 300 }],
          DF: [
            { x: 150, y: 150 },
            { x: 150, y: 250 },
            { x: 150, y: 350 },
            { x: 150, y: 450 }
          ],
          MF: [
            { x: 300, y: 200 },
            { x: 300, y: 300 },
            { x: 300, y: 400 }
          ],
          FW: [
            { x: 500, y: 150 },
            { x: 500, y: 300 },
            { x: 500, y: 450 }
          ]
        }
      },
      '3-5-2': {
        name: '3-5-2',
        positions: {
          GK: [{ x: 50, y: 300 }],
          DF: [
            { x: 150, y: 200 },
            { x: 150, y: 300 },
            { x: 150, y: 400 }
          ],
          MF: [
            { x: 250, y: 120 },
            { x: 300, y: 220 },
            { x: 300, y: 300 },
            { x: 300, y: 380 },
            { x: 250, y: 480 }
          ],
          FW: [
            { x: 500, y: 200 },
            { x: 500, y: 400 }
          ]
        }
      }
    };
    
    // Update formation display
    this.updateFormationDisplay();
  }
  
  updateFormationDisplay() {
    const formationName = this.element.querySelector('.formation-name');
    formationName.textContent = this.formation;
    
    // Update position counts
    const template = this.formationTemplates[this.formation];
    if (template) {
      const dfCount = this.element.querySelector('.position-count:nth-child(1) .position-value');
      const mfCount = this.element.querySelector('.position-count:nth-child(2) .position-value');
      const fwCount = this.element.querySelector('.position-count:nth-child(3) .position-value');
      
      dfCount.textContent = template.positions.DF.length;
      mfCount.textContent = template.positions.MF.length;
      fwCount.textContent = template.positions.FW.length;
    }
  }
  
  bindEvents() {
    // Control buttons
    this.element.querySelector('.reset-positions-btn').addEventListener('click', () => {
      this.resetPositions();
    });
    
    this.element.querySelector('.save-positions-btn').addEventListener('click', () => {
      this.savePositions();
    });
    
    // Drag and drop setup
    if (this.options.allowDragDrop) {
      this.setupDragAndDrop();
    }
    
    // Guidelines toggle
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        this.toggleGuidelines();
      }
    });
  }
  
  setupDragAndDrop() {
    const overlay = this.element.querySelector('.player-positions-overlay');
    
    // Make overlay a drop zone
    overlay.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    
    overlay.addEventListener('drop', (e) => {
      e.preventDefault();
      this.handleDrop(e);
    });
    
    // Setup available players as draggable
    this.element.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('available-player') || e.target.classList.contains('player-position')) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      }
    });
    
    this.element.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('available-player') || e.target.classList.contains('player-position')) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
      }
    });
  }
  
  handleDrop(e) {
    if (!this.draggedElement) return;
    
    const rect = this.element.querySelector('.player-positions-overlay').getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 600;
    
    if (this.draggedElement.classList.contains('available-player')) {
      this.addPlayerToField(this.draggedElement.dataset.playerId, x, y);
    } else if (this.draggedElement.classList.contains('player-position')) {
      this.movePlayer(this.draggedElement.dataset.playerId, x, y);
    }
  }
  
  async loadPlayers() {
    try {
      // In a real app, this would fetch from game state
      this.players = await this.fetchAvailablePlayers();
      this.renderAvailablePlayers();
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
        position: 'GK',
        number: 1,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        position: 'DF',
        number: 2,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        position: 'MF',
        number: 8,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40'
      },
      {
        id: 4,
        name: 'Antonio Neri',
        position: 'FW',
        number: 9,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40'
      }
    ];
  }
  
  renderAvailablePlayers() {
    const container = this.element.querySelector('.available-players');
    container.innerHTML = '';
    
    const availablePlayers = this.players.filter(player => !this.isPlayerOnField(player.id));
    
    availablePlayers.forEach(player => {
      const element = this.createAvailablePlayerElement(player);
      container.appendChild(element);
    });
  }
  
  createAvailablePlayerElement(player) {
    const element = document.createElement('div');
    element.className = 'available-player';
    element.draggable = this.options.allowDragDrop;
    element.dataset.playerId = player.id;
    element.dataset.position = player.position;
    
    element.innerHTML = `
      <div class="player-avatar-mini">
        <img src="${player.photo}" alt="Foto di ${player.name}" loading="lazy">
      </div>
      <span>${player.name}</span>
      <span class="player-number">#${player.number}</span>
    `;
    
    return element;
  }
  
  renderPositions() {
    const overlay = this.element.querySelector('.player-positions-overlay');
    overlay.innerHTML = '';
    
    Object.entries(this.positions).forEach(([playerId, position]) => {
      const player = this.players.find(p => p.id == playerId);
      if (player) {
        const element = this.createPlayerPositionElement(player, position);
        overlay.appendChild(element);
      }
    });
  }
  
  createPlayerPositionElement(player, position) {
    const element = document.createElement('div');
    element.className = 'player-position';
    element.draggable = this.options.allowDragDrop;
    element.dataset.playerId = player.id;
    element.dataset.position = player.position;
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
    
    element.innerHTML = `
      <span class="player-number">${player.number}</span>
      <div class="player-tooltip">
        ${player.name} (${player.position})
      </div>
    `;
    
    return element;
  }
  
  addPlayerToField(playerId, x, y) {
    const player = this.players.find(p => p.id == playerId);
    if (!player) return;
    
    // Validate position
    if (!this.isValidPosition(x, y, player.position)) {
      this.showInvalidPositionFeedback();
      return;
    }
    
    this.positions[playerId] = { x, y };
    this.renderPositions();
    this.renderAvailablePlayers();
    this.updateValidation();
    
    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('playerPositioned', {
      detail: { playerId, position: { x, y } }
    }));
  }
  
  movePlayer(playerId, x, y) {
    const player = this.players.find(p => p.id == playerId);
    if (!player) return;
    
    // Validate position
    if (!this.isValidPosition(x, y, player.position)) {
      this.showInvalidPositionFeedback();
      return;
    }
    
    this.positions[playerId] = { x, y };
    this.renderPositions();
    this.updateValidation();
    
    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('playerMoved', {
      detail: { playerId, position: { x, y } }
    }));
  }
  
  isValidPosition(x, y, playerPosition) {
    // Basic field bounds check
    if (x < 0 || x > 800 || y < 0 || y > 600) return false;
    
    // Position-specific validation
    switch (playerPosition) {
      case 'GK':
        return x < 150; // Goalkeeper should be in defensive third
      case 'DF':
        return x < 400; // Defenders in defensive half
      case 'MF':
        return x > 100 && x < 700; // Midfielders can be anywhere except extreme ends
      case 'FW':
        return x > 300; // Forwards in attacking half
      default:
        return true;
    }
  }
  
  showInvalidPositionFeedback() {
    // Visual feedback for invalid position
    const overlay = this.element.querySelector('.player-positions-overlay');
    overlay.style.background = 'rgba(239, 68, 68, 0.1)';
    setTimeout(() => {
      overlay.style.background = '';
    }, 500);
  }
  
  isPlayerOnField(playerId) {
    return this.positions.hasOwnProperty(playerId);
  }
  
  resetPositions() {
    if (confirm('Sei sicuro di voler ripristinare tutte le posizioni?')) {
      this.positions = {};
      this.renderPositions();
      this.renderAvailablePlayers();
      this.updateValidation();
      
      // Dispatch event
      this.element.dispatchEvent(new CustomEvent('positionsReset'));
    }
  }
  
  savePositions() {
    // In a real app, this would save to game state
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('positionsSaved', {
      detail: { positions: this.positions, formation: this.formation }
    }));
    
    this.showSuccess('Posizioni salvate con successo');
  }
  
  updateValidation() {
    if (!this.options.autoValidate) return;
    
    const validationStatus = this.element.querySelector('.validation-status');
    const statusIcon = validationStatus.querySelector('.status-icon');
    const statusText = validationStatus.querySelector('.status-text');
    const validationIssues = this.element.querySelector('.validation-issues');
    const issuesList = validationIssues.querySelector('.issues-list');
    
    const issues = this.validateFormation();
    
    if (issues.length === 0) {
      validationStatus.className = 'validation-status valid';
      statusIcon.textContent = '✓';
      statusText.textContent = 'Formazione valida';
      validationIssues.style.display = 'none';
    } else {
      validationStatus.className = 'validation-status invalid';
      statusIcon.textContent = '⚠️';
      statusText.textContent = 'Formazione non valida';
      validationIssues.style.display = 'block';
      
      // Update issues list
      issuesList.innerHTML = '';
      issues.forEach(issue => {
        const li = document.createElement('li');
        li.textContent = issue;
        issuesList.appendChild(li);
      });
    }
  }
  
  validateFormation() {
    const issues = [];
    const playersOnField = Object.keys(this.positions).length;
    
    // Check if we have 11 players
    if (playersOnField < 11) {
      issues.push(`Mancano ${11 - playersOnField} giocatori per completare la formazione`);
    } else if (playersOnField > 11) {
      issues.push(`Ci sono ${playersOnField - 11} giocatori in eccesso`);
    }
    
    // Check if we have a goalkeeper
    const hasGoalkeeper = this.players
      .filter(p => p.position === 'GK')
      .some(p => this.isPlayerOnField(p.id));
    
    if (!hasGoalkeeper) {
      issues.push('Manca il portiere');
    }
    
    // Check position counts
    const template = this.formationTemplates[this.formation];
    if (template) {
      const positionCounts = {
        DF: 0,
        MF: 0,
        FW: 0
      };
      
      Object.keys(this.positions).forEach(playerId => {
        const player = this.players.find(p => p.id == playerId);
        if (player && player.position !== 'GK') {
          positionCounts[player.position]++;
        }
      });
      
      Object.entries(positionCounts).forEach(([position, count]) => {
        const expectedCount = template.positions[position].length;
        if (count !== expectedCount) {
          issues.push(`${position}: ${count}/${expectedCount} giocatori`);
        }
      });
    }
    
    return issues;
  }
  
  showGuidelines() {
    this.element.querySelector('.formation-guidelines').style.display = 'block';
  }
  
  hideGuidelines() {
    this.element.querySelector('.formation-guidelines').style.display = 'none';
  }
  
  toggleGuidelines() {
    const guidelines = this.element.querySelector('.formation-guidelines');
    const isVisible = guidelines.style.display !== 'none';
    guidelines.style.display = isVisible ? 'none' : 'block';
    this.options.showGuidelines = !isVisible;
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getPositions() {
    return this.positions;
  }
  
  setPositions(positions) {
    this.positions = positions;
    this.renderPositions();
    this.renderAvailablePlayers();
    this.updateValidation();
  }
  
  getFormation() {
    return this.formation;
  }
  
  setFormation(formation) {
    if (this.formationTemplates[formation]) {
      this.formation = formation;
      this.updateFormationDisplay();
    }
  }
  
  isFormationValid() {
    return this.validateFormation().length === 0;
  }
  
  getPlayersOnField() {
    return Object.keys(this.positions).map(id => 
      this.players.find(p => p.id == id)
    ).filter(Boolean);
  }
}

export default TacticalField;