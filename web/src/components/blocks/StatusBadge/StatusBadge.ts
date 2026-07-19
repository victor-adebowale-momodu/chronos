import AuthModal, {
	authModalController,
} from "@/components/modals/AuthModal/AuthModal";
import { showModal } from "@/modal";
import { required } from "@/utils";
import html from "./StatusBadge.html?raw";

export default function StatusBadge(): string {
	return html;
}

function openAuthModal() {
	showModal(AuthModal(), authModalController);
}

export function statusBadgeController(root: HTMLElement) {
	const statusBadgeEl = required(
		root.querySelector<HTMLElement>(".status-badge"),
		"status-badge",
	);
	statusBadgeEl.addEventListener("click", openAuthModal);
}
