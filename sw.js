const CACHE = 'led-ctrl-v2';
// ⚠️ Cambia 'led-controller' con il nome esatto del tuo repository GitHub
const BASE = '/led-controller';
const ASSETS = [
  BASE + '/',
  BASE + '/index.html',
  BASE + '/manifest.json',
  BASE + '/style.css',
  BASE + '/favicon.ico'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Le chiamate ai dispositivi LED vanno sempre alla rete, mai alla cache
  if (['/chtl', '/setefx', '/setbrightness', '/setspeed', '/txinfo']
      .some(p => url.includes(p))) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
