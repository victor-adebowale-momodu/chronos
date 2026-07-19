import "./styles.css";
import { statusBadgeController } from "@/components/sections/StatusBadge/StatusBadge";
import { timerController } from "@/components/sections/Timer/Timer";
import { App } from "./app";
import { required } from "./utils";

const app = required(document.querySelector<HTMLDivElement>("#app"), "app");

async function bootstrap() {
    app.innerHTML = App();
    timerController(app);
    statusBadgeController(app);
}

bootstrap();
