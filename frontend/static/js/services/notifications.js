export async function requestNotificationPermission() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
        await Notification.requestPermission();
    }
}

export async function notifyTimeProgress(message) {
    if (Notification.permission !== "granted") return;
    const sw = await navigator.serviceWorker.ready;
    sw.showNotification("ChronOS ⏱", {
        body: message,
        icon: "/static/icons/icon-192.png",
        badge: "/static/icons/icon-192.png",
    });
}
