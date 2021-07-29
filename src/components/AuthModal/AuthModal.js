import React from 'react';
import { Formik } from 'formik';
import { schema, initialValue } from './schema';

import { Box, Button, FormHelperText, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { LinkContainer } from 'react-router-bootstrap';

import './AuthModal.scss';

const AuthModal = ({ onSubmit, type }) => {
	return (
		<Box className="auth-modal">
			<div className="title-wrapper">
				<div className="custom-col">
					<div className="custom-row">
						<Typography variant="h4">
							{type === 'signin' ? 'Sign in' : 'Sign up'}
						</Typography>
					</div>
					<div className="custom-row">
						<Typography variant="h6">
							{type === 'signin' ? 'Sign in' : 'Sign up'} on the platform
						</Typography>
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
						<form noValidate onSubmit={handleSubmit} autoComplete="off">
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
											error={touched.username && !!errors.username}
										/>
									</Grid>
								</Grid>
								<Grid item>
									{touched.username && !!errors.username && (
										<FormHelperText>{errors.username}</FormHelperText>
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
											error={touched.password && !!errors.password}
										/>
									</Grid>
								</Grid>
								<Grid item>
									{touched.password && !!errors.password && (
										<FormHelperText>{errors.password}</FormHelperText>
									)}
								</Grid>
							</Grid>
							<Button
								className="btn"
								fullWidth
								variant="contained"
								color="primary"
								type="submit">
								{type === 'signin' ? 'Sign in' : 'Sign up'}
							</Button>
						</form>
					);
				}}
			</Formik>
			<Box style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-start' }}>
				{type === 'signin' ? (
					<LinkContainer to="/sign-up" className="link">
						<Typography variant="subtitle1">Sign up</Typography>
					</LinkContainer>
				) : (
					<LinkContainer to="/sign-in" className="link">
						<Typography variant="subtitle1">Sign in</Typography>
					</LinkContainer>
				)}
			</Box>
		</Box>
	);
};

export default AuthModal;