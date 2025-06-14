import BudgetTracker from '../components/BudgetTracker.component.js';
import SponsorBanner from '../components/SponsorBanner.component.js';

export default class FinanceOverviewPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="finance-overview-page">
        <h2>Finanze del Club</h2>
        <section id="budgetTracker" class="card"></section>
        <section id="sponsorBanner" class="sponsor-banner"></section>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    // BudgetTracker mostra bilancio, entrate e uscite
    new BudgetTracker({
      container: document.getElementById('budgetTracker'),
      dataSet: 'finances',
      teamId: this.getUserTeamId()
    });

    // SponsorBanner mostra i loghi e dettagli sponsor
    new SponsorBanner({
      container: document.getElementById('sponsorBanner'),
      teamId: this.getUserTeamId()
    });
  }

  getUserTeamId() {
    // Recupera l'ID della squadra utente dalla sessione attiva
    return window.currentSession?.user_team_id || null;
  }
}
