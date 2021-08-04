import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commonReducer from './commonSlice';
import listsReducer from './listsSlice';
import transactionReducer from './transactionSlice';
import analysisReducer from './analysisSlice';

//combine all reducers here
const rootReducer = combineReducers({
	auth: authReducer,
	common: commonReducer,
	lists: listsReducer,
	analysis: analysisReducer,
	transaction: transactionReducer,
});

export default rootReducer;
