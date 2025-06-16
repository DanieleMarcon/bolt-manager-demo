/**
 * SessionList Component
 * Used in: SessionManager.page.js
 * Purpose: Display and manage list of saved game sessions
 */

export default class SessionList {
  constructor(container, props = {}) {
    this.container = container;
    this.props = {
      sessions: props.sessions || [],
      onSessionSelect: props.onSessionSelect || (() => {}),
      onSessionLoad: props.onSessionLoad || (() => {}),
      onSessionDelete: props.onSessionDelete || (() => {}),
      onSessionExport: props.onSessionExport || (() => {}),
      onSessionDuplicate: props.onSessionDuplicate || (() => {}),
      showActions: props.showActions !== false,
      sortBy: props.sortBy || 'timestamp',
      sortOrder: props.sortOrder || 'desc',
      ...props
    };
    
    this.selectedSession = null;
    this.sortedSessions = [];
    
    this.render();
    this.bindEvents();
    this.updateSessionList();
  }

  render() {
    this.container.innerHTML = `
      <div class="session-list">
        <div class="session-list-header">
          <div class="list-title">
            <h4>Sessioni Salvate</h4>
            <span class="session-count">${this.props.sessions.length} sessioni</span>
          </div>
          
          <div class="list-controls">
            <div class="sort-controls">
              <label class="sort-label">Ordina per:</label>
              <select class="sort-select">
                <option value="timestamp" ${this.props.sortBy === 'timestamp' ? 'selected' : ''}>Data</option>
                <option value="name" ${this.props.sortBy === 'name' ? 'selected' : ''}>Nome</option>
                <option value="teamName" ${this.props.sortBy === 'teamName' ? 'selected' : ''}>Squadra</option>
                <option value="playTime" ${this.props.sortBy === 'playTime' ? 'selected' : ''}>Tempo di Gioco</option>
                <option value="budget" ${this.props.sortBy === 'budget' ? 'selected' : ''}>Budget</option>
              </select>
              
              <button class="sort-order-btn" data-order="${this.props.sortOrder}" title="Cambia ordine">
                ${this.props.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
            
            <div class="view-controls">
              <button class="view-btn active" data-view="list">📋 Lista</button>
              <button class="view-btn" data-view="grid">⊞ Griglia</button>
            </div>
          </div>
        </div>
        
        <div class="session-list-content">
          <div class="sessions-container list-view" id="sessionsContainer">
            ${this.renderSessionItems()}
          </div>
          
          ${this.props.sessions.length === 0 ? `
            <div class="empty-sessions">
              <div class="empty-icon">💾</div>
              <h5>Nessuna Sessione Salvata</h5>
              <p>Le tue sessioni di gioco salvate appariranno qui</p>
            </div>
          ` : ''}
        </div>
        
        <!-- Session Actions Modal -->
        <div class="session-actions-modal modal" id="sessionActionsModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Azioni Sessione</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
              <div class="session-info" id="modalSessionInfo">
                <!-- Session info will be populated dynamically -->
              </div>
              
              <div class="action-buttons-grid">
                <button class="action-btn load-session-btn">
                  <span class="action-icon">📂</span>
                  <span class="action-label">Carica Sessione</span>
                  <span class="action-description">Carica questa sessione di gioco</span>
                </button>
                
                <button class="action-btn duplicate-session-btn">
                  <span class="action-icon">📋</span>
                  <span class="action-label">Duplica Sessione</span>
                  <span class="action-description">Crea una copia di questa sessione</span>
                </button>
                
                <button class="action-btn export-session-btn">
                  <span class="action-icon">📤</span>
                  <span class="action-label">Esporta Sessione</span>
                  <span class="action-description">Esporta i dati della sessione</span>
                </button>
                
                <button class="action-btn rename-session-btn">
                  <span class="action-icon">✏️</span>
                  <span class="action-label">Rinomina Sessione</span>
                  <span class="action-description">Modifica il nome della sessione</span>
                </button>
                
                <button class="action-btn delete-session-btn danger">
                  <span class="action-icon">🗑️</span>
                  <span class="action-label">Elimina Sessione</span>
                  <span class="action-description">Elimina definitivamente questa sessione</span>
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Chiudi</button>
            </div>
          </div>
        </div>
        
        <!-- Rename Session Modal -->
        <div class="rename-session-modal modal" id="renameSessionModal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Rinomina Sessione</h4>
              <button class="modal-close-btn">×</button>
            </div>
            <div class="modal-body">
              <div class="rename-form">
                <div class="form-field">
                  <label class="field-label">Nuovo Nome</label>
                  <input type="text" class="rename-input" placeholder="Inserisci nuovo nome..." maxlength="50">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="button button-secondary modal-cancel-btn">Annulla</button>
              <button class="button button-primary rename-confirm-btn">✏️ Rinomina</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSessionItems() {
    if (this.sortedSessions.length === 0) {
      return '';
    }
    
    return this.sortedSessions.map(session => this.renderSessionItem(session)).join('');
  }

  renderSessionItem(session) {
    const isSelected = this.selectedSession === session.id;
    const timeAgo = this.getTimeAgo(session.timestamp);
    
    return `
      <div class="session-item ${isSelected ? 'selected' : ''}" data-session-id="${session.id}">
        <div class="session-main">
          <div class="session-info">
            <div class="session-header">
              <h5 class="session-name">${session.name}</h5>
              <span class="session-status ${session.status || 'normal'}">${this.getStatusText(session.status)}</span>
            </div>
            
            <div class="session-details">
              <div class="detail-item">
                <span class="detail-icon">👥</span>
                <span class="detail-text">${session.teamName}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">📅</span>
                <span class="detail-text">${session.season}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">💰</span>
                <span class="detail-text">€${this.formatCurrency(session.budget)}</span>
              </div>
              <div class="detail-item">
                <span class="detail-icon">🏆</span>
                <span class="detail-text">${session.position}° posto</span>
              </div>
            </div>
            
            <div class="session-meta">
              <span class="save-date">${timeAgo}</span>
              <span class="play-time">${this.formatPlayTime(session.playTime)}</span>
              ${session.saveCount ? `<span class="save-count">${session.saveCount} salvataggi</span>` : ''}
            </div>
          </div>
          
          ${this.props.showActions ? `
            <div class="session-actions">
              <button class="session-action-btn load-btn" title="Carica">📂</button>
              <button class="session-action-btn more-btn" title="Altre azioni">⋮</button>
            </div>
          ` : ''}
        </div>
        
        ${session.description ? `
          <div class="session-description">
            <p>${session.description}</p>
          </div>
        ` : ''}
        
        ${session.stats ? `
          <div class="session-stats">
            <div class="stat-item">
              <span class="stat-value">${session.stats.matchesPlayed || 0}</span>
              <span class="stat-label">Partite</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${session.stats.wins || 0}</span>
              <span class="stat-label">Vittorie</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${session.stats.draws || 0}</span>
              <span class="stat-label">Pareggi</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${session.stats.losses || 0}</span>
              <span class="stat-label">Sconfitte</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  bindEvents() {
    // Session item clicks
    const sessionItems = this.container.querySelectorAll('.session-item');
    sessionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Don't trigger selection if clicking on action buttons
        if (e.target.closest('.session-action-btn')) {
          return;
        }
        
        const sessionId = parseInt(item.dataset.sessionId);
        this.selectSession(sessionId);
      });
    });

    // Action buttons
    this.bindActionButtons();

    // Sort controls
    const sortSelect = this.container.querySelector('.sort-select');
    const sortOrderBtn = this.container.querySelector('.sort-order-btn');
    
    sortSelect?.addEventListener('change', (e) => {
      this.props.sortBy = e.target.value;
      this.updateSessionList();
    });
    
    sortOrderBtn?.addEventListener('click', () => {
      this.props.sortOrder = this.props.sortOrder === 'asc' ? 'desc' : 'asc';
      sortOrderBtn.dataset.order = this.props.sortOrder;
      sortOrderBtn.textContent = this.props.sortOrder === 'asc' ? '↑' : '↓';
      this.updateSessionList();
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

    // Modal events
    this.bindModalEvents();
  }

  bindActionButtons() {
    // Load buttons
    const loadBtns = this.container.querySelectorAll('.load-btn');
    loadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sessionId = parseInt(btn.closest('.session-item').dataset.sessionId);
        this.loadSession(sessionId);
      });
    });

    // More actions buttons
    const moreBtns = this.container.querySelectorAll('.more-btn');
    moreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sessionId = parseInt(btn.closest('.session-item').dataset.sessionId);
        this.showSessionActionsModal(sessionId);
      });
    });
  }

  bindModalEvents() {
    // Session Actions Modal
    const actionsModal = this.container.querySelector('#sessionActionsModal');
    const actionsCloseBtn = actionsModal?.querySelector('.modal-close-btn');
    const actionsCancelBtn = actionsModal?.querySelector('.modal-cancel-btn');
    
    actionsCloseBtn?.addEventListener('click', () => this.hideSessionActionsModal());
    actionsCancelBtn?.addEventListener('click', () => this.hideSessionActionsModal());

    // Action buttons in modal
    const loadSessionBtn = actionsModal?.querySelector('.load-session-btn');
    const duplicateSessionBtn = actionsModal?.querySelector('.duplicate-session-btn');
    const exportSessionBtn = actionsModal?.querySelector('.export-session-btn');
    const renameSessionBtn = actionsModal?.querySelector('.rename-session-btn');
    const deleteSessionBtn = actionsModal?.querySelector('.delete-session-btn');
    
    loadSessionBtn?.addEventListener('click', () => this.loadSelectedSession());
    duplicateSessionBtn?.addEventListener('click', () => this.duplicateSelectedSession());
    exportSessionBtn?.addEventListener('click', () => this.exportSelectedSession());
    renameSessionBtn?.addEventListener('click', () => this.showRenameModal());
    deleteSessionBtn?.addEventListener('click', () => this.deleteSelectedSession());

    // Rename Modal
    const renameModal = this.container.querySelector('#renameSessionModal');
    const renameCloseBtn = renameModal?.querySelector('.modal-close-btn');
    const renameCancelBtn = renameModal?.querySelector('.modal-cancel-btn');
    const renameConfirmBtn = renameModal?.querySelector('.rename-confirm-btn');
    
    renameCloseBtn?.addEventListener('click', () => this.hideRenameModal());
    renameCancelBtn?.addEventListener('click', () => this.hideRenameModal());
    renameConfirmBtn?.addEventListener('click', () => this.confirmRename());

    // Close modals on outside click
    actionsModal?.addEventListener('click', (e) => {
      if (e.target === actionsModal) this.hideSessionActionsModal();
    });
    
    renameModal?.addEventListener('click', (e) => {
      if (e.target === renameModal) this.hideRenameModal();
    });
  }

  selectSession(sessionId) {
    this.selectedSession = sessionId;
    
    // Update visual selection
    const sessionItems = this.container.querySelectorAll('.session-item');
    sessionItems.forEach(item => {
      item.classList.toggle('selected', parseInt(item.dataset.sessionId) === sessionId);
    });
    
    // Trigger callback
    const session = this.props.sessions.find(s => s.id === sessionId);
    this.props.onSessionSelect(session);
  }

  loadSession(sessionId) {
    const session = this.props.sessions.find(s => s.id === sessionId);
    if (session) {
      this.props.onSessionLoad(session);
    }
  }

  showSessionActionsModal(sessionId) {
    const modal = this.container.querySelector('#sessionActionsModal');
    const sessionInfo = modal?.querySelector('#modalSessionInfo');
    const session = this.props.sessions.find(s => s.id === sessionId);
    
    if (sessionInfo && session) {
      sessionInfo.innerHTML = `
        <div class="modal-session-preview">
          <h5>${session.name}</h5>
          <div class="preview-details">
            <span>Squadra: ${session.teamName}</span>
            <span>Stagione: ${session.season}</span>
            <span>Salvato: ${this.formatDateTime(session.timestamp)}</span>
          </div>
        </div>
      `;
    }
    
    this.modalSessionId = sessionId;
    modal.style.display = 'block';
  }

  hideSessionActionsModal() {
    const modal = this.container.querySelector('#sessionActionsModal');
    modal.style.display = 'none';
    this.modalSessionId = null;
  }

  showRenameModal() {
    const session = this.props.sessions.find(s => s.id === this.modalSessionId);
    if (!session) return;
    
    const renameModal = this.container.querySelector('#renameSessionModal');
    const renameInput = renameModal?.querySelector('.rename-input');
    
    if (renameInput) {
      renameInput.value = session.name;
    }
    
    this.hideSessionActionsModal();
    renameModal.style.display = 'block';
  }

  hideRenameModal() {
    const modal = this.container.querySelector('#renameSessionModal');
    modal.style.display = 'none';
  }

  confirmRename() {
    const renameInput = this.container.querySelector('.rename-input');
    const newName = renameInput?.value.trim();
    
    if (!newName) {
      alert('Inserisci un nome valido');
      return;
    }
    
    const session = this.props.sessions.find(s => s.id === this.modalSessionId);
    if (session) {
      session.name = newName;
      this.updateSessionList();
      this.hideRenameModal();
    }
  }

  loadSelectedSession() {
    if (this.modalSessionId) {
      this.loadSession(this.modalSessionId);
      this.hideSessionActionsModal();
    }
  }

  duplicateSelectedSession() {
    const session = this.props.sessions.find(s => s.id === this.modalSessionId);
    if (session) {
      this.props.onSessionDuplicate(session);
      this.hideSessionActionsModal();
    }
  }

  exportSelectedSession() {
    const session = this.props.sessions.find(s => s.id === this.modalSessionId);
    if (session) {
      this.props.onSessionExport(session);
      this.hideSessionActionsModal();
    }
  }

  deleteSelectedSession() {
    const session = this.props.sessions.find(s => s.id === this.modalSessionId);
    if (session && confirm(`Sei sicuro di voler eliminare la sessione "${session.name}"?`)) {
      this.props.onSessionDelete(session);
      this.hideSessionActionsModal();
    }
  }

  switchView(view) {
    const container = this.container.querySelector('#sessionsContainer');
    
    if (view === 'grid') {
      container.classList.remove('list-view');
      container.classList.add('grid-view');
    } else {
      container.classList.remove('grid-view');
      container.classList.add('list-view');
    }
  }

  updateSessionList() {
    this.sortSessions();
    this.updateSessionCount();
    this.rerenderSessions();
  }

  sortSessions() {
    this.sortedSessions = [...this.props.sessions].sort((a, b) => {
      let aValue = a[this.props.sortBy];
      let bValue = b[this.props.sortBy];
      
      // Handle different data types
      if (this.props.sortBy === 'timestamp') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return this.props.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  updateSessionCount() {
    const sessionCount = this.container.querySelector('.session-count');
    if (sessionCount) {
      sessionCount.textContent = `${this.props.sessions.length} sessioni`;
    }
  }

  rerenderSessions() {
    const container = this.container.querySelector('#sessionsContainer');
    if (container) {
      container.innerHTML = this.renderSessionItems();
      this.bindActionButtons();
    }
  }

  getStatusText(status) {
    const statusMap = {
      'active': 'Attiva',
      'backup': 'Backup',
      'auto': 'Auto',
      'manual': 'Manuale',
      'completed': 'Completata'
    };
    return statusMap[status] || '';
  }

  getTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins} min fa`;
    if (diffHours < 24) return `${diffHours}h fa`;
    if (diffDays < 7) return `${diffDays}g fa`;
    
    return date.toLocaleDateString('it-IT');
  }

  formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('it-IT');
  }

  formatPlayTime(minutes) {
    if (!minutes) return '0 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  formatCurrency(amount) {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toLocaleString();
  }

  setSessions(sessions) {
    this.props.sessions = sessions;
    this.updateSessionList();
  }

  getSessions() {
    return this.props.sessions;
  }

  addSession(session) {
    this.props.sessions.push(session);
    this.updateSessionList();
  }

  removeSession(sessionId) {
    this.props.sessions = this.props.sessions.filter(s => s.id !== sessionId);
    if (this.selectedSession === sessionId) {
      this.selectedSession = null;
    }
    this.updateSessionList();
  }

  updateSession(sessionId, updates) {
    const sessionIndex = this.props.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex >= 0) {
      this.props.sessions[sessionIndex] = { ...this.props.sessions[sessionIndex], ...updates };
      this.updateSessionList();
    }
  }
}