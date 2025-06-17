export default class BoardStats {
  constructor({ container, teamId }) {
    this.container = container;
    this.teamId = teamId;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="board-stats">
        <p>Placeholder Board Stats for team ${this.teamId || ''}</p>
      </div>`;
  }
}