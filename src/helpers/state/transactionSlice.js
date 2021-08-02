import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionNormalizer } from '../utils';
import api from '../api';

const initialState = {
	isFetching: false,
	filter: null,
	page: 0,
	fetchType: '', //delete
	transactions: null,
	transactionCount: null,
	transaction: null,
	error: null,
	edit: {
		isSaving: false,
		result: null,
		error: null,
	},
	add: {
		isSaving: false,
		result: null,
		error: null,
	},
};

// export const fetchTransactions = createAsyncThunk('transactions/fetch', async (_, thunkAPI) => {
// 	const state = thunkAPI.getState();
// 	const filter = state.transaction.filter;
// 	const page = state.transaction.page;
// 	const transactionsList = state.transaction.transactions;
// 	const response = await api.TransactionAPI.selectTransactions({
// 		filter,
// 		page,
// 		transactionsList,
// 	});
// 	if (!!response.authError) return thunkAPI.rejectWithValue(response);
// 	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);

// 	return response;
// });

export const deleteTransaction = createAsyncThunk(
	'transaction/delete',
	async ({ id, data }, thunkAPI) => {
		const response = await api.TransactionAPI.deleteTransaction({ id, data });
		if (!!response.error)
			return thunkAPI.rejectWithValue(response.error.errors || response.error);
		return response;
	}
);

export const editTransaction = createAsyncThunk(
	'transaction/edit',
	async ({ id, data }, thunkAPI) => {
		const response = await api.TransactionAPI.editTransaction({ id, data });
		if (!!response.error)
			return thunkAPI.rejectWithValue(response.error.errors || response.error);
		return response;
	}
);

export const addTransaction = createAsyncThunk('transaction/create', async (data, thunkAPI) => {
	const response = await api.TransactionAPI.addTransaction(data);
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors || response.error);
	return response;
});

export const fetchTransaction = createAsyncThunk('transaction/fetch', async (id, thunkAPI) => {
	const response = await api.TransactionAPI.fetchTransaction(id);
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);
	return response;
});

// export const editJobFamily = createAsyncThunk('jobFamily/edit', async ({ id, data }, thunkAPI) => {
// 	const response = await api.TransactionAPI.editJobFamily({ id, data });
// 	if (!!response.error) {
// 		return thunkAPI.rejectWithValue(response.error.errors || response.error);
// 	} else if (!!response.errors) {
// 		return thunkAPI.rejectWithValue(response.errors);
// 	}
// 	return { result: response.jobFamily };
// });

const transactionSlice = createSlice({
	name: 'transaction',
	initialState: initialState,
	reducers: {
		clearTransaction(state) {
			state.transaction = null;
		},
		clearErrors(state) {
			state.add.error = initialState.add.error;
			state.edit.error = initialState.edit.error;
		},
		clearError(state) {
			state.error = initialState.error;
		},
		setFetchType(state, action) {
			state.fetchType = action.payload;
		},
	},
	extraReducers: {
		// [fetchTransactions.pending]: (state, action) => {
		// 	state.isFetching = true;
		// },
		// [fetchTransactions.fulfilled]: (state, action) => {
		// 	state.isFetching = false;
		// 	state.transactions = action.payload.transactions;
		// 	state.transactionsCount = action.payload.transactionsCount;
		// 	state.error = null;
		// },
		// [fetchTransactions.rejected]: (state, action) => {
		// 	state.isFetching = false;
		// 	state.error = action.payload || action.error;
		// },
		// [editJobFamily.pending]: (state, action) => {
		//     state.edit.isSaving = true;
		//     state.edit.result = null;
		//     state.edit.error = null;
		// },
		// [editJobFamily.fulfilled]: (state, action) => {
		//     state.edit.isSaving = false;
		//     state.edit.result = action.payload.result;
		//     state.edit.error = null;
		// },
		// [editJobFamily.rejected]: (state, action) => {
		//     state.edit.isSaving = false;
		//     state.edit.result = null;
		//     state.edit.error = action.payload || action.error;
		// },

		// fetch transaction
		[fetchTransaction.pending]: (state, action) => {
			state.isFetching = true;
		},
		[fetchTransaction.fulfilled]: (state, action) => {
			console.log(action);
			state.isFetching = false;
			state.transaction = transactionNormalizer(action.payload);
			state.error = null;
		},
		[fetchTransaction.rejected]: (state, action) => {
			state.isFetching = false;
			state.error = action.payload || action.error;
		},

		// add transaction
		[addTransaction.pending]: (state, action) => {
			state.add.isSaving = true;
			state.add.result = null;
			state.add.error = null;
		},
		[addTransaction.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.add.isSaving = false;
			state.add.result = action.payload.result;
			state.add.error = null;
		},
		[addTransaction.rejected]: (state, action) => {
			state.add.isSaving = false;
			state.add.result = null;
			state.add.error = action.payload || action.error;
		},
	},
});

export const { clearTransaction, clearErrors, clearError, setFetchType } = transactionSlice.actions;
export default transactionSlice.reducer;
