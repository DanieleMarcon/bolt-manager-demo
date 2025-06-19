export default class NextMatchPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { matchesDataset } = await import('../datasets/matches.js');
    const { teamsDataset } = await import('../datasets/teams.js');
    const userTeamId = window.currentSession?.user_team_id;
    let headerInfo = '<p>Nessuna partita programmata</p>';

    if (userTeamId) {
      const all = await matchesDataset.all();
      const upcoming = all
        .filter(m => (m.home_team_id === userTeamId || m.away_team_id === userTeamId) && new Date(m.match_date) >= new Date())
        .sort((a,b) => new Date(a.match_date) - new Date(b.match_date));
      if (upcoming.length) {
        const match = upcoming[0];
        const home = await teamsDataset.get(match.home_team_id);
        const away = await teamsDataset.get(match.away_team_id);
        const date = new Date(match.match_date).toLocaleDateString('it-IT');
        headerInfo = `<p>${home?.name || ''} vs ${away?.name || ''} - ${date}</p>`;
      }
    }

    this.container.innerHTML = `
      <div class="next-match-page">
        <header class="match-header">
          <h2>Prossima Partita</h2>
          ${headerInfo}
        </header>

        <div class="match-grid">
          <section class="lineup-preview" aria-labelledby="lineupTitle">
            <h3 id="lineupTitle">Formazione Prevista</h3>
            <p class="placeholder">Dati formazione non disponibili</p>
          </section>

          <section class="stats-preview" aria-labelledby="statsTitle">
            <h3 id="statsTitle">Statistiche Pre-Match</h3>
            <p class="placeholder">Statistiche non disponibili</p>
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