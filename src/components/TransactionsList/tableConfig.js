import { selectFilter, textFilter, Comparator } from 'react-bootstrap-table2-filter';

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

import {
	headerFormatter,
	editFormatter,
	addNewFormatter,
	addNewFormatterHeader,
	deleteFormatter,
	deleteFormatterHeader,
	editFormatterHeader,
} from '../../helpers/table';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload, faListAlt } from '@fortawesome/free-solid-svg-icons';
// import React from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import { Nav } from 'react-bootstrap';
// import { setFetchType, fetchReceipt } from '../../helpers/state/receiptSlice';
// import store from '../../helpers/state/store';

// const subscriberTypeFormatter = (cell) => {
// 	switch (cell) {
// 		case 'ALL':
// 			return 'HAMISI';
// 		case 'ISTIXANA':
// 			return 'İSTİXANA';
// 		case 'QAHALI':
// 			return 'QAHALI';
// 		default:
// 			return cell;
// 	}
// };

const packagesOptionsFormatter = (column, colIndex, { sortElement, filterElement }) => {
	return (
		<React.Fragment>
			<LinkContainer
				to="#"
				className="tableLink download"
				// onClick={() => {
				// 	store.dispatch(setFetchType('download'));
				// 	store.dispatch(fetchReceipt(colIndex.receiptId));
				// }}
			>
				<Nav.Link>
					{/* <FontAwesomeIcon icon={faDownload} /> */}
					<span className="ml-2">Yüklə</span>
				</Nav.Link>
			</LinkContainer>
			<LinkContainer
				to={`/receipts/${colIndex.receiptId}`}
				className="tableLink details"
				// onClick={() => {
				// 	store.dispatch(fetchReceipt(colIndex.receiptId));
				// }}
			>
				<Nav.Link>
					{/* <FontAwesomeIcon icon={faListAlt} /> */}
					<span className="ml-2">Ətraflı</span>
				</Nav.Link>
			</LinkContainer>
		</React.Fragment>
	);
};

export const headers = [
	{
		dataField: 'transactionId',
		text: 'Id',
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({ comparator: Comparator.LIKE, placeholder: 'Enter id' }),
		headerStyle: { 'min-width': '80px' },
		// style: { 'min-width': '100px' },
		// style: baseColStyle,
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
		// style: baseColStyle,
		headerStyle: { 'min-width': '160px' },
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
		headerStyle: { 'min-width': '190px' },
	},
	{
		dataField: 'categoryId',
		text: 'Category',
		sort: true,
		headerFormatter: headerFormatter,
		// formatter: applicationTypeFormatter,
		// filter: textFilter({ comparator: Comparator.LIKE, placeholder: 'İdni daxil edin' }),
		filter: selectFilter({
			options: {
				ALL: 'HAMISI',
				ITRON: 'İTRON',
				AGIS: 'AGİS',
			},
			placeholder: 'Select...',
			className: 'form-select',
		}),
		// style: baseColStyle,
		headerStyle: { 'min-width': '120px' },
	},
	{
		dataField: 'paymentMethodId',
		text: 'Payment method',
		sort: true,
		headerFormatter: headerFormatter,
		// formatter: applicationTypeFormatter,
		// filter: textFilter({ comparator: Comparator.LIKE, placeholder: 'İdni daxil edin' }),
		filter: selectFilter({
			options: {
				ALL: 'HAMISI',
				ITRON: 'İTRON',
				AGIS: 'AGİS',
			},
			placeholder: 'Select...',
			className: 'form-select',
		}),
		// style: baseColStyle,
		headerStyle: { 'min-width': '160px' },
	},
	{
		dataField: 'accountingTypeId',
		text: 'Accounting type',
		sort: true,
		headerFormatter: headerFormatter,
		// formatter: applicationTypeFormatter,
		// filter: textFilter({ comparator: Comparator.LIKE, placeholder: 'İdni daxil edin' }),
		filter: selectFilter({
			options: {
				ALL: 'HAMISI',
				ITRON: 'İTRON',
				AGIS: 'AGİS',
			},
			placeholder: 'Select...',
			className: 'form-select',
		}),
		// style: baseColStyle,
		headerStyle: { 'min-width': '160px' },
	},
	{
		dataField: 'new',
		text: 'Add',
		isDummyField: true,
		headerFormatter: addNewFormatterHeader,
		formatter: addNewFormatter,
		// headerStyle: viewEditHeaderStyle,
		editable: false,
		headerStyle: { 'min-width': '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				console.log('body new');
				// if (isOkId(row)) {
				// 	_history.push('/job-family/new');
				// }
			},
		},
		headerEvents: {
			onClick: (e, column, columnIndex) => {
				console.log('header new');
				// _history.push('/job-family/new'),
			},
		},
	},
	{
		dataField: 'edit',
		text: 'Edit',
		isDummyField: true,
		headerFormatter: editFormatterHeader,
		formatter: editFormatter,
		// headerStyle: viewEditHeaderStyle,
		editable: false,
		headerStyle: { 'min-width': '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				console.log('body edit');
				// if (isOkId(row)) {
				//     _history.push("/job-family/edit/" + row.id);
				// }
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
		headerStyle: { 'min-width': '45px' },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				console.log('body delete');
				// if (isOkId(row)) {
				//     _history.push("/job-family/edit/" + row.id);
				// }
			},
		},
	},
];
