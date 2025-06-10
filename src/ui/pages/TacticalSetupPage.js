// Tactical Setup Page implementation
export class TacticalSetupPage {
    constructor() {
        this.gameManager = null;
        this.currentFormation = '4-4-2';
        this.currentMentality = 'balanced';
        this.currentTempo = 'normal';
        this.currentWidth = 'normal';
        this.currentPressing = 'medium';
        this.currentDefensiveLine = 'normal';
        this.currentPassingStyle = 'mixed';
        this.currentCrossing = 'normal';
        this.selectedPlayers = {};
        this.playerPositions = [];
        this.playerRoles = [];
    }

    async init() {
        console.log('⚙️ Initializing TacticalSetupPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadTacticalData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Tattiche</span>
                </nav>

                <!-- Tactical Overview -->
                <div class="tactical-overview">
                    <h2>Impostazioni Tattiche</h2>
                    <div id="tacticalEffectiveness" class="tactical-effectiveness">
                        <span class="effectiveness-label">Efficacia Tattica:</span>
                        <span id="effectivenessValue" class="effectiveness-value">--</span>
                        <div class="effectiveness-bar">
                            <div id="effectivenessProgress" class="effectiveness-progress"></div>
                        </div>
                    </div>
                </div>

                <!-- Formation and Field -->
                <div class="tactical-main">
                    <div class="formation-controls">
                        <h3>Modulo</h3>
                        <select id="formationSelect" class="formation-select">
                            <option value="4-4-2">4-4-2</option>
                            <option value="4-3-3">4-3-3</option>
                            <option value="3-5-2">3-5-2</option>
                            <option value="4-2-3-1">4-2-3-1</option>
                            <option value="5-3-2">5-3-2</option>
                            <option value="4-5-1">4-5-1</option>
                        </select>
                    </div>

                    <div class="tactical-field-container">
                        <div id="tacticalField" class="tactical-field">
                            <!-- Will be populated by loadTacticalField() -->
                        </div>
                    </div>

                    <div class="tactical-settings">
                        <h3>Impostazioni</h3>
                        
                        <div class="setting-group">
                            <label>Mentalità</label>
                            <select id="mentalitySelect">
                                <option value="defensive">Difensiva</option>
                                <option value="balanced" selected>Equilibrata</option>
                                <option value="attacking">Offensiva</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Ritmo</label>
                            <select id="tempoSelect">
                                <option value="slow">Lento</option>
                                <option value="normal" selected>Normale</option>
                                <option value="fast">Veloce</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Ampiezza</label>
                            <select id="widthSelect">
                                <option value="narrow">Stretta</option>
                                <option value="normal" selected>Normale</option>
                                <option value="wide">Ampia</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Pressing</label>
                            <select id="pressingSelect">
                                <option value="low">Basso</option>
                                <option value="medium" selected>Medio</option>
                                <option value="high">Alto</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Linea Difensiva</label>
                            <select id="defensiveLineSelect">
                                <option value="deep">Bassa</option>
                                <option value="normal" selected>Normale</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>

                        <div class="setting-group">
                            <label>Stile Passaggi</label>
                            <select id="passingStyleSelect">
                                <option value="short">Corti</option>
                                <option value="mixed" selected>Misti</option>
                                <option value="long">Lunghi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Sponsor Banner -->
                <div class="sponsor-banner">
                    <img src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                         alt="Sponsor Tactics" class="sponsor-image">
                </div>

                <!-- Player Selection -->
                <div class="player-selection-panel">
                    <h3>Selezione Giocatori</h3>
                    <div id="playerSelectionGrid" class="player-selection-grid">
                        <!-- Will be populated by loadPlayerSelection() -->
                    </div>
                </div>

                <!-- Set Pieces -->
                <div class="set-pieces">
                    <h3>Calci Piazzati</h3>
                    <div class="set-pieces-grid">
                        <div class="set-piece-item">
                            <label>Capitano</label>
                            <select id="captainSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Rigorista</label>
                            <select id="penaltyTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Punizioni</label>
                            <select id="freeKickTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                        <div class="set-piece-item">
                            <label>Corner</label>
                            <select id="cornerTakerSelect">
                                <option value="">Seleziona...</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="tactical-actions">
                    <button id="saveTacticsBtn" class="button button-primary button-large">
                        💾 Salva Tattica
                    </button>
                    <button id="resetTacticsBtn" class="button button-secondary">
                        🔄 Ripristina
                    </button>
                    <button id="previewTacticsBtn" class="button button-ghost">
                        👁️ Anteprima
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Formation selection
        document.getElementById('formationSelect')?.addEventListener('change', (e) => {
            this.currentFormation = e.target.value;
            this.loadTacticalField();
            this.updateTacticalEffectiveness();
        });

        // Tactical settings
        ['mentality', 'tempo', 'width', 'pressing', 'defensiveLine', 'passingStyle'].forEach(setting => {
            const element = document.getElementById(`${setting}Select`);
            element?.addEventListener('change', (e) => {
                this[`current${setting.charAt(0).toUpperCase() + setting.slice(1)}`] = e.target.value;
                this.updateTacticalEffectiveness();
            });
        });

        // Action buttons
        document.getElementById('saveTacticsBtn')?.addEventListener('click', () => {
            this.saveTactics();
        });

        document.getElementById('resetTacticsBtn')?.addEventListener('click', () => {
            this.resetTactics();
        });

        document.getElementById('previewTacticsBtn')?.addEventListener('click', () => {
            this.previewTactics();
        });
    }

    loadTacticalData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        // Load existing tactics
        const existingTactics = this.gameManager.getTeamTactics(userTeam.id);
        if (existingTactics) {
            this.currentFormation = existingTactics.formation;
            this.currentMentality = existingTactics.mentality;
            this.currentTempo = existingTactics.tempo;
            this.currentWidth = existingTactics.width;
            this.currentPressing = existingTactics.pressing;
            this.currentDefensiveLine = existingTactics.defensive_line;
            this.currentPassingStyle = existingTactics.passing_style;
            this.currentCrossing = existingTactics.crossing;

            // Update UI elements
            document.getElementById('formationSelect').value = this.currentFormation;
            document.getElementById('mentalitySelect').value = this.currentMentality;
            document.getElementById('tempoSelect').value = this.currentTempo;
            document.getElementById('widthSelect').value = this.currentWidth;
            document.getElementById('pressingSelect').value = this.currentPressing;
            document.getElementById('defensiveLineSelect').value = this.currentDefensiveLine;
            document.getElementById('passingStyleSelect').value = this.currentPassingStyle;
        }

        // Load tactical field
        this.loadTacticalField();

        // Load player selection
        this.loadPlayerSelection();

        // Update effectiveness
        this.updateTacticalEffectiveness();
    }

