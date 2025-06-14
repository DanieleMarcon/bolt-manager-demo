import { financesDataset } from "../datasets/finances.js";
import { teamsDataset } from "../datasets/teams.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Finance_Update Flow
 * Gestisce una transazione economica per il club:
 * - Crea la voce di bilancio (entrata/uscita)
 * - Aggiorna il budget corrente della squadra
 * - Genera un evento di notifica
 * @param {Object} params
 * @param {string} params.team_id - ID della squadra
 * @param {Object} params.transaction - Dati transazione {
 *   type: 'income' | 'expense',
 *   category: string,
 *   amount: number,
 *   description: string
 * }
 * @returns {Promise<Object>} La transazione registrata
 */
export async function Finance_Update({ team_id, transaction } = {}) {
  try {
    if (!team_id) throw new Error("Team ID mancante");
    if (!transaction || typeof transaction.amount !== 'number') {
      throw new Error("Dati transazione non validi");
    }

    // 1. Creazione record transazione
    const record = await financesDataset.create({
      team_id,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: new Date().toISOString()
    });

    // 2. Aggiornamento budget squadra
    const team = await teamsDataset.get(team_id);
    const newBudget = transaction.type === 'income'
      ? team.budget + transaction.amount
      : team.budget - transaction.amount;
    await teamsDataset.update(team_id, { budget: newBudget });

    // 3. Generazione evento di gioco
    await gameEvents.add({
      type: 'finance_update',
      teamId: team_id,
      description: `${transaction.type === 'income' ? 'Entrata' : 'Uscita'}: €${transaction.amount} (${transaction.category})`
    });

    return record;
  } catch (error) {
    console.error("Error in Finance_Update:", error);
    throw error;
  }
}
