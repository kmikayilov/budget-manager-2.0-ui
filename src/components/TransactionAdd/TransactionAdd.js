import React, { useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';

import TransactionForm from '../TransactionForm/TransactionForm';

import './TransactionAdd.scss';

const TransactionAdd = ({}) => {
	const onSubmit = useCallback((data, { resetForm }) => {}, []);

	return (
		<Box className="content">
			<Box className="transaction-addition-wrapper">
				<Box className="title">
					<Typography variant="h6">Add new transaction</Typography>
				</Box>
				<TransactionForm onSubmit={onSubmit} type="add" />
			</Box>
		</Box>
	);
};

export default TransactionAdd;