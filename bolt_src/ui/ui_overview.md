# 🎨 UX/UI Overview - Bolt Manager 01/02

Documentazione completa dell'interfaccia utente per la web app manageriale, ispirata a Championship Manager 01/02 nelle funzionalità ma completamente ripensata per il web moderno del 2025.

---

## 🎯 Principi di Design

### Design Philosophy
- **Mobile-First**: Progettato prima per smartphone, poi adattato a schermi più grandi
- **Accessibility-First**: Navigazione completa da tastiera, screen reader friendly
- **Performance-First**: Interfaccia leggera, animazioni fluide, caricamento rapido
- **Content-First**: Informazioni chiare e immediate, gerarchia visiva forte

### Visual Identity
- **Stile**: Moderno, pulito, professionale ma accogliente
- **Ispirazione**: Interfacce sportive moderne (ESPN, Sky Sports) + dashboard gestionali
- **Personalità**: Serio ma non intimidatorio, tecnico ma accessibile

---

## 🎨 Sistema di Design

### Palette Colori
```css
:root {
  --primary: #2563eb;      /* Blu professionale */
  --secondary: #10b981;    /* Verde successo */
  --accent: #f59e0b;       /* Arancione attenzione */
  --background: #f8fafc;   /* Grigio chiaro */
  --surface: #ffffff;      /* Bianco puro */
  --text: #1e293b;         /* Grigio scuro */
  --text-muted: #64748b;   /* Grigio medio */
  --border: #e2e8f0;       /* Grigio bordi */
  --error: #ef4444;        /* Rosso errore */
  --warning: #f59e0b;      /* Arancione warning */
  --success: #10b981;      /* Verde successo */
}
```

### Typography
- **Font Stack**: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- **Dimensioni Base**: 16px (mobile), 18px (desktop), 20px (TV)
- **Line Height**: 1.5 (corpo), 1.2 (titoli)
- **Peso**: 400 (normale), 500 (medio), 600 (semi-bold), 700 (bold)

### Spacing System
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Componenti**: padding multipli di 4px
- **Layout**: margin e gap multipli di 8px

---

## 📱 Layout Responsivo

### Mobile (320px - 768px)
```
┌─────────────────────┐
│     Top Bar         │ ← 56px height
├─────────────────────┤
│                     │
│   Main Content      │ ← Full width
│   (Single Column)   │
│                     │
├─────────────────────┤
│   Bottom Nav        │ ← 64px height
└─────────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────────┐
│           Top Bar               │ ← 64px height
├─────────────────────────────────┤
│ Side │                         │
│ Nav  │    Main Content         │ ← 2 colonne
│ 240px│    (Fluid)              │
│      │                         │
└─────────────────────────────────┘
```

### Desktop (1024px+)
```
┌─────────────────────────────────────────┐
│              Top Bar                    │ ← 72px height
├─────────────────────────────────────────┤
│ Side │                                 │
│ Nav  │         Main Content            │ ← Sidebar + contenuto
│ 280px│         (Max 1200px)            │
│      │                                 │
└─────────────────────────────────────────┘
```

### Smart TV (1920px+)
```
┌─────────────────────────────────────────────────────┐
│                    Top Bar                          │ ← 80px height
├─────────────────────────────────────────────────────┤
│ Side │                                             │
│ Nav  │            Main Content                     │ ← Layout centrato
│ 320px│            (Max 1400px)                     │   con padding laterale
│      │                                             │
└─────────────────────────────────────────────────────┘
```

---

## 🧭 Navigazione Globale

### Sidebar Navigation
**Struttura gerarchica**:
```
🏠 Dashboard
📊 Squadra
   ├── Rosa Giocatori
   ├── Statistiche
   └── Morale
⚽ Partite
   ├── Prossima Partita
   ├── Calendario
   └── Risultati
🏃 Allenamento
   ├── Pianificazione
   ├── Programmi
   └── Progressi
⚙️ Tattiche
   ├── Formazione
   ├── Schemi
   └── Ruoli
💰 Trasferimenti
   ├── Mercato
   ├── Trattative
   └── Contratti
👥 Staff
📈 Storico
📊 Finanze
   ├── Bilancio
   └── Sponsor
🏛️ Direzione
   ├── Fiducia Board
   └── Richieste
🕵️ Scout
   ├── Shortlist
   ├── Osservazione
   └── Progressi
⚙️ Impostazioni
```

