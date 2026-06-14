const CHIME_URL = "/static/assets/chime.mp3";
const chime = new Audio(CHIME_URL);

export function getPermissionState() {
    if (!("Notification" in window)) return "unsupported";
    return Notification.permission;
}

export async function requestPermission() {
    if (!("Notification" in window)) return "unsupported";
    return await Notification.requestPermission();
}

export function notify(title, options = {}) {
    if (getPermissionState() === "granted") {
        new Notification(title, {
            icon: "/static/icons/icon-192.png",
            ...options,
        });
    }
}

export function playChime() {
    chime.currentTime = 0;
    chime.play().catch((e) => console.error("Audio play failed:", e));
}

export function updateMediaSession(seconds, state, format) {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
        title: `Timer: ${format}`,
        artist: "ChronOS",
        album: state === "running" ? "Focusing..." : "Paused",
        artwork: [
            {
                src: "/static/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
        ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
        window.dispatchEvent(new CustomEvent("timer-resume"));
    });
    navigator.mediaSession.setActionHandler("pause", () => {
        window.dispatchEvent(new CustomEvent("timer-pause"));
    });
}

export function showPersistentNotification(format, state) {
    if (Notification.permission !== "granted") return;

    const title = `ChronOS - ${format}`;
    const options = {
        body: state === "running" ? "Timer is running" : "Timer paused",
        icon: "/static/icons/icon-192.png",
        badge: "/static/icons/icon-192.png",
        tag: "timer-notification",
        renotify: false,
        silent: true,
        actions:
            state === "running"
                ? [{ action: "pause", title: "Pause" }]
                : [
                      { action: "resume", title: "Resume" },
                      { action: "reset", title: "Reset" },
                  ],
    };

    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
    });
}
