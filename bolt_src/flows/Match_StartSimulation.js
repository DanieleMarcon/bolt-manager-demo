import { Match_Simulate } from "./Match_Simulate.js";
import { Event_Generator } from "./Event_Generator.js";

/**
 * Match_StartSimulation Flow
 * Inizia la simulazione di una partita:
 * - Genera un evento di inizio partita
 * - Esegue Match_Simulate per elaborare la partita
 * - Genera un evento di fine simulazione
 * @param {Object} params
 * @param {string} params.match_id - ID della partita da simulare
 * @param {Object} params.tactics - Configurazione tattica da applicare
 * @returns {Promise<Object>} Report completo generato da Match_Simulate
 */
export async function Match_StartSimulation({ match_id, tactics }) {
  try {
    if (!match_id) throw new Error("match_id è obbligatorio per iniziare la simulazione");

    // 1. Notifica inizio simulazione
    await Event_Generator({
      type: 'match_start',
      description: `Inizio simulazione partita ID: ${match_id}`,
      metadata: { match_id }
    });

    // 2. Esegui la simulazione vera e propria
    const report = await Match_Simulate({ match_id, tactics });

    // 3. Notifica fine simulazione
    await Event_Generator({
      type: 'match_end',
      description: `Simulazione partita completata ID: ${match_id}`,
      metadata: { match_id }
    });

    return report;
  } catch (error) {
    console.error("Error in Match_StartSimulation:", error);
    throw error;
  }
}
