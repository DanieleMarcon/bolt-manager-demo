<div class="player-list">
  <div class="player-list-header">
    <div class="list-controls">
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Cerca giocatori..." aria-label="Cerca giocatori">
        <button class="search-btn" aria-label="Cerca">🔍</button>
      </div>
      
      <div class="filter-controls">
        <select class="filter-select" data-filter="position" aria-label="Filtra per posizione">
          <option value="">Tutte le posizioni</option>
          <option value="GK">Portiere</option>
          <option value="DF">Difensore</option>
          <option value="MF">Centrocampista</option>
          <option value="FW">Attaccante</option>
        </select>
        
        <select class="filter-select" data-filter="status" aria-label="Filtra per stato">
          <option value="">Tutti gli stati</option>
          <option value="available">Disponibile</option>
          <option value="injured">Infortunato</option>
          <option value="suspended">Squalificato</option>
        </select>
        
        <button class="filter-reset-btn button button-ghost" aria-label="Resetta filtri">
          ↻ Reset
        </button>
      </div>
    </div>
    
    <div class="sort-controls">
      <label for="sortSelect">Ordina per:</label>
      <select id="sortSelect" class="sort-select" aria-label="Ordina giocatori">
        <option value="name">Nome</option>
        <option value="rating">Rating</option>
        <option value="age">Età</option>
        <option value="position">Posizione</option>
        <option value="morale">Morale</option>
        <option value="fitness">Forma</option>
      </select>
      <button class="sort-direction-btn" data-direction="asc" aria-label="Cambia direzione ordinamento">
        ↑
      </button>
    </div>
  </div>
  
  <div class="player-list-stats">
    <div class="list-stat">
      <span class="stat-value total-players">0</span>
      <span class="stat-label">Giocatori</span>
    </div>
    <div class="list-stat">
      <span class="stat-value available-players">0</span>
      <span class="stat-label">Disponibili</span>
    </div>
    <div class="list-stat">
      <span class="stat-value injured-players">0</span>
      <span class="stat-label">Infortunati</span>
    </div>
  </div>
  
  <div class="player-list-container" role="grid" aria-label="Lista giocatori">
    <div class="player-list-grid" id="playerGrid">
      <!-- Player cards will be inserted here -->
    </div>
    
    <div class="loading-indicator" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento giocatori...</span>
    </div>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">👥</div>
      <h3>Nessun giocatore trovato</h3>
      <p>Prova a modificare i filtri di ricerca</p>
    </div>
  </div>
  
  <div class="player-list-pagination">
    <button class="pagination-btn prev-btn" disabled aria-label="Pagina precedente">
      ← Precedente
    </button>
    <span class="pagination-info">
      Pagina <span class="current-page">1</span> di <span class="total-pages">1</span>
    </span>
    <button class="pagination-btn next-btn" disabled aria-label="Pagina successiva">
      Successiva →
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-horizontal">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400&h=100" 
         alt="Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.player-list {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

.player-list-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.list-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  background: var(--background);
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.search-btn:hover {
  background: var(--border);
}

.filter-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
  cursor: pointer;
}

