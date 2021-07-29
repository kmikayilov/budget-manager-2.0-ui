import React from 'react';
import Header from '../Header/Header';
import { Typography, Box } from '@material-ui/core';
import { LinkContainer } from 'react-router-bootstrap';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import './Landing.scss';

const Landing = ({ user }) => {
	return (
		<div className="landing">
			<Header user={user} />
			<Box
				className="landing-main"
				display="flex"
				flexDirection="column"
				alignItems="center">
				<AccountBalanceIcon />
				<Typography variant="h4">Welcome to Budget Manager</Typography>
				<LinkContainer exact={true} to="/sign-in">
					<Typography variant="h6">
						Login to proceed further in the website
					</Typography>
				</LinkContainer>
			</Box>
		</div>
	);
};

export default Landing;
