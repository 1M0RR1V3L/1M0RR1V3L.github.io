/*self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('meu-portfolio-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/img/icon2.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
*/

// This is the "Offline page" service worker

//importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

//const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";

/*const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }interest-cohort
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});*/

// last option
/*
var staticCacheName = "pwa_dice";

const filesToCache = [
	'./index.html',
	'/style.css',
    '/script.js',
    '/img/icon2.jpg'
	

];
 
self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open(staticCacheName).then(function (cache) {
			// return cache.addAll(["/"]);
			console.log('ios');
			return cache.addAll(filesToCache);
		})
	);
});
 
self.addEventListener("fetch", function (event) {
	console.log(event.request.url);
 
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
*/

/*
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE_NAME = "meu-portfolio-v1";

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/img/icon2.jpg'
            ]);
        })
    );
});

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.NetworkFirst()
);

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

*/

var staticCacheName = "pwa_dice"

const filesToCache = [
    "./index.html",
    "./style.css",
    "./img/icon2.jpg",
    "./script.js"
]

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            // return cache.addAll(["/"]);
            console.log("ios")
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener("fetch", function (event) {
    console.log(event.request.url)

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
})