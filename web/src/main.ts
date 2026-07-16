import "./styles.css";
import { timerController } from "@/components/sections/Timer/Timer";
import { App } from "./app";
import { required } from "./utils";

const appEl = required(document.querySelector<HTMLDivElement>("#app"), "app");
const modalEl = required(
    document.querySelector<HTMLDivElement>("#modal"),
    "modal",
);

async function bootstrap() {
    appEl.innerHTML = App();
    timerController(appEl);
}

bootstrap();
