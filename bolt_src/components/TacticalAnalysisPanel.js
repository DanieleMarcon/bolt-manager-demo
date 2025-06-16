<div class="tactical-analysis-panel">
  <div class="analysis-header">
    <h3 class="panel-title">Analisi Tattica</h3>
    <div class="analysis-controls">
      <select class="analysis-type-select" aria-label="Tipo di analisi">
        <option value="formation">Formazione</option>
        <option value="heatmap">Mappa di Calore</option>
        <option value="passing">Rete Passaggi</option>
        <option value="pressure">Pressing</option>
      </select>
      <button class="control-btn refresh-analysis-btn" aria-label="Aggiorna analisi">
        ↻ Aggiorna
      </button>
    </div>
  </div>
  
  <div class="analysis-content">
    <div class="formation-analysis active" data-analysis="formation">
      <div class="formation-comparison">
        <div class="team-formation home-formation">
          <h4>Formazione Casa</h4>
          <div class="formation-display">
            <div class="formation-shape">4-4-2</div>
            <div class="formation-effectiveness">
              <span class="effectiveness-label">Efficacia:</span>
              <span class="effectiveness-value">78%</span>
            </div>
          </div>
          
          <div class="formation-strengths">
            <h5>Punti di Forza</h5>
            <ul class="strengths-list">
              <li>Controllo del centrocampo</li>
              <li>Solidità difensiva</li>
              <li>Transizioni veloci</li>
            </ul>
          </div>
          
          <div class="formation-weaknesses">
            <h5>Punti Deboli</h5>
            <ul class="weaknesses-list">
              <li>Vulnerabilità sulle fasce</li>
              <li>Isolamento degli attaccanti</li>
            </ul>
          </div>
        </div>
        
        <div class="vs-separator">
          <div class="vs-icon">⚔️</div>
          <div class="matchup-rating">
            <span class="rating-label">Matchup</span>
            <span class="rating-value">Favorevole</span>
          </div>
        </div>
        
        <div class="team-formation away-formation">
          <h4>Formazione Ospite</h4>
          <div class="formation-display">
            <div class="formation-shape">4-3-3</div>
            <div class="formation-effectiveness">
              <span class="effectiveness-label">Efficacia:</span>
              <span class="effectiveness-value">72%</span>
            </div>
          </div>
          
          <div class="formation-strengths">
            <h5>Punti di Forza</h5>
            <ul class="strengths-list">
              <li>Ampiezza offensiva</li>
              <li>Pressing alto</li>
              <li>Creatività</li>
            </ul>
          </div>
          
          <div class="formation-weaknesses">
            <h5>Punti Deboli</h5>
            <ul class="weaknesses-list">
              <li>Vulnerabilità ai contropiedi</li>
              <li>Centrocampo numericamente inferiore</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="tactical-recommendations">
        <h4>Raccomandazioni Tattiche</h4>
        <div class="recommendations-list">
          <div class="recommendation-item">
            <div class="recommendation-icon">💡</div>
            <div class="recommendation-content">
              <div class="recommendation-title">Sfrutta il Centrocampo</div>
              <div class="recommendation-description">
                La superiorità numerica a centrocampo può essere sfruttata per controllare il ritmo della partita
              </div>
            </div>
          </div>
          
          <div class="recommendation-item">
            <div class="recommendation-icon">⚡</div>
            <div class="recommendation-content">
              <div class="recommendation-title">Contropiedi Rapidi</div>
              <div class="recommendation-description">
                Il pressing alto avversario lascia spazi per contropiedi veloci sulle fasce
              </div>
            </div>
          </div>
          
          <div class="recommendation-item">
            <div class="recommendation-icon">🛡️</div>
            <div class="recommendation-content">
              <div class="recommendation-title">Attenzione alle Fasce</div>
              <div class="recommendation-description">
                Rinforzare la copertura sui terzini per limitare gli attacchi esterni
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="heatmap-analysis" data-analysis="heatmap">
      <div class="heatmap-container">
        <h4>Mappa di Calore Giocatori</h4>
        <div class="heatmap-field">
          <svg class="field-heatmap" viewBox="0 0 400 300" role="img" aria-label="Mappa di calore campo">
            <rect class="field-bg" x="0" y="0" width="400" height="300" fill="#2d5a27"/>
            <line class="center-line" x1="0" y1="150" x2="400" y2="150" stroke="white" stroke-width="1"/>
            <circle class="center-circle" cx="200" cy="150" r="30" fill="none" stroke="white" stroke-width="1"/>
            
            <!-- Heatmap zones will be added dynamically -->
          </svg>
        </div>
        
        <div class="heatmap-legend">
          <div class="legend-item">
            <div class="legend-color high-activity"></div>
            <span>Alta Attività</span>
          </div>
          <div class="legend-item">
            <div class="legend-color medium-activity"></div>
            <span>Media Attività</span>
          </div>
          <div class="legend-item">
            <div class="legend-color low-activity"></div>
            <span>Bassa Attività</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="passing-analysis" data-analysis="passing">
      <div class="passing-network">
        <h4>Rete Passaggi</h4>
        <div class="network-stats">
          <div class="network-stat">
            <span class="stat-label">Precisione Media:</span>
            <span class="stat-value">87%</span>
          </div>
          <div class="network-stat">
            <span class="stat-label">Passaggi Chiave:</span>
            <span class="stat-value">23</span>
          </div>
          <div class="network-stat">
            <span class="stat-label">Connessioni Forti:</span>
            <span class="stat-value">8</span>
          </div>
        </div>
        
        <div class="key-connections">
          <h5>Connessioni Principali</h5>
          <div class="connections-list">
            <div class="connection-item">
              <span class="connection-players">Rossi → Bianchi</span>
              <div class="connection-strength">
                <div class="strength-bar" style="width: 85%"></div>
              </div>
              <span class="connection-count">12 passaggi</span>
            </div>
            
            <div class="connection-item">
              <span class="connection-players">Verdi → Neri</span>
              <div class="connection-strength">
                <div class="strength-bar" style="width: 72%"></div>
              </div>
              <span class="connection-count">9 passaggi</span>
            </div>
            
            <div class="connection-item">
              <span class="connection-players">Bianchi → Gialli</span>
              <div class="connection-strength">
                <div class="strength-bar" style="width: 68%"></div>
              </div>
              <span class="connection-count">8 passaggi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="pressure-analysis" data-analysis="pressure">
      <div class="pressure-metrics">
        <h4>Analisi Pressing</h4>
        <div class="pressure-stats">
          <div class="pressure-stat">
            <div class="stat-circle">
              <span class="stat-number">68%</span>
            </div>
            <span class="stat-label">Intensità Pressing</span>
          </div>
          
          <div class="pressure-stat">
            <div class="stat-circle">
              <span class="stat-number">15</span>
            </div>
            <span class="stat-label">Recuperi Alti</span>
          </div>
          
          <div class="pressure-stat">
            <div class="stat-circle">
              <span class="stat-number">23</span>
            </div>
            <span class="stat-label">Duelli Vinti</span>
          </div>
        </div>
        
        <div class="pressure-zones">
          <h5>Zone di Pressing</h5>
          <div class="zones-grid">
            <div class="zone-item">
              <span class="zone-name">Terzo Offensivo</span>
              <div class="zone-intensity">
                <div class="intensity-bar" style="width: 78%"></div>
              </div>
              <span class="zone-percentage">78%</span>
            </div>
            
            <div class="zone-item">
              <span class="zone-name">Centrocampo</span>
              <div class="zone-intensity">
                <div class="intensity-bar" style="width: 65%"></div>
              </div>
              <span class="zone-percentage">65%</span>
            </div>
            
            <div class="zone-item">
              <span class="zone-name">Terzo Difensivo</span>
              <div class="zone-intensity">
                <div class="intensity-bar" style="width: 45%"></div>
              </div>
              <span class="zone-percentage">45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-analysis">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Tactical Analysis Sponsor" class="sponsor-image">
  </div>
