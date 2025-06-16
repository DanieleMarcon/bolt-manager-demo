import StaffCard from '../components/StaffCard.js';
import StaffList from '../components/StaffList.js';
import CompetencyChart from '../components/CompetencyChart.js';

export default class StaffManagementPage {
  constructor() {
    this.container = document.getElementById('pageContent');
    this.staffMembers = [];
    this.selectedStaff = null;
    this.currentView = 'grid'; // 'grid' or 'list'
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="staff-management-page">
        <div class="page-header">
          <h2 class="page-title">Gestione Staff</h2>
          <div class="page-actions">
            <button class="button button-secondary export-btn">📊 Esporta Report</button>
            <button class="button button-primary hire-staff-btn">👥 Assumi Staff</button>
          </div>
        </div>

        <!-- Staff Overview Section -->
        <div class="staff-overview-section">
          <div id="staffOverview" class="staff-overview-card"></div>
        </div>

        <!-- View Controls -->
        <div class="view-controls">
          <div class="view-toggle">
            <button class="view-btn ${this.currentView === 'grid' ? 'active' : ''}" data-view="grid">
              📋 Griglia
            </button>
            <button class="view-btn ${this.currentView === 'list' ? 'active' : ''}" data-view="list">
              📝 Lista
            </button>
          </div>
          
          <div class="staff-filters">
            <select class="category-filter">
              <option value="">Tutte le categorie</option>
              <option value="technical">Staff Tecnico</option>
              <option value="medical">Staff Medico</option>
              <option value="scouting">Osservatori</option>
            </select>
            
            <select class="rating-filter">
              <option value="">Tutti i rating</option>
              <option value="80+">80+ Eccellente</option>
              <option value="70-79">70-79 Buono</option>
              <option value="60-69">60-69 Medio</option>
            </select>
          </div>
        </div>

        <!-- Staff Content -->
        <div class="staff-content">
          <div class="staff-main">
            <!-- Staff Grid View -->
            <div class="staff-grid-view ${this.currentView === 'grid' ? 'active' : 'hidden'}" id="staffGridView">
              <div class="staff-grid" id="staffGrid">
                <!-- Staff cards will be rendered here -->
              </div>
            </div>
            
            <!-- Staff List View -->
            <div class="staff-list-view ${this.currentView === 'list' ? 'active' : 'hidden'}" id="staffListView">
              <!-- Staff list will be rendered here -->
            </div>
          </div>
          
          <div class="staff-sidebar">
            <!-- Selected Staff Details -->
            <div class="staff-details-panel" id="staffDetailsPanel">
              <h4>Seleziona un membro dello staff</h4>
              <p>Clicca su un membro dello staff per visualizzare i dettagli e le competenze.</p>
            </div>
            
            <!-- Competency Chart -->
            <div class="competency-chart-panel" id="competencyChartPanel">
              <!-- Chart will be rendered here when staff is selected -->
            </div>
          </div>
        </div>

        <!-- Performance Tracking Section -->
        <div class="performance-tracking-section">
          <h3 class="section-title">Performance Staff</h3>
          <div id="performanceChart" class="performance-chart-container"></div>
        </div>

        <!-- Sponsor Banner -->
        <div id="sponsorBanner" class="sponsor-banner"></div>
      </div>
    `;
    this.initComponents();
  }

  initComponents() {
    this.loadStaffData();
    this.renderStaffOverview();
    this.renderStaffContent();
    this.renderPerformanceChart();
    this.renderSponsorBanner();
    this.bindEvents();
  }

  loadStaffData() {
    this.staffMembers = this.getMockStaffData();
  }

  renderStaffOverview() {
    const container = document.getElementById('staffOverview');
    
    const totalStaff = this.staffMembers.length;
    const averageRating = this.getAverageRating();
    const totalSalary = this.getTotalSalary();
    
    container.innerHTML = `
      <div class="overview-stats">
        <div class="stat-item">
          <span class="stat-value">${totalStaff}</span>
          <span class="stat-label">Membri Staff</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${averageRating}</span>
          <span class="stat-label">Rating Medio</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">€${totalSalary.toLocaleString()}</span>
          <span class="stat-label">Costo Totale</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${this.getStaffByCategory('technical').length}</span>
          <span class="stat-label">Staff Tecnico</span>
        </div>
      </div>
    `;
  }

  renderStaffContent() {
    if (this.currentView === 'grid') {
      this.renderStaffGrid();
    } else {
      this.renderStaffList();
    }
  }

  renderStaffGrid() {
    const container = document.getElementById('staffGrid');
    container.innerHTML = '';
    
    this.staffMembers.forEach(staff => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'staff-card-container';
      container.appendChild(cardContainer);
      
      new StaffCard(cardContainer, {
        staff: staff,
        onClick: (staff) => this.handleStaffClick(staff),
        onAction: (action, staff) => this.handleStaffAction(action, staff)
      });
    });
  }

  renderStaffList() {
    const container = document.getElementById('staffListView');
    container.innerHTML = '';
    
    const listContainer = document.createElement('div');
    listContainer.className = 'staff-list-container';
    container.appendChild(listContainer);
    
    new StaffList(listContainer, {
      staffMembers: this.staffMembers,
      onStaffClick: (staff) => this.handleStaffClick(staff),
      onStaffAction: (action, staff) => this.handleStaffAction(action, staff)
    });
  }

  renderStaffDetails(staff) {
    const container = document.getElementById('staffDetailsPanel');
    
    container.innerHTML = `
      <div class="staff-details">
        <div class="staff-header">
          <img src="${staff.photo}" alt="${staff.name}" class="staff-photo-large">
          <div class="staff-info">
            <h4 class="staff-name">${staff.name}</h4>
            <span class="staff-role">${staff.role}</span>
            <span class="staff-rating">Rating: ${staff.rating}</span>
          </div>
        </div>
        
        <div class="staff-attributes">
          <h5>Competenze</h5>
          ${this.renderAttributesList(staff.attributes)}
        </div>
        
        <div class="staff-contract-details">
          <h5>Contratto</h5>
          <div class="contract-item">
            <span>Scadenza:</span>
            <span>${this.formatDate(staff.contract?.expiry)}</span>
          </div>
          <div class="contract-item">
            <span>Stipendio:</span>
            <span>€${staff.salary?.toLocaleString()}/anno</span>
          </div>
        </div>
        
        <div class="staff-specialties-details">
          <h5>Specialità</h5>
          <div class="specialties-list">
            ${staff.specialties?.map(s => `<span class="specialty-badge">${s}</span>`).join('') || 'Nessuna'}
          </div>
        </div>
        
        <div class="staff-actions-panel">
          <button class="button button-secondary" onclick="this.handleStaffAction('contract', staff)">
            📄 Visualizza Contratto
          </button>
          <button class="button button-primary" onclick="this.handleStaffAction('assign', staff)">
            ⚙️ Assegna Ruolo
          </button>
        </div>
      </div>
    `;
  }

  renderCompetencyChart(staff) {
    const container = document.getElementById('competencyChartPanel');
    container.innerHTML = '';
    
    if (staff && staff.attributes) {
      const chartContainer = document.createElement('div');
      chartContainer.className = 'competency-chart-container';
      container.appendChild(chartContainer);
      
      new CompetencyChart(chartContainer, {
        competencies: staff.attributes,
        staffName: staff.name,
        size: 250
      });
    }
  }

  renderAttributesList(attributes) {
    if (!attributes) return '<p>Nessun attributo disponibile</p>';
    
    return Object.entries(attributes).map(([key, value]) => `
      <div class="attribute-item">
        <span class="attribute-name">${this.getAttributeLabel(key)}</span>
        <div class="attribute-bar">
          <div class="attribute-fill" style="width: ${value}%"></div>
        </div>
        <span class="attribute-value">${value}</span>
      </div>
    `).join('');
  }

  renderPerformanceChart() {
    const container = document.getElementById('performanceChart');
    
    container.innerHTML = `
      <div class="performance-chart">
        <h4>Performance Staff negli ultimi 6 mesi</h4>
        <div class="chart-placeholder">
          <p>Grafico performance staff - Implementazione futura</p>
          <div class="mock-chart">
            <div class="chart-bar" style="height: 60%"></div>
            <div class="chart-bar" style="height: 75%"></div>
            <div class="chart-bar" style="height: 80%"></div>
            <div class="chart-bar" style="height: 85%"></div>
            <div class="chart-bar" style="height: 90%"></div>
            <div class="chart-bar" style="height: 88%"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBanner');
    
    container.innerHTML = `
      <div class="sponsor-content">
        <img src="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=60" alt="Sponsor" class="sponsor-logo">
        <span class="sponsor-text">SportTech Pro - Soluzioni tecnologiche per lo staff tecnico</span>
      </div>
    `;
  }

