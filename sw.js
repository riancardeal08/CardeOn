const CACHE = "CardeOn-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.open(CACHE).then(async cache => {

      try {

        const fresh = await fetch(event.request);

        cache.put(event.request, fresh.clone());

        return fresh;

      } catch {

        return await cache.match(event.request);

      }

    })

  );

});
