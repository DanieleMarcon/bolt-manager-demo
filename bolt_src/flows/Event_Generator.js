import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Event_Generator Flow
 * Genera eventi casuali o programmati nel gioco per notifiche all'utente.
 * @param {Object} params
 * @param {string} [params.team_id] - ID della squadra coinvolta (opzionale)
 * @param {string} params.type - Tipo di evento da generare
 * @param {string} params.description - Descrizione testuale dell'evento
 * @param {Object} [params.metadata] - Dati aggiuntivi rilevanti per l'evento
 * @returns {Promise<Object>} L'evento creato
 */
export async function Event_Generator({ team_id = null, type, description, metadata = {} } = {}) {
  try {
    if (!type || !description) {
      throw new Error("Parametri obbligatori mancanti: type e description sono richiesti.");
    }

    // Costruzione payload evento
    const eventPayload = {
      type,
      description,
      teamId: team_id,
      metadata,
      generatedAt: new Date().toISOString()
    };

    // Aggiungi evento al sistema di notifiche
    const createdEvent = await gameEvents.add(eventPayload);

    return createdEvent;
  } catch (error) {
    console.error("Error in Event_Generator:", error);
    throw error;
  }
}
