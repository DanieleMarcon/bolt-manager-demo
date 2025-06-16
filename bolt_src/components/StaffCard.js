/**
 * StaffCard Component
 * 
 * Used in: StaffManagement.page.js
 * Purpose: Display individual staff member card with role and competencies
 * Dataset: staff (staff members with roles and attributes)
 */

export default class StaffCard {
  constructor(container, props = {}) {
    this.container = container;
    this.props = props;
    this.staff = props.staff || {};
    this.onClick = props.onClick || (() => {});
    this.onAction = props.onAction || (() => {});
    
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="staff-card" data-staff-id="${this.staff.id}">
        <div class="staff-header">
          <div class="staff-avatar">
            <img src="${this.staff.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=80&h=80'}" 
                 alt="${this.staff.name}" class="staff-photo">
          </div>
          <div class="staff-info">
            <h4 class="staff-name">${this.staff.name || 'Staff Member'}</h4>
            <span class="staff-role">${this.staff.role || 'Coach'}</span>
            <span class="staff-rating">Rating: ${this.staff.rating || 75}</span>
          </div>
          <div class="staff-actions">
            <button class="action-btn" data-action="details" title="Dettagli">👁️</button>
            <button class="action-btn" data-action="contract" title="Contratto">📄</button>
            <button class="action-btn" data-action="assign" title="Assegna Ruolo">⚙️</button>
          </div>
        </div>
        
        <div class="staff-competencies">
          <div class="competency-grid">
            ${this.renderCompetencies()}
          </div>
        </div>
        
        <div class="staff-contract">
          <div class="contract-info">
            <span class="contract-label">Contratto:</span>
            <span class="contract-expiry">${this.formatContractExpiry()}</span>
          </div>
          <div class="salary-info">
            <span class="salary-label">Stipendio:</span>
            <span class="salary-amount">€${this.formatSalary()}/anno</span>
          </div>
        </div>
        
        <div class="staff-specialties">
          <div class="specialties-label">Specialità:</div>
          <div class="specialties-tags">
            ${this.renderSpecialties()}
          </div>
        </div>
        
        <div class="staff-performance">
          <div class="performance-indicator ${this.getPerformanceClass()}">
            <span class="performance-label">Performance:</span>
            <span class="performance-value">${this.getPerformanceText()}</span>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const card = this.container.querySelector('.staff-card');
    const actionBtns = this.container.querySelectorAll('.action-btn');
    
    card?.addEventListener('click', (e) => {
      if (!e.target.closest('.action-btn')) {
        this.onClick(this.staff);
      }
    });
    
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.onAction(action, this.staff);
      });
    });
  }

  renderCompetencies() {
    const competencies = this.staff.attributes || {
      coaching: 75,
      fitness: 70,
      tactical: 80,
      mental: 75
    };
    
    return Object.entries(competencies).slice(0, 4).map(([key, value]) => `
      <div class="competency-item">
        <span class="competency-name">${this.getCompetencyLabel(key)}</span>
        <div class="competency-bar">
          <div class="competency-fill" style="width: ${value}%"></div>
        </div>
        <span class="competency-value">${value}</span>
      </div>
    `).join('');
  }

  renderSpecialties() {
    const specialties = this.staff.specialties || ['Generale'];
    return specialties.map(specialty => `
      <span class="specialty-tag">${specialty}</span>
    `).join('');
  }

  getCompetencyLabel(key) {
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

  formatContractExpiry() {
    if (!this.staff.contract?.expiry) return 'N/A';
    const expiry = new Date(this.staff.contract.expiry);
    return expiry.toLocaleDateString('it-IT');
  }

  formatSalary() {
    if (!this.staff.salary) return '0';
    return this.staff.salary.toLocaleString('it-IT');
  }

  getPerformanceClass() {
    const rating = this.staff.rating || 75;
    if (rating >= 85) return 'performance-excellent';
    if (rating >= 75) return 'performance-good';
    if (rating >= 65) return 'performance-average';
    return 'performance-poor';
  }

  getPerformanceText() {
    const rating = this.staff.rating || 75;
    if (rating >= 85) return 'Eccellente';
    if (rating >= 75) return 'Buona';
    if (rating >= 65) return 'Media';
    return 'Scarsa';
  }

  updateStaff(newStaffData) {
    this.staff = { ...this.staff, ...newStaffData };
    this.render();
    this.bindEvents();
  }

  setHighlight(highlighted) {
    const card = this.container.querySelector('.staff-card');
    if (card) {
      card.classList.toggle('highlighted', highlighted);
    }
  }
}