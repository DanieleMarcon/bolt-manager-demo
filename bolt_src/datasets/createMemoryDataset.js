export default function createMemoryDataset(initial = []) {
  const records = Array.isArray(initial) ? [...initial] : [];
  return {
    async get(id) {
      return records.find(r => r.id === id);
    },
    async getAll() {
      return [...records];
    },
    async create(record) {
      records.push(record);
      return record;
    },
    async update(id, updates) {
      const rec = records.find(r => r.id === id);
      if (!rec) throw new Error('Record not found');
      Object.assign(rec, updates);
      return rec;
    },
    async delete(id) {
      const idx = records.findIndex(r => r.id === id);
      if (idx !== -1) {
        const [deleted] = records.splice(idx, 1);
        return deleted;
      }
      return null;
    }
  };
}