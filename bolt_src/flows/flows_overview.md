# 🔄 Flow Logici - Bolt Manager 01/02

Questa documentazione descrive tutti i Flow logici necessari per il funzionamento completo della web app manageriale, organizzati per modulo e funzionalità.

---

## 🎮 Flussi Core di Gioco

### 1. **GameFlow_StartNewGame**
**Trigger**: Click su "Nuova Partita" nella schermata principale
**Input richiesto**: 
- Nome sessione
- Squadra scelta dall'utente
- Livello difficoltà
- Impostazioni iniziali

**Logica step-by-step**:
1. Genera tutte le squadre del campionato con statistiche bilanciate
2. Crea giocatori per ogni squadra con attributi realistici
3. Assegna staff tecnico a tutte le squadre
4. Genera calendario completo della stagione
5. Imposta la squadra utente con flag `is_user_team = true`
6. Crea sessione utente con stato iniziale
7. Inizializza morale e tattiche default

**Dataset coinvolti**:
- `teams` (scrittura - creazione squadre)
- `players` (scrittura - generazione rose)
- `staff` (scrittura - assegnazione staff)
- `matches` (scrittura - calendario stagione)
- `user_sessions` (scrittura - nuova sessione)
- `tactics` (scrittura - formazioni default)
- `morale_status` (scrittura - stato iniziale)

**Output**: Nuova partita pronta, reindirizzamento a TeamManagement.page
**Moduli associati**: Session Manager, Squadra

---

### 2. **GameFlow_AdvanceDay**
**Trigger**: Click su "Avanza Giorno" o automatico (se impostato)
**Input richiesto**: 
- Data attuale di gioco
- Numero giorni da avanzare (default: 1)

**Logica step-by-step**:
1. Verifica eventi programmati per il giorno
2. Processa allenamenti schedulati (se presenti)
3. Aggiorna recuperi infortuni (-1 giorno per tutti)
4. Calcola variazioni morale naturali
5. Processa scadenze contratti e eventi automatici
6. Genera eventi casuali (infortuni, notizie, offerte)
7. Aggiorna data di gioco e salva stato
8. Notifica eventi importanti all'utente

**Dataset coinvolti**:
- `user_sessions` (lettura/scrittura - data corrente)
- `players` (scrittura - recuperi, aging)
- `trainings` (lettura - allenamenti programmati)
- `morale_status` (scrittura - aggiornamenti)
- `game_events` (scrittura - nuovi eventi)
- `transfers` (lettura - scadenze trattative)

**Output**: Gioco avanzato di 1+ giorni, eventi notificati
**Moduli associati**: Calendar Advance, tutti i moduli (coordinamento)

---

### 3. **Match_Simulate**
**Trigger**: Click su "Gioca Partita" o automatico se partita programmata
**Input richiesto**:
- ID partita da simulare
- Formazione e tattica squadra utente
- Sostituzioni programmate (opzionale)

**Logica step-by-step**:
1. Carica dati squadre, formazioni e tattiche
2. Calcola rating squadre basato su giocatori e morale
3. Simula 90 minuti con eventi casuali pesati
4. Genera eventi partita (gol, cartellini, sostituzioni)
5. Calcola statistiche dettagliate (possesso, tiri, etc.)
6. Aggiorna statistiche giocatori (gol, assist, cartellini)
7. Modifica morale basato su risultato
8. Salva risultato e genera report dettagliato

**Dataset coinvolti**:
- `matches` (lettura/scrittura - dati partita e risultato)
- `players` (lettura formazioni, scrittura statistiche)
- `tactics` (lettura - impostazioni tattiche)
- `teams` (scrittura - aggiornamento classifica)
- `match_reports` (scrittura - report dettagliato)
- `morale_status` (scrittura - impatto risultato)
- `game_events` (scrittura - eventi partita)

**Output**: Partita completata, risultato salvato, report generato
**Moduli associati**: Partite, Report Partita

---

### 4. **Match_GenerateReport**
**Trigger**: Automatico al termine di Match_Simulate
**Input richiesto**:
- ID partita completata
- Eventi partita generati
- Statistiche calcolate

