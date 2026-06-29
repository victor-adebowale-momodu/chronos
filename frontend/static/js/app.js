import Alpine from "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/module.esm.js";
import authStore from "./stores/auth.store.js";
import timerStore from "./stores/timer.store.js";
import { loginData, signupData } from "./data/auth.data.js";

Alpine.store("auth", authStore);
Alpine.store("timer", timerStore);
Alpine.data("signupData", signupData);
Alpine.data("loginData", loginData);

Alpine.start();
