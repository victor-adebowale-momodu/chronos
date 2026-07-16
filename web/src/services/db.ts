import Dexie, { type EntityTable } from "dexie";

interface Session {
	id: string;
	start: Date;
	end: Date;
}

interface Settings {
	key: string;
	value: unknown;
}

class ChronosDB extends Dexie {
	sessions!: EntityTable<Session, "id">;
	settings!: EntityTable<Settings, "key">;

	constructor() {
		super("chronos_db");
		this.version(1).stores({
			sessions: "id, start, end",
			settings: "key, value",
		});
	}
}

export const db = new ChronosDB();

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
	const row = await db.settings.get(key);
	return row ? (row.value as T) : fallback;
}

export async function setSetting(key: string, value: unknown): Promise<void> {
	await db.settings.put({ key, value });
}

export async function createSession(
	payload: Omit<Session, "id">,
): Promise<string> {
	const id = crypto.randomUUID();
	await db.sessions.add({ id, ...payload });
	return id;
}

export async function getSessions(weeksBack = 0): Promise<Session[]> {
	const now = new Date();
	const weekStart = new Date(now);
	weekStart.setDate(now.getDate() - now.getDay() + 1 - weeksBack * 7);
	weekStart.setHours(0, 0, 0, 0);

	const weekEnd = new Date(weekStart);
	weekEnd.setDate(weekStart.getDate() + 6);
	weekEnd.setHours(23, 59, 59, 999);

	return db.sessions
		.where("start")
		.between(weekStart, weekEnd, true, true)
		.toArray();
}
