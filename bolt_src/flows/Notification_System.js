import { gameEvents } from "../flow_utils/gameEvents.js";

/**
 * Notification_System Flow
 * Recupera le notifiche non lette per un team e, opzionalmente, le segna come lette.
 * @param {Object} params
 * @param {string} params.team_id - ID della squadra
 * @param {boolean} [params.markRead=false] - Se true, segna le notifiche restituite come lette
 * @returns {Promise<Array>} Lista di notifiche non lette
 */
export async function Notification_System({ team_id, markRead = false } = {}) {
  try {
    if (!team_id) throw new Error("Team ID mancante per Notification_System");

    // Recupera notifiche non lette per la squadra
    const notifications = await gameEvents.get({ teamId: team_id, read: false });

    // Segna come lette se richiesto
    if (markRead && notifications.length > 0) {
      for (const note of notifications) {
        await gameEvents.markAsRead(note.id);
      }
    }

    return notifications;
  } catch (error) {
    console.error("Error in Notification_System:", error);
    throw error;
  }
}
