# 📊 Dataset Bolt Manager - Documentazione Tecnica

Questa documentazione descrive tutti i dataset utilizzati nel progetto **Bolt Manager 01/02**, un gioco manageriale calcistico sviluppato interamente con Bolt.new.

## 🏗️ Architettura Dataset

I dataset sono progettati per essere:
- **Modulari**: Ogni entità ha il suo dataset specifico
- **Relazionali**: Collegamenti chiari tramite campi `Ref`
- **Scalabili**: Struttura ottimizzata per crescita futura
- **Performanti**: Tipi di dati appropriati per ogni uso

---

## 📋 Lista Dataset

### 1. **teams** - Squadre del Campionato
**Scopo**: Gestione completa delle squadre con statistiche, budget e stato
**Relazioni**: 
- Referenziato da `players.team_id`
- Referenziato da `matches.home_team_id` e `away_team_id`
- Referenziato da `user_sessions.user_team_id`

**Campi chiave**:
- Statistiche campionato (punti, vittorie, gol)
- Budget e gestione finanziaria
- Morale e stato squadra
- Flag per squadra utente

**Utilizzo nei Flow**: `Match_Simulate`, `League_Table`, `Team_Management`

---

### 2. **players** - Giocatori
**Scopo**: Gestione completa dei giocatori con attributi, statistiche e stato
**Relazioni**:
- `team_id` → `teams.id`
- Referenziato da `transfers.player_id`
- Referenziato da `attributes_history.player_id`

**Campi chiave**:
- Attributi calcistici (pace, shooting, passing, etc.)
- Stato fisico (stamina, fitness, infortuni)
- Statistiche stagionali (gol, assist, cartellini)
- Dati contrattuali e valore di mercato

**Utilizzo nei Flow**: `Match_Simulate`, `Training_Process`, `Transfer_Market`

---

### 3. **matches** - Partite
**Scopo**: Gestione calendario partite con risultati e dettagli
**Relazioni**:
- `home_team_id` → `teams.id`
- `away_team_id` → `teams.id`
- `match_report_id` → `match_reports.id`

**Campi chiave**:
- Informazioni base (squadre, data, giornata)
- Risultati e formazioni
- Sostituzioni e lineup
- Condizioni esterne (meteo, arbitro, pubblico)

**Utilizzo nei Flow**: `Match_Simulate`, `Calendar_Advance`, `League_Fixtures`

---

### 4. **user_sessions** - Sessioni di Gioco
**Scopo**: Gestione salvataggi multipli e stato di gioco dell'utente
**Relazioni**:
- `user_team_id` → `teams.id`

**Campi chiave**:
- Informazioni sessione (nome, squadra, stagione)
- Stato di avanzamento (giornata, data, budget)
- Impostazioni di gioco (difficoltà, velocità)
- Dati completi di salvataggio in JSON

**Utilizzo nei Flow**: `Save_Game`, `Load_Game`, `Session_Manager`

---

### 5. **tactics** - Schemi Tattici
**Scopo**: Gestione formazioni e impostazioni strategiche
**Relazioni**:
- `team_id` → `teams.id`
- `captain_id` → `players.id`
- `penalty_taker_id` → `players.id`
- `free_kick_taker_id` → `players.id`
- `corner_taker_id` → `players.id`

**Campi chiave**:
- Modulo e mentalità
- Impostazioni tattiche (pressing, ritmo, ampiezza)
- Posizioni e ruoli giocatori
- Specialisti per calci piazzati

**Utilizzo nei Flow**: `Match_Simulate`, `Tactical_Setup`, `Team_Preparation`

---

### 6. **trainings** - Allenamenti
**Scopo**: Gestione sessioni di allenamento e sviluppo giocatori
**Relazioni**:
- `team_id` → `teams.id`
- `staff_id` → `staff.id`

**Campi chiave**:
- Tipo e intensità allenamento
- Partecipanti e programmi individuali
- Condizioni e qualità strutture
- Risultati e impatti (fitness, morale, infortuni)

