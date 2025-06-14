import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Game_Timeline Flow
 * Recupera la timeline degli eventi di gioco per una squadra o per la sessione,
 * eventualmente filtrandoli per intervallo temporale.
 * @param {Object} params
 * @param {string} [params.team_id] - ID della squadra (opzionale)
 * @param {string} [params.from] - ISO date di inizio filtro (opzionale)
 * @param {string} [params.to] - ISO date di fine filtro (opzionale)
 * @returns {Promise<Array>} Lista eventi ordinata cronologicamente
 */
export async function Game_Timeline({ team_id = null, from = null, to = null } = {}) {
  try {
    // 1. Recupera tutti gli eventi (filtra per team se fornito)
    const filter = {};
    if (team_id) filter.teamId = team_id;
    const events = await gameEvents.get(filter);

    // 2. Filtra per intervallo temporale
    let timeline = events;
    if (from) {
      timeline = timeline.filter(ev => new Date(ev.generatedAt) >= new Date(from));
    }
    if (to) {
      timeline = timeline.filter(ev => new Date(ev.generatedAt) <= new Date(to));
    }

    // 3. Ordina cronologicamente (data più vecchia prima)
    timeline.sort((a, b) => new Date(a.generatedAt) - new Date(b.generatedAt));

    return timeline;
  } catch (error) {
    console.error("Error in Game_Timeline:", error);
    throw error;
  }
}