### Breadcrumbs
```
Home > Squadra > Rosa Giocatori > [Nome Giocatore]
Home > Finanze > Sponsor
Home > Direzione > Fiducia Board
Home > Scout > Shortlist
```

### Navigazione Tastiera
- **Tab / Shift+Tab**: Navigazione sequenziale avanti/indietro
- **Frecce**: Navigazione direzionale (griglie, tabelle, calendari)
- **Alt + Frecce**: Navigazione orizzontale tra tab
- **Ctrl + S**: Salvataggio rapido
- **Ctrl + [1–9]**: Accesso diretto alle macro-sezioni
- **Enter / Space**: Attivazione elementi (bottoni, card, link)
- **Esc**: Chiusura modali, overlay, menù contestuali

---

## 📄 Pages Dettagliate

### 1. TeamManagement.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Squadra              │
├─────────────────────────────────────────┤
│ [Team Overview Card]                    │ ← Statistiche squadra
├─────────────────────────────────────────┤
│ [Filters & Search Bar]                 │ ← Filtri giocatori
├─────────────────────────────────────────┤
│ [Player Grid]                          │ ← Griglia giocatori
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ P1  │ │ P2  │ │ P3  │ │ P4  │        │
│ └─────┘ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `TeamOverviewCard`: Statistiche squadra, morale, budget
- `PlayerFilterBar`: Filtri per ruolo, età, forma fisica
- `PlayerCard`: Foto, nome, ruolo, rating, stato
- `PlayerDetailModal`: Popup con statistiche complete
- `MoraleIndicator`: Barra colorata morale (0-100)
- `InjuryStatusBadge`: Badge stato infortunio

**Comportamento Dinamico**:
- Click su giocatore → Modal dettagli
- Filtri real-time senza reload
- Ordinamento colonne (nome, età, rating)
- Hover su card → Preview statistiche

**Responsività**:
- Mobile: 1 colonna, card compatte
- Tablet: 2 colonne
- Desktop: 3-4 colonne
- TV: 4-5 colonne, card più grandi

**Accessibilità**:
- Navigazione tastiera tra card
- Screen reader: "Giocatore [Nome], ruolo [Ruolo], rating [X]"
- Focus visibile su card attiva
- Filtri accessibili via tastiera

**Flow Collegati**: `Player_Train`, `Morale_Update`, `Transfer_Offer`

---

### 2. TrainingManagement.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Allenamento          │
├─────────────────────────────────────────┤
│ [Weekly Schedule Grid]                  │ ← Calendario settimanale
├─────────────────────────────────────────┤
│ [Training Type Selector]               │ ← Tipo allenamento
├─────────────────────────────────────────┤
│ [Player Selection & Progress]          │ ← Selezione e progressi
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `WeeklyScheduleGrid`: Griglia 7 giorni con slot allenamento
- `TrainingTypeCard`: Card tipo allenamento (fitness, tecnico, tattico)
- `PlayerSelectionList`: Lista giocatori con checkbox
- `ProgressChart`: Grafico progressi attributi
- `IntensitySlider`: Slider intensità allenamento
- `TrainingResultsModal`: Risultati post-allenamento

**Comportamento Dinamico**:
- Drag & drop allenamenti nel calendario
- Slider intensità → Preview rischio infortuni
- Selezione giocatori → Aggiornamento preview risultati
- Animazione progressi attributi

**Responsività**:
- Mobile: Calendario verticale, 1 giorno per volta
- Tablet: Calendario 3+4 giorni
- Desktop: Calendario completo 7 giorni
- TV: Calendario espanso con dettagli

**Accessibilità**:
- Calendario navigabile con frecce
- Slider con incrementi tastiera (+/-)
- Checkbox accessibili
- Annunci screen reader per cambiamenti

