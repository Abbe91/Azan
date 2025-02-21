self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Handle push notifications when they arrive
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/vite.svg',
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification('Prayer Time', options)
  );
});