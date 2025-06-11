<div class="calendar-view-page">
  <div class="page-header">
    <h2 class="page-title">Calendario</h2>
    <div class="page-actions">
      <button class="button button-secondary add-event-btn">
        📅 Aggiungi Evento
      </button>
      <button class="button button-primary advance-day-btn">
        ⏩ Avanza Giorno
      </button>
    </div>
  </div>

  <!-- Calendar Navigation Section -->
  <div class="calendar-navigation-section">
    <div id="calendarNavigationContainer"></div>
  </div>

  <!-- Calendar Grid Section -->
  <div class="calendar-grid-section">
    <div id="calendarGridContainer"></div>
  </div>

  <!-- Upcoming Events Section -->
  <div class="upcoming-events-section">
    <div class="section-header">
      <h3>Eventi Imminenti</h3>
      <div class="time-range-container" id="timeRangeContainer"></div>
    </div>
    <div id="upcomingEventsContainer"></div>
  </div>

  <!-- Day Detail Modal -->
  <div id="dayDetailModalContainer"></div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<script>
class CalendarViewPage {
  constructor() {
    this.events = [];
    this.currentDate = new Date();
    this.selectedDate = null;
    this.currentView = 'month';
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadData();
    this.renderComponents();
  }

  bindEvents() {
    document.querySelector('.add-event-btn')?.addEventListener('click', () => this.showAddEventModal());
    document.querySelector('.advance-day-btn')?.addEventListener('click', () => this.advanceDay());

    document.addEventListener('dateChange', (e) => this.handleDateChange(e.detail.date));
    document.addEventListener('viewChange', (e) => this.handleViewChange(e.detail.view));
    document.addEventListener('dayClick', (e) => this.handleDayClick(e.detail.date, e.detail.events));
    document.addEventListener('advanceDay', () => this.advanceDay());
    document.addEventListener('advanceToDay', (e) => this.advanceToDay(e.detail.date));
    document.addEventListener('saveDay', (e) => this.saveDay(e.detail));
    document.addEventListener('rangeChange', (e) => this.handleRangeChange(e.detail));
  }

  async loadData() {
    try {
      this.events = await this.fetchEvents();
    } catch (error) {
      console.error('Errore nel caricamento dei dati:', error);
      alert('Errore nel caricamento degli eventi');
    }
  }

  async fetchEvents() {
    const today = new Date();
    const events = [];

    for (let i = -10; i < 30; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);
      if (Math.random() > 0.3) continue;

      const types = ['match', 'training', 'rest', 'transfer'];
      const type = types[Math.floor(Math.random() * types.length)];
      const rivals = ['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio'];
      const title = type === 'match' ? `Partita vs ${rivals[Math.floor(Math.random() * 5)]}` :
                    type === 'training' ? `Allenamento ${['Tattico', 'Fisico', 'Tecnico'][Math.floor(Math.random() * 3)]}` :
                    type === 'rest' ? 'Giorno di Riposo' : 'Scadenza Mercato';

      events.push({
        id: i + 100,
        title,
        date: eventDate.toISOString(),
        time: type === 'match' ? '15:00' : type === 'training' ? '10:00' : '',
        location: type === 'match' ? 'Stadio San Siro' : type === 'training' ? 'Centro Sportivo' : '',
        type,
        description: `Descrizione dettagliata per ${title}`
      });
    }

