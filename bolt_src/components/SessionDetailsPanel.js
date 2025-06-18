export const template = `
<div class="session-details-panel">
  <div class="panel-header">
    <h3 class="panel-title">Dettagli Sessione</h3>
    <div class="session-status">
      <div class="status-indicator"></div>
      <span class="status-text"></span>
    </div>
  </div>
  
  <div class="session-overview">
    <div class="session-info">
      <h4 class="session-name"></h4>
      <div class="session-meta">
        <div class="meta-item">
          <span class="meta-icon">🕒</span>
          <span class="meta-text created-date"></span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">⚽</span>
          <span class="meta-text team-name"></span>
        </div>
      </div>
    </div>
    
    <div class="session-stats">
      <div class="stat-item">
        <span class="stat-value play-time">0h</span>
        <span class="stat-label">Tempo di Gioco</span>
      </div>
      <div class="stat-item">
        <span class="stat-value save-count">0</span>
        <span class="stat-label">Salvataggi</span>
      </div>
    </div>
  </div>
  
  <div class="game-details">
    <div class="detail-section">
      <h4>Dettagli Partita</h4>
      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Data di Gioco:</span>
          <span class="detail-value game-date"></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Stagione:</span>
          <span class="detail-value season"></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Posizione:</span>
          <span class="detail-value position"></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Budget:</span>
          <span class="detail-value budget"></span>
        </div>
      </div>
    </div>
    
    <div class="detail-section">
      <h4>Statistiche Squadra</h4>
      <div class="details-grid">
        <div class="detail-item">
          <span class="detail-label">Partite Giocate:</span>
          <span class="detail-value matches-played">0</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Vittorie:</span>
          <span class="detail-value wins">0</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Pareggi:</span>
          <span class="detail-value draws">0</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Sconfitte:</span>
          <span class="detail-value losses">0</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="session-actions">
    <button class="button button-ghost export-btn" aria-label="Esporta sessione">
      📤 Esporta
    </button>
    <button class="button button-secondary duplicate-btn" aria-label="Duplica sessione">
      🔄 Duplica
    </button>
    <button class="button button-primary load-btn" aria-label="Carica sessione">
      ✓ Carica
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-session">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Session Details Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.session-details-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.session-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--background);
  border-radius: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.status-indicator.active {
  background: var(--success);
}

.status-indicator.inactive {
  background: var(--warning);
}

.status-indicator.corrupted {
  background: var(--error);
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.session-overview {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.session-info {
  flex: 1;
}

.session-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.session-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.meta-icon {
  font-size: 14px;
}

.session-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.game-details {
  margin-bottom: 24px;
}

.detail-section {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-section h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.session-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sponsor-slot-session {
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .session-overview {
    flex-direction: column;
    gap: 16px;
  }
  
  .session-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .session-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .button {
    width: 100%;
  }
  
  .sponsor-slot-session {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class SessionDetailsPanel {
  constructor(element, sessionData) {
    this.element = element;
    this.sessionData = sessionData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
  }
  
  render() {
    const session = this.sessionData;
    
    // Update session status
    this.updateSessionStatus(session.status);
    
    // Update session info
    this.element.querySelector('.session-name').textContent = session.name;
    
    const createdDate = new Date(session.createdAt);
    this.element.querySelector('.created-date').textContent = this.formatDate(createdDate);
    
    this.element.querySelector('.team-name').textContent = session.teamName;
    
    // Update session stats
    this.element.querySelector('.play-time').textContent = this.formatPlayTime(session.playTime);
    this.element.querySelector('.save-count').textContent = session.saveCount;
    
    // Update game details
    const gameDate = new Date(session.gameDate);
    this.element.querySelector('.game-date').textContent = this.formatGameDate(gameDate);
    
    this.element.querySelector('.season').textContent = session.season;
    this.element.querySelector('.position').textContent = `${session.position}°`;
    this.element.querySelector('.budget').textContent = this.formatCurrency(session.budget);
    
    // Update team stats
    this.element.querySelector('.matches-played').textContent = session.stats.matchesPlayed;
    this.element.querySelector('.wins').textContent = session.stats.wins;
    this.element.querySelector('.draws').textContent = session.stats.draws;
    this.element.querySelector('.losses').textContent = session.stats.losses;
  }
  
  updateSessionStatus(status) {
    const statusIndicator = this.element.querySelector('.status-indicator');
    const statusText = this.element.querySelector('.status-text');
    
    // Remove existing status classes
    statusIndicator.classList.remove('active', 'inactive', 'corrupted');
    
    // Set status based on value
    switch (status) {
      case 'active':
        statusIndicator.classList.add('active');
        statusText.textContent = 'Attiva';
        break;
      case 'inactive':
        statusIndicator.classList.add('inactive');
        statusText.textContent = 'Inattiva';
        break;
      case 'corrupted':
        statusIndicator.classList.add('corrupted');
        statusText.textContent = 'Corrotta';
        break;
      default:
        statusText.textContent = status || 'Sconosciuto';
    }
  }
  
  formatDate(date) {
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  formatGameDate(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  formatPlayTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  }
  
  bindEvents() {
    // Export button
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportSession();
    });
    
    // Duplicate button
    this.element.querySelector('.duplicate-btn').addEventListener('click', () => {
      this.duplicateSession();
    });
    
    // Load button
    this.element.querySelector('.load-btn').addEventListener('click', () => {
      this.loadSession();
    });
  }
  
  exportSession() {
    // Create export data
    const exportData = {
      ...this.sessionData,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    // Create download link
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.sessionData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Dispatch export event
    this.element.dispatchEvent(new CustomEvent('sessionExported', {
      detail: { sessionData: this.sessionData }
    }));
    
    this.showSuccess('Sessione esportata con successo');
  }
  
  duplicateSession() {
    // Dispatch duplicate event
    this.element.dispatchEvent(new CustomEvent('sessionDuplicate', {
      detail: { sessionData: this.sessionData }
    }));
    
    this.showSuccess('Richiesta di duplicazione inviata');
  }
  
  loadSession() {
    if (confirm('Sei sicuro di voler caricare questa sessione? I progressi non salvati andranno persi.')) {
      // Dispatch load event
      this.element.dispatchEvent(new CustomEvent('sessionLoad', {
        detail: { sessionData: this.sessionData }
      }));
      
      this.showSuccess('Sessione caricata con successo');
    }
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  updateSessionData(newData) {
    this.sessionData = { ...this.sessionData, ...newData };
    this.render();
  }
  
  getSessionData() {
    return { ...this.sessionData };
  }
  
  isSessionActive() {
    return this.sessionData.status === 'active';
  }
  
  getPlayTime() {
    return this.sessionData.playTime;
  }
}

export default SessionDetailsPanel;