import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
	clearTransaction,
	editTransaction,
	fetchTransaction,
} from '../../helpers/state/transactionSlice';
import { dateNormalizer } from '../../helpers/utils';

import { schema, initialValue } from './schema';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Formik, Field } from 'formik';

import { fetchCategories, fetchPayments } from '../../helpers/state/listsSlice';

const colourStyles = {
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: (isFocused || isSelected) && '#35404b',
			color: (isFocused || isSelected) && '#28acc0',
		};
	},
};

// import './TransactionEdit.scss';

const TransactionEdit = () => {
	const dispatch = useDispatch();
	const _history = useHistory();
	const { id } = useParams();
	const formikRef = useRef(null);

	const transaction = useSelector((state) => state.transaction.transaction, shallowEqual);

	const categories = useSelector((state) => state.lists.categories.data, shallowEqual);
	const payments = useSelector((state) => state.lists.payments.data, shallowEqual);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!categories) dispatch(fetchCategories());
			if (!payments) dispatch(fetchPayments());
		}
		if (!!transaction) {
			const formik = formikRef.current;
			if (formik)
				formik.resetForm({
					values: {
						transactionDate: new Date(transaction.transactionDate),
						transactionAmount: transaction.transactionAmount,
						categoryId: {
							value: transaction.category_id,
							label: transaction.category_name,
						},
						paymentMethodId: {
							value: transaction.payment_id,
							label: transaction.payment_method,
						},
					},
				});
		}
	}, [categories, payments, isAppLoading, dispatch, transaction, id]);

	const onSubmit = useCallback(
		(data, { resetForm }) => {
			let date = dateNormalizer(data.transactionDate);

			dispatch(
				editTransaction({
					id: id,
					data: {
						transaction: {
							categoryId: data.categoryId.value,
							paymentId: data.paymentMethodId.value,
							transactionAmount: data.transactionAmount,
							transactionDate: date,
						},
					},
				})
			)
				.then(unwrapResult)
				.then((result) => {
					// console.log(result);
					toast.success('Transaction edited successfully!');
					_history.push(`/transactions`);
				})
				.catch((error) => {
					toast.error('Transaction edition failed!');
					console.log('Error message', error);
				});
		},
		[id, dispatch, _history]
	);

	return (
		<Box className="content">
			<Box className="transaction-edition-wrapper">
				<Box className="title">
					<Typography variant="h6">Edit the transaction</Typography>
				</Box>
				<Formik
					innerRef={formikRef}
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={initialValue}
					enableReinitialize={true}>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						errors,
						touched,
						setFieldValue,
						setFieldTouched,
					}) => {
						// console.log(errors);
						return (
							<Form
								autoComplete="off"
								noValidate
								onSubmit={handleSubmit}
								className="form">
								<Row
									className="ml-0 mr-0 flex-wrap"
									// xl="4"
									lg="4"
									md="3"
									sm="2"
									xs="1">
									<Col>
										<Form.Group controlId="transactionDate">
											<Form.Label>Transaction date</Form.Label>
											<Field name="transactionDate">
												{({ field, form, meta }) => (
													<DatePicker
														placeholderText="Select a date"
														dateFormat="yyyy-MM-dd"
														id="transactionDate"
														name="transactionDate"
														selected={
															values.transactionDate
														}
														onChange={(val) => {
															setFieldValue(
																'transactionDate',
																val
															);
														}}
														onBlur={(e) => {
															setFieldTouched(
																'transactionDate'
															);
														}}
														value={values.transactionDate}
													/>
												)}
											</Field>
											{touched.transactionDate &&
												!!errors.transactionDate && (
													<Form.Control.Feedback type="invalid">
														{errors.transactionDate}
													</Form.Control.Feedback>
												)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="transactionAmount">
											<Form.Label>Transaction amount</Form.Label>
											<Form.Control
												placeholder="100"
												type="text"
												name="transactionAmount"
												value={values.transactionAmount}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={
													touched.transactionAmount &&
													!errors.transactionAmount
												}
												isInvalid={
													touched.transactionAmount &&
													!!errors.transactionAmount
												}
											/>
											{touched.transactionAmount &&
												!!errors.transactionAmount && (
													<Form.Control.Feedback type="invalid">
														{errors.transactionAmount}
													</Form.Control.Feedback>
												)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="categoryId">
											<Form.Label>Category</Form.Label>
											<Field
												as={Select}
												name="categoryId"
												classNamePrefix="select"
												options={categories?.map((c) => {
													return {
														value: c.id,
														label: c.category_name,
													};
												})}
												value={values.categoryId}
												placeholder="Select..."
												styles={colourStyles}
												onChange={(e) => {
													setFieldValue('categoryId', e);
												}}
												onBlur={(e) =>
													setFieldTouched('categoryId')
												}
											/>
											{touched.categoryId &&
												!!errors.categoryId && (
													<Form.Control.Feedback type="invalid">
														{errors.categoryId}
													</Form.Control.Feedback>
												)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="paymentMethodId">
											<Form.Label>Payment method</Form.Label>
											<Field
												as={Select}
												name="paymentMethodId"
												classNamePrefix="select"
												options={payments?.map((c) => {
													return {
														value: c.id,
														label: c.method,
													};
												})}
												placeholder="Select..."
												value={values.paymentMethodId}
												styles={colourStyles}
												onChange={(e) => {
													setFieldValue(
														'paymentMethodId',
														e
													);
												}}
												onBlur={(e) =>
													setFieldTouched('paymentMethodId')
												}
											/>
											{touched.paymentMethodId &&
												!!errors.paymentMethodId && (
													<Form.Control.Feedback type="invalid">
														{errors.paymentMethodId}
													</Form.Control.Feedback>
												)}
										</Form.Group>
									</Col>
								</Row>
								<Row className="btn-wrapper mt-3 ml-0 mr-0 justify-content-end">
									<Col md="auto" className="p-0 ">
										<Button
											className="btn"
											variant="contained"
											color="primary"
											type="submit">
											Edit transaction
										</Button>
									</Col>
								</Row>
							</Form>
						);
					}}
				</Formik>
			</Box>
		</Box>
	);
};

export default TransactionEdit;
