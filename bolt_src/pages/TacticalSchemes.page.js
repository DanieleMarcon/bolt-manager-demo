export default class TacticalSchemesPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="tactical-schemes-page">
        <h2>Moduli Tattici</h2>

        <div class="schemes-grid" role="grid">
          <div role="gridcell" class="scheme-card">
            <h3>4-4-2</h3>
            <button class="button button-primary">Applica</button>
          </div>
          <div role="gridcell" class="scheme-card">
            <h3>4-3-3</h3>
            <button class="button button-primary">Applica</button>
          </div>
          <div role="gridcell" class="scheme-card">
            <h3>3-5-2</h3>
            <button class="button button-primary">Applica</button>
          </div>
        </div>
      </div>
    `;
  }
}