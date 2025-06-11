// 📦 Importa il flow principale dal progetto bolt-core
import { GameFlow_StartNewGame } from "../bolt-core/bolt_src/flows/GameFlow_StartNewGame.js";
import { Session_Load } from "../bolt-core/bolt_src/flows/Session_Load.js";

// 🧠 Funzione per avviare una nuova partita
async function startNewGame() {
    try {
        const sessionName = prompt("Nome nuova sessione:");
        const selectedTeam = "Team A"; // Puoi sostituire con selezione dinamica futura

        const result = await GameFlow_StartNewGame({
            session_name: sessionName,
            user_team_id: selectedTeam,
            difficulty: "standard"
        });

        console.log("✅ Nuova partita avviata con successo:", result);
        showToast("Nuova partita avviata!");
        // Naviga alla schermata principale (placeholder)
        document.getElementById("pageContent").innerHTML = `<h2>Partita Iniziata!</h2>`;
    } catch (error) {
        console.error("❌ Errore avvio partita:", error);
        showToast("Errore durante l'avvio della partita", true);
    }
}

// 📂 Funzione per caricare una partita esistente
async function loadGame() {
    try {
        const sessionId = prompt("ID sessione da caricare:");
        const result = await Session_Load({
            session_id: sessionId
        });

        console.log("✅ Partita caricata:", result);
        showToast("Partita caricata con successo!");
        // Naviga alla schermata principale (placeholder)
        document.getElementById("pageContent").innerHTML = `<h2>Partita Caricata!</h2>`;
    } catch (error) {
        console.error("❌ Errore caricamento:", error);
        showToast("Errore durante il caricamento", true);
    }
}

// 📣 Funzione feedback utente (toast)
function showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast ${isError ? "error" : "success"}`;
    toast.innerText = message;
    document.getElementById("toastContainer").appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// 🔁 Setup Event Listener su pulsanti UI
function setupEventListeners() {
    document.getElementById("startNewGameBtn")?.addEventListener("click", startNewGame);
    document.getElementById("loadGameBtn")?.addEventListener("click", loadGame);
}

// 🚀 Inizializza app
window.addEventListener("DOMContentLoaded", () => {
    console.log("⚡ Bolt Manager UI inizializzata");
    setupEventListeners();
});
