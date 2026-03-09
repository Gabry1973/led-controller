const CACHE = 'led-ctrl-v1';
// Se pubblichi su GitHub Pages, cambia BASE con il nome del tuo repository
// Esempio: const BASE = '/led-controller';
// Se pubblichi sulla root del dominio lascia BASE = ''
const BASE = '/led-controller';
const ASSETS = [BASE + '/', BASE + '/index.html', BASE + '/manifest.json', BASE + '/style.css'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // For API calls (led devices) go network-only
  if (e.request.url.includes('/chtl') ||
      e.request.url.includes('/setefx') ||
      e.request.url.includes('/setbrightness') ||
      e.request.url.includes('/setspeed') ||
      e.request.url.includes('/txinfo')) {
    return; // pass through
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
