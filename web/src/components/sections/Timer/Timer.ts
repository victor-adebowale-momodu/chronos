import add from "@material-symbols/svg-400/outlined/add.svg?raw";
import playArrow from "@material-symbols/svg-400/outlined/play_arrow.svg?raw";
import { render } from "@/utils/template";
import html from "./Timer.html?raw";

export default function Timer(): string {
	return render(html, { add, playArrow });
}
