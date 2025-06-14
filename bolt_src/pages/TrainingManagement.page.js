// Import dei componenti UI riutilizzabili
import TrainingScheduler from 'components/TrainingScheduler';
import TrainingTypeSelector from 'components/TrainingTypeSelector';
import PlayerTrainingCard from 'components/PlayerTrainingCard';
import IntensitySlider from 'components/IntensitySlider';
import TrainingResultsModal from 'components/TrainingResultsModal';

// Default export del modulo TrainingManagement.page
export default {
  initComponents() {
    // Ottenere l'ID squadra utente dalla sessione
    const userTeamId = session.user.teamId;  // **Assunto**: session.user.teamId contiene l'ID squadra
    
    // Caricare i dati dei giocatori della rosa (escludere infortunati gravi)
    const allPlayers = playersDataset.getAll();
    const availablePlayers = allPlayers.filter(p =>
      p.teamId === userTeamId && p.injuryStatus !== 'out'
    );
    
    // Caricare il piano di allenamento settimanale esistente (dataset "trainings")
    const weeklyTrainings = trainingsDataset.getBy({ teamId: userTeamId, week: gameState.currentWeek });
    
    // Creazione contenitore principale
    const container = document.createElement('div');
    container.classList.add('training-management-page', 'content-area');
    
    // Breadcrumb di navigazione
    const breadcrumb = document.createElement('div');
    breadcrumb.classList.add('breadcrumb');
    breadcrumb.textContent = 'Home > Allenamento';
    container.appendChild(breadcrumb);
    
    // Componente TrainingScheduler: calendario settimanale con slot allenamento
    const schedulerComp = new TrainingScheduler({
      week: gameState.currentWeek,
      scheduledTrainings: weeklyTrainings,
      onSlotClick: (day, slotIndex) => {
        // Quando si clicca uno slot: aprire il selector del tipo di allenamento
        trainingTypeSelector.open({ day, slotIndex });
      }
    });
    container.appendChild(schedulerComp.element);
    
    // Componente TrainingTypeSelector: selezione del tipo di allenamento
    const trainingTypeSelector = new TrainingTypeSelector({
      types: ['Fisico', 'Tecnico', 'Tattico', 'Portieri', 'Riposo'],
      onTypeSelected: ({ day, slotIndex, type }) => {
        // Salvare la scelta nel dataset trainings
        trainingsDataset.save({ teamId: userTeamId, week: gameState.currentWeek, day, slotIndex, type });
        // Aggiornare il scheduler per riflettere la nuova assegnazione
        schedulerComp.updateSlot(day, slotIndex, type);
      }
    });
    container.appendChild(trainingTypeSelector.element);
    
    // Componente IntensitySlider: impostazione intensità globale
    const intensityComp = new IntensitySlider({
      min: 1,
      max: 5,
      value: gameState.trainingIntensity || 3,
      onChange: (value) => {
        gameState.trainingIntensity = value;
        // TODO: aggiornare preview rischio infortuni e miglioramenti
      }
    });
    container.appendChild(intensityComp.element);
    
    // Contenitore per le card di allenamento dei giocatori
    const playersGrid = document.createElement('div');
    playersGrid.classList.add('grid-3', 'player-training-grid');
    
    // Generare una card per ogni giocatore disponibile
    availablePlayers.forEach(player => {
      const card = new PlayerTrainingCard(player);
      
      // Mostrare barra progressi dell'attributo (FitnessChart integrato nella card)
      // Assumiamo che PlayerTrainingCard includa già un grafico di progresso
      
      // Click sulla card → selezione/deselezione del giocatore per l'allenamento
      card.element.addEventListener('click', () => {
        player.isSelectedForTraining = !player.isSelectedForTraining;
        card.element.classList.toggle('selected', player.isSelectedForTraining);
      });
      
      playersGrid.appendChild(card.element);
    });
    container.appendChild(playersGrid);
    
    // Pulsante per applicare l'allenamento programmato
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Applica Allenamenti';
    applyBtn.classList.add('button', 'button-primary', 'mt-24');
    applyBtn.addEventListener('click', async () => {
      const selectedPlayers = availablePlayers.filter(p => p.isSelectedForTraining);
      try {
        // Eseguire il flow Player_Train con i parametri selezionati
        const result = await Player_Train({
          session_id: session.id,
          training_week: gameState.currentWeek,
          intensity: gameState.trainingIntensity,
          players: selectedPlayers.map(p => p.id)
        });
        // Mostrare i risultati in un modal
        trainingResultsModal.show(result);
        // Ricaricare progresso attributi e stato forma
        updatePlayerProgress();
      } catch (err) {
        console.error('Errore durante l\'allenamento:', err);
        showToast('Errore allenamento', true);
      }
    });
    container.appendChild(applyBtn);
    
    // Inizializzare modale per i risultati di allenamento
    const trainingResultsModal = new TrainingResultsModal();
    document.body.appendChild(trainingResultsModal.element);
    
    // Montare il contenuto nella pagina principale
    const mainContent = document.getElementById('mainContent') || document.querySelector('.main-content');
    mainContent.innerHTML = '';
    mainContent.appendChild(container);
  }
};

// Helper: Aggiorna la visualizzazione del progresso giocatori dopo l'allenamento
function updatePlayerProgress() {
  // Ricaricare dati attributi dal dataset attributes_history
  // e aggiornare ogni PlayerTrainingCard (es. grafico e badge forma)
  // TODO: implementare meccanismo di refresh delle card
}

// Helper: mostra un toast di notifica
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : 'success'}`;
  toast.innerText = message;
  document.getElementById('toastContainer')?.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
