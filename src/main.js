import initializeComponents from './componentLoader.js';
import { GameFlow_StartNewGame } from "../bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt_src/flows/Session_Load.js";
import { Session_Save } from "../bolt_src/flows/Session_Save.js";

// Elenco squadre disponibili per l'utente
const TEAM_CHOICES = [
  'Aureliana',
  'Brioschese',
  'Cambiaghese',
  'Città di Monza',
  'Fonas',
  'Fusion Multisport',
  'Grezzago',
  'Masate',
  'Monsignor Orsenigo',
  'Novese Gunners',
  'Nuova Frontiera',
  'PanaCalcio',
  'Roncello FC',
  'Sovico Calcio',
  'Virtus ACLI Trecella'
];

// Import delle pagine
import DashboardPage from "../bolt_src/pages/Dashboard.page.js";
import TeamPage from "../bolt_src/pages/Team.page.js";
import TeamStatsPage from "../bolt_src/pages/TeamStats.page.js";
import TeamMoralePage from "../bolt_src/pages/TeamMorale.page.js";
import NextMatchPage from "../bolt_src/pages/NextMatch.page.js";
import CalendarViewPage from "../bolt_src/pages/CalendarView.page.js";
import ResultsPage from "../bolt_src/pages/Results.page.js";
import MatchSimulationPage from "../bolt_src/pages/MatchSimulation.page.js";
import MatchAnalysisPage from "../bolt_src/pages/MatchAnalysis.page.js";
import TrainingManagementPage from "../bolt_src/pages/TrainingManagement.page.js";
import TrainingProgramsPage from "../bolt_src/pages/TrainingPrograms.page.js";
import TrainingProgressPage from "../bolt_src/pages/TrainingProgress.page.js";
import TacticalSetupPage from "../bolt_src/pages/TacticalSetup.page.js";
import TacticalSchemesPage from "../bolt_src/pages/TacticalSchemes.page.js";
import TacticalRolesPage from "../bolt_src/pages/TacticalRoles.page.js";
import TransfersPage from "../bolt_src/pages/Transfers.page.js";
import NegotiationsPage from "../bolt_src/pages/Negotiations.page.js";
import ContractsPage from "../bolt_src/pages/Contracts.page.js";
import StaffManagementPage from "../bolt_src/pages/StaffManagement.page.js";
import PlayerHistoryPage from "../bolt_src/pages/PlayerHistory.page.js";
import UserSettingsPage from "../bolt_src/pages/UserSettings.page.js";
import SessionManagerPage from "../bolt_src/pages/SessionManager.page.js";
import BoardPage from "../bolt_src/pages/Board.page.js";
import FinanceOverviewPage from "../bolt_src/pages/FinanceOverview.page.js";
import PressCenterPage from "../bolt_src/pages/PressCenter.page.js";
import ScoutingPage from "../bolt_src/pages/Scouting.page.js";
import ShortlistPage from "../bolt_src/pages/Shortlist.page.js";
import ScoutingReportsPage from "../bolt_src/pages/ScoutingReports.page.js";

// Mappa delle route
const routes = {
  dashboard: DashboardPage,
  team: TeamPage,
  "team-stats": TeamStatsPage,
  "team-morale": TeamMoralePage,
  "next-match": NextMatchPage,
  calendar: CalendarViewPage,
  results: ResultsPage,
  training: TrainingManagementPage,
  "training-programs": TrainingProgramsPage,
  "training-progress": TrainingProgressPage,
  tactics: TacticalSetupPage,
  "tactics-schemes": TacticalSchemesPage,
  "tactics-roles": TacticalRolesPage,
  transfers: TransfersPage,
  negotiations: NegotiationsPage,
  contracts: ContractsPage,
  staff: StaffManagementPage,
  history: PlayerHistoryPage,
  settings: UserSettingsPage,
  sessions: SessionManagerPage,
  board: BoardPage,
  finances: FinanceOverviewPage,
  press: PressCenterPage,
  scouting: ScoutingPage,
  shortlist: ShortlistPage,
  'match-simulation': MatchSimulationPage,
  'match-analysis': MatchAnalysisPage,
  reports: ScoutingReportsPage,
};

/**
 * Enhanced page loading with football atmosphere
 */
