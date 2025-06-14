// Import dei componenti UI riutilizzabili (ipotizzando un sistema di import interno al progetto)
import TeamOverviewCard from 'components/TeamOverviewCard';
import PlayerFilterBar from 'components/PlayerFilterBar';
import PlayerTabs from 'components/PlayerTabs';
import PlayerCard from 'components/PlayerCard';
import MoraleIndicator from 'components/MoraleIndicator';
import InjuryStatusBadge from 'components/InjuryStatusBadge';
import PlayerDetailModal from 'components/PlayerDetailModal';

// Esportazione di default del modulo della pagina TeamManagement
export default {
  // Funzione di inizializzazione dei componenti della pagina
  initComponents() {
    // Ottenere l'ID della squadra utente dalla sessione (es. squadra selezionata dall'utente loggato)
    const userTeamId = session.user.teamId;  // **Assunto**: session.user.teamId contiene l'ID squadra
    
    // Caricare i dati dei giocatori della squadra dall'origine dati (dataset "players")
    // (Si assume l'esistenza di un dataset o API "players" da cui filtrare per teamId)
    let allPlayers = playersDataset.getAll();  // **Assunto**: recupera tutti i giocatori
    const teamPlayers = allPlayers.filter(player => player.teamId === userTeamId);
    
    // Separare i giocatori in Prima Squadra e Riserve (es. in base a una proprietà isReserve o simile)
    const firstTeamPlayers = teamPlayers.filter(player => player.isReserve !== true);
    const reservePlayers   = teamPlayers.filter(player => player.isReserve === true);
    
    // Creare il contenitore principale della pagina Team Management
    const container = document.createElement('div');
    container.classList.add('team-management-page', 'content-area');
    
    // Breadcrumb di navigazione (es. "Home > Squadra") per contestualizzare la pagina
    const breadcrumb = document.createElement('div');
    breadcrumb.classList.add('breadcrumb');
    breadcrumb.textContent = 'Home > Squadra';
    container.appendChild(breadcrumb);
    
    // Component TeamOverviewCard: card panoramica squadra (statistiche generali, morale medio, budget, ecc.)
    const teamOverviewComp = new TeamOverviewCard({ teamId: userTeamId });
    container.appendChild(teamOverviewComp.element);
    
    // Component PlayerFilterBar: barra di ricerca/filtri per ruoli, età, forma fisica, ecc.
    const filterBarComp = new PlayerFilterBar({
      onFilterChange: (filterCriteria) => {
        // Aggiornare la lista giocatori in base ai criteri di filtro selezionati (filtraggio real-time)
        updatePlayerLists(filterCriteria);
      }
    });
    container.appendChild(filterBarComp.element);
    
    // Component PlayerTabs: tab per switchare tra "Prima Squadra" e "Riserve"
    const tabsComp = new PlayerTabs({
      tabs: ['Prima Squadra', `Riserve`],  // nomi delle tab
      activeTab: 0,                       // indice tab attiva inizialmente (0 = Prima Squadra)
      onTabChange: (tabIndex) => {
        // Gestione cambio tab: mostrare/nascondere le liste corrispondenti
        if (tabIndex === 0) {
          firstTeamListEl.style.display = 'block';
          reserveListEl.style.display = 'none';
        } else {
          firstTeamListEl.style.display = 'none';
          reserveListEl.style.display = 'block';
        }
      }
    });
    container.appendChild(tabsComp.element);
    
    // Contenitore per la lista Prima Squadra
    const firstTeamListEl = document.createElement('div');
    firstTeamListEl.id = 'first-team-list';
    firstTeamListEl.classList.add('player-list', 'first-team-list');
    // (Di default visibile, la riserveList sarà nascosta finché non si clicca la tab Riserve)
    
    // Generare le card giocatore per ogni membro della Prima Squadra
    firstTeamPlayers.forEach(player => {
      const card = new PlayerCard(player);
      
      // Aggiungere indicatori di morale e stato fisico/infortunio sulla card del giocatore
      const moraleIcon = new MoraleIndicator(player.morale);         // es. barra o icona morale
      const injuryBadge = new InjuryStatusBadge(player.injuryStatus); // es. icona infortunio se presente
      card.element.querySelector('.player-status').appendChild(moraleIcon.element);
      card.element.querySelector('.player-status').appendChild(injuryBadge.element);
      
      // Mostrare selezione formazione/panchina (es: checkbox o icona accanto al nome per indicare titolare/panchina)
      // **Nota**: Si assume che ogni player abbia proprietà es. isStarting (titolare) o isOnBench per indicare selezione
      if (player.isStarting) {
        card.element.classList.add('starting-player');  // evidenziare graficamente se titolare
      }
      // Aggiungere un checkbox o toggle per selezionare come titolare/panchina
      const lineupCheckbox = document.createElement('input');
      lineupCheckbox.type = 'checkbox';
      lineupCheckbox.checked = player.isStarting === true;
      lineupCheckbox.title = player.isStarting ? 'Titolare' : 'In panchina';
      lineupCheckbox.addEventListener('change', (e) => {
        // Quando l’utente (de)seleziona il giocatore come titolare
        player.isStarting = e.target.checked;
        // TODO: aggiornare eventuale conteggio titolari e vincoli (max 11 titolari)
      });
      card.element.querySelector('.player-name').appendChild(lineupCheckbox);
      
      // Azioni contestuali per il giocatore (es: menu o pulsanti "Manda in Riserve", "Assegna Numero", ecc.)
      // Esempio: aggiungere un pulsante di azione contestuale
      const actionsMenuBtn = document.createElement('button');
      actionsMenuBtn.textContent = '⋮';  // icona menu verticale
      actionsMenuBtn.classList.add('player-actions-button');
      actionsMenuBtn.addEventListener('click', () => {
        openContextMenuForPlayer(player, actionsMenuBtn);
      });
      card.element.appendChild(actionsMenuBtn);
      
      // Event listener per click sulla card giocatore → apertura scheda giocatore dettagliata
      card.element.addEventListener('click', () => {
        openPlayerDetail(player);
      });
      
      // Rendere la card trascinabile per eventuale drag & drop (es. riordinare formazione o spostare tra squadre)
      card.element.draggable = true;
      card.element.addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData('playerId', player.id);
        ev.dataTransfer.setData('fromList', 'firstTeam');
      });
      
      // Append della card alla lista Prima Squadra
      firstTeamListEl.appendChild(card.element);
    });
    container.appendChild(firstTeamListEl);
    
    // Contenitore per la lista Riserve (inizialmente nascosto)
    const reserveListEl = document.createElement('div');
    reserveListEl.id = 'reserve-list';
    reserveListEl.classList.add('player-list', 'reserve-list');
    reserveListEl.style.display = 'none';  // nascosto finché la tab "Riserve" non è attiva
    
    // Generare le card giocatore per ogni membro delle Riserve
    reservePlayers.forEach(player => {
      const card = new PlayerCard(player);
      
      // Aggiungere indicatori morale e stato infortunio come sopra
      const moraleIcon = new MoraleIndicator(player.morale);
      const injuryBadge = new InjuryStatusBadge(player.injuryStatus);
      card.element.querySelector('.player-status').appendChild(moraleIcon.element);
      card.element.querySelector('.player-status').appendChild(injuryBadge.element);
      
      // Azione selezione formazione: generalmente i giocatori in riserva non saranno in distinta gara
      // (Potremmo comunque permettere di marcare chi portare eventualmente in panchina dalla riserva)
      const benchCheckbox = document.createElement('input');
      benchCheckbox.type = 'checkbox';
      benchCheckbox.checked = player.isOnBench === true;
      benchCheckbox.title = 'In panchina';
      benchCheckbox.addEventListener('change', (e) => {
        player.isOnBench = e.target.checked;
        // TODO: gestire logica per aggiungere/togliere dalla panchina
      });
      card.element.querySelector('.player-name').appendChild(benchCheckbox);
      
      // Azioni contestuali per giocatore di riserva (es: promuovi in prima squadra, assegna numero, ecc.)
      const actionsMenuBtn = document.createElement('button');
      actionsMenuBtn.textContent = '⋮';
      actionsMenuBtn.classList.add('player-actions-button');
      actionsMenuBtn.addEventListener('click', () => {
        openContextMenuForPlayer(player, actionsMenuBtn);
      });
      card.element.appendChild(actionsMenuBtn);
      
      // Click sulla card → dettagli giocatore
      card.element.addEventListener('click', () => {
        openPlayerDetail(player);
      });
      
      // Drag & drop: abilitare trascinamento per spostare in Prima Squadra
      card.element.draggable = true;
      card.element.addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData('playerId', player.id);
        ev.dataTransfer.setData('fromList', 'reserve');
      });
      
      reserveListEl.appendChild(card.element);
    });
    container.appendChild(reserveListEl);
    
    // Eventuali listener per drag & drop sul contenitore delle liste (drop area per spostare tra Prima Squadra <-> Riserve)
    container.addEventListener('dragover', (ev) => {
      ev.preventDefault();  // necessario per abilitare drop
    });
    container.addEventListener('drop', (ev) => {
      ev.preventDefault();
      const playerId = ev.dataTransfer.getData('playerId');
      const fromList = ev.dataTransfer.getData('fromList');
      if (playerId) {
        // Identificare il giocatore trascinato e la lista di origine
        const draggedPlayer = teamPlayers.find(p => p.id == playerId);
        if (!draggedPlayer) return;
        // Se trascinato da riserve a prima squadra
        if (fromList === 'reserve') {
          promoteToFirstTeam(draggedPlayer);
        }
        // Se trascinato da prima squadra a riserve
        if (fromList === 'firstTeam') {
          sendToReserves(draggedPlayer);
        }
      }
    });
    
    // Attivare la voce "Squadra" nella sidebar di navigazione (indicatore se presente)
    const sidebarLink = document.querySelector('.sidebar .menu-item.team');
    if (sidebarLink) sidebarLink.classList.add('active');
    
    // Aggiungere il contenuto completo della pagina al contenitore principale della UI
    document.querySelector('#main-content').innerHTML = '';              // pulizia contenuto precedente
    document.querySelector('#main-content').appendChild(container);      // mount del nuovo contenuto
    
    // Inizializzare eventuali modali o componenti interattivi (es: modale dettaglio giocatore nascosta)
    playerDetailModalComp = new PlayerDetailModal();
    document.body.appendChild(playerDetailModalComp.element);
  },
  
  // Metodo per aprire il dettaglio di un giocatore (es. mostrare PlayerDetailModal)
  openPlayerDetail(player) {
    // Caricare i dettagli completi del giocatore (se necessario, es. da dataset) e passare al modal
    playerDetailModalComp.show(player);
  },
  
  // Metodo per promuovere un giocatore dalle Riserve alla Prima Squadra
  promoteToFirstTeam(player) {
    player.isReserve = false;
    player.isOnBench = false;  // se era contrassegnato come panchina in riserve, resettiamo
    // Aggiornare dataset giocatori e UI (rimuovere dalla lista riserve, aggiungere a prima squadra)
    // **Nota**: qui sarebbe opportuno ri-renderizzare le liste o manipolarle direttamente
    firstTeamListEl.appendChild(document.getElementById(player.id));  // pseudocodice: sposta elemento DOM esistente
    // TODO: aggiornare eventuali contatori o stato applicativo (es: numero giocatori prima squadra)
  },
  
  // Metodo per mandare un giocatore dalla Prima Squadra alle Riserve
  sendToReserves(player) {
    player.isReserve = true;
    player.isStarting = false;  // se era titolare, rimuoverlo dalla formazione
    // Aggiornare dataset e UI come sopra, spostando la card dalla lista prima squadra a quella riserve
    reserveListEl.appendChild(document.getElementById(player.id));  // pseudocodice
    // TODO: aggiornare contatori/stato come necessario
  },
  
  // Metodo per assegnare un numero di maglia a un giocatore
  assignSquadNumber(player) {
    // Esempio di apertura di un prompt/modal per inserire il numero
    const newNumber = prompt(`Assegna un numero di maglia a ${player.name}:`, player.squadNumber || '');
    if (newNumber !== null) {
      player.squadNumber = parseInt(newNumber);
      // TODO: validare univocità del numero e aggiornare dataset e UI (es: aggiornare etichetta numero sulla card)
    }
  }
};

