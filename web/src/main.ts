import "./styles.css";
import { statusBadgeController } from "@/components/blocks/StatusBadge/StatusBadge";
import { timerController } from "@/components/blocks/Timer/Timer";
import { App } from "./app";
import { required } from "./utils";

const app = required(document.querySelector<HTMLDivElement>("#app"), "app");

async function bootstrap() {
	app.innerHTML = App();
	timerController(app);
	statusBadgeController(app);
}

bootstrap();
