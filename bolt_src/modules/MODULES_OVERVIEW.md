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
- `PlayerCard` - Scheda giocatore con attributi e stato
- `TeamOverview` - Panoramica squadra con statistiche
- `PlayerList` - Lista filtrata giocatori
- `MoraleIndicator` - Indicatore morale squadra/giocatore
- `InjuryStatus` - Stato infortuni
**Dipendenze**: Nessuna (modulo base)

---

### 2. **Allenamento** (Training System)
**Descrizione**: Pianificazione allenamenti settimanali, sviluppo giocatori, gestione fitness
**Page**: `TrainingManagement.page`
**Dataset**:
- `trainings` (lettura/scrittura)
- `players` (scrittura per aggiornamenti attributi)
- `staff` (lettura per bonus allenatori)
- `attributes_history` (scrittura per tracking)
**Components**:
- `TrainingScheduler` - Pianificazione settimanale
- `TrainingTypeSelector` - Selezione tipo allenamento
- `PlayerTrainingCard` - Progresso individuale
- `FitnessChart` - Grafico forma fisica
- `TrainingResults` - Risultati post-allenamento
**Dipendenze**: Squadra (per selezione giocatori), Staff (per bonus)

---

### 3. **Tattiche** (Tactical Setup)
**Descrizione**: Configurazione moduli, ruoli, mentalità e impostazioni strategiche
**Page**: `TacticalSetup.page`
**Dataset**:
- `tactics` (lettura/scrittura)
- `players` (lettura per posizionamento)
- `teams` (lettura per formazione default)
**Components**:
- `FormationSelector` - Selezione modulo (4-4-2, 3-5-2, etc.)
- `TacticalField` - Campo tattico interattivo
- `PlayerPositioner` - Posizionamento giocatori
- `MentalitySlider` - Cursori mentalità (difensiva/offensiva)
- `SetPieceManager` - Gestione calci piazzati
- `TacticalPresets` - Preset tattici salvati
**Dipendenze**: Squadra (per disponibilità giocatori)

---

### 4. **Partite** (Match Engine)
**Descrizione**: Simulazione partite, eventi live, sostituzioni e risultati
**Page**: `MatchSimulation.page`
**Dataset**:
- `matches` (lettura/scrittura)
- `players` (lettura per lineup, scrittura per statistiche)
- `tactics` (lettura per impostazioni)
- `match_reports` (scrittura)
- `game_events` (scrittura per eventi partita)
**Components**:
- `MatchLiveView` - Vista live della partita
- `LineupSelector` - Selezione formazione pre-partita
- `SubstitutionPanel` - Pannello sostituzioni
- `MatchEvents` - Timeline eventi partita
- `LiveStats` - Statistiche live (possesso, tiri, etc.)
- `MatchResult` - Risultato finale
**Dipendenze**: Squadra, Tattiche (per formazione e strategia)

---

