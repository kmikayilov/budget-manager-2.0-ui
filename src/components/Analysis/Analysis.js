import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
	selectIncomeExpenseBarChart,
	selectTotalNetBarChart,
	selectCategoriesDonutChart,
} from '../../helpers/state/analysisSlice';

import ColumnChart from './ColumnChart/ColumnChart';
import DonutChart from './DonutChart/DonutChart';
import LineChart from './LineChart/LineChart';

import { Bar } from 'recharts';

import './Analysis.scss';

const Analysis = (props) => {
	const dispatch = useDispatch();
	const incomeExpense = useSelector(
		(state) => state.analysis.incomeExpenseBarChart.data,
		shallowEqual
	);
	const totalNet = useSelector((state) => state.analysis.totalNetBarChart.data, shallowEqual);
	const categoriesDonutChart = useSelector(
		(state) => state.analysis.categoriesDonutChart.data,
		shallowEqual
	);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!incomeExpense) dispatch(selectIncomeExpenseBarChart());
			if (!totalNet) dispatch(selectTotalNetBarChart());
			if (!categoriesDonutChart) dispatch(selectCategoriesDonutChart());
		}
	}, [incomeExpense, totalNet, categoriesDonutChart, isAppLoading, dispatch]);
	return (
		<div className="content scrollable">
			<div className="card">
				<ColumnChart data={incomeExpense}>
					<Bar dataKey="Income" fill="#28acc0" />
					<Bar dataKey="Expense" fill="#688dff" />
				</ColumnChart>
			</div>

			<div className="card">
				<ColumnChart data={totalNet}>
					<Bar dataKey="Total" fill="#28acc0" />
				</ColumnChart>
			</div>

			<div className="card">
				<DonutChart data={categoriesDonutChart} />
			</div>
			<div className="card"></div>

			{/* <LineChart /> */}
		</div>
	);
};

export default Analysis;
