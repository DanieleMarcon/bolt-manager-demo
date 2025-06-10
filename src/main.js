// Main application entry point
import { GameManager } from './core/GameManager.js';
import { UIManager } from './ui/UIManager.js';
import { DataManager } from './data/DataManager.js';

class BoltManagerApp {
    constructor() {
        this.gameManager = new GameManager();
        this.uiManager = new UIManager();
        this.dataManager = new DataManager();
        
        this.init();
    }

    async init() {
        console.log('🎮 Initializing Bolt Manager 01/02...');
        
        // Initialize managers
        await this.dataManager.init();
        await this.uiManager.init();
        await this.gameManager.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check for existing session
        this.checkExistingSession();
        
        console.log('✅ Bolt Manager initialized successfully!');
    }

    setupEventListeners() {
        // Start new game button
        document.getElementById('startNewGameBtn')?.addEventListener('click', () => {
            this.startNewGame();
        });

        // Load game button
        document.getElementById('loadGameBtn')?.addEventListener('click', () => {
            this.loadGame();
        });

        // Quick save button
        document.getElementById('quickSaveBtn')?.addEventListener('click', () => {
            this.quickSave();
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.navigateToPage(page);
            });
        });
    }

    async startNewGame() {
        console.log('🎯 Starting new game...');
        
        try {
            // Show loading
            this.uiManager.showLoading('Creazione nuova partita...');
            
            // Execute GameFlow_StartNewGame
            const gameData = await this.gameManager.startNewGame();
            
            // Navigate to team management
            this.navigateToPage('team');
            
            // Hide loading
            this.uiManager.hideLoading();
            
            // Show success message
            this.uiManager.showToast('Nuova partita creata con successo!', 'success');
            
        } catch (error) {
            console.error('Error starting new game:', error);
            this.uiManager.hideLoading();
            this.uiManager.showToast('Errore durante la creazione della partita', 'error');
        }
    }

    async loadGame() {
        console.log('📁 Loading game...');
        // TODO: Implement load game functionality
        this.uiManager.showToast('Funzionalità in arrivo!', 'info');
    }

    async quickSave() {
        console.log('💾 Quick saving...');
        // TODO: Implement quick save functionality
        this.uiManager.showToast('Funzionalità in arrivo!', 'info');
    }

    async navigateToPage(page) {
        console.log(`🧭 Navigating to page: ${page}`);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${page}"]`)?.classList.add('active');
        
        // Load page content
        await this.uiManager.loadPage(page);
    }

    checkExistingSession() {
        const existingSession = this.dataManager.getCurrentSession();
        if (existingSession) {
            console.log('📂 Found existing session');
            // Auto-navigate to team page if session exists
            this.navigateToPage('team');
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.boltManager = new BoltManagerApp();
});

// Export for debugging
window.BoltManagerApp = BoltManagerApp;