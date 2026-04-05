import api from "../api.js";

export function signupData() {
    return {
        formData: {
            full_name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        get passwordMismatch() {
            return (
                this.formData.confirmPassword !== "" &&
                this.formData.password !== this.formData.confirmPassword
            );
        },

        async submit() {
            if (this.passwordMismatch) return;
            const { confirmPassword, ...payload } = this.formData;
            await api.signup(JSON.stringify(payload));
            window.location.href = "/";
        },
    };
}

export function loginData() {
    return {
        formData: {
            email: "",
            password: "",
        },

        async submit() {
            const params = new URLSearchParams();
            params.append("username", this.formData.email);
            params.append("password", this.formData.password);
            await api.login(params);
            window.location.href = "/";
        },
    };
}
