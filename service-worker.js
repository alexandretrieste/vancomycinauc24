const CACHE_NAME = 'auc24-cache-v1'
const urlsToCache = [
  './',
  './index.html',
  './styles/styles.css',
  './styles/print.css',
  './controller/main.js',
  './controller/script.js',
  './controller/datetime.js',
  './controller/print.js',
  './controller/i18n.js',
  './controller/accessibility.js',
  './partials/header.html',
  './partials/footer.html',
  './partials/print.html',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/dark-mode.png',
  './assets/contrast.png',
  './assets/flag-brazil.png',
  './assets/flag-canada.png',
  './assets/flag-france.png',
  './assets/i.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
