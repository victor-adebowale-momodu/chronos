const DEFAULT_DURATION_SECS = 25 * 60;
const INCREMENT_SECS = 60;
const STORAGE_KEY = "chronos_timer";
const TimerState = Object.freeze({
    IDLE: "idle",
    RUNNING: "running",
    PAUSED: "paused",
});

function saveTimerData(seconds, timerState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ seconds, timerState }));
}

function loadTimerData() {
    const timerData = localStorage.getItem(STORAGE_KEY);
    return timerData ? JSON.parse(timerData) : null;
}

document.addEventListener("alpine:init", () => {
    Alpine.data("timer", () => ({
        seconds: DEFAULT_DURATION_SECS,
        timerState: TimerState.IDLE,
        _interval: null,

        init() {
            const timerData = loadTimerData();
            if (timerData) {
                this.seconds = timerData.seconds;
                if (timerData.timerState === TimerState.RUNNING) {
                    this._startTimer();
                }
            }
            this.$watch("seconds", (val) =>
                saveTimerData(val, this.timerState),
            );
            this.$watch("timerState", (val) =>
                saveTimerData(this.seconds, val),
            );
        },

        onPlayOrPause() {
            if (this.timerState === TimerState.RUNNING) {
                this._pauseTimer();
            } else {
                this._startTimer();
            }
        },

        onReset() {
            this._clearInterval();
            this.timerState = TimerState.IDLE;
            this.seconds = DEFAULT_DURATION_SECS;
        },

        addTime() {
            this.seconds += INCREMENT_SECS;
        },

        formatTime() {
            const minutes = String(Math.floor(this.seconds / 60)).padStart(
                2,
                "0",
            );
            const secs = String(this.seconds % 60).padStart(2, "0");
            return `${minutes}:${secs}`;
        },

        _startTimer() {
            this.timerState = TimerState.RUNNING;
            this._interval = setInterval(() => {
                if (this.seconds > 0) {
                    this.seconds--;
                } else {
                    alert("Time is up!");
                    this.onReset();
                }
            }, 1000);
        },

        _pauseTimer() {
            this.timerState = TimerState.PAUSED;
            this._clearInterval();
        },

        _clearInterval() {
            clearInterval(this._interval);
            this._interval = null;
        },
    }));
});