    loadTacticalField() {
        const fieldHTML = `
            <div class="field-background">
                <div class="field-lines">
                    <div class="center-circle"></div>
                    <div class="penalty-area penalty-area-top"></div>
                    <div class="penalty-area penalty-area-bottom"></div>
                    <div class="goal-area goal-area-top"></div>
                    <div class="goal-area goal-area-bottom"></div>
                </div>
                <div id="playerPositions" class="player-positions">
                    ${this.generatePlayerPositions()}
                </div>
            </div>
        `;

        document.getElementById('tacticalField').innerHTML = fieldHTML;
        this.setupFieldInteractions();
    }

    generatePlayerPositions() {
        const formations = {
            '4-4-2': [
                { position: 'GK', x: 50, y: 90 },
                { position: 'DEF', x: 20, y: 75 },
                { position: 'DEF', x: 40, y: 75 },
                { position: 'DEF', x: 60, y: 75 },
                { position: 'DEF', x: 80, y: 75 },
                { position: 'MID', x: 20, y: 50 },
                { position: 'MID', x: 40, y: 50 },
                { position: 'MID', x: 60, y: 50 },
                { position: 'MID', x: 80, y: 50 },
                { position: 'ATT', x: 35, y: 25 },
                { position: 'ATT', x: 65, y: 25 }
            ],
            '4-3-3': [
                { position: 'GK', x: 50, y: 90 },
                { position: 'DEF', x: 20, y: 75 },
                { position: 'DEF', x: 40, y: 75 },
                { position: 'DEF', x: 60, y: 75 },
                { position: 'DEF', x: 80, y: 75 },
                { position: 'MID', x: 30, y: 55 },
                { position: 'MID', x: 50, y: 55 },
                { position: 'MID', x: 70, y: 55 },
                { position: 'ATT', x: 20, y: 25 },
                { position: 'ATT', x: 50, y: 25 },
                { position: 'ATT', x: 80, y: 25 }
            ],
            '3-5-2': [
                { position: 'GK', x: 50, y: 90 },
                { position: 'DEF', x: 30, y: 75 },
                { position: 'DEF', x: 50, y: 75 },
                { position: 'DEF', x: 70, y: 75 },
                { position: 'MID', x: 15, y: 50 },
                { position: 'MID', x: 35, y: 50 },
                { position: 'MID', x: 50, y: 50 },
                { position: 'MID', x: 65, y: 50 },
                { position: 'MID', x: 85, y: 50 },
                { position: 'ATT', x: 40, y: 25 },
                { position: 'ATT', x: 60, y: 25 }
            ],
            '4-2-3-1': [
                { position: 'GK', x: 50, y: 90 },
                { position: 'DEF', x: 20, y: 75 },
                { position: 'DEF', x: 40, y: 75 },
                { position: 'DEF', x: 60, y: 75 },
                { position: 'DEF', x: 80, y: 75 },
                { position: 'MID', x: 35, y: 60 },
                { position: 'MID', x: 65, y: 60 },
                { position: 'MID', x: 25, y: 40 },
                { position: 'MID', x: 50, y: 40 },
                { position: 'MID', x: 75, y: 40 },
                { position: 'ATT', x: 50, y: 25 }
            ]
        };

        const positions = formations[this.currentFormation] || formations['4-4-2'];
        this.playerPositions = positions;

        return positions.map((pos, index) => `
            <div class="field-position" 
                 data-index="${index}" 
                 data-position="${pos.position}"
                 style="left: ${pos.x}%; top: ${pos.y}%;"
                 tabindex="0">
                <div class="position-slot">
                    <span class="position-label">${pos.position}</span>
                    <div class="player-slot" id="playerSlot${index}">
                        <span class="player-name">Seleziona</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupFieldInteractions() {
        document.querySelectorAll('.field-position').forEach(position => {
            position.addEventListener('click', () => {
                const index = parseInt(position.dataset.index);
                this.showPlayerSelector(index);
            });

            position.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const index = parseInt(position.dataset.index);
                    this.showPlayerSelector(index);
                }
            });
        });
    }

    loadPlayerSelection() {
        const userPlayers = this.gameManager.getUserPlayers();
        const availablePlayers = userPlayers.filter(p => p.injury_status === 'healthy');

        // Group players by position
        const playersByPosition = {
            'GK': availablePlayers.filter(p => p.position === 'GK'),
            'DEF': availablePlayers.filter(p => p.position === 'DEF'),
            'MID': availablePlayers.filter(p => p.position === 'MID'),
            'ATT': availablePlayers.filter(p => p.position === 'ATT')
        };

        const gridHTML = Object.entries(playersByPosition).map(([position, players]) => `
            <div class="position-group">
                <h4 class="position-title">${this.getPositionName(position)}</h4>
                <div class="players-list">
                    ${players.map(player => `
                        <div class="player-selection-card" data-player-id="${player.id}" data-position="${position}">
                            <div class="player-info">
                                <span class="player-name">${player.first_name} ${player.last_name}</span>
                                <span class="player-rating">${player.overall_rating}</span>
                            </div>
                            <div class="player-stats">
                                <span class="player-fitness">Forma: ${Math.round(player.fitness)}%</span>
                                <span class="player-morale">Morale: ${Math.round(player.morale)}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        document.getElementById('playerSelectionGrid').innerHTML = gridHTML;

        // Populate set piece selectors
        this.populateSetPieceSelectors(availablePlayers);
    }

    populateSetPieceSelectors(players) {
        const selectors = ['captain', 'penaltyTaker', 'freeKickTaker', 'cornerTaker'];
        
        selectors.forEach(selector => {
            const selectElement = document.getElementById(`${selector}Select`);
            if (selectElement) {
                selectElement.innerHTML = '<option value="">Seleziona...</option>' +
                    players.map(player => `
                        <option value="${player.id}">
                            ${player.first_name} ${player.last_name} (${player.position})
                        </option>
                    `).join('');
            }
        });
    }

    getPositionName(position) {
        const names = {
            'GK': 'Portieri',
            'DEF': 'Difensori',
            'MID': 'Centrocampisti',
            'ATT': 'Attaccanti'
        };
        return names[position] || position;
    }

    showPlayerSelector(positionIndex) {
        const position = this.playerPositions[positionIndex];
        const userPlayers = this.gameManager.getUserPlayers();
        const availablePlayers = userPlayers.filter(p => 
            p.injury_status === 'healthy' && 
            (p.position === position.position || this.isCompatiblePosition(p.position, position.position))
        );

        const playersHTML = availablePlayers.map(player => `
            <div class="player-option" data-player-id="${player.id}" tabindex="0">
                <div class="player-info">
                    <span class="player-name">${player.first_name} ${player.last_name}</span>
                    <span class="player-rating">${player.overall_rating}</span>
                </div>
                <div class="player-details">
                    <span class="player-position">${player.position}</span>
                    <span class="player-fitness">Forma: ${Math.round(player.fitness)}%</span>
                </div>
            </div>
        `).join('');

        const content = `
            <div class="player-selector">
                <h4>Seleziona giocatore per ${position.position}</h4>
                <div class="player-options">
                    ${playersHTML}
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Selezione Giocatore', content);

        // Setup player selection
        document.querySelectorAll('.player-option').forEach(option => {
            option.addEventListener('click', () => {
                const playerId = option.dataset.playerId;
                this.assignPlayerToPosition(positionIndex, playerId);
                window.boltManager.uiManager.hideModal();
            });

            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const playerId = option.dataset.playerId;
                    this.assignPlayerToPosition(positionIndex, playerId);
                    window.boltManager.uiManager.hideModal();
                }
            });
        });
    }

