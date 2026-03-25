const CACHE_NAME = "toolpop-converter-v1";
const STATIC_ASSETS = ["/converter/manifest.json", "/converter/favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Never cache navigation requests (HTML pages) — prevents hydration mismatches
  if (event.request.mode === "navigate") return;

  // Only cache same-origin static assets under /converter/ path
  const isConverterAsset =
    url.origin === self.location.origin &&
    url.pathname.startsWith("/converter/") &&
    (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|json)$/) != null);

  if (!isConverterAsset) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
