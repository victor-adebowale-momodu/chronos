import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";
import { authStore } from "./stores/auth.js";
import { timerStore } from "./stores/timer.js";

Alpine.store("auth", authStore);
Alpine.store("timer", timerStore);

Alpine.start();
