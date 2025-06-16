/**
 * PlayerSearch Component
 * Used in: TransferMarket.page.js
 * Purpose: Advanced player search with filters for transfer market
 */

export default class PlayerSearch {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      onSearch: props.onSearch || (() => {}),
      onFilterChange: props.onFilterChange || (() => {}),
      autoSearch: props.autoSearch || true,
      searchDelay: props.searchDelay || 300,
      ...props
    };
    
    this.searchTimeout = null;
    this.currentFilters = {
      search: '',
      position: '',
      age: { min: 16, max: 40 },
      rating: { min: 50, max: 99 },
      value: { min: 0, max: 100000000 },
      nationality: '',
      team: '',
      contract: ''
    };
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="player-search">
        <div class="search-header">
          <h4 class="search-title">Ricerca Giocatori</h4>
          <button class="button button-ghost reset-filters-btn">🔄 Reset Filtri</button>
        </div>
        
        <div class="search-main">
          <div class="search-input-container">
            <input type="text" 
                   class="search-input" 
                   placeholder="Cerca per nome, squadra o nazionalità..."
                   value="${this.currentFilters.search}">
            <button class="search-btn">🔍</button>
          </div>
          
          <div class="quick-filters">
            <button class="quick-filter-btn" data-filter="free-agents">Svincolati</button>
            <button class="quick-filter-btn" data-filter="expiring">Contratto in scadenza</button>
            <button class="quick-filter-btn" data-filter="young-talents">Giovani talenti</button>
            <button class="quick-filter-btn" data-filter="experienced">Esperti</button>
          </div>
        </div>
        
        <div class="advanced-filters" id="advancedFilters">
          <div class="filters-toggle">
            <button class="toggle-btn" id="toggleFilters">
              <span class="toggle-text">Filtri Avanzati</span>
              <span class="toggle-icon">▼</span>
            </button>
          </div>
          
          <div class="filters-content" id="filtersContent" style="display: none;">
            <div class="filters-grid">
              <!-- Position Filter -->
              <div class="filter-group">
                <label class="filter-label">Ruolo</label>
                <select class="filter-select position-filter">
                  <option value="">Tutti i ruoli</option>
                  <option value="GK">Portiere</option>
                  <option value="DF">Difensore</option>
                  <option value="MF">Centrocampista</option>
                  <option value="FW">Attaccante</option>
                </select>
              </div>
              
              <!-- Age Range Filter -->
              <div class="filter-group">
                <label class="filter-label">Età</label>
                <div class="range-filter">
                  <input type="range" class="range-input age-min" min="16" max="40" value="16">
                  <input type="range" class="range-input age-max" min="16" max="40" value="40">
                  <div class="range-display">
                    <span class="range-value age-min-value">16</span> - 
                    <span class="range-value age-max-value">40</span> anni
                  </div>
                </div>
              </div>
              
              <!-- Rating Range Filter -->
              <div class="filter-group">
                <label class="filter-label">Rating</label>
                <div class="range-filter">
                  <input type="range" class="range-input rating-min" min="50" max="99" value="50">
                  <input type="range" class="range-input rating-max" min="50" max="99" value="99">
                  <div class="range-display">
                    <span class="range-value rating-min-value">50</span> - 
                    <span class="range-value rating-max-value">99</span>
                  </div>
                </div>
              </div>
              
              <!-- Value Range Filter -->
              <div class="filter-group">
                <label class="filter-label">Valore di Mercato</label>
                <div class="range-filter">
                  <input type="range" class="range-input value-min" min="0" max="100000000" step="1000000" value="0">
                  <input type="range" class="range-input value-max" min="0" max="100000000" step="1000000" value="100000000">
                  <div class="range-display">
                    €<span class="range-value value-min-value">0</span>M - 
                    €<span class="range-value value-max-value">100</span>M
                  </div>
                </div>
              </div>
              
              <!-- Nationality Filter -->
              <div class="filter-group">
                <label class="filter-label">Nazionalità</label>
                <select class="filter-select nationality-filter">
                  <option value="">Tutte le nazionalità</option>
                  <option value="Italy">Italia</option>
                  <option value="Spain">Spagna</option>
                  <option value="France">Francia</option>
                  <option value="Germany">Germania</option>
                  <option value="Brazil">Brasile</option>
                  <option value="Argentina">Argentina</option>
                </select>
              </div>
              
              <!-- Contract Status Filter -->
              <div class="filter-group">
                <label class="filter-label">Stato Contratto</label>
                <select class="filter-select contract-filter">
                  <option value="">Tutti</option>
                  <option value="expiring">In scadenza (< 6 mesi)</option>
                  <option value="short">Breve termine (< 1 anno)</option>
                  <option value="long">Lungo termine (> 2 anni)</option>
                  <option value="free">Svincolato</option>
                </select>
              </div>
            </div>
            
            <div class="filters-actions">
              <button class="button button-secondary clear-filters-btn">Cancella Filtri</button>
              <button class="button button-primary apply-filters-btn">Applica Filtri</button>
            </div>
          </div>
        </div>
        
        <div class="search-results-info">
          <span class="results-count" id="resultsCount">0 giocatori trovati</span>
          <div class="sort-controls">
            <label class="sort-label">Ordina per:</label>
            <select class="sort-select">
              <option value="name">Nome</option>
              <option value="rating">Rating</option>
              <option value="age">Età</option>
              <option value="value">Valore</option>
              <option value="position">Ruolo</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Search input
    const searchInput = this.container.querySelector('.search-input');
    searchInput?.addEventListener('input', (e) => {
      this.currentFilters.search = e.target.value;
      this.debouncedSearch();
    });

    // Search button
    const searchBtn = this.container.querySelector('.search-btn');
    searchBtn?.addEventListener('click', () => this.performSearch());

    // Quick filters
    const quickFilterBtns = this.container.querySelectorAll('.quick-filter-btn');
    quickFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.applyQuickFilter(btn.dataset.filter);
      });
    });

    // Advanced filters toggle
    const toggleBtn = this.container.querySelector('#toggleFilters');
    toggleBtn?.addEventListener('click', () => this.toggleAdvancedFilters());

    // Filter inputs
    this.bindFilterInputs();

    // Action buttons
    const resetBtn = this.container.querySelector('.reset-filters-btn');
    const clearBtn = this.container.querySelector('.clear-filters-btn');
    const applyBtn = this.container.querySelector('.apply-filters-btn');
    
    resetBtn?.addEventListener('click', () => this.resetAllFilters());
    clearBtn?.addEventListener('click', () => this.clearAdvancedFilters());
    applyBtn?.addEventListener('click', () => this.performSearch());

    // Sort controls
    const sortSelect = this.container.querySelector('.sort-select');
    sortSelect?.addEventListener('change', (e) => {
      this.performSearch({ sortBy: e.target.value });
    });
  }

  bindFilterInputs() {
    // Position filter
    const positionFilter = this.container.querySelector('.position-filter');
    positionFilter?.addEventListener('change', (e) => {
      this.currentFilters.position = e.target.value;
      if (this.props.autoSearch) this.debouncedSearch();
    });

    // Age range filters
    const ageMinInput = this.container.querySelector('.age-min');
    const ageMaxInput = this.container.querySelector('.age-max');
    
    ageMinInput?.addEventListener('input', (e) => {
      this.currentFilters.age.min = parseInt(e.target.value);
      this.updateRangeDisplay('age');
      if (this.props.autoSearch) this.debouncedSearch();
    });
    
    ageMaxInput?.addEventListener('input', (e) => {
      this.currentFilters.age.max = parseInt(e.target.value);
      this.updateRangeDisplay('age');
      if (this.props.autoSearch) this.debouncedSearch();
    });

    // Rating range filters
    const ratingMinInput = this.container.querySelector('.rating-min');
    const ratingMaxInput = this.container.querySelector('.rating-max');
    
    ratingMinInput?.addEventListener('input', (e) => {
      this.currentFilters.rating.min = parseInt(e.target.value);
      this.updateRangeDisplay('rating');
      if (this.props.autoSearch) this.debouncedSearch();
    });
    
    ratingMaxInput?.addEventListener('input', (e) => {
      this.currentFilters.rating.max = parseInt(e.target.value);
      this.updateRangeDisplay('rating');
      if (this.props.autoSearch) this.debouncedSearch();
    });

    // Value range filters
    const valueMinInput = this.container.querySelector('.value-min');
    const valueMaxInput = this.container.querySelector('.value-max');
    
    valueMinInput?.addEventListener('input', (e) => {
      this.currentFilters.value.min = parseInt(e.target.value);
      this.updateRangeDisplay('value');
      if (this.props.autoSearch) this.debouncedSearch();
    });
    
    valueMaxInput?.addEventListener('input', (e) => {
      this.currentFilters.value.max = parseInt(e.target.value);
      this.updateRangeDisplay('value');
      if (this.props.autoSearch) this.debouncedSearch();
    });

    // Nationality filter
    const nationalityFilter = this.container.querySelector('.nationality-filter');
    nationalityFilter?.addEventListener('change', (e) => {
      this.currentFilters.nationality = e.target.value;
      if (this.props.autoSearch) this.debouncedSearch();
    });

    // Contract filter
    const contractFilter = this.container.querySelector('.contract-filter');
    contractFilter?.addEventListener('change', (e) => {
      this.currentFilters.contract = e.target.value;
      if (this.props.autoSearch) this.debouncedSearch();
    });
  }

  updateRangeDisplay(type) {
    const minValue = this.container.querySelector(`.${type}-min-value`);
    const maxValue = this.container.querySelector(`.${type}-max-value`);
    
    if (type === 'age') {
      if (minValue) minValue.textContent = this.currentFilters.age.min;
      if (maxValue) maxValue.textContent = this.currentFilters.age.max;
    } else if (type === 'rating') {
      if (minValue) minValue.textContent = this.currentFilters.rating.min;
      if (maxValue) maxValue.textContent = this.currentFilters.rating.max;
    } else if (type === 'value') {
      if (minValue) minValue.textContent = (this.currentFilters.value.min / 1000000).toFixed(0);
      if (maxValue) maxValue.textContent = (this.currentFilters.value.max / 1000000).toFixed(0);
    }
  }

  toggleAdvancedFilters() {
    const filtersContent = this.container.querySelector('#filtersContent');
    const toggleIcon = this.container.querySelector('.toggle-icon');
    
    const isVisible = filtersContent.style.display !== 'none';
    
    filtersContent.style.display = isVisible ? 'none' : 'block';
    toggleIcon.textContent = isVisible ? '▼' : '▲';
  }

  applyQuickFilter(filterType) {
    // Remove active class from all quick filter buttons
    const quickFilterBtns = this.container.querySelectorAll('.quick-filter-btn');
    quickFilterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    const clickedBtn = this.container.querySelector(`[data-filter="${filterType}"]`);
    clickedBtn?.classList.add('active');
    
    // Apply filter logic
    switch (filterType) {
      case 'free-agents':
        this.currentFilters.contract = 'free';
        break;
      case 'expiring':
        this.currentFilters.contract = 'expiring';
        break;
      case 'young-talents':
        this.currentFilters.age = { min: 16, max: 23 };
        this.currentFilters.rating = { min: 70, max: 99 };
        break;
      case 'experienced':
        this.currentFilters.age = { min: 28, max: 40 };
        this.currentFilters.rating = { min: 75, max: 99 };
        break;
    }
    
    this.updateFilterInputs();
    this.performSearch();
  }

  updateFilterInputs() {
    // Update input values to match current filters
    const positionFilter = this.container.querySelector('.position-filter');
    if (positionFilter) positionFilter.value = this.currentFilters.position;
    
    const ageMinInput = this.container.querySelector('.age-min');
    const ageMaxInput = this.container.querySelector('.age-max');
    if (ageMinInput) ageMinInput.value = this.currentFilters.age.min;
    if (ageMaxInput) ageMaxInput.value = this.currentFilters.age.max;
    
    const ratingMinInput = this.container.querySelector('.rating-min');
    const ratingMaxInput = this.container.querySelector('.rating-max');
    if (ratingMinInput) ratingMinInput.value = this.currentFilters.rating.min;
    if (ratingMaxInput) ratingMaxInput.value = this.currentFilters.rating.max;
    
    const valueMinInput = this.container.querySelector('.value-min');
    const valueMaxInput = this.container.querySelector('.value-max');
    if (valueMinInput) valueMinInput.value = this.currentFilters.value.min;
    if (valueMaxInput) valueMaxInput.value = this.currentFilters.value.max;
    
    const nationalityFilter = this.container.querySelector('.nationality-filter');
    if (nationalityFilter) nationalityFilter.value = this.currentFilters.nationality;
    
    const contractFilter = this.container.querySelector('.contract-filter');
    if (contractFilter) contractFilter.value = this.currentFilters.contract;
    
    // Update range displays
    this.updateRangeDisplay('age');
    this.updateRangeDisplay('rating');
    this.updateRangeDisplay('value');
  }

  debouncedSearch() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, this.props.searchDelay);
  }

  performSearch(options = {}) {
    const searchParams = {
      filters: { ...this.currentFilters },
      sortBy: options.sortBy || 'name',
      ...options
    };
    
    // Trigger search callback
    this.props.onSearch(searchParams);
    
    // Trigger filter change callback
    this.props.onFilterChange(this.currentFilters);
  }

  resetAllFilters() {
    this.currentFilters = {
      search: '',
      position: '',
      age: { min: 16, max: 40 },
      rating: { min: 50, max: 99 },
      value: { min: 0, max: 100000000 },
      nationality: '',
      team: '',
      contract: ''
    };
    
    // Update search input
    const searchInput = this.container.querySelector('.search-input');
    if (searchInput) searchInput.value = '';
    
    // Remove active class from quick filters
    const quickFilterBtns = this.container.querySelectorAll('.quick-filter-btn');
    quickFilterBtns.forEach(btn => btn.classList.remove('active'));
    
    this.updateFilterInputs();
    this.performSearch();
  }

  clearAdvancedFilters() {
    this.currentFilters.position = '';
    this.currentFilters.age = { min: 16, max: 40 };
    this.currentFilters.rating = { min: 50, max: 99 };
    this.currentFilters.value = { min: 0, max: 100000000 };
    this.currentFilters.nationality = '';
    this.currentFilters.contract = '';
    
    this.updateFilterInputs();
    if (this.props.autoSearch) this.performSearch();
  }

  setResultsCount(count) {
    const resultsCount = this.container.querySelector('#resultsCount');
    if (resultsCount) {
      resultsCount.textContent = `${count} giocatori trovati`;
    }
  }

  getFilters() {
    return { ...this.currentFilters };
  }

  setFilters(filters) {
    this.currentFilters = { ...this.currentFilters, ...filters };
    this.updateFilterInputs();
  }
}