/**
 * PlayerTrainingCard Component
 * 
 * Used in: TrainingManagement.page.js
 * Purpose: Display individual player training card with progress and selection
 * Dataset: players (with training attributes and progress)
 */

export default class PlayerTrainingCard {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.player = props.player || {};
    this.isSelected = props.isSelected || false;
    this.onSelect = props.onSelect || (() => {});
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="player-training-card ${this.isSelected ? 'selected' : ''}" data-player-id="${this.player.id}">
        <div class="player-training-header">
          <div class="player-avatar">
            <img src="${this.player.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'}" 
                 alt="${this.player.name}" class="player-photo">
          </div>
          <div class="player-info">
            <h4 class="player-name">${this.player.name || 'Player Name'}</h4>
            <span class="player-position">${this.player.position || 'MF'}</span>
            <span class="player-age">${this.player.age || 25} anni</span>
          </div>
          <div class="selection-checkbox">
            <input type="checkbox" ${this.isSelected ? 'checked' : ''} class="training-select">
          </div>
        </div>
        
        <div class="training-attributes">
          <div class="attribute-row">
            <span class="attribute-label">Fitness</span>
            <div class="attribute-bar">
              <div class="attribute-fill" style="width: ${this.player.fitness || 75}%"></div>
            </div>
            <span class="attribute-value">${this.player.fitness || 75}</span>
          </div>
          <div class="attribute-row">
            <span class="attribute-label">Morale</span>
            <div class="attribute-bar">
              <div class="attribute-fill morale" style="width: ${this.player.morale || 80}%"></div>
            </div>
            <span class="attribute-value">${this.player.morale || 80}</span>
          </div>
        </div>
        
        <div class="training-status">
          <span class="status-badge ${this.getStatusClass()}">${this.getStatusText()}</span>
          <span class="training-progress">+${this.player.weeklyProgress || 0.5} questa settimana</span>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const checkbox = this.container.querySelector('.training-select');
    const card = this.container.querySelector('.player-training-card');
    
    checkbox?.addEventListener('change', (e) => {
      this.isSelected = e.target.checked;
      card.classList.toggle('selected', this.isSelected);
      this.onSelect(this.player, this.isSelected);
    });
    
    card?.addEventListener('click', (e) => {
      if (e.target.type !== 'checkbox') {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  }

  getStatusClass() {
    if (this.player.injuryStatus === 'injured') return 'status-injured';
    if (this.player.fitness < 50) return 'status-tired';
    if (this.player.morale > 85) return 'status-excellent';
    return 'status-good';
  }

  getStatusText() {
    if (this.player.injuryStatus === 'injured') return 'Infortunato';
    if (this.player.fitness < 50) return 'Stanco';
    if (this.player.morale > 85) return 'Eccellente';
    return 'Disponibile';
  }

  setSelected(selected) {
    this.isSelected = selected;
    const checkbox = this.container.querySelector('.training-select');
    const card = this.container.querySelector('.player-training-card');
    
    if (checkbox) checkbox.checked = selected;
    if (card) card.classList.toggle('selected', selected);
  }

  updateProgress(newProgress) {
    this.player.weeklyProgress = newProgress;
    const progressElement = this.container.querySelector('.training-progress');
    if (progressElement) {
      progressElement.textContent = `+${newProgress} questa settimana`;
    }
  }
}