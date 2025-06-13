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
├── index.html → Interfaccia principale
├── main.js → Logica routing e eventi utente
├── style.css → Design System globale
├── assets/ → Icone, loghi, immagini statiche

deploy/
├── README_DEPLOY.md → Istruzioni deploy (es. SiteGround)
├── deploy.sh → Automazione futura (es. CI/CD)

yaml
Copia
Modifica

---

## 🧱 Moduli principali

- **Gestione Squadra**: rosa, ruoli, filtri, stato e morale
- **Allenamento**: routine settimanali, crescita, stanchezza
- **Tattiche**: moduli, mentalità, marcature, ruoli
- **Partite**: engine testuale, eventi, sostituzioni, report
- **Mercato**: offerte, contratti, clausole, scouting
- **Scouting**: mascheramento, precisione, shortlist, report
- **Direzione**: finanze, sponsor, obiettivi board
- **Notizie**: comunicati dinamici, eventi, notifiche
- **Storico**: andamento attributi, prestazioni, timeline
- **Sistema**: salvataggi, impostazioni utente

---

## 🎨 UX/UI

- Design system personalizzato e documentato
- CSS nativo (`dist/style.css`) con componenti globali
- Responsive 100% (mobile, tablet, desktop, Smart TV)
- Accessibilità completa (focus, tastiera, ARIA, contrasto)
- 50+ componenti UI riutilizzabili
- Documentazione in `bolt_src/ui/ui_overview.md`

---

## 🔄 Flusso di lavoro

1. Sviluppo in Bolt.new (Flows, Datasets, Pages, Components)
2. Esportazione in `/dist` (HTML + JS + CSS)
3. Deploy manuale (es. FTP su SiteGround) o CI/CD GitHub
4. Aggiornamento documentazione in `*.md`
5. Versionamento via Git

---

## ☁️ Hosting consigliato

- 🔹 **SiteGround**: upload diretto in `public_html/`
- 🔹 **GitHub Pages**: hosting gratuito per versioni statiche
- 🔹 **Netlify**: deploy CI/CD con anteprime automatiche

✅ Il contenuto della cartella `dist/` è completo e autonomo.

---

## 📄 Documentazione tecnica

La documentazione completa è suddivisa in sezioni:

- `modules_overview.md` → panoramica moduli principali
- `datasets_overview.md` → struttura e relazioni dataset
- `flows_overview.md` → logica di gioco e flussi interni
- `ui_overview.md` → layout, componenti e accessibilità
- `roadmap.md` → milestone e obiettivi futuri

---

## 🔧 Requisiti per collaborare

- ✅ Account su [Bolt.new](https://bolt.new)
- ✅ Familiarità con Bolt Flows, Datasets e Pages
- ✅ Conoscenza Git + GitHub per versionamento
- ✅ Editor consigliato: **VS Code**

---

## ✅ Obiettivo finale

Una **demo funzionante e completa** di un manageriale calcistico moderno, progettata per essere:

- Esportabile e deployabile ovunque
- Modulare e documentata
- Pronta per diventare un progetto **commerciale**, **educativo** o **open-source**

---

*Aggiornato a: Giugno 2025*  
*Versione: 1.1*  
*Compatibilità: Bolt.new latest + tutti i browser moderni*