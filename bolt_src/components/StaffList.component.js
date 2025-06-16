/**
 * StaffList Component
 * 
 * Used in: StaffManagement.page.js
 * Purpose: Display list of staff members with filtering and sorting
 * Dataset: staff (collection of staff members)
 */

export default class StaffList {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.staffMembers = props.staffMembers || [];
    this.filters = props.filters || {};
    this.sortBy = props.sortBy || 'name';
    this.sortOrder = props.sortOrder || 'asc';
    this.onStaffClick = props.onStaffClick || (() => {});
    this.onStaffAction = props.onStaffAction || (() => {});
    
    this.filteredStaff = [...this.staffMembers];
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="staff-list">
        <div class="staff-list-header">
          <div class="list-controls">
            <div class="filter-controls">
              <select class="role-filter">
                <option value="">Tutti i ruoli</option>
                <option value="technical">Staff Tecnico</option>
                <option value="medical">Staff Medico</option>
                <option value="scouting">Osservatori</option>
              </select>
              
              <select class="rating-filter">
                <option value="">Tutti i rating</option>
                <option value="80+">80+ Eccellente</option>
                <option value="70-79">70-79 Buono</option>
                <option value="60-69">60-69 Medio</option>
                <option value="<60">< 60 Scarso</option>
              </select>
              
              <input type="text" class="search-input" placeholder="Cerca per nome...">
            </div>
            
