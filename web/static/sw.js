importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js",
);

const { precacheAndRoute, cleanupOutdatedCaches } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

precacheAndRoute(__PRECACHE_MANIFEST__);
cleanupOutdatedCaches();

registerRoute(
    ({ url }) =>
        url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/"),
    new NetworkFirst({ cacheName: "api-cache" }),
);

registerRoute(
    ({ url }) => url.hostname === "fonts.googleapis.com",
    new StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
    }),
);

registerRoute(
    ({ url }) => url.hostname === "fonts.gstatic.com",
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 365 }), // 1 year
        ],
    }),
);

registerRoute(
    ({ url }) => url.href.includes("Material+Symbols"),
    new CacheFirst({
        cacheName: "material-symbols",
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 365 }), // 1 year
        ],
    }),
);

registerRoute(
    ({ url }) => url.hostname === "cdn.jsdelivr.net",
    new CacheFirst({
        cacheName: "cdn-assets",
        plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 30 }), // 30 days
        ],
    }),
);

self.addEventListener("push", (event) => {
    const data = event.data?.json() ?? {
        title: "ChronOS",
        body: "Time check!",
    };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/static/icons/icon-192.png",
            badge: "/static/icons/icon-192.png",
        }),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow("/"));
});

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});