    isCompatiblePosition(playerPosition, fieldPosition) {
        const compatibility = {
            'GK': ['GK'],
            'DEF': ['DEF'],
            'MID': ['MID', 'DEF', 'ATT'], // Midfielders can play multiple positions
            'ATT': ['ATT', 'MID']
        };

        return compatibility[playerPosition]?.includes(fieldPosition) || false;
    }

    assignPlayerToPosition(positionIndex, playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        if (!player) return;

        // Remove player from other positions
        Object.keys(this.selectedPlayers).forEach(key => {
            if (this.selectedPlayers[key] === playerId) {
                delete this.selectedPlayers[key];
                const oldSlot = document.getElementById(`playerSlot${key}`);
                if (oldSlot) {
                    oldSlot.innerHTML = '<span class="player-name">Seleziona</span>';
                }
            }
        });

        // Assign player to new position
        this.selectedPlayers[positionIndex] = playerId;
        const playerSlot = document.getElementById(`playerSlot${positionIndex}`);
        if (playerSlot) {
            playerSlot.innerHTML = `
                <span class="player-name">${player.first_name} ${player.last_name}</span>
                <span class="player-rating">${player.overall_rating}</span>
            `;
        }

        this.updateTacticalEffectiveness();
    }

    updateTacticalEffectiveness() {
        // Calculate effectiveness based on current setup
        let effectiveness = 50; // Base effectiveness

        // Formation balance
        effectiveness += 10;

        // Player assignments
        const assignedCount = Object.keys(this.selectedPlayers).length;
        effectiveness += (assignedCount / 11) * 20;

        // Tactical coherence
        if (this.currentMentality === 'attacking' && this.currentTempo === 'fast') {
            effectiveness += 5;
        }
        if (this.currentMentality === 'defensive' && this.currentPressing === 'low') {
            effectiveness += 5;
        }

        effectiveness = Math.min(100, Math.max(0, effectiveness));

        // Update UI
        document.getElementById('effectivenessValue').textContent = `${Math.round(effectiveness)}%`;
        const progressBar = document.getElementById('effectivenessProgress');
        if (progressBar) {
            progressBar.style.width = `${effectiveness}%`;
            progressBar.style.backgroundColor = this.getEffectivenessColor(effectiveness);
        }
    }

