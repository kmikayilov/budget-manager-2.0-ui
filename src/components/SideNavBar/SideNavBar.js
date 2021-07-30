import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ListIcon from '@material-ui/icons/List';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';

import './SideNavBar.scss';

// function getWindowDimensions() {
// 	const { innerWidth: width, innerHeight: height } = window;
// 	return { width, height };
// }

const SideNavBar = ({ logout, isOpen }) => {
	// const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
	// const [openSidebar, setOpenSidebar] = React.useState(isOpen);

	// React.useEffect(() => {
	// 	function handleResize() {
	// 		setWindowDimensions(getWindowDimensions());
	// 	}

	// 	window.addEventListener('resize', handleResize);
	// 	return () => window.removeEventListener('resize', handleResize);
	// }, []);

	// React.useEffect(() => {
	// 	if (windowDimensions.width >= 600) setOpenSidebar(isOpen);
	// 	else setOpenSidebar(false);
	// }, [windowDimensions, isOpen]);

	return (
		<div className={['side-nav-bar', isOpen ? 'open' : ''].join(' ')}>
			<ul>
				<li>
					<LinkContainer exact={true} to="/transactions">
						<Nav.Link eventKey="transactions">
							<b></b>
							<b></b>
							<span className="icon">
								<ListIcon />
							</span>
							Transactions
						</Nav.Link>
					</LinkContainer>
				</li>
				<li>
					<LinkContainer exact={true} to="/transactions/new">
						<Nav.Link eventKey="transactions/new">
							<b></b>
							<b></b>
							<span className="icon">
								<ReceiptIcon />
							</span>
							Transaction addition
						</Nav.Link>
					</LinkContainer>
				</li>
				<li>
					<LinkContainer exact={true} to="/analysis">
						<Nav.Link eventKey="analysis">
							<b></b>
							<b></b>
							<span className="icon">
								<AssessmentIcon />
							</span>
							Analysis
						</Nav.Link>
					</LinkContainer>
				</li>
			</ul>
		</div>
	);
};

export default SideNavBar;
