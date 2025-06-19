export default class ResultsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { matchesDataset } = await import('../datasets/matches.js');
    const { teamsDataset } = await import('../datasets/teams.js');
    const userTeamId = window.currentSession?.user_team_id;

    let rows = '';
    if (userTeamId) {
      const all = await matchesDataset.all();
      const played = all
        .filter(m => (m.home_team_id === userTeamId || m.away_team_id === userTeamId) && m.status === 'finished')
        .sort((a,b) => new Date(b.match_date) - new Date(a.match_date));

      for (const match of played) {
        const home = await teamsDataset.get(match.home_team_id);
        const away = await teamsDataset.get(match.away_team_id);
        const date = new Date(match.match_date).toLocaleDateString('it-IT');
        rows += `<tr><td>${date}</td><td>${home?.name} vs ${away?.name}</td><td>${match.home_goals}-${match.away_goals}</td><td>Campionato</td></tr>`;
      }
    }
    if (!rows) rows = '<tr><td colspan="4">Nessun risultato disponibile</td></tr>';

    this.container.innerHTML = `
      <div class="results-page">
        <header class="results-header">
          <h2>Risultati</h2>
          <div class="filters">
            <input type="date" aria-label="Data" />
            <select aria-label="Competizione">
              <option>Tutte</option>
              <option>Serie A</option>
              <option>Coppa</option>
            </select>
          </div>
        </header>

        <table class="results-table" role="table">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Avversario</th>
              <th scope="col">Risultato</th>
              <th scope="col">Competizione</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }
}