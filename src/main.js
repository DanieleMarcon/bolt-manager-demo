import { GameFlow_StartNewGame } from "../bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt_src/flows/Session_Load.js";

// Import statici delle pagine
import DashboardPage from "./pages/Dashboard.page.js";
import TeamPage from "./pages/Team.page.js";
import TeamStatsPage from "./pages/TeamStats.page.js";
import TeamMoralePage from "./pages/TeamMorale.page.js";
import NextMatchPage from "./pages/NextMatch.page.js";
import CalendarViewPage from "./pages/CalendarView.page.js";
import ResultsPage from "./pages/Results.page.js";
import TrainingManagementPage from "./pages/TrainingManagement.page.js";
import TrainingProgramsPage from "./pages/TrainingPrograms.page.js";
import TrainingProgressPage from "./pages/TrainingProgress.page.js";
import TacticalSetupPage from "./pages/TacticalSetup.page.js";
import TacticalSchemesPage from "./pages/TacticalSchemes.page.js";
import TacticalRolesPage from "./pages/TacticalRoles.page.js";
import TransfersPage from "./pages/Transfers.page.js";
import NegotiationsPage from "./pages/Negotiations.page.js";
import ContractsPage from "./pages/Contracts.page.js";
import StaffManagementPage from "./pages/StaffManagement.page.js";
import PlayerHistoryPage from "./pages/PlayerHistory.page.js";
import UserSettingsPage from "./pages/UserSettings.page.js";
import SessionManagerPage from "./pages/SessionManager.page.js";
import BoardPage from "./pages/Board.page.js";
import FinanceOverviewPage from "./pages/FinanceOverview.page.js";
import PressCenterPage from "./pages/PressCenter.page.js";
import ScoutingPage from "./pages/Scouting.page.js";
import ShortlistPage from "./pages/Shortlist.page.js";
import ScoutingReportsPage from "./pages/ScoutingReports.page.js";

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

// Routing statico
async function loadPageFromHash() {
  const hash = window.location.hash.slice(1) || "dashboard";
  const pageContainer = document.getElementById("pageContent");
  pageContainer.innerHTML = "";

  const PageClass = routes[hash];
  if (PageClass) {
    new PageClass();
  } else {
    pageContainer.innerHTML = `<p>Pagina non trovata: ${hash}</p>`;
  }
}

// Eventi
function setupEventListeners() {
  document.getElementById("startNewGameBtn")?.addEventListener("click", startNewGame);
  document.getElementById("loadGameBtn")?.addEventListener("click", loadGame);
  document.getElementById("notificationsBtn")?.addEventListener("click", () => {
    window.location.hash = "press";
  });
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
  setupEventListeners();
  loadPageFromHash();
});
