export default class TeamPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

   async render() {
    const { teamsDataset } = await import('../datasets/teams.js');
    const { default: playersData } = await import('../data/playersData.js');

    const userTeamId = window.currentSession?.user_team_id;
    let rows = '<tr><td colspan="5">Nessuna squadra selezionata</td></tr>';

    if (userTeamId) {
      const team = await teamsDataset.get(userTeamId);
      const short = team?.short_name;
      const players = playersData[short] || [];

      const calcAge = (b) => {
        const diff = Date.now() - new Date(b).getTime();
        return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      };

      rows = players.map((p, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${p.first_name} ${p.last_name}</td>
          <td>${p.role}</td>
          <td>${calcAge(p.birthdate)}</td>
          <td>${p.overall_rating}</td>
        </tr>
      `).join('');
      if (!rows) rows = '<tr><td colspan="5">Nessun giocatore disponibile</td></tr>';
    }

    this.container.innerHTML = `
      <div class="team-page">
        <h2>Rosa Giocatori</h2>
        <table class="players-table" role="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Giocatore</th>
              <th scope="col">Posizione</th>
              <th scope="col">Età</th>
              <th scope="col">OVR</th>
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