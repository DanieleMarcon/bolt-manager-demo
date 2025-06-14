import { staffDataset } from "../datasets/staff.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Staff_Hire Flow
 * Assolda un nuovo membro dello staff per la squadra specificata.
 * @param {Object} params
 * @param {string} params.team_id - ID della squadra che assume
 * @param {Object} params.staffData - Dati del membro staff { name, role, salary, contractLength }
 * @returns {Promise<Object>} Dettagli del nuovo staff member
 */
export async function Staff_Hire({ team_id, staffData } = {}) {
  try {
    // 1. Validazione input di base
    if (!team_id) {
      throw new Error("Team ID mancante");
    }
    if (!staffData || !staffData.name || !staffData.role) {
      throw new Error("Dati del membro staff incompleti");
    }

    // 2. Creazione record staff nel dataset
    const newStaff = await staffDataset.create({
      team_id,
      ...staffData,
      hireDate: new Date().toISOString(),
    });

    // 3. Generazione evento di gioco per notifica
    await gameEvents.add({
      type: "staff_hired",
      teamId: team_id,
      staffId: newStaff.id,
      description: `Assunzione: ${newStaff.name} come ${newStaff.role}`
    });

    // 4. Restituire il nuovo membro dello staff
    return newStaff;
  } catch (error) {
    console.error("Error in Staff_Hire:", error);
    throw error;
  }
}
