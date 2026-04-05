import { getSetting, setSetting, createSession } from "../db.js";

const DEFAULT_DURATION_SECS = 1 * 60;
const INCREMENT_DURATION_SECS = 60;

const timerStore = {
    seconds: null,
    state: null,
    _interval: null,

    async init() {
        this.seconds = await getSetting(
            "chronos_seconds",
            DEFAULT_DURATION_SECS,
        );
        this.state = await getSetting("chronos_state", "idle");
        if (this.state === "running") await this.start();
    },

    async _saveState() {
        await Promise.all([
            setSetting("chronos_seconds", this.seconds),
            setSetting("chronos_state", this.state),
        ]);
    },

    async _startSession() {
        await setSetting("chronos_session", {
            start: new Date(),
            duration: this.seconds,
        });
    },

    async _saveSession() {
        const currentSession = await getSetting("chronos_session");
        if (!currentSession) return;
        const payload = { ...currentSession, end: new Date() };
        await createSession(payload);
    },

    async start() {
        if (this.state === "idle") await this._startSession();
        if (this._interval) clearInterval(this._interval);

        this.state = "running";
        await this._saveState();

        this._interval = setInterval(async () => {
            if (this.seconds > 0) {
                this.seconds--;
                await this._saveState();
            } else {
                await this._saveSession();
                await this.reset();
            }
        }, 1000);
    },

    async pause() {
        this.state = "paused";
        await this._saveState();
        clearInterval(this._interval);
        this._interval = null;
    },

    async reset() {
        await this.pause();
        this.state = "idle";
        this.seconds = DEFAULT_DURATION_SECS;
        await this._saveState();
    },

    addToTimer() {
        this.seconds += INCREMENT_DURATION_SECS;
    },

    get format() {
        const mins = String(Math.floor(this.seconds / 60)).padStart(2, "0");
        const secs = String(this.seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    },
};

export default timerStore;
