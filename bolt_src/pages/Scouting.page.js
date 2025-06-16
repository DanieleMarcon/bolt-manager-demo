import PlayerSearch from '../components/PlayerSearch.js';
import PlayerList from '../components/PlayerList.js';

export default class ScoutingPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="scouting-page">
        <h2>Scouting</h2>
        <section id="playerSearch" class="card"></section>
        <section id="playerList" class="card"></section>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    // Componente per ricerca giocatori secondo criteri
    new PlayerSearch({
      container: document.getElementById('playerSearch'),
      onSearch: (criteria) => this.loadPlayers(criteria)
    });

    // Lista dei giocatori trovati
    new PlayerList({
      container: document.getElementById('playerList'),
      dataSet: 'players',
      onSelect: (playerId) => this.showPlayerDetail(playerId)
    });
  }

  async loadPlayers(criteria) {
    // TODO: implementare fetch dei giocatori dal servizio scouting
    console.log('Ricerca giocatori con criteri:', criteria);
  }

  showPlayerDetail(playerId) {
    // TODO: navigare alla pagina di dettaglio del giocatore
    window.location.hash = `player-detail/${playerId}`;
  }
}
