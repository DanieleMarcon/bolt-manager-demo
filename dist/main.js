// 📦 Importazioni Flussi principali dal progetto bolt-core
import { GameFlow_StartNewGame } from "../bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt_src/flows/Session_Load.js";

// 📣 Funzione feedback utente (toast)
function showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast ${isError ? "error" : "success"}`;
    toast.innerText = message;
    document.getElementById("toastContainer").appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
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
        window.location.hash = "#team";
    } catch (error) {
        console.error("❌ Errore avvio partita:", error);
        showToast("Errore avvio partita", true);
    }
}

// 💾 Carica partita salvata
async function loadGame() {
    try {
        const sessionId = prompt("ID sessione da caricare:");
        const result = await Session_Load({ session_id: sessionId });

        console.log("✅ Partita caricata:", result);
        showToast("Partita caricata!");
        window.location.hash = "#team";
    } catch (error) {
        console.error("❌ Errore caricamento:", error);
        showToast("Errore caricamento partita", true);
    }
}

// 🧭 Router per navigazione hash-based
async function loadPageFromHash() {
    const hash = window.location.hash.replace("#", "") || "team";
    const pageName = hash.charAt(0).toUpperCase() + hash.slice(1); // "team" → "Team"
    const container = document.getElementById("pageContent");

    container.innerHTML = `<p class="loading">Caricamento ${pageName}...</p>`;

    try {
        const module = await import(`./bolt_src/pages/${pageName}Management.page.js`);
        if (module.default && typeof module.default === "function") {
            new module.default(container);
        } else {
            container.innerHTML = `<p>⚠️ Pagina ${pageName} non trovata.</p>`;
        }
    } catch (err) {
        console.error(`Errore caricamento ${pageName}:`, err);
        container.innerHTML = `<p>❌ Errore caricamento pagina ${pageName}</p>`;
    }
}

// 🎯 Setup pulsanti e routing
function setupEventListeners() {
    document.getElementById("startNewGameBtn")?.addEventListener("click", startNewGame);
    document.getElementById("loadGameBtn")?.addEventListener("click", loadGame);
    window.addEventListener("hashchange", loadPageFromHash);
    window.addEventListener("load", loadPageFromHash);
}

// 🚀 Inizializzazione
window.addEventListener("DOMContentLoaded", () => {
    console.log("⚡ Bolt Manager UI inizializzata");
    setupEventListeners();
});
