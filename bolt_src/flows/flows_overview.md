# 🔄 Flow Logici - Allenatore Nato

Questa documentazione descrive tutti i Flow logici necessari per il funzionamento completo della web app manageriale, organizzati per modulo e funzionalità.

---

## 🎮 Flussi Core di Gioco

### 1. **GameFlow\_StartNewGame**

**Trigger**: Click su "Nuova Partita" nella schermata principale
**Input richiesto**:

* Nome sessione
* Squadra scelta dall'utente
* Livello difficoltà
* Impostazioni iniziali

**Logica step-by-step**:

1. Genera tutte le squadre del campionato con statistiche bilanciate
2. Crea giocatori per ogni squadra con attributi realistici
3. Assegna staff tecnico a tutte le squadre
4. Genera calendario completo della stagione
5. Imposta la squadra utente con flag `is_user_team = true`
6. Crea sessione utente con stato iniziale
7. Inizializza morale e tattiche default

**Dataset coinvolti**:

* `teams`, `players`, `staff`, `matches`, `user_sessions`, `tactics`, `morale_status`

**Output**: Nuova partita pronta, reindirizzamento a TeamManagement.page
**Moduli associati**: Session Manager, Squadra

---

### 2. **GameFlow\_AdvanceDay**

**Trigger**: Click su "Avanza Giorno" o automatico (se impostato)
**Input richiesto**:

* Data attuale di gioco
* Numero giorni da avanzare (default: 1)

**Logica step-by-step**:

1. Verifica eventi programmati per il giorno
2. Processa allenamenti schedulati
3. Aggiorna recuperi infortuni (-1 giorno)
4. Calcola variazioni morale naturali
5. Processa scadenze contratti ed eventi automatici
6. Genera eventi casuali (infortuni, notizie, offerte)
7. Aggiorna data di gioco e salva stato
8. Notifica eventi importanti all'utente

**Dataset coinvolti**:

* `user_sessions`, `players`, `trainings`, `morale_status`, `game_events`, `transfers`

**Output**: Gioco avanzato di 1+ giorni, eventi notificati
**Moduli associati**: Calendar Advance, tutti i moduli

---

### 3. **Match\_Simulate**

**Trigger**: Click su "Gioca Partita" o automatico se partita programmata
**Input richiesto**:

* ID partita da simulare
* Formazione e tattica squadra utente
* Sostituzioni programmate (opzionale)

**Logica step-by-step**:

1. Carica dati squadre, formazioni e tattiche
2. Calcola rating squadre basato su giocatori e morale
3. Simula 90 minuti con eventi casuali pesati
4. Genera eventi partita (gol, cartellini, sostituzioni)
5. Calcola statistiche dettagliate (possesso, tiri, ecc.)
6. Aggiorna statistiche giocatori
7. Modifica morale basato sul risultato
8. Salva risultato e genera report dettagliato

**Dataset coinvolti**:

* `matches`, `players`, `tactics`, `teams`, `match_reports`, `morale_status`, `game_events`

**Output**: Partita completata, risultato salvato, report generato
**Moduli associati**: Partite, Report Partita

---

### 4. **Match\_GenerateReport**

**Trigger**: Automatico al termine di Match\_Simulate
**Input richiesto**:

* ID partita completata
* Eventi partita generati
* Statistiche calcolate

**Logica step-by-step**:

1. Raccoglie tutti i dati della partita simulata
2. Calcola valutazioni individuali giocatori (1–10)
3. Identifica momenti salienti e giocatore migliore
4. Genera analisi tattica automatica
5. Compila statistiche comparative squadre
6. Crea timeline eventi cronologica
7. Salva report completo nel dataset

**Dataset coinvolti**:

* `match_reports`, `matches`, `players`

**Output**: Report dettagliato disponibile
**Moduli associati**: Report Partita, Partite

---

### 5. **Player\_Train**

**Trigger**: Esecuzione allenamento programmato o manuale
**Input richiesto**:

* ID sessione allenamento
* Lista giocatori partecipanti
* Tipo e intensità allenamento

**Logica step-by-step**:

