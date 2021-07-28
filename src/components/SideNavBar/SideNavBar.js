import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	// 	faClipboardList,
	// 	faFileAlt,
	faList,
	// 	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import './SideNavBar.scss';

const SideNavBar = ({ logout, isShown }) => (
	<Navbar.Collapse
		className={['col-md-3 col-lg-2 d-md-block sidebar', isShown ? 'show' : ''].join(' ')}>
		<div className='sidebar-sticky pt-3'>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<LinkContainer exact={true} to='/ministry-kp-code'>
						<Nav.Link eventKey='ministry-kp-code'>
							<span className='icon mr-3'>
								<FontAwesomeIcon icon={faList} />
							</span>
							KP kodlar
						</Nav.Link>
					</LinkContainer>
				</li>
				{/* <li className='nav-item'>
					<LinkContainer
						exact={true}
						to='#'
						onClick={logout}
						className='d-block d-md-none'>
						<Nav.Link eventKey='#'>
							<span className='icon mr-3'>
								<FontAwesomeIcon icon={faSignOutAlt} />
							</span>
							Çıxış
						</Nav.Link>
					</LinkContainer>
				</li> */}
			</ul>
		</div>
	</Navbar.Collapse>
);

export default SideNavBar;
