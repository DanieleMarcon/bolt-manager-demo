# ✅ TODO Roadmap – Bolt Manager 01/02

Documento di coordinamento per l'aggiornamento completo del progetto Bolt Manager 01/02.
Contiene tutte le modifiche, integrazioni e refactor da eseguire su file `.md`, componenti JS, dataset e UI.

Aggiornato dinamicamente durante la fase di audit dei file.

---

## 📦 COMPONENTI NON DOCUMENTATI (Batch 1–9)

### Batch 1

| Componente             | Azione Necessaria                                                   |
| ---------------------- | ------------------------------------------------------------------- |
| `SponsorBanner`        | ❌ Aggiungere a `ui_overview.md` → `Dashboard.page` o `Finance.page` |
| `ContractDetailsPanel` | ❌ Aggiungere a `modules_overview.md` → sezione `Staff`              |
| `TacticalPreview`      | ❌ Aggiungere a `modules_overview.md` → sezione `Tattiche`           |

### Batch 2

| Componente      | Azione Necessaria                                              |
| --------------- | -------------------------------------------------------------- |
| `BudgetTracker` | ❌ Aggiungere a `modules_overview.md` → sezione `Trasferimenti` |

### Batch 3

| Componente              | Azione Necessaria                                        |
| ----------------------- | -------------------------------------------------------- |
| `SettingsTabNavigation` | ❌ Aggiungere a `ui_overview.md` → sezione `Impostazioni` |

---

## 📦 COMPONENTI DOCUMENTATI (Batch 4–10)

Tutti i componenti analizzati nei batch 4–9 risultano già **completamente documentati** in `ui_overview.md` e, dove previsto, in `modules_overview.md`.

### Eccezioni dal Batch 10:

| Componente        | Azione Necessaria                                               |
| ----------------- | --------------------------------------------------------------- |
| `MoraleIndicator` | ❌ Aggiungere a `ui_overview.md` → sezione `TeamManagement.page` |

---

## 📦 COMPONENTI DA CREARE (DOCUMENTATI MA NON IMPLEMENTATI)

| Componente           | Azione Necessaria                                            |
| -------------------- | ------------------------------------------------------------ |
| `CompetencyChart`    | ❌ Creare componente documentato in `StaffManagement.page`    |
| `ContractDetails`    | ❌ Creare componente per dettagli contrattuali                |
| `DayAdvancer`        | ❌ Creare componente per avanzamento rapido giorni            |
| `FitnessChart`       | ❌ Creare componente per stato di forma                       |
| `HistoryTimeline`    | ❌ Creare timeline storico giocatore/squadra                  |
| `LineupSelector`     | ❌ Creare componente per selezione titolari                   |
| `MatchSummary`       | ❌ Creare componente di riepilogo completo match              |
| `NegotiationPanel`   | ❌ Creare pannello avanzato per negoziazione                  |
| `PlayerRatings`      | ❌ Creare tabella valutazioni giocatori                       |
| `PlayerSearch`       | ❌ Creare barra di ricerca avanzata giocatori                 |
| `PlayerTrainingCard` | ❌ Creare scheda allenamento singolo giocatore                |
| `SessionList`        | ❌ Creare elenco sessioni salvate                             |
| `StaffCard`          | ❌ Creare scheda per membro staff                             |
| `StaffList`          | ❌ Creare lista staff completo                                |
| `StatisticsChart`    | ❌ Creare grafico avanzato statistiche                        |
| `UpcomingEvents`     | ❌ Creare lista eventi imminenti in `Dashboard.page` o simili |
| `RequestBoardButton` | ❌ Creare bottone interattivo per invio richiesta board       |

## 🧩 MODULI NON ANCORA IMPLEMENTATI MA PREVISTI

| Modulo                | Azioni Suggerite                                                                     |
|--------------------------------------------------------------------------------------------------------------- |
| Finanze               | Creare `FinanceOverview.page`, `BudgetTracker`, `SponsorManager`, dataset `finances` |
| Board Confidence      | Nuovo `Board.page` per feedback dirigenziale, richieste e gestione licenziamenti      |
| Media / Comunicazione | Modulo per stampa, dichiarazioni e reazioni                                          |
| Shortlist & Attributi | Estendere scouting: `shortlist`, `accuracy`, `AttributeMasking` in `players`          |
| Interfaccia Scout     | `Scouting.page`, lista scout, aree di osservazione       |

