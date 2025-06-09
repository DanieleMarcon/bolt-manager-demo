# ⚽ Bolt Manager 01/02 - Demo

Web app manageriale calcistica realizzata interamente con **Bolt.new**, pensata per offrire un'esperienza moderna, scalabile e totalmente no-code.

---

## 🚀 Obiettivo

Ricreare in Bolt.new le logiche fondamentali di un gioco manageriale old school, mantenendo la profondità simulativa e adottando una UI moderna e giovane adatta al web del 2025.

---

## 📐 Architettura

Costruita interamente con tecnologie native Bolt:

- 🔧 **Bolt Flows** per logiche di gioco (simulazioni, avanzamenti, azioni)
- 📄 **Bolt Pages** per ogni sezione gestionale (rosa, match, mercato…)
- 📊 **Bolt Datasets** per modellazione dati persistenti (team, player, match…)
- 🧩 **Bolt Components** per UI riutilizzabile
- 💾 **Bolt Storage** per salvataggi utente (sessione e permanenti)

### 📁 Struttura progetto
bolt_src/
├── flows/ → Logica di gioco (match engine, training, calendario…)
├── pages/ → Interfacce utente per ogni sezione del gioco
├── datasets/ → Modelli dati persistenti per entità core
├── components/ → UI riutilizzabili (PlayerCard, MatchStatsBox…)
├── storage/ → Variabili e salvataggi Bolt (user/session/global)

dist/
├── index.html, main.js, style.css → Export finale della web app
├── assets/icons/, logos/, json/ → Risorse statiche organizzate

deploy/
├── README_DEPLOY.md → Istruzioni per deploy su SiteGround o simili
├── deploy.sh → Script per automazione futura (es. CI/CD)

---

## 🧱 Moduli principali

- **Gestione Squadra**: rosa, ruoli, filtri, stato e morale
- **Allenamento**: routine settimanali, crescita, stanchezza
- **Tattiche**: moduli, mentalità, marcature, ruoli
- **Partite**: engine testuale, eventi, sostituzioni, report
- **Mercato**: offerte, contratti, clausole, scouting
- **Calendario**: avanzamento giorno/turno, eventi automatici

---

## 🔄 Flusso di lavoro

1. Creazione interfacce e flussi in Bolt.new
2. Salvataggio logica e UI nel repo (`bolt_src/`)
3. Esportazione HTML/CSS/JS → `dist/`
4. Deploy manuale (FTP) o automatizzato (CI/CD) su hosting
5. Versionamento e collaborazione tramite GitHub

---

## ☁️ Hosting consigliato

- 🔹 **SiteGround**: upload in `public_html/`
- 🔹 **GitHub Pages** o **Netlify** per versioni statiche rapide
- 🔹 `dist/` contiene tutto il necessario per deploy immediato

---

## 📅 Roadmap

- [x] Impostazione repo e struttura
- [ ] Definizione completa dei dataset
- [ ] Implementazione flussi principali (partita, allenamento, mercato)
- [ ] UI moderna e accessibile ispirata all’originale
- [ ] Sistema di salvataggio e caricamento user-friendly
- [ ] Esportazione JSON e supporto multi-slot

---

## 🔧 Requisiti minimi per collaborare

- ✅ Account su [Bolt.new](https://bolt.new)
- ✅ Nozioni base di Bolt Flows e struttura modularizzata
- ✅ Git + GitHub per gestione versioni
- ✅ Editor consigliato: VS Code o simili

---

## ✅ Obiettivo finale

Una **demo funzionante** di un manageriale calcistico completo, esportabile, riutilizzabile, facilmente estendibile e compatibile con qualsiasi hosting. Pronto per evolversi in progetto commerciale, educativo o open-source.

