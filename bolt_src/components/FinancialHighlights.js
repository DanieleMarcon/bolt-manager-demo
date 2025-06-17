export default class FinancialHighlights {
  constructor({ container, teamId }) {
    this.container = container;
    this.teamId = teamId;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="financial-highlights">
        <p>Placeholder Financial Highlights for team ${this.teamId || ''}</p>
      </div>`;
  }
}