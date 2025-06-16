export default class TeamMoralePage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="team-morale-page">
        <h2>Morale Squadra</h2>

        <div class="morale-overview" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
          <div class="gauge">70%</div>
        </div>

        <section aria-labelledby="timelineTitle" class="morale-timeline">
          <h3 id="timelineTitle">Andamento Morale</h3>
          <ol class="timeline" role="list">
            <li role="listitem">Giornata 1 - Vittoria</li>
            <li role="listitem">Giornata 2 - Pareggio</li>
            <li role="listitem">Giornata 3 - Sconfitta</li>
          </ol>
        </section>
      </div>
    `;
  }
}