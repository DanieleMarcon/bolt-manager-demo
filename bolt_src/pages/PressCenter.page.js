export default class PressCenterPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="press-center-page">
        <h2>Sala Stampa</h2>

        <div class="news-filters">
          <input type="search" aria-label="Cerca notizia" placeholder="Cerca" />
          <select aria-label="Categoria">
            <option>Tutte</option>
            <option>Club</option>
            <option>Mercato</option>
          </select>
        </div>

        <ul class="news-list" role="list">
          <li role="listitem" class="news-card">Comunicato 1</li>
          <li role="listitem" class="news-card">Comunicato 2</li>
          <li role="listitem" class="news-card">Comunicato 3</li>
        </ul>
      </div>
    `;
  }
}