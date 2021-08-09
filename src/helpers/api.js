const url = require('url');
let token = null;
const setToken = (newToken) => {
	token = newToken;
};
let logoutFn = null;
const setLogoutFn = (logout) => {
	logoutFn = logout;
};

const API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:8000/'
		: 'https://' + window.location.host + '/api/';

const FetchAPI = {
	post: (urlStr, data) => {
		return fetch(url.resolve(API_URL, urlStr), {
			method: 'POST',
			body: data,
			headers: {
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
		}).then(handleResponse);
	},
	postJson: (urlStr, data) => {
		return fetch(url.resolve(API_URL, urlStr), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
			body: JSON.stringify(data),
		}).then(handleResponse);
	},
	putJson: (urlStr, data) => {
		return fetch(url.resolve(API_URL, urlStr), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
			body: JSON.stringify(data),
		}).then(handleResponse);
	},
	deleteJson: (urlStr, data) => {
		return fetch(url.resolve(API_URL, urlStr), {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
			body: JSON.stringify(data),
		}).then(handleResponse);
	},
	getJson: (urlStr, params) => {
		urlStr = url.resolve(API_URL, urlStr);
		var urlObj = new URL(urlStr);
		if (!!params) {
			urlObj.search = new URLSearchParams(params).toString();
		}
		return fetch(urlObj, {
			headers: {
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
		}).then(handleResponse);
	},
	get: (urlStr, params) => {
		urlStr = url.resolve(API_URL, urlStr);
		var urlObj = new URL(urlStr);
		if (!!params) {
			urlObj.search = new URLSearchParams(params).toString();
		}
		return fetch(urlObj, {
			headers: {
				Authorization: !!token && 'Bearer ' + token,
			},
			credentials: 'include',
		}).then(handleResponse);
	},
};

const handleResponse = async (response) => {
	if (response.status === 401) {
		logoutFn();
	}

	if (response.status === 403) {
		// logoutFn();
		return { authError: 'Səlahiyyətiniz yoxdur!' };
	}

	var responseObj = null;

	const contentType = (response.headers.get('content-type') || '').toLowerCase();
	try {
		if (contentType.indexOf('application/json') !== -1) {
			responseObj = await response.json();
		} else if (contentType.indexOf('application/pdf') !== -1) {
			responseObj = await response.blob();
		} else {
			responseObj = await response.json();
		}
	} catch {
		responseObj = null;
	}

	if (response.ok) {
		return responseObj;
	} else {
		return {
			error: responseObj,
		};
	}
};

const TransactionAPI = {
	filterTransactions: (data) => FetchAPI.postJson('transaction/filter', data),
	addTransaction: (data) => FetchAPI.postJson('transaction/create', data),
	fetchTransaction: (id) => FetchAPI.get('transaction/' + id),
	deleteTransaction: ({ id, data }) => FetchAPI.deleteJson('transaction/' + id, data),
	editTransaction: ({ id, data }) => FetchAPI.putJson('transaction/' + id, data),
};

const AuthAPI = {
	loginUser: (data) => FetchAPI.postJson('auth/login', data),
	fetchUser: () => FetchAPI.get('auth/user'),
	registerUser: (data) => FetchAPI.postJson('auth/register', data),
};

const ListsAPI = {
	selectTransactions: () => FetchAPI.get('transactions'),
	selectCategories: () => FetchAPI.get('categories'),
	selectPayments: () => FetchAPI.get('payments'),
	selectAccountings: () => FetchAPI.get('accountings'),
};

const AnalysisAPI = {
	selectCategoriesDonutChart: () => FetchAPI.get('analysis/categories-donut-chart'),
	selectIncomeExpenseBarChart: () => FetchAPI.get('analysis/income-expense-bar-chart'),
	selectTotalNetBarChart: () => FetchAPI.get('analysis/total-net-bar-chart'),
};

const api = {
	setToken,
	setLogoutFn,
	API_URL,
	AuthAPI,
	ListsAPI,
	FetchAPI,
	AnalysisAPI,
	TransactionAPI,
};

export default api;
