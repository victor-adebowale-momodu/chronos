import close from "@material-symbols/svg-400/outlined/close.svg?raw";
import AltAuth from "@/components/common/AltAuth/AltAuth";
import SignupForm from "@/components/forms/SignupForm/SignupForm";
import { render, required } from "@/utils";
import Modal, { modalController } from "../Modal/Modal";
import html from "./AuthModal.html?raw";

export default function AuthModal(): string {
	const content = render(html, {
		close,
		signupForm: SignupForm(),
		altAuth: AltAuth(),
	});

	return Modal({ content });
}

export function authModalController(root: HTMLElement) {
	const cleanupModal = modalController(root);

	const closeBtn = required(
		root.querySelector<HTMLButtonElement>("#btn-auth-modal-close"),
		"btn-auth-modal-close",
	);
	closeBtn.addEventListener("click", () => {
		cleanupModal();
	});

	return () => cleanupModal?.();
}
