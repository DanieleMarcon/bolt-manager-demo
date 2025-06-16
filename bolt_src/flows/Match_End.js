import { Match_GenerateReport } from "./Match_GenerateReport.js";
import { Match_Simulate } from "./Match_Simulate.js";

/**
 * Match_End Flow
 * Gestisce la fase di chiusura di una partita:
 * - Simula se non già simulata
 * - Genera report dettagliato
 * - Aggiorna classifiche e morale
 * @param {Object} params
 * @param {string} params.match_id - ID della partita da chiudere
 * @returns {Promise<Object>} Il report finale della partita
 */
export async function Match_End({ match_id } = {}) {
  try {
    // 1. Assicurarsi che la partita sia stata simulata
    const simulationResult = await Match_Simulate({ match_id });

    // 2. Generare il report dettagliato
    const report = await Match_GenerateReport({ match_id });

    // 3. Eventuali operazioni di post-elaborazione:
    //    - Aggiornamento morale giocatori e squadra
    //    - Aggiornamento classifiche
    //    (implementare logica in futuro)
    console.log(`Match ${match_id} ended. Report generated.`);

    // 4. Restituire il report finale
    return { simulationResult, report };
  } catch (error) {
    console.error("Error in Match_End:", error);
    throw error;
  }
}