1. Verifica disponibilità giocatori
2. Calcola bonus staff tecnico
3. Determina miglioramenti attributi
4. Calcola rischio infortuni
5. Processa eventuali infortuni casuali
6. Aggiorna fitness e morale
7. Registra cambiamenti storico attributi
8. Genera eventi per infortuni o progressi

**Dataset coinvolti**:

* `trainings`, `players`, `staff`, `attributes_history`, `morale_status`, `game_events`

**Output**: Giocatori allenati, attributi aggiornati, eventi generati
**Moduli associati**: Allenamento, Storico Giocatori

---

### 6. **Tactics\_Update**

**Trigger**: Salvataggio nuova tattica
**Input richiesto**:

* ID squadra
* Formazione selezionata
* Posizioni giocatori
* Impostazioni tattiche

**Logica step-by-step**:

1. Valida formazione e posizioni
2. Verifica compatibilità ruoli
3. Calcola rating tattico
4. Salva nuova configurazione
5. Aggiorna tattica default se richiesto
6. Suggerimenti automatici se subottimale

**Dataset coinvolti**:

* `tactics`, `players`, `teams`

**Output**: Tattica salvata e validata
**Moduli associati**: Tattiche

---

### 7. **Transfer\_Offer**

**Trigger**: Invio offerta per giocatore
**Input richiesto**:

* ID giocatore target
* Offerta economica
* Dettagli contrattuali
* Tipo trasferimento

**Logica step-by-step**:

1. Verifica budget squadra offerente
2. Calcola valore di mercato
3. Determina probabilità accettazione
4. Crea record trattativa
5. Controproposta automatica se offerta bassa
6. Notifica evento a squadre
7. Imposta scadenza trattativa

**Dataset coinvolti**:

* `transfers`, `players`, `teams`, `game_events`

**Output**: Trattativa avviata
**Moduli associati**: Trasferimenti

---

### 8. **Transfer\_Process**

**Trigger**: Accettazione o scadenza trattativa
**Input richiesto**:

* ID trattativa
* Decisione finale
* Modifiche contrattuali (opzionale)

**Logica step-by-step**:

1. Verifica stato trattativa
2. Se accettata: trasferisce giocatore
3. Aggiorna budget squadre
4. Modifica contratto giocatore
5. Aggiorna morale giocatore e squadre
6. Genera evento completamento
7. Chiude trattativa

**Dataset coinvolti**:

* `transfers`, `players`, `teams`, `morale_status`, `game_events`

**Output**: Trasferimento completato o fallito
**Moduli associati**: Trasferimenti

---

## 🔧 Flussi di Stato e Supporto

### 9. **Session\_Save**

**Trigger**: Salvataggio manuale o automatico
**Input richiesto**:

* Nome slot salvataggio (opzionale)
* Tipo salvataggio (auto/manual)

**Logica step-by-step**:

1. Raccoglie stato completo di tutti i dataset
2. Serializza dati in JSON
3. Aggiorna metadati sessione
4. Salva snapshot in `user_sessions`
5. Pulisce salvataggi automatici vecchi
6. Conferma salvataggio

**Dataset coinvolti**:

* `user_sessions`, tutti i dataset

**Output**: Partita salvata
**Moduli associati**: Session Manager

---

### 10. **Session\_Load**

**Trigger**: Caricamento partita salvata
**Input richiesto**:

* ID sessione
* Conferma sovrascrittura

**Logica step-by-step**:

1. Verifica validità sessione
2. Deserializza JSON
3. Ripristina stato dataset
4. Aggiorna data ultimo accesso
5. Imposta sessione attiva
6. Reindirizza schermata

**Dataset coinvolti**:

* `user_sessions`, tutti i dataset

**Output**: Partita caricata
**Moduli associati**: Session Manager

---

### 11. **Staff\_AssignRole**

**Trigger**: Assegnazione/cambio ruolo staff
**Input richiesto**:

* ID membro staff
* Nuovo ruolo
* Squadra destinazione

**Logica step-by-step**:

1. Verifica competenze staff
2. Calcola impatto bonus squadra
3. Aggiorna record staff
4. Modifica bonus allenamento/performance
5. Genera evento di cambio
6. Aggiorna morale staff e squadra

**Dataset coinvolti**:

* `staff`, `teams`, `morale_status`, `game_events`

**Output**: Staff riassegnato
**Moduli associati**: Staff

