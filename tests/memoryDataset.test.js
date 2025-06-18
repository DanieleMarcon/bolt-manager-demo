const assert = require('assert');

(async () => {
  const { default: createMemoryDataset } = await import('../bolt_src/datasets/createMemoryDataset.js');
  const ds = createMemoryDataset();

  // dataset should start empty
  assert.deepStrictEqual(await ds.getAll(), []);

  const record = { id: 'r1', name: 'Test' };
  await ds.create(record);

  assert.strictEqual((await ds.get('r1')).name, 'Test');
  assert.strictEqual((await ds.getAll()).length, 1);

  await ds.update('r1', { name: 'Updated' });
  assert.strictEqual((await ds.get('r1')).name, 'Updated');

  await ds.delete('r1');
  assert.strictEqual((await ds.getAll()).length, 0);

  console.log('memoryDataset tests passed');
})();