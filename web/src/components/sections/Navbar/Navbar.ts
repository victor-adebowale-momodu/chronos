import accountCircle from "@material-symbols/svg-400/outlined/account_circle.svg?raw";
import hourglass from "@material-symbols/svg-400/outlined/hourglass.svg?raw";
import { render } from "@/utils/template";
import html from "./Navbar.html?raw";

export default function Navbar(): string {
	return render(html, { hourglass, accountCircle });
}
