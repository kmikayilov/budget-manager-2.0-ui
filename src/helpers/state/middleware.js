import { loginAsync, logout } from "./authSlice"
// import api from "../api"

const localStorageMiddleware = (store) => (next) => (action) => {
	if (action.type === loginAsync.fulfilled.type) {
		if (!!action.payload.token) {
			window.localStorage.setItem("app-jwt-token", action.payload.token)
			// api.setToken(action.payload.token)
		}
	} else if (action.type === logout.type) {
		window.localStorage.setItem("app-jwt-token", "")
		// api.setToken(null)
	}

	next(action)
}

export { localStorageMiddleware }