**Flow Collegati**: `Player_Train`, `Staff_AssignRole`, `Morale_Update`

---

### 3. TacticalSetup.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Tattiche             │
├─────────────────────────────────────────┤
│ [Formation Selector]                   │ ← Selezione modulo
├─────────────────────────────────────────┤
│ [Tactical Field]        [Settings]     │ ← Campo + impostazioni
│ ┌─────────────────┐    ┌─────────────┐ │
│ │     ⚽ Field    │    │ Mentality   │ │
│ │   with Players  │    │ Tempo       │ │
│ │                 │    │ Width       │ │
│ └─────────────────┘    └─────────────┘ │
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `FormationSelector`: Dropdown moduli (4-4-2, 3-5-2, etc.)
- `TacticalField`: Campo interattivo con posizioni giocatori
- `PlayerPositioner`: Drag & drop giocatori sul campo
- `MentalitySliders`: Slider per impostazioni tattiche
- `SetPieceManager`: Gestione calci piazzati
- `TacticalPreview`: Anteprima efficacia tattica

**Comportamento Dinamico**:
- Drag & drop giocatori sul campo
- Cambio modulo → Riposizionamento automatico
- Slider → Aggiornamento preview in tempo reale
- Validazione posizioni (ruolo compatibile)

**Responsività**:
- Mobile: Campo sopra, impostazioni sotto
- Tablet: Campo e impostazioni affiancati
- Desktop: Layout ottimizzato con sidebar
- TV: Campo grande centrale, pannelli laterali

**Accessibilità**:
- Campo navigabile con tastiera
- Posizioni selezionabili con Tab
- Slider accessibili
- Feedback audio per posizionamenti

**Flow Collegati**: `Tactics_Update`, `Match_Simulate`

---

### 4. MatchSimulation.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Match Header] vs [Away Team]           │ ← Info partita
├─────────────────────────────────────────┤
│ [Live Score & Time]                     │ ← Punteggio live
├─────────────────────────────────────────┤
│ [Match Events Timeline]                 │ ← Eventi cronologici
├─────────────────────────────────────────┤
│ [Live Stats] | [Substitutions Panel]   │ ← Statistiche + sostituzioni
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `MatchHeader`: Squadre, data, stadio, condizioni
- `LiveScoreBoard`: Punteggio grande, tempo partita
- `MatchEventsTimeline`: Timeline eventi (gol, cartellini)
- `LiveStatsPanel`: Statistiche live (possesso, tiri)
- `SubstitutionPanel`: Sostituzioni disponibili
- `MatchSpeedControl`: Controlli velocità simulazione

**Comportamento Dinamico**:
- Aggiornamento live eventi partita
- Animazioni per gol e eventi importanti
- Controlli velocità simulazione
- Sostituzioni in tempo reale

**Responsività**:
- Mobile: Stack verticale, eventi compatti
- Tablet: 2 colonne, eventi + statistiche
- Desktop: Layout completo con pannelli
- TV: Visualizzazione immersiva, testo grande

**Accessibilità**:
- Annunci screen reader per eventi
- Controlli tastiera per velocità
- Focus su eventi importanti
- Descrizioni dettagliate eventi

**Flow Collegati**: `Match_Simulate`, `Match_GenerateReport`

---

### 5. MatchAnalysis.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Match Summary Header]                  │ ← Risultato e info
├─────────────────────────────────────────┤
│ [Statistics Comparison]                 │ ← Statistiche comparative
├─────────────────────────────────────────┤
│ [Player Ratings Grid]                  │ ← Valutazioni giocatori
├─────────────────────────────────────────┤
│ [Key Moments & Analysis]               │ ← Momenti salienti
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `MatchSummaryCard`: Risultato finale, data, stadio
- `StatsComparisonChart`: Grafici comparativi squadre
- `PlayerRatingCard`: Valutazione individuale (1-10)
- `KeyMomentsTimeline`: Momenti salienti partita
- `TacticalAnalysisPanel`: Analisi tattica automatica
- `ExportReportButton`: Esportazione report