            <div class="sort-controls">
              <select class="sort-select">
                <option value="name">Nome</option>
                <option value="role">Ruolo</option>
                <option value="rating">Rating</option>
                <option value="salary">Stipendio</option>
                <option value="contract">Scadenza Contratto</option>
              </select>
              <button class="sort-order-btn" data-order="${this.sortOrder}">
                ${this.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          
          <div class="list-stats">
            <span class="total-count">${this.filteredStaff.length} membri</span>
            <span class="average-rating">Rating medio: ${this.getAverageRating()}</span>
          </div>
        </div>
        
        <div class="staff-list-content">
          ${this.renderStaffMembers()}
        </div>
        
        ${this.filteredStaff.length === 0 ? this.renderEmptyState() : ''}
      </div>
    `;
  }

  bindEvents() {
    // Filter controls
    const roleFilter = this.container.querySelector('.role-filter');
    const ratingFilter = this.container.querySelector('.rating-filter');
    const searchInput = this.container.querySelector('.search-input');
    
    roleFilter?.addEventListener('change', () => this.applyFilters());
    ratingFilter?.addEventListener('change', () => this.applyFilters());
    searchInput?.addEventListener('input', () => this.applyFilters());
    
    // Sort controls
    const sortSelect = this.container.querySelector('.sort-select');
    const sortOrderBtn = this.container.querySelector('.sort-order-btn');
    
    sortSelect?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.applySorting();
    });
    
    sortOrderBtn?.addEventListener('click', () => {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      sortOrderBtn.dataset.order = this.sortOrder;
      sortOrderBtn.textContent = this.sortOrder === 'asc' ? '↑' : '↓';
      this.applySorting();
    });
    
    // Staff card events
    this.bindStaffCardEvents();
  }

  bindStaffCardEvents() {
    const staffCards = this.container.querySelectorAll('.staff-list-item');
    
    staffCards.forEach(card => {
      const staffId = parseInt(card.dataset.staffId);
      const staff = this.staffMembers.find(s => s.id === staffId);
      
      if (staff) {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.action-btn')) {
            this.onStaffClick(staff);
          }
        });
        
        const actionBtns = card.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            this.onStaffAction(action, staff);
          });
        });
      }
    });
  }

  renderStaffMembers() {
    if (this.filteredStaff.length === 0) {
      return '';
    }
    
    return this.filteredStaff.map(staff => `
      <div class="staff-list-item" data-staff-id="${staff.id}">
        <div class="staff-item-header">
          <div class="staff-avatar">
            <img src="${staff.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=60&h=60'}" 
                 alt="${staff.name}" class="staff-photo">
          </div>
          <div class="staff-basic-info">
            <h4 class="staff-name">${staff.name}</h4>
            <span class="staff-role">${staff.role}</span>
            <span class="staff-category">${this.getCategoryLabel(staff.category)}</span>
          </div>
          <div class="staff-rating-badge">
            <span class="rating-value">${staff.rating}</span>
            <span class="rating-label">Rating</span>
          </div>
        </div>
        
        <div class="staff-item-details">
          <div class="staff-competencies-mini">
            ${this.renderMiniCompetencies(staff)}
          </div>
          
          <div class="staff-contract-mini">
            <span class="contract-expiry">Scade: ${this.formatDate(staff.contract?.expiry)}</span>
            <span class="salary-amount">€${this.formatSalary(staff.salary)}/anno</span>
          </div>
          
          <div class="staff-actions">
            <button class="action-btn" data-action="details" title="Dettagli">👁️</button>
            <button class="action-btn" data-action="contract" title="Contratto">📄</button>
            <button class="action-btn" data-action="assign" title="Assegna">⚙️</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderMiniCompetencies(staff) {
    const competencies = staff.attributes || {};
    const topCompetencies = Object.entries(competencies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    return topCompetencies.map(([key, value]) => `
      <div class="mini-competency">
        <span class="competency-name">${this.getCompetencyLabel(key)}</span>
        <span class="competency-value">${value}</span>
      </div>
    `).join('');
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-icon">👥</div>
        <h4>Nessun membro dello staff trovato</h4>
        <p>Prova a modificare i filtri di ricerca o aggiungi nuovi membri allo staff</p>
        <button class="button button-primary add-staff-btn">Aggiungi Staff</button>
      </div>
    `;
  }

  applyFilters() {
    const roleFilter = this.container.querySelector('.role-filter').value;
    const ratingFilter = this.container.querySelector('.rating-filter').value;
    const searchTerm = this.container.querySelector('.search-input').value.toLowerCase();
    
    this.filteredStaff = this.staffMembers.filter(staff => {
      // Role filter
      if (roleFilter && staff.category !== roleFilter) {
        return false;
      }
      
      // Rating filter
      if (ratingFilter) {
        const rating = staff.rating;
        switch (ratingFilter) {
          case '80+':
            if (rating < 80) return false;
            break;
          case '70-79':
            if (rating < 70 || rating >= 80) return false;
            break;
          case '60-69':
            if (rating < 60 || rating >= 70) return false;
            break;
          case '<60':
            if (rating >= 60) return false;
            break;
        }
      }
      
      // Search filter
      if (searchTerm && !staff.name.toLowerCase().includes(searchTerm)) {
        return false;
      }
      
      return true;
    });
    
    this.applySorting();
  }

  applySorting() {
    this.filteredStaff.sort((a, b) => {
      let aValue, bValue;
      
      switch (this.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'role':
          aValue = a.role.toLowerCase();
          bValue = b.role.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'salary':
          aValue = a.salary || 0;
          bValue = b.salary || 0;
          break;
        case 'contract':
          aValue = new Date(a.contract?.expiry || '2099-12-31');
          bValue = new Date(b.contract?.expiry || '2099-12-31');
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.updateDisplay();
  }

  updateDisplay() {
    const content = this.container.querySelector('.staff-list-content');
    const stats = this.container.querySelector('.list-stats');
    
    if (content) {
      content.innerHTML = this.renderStaffMembers();
      this.bindStaffCardEvents();
    }
    
    if (stats) {
      stats.innerHTML = `
        <span class="total-count">${this.filteredStaff.length} membri</span>
        <span class="average-rating">Rating medio: ${this.getAverageRating()}</span>
      `;
    }
    
    // Show/hide empty state
    const emptyState = this.container.querySelector('.empty-state');
    if (emptyState) {
      emptyState.remove();
    }
    
    if (this.filteredStaff.length === 0) {
      this.container.querySelector('.staff-list').insertAdjacentHTML('beforeend', this.renderEmptyState());
    }
  }

  getAverageRating() {
    if (this.filteredStaff.length === 0) return '0';
    const total = this.filteredStaff.reduce((sum, staff) => sum + (staff.rating || 0), 0);
    return (total / this.filteredStaff.length).toFixed(1);
  }

  getCategoryLabel(category) {
    const labels = {
      technical: 'Tecnico',
      medical: 'Medico',
      scouting: 'Scout'
    };
    return labels[category] || category;
  }

  getCompetencyLabel(key) {
    const labels = {
      coaching: 'Coach',
      fitness: 'Fitness',
      tactical: 'Tattico',
      mental: 'Mentale',
      medical: 'Medico',
      scouting: 'Scout'
    };
    return labels[key] || key;
  }

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  }

  formatSalary(salary) {
    if (!salary) return '0';
    return salary.toLocaleString('it-IT');
  }

  // Public methods
  setStaffMembers(staffMembers) {
    this.staffMembers = staffMembers;
    this.applyFilters();
  }

  addStaffMember(staff) {
    this.staffMembers.push(staff);
    this.applyFilters();
  }

  removeStaffMember(staffId) {
    this.staffMembers = this.staffMembers.filter(s => s.id !== staffId);
    this.applyFilters();
  }

  updateStaffMember(staffId, updates) {
    const index = this.staffMembers.findIndex(s => s.id === staffId);
    if (index !== -1) {
      this.staffMembers[index] = { ...this.staffMembers[index], ...updates };
      this.applyFilters();
    }
  }
}