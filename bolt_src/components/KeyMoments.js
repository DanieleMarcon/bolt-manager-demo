/**
 * KeyMoments Component
 * Used in: MatchAnalysis.page.js
 * Expected data: { moments, match }
 */

export default class KeyMoments {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.moments = props.moments || [];
    this.match = props.match || {};
    this.selectedMoment = null;
    this.autoPlay = props.autoPlay || false;
    this.currentIndex = 0;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="key-moments">
        <div class="moments-header">
          <h4>Momenti Chiave</h4>
          <div class="moments-controls">
            <button class="control-btn play-pause-btn" title="${this.autoPlay ? 'Pausa' : 'Play'}">
              ${this.autoPlay ? '⏸️' : '▶️'}
            </button>
            <button class="control-btn prev-btn" title="Precedente">⏮️</button>
            <button class="control-btn next-btn" title="Successivo">⏭️</button>
            <select class="filter-select">
              <option value="all">Tutti i momenti</option>
              <option value="goal">Solo gol</option>
              <option value="card">Solo cartellini</option>
              <option value="substitution">Solo sostituzioni</option>
            </select>
          </div>
        </div>
        
        <div class="moments-timeline">
          <div class="timeline-track">
            <div class="timeline-progress" style="width: ${this.getProgressPercentage()}%"></div>
            ${this.renderTimelineMarkers()}
          </div>
          <div class="timeline-labels">
            <span class="time-label">0'</span>
            <span class="time-label">45'</span>
            <span class="time-label">90'</span>
          </div>
        </div>
        
        <div class="moments-content">
          <div class="moments-list">
            ${this.renderMomentsList()}
          </div>
          
          <div class="moment-detail">
            ${this.renderMomentDetail()}
          </div>
        </div>
        
