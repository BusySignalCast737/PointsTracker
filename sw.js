// Points Tracker service worker — version 12
// Offline-first navigation and static assets. Does not require network access to open the app.
const CACHE_NAME = 'my-points-tracker-v12';
const ROOT_URL = new URL('./', self.registration.scope).href;
const APP_URL = new URL('./index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache both the Pages root URL and canonical index URL so Home Screen launches work offline.
    const rootResponse = await fetch(ROOT_URL, { cache: 'reload' });
    if (rootResponse.ok) await cache.put(ROOT_URL, rootResponse.clone());
    const appResponse = await fetch(APP_URL, { cache: 'reload' });
    if (appResponse.ok) await cache.put(APP_URL, appResponse.clone());
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('my-points-tracker-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request, { ignoreSearch: true }) || await cache.match(ROOT_URL) || await cache.match(APP_URL);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(ROOT_URL, response.clone());
        return response;
      } catch (_) {
        return new Response('Points Tracker has not been cached for offline use yet. Connect once, open the tracker, and try again.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (_) {
      return Response.error();
    }
  })());
});
