# 🎨 Bolt Manager 01/02 – UI

Interfaccia utente moderna e accessibile per il gioco manageriale calcistico Bolt Manager 01/02, costruita interamente in Bolt.new con approccio responsive e mobile-first.

---

## 🚀 Obiettivo

Progettare e realizzare la UI/UX del manageriale calcistico, ispirata alla profondità funzionale di Championship Manager 01/02 ma con un design moderno e completamente responsive.

---

## 📐 Architettura

- 📄 **Bolt Pages**: Sezioni principali dell’app (rosa, partite, tattiche…)
- 🧩 **Bolt Components**: Elementi UI riutilizzabili (PlayerCard, MatchCard…)
- 🎨 **CSS nativo**: Design system centralizzato e responsive

### 📁 Struttura progetto

bolt_src/
├── pages/ → Pagine utente del gioco
├── components/ → Componenti UI personalizzati
├── ui/ → Documentazione UI + style guide CSS

📄 Documentazione
├── ui_overview.md – Overview UX/UI completa e linee guida
├── style.css – CSS globale nativo (mobile-first, accessibile)

---

## 🎨 Caratteristiche UI/UX

- ✅ **Mobile-First**: Interfaccia ottimizzata per smartphone e tablet
- ✅ **Smart TV Ready**: Navigazione a 4 direzioni, testo grande, overscan
- ✅ **Accessibilità Avanzata**: Supporto tastiera, screen reader, focus visibili
- ✅ **Design System Personalizzato**:
  - Palette moderna a 5 colori
  - Spacing System basato su unità 4px
  - Typography system fluido
  - 50+ componenti documentati
- ✅ **Performance-First**: CSS nativo, no framework, zero dipendenze

---

## 🧭 Navigazione Globale

Struttura delle sezioni principali (sidebar/navigation):

- Squadra
- Allenamento
- Tattiche
- Partite
- Mercato
- Calendario
- Salvataggi
- Storico
- Impostazioni

---

## 🔄 Flusso di lavoro

1. Creazione Pages e Components in Bolt.new
2. Collegamento dinamico ai flow definiti nel progetto `bolt-core`
3. Test interattivo delle pagine nella preview Bolt
4. Export HTML/CSS → `dist/`
5. Deploy finale su hosting (es. SiteGround)

---

## 📄 Documentazione

- `ui_overview.md`: Guida completa al design system e pattern di interfaccia
- `style.css`: Foglio di stile responsivo mobile-first
- `components/`: Libreria di componenti UI riutilizzabili
- `pages/`: Pagine principali del gioco collegate ai flow

---

## ⚙️ Requisiti

- ✅ Account Bolt.new
- ✅ Conoscenza Bolt Pages e Components
- ✅ Familiarità con CSS e responsive design
