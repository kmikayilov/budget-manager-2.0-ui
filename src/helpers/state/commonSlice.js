import { createSlice } from "@reduxjs/toolkit"

const initialAuthState = {
	isLoading: true,
}

const authSlice = createSlice({
	name: "common",
	initialState: initialAuthState,
	reducers: {
		loaded: (state) => {
			state.isLoading = false
		},
	},
})

export const { loaded } = authSlice.actions
export default authSlice.reducer