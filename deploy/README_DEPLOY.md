cat > deploy/README_DEPLOY.md << 'EOF'
# 🚀 Deploy su SiteGround (o hosting equivalente)

Questa guida spiega come pubblicare il progetto Bolt Manager su un server tradizionale come SiteGround.

## 1. Esportazione da Bolt.new
1. Apri il progetto in Bolt.new
2. Esporta il progetto in formato web (`index.html`, `main.js`, `style.css`, assets...)
3. Salva tutto il contenuto nella cartella `dist/` del repository

## 2. Upload su SiteGround
- Accedi al **File Manager** o via **FTP/SFTP**
- Vai nella cartella: `public_html/` o nella directory del tuo dominio
- Carica tutto il contenuto di `dist/` (non la cartella stessa, solo i file interni)

## 3. Configurazione dominio
- Assicurati che il dominio punti alla cartella corretta (`public_html/` o sottodirectory)
- Se vuoi usare URL friendly (es: `/squadra`), attiva la modalità SPA routing con `.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
4. Verifica funzionamento
Vai al tuo dominio (es. https://tuogioco.it)

Verifica che il gioco si carichi correttamente

Se ci sono errori JS, controlla che i percorsi a /assets/ siano corretti

5. Backup e Aggiornamenti
Ogni volta che aggiorni il progetto, sostituisci solo i file modificati nella dist/

Mantieni una copia su GitHub in parallelo per versionamento e rollback rapido

✅ Il progetto è ora online, giocabile via browser, aggiornabile via FTP o CI/CD, e pronto a scalare.
EOF

git add deploy/README_DEPLOY.md
git commit -m "📝 Aggiunta guida deploy per SiteGround"
git push origin main

yaml
Copia
Modifica

---

🟢 Dopo l'esecuzione:
- `deploy/README_DEPLOY.md` sarà creato o aggiornato
- Il commit sarà visibile su GitHub

Fammi sapere se vuoi fare lo stesso anche per altri file (`deploy.sh`, `LICENSE`, ecc.).
