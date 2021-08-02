import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { sortOption, remoteOption } from '../../helpers/table';

const TransactionsTable = ({ data, headers, page, sizePerPage, totalSize, onTableChange }) => {
	return (
		<div className="table-wrapper" data-testid="TransactionsTable">
			<BootstrapTable
				keyField="id"
				data={data || []}
				columns={headers}
				noDataIndication={() => <div class="text-center">No data</div>}
				condensed
				bordered={true}
				filter={filterFactory()}
				sort={sortOption}
				remote={remoteOption}
				pagination={paginationFactory({
					page,
					sizePerPage,
					totalSize,
					firstPageText: `1`,
					prePageText: '<',
					nextPageText: '>',
					lastPageText: `${totalSize}`,
					nextPageTitle: `1`,
					prePageTitle: '<',
					firstPageTitle: '>',
					lastPageTitle: `${totalSize}`,
					withFirstAndLast: true,
					hidePageListOnlyOnePage: true,
					showTotal: true,
					hideSizePerPage: false,
				})}
				onTableChange={onTableChange}
				bootstrap4
			/>
		</div>
	);
};

export default TransactionsTable;
