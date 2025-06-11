<div class="player-selection-list">
  <div class="selection-header">
    <div class="header-info">
      <h3 class="list-title">Selezione Giocatori</h3>
      <span class="selection-count">
        <span class="selected-count">0</span> / <span class="total-count">0</span> selezionati
      </span>
    </div>
    
    <div class="selection-actions">
      <button class="action-btn select-all-btn" aria-label="Seleziona tutti">
        ✓ Tutti
      </button>
      <button class="action-btn deselect-all-btn" aria-label="Deseleziona tutti">
        ✗ Nessuno
      </button>
      <button class="action-btn filter-btn" aria-label="Filtri">
        🔍 Filtri
      </button>
    </div>
  </div>
  
  <div class="selection-filters" style="display: none;">
    <div class="filter-row">
      <select class="filter-select position-filter" aria-label="Filtra per posizione">
        <option value="">Tutte le posizioni</option>
        <option value="GK">Portiere</option>
        <option value="DF">Difensore</option>
        <option value="MF">Centrocampista</option>
        <option value="FW">Attaccante</option>
      </select>
      
      <select class="filter-select fitness-filter" aria-label="Filtra per forma fisica">
        <option value="">Tutte le condizioni</option>
        <option value="excellent">Ottima (90-100%)</option>
        <option value="good">Buona (70-89%)</option>
        <option value="average">Media (50-69%)</option>
        <option value="poor">Scarsa (0-49%)</option>
      </select>
      
      <select class="filter-select availability-filter" aria-label="Filtra per disponibilità">
        <option value="">Tutti</option>
        <option value="available">Disponibili</option>
        <option value="injured">Infortunati</option>
        <option value="suspended">Squalificati</option>
      </select>
    </div>
  </div>
  
  <div class="selection-summary">
    <div class="summary-stats">
      <div class="stat-item">
        <span class="stat-label">Morale Medio</span>
        <span class="stat-value avg-morale">0</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Forma Media</span>
        <span class="stat-value avg-fitness">0%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Rating Medio</span>
        <span class="stat-value avg-rating">0</span>
      </div>
    </div>
  </div>
  
  <div class="player-list-container">
    <div class="player-selection-grid" role="listbox" aria-multiselectable="true" aria-label="Lista giocatori selezionabili">
      <!-- Player selection items will be inserted here -->
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">👥</div>
      <h4>Nessun giocatore disponibile</h4>
      <p>Modifica i filtri per vedere più giocatori</p>
    </div>
  </div>
  
  <div class="selection-footer">
    <div class="selection-info">
      <span class="info-text">Seleziona i giocatori per l'allenamento</span>
    </div>
    
    <div class="selection-controls">
      <button class="button button-ghost cancel-btn">
        Annulla
      </button>
      <button class="button button-primary confirm-btn" disabled>
        Conferma Selezione
      </button>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-selection">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=60" 
         alt="Selection Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.player-selection-list {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.selection-count {
  font-size: 12px;
  color: var(--text-muted);
}

.selected-count {
  font-weight: 600;
  color: var(--primary);
}

.selection-actions {
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

.selection-filters {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.filter-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
  flex: 1;
  min-width: 120px;
}

.selection-summary {
  margin-bottom: 16px;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 2px;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
}

.player-list-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  min-height: 200px;
}

.player-selection-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.player-selection-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.player-selection-item:hover {
  background: var(--background);
  border-color: var(--primary);
}

.player-selection-item.selected {
  background: rgba(37, 99, 235, 0.1);
  border-color: var(--primary);
}

