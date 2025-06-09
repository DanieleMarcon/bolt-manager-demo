# 🗺️ Roadmap di Sviluppo – Bolt Manager 01/02

Questa roadmap descrive in dettaglio le fasi operative per costruire una demo funzionante del gioco manageriale, seguendo le best practice di modularità, accessibilità e sviluppo su Bolt.new.

---

## 🔹 Fase 0 – Preparazione
✅ Completato:
- [x] Struttura repository e cartelle
- [x] Definizione file `.gitignore`, `README.md`, `README_DEPLOY.md`
- [x] Architettura modulare e dataset principali (`datasets/`)
- [x] Design System, palette, UI overview (`ui_overview.md`)
- [x] Documentazione moduli (`modules_overview.md`) e flow (`flows_overview.md`)
- [x] CSS globale `dist/style.css`

---

## 🔹 Fase 1 – Setup + Squadra
🎯 Obiettivo: creare una prima sessione funzionante

- [ ] `GameFlow_StartNewGame` (generazione squadre, calendario, sessione)
- [ ] `TeamManagement.page`
- [ ] Componenti: `PlayerCard`, `TeamOverview`, `MoraleIndicator`
- [ ] Test demo: avvio + visualizzazione rosa

---

## 🔹 Fase 2 – Allenamento + Calendario
🎯 Obiettivo: permettere sviluppo giocatori e avanzamento temporale

- [ ] `Player_Train`, `GameFlow_AdvanceDay`
- [ ] `TrainingManagement.page`, `CalendarView.page`
- [ ] Componenti: `TrainingScheduler`, `ProgressChart`, `CalendarGrid`

---

## 🔹 Fase 3 – Tattiche + Partite
🎯 Obiettivo: gestire moduli e simulare match

- [ ] `Tactics_Update`, `Match_Simulate`, `Match_GenerateReport`
- [ ] `TacticalSetup.page`, `MatchSimulation.page`, `MatchAnalysis.page`
- [ ] Componenti: `TacticalField`, `MatchLiveView`, `PlayerRatings`

---

## 🔹 Fase 4 – Salvataggi e Sessioni
🎯 Obiettivo: rendere il gioco persistente

- [ ] `Session_Save`, `Session_Load`
- [ ] `SessionManager.page`
- [ ] Componenti: `SaveSlotManager`, `BackupManager`

---

## 🔹 Fase 5 – Mercato e Staff
🎯 Obiettivo: gestione trasferimenti e ruoli tecnici

- [ ] `Transfer_Offer`, `Transfer_Process`, `Staff_AssignRole`
- [ ] `TransferMarket.page`, `StaffManagement.page`
- [ ] Componenti: `NegotiationPanel`, `ContractDetails`, `StaffCard`

---

## 🔹 Fase 6 – Storico e Impostazioni
🎯 Obiettivo: finalizzare la demo con dati storici e preferenze

- [ ] `Report_CompileHistory`, `UserSettings_Apply`
- [ ] `PlayerHistory.page`, `UserSettings.page`
- [ ] Test finale, ottimizzazioni, polish UI

---

## ✅ Obiettivo finale

Una demo completa, esportabile via `dist/`, compatibile con SiteGround o hosting statico, accessibile e responsive. Pronta per l’evoluzione futura in direzione multiplayer, API o espansioni.
