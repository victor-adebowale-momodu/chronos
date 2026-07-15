import add from "@material-symbols/svg-400/outlined/add.svg?raw";
import pause from "@material-symbols/svg-400/outlined/pause.svg?raw";
import playArrow from "@material-symbols/svg-400/outlined/play_arrow.svg?raw";
import refresh from "@material-symbols/svg-400/outlined/refresh.svg?raw";
import { getSetting, setSetting } from "@/services/db";
import { render } from "@/utils/template";
import html from "./Timer.html?raw";

export default function Timer(): string {
    return render(html, { add, playArrow });
}

const DEFAULT_SECONDS = 25 * 60;

interface TimerState {
    totalSeconds: number;
    remainingSeconds: number;
    endTime: number;
    isRunning: boolean;
    hasStarted: boolean;
    intervalId: number | undefined;
}

async function newTimerState(): Promise<TimerState> {
    const defaultSeconds = await getSetting(
        "chronos_default_seconds",
        DEFAULT_SECONDS,
    );

    return {
        totalSeconds: defaultSeconds,
        remainingSeconds: defaultSeconds,
        endTime: Date.now() + defaultSeconds * 1000,
        isRunning: false,
        hasStarted: false,
        intervalId: undefined,
    };
}

async function loadTimerState(): Promise<TimerState> {
    const saved = await getSetting<Omit<TimerState, "intervalId"> | null>(
        "chronos_timer_state",
        null,
    );

    if (saved) {
        return {
            ...saved,
            intervalId: undefined,
        };
    }

    return newTimerState();
}

async function persistTimerState(state: TimerState): Promise<void> {
    await setSetting("chronos_timer_state", {
        totalSeconds: state.totalSeconds,
        remainingSeconds: state.remainingSeconds,
        endTime: state.endTime,
        isRunning: state.isRunning,
        hasStarted: state.hasStarted,
    });
}

export async function timerController(root: HTMLElement) {
    // html elements
    const timerCircle = root.querySelector<HTMLElement>(".timer-circle");
    const timerText = root.querySelector<HTMLElement>(".timer-text");
    const toggleBtn =
        root.querySelector<HTMLButtonElement>("#btn-timer-toggle");
    const modifyBtn =
        root.querySelector<HTMLButtonElement>("#btn-timer-modify");

    if (!timerCircle || !timerText || !toggleBtn || !modifyBtn) return;

    let state = await loadTimerState();

    // timer tick
    function tick() {
        state.remainingSeconds = Math.max(
            0,
            Math.round((state.endTime - Date.now()) / 1000),
        );
        updateUI(state.remainingSeconds, state.totalSeconds);

        if (state.remainingSeconds <= 0) {
            clearInterval(state.intervalId);
            state.isRunning = false;
            void persistTimerState(state);
            setToggleUI();
        }
    }

    // ui
    function updateUI(seconds: number, total: number) {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        timerText.textContent = `${m}:${s}`;

        const fraction = seconds / total;
        timerCircle.style.setProperty(
            "--timer-progress",
            `${fraction * 360}deg`,
        );
    }

    function setToggleUI() {
        toggleBtn.innerHTML = `
                  <span>${state.isRunning ? pause : playArrow}</span>
                  <span>${state.isRunning ? "Pause" : "Play"}</span>
              `;

        const showAdd = state.isRunning || !state.hasStarted;
        modifyBtn.innerHTML = `
                  <span>${showAdd ? add : refresh}</span>
                  <span>${showAdd ? "1min" : "Reset"}</span>
              `;
    }

    // timer
    function startTimer() {
        state.isRunning = true;
        state.hasStarted = true;
        state.endTime = Date.now() + state.remainingSeconds * 1000;
        state.intervalId = window.setInterval(tick, 250);
        void persistTimerState(state);
    }

    function pauseTimer() {
        state.remainingSeconds = Math.max(
            0,
            Math.round((state.endTime - Date.now()) / 1000),
        );
        state.isRunning = false;
        clearInterval(state.intervalId);
        state.intervalId = undefined;
        void persistTimerState(state);
    }

    async function resetTimer() {
        clearInterval(state.intervalId);
        state.intervalId = undefined;
        state = await newTimerState();
        void persistTimerState(state);
    }

    function addMinute() {
        state.totalSeconds += 60;
        state.remainingSeconds += 60;
        if (state.isRunning) {
            state.endTime += 60 * 1000;
        }

        void persistTimerState(state);
    }

    // event listeners
    toggleBtn.addEventListener("click", () => {
        state.isRunning ? pauseTimer() : startTimer();
        setToggleUI();
    });

    modifyBtn.addEventListener("click", async () => {
        if (state.isRunning || !state.hasStarted) {
            addMinute();
        } else {
            await resetTimer();
        }

        updateUI(state.remainingSeconds, state.totalSeconds);
        setToggleUI();
    });

    // restore timer state after page reload
    if (state.isRunning) {
        state.remainingSeconds = Math.max(
            0,
            Math.round((state.endTime - Date.now()) / 1000),
        );

        if (state.remainingSeconds > 0) {
            state.intervalId = window.setInterval(tick, 250);
        } else {
            state.isRunning = false;
            void persistTimerState(state);
        }
    }

    // initial execution
    updateUI(state.remainingSeconds, state.totalSeconds);
    setToggleUI();
}
