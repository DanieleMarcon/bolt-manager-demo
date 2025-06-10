// Calendar View Page implementation
export class CalendarViewPage {
    constructor() {
        this.gameManager = null;
        this.currentViewDate = new Date();
    }

    async init() {
        console.log('📅 Initializing CalendarViewPage...');
        
        // Get game manager from global app
        this.gameManager = window.boltManager?.gameManager;
        
        if (!this.gameManager) {
            console.error('GameManager not available');
            return;
        }

        // Setup event listeners
        this.setupEventListeners();
        
        // Load initial data
        this.loadCalendarData();
    }

    async render() {
        return `
            <div class="page-container">
                <!-- Breadcrumb -->
                <nav class="breadcrumb">
                    <a href="#dashboard">Home</a>
                    <span class="breadcrumb-separator">></span>
                    <span class="breadcrumb-current">Calendario</span>
                </nav>

                <!-- Calendar Header -->
                <div class="calendar-header">
                    <div class="calendar-navigation">
                        <button id="prevMonthBtn" class="button button-ghost">‹ Precedente</button>
                        <h2 id="currentMonthYear" class="month-year">--</h2>
                        <button id="nextMonthBtn" class="button button-ghost">Successivo ›</button>
                    </div>
                    <div class="current-game-date">
                        <span class="date-label">Data di gioco:</span>
                        <span id="currentGameDate" class="date-value">--</span>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="calendar-container">
                    <div class="calendar-grid">
                        <div class="calendar-header-row">
                            <div class="calendar-day-header">Lun</div>
                            <div class="calendar-day-header">Mar</div>
                            <div class="calendar-day-header">Mer</div>
                            <div class="calendar-day-header">Gio</div>
                            <div class="calendar-day-header">Ven</div>
                            <div class="calendar-day-header">Sab</div>
                            <div class="calendar-day-header">Dom</div>
                        </div>
                        <div id="calendarDays" class="calendar-days">
                            <!-- Will be populated by loadCalendarGrid() -->
                        </div>
                    </div>
                </div>

                <!-- Calendar Actions -->
                <div class="calendar-actions">
                    <button id="advanceDayBtn" class="button button-primary button-large">
                        ⏭️ Avanza di 1 Giorno
                    </button>
                    <button id="advanceWeekBtn" class="button button-secondary">
                        📅 Avanza di 1 Settimana
                    </button>
                    <button id="todayBtn" class="button button-ghost">
                        📍 Oggi
                    </button>
                </div>

                <!-- Sponsor Box -->
                <div class="sponsor-box">
                    <h4>Partner Ufficiale</h4>
                    <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&fit=crop" 
                         alt="Sponsor Calendar" class="sponsor-image">
                </div>

                <!-- Upcoming Events -->
                <div class="upcoming-events">
                    <h3>Prossimi Eventi</h3>
                    <div id="upcomingEventsList" class="events-list">
                        <!-- Will be populated by loadUpcomingEvents() -->
                    </div>
                </div>

                <!-- Recent Events -->
                <div class="recent-events">
                    <h3>Eventi Recenti</h3>
                    <div id="recentEventsList" class="events-list">
                        <!-- Will be populated by loadRecentEvents() -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Calendar navigation
        document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
            this.currentViewDate.setMonth(this.currentViewDate.getMonth() - 1);
            this.loadCalendarGrid();
        });

        document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
            this.currentViewDate.setMonth(this.currentViewDate.getMonth() + 1);
            this.loadCalendarGrid();
        });

        document.getElementById('todayBtn')?.addEventListener('click', () => {
            this.currentViewDate = new Date(this.gameManager.getCurrentDate());
            this.loadCalendarGrid();
        });

        // Day advancement
        document.getElementById('advanceDayBtn')?.addEventListener('click', () => {
            this.advanceDay(1);
        });

        document.getElementById('advanceWeekBtn')?.addEventListener('click', () => {
            this.advanceDay(7);
        });
    }

    loadCalendarData() {
        if (!this.gameManager || !this.gameManager.gameData) {
            console.log('No game data available');
            return;
        }

        // Set current view date to game date
        this.currentViewDate = new Date(this.gameManager.getCurrentDate());

        // Update current game date display
        const currentDate = new Date(this.gameManager.getCurrentDate());
        document.getElementById('currentGameDate').textContent = currentDate.toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Load calendar grid
        this.loadCalendarGrid();

        // Load events
        this.loadUpcomingEvents();
        this.loadRecentEvents();
    }

    loadCalendarGrid() {
        // Update month/year header
        document.getElementById('currentMonthYear').textContent = this.currentViewDate.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long'
        });

        // Calculate calendar days
        const year = this.currentViewDate.getFullYear();
        const month = this.currentViewDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        
        // Start from Monday of the week containing the first day
        const dayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
        startDate.setDate(firstDay.getDate() - dayOfWeek);

        const calendarDays = [];
        const currentGameDate = new Date(this.gameManager.getCurrentDate());

        // Generate 6 weeks of days
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + (week * 7) + day);
                
                const isCurrentMonth = date.getMonth() === month;
                const isToday = date.toDateString() === currentGameDate.toDateString();
                const isPast = date < currentGameDate;
                const isFuture = date > currentGameDate;

                // Get events for this day
                const dayEvents = this.getEventsForDate(date);

                calendarDays.push({
                    date,
                    isCurrentMonth,
                    isToday,
                    isPast,
                    isFuture,
                    events: dayEvents
                });
            }
        }

        // Render calendar days
        const daysHTML = calendarDays.map(day => {
            const dayClasses = [
                'calendar-day',
                !day.isCurrentMonth ? 'other-month' : '',
                day.isToday ? 'today' : '',
                day.isPast ? 'past' : '',
                day.isFuture ? 'future' : '',
                day.events.length > 0 ? 'has-events' : ''
            ].filter(Boolean).join(' ');

            const eventsHTML = day.events.slice(0, 3).map(event => {
                const eventClass = `event-${event.type}`;
                return `<div class="calendar-event ${eventClass}" title="${event.title}">${event.icon}</div>`;
            }).join('');

            const moreEvents = day.events.length > 3 ? `<div class="more-events">+${day.events.length - 3}</div>` : '';

            return `
                <div class="${dayClasses}" data-date="${day.date.toISOString()}" tabindex="0">
                    <div class="day-number">${day.date.getDate()}</div>
                    <div class="day-events">
                        ${eventsHTML}
                        ${moreEvents}
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('calendarDays').innerHTML = daysHTML;

        // Setup day click listeners
        document.querySelectorAll('.calendar-day').forEach(dayElement => {
            dayElement.addEventListener('click', () => {
                const date = new Date(dayElement.dataset.date);
                this.showDayDetails(date);
            });

            dayElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const date = new Date(dayElement.dataset.date);
                    this.showDayDetails(date);
                }
            });
        });
    }

    getEventsForDate(date) {
        const events = [];
        const dateString = date.toDateString();

        // Check for matches
        const matches = this.gameManager.gameData.matches.filter(match => {
            const matchDate = new Date(match.match_date);
            return matchDate.toDateString() === dateString && match.is_user_match;
        });

        matches.forEach(match => {
            const homeTeam = this.gameManager.gameData.teams.find(t => t.id === match.home_team_id);
            const awayTeam = this.gameManager.gameData.teams.find(t => t.id === match.away_team_id);
            
            events.push({
                type: 'match',
                icon: '⚽',
                title: `${homeTeam?.short_name || 'HOME'} vs ${awayTeam?.short_name || 'AWAY'}`,
                description: `Giornata ${match.matchday}`,
                priority: 4
            });
        });

        // Check for trainings
        const trainings = this.gameManager.gameData.trainings.filter(training => {
            const trainingDate = new Date(training.training_date);
            return trainingDate.toDateString() === dateString;
        });

        trainings.forEach(training => {
            events.push({
                type: 'training',
                icon: '🏃',
                title: `Allenamento ${training.training_type}`,
                description: `Intensità ${training.intensity}`,
                priority: 2
            });
        });

        // Check for game events
        const gameEvents = this.gameManager.gameData.gameEvents.filter(event => {
            const eventDate = new Date(event.game_date);
            return eventDate.toDateString() === dateString;
        });

        gameEvents.forEach(event => {
            const iconMap = {
                match: '⚽',
                training: '🏃',
                transfer: '💰',
                news: '📰',
                injury: '🤕'
            };

            events.push({
                type: event.event_type,
                icon: iconMap[event.event_type] || 'ℹ️',
                title: event.title,
                description: event.description,
                priority: event.priority
            });
        });

        return events.sort((a, b) => b.priority - a.priority);
    }

    loadUpcomingEvents() {
        const upcomingEvents = this.gameManager.getUpcomingEvents(14); // Next 14 days

        if (upcomingEvents.length === 0) {
            document.getElementById('upcomingEventsList').innerHTML = `
                <div class="no-events">
                    <p>Nessun evento in programma</p>
                </div>
            `;
            return;
        }

        const eventsHTML = upcomingEvents.slice(0, 10).map(event => {
            const eventDate = new Date(event.date);
            const daysFromNow = Math.ceil((eventDate - new Date(this.gameManager.getCurrentDate())) / (1000 * 60 * 60 * 24));
            
            const priorityClass = event.priority >= 4 ? 'high-priority' : event.priority >= 3 ? 'medium-priority' : 'low-priority';

            return `
                <div class="event-item ${priorityClass}">
                    <div class="event-date">
                        <span class="event-day">${eventDate.toLocaleDateString('it-IT', { weekday: 'short' })}</span>
                        <span class="event-date-num">${eventDate.getDate()}</span>
                        <span class="event-month">${eventDate.toLocaleDateString('it-IT', { month: 'short' })}</span>
                    </div>
                    <div class="event-info">
                        <h4 class="event-title">${event.title}</h4>
                        <p class="event-description">${event.description}</p>
                        <span class="event-time">
                            ${daysFromNow === 0 ? 'Oggi' : 
                              daysFromNow === 1 ? 'Domani' : 
                              `Tra ${daysFromNow} giorni`}
                        </span>
                    </div>
                    <div class="event-type">
                        <span class="event-icon">${this.getEventIcon(event.type)}</span>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('upcomingEventsList').innerHTML = eventsHTML;
    }

    loadRecentEvents() {
        const recentEvents = this.gameManager.gameData.gameEvents
            .filter(event => event.is_user_relevant)
            .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
            .slice(0, 5);

        if (recentEvents.length === 0) {
            document.getElementById('recentEventsList').innerHTML = `
                <div class="no-events">
                    <p>Nessun evento recente</p>
                </div>
            `;
            return;
        }

        const eventsHTML = recentEvents.map(event => {
            const eventDate = new Date(event.event_date);
            const categoryClass = `category-${event.event_category}`;

            return `
                <div class="event-item ${categoryClass}">
                    <div class="event-date">
                        <span class="event-time">${eventDate.toLocaleDateString('it-IT')}</span>
                    </div>
                    <div class="event-info">
                        <h4 class="event-title">${event.title}</h4>
                        <p class="event-description">${event.description}</p>
                    </div>
                    <div class="event-type">
                        <span class="event-icon">${this.getEventIcon(event.event_type)}</span>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('recentEventsList').innerHTML = eventsHTML;
    }

    getEventIcon(eventType) {
        const iconMap = {
            match: '⚽',
            training: '🏃',
            transfer: '💰',
            news: '📰',
            injury: '🤕',
            contract: '📝',
            achievement: '🏆'
        };
        return iconMap[eventType] || 'ℹ️';
    }

    async advanceDay(days = 1) {
        try {
            window.boltManager.uiManager.showLoading(`Avanzamento di ${days} giorno${days > 1 ? 'i' : ''}...`);

            const result = await this.gameManager.executeAdvanceDay(days);

            // Refresh all data
            this.loadCalendarData();

            window.boltManager.uiManager.hideLoading();

            // Show notification
            const newDate = new Date(result.newDate);
            window.boltManager.uiManager.showToast(
                `Avanzato al ${newDate.toLocaleDateString('it-IT')}`, 
                'success'
            );

            // Show any important events
            const importantEvents = result.eventsGenerated.filter(event => event.priority >= 3);
            if (importantEvents.length > 0) {
                setTimeout(() => {
                    importantEvents.forEach(event => {
                        window.boltManager.uiManager.showToast(event.title, 'info', 5000);
                    });
                }, 1000);
            }

        } catch (error) {
            console.error('Error advancing day:', error);
            window.boltManager.uiManager.hideLoading();
            window.boltManager.uiManager.showToast('Errore nell\'avanzamento: ' + error.message, 'error');
        }
    }

    showDayDetails(date) {
        const events = this.getEventsForDate(date);
        const dateString = date.toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const eventsHTML = events.length > 0 ? 
            events.map(event => `
                <div class="day-detail-event">
                    <span class="event-icon">${event.icon}</span>
                    <div class="event-content">
                        <h4>${event.title}</h4>
                        <p>${event.description}</p>
                    </div>
                </div>
            `).join('') :
            '<p>Nessun evento programmato per questo giorno</p>';

        const content = `
            <div class="day-details">
                <h3>${dateString}</h3>
                <div class="day-events-list">
                    ${eventsHTML}
                </div>
            </div>
        `;

        window.boltManager.uiManager.showModal(`Eventi del ${date.getDate()}`, content);
    }
}