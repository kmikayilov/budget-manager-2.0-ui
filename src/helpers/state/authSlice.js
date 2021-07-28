import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import api from "../api"

const initialAuthState = {
	isLoading: false,
	token: null,
	loggedUser: null,
	error: null,
}

export const loginAsync = createAsyncThunk("auth/login", async ({ username, password }, thunkAPI) => {
	// const response = await api.AuthAPI.login(username, password)
	// if (!!response.error) {
	// 	return thunkAPI.rejectWithValue(response.error.errors)
	// }
	// return { token: response.token, user: response.user }
    return null
})

// export const fetchLoggedUser = createAsyncThunk("auth/user", async (thunkAPI) => {
// 	const response = await api.AuthAPI.fetchUser()
// 	if (!!response.error) {
// 		return thunkAPI.rejectWithValue(response.error.Errors || response.error)
// 	}
// 	return { user: response.user }
// })

const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		logout(state, action) {
			state.isLoading = initialAuthState.isLoading
			state.token = initialAuthState.token
			state.loggedUser = initialAuthState.loggedUser
			state.error = initialAuthState.error
		},
	},
	extraReducers: {
		// [loginAsync.pending]: (state, action) => {
		// 	state.isLoading = true
		// },
		// [loginAsync.fulfilled]: (state, action) => {
		// 	state.isLoading = false
		// 	state.token = action.payload.token
		// 	state.loggedUser = action.payload.user
		// 	state.error = null
		// },
		// [loginAsync.rejected]: (state, action) => {
		// 	state.isLoading = false
		// 	state.error = action.payload || action.error
		// },

		// [fetchLoggedUser.pending]: (state, action) => {
		// 	state.isLoading = true
		// },
		// [fetchLoggedUser.fulfilled]: (state, action) => {
		// 	state.isLoading = false
		// 	state.loggedUser = action.payload.user
		// 	state.error = null
		// },
		// [fetchLoggedUser.rejected]: (state, action) => {
		// 	state.isLoading = false
		// 	state.error = action.payload || action.error
		// },
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer