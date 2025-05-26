self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('vt-cache').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        'manifest.json',
        'sw.js',
        'https://oyy-gus.github.io/oyy-gus/image/download-icon-192.png',
        'https://oyy-gus.github.io/oyy-gus/image/download-icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});