import "./styles.css";
import { timerController } from "@/components/sections/Timer/Timer";
import { App } from "./app";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = App();

timerController(app);
