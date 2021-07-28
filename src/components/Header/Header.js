import React, { useState } from "react";

import { LinkContainer } from "react-router-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import "./Header.scss";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#222b36",
		color: "#7b8794",
		borderColor: "#35404b",
	},
	menuButton: {
		marginRight: theme.spacing(3),
	},
	title: {
		cursor: "pointer",
	},
	actionButton: {
		marginLeft: "auto",
	},
	logoIcon: {
		marginRight: "10px",
	},
}));

const Header = ({ logout, toggle, user }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	return (
		<div className={classes.grow}>
			<AppBar position="static" color="transparent" className={classes.root}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<LinkContainer exact={true} to="/">
						<Box className={classes.title} display="flex" justifyContent="space-between" alignItems="center">
							<AccountBalanceIcon className={classes.logoIcon} /> Budget Manager
						</Box>
					</LinkContainer>
					{!!user && (
						<Button className={classes.actionButton} color="inherit">
							Login
						</Button>
					)}
					{!user && (
						<div className={[classes.sectionDesktop, classes.actionButton].join(" ")}>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls="primary-search-account-menu"
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								anchorOrigin={{ vertical: "top", horizontal: "right" }}
								id="primary-search-account-menu"
								keepMounted
								transformOrigin={{ vertical: "top", horizontal: "right" }}
								open={isMenuOpen}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleMenuClose}>Profile: Kanan Mikayilov</MenuItem>
								<MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
