export default class WeeklyScheduleGrid {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      allowDragDrop: false,
      onChange: () => {}
    }, options);
    this.currentWeek = new Date();
    this.schedule = {};
      this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="week-controls">
        <button class="prev-week">&lt;</button>
        <span class="week-label"></span>
        <button class="next-week">&gt;</button>
      </div>
      <div class="schedule-grid"></div>
    `;
    this.bindEvents();
    this.updateWeekDisplay();
    this.loadSchedule();
  }
  
  bindEvents() {
    this.container.querySelector('.prev-week').addEventListener('click', () => {
      this.changeWeek(-7);
    });
    this.container.querySelector('.next-week').addEventListener('click', () => {
      this.changeWeek(7);
    });
  }

  changeWeek(days) {
    this.currentWeek.setDate(this.currentWeek.getDate() + days);
    this.updateWeekLabel();
    this.renderGrid();
  }

  updateWeekLabel() {
    const start = this.getWeekStart(this.currentWeek);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const label = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    this.container.querySelector('.week-label').textContent = label;
  }

  renderGrid() {
    const grid = this.container.querySelector('.schedule-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const day = document.createElement('div');
      day.className = 'day-col';
      day.dataset.day = i;
      day.innerHTML = `
        <div class="day-label">${this.getDayName(i)}</div>
        <div class="sessions"></div>
        <button class="add-session">Aggiungi</button>
      `;
      day.querySelector('.add-session').addEventListener('click', () => this.addSession(i));
      grid.appendChild(day);
    }
  }
  
    addSession(day) {
    if (!this.schedule[day]) this.schedule[day] = [];
    this.schedule[day].push({ id: Date.now(), type: 'training' });
    this.renderGrid();
    this.options.onChange(this.schedule);
  }

  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  formatDate(date) {
    return date.toLocaleDateString('it-IT');
  }

  getDayName(index) {
    const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    return days[index];
  }
}