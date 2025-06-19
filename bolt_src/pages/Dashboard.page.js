import TeamSummaryCard from '../components/TeamSummaryCard.js';
import FinancialOverviewCard from '../components/FinancialOverviewCard.js';

export default class DashboardPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
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
    await this.initComponents();
  }

  async initComponents() {
    new TeamSummaryCard({
      container: document.getElementById('teamSummaryContainer'),
      teamId: this.getUserTeamId()
    });

    new FinancialOverviewCard({
      container: document.getElementById('financialOverviewContainer'),
      teamId: this.getUserTeamId()
    });

    await this.loadUpcomingMatches();
    await this.loadRecentNews();
  }

  async loadUpcomingMatches() {
    const { matchesDataset } = await import('../datasets/matches.js');
    const { teamsDataset } = await import('../datasets/teams.js');
    const userTeamId = this.getUserTeamId();
    if (!userTeamId) return;
    const all = await matchesDataset.all();
    const upcoming = all
      .filter(m => (m.home_team_id === userTeamId || m.away_team_id === userTeamId) && new Date(m.match_date) >= new Date())
      .sort((a,b) => new Date(a.match_date) - new Date(b.match_date))
      .slice(0,3);
    const items = [];
    for (const m of upcoming) {
      const home = await teamsDataset.get(m.home_team_id);
      const away = await teamsDataset.get(m.away_team_id);
      items.push(`<li role="listitem">${home?.short_name || ''} vs ${away?.short_name || ''} - ${new Date(m.match_date).toLocaleDateString('it-IT')}</li>`);
    }
    document.querySelector('.upcoming-matches ul').innerHTML = items.join('') || '<li role="listitem">Nessun match in programma</li>';
  }

  async loadRecentNews() {
    const { pressReleasesDataset } = await import('../datasets/press_releases.js');
    const releases = (await pressReleasesDataset.all())
      .sort((a,b) => new Date(b.date_generated) - new Date(a.date_generated))
      .slice(0,2);
    const items = releases.map(r => `<li role="listitem">${new Date(r.date_generated).toLocaleDateString('it-IT')} - ${r.content}</li>`);
    document.querySelector('.news-ticker ul').innerHTML = items.join('') || '<li role="listitem">Nessuna news recente</li>';
  }

  getUserTeamId() {
    return window.currentSession?.user_team_id || null;
  }
}