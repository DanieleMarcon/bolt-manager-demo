export const template = `
<div class="match-live-view">
  <div class="match-header-container">
    <!-- Match header will be inserted here -->
  </div>
  
  <div class="match-content">
    <div class="match-main-panel">
      <div class="live-scoreboard-container">
        <!-- Live scoreboard will be inserted here -->
      </div>
      
      <div class="match-events-container">
        <!-- Match events timeline will be inserted here -->
      </div>
      
      <div class="match-controls">
        <div class="match-speed-container">
          <!-- Match speed control will be inserted here -->
        </div>
      </div>
    </div>
    
    <div class="match-side-panel">
      <div class="live-stats-container">
        <!-- Live stats panel will be inserted here -->
      </div>
      
      <div class="substitution-container">
        <!-- Substitution panel will be inserted here -->
      </div>
    </div>
  </div>
  
  <div class="match-overlay" style="display: none;">
    <div class="overlay-content">
      <div class="overlay-icon">⚽</div>
      <h2 class="overlay-title">GOL!</h2>
      <div class="overlay-details">
        <div class="goal-scorer">Mario Rossi</div>
        <div class="goal-time">23'</div>
      </div>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-match">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=60" 
         alt="Match Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.match-live-view {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.match-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.match-main-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.match-side-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.match-controls {
  margin-top: 20px;
}

.match-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease;
}

.overlay-content {
  text-align: center;
  color: white;
  animation: scaleIn 0.5s ease;
}

.overlay-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.overlay-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.overlay-details {
  font-size: 24px;
}

.goal-scorer {
  font-weight: 600;
  margin-bottom: 8px;
}

.goal-time {
  font-size: 20px;
  opacity: 0.8;
}

.sponsor-slot-match {
  margin-top: 20px;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Responsive */
@media (max-width: 1024px) {
  .match-content {
    grid-template-columns: 1fr;
  }
  
  .match-side-panel {
    order: -1;
  }
}

@media (max-width: 768px) {
  .match-live-view {
    padding: 12px;
  }
  
  .overlay-title {
    font-size: 36px;
  }
  
  .overlay-details {
    font-size: 18px;
  }
}
</style>
`;

