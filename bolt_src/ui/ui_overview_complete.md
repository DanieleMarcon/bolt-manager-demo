# 🎨 UI Overview - Allenatore Nato

Questa documentazione descrive l'organizzazione del layout, i componenti principali e le linee guida di accessibilità per ciascuna pagina dell’app Allenatore Nato.

---

## Dashboard (`Dashboard.page.js`)
**Layout**  
- Due colonne principali:
  - Colonna sinistra: schede riepilogo (TeamSummary, FinancialOverview, UpcomingMatches)
  - Colonna destra: news ticker e azioni rapide  
**Componenti**  
- `QuickActions` (bottoni Nuova Partita, Carica, Salva)
- `TeamSummaryCard` (stato rosa e morale)
- `FinancialOverviewCard` (bilancio e trend)
- `UpcomingMatchesList` (prossime partite)
- `NewsTicker` (notizie recenti)  
**Accessibilità**  
- ARIA landmark (`<main role="main">`, `<section aria-labelledby>`)
- Ordine tab coerente con layout
- Etichette `aria-label` sui pulsanti icona  

---

## Prossima Partita (`NextMatch.page.js`)
**Layout**  
- Sezione header con logo avversario e data/ora
- Griglia 2x2: Lineup preview, statistiche pre-match, tattica consigliata, azioni  
**Componenti**  
- `MatchHeader` (nome squadre, data)
- `LineupPreview` (scheda formazione)
- `TacticalFormationDisplay`
- `StatsPreview` (dati performance)
- `ActionButtons` (Simula Partita, Modifica Formazione)  
**Accessibilità**  
- Utilizzo di `<figure>`/`<figcaption>` per lineup
- Pulsanti con `aria-pressed` per selezione tattica
- Descrizioni testuali alternative per grafici  

---

## Risultati (`Results.page.js`)
**Layout**  
- Toolbar in alto con filtri (data, competizione)
- Tabella responsiva dei risultati  
**Componenti**  
- `ResultsTable` (thead/tbody semantico)
- `FilterControls` (dropdown, datepicker)
- `Pagination`  
- `ExportButton` (scarica CSV)  
**Accessibilità**  
- Ruolo `table` e intestazioni `<th scope="col">`
- Ordinamento colonne accessibile (`aria-sort`)
- Annunci screen reader su cambio pagina  

---

## Programmi Allenamento (`TrainingPrograms.page.js`)
**Layout**  
- Elenco vertical list di programmi
- Sezione dettaglio a comparsa (modal)  
**Componenti**  
- `ProgramCard` (titolo, descrizione, durata)
- `StartProgramButton`
- `FilterTabs` (tipo allenamento)
- `SearchInput`  
**Accessibilità**  
- Liste con `role="list"` / `role="listitem"`
- Modal con `role="dialog"` e focus trap
- Campi input con `aria-label`  

---

## Progressi Allenamento (`TrainingProgress.page.js`)
**Layout**  
- Split view:
  - Sinistra: lista sessioni
  - Destra: grafico progressi  
**Componenti**  
- `SessionList` (elenco sessioni)
- `ProgressChart` (grafico a linee)
- `CompletionBadge`  
**Accessibilità**  
- Grafico con `aria-describedby` e descrizione testuale
- Elementi lista focusabili con `tabindex="0"`  

---

## Schemi Tattici (`TacticalSchemes.page.js`)
**Layout**  
- Griglia di carte dei vari schemi
- Dettagli espandibili on hover o click  
**Componenti**  
- `SchemeCard` (anteprima formazione)
- `PreviewPopup`
- `ApplyButton`  
**Accessibilità**  
- `role="grid"` / `role="gridcell"` per griglia
- Popup con `aria-modal="true"`  

---

## Ruoli Tattici (`TacticalRoles.page.js`)
**Layout**  
- Lista a due colonne: ruolo e descrizione
- Icone affiancate  
**Componenti**  
- `RoleItem` (icona + nome)
- `DescriptionPanel`  
**Accessibilità**  
- Lista con `role="list"`
- Elementi con `aria-labelledby`  

---

## Trattative (`Negotiations.page.js`)
**Layout**  
- Colonna sinistra: elenco trattative
- Colonna destra: dettaglio selezionato  
**Componenti**  
- `NegotiationList` (item con stato)
- `DetailPanel` (dati trattativa)
- `OfferForm` (input offerte)
- `StatusBadge`  
**Accessibilità**  
- Form con `<label for>`
- Badge con `role="status"`  

---

## Contratti (`Contracts.page.js`)
**Layout**  
- Tabella contratti
- Pannello azioni in alto  
**Componenti**  
- `ContractsTable`
- `RenewButton`
- `BreakdownPanel` (dettaglio clausole)  
**Accessibilità**  
- Intestazioni tabella con `<th>`
- Azioni con `aria-label`  

---

## Press Center (`PressCenter.page.js`)
**Layout**  
- Barra filtri in alto
- Lista news a schede  
**Componenti**  
- `NewsFilterBar`
- `NewsList`
- `Pagination`
- `ArticleModal`  
**Accessibilità**  
- Modal con `role="dialog"` e focus trap
- Lista news con `role="list"`  

---

## Shortlist (`Shortlist.page.js`)
**Layout**  
- Griglia di carte giocatore
- Funzione drag & drop per riordino  
**Componenti**  
- `PlayerCard`
- `RemoveButton`
- `QuickView`  
**Accessibilità**  
- Carte con `role="button"`
- Drag target con `aria-grabbed`  

---

## Report Scout (`ScoutingReports.page.js`)
**Layout**  
- Elenco verticale report
- Sezione filtro a lato  
**Componenti**  
- `ReportCard`
- `DownloadButton`
- `SearchFilter`  
**Accessibilità**  
- Carte con `role="article"`
- Bottone download con `aria-label`  

---

## Statistiche Squadra (`TeamStats.page.js`)
**Layout**  
- Dashboard con grafici multipli
- Toolbar filtro  
**Componenti**  
- `StatsChart` (bar, line)
- `FilterDropdown`
- `ExportCSV`  
**Accessibilità**  
- Grafici con `aria-labelledby`
- Dropdown con `aria-expanded`  

---

## Morale Squadra (`TeamMorale.page.js`)
**Layout**  
- Indicatore in alto
- Timeline morale sotto  
**Componenti**  
- `MoraleGauge`
- `MoraleTimeline`
- `AdvicePanel`  
**Accessibilità**  
- Gauge con `role="progressbar"`
- Timeline con descrizione testuale  

---

## 📱 Responsive & Breakpoints
- Sidebar nascosta sotto 768px
- Menu hamburger con `aria-controls`
- Componenti collapsible con `aria-hidden`

---

*Documentazione aggiornata al: Giugno 2025*  
*Versione UI Overview: 1.0*  
