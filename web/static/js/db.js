import Dexie from "https://cdn.jsdelivr.net/npm/dexie/dist/modern/dexie.mjs";

let db = null;

export function getDb() {
    if (db) return db;

    db = new Dexie("chronos_db");
    db.version(1).stores({
        sessions: "id, start, end, duration",
        settings: "key",
    });

    return db;
}

export async function getSetting(key, fallback = null) {
    const db = getDb();
    const row = await db.settings.get(key);
    return row ? row.value : fallback;
}

export async function setSetting(key, value) {
    const db = getDb();
    await db.settings.put({ key, value });
}

export async function createSession(payload) {
    const id = crypto.randomUUID();
    const db = getDb();
    await db.sessions.add({ id, ...payload });
}

export async function getSessions(weeksBack = 0) {
    const now = new Date();

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1 - weeksBack * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const db = getDb();
    return await db.sessions
        .where("start")
        .between(weekStart, weekEnd, true, true)
        .toArray();
}
