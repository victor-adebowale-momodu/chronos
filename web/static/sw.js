const CACHE_NAME = "chronos-v2";

const STATIC_ASSETS = [
    "/",
    "/static/styles.css",
    "/static/js/app.js",
    "/static/js/components/charts.js",
    "/static/js/services/api.js",
    "/static/js/services/db.js",
    "/static/js/services/notifications.js",
    "https://cdn.jsdelivr.net/npm/chart.js",
];

const FONT_URLS = [
    "https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            )
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/")) {
        return;
    }

    if (
        url.hostname === "fonts.googleapis.com" ||
        url.hostname === "fonts.gstatic.com"
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(request, response.clone()));
                    return response;
                });
            }),
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((response) => {
                if (request.method === "GET" && response.status === 200) {
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(request, response.clone()));
                }
                return response;
            });
        }),
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const action = event.action;

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    client.postMessage({
                        type: "TIMER_ACTION",
                        action: action,
                    });
                }
            }),
    );
});
