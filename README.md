# ⚽ Bolt Manager 01/02 – Demo

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
├── flows/ → Logica di gioco (match engine, training…)
├── pages/ → Interfacce per ogni sezione del gioco
├── datasets/ → Modelli dati persistenti (team, player…)
├── components/ → Componenti UI (PlayerCard, MatchStats…)
├── storage/ → Variabili e salvataggi Bolt

dist/
├── index.html, main.js, style.css → Web app esportata
├── assets/icons/, logos/, json/ → Risorse statiche

deploy/
├── README_DEPLOY.md → Istruzioni deploy (es. SiteGround)
├── deploy.sh → Automazione futura (es. CI/CD)

---

## 🧱 Moduli principali

- **Gestione Squadra**: rosa, ruoli, filtri, stato e morale
- **Allenamento**: routine settimanali, crescita, stanchezza
- **Tattiche**: moduli, mentalità, marcature, ruoli
- **Partite**: engine testuale, eventi, sostituzioni, report
- **Mercato**: offerte, contratti, clausole, scouting
- **Calendario**: avanzamento giorno/turno, eventi automatici
- **Salvataggi**: gestione sessioni, backup, quickload

---

## 🎨 UX/UI

- Design system personalizzato
- CSS nativo `dist/style.css` compatibile con Bolt.new
- Responsive 100% (mobile, tablet, desktop, Smart TV)
- Accessibilità completa (focus, tastiera, ARIA, contrasto)
- 50+ componenti UI riutilizzabili
- Documentazione in `bolt_src/ui/ui_overview.md`

---

## 🔄 Flusso di lavoro

1. Costruzione Flussi + Pages in Bolt.new
2. Salvataggio nel repo (`bolt_src/`)
3. Esportazione HTML/CSS/JS → `dist/`
4. Deploy manuale (es. FTP) o CI/CD automatico
5. Versionamento e backup via GitHub

---

## ☁️ Hosting consigliato

- 🔹 **SiteGround**: upload in `public_html/`
- 🔹 **GitHub Pages** o **Netlify** per versioni statiche rapide
- ✅ `dist/` contiene tutto il necessario

---

## 🧭 Roadmap

🔗 La roadmap completa e aggiornata è disponibile nel file [`roadmap.md`](./roadmap.md)

---

## 🔧 Requisiti per collaborare

- ✅ Account su [Bolt.new](https://bolt.new)
- ✅ Nozioni base di Bolt Flows e Pages
- ✅ Git + GitHub per versionamento
- ✅ Editor consigliato: VS Code

---

## ✅ Obiettivo finale

Una **demo funzionante** di un manageriale calcistico completo, esportabile, riutilizzabile, facilmente estendibile e compatibile con qualsiasi hosting. Pronto per evolversi in progetto commerciale, educativo o open-source.