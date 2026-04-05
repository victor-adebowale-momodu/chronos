import { api } from "../api.js";

export const authStore = {
    user: null,
    loading: true,

    async init() {
        try {
            this.user = await api.getMe();
        } catch (error) {
            console.error(error);
        }
        this.loading = false;
    },

    async logout() {
        await api.logout();
        this.user = null;
        window.location.reload();
    },
};
