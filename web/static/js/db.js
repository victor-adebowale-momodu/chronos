import Dexie from "https://unpkg.com/dexie/dist/dexie.js";

let db = null;

export function getDb() {
    if (db) return db;

    db = new Dexie("chronos_db");
    db.version(1).stores({
        sessions: `
            &id,
            start,
            end,
            duration,
        `,
        settings: `&key`,
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
    await db.sessions.add({ id, ...payload });
}
