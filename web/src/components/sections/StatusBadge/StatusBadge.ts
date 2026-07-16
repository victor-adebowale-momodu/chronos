import AuthModal from "@/components/modals/AuthModal/AuthModal";
import { required } from "@/utils";
import html from "./StatusBadge.html?raw";

export default function StatusBadge(): string {
	return html;
}

function openAuthModal() {
	AuthModal();
}

export function statusBadgeController(root: HTMLElement) {
	const statusBadgeEl = required(
		root.querySelector<HTMLElement>(".status-badge"),
		"status-badge",
	);

	statusBadgeEl.addEventListener("click", openAuthModal);
}
