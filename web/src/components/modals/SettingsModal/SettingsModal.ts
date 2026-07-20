import { hideModal } from "@/modal";
import html from "./SettingsModal.html?raw";
import { render, required } from "@/utils";
import Modal from "@/components/modals/Modal/Modal";

export default function SettingsModal(): string {
    const content = render(html, {});
    return Modal({ content });
}

export function settingsModalController(root: HTMLElement) {
    const closeBtn = required(
        root.querySelector<HTMLButtonElement>("#btn-settings-modal-close"),
        "btn-settings-modal-close",
    );

    closeBtn.addEventListener("click", hideModal);
}
