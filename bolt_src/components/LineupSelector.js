/**
 * LineupSelector Component
 * Used in: MatchSimulation.page.js
 * Expected data: { formation, players, positions }
 */

export default class LineupSelector {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.formation = props.formation || '4-4-2';
    this.selectedPlayers = props.selectedPlayers || {};
    this.availablePlayers = props.availablePlayers || [];
    this.onLineupChange = props.onLineupChange || (() => {});
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="lineup-selector">
        <div class="lineup-header">
          <h4>Formazione Titolare</h4>
          <select class="formation-select">
            <option value="4-4-2" ${this.formation === '4-4-2' ? 'selected' : ''}>4-4-2</option>
            <option value="4-3-3" ${this.formation === '4-3-3' ? 'selected' : ''}>4-3-3</option>
            <option value="3-5-2" ${this.formation === '3-5-2' ? 'selected' : ''}>3-5-2</option>
            <option value="4-2-3-1" ${this.formation === '4-2-3-1' ? 'selected' : ''}>4-2-3-1</option>
          </select>
        </div>
        
        <div class="lineup-field">
          <div class="field-container">
            ${this.renderField()}
          </div>
        </div>
        
        <div class="lineup-bench">
          <h5>Panchina</h5>
          <div class="bench-players">
            ${this.renderBenchPlayers()}
          </div>
        </div>
        
        <div class="lineup-actions">
          <button class="button button-secondary auto-select-btn">🎯 Selezione Automatica</button>
          <button class="button button-primary confirm-lineup-btn">✅ Conferma Formazione</button>
        </div>
      </div>
    `;
    
    this.bindEvents();
  }

  renderField() {
    const positions = this.getFormationPositions();
    
    return `
      <div class="football-field">
        <div class="field-lines">
          <div class="center-line"></div>
          <div class="center-circle"></div>
          <div class="penalty-area penalty-area-top"></div>
          <div class="penalty-area penalty-area-bottom"></div>
        </div>
        
