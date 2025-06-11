<div class="player-search-bar">
  <div class="search-container">
    <div class="search-input-wrapper">
      <input type="text" class="search-input" placeholder="Cerca giocatori per nome, posizione, squadra..." aria-label="Cerca giocatori">
      <button class="search-btn" aria-label="Cerca">
        <span class="search-icon">🔍</span>
      </button>
    </div>
    
    <button class="filter-toggle-btn" aria-expanded="false" aria-controls="advancedFilters">
      <span class="filter-icon">🔍</span>
      <span class="filter-text">Filtri</span>
    </button>
  </div>
  
  <div class="advanced-filters" id="advancedFilters" style="display: none;">
    <div class="filters-grid">
      <div class="filter-group">
        <label for="positionFilter" class="filter-label">Posizione</label>
        <select id="positionFilter" class="filter-select" aria-label="Filtra per posizione">
          <option value="">Tutte le posizioni</option>
          <option value="GK">Portiere</option>
          <option value="DF">Difensore</option>
          <option value="MF">Centrocampista</option>
          <option value="FW">Attaccante</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="ageFilter" class="filter-label">Età</label>
        <div class="range-filter">
          <input type="number" id="minAgeFilter" class="range-input" placeholder="Min" min="16" max="40" aria-label="Età minima">
          <span class="range-separator">-</span>
          <input type="number" id="maxAgeFilter" class="range-input" placeholder="Max" min="16" max="40" aria-label="Età massima">
        </div>
      </div>
      
      <div class="filter-group">
        <label for="ratingFilter" class="filter-label">Rating</label>
        <div class="range-filter">
          <input type="number" id="minRatingFilter" class="range-input" placeholder="Min" min="1" max="100" aria-label="Rating minimo">
          <span class="range-separator">-</span>
          <input type="number" id="maxRatingFilter" class="range-input" placeholder="Max" min="1" max="100" aria-label="Rating massimo">
        </div>
      </div>
      
      <div class="filter-group">
        <label for="teamFilter" class="filter-label">Squadra</label>
        <select id="teamFilter" class="filter-select" aria-label="Filtra per squadra">
          <option value="">Tutte le squadre</option>
          <!-- Teams will be populated dynamically -->
        </select>
      </div>
      
      <div class="filter-group">
        <label for="nationalityFilter" class="filter-label">Nazionalità</label>
        <select id="nationalityFilter" class="filter-select" aria-label="Filtra per nazionalità">
          <option value="">Tutte le nazionalità</option>
          <!-- Nationalities will be populated dynamically -->
        </select>
      </div>
      
      <div class="filter-group">
        <label for="contractFilter" class="filter-label">Contratto</label>
        <select id="contractFilter" class="filter-select" aria-label="Filtra per stato contratto">
          <option value="">Tutti i contratti</option>
          <option value="expiring">In scadenza</option>
          <option value="long">Lungo termine</option>
          <option value="free">Svincolato</option>
        </select>
      </div>
    </div>
    
    <div class="filter-actions">
      <button class="button button-ghost reset-filters-btn">
        ↻ Reset Filtri
      </button>
      <button class="button button-primary apply-filters-btn">
        Applica Filtri
      </button>
    </div>
  </div>
  
  <div class="search-results-info" style="display: none;">
    <span class="results-count">0 giocatori trovati</span>
    <div class="active-filters">
      <!-- Active filters will be shown here -->
    </div>
    <button class="clear-search-btn" aria-label="Cancella ricerca">
      ✕ Cancella
    </button>
  </div>
</div>

<style>
.player-search-bar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  background: var(--background);
  transition: all 0.2s ease;
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

.search-icon {
  font-size: 16px;
}

.filter-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-toggle-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.filter-toggle-btn[aria-expanded="true"] {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.filter-icon {
  font-size: 14px;
}

.advanced-filters {
  margin-top: 16px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 13px;
  cursor: pointer;
}

.range-filter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-input {
  width: 60px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 13px;
  text-align: center;
}

.range-separator {
  color: var(--text-muted);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.search-results-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 6px;
}

.results-count {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--primary);
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.remove-filter-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.remove-filter-btn:hover {
  opacity: 1;
}

.clear-search-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  background: var(--border);
  color: var(--text);
}

/* Responsive */
@media (max-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .search-results-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .active-filters {
    width: 100%;
  }
  
  .clear-search-btn {
    align-self: flex-end;
  }
}
</style>

