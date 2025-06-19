export default class TeamStatsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { teamsDataset } = await import('../datasets/teams.js');

    const userTeamId = window.currentSession?.user_team_id;
    let statsHtml = '<p>Dati squadra non disponibili</p>';

    if (userTeamId) {
      const team = await teamsDataset.get(userTeamId);
      if (team) {
        statsHtml = `
          <ul class="team-stats" role="list">
            <li role="listitem">Partite: ${team.matches_played}</li>
            <li role="listitem">Vittorie: ${team.wins}</li>
            <li role="listitem">Pareggi: ${team.draws}</li>
            <li role="listitem">Sconfitte: ${team.losses}</li>
            <li role="listitem">Gol Fatti: ${team.goals_for}</li>
            <li role="listitem">Gol Subiti: ${team.goals_against}</li>
            <li role="listitem">Punti: ${team.points}</li>
          </ul>`;
      }
    }

    this.container.innerHTML = `
      <div class="team-stats-page">
        <header class="stats-toolbar">
          <h2>Statistiche Squadra</h2>
        </header>

        <div class="stats-charts" role="region" aria-labelledby="chartsTitle">
          <h3 id="chartsTitle" class="sr-only">Statistiche</h3>
          ${statsHtml}
        </div>
      </div>
    `;
  }
}