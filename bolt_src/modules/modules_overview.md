# 🎮 Moduli Funzionali - Bolt Manager 01/02

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
- `PlayerCard`, `TeamOverview`, `PlayerList`
- `MoraleIndicator`, `InjuryStatus`, `PlayerTabs`
**Dipendenze**: Nessuna (modulo base)

### 2. **Allenamento** (Training System)
**Descrizione**: Pianificazione allenamenti settimanali, sviluppo giocatori, gestione fitness
**Page**: `TrainingManagement.page`
**Dataset**:
- `trainings`, `players`, `staff`, `attributes_history`
**Components**:
- `TrainingScheduler`, `TrainingTypeSelector`, `PlayerTrainingCard`
- `FitnessChart`, `TrainingResults`, `IntensitySlider`
**Dipendenze**: Squadra, Staff

### 3. **Tattiche** (Tactical Setup)
**Descrizione**: Configurazione moduli, ruoli, mentalità e impostazioni strategiche
**Page**: `TacticalSetup.page`
**Dataset**:
- `tactics`, `players`, `teams`
**Components**:
- `FormationSelector`, `TacticalField`, `PlayerPositioner`
- `MentalitySlider`, `SetPieceManager`, `TacticalPresets`, `TacticalPreview`
**Dipendenze**: Squadra

### 4. **Partite** (Match Engine)
**Descrizione**: Simulazione partite, eventi live, sostituzioni e risultati
**Page**: `MatchSimulation.page`
**Dataset**:
- `matches`, `players`, `tactics`, `match_reports`, `game_events`
**Components**:
- `MatchLiveView`, `LineupSelector`, `SubstitutionPanel`
- `MatchEvents`, `LiveStats`, `MatchResult`
**Dipendenze**: Squadra, Tattiche

### 5. **Avanzamento Giorno** (Calendar Advance)
**Descrizione**: Progressione temporale, eventi automatici, aggiornamenti stato gioco
**Page**: `CalendarView.page`
**Dataset**:
- `matches`, `players`, `trainings`, `game_events`, `user_sessions`
**Components**:
- `CalendarGrid`, `DayAdvancer`, `UpcomingEvents`, `AutoEvents`, `TimelineView`
**Dipendenze**: Tutti i moduli

### 6. **Trasferimenti** (Transfer Market)
**Descrizione**: Mercato giocatori, trattative, contratti e scouting
**Page**: `TransferMarket.page`
**Dataset**:
- `transfers`, `players`, `teams`, `game_events`
**Components**:
- `PlayerSearch`, `TransferList`, `NegotiationPanel`, `ContractDetails`, `ScoutingReport`, `BudgetTracker`
**Dipendenze**: Squadra

### 7. **Report Partita** (Match Analysis)
**Descrizione**: Analisi dettagliata post-partita, statistiche e valutazioni
**Page**: `MatchAnalysis.page`
**Dataset**:
- `match_reports`, `matches`, `players`
**Components**:
- `MatchSummary`, `PlayerRatings`, `StatisticsChart`, `KeyMoments`, `TacticalAnalysis`, `ComparisonView`
**Dipendenze**: Partite

### 8. **Salvataggio/Caricamento** (Session Manager)
**Descrizione**: Gestione salvataggi multipli, backup e ripristino sessioni
**Page**: `SessionManager.page`
**Dataset**:
- `user_sessions`, tutti i dataset
**Components**:
- `SaveSlotManager`, `SessionList`, `BackupManager`, `SessionDetails`, `QuickSave`, `LoadConfirm`
**Dipendenze**: Tutti i moduli

### 9. **Staff** (Staff Management)
**Descrizione**: Gestione staff tecnico, competenze e contratti
**Page**: `StaffManagement.page`
**Dataset**:
- `staff`, `teams`, `trainings`
**Components**:
- `StaffList`, `StaffCard`, `CompetencyChart`, `StaffHiring`, `ContractManager`, `PerformanceTracker`, `ContractDetailsPanel`
**Dipendenze**: Allenamento

### 10. **Storico Giocatori** (Player History)
**Descrizione**: Tracking evoluzione giocatori, progressi e statistiche temporali
**Page**: `PlayerHistory.page`
**Dataset**:
- `attributes_history`, `players`, `matches`
**Components**:
- `ProgressChart`, `HistoryTimeline`, `StatisticsTable`, `ComparisonTool`, `TrendAnalysis`, `ExportData`
**Dipendenze**: Squadra, Allenamento

### 11. **Impostazioni Utente** (User Settings)
**Descrizione**: Personalizzazione interfaccia, preferenze gioco e configurazioni
**Page**: `UserSettings.page`
**Dataset**:
- `user_settings`
**Components**:
- `SettingsPanel`, `ThemeSelector`, `LanguageSelector`, `GameplaySettings`, `NotificationSettings`, `AccessibilityOptions`, `DataManagement`, `SettingsTabNavigation`
**Dipendenze**: Nessuna

### 12. **Finanze** (Finance Overview)
**Descrizione**: Monitoraggio stato economico del club, bilanci, sponsor e richieste al board
**Page**: `FinanceOverview.page`
**Dataset**:
- `finances`, `teams`
**Components**:
- `BudgetTracker`, `SponsorBanner`
**Dipendenze**: Squadra, Trasferimenti

### 13. **Board** (Board Confidence & Richieste)
**Descrizione**: Visualizzazione fiducia della dirigenza, stato attuale e richieste inviate
**Page**: `Board.page`
**Dataset**:
- `board_feedback`, `teams`
**Components**:
- `BoardConfidencePanel`, `RequestForm`, `DismissalStatus`
**Dipendenze**: Finanze, Squadra