**Logica step-by-step**:
1. Raccoglie tutti i dati della partita simulata
2. Calcola valutazioni individuali giocatori (1-10)
3. Identifica momenti salienti e giocatore migliore
4. Genera analisi tattica automatica
5. Compila statistiche comparative squadre
6. Crea timeline eventi cronologica
7. Salva report completo nel dataset

**Dataset coinvolti**:
- `match_reports` (scrittura - report completo)
- `matches` (lettura - dati partita)
- `players` (lettura - performance individuali)

**Output**: Report dettagliato disponibile per consultazione
**Moduli associati**: Report Partita, Partite

---

### 5. **Player_Train**
**Trigger**: Esecuzione allenamento programmato o manuale
**Input richiesto**:
- ID sessione allenamento
- Lista giocatori partecipanti
- Tipo e intensità allenamento

**Logica step-by-step**:
1. Verifica disponibilità giocatori (non infortunati)
2. Calcola bonus staff tecnico applicabili
3. Determina miglioramenti attributi basati su tipo allenamento
4. Calcola rischio infortuni basato su intensità e fitness
5. Processa eventuali infortuni casuali
6. Aggiorna fitness e morale giocatori
7. Registra cambiamenti nello storico attributi
8. Genera eventi per infortuni o miglioramenti significativi

**Dataset coinvolti**:
- `trainings` (lettura - parametri allenamento)
- `players` (scrittura - attributi, fitness, infortuni)
- `staff` (lettura - bonus allenatori)
- `attributes_history` (scrittura - tracking cambiamenti)
- `morale_status` (scrittura - impatto allenamento)
- `game_events` (scrittura - notifiche infortuni/progressi)

**Output**: Giocatori allenati, attributi aggiornati, eventi generati
**Moduli associati**: Allenamento, Storico Giocatori

---

### 6. **Tactics_Update**
**Trigger**: Salvataggio nuova tattica dall'interfaccia
**Input richiesto**:
- ID squadra
- Formazione selezionata
- Posizioni giocatori
- Impostazioni tattiche

**Logica step-by-step**:
1. Valida formazione e posizioni giocatori
2. Verifica compatibilità ruoli giocatori
3. Calcola rating tattico basato su attributi
4. Salva nuova configurazione tattica
5. Aggiorna tattica default se richiesto
6. Genera suggerimenti automatici se configurazione subottimale

**Dataset coinvolti**:
- `tactics` (scrittura - nuova configurazione)
- `players` (lettura - attributi per validazione)
- `teams` (lettura/scrittura - tattica default)

**Output**: Tattica salvata e validata
**Moduli associati**: Tattiche

---

### 7. **Transfer_Offer**
**Trigger**: Invio offerta per giocatore dal mercato
**Input richiesto**:
- ID giocatore target
- Offerta economica
- Dettagli contrattuali
- Tipo trasferimento

**Logica step-by-step**:
1. Verifica budget disponibile squadra offerente
2. Calcola valore di mercato giocatore
3. Determina probabilità accettazione basata su offerta
4. Crea record trattativa con stato "negotiating"
5. Genera controproposta automatica se offerta bassa
6. Notifica evento a entrambe le squadre
7. Imposta scadenza automatica trattativa

**Dataset coinvolti**:
- `transfers` (scrittura - nuova trattativa)
- `players` (lettura - valore e dati giocatore)
- `teams` (lettura - budget squadre)
- `game_events` (scrittura - notifiche trattativa)

**Output**: Trattativa avviata, notifiche inviate
**Moduli associati**: Trasferimenti

---

### 8. **Transfer_Process**
**Trigger**: Accettazione offerta o scadenza trattativa
**Input richiesto**:
- ID trattativa
- Decisione finale (accettata/rifiutata)
- Eventuali modifiche contrattuali

**Logica step-by-step**:
1. Verifica stato trattativa e validità
2. Se accettata: trasferisce giocatore tra squadre
3. Aggiorna budget squadre (sottrae/aggiunge costi)
4. Modifica contratto giocatore (stipendio, scadenza)
5. Aggiorna morale giocatore e squadre coinvolte
6. Genera eventi di completamento trasferimento
7. Chiude trattativa con stato "completed" o "failed"

