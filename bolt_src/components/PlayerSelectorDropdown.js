export default class PlayerSelectorDropdown {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      label: 'Giocatore',
      players: [],
      selectedPlayerId: null,
            onChange: () => {}
    }, options);
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <label class="psd-label">${this.options.label}
        <select class="psd-select" aria-label="${this.options.label}">
          <option value="">Seleziona giocatore</option>
          ${this.options.players.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
        </select>
      </label>
      <div class="psd-preview" style="display:none;"></div>
    `;
    this.bindEvents();
    if (this.options.selectedPlayerId) {
      this.setSelectedPlayer(this.options.selectedPlayerId);
    }
  }

  bindEvents() {
    const select = this.container.querySelector('.psd-select');
    select.addEventListener('change', () => {
      this.options.selectedPlayerId = select.value || null;
      this.options.onChange(this.getSelectedPlayer());
    });
  }

  getSelectedPlayer() {
    return this.options.players.find(p => p.id == this.options.selectedPlayerId) || null;
  }

  setPlayers(players) {
    this.options.players = players;
    this.render();
  }

  setSelectedPlayer(id) {
    this.options.selectedPlayerId = id;
    const select = this.container.querySelector('.psd-select');
    if (select) select.value = id || '';
  }
}