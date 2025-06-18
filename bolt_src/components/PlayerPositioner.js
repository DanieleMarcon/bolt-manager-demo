export const template = `
<div class="player-positioner">
  <div class="positioner-header">
    <div class="formation-info">
      <h3 class="current-formation">Formazione: <span class="formation-name">4-4-2</span></h3>
      <span class="formation-description">Formazione equilibrata con 4 difensori, 4 centrocampisti e 2 attaccanti</span>
    </div>
    
    <div class="positioner-controls">
      <button class="control-btn auto-position-btn" aria-label="Posizionamento automatico">
        🤖 Auto
      </button>
      <button class="control-btn reset-positions-btn" aria-label="Reset posizioni">
        ↻ Reset
      </button>
      <button class="control-btn save-formation-btn" aria-label="Salva formazione">
        💾 Salva
      </button>
    </div>
  </div>
  
  <div class="tactical-field-container">
    <div class="field-background">
      <svg class="football-field" viewBox="0 0 800 600" role="img" aria-label="Campo da calcio tattico">
        <!-- Field markings -->
        <rect class="field-grass" x="0" y="0" width="800" height="600" fill="#2d5a27"/>
        
        <!-- Center circle -->
        <circle class="field-marking" cx="400" cy="300" r="80" fill="none" stroke="white" stroke-width="2"/>
        <circle class="center-spot" cx="400" cy="300" r="3" fill="white"/>
        
        <!-- Center line -->
        <line class="field-marking" x1="0" y1="300" x2="800" y2="300" stroke="white" stroke-width="2"/>
        
        <!-- Penalty areas -->
        <rect class="field-marking" x="0" y="180" width="120" height="240" fill="none" stroke="white" stroke-width="2"/>
        <rect class="field-marking" x="680" y="180" width="120" height="240" fill="none" stroke="white" stroke-width="2"/>
        
        <!-- Goal areas -->
        <rect class="field-marking" x="0" y="240" width="40" height="120" fill="none" stroke="white" stroke-width="2"/>
        <rect class="field-marking" x="760" y="240" width="40" height="120" fill="none" stroke="white" stroke-width="2"/>
        
        <!-- Goals -->
        <rect class="goal" x="-10" y="270" width="10" height="60" fill="white"/>
        <rect class="goal" x="800" y="270" width="10" height="60" fill="white"/>
        
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
      <div class="formation-guidelines" style="display: none;">
        <div class="guideline defense-line"></div>
        <div class="guideline midfield-line"></div>
        <div class="guideline attack-line"></div>
      </div>
    </div>
  </div>
  
  <div class="position-controls">
    <div class="available-players">
      <h4>Giocatori Disponibili</h4>
      <div class="bench-players">
        <!-- Available players will be listed here -->
      </div>
    </div>
    
    <div class="position-validation">
      <div class="validation-status">
        <span class="status-icon">✓</span>
        <span class="status-text">Formazione valida</span>
      </div>
      
      <div class="formation-stats">
        <div class="stat-item">
          <span class="stat-label">Difesa</span>
          <span class="stat-value defense-rating">85</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Centrocampo</span>
          <span class="stat-value midfield-rating">78</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Attacco</span>
          <span class="stat-value attack-rating">82</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-tactical">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=250&h=50" 
         alt="Tactical Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.player-positioner {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.positioner-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.formation-info {
  flex: 1;
}

.current-formation {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.formation-name {
  color: var(--primary);
}

.formation-description {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.positioner-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.tactical-field-container {
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
}

.player-position:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.player-position.dragging {
  transform: scale(1.2);
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}

.player-position.invalid-position {
  background: var(--error);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.player-number {
  color: white;
  font-size: 12px;
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

.position-controls {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.available-players {
  flex: 1;
}

.available-players h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.bench-players {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bench-player {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: move;
  font-size: 12px;
  transition: all 0.2s ease;
}

.bench-player:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.bench-player.dragging {
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

.position-validation {
  min-width: 200px;
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 6px;
}

.status-icon {
  font-size: 16px;
}

.validation-status.valid .status-icon {
  color: var(--success);
}

.validation-status.invalid .status-icon {
  color: var(--error);
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.formation-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.sponsor-slot-tactical {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 150px;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
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
  .position-controls {
    flex-direction: column;
  }
  
  .field-background {
    height: 300px;
  }
  
  .player-position {
    width: 32px;
    height: 32px;
  }
  
  .player-number {
    font-size: 10px;
  }
}

@media (max-width: 768px) {
  .positioner-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .positioner-controls {
    align-self: stretch;
    justify-content: center;
  }
  
  .field-background {
    height: 250px;
  }
  
  .player-position {
    width: 28px;
    height: 28px;
  }
  
  .bench-players {
    justify-content: center;
  }
}
</style>
`;

