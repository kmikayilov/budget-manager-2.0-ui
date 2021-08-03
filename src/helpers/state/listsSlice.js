import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryNormalizer, transactionNormalizer } from '../utils';
import api from '../api';

const initialState = {
	transactions: { isFetching: false, data: null, error: null, count: 0 },
	categories: { isFetching: false, data: null, error: null, count: 0 },
	payments: { isFetching: false, data: null, error: null, count: 0 },
	accountings: { isFetching: false, data: null, error: null, count: 0 },
};

export const fetchTransactions = createAsyncThunk('lists/transactions', async (_, thunkAPI) => {
	const response = await api.ListsAPI.selectTransactions();
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);

	return response;
});

export const fetchCategories = createAsyncThunk('lists/categories', async (_, thunkAPI) => {
	const response = await api.ListsAPI.selectCategories();
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);

	return response;
});

export const fetchAccountings = createAsyncThunk('lists/accountings', async (_, thunkAPI) => {
	const response = await api.ListsAPI.selectAccountings();
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);

	return response;
});

export const fetchPayments = createAsyncThunk('lists/payments', async (_, thunkAPI) => {
	const response = await api.ListsAPI.selectPayments();
	if (!!response.error) return thunkAPI.rejectWithValue(response.error.Errors || response.error);

	return response;
});

const listsSlice = createSlice({
	name: 'lists',
	initialState: initialState,
	reducers: {
		clearTransactions(state) {
			state.transactions = initialState.transactions;
		},
		clearCategories(state) {
			state.categories = initialState.categories;
		},
		clearPayments(state) {
			state.payments = initialState.payments;
		},
		clearAccountings(state) {
			state.accountings = initialState.accountings;
		},
	},
	extraReducers: {
		// transactions
		[fetchTransactions.pending]: (state, action) => {
			state.transactions.isFetching = true;
		},
		[fetchTransactions.fulfilled]: (state, action) => {
			let transactions = action.payload.transactions;
			let data = [];

			if (transactions)
				transactions.forEach((item, i) => data.push(transactionNormalizer(item)));

			state.transactions.isFetching = false;
			state.transactions.data = data;
			state.transactions.count = action.payload.transactionsCount;
			state.transactions.error = null;
		},
		[fetchTransactions.rejected]: (state, action) => {
			console.log(action);
			state.transactions.isFetching = false;
			state.transactions.error = action.payload || action.error;
		},

		// categories
		[fetchCategories.pending]: (state, action) => {
			state.categories.isFetching = true;
		},
		[fetchCategories.fulfilled]: (state, action) => {
			let categories = action.payload.categories;
			let data = [];

			if (categories) categories.forEach((item, i) => data.push(categoryNormalizer(item)));

			state.categories.isFetching = false;
			state.categories.data = data;
			state.categories.count = action.payload.categoriesCount;
			state.categories.error = null;
		},
		[fetchCategories.rejected]: (state, action) => {
			state.categories.isFetching = false;
			state.categories.error = action.payload || action.error;
		},

		// payments
		[fetchPayments.pending]: (state, action) => {
			state.payments.isFetching = true;
		},
		[fetchPayments.fulfilled]: (state, action) => {
			state.payments.isFetching = false;
			state.payments.data = action.payload.payments;
			state.payments.count = action.payload.paymentsCount;
			state.payments.error = null;
		},
		[fetchPayments.rejected]: (state, action) => {
			state.payments.isFetching = false;
			state.payments.error = action.payload || action.error;
		},

		// accountings
		[fetchAccountings.pending]: (state, action) => {
			state.accountings.isFetching = true;
		},
		[fetchAccountings.fulfilled]: (state, action) => {
			state.accountings.isFetching = false;
			state.accountings.data = action.payload.accountings;
			state.accountings.count = action.payload.accountingsCount;
			state.accountings.error = null;
		},
		[fetchAccountings.rejected]: (state, action) => {
			state.accountings.isFetching = false;
			state.accountings.error = action.payload || action.error;
		},
	},
});

export const { clearTransactions, clearCategories, clearPayments, clearAccountings } =
	listsSlice.actions;
export default listsSlice.reducer;
