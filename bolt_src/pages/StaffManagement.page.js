<div class="staff-management-page">
  <div class="page-header">
    <h2 class="page-title">Gestione Staff</h2>
    <div class="page-actions">
      <button class="button button-primary hire-staff-btn">
        👥 Assumi Nuovo Staff
      </button>
    </div>
  </div>

  <!-- Staff Overview Section -->
  <div class="staff-overview-section">
    <div id="staffOverviewContainer"></div>
  </div>

  <!-- Staff Categories Tabs -->
  <div class="staff-categories">
    <div class="tabs">
      <button class="tab active" data-category="all">Tutti</button>
      <button class="tab" data-category="technical">Staff Tecnico</button>
      <button class="tab" data-category="medical">Staff Medico</button>
      <button class="tab" data-category="scouting">Osservatori</button>
    </div>
  </div>

  <!-- Staff Members Grid -->
  <div class="staff-members-section">
    <div class="section-header">
      <h3 class="section-title">Membri Staff</h3>
      <div class="section-controls">
        <select class="sort-select" aria-label="Ordina staff">
          <option value="name">Nome</option>
          <option value="rating">Rating</option>
          <option value="role">Ruolo</option>
          <option value="salary">Stipendio</option>
        </select>
        <button class="button button-ghost filter-btn">
          🔍 Filtri
        </button>
      </div>
    </div>
    
    <div class="staff-grid" id="staffMembersContainer">
      <!-- Staff members will be rendered here -->
    </div>
  </div>

  <!-- Staff Performance Section -->
  <div class="staff-performance-section">
    <div class="section-header">
      <h3 class="section-title">Performance Staff</h3>
      <div class="section-controls">
        <select class="time-range-select" aria-label="Periodo analisi">
          <option value="30">Ultimo mese</option>
          <option value="90">Ultimi 3 mesi</option>
          <option value="180">Ultimi 6 mesi</option>
          <option value="365">Ultimo anno</option>
        </select>
      </div>
    </div>
    
    <div class="performance-charts">
      <div class="chart-container" id="competencyRadarContainer"></div>
      <div class="chart-container" id="performanceChartContainer"></div>
    </div>
  </div>

  <!-- Staff Details Section (initially hidden) -->
  <div class="staff-details-section" id="staffDetailsSection" style="display: none;">
    <div class="section-header">
      <h3 class="section-title">Dettagli Membro Staff</h3>
      <button class="button button-ghost back-btn">
        ← Indietro
      </button>
    </div>
    
    <div id="contractDetailsContainer"></div>
  </div>

  <!-- Modal Containers -->
  <div id="hireStaffModalContainer"></div>

  <!-- Sponsor Banner -->
  <div id="sponsorBannerContainer" class="sponsor-banner-container"></div>
</div>

<style>
.staff-management-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  margin: 0;
  color: var(--text);
}

.page-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.section-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  background: var(--background);
  padding: 4px;
  border-radius: 8px;
}