**Utilizzo nei Flow**: `Training_Process`, `Player_Development`, `Weekly_Schedule`

---

### 7. **transfers** - Operazioni di Mercato
**Scopo**: Gestione completa del mercato trasferimenti
**Relazioni**:
- `player_id` → `players.id`
- `from_team_id` → `teams.id`
- `to_team_id` → `teams.id`

**Campi chiave**:
- Dettagli trasferimento (tipo, costo, durata)
- Termini contrattuali (stipendio, bonus, clausole)
- Stato negoziazione e storico offerte
- Gestione prestiti e opzioni

**Utilizzo nei Flow**: `Transfer_Market`, `Contract_Negotiation`, `Market_Updates`

---

### 8. **game_events** - Eventi di Gioco
**Scopo**: Sistema di notifiche e cronologia eventi
**Relazioni**:
- `team_id` → `teams.id` (opzionale)
- `player_id` → `players.id` (opzionale)
- `match_id` → `matches.id` (opzionale)

**Campi chiave**:
- Classificazione eventi (tipo, categoria, priorità)
- Entità correlate e descrizioni
- Gestione lettura e scadenza
- Azioni richieste all'utente

**Utilizzo nei Flow**: `Event_Generator`, `Notification_System`, `Game_Timeline`

---

### 9. **match_reports** - Report Partite
**Scopo**: Statistiche dettagliate e analisi post-partita
**Relazioni**:
- `match_id` → `matches.id`
- `man_of_the_match` → `players.id`

**Campi chiave**:
- Eventi cronologici della partita
- Statistiche complete (possesso, tiri, passaggi)
- Valutazioni individuali giocatori
- Analisi tattica e momenti chiave

**Utilizzo nei Flow**: `Match_Simulate`, `Match_Analysis`, `Statistics_Display`

---

### 10. **staff** - Staff Tecnico
**Scopo**: Gestione staff tecnico e dirigenziale
**Relazioni**:
- `team_id` → `teams.id`

**Campi chiave**:
- Informazioni personali e ruolo
- Competenze specifiche per ruolo
- Dati contrattuali e reputazione
- Bonus e specializzazioni

**Utilizzo nei Flow**: `Training_Process`, `Staff_Management`, `Team_Performance`

---

### 11. **attributes_history** - Storico Attributi
**Scopo**: Tracciamento evoluzione giocatori nel tempo
**Relazioni**:
- `player_id` → `players.id`
- `training_id` → `trainings.id` (opzionale)
- `match_id` → `matches.id` (opzionale)

**Campi chiave**:
- Snapshot completo attributi
- Motivo e fonte del cambiamento
- Dettaglio modifiche per attributo
- Metadati temporali e stagionali

**Utilizzo nei Flow**: `Player_Development`, `Statistics_Analysis`, `Progress_Tracking`

---

### 12. **morale_status** - Stato Morale
**Scopo**: Gestione complessa del morale di giocatori e squadre
**Relazioni**:
- `entity_id` può riferirsi a `players.id` o `teams.id`

**Campi chiave**:
- Morale attuale e base
- Fattori di influenza multipli
- Tendenze e velocità di recupero
- Eventi significativi recenti

**Utilizzo nei Flow**: `Morale_Calculator`, `Team_Chemistry`, `Performance_Analysis`

---

### 13. **user_settings** - Impostazioni Utente
**Scopo**: Personalizzazione completa dell'esperienza utente
**Relazioni**: Nessuna (dataset indipendente)

**Campi chiave**:
- Preferenze interfaccia (lingua, tema, formato)
- Impostazioni gioco (velocità, dettaglio, audio)
- Configurazioni avanzate (accessibilità, privacy)
- Stato tutorial e personalizzazioni UI

**Utilizzo nei Flow**: Utilizzato in tutte le interfacce, `Settings_Manager`, `UI_Customization`

---

---

