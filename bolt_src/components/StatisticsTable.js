<div class="statistics-table">
  <div class="table-header">
    <h3 class="table-title">Statistiche Dettagliate</h3>
    <div class="table-controls">
      <select class="category-select" aria-label="Seleziona categoria">
        <option value="all">Tutte le Statistiche</option>
        <option value="attack">Attacco</option>
        <option value="defense">Difesa</option>
        <option value="passing">Passaggi</option>
        <option value="discipline">Disciplina</option>
      </select>
      
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Cerca statistiche..." aria-label="Cerca statistiche">
        <button class="search-btn" aria-label="Cerca">🔍</button>
      </div>
      
      <button class="export-btn button button-ghost" aria-label="Esporta statistiche">
        📊 Esporta
      </button>
    </div>
  </div>
  
  <div class="table-container">
    <table class="stats-table">
      <thead>
        <tr>
          <th class="sortable" data-sort="name">Statistica <span class="sort-icon">↓</span></th>
          <th class="sortable" data-sort="value">Valore <span class="sort-icon"></span></th>
          <th class="sortable" data-sort="rank">Rank <span class="sort-icon"></span></th>
          <th class="sortable" data-sort="percentile">Percentile <span class="sort-icon"></span></th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        <!-- Table rows will be populated dynamically -->
      </tbody>
    </table>
    
    <div class="empty-state" style="display: none;">
      <div class="empty-icon">📊</div>
      <h4>Nessuna Statistica Trovata</h4>
      <p>Prova a modificare i filtri di ricerca</p>
    </div>
    
    <div class="loading-state" style="display: none;">
      <div class="loading-spinner"></div>
      <span>Caricamento statistiche...</span>
    </div>
  </div>
  
  <div class="table-pagination">
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
  <div class="sponsor-slot sponsor-slot-table">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Statistics Table Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.statistics-table {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 12px;
}

.table-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.table-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.category-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.search-container {
  position: relative;
}

.search-input {
  padding: 6px 30px 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--background);
  font-size: 12px;
  width: 180px;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-muted);
}

.export-btn {
  padding: 6px 12px;
  font-size: 12px;
}

.table-container {
  margin-bottom: 20px;
  position: relative;
  min-height: 300px;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
}

.stats-table th,
.stats-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.stats-table th {
  font-weight: 600;
  color: var(--text);
  background: var(--background);
  position: sticky;
  top: 0;
  z-index: 10;
}

.stats-table tbody tr:hover {
  background: var(--background);
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.5;
}

th.sorted .sort-icon {
  opacity: 1;
}

.stat-name {
  font-weight: 500;
  color: var(--text);
}

.stat-category {
  font-size: 11px;
  color: var(--text-muted);
  display: block;
  margin-top: 2px;
}

.stat-value {
  font-weight: 600;
  color: var(--primary);
}

.stat-rank {
  font-weight: 500;
  color: var(--text);
}

.percentile-bar {
  width: 100px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.percentile-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 4px;
}

.percentile-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.trend-indicator {
  font-size: 16px;
}

.trend-up {
  color: var(--success);
}

.trend-down {
  color: var(--error);
}

