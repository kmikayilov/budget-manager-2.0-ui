import { selectFilter, textFilter, Comparator } from "react-bootstrap-table2-filter";
import store from "../../helpers/state/store";
import { setFetchType, fetchTransaction } from "../../helpers/state/transactionSlice";

import {
	headerFormatter,
	editFormatter,
	addNewFormatter,
	addNewFormatterHeader,
	deleteFormatter,
	deleteFormatterHeader,
	editFormatterHeader,
	categoriesOptions,
	categoriesOptionsFormatter,
	paymentOptions,
	paymentOptionsFormatter,
	isOkId,
	accountingOptions,
	accountingOptionsFormatter,
} from "../../helpers/table";

let _history = null;

export const setHistory = (history) => (_history = history);

export const headers = [
	{
		dataField: "id",
		text: "Id",
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({ comparator: Comparator.LIKE, placeholder: "Enter id" }),
		headerStyle: { minWidth: "80px" },
	},
	{
		dataField: "transactionDate",
		text: "Transaction date",
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({
			comparator: Comparator.LIKE,
			placeholder: "Enter the transaction date",
		}),
		headerStyle: { minWidth: "160px" },
	},
	{
		dataField: "transactionAmount",
		text: "Transaction amount",
		sort: true,
		headerFormatter: headerFormatter,
		filter: textFilter({
			comparator: Comparator.LIKE,
			placeholder: "Enter the transaction amount",
		}),
		// style: baseColStyle,
		headerStyle: { minWidth: "190px" },
	},
	{
		dataField: "category_id",
		text: "Category",
		sort: true,
		formatter: categoriesOptionsFormatter,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: categoriesOptions,
			placeholder: "Select...",
			className: "form-select",
		}),
		headerStyle: { minWidth: "120px" },
	},
	{
		dataField: "payment_id",
		text: "Payment method",
		sort: true,
		formatter: paymentOptionsFormatter,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: paymentOptions,
			placeholder: "Select...",
			className: "form-select",
		}),
		// style: baseColStyle,
		headerStyle: { minWidth: "160px" },
	},
	{
		dataField: "accounting_id",
		text: "Accounting type",
		sort: true,
		formatter: accountingOptionsFormatter,
		headerFormatter: headerFormatter,
		filter: selectFilter({
			options: accountingOptions,
			placeholder: "Select...",
			className: "form-select",
		}),
		headerStyle: { minWidth: "160px" },
	},
	{
		dataField: "new",
		text: "Add",
		isDummyField: true,
		headerFormatter: addNewFormatterHeader,
		formatter: addNewFormatter,
		editable: false,
		headerStyle: { minWidth: "45px" },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				_history.push("/transactions/new");
			},
		},
		headerEvents: {
			onClick: (e, column, columnIndex) => {
				_history.push("/transactions/new");
			},
		},
	},
	{
		dataField: "edit",
		text: "Edit",
		isDummyField: true,
		headerFormatter: editFormatterHeader,
		formatter: editFormatter,
		editable: false,
		headerStyle: { minWidth: "45px" },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				if (isOkId(row)) {
					_history.push("/transaction/" + row.id);
					store.dispatch(fetchTransaction(row.id));
				}
			},
		},
	},
	{
		dataField: "delete",
		text: "Delete",
		isDummyField: true,
		headerFormatter: deleteFormatterHeader,
		formatter: deleteFormatter,
		// headerStyle: viewEditHeaderStyle,
		editable: false,
		headerStyle: { minWidth: "45px" },
		events: {
			onClick: (e, column, columnIndex, row, rowIndex) => {
				console.log(row);
				if (isOkId(row)) {
					store.dispatch(setFetchType("delete"));
					store.dispatch(fetchTransaction(row.id));
				}
			},
		},
	},
];