function loadPage(key) {
  const pageContainer = document.getElementById("pageContent");
  
  // Add loading animation
  pageContainer.innerHTML = `
    <div class="page-loading">
      <div class="loading-stadium">
        <div class="loading-field"></div>
        <div class="loading-text">Caricamento...</div>
      </div>
    </div>
  `;
  
  // Update active navigation
  updateActiveNavigation(key);
  
  // Load page with delay for smooth transition
  setTimeout(() => {
    pageContainer.innerHTML = "";
    const PageClass = routes[key];
    if (PageClass) {
      new PageClass();
      // Add page entrance animation
      pageContainer.classList.add('page-enter');
      setTimeout(() => pageContainer.classList.remove('page-enter'), 300);
    } else {
      pageContainer.innerHTML = `
        <div class="error-page">
          <h2>🚫 Pagina non trovata</h2>
          <p>La pagina "${key}" non esiste nel sistema.</p>
          <button onclick="window.location.hash='dashboard'" class="button button-primary">
            Torna alla Dashboard
          </button>
        </div>
      `;
    }
  }, 200);
}

function updateActiveNavigation(key) {
  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page
  const activeLink = document.querySelector(`a[href="#${key}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}
  
function loadPageFromHash() {
  const hash = window.location.hash.slice(1) || "dashboard";
  switch (hash) {
    case "new":
      startNewGame();
      break;
    case "load":
      loadGame();
      break;
    case "quickSave":
      saveGame();
      break;
    case "press-center":
    case "press":
      loadPage("press");
      break;
    case "settings":
      loadPage("settings");
      break;
    default:
      loadPage(hash);
 }
}

// Enhanced event listeners with football atmosphere
function setupEventListeners() {
  const startBtn = document.getElementById("startNewGameBtn");
  if (startBtn) startBtn.addEventListener("click", startNewGame);

  const loadBtn = document.getElementById("loadGameBtn");
  if (loadBtn) loadBtn.addEventListener("click", loadGame);

  const notifBtn = document.getElementById("notificationsBtn");
  if (notifBtn) notifBtn.addEventListener("click", () => {
    showFootballToast("📰 Apertura sala stampa", "info");
    window.location.hash = "press";
  });

  const quickSaveBtn = document.getElementById("quickSaveBtn");
  if (quickSaveBtn) quickSaveBtn.addEventListener("click", () => {
    showFootballToast("💾 Salvataggio in corso...", "info");
    window.location.hash = "quickSave";
  });

  const settingsBtn = document.getElementById("settingsBtn");
  if (settingsBtn) settingsBtn.addEventListener("click", () => {
    window.location.hash = "settings";
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const sidebar = document.getElementById("sidebar");
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      mobileToggle.classList.toggle("active");
    });
  }

  window.addEventListener("hashchange", loadPageFromHash);
  
  // Add keyboard shortcuts for football manager feel
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
  // Quick navigation shortcuts
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 's':
        e.preventDefault();
        saveGame();
        break;
      case 'd':
        e.preventDefault();
        window.location.hash = 'dashboard';
        break;
      case 't':
        e.preventDefault();
        window.location.hash = 'team';
        break;
      case 'm':
        e.preventDefault();
        window.location.hash = 'next-match';
        break;
    }
  }
}

// Enhanced new game with football atmosphere
function startNewGame() {
  showWelcome(false);
  const modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) return;

  const teamItems = TEAM_CHOICES.map(
    t => `<li class="team-item" data-team="${t}">
      <div class="team-badge">⚽</div>
      <div class="team-info">
        <div class="team-name">${t}</div>
        <div class="team-league">Serie D</div>
      </div>
    </li>`
  ).join("");

  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>🏆 Inizia la tua Carriera</h3>
        <button class="modal-close-btn" id="modalCloseBtn">×</button>
      </div>
      <div class="modal-body">
        <p class="modal-subtitle">Scegli la squadra che guiderai verso la gloria</p>
        
        <div class="coach-setup">
          <label for="coachNameInput" class="form-label">
            <span class="label-icon">👤</span>
            <span>Nome Allenatore</span>
          </label>
          <input id="coachNameInput" type="text" class="form-input" placeholder="Inserisci il tuo nome" />
        </div>
        
        <div class="team-selection">
          <h4>Seleziona la tua squadra:</h4>
          <ul class="team-list">${teamItems}</ul>
        </div>
      </div>
      <div class="modal-footer">
        <button id="cancelNewGameBtn" class="button button-ghost">
          <span>❌</span>
          <span>Annulla</span>
        </button>
        <button id="confirmNewGameBtn" class="button button-primary">
          <span>🚀</span>
          <span>Inizia Carriera</span>
        </button>
      </div>
    </div>`;
  modalContainer.style.display = "flex";

  let selectedTeam = null;
  const listItems = modalContainer.querySelectorAll('.team-item');
  
  // Team selection logic
  listItems.forEach(li => {
    li.addEventListener('click', () => {
      listItems.forEach(i => i.classList.remove('selected'));
      li.classList.add('selected');
      selectedTeam = li.dataset.team;
      
      // Add selection sound effect (visual feedback)
      li.style.transform = 'scale(0.95)';
      setTimeout(() => li.style.transform = '', 150);
      
      // Enable confirm button when team is selected
      const confirmBtn = modalContainer.querySelector('#confirmNewGameBtn');
      confirmBtn.disabled = false;
      confirmBtn.style.opacity = '1';
    });
  });

  // Modal close handlers
  const closeModal = () => {
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
    showWelcome(true);
  };

  modalContainer.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
  modalContainer.querySelector('#cancelNewGameBtn').addEventListener('click', closeModal);

  // Click outside to close
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  // Confirm button handler
  modalContainer.querySelector('#confirmNewGameBtn')
    .addEventListener('click', async () => {
      const userName = modalContainer.querySelector('#coachNameInput').value.trim();
      if (!userName || !selectedTeam) {
        showFootballToast('⚠️ Inserisci nome e scegli una squadra', 'warning');
        return;
      }

      // Show loading state
      const confirmBtn = modalContainer.querySelector('#confirmNewGameBtn');
      const originalContent = confirmBtn.innerHTML;
      confirmBtn.innerHTML = '<span>⏳</span><span>Creazione in corso...</span>';
      confirmBtn.disabled = true;

      const date = new Date().toISOString().slice(0,10);
      const sessionName = `${date}_${selectedTeam}_${userName}`;

      try {
        const result = await GameFlow_StartNewGame({
          sessionName,
          userTeamName: selectedTeam,
          difficulty: 'standard'
        });

        const userTeam = result?.gameData?.teams.find(t => t.name === selectedTeam);
        if (userTeam) {
          const coach = result.gameData.staff.find(
            s => s.team_id === userTeam.id && s.role === 'head_coach'
          );
          if (coach) coach.first_name = userName;

          window.currentSession = { user_team_id: userTeam.id };

          // Populate datasets
          const { teamsDataset } = await import('../bolt_src/datasets/teams.js');
          for (const team of result.gameData.teams) {
            await teamsDataset.create(team);
          }
          if (result.gameData.finances) {
            const { financesDataset } = await import('../bolt_src/datasets/finances.js');
            for (const rec of result.gameData.finances) {
              await financesDataset.create(rec);
            }
          }
          if (result.gameData.matches) {
            const { matchesDataset } = await import('../bolt_src/datasets/matches.js');
            for (const match of result.gameData.matches) {
              await matchesDataset.create(match);
            }
          }
          if (result.gameData.players) {
            const { playersDataset } = await import('../bolt_src/datasets/players.js');
            for (const player of result.gameData.players) {
              await playersDataset.create(player);
            }
          }
        }

        modalContainer.style.display = 'none';
        modalContainer.innerHTML = '';
        showWelcome(false);
        showFootballToast(`🎉 Benvenuto alla ${selectedTeam}!`, 'success');
        window.location.hash = 'dashboard';
      } catch (error) {
        console.error('Errore avvio:', error);
        showFootballToast('❌ Errore durante la creazione della carriera', 'error');
        confirmBtn.innerHTML = originalContent;
        confirmBtn.disabled = false;
      }
    });

  // Initially disable confirm button
  const confirmBtn = modalContainer.querySelector('#confirmNewGameBtn');
  confirmBtn.disabled = true;
  confirmBtn.style.opacity = '0.5';
}

// Enhanced load game
async function loadGame() {
  try {
    showFootballToast("📁 Caricamento carriera...", "info");
    const sessionId = prompt("ID sessione da caricare:");
    if (!sessionId) return;
    
    const result = await Session_Load({ session_id: sessionId });
    if (result?.success && result.userTeam) {
      window.currentSession = { user_team_id: result.userTeam.id };
      const { teamsDataset } = await import('../bolt_src/datasets/teams.js');
      const existing = await teamsDataset.get(result.userTeam.id);
      if (!existing && result.datasetsRestored?.length) {
        for (const team of result.userTeam ? [result.userTeam] : []) {
          await teamsDataset.create(team);
        }
      }
    }
    showWelcome(false);
    showFootballToast("✅ Carriera caricata con successo!", "success");
    window.location.hash = "dashboard";
  } catch (error) {
    console.error("Errore caricamento:", error);
    showFootballToast("❌ Errore nel caricamento della carriera", "error");
  }
}

function saveGame() {
  showFootballToast("💾 Salvataggio carriera...", "info");
  Session_Save();
  setTimeout(() => {
    showFootballToast("✅ Carriera salvata!", "success");
  }, 1000);
}

// Enhanced toast with football atmosphere
function showFootballToast(message, type = 'info') {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✅' : 
               type === 'error' ? '❌' : 
               type === 'warning' ? '⚠️' : 'ℹ️';
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  
  const container = document.getElementById("toastContainer");
  if (container) {
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

function showWelcome(show) {
  const welcome = document.getElementById("welcomeScreen");
  const sidebar = document.getElementById("sidebar");
  const topBar = document.getElementById("topBar");
  const mobileToggle = document.getElementById("mobileMenuToggle");
  
  if (!welcome || !sidebar || !topBar) return;
  
  if (show) {
    welcome.classList.remove("hidden");
    sidebar.classList.add("hidden");
    topBar.classList.add("hidden");
    if (mobileToggle) mobileToggle.classList.add("hidden");
  } else {
    welcome.classList.add("hidden");
    sidebar.classList.remove("hidden");
    topBar.classList.remove("hidden");
    if (mobileToggle) mobileToggle.classList.remove("hidden");
  }
}

// Initialize app with football atmosphere
function initializeApp() {
  console.log("⚽ Inizializzazione Allenatore Nato...");
  
  // Add enhanced styles for the modal
  const style = document.createElement('style');
  style.textContent = `
    .page-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
      flex-direction: column;
    }
    
    .loading-stadium {
      text-align: center;
    }
    
    .loading-field {
      width: 60px;
      height: 60px;
      border: 3px solid var(--border);
      border-top: 3px solid var(--primary-solid);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    .loading-text {
      color: var(--text-secondary);
      font-weight: 500;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .page-enter {
      animation: pageEnter 0.3s ease;
    }
    
    @keyframes pageEnter {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .error-page {
      text-align: center;
      padding: 4rem 2rem;
    }
    
    .error-page h2 {
      color: var(--error);
      margin-bottom: 1rem;
    }
    
    .welcome-features {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
    
    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      background: rgba(30, 64, 175, 0.1);
      border-radius: var(--radius-lg);
      min-width: 120px;
    }
    
    .feature-icon {
      font-size: 1.5rem;
    }
    
    .feature-text {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
    }
    
    .mobile-menu-toggle {
      display: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 300;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 0.5rem;
      flex-direction: column;
      gap: 3px;
      cursor: pointer;
    }
    
    .mobile-menu-toggle span {
      width: 20px;
      height: 2px;
      background: var(--text);
      transition: var(--transition);
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: flex;
      }
      
      .app-layout {
        grid-template-areas: "header" "main";
      }
      
      .sidebar {
        transform: translateX(-100%);
        transition: transform var(--transition);
      }
      
      .sidebar.open {
        transform: translateX(0);
      }
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .toast-icon {
      font-size: 1.125rem;
    }
    
    .toast-message {
      font-weight: 500;
    }
    
    @keyframes slideOut {
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .modal-subtitle {
      color: var(--text-secondary);
      margin-bottom: 2rem;
      text-align: center;
      font-size: 1.125rem;
    }
    
    .coach-setup {
      margin-bottom: 2rem;
    }
    
    .form-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text);
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface-elevated);
      color: var(--text);
      font-family: inherit;
      font-size: 1rem;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--primary-solid);
      box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
    }
    
    .team-selection h4 {
      margin-bottom: 1rem;
      color: var(--text-secondary);
      font-size: 1rem;
    }
    
    .team-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .team-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--surface-elevated);
      border: 2px solid var(--border);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .team-item:hover {
      transform: translateY(-2px);
      border-color: var(--primary-solid);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .team-item.selected {
      background: linear-gradient(135deg, var(--primary-solid), var(--stadium-blue-dark));
      color: white;
      border-color: var(--primary-solid);
      box-shadow: 0 0 20px rgba(30, 64, 175, 0.3);
    }
    
    .team-badge {
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    
    .team-info {
      flex: 1;
    }
    
    .team-name {
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
    
    .team-league {
      font-size: 0.75rem;
      opacity: 0.8;
    }
    
    .modal-footer {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 0;
    }
    
    .notification-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--error);
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }
    
    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    
    .title-subtitle {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 400;
      margin-left: 0.5rem;
    }
    
    .nav-icon {
      margin-right: 0.5rem;
    }
  `;
  document.head.appendChild(style);
  
  initializeComponents();
  setupEventListeners();

  if (window.location.hash) {
    showWelcome(false);
    loadPageFromHash();
  } else {
    showWelcome(true);
  }
  
  console.log("✅ Allenatore Nato inizializzato con successo!");
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}