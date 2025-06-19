export default class PressCenterPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  async render() {
    const { pressReleasesDataset } = await import('../datasets/press_releases.js');
    let releases = await pressReleasesDataset.all();
    releases = releases.sort((a,b) => new Date(b.date_generated) - new Date(a.date_generated));
    const items = releases.map(r => {
      const date = new Date(r.date_generated).toLocaleDateString('it-IT');
      return `<li role="listitem" class="news-card">${date} - ${r.content}</li>`;
    }).join('');

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
          ${items || '<li role="listitem" class="news-card">Nessuna notizia disponibile</li>'}
        </ul>
      </div>
    `;
  }
}