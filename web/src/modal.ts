import { required } from "./utils";

let cleanup: (() => void) | undefined;
let controller: AbortController | undefined;

function getModalRoot(): HTMLElement {
    return required(document.getElementById("modal-root"), "modal-root");
}

export function showModal(
    markup: string,
    mount?: (root: HTMLElement) => (() => void) | void,
) {
    hideModal();

    const root = getModalRoot();
    root.innerHTML = markup;

    controller = new AbortController();
    const { signal } = controller;

    const overlay = root.querySelector(".modal-overlay");
    if (overlay) {
        overlay.addEventListener(
            "click",
            (e) => {
                if (e.target === overlay) hideModal();
            },
            { signal },
        );
    }

    document.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Escape") hideModal();
        },
        { signal },
    );

    const result = mount?.(root);
    cleanup = typeof result === "function" ? result : undefined;
}

export function hideModal() {
    cleanup?.();
    cleanup = undefined;

    controller?.abort();
    controller = undefined;

    getModalRoot().innerHTML = "";
}
