# LED Controller PWA – Lights Co

## File della PWA
- `index.html` — App completa (HTML + CSS + JS)
- `manifest.json` — Manifest per installazione PWA
- `sw.js` — Service Worker per funzionamento offline
- `icons/` — Icone app (da aggiungere: icon-192.png, icon-512.png)

## Come pubblicare
1. Copia tutti i file su un **web server con HTTPS** (es. Nginx, Apache, o servizi come Netlify/Vercel).
   > ⚠️ HTTPS è obbligatorio per Service Worker e installazione PWA.
2. Apri l'URL dal browser del dispositivo (Chrome su Android, Safari su iOS, Edge su Windows).
3. Installa la PWA tramite il banner o dal menu del browser.

## Installazione su iOS
1. Apri Safari → naviga all'URL
2. Premi il tasto **Condividi** (quadrato con freccia su)
3. Seleziona **"Aggiungi a schermata Home"**

## API REST utilizzate
| Endpoint            | Metodo | Parametro      | Descrizione              |
|---------------------|--------|----------------|--------------------------|
| `/chtl`             | POST   | `tlnum=<n>`    | Cambia timeline          |
| `/setefx`           | POST   | `efxnum=<n>`   | Imposta effetto (1=flash, 2=strobe) |
| `/setbrightness<n>` | GET    | —              | Imposta luminosità (1-10)|
| `/setspeed<n>`      | GET    | —              | Imposta velocità (1-10)  |
| `/txinfo`           | GET    | —              | Legge stato attuale      |

## Note CORS
Se i dispositivi LED non inviano l'header `Access-Control-Allow-Origin: *`, 
le chiamate fetch falliranno. Soluzioni:
- Configurare il firmware dei dispositivi per includere l'header CORS
- Usare un proxy locale (es. Nginx reverse proxy)
- In sviluppo: disabilitare temporaneamente CORS nel browser

## Credenziali admin
Password di default: `adminGiorgio` (modificabile nel codice `doLogin()`)