<script>
class PlayerSearchBar {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoSearch: true,
      searchDelay: 300,
      maxResults: 50,
      ...options
    };
    
    this.searchTimeout = null;
    this.activeFilters = {};
    this.teams = [];
    this.nationalities = [];
    
    this.init();
  }
  
  init() {
    this.loadFilterOptions();
    this.bindEvents();
  }
  
  async loadFilterOptions() {
    try {
      // In a real app, this would fetch from game state
      const filterData = await this.fetchFilterOptions();
      this.teams = filterData.teams;
      this.nationalities = filterData.nationalities;
      
      this.populateFilterOptions();
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  }
  
  async fetchFilterOptions() {
    // Mock data - in real app this would come from game state
    return {
      teams: [
        { id: 1, name: 'AC Milan' },
        { id: 2, name: 'Inter' },
        { id: 3, name: 'Juventus' },
        { id: 4, name: 'Roma' },
        { id: 5, name: 'Napoli' }
      ],
      nationalities: [
        { id: 'IT', name: 'Italia' },
        { id: 'FR', name: 'Francia' },
        { id: 'DE', name: 'Germania' },
        { id: 'ES', name: 'Spagna' },
        { id: 'BR', name: 'Brasile' }
      ]
    };
  }
  
  populateFilterOptions() {
    // Populate team filter
    const teamFilter = this.element.querySelector('#teamFilter');
    this.teams.forEach(team => {
      const option = document.createElement('option');
      option.value = team.id;
      option.textContent = team.name;
      teamFilter.appendChild(option);
    });
    
    // Populate nationality filter
    const nationalityFilter = this.element.querySelector('#nationalityFilter');
    this.nationalities.forEach(nationality => {
      const option = document.createElement('option');
      option.value = nationality.id;
      option.textContent = nationality.name;
      nationalityFilter.appendChild(option);
    });
  }
  
  bindEvents() {
    // Search input
    const searchInput = this.element.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
      if (this.options.autoSearch) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.performSearch();
        }, this.options.searchDelay);
      }
    });
    
    // Search button
    this.element.querySelector('.search-btn').addEventListener('click', () => {
      this.performSearch();
    });
    
    // Filter toggle
    this.element.querySelector('.filter-toggle-btn').addEventListener('click', () => {
      this.toggleAdvancedFilters();
    });
    
    // Apply filters
    this.element.querySelector('.apply-filters-btn').addEventListener('click', () => {
      this.applyFilters();
    });
    
    // Reset filters
    this.element.querySelector('.reset-filters-btn').addEventListener('click', () => {
      this.resetFilters();
    });
    
    // Clear search
    this.element.querySelector('.clear-search-btn').addEventListener('click', () => {
      this.clearSearch();
    });
    
    // Enter key in search input
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });
  }
  
  toggleAdvancedFilters() {
    const filtersPanel = this.element.querySelector('.advanced-filters');
    const isVisible = filtersPanel.style.display !== 'none';
    
    filtersPanel.style.display = isVisible ? 'none' : 'block';
    
    const toggleBtn = this.element.querySelector('.filter-toggle-btn');
    toggleBtn.setAttribute('aria-expanded', !isVisible);
    
    if (!isVisible) {
      // Focus first filter when opening
      setTimeout(() => {
        const firstFilter = filtersPanel.querySelector('select, input');
        if (firstFilter) firstFilter.focus();
      }, 10);
    }
  }
  
  performSearch() {
    const searchTerm = this.element.querySelector('.search-input').value.trim();
    
    if (searchTerm) {
      this.activeFilters.search = searchTerm;
    } else {
      delete this.activeFilters.search;
    }
    
    this.updateActiveFiltersDisplay();
    this.executeSearch();
  }
  
  applyFilters() {
    // Collect filter values
    const position = this.element.querySelector('#positionFilter').value;
    const minAge = this.element.querySelector('#minAgeFilter').value;
    const maxAge = this.element.querySelector('#maxAgeFilter').value;
    const minRating = this.element.querySelector('#minRatingFilter').value;
    const maxRating = this.element.querySelector('#maxRatingFilter').value;
    const team = this.element.querySelector('#teamFilter').value;
    const nationality = this.element.querySelector('#nationalityFilter').value;
    const contract = this.element.querySelector('#contractFilter').value;
    
    // Update active filters
    if (position) this.activeFilters.position = position;
    else delete this.activeFilters.position;
    
    if (minAge || maxAge) {
      this.activeFilters.age = { min: minAge || 16, max: maxAge || 40 };
    } else {
      delete this.activeFilters.age;
    }
    
    if (minRating || maxRating) {
      this.activeFilters.rating = { min: minRating || 1, max: maxRating || 100 };
    } else {
      delete this.activeFilters.rating;
    }
    
    if (team) this.activeFilters.team = team;
    else delete this.activeFilters.team;
    
    if (nationality) this.activeFilters.nationality = nationality;
    else delete this.activeFilters.nationality;
    
    if (contract) this.activeFilters.contract = contract;
    else delete this.activeFilters.contract;
    
    this.toggleAdvancedFilters();
    this.updateActiveFiltersDisplay();
    this.executeSearch();
  }
  
  resetFilters() {
    // Reset all filter inputs
    this.element.querySelector('#positionFilter').value = '';
    this.element.querySelector('#minAgeFilter').value = '';
    this.element.querySelector('#maxAgeFilter').value = '';
    this.element.querySelector('#minRatingFilter').value = '';
    this.element.querySelector('#maxRatingFilter').value = '';
    this.element.querySelector('#teamFilter').value = '';
    this.element.querySelector('#nationalityFilter').value = '';
    this.element.querySelector('#contractFilter').value = '';
    
    // Clear active filters (except search)
    const searchTerm = this.activeFilters.search;
    this.activeFilters = {};
    if (searchTerm) this.activeFilters.search = searchTerm;
    
    this.updateActiveFiltersDisplay();
  }
  
  clearSearch() {
    // Clear search input
    this.element.querySelector('.search-input').value = '';
    
    // Clear all filters
    this.activeFilters = {};
    this.resetFilters();
    
    // Hide results info
    this.element.querySelector('.search-results-info').style.display = 'none';
    
    // Dispatch clear event
    this.element.dispatchEvent(new CustomEvent('searchCleared'));
  }
  
  updateActiveFiltersDisplay() {
    const resultsInfo = this.element.querySelector('.search-results-info');
    const filtersContainer = this.element.querySelector('.active-filters');
    
    // Clear existing filters
    filtersContainer.innerHTML = '';
    
    // Check if we have any active filters
    const hasFilters = Object.keys(this.activeFilters).length > 0;
    
    if (hasFilters) {
      resultsInfo.style.display = 'flex';
      
      // Create filter tags
      Object.entries(this.activeFilters).forEach(([key, value]) => {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        
        let displayText = '';
        
        switch (key) {
          case 'search':
            displayText = `Ricerca: ${value}`;
            break;
          case 'position':
            displayText = `Posizione: ${this.getPositionName(value)}`;
            break;
          case 'age':
            displayText = `Età: ${value.min}-${value.max}`;
            break;
          case 'rating':
            displayText = `Rating: ${value.min}-${value.max}`;
            break;
          case 'team':
            const team = this.teams.find(t => t.id == value);
            displayText = `Squadra: ${team ? team.name : value}`;
            break;
          case 'nationality':
            const nationality = this.nationalities.find(n => n.id === value);
            displayText = `Nazionalità: ${nationality ? nationality.name : value}`;
            break;
          case 'contract':
            displayText = `Contratto: ${this.getContractName(value)}`;
            break;
          default:
            displayText = `${key}: ${value}`;
        }
        
        tag.innerHTML = `
          ${displayText}
          <button class="remove-filter-btn" data-filter="${key}" aria-label="Rimuovi filtro ${displayText}">✕</button>
        `;
        
        filtersContainer.appendChild(tag);
      });
      
      // Add event listeners to remove buttons
      filtersContainer.querySelectorAll('.remove-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filterKey = e.target.dataset.filter;
          delete this.activeFilters[filterKey];
          this.updateActiveFiltersDisplay();
          this.executeSearch();
        });
      });
    } else {
      resultsInfo.style.display = 'none';
    }
  }
  
  getPositionName(positionCode) {
    const positions = {
      GK: 'Portiere',
      DF: 'Difensore',
      MF: 'Centrocampista',
      FW: 'Attaccante'
    };
    return positions[positionCode] || positionCode;
  }
  
  getContractName(contractCode) {
    const contracts = {
      expiring: 'In scadenza',
      long: 'Lungo termine',
      free: 'Svincolato'
    };
    return contracts[contractCode] || contractCode;
  }
  
  executeSearch() {
    // Dispatch search event with filters
    this.element.dispatchEvent(new CustomEvent('playerSearch', {
      detail: {
        filters: this.activeFilters,
        maxResults: this.options.maxResults
      }
    }));
    
    // Update results count (would be updated by parent component in real app)
    this.updateResultsCount(0);
  }
  
  updateResultsCount(count) {
    this.element.querySelector('.results-count').textContent = `${count} giocatori trovati`;
  }
  
  // Public methods
  getActiveFilters() {
    return { ...this.activeFilters };
  }
  
  setActiveFilters(filters) {
    this.activeFilters = { ...filters };
    this.updateActiveFiltersDisplay();
  }
  
  setSearchTerm(term) {
    this.element.querySelector('.search-input').value = term;
    if (term) {
      this.activeFilters.search = term;
    } else {
      delete this.activeFilters.search;
    }
    this.updateActiveFiltersDisplay();
  }
  
  setResultsCount(count) {
    this.updateResultsCount(count);
  }
}

// Auto-initialize player search bars
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.player-search-bar').forEach(searchBar => {
    if (!searchBar.dataset.initialized) {
      const options = JSON.parse(searchBar.dataset.options || '{}');
      new PlayerSearchBar(searchBar, options);
      searchBar.dataset.initialized = 'true';
    }
  });
});
</script>