**Dataset coinvolti**:
- `transfers` (scrittura - stato finale)
- `players` (scrittura - nuova squadra e contratto)
- `teams` (scrittura - budget aggiornato)
- `morale_status` (scrittura - impatto trasferimento)
- `game_events` (scrittura - annuncio trasferimento)

**Output**: Trasferimento completato o fallito
**Moduli associati**: Trasferimenti

---

## 🔧 Flussi di Stato e Supporto

### 9. **Session_Save**
**Trigger**: Salvataggio manuale o automatico
**Input richiesto**:
- Nome slot salvataggio (opzionale)
- Tipo salvataggio (auto/manual)

**Logica step-by-step**:
1. Raccoglie stato completo di tutti i dataset
2. Serializza dati in formato JSON compatto
3. Aggiorna metadati sessione (data, tempo gioco)
4. Salva snapshot completo nel dataset user_sessions
5. Pulisce salvataggi automatici vecchi (se limite superato)
6. Conferma salvataggio riuscito all'utente

**Dataset coinvolti**:
- `user_sessions` (scrittura - stato completo)
- Tutti i dataset (lettura - snapshot stato)

**Output**: Partita salvata con successo
**Moduli associati**: Session Manager

---

### 10. **Session_Load**
**Trigger**: Caricamento partita salvata
**Input richiesto**:
- ID sessione da caricare
- Conferma sovrascrittura stato attuale

**Logica step-by-step**:
1. Verifica esistenza e validità sessione
2. Deserializza dati JSON salvati
3. Ripristina stato di tutti i dataset
4. Aggiorna data ultimo accesso
5. Imposta sessione come attiva
6. Reindirizza alla schermata appropriata

**Dataset coinvolti**:
- `user_sessions` (lettura - dati salvati)
- Tutti i dataset (scrittura - ripristino stato)

**Output**: Partita caricata e pronta
**Moduli associati**: Session Manager

---

### 11. **Staff_AssignRole**
**Trigger**: Assegnazione ruolo staff o cambio responsabilità
**Input richiesto**:
- ID membro staff
- Nuovo ruolo o responsabilità
- Squadra di destinazione

**Logica step-by-step**:
1. Verifica competenze staff per ruolo richiesto
2. Calcola impatto su bonus squadra
3. Aggiorna record staff con nuovo ruolo
4. Modifica bonus allenamento/performance squadra
5. Genera evento di cambio ruolo
6. Aggiorna morale staff e squadra

**Dataset coinvolti**:
- `staff` (scrittura - nuovo ruolo)
- `teams` (scrittura - bonus aggiornati)
- `morale_status` (scrittura - impatto cambio)
- `game_events` (scrittura - notifica cambio)

**Output**: Staff riassegnato, bonus aggiornati
**Moduli associati**: Staff

---

### 12. **Morale_Update**
**Trigger**: Eventi significativi (risultati, trasferimenti, allenamenti)
**Input richiesto**:
- Entità coinvolte (giocatore/squadra)
- Tipo evento scatenante
- Intensità impatto

**Logica step-by-step**:
1. Identifica fattori di influenza applicabili
2. Calcola variazione morale basata su evento
3. Applica modificatori personalità/stabilità
4. Aggiorna morale attuale con limiti (0-100)
5. Determina tendenza morale (rising/stable/declining)
6. Genera eventi se cambiamenti significativi
7. Programma prossima valutazione automatica

**Dataset coinvolti**:
- `morale_status` (scrittura - nuovo stato morale)
- `players` (scrittura - morale individuale)
- `teams` (scrittura - morale squadra)
- `game_events` (scrittura - notifiche cambiamenti)

**Output**: Morale aggiornato, tendenze calcolate
**Moduli associati**: Tutti (morale è trasversale)

---

### 13. **Report_CompileHistory**
**Trigger**: Richiesta visualizzazione storico o fine stagione
**Input richiesto**:
- Periodo di analisi
- Entità da analizzare (giocatore/squadra)
- Tipo statistiche richieste

