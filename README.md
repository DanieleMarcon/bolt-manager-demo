# ⚽ Bolt Manager 01/02 - Demo

Web app manageriale calcistica ispirata a Championship Manager 01/02. Costruita interamente con Bolt.new.

## 🚀 Obiettivo
Ricreare le logiche fondamentali di un gioco manageriale old school, con UI moderna e UX ottimizzata per il web.

## 📐 Architettura
- 🔧 Costruzione con Bolt Flows, Pages, Components, Datasets
- 💾 Salvataggi persistenti via Bolt Storage e JSON export
- 🔗 Esportabile come web app statica su qualsiasi hosting (es. SiteGround)

## 🗂️ Struttura progetto
- `bolt_src/` → Sorgente logico: Flussi, Pagine, Dataset
- `dist/` → Esportazione web finale (da caricare su server)
- `deploy/` → Materiale per hosting o deploy automatico

## 🧱 Moduli principali
- Gestione Rosa e Attributi
- Allenamento settimanale
- Tattiche personalizzate
- Simulazione partite testuali
- Mercato trasferimenti
- Avanzamento calendario con eventi dinamici

## 🔄 Flusso di lavoro
1. Costruzione e test in Bolt.new
2. Esportazione → `dist/`
3. Deploy manuale (o script) verso hosting
4. Tracciamento Git su tutto il codice e stato logico

## ☁️ Hosting consigliato
- SiteGround: cartella pubblica `/public_html/`
- Caricare tutto il contenuto di `dist/`

## 📅 Roadmap
- [x] Impostazione repo e struttura
- [ ] Definizione completa dataset
- [ ] Flussi logici principali (match, training, mercato)
- [ ] UI manageriale ispirata ma moderna
- [ ] Sistema di salvataggi e caricamento

---

✅ *Progetto pensato per modularità, scalabilità e portabilità futura (API, multiplayer, espansioni).*
