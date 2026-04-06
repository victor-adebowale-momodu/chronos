import api from "../api.js";

const authStore = {
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

    get userInitials() {
        if (this.user) {
            const names = this.user.full_name.split(" ");
            return names.map((name) => name[0].toUpperCase()).join("");
        }
        return "";
    },

    async logout() {
        await api.logout();
        this.user = null;
        window.location.reload();
    },
};

export default authStore;
