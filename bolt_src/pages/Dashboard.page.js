import TeamSummaryCard from '../components/TeamSummaryCard.js';
import FinancialOverviewCard from '../components/FinancialOverviewCard.js';

export default class DashboardPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="dashboard-page two-column-layout">
        <main class="left-column" role="main">
          <section aria-labelledby="teamSummaryTitle" class="card team-summary">
            <h3 id="teamSummaryTitle">Riepilogo Squadra</h3>
            <div id="teamSummaryContainer"></div>
          </section>

          <section aria-labelledby="financialOverviewTitle" class="card financial-overview">
            <h3 id="financialOverviewTitle">Situazione Finanziaria</h3>
            <div id="financialOverviewContainer"></div>
          </section>

          <section aria-labelledby="upcomingMatchesTitle" class="card upcoming-matches">
            <h3 id="upcomingMatchesTitle">Prossime Partite</h3>
            <ul role="list" class="placeholder">
              <li role="listitem">Match 1</li>
              <li role="listitem">Match 2</li>
              <li role="listitem">Match 3</li>
            </ul>
          </section>
        </main>

        <aside class="right-column" aria-labelledby="newsTickerTitle">
          <section class="card news-ticker">
            <h3 id="newsTickerTitle">News Recenti</h3>
            <ul role="list" class="placeholder">
              <li role="listitem">Notizia 1</li>
              <li role="listitem">Notizia 2</li>
            </ul>
          </section>
        </aside>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    new TeamSummaryCard({
      container: document.getElementById('teamSummaryContainer'),
      teamId: this.getUserTeamId()
    });

    new FinancialOverviewCard({
      container: document.getElementById('financialOverviewContainer'),
      teamId: this.getUserTeamId()
    });
  }

  getUserTeamId() {
    return window.currentSession?.user_team_id || null;
  }
}