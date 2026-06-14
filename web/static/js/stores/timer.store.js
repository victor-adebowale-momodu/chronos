import { getSetting, setSetting, createSession } from "../services/db.js";
import {
    playChime,
    notify,
    updateMediaSession,
    showPersistentNotification,
} from "../services/notifications.js";

const DEFAULT_DURATION_SECS = 25 * 60;
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

        navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data.type === "TIMER_ACTION") {
                if (event.data.action === "pause") this.pause();
                if (event.data.action === "resume") this.start();
                if (event.data.action === "reset") this.reset();
            }
        });

        window.addEventListener("timer-resume", () => this.start());
        window.addEventListener("timer-pause", () => this.pause());
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
        if (this.state === "idle") {
            await this._startSession();
            notify("Timer Started", { body: "Stay focused!" });
        }
        if (this._interval) clearInterval(this._interval);

        this.state = "running";
        await this._saveState();

        this._interval = setInterval(async () => {
            if (this.seconds > 0) {
                this.seconds--;
                await this._saveState();

                updateMediaSession(this.seconds, this.state, this.format);
                showPersistentNotification(this.format, this.state);
            } else {
                await this.onTimerComplete();
            }
        }, 1000);

        showPersistentNotification(this.format, this.state);
    },

    async pause() {
        this.state = "paused";
        await this._saveState();
        clearInterval(this._interval);
        this._interval = null;

        updateMediaSession(this.seconds, this.state, this.format);
        showPersistentNotification(this.format, this.state);
    },

    async reset() {
        await this.pause();
        this.state = "idle";
        this.seconds = DEFAULT_DURATION_SECS;
        await this._saveState();
    },

    addToTimer() {
        this.seconds += INCREMENT_DURATION_SECS;
        this._saveState();
    },

    get format() {
        const mins = String(Math.floor(this.seconds / 60)).padStart(2, "0");
        const secs = String(this.seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    },

    async onTimerComplete() {
        playChime();
        notify("Time is up!", {
            body: "Great job! Take a break.",
            requireInteraction: true,
        });
        await this._saveSession();
        await this.reset();
    },
};

export default timerStore;
