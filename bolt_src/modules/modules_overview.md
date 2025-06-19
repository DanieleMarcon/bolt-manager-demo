# 🎮 Moduli Funzionali - Allenatore Nato

Questa documentazione descrive i moduli funzionali principali della web app manageriale, la loro implementazione e le interconnessioni.

---

## 📋 Moduli Principali

### 1. **Squadra** (Team Management)
**Descrizione**: Gestione completa della rosa, visualizzazione giocatori, stato fisico e morale  
**Page**: `TeamManagement.page`  
**Dataset**: 
- `players` (lettura/scrittura)
- `teams` (lettura/scrittura)
- `morale_status` (lettura)
**Components**:
- `PlayerCard` - Scheda giocatore con attributi e stato
- `TeamOverview` - Panoramica squadra con statistiche
- `PlayerList` - Lista filtrata giocatori
- `MoraleIndicator` - Indicatore morale squadra/giocatore
- `InjuryStatus` - Stato infortuni  
**Dipendenze**: Nessuna

---

### 2. **Allenamento** (Training System)
**Descrizione**: Pianificazione allenamenti settimanali, sviluppo giocatori, gestione fitness  
**Page**: `TrainingManagement.page`  
**Dataset**:
- `trainings` (lettura/scrittura)
- `players` (scrittura per attributi)
- `staff` (lettura per bonus)
- `attributes_history` (scrittura per tracking)
**Components**:
- `TrainingScheduler` - Pianificazione settimanale
- `TrainingTypeSelector` - Selezione tipo allenamento
- `PlayerTrainingCard` - Progresso individuale
- `FitnessChart` - Grafico forma fisica
- `TrainingResults` - Risultati post-allenamento  
**Dipendenze**: Squadra, Staff

---

### 3. **Tattiche** (Tactical Setup)
**Descrizione**: Configurazione moduli, ruoli, mentalità e impostazioni strategiche  
**Pages**:
- `TacticalSetup.page`
- `TacticalSchemes.page`
- `TacticalRoles.page`  
**Dataset**:
- `tactics` (lettura/scrittura)
- `players` (lettura per posizionamento)
- `teams` (lettura default)
**Components**:
- `FormationSelector` - Selezione modulo (4-4-2, 3-5-2, etc.)
- `TacticalField` - Campo tattico interattivo
- `PlayerPositioner` - Posizionamento giocatori
- `MentalitySlider` - Cursori mentalità
- `SetPieceManager` - Gestione calci piazzati
- `TacticalPresets` - Preset tattici salvati
- `TacticalPreview` - Preview tattica
**Dipendenze**: Squadra

---

### 4. **Partite** (Match Engine)
**Descrizione**: Simulazione partite, eventi live, sostituzioni e risultati  
**Page**: `MatchSimulation.page`  
**Dataset**:
- `matches` (lettura/scrittura)
- `players` (lettura lineup, scrittura statistiche)
- `tactics` (lettura per strategia)
- `match_reports` (scrittura)
- `game_events` (scrittura)  
**Components**:
- `MatchLiveView` - Vista live
- `LineupSelector` - Selezione formazione
- `SubstitutionPanel` - Sostituzioni
- `MatchEvents` - Timeline
- `LiveStats` - Statistiche live
- `MatchResult` - Risultato finale  
**Dipendenze**: Squadra, Tattiche

---

### 5. **Avanzamento Giorno** (Calendar Advance)
**Descrizione**: Progressione temporale, eventi automatici, aggiornamenti stato gioco  
**Page**: `CalendarView.page`  
**Dataset**:
- `matches` (lettura prossime partite)
- `players` (scrittura recuperi/aging)
- `trainings` (lettura programmi)
- `game_events` (scrittura eventi automatici)
- `user_sessions` (scrittura snapshot)  
**Components**:
- `CalendarGrid` - Griglia mensile
- `DayAdvancer` - Controlli avanzamento
- `UpcomingEvents` - Eventi in programma
- `AutoEvents` - Notifiche automatiche
- `TimelineView` - Vista cronologica  
**Dipendenze**: Tutti i moduli

---