---

### 12. **Morale\_Update**

**Trigger**: Eventi significativi
**Input richiesto**:

* Entità coinvolte
* Tipo evento
* Intensità impatto

**Logica step-by-step**:

1. Identifica fattori di influenza
2. Calcola variazione morale
3. Applica modificatori personalità
4. Aggiorna morale (0–100)
5. Determina tendenza morale
6. Genera eventi se significativi
7. Programma valutazione successiva

**Dataset coinvolti**:

* `morale_status`, `players`, `teams`, `game_events`

**Output**: Morale aggiornato
**Moduli associati**: Trasversale

---

## 📊 Altri Flussi Aggiuntivi

### 13. **Report\_CompileHistory**

**Trigger**: Richiesta storico o fine stagione
**Input richiesto**:

* Periodo di analisi
* Entità da analizzare
* Tipo statistiche

**Logica step-by-step**:

1. Raccoglie dati storici
2. Calcola trend e variazioni
3. Identifica picchi e cali
4. Genera grafici e visualizzazioni
5. Compila report comparativo
6. Salva report

**Dataset coinvolti**:

* `attributes_history`, `matches`, `players`

**Output**: Report storico
**Moduli associati**: Storico Giocatori

---

### 14. **Calendar\_FetchUpcomingEvents**

**Trigger**: Apertura calendario o avanzamento giorno
**Input richiesto**:

* Data corrente
* Periodo di visualizzazione

**Logica step-by-step**:

1. Raccoglie partite programmate
2. Identifica allenamenti schedulati
3. Verifica scadenze trattative
4. Calcola eventi automatici
5. Ordina cronologicamente
6. Genera preview

**Dataset coinvolti**:

* `matches`, `trainings`, `transfers`, `game_events`

**Output**: Lista eventi
**Moduli associati**: Calendar Advance

---

### 15. **UserSettings\_Apply**

**Trigger**: Salvataggio impostazioni utente
**Input richiesto**:

* Nuove impostazioni
* Categoria impostazioni

**Logica step-by-step**:

1. Valida impostazioni
2. Applica modifiche UI/gameplay/audio
3. Aggiorna preferenze salvate
4. Ricarica componenti
5. Conferma all’utente

**Dataset coinvolti**:

* `user_settings`

**Output**: Impostazioni applicate
**Moduli associati**: Impostazioni Utente

---

### 16. **Finance\_Update**

**Trigger**: Evento economico (stipendio, sponsor, trasferimento)
**Input richiesto**:

* ID squadra coinvolta
* Tipo transazione
* Categoria spesa/ricavo
* Importo e descrizione

**Logica step-by-step**:

1. Recupera stato finanziario squadra
2. Aggiunge transazione al bilancio mensile
3. Aggiorna budget corrente
4. Verifica soglie critiche
5. Registra log nel dataset
6. Genera alert se necessario

**Dataset coinvolti**:

* `finances`, `teams`, `game_events`

**Output**: Budget aggiornato, transazione loggata
**Moduli associati**: Finanze, Trasferimenti, Direzione

---

### 17. **Board\_Evaluate**

**Trigger**: Fine partita / richiesta utente / fine mese
**Input richiesto**:

* ID sessione attiva
* Tipo valutazione (tecnica, economica, reputazionale)

**Logica step-by-step**:

1. Analizza risultati recenti e andamento economico
2. Confronta con obiettivi Board
3. Calcola punteggio aggregato
4. Aggiorna `board_feedback`
5. Determina rischio esonero
6. Risponde a richieste (fondi, upgrade)
7. Genera comunicazione formale (opzionale)

**Dataset coinvolti**:

* `board_feedback`, `matches`, `finances`, `transfers`, `game_events`, `press_releases`

**Output**: Stato board aggiornato, rischio calcolato
**Moduli associati**: Direzione, Finanze

---

### 18. **Scouting\_Discover**

**Trigger**: Avvio manuale scouting o avanzamento giorno
**Input richiesto**:

* `player_ids` (Array\<String>)
* `scout_ids` (Array\<String>)
* `reveal_level` (String: `"basic"`/`"advanced"`)

**Logica step-by-step**:

