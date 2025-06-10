// Match Analysis Page implementation
export class MatchAnalysisPage {
    constructor() {
        this.gameManager = null;
        this.currentMatch = null;
        this.matchReport = null;
    }

    async init() {
        console.log('📊 Initializing MatchAnalysisPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadAnalysisData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Analisi Partita</span>
                </nav>

                <!-- Match Summary -->
                <div id="matchSummary" class="match-summary">
                    <!-- Will be populated by loadMatchSummary() -->
                </div>

                <!-- Statistics Comparison -->
                <div class="statistics-section">
                    <h3>Statistiche Comparative</h3>
                    <div id="statisticsComparison" class="statistics-comparison">
                        <!-- Will be populated by loadStatisticsComparison() -->
                    </div>
                </div>

                <!-- Player Ratings -->
                <div class="player-ratings-section">
                    <h3>Valutazioni Giocatori</h3>
                    <div id="playerRatings" class="player-ratings">
                        <!-- Will be populated by loadPlayerRatings() -->
                    </div>
                </div>

                <!-- Sponsor Footer -->
                <div class="sponsor-footer">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Analisi powered by</span>
                        <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=50&fit=crop" 
                             alt="Sponsor Analysis" class="sponsor-image">
                    </div>
                </div>

                <!-- Key Moments -->
                <div class="key-moments-section">
                    <h3>Momenti Salienti</h3>
                    <div id="keyMomentsTimeline" class="key-moments-timeline">
                        <!-- Will be populated by loadKeyMoments() -->
                    </div>
                </div>

                <!-- Tactical Analysis -->
                <div class="tactical-analysis-section">
                    <h3>Analisi Tattica</h3>
                    <div id="tacticalAnalysis" class="tactical-analysis">
                        <!-- Will be populated by loadTacticalAnalysis() -->
                    </div>
                </div>

                <!-- Match Details -->
                <div class="match-details-section">
                    <h3>Dettagli Partita</h3>
                    <div id="matchDetails" class="match-details">
                        <!-- Will be populated by loadMatchDetails() -->
                    </div>
                </div>

                <!-- Actions -->
                <div class="analysis-actions">
                    <button id="exportReportBtn" class="button button-primary">
                        📄 Esporta Report
                    </button>
                    <button id="shareAnalysisBtn" class="button button-secondary">
                        📤 Condividi
                    </button>
                    <button id="backToMatchesBtn" class="button button-ghost">
                        ← Torna alle Partite
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Action buttons
        document.getElementById('exportReportBtn')?.addEventListener('click', () => {
            this.exportReport();
        });

        document.getElementById('shareAnalysisBtn')?.addEventListener('click', () => {
            this.shareAnalysis();
        });

        document.getElementById('backToMatchesBtn')?.addEventListener('click', () => {
            window.boltManager.navigateToPage('calendar');
        });
    }

    loadAnalysisData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Find most recent completed match
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        const recentMatches = this.gameManager.getRecentMatches(userTeam.id, 1);
        if (recentMatches.length === 0) {
            this.showNoMatchesAvailable();
            return;
        }

        this.currentMatch = recentMatches[0];
        this.matchReport = this.gameManager.getMatchReport(this.currentMatch.id);

        if (!this.matchReport) {
            this.showNoReportAvailable();
            return;
        }

        // Load all sections
        this.loadMatchSummary();
        this.loadStatisticsComparison();
        this.loadPlayerRatings();
        this.loadKeyMoments();
        this.loadTacticalAnalysis();
        this.loadMatchDetails();
    }

