export const template = `
<div class="tactical-preview">
  <div class="preview-header">
    <h3 class="preview-title">Anteprima Tattica</h3>
    <div class="preview-controls">
      <button class="control-btn refresh-preview-btn" aria-label="Aggiorna anteprima">
        ↻ Aggiorna
      </button>
      <button class="control-btn export-tactics-btn" aria-label="Esporta tattiche">
        📤 Esporta
      </button>
    </div>
  </div>
  
  <div class="preview-content">
    <div class="formation-overview">
      <div class="formation-display">
        <div class="formation-name-large">4-4-2</div>
        <div class="formation-description">Formazione equilibrata</div>
      </div>
      
      <div class="team-rating">
        <div class="rating-circle">
          <svg class="rating-svg" viewBox="0 0 100 100">
            <circle class="rating-bg" cx="50" cy="50" r="45" fill="none" stroke="var(--border)" stroke-width="8"/>
            <circle class="rating-fill" cx="50" cy="50" r="45" fill="none" stroke="var(--primary)" stroke-width="8" 
                    stroke-dasharray="283" stroke-dashoffset="113" transform="rotate(-90 50 50)"/>
          </svg>
          <div class="rating-value">85</div>
          <div class="rating-label">Rating</div>
        </div>
      </div>
    </div>
    
    <div class="tactical-stats">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🛡️</div>
          <div class="stat-content">
            <div class="stat-value defense-stat">78</div>
            <div class="stat-label">Difesa</div>
          </div>
          <div class="stat-bar">
            <div class="stat-fill defense-fill"></div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚽</div>
          <div class="stat-content">
            <div class="stat-value attack-stat">82</div>
            <div class="stat-label">Attacco</div>
          </div>
          <div class="stat-bar">
            <div class="stat-fill attack-fill"></div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏃</div>
          <div class="stat-content">
            <div class="stat-value midfield-stat">80</div>
            <div class="stat-label">Centrocampo</div>
          </div>
          <div class="stat-bar">
            <div class="stat-fill midfield-fill"></div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value pace-stat">75</div>
            <div class="stat-label">Velocità</div>
          </div>
          <div class="stat-bar">
            <div class="stat-fill pace-fill"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tactical-analysis">
      <h4>Analisi Tattica</h4>
      <div class="analysis-content">
        <div class="strength-weakness">
          <div class="strengths">
            <h5>💪 Punti di Forza</h5>
            <ul class="strength-list">
              <li>Equilibrio tra fase offensiva e difensiva</li>
              <li>Buona copertura del centrocampo</li>
              <li>Flessibilità tattica</li>
            </ul>
          </div>
          
          <div class="weaknesses">
            <h5>⚠️ Punti Deboli</h5>
            <ul class="weakness-list">
              <li>Possibile isolamento degli attaccanti</li>
              <li>Dipendenza dai terzini per l'ampiezza</li>
              <li>Vulnerabilità sui cross</li>
            </ul>
          </div>
        </div>
        
        <div class="tactical-advice">
          <h5>💡 Consigli</h5>
          <div class="advice-list">
            <div class="advice-item">
              <span class="advice-icon">🎯</span>
              <span class="advice-text">Utilizza i centrocampisti per supportare l'attacco</span>
            </div>
            <div class="advice-item">
              <span class="advice-icon">🔄</span>
              <span class="advice-text">Varia il gioco tra le fasce per creare superiorità numerica</span>
            </div>
            <div class="advice-item">
              <span class="advice-icon">⚡</span>
              <span class="advice-text">Sfrutta la velocità per contropiedi efficaci</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="matchup-analysis">
      <h4>Analisi vs Avversari</h4>
      <div class="matchup-grid">
        <div class="matchup-item">
          <div class="opponent-type">vs Difensiva</div>
          <div class="effectiveness-bar">
            <div class="effectiveness-fill" style="width: 85%"></div>
          </div>
          <div class="effectiveness-value">85%</div>
        </div>
        
        <div class="matchup-item">
          <div class="opponent-type">vs Equilibrata</div>
          <div class="effectiveness-bar">
            <div class="effectiveness-fill" style="width: 78%"></div>
          </div>
          <div class="effectiveness-value">78%</div>
        </div>
        
        <div class="matchup-item">
          <div class="opponent-type">vs Offensiva</div>
          <div class="effectiveness-bar">
            <div class="effectiveness-fill" style="width: 72%"></div>
          </div>
          <div class="effectiveness-value">72%</div>
        </div>
      </div>
    </div>
    
    <div class="player-roles">
      <h4>Ruoli Chiave</h4>
      <div class="roles-grid">
        <div class="role-item">
          <div class="role-position">Regista</div>
          <div class="role-player">M. Rossi</div>
          <div class="role-importance">
            <div class="importance-dots">
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        
        <div class="role-item">
          <div class="role-position">Finalizzatore</div>
          <div class="role-player">L. Bianchi</div>
          <div class="role-importance">
            <div class="importance-dots">
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        
        <div class="role-item">
          <div class="role-position">Libero</div>
          <div class="role-player">G. Verdi</div>
          <div class="role-importance">
            <div class="importance-dots">
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot active"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-preview">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Tactical Preview Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.tactical-preview {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.preview-controls {
  display: flex;
  gap: 8px;
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

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.formation-overview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--background);
  border-radius: 8px;
}

.formation-display {
  flex: 1;
}

.formation-name-large {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.formation-description {
  font-size: 14px;
  color: var(--text-muted);
}

.team-rating {
  position: relative;
}

.rating-circle {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rating-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.rating-fill {
  transition: stroke-dashoffset 1s ease;
}

.rating-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  z-index: 1;
}

.rating-label {
  font-size: 12px;
  color: var(--text-muted);
  z-index: 1;
}

.tactical-stats {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-icon {
  font-size: 20px;
  margin-bottom: 8px;
}

.stat-content {
  margin-bottom: 8px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  display: block;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.stat-bar {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.8s ease;
}

.defense-fill {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.attack-fill {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.midfield-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.pace-fill {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.tactical-analysis {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.tactical-analysis h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.strength-weakness {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.strengths,
.weaknesses {
  background: var(--surface);
  border-radius: 6px;
  padding: 12px;
}

.strengths h5,
.weaknesses h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.strength-list,
.weakness-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.strength-list li,
.weakness-list li {
  font-size: 12px;
  color: var(--text);
  margin-bottom: 4px;
  padding-left: 16px;
  position: relative;
}

.strength-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: 600;
}

.weakness-list li::before {
  content: '⚠';
  position: absolute;
  left: 0;
  color: var(--warning);
}

.tactical-advice {
  background: var(--surface);
  border-radius: 6px;
  padding: 12px;
}

.tactical-advice h5 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.advice-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.advice-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.advice-text {
  color: var(--text);
  line-height: 1.4;
}

.matchup-analysis {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.matchup-analysis h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.matchup-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.matchup-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
}

.opponent-type {
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  min-width: 100px;
}

.effectiveness-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.effectiveness-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--error), var(--warning), var(--success));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.effectiveness-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 35px;
  text-align: right;
}

.player-roles {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
}

.player-roles h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text);
}

.roles-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: var(--surface);
  border-radius: 6px;
}

.role-position {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  min-width: 80px;
}

.role-player {
  flex: 1;
  font-size: 12px;
  color: var(--text);
}

.role-importance {
  display: flex;
  align-items: center;
}

.importance-dots {
  display: flex;
  gap: 3px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
}

.dot.active {
  background: var(--primary);
}

.sponsor-slot-preview {
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
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .strength-weakness {
    grid-template-columns: 1fr;
  }
  
  .formation-overview {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .preview-controls {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .matchup-item {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  
  .opponent-type {
    min-width: auto;
    text-align: center;
  }
  
  .effectiveness-value {
    text-align: center;
  }
  
  .sponsor-slot-preview {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class TacticalPreview {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoUpdate: true,
      showAnalysis: true,
      showMatchups: true,
      ...options
    };
    
    this.tacticalData = {
      formation: '4-4-2',
      players: [],
      mentality: {},
      stats: {
        defense: 78,
        attack: 82,
        midfield: 80,
        pace: 75
      }
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updatePreview();
  }
  
  bindEvents() {
    // Control buttons
    this.element.querySelector('.refresh-preview-btn').addEventListener('click', () => {
      this.refreshPreview();
    });
    
    this.element.querySelector('.export-tactics-btn').addEventListener('click', () => {
      this.exportTactics();
    });
    
    // Listen for tactical changes
    document.addEventListener('tacticsChange', (e) => {
      if (this.options.autoUpdate) {
        this.updateFromTacticalChange(e.detail);
      }
    });
    
    document.addEventListener('formationChange', (e) => {
      if (this.options.autoUpdate) {
        this.updateFromFormationChange(e.detail);
      }
    });
  }
  
  updatePreview() {
    this.updateFormationDisplay();
    this.updateTeamRating();
    this.updateTacticalStats();
    this.updateAnalysis();
    this.updateMatchups();
    this.updatePlayerRoles();
  }
  
  updateFormationDisplay() {
    const formationName = this.element.querySelector('.formation-name-large');
    const formationDesc = this.element.querySelector('.formation-description');
    
    formationName.textContent = this.tacticalData.formation;
    formationDesc.textContent = this.getFormationDescription(this.tacticalData.formation);
  }
  
  getFormationDescription(formation) {
    const descriptions = {
      '4-4-2': 'Formazione equilibrata',
      '4-3-3': 'Formazione offensiva',
      '3-5-2': 'Controllo del centrocampo',
      '4-2-3-1': 'Creatività e solidità',
      '5-3-2': 'Formazione difensiva'
    };
    return descriptions[formation] || 'Formazione personalizzata';
  }
  
  updateTeamRating() {
    const overallRating = this.calculateOverallRating();
    const ratingValue = this.element.querySelector('.rating-value');
    const ratingFill = this.element.querySelector('.rating-fill');
    
    ratingValue.textContent = overallRating;
    
    // Animate rating circle
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (overallRating / 100) * circumference;
    ratingFill.style.strokeDashoffset = offset;
  }
  
  calculateOverallRating() {
    const { defense, attack, midfield, pace } = this.tacticalData.stats;
    return Math.round((defense + attack + midfield + pace) / 4);
  }
  
  updateTacticalStats() {
    const stats = this.tacticalData.stats;
    
    // Update stat values
    this.element.querySelector('.defense-stat').textContent = stats.defense;
    this.element.querySelector('.attack-stat').textContent = stats.attack;
    this.element.querySelector('.midfield-stat').textContent = stats.midfield;
    this.element.querySelector('.pace-stat').textContent = stats.pace;
    
    // Update stat bars
    this.element.querySelector('.defense-fill').style.width = `${stats.defense}%`;
    this.element.querySelector('.attack-fill').style.width = `${stats.attack}%`;
    this.element.querySelector('.midfield-fill').style.width = `${stats.midfield}%`;
    this.element.querySelector('.pace-fill').style.width = `${stats.pace}%`;
  }
  
  updateAnalysis() {
    if (!this.options.showAnalysis) return;
    
    const analysis = this.generateTacticalAnalysis();
    
    // Update strengths
    const strengthsList = this.element.querySelector('.strength-list');
    strengthsList.innerHTML = '';
    analysis.strengths.forEach(strength => {
      const li = document.createElement('li');
      li.textContent = strength;
      strengthsList.appendChild(li);
    });
    
    // Update weaknesses
    const weaknessList = this.element.querySelector('.weakness-list');
    weaknessList.innerHTML = '';
    analysis.weaknesses.forEach(weakness => {
      const li = document.createElement('li');
      li.textContent = weakness;
      weaknessList.appendChild(li);
    });
    
    // Update advice
    const adviceList = this.element.querySelector('.advice-list');
    adviceList.innerHTML = '';
    analysis.advice.forEach(advice => {
      const adviceItem = document.createElement('div');
      adviceItem.className = 'advice-item';
      adviceItem.innerHTML = `
        <span class="advice-icon">${advice.icon}</span>
        <span class="advice-text">${advice.text}</span>
      `;
      adviceList.appendChild(adviceItem);
    });
  }
  
  generateTacticalAnalysis() {
    const formation = this.tacticalData.formation;
    const stats = this.tacticalData.stats;
    
    let strengths = [];
    let weaknesses = [];
    let advice = [];
    
    // Formation-specific analysis
    switch (formation) {
      case '4-4-2':
        strengths = [
          'Equilibrio tra fase offensiva e difensiva',
          'Buona copertura del centrocampo',
          'Flessibilità tattica'
        ];
        weaknesses = [
          'Possibile isolamento degli attaccanti',
          'Dipendenza dai terzini per l\'ampiezza',
          'Vulnerabilità sui cross'
        ];
        advice = [
          { icon: '🎯', text: 'Utilizza i centrocampisti per supportare l\'attacco' },
          { icon: '🔄', text: 'Varia il gioco tra le fasce per creare superiorità numerica' },
          { icon: '⚡', text: 'Sfrutta la velocità per contropiedi efficaci' }
        ];
        break;
        
      case '4-3-3':
        strengths = [
          'Superiorità numerica a centrocampo',
          'Ampiezza garantita dagli esterni',
          'Pressing alto efficace'
        ];
        weaknesses = [
          'Vulnerabilità sui contropiedi',
          'Richiede terzini molto atletici',
          'Centrocampo può essere sovraccaricato'
        ];
        advice = [
          { icon: '🏃', text: 'Mantieni alta l\'intensità del pressing' },
          { icon: '🔀', text: 'Alterna il gioco tra centro e fasce' },
          { icon: '🛡️', text: 'Attenzione alle transizioni difensive' }
        ];
        break;
        
      default:
        strengths = ['Formazione versatile', 'Adattabile alle situazioni'];
        weaknesses = ['Richiede giocatori polivalenti'];
        advice = [{ icon: '💡', text: 'Adatta la tattica in base all\'avversario' }];
    }
    
    // Stats-based analysis
    if (stats.defense > 80) {
      strengths.push('Solidità difensiva eccellente');
    } else if (stats.defense < 60) {
      weaknesses.push('Difesa vulnerabile');
      advice.push({ icon: '🛡️', text: 'Rinforza la fase difensiva' });
    }
    
    if (stats.attack > 80) {
      strengths.push('Potenziale offensivo elevato');
    } else if (stats.attack < 60) {
      weaknesses.push('Difficoltà in fase realizzativa');
      advice.push({ icon: '⚽', text: 'Migliora la finalizzazione' });
    }
    
    return { strengths, weaknesses, advice };
  }
  
  updateMatchups() {
    if (!this.options.showMatchups) return;
    
    const matchups = this.calculateMatchupEffectiveness();
    const matchupItems = this.element.querySelectorAll('.matchup-item');
    
    matchupItems.forEach((item, index) => {
      const effectiveness = matchups[index];
      const fill = item.querySelector('.effectiveness-fill');
      const value = item.querySelector('.effectiveness-value');
      
      fill.style.width = `${effectiveness}%`;
      value.textContent = `${effectiveness}%`;
    });
  }
  
  calculateMatchupEffectiveness() {
    const stats = this.tacticalData.stats;
    const formation = this.tacticalData.formation;
    
    // Base effectiveness calculation
    let vsDefensive = Math.round((stats.attack + stats.midfield) / 2);
    let vsBalanced = Math.round((stats.defense + stats.attack + stats.midfield) / 3);
    let vsOffensive = Math.round((stats.defense + stats.pace) / 2);
    
    // Formation modifiers
    const formationModifiers = {
      '4-4-2': { defensive: 5, balanced: 0, offensive: -3 },
      '4-3-3': { defensive: 8, balanced: 3, offensive: -5 },
      '3-5-2': { defensive: 3, balanced: 5, offensive: 0 },
      '4-2-3-1': { defensive: 6, balanced: 4, offensive: -2 }
    };
    
    const modifiers = formationModifiers[formation] || { defensive: 0, balanced: 0, offensive: 0 };
    
    vsDefensive = Math.max(0, Math.min(100, vsDefensive + modifiers.defensive));
    vsBalanced = Math.max(0, Math.min(100, vsBalanced + modifiers.balanced));
    vsOffensive = Math.max(0, Math.min(100, vsOffensive + modifiers.offensive));
    
    return [vsDefensive, vsBalanced, vsOffensive];
  }
  
  updatePlayerRoles() {
    // This would be populated with actual player data
    const roles = this.identifyKeyRoles();
    const rolesGrid = this.element.querySelector('.roles-grid');
    
    rolesGrid.innerHTML = '';
    
    roles.forEach(role => {
      const roleItem = document.createElement('div');
      roleItem.className = 'role-item';
      
      const importanceDots = Array.from({ length: 5 }, (_, i) => 
        `<div class="dot ${i < role.importance ? 'active' : ''}"></div>`
      ).join('');
      
      roleItem.innerHTML = `
        <div class="role-position">${role.position}</div>
        <div class="role-player">${role.player}</div>
        <div class="role-importance">
          <div class="importance-dots">
            ${importanceDots}
          </div>
        </div>
      `;
      
      rolesGrid.appendChild(roleItem);
    });
  }
  
  identifyKeyRoles() {
    // Mock data - in real app this would analyze actual players
    const formation = this.tacticalData.formation;
    
    const rolesByFormation = {
      '4-4-2': [
        { position: 'Regista', player: 'M. Rossi', importance: 3 },
        { position: 'Finalizzatore', player: 'L. Bianchi', importance: 4 },
        { position: 'Libero', player: 'G. Verdi', importance: 3 }
      ],
      '4-3-3': [
        { position: 'Playmaker', player: 'M. Rossi', importance: 4 },
        { position: 'Falso 9', player: 'L. Bianchi', importance: 5 },
        { position: 'Mediano', player: 'G. Verdi', importance: 3 }
      ]
    };
    
    return rolesByFormation[formation] || rolesByFormation['4-4-2'];
  }
  
  updateFromTacticalChange(changeData) {
    // Update internal data from tactical changes
    if (changeData.values) {
      this.tacticalData.mentality = changeData.values;
      this.recalculateStats();
    }
    
    this.updatePreview();
  }
  
  updateFromFormationChange(changeData) {
    if (changeData.formation) {
      this.tacticalData.formation = changeData.formation;
    }
    
    if (changeData.players) {
      this.tacticalData.players = changeData.players;
    }
    
    this.recalculateStats();
    this.updatePreview();
  }
  
  recalculateStats() {
    // Recalculate stats based on formation, players, and mentality
    const baseStats = this.calculateBaseStats();
    const mentalityModifiers = this.calculateMentalityModifiers();
    
    this.tacticalData.stats = {
      defense: Math.max(0, Math.min(100, baseStats.defense + mentalityModifiers.defense)),
      attack: Math.max(0, Math.min(100, baseStats.attack + mentalityModifiers.attack)),
      midfield: Math.max(0, Math.min(100, baseStats.midfield + mentalityModifiers.midfield)),
      pace: Math.max(0, Math.min(100, baseStats.pace + mentalityModifiers.pace))
    };
  }
  
  calculateBaseStats() {
    // Base stats calculation from players and formation
    return {
      defense: 75,
      attack: 78,
      midfield: 80,
      pace: 72
    };
  }
  
  calculateMentalityModifiers() {
    const mentality = this.tacticalData.mentality;
    
    if (!mentality) {
      return { defense: 0, attack: 0, midfield: 0, pace: 0 };
    }
    
    return {
      defense: Math.round((100 - (mentality.mentality || 50)) / 5),
      attack: Math.round((mentality.mentality || 50) / 5),
      midfield: Math.round((mentality.creativity || 50) / 10),
      pace: Math.round((mentality.tempo || 50) / 5)
    };
  }
  
  refreshPreview() {
    // Dispatch event to request fresh data
    this.element.dispatchEvent(new CustomEvent('requestTacticalData', {
      detail: { source: 'preview-refresh' }
    }));
    
    this.updatePreview();
    this.showSuccess('Anteprima aggiornata');
  }
  
  exportTactics() {
    const exportData = {
      formation: this.tacticalData.formation,
      stats: this.tacticalData.stats,
      analysis: this.generateTacticalAnalysis(),
      matchups: this.calculateMatchupEffectiveness(),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tactical-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Analisi tattica esportata');
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  updateTacticalData(newData) {
    this.tacticalData = { ...this.tacticalData, ...newData };
    this.recalculateStats();
    this.updatePreview();
  }
  
  getTacticalData() {
    return { ...this.tacticalData };
  }
  
  getAnalysis() {
    return {
      stats: this.tacticalData.stats,
      analysis: this.generateTacticalAnalysis(),
      matchups: this.calculateMatchupEffectiveness(),
      overallRating: this.calculateOverallRating()
    };
  }
  
  setFormation(formation) {
    this.tacticalData.formation = formation;
    this.recalculateStats();
    this.updatePreview();
  }
  
  setPlayers(players) {
    this.tacticalData.players = players;
    this.recalculateStats();
    this.updatePreview();
  }
}

export default TacticalPreview;