        <div class="field-positions">
          ${positions.map(position => `
            <div class="position-slot" 
                 data-position="${position.id}"
                 style="left: ${position.x}%; top: ${position.y}%;">
              ${this.renderPositionPlayer(position)}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderPositionPlayer(position) {
    const player = this.selectedPlayers[position.id];
    
    if (player) {
      return `
        <div class="position-player" data-player-id="${player.id}">
          <img src="${player.photo}" alt="${player.name}" class="player-photo">
          <span class="player-name">${player.name}</span>
          <span class="player-position">${position.role}</span>
          <button class="remove-player-btn" title="Rimuovi giocatore">×</button>
        </div>
      `;
    }
    
    return `
      <div class="empty-position">
        <div class="position-icon">+</div>
        <span class="position-label">${position.role}</span>
      </div>
    `;
  }

  renderBenchPlayers() {
    const benchPlayers = this.availablePlayers.filter(player =>
      !Object.values(this.selectedPlayers).find(p => p.id === player.id)
    );

    return benchPlayers.map(player => `
      <div class="bench-player" data-player-id="${player.id}" draggable="true">
        <img src="${player.photo}" alt="${player.name}" class="player-photo-small">
        <div class="player-info">
          <span class="player-name">${player.name}</span>
          <span class="player-position">${player.position}</span>
          <span class="player-rating">${player.overall_rating}</span>
        </div>
      </div>
    `).join('');
  }

  getFormationPositions() {
    const formations = {
      '4-4-2': [
        // Goalkeeper
        { id: 'gk', role: 'GK', x: 50, y: 90 },
        // Defense
        { id: 'lb', role: 'LB', x: 20, y: 75 },
        { id: 'cb1', role: 'CB', x: 40, y: 75 },
        { id: 'cb2', role: 'CB', x: 60, y: 75 },
        { id: 'rb', role: 'RB', x: 80, y: 75 },
        // Midfield
        { id: 'lm', role: 'LM', x: 25, y: 50 },
        { id: 'cm1', role: 'CM', x: 40, y: 50 },
        { id: 'cm2', role: 'CM', x: 60, y: 50 },
        { id: 'rm', role: 'RM', x: 75, y: 50 },
        // Attack
        { id: 'st1', role: 'ST', x: 40, y: 25 },
        { id: 'st2', role: 'ST', x: 60, y: 25 }
      ],
      '4-3-3': [
        // Goalkeeper
        { id: 'gk', role: 'GK', x: 50, y: 90 },
        // Defense
        { id: 'lb', role: 'LB', x: 20, y: 75 },
        { id: 'cb1', role: 'CB', x: 40, y: 75 },
        { id: 'cb2', role: 'CB', x: 60, y: 75 },
        { id: 'rb', role: 'RB', x: 80, y: 75 },
        // Midfield
        { id: 'cdm', role: 'CDM', x: 50, y: 60 },
        { id: 'cm1', role: 'CM', x: 35, y: 45 },
        { id: 'cm2', role: 'CM', x: 65, y: 45 },
        // Attack
        { id: 'lw', role: 'LW', x: 25, y: 25 },
        { id: 'st', role: 'ST', x: 50, y: 20 },
        { id: 'rw', role: 'RW', x: 75, y: 25 }
      ]
    };
    
    return formations[this.formation] || formations['4-4-2'];
  }

  bindEvents() {
    // Formation change
    const formationSelect = this.container.querySelector('.formation-select');
    formationSelect?.addEventListener('change', (e) => {
      this.formation = e.target.value;
      this.selectedPlayers = {}; // Clear selections when changing formation
      this.render();
      this.onLineupChange(this.getLineupData());
    });

    // Position slot clicks
    const positionSlots = this.container.querySelectorAll('.position-slot');
    positionSlots.forEach(slot => {
      slot.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-player-btn')) {
          this.removePlayerFromPosition(slot.dataset.position);
        } else if (slot.querySelector('.empty-position')) {
          this.showPlayerSelector(slot.dataset.position);
        }
      });
    });

    // Drag and drop for bench players
    const benchPlayers = this.container.querySelectorAll('.bench-player');
    benchPlayers.forEach(player => {
      player.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', player.dataset.playerId);
      });
    });

    // Drop zones for positions
    positionSlots.forEach(slot => {
      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      
      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('text/plain');
        const player = this.availablePlayers.find(p => p.id == playerId);
        if (player) {
          this.assignPlayerToPosition(player, slot.dataset.position);
        }
      });
    });

    // Action buttons
    const autoSelectBtn = this.container.querySelector('.auto-select-btn');
    const confirmLineupBtn = this.container.querySelector('.confirm-lineup-btn');
    
    autoSelectBtn?.addEventListener('click', () => this.autoSelectLineup());
    confirmLineupBtn?.addEventListener('click', () => this.confirmLineup());
  }

  showPlayerSelector(positionId) {
    const availablePlayers = this.getAvailablePlayersForPosition(positionId);

    if (availablePlayers.length === 0) {
      alert('Nessun giocatore disponibile per questa posizione');
      return;
    }

    const modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal">
        <h3>Seleziona giocatore</h3>
        <ul class="player-select-list">
          ${availablePlayers.map(p => `<li class="player-select-item" data-id="${p.id}">${p.name} (${p.position})</li>`).join('')}
        </ul>
        <div style="text-align:right; margin-top:16px;">
          <button id="cancelPlayerSelectBtn" class="button button-secondary">Annulla</button>
        </div>
      </div>`;
    modalContainer.style.display = 'flex';

    const closeModal = () => {
      modalContainer.style.display = 'none';
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelectorAll('.player-select-item').forEach(item => {
      item.addEventListener('click', () => {
        const playerId = parseInt(item.dataset.id);
        const player = availablePlayers.find(p => p.id === playerId);
        if (player) {
          this.assignPlayerToPosition(player, positionId);
        }
        closeModal();
      });
    });

    modalContainer.querySelector('#cancelPlayerSelectBtn')?.addEventListener('click', closeModal);
  }

  assignPlayerToPosition(player, positionId) {
    this.selectedPlayers[positionId] = player;
    this.render();
    this.onLineupChange(this.getLineupData());
  }

  removePlayerFromPosition(positionId) {
    delete this.selectedPlayers[positionId];
    this.render();
    this.onLineupChange(this.getLineupData());
  }

  getAvailablePlayersForPosition(positionId) {
    return this.availablePlayers.filter(player =>
      !Object.values(this.selectedPlayers).find(p => p.id === player.id)
    );
  }

  autoSelectLineup() {
    const positions = this.getFormationPositions();
    this.selectedPlayers = {};
    
    positions.forEach(position => {
      const availablePlayers = this.getAvailablePlayersForPosition(position.id);
      if (availablePlayers.length > 0) {
        // Select best rated available player
        const bestPlayer = availablePlayers.reduce((best, current) =>
          current.overall_rating > best.overall_rating ? current : best
        );
        this.selectedPlayers[position.id] = bestPlayer;
      }
    });
    
    this.render();
    this.onLineupChange(this.getLineupData());
  }

  confirmLineup() {
    const lineupData = this.getLineupData();
    const selectedCount = Object.keys(this.selectedPlayers).length;
    
    if (selectedCount < 11) {
      alert(`Seleziona tutti i 11 giocatori. Attualmente selezionati: ${selectedCount}`);
      return;
    }
    
    this.onLineupChange(lineupData);
    alert('Formazione confermata!');
  }

  getLineupData() {
    return {
      formation: this.formation,
      players: this.selectedPlayers,
      isComplete: Object.keys(this.selectedPlayers).length === 11
    };
  }

  setAvailablePlayers(players) {
    this.availablePlayers = players;
    this.render();
  }

  setFormation(formation) {
    this.formation = formation;
    this.selectedPlayers = {};
    this.render();
  }
}