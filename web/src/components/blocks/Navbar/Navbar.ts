import hourglass from "@material-symbols/svg-400/outlined/hourglass.svg?raw";
import settings from "@material-symbols/svg-400/outlined/settings.svg?raw";
import { render, required } from "@/utils";
import html from "./Navbar.html?raw";

export default function Navbar(): string {
	return render(html, { hourglass, settings });
}

export function openSettings() {}

export function navbarController(root: HTMLElement) {
	const btnSettings = required(
		root.querySelector("#btn-settings"),
		"btn-settings",
	);

	btnSettings.addEventListener("click", () => {
		openSettings();
	});
}