**Logica step-by-step**:
1. Raccoglie dati storici dal periodo specificato
2. Calcola trend e variazioni significative
3. Identifica picchi e cali di performance
4. Genera grafici e visualizzazioni
5. Compila report comparativo
6. Salva report per consultazioni future

**Dataset coinvolti**:
- `attributes_history` (lettura - dati storici)
- `matches` (lettura - performance partite)
- `players` (lettura - statistiche attuali)

**Output**: Report storico dettagliato
**Moduli associati**: Storico Giocatori

---

### 14. **Calendar_FetchUpcomingEvents**
**Trigger**: Apertura calendario o avanzamento giorno
**Input richiesto**:
- Data corrente
- Periodo di visualizzazione (settimana/mese)

**Logica step-by-step**:
1. Raccoglie partite programmate nel periodo
2. Identifica allenamenti schedulati
3. Verifica scadenze contratti e trattative
4. Calcola eventi automatici previsti
5. Ordina cronologicamente tutti gli eventi
6. Genera preview eventi importanti

**Dataset coinvolti**:
- `matches` (lettura - partite programmate)
- `trainings` (lettura - allenamenti schedulati)
- `transfers` (lettura - scadenze trattative)
- `game_events` (lettura - eventi programmati)

**Output**: Lista eventi ordinata cronologicamente
**Moduli associati**: Calendar Advance

---

### 15. **UserSettings_Apply**
**Trigger**: Salvataggio impostazioni utente
**Input richiesto**:
- Nuove impostazioni modificate
- Categoria impostazioni (UI/gameplay/audio)

**Logica step-by-step**:
1. Valida nuove impostazioni per coerenza
2. Applica modifiche all'interfaccia attiva
3. Aggiorna preferenze salvate
4. Ricarica componenti interessati se necessario
5. Conferma applicazione all'utente

**Dataset coinvolti**:
- `user_settings` (scrittura - nuove preferenze)

**Output**: Impostazioni applicate e salvate
**Moduli associati**: Impostazioni Utente

---
### 16. **Finance_Update**
**Trigger**: Evento economico (stipendio, sponsor, trasferimento)
**Input richiesto**:
- ID squadra coinvolta
- Tipo transazione (entrata/uscita)
- Categoria spesa/ricavo
- Importo e descrizione
- Logica step-by-step:
- Identifica la squadra e recupera stato finanziario attuale
- Aggiunge la transazione al bilancio mensile
- Aggiorna budget corrente della squadra
- Verifica soglie critiche (es. bilancio negativo)
- Registra log nel dataset finances
- Genera evento visivo se necessario (alert budget)

**Dataset coinvolti**:
- `finances` (scrittura - transazione e stato)
- `teams` (scrittura - aggiornamento budget)
- `game_events` (scrittura - avvisi finanziari)

**Output**: Budget aggiornato, transazione loggata
**Moduli associati**: Finanze, Trasferimenti, Direzione

### 17. **Board_Evaluate**
**Trigger**: Fine partita / richiesta utente / fine mese
**Input richiesto**:
- ID sessione attiva
- Tipo valutazione (tecnica, economica, reputazionale)

**Logica step-by-step**:

1. Analizza risultati recenti, andamento economico e obiettivi
2. Calcola punteggio fiducia aggregato
3. Aggiorna stato board_feedback
4. Determina rischio esonero e soglie di attenzione
5. Risponde a eventuali richieste utente (fondi, upgrade)
6. Genera comunicazione formale (opzionale: press_releases)

**Dataset coinvolti**:
- `board_feedback` (scrittura - fiducia e storico)
- `matches`, `finances`, `transfers` (lettura - performance)
- `game_events`, `press_releases` (scrittura - output comunicazioni)

**Output**: Stato board aggiornato, rischio esonero calcolato
**Moduli associati**: Direzione, Finanze

### 18. **Scouting_Update**
**Trigger**: Avanzamento giorno, completamento scouting
**Input richiesto**:
- ID scout e giocatore osservato
- Stato attuale osservazione

