import close from "@material-symbols/svg-400/outlined/close.svg?raw";
import AltAuth from "@/components/common/AltAuth/AltAuth";
import SignupForm from "@/components/forms/SignupForm/SignupForm";
import { render } from "@/utils";
import Modal from "../Modal/Modal";
import html from "./AuthModal.html?raw";

export default function AuthModal(): string {
	const content = render(html, {
		close,
		signupForm: SignupForm(),
		altAuth: AltAuth(),
	});

	return Modal({ content });
}