### 6. **Trasferimenti** (Transfer Market)
**Descrizione**: Mercato giocatori, trattative, contratti e scouting  
**Page**: `TransferMarket.page`  
**Dataset**:
- `transfers` (lettura/scrittura)
- `players` (lettura ricerca, scrittura trasferimenti)
- `teams` (lettura/scrittura budget)
- `game_events` (scrittura notifiche)  
**Components**:
- `PlayerSearch` - Ricerca giocatori
- `TransferList` - Lista trasferimenti
- `NegotiationPanel` - Trattative
- `ContractDetails` - Dettagli contrattuali
- `ScoutingReport` - Report scouting
- `BudgetTracker` - Monitoraggio budget  
**Dipendenze**: Squadra

---

### 7. **Report Partita** (Match Analysis)
**Descrizione**: Analisi dettagliata post-partita, statistiche e valutazioni  
**Page**: `MatchAnalysis.page`  
**Dataset**:
- `match_reports` (lettura)
- `matches` (lettura)
- `players` (lettura)  
**Components**:
- `MatchSummary` - Riassunto
- `PlayerRatings` - Valutazioni
- `StatisticsChart` - Grafici
- `KeyMoments` - Momenti salienti
- `TacticalAnalysis` - Analisi tattica
- `ComparisonView` - Confronto squadre  
**Dipendenze**: Partite

---

### 8. **Salvataggio/Caricamento** (Session Manager)
**Descrizione**: Gestione salvataggi multipli, backup e ripristino sessioni  
**Page**: `SessionManager.page`  
**Dataset**:
- `user_sessions` (lettura/scrittura)
- Tutti i dataset  
**Components**:
- `SaveSlotManager` - Gestione slot
- `SessionList` - Lista sessioni
- `BackupManager` - Backup/ripristino
- `SessionDetails` - Dettagli
- `QuickSave` - Salvataggio rapido
- `LoadConfirm` - Conferma caricamento  
**Dipendenze**: Tutti i moduli

---

### 9. **Staff** (Staff Management)
**Descrizione**: Gestione staff tecnico, competenze e contratti  
**Page**: `StaffManagement.page`  
**Dataset**:
- `staff` (lettura/scrittura)
- `teams` (lettura budget)
- `trainings` (lettura assegnazioni)  
**Components**:
- `StaffList` - Lista staff
- `StaffCard` - Scheda staff
- `CompetencyChart` - Grafico competenze
- `StaffHiring` - Assunzioni
- `ContractManager` - Contratti staff
- `PerformanceTracker` - Performance staff
- `ContractDetailsPanel` - Dettaglio contrattuale
**Dipendenze**: Allenamento

---

### 10. **Storico Giocatori** (Player History)
**Descrizione**: Tracking evoluzione giocatori, progressi e statistiche temporali  
**Page**: `PlayerHistory.page`  
**Dataset**:
- `attributes_history` (lettura)
- `players` (lettura)
- `matches` (lettura)  
**Components**:
- `ProgressChart` - Grafico progressione
- `HistoryTimeline` - Timeline evoluzione
- `StatisticsTable` - Tabella storica
- `ComparisonTool` - Confronto periodi
- `TrendAnalysis` - Analisi tendenze
- `ExportData` - Esportazione  
**Dipendenze**: Squadra, Allenamento

---

### 11. **Impostazioni Utente** (User Settings)
**Descrizione**: Personalizzazione interfaccia e preferenze  
**Page**: `UserSettings.page`  
**Dataset**:
- `user_settings` (lettura/scrittura)  
**Components**:
- `SettingsPanel` - Pannello impostazioni
- `ThemeSelector` - Tema
- `LanguageSelector` - Lingua
- `GameplaySettings` - Gameplay
- `NotificationSettings` - Notifiche
- `AccessibilityOptions` - Accessibilità
- `DataManagement` - Dati utente
- `SettingsTabNavigation` - Tab navigazione
**Dipendenze**: Nessuna

---

