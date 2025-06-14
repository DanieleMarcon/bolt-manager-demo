import { transfersDataset } from "../datasets/transfers.js";
import { teamsDataset } from "../datasets/teams.js";
import { playersDataset } from "../datasets/players.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Transfer_StartNegotiation Flow
 * Inizia una nuova trattativa di trasferimento per un giocatore.
 * @param {Object} params
 * @param {string} params.player_id - ID del giocatore target
 * @param {string} params.from_team_id - ID della squadra offerente
 * @param {string} params.to_team_id - ID della squadra proprietaria del giocatore
 * @param {number} params.fee - Importo iniziale offerta di trasferimento
 * @param {Object} params.contractTerms - Termini contrattuali proposti (salary, duration, bonuses)
 * @returns {Promise<Object>} Dettagli della trattativa creata
 */
export async function Transfer_StartNegotiation({ player_id, from_team_id, to_team_id, fee, contractTerms } = {}) {
  try {
    // Validazioni di base
    if (!player_id || !from_team_id || !to_team_id) {
      throw new Error("Parametri obbligatori mancanti per l'avvio della trattativa");
    }
    if (from_team_id === to_team_id) {
      throw new Error("La squadra offerente e quella proprietaria non possono coincidere");
    }
    if (typeof fee !== 'number' || fee <= 0) {
      throw new Error("Fee non valida");
    }

    // 1. Verifica budget disponibile
    const fromTeam = await teamsDataset.get(from_team_id);
    if (fromTeam.budget < fee) {
      throw new Error("Budget insufficiente per l'offerta");
    }

    // 2. Crea record trattativa
    const negotiation = await transfersDataset.create({
      player_id,
      from_team_id,
      to_team_id,
      fee,
      contractTerms,
      status: 'negotiating',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // 3. Notifica evento di inizio trattativa
    await gameEvents.add({
      type: 'transfer_negotiation_started',
      teamId: from_team_id,
      description: `Iniziata trattativa per giocatore ${player_id} con offerta di €${fee}`
    });

    // 4. Restituisci i dettagli della trattativa
    return negotiation;

  } catch (error) {
    console.error("Error in Transfer_StartNegotiation:", error);
    throw error;
  }
}
