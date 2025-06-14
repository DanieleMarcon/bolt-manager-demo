import BoardStats from '../components/BoardStats.component.js';
import FinancialHighlights from '../components/FinancialHighlights.component.js';

export default class BoardPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="board-page">
        <h2>Board Overview</h2>
        <section id="boardStats" class="card"></section>
        <section id="financialHighlights" class="card"></section>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    // Mostra statistiche di alto livello e KPI
    new BoardStats({
      container: document.getElementById('boardStats'),
      teamId: this.getUserTeamId()
    });

    // Evidenzia i punti finanziari chiave per il board
    new FinancialHighlights({
      container: document.getElementById('financialHighlights'),
      teamId: this.getUserTeamId()
    });
  }

  getUserTeamId() {
    return window.currentSession?.user_team_id || null;
  }
}
