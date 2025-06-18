export const template = `
<div class="staff-member-card card">
  <div class="staff-header">
    <div class="staff-avatar">
      <img src="" alt="Staff photo" class="staff-photo" loading="lazy">
    </div>
    <div class="staff-basic-info">
      <h3 class="staff-name"></h3>
      <div class="staff-role"></div>
    </div>
    <div class="staff-rating">
      <div class="rating-circle">
        <span class="rating-value"></span>
      </div>
      <span class="rating-label">Rating</span>
    </div>
  </div>
  
  <div class="staff-attributes">
    <div class="attribute-row">
      <span class="attribute-name">Coaching</span>
      <div class="attribute-bar">
        <div class="attribute-fill coaching-fill"></div>
      </div>
      <span class="attribute-value coaching-value">0</span>
    </div>
    
    <div class="attribute-row">
      <span class="attribute-name">Fitness</span>
      <div class="attribute-bar">
        <div class="attribute-fill fitness-fill"></div>
      </div>
      <span class="attribute-value fitness-value">0</span>
    </div>
    
    <div class="attribute-row">
      <span class="attribute-name">Tattica</span>
      <div class="attribute-bar">
        <div class="attribute-fill tactical-fill"></div>
      </div>
      <span class="attribute-value tactical-value">0</span>
    </div>
    
    <div class="attribute-row">
      <span class="attribute-name">Mentale</span>
      <div class="attribute-bar">
        <div class="attribute-fill mental-fill"></div>
      </div>
      <span class="attribute-value mental-value">0</span>
    </div>
  </div>
  
  <div class="staff-specialties">
    <h4>Specialità</h4>
    <div class="specialties-list">
      <!-- Specialties will be populated dynamically -->
    </div>
  </div>
  
  <div class="staff-contract">
    <div class="contract-item">
      <span class="contract-label">Stipendio</span>
      <span class="contract-value salary-value"></span>
    </div>
    <div class="contract-item">
      <span class="contract-label">Scadenza</span>
      <span class="contract-value expiry-value"></span>
    </div>
  </div>
  
  <div class="staff-actions">
    <button class="button button-ghost view-details-btn" aria-label="Visualizza dettagli">
      👁️ Dettagli
    </button>
    <button class="button button-secondary assign-role-btn" aria-label="Assegna ruolo">
      📋 Assegna Ruolo
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-mini">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=120&h=30" 
         alt="Staff Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.staff-member-card {
  position: relative;
  min-height: 350px;
  display: flex;
  flex-direction: column;
}

.staff-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.staff-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  flex-shrink: 0;
}

.staff-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.staff-basic-info {
  flex: 1;
}

.staff-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text);
}

.staff-role {
  font-size: 14px;
  color: var(--primary);
  font-weight: 500;
}

.staff-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.rating-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.rating-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.staff-attributes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.attribute-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.attribute-name {
  font-size: 12px;
  color: var(--text-muted);
  min-width: 60px;
  font-weight: 500;
}

.attribute-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.attribute-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.coaching-fill {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.fitness-fill {
  background: linear-gradient(90deg, #10b981, #059669);
}

.tactical-fill {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.mental-fill {
  background: linear-gradient(90deg, #8b5cf6, #7c3aed);
}

.attribute-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  min-width: 20px;
  text-align: right;
}

.staff-specialties {
  margin-bottom: 16px;
}

.staff-specialties h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.specialties-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.specialty-tag {
  padding: 4px 8px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  color: var(--text);
}

.staff-contract {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
  margin-bottom: 16px;
}

.contract-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contract-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.contract-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.staff-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.staff-actions button {
  flex: 1;
  padding: 8px 12px;
  font-size: 12px;
}

.sponsor-slot-mini {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 80px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .staff-header {
    flex-direction: column;
    text-align: center;
  }
  
  .staff-rating {
    margin-top: 8px;
  }
  
  .staff-contract {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  .staff-actions {
    flex-direction: column;
  }
}
</style>
`;

class StaffMemberCard {
  constructor(element, staffData) {
    this.element = element;
    this.staffData = staffData;
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.animateAttributes();
  }
  
  render() {
    const staff = this.staffData;
    
    // Update basic info
    this.element.querySelector('.staff-photo').src = staff.photo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=120&h=120';
    this.element.querySelector('.staff-name').textContent = staff.name;
    this.element.querySelector('.staff-role').textContent = staff.role;
    
    // Update rating
    this.element.querySelector('.rating-value').textContent = staff.rating;
    
    // Update attributes
    this.updateAttribute('coaching', staff.attributes.coaching);
    this.updateAttribute('fitness', staff.attributes.fitness);
    this.updateAttribute('tactical', staff.attributes.tactical);
    this.updateAttribute('mental', staff.attributes.mental);
    
    // Update specialties
    this.updateSpecialties(staff.specialties);
    
    // Update contract
    this.element.querySelector('.salary-value').textContent = this.formatCurrency(staff.contract.salary);
    this.element.querySelector('.expiry-value').textContent = this.formatDate(staff.contract.expiry);
  }
  
  updateAttribute(name, value) {
    const fill = this.element.querySelector(`.${name}-fill`);
    const valueElement = this.element.querySelector(`.${name}-value`);
    
    if (fill) fill.style.width = `${value}%`;
    if (valueElement) valueElement.textContent = value;
  }
  
  updateSpecialties(specialties) {
    const container = this.element.querySelector('.specialties-list');
    container.innerHTML = '';
    
    if (!specialties || specialties.length === 0) {
      const emptyTag = document.createElement('div');
      emptyTag.className = 'specialty-tag';
      emptyTag.textContent = 'Nessuna specialità';
      container.appendChild(emptyTag);
      return;
    }
    
    specialties.forEach(specialty => {
      const tag = document.createElement('div');
      tag.className = 'specialty-tag';
      tag.textContent = specialty;
      container.appendChild(tag);
    });
  }
  
  formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short'
    });
  }
  
  animateAttributes() {
    setTimeout(() => {
      this.element.querySelectorAll('.attribute-fill').forEach(fill => {
        fill.style.transition = 'width 1s ease-out';
      });
    }, 100);
  }
  
  bindEvents() {
    // View details button
    this.element.querySelector('.view-details-btn').addEventListener('click', () => {
      this.viewDetails();
    });
    
    // Assign role button
    this.element.querySelector('.assign-role-btn').addEventListener('click', () => {
      this.assignRole();
    });
    
    // Card click
    this.element.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        this.viewDetails();
      }
    });
  }
  
  viewDetails() {
    window.dispatchEvent(new CustomEvent('viewStaffDetails', {
      detail: { staffId: this.staffData.id }
    }));
  }
  
  assignRole() {
    window.dispatchEvent(new CustomEvent('assignStaffRole', {
      detail: { staffId: this.staffData.id }
    }));
  }
  
  // Public methods
  updateData(newData) {
    this.staffData = { ...this.staffData, ...newData };
    this.render();
  }
  
  getStaffData() {
    return { ...this.staffData };
  }
  
  highlight() {
    this.element.style.transform = 'translateY(-4px)';
    this.element.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.2)';
    this.element.style.borderColor = 'var(--primary)';
    
    setTimeout(() => {
      this.element.style.transform = '';
      this.element.style.boxShadow = '';
      this.element.style.borderColor = '';
    }, 1500);
  }
}

export default StaffMemberCard;