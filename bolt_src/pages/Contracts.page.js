export default class ContractsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="contracts-page">
        <h2>Contratti</h2>

        <div class="actions">
          <button class="button button-secondary">Esporta</button>
        </div>

        <table class="contracts-table" role="table">
          <thead>
            <tr>
              <th scope="col">Giocatore</th>
              <th scope="col">Scadenza</th>
              <th scope="col">Stipendio</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mario Rossi</td><td>2026</td><td>€2M</td>
              <td><button class="button button-primary">Rinnova</button></td>
            </tr>
            <tr>
              <td>Luca Bianchi</td><td>2025</td><td>€1.5M</td>
              <td><button class="button button-primary">Rinnova</button></td>
            </tr>
          </tbody>
        </table>
        <!-- Form dettagli contratto -->
        <form class="contract-details-form" data-options='{"editable":true}'></form>
      </div>
    `;
  }
}