const api = {
    async signup(payload) {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
        });
        if (!response.ok) throw new Error("User signup failed");
        return response;
    },

    async login(payload) {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload,
        });
        if (!response.ok) throw new Error("User login failed");
        return response;
    },

    async getMe() {
        const response = await fetch("/users/me");
        if (!response.ok) throw new Error("User not authenticated");
        return response.json();
    },

    async logout() {
        await fetch("/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
    },
};
