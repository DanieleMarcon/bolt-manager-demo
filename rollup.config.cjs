const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');

const input = { main: resolve(__dirname, 'src/main.js') };

const pagesDir = resolve(__dirname, 'bolt_src/pages');
const componentsDir = resolve(__dirname, 'bolt_src/components');

for (const file of readdirSync(pagesDir)) {
  if (!file.endsWith('.js')) continue;
  const full = resolve(pagesDir, file);
  const firstChar = readFileSync(full, 'utf8').trim()[0];
  if (firstChar === '<') continue;
  input[`pages/${file.replace(/\.js$/, '')}`] = full;
}

for (const file of readdirSync(componentsDir)) {
  if (!file.endsWith('.js')) continue;
  const full = resolve(componentsDir, file);
  const firstChar = readFileSync(full, 'utf8').trim()[0];
  if (firstChar === '<') continue;
  input[`components/${file.replace(/\.js$/, '')}`] = full;
}

module.exports = {
  input,
  plugins: [nodeResolve()],
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js'
  }
};