**Comportamento Dinamico**:
- Grafici interattivi statistiche
- Hover su giocatore → Dettagli performance
- Timeline navigabile momenti salienti
- Confronto con partite precedenti

**Responsività**:
- Mobile: Sezioni impilate, grafici semplificati
- Tablet: 2 colonne, grafici medi
- Desktop: Layout completo, grafici dettagliati
- TV: Visualizzazione espansa, grafici grandi

**Accessibilità**:
- Grafici con descrizioni testuali
- Navigazione tastiera tra sezioni
- Dati tabellari per screen reader
- Riassunti vocali disponibili

**Flow Collegati**: `Match_GenerateReport`, `Report_CompileHistory`

---

### 6. TransferMarket.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Search & Filters Bar]                 │ ← Ricerca giocatori
├─────────────────────────────────────────┤
│ [Budget Tracker] | [Active Deals]      │ ← Budget + trattative
├─────────────────────────────────────────┤
│ [Player Search Results Grid]           │ ← Risultati ricerca
├─────────────────────────────────────────┤
│ [Negotiation Panel] (when active)      │ ← Pannello trattative
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `PlayerSearchBar`: Ricerca con filtri avanzati
- `BudgetTracker`: Indicatore budget disponibile
- `ActiveDealsPanel`: Trattative in corso
- `PlayerMarketCard`: Card giocatore con valore
- `NegotiationModal`: Popup trattativa dettagliata
- `ContractDetailsForm`: Form dettagli contrattuali

**Comportamento Dinamico**:
- Ricerca real-time con filtri
- Aggiornamento budget in tempo reale
- Notifiche trattative in corso
- Validazione offerte automatica

**Responsività**:
- Mobile: Lista verticale, modal full-screen
- Tablet: Griglia 2 colonne
- Desktop: Griglia 3 colonne + sidebar
- TV: Griglia espansa, dettagli grandi

**Accessibilità**:
- Filtri accessibili da tastiera
- Risultati navigabili
- Form trattative accessibili
- Feedback vocale per azioni

**Flow Collegati**: `Transfer_Offer`, `Transfer_Process`

---

### 7. CalendarView.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Calendar Navigation] [Current Date]    │ ← Navigazione calendario
├─────────────────────────────────────────┤
│ [Monthly Calendar Grid]                │ ← Griglia mensile
│ ┌─────┬─────┬─────┬─────┬─────┬─────┐   │
│ │  1  │  2  │  3  │  4  │  5  │  6  │   │
│ │     │ ⚽  │     │ 🏃  │     │     │   │
│ └─────┴─────┴─────┴─────┴─────┴─────┘   │
├─────────────────────────────────────────┤
│ [Upcoming Events List]                 │ ← Eventi prossimi
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `CalendarNavigation`: Controlli mese precedente/successivo
- `CalendarGrid`: Griglia giorni con eventi
- `EventIcon`: Icone per tipo evento (partita, allenamento)
- `UpcomingEventsList`: Lista eventi prossimi
- `DayDetailModal`: Popup dettagli giorno
- `AdvanceDayButton`: Pulsante avanzamento

**Comportamento Dinamico**:
- Click su giorno → Modal dettagli
- Navigazione mesi con animazioni
- Evidenziazione eventi importanti
- Avanzamento giorno con conferma

**Responsività**:
- Mobile: Calendario compatto, lista eventi sotto
- Tablet: Calendario normale
- Desktop: Calendario + sidebar eventi
- TV: Calendario grande, eventi laterali

**Accessibilità**:
- Navigazione tastiera nel calendario
- Descrizioni eventi per screen reader
- Focus visibile su giorno selezionato
- Scorciatoie tastiera per navigazione

**Flow Collegati**: `GameFlow_AdvanceDay`, `Calendar_FetchUpcomingEvents`

---

