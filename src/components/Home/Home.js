import React, { useState } from 'react';
import './Home.scss';
import { Switch, Route } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import SideNavBar from '../SideNavBar/SideNavBar';
import Header from '../Header/Header';

const Home = ({ logout, user }) => {
	const [isShown, setIsShown] = useState(false);
	const toggle = () => setIsShown(!isShown);

	return (
		<div className='Home' data-testid='Home'>
			<Header logout={logout} user={user} toggle={toggle} />
			<Container fluid>
				<Row>
					<SideNavBar isShown={isShown} logout={logout} />
					<Switch>
						<Route path='/' exact>
							{/* <ReceiptList /> */}
						</Route>
					</Switch>
				</Row>
			</Container>
		</div>
	);
};

export default Home;
