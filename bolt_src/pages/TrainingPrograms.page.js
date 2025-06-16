export default class TrainingProgramsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="training-programs-page">
        <h2>Programmi di Allenamento</h2>

        <div class="program-filters">
          <div class="filter-tabs" role="tablist">
            <button role="tab" class="active">Tutti</button>
            <button role="tab">Fitness</button>
            <button role="tab">Tecnico</button>
            <button role="tab">Tattico</button>
          </div>
          <input type="search" aria-label="Cerca Programma" placeholder="Cerca" />
        </div>

        <ul class="program-list" role="list">
          <li role="listitem" class="program-card">
            <h3>Rafforza Difesa</h3>
            <p>Durata: 2 settimane</p>
            <button class="button button-primary">Avvia</button>
          </li>
          <li role="listitem" class="program-card">
            <h3>Intensivo Attacco</h3>
            <p>Durata: 1 settimana</p>
            <button class="button button-primary">Avvia</button>
          </li>
        </ul>
      </div>
    `;
  }
}