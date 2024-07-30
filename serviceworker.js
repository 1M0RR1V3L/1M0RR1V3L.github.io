var staticCacheName = "1m0rr1v3l_STATUS";
const filesToCache = [
    './index.html',
    './css/style.css',
    './js/script.js',
    './img/github.png',
    './img/icon.ico',
    './img/icon-240x256.png',
    './img/insta.png',
    './img/linkedin.png',
    './img/perfil.jpg',
    './img/select-theme.png'
];

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
