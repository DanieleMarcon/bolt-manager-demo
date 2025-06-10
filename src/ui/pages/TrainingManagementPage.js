// Training Management Page implementation
export class TrainingManagementPage {
    constructor() {
        this.gameManager = null;
        this.selectedPlayers = [];
        this.currentTrainingType = 'fitness';
        this.currentIntensity = 3;
    }

    async init() {
        console.log('🏃 Initializing TrainingManagementPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadTrainingData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Allenamento</span>
                </nav>

                <!-- Training Overview -->
                <div class="training-overview">
                    <h2>Gestione Allenamenti</h2>
                    <div class="current-date">
                        <span class="date-label">Data corrente:</span>
                        <span id="currentGameDate" class="date-value">--</span>
                    </div>
                </div>

                <!-- Training Scheduler -->
                <div class="training-scheduler">
                    <h3>Pianificazione Settimanale</h3>
                    <div id="weeklySchedule" class="weekly-schedule">
                        <!-- Will be populated by loadWeeklySchedule() -->
                    </div>
                </div>

                <!-- Training Setup -->
                <div class="training-setup">
                    <div class="training-controls">
                        <div class="control-group">
                            <h4>Tipo Allenamento</h4>
                            <div class="training-types">
                                <button class="training-type-btn active" data-type="fitness">
                                    💪 Fisico
                                </button>
                                <button class="training-type-btn" data-type="technical">
                                    ⚽ Tecnico
                                </button>
                                <button class="training-type-btn" data-type="tactical">
                                    🧠 Tattico
                                </button>
                            </div>
                        </div>

                        <div class="control-group">
                            <h4>Intensità</h4>
                            <div class="intensity-control">
                                <input type="range" id="intensitySlider" min="1" max="5" value="3" class="intensity-slider">
                                <div class="intensity-labels">
                                    <span>Leggero</span>
                                    <span>Moderato</span>
                                    <span>Intenso</span>
                                    <span>Molto Intenso</span>
                                    <span>Massimo</span>
                                </div>
                                <div class="intensity-value">
                                    Intensità: <span id="intensityValue">3</span>/5
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Player Selection -->
                    <div class="player-selection">
                        <h4>Selezione Giocatori</h4>
                        <div class="selection-controls">
                            <button id="selectAllBtn" class="button button-secondary">Seleziona Tutti</button>
                            <button id="selectNoneBtn" class="button button-secondary">Deseleziona Tutti</button>
                            <button id="selectAvailableBtn" class="button button-secondary">Solo Disponibili</button>
                        </div>
                        <div id="playerSelectionList" class="player-selection-list">
                            <!-- Will be populated by loadPlayerSelection() -->
                        </div>
                    </div>

                    <!-- Training Actions -->
                    <div class="training-actions">
                        <button id="executeTrainingBtn" class="button button-primary button-large">
                            🏃 Esegui Allenamento Oggi
                        </button>
                        <button id="scheduleTrainingBtn" class="button button-secondary">
                            📅 Programma per Domani
                        </button>
                    </div>
                </div>

                <!-- Sponsor Slot -->
                <div class="sponsor-horizontal">
                    <img src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800&h=80&fit=crop" 
                         alt="Sponsor Training" class="sponsor-image">
                </div>

                <!-- Training History -->
                <div class="training-history">
                    <h3>Allenamenti Recenti</h3>
                    <div id="trainingHistoryList" class="training-history-list">
                        <!-- Will be populated by loadTrainingHistory() -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Training type selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('training-type-btn')) {
                document.querySelectorAll('.training-type-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTrainingType = e.target.dataset.type;
                this.updateTrainingPreview();
            }
        });

        // Intensity slider
        document.getElementById('intensitySlider')?.addEventListener('input', (e) => {
            this.currentIntensity = parseInt(e.target.value);
            document.getElementById('intensityValue').textContent = this.currentIntensity;
            this.updateTrainingPreview();
        });

        // Player selection controls
        document.getElementById('selectAllBtn')?.addEventListener('click', () => {
            this.selectAllPlayers();
        });

        document.getElementById('selectNoneBtn')?.addEventListener('click', () => {
            this.selectNoPlayers();
        });

        document.getElementById('selectAvailableBtn')?.addEventListener('click', () => {
            this.selectAvailablePlayers();
        });

        // Training execution
        document.getElementById('executeTrainingBtn')?.addEventListener('click', () => {
            this.executeTraining();
        });