### 5. **Avanzamento Giorno** (Calendar Advance)
**Descrizione**: Progressione temporale, eventi automatici, aggiornamenti stato gioco
**Page**: `CalendarView.page`
**Dataset**:
- `matches` (lettura per prossime partite)
- `players` (scrittura per recuperi/aging)
- `trainings` (lettura per programmi)
- `game_events` (scrittura per eventi automatici)
- `user_sessions` (scrittura per salvataggio stato)
**Components**:
- `CalendarGrid` - Griglia calendario mensile
- `DayAdvancer` - Controlli avanzamento
- `UpcomingEvents` - Eventi in programma
- `AutoEvents` - Notifiche eventi automatici
- `TimelineView` - Vista cronologica eventi
**Dipendenze**: Tutti i moduli (coordina l'avanzamento globale)

---

### 6. **Trasferimenti** (Transfer Market)
**Descrizione**: Mercato giocatori, trattative, contratti e scouting
**Page**: `TransferMarket.page`
**Dataset**:
- `transfers` (lettura/scrittura)
- `players` (lettura per ricerca, scrittura per trasferimenti)
- `teams` (lettura/scrittura per budget)
- `game_events` (scrittura per notifiche mercato)
**Components**:
- `PlayerSearch` - Ricerca giocatori disponibili
- `TransferList` - Lista trasferimenti attivi
- `NegotiationPanel` - Pannello trattative
- `ContractDetails` - Dettagli contrattuali
- `ScoutingReport` - Report scouting giocatori
- `BudgetTracker` - Monitoraggio budget
**Dipendenze**: Squadra (per valutazione rosa)

---

### 7. **Report Partita** (Match Analysis)
**Descrizione**: Analisi dettagliata post-partita, statistiche e valutazioni
**Page**: `MatchAnalysis.page`
**Dataset**:
- `match_reports` (lettura)
- `matches` (lettura)
- `players` (lettura per valutazioni)
**Components**:
- `MatchSummary` - Riassunto partita
- `PlayerRatings` - Valutazioni individuali
- `StatisticsChart` - Grafici statistiche
- `KeyMoments` - Momenti salienti
- `TacticalAnalysis` - Analisi tattica
- `ComparisonView` - Confronto squadre
**Dipendenze**: Partite (per dati da analizzare)

---

### 8. **Salvataggio/Caricamento** (Session Manager)
**Descrizione**: Gestione salvataggi multipli, backup e ripristino sessioni
**Page**: `SessionManager.page`
**Dataset**:
- `user_sessions` (lettura/scrittura)
- Tutti i dataset (per backup completo)
**Components**:
- `SaveSlotManager` - Gestione slot salvataggio
- `SessionList` - Lista sessioni salvate
- `BackupManager` - Backup e ripristino
- `SessionDetails` - Dettagli sessione
- `QuickSave` - Salvataggio rapido
- `LoadConfirm` - Conferma caricamento
**Dipendenze**: Tutti i moduli (salva stato globale)

---

### 9. **Staff** (Staff Management)
**Descrizione**: Gestione staff tecnico, competenze e contratti
**Page**: `StaffManagement.page`
**Dataset**:
- `staff` (lettura/scrittura)
- `teams` (lettura per budget)
- `trainings` (lettura per assegnazioni)
**Components**:
- `StaffList` - Lista membri staff
- `StaffCard` - Scheda membro staff
- `CompetencyChart` - Grafico competenze
- `StaffHiring` - Assunzione nuovo staff
- `ContractManager` - Gestione contratti staff
- `PerformanceTracker` - Tracking performance staff
**Dipendenze**: Allenamento (per bonus e competenze)

---

### 10. **Storico Giocatori** (Player History)
**Descrizione**: Tracking evoluzione giocatori, progressi e statistiche temporali
**Page**: `PlayerHistory.page`
**Dataset**:
- `attributes_history` (lettura)
- `players` (lettura)
- `matches` (lettura per statistiche)
**Components**:
- `ProgressChart` - Grafico progressione attributi
- `HistoryTimeline` - Timeline evoluzione
- `StatisticsTable` - Tabella statistiche storiche
- `ComparisonTool` - Confronto periodi
- `TrendAnalysis` - Analisi tendenze
- `ExportData` - Esportazione dati
**Dipendenze**: Squadra, Allenamento (per dati storici)

---

### 11. **Impostazioni Utente** (User Settings)
**Descrizione**: Personalizzazione interfaccia, preferenze gioco e configurazioni
**Page**: `UserSettings.page`
**Dataset**:
- `user_settings` (lettura/scrittura)
**Components**:
- `SettingsPanel` - Pannello impostazioni principale
- `ThemeSelector` - Selezione tema
- `LanguageSelector` - Selezione lingua
- `GameplaySettings` - Impostazioni gameplay
- `NotificationSettings` - Configurazione notifiche
- `AccessibilityOptions` - Opzioni accessibilità
- `DataManagement` - Gestione dati utente
**Dipendenze**: Nessuna (modulo indipendente)

---

## 📊 Tabella Riepilogativa

| Modulo | Page | Dataset Principali | Components Chiave | Dipendenze |
|--------|------|-------------------|-------------------|------------|
| **Squadra** | `TeamManagement.page` | `players`, `teams`, `morale_status` | `PlayerCard`, `TeamOverview`, `PlayerList` | Nessuna |
| **Allenamento** | `TrainingManagement.page` | `trainings`, `players`, `staff`, `attributes_history` | `TrainingScheduler`, `PlayerTrainingCard`, `FitnessChart` | Squadra, Staff |
| **Tattiche** | `TacticalSetup.page` | `tactics`, `players`, `teams` | `FormationSelector`, `TacticalField`, `PlayerPositioner` | Squadra |
| **Partite** | `MatchSimulation.page` | `matches`, `players`, `tactics`, `match_reports` | `MatchLiveView`, `LineupSelector`, `SubstitutionPanel` | Squadra, Tattiche |
| **Avanzamento** | `CalendarView.page` | `matches`, `players`, `trainings`, `game_events` | `CalendarGrid`, `DayAdvancer`, `UpcomingEvents` | Tutti |
| **Trasferimenti** | `TransferMarket.page` | `transfers`, `players`, `teams`, `game_events` | `PlayerSearch`, `NegotiationPanel`, `ContractDetails` | Squadra |
| **Report Partita** | `MatchAnalysis.page` | `match_reports`, `matches`, `players` | `MatchSummary`, `PlayerRatings`, `StatisticsChart` | Partite |
| **Sessioni** | `SessionManager.page` | `user_sessions`, tutti i dataset | `SaveSlotManager`, `SessionList`, `BackupManager` | Tutti |
| **Staff** | `StaffManagement.page` | `staff`, `teams`, `trainings` | `StaffList`, `StaffCard`, `CompetencyChart` | Allenamento |
| **Storico** | `PlayerHistory.page` | `attributes_history`, `players`, `matches` | `ProgressChart`, `HistoryTimeline`, `StatisticsTable` | Squadra, Allenamento |
| **Impostazioni** | `UserSettings.page` | `user_settings` | `SettingsPanel`, `ThemeSelector`, `GameplaySettings` | Nessuna |

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

---

## 🚀 Considerazioni per Sviluppo Futuro

### Scalabilità:
- Ogni modulo è indipendente e può essere potenziato singolarmente
- Architettura pronta per funzionalità multiplayer
- Supporto per API esterne (statistiche reali, social features)

### Estensibilità:
- Nuovi moduli possono essere aggiunti senza modificare l'esistente
- Component riutilizzabili tra moduli diversi
- Dataset modulari permettono espansioni (coppe, settore giovanile, etc.)

### Performance:
- Caricamento lazy dei moduli non utilizzati
- Caching intelligente dei dati frequentemente acceduti
- Ottimizzazione per dispositivi mobile

---

*Documentazione aggiornata al: Gennaio 2025*
*Versione moduli: 1.0*
*Compatibilità Bolt.new: Tutte le versioni*