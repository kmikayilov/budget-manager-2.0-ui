import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Formik } from 'formik';

import { useHistory, useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import TransactionForm from '../TransactionForm/TransactionForm';

import { fetchCategories, fetchPayments } from '../../helpers/state/listsSlice';
import { editTransaction } from '../../helpers/state/transactionSlice';
import { dateNormalizer } from '../../helpers/utils';
import { schema, initialValue } from '../../helpers/transactionSchema';

import './TransactionEdit.scss';

toast.configure();

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
			let d = {
				id: id,
				data: {
					transaction: {
						categoryId: data.categoryId.value,
						transactionAmount: data.transactionAmount,
						transactionDate: date,
					},
				},
			};

			if (data.paymentId) d.transaction.paymentId = data.paymentMethodId.value;

			dispatch(editTransaction(d))
				.then(unwrapResult)
				.then((result) => {
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
		<Box className="content scrollable">
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
					{(props) => {
						return <TransactionForm {...props} />;
					}}
				</Formik>
			</Box>
		</Box>
	);
};

export default TransactionEdit;
