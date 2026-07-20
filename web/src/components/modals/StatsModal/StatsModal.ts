import chevronLeft from "@material-symbols/svg-400/outlined/chevron_left.svg?raw";
import chevronRight from "@material-symbols/svg-400/outlined/chevron_right.svg?raw";
import { render, required } from "@/utils";
import html from "./StatsModal.html?raw";
import Modal from "../Modal/Modal";
import { hideModal } from "@/modal";

export default function StatsModal(): string {
    const content = render(html, { chevronLeft, chevronRight });
    return Modal({ content });
}

export function statsModalController(root: HTMLElement) {
    const closeBtn = required(
        root.querySelector<HTMLButtonElement>("#btn-stats-modal-close"),
        "btn-stats-modal-close",
    );

    closeBtn.addEventListener("click", hideModal);
}