    getEffectivenessColor(effectiveness) {
        if (effectiveness >= 80) return 'var(--success)';
        if (effectiveness >= 60) return 'var(--warning)';
        return 'var(--error)';
    }

    async saveTactics() {
        try {
            const userTeam = this.gameManager.getUserTeam();
            if (!userTeam) {
                throw new Error('Squadra utente non trovata');
            }

            // Validate that all positions are filled
            if (Object.keys(this.selectedPlayers).length < 11) {
                window.boltManager.uiManager.showToast('Seleziona tutti i giocatori prima di salvare', 'warning');
                return;
            }

            window.boltManager.uiManager.showLoading('Salvataggio tattica...');

            // Prepare player positions and roles
            const playerPositions = this.playerPositions.map((pos, index) => ({
                playerId: this.selectedPlayers[index] || null,
                x: pos.x,
                y: pos.y,
                fieldPosition: pos.position
            }));

            const playerRoles = this.playerPositions.map((pos, index) => {
                const player = this.gameManager.gameData.players.find(p => p.id === this.selectedPlayers[index]);
                return this.getDefaultRole(pos.position, player?.position);
            });

            // Get set piece takers
            const captainId = document.getElementById('captainSelect')?.value || null;
            const penaltyTakerId = document.getElementById('penaltyTakerSelect')?.value || null;
            const freeKickTakerId = document.getElementById('freeKickTakerSelect')?.value || null;
            const cornerTakerId = document.getElementById('cornerTakerSelect')?.value || null;

            // Save tactics
            const result = await this.gameManager.updateTactics({
                teamId: userTeam.id,
                formation: this.currentFormation,
                mentality: this.currentMentality,
                tempo: this.currentTempo,
                width: this.currentWidth,
                pressing: this.currentPressing,
                defensiveLine: this.currentDefensiveLine,
                passingStyle: this.currentPassingStyle,
                crossing: this.currentCrossing,
                playerPositions,
                playerRoles,
                setPieces: [],
                captainId,
                penaltyTakerId,
                freeKickTakerId,
                cornerTakerId,
                tacticName: 'Tattica Principale'
            });

            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Tattica salvata con successo!', 'success');

            // Update effectiveness display
            this.updateTacticalEffectiveness();

        } catch (error) {
            console.error('Error saving tactics:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nel salvataggio: ' + error.message, 'error');
        }
    }