**Logica step-by-step**:
1. Incrementa progresso osservazione nel dataset discovery_level
2. Riduce mascheramento attributi nel dataset attribute_masking
3. Aggiorna accuratezza valutazione scout
4. Salva eventuali report generati
5. Se completato → invia evento di scoperta

**Dataset coinvolti**:
- `discovery_level` (scrittura - progresso)
- `attribute_masking` (scrittura - riduzione incertezza)
- `scouting_accuracy` (scrittura - accuratezza stimata)
- `shortlist`, `game_events` (scrittura - notifiche)

**Output**: Stato osservazione aggiornato, attributi più chiari
**Moduli associati**: Scout, Shortlist

### 19. **Discovery_Complete**
**Trigger**: Completamento osservazione giocatore
**Input richiesto**:
- ID giocatore osservato
- ID scout

**Logica step-by-step**:
1. Verifica che tutti i parametri siano al 100%
2. Sblocca completamente attributi tecnici/mentali/fisici
3. Aggiorna attribute_masking a 0% per ogni attributo
4. Marca livello scoperta come completo
5. Invia comunicazione all’utente

**Dataset coinvolti**:
- `discovery_level` (scrittura - stato completato)
- `attribute_masking` (scrittura - 0% su tutti gli attributi)
- `game_events`, `press_releases` (scrittura - notifica scouting)

**Output**: Giocatore completamente scoperto
**Moduli associati**: Scout, Match Analysis

### 20. **Press_Center_Display**
**Trigger**: Apertura sezione “Notizie” o ricezione evento importante
**Input richiesto**:
- Data corrente
- Categoria eventi da mostrare (tutti / recenti / importanti)

**Logica step-by-step**:
1. Filtra press_releases in base alla data e categoria
2. Ordina per priorità e urgenza
3. Applica formattazione dinamica contenuto
4. Marca le notizie come lette una volta visualizzate
5. Aggiorna badge “nuove notizie” se necessario

**Dataset coinvolti**:
- `press_releases` (lettura/scrittura - visualizzazione e stato)
- `game_events` (opzionale - eventi correlati)

**Output**: Lista notizie formattata visivamente
**Moduli associati**: Notizie, Dashboard, Eventi

---

## 📊 Tabella Riepilogativa Flow

| Flow | Modulo | Trigger | Dataset Usati | Output Principale |
|------|--------|---------|---------------|-------------------|
| **GameFlow_StartNewGame** | Session Manager | Click "Nuova Partita" | `teams`, `players`, `staff`, `matches`, `user_sessions`, `tactics`, `morale_status` | Nuova partita inizializzata |
| **GameFlow_AdvanceDay** | Calendar Advance | Click "Avanza Giorno" | `user_sessions`, `players`, `trainings`, `morale_status`, `game_events`, `transfers` | Gioco avanzato di 1+ giorni |
| **Match_Simulate** | Partite | Click "Gioca Partita" | `matches`, `players`, `tactics`, `teams`, `match_reports`, `morale_status`, `game_events` | Partita simulata e completata |
| **Match_GenerateReport** | Report Partita | Auto post-partita | `match_reports`, `matches`, `players` | Report dettagliato generato |
| **Player_Train** | Allenamento | Esecuzione allenamento | `trainings`, `players`, `staff`, `attributes_history`, `morale_status`, `game_events` | Giocatori allenati e migliorati |
| **Tactics_Update** | Tattiche | Salvataggio tattica | `tactics`, `players`, `teams` | Tattica salvata e validata |
| **Transfer_Offer** | Trasferimenti | Invio offerta | `transfers`, `players`, `teams`, `game_events` | Trattativa avviata |
| **Transfer_Process** | Trasferimenti | Decisione trattativa | `transfers`, `players`, `teams`, `morale_status`, `game_events` | Trasferimento completato |
| **Session_Save** | Session Manager | Salvataggio manuale/auto | `user_sessions`, tutti i dataset | Partita salvata |
| **Session_Load** | Session Manager | Caricamento partita | `user_sessions`, tutti i dataset | Partita caricata |
| **Staff_AssignRole** | Staff | Assegnazione ruolo | `staff`, `teams`, `morale_status`, `game_events` | Staff riassegnato |
| **Morale_Update** | Trasversale | Eventi significativi | `morale_status`, `players`, `teams`, `game_events` | Morale aggiornato |
| **Report_CompileHistory** | Storico Giocatori | Richiesta storico | `attributes_history`, `matches`, `players` | Report storico compilato |
| **Calendar_FetchUpcomingEvents** | Calendar Advance | Apertura calendario | `matches`, `trainings`, `transfers`, `game_events` | Eventi futuri elencati |
| **UserSettings_Apply** | Impostazioni Utente | Salvataggio impostazioni | `user_settings` | Impostazioni applicate |
| **Finance_Update** | Finanze | Evento economico | `finances`, `teams`, `game_events` | Budget aggiornato, log transazione |
| **Board_Evaluate** | Direzione | Fine partita / richiesta / mese | `board_feedback`, `matches`, `finances`, `transfers`, `game_events`, `press_releases` | Stato board aggiornato |
| **Scouting_Update** | Scout | Avanzamento scouting | `discovery_level`, `attribute_masking`, `scouting_accuracy`, `shortlist`, `game_events` | Progresso osservazione aggiornato |
| **Discovery_Complete** | Scout | Completamento osservazione | `discovery_level`, `attribute_masking`, `game_events`, `press_releases` | Giocatore completamente scoperto |
| **Press_Center_Display** | Notizie | Apertura Press Center | `press_releases`, `game_events` | Lista notizie formattata visivamente |

