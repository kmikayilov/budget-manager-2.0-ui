import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'; //useSelector, useDispatch, shallowEqual
import Home from './components/Home/Home';
// import api from './helpers/api';
import { logout } from './helpers/state/authSlice';
import { fetchLoggedUser } from './helpers/state/authSlice';
import { loaded } from './helpers/state/commonSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// const token = window.localStorage.getItem('app-jwt-token');
		const token = null;
		if (token) {
			// api.setToken(token);
			// dispatch(fetchLoggedUser());
		}
		// api.setLogoutFn(() => dispatch(logout()));
		// dispatch(loaded());
	}, [dispatch]);

	const logoutHandler = useCallback(() => {
		// dispatch(logout());
		window.location.pathname = '/';
	}, [dispatch]);

	const user = null;
	// const user = useSelector((store) => store.auth.loggedUser, shallowEqual);

	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/sign-in'>
						<SignIn />
					</Route>
					<Route
						path='/'
						render={() =>
							!user ? <Home logout={logoutHandler} user={user} /> : <SignIn />
						}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
