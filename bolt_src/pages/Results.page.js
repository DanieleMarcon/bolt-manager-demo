export default class ResultsPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="results-page">
        <header class="results-header">
          <h2>Risultati</h2>
          <div class="filters">
            <input type="date" aria-label="Data" />
            <select aria-label="Competizione">
              <option>Tutte</option>
              <option>Serie A</option>
              <option>Coppa</option>
            </select>
          </div>
        </header>

        <table class="results-table" role="table">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Avversario</th>
              <th scope="col">Risultato</th>
              <th scope="col">Competizione</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>01/06</td><td>Juventus</td><td>2-1</td><td>Serie A</td></tr>
            <tr><td>08/06</td><td>Roma</td><td>1-1</td><td>Coppa</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }
}