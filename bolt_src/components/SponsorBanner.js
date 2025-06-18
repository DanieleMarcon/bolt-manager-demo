export const template = `
<div class="sponsor-banner">
  <div class="banner-content">
    <div class="sponsor-logo">
      <img src="" alt="Sponsor logo" class="logo-image">
    </div>
    <div class="sponsor-message">
      <h3 class="sponsor-title"></h3>
      <p class="sponsor-description"></p>
    </div>
    <div class="sponsor-cta">
      <button class="cta-button" aria-label="Scopri di più"></button>
    </div>
  </div>
  
  <button class="close-banner-btn" aria-label="Chiudi banner">✕</button>
  
  <div class="banner-progress">
    <div class="progress-fill"></div>
  </div>
</div>
<style>
.sponsor-banner {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 24px;
}

.sponsor-logo {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--border);
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.sponsor-message {
  flex: 1;
}

.sponsor-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text);
}

.sponsor-description {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

.sponsor-cta {
  flex-shrink: 0;
}

.cta-button {
  padding: 10px 20px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.close-banner-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-banner-btn:hover {
  background: var(--border);
  color: var(--text);
}

.banner-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--border);
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  width: 100%;
  transform-origin: left;
  animation: progress-shrink 10s linear forwards;
}

@keyframes progress-shrink {
  0% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
}

/* Sponsor-specific themes */
.sponsor-banner.premium {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
}

.sponsor-banner.featured {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #bfdbfe;
}

.sponsor-banner.special {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-color: #fcd34d;
}

/* Responsive */
@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .sponsor-logo {
    width: 80px;
    height: 80px;
  }
  
  .sponsor-cta {
    width: 100%;
  }
  
  .cta-button {
    width: 100%;
  }
}
</style>
`;

class SponsorBanner {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoClose: true,
      duration: 10000, // 10 seconds
      onClose: null,
      onClick: null,
      ...options
    };
    
    this.timeoutId = null;
    this.sponsorData = null;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    
    if (this.options.sponsorData) {
      this.setSponsorData(this.options.sponsorData);
    } else {
      this.loadRandomSponsor();
    }
    
    if (this.options.autoClose) {
      this.startAutoCloseTimer();
    }
  }
  
  bindEvents() {
    // Close button
    this.element.querySelector('.close-banner-btn').addEventListener('click', () => {
      this.closeBanner();
    });
    
    // CTA button
    this.element.querySelector('.cta-button').addEventListener('click', () => {
      this.handleClick();
    });
    
    // Banner click (except on close button)
    this.element.addEventListener('click', (e) => {
      if (!e.target.closest('.close-banner-btn')) {
        this.handleClick();
      }
    });
  }
  
  async loadRandomSponsor() {
    try {
      // In a real app, this would fetch from a sponsor API or game state
      const sponsors = await this.fetchSponsors();
      const randomIndex = Math.floor(Math.random() * sponsors.length);
      this.setSponsorData(sponsors[randomIndex]);
    } catch (error) {
      console.error('Error loading sponsor:', error);
      this.hide();
    }
  }
  
  async fetchSponsors() {
    // Mock data - in real app this would come from an API
    return [
      {
        id: 1,
        name: 'SportTech Pro',
        description: 'Attrezzature sportive di alta qualità per professionisti e appassionati',
        logo: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        cta: 'Scopri di più',
        url: 'https://example.com/sponsor1',
        theme: 'premium'
      },
      {
        id: 2,
        name: 'Energy Boost',
        description: 'La bevanda energetica ufficiale dei campioni di calcio',
        logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        cta: 'Prova ora',
        url: 'https://example.com/sponsor2',
        theme: 'featured'
      },
      {
        id: 3,
        name: 'Football Legends',
        description: 'Il nuovo videogioco di calcio che sta conquistando il mondo',
        logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
        cta: 'Preordina',
        url: 'https://example.com/sponsor3',
        theme: 'special'
      }
    ];
  }
  
  setSponsorData(data) {
    this.sponsorData = data;
    
    // Update banner content
    this.element.querySelector('.logo-image').src = data.logo;
    this.element.querySelector('.logo-image').alt = `Logo ${data.name}`;
    this.element.querySelector('.sponsor-title').textContent = data.name;
    this.element.querySelector('.sponsor-description').textContent = data.description;
    this.element.querySelector('.cta-button').textContent = data.cta;
    
    // Apply theme if available
    if (data.theme) {
      this.element.className = `sponsor-banner ${data.theme}`;
    }
    
    // Show banner
    this.show();
  }
  
  startAutoCloseTimer() {
    // Reset any existing timer
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    // Start new timer
    this.timeoutId = setTimeout(() => {
      this.closeBanner();
    }, this.options.duration);
    
    // Reset animation
    const progressFill = this.element.querySelector('.progress-fill');
    progressFill.style.animation = 'none';
    
    // Force reflow
    void progressFill.offsetWidth;
    
    // Restart animation
    progressFill.style.animation = `progress-shrink ${this.options.duration / 1000}s linear forwards`;
  }
  
  handleClick() {
    if (!this.sponsorData) return;
    
    // In a real app, this would open the sponsor URL or trigger an action
    console.log('Sponsor clicked:', this.sponsorData.url);
    
    // Call onClick callback if provided
    if (typeof this.options.onClick === 'function') {
      this.options.onClick(this.sponsorData);
    }
    
    // Dispatch click event
    this.element.dispatchEvent(new CustomEvent('sponsorClick', {
      detail: { sponsorData: this.sponsorData }
    }));
    
    // Open URL in new tab
    window.open(this.sponsorData.url, '_blank');
    
    // Close banner after click
    this.closeBanner();
  }
  
  closeBanner() {
    // Clear timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    // Hide banner
    this.hide();
    
    // Call onClose callback if provided
    if (typeof this.options.onClose === 'function') {
      this.options.onClose(this.sponsorData);
    }
    
    // Dispatch close event
    this.element.dispatchEvent(new CustomEvent('sponsorClose', {
      detail: { sponsorData: this.sponsorData }
    }));
  }
  
  show() {
    this.element.style.display = 'block';
    
    // Add entrance animation
    this.element.style.animation = 'fadeIn 0.5s ease forwards';
  }
  
  hide() {
    // Add exit animation
    this.element.style.animation = 'fadeOut 0.5s ease forwards';
    
    // Remove from DOM after animation
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 500);
  }
  
  // Public methods
  getSponsorData() {
    return this.sponsorData;
  }
  
  refreshSponsor() {
    this.loadRandomSponsor();
    if (this.options.autoClose) {
      this.startAutoCloseTimer();
    }
  }
  
  setDuration(duration) {
    this.options.duration = duration;
    if (this.options.autoClose && this.element.style.display !== 'none') {
      this.startAutoCloseTimer();
    }
  }
  
  setAutoClose(autoClose) {
    this.options.autoClose = autoClose;
    if (autoClose) {
      this.startAutoCloseTimer();
    } else if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      
      // Stop progress animation
      const progressFill = this.element.querySelector('.progress-fill');
      progressFill.style.animation = 'none';
    }
  }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}
`;
document.head.appendChild(style);

export default SponsorBanner;