### 14. **finances** - Situazione Finanziaria del Club  
**Scopo**: Tracciamento economico dettagliato della squadra  
**Relazioni**:
- `team_id` → `teams.id`
- `sponsor_id` → `sponsors.id` (opzionale)

**Campi chiave**:
- Budget attuale e bilanci mensili
- Entrate (sponsor, stadio, competizioni)
- Uscite (ingaggi, trasferimenti, spese operative)
- Grafico andamento economico e cashflow

**Utilizzo nei Flow**: `Finance_Update`, `Transfer_Process`, `Board_Evaluate`

---

### 15. **board_feedback** - Feedback e Valutazioni del Board  
**Scopo**: Stato fiducia della dirigenza e gestione richieste utente  
**Relazioni**:
- `team_id` → `teams.id`
- `user_id` → `user_sessions.id`

**Campi chiave**:
- Fiducia tecnica, economica, reputazionale
- Cronologia richieste (esito, tipo, data)
- Stato rischio esonero
- Obiettivi stagionali e valutazioni

**Utilizzo nei Flow**: `Board_Evaluate`, `User_RequestFunds`

---

### 16. **scouting_accuracy** - Accuratezza degli Scout  
**Scopo**: Tracciamento precisione delle valutazioni scouting  
**Relazioni**:
- `player_id` → `players.id`
- `scout_id` → `staff.id`

**Campi chiave**:
- Differenza tra valutazione stimata e reale
- Grado mascheramento residuo
- Esperienza e competenza dello scout
- Affidabilità area geografica

**Utilizzo nei Flow**: `Scouting_Update`, `Discovery_Complete`

---

### 17. **shortlist** - Lista Giocatori Osservati  
**Scopo**: Gestione personalizzata dei giocatori in osservazione  
**Relazioni**:
- `player_id` → `players.id`
- `user_id` → `user_sessions.id`

**Campi chiave**:
- Priorità (alta, media, bassa)
- Note scout o utente
- Stato osservazione e accuratezza stimata
- Data inserimento in lista

**Utilizzo nei Flow**: `Shortlist_Add`, `Scouting_Update`

---

### 18. **attribute_masking** - Mascheramento Attributi  
**Scopo**: Simulazione incertezza scouting  
**Relazioni**:
- `player_id` → `players.id`
- `user_id` → `user_sessions.id`

**Campi chiave**:
- % mascheramento per attributo (0-100%)
- Provenienza del dato (partita, osservazione, rumor)
- Data ultimo aggiornamento
- Attendibilità stimata

**Utilizzo nei Flow**: `Scouting_Discover`, `AttributeReveal`, `Match_Scouting`

---

### 19. **discovery_level** - Stato di Scoperta del Giocatore  
**Scopo**: Progresso osservazione individuale nel tempo  
**Relazioni**:
- `player_id` → `players.id`
- `scout_id` → `staff.id`

**Campi chiave**:
- Stato: non visto / in osservazione / osservato completamente
- Progresso % su attributi tecnici, mentali, fisici
- Partite osservate e report generati
- Area geografica e fonte dati

**Utilizzo nei Flow**: `Discovery_Complete`, `Scouting_Update`, `Scout_Assignment`

---

### 20. **press_releases** - Comunicati Stampa di Gioco  
**Scopo**: Archivio dei messaggi dinamici generati dagli eventi del mondo di gioco  
**Relazioni**:
- `team_id` → `teams.id` *(opzionale)*
- `player_id` → `players.id` *(opzionale)*
- `match_id` → `matches.id` *(opzionale)*

**Campi chiave**:
- Tipo comunicato (infortunio, dichiarazione, esonero, evento storico)
- Contenuto testuale dinamico
- Data generazione ed entità coinvolte
- Letto/non letto, urgenza

**Utilizzo nei Flow**: `Event_Generator`, `Notification_System`, `Press_Center_Display`

---

## 🔄 Flussi di Popolazione Dati

