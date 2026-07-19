import { required } from "./utils";

let cleanup: (() => void) | undefined;

function getModalRoot(): HTMLElement {
	return required(document.getElementById("modal"), "modal");
}

export function showModal(
	markup: string,
	mount?: (root: HTMLElement) => (() => void) | void,
) {
	const root = getModalRoot();
	root.innerHTML = markup;

	const result = mount?.(root);
	cleanup = typeof result === "function" ? result : undefined;
}

export function hideModal() {
	cleanup?.();
	cleanup = undefined;
	getModalRoot().innerHTML = "";
}