    loadMatchSummary() {
        if (!this.currentMatch || !this.matchReport) return;

        const homeTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.home_team_id);
        const awayTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.away_team_id);
        const matchDate = new Date(this.currentMatch.match_date);

        const homeWin = this.currentMatch.home_goals > this.currentMatch.away_goals;
        const awayWin = this.currentMatch.away_goals > this.currentMatch.home_goals;
        const draw = this.currentMatch.home_goals === this.currentMatch.away_goals;

        const resultClass = homeWin ? 'home-win' : awayWin ? 'away-win' : 'draw';

        const summaryHTML = `
            <div class="match-summary-card ${resultClass}">
                <div class="match-header">
                    <div class="match-date">
                        ${matchDate.toLocaleDateString('it-IT', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                    <div class="match-venue">
                        Stadio ${homeTeam?.city || 'Casa'} - ${this.currentMatch.attendance?.toLocaleString() || 'N/A'} spettatori
                    </div>
                </div>

                <div class="match-result">
                    <div class="team-result home-team">
                        <h2 class="team-name">${homeTeam?.name || 'Home'}</h2>
                        <div class="team-score">${this.currentMatch.home_goals}</div>
                    </div>
                    
                    <div class="result-separator">
                        <div class="score-separator">-</div>
                        <div class="result-status">
                            ${homeWin ? 'Vittoria Casa' : awayWin ? 'Vittoria Ospiti' : 'Pareggio'}
                        </div>
                    </div>
                    
                    <div class="team-result away-team">
                        <h2 class="team-name">${awayTeam?.name || 'Away'}</h2>
                        <div class="team-score">${this.currentMatch.away_goals}</div>
                    </div>
                </div>

                <div class="match-info">
                    <div class="info-item">
                        <span class="info-label">Formazioni:</span>
                        <span class="info-value">${this.currentMatch.home_formation || '4-4-2'} vs ${this.currentMatch.away_formation || '4-4-2'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Condizioni:</span>
                        <span class="info-value">${this.getWeatherDescription(this.currentMatch.weather)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Arbitro:</span>
                        <span class="info-value">${this.currentMatch.referee || 'N/A'}</span>
                    </div>
                </div>

                ${this.matchReport.man_of_the_match ? `
                    <div class="man-of-match">
                        <span class="motm-label">🏆 Migliore in campo:</span>
                        <span class="motm-name">${this.getPlayerName(this.matchReport.man_of_the_match)}</span>
                    </div>
                ` : ''}
            </div>
        `;

        document.getElementById('matchSummary').innerHTML = summaryHTML;
    }

    loadStatisticsComparison() {
        if (!this.matchReport) return;

        const stats = [
            { label: 'Possesso Palla', home: this.matchReport.home_possession, away: this.matchReport.away_possession, unit: '%' },
            { label: 'Tiri Totali', home: this.matchReport.home_shots, away: this.matchReport.away_shots, unit: '' },
            { label: 'Tiri in Porta', home: this.matchReport.home_shots_on_target, away: this.matchReport.away_shots_on_target, unit: '' },
            { label: 'Calci d\'Angolo', home: this.matchReport.home_corners, away: this.matchReport.away_corners, unit: '' },
            { label: 'Falli Commessi', home: this.matchReport.home_fouls, away: this.matchReport.away_fouls, unit: '' },
            { label: 'Cartellini Gialli', home: this.matchReport.home_yellow_cards, away: this.matchReport.away_yellow_cards, unit: '' },
            { label: 'Cartellini Rossi', home: this.matchReport.home_red_cards, away: this.matchReport.away_red_cards, unit: '' },
            { label: 'Passaggi', home: this.matchReport.home_passes, away: this.matchReport.away_passes, unit: '' },
            { label: 'Precisione Passaggi', home: this.matchReport.home_pass_accuracy, away: this.matchReport.away_pass_accuracy, unit: '%' }
        ];

        const statsHTML = stats.map(stat => {
            const homePercentage = stat.home + stat.away > 0 ? (stat.home / (stat.home + stat.away)) * 100 : 50;
            const awayPercentage = 100 - homePercentage;

            return `
                <div class="stat-comparison">
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-bar">
                        <div class="stat-home-value">${stat.home}${stat.unit}</div>
                        <div class="stat-bar-container">
                            <div class="stat-bar-home" style="width: ${homePercentage}%"></div>
                            <div class="stat-bar-away" style="width: ${awayPercentage}%"></div>
                        </div>
                        <div class="stat-away-value">${stat.away}${stat.unit}</div>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('statisticsComparison').innerHTML = statsHTML;
    }

    loadPlayerRatings() {
        if (!this.matchReport || !this.matchReport.player_ratings) return;

        // Group ratings by team
        const homeRatings = [];
        const awayRatings = [];

        this.matchReport.player_ratings.forEach(rating => {
            const player = this.gameManager.gameData.players.find(p => p.id === rating.player_id);
            if (player) {
                const ratingData = { ...rating, team_id: player.team_id };
                if (player.team_id === this.currentMatch.home_team_id) {
                    homeRatings.push(ratingData);
                } else {
                    awayRatings.push(ratingData);
                }
            }
        });

        // Sort by rating (highest first)
        homeRatings.sort((a, b) => b.rating - a.rating);
        awayRatings.sort((a, b) => b.rating - a.rating);

        const ratingsHTML = `
            <div class="ratings-container">
                <div class="team-ratings home-ratings">
                    <h4>Squadra Casa</h4>
                    <div class="ratings-list">
                        ${homeRatings.map(rating => `
                            <div class="player-rating-item ${rating.player_id === this.matchReport.man_of_the_match ? 'man-of-match' : ''}">
                                <div class="player-info">
                                    <span class="player-name">${rating.player_name}</span>
                                    <span class="player-position">${rating.position}</span>
                                </div>
                                <div class="rating-display">
                                    <span class="rating-value ${this.getRatingClass(rating.rating)}">${rating.rating}</span>
                                    <div class="rating-bar">
                                        <div class="rating-fill" style="width: ${(rating.rating / 10) * 100}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="team-ratings away-ratings">
                    <h4>Squadra Ospite</h4>
                    <div class="ratings-list">
                        ${awayRatings.map(rating => `
                            <div class="player-rating-item ${rating.player_id === this.matchReport.man_of_the_match ? 'man-of-match' : ''}">
                                <div class="player-info">
                                    <span class="player-name">${rating.player_name}</span>
                                    <span class="player-position">${rating.position}</span>
                                </div>
                                <div class="rating-display">
                                    <span class="rating-value ${this.getRatingClass(rating.rating)}">${rating.rating}</span>
                                    <div class="rating-bar">
                                        <div class="rating-fill" style="width: ${(rating.rating / 10) * 100}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('playerRatings').innerHTML = ratingsHTML;
    }

    loadKeyMoments() {
        if (!this.matchReport || !this.matchReport.key_moments) return;

        if (this.matchReport.key_moments.length === 0) {
            document.getElementById('keyMomentsTimeline').innerHTML = `
                <div class="no-key-moments">
                    <p>Nessun momento saliente particolare in questa partita</p>
                </div>
            `;
            return;
        }

        const momentsHTML = this.matchReport.key_moments.map(moment => `
            <div class="key-moment ${moment.importance}">
                <div class="moment-time">${moment.minute}'</div>
                <div class="moment-content">
                    <div class="moment-type">${this.getMomentIcon(moment.type)}</div>
                    <div class="moment-description">${moment.description}</div>
                </div>
            </div>
        `).join('');

        document.getElementById('keyMomentsTimeline').innerHTML = `
            <div class="timeline">
                ${momentsHTML}
            </div>
        `;
    }

    loadTacticalAnalysis() {
        if (!this.matchReport) return;

        const analysisHTML = `
            <div class="tactical-analysis-content">
                <div class="analysis-text">
                    <p>${this.matchReport.tactical_analysis || 'Analisi tattica non disponibile.'}</p>
                </div>
                
                <div class="analysis-details">
                    <div class="detail-item">
                        <span class="detail-label">Impatto Meteo:</span>
                        <span class="detail-value">${this.matchReport.weather_impact || 'Nessun impatto particolare'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Prestazione Arbitro:</span>
                        <span class="detail-value">${this.matchReport.referee_performance || 'N/A'}/10</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Impatto Pubblico:</span>
                        <span class="detail-value">${this.matchReport.attendance_impact || 'Neutrale'}</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('tacticalAnalysis').innerHTML = analysisHTML;
    }

    loadMatchDetails() {
        if (!this.matchReport) return;

        const detailsHTML = `
            <div class="match-details-grid">
                <div class="detail-section">
                    <h4>Tempi di Recupero</h4>
                    <div class="detail-item">
                        <span class="detail-label">Primo Tempo:</span>
                        <span class="detail-value">${this.matchReport.injury_time_home || 0} minuti</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Secondo Tempo:</span>
                        <span class="detail-value">${this.matchReport.injury_time_away || 0} minuti</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Informazioni Partita</h4>
                    <div class="detail-item">
                        <span class="detail-label">Data:</span>
                        <span class="detail-value">${new Date(this.currentMatch.match_date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Giornata:</span>
                        <span class="detail-value">${this.currentMatch.matchday}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Spettatori:</span>
                        <span class="detail-value">${this.currentMatch.attendance?.toLocaleString() || 'N/A'}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Eventi Partita</h4>
                    <div class="detail-item">
                        <span class="detail-label">Totale Eventi:</span>
                        <span class="detail-value">${this.matchReport.match_events?.length || 0}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Gol Totali:</span>
                        <span class="detail-value">${this.currentMatch.home_goals + this.currentMatch.away_goals}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cartellini:</span>
                        <span class="detail-value">
                            🟨 ${this.matchReport.home_yellow_cards + this.matchReport.away_yellow_cards}
                            🟥 ${this.matchReport.home_red_cards + this.matchReport.away_red_cards}
                        </span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('matchDetails').innerHTML = detailsHTML;
    }

    // Helper methods
    getWeatherDescription(weather) {
        const descriptions = {
            'sunny': '☀️ Soleggiato',
            'cloudy': '☁️ Nuvoloso',
            'rainy': '🌧️ Piovoso'
        };
        return descriptions[weather] || '🌤️ Condizioni normali';
    }

    getPlayerName(playerId) {
        const player = this.gameManager.gameData.players.find(p => p.id === playerId);
        return player ? `${player.first_name} ${player.last_name}` : 'Sconosciuto';
    }

    getRatingClass(rating) {
        if (rating >= 8) return 'excellent';
        if (rating >= 7) return 'good';
        if (rating >= 6) return 'average';
        if (rating >= 5) return 'poor';
        return 'terrible';
    }

    getMomentIcon(type) {
        const icons = {
            'goal': '⚽',
            'red_card': '🟥',
            'yellow_card': '🟨',
            'substitution': '🔄',
            'penalty': '🥅'
        };
        return icons[type] || '⚡';
    }

    exportReport() {
        // Create a simple text report
        const homeTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.home_team_id);
        const awayTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.away_team_id);
        
        const reportText = `
REPORT PARTITA - ${new Date(this.currentMatch.match_date).toLocaleDateString('it-IT')}

${homeTeam?.name || 'Casa'} ${this.currentMatch.home_goals} - ${this.currentMatch.away_goals} ${awayTeam?.name || 'Ospiti'}

STATISTICHE:
- Possesso: ${this.matchReport.home_possession}% - ${this.matchReport.away_possession}%
- Tiri: ${this.matchReport.home_shots} - ${this.matchReport.away_shots}
- Tiri in porta: ${this.matchReport.home_shots_on_target} - ${this.matchReport.away_shots_on_target}

ANALISI TATTICA:
${this.matchReport.tactical_analysis || 'Non disponibile'}

Generato da Bolt Manager 01/02
        `;

        // Create and download file
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${homeTeam?.short_name || 'HOME'}_vs_${awayTeam?.short_name || 'AWAY'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        window.boltManager.uiManager.showToast('Report esportato con successo!', 'success');
    }

    shareAnalysis() {
        const homeTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.home_team_id);
        const awayTeam = this.gameManager.gameData.teams.find(t => t.id === this.currentMatch.away_team_id);
        
        const shareText = `🏆 ${homeTeam?.name || 'Casa'} ${this.currentMatch.home_goals} - ${this.currentMatch.away_goals} ${awayTeam?.name || 'Ospiti'}\n\nPartita simulata con Bolt Manager 01/02`;

        if (navigator.share) {
            navigator.share({
                title: 'Risultato Partita',
                text: shareText
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                window.boltManager.uiManager.showToast('Risultato copiato negli appunti!', 'success');
            });
        }
    }

    showNoMatchesAvailable() {
        const content = `
            <div class="no-matches">
                <h3>Nessuna Partita da Analizzare</h3>
                <p>Non ci sono partite completate da analizzare.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Vai al Calendario
                </button>
            </div>
        `;

        document.getElementById('matchSummary').innerHTML = content;
        
        // Hide other sections
        document.querySelector('.statistics-section').style.display = 'none';
        document.querySelector('.player-ratings-section').style.display = 'none';
        document.querySelector('.key-moments-section').style.display = 'none';
        document.querySelector('.tactical-analysis-section').style.display = 'none';
        document.querySelector('.match-details-section').style.display = 'none';
    }

    showNoReportAvailable() {
        const content = `
            <div class="no-report">
                <h3>Report Non Disponibile</h3>
                <p>Il report dettagliato per questa partita non è disponibile.</p>
                <button class="button button-primary" onclick="window.boltManager.navigateToPage('calendar')">
                    📅 Torna al Calendario
                </button>
            </div>
        `;

        document.getElementById('matchSummary').innerHTML = content;
    }
}