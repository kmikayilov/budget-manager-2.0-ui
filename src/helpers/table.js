import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';

export function headerFormatter(column, colIndex, { sortElement, filterElement }) {
	return (
		<div className="table-head-col">
			<div className="col-title">
				{column.text}
				{<span class="ml-2">{sortElement}</span>}
			</div>
			{filterElement}
		</div>
	);
}

export const sortOption = {
	sortCaret: (order) => {
		if (!order) return <FontAwesomeIcon icon={faSort} />;
		else if (order === 'asc') return <FontAwesomeIcon icon={faSortUp} />;
		else if (order === 'desc') return <FontAwesomeIcon icon={faSortDown} />;
		return null;
	},
};

export const remoteOption = {
	pagination: true,
	filter: true,
	sort: true,
	cellEdit: false,
	search: true,
};

export const baseColStyle = {
	textAlign: 'center',
	fontSize: '14px',
};

//------------------------------------------------------

// export function isOkId(row) {
//     return !!row && !!row.id && typeof row.id === "number" && row.id > 0;
// }

export const editFormatterHeader = () => (
	<div className="icon-wrapper">
		<EditIcon />
	</div>
);
export const editFormatter = () => (
	<div className="icon-wrapper" style={{ cursor: 'pointer' }}>
		<EditIcon />
	</div>
);
export const addNewFormatterHeader = () => (
	<div className="icon-wrapper">
		<AddIcon />
	</div>
);
export const addNewFormatter = () => (
	<div className="icon-wrapper" style={{ cursor: 'pointer' }}>
		<AddIcon />
	</div>
);

export const deleteFormatterHeader = () => (
	<div className="icon-wrapper">
		<DeleteIcon />
	</div>
);
export const deleteFormatter = () => (
	<div className="icon-wrapper" style={{ cursor: 'pointer' }}>
		<DeleteIcon />
	</div>
);