  bindEvents() {
    // View toggle
    const viewBtns = this.container.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    // Filters
    const categoryFilter = this.container.querySelector('.category-filter');
    const ratingFilter = this.container.querySelector('.rating-filter');
    
    categoryFilter?.addEventListener('change', () => this.applyFilters());
    ratingFilter?.addEventListener('change', () => this.applyFilters());

    // Action buttons
    const exportBtn = this.container.querySelector('.export-btn');
    const hireStaffBtn = this.container.querySelector('.hire-staff-btn');
    
    exportBtn?.addEventListener('click', () => this.exportStaffReport());
    hireStaffBtn?.addEventListener('click', () => this.showHireStaffModal());
  }

  switchView(view) {
    this.currentView = view;
    
    // Update view buttons
    const viewBtns = this.container.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update view containers
    const gridView = this.container.querySelector('.staff-grid-view');
    const listView = this.container.querySelector('.staff-list-view');
    
    gridView.classList.toggle('active', view === 'grid');
    gridView.classList.toggle('hidden', view !== 'grid');
    listView.classList.toggle('active', view === 'list');
    listView.classList.toggle('hidden', view !== 'list');
    
    // Re-render content
    this.renderStaffContent();
  }

  handleStaffClick(staff) {
    this.selectedStaff = staff;
    this.renderStaffDetails(staff);
    this.renderCompetencyChart(staff);
  }

