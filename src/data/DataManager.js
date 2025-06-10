// Data persistence and management
export class DataManager {
    constructor() {
        this.gameData = null;
        this.currentSession = null;
    }

    async init() {
        console.log('💾 DataManager initializing...');
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('boltManager_gameData');
            const savedSession = localStorage.getItem('boltManager_currentSession');
            
            if (savedData) {
                this.gameData = JSON.parse(savedData);
                console.log('📂 Game data loaded from localStorage');
            }
            
            if (savedSession) {
                this.currentSession = JSON.parse(savedSession);
                console.log('📂 Current session loaded from localStorage');
            }
        } catch (error) {
            console.error('Error loading data from storage:', error);
        }
    }

    saveToStorage(gameData, session) {
        try {
            if (gameData) {
                localStorage.setItem('boltManager_gameData', JSON.stringify(gameData));
                this.gameData = gameData;
            }
            
            if (session) {
                localStorage.setItem('boltManager_currentSession', JSON.stringify(session));
                this.currentSession = session;
            }
            
            console.log('💾 Data saved to localStorage');
        } catch (error) {
            console.error('Error saving data to storage:', error);
        }
    }

    getGameData() {
        return this.gameData;
    }

    getCurrentSession() {
        return this.currentSession;
    }

    clearStorage() {
        localStorage.removeItem('boltManager_gameData');
        localStorage.removeItem('boltManager_currentSession');
        this.gameData = null;
        this.currentSession = null;
        console.log('🗑️ Storage cleared');
    }
}