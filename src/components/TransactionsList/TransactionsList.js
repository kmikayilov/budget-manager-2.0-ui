import React, { useState, useCallback, useEffect } from 'react';
import { headers } from './tableConfig';
import TransactionsTable from './TransactionsTable';
import './TransactionsList.scss';
import { Typography, Box } from '@material-ui/core';

const TransactionsList = ({}) => {
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortData, setSortData] = useState({ sortField: '', sortOrder: '' });
	const [filtersData, setFiltersData] = useState(null);

	//'filter' | 'pagination' | 'sort' | 'cellEdit'
	const handleTableChange = useCallback(
		(type, { page, sizePerPage, sortField, sortOrder, filters, data }) => {
			// console.log(
			// 	'sortField',
			// 	sortField,
			// 	'sortOrder',
			// 	sortOrder,
			// 	'filters',
			// 	JSON.stringify(filters),
			// 	'data',
			// 	data
			// );

			let arr = ['categoryId', 'paymentMethodId', 'accountingTypeId'];

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
								[key.charAt(0).toUpperCase() + key.slice(1)]:
									filters[key].filterVal,
							};
						}
						setFiltersData(f);
					}
					break;
				default:
				// code block
			}
		},
		[currentPage, pageSize, filtersData]
	);

	useEffect(() => {
		// if (isAppLoading === true) return;

		const sortQuery = !!sortData.sortField ? sortData : {};
		const query = {
			limit: pageSize,
			offset: Math.max(currentPage * pageSize - pageSize, 0),
			...sortQuery,
			filters: filtersData,
		};

		// dispatch(fetchReceipts(query));
	}, [
		pageSize,
		currentPage,
		sortData,
		filtersData,
		// dispatch,
		// isAppLoading
	]);

	return (
		<div className="content">
			<div class="transaction-list-wrapper">
				<Box className="title-wrapper">
					<Typography variant="h6" className="title">
						Transactions
					</Typography>
				</Box>
				<div className="transactions-list">
					<TransactionsTable
						data={[]}
						headers={headers}
						page={currentPage}
						sizePerPage={pageSize}
						totalSize={100}
						onTableChange={handleTableChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default TransactionsList;