### 8. SessionManager.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Quick Actions Bar]                     │ ← Salva/Carica rapido
├─────────────────────────────────────────┤
│ [Save Slots Grid]                      │ ← Slot salvataggio
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Slot 1  │ │ Slot 2  │ │ Slot 3  │    │
│ │ Active  │ │ Empty   │ │ Backup  │    │
│ └─────────┘ └─────────┘ └─────────┘    │
├─────────────────────────────────────────┤
│ [Session Details Panel]                │ ← Dettagli sessione
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `QuickSaveButton`: Salvataggio rapido
- `SaveSlotCard`: Card slot con preview
- `SessionDetailsPanel`: Dettagli sessione selezionata
- `BackupManager`: Gestione backup automatici
- `LoadConfirmModal`: Conferma caricamento
- `ExportImportTools`: Strumenti esportazione

**Comportamento Dinamico**:
- Preview sessioni al hover
- Conferma prima di sovrascrivere
- Progress bar per operazioni lunghe
- Validazione integrità salvataggi

**Responsività**:
- Mobile: Lista verticale slot
- Tablet: Griglia 2x2 slot
- Desktop: Griglia 3x2 + dettagli
- TV: Griglia espansa, dettagli grandi

**Accessibilità**:
- Navigazione tastiera tra slot
- Descrizioni dettagliate slot
- Conferme accessibili
- Feedback operazioni

**Flow Collegati**: `Session_Save`, `Session_Load`

---

### 9. StaffManagement.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Staff Overview] [Hire New Button]      │ ← Panoramica staff
├─────────────────────────────────────────┤
│ [Staff Members Grid]                   │ ← Griglia membri staff
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Coach   │ │ Scout   │ │ Physio  │    │
│ │ Rating  │ │ Rating  │ │ Rating  │    │
│ └─────────┘ └─────────┘ └─────────┘    │
├─────────────────────────────────────────┤
│ [Performance Tracking]                 │ ← Tracking performance
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `StaffOverviewCard`: Statistiche staff generale
- `StaffMemberCard`: Card membro con competenze
- `CompetencyRadarChart`: Grafico competenze
- `HireStaffModal`: Modal assunzione nuovo staff
- `ContractDetailsPanel`: Dettagli contrattuali
- `PerformanceChart`: Grafico performance nel tempo

**Comportamento Dinamico**:
- Hover su staff → Preview competenze
- Click → Modal dettagli completi
- Filtri per ruolo e competenze
- Tracking performance automatico

**Responsività**:
- Mobile: Lista verticale, card compatte
- Tablet: Griglia 2 colonne
- Desktop: Griglia 3 colonne + dettagli
- TV: Griglia espansa, grafici grandi

**Accessibilità**:
- Navigazione tastiera tra staff
- Grafici con descrizioni testuali
- Form accessibili per assunzioni
- Feedback operazioni

**Flow Collegati**: `Staff_AssignRole`, `Player_Train`

---

### 10. PlayerHistory.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Player Selector] [Time Range Filter]   │ ← Selezione giocatore
├─────────────────────────────────────────┤
│ [Progress Charts]                       │ ← Grafici progressione
│ ┌─────────────────────────────────────┐ │
│ │     Attributes Over Time            │ │
│ │     📈 Chart                        │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [Statistics Table] | [Timeline View]    │ ← Tabella + timeline
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `PlayerSelectorDropdown`: Selezione giocatore
- `TimeRangeFilter`: Filtro periodo temporale
- `AttributeProgressChart`: Grafico evoluzione attributi
- `StatisticsTable`: Tabella statistiche storiche
- `EventTimeline`: Timeline eventi significativi
- `ComparisonTool`: Strumento confronto periodi

**Comportamento Dinamico**:
- Grafici interattivi con zoom
- Filtri real-time senza reload
- Confronto tra giocatori
- Export dati in formato CSV

**Responsività**:
- Mobile: Grafici semplificati, tabelle scrollabili
- Tablet: Layout 2 colonne
- Desktop: Layout completo con sidebar
- TV: Grafici grandi, dati ben visibili

**Accessibilità**:
- Grafici con descrizioni testuali
- Tabelle navigabili da tastiera
- Filtri accessibili
- Dati esportabili per analisi