</div>

<style>
.tactical-analysis-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.analysis-header {
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

.analysis-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.analysis-type-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.control-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.analysis-content > div {
  display: none;
}

.analysis-content > div.active {
  display: block;
}

/* Formation Analysis */
.formation-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.team-formation {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.team-formation h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
  text-align: center;
}

.formation-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.formation-shape {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

.formation-effectiveness {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.effectiveness-label {
  font-size: 10px;
  color: var(--text-muted);
}

.effectiveness-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.formation-strengths,
.formation-weaknesses {
  margin-bottom: 12px;
}

.formation-strengths h5,
.formation-weaknesses h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.strengths-list,
.weaknesses-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.strengths-list li,
.weaknesses-list li {
  font-size: 12px;
  color: var(--text);
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.strengths-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: 600;
}

.weaknesses-list li::before {
  content: '⚠';
  position: absolute;
  left: 0;
  color: var(--warning);
}

.vs-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.vs-icon {
  font-size: 24px;
}

.matchup-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rating-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.rating-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--success);
}

.tactical-recommendations {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.tactical-recommendations h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border-radius: 6px;
  border-left: 3px solid var(--primary);
}

.recommendation-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.recommendation-content {
  flex: 1;
}

.recommendation-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text);
}

.recommendation-description {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Heatmap Analysis */
.heatmap-container {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.heatmap-container h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
  text-align: center;
}

.heatmap-field {
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
}

.field-heatmap {
  width: 100%;
  height: auto;
  display: block;
}

.heatmap-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.high-activity {
  background: rgba(239, 68, 68, 0.7);
}

.medium-activity {
  background: rgba(245, 158, 11, 0.7);
}

.low-activity {
  background: rgba(16, 185, 129, 0.7);
}

/* Passing Analysis */
.passing-network {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.passing-network h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
  text-align: center;
}

.network-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.network-stat {
  text-align: center;
}

.network-stat .stat-label {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.network-stat .stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.key-connections h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
}

.connections-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.connection-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
}

