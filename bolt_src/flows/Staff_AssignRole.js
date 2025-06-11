/**
 * FLOW: Staff_AssignRole
 * 
 * Gestisce l'assegnazione di un nuovo ruolo o responsabilità a un membro dello staff.
 * Calcola impatti su bonus squadra, aggiorna morale e genera eventi.
 * 
 * Trigger: Assegnazione ruolo staff o cambio responsabilità
 * Input: ID membro staff, nuovo ruolo/responsabilità, squadra di destinazione
 * Output: Staff riassegnato, bonus aggiornati
 * 
 * Dataset coinvolti:
 * - staff (scrittura - nuovo ruolo)
 * - teams (scrittura - bonus aggiornati)
 * - morale_status (scrittura - impatto cambio)
 * - game_events (scrittura - notifica cambio)
 */

export class StaffAssignRoleFlow {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Esegue il flow di assegnazione ruolo staff
     * @param {Object} params - Parametri dell'assegnazione
     * @param {string} params.staffId - ID del membro dello staff
     * @param {string} params.newRole - Nuovo ruolo da assegnare
     * @param {string} params.teamId - ID squadra di destinazione (se cambio squadra)
     * @param {string} params.specialization - Nuova specializzazione (opzionale)
     * @param {boolean} params.isHeadOfDepartment - Se diventa responsabile dipartimento
     * @param {number} params.salaryAdjustment - Adeguamento stipendio (opzionale)
     * @returns {Object} Risultato dell'assegnazione
     */
    async execute(params) {
        try {
            console.log('👥 Executing Staff_AssignRole flow...', params);

            // 1. Validazione parametri
            const validation = this.validateAssignmentParams(params);
            if (!validation.isValid) {
                throw new Error(validation.error);
            }

            // 2. Recupera membro staff
            const staffMember = this.gameManager.gameData.staff.find(s => s.id === params.staffId);
            if (!staffMember) {
                throw new Error('Membro dello staff non trovato');
            }

            // 3. Verifica compatibilità ruolo
            const compatibility = this.checkRoleCompatibility(staffMember, params.newRole);
            if (!compatibility.compatible) {
                console.warn('⚠️ Role compatibility warning:', compatibility.warning);
            }

            // 4. Calcola impatto sui bonus squadra (prima del cambio)
            const oldBonuses = this.calculateTeamBonuses(staffMember.team_id);

            // 5. Aggiorna ruolo e responsabilità staff
            const roleUpdate = this.updateStaffRole(staffMember, params);

            // 6. Calcola nuovi bonus squadra
            const newBonuses = this.calculateTeamBonuses(staffMember.team_id);

            // 7. Aggiorna bonus squadra
            this.updateTeamBonuses(staffMember.team_id, newBonuses);

            // 8. Gestisci cambio squadra (se applicabile)
            if (params.teamId && params.teamId !== staffMember.team_id) {
                await this.processTeamTransfer(staffMember, params.teamId, oldBonuses);
            }

            // 9. Aggiorna morale staff e squadra
            this.updateMoraleAfterRoleChange(staffMember, roleUpdate);

            // 10. Genera eventi di notifica
            this.generateRoleChangeEvents(staffMember, roleUpdate);

            console.log('✅ Staff role assignment completed:', roleUpdate);

            return {
                success: true,
                staffId: staffMember.id,
                roleUpdate: roleUpdate,
                bonusChanges: {
                    old: oldBonuses,
                    new: newBonuses
                },
                compatibility: compatibility
            };

        } catch (error) {
            console.error('❌ Staff_AssignRole flow error:', error);
            
            // Genera evento di errore
            this.generateErrorEvent(params, error.message);
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    validateAssignmentParams(params) {
        if (!params.staffId) {
            return { isValid: false, error: 'ID staff mancante' };
        }

        if (!params.newRole) {
            return { isValid: false, error: 'Nuovo ruolo mancante' };
        }

        // Verifica ruoli validi
        const validRoles = [
            'head_coach', 'assistant_coach', 'fitness_coach', 'goalkeeping_coach',
            'scout', 'chief_scout', 'physio', 'team_doctor', 'analyst',
            'youth_coach', 'technical_director', 'sporting_director'
        ];

        if (!validRoles.includes(params.newRole)) {
            return { isValid: false, error: 'Ruolo non valido' };
        }

        // Verifica esistenza squadra (se specificata)
        if (params.teamId) {
            const team = this.gameManager.gameData.teams.find(t => t.id === params.teamId);
            if (!team) {
                return { isValid: false, error: 'Squadra di destinazione non trovata' };
            }
        }

        return { isValid: true };
    }

    checkRoleCompatibility(staffMember, newRole) {
        const currentRole = staffMember.role;
        const experience = staffMember.experience_years;
        
        // Matrice compatibilità ruoli
        const roleCompatibility = {
            'head_coach': {
                from: ['assistant_coach', 'youth_coach'],
                minExperience: 5,
                requiredSkills: ['coaching_ability', 'tactical_knowledge', 'motivational_skills']
            },
            'assistant_coach': {
                from: ['fitness_coach', 'youth_coach', 'analyst'],
                minExperience: 2,
                requiredSkills: ['coaching_ability', 'tactical_knowledge']
            },
            'fitness_coach': {
                from: ['physio', 'assistant_coach'],
                minExperience: 1,
                requiredSkills: ['fitness_expertise']
            },
            'scout': {
                from: ['analyst', 'youth_coach'],
                minExperience: 1,
                requiredSkills: ['scouting_ability']
            },
            'chief_scout': {
                from: ['scout'],
                minExperience: 3,
                requiredSkills: ['scouting_ability']
            },
            'technical_director': {
                from: ['head_coach', 'chief_scout'],
                minExperience: 8,
                requiredSkills: ['coaching_ability', 'tactical_knowledge', 'scouting_ability']
            }
        };

        const targetRole = roleCompatibility[newRole];
        
        if (!targetRole) {
            return { compatible: true, warning: null }; // Ruolo non in matrice = sempre compatibile
        }

        // Verifica esperienza minima
        if (experience < targetRole.minExperience) {
            return {
                compatible: false,
                warning: `Esperienza insufficiente. Richiesta: ${targetRole.minExperience} anni, attuale: ${experience} anni`
            };
        }

        // Verifica ruolo di provenienza
        if (targetRole.from.length > 0 && !targetRole.from.includes(currentRole)) {
            return {
                compatible: true,
                warning: `Transizione inusuale da ${currentRole} a ${newRole}. Potrebbe influire sull'efficacia.`
            };
        }

        // Verifica competenze richieste
        const missingSkills = targetRole.requiredSkills.filter(skill => {
            const skillValue = staffMember[skill] || 0;
            return skillValue < 60; // Soglia minima competenza
        });

        if (missingSkills.length > 0) {
            return {
                compatible: true,
                warning: `Competenze da migliorare: ${missingSkills.join(', ')}`
            };
        }

        return { compatible: true, warning: null };
    }

    updateStaffRole(staffMember, params) {
        const previousRole = staffMember.role;
        const previousSpecialization = staffMember.specialization;
        const previousIsHead = staffMember.is_head_of_department;

        // Aggiorna ruolo
        staffMember.role = params.newRole;
        
        // Aggiorna specializzazione se fornita
        if (params.specialization) {
            staffMember.specialization = params.specialization;
        }

        // Aggiorna status responsabile dipartimento
        if (params.isHeadOfDepartment !== undefined) {
            staffMember.is_head_of_department = params.isHeadOfDepartment;
        }

        // Adegua stipendio se specificato
        if (params.salaryAdjustment) {
            const newSalary = Math.max(0, staffMember.salary + params.salaryAdjustment);
            staffMember.salary = newSalary;
        } else {
            // Adeguamento automatico stipendio basato su ruolo
            staffMember.salary = this.calculateRoleSalary(params.newRole, staffMember.experience_years);
        }

        // Aggiorna timestamp
        staffMember.updated_at = new Date().toISOString();

        return {
            staffId: staffMember.id,
            staffName: `${staffMember.first_name} ${staffMember.last_name}`,
            previousRole: previousRole,
            newRole: params.newRole,
            previousSpecialization: previousSpecialization,
            newSpecialization: staffMember.specialization,
            previousIsHead: previousIsHead,
            newIsHead: staffMember.is_head_of_department,
            salaryChange: params.salaryAdjustment || 0,
            newSalary: staffMember.salary
        };
    }

    calculateRoleSalary(role, experience) {
        // Stipendi base per ruolo (settimanali)
        const baseSalaries = {
            'head_coach': 15000,
            'assistant_coach': 8000,
            'fitness_coach': 5000,
            'goalkeeping_coach': 4000,
            'scout': 3000,
            'chief_scout': 7000,
            'physio': 3500,
            'team_doctor': 6000,
            'analyst': 4000,
            'youth_coach': 3500,
            'technical_director': 20000,
            'sporting_director': 18000
        };

        const baseSalary = baseSalaries[role] || 3000;
        const experienceMultiplier = 1 + (experience * 0.05); // +5% per anno di esperienza
        
        return Math.round(baseSalary * experienceMultiplier);
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

        // Normalizza bonus (0-100)
        Object.keys(bonuses).forEach(key => {
            bonuses[key] = Math.min(100, Math.max(0, bonuses[key]));
        });

        return bonuses;
    }

    updateTeamBonuses(teamId, bonuses) {
        const team = this.gameManager.gameData.teams.find(t => t.id === teamId);
        if (!team) return;

        // Aggiorna bonus squadra (estende l'oggetto team)
        team.staff_bonuses = bonuses;
        team.updated_at = new Date().toISOString();

        console.log(`📊 Updated team bonuses for ${team.name}:`, bonuses);
    }

    async processTeamTransfer(staffMember, newTeamId, oldBonuses) {
        const oldTeamId = staffMember.team_id;
        const oldTeam = this.gameManager.gameData.teams.find(t => t.id === oldTeamId);
        const newTeam = this.gameManager.gameData.teams.find(t => t.id === newTeamId);

        // Cambia squadra
        staffMember.team_id = newTeamId;

        // Ricalcola bonus vecchia squadra
        const updatedOldBonuses = this.calculateTeamBonuses(oldTeamId);
        this.updateTeamBonuses(oldTeamId, updatedOldBonuses);

        // Aggiorna morale squadre
        if (oldTeam) {
            oldTeam.team_morale = Math.max(0, oldTeam.team_morale - 3); // Perdita staff
        }
        if (newTeam) {
            newTeam.team_morale = Math.min(100, newTeam.team_morale + 2); // Nuovo staff
        }

        console.log(`🔄 Staff transferred from ${oldTeam?.name} to ${newTeam?.name}`);
    }

    updateMoraleAfterRoleChange(staffMember, roleUpdate) {
        // Calcola impatto morale staff
        let staffMoraleChange = 0;
        
        // Promozione = morale positivo
        if (this.isPromotion(roleUpdate.previousRole, roleUpdate.newRole)) {
            staffMoraleChange = +15;
        }
        // Retrocessione = morale negativo
        else if (this.isDemotion(roleUpdate.previousRole, roleUpdate.newRole)) {
            staffMoraleChange = -10;
        }
        // Cambio laterale = leggero positivo
        else {
            staffMoraleChange = +5;
        }

        // Fattore stipendio
        if (roleUpdate.salaryChange > 0) {
            staffMoraleChange += 5;
        } else if (roleUpdate.salaryChange < 0) {
            staffMoraleChange -= 8;
        }

        // Applica cambiamento morale
        staffMember.morale = Math.max(0, Math.min(100, staffMember.morale + staffMoraleChange));

        // Aggiorna morale squadra (piccolo impatto)
        const team = this.gameManager.gameData.teams.find(t => t.id === staffMember.team_id);
        if (team) {
            const teamMoraleChange = staffMoraleChange > 0 ? +1 : -1;
            team.team_morale = Math.max(0, Math.min(100, team.team_morale + teamMoraleChange));
        }

        // Aggiorna record morale_status
        this.updateMoraleStatus(staffMember.id, 'staff', staffMoraleChange, 'role_change');
    }

    isPromotion(oldRole, newRole) {
        const hierarchy = {
            'assistant_coach': 1,
            'fitness_coach': 1,
            'scout': 1,
            'physio': 1,
            'analyst': 1,
            'youth_coach': 1,
            'goalkeeping_coach': 2,
            'team_doctor': 2,
            'chief_scout': 3,
            'head_coach': 4,
            'technical_director': 5,
            'sporting_director': 5
        };

        return (hierarchy[newRole] || 0) > (hierarchy[oldRole] || 0);
    }

    isDemotion(oldRole, newRole) {
        const hierarchy = {
            'assistant_coach': 1,
            'fitness_coach': 1,
            'scout': 1,
            'physio': 1,
            'analyst': 1,
            'youth_coach': 1,
            'goalkeeping_coach': 2,
            'team_doctor': 2,
            'chief_scout': 3,
            'head_coach': 4,
            'technical_director': 5,
            'sporting_director': 5
        };

        return (hierarchy[newRole] || 0) < (hierarchy[oldRole] || 0);
    }

    updateMoraleStatus(entityId, entityType, moraleChange, reason) {
        let moraleRecord = this.gameManager.gameData.moraleStatus.find(
            m => m.entity_id === entityId && m.entity_type === entityType
        );

        if (!moraleRecord) {
            // Crea nuovo record morale
            moraleRecord = {
                id: `morale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                entity_type: entityType,
                entity_id: entityId,
                current_morale: entityType === 'staff' ? 
                    this.gameManager.gameData.staff.find(s => s.id === entityId)?.morale || 50 : 50,
                base_morale: 50,
                recent_results_impact: 0,
                training_impact: 0,
                transfer_impact: moraleChange,
                injury_impact: 0,
                team_chemistry_impact: 0,
                fan_support_impact: 0,
                media_pressure_impact: 0,
                personal_issues_impact: 0,
                achievement_impact: 0,
                morale_trend: moraleChange > 0 ? 'rising' : moraleChange < 0 ? 'declining' : 'stable',
                last_significant_event: reason,
                event_date: new Date().toISOString(),
                recovery_rate: 1,
                stability_factor: 1,
                next_evaluation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            this.gameManager.gameData.moraleStatus.push(moraleRecord);
        } else {
            // Aggiorna record esistente
            moraleRecord.transfer_impact += moraleChange;
            moraleRecord.current_morale = Math.max(0, Math.min(100, moraleRecord.current_morale + moraleChange));
            moraleRecord.morale_trend = moraleChange > 0 ? 'rising' : moraleChange < 0 ? 'declining' : 'stable';
            moraleRecord.last_significant_event = reason;
            moraleRecord.event_date = new Date().toISOString();
            moraleRecord.updated_at = new Date().toISOString();
        }
    }

    generateRoleChangeEvents(staffMember, roleUpdate) {
        const team = this.gameManager.gameData.teams.find(t => t.id === staffMember.team_id);
        const staffName = `${staffMember.first_name} ${staffMember.last_name}`;
        
        let eventTitle, eventDescription, eventCategory;
        
        if (this.isPromotion(roleUpdate.previousRole, roleUpdate.newRole)) {
            eventTitle = `Promozione Staff: ${staffName}`;
            eventDescription = `${staffName} è stato promosso da ${roleUpdate.previousRole} a ${roleUpdate.newRole} in ${team?.name}`;
            eventCategory = 'success';
        } else if (this.isDemotion(roleUpdate.previousRole, roleUpdate.newRole)) {
            eventTitle = `Cambio Ruolo: ${staffName}`;
            eventDescription = `${staffName} è stato riassegnato da ${roleUpdate.previousRole} a ${roleUpdate.newRole} in ${team?.name}`;
            eventCategory = 'warning';
        } else {
            eventTitle = `Nuovo Ruolo: ${staffName}`;
            eventDescription = `${staffName} ha cambiato ruolo da ${roleUpdate.previousRole} a ${roleUpdate.newRole} in ${team?.name}`;
            eventCategory = 'info';
        }

        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'staff',
            event_category: eventCategory,
            title: eventTitle,
            description: eventDescription,
            related_entity_type: 'staff',
            related_entity_id: staffMember.id,
            team_id: team?.is_user_team ? team.id : null,
            player_id: null,
            match_id: null,
            priority: team?.is_user_team ? 3 : 1,
            is_read: false,
            is_user_relevant: team?.is_user_team || false,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };
        
        this.gameManager.gameData.gameEvents.push(gameEvent);
    }

    generateErrorEvent(params, errorMessage) {
        const gameEvent = {
            id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_type: 'staff',
            event_category: 'error',
            title: 'Errore Assegnazione Ruolo Staff',
            description: `Errore durante l'assegnazione del ruolo: ${errorMessage}`,
            related_entity_type: 'staff',
            related_entity_id: params.staffId,
            team_id: null,
            player_id: null,
            match_id: null,
            priority: 2,
            is_read: false,
            is_user_relevant: true,
            auto_generated: true,
            expires_at: null,
            action_required: false,
            action_type: null,
            action_data: null,
            event_date: new Date().toISOString(),
            game_date: this.gameManager.getCurrentDate(),
            created_at: new Date().toISOString()
        };
        
        this.gameManager.gameData.gameEvents.push(gameEvent);
    }
}