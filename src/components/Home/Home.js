import React, { useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Header from '../Header/Header';
import SideNavBar from '../SideNavBar/SideNavBar';
import TransactionsList from '../TransactionsList/TransactionsList';
import TransactionAdd from '../TransactionAdd/TransactionAdd';
import TransactionEdit from '../TransactionEdit/TransactionEdit';
import Analysis from '../Analysis/Analysis';

import './Home.scss';

const Home = ({ logout, user }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="Home" data-testid="Home">
			<Header logout={logout} user={user} toggle={() => setIsOpen(!isOpen)} />
			<Grid container className="main">
				<SideNavBar isOpen={isOpen} />
				<Switch>
					<Route path="/transactions" exact>
						<TransactionsList />
					</Route>
					<Route path="/transactions/new" exact>
						<TransactionAdd />
					</Route>
					<Route path="/transaction/:id" exact>
						<TransactionEdit />
					</Route>
					<Route path="/analysis" exact>
						<Analysis />
					</Route>
				</Switch>
			</Grid>
		</div>
	);
};

export default Home;
