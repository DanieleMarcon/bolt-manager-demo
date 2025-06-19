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
// Import statici delle pagine
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
 * Carica dinamicamente la pagina corrispondente alla chiave in `routes`
 */
function loadPage(key) {
  const pageContainer = document.getElementById("pageContent");
  pageContainer.innerHTML = "";
  const PageClass = routes[key];
  if (PageClass) {
    new PageClass();
  } else {
    pageContainer.innerHTML = `<p>Pagina non trovata: ${key}</p>`;
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
      // comandi alias per PressCenter
      loadPage("press");
      break;
    case "settings":
      loadPage("settings");
      break;
    default:
      // carica la pagina corrispondente a hash, o dashboard se non esiste
      loadPage(hash);
 }
}



// Eventi
function setupEventListeners() {
  const startBtn = document.getElementById("startNewGameBtn");
  if (startBtn) startBtn.addEventListener("click", startNewGame);

  const loadBtn = document.getElementById("loadGameBtn");
  if (loadBtn) loadBtn.addEventListener("click", loadGame);

  const notifBtn = document.getElementById("notificationsBtn");
  if (notifBtn) notifBtn.addEventListener("click", () => {
    window.location.hash = "press";
  });

  const quickSaveBtn = document.getElementById("quickSaveBtn");
  if (quickSaveBtn) quickSaveBtn.addEventListener("click", () => {
    window.location.hash = "quickSave";
  });

  const settingsBtn = document.getElementById("settingsBtn");
  if (settingsBtn) settingsBtn.addEventListener("click", () => {
    window.location.hash = "settings";
  });

  window.addEventListener("hashchange", loadPageFromHash);
}

// Nuova partita
function startNewGame() {
  // Hide the welcome overlay so the modal is visible
  showWelcome(false);
  const modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) return;

  const teamItems = TEAM_CHOICES.map(
    t => `<li class="team-item" data-team="${t}">${t}</li>`
  ).join("");

  modalContainer.innerHTML = `
    <div class="modal">
      <h3>Nuova Partita</h3>
      <label>Nome allenatore:<br>
        <input id="coachNameInput" type="text" />
      </label>
      <ul class="team-list">${teamItems}</ul>
      <div style="text-align:right; margin-top:16px;">
        <button id="cancelNewGameBtn" class="button button-secondary">Annulla</button>
        <button id="confirmNewGameBtn" class="button button-primary">Avvia</button>
      </div>
    </div>`;
  modalContainer.style.display = "flex";

  let selectedTeam = null;
  const listItems = modalContainer.querySelectorAll('.team-item');
  listItems.forEach(li => {
    li.addEventListener('click', () => {
      listItems.forEach(i => i.classList.remove('selected'));
      li.classList.add('selected');
      selectedTeam = li.dataset.team;
    });
  });

  modalContainer.querySelector('#cancelNewGameBtn')
    .addEventListener('click', () => {
      modalContainer.style.display = 'none';
      modalContainer.innerHTML = '';
    });

  modalContainer.querySelector('#confirmNewGameBtn')
    .addEventListener('click', async () => {
      const userName = modalContainer.querySelector('#coachNameInput').value.trim();
      if (!userName || !selectedTeam) {
        showToast('Inserisci nome e scegli una squadra', true);
        return;
      }

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

          // Persist selected team info for dashboard widgets
          window.currentSession = { user_team_id: userTeam.id };

          // Populate in-memory datasets with generated data
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
        showToast('Nuova partita avviata!');
        window.location.hash = 'dashboard';
      } catch (error) {
        console.error('Errore avvio:', error);
        showToast('Errore avvio partita', true);
      }
    });
}

// Carica partita
async function loadGame() {
  try {
    const sessionId = prompt("ID sessione da caricare:");
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
    showToast("Partita caricata con successo!");
    window.location.hash = "dashboard";
  } catch (error) {
    console.error("Errore caricamento:", error);
    showToast("Errore caricamento partita", true);
  }
}

/**
 * Richiama il flow Bolt.new per salvare la sessione
 */
function saveGame() {
  // se stai usando direttamente l'API Bolt.new:
  Session_Save();

  // oppure, se usi un wrapper:
  // bolt.flow("Session_Save").run();
}

// Toast
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "error" : "success"}`;
  toast.innerText = message;
  document.getElementById("toastContainer")?.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function showWelcome(show) {
  const welcome = document.getElementById("welcomeScreen");
  const sidebar = document.getElementById("sidebar");
  const topBar = document.getElementById("topBar");
  if (!welcome || !sidebar || !topBar) return;
  if (show) {
    welcome.classList.remove("hidden");
    sidebar.classList.add("hidden");
    topBar.classList.add("hidden");
  } else {
    welcome.classList.add("hidden");
    sidebar.classList.remove("hidden");
    topBar.classList.remove("hidden");
  }
}

// Init
// Execute once the script is loaded (module at end of <body>)
initializeComponents();
setupEventListeners();

if (window.location.hash) {
  // Open page directly when a hash is present
  showWelcome(false);
  loadPageFromHash();
  } else {
  // Otherwise keep the welcome screen visible
  showWelcome(true);
}