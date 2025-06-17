export default class TacticsForm {
  constructor({ container, teamId, onSave }) {
    this.container = container;
    this.teamId = teamId;
    this.onSave = onSave || (() => {});
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <form class="tactics-form">
        <p>Placeholder Tactics Form for team ${this.teamId || ''}</p>
        <button type="button" class="save-tactics">Salva</button>
      </form>`;
    this.container.querySelector('.save-tactics').addEventListener('click', () => {
      this.onSave({});
    });
  }
}