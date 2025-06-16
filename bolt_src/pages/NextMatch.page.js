export default class NextMatchPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="next-match-page">
        <header class="match-header">
          <h2>Prossima Partita</h2>
          <p>AC Milan vs Juventus - 12/06/2025</p>
        </header>

        <div class="match-grid">
          <section class="lineup-preview" aria-labelledby="lineupTitle">
            <h3 id="lineupTitle">Formazione Prevista</h3>
            <p class="placeholder">LineupPreview</p>
          </section>

          <section class="stats-preview" aria-labelledby="statsTitle">
            <h3 id="statsTitle">Statistiche Pre-Match</h3>
            <p class="placeholder">StatsPreview</p>
          </section>

          <section class="tactical-hints" aria-labelledby="tacticsTitle">
            <h3 id="tacticsTitle">Consigli Tattici</h3>
            <p class="placeholder">TacticalFormationDisplay</p>
          </section>

          <section class="match-actions" aria-labelledby="actionsTitle">
            <h3 id="actionsTitle" class="sr-only">Azioni</h3>
            <button class="button button-primary">Simula Partita</button>
            <button class="button button-secondary">Modifica Formazione</button>
          </section>
        </div>
      </div>
    `;
  }
}