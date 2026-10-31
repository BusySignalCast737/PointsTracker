// Points Tracker service worker — version 14
const CACHE_NAME = 'my-points-tracker-v14';
const ROOT_URL = new URL('./', self.registration.scope).href;
const APP_URL = new URL('./index.html', self.registration.scope).href;
const ZXING_URL = 'https://unpkg.com/@zxing/browser@0.1.5/umd/zxing-browser.min.js';
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of [ROOT_URL, APP_URL]) {
      try { const r = await fetch(url, {cache:'reload'}); if (r.ok) await cache.put(url, r.clone()); } catch (_) {}
    }
    // Cache the scanner library during the first online visit so camera decoding
    // remains available offline after the app has been opened successfully once.
    try {
      const r = await fetch(ZXING_URL, {mode:'cors', cache:'reload'});
      if (r.ok) await cache.put(ZXING_URL, r.clone());
    } catch (_) {}
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('my-points-tracker-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isScanner = req.url === ZXING_URL;
  if (url.origin !== self.location.origin && !isScanner) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const hit = await cache.match(req, {ignoreSearch:true});
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r.ok || (isScanner && r.type === 'opaque')) await cache.put(req, r.clone());
      return r;
    } catch (_) {
      if (req.mode === 'navigate') {
        const fallback = await cache.match(ROOT_URL) || await cache.match(APP_URL);
        if (fallback) return fallback;
        return new Response('Connect once and open Points Tracker to prepare it for offline use.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
      return Response.error();
    }
  })());
});
