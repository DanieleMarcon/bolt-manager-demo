import { discoveryLevelDataset } from "../datasets/discovery_level.js";
import { attributeMaskingDataset } from "../datasets/attribute_masking.js";
import { scoutingAccuracyDataset } from "../datasets/scouting_accuracy.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Scouting_Discover Flow
 * Inizia o aggiorna la fase di scoperta di un giocatore da parte di uno scout.
 * - Imposta lo stato di discovery a 'in_progress'
 * - Inizializza progressi e riduce parzialmente il mascheramento attributi
 * - Registra un evento di scouting
 * @param {Object} params
 * @param {string} params.scout_id - ID dell'osservatore
 * @param {string} params.player_id - ID del giocatore da osservare
 * @returns {Promise<Object>} Stato di discovery aggiornato
 */
export async function Scouting_Discover({ scout_id, player_id } = {}) {
  try {
    if (!scout_id || !player_id) {
      throw new Error("Parametri mancanti: scout_id e player_id sono obbligatori");
    }

    // 1. Inizializza o aggiorna il livello di scoperta
    const existing = await discoveryLevelDataset.query({ scout_id, player_id });
    let record;
    if (existing.length > 0) {
      // reset progress if already present
      record = await discoveryLevelDataset.update(existing[0].id, {
        status: 'in_progress',
        progress: 0,
        startedAt: new Date().toISOString()
      });
    } else {
      // crea nuovo record di scoperta
      record = await discoveryLevelDataset.create({
        scout_id,
        player_id,
        status: 'in_progress',
        progress: 0,
        startedAt: new Date().toISOString()
      });
    }

    // 2. Riduci mascheramento attributi iniziale (es. 20%)
    await attributeMaskingDataset.update(player_id, {
      maskingPercent: Math.max(0, (await attributeMaskingDataset.get(player_id)).maskingPercent - 20)
    });

    // 3. Inizializza accuratezza scouting
    await scoutingAccuracyDataset.create({
      scout_id,
      player_id,
      accuracy: 0,
      updatedAt: new Date().toISOString()
    });

    // 4. Genera evento di scouting
    await gameEvents.add({
      type: 'scouting_discover_started',
      playerId: player_id,
      scoutId: scout_id,
      description: `Lo scout ${scout_id} ha iniziato l'osservazione di ${player_id}`
    });

    return record;
  } catch (error) {
    console.error("Error in Scouting_Discover:", error);
    throw error;
  }
}
