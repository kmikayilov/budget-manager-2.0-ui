
import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import commonReducer from "./commonSlice"


//combine all reducers here
const rootReducer = combineReducers({
	auth: authReducer,
	common: commonReducer,
})

export default rootReducer