import { trainingsDataset } from "../datasets/trainings.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Training_ApplyPlan Flow
 * Applica un piano di allenamento settimanale per la squadra specificata.
 * @param {Object} params
 * @param {string} params.team_id - ID della squadra
 * @param {number} params.week - Numero della settimana di gioco
 * @param {Array<Object>} params.plan - Array di slot allenamento: { day: number, slotIndex: number, type: string }
 * @returns {Promise<Object>} Riepilogo della pianificazione applicata
 */
export async function Training_ApplyPlan({ team_id, week, plan } = {}) {
  try {
    if (!team_id) throw new Error("Team ID mancante");
    if (typeof week !== 'number') throw new Error("Week non valida");
    if (!Array.isArray(plan)) throw new Error("Plan non valido");

    const appliedSlots = [];
    // Salvare ogni slot nel dataset trainings
    for (const slot of plan) {
      const { day, slotIndex, type } = slot;
      const record = await trainingsDataset.create({
        team_id,
        week,
        day,
        slotIndex,
        type,
        appliedAt: new Date().toISOString()
      });
      appliedSlots.push(record);
    }

    // Generare evento di notifica per l'utente
    await gameEvents.add({
      type: 'training_plan_applied',
      teamId: team_id,
      description: `Piano allenamento applicato per settimana ${week}`
    });

    // Restituire riepilogo degli slot applicati
    return {
      team_id,
      week,
      appliedCount: appliedSlots.length,
      slots: appliedSlots
    };
  } catch (error) {
    console.error("Error in Training_ApplyPlan:", error);
    throw error;
  }
}
