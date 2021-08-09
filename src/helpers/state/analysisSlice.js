import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialAnalysisState = {
	categoriesDonutChart: { data: null, error: null, isFetching: false },
	incomeExpenseBarChart: { data: null, error: null, isFetching: false },
	totalNetBarChart: { data: null, error: null, isFetching: false },
};

export const selectCategoriesDonutChart = createAsyncThunk(
	'analysis/categories-donut-chart',
	async (data, thunkAPI) => {
		const response = await api.AnalysisAPI.selectCategoriesDonutChart(data);
		if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
		return response;
	}
);

export const selectIncomeExpenseBarChart = createAsyncThunk(
	'analysis/income-expense-bar-chart',
	async (data, thunkAPI) => {
		const response = await api.AnalysisAPI.selectIncomeExpenseBarChart(data);
		if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
		return response;
	}
);

export const selectTotalNetBarChart = createAsyncThunk(
	'analysis/total-net-bar-chart',
	async (data, thunkAPI) => {
		const response = await api.AnalysisAPI.selectTotalNetBarChart(data);
		if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
		return response;
	}
);

const analysisSlice = createSlice({
	name: 'analysis',
	initialState: initialAnalysisState,
	reducers: {
		// logout(state, action) {
		// 	state.isLoading = initialAuthState.isLoading;
		// 	state.token = initialAuthState.token;
		// 	state.loggedUser = initialAuthState.loggedUser;
		// 	state.error = initialAuthState.error;
		// },
	},
	extraReducers: {
		[selectCategoriesDonutChart.pending]: (state, action) => {
			state.isFetching = true;
		},
		[selectCategoriesDonutChart.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.categoriesDonutChart.data = [...action.payload];
			state.error = null;
		},
		[selectCategoriesDonutChart.rejected]: (state, action) => {
			state.isFetching = false;
			state.error = action.payload || action.error;
		},

		[selectIncomeExpenseBarChart.pending]: (state, action) => {
			state.isFetching = true;
		},
		[selectIncomeExpenseBarChart.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.incomeExpenseBarChart.data = [...action.payload];
			state.error = null;
		},
		[selectIncomeExpenseBarChart.rejected]: (state, action) => {
			state.isFetching = false;
			state.error = action.payload || action.error;
		},

		[selectTotalNetBarChart.pending]: (state, action) => {
			state.isFetching = true;
		},
		[selectTotalNetBarChart.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.totalNetBarChart.data = [...action.payload];
			state.error = null;
		},
		[selectTotalNetBarChart.rejected]: (state, action) => {
			state.isFetching = false;
			state.error = action.payload || action.error;
		},
	},
});

// export const { logout } = analysisSlice.actions;
export default analysisSlice.reducer;