    getDefaultRole(fieldPosition, playerPosition) {
        const roleMap = {
            'GK': 'goalkeeper',
            'DEF': 'defender',
            'MID': 'midfielder',
            'ATT': 'forward'
        };

        return roleMap[fieldPosition] || 'midfielder';
    }

    resetTactics() {
        // Reset to default values
        this.currentFormation = '4-4-2';
        this.currentMentality = 'balanced';
        this.currentTempo = 'normal';
        this.currentWidth = 'normal';
        this.currentPressing = 'medium';
        this.currentDefensiveLine = 'normal';
        this.currentPassingStyle = 'mixed';
        this.currentCrossing = 'normal';
        this.selectedPlayers = {};

        // Update UI
        document.getElementById('formationSelect').value = this.currentFormation;
        document.getElementById('mentalitySelect').value = this.currentMentality;
        document.getElementById('tempoSelect').value = this.currentTempo;
        document.getElementById('widthSelect').value = this.currentWidth;
        document.getElementById('pressingSelect').value = this.currentPressing;
        document.getElementById('defensiveLineSelect').value = this.currentDefensiveLine;
        document.getElementById('passingStyleSelect').value = this.currentPassingStyle;

        // Reload field
        this.loadTacticalField();
        this.updateTacticalEffectiveness();

        window.boltManager.uiManager.showToast('Tattica ripristinata', 'info');
    }

    previewTactics() {
        const effectiveness = document.getElementById('effectivenessValue').textContent;
        const assignedPlayers = Object.keys(this.selectedPlayers).length;

        const content = `
            <div class="tactics-preview">
                <h4>Anteprima Tattica</h4>
                <div class="preview-stats">
                    <div class="stat-item">
                        <span class="stat-label">Modulo:</span>
                        <span class="stat-value">${this.currentFormation}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Mentalità:</span>
                        <span class="stat-value">${this.currentMentality}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Efficacia:</span>
                        <span class="stat-value">${effectiveness}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Giocatori Assegnati:</span>
                        <span class="stat-value">${assignedPlayers}/11</span>
                    </div>
                </div>
                <div class="preview-recommendations">
                    <h5>Raccomandazioni:</h5>
                    <ul>
                        ${assignedPlayers < 11 ? '<li>Completa la selezione dei giocatori</li>' : ''}
                        ${this.currentMentality === 'attacking' && this.currentPressing === 'low' ? 
                          '<li>Considera un pressing più alto per una mentalità offensiva</li>' : ''}
                        ${this.currentMentality === 'defensive' && this.currentTempo === 'fast' ? 
                          '<li>Un ritmo più lento potrebbe essere più adatto alla mentalità difensiva</li>' : ''}
                    </ul>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Anteprima Tattica', content);
    }
}