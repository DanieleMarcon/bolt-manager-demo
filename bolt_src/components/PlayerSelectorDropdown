<div class="player-selector-dropdown">
  <div class="selector-header">
    <label for="playerSelector" class="selector-label"></label>
    <div class="selector-wrapper">
      <select id="playerSelector" class="player-select" aria-label="Seleziona giocatore">
        <option value="">Seleziona giocatore</option>
        <!-- Options will be populated dynamically -->
      </select>
      <div class="selector-arrow">▼</div>
    </div>
  </div>
  
  <div class="selected-player-preview" style="display: none;">
    <div class="preview-content">
      <img src="" alt="Player photo" class="player-photo-mini" loading="lazy">
      <div class="player-info-mini">
        <span class="player-name-mini"></span>
        <div class="player-meta-mini">
          <span class="player-position-mini"></span>
          <span class="player-rating-mini"></span>
        </div>
      </div>
    </div>
    <button class="clear-selection-btn" aria-label="Cancella selezione">✕</button>
  </div>
</div>

<style>
.player-selector-dropdown {
  margin-bottom: 16px;
}

.selector-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
}

.selector-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.selector-wrapper {
  position: relative;
}

.player-select {
  width: 100%;
  padding: 10px 12px;
  padding-right: 30px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.player-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.selector-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--text-muted);
  pointer-events: none;
}

.selected-player-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 8px;
  margin-top: 8px;
}

.preview-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.player-photo-mini {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.player-name-mini {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 2px;
}

.player-meta-mini {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}

.player-position-mini {
  background: var(--primary);
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.clear-selection-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-selection-btn:hover {
  background: var(--border);
  color: var(--text);
}

/* Responsive */
@media (max-width: 768px) {
  .player-select {
    font-size: 12px;
    padding: 8px 10px;
  }
}
</style>

<script>
class PlayerSelectorDropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      label: 'Giocatore',
      players: [],
      selectedPlayerId: null,
      onChange: null,
      filterByPosition: null,
      showPreview: true,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.setLabel(this.options.label);
    this.populateOptions(this.options.players);
    this.bindEvents();
    
    if (this.options.selectedPlayerId) {
      this.selectPlayer(this.options.selectedPlayerId);
    }
  }
  
  setLabel(label) {
    this.element.querySelector('.selector-label').textContent = label;
  }
  
  populateOptions(players) {
    const select = this.element.querySelector('.player-select');
    
    // Clear existing options except first
    while (select.options.length > 1) {
      select.remove(1);
    }
    
    // Filter players if needed
    let filteredPlayers = players;
    if (this.options.filterByPosition) {
      filteredPlayers = players.filter(player => player.position === this.options.filterByPosition);
    }
    
    // Add player options
    filteredPlayers.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id;
      option.textContent = `${player.name} (${player.position})`;
      select.appendChild(option);
    });
  }
  
  bindEvents() {
    // Select change
    this.element.querySelector('.player-select').addEventListener('change', (e) => {
      const playerId = e.target.value;
      if (playerId) {
        this.selectPlayer(playerId);
      } else {
        this.clearSelection();
      }
    });
    
    // Clear button
    this.element.querySelector('.clear-selection-btn').addEventListener('click', () => {
      this.clearSelection();
    });
  }
  
  selectPlayer(playerId) {
    const player = this.options.players.find(p => p.id == playerId);
    if (!player) return;
    
    // Update select value
    this.element.querySelector('.player-select').value = playerId;
    
    // Update preview
    if (this.options.showPreview) {
      this.updatePreview(player);
      this.element.querySelector('.selected-player-preview').style.display = 'flex';
    }
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(player);
    }
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('playerSelected', {
      detail: { player }
    }));
  }
  
  updatePreview(player) {
    this.element.querySelector('.player-photo-mini').src = player.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=64&h=64';
    this.element.querySelector('.player-name-mini').textContent = player.name;
    this.element.querySelector('.player-position-mini').textContent = player.position;
    this.element.querySelector('.player-rating-mini').textContent = `Rating: ${player.rating || 'N/A'}`;
  }
  
  clearSelection() {
    // Clear select value
    this.element.querySelector('.player-select').value = '';
    
    // Hide preview
    this.element.querySelector('.selected-player-preview').style.display = 'none';
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(null);
    }
    
    // Dispatch change event
    this.element.dispatchEvent(new CustomEvent('playerSelected', {
      detail: { player: null }
    }));
  }
  
  // Public methods
  getSelectedPlayer() {
    const playerId = this.element.querySelector('.player-select').value;
    if (!playerId) return null;
    
    return this.options.players.find(p => p.id == playerId);
  }
  
  setPlayers(players) {
    this.options.players = players;
    this.populateOptions(players);
  }
  
  setFilterByPosition(position) {
    this.options.filterByPosition = position;
    this.populateOptions(this.options.players);
  }
  
  setSelectedPlayer(playerId) {
    if (playerId) {
      this.selectPlayer(playerId);
    } else {
      this.clearSelection();
    }
  }
}

// Auto-initialize player selector dropdowns
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.player-selector-dropdown').forEach(dropdown => {
    if (!dropdown.dataset.initialized) {
      const options = JSON.parse(dropdown.dataset.options || '{}');
      new PlayerSelectorDropdown(dropdown, options);
      dropdown.dataset.initialized = 'true';
    }
  });
});
</script>