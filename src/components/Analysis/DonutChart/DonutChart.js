import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

import './DonutChart.scss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { selectCategoriesDonutChart } from '../../../helpers/state/analysisSlice';

const DonutChart = (props) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.analysis.categoriesDonutChart.data, shallowEqual);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!data) dispatch(selectCategoriesDonutChart());
		}
	}, [data, isAppLoading, dispatch]);

	const options = {
		labels: (!!data && data.labels) || [],
		series: (!!data && data.series) || [],
		fill: {
			type: 'gradient',
		},
		chart: {
			animations: {
				enabled: true,
				easing: 'easeinout',
				speed: 800,
				animateGradually: {
					enabled: true,
					delay: 150,
				},
				dynamicAnimation: {
					enabled: true,
					speed: 350,
				},
			},
		},
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 270,
				expandOnClick: true,
			},
		},
		dataLabels: {
			enabled: true,
			enabledOnSeries: undefined,
			textAnchor: 'middle',
			distributed: false,
			offsetX: 0,
			offsetY: 0,
			style: {
				fontSize: '12px',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontWeight: 'bold',
				colors: undefined,
			},
			background: {
				enabled: true,
				foreColor: '#fff',
				padding: 4,
				borderRadius: 2,
				borderWidth: 1,
				borderColor: '#fff',
				opacity: 0.9,
				dropShadow: {
					enabled: false,
					top: 1,
					left: 1,
					blur: 1,
					color: '#000',
					opacity: 0.45,
				},
			},
			dropShadow: {
				enabled: false,
				top: 1,
				left: 1,
				blur: 1,
				color: '#000',
				opacity: 0.45,
			},
		},
	};

	return (
		<div className="donut">
			<Chart options={options} series={options.series} type="donut" width="380" />
		</div>
	);
};

export default DonutChart;
