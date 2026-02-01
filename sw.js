/* eslint-env serviceworker */
/* global self, caches, fetch, console */
const CACHE_NAME = 'portfolio-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/theme-toggle.js',
  './manifest.json',
  './img/github.png',
  './img/icon.ico',
  './img/icon-192x192.png',
  './img/icon-256x256.png',
  './img/icon-384x384.png',
  './img/icon-512x512.png',
  './img/python.svg',
  './img/js.svg',
  './img/c.svg',
  './img/dj.svg',
  './img/godot.svg',
  './img/react.svg',
  './img/tailwind.svg',
  './img/moon.svg',
  './img/sun.svg',
  './img/system.svg',
  './img/insta.png',
  './img/linkedin.png',
  './img/perfil.jpg',
  './img/node.svg',
  './img/next.svg',
  './img/fastapi.svg',
  './img/git.svg',
  './img/orcid.svg',
  './img/lattes.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return offline page if available
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return null;
          });
      })
  );
});