// Session Manager Page implementation
export class SessionManagerPage {
    constructor() {
        this.gameManager = null;
        this.savedSessions = [];
        this.selectedSession = null;
    }

    async init() {
        console.log('💾 Initializing SessionManagerPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadSessionData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Gestione Salvataggi</span>
                </nav>

                <!-- Quick Actions -->
                <div class="session-quick-actions">
                    <h2>Gestione Sessioni</h2>
                    <div class="quick-actions-bar">
                        <button id="newGameBtn" class="button button-primary">
                            🎮 Nuova Partita
                        </button>
                        <button id="quickSaveBtn" class="button button-secondary">
                            💾 Salvataggio Rapido
                        </button>
                        <button id="quickLoadBtn" class="button button-secondary">
                            📂 Caricamento Rapido
                        </button>
                    </div>
                </div>

                <!-- Save Slots Grid -->
                <div class="save-slots-section">
                    <h3>Slot di Salvataggio</h3>
                    <div id="saveSlotsGrid" class="save-slots-grid">
                        <!-- Will be populated by loadSaveSlots() -->
                    </div>
                </div>

                <!-- Sponsor Savebar -->
                <div class="sponsor-savebar">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Salvataggi sicuri con</span>
                        <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=60&fit=crop" 
                             alt="Sponsor Save" class="sponsor-image">
                    </div>
                </div>

                <!-- Session Details Panel -->
                <div class="session-details-section">
                    <h3>Dettagli Sessione</h3>
                    <div id="sessionDetailsPanel" class="session-details-panel">
                        <div class="no-selection">
                            <p>Seleziona una sessione per visualizzare i dettagli</p>
                        </div>
                    </div>
                </div>

                <!-- Backup Manager -->
                <div class="backup-section">
                    <h3>Backup e Ripristino</h3>
                    <div class="backup-manager">
                        <div class="backup-actions">
                            <button id="exportDataBtn" class="button button-ghost">
                                📤 Esporta Dati
                            </button>
                            <button id="importDataBtn" class="button button-ghost">
                                📥 Importa Dati
                            </button>
                            <input type="file" id="importFileInput" accept=".json" style="display: none;">
                        </div>
                        <div class="backup-info">
                            <p>💡 Esporta i tuoi salvataggi per creare backup sicuri o trasferirli su altri dispositivi</p>
                        </div>
                    </div>
                </div>

                <!-- Session Actions -->
                <div class="session-actions">
                    <button id="saveCurrentBtn" class="button button-primary" style="display: none;">
                        💾 Salva Sessione Corrente
                    </button>
                    <button id="loadSelectedBtn" class="button button-secondary" style="display: none;">
                        📂 Carica Sessione Selezionata
                    </button>
                    <button id="deleteSelectedBtn" class="button button-ghost" style="display: none;">
                        🗑️ Elimina Sessione
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Quick actions
        document.getElementById('newGameBtn')?.addEventListener('click', () => {
            this.startNewGame();
        });

        document.getElementById('quickSaveBtn')?.addEventListener('click', () => {
            this.quickSave();
        });

        document.getElementById('quickLoadBtn')?.addEventListener('click', () => {
            this.quickLoad();
        });

        // Session actions
        document.getElementById('saveCurrentBtn')?.addEventListener('click', () => {
            this.saveCurrentSession();
        });

        document.getElementById('loadSelectedBtn')?.addEventListener('click', () => {
            this.loadSelectedSession();
        });

        document.getElementById('deleteSelectedBtn')?.addEventListener('click', () => {
            this.deleteSelectedSession();
        });

        // Backup actions
        document.getElementById('exportDataBtn')?.addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importDataBtn')?.addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });

        document.getElementById('importFileInput')?.addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    loadSessionData() {
        if (!this.gameManager) {
            console.log('GameManager not available');
            return;
        }

        // Load saved sessions
        this.savedSessions = this.gameManager.getSavedSessions();
        
        // Load save slots
        this.loadSaveSlots();
        
        // Check if there's a current session
        this.checkCurrentSession();
    }

    loadSaveSlots() {
        const slotsHTML = Array.from({ length: 6 }, (_, index) => {
            const slotNumber = index + 1;
            const session = this.savedSessions.find(s => s.id === `session_${slotNumber}`) || 
                           (index === 0 ? this.savedSessions[0] : null);

            if (session) {
                const lastPlayed = new Date(session.last_played);
                const isActive = session.is_active;

                return `
                    <div class="save-slot-card ${isActive ? 'active' : ''}" data-session-id="${session.id}" data-slot="${slotNumber}">
                        <div class="slot-header">
                            <span class="slot-number">Slot ${slotNumber}</span>
                            ${isActive ? '<span class="slot-status active">Attiva</span>' : '<span class="slot-status">Salvata</span>'}
                        </div>
                        <div class="slot-content">
                            <h4 class="session-name">${session.session_name}</h4>
                            <div class="session-info">
                                <div class="info-item">
                                    <span class="info-label">Squadra:</span>
                                    <span class="info-value">${session.user_team_name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Stagione:</span>
                                    <span class="info-value">${session.current_season}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Giornata:</span>
                                    <span class="info-value">${session.current_matchday}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Data:</span>
                                    <span class="info-value">${new Date(session.current_date).toLocaleDateString('it-IT')}</span>
                                </div>
                            </div>
                            <div class="slot-footer">
                                <span class="last-played">Ultimo accesso: ${lastPlayed.toLocaleDateString('it-IT')} ${lastPlayed.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="save-slot-card empty" data-slot="${slotNumber}">
                        <div class="slot-header">
                            <span class="slot-number">Slot ${slotNumber}</span>
                            <span class="slot-status empty">Vuoto</span>
                        </div>
                        <div class="slot-content">
                            <div class="empty-slot">
                                <div class="empty-icon">📁</div>
                                <p>Slot vuoto</p>
                                <button class="button button-ghost button-small" onclick="window.boltManager.uiManager.currentPage.createNewSession(${slotNumber})">
                                    Nuova Partita
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');

        document.getElementById('saveSlotsGrid').innerHTML = slotsHTML;

        // Setup slot click listeners
        document.querySelectorAll('.save-slot-card:not(.empty)').forEach(card => {
            card.addEventListener('click', () => {
                this.selectSession(card.dataset.sessionId);
            });
        });
    }

    selectSession(sessionId) {
        // Remove previous selection
        document.querySelectorAll('.save-slot-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-session-id="${sessionId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Find session data
        this.selectedSession = this.savedSessions.find(s => s.id === sessionId);
        
        // Update details panel
        this.updateSessionDetails();
        
        // Show action buttons
        this.showSessionActions();
    }

    updateSessionDetails() {
        if (!this.selectedSession) return;

        const session = this.selectedSession;
        const currentDate = new Date(session.current_date);
        const lastPlayed = new Date(session.last_played);
        const playtimeHours = Math.floor(session.total_playtime / 60);
        const playtimeMinutes = session.total_playtime % 60;

        const detailsHTML = `
            <div class="session-details-content">
                <div class="session-header">
                    <h4>${session.session_name}</h4>
                    <span class="session-status ${session.is_active ? 'active' : 'inactive'}">
                        ${session.is_active ? '🟢 Attiva' : '⚪ Inattiva'}
                    </span>
                </div>

                <div class="session-stats">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Squadra Controllata</span>
                            <span class="stat-value">${session.user_team_name}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Stagione Corrente</span>
                            <span class="stat-value">${session.current_season}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Giornata</span>
                            <span class="stat-value">${session.current_matchday}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Data di Gioco</span>
                            <span class="stat-value">${currentDate.toLocaleDateString('it-IT', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Ultimo Accesso</span>
                            <span class="stat-value">${lastPlayed.toLocaleDateString('it-IT')} alle ${lastPlayed.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Tempo di Gioco</span>
                            <span class="stat-value">${playtimeHours}h ${playtimeMinutes}m</span>
                        </div>
                    </div>
                </div>

                <div class="session-progress">
                    <h5>Progressi</h5>
                    <div class="progress-info">
                        <p>📊 Stagione ${session.current_season} in corso</p>
                        <p>⚽ Giornata ${session.current_matchday} completata</p>
                        <p>🏆 Obiettivi: In definizione</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('sessionDetailsPanel').innerHTML = detailsHTML;
    }

    showSessionActions() {
        document.getElementById('loadSelectedBtn').style.display = 'inline-block';
        document.getElementById('deleteSelectedBtn').style.display = 'inline-block';
    }

    checkCurrentSession() {
        const currentSession = this.gameManager.getCurrentSession();
        if (currentSession) {
            document.getElementById('saveCurrentBtn').style.display = 'inline-block';
            document.getElementById('quickSaveBtn').disabled = false;
        } else {
            document.getElementById('quickSaveBtn').disabled = true;
        }
    }

    async startNewGame() {
        const content = `
            <div class="new-game-form">
                <h4>Nuova Partita</h4>
                <div class="form-group">
                    <label for="sessionNameInput">Nome Sessione:</label>
                    <input type="text" id="sessionNameInput" class="form-input" placeholder="La mia carriera" value="Carriera ${new Date().getFullYear()}">
                </div>
                <div class="form-group">
                    <label for="difficultySelect">Difficoltà:</label>
                    <select id="difficultySelect" class="form-select">
                        <option value="easy">Facile</option>
                        <option value="normal" selected>Normale</option>
                        <option value="hard">Difficile</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="teamSelect">Squadra:</label>
                    <select id="teamSelect" class="form-select">
                        <option value="random" selected>Squadra Casuale</option>
                        <option value="milan">AC Milano</option>
                        <option value="inter">Inter Milano</option>
                        <option value="juventus">Juventus FC</option>
                        <option value="roma">AS Roma</option>
                        <option value="napoli">SSC Napoli</option>
                        <option value="fiorentina">ACF Fiorentina</option>
                    </select>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Nuova Partita', content, [
            {
                text: 'Inizia',
                class: 'button-primary',
                onclick: 'window.boltManager.uiManager.currentPage.confirmNewGame()'
            }
        ]);
    }

    async confirmNewGame() {
        const sessionName = document.getElementById('sessionNameInput').value || 'Nuova Carriera';
        const difficulty = document.getElementById('difficultySelect').value;
        const team = document.getElementById('teamSelect').value;

        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Creazione nuova partita...');

            // Start new game
            await this.gameManager.startNewGame();

            // Save initial session
            await this.gameManager.saveSession(sessionName);

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Nuova partita creata con successo!', 'success');

            // Navigate to team management
            window.boltManager.navigateToPage('team');

        } catch (error) {
            console.error('Error creating new game:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nella creazione: ' + error.message, 'error');
        }
    }

    async createNewSession(slotNumber) {
        // Same as startNewGame but for specific slot
        this.startNewGame();
    }

    async quickSave() {
        try {
            window.boltManager.uiManager.showLoading('Salvataggio rapido...');

            const result = await this.gameManager.saveSession();
            
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Salvataggio completato!', 'success');

            // Refresh session data
            this.loadSessionData();

        } catch (error) {
            console.error('Error in quick save:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel salvataggio: ' + error.message, 'error');
        }
    }

    async quickLoad() {
        if (this.savedSessions.length === 0) {
            window.boltManager.uiManager.showToast('Nessuna sessione salvata disponibile', 'warning');
            return;
        }

        try {
            window.boltManager.uiManager.showLoading('Caricamento rapido...');

            // Load most recent session
            const mostRecent = this.savedSessions[0];
            await this.gameManager.loadSession(mostRecent.id);

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Sessione caricata!', 'success');

            // Navigate to team management
            window.boltManager.navigateToPage('team');

        } catch (error) {
            console.error('Error in quick load:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel caricamento: ' + error.message, 'error');
        }
    }

    async saveCurrentSession() {
        const content = `
            <div class="save-session-form">
                <h4>Salva Sessione Corrente</h4>
                <div class="form-group">
                    <label for="saveSessionNameInput">Nome Sessione:</label>
                    <input type="text" id="saveSessionNameInput" class="form-input" placeholder="Nome sessione" value="${this.gameManager.gameData.userSession?.session_name || 'Sessione Corrente'}">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="overwriteCheckbox" checked>
                        Sovrascrivi sessione esistente
                    </label>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Salva Sessione', content, [
            {
                text: 'Salva',
                class: 'button-primary',
                onclick: 'window.boltManager.uiManager.currentPage.confirmSaveSession()'
            }
        ]);
    }

    async confirmSaveSession() {
        const sessionName = document.getElementById('saveSessionNameInput').value;
        const overwrite = document.getElementById('overwriteCheckbox').checked;

        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Salvataggio sessione...');

            await this.gameManager.saveSession(sessionName);

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Sessione salvata con successo!', 'success');

            // Refresh session data
            this.loadSessionData();

        } catch (error) {
            console.error('Error saving session:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel salvataggio: ' + error.message, 'error');
        }
    }

    async loadSelectedSession() {
        if (!this.selectedSession) {
            window.boltManager.uiManager.showToast('Nessuna sessione selezionata', 'warning');
            return;
        }

        const content = `
            <div class="load-confirm">
                <h4>Conferma Caricamento</h4>
                <p>Sei sicuro di voler caricare la sessione "<strong>${this.selectedSession.session_name}</strong>"?</p>
                <p class="warning">⚠️ I progressi non salvati della sessione corrente andranno persi.</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Carica Sessione', content, [
            {
                text: 'Carica',
                class: 'button-primary',
                onclick: 'window.boltManager.uiManager.currentPage.confirmLoadSession()'
            }
        ]);
    }

    async confirmLoadSession() {
        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Caricamento sessione...');

            await this.gameManager.loadSession(this.selectedSession.id);

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Sessione caricata con successo!', 'success');

            // Navigate to team management
            window.boltManager.navigateToPage('team');

        } catch (error) {
            console.error('Error loading session:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel caricamento: ' + error.message, 'error');
        }
    }

    async deleteSelectedSession() {
        if (!this.selectedSession) {
            window.boltManager.uiManager.showToast('Nessuna sessione selezionata', 'warning');
            return;
        }

        const content = `
            <div class="delete-confirm">
                <h4>Conferma Eliminazione</h4>
                <p>Sei sicuro di voler eliminare la sessione "<strong>${this.selectedSession.session_name}</strong>"?</p>
                <p class="warning">⚠️ Questa azione non può essere annullata.</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Elimina Sessione', content, [
            {
                text: 'Elimina',
                class: 'button-error',
                onclick: 'window.boltManager.uiManager.currentPage.confirmDeleteSession()'
            }
        ]);
    }

    async confirmDeleteSession() {
        try {
            window.boltManager.uiManager.hideModal();
            
            // For now, just clear localStorage (in a real implementation, you'd delete specific session)
            if (this.selectedSession.is_active) {
                localStorage.removeItem('boltManager_gameData');
                localStorage.removeItem('boltManager_currentSession');
            }

            window.boltManager.uiManager.showToast('Sessione eliminata', 'success');

            // Refresh session data
            this.selectedSession = null;
            this.loadSessionData();
            document.getElementById('sessionDetailsPanel').innerHTML = `
                <div class="no-selection">
                    <p>Seleziona una sessione per visualizzare i dettagli</p>
                </div>
            `;

        } catch (error) {
            console.error('Error deleting session:', error);
            window.boltManager.uiManager.showToast('Errore nell\'eliminazione: ' + error.message, 'error');
        }
    }

    exportData() {
        try {
            const gameData = this.gameManager.gameData;
            const exportData = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                gameData: gameData
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `bolt_manager_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            window.boltManager.uiManager.showToast('Backup esportato con successo!', 'success');

        } catch (error) {
            console.error('Error exporting data:', error);
            window.boltManager.uiManager.showToast('Errore nell\'esportazione: ' + error.message, 'error');
        }
    }

    async importData(file) {
        if (!file) return;

        try {
            const text = await file.text();
            const importData = JSON.parse(text);

            if (!importData.gameData || !importData.version) {
                throw new Error('File di backup non valido');
            }

            const content = `
                <div class="import-confirm">
                    <h4>Conferma Importazione</h4>
                    <p>Stai per importare un backup del <strong>${new Date(importData.exportDate).toLocaleDateString('it-IT')}</strong></p>
                    <p class="warning">⚠️ Tutti i dati attuali verranno sostituiti.</p>
                </div>
            `;

            window.boltManager.uiManager.showModal('Importa Backup', content, [
                {
                    text: 'Importa',
                    class: 'button-primary',
                    onclick: `window.boltManager.uiManager.currentPage.confirmImportData('${btoa(text)}')`
                }
            ]);

        } catch (error) {
            console.error('Error reading import file:', error);
            window.boltManager.uiManager.showToast('Errore nella lettura del file: ' + error.message, 'error');
        }
    }

    async confirmImportData(encodedData) {
        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Importazione dati...');

            const text = atob(encodedData);
            const importData = JSON.parse(text);

            // Replace current game data
            this.gameManager.gameData = importData.gameData;
            this.gameManager.saveGameData();

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Dati importati con successo!', 'success');

            // Refresh session data
            this.loadSessionData();

        } catch (error) {
            console.error('Error importing data:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'importazione: ' + error.message, 'error');
        }
    }
}