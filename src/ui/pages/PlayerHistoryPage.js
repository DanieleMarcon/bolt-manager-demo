// Player History Page implementation
export class PlayerHistoryPage {
    constructor() {
        this.gameManager = null;
        this.selectedPlayerId = null;
        this.timeRange = {
            start: null,
            end: null,
            preset: '6months'
        };
        this.currentReport = null;
        this.comparisonMode = false;
        this.comparisonPlayers = [];
    }

    async init() {
        console.log('📈 Initializing PlayerHistoryPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadHistoryData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Storico Giocatori</span>
                </nav>

                <!-- History Controls -->
                <div class="history-controls">
                    <div class="controls-row">
                        <div class="player-selection">
                            <label for="playerSelector">Giocatore:</label>
                            <select id="playerSelector" class="player-selector">
                                <option value="">Seleziona giocatore...</option>
                                <!-- Will be populated by loadPlayerSelector() -->
                            </select>
                        </div>

                        <div class="time-range-selection">
                            <label for="timeRangePreset">Periodo:</label>
                            <select id="timeRangePreset" class="time-range-preset">
                                <option value="1month">Ultimo Mese</option>
                                <option value="3months">Ultimi 3 Mesi</option>
                                <option value="6months" selected>Ultimi 6 Mesi</option>
                                <option value="1year">Ultimo Anno</option>
                                <option value="custom">Personalizzato</option>
                            </select>
                        </div>

                        <div class="custom-range" id="customRange" style="display: none;">
                            <input type="date" id="startDateInput" class="date-input">
                            <span>-</span>
                            <input type="date" id="endDateInput" class="date-input">
                        </div>

                        <div class="analysis-actions">
                            <button id="generateReportBtn" class="button button-primary">
                                📊 Genera Report
                            </button>
                            <button id="comparisonModeBtn" class="button button-secondary">
                                🔄 Modalità Confronto
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Report Status -->
                <div id="reportStatus" class="report-status" style="display: none;">
                    <!-- Will show report generation status -->
                </div>

                <!-- Main Content Area -->
                <div class="history-content">
                    <!-- Player Overview -->
                    <div id="playerOverview" class="player-overview" style="display: none;">
                        <!-- Will be populated by loadPlayerOverview() -->
                    </div>

                    <!-- Progress Charts Section -->
                    <div id="progressChartsSection" class="charts-section" style="display: none;">
                        <h3>Evoluzione Attributi</h3>
                        <div id="attributeProgressChart" class="attribute-progress-chart">
                            <!-- Will be populated by renderAttributeChart() -->
                        </div>
                    </div>

                    <!-- Morale Trend Section -->
                    <div id="moraleTrendSection" class="charts-section" style="display: none;">
                        <h3>Andamento Morale</h3>
                        <div id="moraleTrendChart" class="morale-trend-chart">
                            <!-- Will be populated by renderMoraleChart() -->
                        </div>
                    </div>

                    <!-- Performance Section -->
                    <div id="performanceSection" class="charts-section" style="display: none;">
                        <h3>Performance Partite</h3>
                        <div id="performanceChart" class="performance-chart">
                            <!-- Will be populated by renderPerformanceChart() -->
                        </div>
                    </div>

                    <!-- Sponsor Banner -->
                    <div class="sponsor-banner">
                        <div class="sponsor-content">
                            <span class="sponsor-label">Analisi Storica powered by</span>
                            <img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=100&fit=crop" 
                                 alt="Sponsor History" class="sponsor-image">
                        </div>
                    </div>

                    <!-- Statistics Table Section -->
                    <div id="statisticsSection" class="statistics-section" style="display: none;">
                        <h3>Statistiche Dettagliate</h3>
                        <div class="statistics-controls">
                            <button id="toggleTableView" class="button button-ghost">📋 Vista Tabella</button>
                            <button id="toggleTimelineView" class="button button-ghost">📅 Vista Timeline</button>
                        </div>
                        <div id="statisticsTable" class="statistics-table">
                            <!-- Will be populated by renderStatisticsTable() -->
                        </div>
                    </div>

                    <!-- Key Moments Section -->
                    <div id="keyMomentsSection" class="key-moments-section" style="display: none;">
                        <h3>Momenti Salienti</h3>
                        <div id="keyMomentsTimeline" class="key-moments-timeline">
                            <!-- Will be populated by renderKeyMoments() -->
                        </div>
                    </div>

                    <!-- Comparison Section -->
                    <div id="comparisonSection" class="comparison-section" style="display: none;">
                        <h3>Confronto Giocatori</h3>
                        <div class="comparison-controls">
                            <select id="comparisonPlayerSelector" class="player-selector">
                                <option value="">Aggiungi giocatore al confronto...</option>
                            </select>
                            <button id="addComparisonBtn" class="button button-secondary">➕ Aggiungi</button>
                        </div>
                        <div id="comparisonChart" class="comparison-chart">
                            <!-- Will be populated by renderComparisonChart() -->
                        </div>
                    </div>

                    <!-- Export Section -->
                    <div id="exportSection" class="export-section" style="display: none;">
                        <h3>Esportazione Dati</h3>
                        <div class="export-actions">
                            <button id="exportCSVBtn" class="button button-secondary">
                                📄 Esporta CSV
                            </button>
                            <button id="exportJSONBtn" class="button button-secondary">
                                📋 Esporta JSON
                            </button>
                            <button id="exportReportBtn" class="button button-primary">
                                📊 Esporta Report Completo
                            </button>
                        </div>
                    </div>

                    <!-- No Data Message -->
                    <div id="noDataMessage" class="no-data-message">
                        <div class="no-data-content">
                            <h3>Nessun Dato Storico</h3>
                            <p>Seleziona un giocatore e un periodo per visualizzare lo storico.</p>
                            <div class="no-data-tips">
                                <h4>💡 Suggerimenti:</h4>
                                <ul>
                                    <li>I dati storici vengono generati automaticamente durante il gioco</li>
                                    <li>Allenamenti e partite creano punti dati per l'analisi</li>
                                    <li>Prova a selezionare un periodo più ampio</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Player selection
        document.getElementById('playerSelector')?.addEventListener('change', (e) => {
            this.selectedPlayerId = e.target.value;
            if (this.selectedPlayerId) {
                this.loadPlayerOverview();
            } else {
                this.hideAllSections();
            }
        });

        // Time range selection
        document.getElementById('timeRangePreset')?.addEventListener('change', (e) => {
            this.timeRange.preset = e.target.value;
            this.updateTimeRange();
            if (this.selectedPlayerId) {
                this.generateReport();
            }
        });

        // Custom date inputs
        document.getElementById('startDateInput')?.addEventListener('change', (e) => {
            this.timeRange.start = e.target.value;
            if (this.selectedPlayerId && this.timeRange.end) {
                this.generateReport();
            }
        });

        document.getElementById('endDateInput')?.addEventListener('change', (e) => {
            this.timeRange.end = e.target.value;
            if (this.selectedPlayerId && this.timeRange.start) {
                this.generateReport();
            }
        });

        // Action buttons
        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            this.generateReport();
        });