---

## 🗂️ DATASET DA CREARE O ESTENDERE

| Dataset              | Azione Necessaria                                                 |
| ---------------------------------------------------------------------------------------- |
| `finances`           |  ✅ Creato: entrate/uscite, valore club, sponsor                  |
| `board_feedback      |  ✅ Creato: fiducia, soglie esonero, richieste board              |
| `scouting_accuracy`  |  ✅ Creato: accuratezza valutazioni scouting                      |
| `press_releases`     |  ✅ Creato: (opzionale): comunicazioni stampa e media             |
| `shortlist`          |  ✅ Creato: elenco osservati dell’utente                          |
| `attribute_masking`  |  ✅ Creato: livello mascheramento degli attributi non scoperti    |
| `discovery_level`    |  ✅ Creato: grado di osservazione raggiunto per ciascun giocatore |

## 🔄 FLOW AGGIORNATI IN `flows_overview.md`

| Flow                        | Stato                                |
| --------------------------- | -------------------------------------|
| `Finance_Update`            | ✅ Aggiunto in `flows_overview.md`   |
| `Board_Evaluate`            | ✅ Aggiunto in `flows_overview.md`   |
| `Scouting_Discover`         | ✅ Aggiunto in `flows_overview.md`   |
| `Event_Generator`           | ➕ Aggiungere a flows_overview.md    |
| `Notification_System`       | ➕ Aggiungere a flows_overview.md    |
| `Game_Timeline`             | ➕ Aggiungere a flows_overview.md    |
| `Calendar_AdvanceDay`       | ➕ Aggiungere a flows_overview.md    |
| `Match_End`                 | ➕ Aggiungere a flows_overview.md    |
| `Match_StartSimulation`     | ➕ Aggiungere a flows_overview.md    |
| `Staff_Hire`                | ➕ Aggiungere a flows_overview.md    |
| `Training_ApplyPlan`        | ➕ Aggiungere a flows_overview.md    |
| `Transfer_Complete`         | ➕ Aggiungere a flows_overview.md    |
| `Transfer_StartNegotiation` | ➕ Aggiungere a flows_overview.md    |


## 🔄 FILE `.md` DA AGGIORNARE

| File                   | Azione Necessaria                                                               |
| ---------------------- | ------------------------------------------------------------------------------- |
| `ui_overview.md`       | Aggiungere: `SponsorBanner`, `SettingsTabNavigation`, `RequestBoardButton`      |
| `modules_overview.md`  | Aggiungere: `ContractDetailsPanel`, `TacticalPreview`, `BudgetTracker`          |
| `datasets_overview.md` | Aggiungere: `finances`, `board_feedback`, `scouting_accuracy`                   |
| `flows_overview.md`    | Aggiungere: `Finance_Update`, `Board_Evaluate`, `Scouting_Discover` (da creare) |
| `README.md`            | Estendere sezioni moduli Finanze, Board, Scout                                  |

---

## 🔧 INTEGRAZIONI HTML/JS/CSS

| File         | Azione Suggerita                                                   |
| ------------ | ------------------------------------------------------------------ |
| `index.html` | Aggiungere sezione sidebar "📊 Finanze" e "🏛️ Direzione"          |
| `main.js`    | Aggiungere rotte: `FinanceOverview.page`, `Board.page`             |
| `style.css`  | (Opzionale) Stili personalizzati: `BudgetTracker`, `SponsorBanner` |

---

## 📄 PAGINE DA CREARE O COLLEGARE

| Pagina                   | Azione Necessaria                              |
| ------------------------------------------------------------------------- |
| `FinanceOverview.page`   | ✅ Creato e aggiunto al routing (`main.js`)    |
| `Board.page`             | ✅ Creato e aggiunto al routing (`main.js`)    |
| `Scouting.page`          | ✅ Implementato e collegato al modulo scouting |
| `TacticalSetup.page`     | ✅ Creato e collegato al routing               |
| `TeamManagement.page`    | ✅ Creato e collegato al routing               |
| `TrainingManagement.page`| ✅ Creato e collegato al routing               |


---

## 🔜 PROSSIMI STEP

- Validare implementazione `FinanceOverview.page`
- Avvio sviluppo componenti Board e moduli media