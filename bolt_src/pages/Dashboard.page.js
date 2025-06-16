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
            <p class="placeholder">TeamSummaryCard</p>
          </section>

          <section aria-labelledby="financialOverviewTitle" class="card financial-overview">
            <h3 id="financialOverviewTitle">Situazione Finanziaria</h3>
            <p class="placeholder">FinancialOverviewCard</p>
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
          <section class="card quick-actions">
            <h3 id="quickActionsTitle">Azioni Rapide</h3>
            <div class="actions">
              <button class="button button-primary">Nuova Partita</button>
              <button class="button button-secondary">Carica</button>
              <button class="button button-secondary">Salva</button>
            </div>
          </section>

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
  }
}