    return events;
  }

  renderComponents() {
    this.renderCalendarNavigation();
    this.renderCalendarGrid();
    this.renderTimeRange();
    this.renderUpcomingEvents();
    this.renderDayDetailModal();
    this.renderSponsorBanner();
  }

  renderCalendarNavigation() {
    const container = document.getElementById('calendarNavigationContainer');
    const el = document.createElement('div');
    el.className = 'calendar-navigation';
    container.appendChild(el);

    if (typeof CalendarNavigation !== "undefined") {
      new CalendarNavigation(el, {
        onDateChange: (date) => this.handleDateChange(date),
        onViewChange: (view) => this.handleViewChange(view),
        onAdvanceDay: () => this.advanceDay()
      });
    }
  }

  renderCalendarGrid() {
    const container = document.getElementById('calendarGridContainer');
    const el = document.createElement('div');
    el.className = 'calendar-grid';
    container.appendChild(el);

    if (typeof CalendarGrid !== "undefined") {
      const grid = new CalendarGrid(el, {
        onDayClick: (date, events) => this.handleDayClick(date, events)
      });
      if (grid.setEvents) grid.setEvents(this.events);
    }
  }

  renderTimeRange() {
    const container = document.getElementById('timeRangeContainer');
    const el = document.createElement('div');
    el.className = 'time-range-filter';
    container.appendChild(el);

    if (typeof TimeRangeFilter !== "undefined") {
      new TimeRangeFilter(el, {
        onChange: (range, startDate, endDate) => this.handleRangeChange({ range, startDate, endDate }),
        defaultRange: 'month'
      });
    }
  }

  renderUpcomingEvents() {
    const container = document.getElementById('upcomingEventsContainer');
    const el = document.createElement('div');
    el.className = 'upcoming-events-list';
    container.appendChild(el);

    if (typeof UpcomingEventsList !== "undefined") {
      const list = new UpcomingEventsList(el, {
        daysAhead: 30,
        maxEvents: 10,
        onEventClick: (event) => this.handleEventClick(event)
      });
      if (list.setEvents) list.setEvents(this.events);
    }
  }

  renderDayDetailModal() {
    const container = document.getElementById('dayDetailModalContainer');
    const el = document.createElement('div');
    el.className = 'day-detail-modal modal';
    container.appendChild(el);

    if (typeof DayDetailModal !== "undefined") {
      this.dayDetailModal = new DayDetailModal(el, {
        onSave: (data) => this.saveDay(data),
        onAdvance: (date) => this.advanceToDay(date)
      });
    }
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    const sponsorData = {
      id: 2,
      name: 'Energy Boost',
      description: 'La bevanda energetica ufficiale dei campioni di calcio',
      logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      cta: 'Prova ora',
      url: 'https://example.com/sponsor2',
      theme: 'featured'
    };

    if (typeof SponsorBanner !== "undefined") {
      new SponsorBanner(el, { sponsorData, autoClose: true, duration: 10000 });
    }
  }

  handleDateChange(date) {
    this.currentDate = date;
    const grid = document.querySelector('.calendar-grid');
    if (grid?.setCurrentMonth) grid.setCurrentMonth(date);
  }

  handleViewChange(view) {
    this.currentView = view;
  }

  handleDayClick(date, events) {
    this.selectedDate = date;
    if (this.dayDetailModal?.show) {
      this.dayDetailModal.show(date, events);
    } else {
      window?.showDayDetail?.(date, events);
    }
  }

  handleEventClick(event) {
    const eventDate = new Date(event.date);
    const dayEvents = this.events.filter(e => new Date(e.date).toDateString() === eventDate.toDateString());
    this.handleDayClick(eventDate, dayEvents);
  }

  handleRangeChange({ range, startDate, endDate }) {
    const filtered = this.events.filter(e => {
      const date = new Date(e.date);
      return date >= startDate && date <= endDate;
    });

    const list = document.querySelector('.upcoming-events-list');
    if (list?.setEvents) list.setEvents(filtered);
    if (list?.setEventsCount) list.setEventsCount(filtered.length);
  }

  advanceDay() {
    alert("Funzione 'Avanza Giorno' eseguita");
  }

  advanceToDay(date) {
    alert(`Avanzamento fino al ${new Date(date).toLocaleDateString()}`);
  }

  saveDay(data) {
    console.log("Dati giorno salvati:", data);
  }

  showAddEventModal() {
    const date = prompt('Data evento (YYYY-MM-DD):');
    if (!date) return;
    const type = prompt('Tipo evento (match, training, rest, transfer):');
    if (!type) return;
    const title = prompt('Titolo evento:');
    if (!title) return;

    const newEvent = {
      id: Date.now(),
      title,
      date: new Date(date).toISOString(),
      time: '10:00',
      location: '',
      type,
      description: `Descrizione per ${title}`
    };

    this.events.push(newEvent);
    const grid = document.querySelector('.calendar-grid');
    if (grid?.setEvents) grid.setEvents(this.events);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CalendarViewPage();
});
</script>