---

## 🔄 Dipendenze tra Flow

### Flow Principali (Core):
- `GameFlow_StartNewGame` → Inizializza: `teams`, `players`, `staff`, `matches`, `tactics`, `user_sessions`, `morale_status`
- `GameFlow_AdvanceDay` → Triggera: `Match_Simulate`, `Player_Train`, `Morale_Update`, `Calendar_FetchUpcomingEvents`, `Scouting_Update`
- `Match_Simulate` → Triggera automaticamente: `Match_GenerateReport`, `Morale_Update`, `Finance_Update`, `Board_Evaluate`, `Press_Center_Display`

### Flow di Supporto:
- `Morale_Update` → Triggerato da: `Match_Simulate`, `Player_Train`, `Transfer_Process`
- `Board_Evaluate` → Dipende da: `Finance_Update`, `Match_Simulate`, `Transfer_Process`
- `Finance_Update` → Attivato da: `Transfer_Process`, `Match_Simulate`, `GameFlow_AdvanceDay`
- `Scouting_Update` → Avanzato da: `GameFlow_AdvanceDay`
- `Discovery_Complete` → Dipende da: `Scouting_Update`
- `Press_Center_Display` → Dipende da: `press_releases`, `game_events`

### Flow Indipendenti:
- `UserSettings_Apply` → Completamente autonomo
- `Report_CompileHistory` → Legge solo dati storici
- `Staff_AssignRole` → Indipendente, ma può influire su `Player_Train`

---

## 🚀 Implementazione in Bolt.new

### Priorità di Sviluppo:
1. **Fase 1**:  
   `GameFlow_StartNewGame`, `Session_Save`, `Session_Load`

2. **Fase 2**:  
   `Match_Simulate`, `Match_GenerateReport`, `GameFlow_AdvanceDay`

3. **Fase 3**:  
   `Player_Train`, `Tactics_Update`, `Morale_Update`, `Finance_Update`, `UserSettings_Apply`

4. **Fase 4**:  
   `Transfer_Offer`, `Transfer_Process`, `Board_Evaluate`, `Scouting_Update`, `Staff_AssignRole`

5. **Fase 5** (estensione dinamica):  
   `Discovery_Complete`, `Press_Center_Display`, `Calendar_FetchUpcomingEvents`, `Report_CompileHistory`

---

*Documentazione aggiornata al: Giugno 2025*  
*Versione flow: 1.1*  
*Compatibilità Bolt.new: Tutte le versioni*
