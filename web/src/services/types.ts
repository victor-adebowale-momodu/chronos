export interface SignupPayload {
	name: string;
	email: string;
	password: string;
}

export interface LoginPayload {
	username: string;
	password: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
}
