// Staff Management Page implementation
export class StaffManagementPage {
    constructor() {
        this.gameManager = null;
        this.currentFilter = 'all';
        this.selectedStaff = null;
    }

    async init() {
        console.log('👥 Initializing StaffManagementPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadStaffData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Gestione Staff</span>
                </nav>

                <!-- Staff Overview -->
                <div class="staff-overview">
                    <h2>Gestione Staff Tecnico</h2>
                    <div id="staffSummary" class="staff-summary">
                        <!-- Will be populated by loadStaffSummary() -->
                    </div>
                </div>

                <!-- Staff Filters -->
                <div class="staff-filters">
                    <div class="filter-group">
                        <label for="roleFilter">Ruolo:</label>
                        <select id="roleFilter" class="filter-select">
                            <option value="all">Tutti</option>
                            <option value="head_coach">Allenatore Capo</option>
                            <option value="assistant_coach">Vice Allenatore</option>
                            <option value="fitness_coach">Preparatore Atletico</option>
                            <option value="scout">Scout</option>
                            <option value="physio">Fisioterapista</option>
                            <option value="analyst">Analista</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="experienceFilter">Esperienza:</label>
                        <select id="experienceFilter" class="filter-select">
                            <option value="all">Tutti</option>
                            <option value="junior">Junior (0-2 anni)</option>
                            <option value="mid">Intermedio (3-7 anni)</option>
                            <option value="senior">Senior (8+ anni)</option>
                        </select>
                    </div>

                    <div class="filter-actions">
                        <button id="hireStaffBtn" class="button button-primary">
                            ➕ Assumi Staff
                        </button>
                    </div>
                </div>

                <!-- Staff Grid -->
                <div id="staffGrid" class="staff-grid">
                    <!-- Will be populated by loadStaffGrid() -->
                </div>

                <!-- Sponsor Slot -->
                <div class="sponsor-slot">
                    <div class="sponsor-content">
                        <span class="sponsor-label">Staff Excellence powered by</span>
                        <img src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600&h=120&fit=crop" 
                             alt="Sponsor Staff" class="sponsor-image">
                    </div>
                </div>

                <!-- Team Bonuses -->
                <div class="team-bonuses-section">
                    <h3>Bonus Squadra</h3>
                    <div id="teamBonuses" class="team-bonuses">
                        <!-- Will be populated by loadTeamBonuses() -->
                    </div>
                </div>

                <!-- Staff Details Panel -->
                <div id="staffDetailsPanel" class="staff-details-panel" style="display: none;">
                    <h3>Dettagli Staff</h3>
                    <div id="staffDetailsContent" class="staff-details-content">
                        <!-- Will be populated when staff is selected -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Filter controls
        document.getElementById('roleFilter')?.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.loadStaffGrid();
        });

        document.getElementById('experienceFilter')?.addEventListener('change', (e) => {
            this.experienceFilter = e.target.value;
            this.loadStaffGrid();
        });

