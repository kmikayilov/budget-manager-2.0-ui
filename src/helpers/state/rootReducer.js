import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commonReducer from './commonSlice';
import listsReducer from './listsSlice';
import transactionReducer from './transactionSlice';

//combine all reducers here
const rootReducer = combineReducers({
	auth: authReducer,
	common: commonReducer,
	lists: listsReducer,
	transaction: transactionReducer,
});

export default rootReducer;
