export default class TacticalRolesPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="tactical-roles-page">
        <h2>Ruoli Tattici</h2>

        <ul class="role-list" role="list">
          <li role="listitem" class="role-item">
            <span class="role-icon">⚔️</span>
            <span class="role-name" id="strikerLabel">Centravanti</span>
            <p class="role-desc" aria-labelledby="strikerLabel">Ruolo offensivo principale</p>
          </li>
          <li role="listitem" class="role-item">
            <span class="role-icon">🛡️</span>
            <span class="role-name" id="defenderLabel">Difensore</span>
            <p class="role-desc" aria-labelledby="defenderLabel">Protegge l'area</p>
          </li>
          <li role="listitem" class="role-item">
            <span class="role-icon">🎯</span>
            <span class="role-name" id="playmakerLabel">Regista</span>
            <p class="role-desc" aria-labelledby="playmakerLabel">Imposta il gioco</p>
          </li>
        </ul>
      </div>
    `;
  }
}