**Flow Collegati**: `Report_CompileHistory`, `Player_Train`

---

### 11. UserSettings.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ [Settings Categories Tabs]              │ ← Tab categorie
├─────────────────────────────────────────┤
│ [Settings Panel]                        │ ← Pannello impostazioni
│ ┌─────────────────────────────────────┐ │
│ │ 🎨 Appearance                       │ │
│ │ 🔊 Audio                            │ │
│ │ ⚽ Gameplay                         │ │
│ │ ♿ Accessibility                     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [Apply] [Reset] [Export Settings]       │ ← Azioni
└─────────────────────────────────────────┘
```

**Componenti UI**:
- `SettingsTabNavigation`: Navigazione tab categorie
- `SettingsPanel`: Pannello impostazioni attivo
- `ThemeSelector`: Selezione tema (light/dark/auto)
- `LanguageSelector`: Selezione lingua
- `AccessibilityOptions`: Opzioni accessibilità
- `GameplaySettings`: Impostazioni gameplay

**Comportamento Dinamico**:
- Anteprima live cambiamenti tema
- Validazione impostazioni in tempo reale
- Reset a valori default
- Import/export configurazioni

**Responsività**:
- Mobile: Tab verticali, pannelli full-width
- Tablet: Tab orizzontali, pannelli normali
- Desktop: Layout sidebar + contenuto
- TV: Layout espanso, controlli grandi

**Accessibilità**:
- Navigazione tastiera completa
- Descrizioni dettagliate opzioni
- Anteprima accessibilità
- Feedback immediato cambiamenti

**Flow Collegati**: `UserSettings_Apply`

---
### 12. FinanceOverview.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Finanze              │
├─────────────────────────────────────────┤
│ [Budget Tracker]                        │ ← Bilancio economico
├─────────────────────────────────────────┤
│ [Sponsor Banner]                        │ ← Sponsor attivo
├─────────────────────────────────────────┤
│ [Request Board Button]                  │ ← Richiesta fondi
└─────────────────────────────────────────┘
```
**Componenti UI**:
- `BudgetTracker`: Riepilogo spese/entrate mensili
- `SponsorBanner`: Visualizzazione dello sponsor attuale
- `RequestBoardButton`: Invio richiesta alla dirigenza

**Comportamento Dinamico**:
- Variazione sponsor aggiorna il banner
- Avvisi visivi in caso di superamento budget
- Pulsante disabilitato in caso di richiesta recente

**Responsività**:
- Mobile: Stack verticale
- Tablet/Desktop: Layout 2 colonne
- TV: Vista semplificata con grandi indicatori

**Accessibilità**:
- Annunci screen reader per soglie superate
- Focus visibile su budget negativo

**Flow Collegati**: `Finance_Update`, `Board_Evaluate`

---

