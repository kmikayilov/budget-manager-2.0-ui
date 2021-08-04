import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { selectIncomeExpenseBarChart } from '../../../helpers/state/analysisSlice';
const ColumnChart = (props) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.analysis.incomeExpenseBarChart.data, shallowEqual);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!data) dispatch(selectIncomeExpenseBarChart());
		}
	}, [data, isAppLoading, dispatch]);

	const options = {
		chart: {
			type: 'bar',
			height: 350,
			width: 700,
		},
		series: data || [],
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['transparent'],
		},
		xaxis: {
			categories: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'Noverber',
				'December',
			],
		},
		yaxis: {
			title: {
				text: '$ (USD)',
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return '$ ' + val + ' thousands';
				},
			},
		},
	};

	return (
		<div id="chart">
			<ReactApexChart options={options} series={options.series} type="bar" height={350} />
		</div>
	);
};

export default ColumnChart;