// Funzione helper per aggiornare le liste giocatori in base ai filtri (filtraggio locale)
function updatePlayerLists(filterCriteria) {
  // Esempio: filtrare firstTeamPlayers e reservePlayers in base ai criteri e rigenerare il contenuto delle liste
  // (Da implementare: logica di filtro per ruolo, età, condizione fisica, ecc.)
  // Qui possiamo riutilizzare parte della logica usata in initComponents per ricreare le card filtrate.
  // Per brevità, si assume che filterCriteria contenga campi per filtrare e si rigenera la UI di conseguenza.
}

// Funzione per mostrare un menu contestuale con le azioni per il giocatore specificato
function openContextMenuForPlayer(player, triggerElement) {
  // Creare un piccolo menu contestuale (dropdown) ancorato all'elemento triggerElement con le azioni disponibili
  const menu = document.createElement('ul');
  menu.classList.add('context-menu');
  // Azione "Manda in Riserve" (solo se il giocatore è in Prima Squadra)
  if (!player.isReserve) {
    const li = document.createElement('li');
    li.textContent = 'Manda in Riserve';
    li.addEventListener('click', () => {
      sendToReserves(player);
      menu.remove();
    });
    menu.appendChild(li);
  }
  // Azione "Promuovi in Prima Squadra" (solo se il giocatore è in Riserve)
  if (player.isReserve) {
    const li = document.createElement('li');
    li.textContent = 'Promuovi in Prima Squadra';
    li.addEventListener('click', () => {
      promoteToFirstTeam(player);
      menu.remove();
    });
    menu.appendChild(li);
  }
  // Azione "Assegna Numero di Maglia"
  const assignLi = document.createElement('li');
  assignLi.textContent = 'Assegna Numero di Maglia';
  assignLi.addEventListener('click', () => {
    assignSquadNumber(player);
    menu.remove();
  });
  menu.appendChild(assignLi);
  
  // (Altre azioni contestuali potrebbero essere aggiunte qui, es: vendi giocatore, offri rinnovo contratto, ecc.)
  
  // Posizionare il menu vicino al pulsante su cui si è cliccato
  menu.style.position = 'absolute';
  const rect = triggerElement.getBoundingClientRect();
  menu.style.top = rect.bottom + 'px';
  menu.style.left = rect.left + 'px';
  
  // Aggiungere il menu al DOM e rimuoverlo quando si clicca altrove
  document.body.appendChild(menu);
  const removeMenu = () => {
    menu.remove();
    document.removeEventListener('click', removeMenu);
  };
  // Chiudi menu al prossimo click fuori
  setTimeout(() => document.addEventListener('click', removeMenu), 0);
}