### 13. Board.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Direzione            │
├─────────────────────────────────────────┤
│ [Board Confidence Panel]                │ ← Fiducia dirigenza
├─────────────────────────────────────────┤
│ [Request Form]                          │ ← Richieste attive/inviate
├─────────────────────────────────────────┤
│ [Dismissal Status]                      │ ← Rischio esonero
└─────────────────────────────────────────┘
```
**Componenti UI**:
- `BoardConfidencePanel`: Indicatore fiducia dirigenza
- `RequestForm`: Form per invio richieste (fondi, stadio, staff)
- `DismissalStatus`: Notifica rischio esonero

**Comportamento Dinamico**:
- Grafico fiducia si aggiorna dopo partite/eventi
- Richieste convalidabili solo se requisiti rispettati
- Rischio esonero visibile in base a prestazioni

**Responsività**:
- Mobile: Pannelli impilati
- Desktop: Grafico + form affiancati
- TV: Informazioni ridotte ma ben leggibili

**Accessibilità**:
- Grafici leggibili da screen reader
- Feedback immediato dopo invio richieste

**Flow Collegati**: `Board_Evaluate`, `User_RequestFunds`

---

### 14. Scouting.page

**Layout Structure**:
```
┌─────────────────────────────────────────┐
│ Breadcrumb: Home > Scout                │
├─────────────────────────────────────────┤
│ [Scout Assignment Panel]                │ ← Assegna scout
├─────────────────────────────────────────┤
│ [Discovery Progress Bar]                │ ← Avanzamento scouting
├─────────────────────────────────────────┤
│ [Shortlist Grid]                        │ ← Giocatori osservati
└─────────────────────────────────────────┘
```
**Componenti UI**:
- `ScoutAssignmentPanel`: Selezione aree o profili da osservare
- `DiscoveryProgressBar`: Stato avanzamento osservazione
- `ShortlistGrid`: Tabella giocatori sotto osservazione
- `ScoutingFilters`: Filtro attributi, nazionalità, ruolo

**Comportamento Dinamico**:
- Progresso visibile con animazione barra
- Filtri avanzati per shortlist
- Notifiche automatiche per nuove scoperte

**Responsività**:
- Mobile: Vista compatta con tab
- Desktop: Pannelli affiancati
- TV: Layout fullscreen con card grandi

**Accessibilità**:
- Filtri con etichette accessibili
- Annunci vocali per aggiornamenti scout

**Flow Collegati**: `Scouting_Update`, `Shortlist_Add`, `Discovery_Complete`

---

## 🎛️ Componenti UI Riutilizzabili

### Cards
- `PlayerCard`: Foto, nome, ruolo, rating, stato
- `PlayerMarketCard`: Card giocatore mercato con valore e club
- `SaveSlotCard`: Anteprima slot salvataggio con stato
- `PlayerRatingCard`: Valutazione numerica 1–10 post-partita
- `TeamCard`: Logo, nome, statistiche, posizione
- `MatchCard`: Squadre, risultato, data
- `StaffCard`: Nome, ruolo, competenze
- `EventCard`: Tipo, descrizione, data

### Forms & Inputs
- `SearchBar`: Ricerca con filtri
- `FilterPanel`: Pannello filtri avanzati
- `FormField`: Campo form con validazione
- `ContractDetailsForm`: Dettagli contratto giocatore/staff
- `RequestForm`: Form invio richieste al board
- `LanguageSelector`: Selettore lingua interfaccia
- `ThemeSelector`: Switch tema chiaro/scuro/auto
- `TimeRangeFilter`: Filtro periodo per storico

- `Slider`: Slider con valori
- `Toggle`: Switch on/off

### Data Display
- `StatChart`: Grafici statistiche
- `ProgressBar`: Barra progresso
- `BudgetTracker`: Bilancio mensile + visual indicator
- `AttributeProgressChart`: Grafico crescita attributi
- `DiscoveryProgressBar`: Stato avanzamento scouting
- `StatsComparisonChart`: Grafico confronto squadre

- `RatingStars`: Stelle valutazione
- `Badge`: Badge stato/categoria
- `Timeline`: Timeline eventi

### Navigation
- `Breadcrumb`: Navigazione gerarchica
- `Pagination`: Paginazione risultati
- `TabNavigation`: Navigazione tab
- `SettingsTabNavigation`: Navigazione nelle Impostazioni
- `ScoutAssignmentPanel`: Assegna scout a zona/target
- `CalendarNavigation`: Navigazione mesi calendario
- `Sidebar`: Menu laterale
- `TopBar`: Barra superiore

### Feedback
- `Modal`: Popup modal
- `Toast`: Notifiche temporanee
- `LoadingSpinner`: Indicatore caricamento
- `ConfirmDialog`: Dialog conferma
- `RequestBoardButton`: Azione trigger richiesta fondi
- `LoadConfirmModal`: Conferma caricamento sessione
- `ExportReportButton`: Azione esportazione analisi
- `ErrorMessage`: Messaggi errore

---

## 🎨 Microinterazioni

### Hover Effects
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--primary-dark);
  transform: scale(1.02);
}
```

### Focus States
```css
.focusable:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

:focus-visible {
  outline: 2px solid var(--accent);
}
```