.connection-players {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  min-width: 120px;
}

.connection-strength {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #1e40af);
  border-radius: 4px;
}

.connection-count {
  font-size: 11px;
  color: var(--text-muted);
  min-width: 80px;
  text-align: right;
}

/* Pressure Analysis */
.pressure-metrics {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.pressure-metrics h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
  text-align: center;
}

.pressure-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
}

.pressure-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #1e40af);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-number {
  font-size: 18px;
  font-weight: 700;
}

.pressure-stat .stat-label {
  font-size: 12px;
  color: var(--text);
  text-align: center;
}

.pressure-zones h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text);
  text-align: center;
}

.zones-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.zone-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
}

.zone-name {
  font-size: 12px;
  color: var(--text);
  min-width: 100px;
}

.zone-intensity {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.intensity-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #1e40af);
  border-radius: 4px;
}

.zone-percentage {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 40px;
  text-align: right;
}

.sponsor-slot-analysis {
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
  .formation-comparison {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .vs-separator {
    display: none;
  }
  
  .pressure-stats {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .analysis-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .analysis-controls {
    justify-content: center;
  }
  
  .network-stats {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  .connection-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .connection-players,
  .connection-count {
    min-width: auto;
    text-align: center;
  }
  
  .sponsor-slot-analysis {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>

<script>
class TacticalAnalysisPanel {
  constructor(element, matchData) {
    this.element = element;
    this.matchData = matchData;
    this.currentAnalysis = 'formation';
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.renderAnalysis();
  }
  
  bindEvents() {
    // Analysis type selector
    this.element.querySelector('.analysis-type-select').addEventListener('change', (e) => {
      this.switchAnalysisType(e.target.value);
    });
    
    // Refresh button
    this.element.querySelector('.refresh-analysis-btn').addEventListener('click', () => {
      this.refreshAnalysis();
    });
  }
  
  switchAnalysisType(type) {
    this.currentAnalysis = type;
    
    // Update active panel
    this.element.querySelectorAll('[data-analysis]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.analysis === type);
    });
    
    // Render specific analysis
    this.renderSpecificAnalysis(type);
  }
  
  renderAnalysis() {
    // Render all analysis types
    this.renderFormationAnalysis();
    this.renderHeatmapAnalysis();
    this.renderPassingAnalysis();
    this.renderPressureAnalysis();
    
    // Show current analysis
    this.switchAnalysisType(this.currentAnalysis);
  }
  
  renderFormationAnalysis() {
    const formationData = this.matchData.formations || {
      home: {
        shape: '4-4-2',
        effectiveness: 78,
        strengths: ['Controllo del centrocampo', 'Solidità difensiva', 'Transizioni veloci'],
        weaknesses: ['Vulnerabilità sulle fasce', 'Isolamento degli attaccanti']
      },
      away: {
        shape: '4-3-3',
        effectiveness: 72,
        strengths: ['Ampiezza offensiva', 'Pressing alto', 'Creatività'],
        weaknesses: ['Vulnerabilità ai contropiedi', 'Centrocampo numericamente inferiore']
      },
      matchup: 'Favorevole',
      recommendations: [
        {
          title: 'Sfrutta il Centrocampo',
          description: 'La superiorità numerica a centrocampo può essere sfruttata per controllare il ritmo della partita'
        },
        {
          title: 'Contropiedi Rapidi',
          description: 'Il pressing alto avversario lascia spazi per contropiedi veloci sulle fasce'
        },
        {
          title: 'Attenzione alle Fasce',
          description: 'Rinforzare la copertura sui terzini per limitare gli attacchi esterni'
        }
      ]
    };
    
    // Update home formation
    const homeFormation = this.element.querySelector('.home-formation');
    homeFormation.querySelector('.formation-shape').textContent = formationData.home.shape;
    homeFormation.querySelector('.effectiveness-value').textContent = `${formationData.home.effectiveness}%`;
    
    // Update home strengths
    const homeStrengths = homeFormation.querySelector('.strengths-list');
    homeStrengths.innerHTML = '';
    formationData.home.strengths.forEach(strength => {
      const li = document.createElement('li');
      li.textContent = strength;
      homeStrengths.appendChild(li);
    });
    
    // Update home weaknesses
    const homeWeaknesses = homeFormation.querySelector('.weaknesses-list');
    homeWeaknesses.innerHTML = '';
    formationData.home.weaknesses.forEach(weakness => {
      const li = document.createElement('li');
      li.textContent = weakness;
      homeWeaknesses.appendChild(li);
    });
    
    // Update away formation
    const awayFormation = this.element.querySelector('.away-formation');
    awayFormation.querySelector('.formation-shape').textContent = formationData.away.shape;
    awayFormation.querySelector('.effectiveness-value').textContent = `${formationData.away.effectiveness}%`;
    
    // Update away strengths
    const awayStrengths = awayFormation.querySelector('.strengths-list');
    awayStrengths.innerHTML = '';
    formationData.away.strengths.forEach(strength => {
      const li = document.createElement('li');
      li.textContent = strength;
      awayStrengths.appendChild(li);
    });
    
    // Update away weaknesses
    const awayWeaknesses = awayFormation.querySelector('.weaknesses-list');
    awayWeaknesses.innerHTML = '';
    formationData.away.weaknesses.forEach(weakness => {
      const li = document.createElement('li');
      li.textContent = weakness;
      awayWeaknesses.appendChild(li);
    });
    
    // Update matchup
    this.element.querySelector('.matchup-rating .rating-value').textContent = formationData.matchup;
    
    // Update recommendations
    const recommendationsList = this.element.querySelector('.recommendations-list');
    recommendationsList.innerHTML = '';
    formationData.recommendations.forEach(rec => {
      const item = document.createElement('div');
      item.className = 'recommendation-item';
      
      item.innerHTML = `
        <div class="recommendation-icon">💡</div>
        <div class="recommendation-content">
          <div class="recommendation-title">${rec.title}</div>
          <div class="recommendation-description">${rec.description}</div>
        </div>
      `;
      
      recommendationsList.appendChild(item);
    });
  }
  
  renderHeatmapAnalysis() {
    // In a real implementation, this would render a heatmap on the SVG field
    // For now, we'll just add some placeholder zones
    const heatmapField = this.element.querySelector('.field-heatmap');
    
    // Clear existing heatmap
    const existingZones = heatmapField.querySelectorAll('.heatmap-zone');
    existingZones.forEach(zone => zone.remove());
    
    // Add sample heatmap zones
    const zones = [
      { x: 100, y: 100, radius: 40, intensity: 'high' },
      { x: 300, y: 150, radius: 50, intensity: 'medium' },
      { x: 200, y: 200, radius: 30, intensity: 'low' },
      { x: 150, y: 50, radius: 35, intensity: 'medium' }
    ];
    
    zones.forEach(zone => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', `heatmap-zone ${zone.intensity}-activity`);
      circle.setAttribute('cx', zone.x);
      circle.setAttribute('cy', zone.y);
      circle.setAttribute('r', zone.radius);
      circle.setAttribute('fill-opacity', '0.7');
      
      if (zone.intensity === 'high') {
        circle.setAttribute('fill', 'rgba(239, 68, 68, 0.7)');
      } else if (zone.intensity === 'medium') {
        circle.setAttribute('fill', 'rgba(245, 158, 11, 0.7)');
      } else {
        circle.setAttribute('fill', 'rgba(16, 185, 129, 0.7)');
      }
      
      heatmapField.appendChild(circle);
    });
  }
  
  renderPassingAnalysis() {
    // This would render passing network data
    // For now, we'll use the static HTML already in place
  }
  
  renderPressureAnalysis() {
    // This would render pressure analysis data
    // For now, we'll use the static HTML already in place
  }
  
  renderSpecificAnalysis(type) {
    switch (type) {
      case 'heatmap':
        this.renderHeatmapAnalysis();
        break;
      case 'passing':
        this.renderPassingAnalysis();
        break;
      case 'pressure':
        this.renderPressureAnalysis();
        break;
      default:
        this.renderFormationAnalysis();
    }
  }
  
  refreshAnalysis() {
    // This would fetch fresh analysis data
    this.renderSpecificAnalysis(this.currentAnalysis);
    this.showSuccess('Analisi aggiornata');
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getCurrentAnalysis() {
    return this.currentAnalysis;
  }
  
  updateMatchData(newData) {
    this.matchData = newData;
    this.renderAnalysis();
  }
  
  exportAnalysis() {
    const analysisData = {
      type: this.currentAnalysis,
      formations: this.matchData.formations,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tactical-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Analisi tattica esportata');
  }
}

// Auto-initialize tactical analysis panels
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tactical-analysis-panel').forEach(panel => {
    if (!panel.dataset.initialized) {
      const matchData = JSON.parse(panel.dataset.matchData || '{}');
      new TacticalAnalysisPanel(panel, matchData);
      panel.dataset.initialized = 'true';
    }
  });
});
</script>