.filter-reset-btn {
  padding: 8px 12px;
  font-size: 14px;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-controls label {
  font-weight: 500;
  color: var(--text);
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 14px;
  cursor: pointer;
}

.sort-direction-btn {
  padding: 8px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.sort-direction-btn:hover {
  background: var(--border);
}

.sort-direction-btn[data-direction="desc"] {
  transform: rotate(180deg);
}

.player-list-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.list-stat {
  text-align: center;
}

.list-stat .stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

.list-stat .stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.player-list-container {
  min-height: 400px;
  position: relative;
}

.player-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.player-list-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.pagination-btn {
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: var(--text-muted);
}

.sponsor-slot-horizontal {
  margin-top: 24px;
  width: 100%;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

/* Responsive */
@media (max-width: 1024px) {
  .player-list-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .list-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-controls {
    flex-wrap: wrap;
  }
  
  .sort-controls {
    flex-wrap: wrap;
  }
  
  .player-list-stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .player-list-grid {
    grid-template-columns: 1fr;
  }
  
  .player-list-pagination {
    flex-direction: column;
    gap: 12px;
  }
}
</style>

<script>
class PlayerList {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      itemsPerPage: 12,
      ...options
    };
    
    this.players = [];
    this.filteredPlayers = [];
    this.currentPage = 1;
    this.currentSort = { field: 'name', direction: 'asc' };
    this.currentFilters = { position: '', status: '', search: '' };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadPlayers();
  }
  
  bindEvents() {
    // Search
    const searchInput = this.element.querySelector('.search-input');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.currentFilters.search = e.target.value.toLowerCase();
        this.applyFilters();
      }, 300);
    });
    
    // Filters
    this.element.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const filterType = e.target.dataset.filter;
        this.currentFilters[filterType] = e.target.value;
        this.applyFilters();
      });
    });
    
    // Reset filters
    this.element.querySelector('.filter-reset-btn').addEventListener('click', () => {
      this.resetFilters();
    });
    
    // Sort
    this.element.querySelector('.sort-select').addEventListener('change', (e) => {
      this.currentSort.field = e.target.value;
      this.applySorting();
    });
    
    this.element.querySelector('.sort-direction-btn').addEventListener('click', (e) => {
      const btn = e.target;
      this.currentSort.direction = btn.dataset.direction === 'asc' ? 'desc' : 'asc';
      btn.dataset.direction = this.currentSort.direction;
      this.applySorting();
    });
    
    // Pagination
    this.element.querySelector('.prev-btn').addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderPlayers();
      }
    });
    
    this.element.querySelector('.next-btn').addEventListener('click', () => {
      const totalPages = Math.ceil(this.filteredPlayers.length / this.options.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderPlayers();
      }
    });
  }
  
  async loadPlayers() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from an API or game state
      // For now, we'll use sample data
      this.players = await this.fetchPlayers();
      this.filteredPlayers = [...this.players];
      this.applySorting();
      this.updateStats();
      this.renderPlayers();
    } catch (error) {
      console.error('Error loading players:', error);
      this.showError('Errore nel caricamento dei giocatori');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchPlayers() {
    // Mock data - in real app this would come from game state
    return [
      {
        id: 1,
        name: 'Mario Rossi',
        age: 25,
        position: 'FW',
        overall_rating: 85,
        morale: 80,
        fitness: 95,
        injury_status: 'healthy',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      // Add more mock players as needed
    ];
  }
  
  applyFilters() {
    this.filteredPlayers = this.players.filter(player => {
      // Search filter
      if (this.currentFilters.search) {
        const searchTerm = this.currentFilters.search;
        if (!player.name.toLowerCase().includes(searchTerm) &&
            !player.position.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      
      // Position filter
      if (this.currentFilters.position && player.position !== this.currentFilters.position) {
        return false;
      }
      
      // Status filter
      if (this.currentFilters.status) {
        const status = this.getPlayerStatus(player);
        if (status !== this.currentFilters.status) {
          return false;
        }
      }
      
      return true;
    });
    
    this.currentPage = 1;
    this.applySorting();
    this.updateStats();
    this.renderPlayers();
  }
  
  applySorting() {
    this.filteredPlayers.sort((a, b) => {
      let aValue = a[this.currentSort.field];
      let bValue = b[this.currentSort.field];
      
      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      let result = 0;
      if (aValue < bValue) result = -1;
      if (aValue > bValue) result = 1;
      
      return this.currentSort.direction === 'desc' ? -result : result;
    });
    
    this.renderPlayers();
  }
  
  resetFilters() {
    this.currentFilters = { position: '', status: '', search: '' };
    
    // Reset UI
    this.element.querySelector('.search-input').value = '';
    this.element.querySelectorAll('.filter-select').forEach(select => {
      select.value = '';
    });
    
    this.applyFilters();
  }
  
  getPlayerStatus(player) {
    if (player.injury_status && player.injury_status !== 'healthy') {
      return 'injured';
    }
    if (player.suspended) {
      return 'suspended';
    }
    return 'available';
  }
  
  updateStats() {
    const total = this.players.length;
    const available = this.players.filter(p => this.getPlayerStatus(p) === 'available').length;
    const injured = this.players.filter(p => this.getPlayerStatus(p) === 'injured').length;
    
    this.element.querySelector('.total-players').textContent = total;
    this.element.querySelector('.available-players').textContent = available;
    this.element.querySelector('.injured-players').textContent = injured;
  }
  
  renderPlayers() {
    const grid = this.element.querySelector('.player-list-grid');
    const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
    const endIndex = startIndex + this.options.itemsPerPage;
    const playersToShow = this.filteredPlayers.slice(startIndex, endIndex);
    
    if (playersToShow.length === 0) {
      this.showEmptyState(true);
      return;
    }
    
    this.showEmptyState(false);
    
    // Clear existing players
    grid.innerHTML = '';
    
    // Render player cards
    playersToShow.forEach(player => {
      const playerCard = this.createPlayerCard(player);
      grid.appendChild(playerCard);
    });
    
    this.updatePagination();
  }
  
  createPlayerCard(player) {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = document.querySelector('[data-component="PlayerCard"]').innerHTML;
    cardElement.className = 'player-card card';
    cardElement.dataset.playerData = JSON.stringify({ player });
    
    // Initialize the player card component
    new PlayerCard(cardElement, { player });
    
    return cardElement;
  }
  
  updatePagination() {
    const totalPages = Math.ceil(this.filteredPlayers.length / this.options.itemsPerPage);
    
    this.element.querySelector('.current-page').textContent = this.currentPage;
    this.element.querySelector('.total-pages').textContent = totalPages;
    
    this.element.querySelector('.prev-btn').disabled = this.currentPage === 1;
    this.element.querySelector('.next-btn').disabled = this.currentPage === totalPages;
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-indicator').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.player-list-grid').style.display = show ? 'none' : 'grid';
  }
  
  showEmptyState(show) {
    this.element.querySelector('.empty-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('.player-list-grid').style.display = show ? 'none' : 'grid';
  }
  
  showError(message) {
    // Create and show error toast
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  addPlayer(player) {
    this.players.push(player);
    this.applyFilters();
  }
  
  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
    this.applyFilters();
  }
  
  updatePlayer(playerId, updates) {
    const playerIndex = this.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      this.players[playerIndex] = { ...this.players[playerIndex], ...updates };
      this.applyFilters();
    }
  }
}

// Auto-initialize player lists
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.player-list').forEach(list => {
    if (!list.dataset.initialized) {
      const options = JSON.parse(list.dataset.options || '{}');
      new PlayerList(list, options);
      list.dataset.initialized = 'true';
    }
  });
});
</script>