### 14. **Scout** (Scouting Interface)
**Descrizione**: Gestione osservatori, scoperte e shortlist giocatori
**Page**: `Scouting.page`
**Dataset**:
- `scouting_accuracy`, `shortlist`, `attribute_masking`, `discovery_level`, `players`, `staff`
**Components**:
- `ScoutAssignmentPanel`, `DiscoveryProgressBar`, `ShortlistGrid`, `ScoutingFilters`
**Dipendenze**: Trasferimenti, Staff

---
## 📊 Tabella Riepilogativa

| Modulo              | Page                   | Dataset Principali                                        | Components Chiave                                         | Dipendenze              |
|---------------------|------------------------|------------------------------------------------------------|-----------------------------------------------------------|--------------------------|
| **Squadra**         | `TeamManagement.page`  | `players`, `teams`, `morale_status`                        | `PlayerCard`, `TeamOverview`, `PlayerList`               | Nessuna                  |
| **Allenamento**     | `TrainingManagement.page` | `trainings`, `players`, `staff`, `attributes_history`   | `TrainingScheduler`, `PlayerTrainingCard`, `FitnessChart` | Squadra, Staff           |
| **Tattiche**        | `TacticalSetup.page`   | `tactics`, `players`, `teams`                              | `FormationSelector`, `TacticalField`, `PlayerPositioner` | Squadra                  |
| **Partite**         | `MatchSimulation.page` | `matches`, `players`, `tactics`, `match_reports`           | `MatchLiveView`, `LineupSelector`, `SubstitutionPanel`   | Squadra, Tattiche        |
| **Avanzamento**     | `CalendarView.page`    | `matches`, `players`, `trainings`, `game_events`, `user_sessions` | `CalendarGrid`, `DayAdvancer`, `UpcomingEvents`     | Tutti                    |
| **Trasferimenti**   | `TransferMarket.page`  | `transfers`, `players`, `teams`, `game_events`             | `PlayerSearch`, `NegotiationPanel`, `ContractDetails`    | Squadra                  |
| **Report Partita**  | `MatchAnalysis.page`   | `match_reports`, `matches`, `players`                      | `MatchSummary`, `PlayerRatings`, `StatisticsChart`       | Partite                  |
| **Sessioni**        | `SessionManager.page`  | `user_sessions`, tutti i dataset                           | `SaveSlotManager`, `SessionList`, `BackupManager`        | Tutti                    |
| **Staff**           | `StaffManagement.page` | `staff`, `teams`, `trainings`                              | `StaffList`, `StaffCard`, `CompetencyChart`              | Allenamento              |
| **Storico**         | `PlayerHistory.page`   | `attributes_history`, `players`, `matches`                 | `ProgressChart`, `HistoryTimeline`, `StatisticsTable`    | Squadra, Allenamento     |
| **Impostazioni**    | `UserSettings.page`    | `user_settings`                                            | `SettingsPanel`, `ThemeSelector`, `GameplaySettings`     | Nessuna                  |
| **Finanze**         | `FinanceOverview.page` | `finances`, `teams`                                        | `BudgetTracker`, `SponsorBanner`                         | Squadra, Trasferimenti   |
| **Board**           | `Board.page`           | `board_feedback`, `teams`                                  | `BoardConfidencePanel`, `RequestForm`, `DismissalStatus` | Finanze, Squadra         |
| **Scout**           | `Scouting.page`        | `scouting_accuracy`, `shortlist`, `attribute_masking`, `discovery_level`, `players`, `staff` | `ScoutAssignmentPanel`, `ShortlistGrid` | Trasferimenti, Staff     |

---

## 🔄 Flusso di Interazione tra Moduli

### Flusso Principale di Gioco:
1. **Squadra** → Visualizzazione rosa e stato giocatori
2. **Allenamento** → Pianificazione e sviluppo settimanale
3. **Tattiche** → Preparazione strategica pre-partita
4. **Partite** → Simulazione e gestione match
5. **Report Partita** → Analisi post-partita
6. **Avanzamento** → Progressione temporale
7. **Trasferimenti** → Gestione mercato (periodica)

### Flussi di Supporto:
- **Staff** → Supporta Allenamento con bonus e competenze
- **Storico** → Analisi dati per decisioni strategiche
- **Sessioni** → Salvataggio stato in qualsiasi momento
- **Impostazioni** → Personalizzazione esperienza utente
- **Finanze** → Stato economico e sponsorizzazioni
- **Board** → Giudizi e richieste gestionali
- **Scout** → Esplorazione nuovi giocatori e shortlist

---

## 🚀 Considerazioni per Sviluppo Futuro

### Scalabilità:
- Ogni modulo è indipendente e può essere potenziato singolarmente
- Architettura pronta per funzionalità multiplayer
- Supporto per API esterne (statistiche reali, social features)

### Estensibilità:
- Nuovi moduli possono essere aggiunti senza modificare l'esistente
- Componenti riutilizzabili tra moduli diversi
- Dataset modulari permettono espansioni (coppe, settore giovanile, etc.)

### Performance:
- Caricamento lazy dei moduli non utilizzati
- Caching intelligente dei dati frequentemente acceduti
- Ottimizzazione per dispositivi mobile

---

*Documentazione aggiornata al: Giugno 2025*
*Versione moduli: 1.1*
*Compatibilità Bolt.new: Tutte le versioni*
*Questa struttura sarà mantenuta allineata con `flows_overview.md`, `datasets_overview.md` e `ui_overview.md` per coerenza documentale.*

