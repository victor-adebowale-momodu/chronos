import { render } from "@/utils/template";
import html from "./AuthModal.html?raw";
import close from "@material-symbols/svg-400/outlined/close.svg?raw";
import SignupForm from "@/components/forms/SignupForm/SignupForm";
import AltAuth from "@/components/common/AltAuth/AltAuth";

export default function AuthModal(): string {
    return render(html, {
        close,
        signupForm: SignupForm(),
        altAuth: AltAuth(),
    });
}