        // Hire staff button
        document.getElementById('hireStaffBtn')?.addEventListener('click', () => {
            this.showHireStaffModal();
        });
    }

    loadStaffData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Load staff summary
        this.loadStaffSummary();

        // Load staff grid
        this.loadStaffGrid();

        // Load team bonuses
        this.loadTeamBonuses();
    }

    loadStaffSummary() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        const teamStaff = this.gameManager.gameData.staff.filter(s => s.team_id === userTeam.id);
        const totalSalary = teamStaff.reduce((sum, s) => sum + s.salary, 0);
        const avgExperience = teamStaff.reduce((sum, s) => sum + s.experience_years, 0) / teamStaff.length || 0;
        const avgMorale = teamStaff.reduce((sum, s) => sum + s.morale, 0) / teamStaff.length || 0;

        const summaryHTML = `
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-label">Membri Staff:</span>
                    <span class="stat-value">${teamStaff.length}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Costo Totale:</span>
                    <span class="stat-value">${this.formatCurrency(totalSalary)}/settimana</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Esperienza Media:</span>
                    <span class="stat-value">${avgExperience.toFixed(1)} anni</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Morale Medio:</span>
                    <span class="stat-value">
                        <div class="morale-indicator">
                            <div class="morale-bar" style="width: ${avgMorale}%; background-color: ${this.getMoraleColor(avgMorale)}"></div>
                            <span class="morale-text">${avgMorale.toFixed(0)}%</span>
                        </div>
                    </span>
                </div>
            </div>
        `;

        document.getElementById('staffSummary').innerHTML = summaryHTML;
    }

    loadStaffGrid() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        let teamStaff = this.gameManager.gameData.staff.filter(s => s.team_id === userTeam.id);

        // Apply filters
        if (this.currentFilter !== 'all') {
            teamStaff = teamStaff.filter(s => s.role === this.currentFilter);
        }

        if (this.experienceFilter) {
            switch (this.experienceFilter) {
                case 'junior':
                    teamStaff = teamStaff.filter(s => s.experience_years <= 2);
                    break;
                case 'mid':
                    teamStaff = teamStaff.filter(s => s.experience_years >= 3 && s.experience_years <= 7);
                    break;
                case 'senior':
                    teamStaff = teamStaff.filter(s => s.experience_years >= 8);
                    break;
            }
        }

        if (teamStaff.length === 0) {
            document.getElementById('staffGrid').innerHTML = `
                <div class="no-staff">
                    <h3>Nessun membro dello staff trovato</h3>
                    <p>Modifica i filtri o assumi nuovo staff</p>
                    <button class="button button-primary" onclick="window.boltManager.uiManager.currentPage.showHireStaffModal()">
                        ➕ Assumi Staff
                    </button>
                </div>
            `;
            return;
        }

        const staffHTML = teamStaff.map(staff => this.renderStaffCard(staff)).join('');
        document.getElementById('staffGrid').innerHTML = staffHTML;

        // Setup staff card listeners
        this.setupStaffCardListeners();
    }

    renderStaffCard(staff) {
        const roleDisplayName = this.getRoleDisplayName(staff.role);
        const experienceLevel = this.getExperienceLevel(staff.experience_years);
        const moraleColor = this.getMoraleColor(staff.morale);

        return `
            <div class="staff-card" data-staff-id="${staff.id}" tabindex="0">
                <div class="staff-header">
                    <div class="staff-avatar">
                        <span class="staff-role-icon">${this.getRoleIcon(staff.role)}</span>
                    </div>
                    <div class="staff-info">
                        <h4 class="staff-name">${staff.first_name} ${staff.last_name}</h4>
                        <span class="staff-role">${roleDisplayName}</span>
                        <span class="staff-experience">${staff.experience_years} anni di esperienza</span>
                    </div>
                    <div class="staff-status">
                        ${staff.is_head_of_department ? '<span class="head-badge">👑 Responsabile</span>' : ''}
                    </div>
                </div>

                <div class="staff-competencies">
                    <h5>Competenze</h5>
                    <div class="competency-grid">
                        ${this.renderCompetencies(staff)}
                    </div>
                </div>

                <div class="staff-stats">
                    <div class="stat-row">
                        <span class="stat-label">Morale</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${staff.morale}%; background-color: ${moraleColor}"></div>
                            <span class="progress-text">${Math.round(staff.morale)}%</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Lealtà</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${staff.loyalty}%; background-color: var(--primary)"></div>
                            <span class="progress-text">${Math.round(staff.loyalty)}%</span>
                        </div>
                    </div>
                </div>

                <div class="staff-contract">
                    <div class="contract-item">
                        <span class="contract-label">Stipendio:</span>
                        <span class="contract-value">${this.formatCurrency(staff.salary)}/sett</span>
                    </div>
                    <div class="contract-item">
                        <span class="contract-label">Scadenza:</span>
                        <span class="contract-value">${new Date(staff.contract_expires).toLocaleDateString('it-IT')}</span>
                    </div>
                </div>

                <div class="staff-actions">
                    <button class="button button-primary button-small" onclick="window.boltManager.uiManager.currentPage.assignRole('${staff.id}')">
                        🔄 Cambia Ruolo
                    </button>
                    <button class="button button-ghost button-small" onclick="window.boltManager.uiManager.currentPage.viewStaffDetails('${staff.id}')">
                        👁️ Dettagli
                    </button>
                </div>
            </div>
        `;
    }

    renderCompetencies(staff) {
        const competencies = [];
        
        if (staff.coaching_ability) {
            competencies.push({ label: 'Allenamento', value: staff.coaching_ability });
        }
        if (staff.tactical_knowledge) {
            competencies.push({ label: 'Tattica', value: staff.tactical_knowledge });
        }
        if (staff.motivational_skills) {
            competencies.push({ label: 'Motivazione', value: staff.motivational_skills });
        }
        if (staff.fitness_expertise) {
            competencies.push({ label: 'Fitness', value: staff.fitness_expertise });
        }
        if (staff.scouting_ability) {
            competencies.push({ label: 'Scouting', value: staff.scouting_ability });
        }
        if (staff.medical_expertise) {
            competencies.push({ label: 'Medicina', value: staff.medical_expertise });
        }

        return competencies.slice(0, 3).map(comp => `
            <div class="competency-item">
                <span class="comp-label">${comp.label}</span>
                <span class="comp-value">${comp.value}</span>
            </div>
        `).join('');
    }

    getRoleDisplayName(role) {
        const roleNames = {
            'head_coach': 'Allenatore Capo',
            'assistant_coach': 'Vice Allenatore',
            'fitness_coach': 'Preparatore Atletico',
            'goalkeeping_coach': 'Allenatore Portieri',
            'scout': 'Scout',
            'chief_scout': 'Capo Scout',
            'physio': 'Fisioterapista',
            'team_doctor': 'Medico Sociale',
            'analyst': 'Analista',
            'youth_coach': 'Allenatore Giovanili',
            'technical_director': 'Direttore Tecnico',
            'sporting_director': 'Direttore Sportivo'
        };
        return roleNames[role] || role;
    }

    getRoleIcon(role) {
        const roleIcons = {
            'head_coach': '👨‍🏫',
            'assistant_coach': '👨‍💼',
            'fitness_coach': '💪',
            'goalkeeping_coach': '🥅',
            'scout': '🔍',
            'chief_scout': '🕵️',
            'physio': '🏥',
            'team_doctor': '👨‍⚕️',
            'analyst': '📊',
            'youth_coach': '👶',
            'technical_director': '🎯',
            'sporting_director': '🏆'
        };
        return roleIcons[role] || '👤';
    }

    getExperienceLevel(years) {
        if (years <= 2) return 'Junior';
        if (years <= 7) return 'Intermedio';
        return 'Senior';
    }

    setupStaffCardListeners() {
        document.querySelectorAll('.staff-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.staff-actions')) {
                    const staffId = card.dataset.staffId;
                    this.selectStaff(staffId);
                }
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const staffId = card.dataset.staffId;
                    this.selectStaff(staffId);
                }
            });
        });
    }

    selectStaff(staffId) {
        // Remove previous selection
        document.querySelectorAll('.staff-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        const selectedCard = document.querySelector(`[data-staff-id="${staffId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Find staff data
        this.selectedStaff = this.gameManager.gameData.staff.find(s => s.id === staffId);
        
        // Show details panel
        this.showStaffDetails();
    }

    showStaffDetails() {
        if (!this.selectedStaff) return;

        const staff = this.selectedStaff;
        const detailsHTML = `
            <div class="staff-details-content">
                <div class="staff-profile">
                    <h4>${staff.first_name} ${staff.last_name}</h4>
                    <p class="staff-role">${this.getRoleDisplayName(staff.role)}</p>
                    <p class="staff-age">${staff.age} anni, ${staff.experience_years} anni di esperienza</p>
                </div>

                <div class="competency-radar">
                    <h5>Competenze Dettagliate</h5>
                    <div id="competencyChart" class="competency-chart">
                        ${this.renderCompetencyRadar(staff)}
                    </div>
                </div>

                <div class="staff-achievements">
                    <h5>Riconoscimenti</h5>
                    <div class="achievements-list">
                        ${staff.achievements && staff.achievements.length > 0 ? 
                            staff.achievements.map(achievement => `
                                <div class="achievement-item">🏆 ${achievement}</div>
                            `).join('') :
                            '<p>Nessun riconoscimento particolare</p>'
                        }
                    </div>
                </div>

                <div class="staff-specialization">
                    <h5>Specializzazione</h5>
                    <p>${staff.specialization || 'Nessuna specializzazione specifica'}</p>
                </div>

                <div class="staff-languages">
                    <h5>Lingue</h5>
                    <div class="languages-list">
                        ${staff.languages && staff.languages.length > 0 ? 
                            staff.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('') :
                            '<span class="language-tag">Italiano</span>'
                        }
                    </div>
                </div>

                <div class="staff-contract-details">
                    <h5>Dettagli Contratto</h5>
                    <div class="contract-grid">
                        <div class="contract-item">
                            <span class="contract-label">Stipendio:</span>
                            <span class="contract-value">${this.formatCurrency(staff.salary)}/settimana</span>
                        </div>
                        <div class="contract-item">
                            <span class="contract-label">Scadenza:</span>
                            <span class="contract-value">${new Date(staff.contract_expires).toLocaleDateString('it-IT')}</span>
                        </div>
                        <div class="contract-item">
                            <span class="contract-label">Reputazione:</span>
                            <span class="contract-value">${staff.reputation}/100</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('staffDetailsContent').innerHTML = detailsHTML;
        document.getElementById('staffDetailsPanel').style.display = 'block';
    }

    renderCompetencyRadar(staff) {
        const competencies = [
            { label: 'Allenamento', value: staff.coaching_ability || 0 },
            { label: 'Tattica', value: staff.tactical_knowledge || 0 },
            { label: 'Motivazione', value: staff.motivational_skills || 0 },
            { label: 'Fitness', value: staff.fitness_expertise || 0 },
            { label: 'Scouting', value: staff.scouting_ability || 0 },
            { label: 'Medicina', value: staff.medical_expertise || 0 }
        ].filter(comp => comp.value > 0);

        return competencies.map(comp => `
            <div class="radar-item">
                <span class="radar-label">${comp.label}</span>
                <div class="radar-bar">
                    <div class="radar-fill" style="width: ${comp.value}%"></div>
                    <span class="radar-value">${comp.value}</span>
                </div>
            </div>
        `).join('');
    }

    loadTeamBonuses() {
        const userTeam = this.gameManager.getUserTeam();
        if (!userTeam) return;

        // Calculate team bonuses based on staff
        const bonuses = this.calculateTeamBonuses(userTeam.id);

        const bonusesHTML = `
            <div class="bonuses-grid">
                <div class="bonus-item">
                    <span class="bonus-label">Efficienza Allenamento</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.training_efficiency}%"></div>
                        <span class="bonus-value">+${bonuses.training_efficiency.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Prevenzione Infortuni</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.injury_prevention}%"></div>
                        <span class="bonus-value">+${bonuses.injury_prevention.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Bonus Tattico</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.tactical_bonus}%"></div>
                        <span class="bonus-value">+${bonuses.tactical_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Bonus Morale</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.morale_bonus}%"></div>
                        <span class="bonus-value">+${bonuses.morale_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Efficacia Scouting</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.scouting_bonus}%"></div>
                        <span class="bonus-value">+${bonuses.scouting_bonus.toFixed(0)}%</span>
                    </div>
                </div>
                <div class="bonus-item">
                    <span class="bonus-label">Sviluppo Giovanili</span>
                    <div class="bonus-bar">
                        <div class="bonus-fill" style="width: ${bonuses.youth_development}%"></div>
                        <span class="bonus-value">+${bonuses.youth_development.toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('teamBonuses').innerHTML = bonusesHTML;
    }

    calculateTeamBonuses(teamId) {
        const teamStaff = this.gameManager.gameData.staff.filter(s => s.team_id === teamId);
        
        let bonuses = {
            training_efficiency: 0,
            injury_prevention: 0,
            tactical_bonus: 0,
            morale_bonus: 0,
            scouting_bonus: 0,
            youth_development: 0
        };

        teamStaff.forEach(staff => {
            const roleMultiplier = staff.is_head_of_department ? 1.5 : 1.0;
            
            switch (staff.role) {
                case 'head_coach':
                    bonuses.training_efficiency += (staff.coaching_ability || 50) * 0.2 * roleMultiplier;
                    bonuses.tactical_bonus += (staff.tactical_knowledge || 50) * 0.3 * roleMultiplier;
                    bonuses.morale_bonus += (staff.motivational_skills || 50) * 0.2 * roleMultiplier;
                    break;
                case 'fitness_coach':
                    bonuses.training_efficiency += (staff.fitness_expertise || 50) * 0.3 * roleMultiplier;
                    bonuses.injury_prevention += (staff.fitness_expertise || 50) * 0.4 * roleMultiplier;
                    break;
                case 'scout':
                case 'chief_scout':
                    bonuses.scouting_bonus += (staff.scouting_ability || 50) * 0.5 * roleMultiplier;
                    break;
                case 'physio':
                case 'team_doctor':
                    bonuses.injury_prevention += (staff.medical_expertise || 50) * 0.3 * roleMultiplier;
                    break;
                case 'youth_coach':
                    bonuses.youth_development += (staff.coaching_ability || 50) * 0.4 * roleMultiplier;
                    break;
            }
        });

        // Normalize bonuses (0-100)
        Object.keys(bonuses).forEach(key => {
            bonuses[key] = Math.min(100, Math.max(0, bonuses[key]));
        });

        return bonuses;
    }

    assignRole(staffId) {
        const staff = this.gameManager.gameData.staff.find(s => s.id === staffId);
        if (!staff) return;

        const content = `
            <div class="assign-role-modal">
                <div class="current-role">
                    <h4>Membro Staff: ${staff.first_name} ${staff.last_name}</h4>
                    <p>Ruolo attuale: ${this.getRoleDisplayName(staff.role)}</p>
                </div>

                <div class="role-selection">
                    <div class="form-group">
                        <label for="newRoleSelect">Nuovo Ruolo:</label>
                        <select id="newRoleSelect" class="form-select">
                            <option value="head_coach">Allenatore Capo</option>
                            <option value="assistant_coach">Vice Allenatore</option>
                            <option value="fitness_coach">Preparatore Atletico</option>
                            <option value="goalkeeping_coach">Allenatore Portieri</option>
                            <option value="scout">Scout</option>
                            <option value="chief_scout">Capo Scout</option>
                            <option value="physio">Fisioterapista</option>
                            <option value="team_doctor">Medico Sociale</option>
                            <option value="analyst">Analista</option>
                            <option value="youth_coach">Allenatore Giovanili</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="specializationInput">Specializzazione (opzionale):</label>
                        <input type="text" id="specializationInput" class="form-input" placeholder="es. Difesa, Attacco, Giovani...">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="headOfDepartmentCheck">
                            Responsabile di Dipartimento
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="salaryAdjustmentInput">Adeguamento Stipendio:</label>
                        <input type="number" id="salaryAdjustmentInput" class="form-input" value="0" step="500">
                        <span class="input-help">Attuale: ${this.formatCurrency(staff.salary)}/settimana</span>
                    </div>
                </div>

                <div class="compatibility-check">
                    <div id="compatibilityWarning" class="compatibility-warning" style="display: none;">
                        <!-- Will show compatibility warnings -->
                    </div>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal(`Assegna Ruolo - ${staff.first_name} ${staff.last_name}`, content, [
            {
                text: 'Assegna',
                class: 'button-primary',
                onclick: `window.boltManager.uiManager.currentPage.confirmRoleAssignment('${staffId}')`
            }
        ]);

        // Setup role change listener for compatibility check
        document.getElementById('newRoleSelect')?.addEventListener('change', () => {
            this.checkRoleCompatibility(staff);
        });
    }

    checkRoleCompatibility(staff) {
        const newRole = document.getElementById('newRoleSelect')?.value;
        if (!newRole || newRole === staff.role) {
            document.getElementById('compatibilityWarning').style.display = 'none';
            return;
        }

        // Simple compatibility check (could be expanded)
        const warnings = [];
        
        if (staff.experience_years < 3 && ['head_coach', 'technical_director'].includes(newRole)) {
            warnings.push('⚠️ Esperienza limitata per questo ruolo senior');
        }

        if (newRole === 'fitness_coach' && (!staff.fitness_expertise || staff.fitness_expertise < 60)) {
            warnings.push('⚠️ Competenze fitness insufficienti');
        }

        if (newRole.includes('scout') && (!staff.scouting_ability || staff.scouting_ability < 60)) {
            warnings.push('⚠️ Competenze scouting insufficienti');
        }

        const warningElement = document.getElementById('compatibilityWarning');
        if (warnings.length > 0) {
            warningElement.innerHTML = warnings.join('<br>');
            warningElement.style.display = 'block';
        } else {
            warningElement.style.display = 'none';
        }
    }

    async confirmRoleAssignment(staffId) {
        const newRole = document.getElementById('newRoleSelect').value;
        const specialization = document.getElementById('specializationInput').value;
        const isHeadOfDepartment = document.getElementById('headOfDepartmentCheck').checked;
        const salaryAdjustment = parseInt(document.getElementById('salaryAdjustmentInput').value || 0);

        try {
            window.boltManager.uiManager.hideModal();
            window.boltManager.uiManager.showLoading('Assegnazione ruolo...');

            const result = await this.gameManager.executeStaffAssignRole({
                staffId: staffId,
                newRole: newRole,
                specialization: specialization,
                isHeadOfDepartment: isHeadOfDepartment,
                salaryAdjustment: salaryAdjustment
            });

            window.boltManager.uiManager.hideLoading();

            if (result.success) {
                window.boltManager.uiManager.showToast('Ruolo assegnato con successo!', 'success');
                
                // Refresh data
                this.loadStaffData();
                
                // Show role change summary
                this.showRoleChangeResult(result.roleUpdate);
            } else {
                window.boltManager.uiManager.showToast('Errore nell\'assegnazione: ' + result.error, 'error');
            }

        } catch (error) {
            console.error('Error assigning role:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'assegnazione del ruolo', 'error');
        }
    }

    showRoleChangeResult(roleUpdate) {
        const content = `
            <div class="role-change-result">
                <h4>Ruolo Assegnato con Successo</h4>
                <div class="change-summary">
                    <p><strong>Staff:</strong> ${roleUpdate.staffName}</p>
                    <p><strong>Ruolo Precedente:</strong> ${this.getRoleDisplayName(roleUpdate.previousRole)}</p>
                    <p><strong>Nuovo Ruolo:</strong> ${this.getRoleDisplayName(roleUpdate.newRole)}</p>
                    ${roleUpdate.salaryChange !== 0 ? `
                        <p><strong>Variazione Stipendio:</strong> ${roleUpdate.salaryChange > 0 ? '+' : ''}${this.formatCurrency(roleUpdate.salaryChange)}</p>
                        <p><strong>Nuovo Stipendio:</strong> ${this.formatCurrency(roleUpdate.newSalary)}/settimana</p>
                    ` : ''}
                </div>
                <div class="impact-info">
                    <p>💡 I bonus della squadra sono stati aggiornati automaticamente</p>
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal('Ruolo Assegnato', content);
    }

    viewStaffDetails(staffId) {
        this.selectStaff(staffId);
    }

    showHireStaffModal() {
        const content = `
            <div class="hire-staff-modal">
                <h4>Assumi Nuovo Staff</h4>
                <p>Funzionalità in sviluppo</p>
                <p>Presto potrai assumere nuovo staff tecnico per migliorare le prestazioni della squadra.</p>
            </div>
        `;

        window.boltManager.uiManager.showModal('Assumi Staff', content);
    }

    getMoraleColor(morale) {
        if (morale >= 70) return 'var(--success)';
        if (morale >= 40) return 'var(--warning)';
        return 'var(--error)';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}