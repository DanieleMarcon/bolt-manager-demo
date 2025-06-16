# ✅ TODO Roadmap – Bolt Manager 01/02

Documento di coordinamento per l'aggiornamento completo del progetto Bolt Manager 01/02.
Contiene tutte le modifiche, integrazioni e refactor da eseguire su file `.md`, componenti JS, dataset e UI.

Aggiornato dinamicamente durante la fase di audit dei file.

---

## 📦 COMPONENTI IMPLEMENTATI (Aggiornamento Recente)

### ✅ Batch Precedente (Completato)
- `PlayerTrainingCard` – Scheda allenamento giocatore con selezione e progressi
- `FitnessChart` – Grafico SVG evoluzione fitness con controlli temporali
- `StaffCard` – Card membro staff con competenze e azioni
- `StaffList` – Lista completa staff con filtri e ordinamento
- `CompetencyChart` – Radar chart SVG competenze staff

### ✅ Batch Match/Calendar (Completato)
- `LineupSelector` – Selezione formazione con campo interattivo e drag&drop
- `MatchSummary` – Riepilogo completo partita con statistiche e highlights
- `StatisticsChart` – Grafici comparativi squadre (possesso, tiri, passaggi)
- `KeyMoments` – Timeline momenti salienti con autoplay e filtri
- `DayAdvancer` – Avanzamento temporale con anteprima eventi
- `UpcomingEvents` – Lista eventi imminenti con filtri e export

### ✅ Batch Transfer/Session (Completato)
- `PlayerSearch` – Ricerca avanzata giocatori con filtri multipli
- `NegotiationPanel` – Pannello negoziazione trasferimenti a 3 step
- `ContractDetails` – Gestione completa dettagli contrattuali
- `SaveSlotManager` – Gestione slot salvataggio con preview e azioni
- `SessionList` – Lista sessioni salvate con ordinamento e azioni

### ✅ Batch Final Components (Completato)
- `HistoryTimeline` – Timeline visuale eventi carriera giocatore
- `PlayerRatings` – Valutazioni giocatori post-partita con breakdown
- `RequestBoardButton` – Pulsante richieste dirigenza con modal avanzato

---

## 📄 PAGINE AGGIORNATE

### ✅ Pagine Completate
- `MatchSimulation.page.js` – Integrato `LineupSelector` con simulazione live
- `MatchAnalysis.page.js` – Integrati `MatchSummary`, `StatisticsChart`, `KeyMoments`, `PlayerRatings`
- `CalendarView.page.js` – Integrati `DayAdvancer`, `UpcomingEvents`
- `TrainingManagement.page.js` – Integrati `PlayerTrainingCard`, `FitnessChart`
- `StaffManagement.page.js` – Integrati `StaffCard`, `StaffList`, `CompetencyChart`
- `TransferMarket.page.js` – Integrati `PlayerSearch`, `NegotiationPanel`, `ContractDetails`
- `SessionManager.page.js` – Integrati `SaveSlotManager`, `SessionList`
- `PlayerHistory.page.js` – Integrato `HistoryTimeline` con eventi carriera
- `FinanceOverview.page.js` – Integrato `RequestBoardButton` con gestione eventi

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

### Batch 10

| Componente        | Azione Necessaria                                               |
| ----------------- | --------------------------------------------------------------- |
| `MoraleIndicator` | ❌ Aggiungere a `ui_overview.md` → sezione `TeamManagement.page` |

---

## 📦 COMPONENTI DA CREARE (DOCUMENTATI MA NON IMPLEMENTATI)

