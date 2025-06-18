export const template = `
<div class="morale-indicator" data-morale="0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
  <div class="morale-background">
    <div class="morale-fill"></div>
  </div>
  <div class="morale-content">
    <span class="morale-value">0</span>
    <span class="morale-label">Morale</span>
  </div>
  <div class="morale-description" aria-live="polite"></div>
</div>
<style>
.morale-indicator {
  position: relative;
  width: 100%;
  min-height: 60px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.3s ease;
}

.morale-indicator:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.morale-background {
  position: relative;
  width: 100%;
  height: 20px;
  background: var(--border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.morale-fill {
  height: 100%;
  width: 0%;
  border-radius: 10px;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.morale-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.morale-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.morale-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

.morale-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 500;
}

.morale-description {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
  font-style: italic;
}

/* Morale level classes */
.morale-terrible .morale-fill {
  background: linear-gradient(90deg, #dc2626, #ef4444);
}

.morale-poor .morale-fill {
  background: linear-gradient(90deg, #ea580c, #f97316);
}

.morale-average .morale-fill {
  background: linear-gradient(90deg, #d97706, #f59e0b);
}

.morale-good .morale-fill {
  background: linear-gradient(90deg, #65a30d, #84cc16);
}

.morale-excellent .morale-fill {
  background: linear-gradient(90deg, #16a34a, #22c55e);
}

/* Size variants */
.morale-indicator.size-small {
  min-height: 40px;
  padding: 8px;
}

.morale-indicator.size-small .morale-background {
  height: 12px;
  margin-bottom: 6px;
}

.morale-indicator.size-small .morale-value {
  font-size: 14px;
}

.morale-indicator.size-small .morale-label {
  font-size: 10px;
}

.morale-indicator.size-large {
  min-height: 80px;
  padding: 16px;
}

.morale-indicator.size-large .morale-background {
  height: 24px;
  margin-bottom: 12px;
}

.morale-indicator.size-large .morale-value {
  font-size: 24px;
}

.morale-indicator.size-large .morale-label {
  font-size: 14px;
}

/* Compact horizontal variant */
.morale-indicator.variant-horizontal {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
}

.morale-indicator.variant-horizontal .morale-background {
  flex: 1;
  margin-bottom: 0;
}

.morale-indicator.variant-horizontal .morale-content {
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  min-width: 60px;
}

.morale-indicator.variant-horizontal .morale-description {
  margin-top: 0;
  text-align: right;
}

/* Mini indicator for cards */
.morale-indicator-mini {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

.morale-indicator-mini::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  opacity: 0.8;
}

.morale-indicator-mini::after {
  content: attr(data-morale);
  position: relative;
  z-index: 1;
}

.morale-terrible.morale-indicator-mini {
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.morale-poor.morale-indicator-mini {
  background: linear-gradient(135deg, #ea580c, #f97316);
}

.morale-average.morale-indicator-mini {
  background: linear-gradient(135deg, #d97706, #f59e0b);
}

.morale-good.morale-indicator-mini {
  background: linear-gradient(135deg, #65a30d, #84cc16);
}

.morale-excellent.morale-indicator-mini {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

/* Accessibility improvements */
.morale-indicator:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .morale-fill {
    transition: none;
  }
  
  .morale-fill::after {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .morale-indicator {
    border: 2px solid var(--text);
  }
  
  .morale-fill {
    background: var(--text) !important;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .morale-indicator {
    min-height: 50px;
    padding: 10px;
  }
  
  .morale-value {
    font-size: 16px;
  }
}
</style>
`;

