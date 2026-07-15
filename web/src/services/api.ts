import type { LoginPayload, SignupPayload, User } from "./types";

const api = {
	async signup(payload: SignupPayload): Promise<Response> {
		const response = await fetch("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error("User signup failed");
		}

		return response;
	},

	async login(payload: LoginPayload): Promise<Response> {
		const response = await fetch("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams(JSON.stringify(payload)).toString(),
		});

		if (!response.ok) {
			throw new Error("User login failed");
		}

		return response;
	},

	async getMe(): Promise<User> {
		const response = await fetch("/users/me");

		if (!response.ok) {
			throw new Error("User not authenticated");
		}

		return response.json() as Promise<User>;
	},

	async logout(): Promise<void> {
		await fetch("/auth/logout", {
			method: "POST",
		});
	},
};

export default api;
