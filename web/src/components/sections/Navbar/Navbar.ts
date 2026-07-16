import hourglass from "@material-symbols/svg-400/outlined/hourglass.svg?raw";
import settings from "@material-symbols/svg-400/outlined/settings.svg?raw";
import { render } from "@/utils/template";
import html from "./Navbar.html?raw";

export default function Navbar(): string {
    return render(html, { hourglass, settings });
}

export function navbarController(root: HTMLElement) {
    const btnSettings = root.querySelector("#btn-settings");

    if (!btnSettings) return;

    btnSettings.addEventListener("click", () => {});
}
