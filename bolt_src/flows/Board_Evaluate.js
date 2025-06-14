import { boardFeedbackDataset } from "../datasets/board_feedback.js";
import { teamsDataset } from "../datasets/teams.js";
import { financesDataset } from "../datasets/finances.js";
import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Board_Evaluate Flow
 * Esegue la valutazione trimestrale/mensile del consiglio di amministrazione,
 * calcolando la fiducia del board sulla base dei risultati tecnici ed economici.
 * @param {Object} params
 * @param {string} params.team_id - ID della squadra
 * @param {string} [params.period='monthly'] - Periodo di valutazione ('monthly'|'quarterly')
 * @returns {Promise<Object>} Stato aggiornato del feedback del board
 */
export async function Board_Evaluate({ team_id, period = 'monthly' } = {}) {
  try {
    if (!team_id) throw new Error("Team ID mancante per Board_Evaluate");

    // 1. Leggi stato finanziario e performance squadra
    const team = await teamsDataset.get(team_id);
    const finances = await financesDataset.query({ team_id });
    // Placeholder: calcolo semplicistico della fiducia
    const profit = finances.reduce((sum, tx) => sum + (tx.type === 'income' ? tx.amount : -tx.amount), 0);
    const performanceScore = team.wins / (team.wins + team.losses + 1);
    const trustScore = Math.max(0, Math.min(100, (profit / 10000) + (performanceScore * 50)));

    // 2. Aggiorna dataset board_feedback
    const feedback = await boardFeedbackDataset.create({
      team_id,
      period,
      trust: trustScore,
      evaluatedAt: new Date().toISOString()
    });

    // 3. Genera evento di notifica per l'utente
    await gameEvents.add({
      type: 'board_evaluate',
      teamId: team_id,
      description: `Valutazione board (${period}): fiducia ${trustScore.toFixed(1)}%`
    });

    return feedback;
  } catch (error) {
    console.error("Error in Board_Evaluate:", error);
    throw error;
  }
}