.trend-neutral {
  color: var(--text-muted);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-btn {
  padding: 8px 16px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
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
  font-size: 12px;
  color: var(--text-muted);
}

.sponsor-slot-table {
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
@media (max-width: 1024px) {
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .table-controls {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .stats-table {
    display: block;
    overflow-x: auto;
  }
  
  .table-pagination {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .sponsor-slot-table {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class StatisticsTable {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      itemsPerPage: 10,
      ...options
    };
    
    this.stats = [];
    this.filteredStats = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.currentSort = { column: 'name', direction: 'asc' };
    this.currentCategory = 'all';
    this.searchTerm = '';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadStats();
  }
  
  bindEvents() {
    // Category select
    this.element.querySelector('.category-select').addEventListener('change', (e) => {
      this.currentCategory = e.target.value;
      this.filterStats();
    });
    
    // Search input
    const searchInput = this.element.querySelector('.search-input');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterStats();
      }, 300);
    });
    
    // Search button
    this.element.querySelector('.search-btn').addEventListener('click', () => {
      this.searchTerm = searchInput.value.toLowerCase();
      this.filterStats();
    });
    
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportStats();
    });
    
    // Sortable headers
    this.element.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        this.sortStats(th.dataset.sort);
      });
    });
    
    // Pagination
    this.element.querySelector('.prev-btn').addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderStats();
      }
    });
    
    this.element.querySelector('.next-btn').addEventListener('click', () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.renderStats();
      }
    });
  }
  
  async loadStats() {
    this.showLoading(true);
    
    try {
      // In a real app, this would fetch from game state
      this.stats = await this.fetchStats();
      this.filteredStats = [...this.stats];
      this.calculateTotalPages();
      this.renderStats();
    } catch (error) {
      console.error('Error loading stats:', error);
      this.showError('Errore nel caricamento delle statistiche');
    } finally {
      this.showLoading(false);
    }
  }
  
  async fetchStats() {
    // Mock data - in real app this would come from game state
    return [
      {
        id: 1,
        name: 'Gol Segnati',
        category: 'attack',
        value: 45,
        rank: 3,
        percentile: 92,
        trend: 'up'
      },
      {
        id: 2,
        name: 'Tiri in Porta',
        category: 'attack',
        value: 156,
        rank: 5,
        percentile: 85,
        trend: 'up'
      },
      {
        id: 3,
        name: 'Precisione Tiri',
        category: 'attack',
        value: '48%',
        rank: 8,
        percentile: 75,
        trend: 'neutral'
      },
      {
        id: 4,
        name: 'Gol Subiti',
        category: 'defense',
        value: 28,
        rank: 4,
        percentile: 88,
        trend: 'up'
      },
      {
        id: 5,
        name: 'Clean Sheet',
        category: 'defense',
        value: 12,
        rank: 6,
        percentile: 80,
        trend: 'neutral'
      },
      {
        id: 6,
        name: 'Contrasti Vinti',
        category: 'defense',
        value: 342,
        rank: 7,
        percentile: 78,
        trend: 'up'
      },
      {
        id: 7,
        name: 'Passaggi Completati',
        category: 'passing',
        value: 8432,
        rank: 2,
        percentile: 95,
        trend: 'up'
      },
      {
        id: 8,
        name: 'Precisione Passaggi',
        category: 'passing',
        value: '87%',
        rank: 4,
        percentile: 88,
        trend: 'up'
      },
      {
        id: 9,
        name: 'Passaggi Chiave',
        category: 'passing',
        value: 124,
        rank: 5,
        percentile: 85,
        trend: 'neutral'
      },
      {
        id: 10,
        name: 'Cartellini Gialli',
        category: 'discipline',
        value: 48,
        rank: 12,
        percentile: 40,
        trend: 'down'
      },
      {
        id: 11,
        name: 'Cartellini Rossi',
        category: 'discipline',
        value: 3,
        rank: 15,
        percentile: 35,
        trend: 'neutral'
      },
      {
        id: 12,
        name: 'Falli Commessi',
        category: 'discipline',
        value: 287,
        rank: 14,
        percentile: 38,
        trend: 'down'
      }
    ];
  }
  
  filterStats() {
    this.filteredStats = this.stats.filter(stat => {
      // Category filter
      if (this.currentCategory !== 'all' && stat.category !== this.currentCategory) {
        return false;
      }
      
      // Search filter
      if (this.searchTerm && !stat.name.toLowerCase().includes(this.searchTerm)) {
        return false;
      }
      
      return true;
    });
    
    this.currentPage = 1;
    this.calculateTotalPages();
    this.renderStats();
  }
  
  sortStats(column) {
    // Update sort direction
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }
    
    // Update sort indicators
    this.updateSortIndicators();
    
    // Sort stats
    this.filteredStats.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];
      
      // Handle percentage values
      if (typeof aValue === 'string' && aValue.endsWith('%')) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      // Compare values
      if (aValue < bValue) {
        return this.currentSort.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.currentSort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    this.renderStats();
  }
  
  updateSortIndicators() {
    const headers = this.element.querySelectorAll('th.sortable');
    
    headers.forEach(header => {
      const sortIcon = header.querySelector('.sort-icon');
      
      if (header.dataset.sort === this.currentSort.column) {
        header.classList.add('sorted');
        sortIcon.textContent = this.currentSort.direction === 'asc' ? '↑' : '↓';
      } else {
        header.classList.remove('sorted');
        sortIcon.textContent = '';
      }
    });
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredStats.length / this.options.itemsPerPage);
    this.element.querySelector('.total-pages').textContent = this.totalPages;
  }
  
  renderStats() {
    const tbody = this.element.querySelector('tbody');
    const emptyState = this.element.querySelector('.empty-state');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Show empty state if no stats
    if (this.filteredStats.length === 0) {
      tbody.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }
    
    // Hide empty state and show table
    tbody.style.display = '';
    emptyState.style.display = 'none';
    
    // Calculate start and end indices for current page
    const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
    const endIndex = Math.min(startIndex + this.options.itemsPerPage, this.filteredStats.length);
    
    // Render stats for current page
    for (let i = startIndex; i < endIndex; i++) {
      const stat = this.filteredStats[i];
      const row = this.createStatRow(stat);
      tbody.appendChild(row);
    }
    
    // Update pagination
    this.updatePagination();
  }
  
  createStatRow(stat) {
    const row = document.createElement('tr');
    
    // Name and category
    const nameCell = document.createElement('td');
    nameCell.innerHTML = `
      <span class="stat-name">${stat.name}</span>
      <span class="stat-category">${this.getCategoryName(stat.category)}</span>
    `;
    
    // Value
    const valueCell = document.createElement('td');
    valueCell.innerHTML = `<span class="stat-value">${stat.value}</span>`;
    
    // Rank
    const rankCell = document.createElement('td');
    rankCell.innerHTML = `<span class="stat-rank">${stat.rank}</span>`;
    
    // Percentile
    const percentileCell = document.createElement('td');
    percentileCell.innerHTML = `
      <div class="percentile-bar">
        <div class="percentile-fill" style="width: ${stat.percentile}%"></div>
        <span class="percentile-text">${stat.percentile}%</span>
      </div>
    `;
    
    // Trend
    const trendCell = document.createElement('td');
    let trendIcon = '→';
    let trendClass = 'trend-neutral';
    
    if (stat.trend === 'up') {
      trendIcon = '↗️';
      trendClass = 'trend-up';
    } else if (stat.trend === 'down') {
      trendIcon = '↘️';
      trendClass = 'trend-down';
    }
    
    trendCell.innerHTML = `<span class="trend-indicator ${trendClass}">${trendIcon}</span>`;
    
    row.appendChild(nameCell);
    row.appendChild(valueCell);
    row.appendChild(rankCell);
    row.appendChild(percentileCell);
    row.appendChild(trendCell);
    
    return row;
  }
  
  getCategoryName(category) {
    const categories = {
      attack: 'Attacco',
      defense: 'Difesa',
      passing: 'Passaggi',
      discipline: 'Disciplina'
    };
    return categories[category] || category;
  }
  
  updatePagination() {
    this.element.querySelector('.current-page').textContent = this.currentPage;
    this.element.querySelector('.prev-btn').disabled = this.currentPage === 1;
    this.element.querySelector('.next-btn').disabled = this.currentPage === this.totalPages;
  }
  
  exportStats() {
    const exportData = {
      stats: this.filteredStats,
      filters: {
        category: this.currentCategory,
        search: this.searchTerm
      },
      sort: this.currentSort,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statistics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Statistiche esportate con successo');
  }
  
  showLoading(show) {
    this.element.querySelector('.loading-state').style.display = show ? 'flex' : 'none';
    this.element.querySelector('table').style.display = show ? 'none' : 'table';
    this.element.querySelector('.empty-state').style.display = 'none';
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  updateStats(newStats) {
    this.stats = newStats;
    this.filterStats();
  }
  
  setCategory(category) {
    this.currentCategory = category;
    this.element.querySelector('.category-select').value = category;
    this.filterStats();
  }
  
  setSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.element.querySelector('.search-input').value = term;
    this.filterStats();
  }
  
  getStats() {
    return [...this.stats];
  }
  
  getFilters() {
    return {
      category: this.currentCategory,
      search: this.searchTerm,
      sort: { ...this.currentSort }
    };
  }
}

// Auto-initialize statistics tables
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.statistics-table').forEach(table => {
    if (!table.dataset.initialized) {
      const options = JSON.parse(table.dataset.options || '{}');
      new StatisticsTable(table, options);
      table.dataset.initialized = 'true';
    }
  });
});
</script>