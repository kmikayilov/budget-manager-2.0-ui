import React, { useCallback } from 'react';

import './SignIn.scss';
import AuthModal from '../AuthModal/AuthModal';

const SignIn = (props) => {
	const onSubmit = useCallback((data, { resetForm }) => {}, []);
	return (
		<div className="sign-in">
			<AuthModal onSubmit={onSubmit} type="signin" />
		</div>
	);
};

export default SignIn;
