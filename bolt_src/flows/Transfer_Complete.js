import { transfersDataset } from "../datasets/transfers.js";
import { teamsDataset } from "../datasets/teams.js";
import { playersDataset } from "../datasets/players.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Transfer_Complete Flow
 * Completa o annulla una trattativa di trasferimento.
 * - Se accepted=true: trasferisce il giocatore, aggiorna budget squadre e contratto
 * - Se accepted=false: segna trattativa come fallita
 * @param {Object} params
 * @param {string} params.transfer_id - ID della trattativa
 * @param {boolean} params.accepted - Stato finale (true=accettata, false=rifiutata)
 * @returns {Promise<Object>} Stato finale della trattativa
 */
export async function Transfer_Complete({ transfer_id, accepted } = {}) {
  try {
    if (!transfer_id) throw new Error("Transfer ID mancante");

    // 1. Recupera record della trattativa
    const transfer = await transfersDataset.get(transfer_id);
    if (!transfer) throw new Error(`Trattativa con ID ${transfer_id} non trovata`);

    // 2. Se accettata: esegui il trasferimento
    if (accepted) {
      // Aggiorna proprietà del giocatore
      await playersDataset.update(transfer.player_id, { team_id: transfer.to_team_id });

      // Aggiorna budget delle squadre
      await teamsDataset.update(transfer.from_team_id, {
        budget: (await teamsDataset.get(transfer.from_team_id)).budget + transfer.fee
      });
      await teamsDataset.update(transfer.to_team_id, {
        budget: (await teamsDataset.get(transfer.to_team_id)).budget - transfer.fee
      });

      // Aggiorna stato del contratto e dataset transfers
      await transfersDataset.update(transfer_id, { status: 'completed', completedAt: new Date().toISOString() });

      // Notifica evento
      await gameEvents.add({
        type: 'transfer_completed',
        teamId: transfer.to_team_id,
        description: `Trasferimento completato: giocatore ${transfer.player_id} da ${transfer.from_team_id} a ${transfer.to_team_id}`
      });

    } else {
      // 3. Se rifiutata: aggiorna stato a failed
      await transfersDataset.update(transfer_id, { status: 'failed', completedAt: new Date().toISOString() });
      await gameEvents.add({
        type: 'transfer_failed',
        teamId: transfer.from_team_id,
        description: `La trattativa per il giocatore ${transfer.player_id} è fallita`
      });
    }

    // 4. Restituisci stato aggiornato
    const updated = await transfersDataset.get(transfer_id);
    return updated;

  } catch (error) {
    console.error("Error in Transfer_Complete:", error);
    throw error;
  }
}
