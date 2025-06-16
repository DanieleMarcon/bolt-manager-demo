export default class NegotiationsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="negotiations-page two-column-layout">
        <h2>Trattative</h2>

        <div class="negotiation-list" aria-labelledby="listTitle">
          <h3 id="listTitle">In Corso</h3>
          <ul role="list">
            <li role="listitem">Mario Rossi - Offerta €10M</li>
            <li role="listitem">Luca Bianchi - Offerta €8M</li>
          </ul>
        </div>

        <div class="negotiation-detail" aria-labelledby="detailTitle">
          <h3 id="detailTitle">Dettaglio</h3>
          <form class="offer-form">
            <label>
              Valore Offerta
              <input type="number" value="10000000" />
            </label>
            <button class="button button-primary" type="submit">Invia</button>
          </form>
        </div>
      </div>
    `;
  }
}