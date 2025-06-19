export default class TrainingProgressPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { trainingsDataset } = await import('../datasets/trainings.js');
    const userTeamId = window.currentSession?.user_team_id;
    let sessions = [];
    if (userTeamId) {
      sessions = (await trainingsDataset.getAll())
        .filter(s => s.team_id === userTeamId)
        .sort((a,b) => new Date(a.training_date) - new Date(b.training_date));
    }

    const items = sessions.map(s => {
      const date = new Date(s.training_date).toLocaleDateString('it-IT');
      return `<li role="listitem" tabindex="0">${date} - ${s.training_type}</li>`;
    }).join('');

    this.container.innerHTML = `
      <div class="training-progress-page split-view">
        <h2>Avanzamento Allenamenti</h2>

        <div class="progress-content">
          <aside class="session-list" aria-labelledby="sessionListTitle">
            <h3 id="sessionListTitle">Sessioni</h3>
            <ul role="list">
              ${items || '<li role="listitem">Nessuna sessione programmata</li>'}
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