### 12. **Finanze & Direzione** (Finance & Board)
**Descrizione**: Gestione bilancio club, entrate/uscite e obiettivi board  
**Pages**:
- `FinanceOverview.page`
- `Board.page`  
**Dataset**:
- `finances` (lettura/scrittura)
- `board_feedback` (lettura/scrittura)
- `teams` (lettura per contesto)  
**Components**:
- `BudgetTracker` - Monitoraggio budget
- `FinanceOverviewPanel` - Panoramica finanziaria
- `BoardGoals` - Obiettivi board
- `BoardFeedbackPanel` - Feedback performance
- `RequestBoardButton` - Richieste board
- `SponsorBanner` - Sponsor UI
**Dipendenze**: Trasferimenti, Partite

---

### 13. **Notizie** (Press Center)
**Descrizione**: Visualizzazione comunicati stampa e news  
**Page**: `PressCenter.page`  
**Dataset**:
- `press_releases` (lettura/scrittura)
- `game_events` (lettura eventi correlati)  
**Components**:
- `NewsList` - Lista notizie
- `NewsItem` - Singola news
- `NewsFilter` - Filtri data/categoria
- `NewsDetail` - Dettaglio articolo
- `NewsBadge` - Indicatore nuove notizie  
**Dipendenze**: Dashboard

---

## 📊 Tabella Riepilogativa

| Modulo                   | Page(s)                                         | Dataset                            | Components Chiave                         | Dipendenze                |
|--------------------------|-------------------------------------------------|------------------------------------|-------------------------------------------|---------------------------|
| Squadra                  | `TeamManagement.page`                           | `players`, `teams`, `morale_status` | `PlayerCard`, `TeamOverview`, `PlayerList` | Nessuna                  |
| Allenamento              | `TrainingManagement.page`                       | `trainings`, `players`, `staff`, `attributes_history` | `TrainingScheduler`, `PlayerTrainingCard`, `FitnessChart` | Squadra, Staff           |
| Tattiche                 | `TacticalSetup.page`, `TacticalSchemes.page`, `TacticalRoles.page` | `tactics`, `players`, `teams`      | `FormationSelector`, `TacticalField`, `PlayerPositioner` | Squadra                  |
| Partite                  | `MatchSimulation.page`                          | `matches`, `players`, `tactics`, `match_reports` | `MatchLiveView`, `LineupSelector`, `SubstitutionPanel` | Squadra, Tattiche        |
| Avanzamento Giorno       | `CalendarView.page`                             | `matches`, `players`, `trainings`, `game_events`, `user_sessions` | `CalendarGrid`, `DayAdvancer`, `UpcomingEvents` | Tutti                    |
| Trasferimenti            | `TransferMarket.page`                           | `transfers`, `players`, `teams`, `game_events` | `PlayerSearch`, `NegotiationPanel`, `ContractDetails` | Squadra                  |
| Report Partita           | `MatchAnalysis.page`                            | `match_reports`, `matches`, `players` | `MatchSummary`, `PlayerRatings`, `StatisticsChart` | Partite                  |
| Salvataggio/Caricamento  | `SessionManager.page`                           | `user_sessions`, tutti i dataset   | `SaveSlotManager`, `SessionList`, `BackupManager` | Tutti                    |
| Staff                    | `StaffManagement.page`                          | `staff`, `teams`, `trainings`      | `StaffList`, `StaffCard`, `CompetencyChart` | Allenamento              |
| Storico Giocatori        | `PlayerHistory.page`                            | `attributes_history`, `players`, `matches` | `ProgressChart`, `HistoryTimeline`, `StatisticsTable` | Squadra, Allenamento     |
| Impostazioni Utente      | `UserSettings.page`                             | `user_settings`                    | `SettingsPanel`, `ThemeSelector`, `GameplaySettings` | Nessuna                  |
| Finanze & Direzione      | `FinanceOverview.page`, `Board.page`            | `finances`, `board_feedback`, `teams` | `BudgetTracker`, `FinanceOverviewPanel`, `BoardGoals` | Trasferimenti, Partite   |
| Notizie                  | `PressCenter.page`                              | `press_releases`, `game_events`    | `NewsList`, `NewsItem`, `NewsFilter`       | Dashboard                |

---

*Documentazione aggiornata al: Giugno 2025*  
*Versione moduli: 1.0*  
*Compatibilità Bolt.new: Tutte le versioni*