1. Filtra osservatori liberi per skill/disponibilità
2. Assegna ciascun `player_id` a uno `scout_id`
3. Chiama `ScoutService.revealAttributes(...)`
4. Compila array di `assignments` con attributi rivelati

**Dataset coinvolti**:

* `discovery_level`, `attribute_masking`, `scouting_accuracy`, `shortlist`, `game_events`

**Output**: Array `assignments` con dettagli attribuiti
**Moduli associati**: Scout, Shortlist

---

### 19. **Scouting\_Update**

**Trigger**: Avanzamento giorno, completamento scouting
**Input richiesto**:

* ID scout e giocatore
* Stato osservazione

**Logica step-by-step**:

1. Incrementa progresso `discovery_level`
2. Riduce mascheramento attributi
3. Aggiorna accuratezza scout
4. Salva report generati
5. Se completo → evento scoperta

**Dataset coinvolti**:

* `discovery_level`, `attribute_masking`, `scouting_accuracy`, `shortlist`, `game_events`

**Output**: Stato osservazione aggiornato
**Moduli associati**: Scout, Shortlist

---

### 20. **Discovery\_Complete**

**Trigger**: Completamento osservazione giocatore
**Input richiesto**:

* ID giocatore
* ID scout

**Logica step-by-step**:

1. Verifica parametri al 100%
2. Sblocca attributi completi
3. Imposta `attribute_masking = 0%`
4. Marca scoperta come completa
5. Notifica utente

**Dataset coinvolti**:

* `discovery_level`, `attribute_masking`, `game_events`, `press_releases`

**Output**: Giocatore completamente scoperto
**Moduli associati**: Scout, Match Analysis

---

### 21. **Press\_Center\_Display**

**Trigger**: Apertura sezione Notizie o evento importante
**Input richiesto**:

* Data corrente
* Categoria eventi (tutti/recenti/importanti)

**Logica step-by-step**:

1. Filtra `press_releases` per data/categoria
2. Ordina per priorità
3. Applica formattazione dinamica
4. Marca notizie come lette
5. Aggiorna badge “nuove notizie”

**Dataset coinvolti**:

* `press_releases`, `game_events`

**Output**: Lista notizie formattata
**Moduli associati**: Notizie, Dashboard, Eventi

---

## 📊 Tabella Riepilogativa Flow