        document.getElementById('comparisonModeBtn')?.addEventListener('click', () => {
            this.toggleComparisonMode();
        });

        // View toggles
        document.getElementById('toggleTableView')?.addEventListener('click', () => {
            this.showTableView();
        });

        document.getElementById('toggleTimelineView')?.addEventListener('click', () => {
            this.showTimelineView();
        });

        // Comparison controls
        document.getElementById('addComparisonBtn')?.addEventListener('click', () => {
            this.addComparisonPlayer();
        });

        // Export buttons
        document.getElementById('exportCSVBtn')?.addEventListener('click', () => {
            this.exportData('csv');
        });

        document.getElementById('exportJSONBtn')?.addEventListener('click', () => {
            this.exportData('json');
        });

        document.getElementById('exportReportBtn')?.addEventListener('click', () => {
            this.exportReport();
        });
    }

    loadHistoryData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Load player selector
        this.loadPlayerSelector();

        // Set default time range
        this.updateTimeRange();

        // Show no data message initially
        this.showNoDataMessage();
    }

    loadPlayerSelector() {
        const userPlayers = this.gameManager.getUserPlayers();
        
        const playersHTML = userPlayers.map(player => `
            <option value="${player.id}">
                ${player.first_name} ${player.last_name} (${player.position})
            </option>
        `).join('');

        document.getElementById('playerSelector').innerHTML = `
            <option value="">Seleziona giocatore...</option>
            ${playersHTML}
        `;

        // Also populate comparison selector
        document.getElementById('comparisonPlayerSelector').innerHTML = `
            <option value="">Aggiungi giocatore al confronto...</option>
            ${playersHTML}
        `;
    }

    updateTimeRange() {
        const currentDate = new Date(this.gameManager.getCurrentDate());
        const customRangeDiv = document.getElementById('customRange');

        if (this.timeRange.preset === 'custom') {
            customRangeDiv.style.display = 'flex';
            return;
        } else {
            customRangeDiv.style.display = 'none';
        }

        // Calculate start date based on preset
        const startDate = new Date(currentDate);
        switch (this.timeRange.preset) {
            case '1month':
                startDate.setMonth(currentDate.getMonth() - 1);
                break;
            case '3months':
                startDate.setMonth(currentDate.getMonth() - 3);
                break;
            case '6months':
                startDate.setMonth(currentDate.getMonth() - 6);
                break;
            case '1year':
                startDate.setFullYear(currentDate.getFullYear() - 1);
                break;
        }

        this.timeRange.start = startDate.toISOString().split('T')[0];
        this.timeRange.end = currentDate.toISOString().split('T')[0];

        // Update custom date inputs
        document.getElementById('startDateInput').value = this.timeRange.start;
        document.getElementById('endDateInput').value = this.timeRange.end;
    }

    async loadPlayerOverview() {
        if (!this.selectedPlayerId) return;

        const player = this.gameManager.gameData.players.find(p => p.id === this.selectedPlayerId);
        if (!player) return;

        const overviewHTML = `
            <div class="player-overview-card">
                <div class="player-header">
                    <div class="player-info">
                        <h3>${player.first_name} ${player.last_name}</h3>
                        <div class="player-meta">
                            <span class="player-position">${player.position}</span>
                            <span class="player-age">${player.age} anni</span>
                            <span class="player-rating">Rating: ${player.overall_rating}</span>
                            <span class="player-potential">Potenziale: ${player.potential}</span>
                        </div>
                    </div>
                    <div class="player-current-stats">
                        <div class="stat-item">
                            <span class="stat-label">Forma:</span>
                            <span class="stat-value">${Math.round(player.fitness)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Morale:</span>
                            <span class="stat-value">${Math.round(player.morale)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Valore:</span>
                            <span class="stat-value">${this.formatCurrency(player.market_value)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('playerOverview').innerHTML = overviewHTML;
        document.getElementById('playerOverview').style.display = 'block';
    }

    async generateReport() {
        if (!this.selectedPlayerId || !this.timeRange.start || !this.timeRange.end) {
            window.boltManager.uiManager.showToast('Seleziona giocatore e periodo', 'warning');
            return;
        }

        try {
            // Show loading status
            this.showReportStatus('Generazione report in corso...', 'loading');

            // Execute Report_CompileHistory flow
            const result = await this.gameManager.executeReportCompileHistory({
                playerIds: this.selectedPlayerId,
                startDate: this.timeRange.start + 'T00:00:00.000Z',
                endDate: this.timeRange.end + 'T23:59:59.999Z',
                dataTypes: ['all'],
                analysisType: 'individual',
                includeProjections: true,
                saveReport: false,
                reportName: `Storico ${this.getPlayerName(this.selectedPlayerId)}`
            });

            if (result.success && result.report.playerReports.length > 0) {
                this.currentReport = result.report;
                this.showReportStatus(`Report generato: ${result.dataPointsProcessed} punti dati analizzati`, 'success');
                
                // Render all sections
                this.renderAllSections();
                
                window.boltManager.uiManager.showToast('Report generato con successo!', 'success');
            } else {
                this.showReportStatus('Nessun dato trovato per il periodo selezionato', 'warning');
                this.showNoDataMessage();
            }

        } catch (error) {
            console.error('Error generating report:', error);
            this.showReportStatus('Errore nella generazione del report', 'error');
            window.boltManager.uiManager.showToast('Errore nella generazione: ' + error.message, 'error');
        }
    }

    showReportStatus(message, type) {
        const statusElement = document.getElementById('reportStatus');
        statusElement.innerHTML = `
            <div class="status-message status-${type}">
                ${type === 'loading' ? '<div class="loading-spinner"></div>' : ''}
                <span>${message}</span>
            </div>
        `;
        statusElement.style.display = 'block';

        if (type !== 'loading') {
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        }
    }

    renderAllSections() {
        if (!this.currentReport || !this.currentReport.playerReports[0]) return;

        const playerReport = this.currentReport.playerReports[0];

        // Hide no data message
        document.getElementById('noDataMessage').style.display = 'none';

        // Render charts
        this.renderAttributeChart(playerReport.attributesEvolution);
        this.renderMoraleChart(playerReport.moraleEvolution);
        this.renderPerformanceChart(playerReport.matchPerformance);

        // Render statistics table
        this.renderStatisticsTable(playerReport);

        // Render key moments
        this.renderKeyMoments(playerReport.keyMoments);

        // Show all sections
        this.showAllSections();
    }

    renderAttributeChart(attributesEvolution) {
        if (!attributesEvolution || !attributesEvolution.timeline || attributesEvolution.timeline.length === 0) {
            document.getElementById('attributeProgressChart').innerHTML = `
                <div class="no-chart-data">
                    <p>Nessun dato di evoluzione attributi disponibile per questo periodo</p>
                </div>
            `;
            return;
        }

        const timeline = attributesEvolution.timeline;
        const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

        // Create chart container
        const chartHTML = `
            <div class="chart-container">
                <div class="chart-legend">
                    ${attributes.map(attr => `
                        <div class="legend-item">
                            <span class="legend-color" style="background-color: ${this.getAttributeColor(attr)}"></span>
                            <span class="legend-label">${this.getAttributeLabel(attr)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="chart-canvas">
                    <svg id="attributeChart" width="100%" height="300" viewBox="0 0 800 300">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="chart-summary">
                    <h4>Riepilogo Evoluzione</h4>
                    <div class="summary-stats">
                        ${Object.entries(attributesEvolution.trends || {}).map(([attr, trend]) => `
                            <div class="summary-item">
                                <span class="summary-label">${this.getAttributeLabel(attr)}:</span>
                                <span class="summary-value ${trend.trend}">
                                    ${trend.totalChange > 0 ? '+' : ''}${trend.totalChange.toFixed(1)}
                                    (${trend.trend === 'improving' ? '📈' : trend.trend === 'declining' ? '📉' : '➡️'})
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('attributeProgressChart').innerHTML = chartHTML;

        // Draw the actual chart
        this.drawAttributeChart(timeline, attributes);
    }

    drawAttributeChart(timeline, attributes) {
        const svg = document.getElementById('attributeChart');
        const width = 800;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Clear existing content
        svg.innerHTML = '';

        if (timeline.length === 0) return;

        // Create scales
        const xScale = (index) => margin.left + (index / (timeline.length - 1)) * chartWidth;
        const yScale = (value) => margin.top + (1 - (value - 20) / 80) * chartHeight; // Scale 20-100 to chart height

        // Draw grid lines
        for (let i = 0; i <= 4; i++) {
            const y = margin.top + (i / 4) * chartHeight;
            const value = 100 - (i * 20);
            
            svg.innerHTML += `
                <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${margin.left - 5}" y="${y + 4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${value}
                </text>
            `;
        }

        // Draw attribute lines
        attributes.forEach(attr => {
            const color = this.getAttributeColor(attr);
            let pathData = '';

            timeline.forEach((point, index) => {
                const x = xScale(index);
                const y = yScale(point[attr] || 50);
                
                if (index === 0) {
                    pathData += `M ${x} ${y}`;
                } else {
                    pathData += ` L ${x} ${y}`;
                }
            });

            svg.innerHTML += `
                <path d="${pathData}" stroke="${color}" stroke-width="2" fill="none"/>
            `;

            // Draw points
            timeline.forEach((point, index) => {
                const x = xScale(index);
                const y = yScale(point[attr] || 50);
                
                svg.innerHTML += `
                    <circle cx="${x}" cy="${y}" r="3" fill="${color}">
                        <title>${this.getAttributeLabel(attr)}: ${point[attr]} (${new Date(point.date).toLocaleDateString('it-IT')})</title>
                    </circle>
                `;
            });
        });

        // Draw x-axis labels
        timeline.forEach((point, index) => {
            if (index % Math.ceil(timeline.length / 6) === 0) { // Show max 6 labels
                const x = xScale(index);
                const date = new Date(point.date);
                
                svg.innerHTML += `
                    <text x="${x}" y="${height - 10}" text-anchor="middle" font-size="10" fill="#6b7280">
                        ${date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })}
                    </text>
                `;
            }
        });
    }

    renderMoraleChart(moraleEvolution) {
        if (!moraleEvolution || !moraleEvolution.timeline || moraleEvolution.timeline.length === 0) {
            document.getElementById('moraleTrendChart').innerHTML = `
                <div class="no-chart-data">
                    <p>Nessun dato di evoluzione morale disponibile per questo periodo</p>
                </div>
            `;
            return;
        }

        const timeline = moraleEvolution.timeline;

        const chartHTML = `
            <div class="chart-container">
                <div class="morale-stats">
                    <div class="stat-item">
                        <span class="stat-label">Morale Medio:</span>
                        <span class="stat-value">${moraleEvolution.averageMorale}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Stabilità:</span>
                        <span class="stat-value">${this.getMoraleStabilityLabel(moraleEvolution.moraleStability)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Varianza:</span>
                        <span class="stat-value">${moraleEvolution.moraleVariance}</span>
                    </div>
                </div>
                <div class="chart-canvas">
                    <svg id="moraleChart" width="100%" height="200" viewBox="0 0 800 200">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="impact-factors">
                    <h4>Fattori di Impatto</h4>
                    <div class="factors-grid">
                        ${Object.entries(moraleEvolution.impactFactors || {}).map(([factor, impact]) => `
                            <div class="factor-item">
                                <span class="factor-label">${this.getFactorLabel(factor)}:</span>
                                <span class="factor-value ${impact > 0 ? 'positive' : impact < 0 ? 'negative' : 'neutral'}">
                                    ${impact > 0 ? '+' : ''}${impact.toFixed(1)}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('moraleTrendChart').innerHTML = chartHTML;

        // Draw morale chart
        this.drawMoraleChart(timeline);
    }

    drawMoraleChart(timeline) {
        const svg = document.getElementById('moraleChart');
        const width = 800;
        const height = 200;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        svg.innerHTML = '';

        if (timeline.length === 0) return;

        // Create scales
        const xScale = (index) => margin.left + (index / (timeline.length - 1)) * chartWidth;
        const yScale = (value) => margin.top + (1 - value / 100) * chartHeight;

        // Draw grid lines
        for (let i = 0; i <= 4; i++) {
            const y = margin.top + (i / 4) * chartHeight;
            const value = 100 - (i * 25);
            
            svg.innerHTML += `
                <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${margin.left - 5}" y="${y + 4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${value}%
                </text>
            `;
        }

        // Draw morale area
        let pathData = `M ${margin.left} ${yScale(0)}`;
        timeline.forEach((point, index) => {
            const x = xScale(index);
            const y = yScale(point.morale);
            pathData += ` L ${x} ${y}`;
        });
        pathData += ` L ${xScale(timeline.length - 1)} ${yScale(0)} Z`;

        svg.innerHTML += `
            <path d="${pathData}" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" stroke-width="2"/>
        `;

        // Draw points
        timeline.forEach((point, index) => {
            const x = xScale(index);
            const y = yScale(point.morale);
            const color = this.getMoraleColor(point.morale);
            
            svg.innerHTML += `
                <circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="white" stroke-width="2">
                    <title>Morale: ${point.morale}% (${new Date(point.date).toLocaleDateString('it-IT')})</title>
                </circle>
            `;
        });
    }

    renderPerformanceChart(matchPerformance) {
        if (!matchPerformance || !matchPerformance.timeline || matchPerformance.timeline.length === 0) {
            document.getElementById('performanceChart').innerHTML = `
                <div class="no-chart-data">
                    <p>Nessun dato di performance partite disponibile per questo periodo</p>
                </div>
            `;
            return;
        }

        const timeline = matchPerformance.timeline;

        const chartHTML = `
            <div class="chart-container">
                <div class="performance-stats">
                    <div class="stat-item">
                        <span class="stat-label">Partite Giocate:</span>
                        <span class="stat-value">${matchPerformance.matchesPlayed}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rating Medio:</span>
                        <span class="stat-value">${matchPerformance.averageRating}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Trend:</span>
                        <span class="stat-value ${matchPerformance.performanceTrend}">
                            ${this.getPerformanceTrendLabel(matchPerformance.performanceTrend)}
                        </span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Consistenza:</span>
                        <span class="stat-value">${this.getConsistencyLabel(matchPerformance.consistency)}</span>
                    </div>
                </div>
                <div class="chart-canvas">
                    <svg id="performanceChart" width="100%" height="250" viewBox="0 0 800 250">
                        <!-- Chart will be drawn here -->
                    </svg>
                </div>
                <div class="performance-highlights">
                    <div class="highlight-item best">
                        <h5>Migliore Performance</h5>
                        <p>Rating: ${matchPerformance.bestPerformance?.rating}</p>
                        <p>Data: ${new Date(matchPerformance.bestPerformance?.date).toLocaleDateString('it-IT')}</p>
                        <p>Risultato: ${matchPerformance.bestPerformance?.result}</p>
                    </div>
                    <div class="highlight-item worst">
                        <h5>Performance da Migliorare</h5>
                        <p>Rating: ${matchPerformance.worstPerformance?.rating}</p>
                        <p>Data: ${new Date(matchPerformance.worstPerformance?.date).toLocaleDateString('it-IT')}</p>
                        <p>Risultato: ${matchPerformance.worstPerformance?.result}</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('performanceChart').innerHTML = chartHTML;

        // Draw performance chart
        this.drawPerformanceChart(timeline);
    }

    drawPerformanceChart(timeline) {
        const svg = document.getElementById('performanceChart');
        const width = 800;
        const height = 250;
        const margin = { top: 20, right: 20, bottom: 60, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        svg.innerHTML = '';

        if (timeline.length === 0) return;

        // Create scales
        const xScale = (index) => margin.left + (index / (timeline.length - 1)) * chartWidth;
        const yScale = (value) => margin.top + (1 - (value - 1) / 9) * chartHeight; // Scale 1-10 to chart height

        // Draw grid lines
        for (let i = 0; i <= 9; i++) {
            const y = margin.top + (i / 9) * chartHeight;
            const value = 10 - i;
            
            svg.innerHTML += `
                <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" 
                      stroke="#e5e7eb" stroke-width="1"/>
                <text x="${margin.left - 5}" y="${y + 4}" text-anchor="end" font-size="12" fill="#6b7280">
                    ${value}
                </text>
            `;
        }

        // Draw performance bars
        timeline.forEach((point, index) => {
            const x = xScale(index);
            const y = yScale(point.rating);
            const barWidth = Math.max(8, chartWidth / timeline.length - 2);
            const barHeight = chartHeight - (y - margin.top);
            const color = this.getPerformanceColor(point.rating);
            
            svg.innerHTML += `
                <rect x="${x - barWidth/2}" y="${y}" width="${barWidth}" height="${barHeight}" 
                      fill="${color}" stroke="white" stroke-width="1">
                    <title>Rating: ${point.rating} - ${point.result} (${new Date(point.date).toLocaleDateString('it-IT')})</title>
                </rect>
            `;
        });

        // Draw average line
        const avgRating = timeline.reduce((sum, p) => sum + p.rating, 0) / timeline.length;
        const avgY = yScale(avgRating);
        
        svg.innerHTML += `
            <line x1="${margin.left}" y1="${avgY}" x2="${width - margin.right}" y2="${avgY}" 
                  stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="${width - margin.right + 5}" y="${avgY + 4}" font-size="12" fill="#ef4444">
                Media: ${avgRating.toFixed(1)}
            </text>
        `;
    }

    renderStatisticsTable(playerReport) {
        const tableHTML = `
            <div class="table-container">
                <table class="statistics-data-table">
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Valore Attuale</th>
                            <th>Trend</th>
                            <th>Variazione</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateTableRows(playerReport)}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('statisticsTable').innerHTML = tableHTML;
    }

    generateTableRows(playerReport) {
        const rows = [];

        // Attributes rows
        if (playerReport.attributesEvolution?.trends) {
            Object.entries(playerReport.attributesEvolution.trends).forEach(([attr, trend]) => {
                rows.push(`
                    <tr>
                        <td>${this.getAttributeLabel(attr)}</td>
                        <td>${trend.endValue}</td>
                        <td class="trend-${trend.trend}">${this.getTrendIcon(trend.trend)} ${trend.trend}</td>
                        <td class="${trend.totalChange > 0 ? 'positive' : trend.totalChange < 0 ? 'negative' : 'neutral'}">
                            ${trend.totalChange > 0 ? '+' : ''}${trend.totalChange.toFixed(1)}
                        </td>
                        <td>${trend.changePercentage.toFixed(1)}% dal periodo iniziale</td>
                    </tr>
                `);
            });
        }

        // Morale row
        if (playerReport.moraleEvolution) {
            rows.push(`
                <tr>
                    <td>Morale</td>
                    <td>${playerReport.moraleEvolution.averageMorale}%</td>
                    <td class="stability-${playerReport.moraleEvolution.moraleStability}">
                        ${this.getMoraleStabilityLabel(playerReport.moraleEvolution.moraleStability)}
                    </td>
                    <td>Varianza: ${playerReport.moraleEvolution.moraleVariance}</td>
                    <td>${playerReport.moraleEvolution.recordsAnalyzed} registrazioni</td>
                </tr>
            `);
        }

        // Performance row
        if (playerReport.matchPerformance) {
            rows.push(`
                <tr>
                    <td>Performance Partite</td>
                    <td>Rating ${playerReport.matchPerformance.averageRating}</td>
                    <td class="trend-${playerReport.matchPerformance.performanceTrend}">
                        ${this.getTrendIcon(playerReport.matchPerformance.performanceTrend)} 
                        ${this.getPerformanceTrendLabel(playerReport.matchPerformance.performanceTrend)}
                    </td>
                    <td>${playerReport.matchPerformance.matchesPlayed} partite</td>
                    <td>${this.getConsistencyLabel(playerReport.matchPerformance.consistency)}</td>
                </tr>
            `);
        }

        return rows.join('');
    }

    renderKeyMoments(keyMoments) {
        if (!keyMoments || keyMoments.length === 0) {
            document.getElementById('keyMomentsTimeline').innerHTML = `
                <div class="no-moments">
                    <p>Nessun momento saliente registrato per questo periodo</p>
                </div>
            `;
            return;
        }

        const momentsHTML = keyMoments.map(moment => `
            <div class="key-moment-item ${moment.type}">
                <div class="moment-date">
                    ${new Date(moment.date).toLocaleDateString('it-IT', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                    })}
                </div>
                <div class="moment-content">
                    <div class="moment-type">${this.getMomentIcon(moment.type)}</div>
                    <div class="moment-description">${moment.description}</div>
                    <div class="moment-impact">Impatto: ${moment.impact.toFixed(1)}</div>
                </div>
            </div>
        `).join('');

        document.getElementById('keyMomentsTimeline').innerHTML = `
            <div class="timeline-container">
                ${momentsHTML}
            </div>
        `;
    }

    // Comparison mode methods
    toggleComparisonMode() {
        this.comparisonMode = !this.comparisonMode;
        const comparisonSection = document.getElementById('comparisonSection');
        const comparisonBtn = document.getElementById('comparisonModeBtn');

        if (this.comparisonMode) {
            comparisonSection.style.display = 'block';
            comparisonBtn.textContent = '❌ Esci dal Confronto';
            comparisonBtn.classList.add('active');
        } else {
            comparisonSection.style.display = 'none';
            comparisonBtn.textContent = '🔄 Modalità Confronto';
            comparisonBtn.classList.remove('active');
            this.comparisonPlayers = [];
        }
    }

    addComparisonPlayer() {
        const playerId = document.getElementById('comparisonPlayerSelector').value;
        if (!playerId || this.comparisonPlayers.includes(playerId) || playerId === this.selectedPlayerId) {
            window.boltManager.uiManager.showToast('Seleziona un giocatore diverso', 'warning');
            return;
        }

        this.comparisonPlayers.push(playerId);
        this.renderComparisonChart();
        
        // Reset selector
        document.getElementById('comparisonPlayerSelector').value = '';
    }

    renderComparisonChart() {
        // Implementation for comparison chart
        const comparisonHTML = `
            <div class="comparison-container">
                <p>Funzionalità di confronto in sviluppo</p>
                <div class="comparison-players">
                    <p>Giocatori selezionati: ${this.comparisonPlayers.length}</p>
                </div>
            </div>
        `;

        document.getElementById('comparisonChart').innerHTML = comparisonHTML;
    }

    // Export methods
    exportData(format) {
        if (!this.currentReport) {
            window.boltManager.uiManager.showToast('Genera prima un report', 'warning');
            return;
        }

        const playerReport = this.currentReport.playerReports[0];
        const playerName = this.getPlayerName(this.selectedPlayerId);

        if (format === 'csv') {
            this.exportCSV(playerReport, playerName);
        } else if (format === 'json') {
            this.exportJSON(playerReport, playerName);
        }
    }

    exportCSV(playerReport, playerName) {
        let csvContent = 'Data,Tipo,Valore,Note\n';

        // Export attributes timeline
        if (playerReport.attributesEvolution?.timeline) {
            playerReport.attributesEvolution.timeline.forEach(point => {
                const date = new Date(point.date).toLocaleDateString('it-IT');
                ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'].forEach(attr => {
                    csvContent += `${date},${this.getAttributeLabel(attr)},${point[attr]},${point.changeReason}\n`;
                });
            });
        }

        // Export morale timeline
        if (playerReport.moraleEvolution?.timeline) {
            playerReport.moraleEvolution.timeline.forEach(point => {
                const date = new Date(point.date).toLocaleDateString('it-IT');
                csvContent += `${date},Morale,${point.morale},${point.lastEvent}\n`;
            });
        }

        this.downloadFile(csvContent, `storico_${playerName.replace(' ', '_')}.csv`, 'text/csv');
    }

    exportJSON(playerReport, playerName) {
        const jsonData = JSON.stringify(playerReport, null, 2);
        this.downloadFile(jsonData, `storico_${playerName.replace(' ', '_')}.json`, 'application/json');
    }

    exportReport() {
        if (!this.currentReport) {
            window.boltManager.uiManager.showToast('Genera prima un report', 'warning');
            return;
        }

        const playerName = this.getPlayerName(this.selectedPlayerId);
        const reportText = this.generateReportText();
        this.downloadFile(reportText, `report_${playerName.replace(' ', '_')}.txt`, 'text/plain');
    }

    generateReportText() {
        const playerReport = this.currentReport.playerReports[0];
        const playerName = this.getPlayerName(this.selectedPlayerId);
        
        let reportText = `REPORT STORICO GIOCATORE\n`;
        reportText += `========================\n\n`;
        reportText += `Giocatore: ${playerName}\n`;
        reportText += `Periodo: ${this.timeRange.start} - ${this.timeRange.end}\n`;
        reportText += `Generato: ${new Date().toLocaleDateString('it-IT')}\n\n`;

        // Attributes summary
        if (playerReport.attributesEvolution?.trends) {
            reportText += `EVOLUZIONE ATTRIBUTI:\n`;
            Object.entries(playerReport.attributesEvolution.trends).forEach(([attr, trend]) => {
                reportText += `- ${this.getAttributeLabel(attr)}: ${trend.startValue} → ${trend.endValue} (${trend.totalChange > 0 ? '+' : ''}${trend.totalChange.toFixed(1)})\n`;
            });
            reportText += `\n`;
        }

        // Performance summary
        if (playerReport.matchPerformance) {
            reportText += `PERFORMANCE PARTITE:\n`;
            reportText += `- Partite giocate: ${playerReport.matchPerformance.matchesPlayed}\n`;
            reportText += `- Rating medio: ${playerReport.matchPerformance.averageRating}\n`;
            reportText += `- Trend: ${this.getPerformanceTrendLabel(playerReport.matchPerformance.performanceTrend)}\n`;
            reportText += `- Consistenza: ${this.getConsistencyLabel(playerReport.matchPerformance.consistency)}\n\n`;
        }

        // Key moments
        if (playerReport.keyMoments && playerReport.keyMoments.length > 0) {
            reportText += `MOMENTI SALIENTI:\n`;
            playerReport.keyMoments.slice(0, 5).forEach(moment => {
                reportText += `- ${new Date(moment.date).toLocaleDateString('it-IT')}: ${moment.description}\n`;
            });
        }

        reportText += `\nGenerato da Bolt Manager 01/02`;
        return reportText;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        window.boltManager.uiManager.showToast(`File ${filename} scaricato!`, 'success');
    }

    // View control methods
    showTableView() {
        document.getElementById('statisticsTable').style.display = 'block';
        document.getElementById('toggleTableView').classList.add('active');
        document.getElementById('toggleTimelineView').classList.remove('active');
    }

    showTimelineView() {
        // Implementation for timeline view
        document.getElementById('statisticsTable').style.display = 'none';
        document.getElementById('toggleTimelineView').classList.add('active');
        document.getElementById('toggleTableView').classList.remove('active');
    }

    showAllSections() {
        const sections = [
            'progressChartsSection',
            'moraleTrendSection', 
            'performanceSection',
            'statisticsSection',
            'keyMomentsSection',
            'exportSection'
        ];

        sections.forEach(sectionId => {
            document.getElementById(sectionId).style.display = 'block';
        });
    }

    hideAllSections() {
        const sections = [
            'playerOverview',
            'progressChartsSection',
            'moraleTrendSection',
            'performanceSection', 
            'statisticsSection',
            'keyMomentsSection',
            'comparisonSection',
            'exportSection'
        ];

        sections.forEach(sectionId => {
            document.getElementById(sectionId).style.display = 'none';
        });

        this.showNoDataMessage();
    }

    showNoDataMessage() {
        document.getElementById('noDataMessage').style.display = 'block';
    }

    // Helper methods
    getPlayerName(playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        return player ? `${player.first_name} ${player.last_name}` : 'Sconosciuto';
    }

    getAttributeColor(attribute) {
        const colors = {
            pace: '#ef4444',
            shooting: '#f97316', 
            passing: '#eab308',
            dribbling: '#22c55e',
            defending: '#3b82f6',
            physical: '#8b5cf6'
        };
        return colors[attribute] || '#6b7280';
    }

    getAttributeLabel(attribute) {
        const labels = {
            pace: 'Velocità',
            shooting: 'Tiro',
            passing: 'Passaggio',
            dribbling: 'Dribbling',
            defending: 'Difesa',
            physical: 'Fisico'
        };
        return labels[attribute] || attribute;
    }

    getMoraleColor(morale) {
        if (morale >= 70) return '#22c55e';
        if (morale >= 40) return '#eab308';
        return '#ef4444';
    }

    getPerformanceColor(rating) {
        if (rating >= 8) return '#22c55e';
        if (rating >= 7) return '#84cc16';
        if (rating >= 6) return '#eab308';
        if (rating >= 5) return '#f97316';
        return '#ef4444';
    }

    getMoraleStabilityLabel(stability) {
        const labels = {
            very_stable: 'Molto Stabile',
            stable: 'Stabile',
            variable: 'Variabile',
            very_variable: 'Molto Variabile'
        };
        return labels[stability] || stability;
    }

    getPerformanceTrendLabel(trend) {
        const labels = {
            improving: 'In Miglioramento',
            stable: 'Stabile',
            declining: 'In Calo'
        };
        return labels[trend] || trend;
    }

    getConsistencyLabel(consistency) {
        const labels = {
            very_consistent: 'Molto Consistente',
            consistent: 'Consistente',
            variable: 'Variabile',
            inconsistent: 'Inconsistente'
        };
        return labels[consistency] || consistency;
    }

    getTrendIcon(trend) {
        const icons = {
            improving: '📈',
            stable: '➡️',
            declining: '📉'
        };
        return icons[trend] || '➡️';
    }

    getMomentIcon(type) {
        const icons = {
            attribute_change: '📊',
            morale_event: '😊',
            performance: '⚽',
            injury: '🤕',
            transfer: '💰'
        };
        return icons[type] || '📌';
    }

    getFactorLabel(factor) {
        const labels = {
            results: 'Risultati',
            training: 'Allenamento',
            transfer: 'Trasferimenti',
            injury: 'Infortuni',
            chemistry: 'Chimica Squadra'
        };
        return labels[factor] || factor;
    }

    formatCurrency(amount) {
        if (amount >= 1000000) {
            return `€${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `€${(amount / 1000).toFixed(0)}K`;
        } else {
            return `€${amount.toLocaleString()}`;
        }
    }
}