        <div class="moments-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-value">${this.moments.length}</span>
              <span class="stat-label">Momenti Totali</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getMomentsByType('goal').length}</span>
              <span class="stat-label">Gol</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getMomentsByType('card').length + this.getMomentsByType('red_card').length}</span>
              <span class="stat-label">Cartellini</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${this.getMomentsByType('substitution').length}</span>
              <span class="stat-label">Sostituzioni</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.bindEvents();
    
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  renderTimelineMarkers() {
    return this.moments.map(moment => {
      const position = (moment.time / 90) * 100;
      const isSelected = this.selectedMoment?.id === moment.id;
      
      return `
        <div class="timeline-marker ${moment.type} ${isSelected ? 'selected' : ''}" 
             style="left: ${position}%"
             data-moment-id="${moment.id}"
             title="${moment.time}' - ${moment.description}">
          <span class="marker-icon">${this.getMomentIcon(moment.type)}</span>
        </div>
      `;
    }).join('');
  }

  renderMomentsList() {
    if (this.moments.length === 0) {
      return '<div class="no-moments">Nessun momento chiave registrato</div>';
    }
    
    return this.moments.map((moment, index) => `
      <div class="moment-item ${this.selectedMoment?.id === moment.id ? 'selected' : ''}" 
           data-moment-id="${moment.id}"
           data-index="${index}">
        <div class="moment-time">${moment.time}'</div>
        <div class="moment-icon">${this.getMomentIcon(moment.type)}</div>
        <div class="moment-content">
          <div class="moment-description">${moment.description}</div>
          <div class="moment-details">
            ${moment.player ? `<span class="moment-player">${moment.player}</span>` : ''}
            ${moment.team ? `<span class="moment-team">${this.getTeamName(moment.team)}</span>` : ''}
          </div>
        </div>
        <div class="moment-importance">
          <div class="importance-bar">
            <div class="importance-fill" style="width: ${(moment.importance || 5) * 10}%"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderMomentDetail() {
    if (!this.selectedMoment) {
      return `
        <div class="no-selection">
          <div class="selection-icon">🎬</div>
          <h5>Seleziona un momento</h5>
          <p>Clicca su un momento nella timeline o nella lista per visualizzare i dettagli</p>
        </div>
      `;
    }
    
    const moment = this.selectedMoment;
    
    return `
      <div class="moment-detail-content">
        <div class="detail-header">
          <div class="detail-time">${moment.time}'</div>
          <div class="detail-type ${moment.type}">
            <span class="type-icon">${this.getMomentIcon(moment.type)}</span>
            <span class="type-label">${this.getMomentTypeLabel(moment.type)}</span>
          </div>
        </div>
        
        <div class="detail-description">
          <h5>${moment.description}</h5>
          ${moment.detailedDescription ? `<p>${moment.detailedDescription}</p>` : ''}
        </div>
        
        <div class="detail-participants">
          ${moment.player ? `
            <div class="participant">
              <span class="participant-label">Giocatore:</span>
              <span class="participant-name">${moment.player}</span>
            </div>
          ` : ''}
          
          ${moment.team ? `
            <div class="participant">
              <span class="participant-label">Squadra:</span>
              <span class="participant-name">${this.getTeamName(moment.team)}</span>
            </div>
          ` : ''}
          
          ${moment.assistedBy ? `
            <div class="participant">
              <span class="participant-label">Assist:</span>
              <span class="participant-name">${moment.assistedBy}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="detail-context">
          <div class="context-item">
            <span class="context-label">Importanza:</span>
            <div class="importance-visual">
              ${this.renderImportanceStars(moment.importance || 5)}
            </div>
          </div>
          
          ${moment.impact ? `
            <div class="context-item">
              <span class="context-label">Impatto:</span>
              <span class="context-value">${moment.impact}</span>
            </div>
          ` : ''}
        </div>
        
        <div class="detail-actions">
          <button class="button button-secondary share-moment-btn">🔗 Condividi</button>
          <button class="button button-secondary replay-btn">🔄 Rivedi</button>
        </div>
      </div>
    `;
  }

  renderImportanceStars(importance) {
    const stars = [];
    const fullStars = Math.floor(importance);
    const hasHalfStar = importance % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('<span class="star filled">⭐</span>');
    }
    
    if (hasHalfStar) {
      stars.push('<span class="star half">⭐</span>');
    }
    
    const emptyStars = 10 - Math.ceil(importance);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('<span class="star empty">☆</span>');
    }
    
    return stars.join('');
  }

  getMomentIcon(type) {
    const icons = {
      'goal': '⚽',
      'card': '🟨',
      'red_card': '🟥',
      'substitution': '🔄',
      'penalty': '⚽',
      'own_goal': '⚽',
      'key-play': '🎯',
      'save': '🥅',
      'miss': '❌',
      'offside': '🚩'
    };
    
    return icons[type] || '📝';
  }

  getMomentTypeLabel(type) {
    const labels = {
      'goal': 'Gol',
      'card': 'Cartellino Giallo',
      'red_card': 'Cartellino Rosso',
      'substitution': 'Sostituzione',
      'penalty': 'Rigore',
      'own_goal': 'Autogol',
      'key-play': 'Azione Chiave',
      'save': 'Parata',
      'miss': 'Occasione Fallita',
      'offside': 'Fuorigioco'
    };
    
    return labels[type] || 'Evento';
  }

  getTeamName(team) {
    if (team === 'home') {
      return this.match.homeTeam?.name || 'Casa';
    } else if (team === 'away') {
      return this.match.awayTeam?.name || 'Trasferta';
    }
    return team;
  }

  getMomentsByType(type) {
    return this.moments.filter(moment => moment.type === type);
  }

  getProgressPercentage() {
    if (this.moments.length === 0) return 0;
    
    const currentTime = this.selectedMoment?.time || 0;
    return (currentTime / 90) * 100;
  }

  bindEvents() {
    // Timeline markers
    const markers = this.container.querySelectorAll('.timeline-marker');
    markers.forEach(marker => {
      marker.addEventListener('click', (e) => {
        const momentId = parseInt(marker.dataset.momentId);
        this.selectMoment(momentId);
      });
    });

    // Moment list items
    const momentItems = this.container.querySelectorAll('.moment-item');
    momentItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const momentId = parseInt(item.dataset.momentId);
        this.selectMoment(momentId);
      });
    });

    // Control buttons
    const playPauseBtn = this.container.querySelector('.play-pause-btn');
    const prevBtn = this.container.querySelector('.prev-btn');
    const nextBtn = this.container.querySelector('.next-btn');
    
    playPauseBtn?.addEventListener('click', () => this.toggleAutoPlay());
    prevBtn?.addEventListener('click', () => this.previousMoment());
    nextBtn?.addEventListener('click', () => this.nextMoment());

    // Filter
    const filterSelect = this.container.querySelector('.filter-select');
    filterSelect?.addEventListener('change', (e) => this.filterMoments(e.target.value));

    // Detail actions
    const shareMomentBtn = this.container.querySelector('.share-moment-btn');
    const replayBtn = this.container.querySelector('.replay-btn');
    
    shareMomentBtn?.addEventListener('click', () => this.shareMoment());
    replayBtn?.addEventListener('click', () => this.replayMoment());
  }

  selectMoment(momentId) {
    this.selectedMoment = this.moments.find(m => m.id === momentId);
    this.currentIndex = this.moments.findIndex(m => m.id === momentId);
    this.render();
  }

  toggleAutoPlay() {
    this.autoPlay = !this.autoPlay;
    
    if (this.autoPlay) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
    
    const playPauseBtn = this.container.querySelector('.play-pause-btn');
    if (playPauseBtn) {
      playPauseBtn.innerHTML = this.autoPlay ? '⏸️' : '▶️';
      playPauseBtn.title = this.autoPlay ? 'Pausa' : 'Play';
    }
  }

  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    
    this.autoPlayInterval = setInterval(() => {
      this.nextMoment();
    }, 3000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  previousMoment() {
    if (this.moments.length === 0) return;
    
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.moments.length - 1;
    this.selectMoment(this.moments[this.currentIndex].id);
  }

  nextMoment() {
    if (this.moments.length === 0) return;
    
    this.currentIndex = this.currentIndex < this.moments.length - 1 ? this.currentIndex + 1 : 0;
    this.selectMoment(this.moments[this.currentIndex].id);
  }

  filterMoments(filterType) {
    let filteredMoments = this.moments;
    
    if (filterType !== 'all') {
      filteredMoments = this.moments.filter(moment => moment.type === filterType);
    }
    
    // Update the display with filtered moments
    this.moments = filteredMoments;
    this.selectedMoment = null;
    this.currentIndex = 0;
    this.render();
  }

  shareMoment() {
    if (!this.selectedMoment) return;
    
    const shareText = `${this.selectedMoment.time}' - ${this.selectedMoment.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Momento Chiave',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      this.showToast('Momento copiato negli appunti', 'success');
    }
  }

  replayMoment() {
    if (!this.selectedMoment) return;
    
    this.showToast(`Replay del momento al ${this.selectedMoment.time}'`, 'info');
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

  setMoments(moments) {
    this.moments = moments;
    this.selectedMoment = null;
    this.currentIndex = 0;
    this.render();
  }

  destroy() {
    this.stopAutoPlay();
  }
}