        document.getElementById('scheduleTrainingBtn')?.addEventListener('click', () => {
            this.scheduleTraining();
        });
    }

    loadTrainingData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Update current date
        const currentDate = new Date(this.gameManager.getCurrentDate());
        document.getElementById('currentGameDate').textContent = currentDate.toLocaleDateString('it-IT');

        // Load weekly schedule
        this.loadWeeklySchedule();

        // Load player selection
        this.loadPlayerSelection();

        // Load training history
        this.loadTrainingHistory();
    }

    loadWeeklySchedule() {
        const currentDate = new Date(this.gameManager.getCurrentDate());
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + i);
            weekDays.push(day);
        }

        const scheduleHTML = weekDays.map((day, index) => {
            const dayName = day.toLocaleDateString('it-IT', { weekday: 'short' });
            const dayDate = day.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
            const isToday = day.toDateString() === currentDate.toDateString();
            
            // Check for scheduled trainings
            const scheduledTraining = this.gameManager.gameData.trainings.find(training => {
                const trainingDate = new Date(training.training_date);
                return trainingDate.toDateString() === day.toDateString();
            });

            return `
                <div class="schedule-day ${isToday ? 'today' : ''}" data-date="${day.toISOString()}">
                    <div class="day-header">
                        <span class="day-name">${dayName}</span>
                        <span class="day-date">${dayDate}</span>
                    </div>
                    <div class="day-content">
                        ${scheduledTraining ? `
                            <div class="scheduled-training">
                                <span class="training-icon">🏃</span>
                                <span class="training-type">${scheduledTraining.training_type}</span>
                                <span class="training-intensity">Int. ${scheduledTraining.intensity}</span>
                            </div>
                        ` : `
                            <div class="no-training">
                                <span class="no-training-text">Riposo</span>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('weeklySchedule').innerHTML = scheduleHTML;
    }

    loadPlayerSelection() {
        const userPlayers = this.gameManager.getUserPlayers();
        
        const playersHTML = userPlayers.map(player => {
            const isAvailable = player.injury_status === 'healthy';
            const isSelected = this.selectedPlayers.includes(player.id);
            
            return `
                <div class="player-selection-item ${!isAvailable ? 'unavailable' : ''}" data-player-id="${player.id}">
                    <label class="player-checkbox">
                        <input type="checkbox" ${isSelected ? 'checked' : ''} ${!isAvailable ? 'disabled' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <div class="player-info">
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="player-position">${player.position}</span>
                        <span class="player-fitness">Forma: ${Math.round(player.fitness)}%</span>
                    </div>
                    <div class="player-status">
                        ${!isAvailable ? 
                            `<span class="status-injury">🤕 ${player.injury_days}g</span>` : 
                            `<span class="status-available">✅</span>`
                        }
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('playerSelectionList').innerHTML = playersHTML;

        // Setup checkbox listeners
        document.querySelectorAll('.player-selection-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const playerId = e.target.closest('.player-selection-item').dataset.playerId;
                if (e.target.checked) {
                    if (!this.selectedPlayers.includes(playerId)) {
                        this.selectedPlayers.push(playerId);
                    }
                } else {
                    this.selectedPlayers = this.selectedPlayers.filter(id => id !== playerId);
                }
                this.updateTrainingPreview();
            });
        });
    }

    loadTrainingHistory() {
        const recentTrainings = this.gameManager.gameData.trainings
            .filter(training => training.status === 'completed')
            .sort((a, b) => new Date(b.training_date) - new Date(a.training_date))
            .slice(0, 5);

        if (recentTrainings.length === 0) {
            document.getElementById('trainingHistoryList').innerHTML = `
                <div class="no-history">
                    <p>Nessun allenamento completato</p>
                </div>
            `;
            return;
        }

        const historyHTML = recentTrainings.map(training => {
            const trainingDate = new Date(training.training_date);
            
            return `
                <div class="training-history-item">
                    <div class="training-info">
                        <span class="training-date">${trainingDate.toLocaleDateString('it-IT')}</span>
                        <span class="training-type">${training.training_type}</span>
                        <span class="training-intensity">Intensità ${training.intensity}</span>
                    </div>
                    <div class="training-results">
                        <span class="participants">${training.participants.length} giocatori</span>
                        ${training.injuries_occurred.length > 0 ? 
                            `<span class="injuries">⚠️ ${training.injuries_occurred.length} infortuni</span>` : 
                            `<span class="no-injuries">✅ Nessun infortunio</span>`
                        }
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('trainingHistoryList').innerHTML = historyHTML;
    }

    selectAllPlayers() {
        const userPlayers = this.gameManager.getUserPlayers();
        this.selectedPlayers = userPlayers.map(player => player.id);
        this.updatePlayerSelection();
    }

    selectNoPlayers() {
        this.selectedPlayers = [];
        this.updatePlayerSelection();
    }

    selectAvailablePlayers() {
        const userPlayers = this.gameManager.getUserPlayers();
        this.selectedPlayers = userPlayers
            .filter(player => player.injury_status === 'healthy')
            .map(player => player.id);
        this.updatePlayerSelection();
    }

    updatePlayerSelection() {
        document.querySelectorAll('.player-selection-item input[type="checkbox"]').forEach(checkbox => {
            const playerId = checkbox.closest('.player-selection-item').dataset.playerId;
            checkbox.checked = this.selectedPlayers.includes(playerId);
        });
        this.updateTrainingPreview();
    }

    updateTrainingPreview() {
        // Update execute button state
        const executeBtn = document.getElementById('executeTrainingBtn');
        if (executeBtn) {
            executeBtn.disabled = this.selectedPlayers.length === 0;
            executeBtn.textContent = `🏃 Esegui Allenamento (${this.selectedPlayers.length} giocatori)`;
        }
    }

    async executeTraining() {
        if (this.selectedPlayers.length === 0) {
            window.boltManager.uiManager.showToast('Seleziona almeno un giocatore', 'warning');
            return;
        }

        try {
            window.boltManager.uiManager.showLoading('Esecuzione allenamento...');

            const userTeam = this.gameManager.getUserTeam();
            const result = await this.gameManager.executePlayerTrain({
                playerIds: this.selectedPlayers,
                trainingType: this.currentTrainingType,
                intensity: this.currentIntensity,
                teamId: userTeam.id
            });

            window.boltManager.uiManager.hideLoading();

            // Show results modal
            this.showTrainingResults(result);

            // Refresh data
            this.loadTrainingData();

            window.boltManager.uiManager.showToast('Allenamento completato con successo!', 'success');

        } catch (error) {
            console.error('Error executing training:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore durante l\'allenamento: ' + error.message, 'error');
        }
    }

    async scheduleTraining() {
        if (this.selectedPlayers.length === 0) {
            window.boltManager.uiManager.showToast('Seleziona almeno un giocatore', 'warning');
            return;
        }

        try {
            const userTeam = this.gameManager.getUserTeam();
            const tomorrow = new Date(this.gameManager.getCurrentDate());
            tomorrow.setDate(tomorrow.getDate() + 1);

            const training = this.gameManager.scheduleTraining({
                playerIds: this.selectedPlayers,
                type: this.currentTrainingType,
                intensity: this.currentIntensity,
                teamId: userTeam.id,
                date: tomorrow.toISOString()
            });

            // Refresh schedule
            this.loadWeeklySchedule();

            window.boltManager.uiManager.showToast('Allenamento programmato per domani', 'success');

        } catch (error) {
            console.error('Error scheduling training:', error);
            window.boltManager.uiManager.showToast('Errore nella programmazione', 'error');
        }
    }

    showTrainingResults(result) {
        const { trainingRecord, results } = result;
        
        const improvementsHTML = results
            .filter(r => Object.keys(r.attributeChanges).length > 0)
            .map(r => {
                const player = this.gameManager.gameData.players.find(p => p.id === r.playerId);
                const changes = Object.entries(r.attributeChanges)
                    .map(([attr, change]) => `${attr}: +${change}`)
                    .join(', ');
                
                return `
                    <div class="player-improvement">
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="improvements">${changes}</span>
                    </div>
                `;
            }).join('');

        const injuriesHTML = results
            .filter(r => r.injury)
            .map(r => {
                const player = this.gameManager.gameData.players.find(p => p.id === r.playerId);
                return `
                    <div class="player-injury">
                        <span class="player-name">${player.first_name} ${player.last_name}</span>
                        <span class="injury-info">🤕 ${r.injury.description} (${r.injury.days} giorni)</span>
                    </div>
                `;
            }).join('');

        const content = `
            <div class="training-results">
                <div class="results-summary">
                    <h4>Riepilogo Allenamento</h4>
                    <div class="summary-stats">
                        <div class="stat-item">
                            <span class="stat-label">Tipo:</span>
                            <span class="stat-value">${trainingRecord.training_type}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Intensità:</span>
                            <span class="stat-value">${trainingRecord.intensity}/5</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Partecipanti:</span>
                            <span class="stat-value">${trainingRecord.participants.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Infortuni:</span>
                            <span class="stat-value">${results.filter(r => r.injury).length}</span>
                        </div>
                    </div>
                </div>

                ${improvementsHTML ? `
                    <div class="improvements-section">
                        <h4>Miglioramenti</h4>
                        <div class="improvements-list">
                            ${improvementsHTML}
                        </div>
                    </div>
                ` : ''}

                ${injuriesHTML ? `
                    <div class="injuries-section">
                        <h4>Infortuni</h4>
                        <div class="injuries-list">
                            ${injuriesHTML}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        window.boltManager.uiManager.showModal('Risultati Allenamento', content);
    }
}