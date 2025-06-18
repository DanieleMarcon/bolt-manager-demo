export const template = `
<div class="settings-tab-navigation">
  <div class="tabs-header">
    <h3 class="tabs-title">Impostazioni</h3>
    <button class="tabs-toggle-btn" aria-label="Mostra/nascondi menu" aria-expanded="true">
      <span class="toggle-icon">≡</span>
    </button>
  </div>
  
  <div class="tabs-list">
    <button class="tab-btn active" data-tab="general" aria-selected="true">
      <span class="tab-icon">⚙️</span>
      <span class="tab-text">Generali</span>
    </button>
    
    <button class="tab-btn" data-tab="appearance" aria-selected="false">
      <span class="tab-icon">🎨</span>
      <span class="tab-text">Aspetto</span>
    </button>
    
    <button class="tab-btn" data-tab="gameplay" aria-selected="false">
      <span class="tab-icon">🎮</span>
      <span class="tab-text">Gameplay</span>
    </button>
    
    <button class="tab-btn" data-tab="audio" aria-selected="false">
      <span class="tab-icon">🔊</span>
      <span class="tab-text">Audio</span>
    </button>
    
    <button class="tab-btn" data-tab="notifications" aria-selected="false">
      <span class="tab-icon">🔔</span>
      <span class="tab-text">Notifiche</span>
    </button>
    
    <button class="tab-btn" data-tab="accessibility" aria-selected="false">
      <span class="tab-icon">♿</span>
      <span class="tab-text">Accessibilità</span>
    </button>
    
    <button class="tab-btn" data-tab="language" aria-selected="false">
      <span class="tab-icon">🌐</span>
      <span class="tab-text">Lingua</span>
    </button>
    
    <button class="tab-btn" data-tab="data" aria-selected="false">
      <span class="tab-icon">💾</span>
      <span class="tab-text">Dati</span>
    </button>
    
    <button class="tab-btn" data-tab="about" aria-selected="false">
      <span class="tab-icon">ℹ️</span>
      <span class="tab-text">Info</span>
    </button>
  </div>
</div>
<style>
.settings-tab-navigation {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border);
}

.tabs-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.tabs-toggle-btn {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.tabs-toggle-btn:hover {
  background: var(--border);
  color: var(--text);
}

.tabs-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: var(--background);
}

.tab-btn.active {
  background: var(--primary);
  color: white;
}

.tab-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.tab-text {
  font-size: 14px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .tabs-toggle-btn {
    display: block;
  }
  
  .tabs-list {
    display: none;
  }
  
  .settings-tab-navigation.expanded .tabs-list {
    display: flex;
  }
}
</style>
`;

class SettingsTabNavigation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onTabChange: null,
      defaultTab: 'general',
      ...options
    };
    
    this.currentTab = this.options.defaultTab;
    this.isExpanded = true;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setActiveTab(this.currentTab);
  }
  
  bindEvents() {
    // Tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.setActiveTab(tab);
      });
    });
    
    // Toggle button (mobile)
    this.element.querySelector('.tabs-toggle-btn').addEventListener('click', () => {
      this.toggleExpanded();
    });
    
    // Keyboard navigation
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateWithKeyboard(e.key === 'ArrowDown' ? 1 : -1);
      }
    });
  }
  
  setActiveTab(tab) {
    this.currentTab = tab;
    
    // Update tab buttons
    this.element.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
    
    // Call tab change callback if provided
    if (typeof this.options.onTabChange === 'function') {
      this.options.onTabChange(tab);
    }
    
    // Dispatch tab change event
    this.element.dispatchEvent(new CustomEvent('tabChange', {
      detail: { tab }
    }));
    
    // On mobile, collapse after selection
    if (window.innerWidth <= 768) {
      this.isExpanded = false;
      this.element.classList.remove('expanded');
    }
  }
  
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    this.element.classList.toggle('expanded', this.isExpanded);
    
    // Update ARIA attributes
    this.element.querySelector('.tabs-toggle-btn').setAttribute('aria-expanded', this.isExpanded);
  }
  
  navigateWithKeyboard(direction) {
    const tabs = Array.from(this.element.querySelectorAll('.tab-btn'));
    const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    
    if (currentIndex === -1) return;
    
    // Calculate new index with wrapping
    const newIndex = (currentIndex + direction + tabs.length) % tabs.length;
    
    // Activate new tab
    const newTab = tabs[newIndex].dataset.tab;
    this.setActiveTab(newTab);
    
    // Focus new tab button
    tabs[newIndex].focus();
  }
  
  // Public methods
  getCurrentTab() {
    return this.currentTab;
  }
  
  setTab(tab) {
    const tabBtn = this.element.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (tabBtn) {
      this.setActiveTab(tab);
    }
  }
  
  isTabAvailable(tab) {
    return !!this.element.querySelector(`.tab-btn[data-tab="${tab}"]`);
  }
  
  expand() {
    this.isExpanded = true;
    this.element.classList.add('expanded');
    this.element.querySelector('.tabs-toggle-btn').setAttribute('aria-expanded', true);
  }
  
  collapse() {
    this.isExpanded = false;
    this.element.classList.remove('expanded');
    this.element.querySelector('.tabs-toggle-btn').setAttribute('aria-expanded', false);
  }
}

export default SettingsTabNavigation;