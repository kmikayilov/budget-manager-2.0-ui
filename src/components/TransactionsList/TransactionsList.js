import React, { useState, useCallback, useEffect } from 'react';
import { headers, setHistory } from './tableConfig';
import TransactionsTable from './TransactionsTable';
import { Typography, Box } from '@material-ui/core';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filterTransactions } from '../../helpers/state/transactionSlice';
import { setFetchType } from '../../helpers/state/transactionSlice';
import TransactionDelete from '../TransactionDelete/TransactionDelete';

import './TransactionsList.scss';

const TransactionsList = () => {
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortData, setSortData] = useState({ sortField: '', sortOrder: '' });
	const [filtersData, setFiltersData] = useState(null);

	const dispatch = useDispatch();
	const transactions = useSelector((state) => state.transaction.transactions, shallowEqual);
	const transactionCount = useSelector(
		(state) => state.transaction.transactionCount,
		shallowEqual
	);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	//----------------------------------

	const isShownDelete = useSelector(
		(state) => state.transaction.fetchType === 'delete' && !!state.transaction.transaction,
		shallowEqual
	);

	const onDeleteClose = useCallback(() => {
		dispatch(setFetchType(''));
	}, [dispatch]);

	//---------------------------------------

	const handleTableChange = useCallback(
		(type, { page, sizePerPage, sortField, sortOrder, filters, data }) => {
			let arr = ['category_id', 'payment_id', 'accounting_id'];

			for (let filter in filters) {
				arr.forEach((el, i) => {
					if (filter === el) {
						let str = `select-filter-column-${el}`;
						let select = document.getElementById(str);
						select.style.color = '#28acc0';
					}
				});
			}

			switch (type) {
				case 'pagination':
					if (currentPage !== page) {
						setCurrentPage(page);
					}
					if (pageSize !== sizePerPage) {
						setPageSize(sizePerPage);
					}
					break;
				case 'sort':
					setSortData({ sortField, sortOrder });
					break;
				case 'filter':
					if (filters !== filtersData) {
						let f = {};
						for (let key in filters) {
							f = {
								...f,
								[key]: filters[key].filterVal,
							};
						}
						setFiltersData(f);
					}
					break;
				default:
			}
		},
		[currentPage, pageSize, filtersData]
	);

	useEffect(() => {
		if (isAppLoading === true) return;
		if (isShownDelete === true) return;

		const sortQuery = !!sortData.sortField ? sortData : {};
		const query = {
			limit: pageSize,
			offset: Math.max(currentPage * pageSize - pageSize, 0),
			...sortQuery,
			filters: filtersData || {},
		};

		dispatch(filterTransactions(query));
	}, [pageSize, currentPage, sortData, filtersData, dispatch, isAppLoading, isShownDelete]);

	const history = useHistory();
	setHistory(history);

	return (
		<div className="content scrollable">
			<TransactionDelete isShown={isShownDelete} handleClose={onDeleteClose} />
			<div class="transaction-list-wrapper">
				<Box className="title-wrapper">
					<Typography variant="h6" className="title">
						Transactions
					</Typography>
				</Box>
				<div className="transactions-list">
					<TransactionsTable
						data={transactions || []}
						headers={headers}
						page={currentPage}
						sizePerPage={pageSize}
						totalSize={transactionCount || 0}
						onTableChange={handleTableChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default TransactionsList;
