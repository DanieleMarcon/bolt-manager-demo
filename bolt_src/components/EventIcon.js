<div class="event-icon" data-event-type="" role="img">
  <div class="icon-container">
    <div class="icon-symbol"></div>
  </div>
  <div class="event-tooltip"></div>
</div>

<style>
.event-icon {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}

.icon-container {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.event-icon:hover .icon-container {
  transform: scale(1.1);
}

.icon-symbol {
  font-size: 14px;
  line-height: 1;
}

.event-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
}

.event-icon:hover .event-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-4px);
}

/* Event type specific styles */
.event-icon[data-event-type="match"] .icon-container {
  background: var(--error);
  color: white;
}

.event-icon[data-event-type="match"] .icon-symbol::before {
  content: '⚽';
}

.event-icon[data-event-type="training"] .icon-container {
  background: var(--primary);
  color: white;
}

.event-icon[data-event-type="training"] .icon-symbol::before {
  content: '🏃';
}

.event-icon[data-event-type="rest"] .icon-container {
  background: var(--success);
  color: white;
}

.event-icon[data-event-type="rest"] .icon-symbol::before {
  content: '🛌';
}

.event-icon[data-event-type="transfer"] .icon-container {
  background: var(--secondary);
  color: white;
}

.event-icon[data-event-type="transfer"] .icon-symbol::before {
  content: '💰';
}

.event-icon[data-event-type="injury"] .icon-container {
  background: var(--warning);
  color: white;
}

.event-icon[data-event-type="injury"] .icon-symbol::before {
  content: '🤕';
}

.event-icon[data-event-type="contract"] .icon-container {
  background: var(--accent);
  color: white;
}

.event-icon[data-event-type="contract"] .icon-symbol::before {
  content: '📝';
}

.event-icon[data-event-type="news"] .icon-container {
  background: var(--text-muted);
  color: white;
}

.event-icon[data-event-type="news"] .icon-symbol::before {
  content: '📰';
}

/* Size variants */
.event-icon.size-small .icon-container {
  width: 20px;
  height: 20px;
}

.event-icon.size-small .icon-symbol {
  font-size: 12px;
}

.event-icon.size-large .icon-container {
  width: 32px;
  height: 32px;
}

.event-icon.size-large .icon-symbol {
  font-size: 18px;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .event-icon:hover .icon-container {
    transform: none;
  }
  
  .event-tooltip {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .icon-container {
    border: 2px solid var(--text);
  }
}
</style>

<script>
class EventIcon {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      type: '',
      tooltip: '',
      size: 'normal', // small, normal, large
      onClick: null,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.setType(this.options.type);
    this.setTooltip(this.options.tooltip);
    this.setSize(this.options.size);
    this.bindEvents();
  }
  
  setType(type) {
    this.element.dataset.eventType = type;
    this.updateAriaLabel();
  }
  
  setTooltip(tooltip) {
    this.element.querySelector('.event-tooltip').textContent = tooltip;
    this.updateAriaLabel();
  }
  
  setSize(size) {
    // Remove existing size classes
    this.element.classList.remove('size-small', 'size-large');
    
    // Add new size class if not normal
    if (size !== 'normal') {
      this.element.classList.add(`size-${size}`);
    }
  }
  
  updateAriaLabel() {
    const type = this.element.dataset.eventType;
    const tooltip = this.element.querySelector('.event-tooltip').textContent;
    
    const typeNames = {
      match: 'Partita',
      training: 'Allenamento',
      rest: 'Riposo',
      transfer: 'Trasferimento',
      injury: 'Infortunio',
      contract: 'Contratto',
      news: 'Notizia'
    };
    
    const typeName = typeNames[type] || type;
    const ariaLabel = tooltip ? `${typeName}: ${tooltip}` : typeName;
    
    this.element.setAttribute('aria-label', ariaLabel);
  }
  
  bindEvents() {
    this.element.addEventListener('click', () => {
      if (typeof this.options.onClick === 'function') {
        this.options.onClick(this.element.dataset.eventType);
      }
      
      // Dispatch click event
      this.element.dispatchEvent(new CustomEvent('eventIconClick', {
        detail: { 
          type: this.element.dataset.eventType,
          tooltip: this.element.querySelector('.event-tooltip').textContent
        }
      }));
    });
    
    // Keyboard support
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.element.click();
      }
    });
    
    // Make focusable
    this.element.setAttribute('tabindex', '0');
  }
  
  // Public methods
  getType() {
    return this.element.dataset.eventType;
  }
  
  getTooltip() {
    return this.element.querySelector('.event-tooltip').textContent;
  }
  
  setOnClick(callback) {
    this.options.onClick = callback;
  }
  
  pulse() {
    // Add pulse animation
    this.element.querySelector('.icon-container').style.animation = 'pulse 1s infinite';
    
    // Remove animation after 3 seconds
    setTimeout(() => {
      this.element.querySelector('.icon-container').style.animation = '';
    }, 3000);
  }
}

// Auto-initialize event icons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.event-icon').forEach(icon => {
    if (!icon.dataset.initialized) {
      const options = {
        type: icon.dataset.eventType || '',
        tooltip: icon.querySelector('.event-tooltip')?.textContent || '',
        size: icon.classList.contains('size-small') ? 'small' : 
              icon.classList.contains('size-large') ? 'large' : 'normal'
      };
      
      new EventIcon(icon, options);
      icon.dataset.initialized = 'true';
    }
  });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
`;
document.head.appendChild(style);
</script>