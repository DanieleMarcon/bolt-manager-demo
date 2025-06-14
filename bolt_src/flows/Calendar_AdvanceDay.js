import { GameFlow_AdvanceDay } from "./GameFlow_AdvanceDay.js";

/**
 * Calendar_AdvanceDay Flow
 * Avanza il calendario di gioco di un numero specificato di giorni e restituisce gli eventi programmati.
 * @param {Object} params
 * @param {number} params.days - Numero di giorni da avanzare (default=1)
 * @returns {Promise<Object>} Risultato dell'avanzamento (nuova data, eventi generati)
 */
export async function Calendar_AdvanceDay({ days = 1 } = {}) {
  try {
    // Chiamiamo il flusso core GameFlow_AdvanceDay
    const result = await GameFlow_AdvanceDay({ days });

    // Eventuale logica aggiuntiva per Calendar: filtro o aggregazione eventi
    // Ad esempio, possiamo estrarre solo gli eventi rilevanti per la vista calendario
    const { newDate, events } = result;
    const calendarEvents = events.filter(evt => evt.date <= newDate);

    return { newDate, calendarEvents };
  } catch (error) {
    console.error("Error in Calendar_AdvanceDay:", error);
    throw error;
  }
}
