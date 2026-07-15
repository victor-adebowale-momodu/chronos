import add from "@material-symbols/svg-400/outlined/add.svg?raw";
import pause from "@material-symbols/svg-400/outlined/pause.svg?raw";
import playArrow from "@material-symbols/svg-400/outlined/play_arrow.svg?raw";
import refresh from "@material-symbols/svg-400/outlined/refresh.svg?raw";
import { render } from "@/utils/template";
import html from "./Timer.html?raw";

export default function Timer(): string {
    return render(html, { add, playArrow });
}

const DEFAULT_SECONDS = 30;

interface TimerState {
    totalSeconds: number;
    remainingSeconds: number;
    endTime: number;
    isRunning: boolean;
    hasStarted: boolean;
    intervalId: number | undefined;
}

function createInitialState(): TimerState {
    return {
        totalSeconds: DEFAULT_SECONDS,
        remainingSeconds: DEFAULT_SECONDS,
        endTime: Date.now() + DEFAULT_SECONDS * 1000,
        isRunning: false,
        hasStarted: false,
        intervalId: undefined,
    };
}

export function timerController(root: HTMLElement): void {
    const timerCircle = root.querySelector<HTMLElement>(".timer-circle");
    const timerText = root.querySelector<HTMLElement>(".timer-text");
    const toggleBtn =
        root.querySelector<HTMLButtonElement>("#btn-timer-toggle");
    const modifyBtn =
        root.querySelector<HTMLButtonElement>("#btn-timer-modify");

    if (!timerCircle || !timerText || !toggleBtn || !modifyBtn) return;

    let state = createInitialState();

    function update(seconds: number, total: number) {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        timerText.textContent = `${m}:${s}`;

        const fraction = seconds / total;
        timerCircle.style.setProperty(
            "--timer-progress",
            `${fraction * 360}deg`,
        );
    }

    function tick() {
        state.remainingSeconds = Math.max(
            0,
            Math.round((state.endTime - Date.now()) / 1000),
        );
        update(state.remainingSeconds, state.totalSeconds);

        if (state.remainingSeconds <= 0) {
            clearInterval(state.intervalId);
            state.isRunning = false;
            setToggle();
        }
    }

    function setToggle() {
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

    toggleBtn.addEventListener("click", () => {
        state.isRunning = !state.isRunning;

        if (state.isRunning) {
            state.hasStarted = true;
            state.endTime = Date.now() + state.remainingSeconds * 1000;
            state.intervalId = window.setInterval(tick, 250);
        } else {
            clearInterval(state.intervalId);
        }

        setToggle();
    });

    modifyBtn.addEventListener("click", () => {
        const showAdd = state.isRunning || !state.hasStarted;

        if (showAdd) {
            state.totalSeconds += 60;
            state.remainingSeconds += 60;
            if (state.isRunning) state.endTime += 60 * 1000;
        } else {
            state = createInitialState();
        }

        update(state.remainingSeconds, state.totalSeconds);
        setToggle();
    });

    update(state.remainingSeconds, state.totalSeconds);
    setToggle();
}
