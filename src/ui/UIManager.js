// UI management and page routing
import { TeamManagementPage } from './pages/TeamManagementPage.js';
import { TrainingManagementPage } from './pages/TrainingManagementPage.js';
import { CalendarViewPage } from './pages/CalendarViewPage.js';
import { TacticalSetupPage } from './pages/TacticalSetupPage.js';
import { MatchSimulationPage } from './pages/MatchSimulationPage.js';
import { MatchAnalysisPage } from './pages/MatchAnalysisPage.js';

export class UIManager {
    constructor() {
        this.currentPage = null;
        this.pages = {
            team: new TeamManagementPage(),
            training: new TrainingManagementPage(),
            calendar: new CalendarViewPage(),
            tactics: new TacticalSetupPage(),
            'match-simulation': new MatchSimulationPage(),
            'match-analysis': new MatchAnalysisPage()
        };
        this.loadingElement = null;
    }

    async init() {
        console.log('🎨 UIManager initializing...');
        this.setupLoadingElement();
    }

    setupLoadingElement() {
        // Create loading overlay
        const loadingHTML = `
            <div id="loadingOverlay" class="loading-overlay" style="display: none;">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p id="loadingText">Caricamento...</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
        this.loadingElement = document.getElementById('loadingOverlay');
    }

    async loadPage(pageName) {
        console.log(`🎨 Loading page: ${pageName}`);
        
        const page = this.pages[pageName];
        if (!page) {
            console.error(`Page not found: ${pageName}`);
            return;
        }

        try {
            // Show loading
            this.showLoading(`Caricamento ${pageName}...`);
            
            // Get page content
            const content = await page.render();
            
            // Update main content
            const mainContent = document.getElementById('pageContent');
            if (mainContent) {
                mainContent.innerHTML = content;
                
                // Initialize page
                await page.init();
                
                this.currentPage = page;
            }
            
            // Hide loading
            this.hideLoading();
            
        } catch (error) {
            console.error(`Error loading page ${pageName}:`, error);
            this.hideLoading();
            this.showToast(`Errore nel caricamento della pagina ${pageName}`, 'error');
        }
    }

    showLoading(text = 'Caricamento...') {
        if (this.loadingElement) {
            document.getElementById('loadingText').textContent = text;
            this.loadingElement.style.display = 'flex';
        }
    }

    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${this.getToastIcon(type)}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);

        // Animate in
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);
    }

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    showModal(title, content, actions = []) {
        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;

        const actionsHTML = actions.map(action => 
            `<button class="button ${action.class || 'button-secondary'}" onclick="${action.onclick}">${action.text}</button>`
        ).join('');

        const modalHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-content">
                        ${content}
                    </div>
                    <div class="modal-actions">
                        ${actionsHTML}
                        <button class="button button-ghost" onclick="this.closest('.modal-overlay').remove()">Chiudi</button>
                    </div>
                </div>
            </div>
        `;

        modalContainer.innerHTML = modalHTML;
        
        // Animate in
        setTimeout(() => {
            modalContainer.querySelector('.modal-overlay').classList.add('modal-show');
        }, 10);
    }

    hideModal() {
        const modalContainer = document.getElementById('modalContainer');
        if (modalContainer) {
            modalContainer.innerHTML = '';
        }
    }
}