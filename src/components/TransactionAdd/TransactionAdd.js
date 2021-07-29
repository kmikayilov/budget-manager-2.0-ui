import React, { useCallback } from "react";
import { Formik } from "formik";
import { schema, initialValue } from "./schema";

import { Box, Button, FormHelperText, Grid, Typography, MenuItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { LinkContainer } from "react-router-bootstrap";

const TransactionAdd = ({}) => {
	const onSubmit = useCallback((data, { resetForm }) => {}, []);
	return (
		<Box className="transaction-addition-wrapper content">
			{/* <div className="title-wrapper">
				<div className="custom-col">
					<div className="custom-row">
						<Typography variant="h4">{type === "signin" ? "Sign in" : "Sign up"}</Typography>
					</div>
					<div className="custom-row">
						<Typography variant="h6">{type === "signin" ? "Sign in" : "Sign up"} on the platform</Typography>
					</div>
				</div>
				<div className="custom-col">
					<AccountBalanceIcon />
				</div>
			</div> */}
			<Formik validationSchema={schema} onSubmit={onSubmit} initialValues={initialValue} enableReinitialize={true}>
				{({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
					return (
						<form noValidate onSubmit={handleSubmit} autoComplete="off">
							<Grid style={{ marginBottom: "30px" }} container spacing={1} direction="row" justifyContent="center">
								<TextField
									name="transactionDate"
									value={values.transactionDate}
									onChange={handleChange}
									onBlur={handleBlur}
									label="transactionDate"
									required
									variant="outlined"
									id="outlined-full-width"
									className="input"
									fullWidth
									error={touched.transactionDate && !!errors.transactionDate}
								/>
								<TextField
									name="transactionAmount"
									value={values.transactionAmount}
									onChange={handleChange}
									onBlur={handleBlur}
									label="transactionAmount"
									className="input"
									required
									variant="outlined"
									id="outlined-full-width"
									fullWidth
									error={touched.transactionAmount && !!errors.transactionAmount}
								/>
								<TextField
									name="categoryId"
									value={values.categoryId}
									onChange={handleChange}
									onBlur={handleBlur}
									label="categoryId"
									className="input"
									required
									variant="outlined"
									id="outlined-select-currency-native"
									fullWidth
									select
									error={touched.categoryId && !!errors.categoryId}
								>
									{[].map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									name="payemtnMethodId"
									value={values.payemtnMethodId}
									onChange={handleChange}
									onBlur={handleBlur}
									label="payemtnMethodId"
									className="input"
									required
									variant="outlined"
									id="outlined-select-currency-native"
									fullWidth
									select
									error={touched.payemtnMethodId && !!errors.payemtnMethodId}
								>
									{[].map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									name="accountingTypeId"
									value={values.accountingTypeId}
									onChange={handleChange}
									onBlur={handleBlur}
									label="accountingTypeId"
									className="input"
									required
									variant="outlined"
									id="outlined-select-currency-native"
									fullWidth
									select
									error={touched.accountingTypeId && !!errors.accountingTypeId}
								>
									{[].map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Button className="btn" fullWidth variant="contained" color="primary" type="submit">
								x
							</Button>
						</form>
					);
				}}
			</Formik>
		</Box>
	);
};

export default TransactionAdd;
