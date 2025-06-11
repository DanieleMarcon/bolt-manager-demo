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

<script>
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

async function initializePage() {
  try {
    // Initialize components
    initializeComponents();
    
    // Load initial data
    await loadInitialData();
    
    // Bind events
    bindEvents();
    
    console.log('Player History page initialized');
  } catch (error) {
    console.error('Error initializing Player History page:', error);
    showError('Errore durante l\'inizializzazione della pagina');
  }
}

function initializeComponents() {
  // Player selector
  const playerSelectorContainer = document.querySelector('.player-selector-dropdown');
  const playerSelector = document.createElement('div');
  playerSelector.className = 'player-selector-dropdown';
  playerSelector.dataset.options = JSON.stringify({
    label: 'Seleziona Giocatore',
    showPreview: true
  });
  playerSelectorContainer.appendChild(playerSelector);
  
  // Time range filter
  const timeRangeContainer = document.querySelector('.time-range-filter-container');
  const timeRangeFilter = document.createElement('div');
  timeRangeFilter.className = 'time-range-filter';
  timeRangeContainer.appendChild(timeRangeFilter);
  
  // Attribute progress chart
  const attributeProgressContainer = document.querySelector('.attribute-progress-chart-container');
  const attributeProgressChart = document.createElement('div');
  attributeProgressChart.className = 'attribute-progress-chart';
  attributeProgressContainer.appendChild(attributeProgressChart);
  
  // Statistics table
  const statisticsTableContainer = document.querySelector('.statistics-table-container');
  const statisticsTable = document.createElement('div');
  statisticsTable.className = 'statistics-table';
  statisticsTableContainer.appendChild(statisticsTable);
  
  // Event timeline
  const eventTimelineContainer = document.querySelector('.event-timeline-container');
  const eventTimeline = document.createElement('div');
  eventTimeline.className = 'event-timeline';
  eventTimelineContainer.appendChild(eventTimeline);
  
  // Comparison tool
  const comparisonToolContainer = document.querySelector('.comparison-tool-container');
  const comparisonTool = document.createElement('div');
  comparisonTool.className = 'comparison-tool';
  comparisonToolContainer.appendChild(comparisonTool);
  
  // Sponsor banner
  const sponsorBannerContainer = document.querySelector('.sponsor-banner-container');
  const sponsorBanner = document.createElement('div');
  sponsorBanner.className = 'sponsor-banner';
  sponsorBannerContainer.appendChild(sponsorBanner);
}

async function loadInitialData() {
  try {
    // Load players for selector
    const players = await fetchPlayers();
    updatePlayerSelector(players);
    
    // If we have players, load the first one's data
    if (players && players.length > 0) {
      await loadPlayerHistory(players[0].id);
    }
  } catch (error) {
    console.error('Error loading initial data:', error);
    showError('Errore nel caricamento dei dati');
  }
}

