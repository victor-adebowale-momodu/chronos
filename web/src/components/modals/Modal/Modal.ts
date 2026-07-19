import { hideModal } from "@/modal";
import { render, required } from "@/utils";
import html from "./Modal.html?raw";

export default function Modal({ content }: { content: string }): string {
	return render(html, { content });
}

export function modalController(root: HTMLElement) {
	const overlay = required(
		root.querySelector(".modal-overlay"),
		"modal-overlay",
	);
	const controller = new AbortController();

	overlay.addEventListener(
		"click",
		(e) => {
			if (e.target === overlay) hideModal();
		},
		{ signal: controller.signal },
	);

	document.addEventListener(
		"keydown",
		(e) => {
			if (e.key === "Escape") hideModal();
		},
		{ signal: controller.signal },
	);

	return () => controller.abort();
}
