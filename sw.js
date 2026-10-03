

const CACHE = "afrodyta-v4";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./assets/icon-512.png",
  "./js/app.js",
  "./js/db.js",
  "./js/i18n.js",
  "./js/content.js",
  "./js/categories.js",
  "./js/seed.js",
  "./js/views/recipes.js",
  "./js/views/detail.js",
  "./js/views/form.js",
  "./js/views/home.js",
  "./js/views/settings.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
 
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});


self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);


  if (event.request.method !== "GET") return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE)
          .then((cache) => cache.put(event.request, copy))
          .catch(() => {}); 
        return response;
      });
    })
  );
});