class PlayerPositioner {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      formation: '4-4-2',
      allowDragDrop: true,
      showGuidelines: false,
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
  }
  
  setupFormation() {
    this.formationTemplates = {
      '4-4-2': {
        name: '4-4-2',
        description: 'Formazione equilibrata con 4 difensori, 4 centrocampisti e 2 attaccanti',
        positions: {
          GK: [{ x: 50, y: 300 }],
          DF: [
            { x: 150, y: 150 },
            { x: 150, y: 250 },
            { x: 150, y: 350 },
            { x: 150, y: 450 }
          ],
          MF: [
            { x: 300, y: 180 },
            { x: 300, y: 280 },
            { x: 300, y: 320 },
            { x: 300, y: 420 }
          ],
          FW: [
            { x: 500, y: 220 },
            { x: 500, y: 380 }
          ]
        }
      },
      '4-3-3': {
        name: '4-3-3',
        description: 'Formazione offensiva con 4 difensori, 3 centrocampisti e 3 attaccanti',
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
            { x: 500, y: 180 },
            { x: 500, y: 300 },
            { x: 500, y: 420 }
          ]
        }
      },
      '3-5-2': {
        name: '3-5-2',
        description: 'Formazione con 3 difensori centrali, 5 centrocampisti e 2 attaccanti',
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
            { x: 500, y: 240 },
            { x: 500, y: 360 }
          ]
        }
      }
    };
    
    this.updateFormationDisplay();
  }
  
  updateFormationDisplay() {
    const template = this.formationTemplates[this.formation];
    this.element.querySelector('.formation-name').textContent = template.name;
    this.element.querySelector('.formation-description').textContent = template.description;
  }
  
  bindEvents() {
    // Control buttons
    this.element.querySelector('.auto-position-btn').addEventListener('click', () => {
      this.autoPosition();
    });
    
    this.element.querySelector('.reset-positions-btn').addEventListener('click', () => {
      this.resetPositions();
    });
    
    this.element.querySelector('.save-formation-btn').addEventListener('click', () => {
      this.saveFormation();
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
    
    // Setup bench players as draggable
    this.element.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('bench-player') || e.target.classList.contains('player-position')) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      }
    });
    
    this.element.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('bench-player') || e.target.classList.contains('player-position')) {
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
    
    if (this.draggedElement.classList.contains('bench-player')) {
      this.addPlayerToField(this.draggedElement.dataset.playerId, x, y);
    } else if (this.draggedElement.classList.contains('player-position')) {
      this.movePlayer(this.draggedElement.dataset.playerId, x, y);
    }
  }
  
  async loadPlayers() {
    try {
      // In a real app, this would fetch from game state
      this.players = await this.fetchAvailablePlayers();
      this.renderBenchPlayers();
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
      // Add more players...
    ];
  }
  
  renderBenchPlayers() {
    const container = this.element.querySelector('.bench-players');
    container.innerHTML = '';
    
    const availablePlayers = this.players.filter(player => !this.isPlayerOnField(player.id));
    
    availablePlayers.forEach(player => {
      const element = this.createBenchPlayerElement(player);
      container.appendChild(element);
    });
  }
  
  createBenchPlayerElement(player) {
    const element = document.createElement('div');
    element.className = 'bench-player';
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
    element.style.left = `${(position.x / 800) * 100}%`;
    element.style.top = `${(position.y / 600) * 100}%`;
    element.style.transform = 'translate(-50%, -50%)';
    
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
    this.renderBenchPlayers();
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
  
  autoPosition() {
    const template = this.formationTemplates[this.formation];
    const availablePlayers = this.players.slice(0, 11); // First 11 players
    
    this.positions = {};
    let playerIndex = 0;
    
    Object.entries(template.positions).forEach(([position, positionSlots]) => {
      positionSlots.forEach(slot => {
        const player = availablePlayers.find(p => p.position === position && !this.isPlayerOnField(p.id));
        if (player) {
          this.positions[player.id] = { x: slot.x, y: slot.y };
        }
      });
    });
    
    this.renderPositions();
    this.renderBenchPlayers();
    this.updateValidation();
    
    this.showSuccess('Posizionamento automatico completato');
  }
  
  resetPositions() {
    this.positions = {};
    this.renderPositions();
    this.renderBenchPlayers();
    this.updateValidation();
    
    this.showSuccess('Posizioni resettate');
  }
  
  saveFormation() {
    const formationData = {
      formation: this.formation,
      positions: this.positions,
      timestamp: new Date().toISOString()
    };
    
    // Dispatch save event
    this.element.dispatchEvent(new CustomEvent('saveFormation', {
      detail: formationData
    }));
    
    this.showSuccess('Formazione salvata');
  }
  
  updateValidation() {
    if (!this.options.autoValidate) return;
    
    const validationStatus = this.element.querySelector('.validation-status');
    const statusIcon = validationStatus.querySelector('.status-icon');
    const statusText = validationStatus.querySelector('.status-text');
    
    const playersOnField = Object.keys(this.positions).length;
    const isValid = playersOnField === 11;
    
    if (isValid) {
      validationStatus.className = 'validation-status valid';
      statusIcon.textContent = '✓';
      statusText.textContent = 'Formazione valida';
    } else {
      validationStatus.className = 'validation-status invalid';
      statusIcon.textContent = '⚠️';
      statusText.textContent = `${playersOnField}/11 giocatori posizionati`;
    }
    
    this.updateFormationStats();
  }
  
  updateFormationStats() {
    // Calculate formation ratings based on positioned players
    const positionedPlayers = Object.keys(this.positions).map(id => 
      this.players.find(p => p.id == id)
    ).filter(Boolean);
    
    const defenseRating = this.calculatePositionRating(positionedPlayers, ['GK', 'DF']);
    const midfieldRating = this.calculatePositionRating(positionedPlayers, ['MF']);
    const attackRating = this.calculatePositionRating(positionedPlayers, ['FW']);
    
    this.element.querySelector('.defense-rating').textContent = defenseRating;
    this.element.querySelector('.midfield-rating').textContent = midfieldRating;
    this.element.querySelector('.attack-rating').textContent = attackRating;
  }
  
  calculatePositionRating(players, positions) {
    const relevantPlayers = players.filter(p => positions.includes(p.position));
    if (relevantPlayers.length === 0) return 0;
    
    const totalRating = relevantPlayers.reduce((sum, player) => sum + (player.overall_rating || 70), 0);
    return Math.round(totalRating / relevantPlayers.length);
  }
  
  toggleGuidelines() {
    const guidelines = this.element.querySelector('.formation-guidelines');
    const isVisible = guidelines.style.display !== 'none';
    guidelines.style.display = isVisible ? 'none' : 'block';
    this.options.showGuidelines = !isVisible;
  }
  
  setFormation(formation) {
    if (this.formationTemplates[formation]) {
      this.formation = formation;
      this.updateFormationDisplay();
      this.autoPosition();
    }
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
    this.renderBenchPlayers();
    this.updateValidation();
  }
  
  getFormation() {
    return this.formation;
  }
  
  isFormationValid() {
    return Object.keys(this.positions).length === 11;
  }
}

export default PlayerPositioner;