import "./styles.css";
import { statusBadgeController } from "@/components/blocks/StatusBadge/StatusBadge";
import { timerController } from "@/components/blocks/Timer/Timer";
import { App } from "./app";
import { required } from "./utils";
import { statsController } from "@/components/blocks/Stats/Stats";
import { navbarController } from "./components/blocks/Navbar/Navbar";

const app = required(document.querySelector<HTMLDivElement>("#app"), "app");

async function bootstrap() {
    app.innerHTML = App();
    navbarController(app);
    timerController(app);
    statusBadgeController(app);
    statsController(app);
}

bootstrap();
