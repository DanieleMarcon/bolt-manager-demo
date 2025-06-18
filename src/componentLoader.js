// Auto-load and initialize components based on DOM elements
// Scans bolt_src/components for modules and instantiates them for matching selectors

// When served without a bundler (e.g. opening index.html directly) `import.meta.glob`
// is undefined. Fallback to an empty map so the script doesn't throw errors.
const componentModules = typeof import.meta.glob === 'function'
  ? import.meta.glob('../bolt_src/components/*.js')
  : {};

function toSelector(name) {
  return '.' + name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
}

export async function initializeComponents(root = document) {
  for (const [path, loader] of Object.entries(componentModules)) {
    const module = await loader();
    const Component = module.default;
    if (!Component) continue;
    const base = path.split('/').pop().replace('.js', '');
    const selector = toSelector(base);

    root.querySelectorAll(selector).forEach(el => {
      if (el.dataset.initialized) return;
      const options = el.dataset.options ? JSON.parse(el.dataset.options) : {};
      try {
        new Component(el, options);
        el.dataset.initialized = 'true';
      } catch (err) {
        console.error(`Failed to init ${base}`, err);
      }
    });
  }
}

export default initializeComponents;