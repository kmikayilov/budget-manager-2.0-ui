import { loginUser, logout } from './authSlice';
// import api from "../api"

const localStorageMiddleware = (store) => (next) => (action) => {
	if (action.type === loginUser.fulfilled.type) {
		if (!!action.payload.token)
			window.localStorage.setItem('app-jwt-token', action.payload.token);
	} else if (action.type === logout.type) {
		window.localStorage.setItem('app-jwt-token', '');
		// api.setToken(null)
	}

	next(action);
};

export { localStorageMiddleware };
