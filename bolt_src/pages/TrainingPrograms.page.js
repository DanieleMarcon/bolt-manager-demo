export default class TrainingProgramsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { trainingsDataset } = await import('../datasets/trainings.js');
    const userTeamId = window.currentSession?.user_team_id;
    let programs = [];
    if (userTeamId) {
      programs = (await trainingsDataset.getAll()).filter(t => t.team_id === userTeamId && t.training_type);
    }
    const listItems = programs.map(p => {
      const duration = p.duration_minutes ? Math.round(p.duration_minutes/60/24) + ' giorni' : '';
      return `<li role="listitem" class="program-card"><h3>${p.training_type}</h3><p>Durata: ${duration}</p><button class="button button-primary">Avvia</button></li>`;
    }).join('');

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
          ${listItems || '<li role="listitem" class="program-card">Nessun programma disponibile</li>'}
        </ul>
      </div>
    `;
  }
}