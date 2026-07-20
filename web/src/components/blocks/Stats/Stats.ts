import equalizer from "@material-symbols/svg-400/outlined/equalizer.svg?raw";
import expandContent from "@material-symbols/svg-400/outlined/expand_content.svg?raw";
import { render, required } from "@/utils";
import html from "./Stats.html?raw";
import StatsModal, {
    statsModalController,
} from "@/components/modals/StatsModal/StatsModal";
import { showModal } from "@/modal";

export default function Stats(): string {
    return render(html, { equalizer, expandContent });
}

function openStatsModal() {
    showModal(StatsModal(), statsModalController);
}

export function statsController(root: HTMLElement) {
    const btn = required(
        root.querySelector<HTMLButtonElement>("#btn-stats-expand"),
        "btn-stats-expand",
    );

    btn.addEventListener("click", openStatsModal);
}
