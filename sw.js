let cacheName = 'cache-v1';

self.addEventListener('install', (e) => {

  let cache = caches.open(cacheName).then((c) => {
    c.addAll([
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
      ]);
  });

  e.waitUntil(cache);
});

self.addEventListener('fetch', function (event) {

  event.respondWith(

    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })

  );

});