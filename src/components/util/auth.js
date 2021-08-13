import { useState } from 'react';

export default function useToken() {
	const getToken = () => {
		const tokenString = localStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken?.token;
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (userToken) => {
		localStorage.setItem('token', JSON.stringify(userToken));
		setToken(userToken.token);
	};

	return {
		setToken: saveToken,
		token,
	};
}

export const fakeAuth = {
	isAuthenticated: true,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100); // fake async
	},
};