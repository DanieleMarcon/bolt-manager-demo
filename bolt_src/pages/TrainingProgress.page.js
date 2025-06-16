export default class TrainingProgressPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="training-progress-page split-view">
        <h2>Avanzamento Allenamenti</h2>

        <div class="progress-content">
          <aside class="session-list" aria-labelledby="sessionListTitle">
            <h3 id="sessionListTitle">Sessioni</h3>
            <ul role="list">
              <li role="listitem" tabindex="0">1 Giugno - Fitness</li>
              <li role="listitem" tabindex="0">2 Giugno - Tecnica</li>
              <li role="listitem" tabindex="0">3 Giugno - Tattica</li>
            </ul>
          </aside>

          <section class="progress-chart" aria-labelledby="chartTitle">
            <h3 id="chartTitle">Progressi</h3>
            <div class="chart placeholder" aria-describedby="chartDesc">Chart</div>
            <p id="chartDesc" class="sr-only">Andamento forma fisica dei giocatori</p>
          </section>
        </div>
      </div>
    `;
  }
}