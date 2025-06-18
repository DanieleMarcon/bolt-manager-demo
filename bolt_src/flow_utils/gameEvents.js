
Nuovo
+46
-0

import { createDataset } from "../datasets/createDataset.js";

// In-memory dataset for game events
const dataset = createDataset();

export const gameEvents = {
  /**
   * Add a new game event record
   * @param {Object} event - event payload
   * @returns {Promise<Object>} created event with id
   */
  async add(event) {
    const payload = {
      ...event,
      read: false,
      createdAt: new Date().toISOString(),
    };
    return dataset.create(payload);
  },

  /**
   * Retrieve events matching a filter
   * @param {Object} filter - query filter
   * @returns {Promise<Array>} matching events
   */
  async get(filter = {}) {
    if (filter.id) {
      const rec = await dataset.get(filter.id);
      return rec ? [rec] : [];
    }
    if (dataset.query) {
      return dataset.query(filter);
    }
    const all = await dataset.all();
    return all.filter(ev => Object.entries(filter).every(([k, v]) => ev[k] === v));
  },

  /**
   * Mark an event as read
   * @param {string} id - event id
   * @returns {Promise<Object>} updated event
   */
  async markAsRead(id) {
    return dataset.update(id, { read: true });
  }
};