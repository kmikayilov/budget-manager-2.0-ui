import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import api from './helpers/api';
import { fetchLoggedUser, logout } from './helpers/state/authSlice';
import { loaded } from './helpers/state/commonSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = window.localStorage.getItem('app-jwt-token');
		if (!!token) {
			api.setToken(token);
			dispatch(fetchLoggedUser());
		}
		api.setLogoutFn(() => dispatch(logout()));
		dispatch(loaded());
	}, [dispatch]);

	const logoutHandler = useCallback(() => {
		dispatch(logout());
		window.location.pathname = '/transactions';
	}, [dispatch]);

	const user = useSelector((store) => store.auth.loggedUser, shallowEqual);

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/sign-up">
						<SignUp />
					</Route>
					<Route exact path="/sign-in">
						<SignIn />
					</Route>
					<Route
						path="/"
						render={() =>
							!!user ? (
								<Home logout={logoutHandler} user={user} />
							) : (
								<Landing user={user} />
							)
						}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
