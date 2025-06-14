import FormationVisualizer from '../components/FormationVisualizer.component.js';
import TacticsForm from '../components/TacticsForm.component.js';

export default class TacticalSetupPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="tactical-setup-page">
        <h2>Impostazioni Tattiche</h2>
        <div id="formationVisualizer" class="card"></div>
        <div id="tacticsForm" class="card"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    // Visualizza formazione sul campo
    new FormationVisualizer({
      container: document.getElementById('formationVisualizer'),
      teamId: this.getUserTeamId()
    });

    // Modulo per personalizzare ruoli e istruzioni tattiche
    new TacticsForm({
      container: document.getElementById('tacticsForm'),
      teamId: this.getUserTeamId(),
      onSave: (config) => this.saveTactics(config)
    });
  }

  saveTactics(config) {
    // TODO: implementare salvataggio delle configurazioni tattiche
    console.log('Salvataggio tattiche:', config);
  }

  getUserTeamId() {
    return window.currentSession?.user_team_id || null;
  }
}