  handleStaffAction(action, staff) {
    switch (action) {
      case 'details':
        this.handleStaffClick(staff);
        break;
      case 'contract':
        this.showContractDetails(staff);
        break;
      case 'assign':
        this.showAssignRoleModal(staff);
        break;
      default:
        console.log(`Action ${action} for staff ${staff.name}`);
    }
  }

  showContractDetails(staff) {
    this.showToast(`Visualizzazione contratto di ${staff.name}`, 'info');
  }

  showAssignRoleModal(staff) {
    this.showToast(`Assegnazione ruolo per ${staff.name}`, 'info');
  }

  showHireStaffModal() {
    this.showToast('Apertura pannello assunzioni staff', 'info');
  }

  exportStaffReport() {
    this.showToast('Esportazione report staff completata', 'success');
  }

  applyFilters() {
    const categoryFilter = this.container.querySelector('.category-filter').value;
    const ratingFilter = this.container.querySelector('.rating-filter').value;
    
    // Apply filters logic here
    console.log('Applying filters:', { categoryFilter, ratingFilter });
    
    // Re-render content with filtered data
    this.renderStaffContent();
  }

  getMockStaffData() {
    return [
      {
        id: 1,
        name: 'Marco Rossi',
        role: 'Allenatore',
        category: 'technical',
        rating: 85,
        salary: 120000,
        contract: {
          expiry: '2026-06-30'
        },
        attributes: {
          coaching: 85,
          fitness: 70,
          tactical: 90,
          mental: 80,
          medical: 50,
          scouting: 60
        },
        specialties: ['Tattica', 'Giovani'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        role: 'Preparatore Atletico',
        category: 'medical',
        rating: 78,
        salary: 90000,
        contract: {
          expiry: '2025-06-30'
        },
        attributes: {
          coaching: 65,
          fitness: 95,
          tactical: 60,
          mental: 70,
          medical: 85,
          scouting: 50
        },
        specialties: ['Recupero Infortuni', 'Preparazione Fisica'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        role: 'Osservatore',
        category: 'scouting',
        rating: 82,
        salary: 80000,
        contract: {
          expiry: '2025-12-31'
        },
        attributes: {
          coaching: 55,
          fitness: 50,
          tactical: 70,
          mental: 75,
          medical: 40,
          scouting: 90
        },
        specialties: ['Talenti Internazionali', 'Giovani Promesse'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'
      }
    ];
  }

  getAverageRating() {
    if (this.staffMembers.length === 0) return 0;
    const total = this.staffMembers.reduce((sum, staff) => sum + staff.rating, 0);
    return (total / this.staffMembers.length).toFixed(1);
  }

  getTotalSalary() {
    return this.staffMembers.reduce((sum, staff) => sum + (staff.salary || 0), 0);
  }

  getStaffByCategory(category) {
    return this.staffMembers.filter(staff => staff.category === category);
  }

  getAttributeLabel(key) {
    const labels = {
      coaching: 'Coaching',
      fitness: 'Fitness',
      tactical: 'Tattico',
      mental: 'Mentale',
      medical: 'Medico',
      scouting: 'Scouting'
    };
    return labels[key] || key;
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}