export default class ShortlistPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="shortlist-page">
        <h2>Lista Osservati</h2>

        <div class="player-grid" role="list">
          <div role="listitem" class="player-card" aria-grabbed="false">
            <h3>Giocatore 1</h3>
            <button class="button button-ghost" aria-label="Rimuovi">❌</button>
          </div>
          <div role="listitem" class="player-card" aria-grabbed="false">
            <h3>Giocatore 2</h3>
            <button class="button button-ghost" aria-label="Rimuovi">❌</button>
          </div>
        </div>
      </div>
    `;
  }
}