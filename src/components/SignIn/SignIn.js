import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { schema, initialValue } from './schema';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Button, FormHelperText, Grid, Typography, TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { LinkContainer } from 'react-router-bootstrap';

import { loginUser } from '../../helpers/state/authSlice';

import './SignIn.scss';

const SignIn = (props) => {
	const dispatch = useDispatch();
	const _history = useHistory();
	const onSubmit = useCallback(
		(data, { resetForm }) => {
			dispatch(
				loginUser({
					user: {
						email: data.email,
						password: data.password,
					},
				})
			)
				.then(unwrapResult)
				.then((result) => {
					toast.success('User logged successfully!');
					_history.push(`/transactions`);
				})
				.catch((error) => {
					toast.error(error && error.message);
				});
		},
		[dispatch, _history]
	);
	return (
		<div className="sign-in">
			<Box className="auth-modal">
				<div className="title-wrapper">
					<div className="custom-col">
						<div className="custom-row">
							<Typography variant="h4">Sign in</Typography>
						</div>
						<div className="custom-row">
							<Typography variant="h6">Sign in on the platform</Typography>
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
												label="Email"
												required
												variant="outlined"
												className={[
													'input-wrapper',
													touched.email &&
														!errors.email &&
														'valid',
												].join(' ')}
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
								<Grid container spacing={1} justifyContent="center">
									<Grid container spacing={1} alignItems="center">
										<Grid item>
											<LockIcon className="icon" />
										</Grid>
										<Grid
											item
											xs={11}
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											<TextField
												type="password"
												name="password"
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
												label="Password"
												className={[
													'input-wrapper',
													touched.password &&
														!errors.password &&
														'valid',
												].join(' ')}
												required
												variant="outlined"
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
									Sign in
								</Button>
							</form>
						);
					}}
				</Formik>
				<Box style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-start' }}>
					<LinkContainer to="/sign-up" className="link">
						<Typography variant="subtitle1">Sign up</Typography>
					</LinkContainer>
				</Box>
			</Box>
			);
		</div>
	);
};

export default SignIn;
