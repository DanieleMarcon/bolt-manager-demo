<div class="player-history-page">
  <div class="page-header">
    <h2 class="page-title">Storico Giocatore</h2>
    <div class="page-actions">
      <button class="button button-secondary export-history-btn">
        📊 Esporta Storico
      </button>
    </div>
  </div>

  <div class="player-selection-section">
    <div class="selection-container">
      <div class="player-selector-wrapper">
        <div class="player-selector-dropdown"></div>
      </div>
      <div class="time-range-wrapper">
        <div class="time-range-filter-container"></div>
      </div>
    </div>
  </div>

  <div class="history-content">
    <div class="history-main">
      <div class="attribute-progress-section">
        <div class="section-header">
          <h3>Evoluzione Attributi</h3>
        </div>
        <div class="attribute-progress-chart-container"></div>
      </div>

      <div class="statistics-section">
        <div class="section-header">
          <h3>Statistiche Dettagliate</h3>
        </div>
        <div class="statistics-table-container"></div>
      </div>
    </div>

    <div class="history-sidebar">
      <div class="events-timeline-section">
        <div class="section-header">
          <h3>Timeline Eventi</h3>
        </div>
        <div class="event-timeline-container"></div>
      </div>

      <div class="comparison-section">
        <div class="section-header">
          <h3>Confronto Periodi</h3>
        </div>
        <div class="comparison-tool-container"></div>
      </div>
    </div>
  </div>

  <!-- Sponsor banner -->
  <div class="sponsor-banner-container"></div>
</div>

<style>
.player-history-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.player-selection-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.selection-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.player-selector-wrapper {
  flex: 1;
  min-width: 300px;
}

.time-range-wrapper {
  flex: 2;
  min-width: 400px;
}

.history-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.history-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.history-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.attribute-progress-section,
.statistics-section,
.events-timeline-section,
.comparison-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.sponsor-banner-container {
  margin-top: 16px;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .history-content {
    grid-template-columns: 1fr;
  }
  
  .history-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .selection-container {
    flex-direction: column;
  }
  
  .history-sidebar {
    grid-template-columns: 1fr;
  }
}
</style>

<script type="module">
import HistoryTimeline from '../components/HistoryTimeline.component.js';

export default class PlayerHistoryPage {
  constructor() {
    this.initializePage();
  }

  async initializePage() {
    try {
      this.initializeComponents();
      await this.loadInitialData();
      this.bindEvents();
      console.log('Player History page initialized');
    } catch (error) {
      console.error('Error initializing Player History page:', error);
      this.showError('Errore durante l\'inizializzazione della pagina');
    }
  }

  initializeComponents() {
    const playerSelectorContainer = document.querySelector('.player-selector-dropdown');
    const playerSelector = document.createElement('div');
    playerSelector.className = 'player-selector-dropdown';
    playerSelector.dataset.options = JSON.stringify({ label: 'Seleziona Giocatore', showPreview: true });
    playerSelectorContainer.appendChild(playerSelector);

    const timeRangeContainer = document.querySelector('.time-range-filter-container');
    const timeRangeFilter = document.createElement('div');
    timeRangeFilter.className = 'time-range-filter';
    timeRangeContainer.appendChild(timeRangeFilter);

    document.querySelector('.attribute-progress-chart-container')?.appendChild(document.createElement('div')).className = 'attribute-progress-chart';
    document.querySelector('.statistics-table-container')?.appendChild(document.createElement('div')).className = 'statistics-table';
    
    // Initialize HistoryTimeline component
    const timelineContainer = document.querySelector('.event-timeline-container');
    const timelineElement = document.createElement('div');
    timelineElement.className = 'event-timeline';
    timelineContainer.appendChild(timelineElement);
    
    // Create HistoryTimeline instance
    timelineElement.historyTimeline = new HistoryTimeline(timelineElement, {
      events: [],
      onEventClick: (event) => this.handleEventClick(event)
    });
    
    document.querySelector('.comparison-tool-container')?.appendChild(document.createElement('div')).className = 'comparison-tool';
    document.querySelector('.sponsor-banner-container')?.appendChild(document.createElement('div')).className = 'sponsor-banner';
  }

  async loadInitialData() {
    try {
      const players = await this.fetchPlayers();
      this.updatePlayerSelector(players);
      if (players?.length > 0) await this.loadPlayerHistory(players[0].id);
    } catch (error) {
      console.error('Error loading initial data:', error);
      this.showError('Errore nel caricamento dei dati');
    }
  }

