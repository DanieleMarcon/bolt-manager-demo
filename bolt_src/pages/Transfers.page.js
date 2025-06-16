export default class TransfersPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="transfers-page">
        <h2>Mercato Trasferimenti</h2>

        <table class="transfer-table" role="table">
          <thead>
            <tr>
              <th scope="col">Giocatore</th>
              <th scope="col">Posizione</th>
              <th scope="col">Valore</th>
              <th scope="col">Azione</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mario Rossi</td><td>ATT</td><td>€10M</td>
              <td><button class="button button-primary">Fai Offerta</button></td>
            </tr>
            <tr>
              <td>Luca Bianchi</td><td>MED</td><td>€8M</td>
              <td><button class="button button-primary">Fai Offerta</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}