export const template = `
<div class="match-speed-control">
  <div class="speed-header">
    <h4 class="speed-title">Velocità Simulazione</h4>
    <div class="current-speed-display">
      <span class="speed-indicator">▶️</span>
      <span class="speed-text">Normale</span>
    </div>
  </div>
  
  <div class="speed-controls">
    <button class="speed-btn" data-speed="pause" aria-label="Pausa simulazione">
      <span class="speed-icon">⏸️</span>
      <span class="speed-label">Pausa</span>
    </button>
    
    <button class="speed-btn active" data-speed="slow" aria-label="Velocità lenta">
      <span class="speed-icon">▶️</span>
      <span class="speed-label">Lenta</span>
    </button>
    
    <button class="speed-btn" data-speed="normal" aria-label="Velocità normale">
      <span class="speed-icon">⏩</span>
      <span class="speed-label">Normale</span>
    </button>
    
    <button class="speed-btn" data-speed="fast" aria-label="Velocità veloce">
      <span class="speed-icon">⏭️</span>
      <span class="speed-label">Veloce</span>
    </button>
    
    <button class="speed-btn" data-speed="instant" aria-label="Simulazione istantanea">
      <span class="speed-icon">⚡</span>
      <span class="speed-label">Istantanea</span>
    </button>
  </div>
  
  <div class="speed-info">
    <div class="time-display">
      <span class="time-label">Tempo Partita:</span>
      <span class="match-time">0'</span>
    </div>
    
    <div class="progress-bar">
      <div class="progress-fill"></div>
      <div class="progress-markers">
        <div class="marker" data-time="0">0'</div>
        <div class="marker" data-time="45">45'</div>
        <div class="marker halftime" data-time="45">HT</div>
        <div class="marker" data-time="90">90'</div>
      </div>
    </div>
    
    <div class="speed-description">
      <span class="description-text">Controlla la velocità di simulazione della partita</span>
    </div>
  </div>
  
  <div class="advanced-controls">
    <button class="advanced-btn skip-to-next-btn" aria-label="Salta al prossimo evento">
      ⏭️ Prossimo Evento
    </button>
    
    <button class="advanced-btn skip-to-halftime-btn" aria-label="Salta all'intervallo">
      ⏸️ Intervallo
    </button>
    
    <button class="advanced-btn skip-to-end-btn" aria-label="Salta alla fine">
      ⏹️ Fine Partita
    </button>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-speed">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=150&h=30" 
         alt="Speed Control Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.match-speed-control {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.speed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.speed-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.current-speed-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: var(--primary);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.speed-indicator {
  font-size: 14px;
}

.speed-controls {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.speed-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: var(--background);
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.speed-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
}

.speed-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.speed-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.speed-icon {
  font-size: 18px;
  margin-bottom: 2px;
}

.speed-label {
  font-weight: 500;
  text-align: center;
  line-height: 1;
}

.speed-info {
  background: var(--background);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.time-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.match-time {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
}

.progress-bar {
  position: relative;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 4px;
  transition: width 0.3s ease;
  width: 0%;
}

.progress-markers {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.marker {
  font-size: 9px;
  color: var(--text-muted);
  font-weight: 500;
  padding: 2px 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  position: relative;
}

.marker.halftime {
  background: var(--warning);
  color: white;
  border-color: var(--warning);
}

.marker::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 8px;
  background: var(--border);
}

.speed-description {
  text-align: center;
}

.description-text {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
}

.advanced-controls {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 12px;
}

.advanced-btn {
  padding: 6px 10px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 10px;
  font-weight: 500;
  color: var(--text);
  transition: all 0.2s ease;
}

.advanced-btn:hover {
  background: var(--secondary);
  color: white;
  border-color: var(--secondary);
}

.advanced-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sponsor-slot-speed {
  width: 100%;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Speed-specific animations */
.speed-btn.active.pulse {
  animation: speedPulse 1s infinite;
}

@keyframes speedPulse {
  0%, 100% { 
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  50% { 
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.6);
  }
}

.progress-fill.fast-forward {
  animation: fastProgress 0.5s ease;
}

@keyframes fastProgress {
  0% { 
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }
  50% { 
    background: linear-gradient(90deg, var(--warning), var(--error));
  }
  100% { 
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }
}

/* Responsive */
@media (max-width: 768px) {
  .speed-controls {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  
  .speed-btn {
    padding: 8px 4px;
    font-size: 10px;
  }
  
  .speed-icon {
    font-size: 16px;
  }
  
  .advanced-controls {
    flex-direction: column;
    gap: 4px;
  }
  
  .advanced-btn {
    font-size: 9px;
    padding: 4px 8px;
  }
  
  .progress-markers {
    display: none;
  }
}

@media (max-width: 480px) {
  .speed-controls {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .speed-header {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  
  .current-speed-display {
    justify-content: center;
  }
}
</style>
`;

