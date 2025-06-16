
Nuovo
+33
-0

export default class TeamStatsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="team-stats-page">
        <header class="stats-toolbar">
          <h2>Statistiche Squadra</h2>
          <div class="toolbar-controls">
            <label>
              Competizione
              <select aria-label="Competizione">
                <option>Serie A</option>
                <option>Coppa</option>
              </select>
            </label>
            <button class="button button-secondary">Esporta CSV</button>
          </div>
        </header>

        <div class="stats-charts" role="region" aria-labelledby="chartsTitle">
          <h3 id="chartsTitle" class="sr-only">Grafici</h3>
          <div class="chart" aria-label="Possesso Palla">Chart 1</div>
          <div class="chart" aria-label="Tiri in Porta">Chart 2</div>
          <div class="chart" aria-label="Passaggi Riusciti">Chart 3</div>
          <!-- Radar delle competenze -->
          <div class="competency-radar-chart" data-competency-data='{}'></div>
        </div>
      </div>
    `;
  }
}