.player-selection-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.selection-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.player-selection-item.selected .selection-checkbox {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.selection-checkbox::after {
  content: '✓';
  font-size: 12px;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.player-selection-item.selected .selection-checkbox::after {
  opacity: 1;
}

.player-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-avatar-small {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.player-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-details {
  flex: 1;
}

.player-name-small {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 2px 0;
}

.player-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
}

.player-position-small {
  background: var(--primary);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
}

.player-stats-small {
  display: flex;
  gap: 12px;
  align-items: center;
}

.stat-small {
  text-align: center;
}

.stat-small .stat-label {
  font-size: 9px;
  margin-bottom: 1px;
}

.stat-small .stat-value {
  font-size: 12px;
}

.fitness-bar-small {
  width: 30px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.fitness-fill-small {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  transition: width 0.3s ease;
}

.status-indicator-small {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.selection-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.info-text {
  font-size: 12px;
  color: var(--text-muted);
}

.selection-controls {
  display: flex;
  gap: 12px;
}

.sponsor-slot-selection {
  margin-top: 16px;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* Responsive */
@media (max-width: 768px) {
  .selection-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .selection-actions {
    justify-content: center;
  }
  
  .filter-row {
    flex-direction: column;
  }
  
  .summary-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  .player-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .player-stats-small {
    align-self: stretch;
    justify-content: space-around;
  }
  
  .selection-footer {
    flex-direction: column;
    gap: 12px;
  }
  
  .selection-controls {
    width: 100%;
    justify-content: stretch;
  }
  
  .selection-controls button {
    flex: 1;
  }
}
</style>

<script>
class PlayerSelectionList {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      multiSelect: true,
      maxSelections: null,
      minSelections: 0,
      showFilters: true,
      showSummary: true,
      ...options
    };
    
    this.players = [];
    this.filteredPlayers = [];
    this.selectedPlayers = new Set();
    this.filters = {
      position: '',
      fitness: '',
      availability: ''
    };
    
    this.init();
  }
  
  init() {
    this.setupUI();
    this.bindEvents();
    this.loadPlayers();
  }
  
  setupUI() {
    // Hide filters if not needed
    if (!this.options.showFilters) {
      this.element.querySelector('.selection-filters').style.display = 'none';
      this.element.querySelector('.filter-btn').style.display = 'none';
    }
    
    // Hide summary if not needed
    if (!this.options.showSummary) {
      this.element.querySelector('.selection-summary').style.display = 'none';
    }
    
    // Update multiselect attributes
    const listbox = this.element.querySelector('.player-selection-grid');
    listbox.setAttribute('aria-multiselectable', this.options.multiSelect.toString());
  }
  
  bindEvents() {
    // Action buttons
    this.element.querySelector('.select-all-btn').addEventListener('click', () => {
      this.selectAll();
    });
    
    this.element.querySelector('.deselect-all-btn').addEventListener('click', () => {
      this.deselectAll();
    });
    
    this.element.querySelector('.filter-btn').addEventListener('click', () => {
      this.toggleFilters();
    });
    
    // Filters
    this.element.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const filterType = e.target.classList.contains('position-filter') ? 'position' :
                          e.target.classList.contains('fitness-filter') ? 'fitness' :
                          'availability';
        this.filters[filterType] = e.target.value;
        this.applyFilters();
      });
    });
    
    // Footer buttons
    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.cancel();
    });
    
    this.element.querySelector('.confirm-btn').addEventListener('click', () => {
      this.confirm();
    });
    
    // Keyboard navigation
    this.element.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });
  }
  
  async loadPlayers() {
    try {
      // In a real app, this would fetch from game state
      this.players = await this.fetchPlayers();
      this.filteredPlayers = [...this.players];
      this.renderPlayers();
      this.updateCounts();
      this.updateSummary();
    } catch (error) {
      console.error('Error loading players:', error);
      this.showError('Errore nel caricamento dei giocatori');
    }
  }
  
  async fetchPlayers() {
    // Mock data - in real app this would come from game state
    return [
      {
        id: 1,
        name: 'Mario Rossi',
        position: 'FW',
        age: 25,
        overall_rating: 85,
        morale: 80,
        fitness: 95,
        injury_status: 'healthy',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      // Add more mock players as needed
    ];
  }
  
  renderPlayers() {
    const grid = this.element.querySelector('.player-selection-grid');
    const emptyState = this.element.querySelector('.empty-state');
    
    if (this.filteredPlayers.length === 0) {
      grid.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    grid.style.display = 'flex';
    emptyState.style.display = 'none';
    
    grid.innerHTML = '';
    
    this.filteredPlayers.forEach((player, index) => {
      const item = this.createPlayerItem(player, index);
      grid.appendChild(item);
    });
  }
  
  createPlayerItem(player, index) {
    const item = document.createElement('div');
    item.className = 'player-selection-item';
    item.dataset.playerId = player.id;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', 'false');
    item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    
    const isSelected = this.selectedPlayers.has(player.id);
    const isAvailable = this.isPlayerAvailable(player);
    
    if (isSelected) {
      item.classList.add('selected');
      item.setAttribute('aria-selected', 'true');
    }
    
    if (!isAvailable) {
      item.classList.add('disabled');
      item.setAttribute('aria-disabled', 'true');
    }
    
    const fitnessPercentage = player.fitness || 0;
    
    item.innerHTML = `
      <div class="selection-checkbox"></div>
      <div class="player-info">
        <div class="player-avatar-small">
          <img src="${player.photo}" alt="Foto di ${player.name}" loading="lazy">
        </div>
        <div class="player-details">
          <h4 class="player-name-small">${player.name}</h4>
          <div class="player-meta">
            <span class="player-position-small">${player.position}</span>
            <span>${player.age} anni</span>
            ${!isAvailable ? `<span class="unavailable-reason">${this.getUnavailableReason(player)}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="player-stats-small">
        <div class="stat-small">
          <span class="stat-label">Rating</span>
          <span class="stat-value">${player.overall_rating}</span>
        </div>
        <div class="stat-small">
          <span class="stat-label">Morale</span>
          <span class="stat-value">${player.morale}</span>
        </div>
        <div class="stat-small">
          <span class="stat-label">Forma</span>
          <div class="fitness-bar-small">
            <div class="fitness-fill-small" style="width: ${fitnessPercentage}%"></div>
          </div>
        </div>
        <div class="status-indicator-small ${this.getStatusClass(player)}">
          ${this.getStatusIcon(player)}
        </div>
      </div>
    `;
    
    // Add click handler
    item.addEventListener('click', () => {
      if (isAvailable) {
        this.togglePlayerSelection(player.id);
      }
    });
    
    // Add keyboard handler
    item.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && isAvailable) {
        e.preventDefault();
        this.togglePlayerSelection(player.id);
      }
    });
    
    return item;
  }
  
  isPlayerAvailable(player) {
    return !player.injury_status || player.injury_status === 'healthy';
  }
  
  getUnavailableReason(player) {
    if (player.injury_status && player.injury_status !== 'healthy') {
      return 'Infortunato';
    }
    if (player.suspended) {
      return 'Squalificato';
    }
    return 'Non disponibile';
  }
  
  getStatusClass(player) {
    if (!this.isPlayerAvailable(player)) return 'status-unavailable';
    if (player.fitness >= 90) return 'status-excellent';
    if (player.fitness >= 70) return 'status-good';
    if (player.fitness >= 50) return 'status-average';
    return 'status-poor';
  }
  
  getStatusIcon(player) {
    if (!this.isPlayerAvailable(player)) return '❌';
    if (player.fitness >= 90) return '✅';
    if (player.fitness >= 70) return '👍';
    if (player.fitness >= 50) return '⚠️';
    return '🔻';
  }
  
  togglePlayerSelection(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (!player || !this.isPlayerAvailable(player)) return;
    
    if (this.selectedPlayers.has(playerId)) {
      this.selectedPlayers.delete(playerId);
    } else {
      // Check max selections
      if (this.options.maxSelections && this.selectedPlayers.size >= this.options.maxSelections) {
        this.showError(`Massimo ${this.options.maxSelections} giocatori selezionabili`);
        return;
      }
      
      // If single select, clear previous selection
      if (!this.options.multiSelect) {
        this.selectedPlayers.clear();
      }
      
      this.selectedPlayers.add(playerId);
    }
    
    this.updatePlayerItemSelection(playerId);
    this.updateCounts();
    this.updateSummary();
    this.updateConfirmButton();
    
    // Dispatch selection change event
    this.element.dispatchEvent(new CustomEvent('selectionChange', {
      detail: {
        selectedPlayers: Array.from(this.selectedPlayers),
        selectedCount: this.selectedPlayers.size
      }
    }));
  }
  
  updatePlayerItemSelection(playerId) {
    const item = this.element.querySelector(`[data-player-id="${playerId}"]`);
    if (!item) return;
    
    const isSelected = this.selectedPlayers.has(playerId);
    
    if (isSelected) {
      item.classList.add('selected');
      item.setAttribute('aria-selected', 'true');
    } else {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    }
  }
  
  selectAll() {
    const availablePlayers = this.filteredPlayers.filter(p => this.isPlayerAvailable(p));
    
    // Check max selections
    if (this.options.maxSelections && availablePlayers.length > this.options.maxSelections) {
      const toSelect = availablePlayers.slice(0, this.options.maxSelections);
      toSelect.forEach(player => this.selectedPlayers.add(player.id));
      this.showError(`Selezionati solo i primi ${this.options.maxSelections} giocatori`);
    } else {
      availablePlayers.forEach(player => this.selectedPlayers.add(player.id));
    }
    
    this.updateAllSelections();
  }
  
  deselectAll() {
    this.selectedPlayers.clear();
    this.updateAllSelections();
  }
  
  updateAllSelections() {
    this.element.querySelectorAll('.player-selection-item').forEach(item => {
      const playerId = parseInt(item.dataset.playerId);
      this.updatePlayerItemSelection(playerId);
    });
    
    this.updateCounts();
    this.updateSummary();
    this.updateConfirmButton();
    
    // Dispatch selection change event
    this.element.dispatchEvent(new CustomEvent('selectionChange', {
      detail: {
        selectedPlayers: Array.from(this.selectedPlayers),
        selectedCount: this.selectedPlayers.size
      }
    }));
  }
  
  applyFilters() {
    this.filteredPlayers = this.players.filter(player => {
      // Position filter
      if (this.filters.position && player.position !== this.filters.position) {
        return false;
      }
      
      // Fitness filter
      if (this.filters.fitness) {
        const fitness = player.fitness || 0;
        switch (this.filters.fitness) {
          case 'excellent':
            if (fitness < 90) return false;
            break;
          case 'good':
            if (fitness < 70 || fitness >= 90) return false;
            break;
          case 'average':
            if (fitness < 50 || fitness >= 70) return false;
            break;
          case 'poor':
            if (fitness >= 50) return false;
            break;
        }
      }
      
      // Availability filter
      if (this.filters.availability) {
        const isAvailable = this.isPlayerAvailable(player);
        switch (this.filters.availability) {
          case 'available':
            if (!isAvailable) return false;
            break;
          case 'injured':
            if (isAvailable || !player.injury_status || player.injury_status === 'healthy') return false;
            break;
          case 'suspended':
            if (!player.suspended) return false;
            break;
        }
      }
      
      return true;
    });
    
    this.renderPlayers();
    this.updateCounts();
  }
  
  toggleFilters() {
    const filters = this.element.querySelector('.selection-filters');
    const isVisible = filters.style.display !== 'none';
    filters.style.display = isVisible ? 'none' : 'block';
    
    const btn = this.element.querySelector('.filter-btn');
    btn.textContent = isVisible ? '🔍 Filtri' : '🔍 Nascondi';
  }
  
  updateCounts() {
    this.element.querySelector('.selected-count').textContent = this.selectedPlayers.size;
    this.element.querySelector('.total-count').textContent = this.filteredPlayers.length;
  }
  
  updateSummary() {
    if (!this.options.showSummary || this.selectedPlayers.size === 0) {
      this.element.querySelector('.avg-morale').textContent = '0';
      this.element.querySelector('.avg-fitness').textContent = '0%';
      this.element.querySelector('.avg-rating').textContent = '0';
      return;
    }
    
    const selectedPlayerData = this.players.filter(p => this.selectedPlayers.has(p.id));
    
    const avgMorale = Math.round(
      selectedPlayerData.reduce((sum, p) => sum + (p.morale || 0), 0) / selectedPlayerData.length
    );
    
    const avgFitness = Math.round(
      selectedPlayerData.reduce((sum, p) => sum + (p.fitness || 0), 0) / selectedPlayerData.length
    );
    
    const avgRating = Math.round(
      selectedPlayerData.reduce((sum, p) => sum + (p.overall_rating || 0), 0) / selectedPlayerData.length
    );
    
    this.element.querySelector('.avg-morale').textContent = avgMorale;
    this.element.querySelector('.avg-fitness').textContent = `${avgFitness}%`;
    this.element.querySelector('.avg-rating').textContent = avgRating;
  }
  
  updateConfirmButton() {
    const confirmBtn = this.element.querySelector('.confirm-btn');
    const canConfirm = this.selectedPlayers.size >= this.options.minSelections;
    
    confirmBtn.disabled = !canConfirm;
    
    if (canConfirm) {
      confirmBtn.textContent = `Conferma (${this.selectedPlayers.size})`;
    } else {
      confirmBtn.textContent = `Seleziona almeno ${this.options.minSelections}`;
    }
  }
  
  handleKeyboardNavigation(e) {
    const items = Array.from(this.element.querySelectorAll('.player-selection-item:not(.disabled)'));
    const currentIndex = items.findIndex(item => item.getAttribute('tabindex') === '0');
    
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = Math.min(currentIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
    }
    
    if (newIndex !== currentIndex) {
      items[currentIndex].setAttribute('tabindex', '-1');
      items[newIndex].setAttribute('tabindex', '0');
      items[newIndex].focus();
    }
  }
  
  confirm() {
    if (this.selectedPlayers.size < this.options.minSelections) {
      this.showError(`Seleziona almeno ${this.options.minSelections} giocatori`);
      return;
    }
    
    const selectedPlayerData = this.players.filter(p => this.selectedPlayers.has(p.id));
    
    // Dispatch confirm event
    this.element.dispatchEvent(new CustomEvent('selectionConfirm', {
      detail: {
        selectedPlayers: selectedPlayerData,
        selectedIds: Array.from(this.selectedPlayers)
      }
    }));
  }
  
  cancel() {
    // Dispatch cancel event
    this.element.dispatchEvent(new CustomEvent('selectionCancel', {
      detail: {
        selectedPlayers: Array.from(this.selectedPlayers)
      }
    }));
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  getSelectedPlayers() {
    return Array.from(this.selectedPlayers);
  }
  
  setSelectedPlayers(playerIds) {
    this.selectedPlayers = new Set(playerIds);
    this.updateAllSelections();
  }
  
  addPlayer(player) {
    this.players.push(player);
    this.applyFilters();
  }
  
  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
    this.selectedPlayers.delete(playerId);
    this.applyFilters();
  }
  
  updatePlayer(playerId, updates) {
    const playerIndex = this.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      this.players[playerIndex] = { ...this.players[playerIndex], ...updates };
      this.applyFilters();
    }
  }
  
  clearSelection() {
    this.selectedPlayers.clear();
    this.updateAllSelections();
  }
  
  setOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.setupUI();
    this.updateConfirmButton();
  }
}

// Auto-initialize player selection lists
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.player-selection-list').forEach(list => {
    if (!list.dataset.initialized) {
      const options = JSON.parse(list.dataset.options || '{}');
      new PlayerSelectionList(list, options);
      list.dataset.initialized = 'true';
    }
  });
});
</script>