### Inizializzazione Gioco
1. **teams**: Generazione squadre campionato
2. **players**: Creazione rose complete
3. **staff**: Assegnazione staff tecnico
4. **matches**: Calendario stagionale
5. **user_settings**: Impostazioni default

### Durante il Gioco
- **trainings**: Creati dall'utente settimanalmente
- **transfers**: Generati da trattative di mercato
- **game_events**: Creati automaticamente da tutti i Flow
- **match_reports**: Generati dopo ogni partita
- **attributes_history**: Aggiornato dopo allenamenti/partite
- **morale_status**: Aggiornato dopo eventi significativi
- **finances**: Aggiornato a ogni evento economico (ingaggio, premio, spesa)
- **board_feedback**: Aggiornato dopo partite, richieste e milestone
- **scouting_accuracy**: Aggiornato ogni volta che uno scout osserva un giocatore
- **discovery_level**: Progresso scout durante incarichi
- **attribute_masking**: Ridotto con osservazione o prestazioni
- **shortlist**: Modificato tramite interfaccia scouting
- **press_releases**: Generato in automatico dopo eventi rilevanti


### Salvataggio/Caricamento
- **user_sessions**: Aggiornato ad ogni salvataggio automatico/manuale

---

## 🎯 Best Practices

### Relazioni
- Usa sempre campi `Ref` per collegamenti tra dataset
- Mantieni coerenza nei nomi degli ID (`team_id`, `player_id`, etc.)
- Evita riferimenti circolari complessi

### Performance
- Usa `Array` per liste semplici, `Ref` per entità complesse
- Limita l'uso di `LongText` ai casi necessari
- Implementa indici logici tramite campi numerici

### Manutenzione
- Ogni dataset ha `created_at` e `updated_at`
- Usa flag booleani per stati attivi/inattivi
- Mantieni storico tramite dataset dedicati (es. `attributes_history`)

### Scalabilità
- Progetta per supportare più stagioni/campionati
- Usa campi `season` per partizionamento temporale
- Implementa soft-delete tramite flag invece di cancellazioni

### Naming
- Usa nomi al singolare per oggetti (`player`, `team`)
- Usa nomi al plurale per dataset (`players`, `teams`)
- Prefissa campi temporali con `created_`, `updated_`, `completed_`

---

## 🚀 Utilizzo in Bolt.new

### Nei Flow
```javascript
// Esempio: Ottenere giocatori di una squadra
const teamPlayers = await bolt.data.players.filter({
  team_id: currentTeamId,
  injury_status: "healthy"
});
```

### Nei Component
```javascript
// Esempio: Mostrare statistiche squadra
const teamStats = await bolt.data.teams.get(teamId);
return `${teamStats.wins}W-${teamStats.draws}D-${teamStats.losses}L`;
```

### Nelle Pages
```javascript
// Esempio: Lista trasferimenti recenti
const recentTransfers = await bolt.data.transfers.filter({
  is_user_involved: true,
  negotiation_status: "completed"
}).sort({ completed_at: -1 }).limit(10);
```

---

## 📈 Roadmap Dataset

### Versione 1.1 (completata)
- [x] `finances`
- [x] `board_feedback`
- [x] `scouting_accuracy`
- [x] `shortlist`
- [x] `attribute_masking`
- [x] `discovery_level`
- [x] `press_releases`

### Versione 1.2 (prossima)
- [ ] `youth_academy` - Settore giovanile
- [ ] `competitions` - Coppe e tornei
- [ ] `media_coverage` - Copertura mediatica
- [ ] `fan_base` - Base tifosi e marketing
- [ ] `facilities` - Infrastrutture avanzate

### Versione 2.0
- [ ] `multiplayer_sessions` - Modalità multiplayer
- [ ] `custom_leagues` - Campionati personalizzati
- [ ] `mod_support` - Supporto modifiche utente


---

*Documentazione aggiornata al: Giugno 2025*  
*Versione dataset: 1.1*  
*Compatibilità Bolt.new: Tutte le versioni*