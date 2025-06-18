export function createDataset(initialData = []) {
  const data = Array.isArray(initialData) ? [...initialData] : [];
  const genId = () =>
    (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
  return {
    async get(id) {
      return data.find(item => item.id === id) || null;
    },
    async query(filter = {}) {
      return data.filter(item =>
        Object.entries(filter).every(([k, v]) => item[k] === v)
      );
    },
    async create(record) {
      const newRecord = { id: genId(), ...record };
      data.push(newRecord);
      return newRecord;
    },
    async update(id, updates) {
      const idx = data.findIndex(item => item.id === id);
      if (idx === -1) throw new Error('Record not found');
      data[idx] = { ...data[idx], ...updates };
      return data[idx];
    },
    async remove(id) {
      const idx = data.findIndex(item => item.id === id);
      if (idx !== -1) data.splice(idx, 1);
    },
    async all() {
      return [...data];
    }
  };
}