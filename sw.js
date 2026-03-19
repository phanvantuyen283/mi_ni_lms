const CACHE_NAME = 'mini-lms-students-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './style.css',
  './config.js',
  './core.js'
];

// Cài đặt và lưu trữ các file cần thiết
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Giúp App tải nhanh hơn và hiện giao diện khi chập chờn mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
