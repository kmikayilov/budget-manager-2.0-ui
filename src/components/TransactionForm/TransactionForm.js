import React from 'react';
import { schema, initialValue } from './schema';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Formik, Field } from 'formik';

import './TransactionForm.scss';

const colourStyles = {
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: (isFocused || isSelected) && '#35404b',
			color: (isFocused || isSelected) && '#28acc0',
		};
	},
};

const TransactionAdd = ({ onSubmit, type }) => {
	let arr = [
		{ value: 'x', label: 'X' },
		{ value: 'y', label: 'Y' },
		{ value: 'z', label: 'Z' },
		{ value: 'w', label: 'W' },
	];
	return (
		<Formik
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
				setFieldValue,
				setFieldTouched,
			}) => {
				return (
					<Form
						autoComplete="off"
						noValidate
						onSubmit={handleSubmit}
						className="form">
						<Row
							className="ml-0 mr-0 flex-wrap"
							xl="5"
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
												dateFormat="dd/MM/yyyy"
												id="transactionDate"
												name="transactionDate"
												selected={values.transactionDate}
												onChange={(val) => {
													setFieldValue(
														'transactionDate',
														val
													);
												}}
												onBlur={(e) => {
													setFieldTouched('transactionDate');
												}}
												value={values.transactionDate}
											/>
										)}
									</Field>
									<Form.Control.Feedback type="invalid">
										{errors.transactionDate}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="transactionAmount">
									<Form.Label>Transaction amount</Form.Label>
									<Form.Control
										placeholder="12345678901234"
										type="text"
										name="transactionAmount"
										value={values.transactionAmount}
										onChange={handleChange}
										onBlur={handleBlur}
										// isValid={touched.transactionAmount && !errors.transactionAmount}
										// isInvalid={touched.transactionAmount && !!errors.transactionAmount}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.transactionAmount?.message}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="categoryId">
									<Form.Label>Category</Form.Label>
									<Field
										as={Select}
										name="categoryId"
										classNamePrefix="select"
										options={arr?.map((c) => {
											return {
												value: c.id,
												label: c.label,
											};
										})}
										value={values.categoryId}
										styles={colourStyles}
										onChange={(e) => {
											setFieldValue('categoryId', e);
										}}
										onBlur={(e) => setFieldTouched('categoryId')}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.categoryId?.message}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="paymentMethodId">
									<Form.Label>Payment method</Form.Label>
									<Field
										as={Select}
										name="paymentMethodId"
										classNamePrefix="select"
										options={arr?.map((c) => {
											return {
												value: c.id,
												label: c.label,
											};
										})}
										value={values.paymentMethodId}
										styles={colourStyles}
										onChange={(e) => {
											setFieldValue('paymentMethodId', e);
										}}
										onBlur={(e) => setFieldTouched('paymentMethodId')}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.paymentMethodId?.message}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="accountingTypeId">
									<Form.Label>Accounting type</Form.Label>
									<Field
										as={Select}
										name="accountingTypeId"
										classNamePrefix="select"
										options={arr?.map((c) => {
											return {
												value: c.id,
												label: c.label,
											};
										})}
										value={values.accountingTypeId}
										styles={colourStyles}
										onChange={(e) => {
											setFieldValue('accountingTypeId', e);
										}}
										onBlur={(e) =>
											setFieldTouched('accountingTypeId')
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.accountingTypeId?.message}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
						<Row className="btn-wrapper mt-3 ml-0 mr-0 justify-content-start">
							<Col md="auto" className="p-0 ">
								<Button
									className="btn"
									variant="contained"
									color="primary"
									type="submit">
									{type === 'add' ? 'Add' : 'Edit'} transaction
								</Button>
							</Col>
						</Row>
					</Form>
				);
			}}
		</Formik>
	);
};

export default TransactionAdd;