### Loading States
```css
.loading {
  position: relative;
  overflow: hidden;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.5s infinite;
}
```

### State Transitions
```css
.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.tab-active {
  border-bottom: 2px solid var(--primary);
  font-weight: 600;
}
```

---

## ♿ Accessibilità Avanzata

### Navigazione Tastiera
- **Tab Order**: Logico e prevedibile
- **Skip Links**: "Salta al contenuto principale"
- **Focus Trap**: Modal e dropdown
- **Escape Routes**: Sempre disponibili

### Screen Reader Support
```html
<div role="button" aria-label="Gioca partita contro Inter" tabindex="0">
  <span aria-hidden="true">⚽</span>
  Gioca Partita
</div>

<div aria-live="polite" aria-atomic="true">
  Gol di Rossi al 23° minuto!
</div>
```

### Contrasto e Visibilità
- **Contrasto Minimo**: 4.5:1 per testo normale
- **Contrasto Potenziato**: 7:1 per testo piccolo
- **Focus Visibile**: Sempre presente e chiaro
- **Dimensioni Target**: Minimo 44px per touch

### Opzioni Personalizzazione
- **Riduzione Animazioni**: `prefers-reduced-motion`
- **Alto Contrasto**: Modalità dedicata
- **Dimensioni Testo**: Scalabili fino a 200%
- **Navigazione Semplificata**: Modalità essenziale

---

## 📱 Ottimizzazioni Mobile

### Touch Interactions
- **Target Size**: Minimo 44px
- **Spacing**: 8px tra elementi toccabili
- **Feedback Tattile**: Vibrazione per azioni importanti
- **Swipe Gestures**: Navigazione naturale

### Performance Mobile
- **Lazy Loading**: Immagini e componenti
- **Virtual Scrolling**: Liste lunghe
- **Debounced Search**: Ricerca ottimizzata
- **Offline Support**: Funzionalità base offline

### Mobile-Specific Features
- **Pull to Refresh**: Aggiornamento dati
- **Bottom Sheet**: Modal da bottom
- **Floating Action Button**: Azione principale
- **Safe Area**: Rispetto notch e home indicator

---

## 📺 Ottimizzazioni Smart TV

### TV-Specific Layout
- **Overscan Safe**: Margini sicuri 5%
- **Large Text**: Minimo 20px
- **High Contrast**: Colori vividi
- **Simple Navigation**: Griglia 4-direzionale

### Remote Control Support
```javascript
// Gestione telecomando
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp': navigateUp(); break;
    case 'ArrowDown': navigateDown(); break;
    case 'ArrowLeft': navigateLeft(); break;
    case 'ArrowRight': navigateRight(); break;
    case 'Enter': activateElement(); break;
    case 'Escape': goBack(); break;
  }
});

```

### TV UX Patterns
- **Focus Management**: Focus sempre visibile
- **Spatial Navigation**: Navigazione intuitiva
- **Large Targets**: Elementi grandi e spaziati
- **Clear Hierarchy**: Struttura visiva forte

```css
.tv-focus:focus {
  outline: 3px solid yellow;
  transform: scale(1.05);
}
```
---

## 🎯 Linee Guida Globali

### Spacing Consistency
- **Micro**: 4px (padding interni)
- **Small**: 8px (spacing elementi)
- **Medium**: 16px (spacing sezioni)
- **Large**: 24px (spacing maggiori)
- **XLarge**: 32px+ (spacing layout)

### Border Radius
- **Small**: 4px (badge, tag)
- **Medium**: 8px (button, input)
- **Large**: 12px (card, modal)
- **Round**: 50% (avatar, icon button)

### Shadows
```css
.shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.shadow-md { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
```

### Animation Timing
- **Fast**: 150ms (hover, focus)
- **Normal**: 250ms (transitions)
- **Slow**: 400ms (layout changes)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`

### Breakpoints
```css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1920px) { /* TV */ }
```

---

*Documentazione UI aggiornata al: Giugno 2025*  
*Versione design system: 1.1*  
*Compatibilità: Mobile, Tablet, Desktop, Smart TV*