class MoraleIndicator {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      animated: true,
      showDescription: true,
      size: 'normal', // small, normal, large
      variant: 'vertical', // vertical, horizontal
      ...options
    };
    
    this.currentMorale = 0;
    this.targetMorale = 0;
    
    this.init();
  }
  
  init() {
    this.applyOptions();
    this.bindEvents();
    
    // Set initial morale from data attribute
    const initialMorale = parseInt(this.element.dataset.morale) || 0;
    this.setMorale(initialMorale);
  }
  
  applyOptions() {
    // Apply size class
    if (this.options.size !== 'normal') {
      this.element.classList.add(`size-${this.options.size}`);
    }
    
    // Apply variant class
    if (this.options.variant !== 'vertical') {
      this.element.classList.add(`variant-${this.options.variant}`);
    }
    
    // Hide description if not needed
    if (!this.options.showDescription) {
      const description = this.element.querySelector('.morale-description');
      if (description) {
        description.style.display = 'none';
      }
    }
  }
  
  bindEvents() {
    // Add hover effect for additional info
    this.element.addEventListener('mouseenter', () => {
      this.showTooltip();
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
    
    // Keyboard accessibility
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.showDetailedInfo();
      }
    });
  }
  
  setMorale(value, animated = true) {
    // Clamp value between 0 and 100
    this.targetMorale = Math.max(0, Math.min(100, value));
    
    if (animated && this.options.animated) {
      this.animateToTarget();
    } else {
      this.currentMorale = this.targetMorale;
      this.updateDisplay();
    }
  }
  
  animateToTarget() {
    const startMorale = this.currentMorale;
    const difference = this.targetMorale - startMorale;
    const duration = 800; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      this.currentMorale = startMorale + (difference * easeOut);
      this.updateDisplay();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.currentMorale = this.targetMorale;
        this.updateDisplay();
        this.onAnimationComplete();
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  updateDisplay() {
    const morale = Math.round(this.currentMorale);
    const fill = this.element.querySelector('.morale-fill');
    const value = this.element.querySelector('.morale-value');
    const description = this.element.querySelector('.morale-description');
    
    // Update progress bar
    fill.style.width = `${morale}%`;
    
    // Update value
    value.textContent = morale;
    
    // Update ARIA attributes
    this.element.setAttribute('aria-valuenow', morale);
    this.element.setAttribute('aria-valuetext', `Morale: ${morale} su 100`);
    
    // Update morale level class
    this.updateMoraleLevel(morale);
    
    // Update description
    if (description && this.options.showDescription) {
      description.textContent = this.getMoraleDescription(morale);
    }
    
    // Update data attribute
    this.element.dataset.morale = morale;
  }
  
  updateMoraleLevel(morale) {
    // Remove existing morale level classes
    this.element.classList.remove('morale-terrible', 'morale-poor', 'morale-average', 'morale-good', 'morale-excellent');
    
    // Add appropriate class
    const level = this.getMoraleLevel(morale);
    this.element.classList.add(`morale-${level}`);
  }
  
  getMoraleLevel(morale) {
    if (morale >= 80) return 'excellent';
    if (morale >= 60) return 'good';
    if (morale >= 40) return 'average';
    if (morale >= 20) return 'poor';
    return 'terrible';
  }
  
  getMoraleDescription(morale) {
    const descriptions = {
      excellent: 'Eccellente - Il giocatore è al massimo della forma mentale',
      good: 'Buono - Il giocatore è motivato e fiducioso',
      average: 'Nella media - Il giocatore ha un atteggiamento neutrale',
      poor: 'Scarso - Il giocatore è demotivato',
      terrible: 'Pessimo - Il giocatore è completamente demoralizzato'
    };
    
    const level = this.getMoraleLevel(morale);
    return descriptions[level];
  }
  
  showTooltip() {
    // Create and show tooltip with detailed morale info
    const tooltip = document.createElement('div');
    tooltip.className = 'morale-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <strong>Morale: ${Math.round(this.currentMorale)}/100</strong>
        <p>${this.getMoraleDescription(this.currentMorale)}</p>
        <small>Influenza performance e decisioni del giocatore</small>
      </div>
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = this.element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    tooltip.style.zIndex = '1000';
    
    this.currentTooltip = tooltip;
  }
  
  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }
  
  showDetailedInfo() {
    // Dispatch event for detailed morale info modal
    window.dispatchEvent(new CustomEvent('showMoraleDetails', {
      detail: {
        morale: this.currentMorale,
        level: this.getMoraleLevel(this.currentMorale),
        description: this.getMoraleDescription(this.currentMorale)
      }
    }));
  }
  
  onAnimationComplete() {
    // Dispatch event when animation completes
    window.dispatchEvent(new CustomEvent('moraleAnimationComplete', {
      detail: {
        element: this.element,
        finalMorale: this.currentMorale
      }
    }));
  }
  
  // Public methods
  getMorale() {
    return this.currentMorale;
  }
  
  incrementMorale(amount) {
    this.setMorale(this.targetMorale + amount);
  }
  
  decrementMorale(amount) {
    this.setMorale(this.targetMorale - amount);
  }
  
  reset() {
    this.setMorale(50); // Reset to neutral
  }
}

// CSS for tooltip
const tooltipStyles = `
.morale-tooltip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  max-width: 250px;
  font-size: 14px;
  z-index: 1000;
}

.morale-tooltip .tooltip-content strong {
  color: var(--primary);
  display: block;
  margin-bottom: 4px;
}

.morale-tooltip .tooltip-content p {
  margin: 4px 0;
  color: var(--text);
}

.morale-tooltip .tooltip-content small {
  color: var(--text-muted);
  font-style: italic;
}
`;

// Inject tooltip styles
if (!document.querySelector('#morale-tooltip-styles')) {
  const style = document.createElement('style');
  style.id = 'morale-tooltip-styles';
  style.textContent = tooltipStyles;
  document.head.appendChild(style);
}
export default MoraleIndicator;