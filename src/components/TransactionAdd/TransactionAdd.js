import React, { useCallback, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import TransactionForm from '../TransactionForm/TransactionForm';

import { fetchCategories, fetchPayments } from '../../helpers/state/listsSlice';
import { addTransaction } from '../../helpers/state/transactionSlice';
import { dateNormalizer } from '../../helpers/utils';
import { schema, initialValue } from '../../helpers/transactionSchema';

import './TransactionAdd.scss';

toast.configure();

const TransactionAdd = () => {
	const dispatch = useDispatch();
	const _history = useHistory();
	const categories = useSelector((state) => state.lists.categories.data, shallowEqual);
	const payments = useSelector((state) => state.lists.payments.data, shallowEqual);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!categories) dispatch(fetchCategories());
			if (!payments) dispatch(fetchPayments());
		}
	}, [categories, payments, isAppLoading, dispatch]);

	const onSubmit = useCallback(
		(data, { resetForm }) => {
			let date = dateNormalizer(data.transactionDate);
			dispatch(
				addTransaction({
					transaction: {
						categoryId: data.categoryId.value,
						paymentId: data.paymentMethodId.value,
						transactionAmount: data.transactionAmount,
						transactionDate: date,
					},
				})
			)
				.then(unwrapResult)
				.then((result) => {
					toast.success('Transaction created successfully!');
					resetForm({ values: initialValue });
					_history.push(`/transactions`);
				})
				.catch((error) => {
					toast.error('Transaction creation failed!');
					console.log('Error message', error);
				});
		},
		[dispatch, _history]
	);

	return (
		<Box className="content">
			<Box className="transaction-addition-wrapper">
				<Box className="title">
					<Typography variant="h6">Add new transaction</Typography>
				</Box>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={initialValue}
					enableReinitialize={true}>
					{(props) => {
						return <TransactionForm {...props} type="add" />;
					}}
				</Formik>
			</Box>
		</Box>
	);
};

export default TransactionAdd;
