export default class TeamSummaryCard {
  constructor({ container, teamId } = {}) {
    this.container = container;
    this.teamId = teamId ?? window.currentSession?.user_team_id ?? null;
    this.render();
  }

  async render() {
    if (!this.container) return;
    if (!this.teamId) {
      this.container.textContent = 'Nessuna squadra selezionata';
      return;
    }

    const { teamsDataset } = await import('../datasets/teams.js');
    const team = await teamsDataset.get(this.teamId);
    if (!team) {
      this.container.textContent = 'Dati squadra non disponibili';
      return;
    }

    const budget = team.budget || 0;
    const morale = team.team_morale || 0;

    this.container.innerHTML = `
      <div class="team-summary-card">
        <div class="header">
          <img class="team-logo" src="${team.logo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'}" alt="Logo ${team.name}">
          <h4 class="team-name">${team.name}</h4>
        </div>
        <div class="stats">
          <span>V ${team.wins}</span>
          <span>N ${team.draws}</span>
          <span>S ${team.losses}</span>
        </div>
        <p class="budget">Budget: <strong>€${budget.toLocaleString('it-IT')}</strong></p>
        <div class="morale-bar" aria-label="Morale ${Math.round(morale)}%">
          <div class="morale-fill" style="width: ${morale}%;"></div>
          <span class="morale-text">${Math.round(morale)}%</span>
        </div>
      </div>
      <style>
      .team-summary-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .team-summary-card .header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .team-summary-card .team-logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--border);
      }
      .team-summary-card .stats {
        display: flex;
        gap: 8px;
        font-size: 14px;
      }
      .team-summary-card .budget {
        font-size: 14px;
        margin: 0;
      }
      .morale-bar {
        position: relative;
        height: 10px;
        background: var(--border);
        border-radius: 5px;
        overflow: hidden;
      }
      .morale-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--error), var(--success));
      }
      .morale-text {
        position: absolute;
        top: -18px;
        right: 0;
        font-size: 12px;
        color: var(--text-muted);
      }
      </style>
    `;
  }
}