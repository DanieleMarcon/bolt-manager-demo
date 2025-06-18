export const template = `
<div class="key-moments-timeline">
  <div class="timeline-header">
    <h3 class="timeline-title">Momenti Chiave</h3>
    <div class="timeline-controls">
      <button class="timeline-btn replay-btn" aria-label="Rivedi momenti">
        ▶️ Replay
      </button>
      <button class="timeline-btn export-btn" aria-label="Esporta timeline">
        📤 Esporta
      </button>
    </div>
  </div>
  
  <div class="timeline-container">
    <div class="timeline-track">
      <div class="timeline-line"></div>
      
      <div class="time-markers">
        <div class="time-marker" data-time="0">0'</div>
        <div class="time-marker" data-time="15">15'</div>
        <div class="time-marker" data-time="30">30'</div>
        <div class="time-marker" data-time="45">45'</div>
        <div class="time-marker halftime" data-time="45">HT</div>
        <div class="time-marker" data-time="60">60'</div>
        <div class="time-marker" data-time="75">75'</div>
        <div class="time-marker" data-time="90">90'</div>
      </div>
      
      <div class="moments-track">
        <!-- Key moments will be positioned here -->
      </div>
    </div>
  </div>
  
  <div class="moments-list">
    <div class="moments-scroll">
      <!-- Detailed moments list -->
    </div>
  </div>
  
  <div class="timeline-stats">
    <div class="stat-item">
      <span class="stat-value total-moments">0</span>
      <span class="stat-label">Momenti Totali</span>
    </div>
    <div class="stat-item">
      <span class="stat-value goals-count">0</span>
      <span class="stat-label">Gol</span>
    </div>
    <div class="stat-item">
      <span class="stat-value cards-count">0</span>
      <span class="stat-label">Cartellini</span>
    </div>
    <div class="stat-item">
      <span class="stat-value subs-count">0</span>
      <span class="stat-label">Sostituzioni</span>
    </div>
  </div>
  
  <!-- Sponsor slot -->
  <div class="sponsor-slot sponsor-slot-moments">
    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=40" 
         alt="Key Moments Sponsor" class="sponsor-image">
  </div>
</div>
<style>
.key-moments-timeline {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.timeline-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text);
}

.timeline-controls {
  display: flex;
  gap: 8px;
}

.timeline-btn {
  padding: 6px 12px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.timeline-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.timeline-container {
  margin-bottom: 20px;
  padding: 20px 0;
}

.timeline-track {
  position: relative;
  height: 100px;
}

.timeline-line {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 2px;
}

.time-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 20px;
}

.time-marker {
  position: relative;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  padding: 4px 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  z-index: 2;
}

.time-marker.halftime {
  background: var(--warning);
  color: white;
  border-color: var(--warning);
}

.time-marker::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 16px;
  background: var(--border);
}

.moments-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
}

.moment-point {
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 3;
  transform: translateX(-50%);
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.moment-point:hover {
  transform: translateX(-50%) scale(1.3);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.moment-point.goal {
  background: var(--success);
  color: white;
}

.moment-point.card {
  background: var(--warning);
  color: white;
}

.moment-point.red-card {
  background: var(--error);
  color: white;
}

.moment-point.substitution {
  background: var(--primary);
  color: white;
}

.moment-point.key-play {
  background: var(--accent);
  color: white;
}

.moment-point.active {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  50% { 
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
  }
}

.moments-list {
  background: var(--background);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow: hidden;
}

.moments-scroll {
  max-height: 268px;
  overflow-y: auto;
  padding-right: 8px;
}

.moment-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.moment-item:hover {
  background: var(--background);
  border-color: var(--primary);
  transform: translateX(4px);
}

.moment-item.highlighted {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.05);
}

.moment-time {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  min-width: 35px;
  flex-shrink: 0;
}

.moment-icon {
  font-size: 18px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.moment-content {
  flex: 1;
}

.moment-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.moment-description {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.moment-team {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 80px;
  flex-shrink: 0;
}

.team-badge-small {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.team-badge-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-name-small {
  font-size: 10px;
  font-weight: 500;
  color: var(--text);
}

.timeline-stats {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  display: block;
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.sponsor-slot-moments {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 120px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  opacity: 0.8;
}

/* Moment animations */
.moment-point.new-moment {
  animation: momentAppear 0.8s ease;
}

@keyframes momentAppear {
  0% { 
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) scale(1.5);
  }
  100% { 
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}

.moment-item.new-moment {
  animation: slideInMoment 0.5s ease;
}

@keyframes slideInMoment {
  0% { 
    transform: translateX(-100%);
    opacity: 0;
  }
  100% { 
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .timeline-controls {
    justify-content: center;
  }
  
  .time-markers {
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .time-marker {
    font-size: 10px;
    padding: 2px 4px;
  }
  
  .moment-point {
    width: 16px;
    height: 16px;
    font-size: 8px;
  }
  
  .moment-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .moment-team {
    align-self: flex-end;
  }
  
  .timeline-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  .sponsor-slot-moments {
    position: static;
    width: 100%;
    margin-top: 16px;
  }
}
</style>
`;

