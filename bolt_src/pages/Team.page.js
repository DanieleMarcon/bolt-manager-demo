export default class TeamPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="team-page">
        <h2>Rosa Giocatori</h2>
        <table class="players-table" role="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Giocatore</th>
              <th scope="col">Posizione</th>
              <th scope="col">Età</th>
              <th scope="col">OVR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td><td>Nome 1</td><td>POR</td><td>28</td><td>75</td>
            </tr>
            <tr>
              <td>2</td><td>Nome 2</td><td>DC</td><td>24</td><td>78</td>
            </tr>
            <tr>
              <td>3</td><td>Nome 3</td><td>CC</td><td>30</td><td>80</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}