class MatchSpeedControl {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      defaultSpeed: 'slow',
      allowPause: true,
      showProgress: true,
      matchDuration: 90,
      ...options
    };
    
    this.currentSpeed = this.options.defaultSpeed;
    this.isPaused = false;
    this.matchTime = 0;
    this.isMatchActive = false;
    
    this.speedMultipliers = {
      pause: 0,
      slow: 1,
      normal: 2,
      fast: 4,
      instant: 10
    };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateSpeedDisplay();
    this.updateTimeDisplay();
    this.updateProgressBar();
  }
  
  bindEvents() {
    // Speed control buttons
    this.element.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const speed = e.currentTarget.dataset.speed;
        this.setSpeed(speed);
      });
    });
    
    // Advanced control buttons
    this.element.querySelector('.skip-to-next-btn').addEventListener('click', () => {
      this.skipToNextEvent();
    });
    
    this.element.querySelector('.skip-to-halftime-btn').addEventListener('click', () => {
      this.skipToHalftime();
    });
    
    this.element.querySelector('.skip-to-end-btn').addEventListener('click', () => {
      this.skipToEnd();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (this.isMatchActive) {
        this.handleKeyboardShortcuts(e);
      }
    });
    
    // Listen for match events
    document.addEventListener('matchTimeUpdate', (e) => {
      this.updateMatchTime(e.detail.time);
    });
    
    document.addEventListener('matchStatusChange', (e) => {
      this.handleMatchStatusChange(e.detail.status);
    });
  }
  
  setSpeed(speed) {
    if (!this.speedMultipliers.hasOwnProperty(speed)) return;
    
    const previousSpeed = this.currentSpeed;
    this.currentSpeed = speed;
    this.isPaused = speed === 'pause';
    
    this.updateSpeedDisplay();
    this.updateSpeedButtons();
    
    // Dispatch speed change event
    this.element.dispatchEvent(new CustomEvent('speedChange', {
      detail: {
        speed,
        previousSpeed,
        multiplier: this.speedMultipliers[speed],
        isPaused: this.isPaused
      }
    }));
    
    // Visual feedback
    this.showSpeedChangeEffect();
  }
  
  updateSpeedDisplay() {
    const speedIndicator = this.element.querySelector('.speed-indicator');
    const speedText = this.element.querySelector('.speed-text');
    
    const speedInfo = this.getSpeedInfo(this.currentSpeed);
    speedIndicator.textContent = speedInfo.icon;
    speedText.textContent = speedInfo.text;
    
    // Update display color based on speed
    const display = this.element.querySelector('.current-speed-display');
    display.className = `current-speed-display speed-${this.currentSpeed}`;
  }
  
  getSpeedInfo(speed) {
    const speedInfoMap = {
      pause: { icon: '⏸️', text: 'Pausa' },
      slow: { icon: '▶️', text: 'Lenta' },
      normal: { icon: '⏩', text: 'Normale' },
      fast: { icon: '⏭️', text: 'Veloce' },
      instant: { icon: '⚡', text: 'Istantanea' }
    };
    
    return speedInfoMap[speed] || speedInfoMap.slow;
  }
  
  updateSpeedButtons() {
    this.element.querySelectorAll('.speed-btn').forEach(btn => {
      const isActive = btn.dataset.speed === this.currentSpeed;
      btn.classList.toggle('active', isActive);
      
      // Add pulse effect for active button
      if (isActive && this.currentSpeed !== 'pause') {
        btn.classList.add('pulse');
      } else {
        btn.classList.remove('pulse');
      }
    });
  }
  
  updateMatchTime(time) {
    this.matchTime = time;
    this.updateTimeDisplay();
    this.updateProgressBar();
    this.updateAdvancedControls();
  }
  
  updateTimeDisplay() {
    const matchTimeElement = this.element.querySelector('.match-time');
    matchTimeElement.textContent = `${this.matchTime}'`;
    
    // Add visual effect for time changes
    if (this.currentSpeed === 'fast' || this.currentSpeed === 'instant') {
      matchTimeElement.style.color = 'var(--warning)';
    } else {
      matchTimeElement.style.color = 'var(--primary)';
    }
  }
  
  updateProgressBar() {
    const progressFill = this.element.querySelector('.progress-fill');
    const progressPercentage = Math.min(100, (this.matchTime / this.options.matchDuration) * 100);
    
    progressFill.style.width = `${progressPercentage}%`;
    
    // Add fast-forward effect for high speeds
    if (this.currentSpeed === 'fast' || this.currentSpeed === 'instant') {
      progressFill.classList.add('fast-forward');
      setTimeout(() => {
        progressFill.classList.remove('fast-forward');
      }, 500);
    }
  }
  
  updateAdvancedControls() {
    const skipToHalftimeBtn = this.element.querySelector('.skip-to-halftime-btn');
    const skipToEndBtn = this.element.querySelector('.skip-to-end-btn');
    
    // Disable halftime button if already past halftime
    skipToHalftimeBtn.disabled = this.matchTime >= 45;
    
    // Disable end button if match is nearly over
    skipToEndBtn.disabled = this.matchTime >= this.options.matchDuration;
  }
  
  skipToNextEvent() {
    // Dispatch event to request next match event
    this.element.dispatchEvent(new CustomEvent('skipToNextEvent', {
      detail: { currentTime: this.matchTime }
    }));
  }
  
  skipToHalftime() {
    if (this.matchTime < 45) {
      this.element.dispatchEvent(new CustomEvent('skipToTime', {
        detail: { targetTime: 45, reason: 'halftime' }
      }));
    }
  }
  
  skipToEnd() {
    if (this.matchTime < this.options.matchDuration) {
      this.element.dispatchEvent(new CustomEvent('skipToTime', {
        detail: { targetTime: this.options.matchDuration, reason: 'end' }
      }));
    }
  }
  
  handleMatchStatusChange(status) {
    this.isMatchActive = status === 'live';
    
    // Auto-pause at halftime
    if (status === 'halftime') {
      this.setSpeed('pause');
    }
    
    // Disable controls if match is finished
    if (status === 'finished') {
      this.element.querySelectorAll('.speed-btn, .advanced-btn').forEach(btn => {
        btn.disabled = true;
      });
    }
  }
  
  handleKeyboardShortcuts(e) {
    // Prevent shortcuts if user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
      case ' ':
        e.preventDefault();
        this.togglePause();
        break;
      case '1':
        e.preventDefault();
        this.setSpeed('slow');
        break;
      case '2':
        e.preventDefault();
        this.setSpeed('normal');
        break;
      case '3':
        e.preventDefault();
        this.setSpeed('fast');
        break;
      case '4':
        e.preventDefault();
        this.setSpeed('instant');
        break;
      case 'n':
        e.preventDefault();
        this.skipToNextEvent();
        break;
      case 'h':
        e.preventDefault();
        this.skipToHalftime();
        break;
      case 'e':
        e.preventDefault();
        this.skipToEnd();
        break;
    }
  }
  
  togglePause() {
    if (this.isPaused) {
      this.setSpeed('normal');
    } else {
      this.setSpeed('pause');
    }
  }
  
  showSpeedChangeEffect() {
    // Visual feedback for speed changes
    const speedDisplay = this.element.querySelector('.current-speed-display');
    speedDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
      speedDisplay.style.transform = 'scale(1)';
    }, 200);
  }
  
  // Public methods
  getCurrentSpeed() {
    return this.currentSpeed;
  }
  
  getSpeedMultiplier() {
    return this.speedMultipliers[this.currentSpeed];
  }
  
  isPausedState() {
    return this.isPaused;
  }
  
  setMatchTime(time) {
    this.updateMatchTime(time);
  }
  
  setMatchDuration(duration) {
    this.options.matchDuration = duration;
    this.updateProgressBar();
    this.updateAdvancedControls();
  }
  
  enableControls() {
    this.element.querySelectorAll('.speed-btn, .advanced-btn').forEach(btn => {
      btn.disabled = false;
    });
    this.isMatchActive = true;
  }
  
  disableControls() {
    this.element.querySelectorAll('.speed-btn, .advanced-btn').forEach(btn => {
      btn.disabled = true;
    });
    this.isMatchActive = false;
  }
  
  reset() {
    this.matchTime = 0;
    this.setSpeed(this.options.defaultSpeed);
    this.updateTimeDisplay();
    this.updateProgressBar();
    this.updateAdvancedControls();
    this.enableControls();
  }
}

export default MatchSpeedControl;