async function fetchPlayers() {
  // In a real app, this would call the backend API
  // For now, return mock data
  return [
    { id: 1, name: 'Mario Rossi', position: 'FW', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' },
    { id: 2, name: 'Luigi Bianchi', position: 'MF', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' },
    { id: 3, name: 'Giuseppe Verdi', position: 'DF', photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120' }
  ];
}

function updatePlayerSelector(players) {
  const playerSelector = document.querySelector('.player-selector-dropdown');
  if (playerSelector && playerSelector.playerSelectorDropdown) {
    playerSelector.playerSelectorDropdown.setPlayers(players);
  }
}

async function loadPlayerHistory(playerId) {
  try {
    // Show loading state
    showLoading(true);
    
    // In a real app, this would call the Report_CompileHistory flow
    // For now, we'll use mock data
    const historyData = await fetchPlayerHistory(playerId);
    
    // Update components with data
    updateAttributeProgressChart(historyData.attributes);
    updateStatisticsTable(historyData.statistics);
    updateEventTimeline(historyData.events);
    
    // Hide loading state
    showLoading(false);
  } catch (error) {
    console.error('Error loading player history:', error);
    showError('Errore nel caricamento dello storico giocatore');
    showLoading(false);
  }
}

async function fetchPlayerHistory(playerId) {
  // In a real app, this would call the Report_CompileHistory flow
  // For now, return mock data
  return {
    attributes: generateMockAttributeData(),
    statistics: generateMockStatisticsData(),
    events: generateMockEventsData()
  };
}

function generateMockAttributeData() {
  // Generate mock attribute progress data
  const attributes = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
  const data = [];
  
  // Generate data points for the last 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    const entry = {
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime()
    };
    
    // Generate attribute values with some progression
    attributes.forEach(attr => {
      const baseValue = 60 + Math.random() * 20; // Base 60-80
      const progression = i * 0.5; // Older entries have lower values
      const noise = (Math.random() - 0.5) * 2; // Small random variations
      entry[attr] = Math.round(Math.max(1, Math.min(99, baseValue - progression + noise)));
    });
    
    data.push(entry);
  }
  
  // Sort by date (oldest first)
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function generateMockStatisticsData() {
  // Generate mock statistics data
  return [
    { id: 1, name: 'Gol Segnati', category: 'attack', value: 12, rank: 3, percentile: 92, trend: 'up' },
    { id: 2, name: 'Assist', category: 'attack', value: 8, rank: 5, percentile: 85, trend: 'up' },
    { id: 3, name: 'Minuti Giocati', category: 'general', value: 1245, rank: 2, percentile: 95, trend: 'neutral' },
    { id: 4, name: 'Passaggi Completati', category: 'passing', value: 342, rank: 4, percentile: 88, trend: 'up' },
    { id: 5, name: 'Precisione Passaggi', category: 'passing', value: '87%', rank: 6, percentile: 80, trend: 'neutral' },
    { id: 6, name: 'Contrasti Vinti', category: 'defense', value: 45, rank: 7, percentile: 78, trend: 'up' }
  ];
}

function generateMockEventsData() {
  // Generate mock events data
  const events = [];
  const today = new Date();
  
  // Generate sample events
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 15); // One event every 15 days
    
    const eventTypes = ['match', 'training', 'injury', 'transfer'];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    let eventTitle = '';
    let eventContent = '';
    
    switch (eventType) {
      case 'match':
        eventTitle = `Partita vs ${['Juventus', 'Inter', 'Roma', 'Napoli', 'Lazio'][Math.floor(Math.random() * 5)]}`;
        eventContent = `Gol: ${Math.floor(Math.random() * 2)}, Assist: ${Math.floor(Math.random() * 2)}`;
        break;
      case 'training':
        eventTitle = `Allenamento ${['Tattico', 'Fisico', 'Tecnico'][Math.floor(Math.random() * 3)]}`;
        eventContent = `Miglioramento: +${(Math.random() * 0.5).toFixed(1)} in ${['pace', 'shooting', 'passing'][Math.floor(Math.random() * 3)]}`;
        break;
      case 'injury':
        eventTitle = 'Infortunio';
        eventContent = `${['Lieve', 'Moderato', 'Grave'][Math.floor(Math.random() * 3)]} - ${Math.floor(Math.random() * 14) + 1} giorni di recupero`;
        break;
      case 'transfer':
        eventTitle = 'Trasferimento';
        eventContent = `Trasferito da ${['Juventus', 'Inter', 'Roma'][Math.floor(Math.random() * 3)]}`;
        break;
    }
    
    events.push({
      id: i + 1,
      type: eventType,
      title: eventTitle,
      content: eventContent,
      date: date.toISOString(),
      importance: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return events;
}

function updateAttributeProgressChart(data) {
  const chart = document.querySelector('.attribute-progress-chart');
  if (chart && chart.attributeProgressChart) {
    chart.attributeProgressChart.updateData(data);
  }
}

function updateStatisticsTable(data) {
  const table = document.querySelector('.statistics-table');
  if (table && table.statisticsTable) {
    table.statisticsTable.updateStats(data);
  }
}

function updateEventTimeline(data) {
  const timeline = document.querySelector('.event-timeline');
  if (timeline && timeline.eventTimeline) {
    timeline.eventTimeline.setEvents(data);
  }
}

function bindEvents() {
  // Player selector change
  document.querySelector('.player-selector-dropdown').addEventListener('playerSelected', (e) => {
    if (e.detail && e.detail.player) {
      loadPlayerHistory(e.detail.player.id);
    }
  });
  
  // Time range filter change
  document.querySelector('.time-range-filter').addEventListener('rangeChange', (e) => {
    if (e.detail) {
      // In a real app, this would reload data with the new time range
      console.log('Time range changed:', e.detail);
    }
  });
  
  // Export button
  document.querySelector('.export-history-btn').addEventListener('click', () => {
    exportPlayerHistory();
  });
}

function exportPlayerHistory() {
  // In a real app, this would export the player history data
  showSuccess('Storico giocatore esportato con successo');
}

function showLoading(show) {
  // In a real app, this would show/hide loading indicators
  const charts = document.querySelectorAll('.attribute-progress-chart, .statistics-table, .event-timeline');
  charts.forEach(chart => {
    if (chart.showLoading) {
      chart.showLoading(show);
    }
  });
}

function showError(message) {
  // Show error toast
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message, type: 'error' }
  }));
}

function showSuccess(message) {
  // Show success toast
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message, type: 'success' }
  }));
}
</script>