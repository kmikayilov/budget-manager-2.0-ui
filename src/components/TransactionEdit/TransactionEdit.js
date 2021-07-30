import React, { useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';

import TransactionForm from '../TransactionForm/TransactionForm';

import './TransactionEdit.scss';

const TransactionEdit = ({}) => {
	const onSubmit = useCallback((data, { resetForm }) => {}, []);

	return (
		<Box className="content">
			<Box className="transaction-edition-wrapper">
				<Box className="title">
					<Typography variant="h6">Edit the transaction</Typography>
				</Box>
				<TransactionForm onSubmit={onSubmit} type="edit" />
			</Box>
		</Box>
	);
};

export default TransactionEdit;
