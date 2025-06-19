export default class TeamMoralePage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { teamsDataset } = await import('../datasets/teams.js');

    const userTeamId = window.currentSession?.user_team_id;
    let morale = 0;
    if (userTeamId) {
      const team = await teamsDataset.get(userTeamId);
      morale = Math.round(team?.team_morale || 0);
    }

    this.container.innerHTML = `
      <div class="team-morale-page">
        <h2>Morale Squadra</h2>

        <div class="morale-overview" role="progressbar" aria-valuenow="${morale}" aria-valuemin="0" aria-valuemax="100">
          <div class="gauge">${morale}%</div>
        </div>

        <section aria-labelledby="timelineTitle" class="morale-timeline">
          <h3 id="timelineTitle">Andamento Morale</h3>
          <p class="placeholder">Storico morale non disponibile</p>
        </section>
      </div>
    `;
  }
}