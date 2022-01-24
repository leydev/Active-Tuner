/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const cacheName = 'meu-app-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/calc.js',
  '/style.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
];

self.addEventListener('install', (event: FetchEvent) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }),
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});

self.addEventListener('activate', (event: FetchEvent) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
      return true;
    }))),
  );
});
