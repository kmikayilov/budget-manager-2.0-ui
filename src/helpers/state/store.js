  
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { localStorageMiddleware } from "./middleware"

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store