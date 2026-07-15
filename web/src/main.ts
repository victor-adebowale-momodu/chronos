import "./styles.css";
import { timerController } from "@/components/sections/Timer/Timer";
import { App } from "./app";

const app = document.querySelector<HTMLDivElement>("#app")!;

async function bootstrap() {
	app.innerHTML = App();

	timerController(app);
}

bootstrap();
