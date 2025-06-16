<div class="time-range-filter">
  <div class="filter-header">
    <h4 class="filter-title">Intervallo Temporale</h4>
    <div class="filter-actions">
      <button class="action-btn reset-btn" aria-label="Reimposta intervallo">
        ↻ Reset
      </button>
    </div>
  </div>
  
  <div class="range-options">
    <div class="range-tabs">
      <button class="range-tab active" data-range="week" aria-pressed="true">
        Settimana
      </button>
      <button class="range-tab" data-range="month" aria-pressed="false">
        Mese
      </button>
      <button class="range-tab" data-range="season" aria-pressed="false">
        Stagione
      </button>
      <button class="range-tab" data-range="custom" aria-pressed="false">
        Personalizzato
      </button>
    </div>
    
    <div class="custom-range" style="display: none;">
      <div class="date-inputs">
        <div class="date-field">
          <label for="startDate" class="date-label">Data Inizio</label>
          <input type="date" id="startDate" class="date-input" aria-label="Data inizio">
        </div>
        <div class="date-field">
          <label for="endDate" class="date-label">Data Fine</label>
          <input type="date" id="endDate" class="date-input" aria-label="Data fine">
        </div>
      </div>
      <button class="apply-custom-btn button button-primary" aria-label="Applica intervallo personalizzato">
        Applica
      </button>
    </div>
  </div>
  
  <div class="current-range">
    <div class="range-display">
      <span class="range-label">Intervallo Corrente:</span>
      <span class="range-value"></span>
    </div>
    <div class="range-stats">
      <div class="stat-item">
        <span class="stat-value days-count">0</span>
        <span class="stat-label">Giorni</span>
      </div>
      <div class="stat-item">
        <span class="stat-value events-count">0</span>
        <span class="stat-label">Eventi</span>
      </div>
    </div>
  </div>
</div>

<style>
.time-range-filter {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filter-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.filter-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.range-options {
  margin-bottom: 16px;
}

.range-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.range-tab {
  flex: 1;
  padding: 8px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.range-tab:hover {
  background: rgba(37, 99, 235, 0.1);
  border-color: var(--primary);
}

.range-tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.custom-range {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
}

.date-inputs {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.date-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-label {
  font-size: 12px;
  color: var(--text);
  font-weight: 500;
}

.date-input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 13px;
}

.apply-custom-btn {
  width: 100%;
  padding: 8px;
  font-size: 12px;
}

.current-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
}

.range-display {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.range-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
}

.range-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.range-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 768px) {
  .range-tabs {
    flex-wrap: wrap;
  }
  
  .range-tab {
    min-width: calc(50% - 4px);
  }
  
  .date-inputs {
    flex-direction: column;
  }
  
  .current-range {
    flex-direction: column;
    gap: 12px;
  }
  
  .range-display {
    align-items: center;
  }
}
</style>

