export default class FinancialOverviewCard {
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
    const { financesDataset } = await import('../datasets/finances.js');
    const team = await teamsDataset.get(this.teamId);
    if (!team) {
      this.container.textContent = 'Dati finanziari non disponibili';
      return;
    }

    const allRecords = await financesDataset.getAll();
    const teamRecords = allRecords.filter(r => r.team_id === this.teamId);
    const now = new Date();
    const monthRecords = teamRecords.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const income = monthRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
    const expenses = monthRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    const balance = income - expenses;

    const format = n => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

    this.container.innerHTML = `
      <div class="financial-overview-card">
        <p class="current-budget">Budget disponibile: <strong>${format(team.budget || 0)}</strong></p>
        <div class="monthly-stats">
          <span>Entrate mese: <strong>${format(income)}</strong></span>
          <span>Uscite mese: <strong>${format(expenses)}</strong></span>
          <span class="balance ${balance >= 0 ? 'positive' : 'negative'}">Saldo: <strong>${format(balance)}</strong></span>
        </div>
      </div>
      <style>
        .financial-overview-card {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .monthly-stats {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .balance.positive strong { color: var(--success); }
        .balance.negative strong { color: var(--error); }
      </style>
    `;
  }
}
