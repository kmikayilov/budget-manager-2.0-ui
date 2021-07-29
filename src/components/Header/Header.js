import React, { useState } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { AppBar, IconButton, Button, Menu, MenuItem, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useHistory } from 'react-router-dom';
import './Header.scss';

const Header = ({ toggle, user }) => {
	const history = useHistory();

	const [anchorEl, setAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const loginBtnHandler = () => history.push('/sign-in');

	return (
		<AppBar position="static" color="transparent" className="root">
			<IconButton
				className="menuBtn"
				color="inherit"
				aria-label="menu"
				onClick={() => toggle()}>
				<MenuIcon />
			</IconButton>
			<LinkContainer exact={true} to="/">
				<Box
					className="title"
					display="flex"
					justifyContent="space-between"
					alignItems="center">
					<AccountBalanceIcon className="logoIcon" /> Budget Manager
				</Box>
			</LinkContainer>
			{!user && (
				<Button className="actionBtn" onClick={loginBtnHandler} color="inherit">
					Login
				</Button>
			)}
			{!!user && (
				<div className={['sectionDesktop', 'actionButton'].join(' ')}>
					<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls="primary-search-account-menu"
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit">
						<AccountCircle />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						id="primary-search-account-menu"
						keepMounted
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={isMenuOpen}
						onClose={handleMenuClose}>
						<MenuItem onClick={handleMenuClose}>
							Profile: Kanan Mikayilov
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
					</Menu>
				</div>
			)}
		</AppBar>
	);
};

export default Header;
