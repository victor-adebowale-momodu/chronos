import chevronLeft from "@material-symbols/svg-400/outlined/chevron_left.svg?raw";
import chevronRight from "@material-symbols/svg-400/outlined/chevron_right.svg?raw";
import { render } from "@/utils";
import html from "./StatsModal.html?raw";

export default function StatsModal(): string {
	return render(html, { chevronLeft, chevronRight });
}
