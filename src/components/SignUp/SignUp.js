import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { schema, initialValue } from './schema';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, FormHelperText, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
// import './AuthModal.scss';
import { registerUser } from '../../helpers/state/authSlice';

import './SignUp.scss';

toast.configure();

const SignUp = (props) => {
	const dispatch = useDispatch();
	const _history = useHistory();

	// const categories = useSelector((state) => state.lists.categories.data, shallowEqual);
	// const payments = useSelector((state) => state.lists.payments.data, shallowEqual);
	// const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	const onSubmit = useCallback((data, { resetForm }) => {
		dispatch(
			registerUser({
				user: {
					email: data.email,
					username: data.username,
					password: data.password,
				},
			})
		)
			.then(unwrapResult)
			.then((result) => {
				toast.success('User created successfully!');
				resetForm({ values: initialValue });
				_history.push(`/sign-in`);
			})
			.catch((error) => {
				toast.error('User creation failed!');
				console.log('Error message', error);
			});
	}, []);
	return (
		<div className="sign-in">
			<Box className="auth-modal">
				<div className="title-wrapper">
					<div className="custom-col">
						<div className="custom-row">
							<Typography variant="h4">Sign up</Typography>
						</div>
						<div className="custom-row">
							<Typography variant="h6">Sign up on the platform</Typography>
						</div>
					</div>
					<div className="custom-col">
						<AccountBalanceIcon />
					</div>
				</div>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={initialValue}
					enableReinitialize={true}>
					{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
						return (
							<form
								className="form"
								noValidate
								onSubmit={handleSubmit}
								autoComplete="off">
								<Grid
									style={{ marginBottom: '30px' }}
									container
									spacing={1}
									direction="row"
									justifyContent="center">
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<EmailIcon className="icon" />
										</Grid>
										<Grid item xs={11}>
											<TextField
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												label="email"
												required
												variant="outlined"
												id="outlined-full-width"
												className="input"
												fullWidth
												error={touched.email && !!errors.email}
											/>
										</Grid>
									</Grid>
									<Grid item>
										{touched.email && !!errors.email && (
											<FormHelperText>
												{errors.email}
											</FormHelperText>
										)}
									</Grid>
								</Grid>
								<Grid
									style={{ marginBottom: '30px' }}
									container
									spacing={1}
									direction="row"
									justifyContent="center">
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<AccountCircle className="icon" />
										</Grid>
										<Grid item xs={11}>
											<TextField
												name="username"
												value={values.username}
												onChange={handleChange}
												onBlur={handleBlur}
												label="Username"
												required
												variant="outlined"
												id="outlined-full-width"
												className="input"
												fullWidth
												error={
													touched.username &&
													!!errors.username
												}
											/>
										</Grid>
									</Grid>
									<Grid item>
										{touched.username && !!errors.username && (
											<FormHelperText>
												{errors.username}
											</FormHelperText>
										)}
									</Grid>
								</Grid>
								<Grid container spacing={1} justifyContent="center">
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<LockIcon className="icon" />
										</Grid>
										<Grid item xs={11}>
											<TextField
												name="password"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												label="Password"
												className="input"
												required
												variant="outlined"
												id="outlined-full-width"
												fullWidth
												error={
													touched.password &&
													!!errors.password
												}
											/>
										</Grid>
									</Grid>
									<Grid item>
										{touched.password && !!errors.password && (
											<FormHelperText>
												{errors.password}
											</FormHelperText>
										)}
									</Grid>
								</Grid>
								<Button
									className="btn"
									fullWidth
									variant="contained"
									color="primary"
									type="submit">
									Sign up
								</Button>
							</form>
						);
					}}
				</Formik>
				<Box style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-start' }}>
					<LinkContainer to="/sign-in" className="link">
						<Typography variant="subtitle1">Sign in</Typography>
					</LinkContainer>
				</Box>
			</Box>
			);
		</div>
	);
};

export default SignUp;
