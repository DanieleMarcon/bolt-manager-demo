/**
 * PlayerRatings Component
 * Used in: MatchAnalysis.page.js
 * Purpose: Display post-match player ratings and performance
 */

export default class PlayerRatings {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      ratings: props.ratings || [],
      sortBy: props.sortBy || 'rating',
      sortOrder: props.sortOrder || 'desc',
      showStats: props.showStats !== false,
      onPlayerClick: props.onPlayerClick || (() => {}),
      ...props
    };
    
    this.sortedRatings = [];
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="player-ratings">
        <div class="ratings-header">
          <h4 class="ratings-title">Valutazioni Giocatori</h4>
          <div class="ratings-controls">
            <div class="sort-controls">
              <label class="sort-label">Ordina per:</label>
              <select class="sort-select">
                <option value="rating" ${this.props.sortBy === 'rating' ? 'selected' : ''}>Voto</option>
                <option value="name" ${this.props.sortBy === 'name' ? 'selected' : ''}>Nome</option>
                <option value="position" ${this.props.sortBy === 'position' ? 'selected' : ''}>Ruolo</option>
                <option value="minutes" ${this.props.sortBy === 'minutes' ? 'selected' : ''}>Minuti</option>
              </select>
              <button class="sort-order-btn" data-order="${this.props.sortOrder}">
                ${this.props.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            
            <div class="view-controls">
              <button class="view-btn active" data-view="grid">⊞ Griglia</button>
              <button class="view-btn" data-view="list">📋 Lista</button>
            </div>
          </div>
        </div>
        
        <div class="ratings-content">
          <div class="ratings-grid" id="ratingsGrid">
            ${this.renderRatingsGrid()}
          </div>
          
          ${this.props.ratings.length === 0 ? `
            <div class="ratings-empty">
              <div class="empty-icon">⭐</div>
              <h5>Nessuna Valutazione</h5>
              <p>Le valutazioni dei giocatori appariranno qui dopo la partita</p>
            </div>
          ` : ''}
        </div>
        
        <div class="ratings-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-value">${this.getAverageRating()}</span>
              <span class="stat-label">Voto Medio</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getBestPlayer()}</span>
              <span class="stat-label">Migliore</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getWorstPlayer()}</span>
              <span class="stat-label">Peggiore</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getTotalMinutes()}</span>
              <span class="stat-label">Min Totali</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderRatingsGrid() {
    if (this.sortedRatings.length === 0) {
      return '';
    }
    
    return this.sortedRatings.map(player => `
      <div class="player-rating-card ${this.getRatingClass(player.rating)}" data-player-id="${player.id}">
        <div class="rating-card-header">
          <img src="${player.photo}" alt="${player.name}" class="player-photo">
          <div class="player-info">
            <h5 class="player-name">${player.name}</h5>
            <span class="player-position">${player.position}</span>
            ${player.captain ? '<span class="captain-badge">©</span>' : ''}
          </div>
          <div class="overall-rating ${this.getRatingClass(player.rating)}">
            ${player.rating.toFixed(1)}
          </div>
        </div>
        
        <div class="rating-card-body">
          ${this.props.showStats ? `
            <div class="performance-stats">
              <div class="stat-row">
                <span class="stat-name">Minuti:</span>
                <span class="stat-value">${player.minutes || 0}'</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Gol:</span>
                <span class="stat-value">${player.goals || 0}</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Assist:</span>
                <span class="stat-value">${player.assists || 0}</span>
              </div>
              <div class="stat-row">
                <span class="stat-name">Passaggi:</span>
                <span class="stat-value">${player.passes || 0}</span>
              </div>
              ${player.cards ? `
                <div class="stat-row">
                  <span class="stat-name">Cartellini:</span>
                  <span class="stat-value cards">
                    ${player.cards.yellow ? `<span class="yellow-card">🟨${player.cards.yellow}</span>` : ''}
                    ${player.cards.red ? `<span class="red-card">🟥${player.cards.red}</span>` : ''}
                  </span>
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="rating-breakdown">
            <div class="breakdown-item">
              <span class="breakdown-label">Attacco</span>
              <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: ${(player.breakdown?.attack || 5) * 10}%"></div>
              </div>
              <span class="breakdown-value">${(player.breakdown?.attack || 5).toFixed(1)}</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Difesa</span>
              <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: ${(player.breakdown?.defense || 5) * 10}%"></div>
              </div>
              <span class="breakdown-value">${(player.breakdown?.defense || 5).toFixed(1)}</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Passaggi</span>
              <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: ${(player.breakdown?.passing || 5) * 10}%"></div>
              </div>
              <span class="breakdown-value">${(player.breakdown?.passing || 5).toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div class="rating-card-footer">
          <div class="performance-indicator ${this.getPerformanceClass(player.rating)}">
            ${this.getPerformanceText(player.rating)}
          </div>
          ${player.motm ? '<div class="motm-badge">⭐ MOTM</div>' : ''}
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    // Sort controls
    const sortSelect = this.container.querySelector('.sort-select');
    const sortOrderBtn = this.container.querySelector('.sort-order-btn');
    
    sortSelect?.addEventListener('change', (e) => {
      this.props.sortBy = e.target.value;
      this.updateRatings();
    });
    
    sortOrderBtn?.addEventListener('click', () => {
      this.props.sortOrder = this.props.sortOrder === 'asc' ? 'desc' : 'asc';
      sortOrderBtn.dataset.order = this.props.sortOrder;
      sortOrderBtn.textContent = this.props.sortOrder === 'asc' ? '↑' : '↓';
      this.updateRatings();
    });

    // View controls
    const viewBtns = this.container.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchView(btn.dataset.view);
      });
    });

    // Player card clicks
    const playerCards = this.container.querySelectorAll('.player-rating-card');
    playerCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const playerId = parseInt(card.dataset.playerId);
        const player = this.props.ratings.find(p => p.id === playerId);
        if (player) {
          this.props.onPlayerClick(player);
        }
      });
    });
  }

  updateRatings() {
    this.sortRatings();
    this.rerenderGrid();
    this.updateSummary();
  }

  sortRatings() {
    this.sortedRatings = [...this.props.ratings].sort((a, b) => {
      let aValue = a[this.props.sortBy];
      let bValue = b[this.props.sortBy];
      
      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return this.props.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  rerenderGrid() {
    const ratingsGrid = this.container.querySelector('#ratingsGrid');
    if (ratingsGrid) {
      ratingsGrid.innerHTML = this.renderRatingsGrid();
      this.bindPlayerCards();
    }
  }

  bindPlayerCards() {
    const playerCards = this.container.querySelectorAll('.player-rating-card');
    playerCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const playerId = parseInt(card.dataset.playerId);
        const player = this.props.ratings.find(p => p.id === playerId);
        if (player) {
          this.props.onPlayerClick(player);
        }
      });
    });
  }

  updateSummary() {
    const statValues = this.container.querySelectorAll('.summary-stats .stat-value');
    if (statValues.length >= 4) {
      statValues[0].textContent = this.getAverageRating();
      statValues[1].textContent = this.getBestPlayer();
      statValues[2].textContent = this.getWorstPlayer();
      statValues[3].textContent = this.getTotalMinutes();
    }
  }

  switchView(view) {
    const ratingsGrid = this.container.querySelector('#ratingsGrid');
    
    if (view === 'list') {
      ratingsGrid.classList.add('list-view');
      ratingsGrid.classList.remove('grid-view');
    } else {
      ratingsGrid.classList.add('grid-view');
      ratingsGrid.classList.remove('list-view');
    }
  }

  getRatingClass(rating) {
    if (rating >= 8.5) return 'excellent';
    if (rating >= 7.5) return 'good';
    if (rating >= 6.5) return 'average';
    if (rating >= 5.5) return 'below-average';
    return 'poor';
  }

  getPerformanceClass(rating) {
    if (rating >= 8.0) return 'outstanding';
    if (rating >= 7.0) return 'good';
    if (rating >= 6.0) return 'average';
    return 'poor';
  }

  getPerformanceText(rating) {
    if (rating >= 8.5) return 'Eccellente';
    if (rating >= 7.5) return 'Ottimo';
    if (rating >= 6.5) return 'Buono';
    if (rating >= 5.5) return 'Sufficiente';
    return 'Insufficiente';
  }

  getAverageRating() {
    if (this.props.ratings.length === 0) return '0.0';
    const total = this.props.ratings.reduce((sum, player) => sum + player.rating, 0);
    return (total / this.props.ratings.length).toFixed(1);
  }

  getBestPlayer() {
    if (this.props.ratings.length === 0) return 'N/A';
    const best = this.props.ratings.reduce((best, player) => 
      player.rating > best.rating ? player : best
    );
    return best.name;
  }

  getWorstPlayer() {
    if (this.props.ratings.length === 0) return 'N/A';
    const worst = this.props.ratings.reduce((worst, player) => 
      player.rating < worst.rating ? player : worst
    );
    return worst.name;
  }

  getTotalMinutes() {
    return this.props.ratings.reduce((total, player) => total + (player.minutes || 0), 0);
  }

  // Public methods
  setRatings(ratings) {
    this.props.ratings = ratings || [];
    this.sortRatings();
    this.rerenderGrid();
    this.updateSummary();
  }

  getRatings() {
    return this.props.ratings;
  }

  setSortBy(sortBy, sortOrder = 'desc') {
    this.props.sortBy = sortBy;
    this.props.sortOrder = sortOrder;
    this.updateRatings();
  }

  exportRatings() {
    const exportData = {
      ratings: this.props.ratings,
      summary: {
        averageRating: this.getAverageRating(),
        bestPlayer: this.getBestPlayer(),
        worstPlayer: this.getWorstPlayer(),
        totalMinutes: this.getTotalMinutes()
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `player-ratings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }
}