<script>
class TimeRangeFilter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onChange: null,
      defaultRange: 'week',
      ...options
    };
    
    this.currentRange = this.options.defaultRange;
    this.customStartDate = null;
    this.customEndDate = null;
    this.eventsCount = 0;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setRange(this.currentRange);
  }
  
  bindEvents() {
    // Range tabs
    this.element.querySelectorAll('.range-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const range = e.target.dataset.range;
        this.setRange(range);
      });
    });
    
    // Reset button
    this.element.querySelector('.reset-btn').addEventListener('click', () => {
      this.resetRange();
    });
    
    // Apply custom range button
    this.element.querySelector('.apply-custom-btn').addEventListener('click', () => {
      this.applyCustomRange();
    });
    
    // Date inputs
    this.element.querySelector('#startDate').addEventListener('change', (e) => {
      this.customStartDate = e.target.value;
    });
    
    this.element.querySelector('#endDate').addEventListener('change', (e) => {
      this.customEndDate = e.target.value;
    });
  }
  
  setRange(range) {
    this.currentRange = range;
    
    // Update tabs
    this.element.querySelectorAll('.range-tab').forEach(tab => {
      const isActive = tab.dataset.range === range;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-pressed', isActive);
    });
    
    // Show/hide custom range inputs
    this.element.querySelector('.custom-range').style.display = range === 'custom' ? 'block' : 'none';
    
    // Calculate date range
    const { startDate, endDate } = this.calculateDateRange(range);
    
    // Update range display
    this.updateRangeDisplay(startDate, endDate);
    
    // Call onChange callback if provided
    if (typeof this.options.onChange === 'function') {
      this.options.onChange(range, startDate, endDate);
    }
    
    // Dispatch range change event
    this.element.dispatchEvent(new CustomEvent('rangeChange', {
      detail: { 
        range,
        startDate,
        endDate
      }
    }));
  }
  
  calculateDateRange(range) {
    const today = new Date();
    let startDate, endDate;
    
    switch (range) {
      case 'week':
        // Last 7 days
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
        break;
      
      case 'month':
        // Last 30 days
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        endDate = today;
        break;
      
      case 'season':
        // Current season (assuming season starts in August)
        startDate = new Date(today.getFullYear(), 7, 1); // August 1st
        if (today < startDate) {
          startDate.setFullYear(startDate.getFullYear() - 1);
        }
        endDate = today;
        break;
      
      case 'custom':
        // Custom date range
        if (this.customStartDate && this.customEndDate) {
          startDate = new Date(this.customStartDate);
          endDate = new Date(this.customEndDate);
        } else {
          // Default to last 7 days if no custom dates set
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          endDate = today;
        }
        break;
      
      default:
        // Default to last 7 days
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
    }
    
    return { startDate, endDate };
  }
  
  updateRangeDisplay(startDate, endDate) {
    const rangeValue = this.element.querySelector('.range-value');
    const daysCount = this.element.querySelector('.days-count');
    
    // Format dates
    const formattedStart = this.formatDate(startDate);
    const formattedEnd = this.formatDate(endDate);
    
    // Calculate days difference
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    rangeValue.textContent = `${formattedStart} - ${formattedEnd}`;
    daysCount.textContent = diffDays;
  }
  
  formatDate(date) {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  resetRange() {
    // Reset to default range
    this.setRange(this.options.defaultRange);
    
    // Clear custom dates
    this.customStartDate = null;
    this.customEndDate = null;
    this.element.querySelector('#startDate').value = '';
    this.element.querySelector('#endDate').value = '';
  }
  
  applyCustomRange() {
    const startDate = this.element.querySelector('#startDate').value;
    const endDate = this.element.querySelector('#endDate').value;
    
    if (!startDate || !endDate) {
      this.showError('Seleziona entrambe le date');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      this.showError('La data di inizio deve essere precedente alla data di fine');
      return;
    }
    
    this.customStartDate = startDate;
    this.customEndDate = endDate;
    this.setRange('custom');
  }
  
  showError(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'error' }
    }));
  }
  
  // Public methods
  getCurrentRange() {
    return {
      type: this.currentRange,
      ...this.calculateDateRange(this.currentRange)
    };
  }
  
  setEventsCount(count) {
    this.eventsCount = count;
    this.element.querySelector('.events-count').textContent = count;
  }
  
  setCustomDateRange(startDate, endDate) {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return;
    
    this.customStartDate = startDate;
    this.customEndDate = endDate;
    
    // Update input fields
    this.element.querySelector('#startDate').value = this.formatInputDate(start);
    this.element.querySelector('#endDate').value = this.formatInputDate(end);
    
    this.setRange('custom');
  }
  
  formatInputDate(date) {
    return date.toISOString().split('T')[0];
  }
}

// Auto-initialize time range filters
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.time-range-filter').forEach(filter => {
    if (!filter.dataset.initialized) {
      const options = JSON.parse(filter.dataset.options || '{}');
      new TimeRangeFilter(filter, options);
      filter.dataset.initialized = 'true';
    }
  });
});
</script>