.tab {
  flex: 1;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.tab.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tab:hover:not(.active) {
  color: var(--text);
  background: rgba(255,255,255,0.5);
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 16px;
}

.performance-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-container {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  min-height: 300px;
}

.sort-select, .time-range-select {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  font-size: 12px;
  cursor: pointer;
}

.sponsor-banner-container {
  margin-top: 24px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .staff-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .performance-charts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .page-actions {
    width: 100%;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .section-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .tabs {
    flex-wrap: wrap;
  }
  
  .tab {
    min-width: calc(50% - 4px);
  }
  
  .staff-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<script type="module">
export default class StaffManagementPage {
  constructor() {
    this.staffMembers = [];
    this.selectedCategory = 'all';
    this.selectedStaffMember = null;
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadData();
    this.renderComponents();
  }

  bindEvents() {
    // Category tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.selectCategory(e.target.dataset.category);
      });
    });
    
    // Hire staff button
    document.querySelector('.hire-staff-btn')?.addEventListener('click', () => this.showHireStaffModal());
    
    // Filter button
    document.querySelector('.filter-btn')?.addEventListener('click', () => this.toggleFilters());
    
    // Sort select
    document.querySelector('.sort-select')?.addEventListener('change', (e) => {
      this.sortStaffMembers(e.target.value);
    });
    
    // Time range select
    document.querySelector('.time-range-select')?.addEventListener('change', (e) => {
      this.updateTimeRange(e.target.value);
    });
    
    // Back button
    document.querySelector('.back-btn')?.addEventListener('click', () => this.showStaffList());
    
    // Listen for events from components
    document.addEventListener('staffHired', (e) => this.handleStaffHired(e.detail));
    document.addEventListener('viewStaffDetails', (e) => this.handleViewStaffDetails(e.detail));
    document.addEventListener('assignStaffRole', (e) => this.handleAssignStaffRole(e.detail));
  }

  async loadData() {
    try {
      // In a real app, this would fetch from the game state or API
      this.staffMembers = await this.fetchStaffMembers();
      this.staffData = await this.fetchStaffData();
    } catch (error) {
      console.error('Error loading data:', error);
      this.showToast('Errore nel caricamento dei dati', 'error');
    }
  }

  async fetchStaffMembers() {
    // Mock data - in a real app this would come from game state
    return [
      {
        id: 1,
        name: 'Marco Rossi',
        role: 'Allenatore',
        category: 'technical',
        rating: 82,
        salary: 120000,
        contract: {
          expiry: '2026-06-30',
          salary: 120000
        },
        attributes: {
          coaching: 85,
          fitness: 70,
          tactical: 80,
          mental: 75,
          medical: 50,
          scouting: 60
        },
        specialties: ['Tattica', 'Giovani'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 2,
        name: 'Luigi Bianchi',
        role: 'Preparatore Atletico',
        category: 'medical',
        rating: 78,
        salary: 90000,
        contract: {
          expiry: '2025-06-30',
          salary: 90000
        },
        attributes: {
          coaching: 65,
          fitness: 85,
          tactical: 60,
          mental: 70,
          medical: 75,
          scouting: 50
        },
        specialties: ['Recupero Infortuni'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 3,
        name: 'Giuseppe Verdi',
        role: 'Osservatore',
        category: 'scouting',
        rating: 75,
        salary: 80000,
        contract: {
          expiry: '2025-06-30',
          salary: 80000
        },
        attributes: {
          coaching: 55,
          fitness: 50,
          tactical: 70,
          mental: 65,
          medical: 40,
          scouting: 85
        },
        specialties: ['Talenti Internazionali'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 4,
        name: 'Antonio Neri',
        role: 'Medico',
        category: 'medical',
        rating: 80,
        salary: 100000,
        contract: {
          expiry: '2026-06-30',
          salary: 100000
        },
        attributes: {
          coaching: 40,
          fitness: 75,
          tactical: 50,
          mental: 60,
          medical: 90,
          scouting: 45
        },
        specialties: ['Prevenzione Infortuni', 'Recupero Rapido'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      },
      {
        id: 5,
        name: 'Franco Blu',
        role: 'Vice Allenatore',
        category: 'technical',
        rating: 76,
        salary: 85000,
        contract: {
          expiry: '2025-06-30',
          salary: 85000
        },
        attributes: {
          coaching: 80,
          fitness: 65,
          tactical: 75,
          mental: 80,
          medical: 45,
          scouting: 55
        },
        specialties: ['Motivazione', 'Allenamento Giovani'],
        photo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120'
      }
    ];
  }

  async fetchStaffData() {
    // Mock data - in a real app this would come from game state
    return {
      totalStaff: 5,
      budget: 1000000,
      averageQuality: 78,
      technical: {
        current: 2,
        max: 4,
        quality: 79
      },
      medical: {
        current: 2,
        max: 3,
        quality: 79
      },
      scouting: {
        current: 1,
        max: 3,
        quality: 75
      },
      bonuses: [
        {
          name: 'Recupero Fisico',
          value: '+15%',
          type: 'fitness'
        },
        {
          name: 'Riduzione Infortuni',
          value: '+10%',
          type: 'injury'
        },
        {
          name: 'Efficacia Allenamento',
          value: '+12%',
          type: 'training'
        }
      ]
    };
  }

  renderComponents() {
    this.renderStaffOverview();
    this.renderStaffMembers();
    this.renderPerformanceCharts();
    this.renderHireStaffModal();
    this.renderSponsorBanner();
  }

  renderStaffOverview() {
    const container = document.getElementById('staffOverviewContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'staff-overview-card';
    container.appendChild(el);

    // Initialize StaffOverviewCard component
    new StaffOverviewCard(el, this.staffData);
  }

  renderStaffMembers() {
    const container = document.getElementById('staffMembersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filter staff members by category
    const filteredStaff = this.filterStaffByCategory(this.selectedCategory);
    
    // Render each staff member
    filteredStaff.forEach(staff => {
      const el = document.createElement('div');
      el.className = 'staff-member-card';
      container.appendChild(el);

      // Initialize StaffMemberCard component
      new StaffMemberCard(el, staff);
    });
    
    // Show empty state if no staff members
    if (filteredStaff.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <div class="empty-icon">👥</div>
        <h4>Nessun membro staff</h4>
        <p>Non ci sono membri dello staff in questa categoria</p>
      `;
      container.appendChild(emptyState);
    }
  }

  renderPerformanceCharts() {
    // Render competency radar chart
    const radarContainer = document.getElementById('competencyRadarContainer');
    if (radarContainer) {
      const el = document.createElement('div');
      el.className = 'competency-radar-chart';
      radarContainer.appendChild(el);

      // Initialize CompetencyRadarChart component
      new CompetencyRadarChart(el, {
        coaching: 80,
        fitness: 75,
        tactical: 75,
        mental: 70,
        medical: 65,
        scouting: 70,
        analysis: 65,
        youth: 60
      });
    }
    
    // Render performance chart
    const chartContainer = document.getElementById('performanceChartContainer');
    if (chartContainer) {
      const el = document.createElement('div');
      el.className = 'performance-chart';
      chartContainer.appendChild(el);

      // Initialize PerformanceChart component
      new PerformanceChart(el, {
        metric: 'rating',
        timeRange: 30
      });
    }
  }

  renderHireStaffModal() {
    const container = document.getElementById('hireStaffModalContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'hire-staff-modal modal';
    container.appendChild(el);

    // Initialize HireStaffModal component
    new HireStaffModal(el, {
      staffBudget: this.staffData.budget,
      onHire: (data) => this.handleStaffHired(data)
    });
  }

  renderContractDetails(staffMember) {
    const container = document.getElementById('contractDetailsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const el = document.createElement('div');
    el.className = 'contract-details-panel';
    container.appendChild(el);

    // Initialize ContractDetailsPanel component
    new ContractDetailsPanel(el, {
      name: staffMember.name,
      role: staffMember.role,
      contract: {
        expiry: staffMember.contract.expiry,
        salary: staffMember.contract.salary
      },
      player: {
        name: staffMember.name,
        photo: staffMember.photo
      },
      club: {
        name: 'AC Milan',
        logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60'
      },
      status: 'active',
      duration: 3,
      startDate: '2022-07-01',
      endDate: staffMember.contract.expiry,
      weeklyWage: Math.round(staffMember.contract.salary / 52),
      signingBonus: 0,
      clauses: [],
      history: [
        {
          date: '2022-07-01',
          description: 'Contratto firmato'
        }
      ]
    });
    
    // Show staff details section
    document.getElementById('staffDetailsSection').style.display = 'block';
    document.querySelector('.staff-members-section').style.display = 'none';
  }

  renderSponsorBanner() {
    const container = document.getElementById('sponsorBannerContainer');
    if (!container) return;
    
    const el = document.createElement('div');
    el.className = 'sponsor-banner';
    container.appendChild(el);

    // Initialize SponsorBanner component
    new SponsorBanner(el, {
      autoClose: true,
      duration: 10000,
      sponsorData: {
        name: 'SportTech Pro',
        description: 'Attrezzature sportive di alta qualità per professionisti e appassionati',
        logo: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        cta: 'Scopri di più',
        url: 'https://example.com/sponsor1',
        theme: 'premium'
      }
    });
  }

  filterStaffByCategory(category) {
    if (category === 'all') {
      return this.staffMembers;
    }
    
    return this.staffMembers.filter(staff => staff.category === category);
  }

  selectCategory(category) {
    this.selectedCategory = category;
    
    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });
    
    // Re-render staff members
    this.renderStaffMembers();
  }

  sortStaffMembers(sortBy) {
    this.staffMembers.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'role':
          return a.role.localeCompare(b.role);
        case 'salary':
          return b.salary - a.salary;
        default:
          return 0;
      }
    });
    
    // Re-render staff members
    this.renderStaffMembers();
  }

  updateTimeRange(days) {
    // Update performance chart time range
    const performanceChart = document.querySelector('.performance-chart');
    if (performanceChart && performanceChart.performanceChart) {
      performanceChart.performanceChart.setTimeRange(parseInt(days));
    }
  }

  showHireStaffModal() {
    // Show hire staff modal
    const modal = document.querySelector('.hire-staff-modal');
    if (modal && modal.hireStaffModal) {
      modal.hireStaffModal.show();
    } else {
      // Fallback if modal not found
      this.showToast('Apertura pannello assunzioni...', 'info');
    }
  }

  toggleFilters() {
    // Toggle filters visibility
    const filtersVisible = document.querySelector('.filters-panel')?.style.display !== 'none';
    
    if (filtersVisible) {
      document.querySelector('.filters-panel').style.display = 'none';
    } else {
      // Create filters panel if it doesn't exist
      if (!document.querySelector('.filters-panel')) {
        const filtersPanel = document.createElement('div');
        filtersPanel.className = 'filters-panel';
        filtersPanel.innerHTML = `
          <div class="filters-header">
            <h4>Filtri Avanzati</h4>
            <button class="close-filters-btn">✕</button>
          </div>
          <div class="filters-content">
            <div class="filter-group">
              <label>Rating Minimo</label>
              <input type="range" min="50" max="100" value="60" class="rating-filter">
              <span class="filter-value">60+</span>
            </div>
            <div class="filter-group">
              <label>Specialità</label>
              <select class="specialty-filter">
                <option value="">Tutte le specialità</option>
                <option value="Tattica">Tattica</option>
                <option value="Giovani">Giovani</option>
                <option value="Recupero Infortuni">Recupero Infortuni</option>
                <option value="Talenti Internazionali">Talenti Internazionali</option>
              </select>
            </div>
          </div>
          <div class="filters-actions">
            <button class="button button-ghost reset-filters-btn">Reset</button>
            <button class="button button-primary apply-filters-btn">Applica</button>
          </div>
        `;
        
        document.querySelector('.staff-members-section').appendChild(filtersPanel);
        
        // Bind events
        filtersPanel.querySelector('.close-filters-btn').addEventListener('click', () => {
          filtersPanel.style.display = 'none';
        });
        
        filtersPanel.querySelector('.apply-filters-btn').addEventListener('click', () => {
          this.applyFilters();
          filtersPanel.style.display = 'none';
        });
        
        filtersPanel.querySelector('.reset-filters-btn').addEventListener('click', () => {
          this.resetFilters();
        });
        
        filtersPanel.querySelector('.rating-filter').addEventListener('input', (e) => {
          filtersPanel.querySelector('.filter-value').textContent = `${e.target.value}+`;
        });
      }
      
      document.querySelector('.filters-panel').style.display = 'block';
    }
  }

  applyFilters() {
    const ratingFilter = parseInt(document.querySelector('.rating-filter').value);
    const specialtyFilter = document.querySelector('.specialty-filter').value;
    
    // Filter staff members
    const filteredStaff = this.staffMembers.filter(staff => {
      // Rating filter
      if (staff.rating < ratingFilter) {
        return false;
      }
      
      // Specialty filter
      if (specialtyFilter && !staff.specialties.includes(specialtyFilter)) {
        return false;
      }
      
      return true;
    });
    
    // Update staff members display
    const container = document.getElementById('staffMembersContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Render filtered staff members
    filteredStaff.forEach(staff => {
      const el = document.createElement('div');
      el.className = 'staff-member-card';
      container.appendChild(el);

      // Initialize StaffMemberCard component
      new StaffMemberCard(el, staff);
    });
    
    // Show empty state if no staff members
    if (filteredStaff.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <div class="empty-icon">👥</div>
        <h4>Nessun risultato</h4>
        <p>Nessun membro dello staff corrisponde ai filtri selezionati</p>
      `;
      container.appendChild(emptyState);
    }
    
    this.showToast(`Filtri applicati: ${filteredStaff.length} risultati`, 'success');
  }

  resetFilters() {
    // Reset filter inputs
    document.querySelector('.rating-filter').value = 60;
    document.querySelector('.filter-value').textContent = '60+';
    document.querySelector('.specialty-filter').value = '';
    
    // Re-render staff members
    this.renderStaffMembers();
    
    this.showToast('Filtri reimpostati', 'success');
  }

  showStaffList() {
    document.getElementById('staffDetailsSection').style.display = 'none';
    document.querySelector('.staff-members-section').style.display = 'block';
    this.selectedStaffMember = null;
  }

  async callStaffAssignRoleFlow(params) {
    try {
      // In a real app, this would call the actual flow
      console.log('Calling Staff_AssignRole flow with params:', params);
      
      // Mock successful response
      const result = {
        success: true,
        staff_id: params.staff_id,
        role_id: params.role_id,
        timestamp: new Date().toISOString()
      };
      
      return result;
    } catch (error) {
      console.error('Error in Staff_AssignRole flow:', error);
      this.showToast('Errore durante l\'assegnazione del ruolo', 'error');
      throw error;
    }
  }

  // Event handlers
  handleStaffHired(detail) {
    console.log('Staff hired:', detail);
    
    // Add new staff member to list
    this.staffMembers.push(detail.candidate);
    
    // Update staff data
    this.staffData.totalStaff++;
    this.staffData.budget -= detail.contract.totalCost;
    
    // Update category count
    const category = this.getCategoryFromRole(detail.candidate.role);
    if (this.staffData[category]) {
      this.staffData[category].current++;
    }
    
    // Re-render components
    this.renderStaffOverview();
    this.renderStaffMembers();
    
    this.showToast(`${detail.candidate.name} assunto con successo!`, 'success');
  }

  handleViewStaffDetails(detail) {
    console.log('View staff details:', detail);
    
    // Find staff member
    const staffMember = this.staffMembers.find(s => s.id === detail.staffId);
    if (!staffMember) return;
    
    this.selectedStaffMember = staffMember;
    
    // Render contract details
    this.renderContractDetails(staffMember);
  }

  handleAssignStaffRole(detail) {
    console.log('Assign staff role:', detail);
    
    // Find staff member
    const staffMember = this.staffMembers.find(s => s.id === detail.staffId);
    if (!staffMember) return;
    
    // Show role selection dialog
    const roles = ['Allenatore', 'Vice Allenatore', 'Preparatore Atletico', 'Osservatore', 'Medico', 'Analista'];
    const role = prompt(`Seleziona un ruolo per ${staffMember.name}:`, staffMember.role);
    
    if (role && roles.includes(role)) {
      // Call Staff_AssignRole flow
      this.callStaffAssignRoleFlow({
        staff_id: staffMember.id,
        role_id: roles.indexOf(role) + 1
      }).then(() => {
        // Update staff member role
        staffMember.role = role;
        
        // Update category if needed
        const newCategory = this.getCategoryFromRole(role);
        if (newCategory !== staffMember.category) {
          // Update category counts
          if (this.staffData[staffMember.category]) {
            this.staffData[staffMember.category].current--;
          }
          if (this.staffData[newCategory]) {
            this.staffData[newCategory].current++;
          }
          
          staffMember.category = newCategory;
        }
        
        // Re-render components
        this.renderStaffOverview();
        this.renderStaffMembers();
        
        this.showToast(`${staffMember.name} assegnato al ruolo di ${role}`, 'success');
      });
    }
  }

  getCategoryFromRole(role) {
    const technicalRoles = ['Allenatore', 'Vice Allenatore', 'Allenatore Portieri'];
    const medicalRoles = ['Medico', 'Preparatore Atletico', 'Fisioterapista'];
    const scoutingRoles = ['Osservatore', 'Capo Scout', 'Analista'];
    
    if (technicalRoles.includes(role)) return 'technical';
    if (medicalRoles.includes(role)) return 'medical';
    if (scoutingRoles.includes(role)) return 'scouting';
    
    return 'technical'; // Default
  }

  showToast(message, type = 'info') {
    // Dispatch event to show toast
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type }
    }));
  }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StaffManagementPage();
});
</script>