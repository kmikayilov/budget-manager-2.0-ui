import React, { useCallback } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';

import './TransactionDelete.scss';
import { deleteTransaction } from '../../helpers/state/transactionSlice';

toast.configure();

const TransactionDelete = ({ isShown, handleClose }) => {
	const dispatch = useDispatch();
	const transaction = useSelector((state) => state.transaction.transaction, shallowEqual);

	const handleDelete = useCallback(() => {
		if (!!transaction)
			dispatch(
				deleteTransaction({
					id: transaction.id,
					data: {
						transaction: {
							id: transaction.id,
						},
					},
				})
			)
				.then(unwrapResult)
				.then((result) => {
					toast.success(result.Success);
					handleClose();
				})
				.catch((error) => {
					toast.error(error);
					console.log('error: ', error);
				});
	}, [dispatch, transaction, handleClose]);

	const onClose = () => {
		handleClose();
	};

	return (
		<Modal size="lg" show={isShown} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					Are you sure that you want to delete this transaction?
				</Modal.Title>
			</Modal.Header>
			{transaction && (
				<Modal.Body>
					<TableContainer className="table-container" component={Paper}>
						<Table className="table" size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell className="id" align="right">
										Id
									</TableCell>
									<TableCell className="transactionAmount" align="right">
										Transaction amount
									</TableCell>
									<TableCell className="transactionDate" align="right">
										Transaction date
									</TableCell>
									<TableCell className="category_name" align="right">
										Category
									</TableCell>
									<TableCell className="payment_method" align="right">
										Payment
									</TableCell>
									<TableCell className="accounting_type" align="right">
										Accounting
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow key={transaction.id}>
									<TableCell
										className="id"
										component="th"
										scope="transaction">
										{transaction.id}
									</TableCell>
									<TableCell className="transactionAmount" align="right">
										{transaction.transactionAmount}
									</TableCell>
									<TableCell className="transactionDate" align="right">
										{transaction.transactionDate}
									</TableCell>
									<TableCell className="category_name" align="right">
										{transaction.category_name}
									</TableCell>
									<TableCell className="payment_method" align="right">
										{transaction.payment_method}
									</TableCell>
									<TableCell className="accounting_type" align="right">
										{transaction.accounting_type}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Modal.Body>
			)}
			<Modal.Footer>
				<Row className="justify-content-end m-0">
					<Col className="p-0">
						<Button className="btn close" onClick={handleClose}>
							Close the window
						</Button>
					</Col>
					<Col className="p-0">
						<Button className="btn delete" onClick={handleDelete}>
							Delete the transaction
						</Button>
					</Col>
				</Row>
			</Modal.Footer>
		</Modal>
	);
};

export default TransactionDelete;
