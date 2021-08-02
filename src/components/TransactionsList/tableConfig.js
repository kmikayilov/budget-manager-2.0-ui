import { selectFilter, textFilter, Comparator } from 'react-bootstrap-table2-filter';
import store from '../../helpers/state/store';
import { setFetchType, fetchTransaction } from '../../helpers/state/transactionSlice';

import {
	headerFormatter,
	editFormatter,
	addNewFormatter,
	addNewFormatterHeader,
	deleteFormatter,
	deleteFormatterHeader,
	editFormatterHeader,
	categoriesOptions,
	paymentOptions,
	isOkId,
} from '../../helpers/table';

let _history = null;

export const setHistory = (history) => (_history = history);

export const headers = [
	{
		dataField: 'id',
		text: 'Id',
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({ comparator: Comparator.LIKE, placeholder: 'Enter id' }),
		headerStyle: { minWidth: '80px' },
	},
	{
		dataField: 'transactionDate',
		text: 'Transaction date',
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({
			comparator: Comparator.LIKE,
			placeholder: 'Enter the transaction date',
		}),
		headerStyle: { minWidth: '160px' },
	},
	{
		dataField: 'transactionAmount',
		text: 'Transaction amount',
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({
			comparator: Comparator.LIKE,
			placeholder: 'Enter the transaction amount',
		}),
		// style: baseColStyle,
		headerStyle: { minWidth: '190px' },
	},
	{
		dataField: 'category_name',
		text: 'Category',
		sort: true,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: categoriesOptions,
			placeholder: 'Select...',
			className: 'form-select',
		}),
		headerStyle: { minWidth: '120px' },
	},
	{
		dataField: 'payment_method',
		text: 'Payment method',
		sort: true,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: paymentOptions,
			placeholder: 'Select...',
			className: 'form-select',
		}),
		// style: baseColStyle,
		headerStyle: { minWidth: '160px' },
	},
	{
		dataField: 'accounting_type',
		text: 'Accounting type',
		sort: true,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: {
				1: 'Income',
				2: 'Expense',
			},
			placeholder: 'Select...',
			className: 'form-select',
		}),
		headerStyle: { minWidth: '160px' },
	},
	{
		dataField: 'new',
		text: 'Add',
		isDummyField: true,
		headerFormatter: addNewFormatterHeader,
		formatter: addNewFormatter,
		editable: false,
		headerStyle: { minWidth: '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				_history.push('/transactions/new');
			},
		},
		headerEvents: {
			onClick: (e, column, columnIndex) => {
				_history.push('/transactions/new');
			},
		},
	},
	{
		dataField: 'edit',
		text: 'Edit',
		isDummyField: true,
		headerFormatter: editFormatterHeader,
		formatter: editFormatter,
		editable: false,
		headerStyle: { minWidth: '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				if (isOkId(row)) {
					_history.push('/transaction/' + row.id);
					store.dispatch(fetchTransaction(row.id));
				}
			},
		},
	},
	{
		dataField: 'delete',
		text: 'Delete',
		isDummyField: true,
		headerFormatter: deleteFormatterHeader,
		formatter: deleteFormatter,
		// headerStyle: viewEditHeaderStyle,
		editable: false,
		headerStyle: { minWidth: '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				console.log(row);
				if (isOkId(row)) {
					store.dispatch(setFetchType('delete'));
					store.dispatch(fetchTransaction(row.id));
				}
			},
		},
	},
];