  async fetchPlayers() {
    return [
      { id: 1, name: 'Mario Rossi', position: 'FW', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' },
      { id: 2, name: 'Luigi Bianchi', position: 'MF', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' },
      { id: 3, name: 'Giuseppe Verdi', position: 'DF', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' }
    ];
  }

  updatePlayerSelector(players) {
    const el = document.querySelector('.player-selector-dropdown');
    if (el?.playerSelectorDropdown) el.playerSelectorDropdown.setPlayers(players);
  }

  async loadPlayerHistory(playerId) {
    try {
      this.showLoading(true);
      const historyData = await this.fetchPlayerHistory(playerId);
      this.updateAttributeProgressChart(historyData.attributes);
      this.updateStatisticsTable(historyData.statistics);
      this.updateEventTimeline(historyData.events);
      this.showLoading(false);
    } catch (error) {
      console.error('Error loading player history:', error);
      this.showError('Errore nel caricamento dello storico giocatore');
      this.showLoading(false);
    }
  }

  async fetchPlayerHistory() {
    return {
      attributes: this.generateMockAttributeData(),
      statistics: this.generateMockStatisticsData(),
      events: this.generateMockEventsData()
    };
  }

  generateMockAttributeData() {
    const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
    const data = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const entry = { date: date.toISOString().split('T')[0], timestamp: date.getTime() };
      attributes.forEach(attr => {
        const base = 60 + Math.random() * 20;
        const progression = i * 0.5;
        const noise = (Math.random() - 0.5) * 2;
        entry[attr] = Math.round(Math.max(1, Math.min(99, base - progression + noise)));
      });
      data.push(entry);
    }
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  generateMockStatisticsData() {
    return [
      { id: 1, name: 'Gol Segnati', category: 'attack', value: 12, rank: 3, percentile: 92, trend: 'up' },
      { id: 2, name: 'Assist', category: 'attack', value: 8, rank: 5, percentile: 85, trend: 'up' },
      { id: 3, name: 'Minuti Giocati', category: 'general', value: 1245, rank: 2, percentile: 95, trend: 'neutral' },
      { id: 4, name: 'Passaggi Completati', category: 'passing', value: 342, rank: 4, percentile: 88, trend: 'up' },
      { id: 5, name: 'Precisione Passaggi', category: 'passing', value: '87%', rank: 6, percentile: 80, trend: 'neutral' },
      { id: 6, name: 'Contrasti Vinti', category: 'defense', value: 45, rank: 7, percentile: 78, trend: 'up' }
    ];
  }

  generateMockEventsData() {
    const events = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i * 15);
      const types = ['match', 'training', 'injury', 'transfer'];
      const type = types[Math.floor(Math.random() * types.length)];
      let title = '', description = '';
      switch (type) {
        case 'match':
          title = `Partita vs ${['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio'][Math.floor(Math.random() * 5)]}`;
          description = `Gol: ${Math.floor(Math.random() * 2)}, Assist: ${Math.floor(Math.random() * 2)}`;
          break;
        case 'training':
          title = `Allenamento ${['Tattico', 'Fisico', 'Tecnico'][Math.floor(Math.random() * 3)]}`;
          description = `Miglioramento: +${(Math.random() * 0.5).toFixed(1)} in ${['pace', 'shooting', 'passing'][Math.floor(Math.random() * 3)]}`;
          break;
        case 'injury':
          title = 'Infortunio';
          description = `${['Lieve', 'Moderato', 'Grave'][Math.floor(Math.random() * 3)]} - ${Math.floor(Math.random() * 14) + 1} giorni di recupero`;
          break;
        case 'transfer':
          title = 'Trasferimento';
          description = `Trasferito da ${['Juventus', 'Inter', 'Roma'][Math.floor(Math.random() * 3)]}`;
          break;
      }
      events.push({ id: i + 1, type, title, description, date: date.toISOString(), importance: Math.floor(Math.random() * 10) + 1 });
    }
    return events;
  }

  updateAttributeProgressChart(data) {
    const chart = document.querySelector('.attribute-progress-chart');
    chart?.attributeProgressChart?.updateData(data);
  }

  updateStatisticsTable(data) {
    const table = document.querySelector('.statistics-table');
    table?.statisticsTable?.updateStats(data);
  }

  updateEventTimeline(data) {
    const timeline = document.querySelector('.event-timeline');
    if (timeline?.historyTimeline) {
      timeline.historyTimeline.setEvents(data);
    }
  }

  handleEventClick(event) {
    console.log('Event clicked:', event);
    this.showToast(`Evento selezionato: ${event.title}`, 'info');
  }

  bindEvents() {
    document.querySelector('.player-selector-dropdown')?.addEventListener('playerSelected', (e) => {
      if (e.detail?.player) this.loadPlayerHistory(e.detail.player.id);
    });

    document.querySelector('.time-range-filter')?.addEventListener('rangeChange', (e) => {
      if (e.detail) console.log('Time range changed:', e.detail);
    });

    document.querySelector('.export-history-btn')?.addEventListener('click', () => this.exportPlayerHistory());
  }

  exportPlayerHistory() {
    this.showSuccess('Storico giocatore esportato con successo');
  }

  showLoading(show) {
    document.querySelectorAll('.attribute-progress-chart, .statistics-table, .event-timeline').forEach(chart => {
      chart?.showLoading?.(show);
    });
  }

  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'error' } }));
  }

  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type: 'success' } }));
  }

  showToast(message, type = 'info') {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type } }));
  }
}

// Bootstrap automatico
document.addEventListener('DOMContentLoaded', () => {
  new PlayerHistoryPage();
});

</script>