| Flow                          | Modulo                | Trigger                              | Dataset Usati                                                                             | Output Principale                      |
| ----------------------------- | --------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| GameFlow\_StartNewGame        | Session Manager       | Click "Nuova Partita"                | `teams`, `players`, `staff`, `matches`, `user_sessions`, `tactics`, `morale_status`       | Nuova partita inizializzata            |
| GameFlow\_AdvanceDay          | Calendar Advance      | Click "Avanza Giorno"                | `user_sessions`, `players`, `trainings`, `morale_status`, `game_events`, `transfers`      | Gioco avanzato di 1+ giorni            |
| Match\_Simulate               | Partite               | Click "Gioca Partita"                | `matches`, `players`, `tactics`, `teams`, `match_reports`, `morale_status`, `game_events` | Partita simulata e completata          |
| Match\_GenerateReport         | Report Partita        | Auto post-partita                    | `match_reports`, `matches`, `players`                                                     | Report dettagliato generato            |
| Player\_Train                 | Allenamento           | Esecuzione allenamento               | `trainings`, `players`, `staff`, `attributes_history`, `morale_status`, `game_events`     | Giocatori allenati                     |
| Tactics\_Update               | Tattiche              | Salvataggio tattica                  | `tactics`, `players`, `teams`                                                             | Tattica salvata e validata             |
| Transfer\_Offer               | Trasferimenti         | Invio offerta                        | `transfers`, `players`, `teams`, `game_events`                                            | Trattativa avviata                     |
| Transfer\_Process             | Trasferimenti         | Decisione trattativa                 | `transfers`, `players`, `teams`, `morale_status`, `game_events`                           | Trasferimento completato/fallito       |
| Session\_Save                 | Session Manager       | Salvataggio manuale/auto             | `user_sessions`, tutti i dataset                                                          | Partita salvata                        |
| Session\_Load                 | Session Manager       | Caricamento partita                  | `user_sessions`, tutti i dataset                                                          | Partita caricata                       |
| Staff\_AssignRole             | Staff                 | Assegnazione ruolo                   | `staff`, `teams`, `morale_status`, `game_events`                                          | Staff riassegnato                      |
| Morale\_Update                | Trasversale           | Eventi significativi                 | `morale_status`, `players`, `teams`, `game_events`                                        | Morale aggiornato                      |
| Report\_CompileHistory        | Storico Giocatori     | Richiesta storico                    | `attributes_history`, `matches`, `players`                                                | Report storico compilato               |
| Calendar\_FetchUpcomingEvents | Calendar Advance      | Apertura calendario                  | `matches`, `trainings`, `transfers`, `game_events`                                        | Eventi futuri elencati                 |
| UserSettings\_Apply           | Impostazioni Utente   | Salvataggio impostazioni             | `user_settings`                                                                           | Impostazioni applicate                 |
| Finance\_Update               | Finanze               | Evento economico                     | `finances`, `teams`, `game_events`                                                        | Budget aggiornato, transazione loggata |
| Board\_Evaluate               | Direzione             | Fine partita / richiesta / fine mese | `board_feedback`, `matches`, `finances`, `transfers`, `game_events`, `press_releases`     | Stato board aggiornato                 |
| Scouting\_Discover            | Scout, Shortlist      | Avvio scouting / avanzamento giorno  | `discovery_level`, `attribute_masking`, `scouting_accuracy`, `shortlist`, `game_events`   | Assignments con attributi rivelati     |
| Scouting\_Update              | Scout, Shortlist      | Avanzamento scouting                 | `discovery_level`, `attribute_masking`, `scouting_accuracy`, `shortlist`, `game_events`   | Progresso osservazione aggiornato      |
| Discovery\_Complete           | Scout, Match Analysis | Completamento osservazione           | `discovery_level`, `attribute_masking`, `game_events`, `press_releases`                   | Giocatore scoperto                     |
| Press\_Center\_Display        | Notizie, Eventi       | Apertura Press Center                | `press_releases`, `game_events`                                                           | Lista notizie formattata               |

---

## 🔄 Dipendenze tra Flow

### Flow Principali

* `GameFlow_StartNewGame` → inizializza tutti i core dataset
* `GameFlow_AdvanceDay` → triggera `Match_Simulate`, `Player_Train`, `Morale_Update`, `Calendar_FetchUpcomingEvents`, `Scouting_Discover`
* `Match_Simulate` → triggera `Match_GenerateReport`, `Morale_Update`, `Finance_Update`, `Board_Evaluate`, `Press_Center_Display`

### Flow di Supporto

* `Morale_Update` → da `Match_Simulate`, `Player_Train`, `Transfer_Process`
* `Board_Evaluate` → dipende da `Finance_Update`, `Match_Simulate`, `Transfer_Process`
* `Finance_Update` → attivato da `Transfer_Process`, `Match_Simulate`, `GameFlow_AdvanceDay`
* `Scouting_Discover` → invoca `ScoutService` e produce `assignments`
* `Scouting_Update` → avanza progresso scoperta
* `Discovery_Complete` → completa scoperta scavenger
* `Press_Center_Display` → dipende da `press_releases`, `game_events`

### Flow Indipendenti

* `UserSettings_Apply`
* `Report_CompileHistory`
* `Staff_AssignRole`

---

## 🚀 Implementazione in Bolt.new

**Priorità di Sviluppo**:

1. **Fase 1**: `GameFlow_StartNewGame`, `Session_Save`, `Session_Load`
2. **Fase 2**: `Match_Simulate`, `Match_GenerateReport`, `GameFlow_AdvanceDay`
3. **Fase 3**: `Player_Train`, `Tactics_Update`, `Morale_Update`, `Finance_Update`, `UserSettings_Apply`
4. **Fase 4**: `Transfer_Offer`, `Transfer_Process`, `Board_Evaluate`, `Scouting_Discover`, `Staff_AssignRole`
5. **Fase 5**: `Discovery_Complete`, `Press_Center_Display`, `Calendar_FetchUpcomingEvents`, `Report_CompileHistory`

---

*Documentazione aggiornata al: Giugno 2025*
*Versione flow: 1.1*
*Compatibilità Bolt.new: Tutte le versioni*
