import equalizer from "@material-symbols/svg-400/outlined/equalizer.svg?raw";
import expandContent from "@material-symbols/svg-400/outlined/expand_content.svg?raw";
import { render } from "@/utils";
import html from "./Stats.html?raw";

export default function Stats(): string {
	return render(html, { equalizer, expandContent });
}