| Componente           | Azione Necessaria                                            |
| -------------------- | ------------------------------------------------------------ |
| `ContractDetails`    | ✅ **COMPLETATO** - Gestione dettagli contrattuali          |
| `HistoryTimeline`    | ✅ **COMPLETATO** - Timeline storico giocatore/squadra      |
| `MatchSummary`       | ✅ **COMPLETATO** - Riepilogo completo match              |
| `NegotiationPanel`   | ✅ **COMPLETATO** - Pannello avanzato negoziazione        |
| `PlayerRatings`      | ✅ **COMPLETATO** - Tabella valutazioni giocatori         |
| `PlayerSearch`       | ✅ **COMPLETATO** - Ricerca avanzata giocatori            |
| `SessionList`        | ✅ **COMPLETATO** - Elenco sessioni salvate               |
| `StatisticsChart`    | ✅ **COMPLETATO** - Grafico avanzato statistiche          |
| `UpcomingEvents`     | ✅ **COMPLETATO** - Lista eventi imminenti                |
| `RequestBoardButton` | ✅ **COMPLETATO** - Bottone richieste dirigenza           |

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
| `shortlist`          |  ✅ Creato: elenco osservati dell'utente                          |
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
| `ui_overview.md`       | ✅ **AGGIORNATO** - Aggiunti tutti i nuovi componenti                       |
| `modules_overview.md`  | Aggiungere: `ContractDetailsPanel`, `TacticalPreview`, `BudgetTracker`          |
| `datasets_overview.md` | Aggiungere: `finances`, `board_feedback`, `scouting_accuracy`                   |
| `flows_overview.md`    | Aggiungere: `Finance_Update`, `Board_Evaluate`, `Scouting_Discover` (da creare) |
| `README.md`            | Estendere sezioni moduli Finanze, Board, Scout                                  |

---

## 🔧 INTEGRAZIONI HTML/JS/CSS

| File         | Azione Suggerita                                                   |
| ------------ | ------------------------------------------------------------------ |
| `index.html` | Aggiungere sezione sidebar "📊 Finanze" e "🏛️ Direzione"          |
| `main.js`    | ✅ **AGGIORNATO** - Aggiunte rotte per tutte le nuove pagine    |
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
| `MatchSimulation.page`   | ✅ **COMPLETATO** - Integrato LineupSelector |
| `MatchAnalysis.page`     | ✅ **COMPLETATO** - Integrati tutti i componenti |
| `CalendarView.page`      | ✅ **COMPLETATO** - Integrati DayAdvancer e UpcomingEvents |
| `TransferMarket.page`    | ✅ **COMPLETATO** - Integrati PlayerSearch, NegotiationPanel, ContractDetails |
| `SessionManager.page`    | ✅ **COMPLETATO** - Integrati SaveSlotManager e SessionList |
| `PlayerHistory.page`     | ✅ **COMPLETATO** - Integrato HistoryTimeline |

---

## 🎯 STATO ATTUALE - FASE 8D COMPLETATA

### ✅ Implementazioni Recenti:

**Componenti Finali (3 nuovi componenti)**:
- `HistoryTimeline`: Timeline visuale eventi carriera con filtri e export
- `PlayerRatings`: Sistema valutazioni post-partita con breakdown dettagliato
- `RequestBoardButton`: Pulsante richieste dirigenza con modal e gestione eventi

**Pagine Aggiornate (3 pagine)**:
- `PlayerHistory.page.js`: Integrato HistoryTimeline per visualizzazione eventi
- `MatchAnalysis.page.js`: Sostituito sistema rating inline con PlayerRatings
- `FinanceOverview.page.js`: Integrato RequestBoardButton con gestione eventi

**Funzionalità Avanzate**:
- Timeline interattiva con filtri per tipo evento
- Sistema valutazioni completo con ordinamento e visualizzazioni
- Richieste dirigenza con modal avanzato e calcolo probabilità successo
- Gestione eventi personalizzati e callback
- Export dati completo per tutti i componenti
- Cooldown system per richieste dirigenza

### 🏆 Risultati Raggiunti:
- **Sistema Storico**: Timeline completa eventi carriera giocatori
- **Analisi Post-Partita**: Valutazioni dettagliate con breakdown performance
- **Gestione Dirigenza**: Sistema richieste avanzato con feedback real-time
- **UX Completa**: Tutti i componenti principali implementati e integrati
- **Modularità Finale**: Architettura componenti completa e riutilizzabile

La **Fase 8D** è completamente implementata! Tutti i componenti principali sono ora creati e integrati nelle rispettive pagine.

---

## 🔜 PROSSIMI STEP

- Completare documentazione componenti mancanti in `ui_overview.md`
- Implementare componenti finanziari e board rimanenti
- Validare integrazione completa sistema
- Finalizzare esportazione `dist/` per deploy
- Testing completo funzionalità e accessibilità