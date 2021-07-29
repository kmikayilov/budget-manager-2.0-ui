import React, { useCallback } from 'react';

import './SignUp.scss';
import AuthModal from '../AuthModal/AuthModal';

const SignUp = (props) => {
	const onSubmit = useCallback((data, { resetForm }) => {}, []);
	return (
		<div className="sign-up">
			<AuthModal onSubmit={onSubmit} type="signup" />
		</div>
	);
};

export default SignUp;
