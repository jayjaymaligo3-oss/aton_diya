// Service Worker for Aton Diya PWA
const CACHE_NAME = 'aton-diya-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.jpg',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function() {
      // Bypass the service worker for cross-origin requests to avoid CORS/opaque failures
      try {
        const reqUrl = new URL(event.request.url);
        if (reqUrl.origin !== location.origin) {
          // For external requests, just fetch from network and don't try to cache
          return fetch(event.request).catch((err) => {
            console.warn('Cross-origin fetch failed for', event.request.url, err);
            return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
          });
        }

        // Same-origin requests: try cache first
        const cached = await caches.match(event.request);
        if (cached) return cached;

        const fetchRequest = event.request.clone();
        const networkResponse = await fetch(fetchRequest).catch((err) => {
          console.warn('Service Worker fetch failed for', event.request.url, err);
          // On failed navigation fallback to app shell
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
        });

        // If we already returned a fallback Response from the catch above, return it
        if (!networkResponse) return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });

        // Check if valid response and cache it
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }

        return networkResponse;
      } catch (ex) {
        console.error('Unexpected error in SW fetch handler', ex);
        return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Aton Diya',
    icon: '/logo.jpg',
    badge: '/logo.jpg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Aton Diya', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});
