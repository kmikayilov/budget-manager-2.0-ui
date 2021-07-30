import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './helpers/state/store';

import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap/dist/css/bootstrap.min.css"
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