class KeyMomentsTimeline {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autoPlay: false,
      showProgress: true,
      maxMoments: 20,
      ...options
    };
    
    this.moments = [];
    this.currentMoment = null;
    this.matchDuration = 90;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.loadMoments();
    this.renderTimeline();
    this.updateStats();
  }
  
  bindEvents() {
    // Control buttons
    this.element.querySelector('.replay-btn').addEventListener('click', () => {
      this.replayMoments();
    });
    
    this.element.querySelector('.export-btn').addEventListener('click', () => {
      this.exportTimeline();
    });
    
    // Timeline interactions
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('moment-point')) {
        this.selectMoment(e.target.dataset.momentId);
      }
      
      if (e.target.closest('.moment-item')) {
        const momentId = e.target.closest('.moment-item').dataset.momentId;
        this.selectMoment(momentId);
      }
    });
  }
  
  async loadMoments() {
    try {
      // In a real app, this would fetch from match data
      this.moments = await this.fetchKeyMoments();
      this.renderTimeline();
      this.renderMomentsList();
      this.updateStats();
    } catch (error) {
      console.error('Error loading key moments:', error);
    }
  }
  
  async fetchKeyMoments() {
    // Mock data - in real app this would come from match simulation
    return [
      {
        id: 1,
        type: 'goal',
        time: 23,
        team: 'home',
        player: 'Mario Rossi',
        title: 'Gol di Mario Rossi',
        description: 'Tiro da fuori area dopo assist di Luigi Bianchi',
        importance: 9
      },
      {
        id: 2,
        type: 'card',
        time: 38,
        team: 'away',
        player: 'Giuseppe Verdi',
        title: 'Cartellino Giallo',
        description: 'Ammonito per fallo su Mario Rossi',
        importance: 6
      },
      {
        id: 3,
        type: 'key-play',
        time: 52,
        team: 'home',
        player: 'Luigi Bianchi',
        title: 'Occasione Sprecata',
        description: 'Tiro a botta sicura parato dal portiere',
        importance: 7
      },
      {
        id: 4,
        type: 'goal',
        time: 67,
        team: 'away',
        player: 'Antonio Neri',
        title: 'Gol del Pareggio',
        description: 'Colpo di testa su cross dalla destra',
        importance: 9
      },
      {
        id: 5,
        type: 'substitution',
        time: 75,
        team: 'home',
        player: 'Franco Blu',
        title: 'Sostituzione Tattica',
        description: 'Franco Blu entra per Mario Rossi',
        importance: 5
      }
    ];
  }
  
  renderTimeline() {
    const momentsTrack = this.element.querySelector('.moments-track');
    momentsTrack.innerHTML = '';
    
    this.moments.forEach(moment => {
      const momentElement = this.createMomentPoint(moment);
      momentsTrack.appendChild(momentElement);
    });
  }
  
  createMomentPoint(moment) {
    const element = document.createElement('div');
    element.className = `moment-point ${moment.type}`;
    element.dataset.momentId = moment.id;
    element.style.left = `${(moment.time / this.matchDuration) * 100}%`;
    
    element.innerHTML = this.getMomentIcon(moment.type);
    element.title = `${moment.time}' - ${moment.title}`;
    
    // Add importance-based styling
    if (moment.importance >= 8) {
      element.style.transform = 'translateX(-50%) scale(1.2)';
    }
    
    return element;
  }
  
  getMomentIcon(type) {
    const icons = {
      goal: '⚽',
      card: '🟨',
      red_card: '🟥',
      substitution: '🔄',
      key_play: '⭐',
      save: '🥅',
      miss: '❌'
    };
    return icons[type] || '📝';
  }
  
  renderMomentsList() {
    const momentsScroll = this.element.querySelector('.moments-scroll');
    momentsScroll.innerHTML = '';
    
    // Sort moments by time
    const sortedMoments = [...this.moments].sort((a, b) => a.time - b.time);
    
    sortedMoments.forEach(moment => {
      const momentElement = this.createMomentItem(moment);
      momentsScroll.appendChild(momentElement);
    });
  }
  
  createMomentItem(moment) {
    const item = document.createElement('div');
    item.className = 'moment-item';
    item.dataset.momentId = moment.id;
    
    item.innerHTML = `
      <div class="moment-time">${moment.time}'</div>
      <div class="moment-icon">${this.getMomentIcon(moment.type)}</div>
      <div class="moment-content">
        <div class="moment-title">${moment.title}</div>
        <div class="moment-description">${moment.description}</div>
      </div>
      <div class="moment-team">
        <div class="team-badge-small">
          <img src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=32&h=32" 
               alt="Team badge" loading="lazy">
        </div>
        <span class="team-name-small">${moment.team === 'home' ? 'Casa' : 'Ospite'}</span>
      </div>
    `;
    
    return item;
  }
  
  selectMoment(momentId) {
    const moment = this.moments.find(m => m.id == momentId);
    if (!moment) return;
    
    this.currentMoment = moment;
    
    // Update visual selection
    this.updateSelection(momentId);
    
    // Dispatch moment selection event
    this.element.dispatchEvent(new CustomEvent('momentSelected', {
      detail: { moment }
    }));
  }
  
  updateSelection(momentId) {
    // Remove previous selections
    this.element.querySelectorAll('.moment-point, .moment-item').forEach(el => {
      el.classList.remove('active', 'highlighted');
    });
    
    // Add selection to current moment
    const timelinePoint = this.element.querySelector(`.moment-point[data-moment-id="${momentId}"]`);
    const listItem = this.element.querySelector(`.moment-item[data-moment-id="${momentId}"]`);
    
    if (timelinePoint) timelinePoint.classList.add('active');
    if (listItem) {
      listItem.classList.add('highlighted');
      listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  addMoment(moment) {
    // Add new moment with animation
    moment.id = Date.now() + Math.random();
    this.moments.push(moment);
    
    // Sort moments by time
    this.moments.sort((a, b) => a.time - b.time);
    
    // Re-render with animation
    this.renderTimeline();
    this.renderMomentsList();
    this.updateStats();
    
    // Animate new moment
    const timelinePoint = this.element.querySelector(`[data-moment-id="${moment.id}"]`);
    if (timelinePoint) {
      timelinePoint.classList.add('new-moment');
      setTimeout(() => {
        timelinePoint.classList.remove('new-moment');
      }, 800);
    }
    
    // Dispatch new moment event
    this.element.dispatchEvent(new CustomEvent('newMoment', {
      detail: { moment, totalMoments: this.moments.length }
    }));
  }
  
  replayMoments() {
    if (this.moments.length === 0) return;
    
    let currentIndex = 0;
    const replayInterval = setInterval(() => {
      if (currentIndex >= this.moments.length) {
        clearInterval(replayInterval);
        return;
      }
      
      const moment = this.moments[currentIndex];
      this.selectMoment(moment.id);
      
      // Dispatch replay event
      this.element.dispatchEvent(new CustomEvent('momentReplay', {
        detail: { moment, index: currentIndex, total: this.moments.length }
      }));
      
      currentIndex++;
    }, 1500); // 1.5 seconds between moments
    
    this.showSuccess('Replay momenti chiave avviato');
  }
  
  exportTimeline() {
    const exportData = {
      moments: this.moments,
      stats: {
        totalMoments: this.moments.length,
        goals: this.moments.filter(m => m.type === 'goal').length,
        cards: this.moments.filter(m => m.type === 'card' || m.type === 'red_card').length,
        substitutions: this.moments.filter(m => m.type === 'substitution').length
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `key-moments-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showSuccess('Timeline esportata con successo');
  }
  
  updateStats() {
    const totalMoments = this.moments.length;
    const goals = this.moments.filter(m => m.type === 'goal').length;
    const cards = this.moments.filter(m => m.type === 'card' || m.type === 'red_card').length;
    const substitutions = this.moments.filter(m => m.type === 'substitution').length;
    
    this.element.querySelector('.total-moments').textContent = totalMoments;
    this.element.querySelector('.goals-count').textContent = goals;
    this.element.querySelector('.cards-count').textContent = cards;
    this.element.querySelector('.subs-count').textContent = substitutions;
  }
  
  showSuccess(message) {
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: { message, type: 'success' }
    }));
  }
  
  // Public methods
  getMoments() {
    return [...this.moments];
  }
  
  getMomentsByType(type) {
    return this.moments.filter(moment => moment.type === type);
  }
  
  getMomentsByTimeRange(startTime, endTime) {
    return this.moments.filter(moment => 
      moment.time >= startTime && moment.time <= endTime
    );
  }
  
  clearMoments() {
    this.moments = [];
    this.renderTimeline();
    this.renderMomentsList();
    this.updateStats();
  }
  
  setMatchDuration(duration) {
    this.matchDuration = duration;
    this.renderTimeline();
  }
  
  getCurrentMoment() {
    return this.currentMoment;
  }
}

export default KeyMomentsTimeline;