<div class="injury-status-badge" data-status="healthy" role="status" aria-live="polite">
  <div class="badge-icon"></div>
  <div class="badge-content">
    <span class="status-text">In Forma</span>
    <span class="status-details"></span>
  </div>
  <div class="recovery-progress" style="display: none;">
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <span class="recovery-time"></span>
  </div>
</div>

<style>
.injury-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.injury-status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.badge-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.status-text {
  font-weight: 600;
  line-height: 1;
}

.status-details {
  font-size: 10px;
  opacity: 0.8;
  line-height: 1;
}

.recovery-progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
}

.progress-bar {
  width: 40px;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: rgba(255,255,255,0.8);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.recovery-time {
  font-size: 9px;
  opacity: 0.9;
  text-align: center;
}

/* Status-specific styles */
.injury-status-badge[data-status="healthy"] {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.injury-status-badge[data-status="healthy"] .badge-icon::before {
  content: '✅';
}

.injury-status-badge[data-status="minor_injury"] {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.injury-status-badge[data-status="minor_injury"] .badge-icon::before {
  content: '⚠️';
}

.injury-status-badge[data-status="major_injury"] {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.injury-status-badge[data-status="major_injury"] .badge-icon::before {
  content: '🤕';
}

.injury-status-badge[data-status="recovering"] {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.injury-status-badge[data-status="recovering"] .badge-icon::before {
  content: '🏥';
}

.injury-status-badge[data-status="suspended"] {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

.injury-status-badge[data-status="suspended"] .badge-icon::before {
  content: '🚫';
}

.injury-status-badge[data-status="tired"] {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.injury-status-badge[data-status="tired"] .badge-icon::before {
  content: '😴';
}

/* Size variants */
.injury-status-badge.size-small {
  padding: 4px 8px;
  font-size: 10px;
  gap: 4px;
}

.injury-status-badge.size-small .badge-icon {
  width: 12px;
  height: 12px;
  font-size: 10px;
}

.injury-status-badge.size-large {
  padding: 8px 16px;
  font-size: 14px;
  gap: 12px;
}

.injury-status-badge.size-large .badge-icon {
  width: 20px;
  height: 20px;
  font-size: 14px;
}

.injury-status-badge.size-large .status-details {
  font-size: 11px;
}

/* Compact variant (icon only) */
.injury-status-badge.variant-compact {
  padding: 6px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  justify-content: center;
}

.injury-status-badge.variant-compact .badge-content,
.injury-status-badge.variant-compact .recovery-progress {
  display: none;
}

.injury-status-badge.variant-compact .badge-icon {
  width: 16px;
  height: 16px;
}

/* Pulsing animation for active injuries */
.injury-status-badge[data-status="major_injury"],
.injury-status-badge[data-status="minor_injury"] {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* Accessibility improvements */
.injury-status-badge:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.injury-status-badge[aria-pressed="true"] {
  transform: scale(0.95);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .injury-status-badge {
    border: 2px solid currentColor;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .injury-status-badge {
    animation: none;
    transition: none;
  }
  
  .progress-fill {
    transition: none;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .injury-status-badge {
    font-size: 11px;
    padding: 5px 10px;
  }
  
  .badge-icon {
    width: 14px;
    height: 14px;
    font-size: 11px;
  }
}
</style>

<script>
class InjuryStatusBadge {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      showProgress: true,
      showDetails: true,
      size: 'normal', // small, normal, large
      variant: 'full', // full, compact
      clickable: true,
      ...options
    };
    
    this.status = 'healthy';
    this.injuryData = null;
    
    this.init();
  }
  
  init() {
    this.applyOptions();
    this.bindEvents();
    
    // Set initial status from data attribute
    const initialStatus = this.element.dataset.status || 'healthy';
    this.setStatus(initialStatus);
  }
  
  applyOptions() {
    // Apply size class
    if (this.options.size !== 'normal') {
      this.element.classList.add(`size-${this.options.size}`);
    }
    
    // Apply variant class
    if (this.options.variant !== 'full') {
      this.element.classList.add(`variant-${this.options.variant}`);
    }
    
    // Hide details if not needed
    if (!this.options.showDetails) {
      const details = this.element.querySelector('.status-details');
      if (details) {
        details.style.display = 'none';
      }
    }
    
    // Hide progress if not needed
    if (!this.options.showProgress) {
      const progress = this.element.querySelector('.recovery-progress');
      if (progress) {
        progress.style.display = 'none';
      }
    }
    
    // Make non-clickable if specified
    if (!this.options.clickable) {
      this.element.style.cursor = 'default';
    }
  }
  
  bindEvents() {
    if (this.options.clickable) {
      this.element.addEventListener('click', () => {
        this.showInjuryDetails();
      });
      
      this.element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.showInjuryDetails();
        }
      });
      
      // Make focusable
      this.element.setAttribute('tabindex', '0');
    }
    
    // Hover effects
    this.element.addEventListener('mouseenter', () => {
      this.showTooltip();
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });
  }
  
  setStatus(status, injuryData = null) {
    this.status = status;
    this.injuryData = injuryData;
    
    // Update data attribute
    this.element.dataset.status = status;
    
    // Update display
    this.updateDisplay();
    
    // Update ARIA attributes
    this.updateAccessibility();
    
    // Dispatch status change event
    this.element.dispatchEvent(new CustomEvent('statusChange', {
      detail: { status, injuryData }
    }));
  }
  
  updateDisplay() {
    const statusText = this.element.querySelector('.status-text');
    const statusDetails = this.element.querySelector('.status-details');
    const recoveryProgress = this.element.querySelector('.recovery-progress');
    
    const statusInfo = this.getStatusInfo(this.status);
    
    // Update text
    statusText.textContent = statusInfo.text;
    
    // Update details
    if (statusDetails && this.options.showDetails) {
      statusDetails.textContent = statusInfo.details;
    }
    
    // Update recovery progress
    if (recoveryProgress && this.options.showProgress) {
      this.updateRecoveryProgress();
    }
  }
  
  getStatusInfo(status) {
    const statusMap = {
      healthy: {
        text: 'In Forma',
        details: 'Pronto per giocare',
        description: 'Il giocatore è in perfetta forma fisica'
      },
      minor_injury: {
        text: 'Infortunio Lieve',
        details: 'Recupero veloce',
        description: 'Infortunio minore che richiede riposo limitato'
      },
      major_injury: {
        text: 'Infortunio Grave',
        details: 'Lungo recupero',
        description: 'Infortunio serio che richiede tempo di recupero prolungato'
      },
      recovering: {
        text: 'In Recupero',
        details: 'Riabilitazione',
        description: 'Il giocatore sta recuperando da un infortunio'
      },
      suspended: {
        text: 'Squalificato',
        details: 'Non disponibile',
        description: 'Il giocatore è squalificato e non può giocare'
      },
      tired: {
        text: 'Affaticato',
        details: 'Riposo necessario',
        description: 'Il giocatore è affaticato e ha bisogno di riposo'
      }
    };
    
    return statusMap[status] || statusMap.healthy;
  }
  
  updateRecoveryProgress() {
    const recoveryProgress = this.element.querySelector('.recovery-progress');
    const progressFill = this.element.querySelector('.progress-fill');
    const recoveryTime = this.element.querySelector('.recovery-time');
    
    if (!this.injuryData || this.status === 'healthy') {
      recoveryProgress.style.display = 'none';
      return;
    }
    
    recoveryProgress.style.display = 'flex';
    
    // Calculate progress percentage
    const totalDays = this.injuryData.total_recovery_days || 1;
    const remainingDays = this.injuryData.remaining_days || 0;
    const progress = Math.max(0, ((totalDays - remainingDays) / totalDays) * 100);
    
    progressFill.style.width = `${progress}%`;
    
    // Update recovery time text
    if (remainingDays > 0) {
      recoveryTime.textContent = `${remainingDays}g`;
    } else {
      recoveryTime.textContent = 'Pronto';
    }
  }
  
  updateAccessibility() {
    const statusInfo = this.getStatusInfo(this.status);
    
    // Update ARIA label
    let ariaLabel = statusInfo.text;
    if (this.injuryData && this.injuryData.remaining_days > 0) {
      ariaLabel += `, ${this.injuryData.remaining_days} giorni rimanenti`;
    }
    
    this.element.setAttribute('aria-label', ariaLabel);
    
    // Update status description for screen readers
    this.element.setAttribute('aria-description', statusInfo.description);
  }
  
  showTooltip() {
    if (this.currentTooltip) return;
    
    const statusInfo = this.getStatusInfo(this.status);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'injury-tooltip';
    
    let tooltipContent = `
      <div class="tooltip-header">
        <strong>${statusInfo.text}</strong>
      </div>
      <div class="tooltip-body">
        <p>${statusInfo.description}</p>
    `;
    
    if (this.injuryData) {
      if (this.injuryData.injury_type) {
        tooltipContent += `<p><strong>Tipo:</strong> ${this.injuryData.injury_type}</p>`;
      }
      if (this.injuryData.remaining_days > 0) {
        tooltipContent += `<p><strong>Recupero:</strong> ${this.injuryData.remaining_days} giorni</p>`;
      }
      if (this.injuryData.severity) {
        tooltipContent += `<p><strong>Gravità:</strong> ${this.injuryData.severity}/10</p>`;
      }
    }
    
    tooltipContent += `
      </div>
    `;
    
    tooltip.innerHTML = tooltipContent;
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = this.element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${rect.bottom + 8}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
    tooltip.style.zIndex = '1000';
    
    // Ensure tooltip stays in viewport
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = `${window.innerWidth - tooltipRect.width - 8}px`;
    }
    if (tooltipRect.left < 0) {
      tooltip.style.left = '8px';
    }
    
    this.currentTooltip = tooltip;
  }
  
  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }
  
  showInjuryDetails() {
    // Dispatch event for detailed injury modal
    window.dispatchEvent(new CustomEvent('showInjuryDetails', {
      detail: {
        status: this.status,
        injuryData: this.injuryData,
        element: this.element
      }
    }));
  }
  
  // Public methods
  getStatus() {
    return this.status;
  }
  
  getInjuryData() {
    return this.injuryData;
  }
  
  isAvailable() {
    return this.status === 'healthy' || this.status === 'tired';
  }
  
  getDaysUntilRecovery() {
    return this.injuryData ? (this.injuryData.remaining_days || 0) : 0;
  }
  
  updateRecoveryDays(days) {
    if (this.injuryData) {
      this.injuryData.remaining_days = Math.max(0, days);
      this.updateRecoveryProgress();
      
      // Auto-heal if recovery is complete
      if (this.injuryData.remaining_days === 0 && this.status === 'recovering') {
        this.setStatus('healthy');
      }
    }
  }
}

// Auto-initialize injury status badges
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.injury-status-badge').forEach(badge => {
    if (!badge.dataset.initialized) {
      const options = JSON.parse(badge.dataset.options || '{}');
      new InjuryStatusBadge(badge, options);
      badge.dataset.initialized = 'true';
    }
  });
});

// CSS for tooltip
const tooltipStyles = `
.injury-tooltip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  max-width: 250px;
  font-size: 13px;
  z-index: 1000;
}

.injury-tooltip .tooltip-header {
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

.injury-tooltip .tooltip-header strong {
  color: var(--primary);
  font-size: 14px;
}

.injury-tooltip .tooltip-body p {
  margin: 4px 0;
  color: var(--text);
  line-height: 1.4;
}

.injury-tooltip .tooltip-body strong {
  color: var(--text);
  font-weight: 600;
}
`;

// Inject tooltip styles
if (!document.querySelector('#injury-tooltip-styles')) {
  const style = document.createElement('style');
  style.id = 'injury-tooltip-styles';
  style.textContent = tooltipStyles;
  document.head.appendChild(style);
}
</script>