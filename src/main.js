import initializeComponents from './componentLoader.js';
import { GameFlow_StartNewGame } from "../bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt_src/flows/Session_Load.js";
import { Session_Save } from "../bolt_src/flows/Session_Save.js";
// Import statici delle pagine
import DashboardPage from "../bolt_src/pages/Dashboard.page.js";
import TeamPage from "../bolt_src/pages/Team.page.js";
import TeamStatsPage from "../bolt_src/pages/TeamStats.page.js";
import TeamMoralePage from "../bolt_src/pages/TeamMorale.page.js";
import NextMatchPage from "../bolt_src/pages/NextMatch.page.js";
import CalendarViewPage from "../bolt_src/pages/CalendarView.page.js";
import ResultsPage from "../bolt_src/pages/Results.page.js";
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
  document.getElementById("startNewGameBtn")?.addEventListener("click", startNewGame);
  document.getElementById("loadGameBtn")?.addEventListener("click", loadGame);
  document.getElementById("notificationsBtn")?.addEventListener("click", () => {
    window.location.hash = "press";
  });
  document.getElementById("quickSaveBtn")?.addEventListener("click", () => {
   window.location.hash = "quickSave";
  });
  document.getElementById("settingsBtn")?.addEventListener("click", () => window.location.hash = "settings");
  window.addEventListener("hashchange", loadPageFromHash);
}

// Nuova partita
async function startNewGame() {
  try {
    const sessionName = prompt("Nome nuova sessione:");
    const selectedTeam = "Team A";
    const result = await GameFlow_StartNewGame({ session_name: sessionName, user_team_id: selectedTeam, difficulty: "standard" });
    showToast("Nuova partita avviata!");
    window.location.hash = "team";
  } catch (error) {
    console.error("Errore avvio:", error);
    showToast("Errore avvio partita", true);
  }
}

// Carica partita
async function loadGame() {
  try {
    const sessionId = prompt("ID sessione da caricare:");
    const result = await Session_Load({ session_id: sessionId });
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

// Init
window.addEventListener("DOMContentLoaded", () => {
  initializeComponents();
  setupEventListeners();
  loadPageFromHash();
});
