import React from 'react';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

const Header = ({ logout, toggle, user }) => {
	return (
		<Navbar
			collapseOnSelect
			bg='dark'
			variant='dark'
			expand='lg'
			className='AppNavBar p-0'
			fixed='top'>
			<LinkContainer exact={true} to='/'>
				<Navbar.Brand className='col-md-3 col-lg-2 mr-0' href='#'>
					<FontAwesomeIcon icon={faWallet} className='mx-2' />
					Budget Manager
				</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle onClick={toggle} className='mr-3 position-absolute d-md-none' />
			{!user && (
				<LinkContainer exact={true} to='/sign-in'>
					<Nav.Link href='#' className='ml-auto mr-3 d-none d-md-block'>
						Sign in
						<span className='mx-2'>
							<FontAwesomeIcon icon={faSignInAlt} />
						</span>
					</Nav.Link>
				</LinkContainer>
			)}
			{!!user && (
				<NavDropdown
					// title={user.firstname + " " + user.lastname}
					title='Kanan Mikayilov'
					id='collasible-nav-dropdown'
					className='ml-auto mr-3 d-none d-md-block'>
					<NavDropdown.Item className='pt-0 pb-0'>
						<div className='pt-0 pb-0 p-0' onClick={logout}>
							Sign out
							<span className='ml-2'>
								<FontAwesomeIcon icon={faSignOutAlt} />
							</span>
						</div>
					</NavDropdown.Item>
				</NavDropdown>
			)}
		</Navbar>
	);
};

export default Header;
