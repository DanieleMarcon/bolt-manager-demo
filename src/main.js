// main.js – router-ready per Bolt UI

import { GameFlow_StartNewGame } from "../bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt_src/flows/Session_Load.js";

// 🔁 Router dinamico basato su hash
async function loadPageFromHash() {
  const pageContainer = document.getElementById("pageContent");
  const hash = window.location.hash.slice(1) || "dashboard";
  const pageName = hash.charAt(0).toUpperCase() + hash.slice(1) + ".page.js";

  try {
    const module = await import(`./pages/${pageName}`);
    if (typeof module.default === "function") {
      new module.default();
    } else {
      pageContainer.innerHTML = `<p>Errore: modulo ${pageName} non esporta una classe di default</p>`;
    }
  } catch (err) {
    console.error("Errore caricamento pagina:", err);
    pageContainer.innerHTML = `<p>Pagina non trovata: ${pageName}</p>`;
  }
}

// 🧠 Avvia nuova partita
async function startNewGame() {
  try {
    const sessionName = prompt("Nome nuova sessione:");
    const selectedTeam = "Team A";
    const result = await GameFlow_StartNewGame({
      session_name: sessionName,
      user_team_id: selectedTeam,
      difficulty: "standard"
    });
    console.log("✅ Nuova partita avviata:", result);
    showToast("Nuova partita avviata!");
    window.location.hash = "team";
  } catch (err) {
    console.error("Errore nuova partita:", err);
    showToast("Errore avvio partita", true);
  }
}

// 📂 Carica partita
async function loadGame() {
  try {
    const sessionId = prompt("ID sessione da caricare:");
    const result = await Session_Load({ session_id: sessionId });
    console.log("✅ Partita caricata:", result);
    showToast("Partita caricata con successo!");
    window.location.hash = "dashboard";
  } catch (err) {
    console.error("Errore caricamento:", err);
    showToast("Errore caricamento partita", true);
  }
}

// 📣 Toast
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "error" : "success"}`;
  toast.innerText = message;
  document.getElementById("toastContainer")?.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// 🔁 Eventi UI iniziali
function setupEventListeners() {
  document.getElementById("startNewGameBtn")?.addEventListener("click", startNewGame);
  document.getElementById("loadGameBtn")?.addEventListener("click", loadGame);
  window.addEventListener("hashchange", loadPageFromHash);
}

// 🚀 Inizializzazione
window.addEventListener("DOMContentLoaded", () => {
  console.log("⚡ Bolt Manager UI inizializzata");
  setupEventListeners();
  loadPageFromHash();
});