class MatchLiveView {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      matchData: null,
      autoStart: false,
      showOverlays: true,
      ...options
    };
    
    this.matchData = this.options.matchData;
    this.isPlaying = false;
    this.currentSpeed = 'normal';
    this.currentTime = 0;
    this.matchInterval = null;
    this.overlayTimeout = null;
    
    this.init();
  }
  
  init() {
    this.loadComponents();
    
    if (this.options.autoStart && this.matchData) {
      this.startMatch();
    }
  }
  
  loadComponents() {
    // Load match header
    this.loadComponent('MatchHeader', '.match-header-container');
    
    // Load live scoreboard
    this.loadComponent('LiveScoreBoard', '.live-scoreboard-container');
    
    // Load match events timeline
    this.loadComponent('MatchEventsTimeline', '.match-events-container');
    
    // Load match speed control
    this.loadComponent('MatchSpeedControl', '.match-speed-container');
    
    // Load live stats panel
    this.loadComponent('LiveStatsPanel', '.live-stats-container');
    
    // Load substitution panel
    this.loadComponent('SubstitutionPanel', '.substitution-container');
    
    // Bind events from components
    this.bindComponentEvents();
  }
  
  loadComponent(componentName, containerSelector) {
    const container = this.element.querySelector(containerSelector);
    if (!container) return;
    
    // In a real app, this would load the component from a component registry
    // For now, we'll assume the components are already loaded in the DOM
    const componentTemplate = document.querySelector(`[data-component="${componentName}"]`);
    if (!componentTemplate) {
      console.error(`Component ${componentName} not found`);
      return;
    }
    
    // Clone the component
    const component = componentTemplate.cloneNode(true);
    container.appendChild(component);
    
    // Initialize the component
    if (window[componentName]) {
      new window[componentName](component, {
        matchData: this.matchData
      });
    }
  }
  
  bindComponentEvents() {
    // Listen for speed change
    this.element.addEventListener('speedChange', (e) => {
      this.handleSpeedChange(e.detail.speed);
    });
    
    // Listen for substitution
    this.element.addEventListener('substitutionMade', (e) => {
      this.handleSubstitution(e.detail.substitution);
    });
    
    // Listen for match events
    document.addEventListener('matchEvent', (e) => {
      this.handleMatchEvent(e.detail);
    });
  }
  
  startMatch() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.currentTime = 0;
    
    // Update match status
    this.updateMatchStatus('live');
    
    // Start match interval
    this.startMatchInterval();
    
    // Dispatch match start event
    this.element.dispatchEvent(new CustomEvent('matchStart', {
      detail: { matchData: this.matchData }
    }));
  }
  
  pauseMatch() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    
    // Clear match interval
    this.clearMatchInterval();
    
    // Update match status
    this.updateMatchStatus('paused');
    
    // Dispatch match pause event
    this.element.dispatchEvent(new CustomEvent('matchPause', {
      detail: { matchData: this.matchData, currentTime: this.currentTime }
    }));
  }
  
  resumeMatch() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    
    // Start match interval
    this.startMatchInterval();
    
    // Update match status
    this.updateMatchStatus('live');
    
    // Dispatch match resume event
    this.element.dispatchEvent(new CustomEvent('matchResume', {
      detail: { matchData: this.matchData, currentTime: this.currentTime }
    }));
  }
  
  endMatch() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    
    // Clear match interval
    this.clearMatchInterval();
    
    // Update match status
    this.updateMatchStatus('finished');
    
    // Dispatch match end event
    this.element.dispatchEvent(new CustomEvent('matchEnd', {
      detail: { matchData: this.matchData }
    }));
  }
  
  startMatchInterval() {
    // Clear any existing interval
    this.clearMatchInterval();
    
    // Set interval based on speed
    const intervalTime = this.getIntervalTime();
    
    this.matchInterval = setInterval(() => {
      this.updateMatchTime();
    }, intervalTime);
  }
  
  clearMatchInterval() {
    if (this.matchInterval) {
      clearInterval(this.matchInterval);
      this.matchInterval = null;
    }
  }
  
  getIntervalTime() {
    // Return interval time in milliseconds based on speed
    const speedMap = {
      slow: 1000, // 1 second = 1 minute of match time
      normal: 500, // 0.5 seconds = 1 minute of match time
      fast: 250, // 0.25 seconds = 1 minute of match time
      instant: 50 // 0.05 seconds = 1 minute of match time
    };
    
    return speedMap[this.currentSpeed] || speedMap.normal;
  }
  
  updateMatchTime() {
    this.currentTime++;
    
    // Check for half time
    if (this.currentTime === 45) {
      this.handleHalfTime();
      return;
    }
    
    // Check for full time
    if (this.currentTime === 90) {
      this.handleFullTime();
      return;
    }
    
    // Dispatch time update event
    document.dispatchEvent(new CustomEvent('matchTimeUpdate', {
      detail: { time: this.currentTime }
    }));
    
    // Generate random events
    this.generateRandomEvents();
  }
  
  handleHalfTime() {
    // Pause match
    this.pauseMatch();
    
    // Update match status
    this.updateMatchStatus('halftime');
    
    // Dispatch half time event
    this.element.dispatchEvent(new CustomEvent('matchHalfTime', {
      detail: { matchData: this.matchData }
    }));
    
    // Show half time overlay
    if (this.options.showOverlays) {
      this.showOverlay('INTERVALLO', 'Fine primo tempo', '45\'');
    }
  }
  
  handleFullTime() {
    // End match
    this.endMatch();
    
    // Dispatch full time event
    this.element.dispatchEvent(new CustomEvent('matchFullTime', {
      detail: { matchData: this.matchData }
    }));
    
    // Show full time overlay
    if (this.options.showOverlays) {
      this.showOverlay('FINE PARTITA', 'Partita terminata', '90\'');
    }
  }
  
  updateMatchStatus(status) {
    if (!this.matchData) return;
    
    this.matchData.status = status;
    
    // Dispatch status change event
    document.dispatchEvent(new CustomEvent('matchStatusChange', {
      detail: { status, matchData: this.matchData }
    }));
  }
  
  handleSpeedChange(speed) {
    this.currentSpeed = speed;
    
    if (this.isPlaying) {
      // Restart interval with new speed
      this.startMatchInterval();
    }
    
    // Dispatch speed change event
    this.element.dispatchEvent(new CustomEvent('matchSpeedChange', {
      detail: { speed, matchData: this.matchData }
    }));
  }
  
  handleSubstitution(substitution) {
    // In a real app, this would update the match data
    console.log('Substitution made:', substitution);
    
    // Dispatch substitution event
    document.dispatchEvent(new CustomEvent('matchEvent', {
      detail: {
        type: 'substitution',
        time: this.currentTime,
        team: 'home',
        playerOut: substitution.playerOut,
        playerIn: substitution.playerIn,
        reason: substitution.reason
      }
    }));
  }
  
  handleMatchEvent(event) {
    // Show overlay for important events
    if (this.options.showOverlays && event.type === 'goal') {
      this.showGoalOverlay(event);
    }
  }
  
  showGoalOverlay(goalEvent) {
    const overlay = this.element.querySelector('.match-overlay');
    const title = overlay.querySelector('.overlay-title');
    const scorer = overlay.querySelector('.goal-scorer');
    const time = overlay.querySelector('.goal-time');
    
    title.textContent = 'GOL!';
    scorer.textContent = goalEvent.player;
    time.textContent = `${goalEvent.time}'`;
    
    overlay.style.display = 'flex';
    
    // Clear any existing timeout
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
    }
    
    // Hide overlay after 3 seconds
    this.overlayTimeout = setTimeout(() => {
      overlay.style.display = 'none';
    }, 3000);
  }
  
  showOverlay(title, details, time) {
    const overlay = this.element.querySelector('.match-overlay');
    const titleElement = overlay.querySelector('.overlay-title');
    const scorer = overlay.querySelector('.goal-scorer');
    const timeElement = overlay.querySelector('.goal-time');
    
    titleElement.textContent = title;
    scorer.textContent = details;
    timeElement.textContent = time;
    
    overlay.style.display = 'flex';
    
    // Clear any existing timeout
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
    }
    
    // Hide overlay after 3 seconds
    this.overlayTimeout = setTimeout(() => {
      overlay.style.display = 'none';
    }, 3000);
  }
  
  generateRandomEvents() {
    // In a real app, this would be based on match simulation logic
    // For now, we'll just generate random events
    
    // Goal chance (1% per minute)
    if (Math.random() < 0.01) {
      const team = Math.random() < 0.5 ? 'home' : 'away';
      const player = team === 'home' ? 'Mario Rossi' : 'Luigi Bianchi';
      
      // Update score
      if (team === 'home') {
        this.matchData.homeScore++;
      } else {
        this.matchData.awayScore++;
      }
      
      // Dispatch goal event
      document.dispatchEvent(new CustomEvent('matchEvent', {
        detail: {
          type: 'goal',
          time: this.currentTime,
          team,
          player
        }
      }));
    }
    
    // Card chance (0.5% per minute)
    if (Math.random() < 0.005) {
      const team = Math.random() < 0.5 ? 'home' : 'away';
      const player = team === 'home' ? 'Giuseppe Verdi' : 'Antonio Neri';
      const cardType = Math.random() < 0.2 ? 'red_card' : 'card';
      
      // Dispatch card event
      document.dispatchEvent(new CustomEvent('matchEvent', {
        detail: {
          type: cardType,
          time: this.currentTime,
          team,
          player
        }
      }));
    }
  }
  
  // Public methods
  getMatchData() {
    return this.matchData;
  }
  
  setMatchData(data) {
    this.matchData = data;
    
    // Update components
    // In a real app, this would update all child components
  }
  
  getCurrentTime() {
    return this.currentTime;
  }
  
  isMatchPlaying() {
    return this.isPlaying;
  }
  
  getCurrentSpeed() {
    return this.currentSpeed;
  }
  
  skipToTime(time) {
    if (time < 0 || time > 90) return;
    
    this.currentTime = time;
    
    // Dispatch time update event
    document.dispatchEvent(new CustomEvent('matchTimeUpdate', {
      detail: { time: this.currentTime }
    }));
    
    // Check for half time or full time
    if (time === 45) {
      this.handleHalfTime();
    } else if (time === 90) {
      this.handleFullTime();
    }
  }
}

export default MatchLiveView;