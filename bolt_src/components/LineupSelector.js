export default class LineupSelector {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      formation: '4-4-2',
      availablePlayers: [],
      onLineupChange: () => {},
      ...options
    };
    
    this.selectedPlayers = new Map(); // position -> player
    this.formations = this.getFormations();
    this.currentFormation = this.options.formation;
    
    this.render();
    this.bindEvents();
  }

  getFormations() {
    return {
      '4-4-2': {
        name: '4-4-2 Classico',
        positions: [
          { id: 'GK', name: 'Portiere', x: 50, y: 85, required: 'GK' },
          { id: 'RB', name: 'Terzino Destro', x: 80, y: 65, required: 'DF' },
          { id: 'CB1', name: 'Difensore Centrale', x: 60, y: 65, required: 'DF' },
          { id: 'CB2', name: 'Difensore Centrale', x: 40, y: 65, required: 'DF' },
          { id: 'LB', name: 'Terzino Sinistro', x: 20, y: 65, required: 'DF' },
          { id: 'RM', name: 'Centrocampista Destro', x: 75, y: 40, required: 'MF' },
          { id: 'CM1', name: 'Centrocampista Centrale', x: 55, y: 40, required: 'MF' },
          { id: 'CM2', name: 'Centrocampista Centrale', x: 45, y: 40, required: 'MF' },
          { id: 'LM', name: 'Centrocampista Sinistro', x: 25, y: 40, required: 'MF' },
          { id: 'ST1', name: 'Attaccante', x: 40, y: 15, required: 'FW' },
          { id: 'ST2', name: 'Attaccante', x: 60, y: 15, required: 'FW' }
        ]
      },
      '4-3-3': {
        name: '4-3-3 Offensivo',
        positions: [
          { id: 'GK', name: 'Portiere', x: 50, y: 85, required: 'GK' },
          { id: 'RB', name: 'Terzino Destro', x: 80, y: 65, required: 'DF' },
          { id: 'CB1', name: 'Difensore Centrale', x: 60, y: 65, required: 'DF' },
          { id: 'CB2', name: 'Difensore Centrale', x: 40, y: 65, required: 'DF' },
          { id: 'LB', name: 'Terzino Sinistro', x: 20, y: 65, required: 'DF' },
          { id: 'CDM', name: 'Mediano', x: 50, y: 50, required: 'MF' },
          { id: 'CM1', name: 'Centrocampista', x: 35, y: 40, required: 'MF' },
          { id: 'CM2', name: 'Centrocampista', x: 65, y: 40, required: 'MF' },
          { id: 'LW', name: 'Ala Sinistra', x: 20, y: 20, required: 'FW' },
          { id: 'ST', name: 'Centravanti', x: 50, y: 15, required: 'FW' },
          { id: 'RW', name: 'Ala Destra', x: 80, y: 20, required: 'FW' }
        ]
      },
      '3-5-2': {
        name: '3-5-2 Equilibrato',
        positions: [
          { id: 'GK', name: 'Portiere', x: 50, y: 85, required: 'GK' },
          { id: 'CB1', name: 'Difensore Centrale', x: 30, y: 65, required: 'DF' },
          { id: 'CB2', name: 'Difensore Centrale', x: 50, y: 65, required: 'DF' },
          { id: 'CB3', name: 'Difensore Centrale', x: 70, y: 65, required: 'DF' },
          { id: 'LWB', name: 'Esterno Sinistro', x: 15, y: 45, required: 'MF' },
          { id: 'CM1', name: 'Centrocampista', x: 35, y: 40, required: 'MF' },
          { id: 'CM2', name: 'Centrocampista', x: 50, y: 40, required: 'MF' },
          { id: 'CM3', name: 'Centrocampista', x: 65, y: 40, required: 'MF' },
          { id: 'RWB', name: 'Esterno Destro', x: 85, y: 45, required: 'MF' },
          { id: 'ST1', name: 'Attaccante', x: 40, y: 15, required: 'FW' },
          { id: 'ST2', name: 'Attaccante', x: 60, y: 15, required: 'FW' }
        ]
      }
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="lineup-selector">
        <!-- Formation Selection Header -->
        <div class="formation-header">
          <div class="formation-info">
            <h4 class="formation-title">Selezione Formazione</h4>
            <p class="formation-subtitle">Scegli il modulo e posiziona i giocatori</p>
          </div>
          
          <div class="formation-controls">
            <div class="formation-dropdown">
              <select class="formation-select" id="formationSelect">
                ${Object.entries(this.formations).map(([key, formation]) => `
                  <option value="${key}" ${key === this.currentFormation ? 'selected' : ''}>
                    ${formation.name}
                  </option>
                `).join('')}
              </select>
            </div>
            
            <div class="formation-actions">
              <button class="button button-ghost save-formation-btn">
                <span>💾</span>
                <span>Salva</span>
              </button>
              <button class="button button-ghost load-formation-btn">
                <span>📁</span>
                <span>Carica</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lineup-content">
          <!-- Football Field -->
          <div class="lineup-field-container">
            <div class="lineup-field" id="lineupField">
              <!-- Field markings -->
              <div class="field-markings">
                <div class="center-circle"></div>
                <div class="center-line"></div>
                <div class="penalty-area penalty-top"></div>
                <div class="penalty-area penalty-bottom"></div>
                <div class="goal-area goal-top"></div>
                <div class="goal-area goal-bottom"></div>
              </div>
              
              <!-- Player positions will be rendered here -->
              <div class="player-positions" id="playerPositions"></div>
            </div>
          </div>

          <!-- Players Panel -->
          <div class="players-panel">
            <div class="panel-header">
              <h5>Giocatori Disponibili</h5>
              <div class="panel-filters">
                <select class="position-filter" id="positionFilter">
                  <option value="">Tutti i ruoli</option>
                  <option value="GK">Portieri</option>
                  <option value="DF">Difensori</option>
                  <option value="MF">Centrocampisti</option>
                  <option value="FW">Attaccanti</option>
                </select>
                <input type="search" class="player-search" placeholder="Cerca giocatore..." id="playerSearch">
              </div>
            </div>
            
            <div class="players-list" id="playersList">
              <!-- Players will be rendered here -->
            </div>
          </div>
        </div>

        <!-- Formation Status -->
        <div class="formation-status">
          <div class="status-info">
            <div class="status-item">
              <span class="status-label">Giocatori selezionati:</span>
              <span class="status-value" id="selectedCount">0/11</span>
            </div>
            <div class="status-item">
              <span class="status-label">Formazione:</span>
              <span class="status-value" id="currentFormationName">${this.formations[this.currentFormation].name}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Stato:</span>
              <span class="status-value status-incomplete" id="formationStatus">Incompleta</span>
            </div>
          </div>
          
          <div class="formation-actions-main">
            <button class="button button-secondary auto-select-btn">
              <span>🎯</span>
              <span>Selezione Automatica</span>
            </button>
            <button class="button button-ghost clear-all-btn">
              <span>🗑️</span>
              <span>Svuota Tutto</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderField();
    this.renderPlayersList();
    this.updateStatus();
  }

  renderField() {
    const positionsContainer = document.getElementById('playerPositions');
    const formation = this.formations[this.currentFormation];
    
    positionsContainer.innerHTML = formation.positions.map(position => `
      <div class="player-position ${position.required.toLowerCase()}" 
           data-position="${position.id}"
           style="left: ${position.x}%; top: ${position.y}%"
           title="${position.name}">
        <div class="position-slot" id="slot-${position.id}">
          <div class="position-label">${position.id}</div>
          <div class="position-name">${position.name}</div>
          <div class="drop-zone">
            <span class="drop-icon">+</span>
            <span class="drop-text">Trascina qui</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderPlayersList() {
    const container = document.getElementById('playersList');
    const searchTerm = document.getElementById('playerSearch')?.value.toLowerCase() || '';
    const positionFilter = document.getElementById('positionFilter')?.value || '';
    
    let filteredPlayers = this.options.availablePlayers.filter(player => {
      const matchesSearch = !searchTerm || 
        player.name.toLowerCase().includes(searchTerm) ||
        player.position.toLowerCase().includes(searchTerm);
      
      const matchesPosition = !positionFilter || player.position === positionFilter;
      
      return matchesSearch && matchesPosition;
    });

    // Sort by position and rating
    filteredPlayers.sort((a, b) => {
      const positionOrder = { 'GK': 1, 'DF': 2, 'MF': 3, 'FW': 4 };
      const aOrder = positionOrder[a.position] || 5;
      const bOrder = positionOrder[b.position] || 5;
      
      if (aOrder !== bOrder) return aOrder - bOrder;
      return (b.overall_rating || 0) - (a.overall_rating || 0);
    });

    container.innerHTML = filteredPlayers.map(player => {
      const isSelected = Array.from(this.selectedPlayers.values()).some(p => p.id === player.id);
      
      return `
        <div class="player-card ${isSelected ? 'selected' : ''}" 
             data-player-id="${player.id}"
             draggable="true">
          <div class="player-photo">
            <img src="${player.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60'}" 
                 alt="${player.name}">
          </div>
          
          <div class="player-info">
            <div class="player-name">${player.name}</div>
            <div class="player-details">
              <span class="player-position">${player.position}</span>
              <span class="player-rating">${player.overall_rating || 'N/A'}</span>
            </div>
          </div>
          
          <div class="player-actions">
            ${isSelected ? 
              '<button class="remove-player-btn" title="Rimuovi">❌</button>' :
              '<button class="add-player-btn" title="Aggiungi">➕</button>'
            }
          </div>
        </div>
      `;
    }).join('');

    if (filteredPlayers.length === 0) {
      container.innerHTML = `
        <div class="no-players">
          <div class="no-players-icon">👥</div>
          <div class="no-players-text">Nessun giocatore trovato</div>
          <div class="no-players-subtitle">Prova a modificare i filtri di ricerca</div>
        </div>
      `;
    }
  }

  bindEvents() {
    // Formation selection
    const formationSelect = document.getElementById('formationSelect');
    formationSelect?.addEventListener('change', (e) => {
      this.changeFormation(e.target.value);
    });

    // Search and filter
    const playerSearch = document.getElementById('playerSearch');
    const positionFilter = document.getElementById('positionFilter');
    
    playerSearch?.addEventListener('input', () => this.renderPlayersList());
    positionFilter?.addEventListener('change', () => this.renderPlayersList());

    // Drag and drop
    this.setupDragAndDrop();

    // Action buttons
    const autoSelectBtn = this.container.querySelector('.auto-select-btn');
    const clearAllBtn = this.container.querySelector('.clear-all-btn');
    const saveBtn = this.container.querySelector('.save-formation-btn');
    const loadBtn = this.container.querySelector('.load-formation-btn');

    autoSelectBtn?.addEventListener('click', () => this.autoSelectPlayers());
    clearAllBtn?.addEventListener('click', () => this.clearAllPlayers());
    saveBtn?.addEventListener('click', () => this.saveFormation());
    loadBtn?.addEventListener('click', () => this.loadFormation());

    // Player card actions
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-player-btn')) {
        const card = e.target.closest('.player-card');
        const playerId = card.dataset.playerId;
        this.addPlayerToFormation(playerId);
      } else if (e.target.classList.contains('remove-player-btn')) {
        const card = e.target.closest('.player-card');
        const playerId = card.dataset.playerId;
        this.removePlayerFromFormation(playerId);
      }
    });
  }

  setupDragAndDrop() {
    // Make player cards draggable
    this.container.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('player-card')) {
        e.dataTransfer.setData('text/plain', e.target.dataset.playerId);
        e.target.classList.add('dragging');
      }
    });

    this.container.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('player-card')) {
        e.target.classList.remove('dragging');
      }
    });

    // Setup drop zones
    this.container.addEventListener('dragover', (e) => {
      if (e.target.closest('.position-slot')) {
        e.preventDefault();
        e.target.closest('.position-slot').classList.add('drag-over');
      }
    });

    this.container.addEventListener('dragleave', (e) => {
      if (e.target.closest('.position-slot')) {
        e.target.closest('.position-slot').classList.remove('drag-over');
      }
    });

    this.container.addEventListener('drop', (e) => {
      e.preventDefault();
      const slot = e.target.closest('.position-slot');
      if (slot) {
        slot.classList.remove('drag-over');
        const playerId = e.dataTransfer.getData('text/plain');
        const positionId = slot.closest('.player-position').dataset.position;
        this.assignPlayerToPosition(playerId, positionId);
      }
    });
  }

  changeFormation(newFormation) {
    if (this.selectedPlayers.size > 0) {
      if (!confirm('Cambiare formazione rimuoverà tutti i giocatori selezionati. Continuare?')) {
        document.getElementById('formationSelect').value = this.currentFormation;
        return;
      }
    }

    this.currentFormation = newFormation;
    this.selectedPlayers.clear();
    this.renderField();
    this.renderPlayersList();
    this.updateStatus();
  }

  assignPlayerToPosition(playerId, positionId) {
    const player = this.options.availablePlayers.find(p => p.id === playerId);
    const formation = this.formations[this.currentFormation];
    const position = formation.positions.find(p => p.id === positionId);

    if (!player || !position) return;

    // Check if position is compatible
    if (!this.isPositionCompatible(player.position, position.required)) {
      this.showToast(`${player.name} non può giocare in posizione ${position.name}`, 'warning');
      return;
    }

    // Remove player from any existing position
    this.removePlayerFromFormation(playerId);

    // Assign to new position
    this.selectedPlayers.set(positionId, player);
    this.updatePositionSlot(positionId, player);
    this.renderPlayersList();
    this.updateStatus();
    this.notifyChange();
  }

  isPositionCompatible(playerPosition, requiredPosition) {
    const compatibility = {
      'GK': ['GK'],
      'DF': ['DF', 'MF'], // Defenders can play midfield
      'MF': ['MF', 'DF', 'FW'], // Midfielders are versatile
      'FW': ['FW', 'MF'] // Forwards can play midfield
    };

    return compatibility[playerPosition]?.includes(requiredPosition) || false;
  }

  updatePositionSlot(positionId, player) {
    const slot = document.getElementById(`slot-${positionId}`);
    if (!slot) return;

    if (player) {
      slot.innerHTML = `
        <div class="assigned-player">
          <div class="player-photo-small">
            <img src="${player.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=40&h=40'}" 
                 alt="${player.name}">
          </div>
          <div class="player-info-small">
            <div class="player-name-small">${player.name}</div>
            <div class="player-rating-small">${player.overall_rating || 'N/A'}</div>
          </div>
          <button class="remove-from-position-btn" title="Rimuovi">×</button>
        </div>
      `;

      // Bind remove button
      const removeBtn = slot.querySelector('.remove-from-position-btn');
      removeBtn?.addEventListener('click', () => {
        this.removePlayerFromPosition(positionId);
      });

      slot.classList.add('occupied');
    } else {
      const position = this.formations[this.currentFormation].positions.find(p => p.id === positionId);
      slot.innerHTML = `
        <div class="position-label">${positionId}</div>
        <div class="position-name">${position.name}</div>
        <div class="drop-zone">
          <span class="drop-icon">+</span>
          <span class="drop-text">Trascina qui</span>
        </div>
      `;
      slot.classList.remove('occupied');
    }
  }

  addPlayerToFormation(playerId) {
    const player = this.options.availablePlayers.find(p => p.id === playerId);
    if (!player) return;

    // Find best available position for this player
    const formation = this.formations[this.currentFormation];
    const availablePositions = formation.positions.filter(pos => 
      !this.selectedPlayers.has(pos.id) && 
      this.isPositionCompatible(player.position, pos.required)
    );

    if (availablePositions.length === 0) {
      this.showToast(`Nessuna posizione disponibile per ${player.name}`, 'warning');
      return;
    }

    // Assign to first available compatible position
    const position = availablePositions[0];
    this.assignPlayerToPosition(playerId, position.id);
  }

  removePlayerFromFormation(playerId) {
    // Find and remove player from any position
    for (const [positionId, player] of this.selectedPlayers.entries()) {
      if (player.id === playerId) {
        this.removePlayerFromPosition(positionId);
        break;
      }
    }
  }

  removePlayerFromPosition(positionId) {
    this.selectedPlayers.delete(positionId);
    this.updatePositionSlot(positionId, null);
    this.renderPlayersList();
    this.updateStatus();
    this.notifyChange();
  }

  autoSelectPlayers() {
    this.clearAllPlayers();

    const formation = this.formations[this.currentFormation];
    const playersByPosition = this.groupPlayersByPosition();

    formation.positions.forEach(position => {
      const availablePlayers = playersByPosition[position.required] || [];
      const unselectedPlayers = availablePlayers.filter(player => 
        !Array.from(this.selectedPlayers.values()).some(p => p.id === player.id)
      );

      if (unselectedPlayers.length > 0) {
        // Select best available player for this position
        const bestPlayer = unselectedPlayers[0]; // Already sorted by rating
        this.selectedPlayers.set(position.id, bestPlayer);
        this.updatePositionSlot(position.id, bestPlayer);
      }
    });

    this.renderPlayersList();
    this.updateStatus();
    this.notifyChange();
    this.showToast('Selezione automatica completata', 'success');
  }

  groupPlayersByPosition() {
    const groups = { GK: [], DF: [], MF: [], FW: [] };
    
    this.options.availablePlayers.forEach(player => {
      if (groups[player.position]) {
        groups[player.position].push(player);
      }
    });

    // Sort each group by rating (descending)
    Object.keys(groups).forEach(position => {
      groups[position].sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
    });

    return groups;
  }

  clearAllPlayers() {
    this.selectedPlayers.clear();
    
    // Clear all position slots
    const formation = this.formations[this.currentFormation];
    formation.positions.forEach(position => {
      this.updatePositionSlot(position.id, null);
    });

    this.renderPlayersList();
    this.updateStatus();
    this.notifyChange();
  }

  updateStatus() {
    const selectedCount = this.selectedPlayers.size;
    const totalPositions = this.formations[this.currentFormation].positions.length;
    const isComplete = selectedCount === totalPositions;

    document.getElementById('selectedCount').textContent = `${selectedCount}/${totalPositions}`;
    document.getElementById('currentFormationName').textContent = this.formations[this.currentFormation].name;
    
    const statusElement = document.getElementById('formationStatus');
    if (isComplete) {
      statusElement.textContent = 'Completa';
      statusElement.className = 'status-value status-complete';
    } else {
      statusElement.textContent = 'Incompleta';
      statusElement.className = 'status-value status-incomplete';
    }
  }

  saveFormation() {
    const formationData = {
      formation: this.currentFormation,
      players: Object.fromEntries(this.selectedPlayers),
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('savedFormation', JSON.stringify(formationData));
    this.showToast('Formazione salvata', 'success');
  }

  loadFormation() {
    const saved = localStorage.getItem('savedFormation');
    if (!saved) {
      this.showToast('Nessuna formazione salvata trovata', 'warning');
      return;
    }

    try {
      const formationData = JSON.parse(saved);
      
      // Change formation if different
      if (formationData.formation !== this.currentFormation) {
        this.currentFormation = formationData.formation;
        document.getElementById('formationSelect').value = this.currentFormation;
        this.renderField();
      }

      // Clear current selection
      this.selectedPlayers.clear();

      // Load saved players
      Object.entries(formationData.players).forEach(([positionId, player]) => {
        // Verify player still exists
        const currentPlayer = this.options.availablePlayers.find(p => p.id === player.id);
        if (currentPlayer) {
          this.selectedPlayers.set(positionId, currentPlayer);
          this.updatePositionSlot(positionId, currentPlayer);
        }
      });

      this.renderPlayersList();
      this.updateStatus();
      this.notifyChange();
      this.showToast('Formazione caricata', 'success');
    } catch (error) {
      this.showToast('Errore nel caricamento della formazione', 'error');
    }
  }

  notifyChange() {
    const isComplete = this.selectedPlayers.size === this.formations[this.currentFormation].positions.length;
    
    this.options.onLineupChange({
      formation: this.currentFormation,
      players: Object.fromEntries(this.selectedPlayers),
      isComplete: isComplete,
      selectedCount: this.selectedPlayers.size,
      totalPositions: this.formations[this.currentFormation].positions.length
    });
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}