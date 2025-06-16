export default class ScoutingReportsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="scouting-reports-page">
        <h2>Rapporti di Scouting</h2>

        <div class="report-filters">
          <input type="search" aria-label="Cerca report" placeholder="Cerca" />
        </div>

        <ul class="report-list" role="list">
          <li role="listitem" class="report-card">
            <h3>Giocatore A</h3>
            <button class="button button-secondary" aria-label="Download">⬇️</button>
          </li>
          <li role="listitem" class="report-card">
            <h3>Giocatore B</h3>
            <button class="button button-secondary" aria-label="Download">⬇️</button>
          </li>
        </ul>
      </div>
    `;
  }
}