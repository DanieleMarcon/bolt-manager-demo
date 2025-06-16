import PlayerTrainingCard from '../components/PlayerTrainingCard.component.js';
import FitnessChart from '../components/FitnessChart.component.js';

export default class TrainingManagementPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.selectedPlayers = new Set();
    this.trainingIntensity = 3;
    this.trainingType = 'fitness';
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="training-management-page">
        <div class="page-header">
          <h2 class="page-title">Gestione Allenamento</h2>
          <div class="page-actions">
            <button class="button button-secondary save-plan-btn">💾 Salva Piano</button>
            <button class="button button-primary apply-training-btn">🏃 Applica Allenamento</button>
          </div>
        </div>

        <!-- Training Schedule Section -->
        <div class="training-schedule-section">
          <h3 class="section-title">Pianificazione Settimanale</h3>
          <div id="trainingScheduler" class="training-scheduler"></div>
        </div>

        <!-- Training Configuration Section -->
        <div class="training-config-section">
          <div class="config-panel">
            <div class="training-type-selection">
              <h4>Tipo Allenamento</h4>
              <div class="training-types">
                <button class="training-type-btn active" data-type="fitness">💪 Fisico</button>
                <button class="training-type-btn" data-type="technical">⚽ Tecnico</button>
                <button class="training-type-btn" data-type="tactical">🧠 Tattico</button>
                <button class="training-type-btn" data-type="goalkeeping">🥅 Portieri</button>
              </div>
            </div>
            
            <div class="intensity-control">
              <h4>Intensità Allenamento</h4>
              <div id="intensitySlider" class="intensity-slider"></div>
              <div class="intensity-info">
                <span class="intensity-value">${this.trainingIntensity}/5</span>
                <span class="risk-indicator">Rischio infortuni: ${this.getInjuryRisk()}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Player Selection Section -->
        <div class="player-selection-section">
          <div class="section-header">
            <h3 class="section-title">Selezione Giocatori</h3>
            <div class="selection-controls">
              <button class="button button-ghost select-all-btn">Seleziona Tutti</button>
              <button class="button button-ghost clear-selection-btn">Deseleziona Tutti</button>
              <span class="selected-count">${this.selectedPlayers.size} giocatori selezionati</span>
            </div>
          </div>
          
          <div class="player-training-grid" id="playerTrainingGrid">
            <!-- Player training cards will be rendered here -->
          </div>
        </div>

        <!-- Fitness Tracking Section -->
        <div class="fitness-tracking-section">
          <h3 class="section-title">Monitoraggio Fitness</h3>
          <div id="fitnessChart" class="fitness-chart-container"></div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.renderPlayerTrainingCards();
    this.renderFitnessChart();
    this.renderTrainingScheduler();
    this.renderIntensitySlider();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  renderPlayerTrainingCards() {
    const container = document.getElementById('playerTrainingGrid');
    const players = this.getMockPlayers();
    
    container.innerHTML = '';
    
    players.forEach(player => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'player-training-card-container';
      container.appendChild(cardContainer);
      
      new PlayerTrainingCard(cardContainer, {
        player: player,
        isSelected: this.selectedPlayers.has(player.id),
        onSelect: (player, selected) => this.handlePlayerSelection(player, selected)
      });
    });
  }

  renderFitnessChart() {
    const container = document.getElementById('fitnessChart');
    
    new FitnessChart(container, {
      playerId: 1, // Default to first player
      timeRange: 30,
      data: this.generateFitnessData()
    });
  }

  renderTrainingScheduler() {
    const container = document.getElementById('trainingScheduler');
    
    container.innerHTML = `
      <div class="weekly-schedule">
        ${this.renderWeeklySchedule()}
      </div>
    `;
  }

  renderWeeklySchedule() {
    const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
    
    return days.map(day => `
      <div class="schedule-day">
        <h5 class="day-name">${day}</h5>
        <div class="training-slots">
          <div class="training-slot morning" data-day="${day}" data-slot="morning">
            <span class="slot-time">Mattina</span>
            <span class="slot-content">Allenamento Fisico</span>
          </div>
          <div class="training-slot afternoon" data-day="${day}" data-slot="afternoon">
            <span class="slot-time">Pomeriggio</span>
            <span class="slot-content">Riposo</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderIntensitySlider() {
    const container = document.getElementById('intensitySlider');
    
    container.innerHTML = `
      <div class="slider-container">
        <input type="range" min="1" max="5" value="${this.trainingIntensity}" class="intensity-range" id="intensityRange">
        <div class="slider-labels">
          <span>Leggero</span>
          <span>Normale</span>
          <span>Intenso</span>
        </div>
      </div>
    `;
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Attrezzature per l'allenamento professionale</span>
      </div>
    `;
  }

  bindEvents() {
    // Training type selection
    const trainingTypeBtns = this.container.querySelectorAll('.training-type-btn');
    trainingTypeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        trainingTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.trainingType = btn.dataset.type;
      });
    });

    // Intensity slider
    const intensityRange = this.container.querySelector('#intensityRange');
    intensityRange?.addEventListener('input', (e) => {
      this.trainingIntensity = parseInt(e.target.value);
      this.updateIntensityDisplay();
    });

    // Selection controls
    const selectAllBtn = this.container.querySelector('.select-all-btn');
    const clearSelectionBtn = this.container.querySelector('.clear-selection-btn');
    
    selectAllBtn?.addEventListener('click', () => this.selectAllPlayers());
    clearSelectionBtn?.addEventListener('click', () => this.clearAllSelections());

    // Action buttons
    const savePlanBtn = this.container.querySelector('.save-plan-btn');
    const applyTrainingBtn = this.container.querySelector('.apply-training-btn');
    
    savePlanBtn?.addEventListener('click', () => this.saveTrainingPlan());
    applyTrainingBtn?.addEventListener('click', () => this.applyTraining());
  }

  handlePlayerSelection(player, selected) {
    if (selected) {
      this.selectedPlayers.add(player.id);
    } else {
      this.selectedPlayers.delete(player.id);
    }
    this.updateSelectionCount();
  }

  selectAllPlayers() {
    const players = this.getMockPlayers();
    players.forEach(player => {
      this.selectedPlayers.add(player.id);
    });
    this.renderPlayerTrainingCards();
    this.updateSelectionCount();
  }

  clearAllSelections() {
    this.selectedPlayers.clear();
    this.renderPlayerTrainingCards();
    this.updateSelectionCount();
  }

  updateSelectionCount() {
    const countElement = this.container.querySelector('.selected-count');
    if (countElement) {
      countElement.textContent = `${this.selectedPlayers.size} giocatori selezionati`;
    }
  }

  updateIntensityDisplay() {
    const intensityValue = this.container.querySelector('.intensity-value');
    const riskIndicator = this.container.querySelector('.risk-indicator');
    
    if (intensityValue) {
      intensityValue.textContent = `${this.trainingIntensity}/5`;
    }
    
    if (riskIndicator) {
      riskIndicator.textContent = `Rischio infortuni: ${this.getInjuryRisk()}%`;
    }
  }

  getInjuryRisk() {
    const baseRisk = 5;
    const intensityMultiplier = this.trainingIntensity * 2;
    return Math.min(baseRisk + intensityMultiplier, 25);
  }

  saveTrainingPlan() {
    const plan = {
      type: this.trainingType,
      intensity: this.trainingIntensity,
      selectedPlayers: Array.from(this.selectedPlayers),
      timestamp: new Date().toISOString()
    };
    
    console.log('Saving training plan:', plan);
    this.showToast('Piano di allenamento salvato', 'success');
  }

  applyTraining() {
    if (this.selectedPlayers.size === 0) {
      this.showToast('Seleziona almeno un giocatore', 'error');
      return;
    }
    
    const trainingData = {
      type: this.trainingType,
      intensity: this.trainingIntensity,
      players: Array.from(this.selectedPlayers)
    };
    
    console.log('Applying training:', trainingData);
    this.showToast(`Allenamento ${this.trainingType} applicato a ${this.selectedPlayers.size} giocatori`, 'success');
    
    // Simulate training results
    setTimeout(() => {
      this.showTrainingResults();
    }, 2000);
  }

  showTrainingResults() {
    const results = {
      playersImproved: this.selectedPlayers.size,
      averageImprovement: 0.5,
      injuries: Math.random() < 0.1 ? 1 : 0
    };
    
    let message = `Allenamento completato! ${results.playersImproved} giocatori hanno migliorato le loro abilità.`;
    if (results.injuries > 0) {
      message += ` Attenzione: ${results.injuries} infortunio riportato.`;
    }
    
    this.showToast(message, results.injuries > 0 ? 'warning' : 'success');
  }

  getMockPlayers() {
    return [
      {
        id: 1,
        name: 'Mario Rossi',
        position: 'FW',
        age: 25,
        fitness: 85,
        morale: 80,
        weeklyProgress: 0.8,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        position: 'MF',
        age: 28,
        fitness: 75,
        morale: 85,
        weeklyProgress: 0.6,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        position: 'DF',
        age: 30,
        fitness: 70,
        morale: 75,
        weeklyProgress: 0.4,
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 4,
        name: 'Antonio Neri',
        position: 'GK',
        age: 26,
        fitness: 80,
        morale: 90,
        weeklyProgress: 0.7,
        injuryStatus: 'injured',
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      }
    ];
  }

  generateFitnessData() {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        fitness: 70 + Math.random() * 20 + (30 - i) * 0.3
      });
    }
    
    return data;
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}