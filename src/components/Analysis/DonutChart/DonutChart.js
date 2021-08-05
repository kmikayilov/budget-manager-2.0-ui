import React, { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
// // import ReactApexChart from 'react-apexcharts';

// import './DonutChart.scss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { selectCategoriesDonutChart } from '../../../helpers/state/analysisSlice';

// import FusionCharts from 'fusioncharts';
// import charts from 'fusioncharts/fusioncharts.charts';
// import ReactFusioncharts from 'react-fusioncharts';

// charts(FusionCharts);

const DonutChart = (props) => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.analysis.categoriesDonutChart.data, shallowEqual);
	const isAppLoading = useSelector((state) => state.common.isLoading, shallowEqual);

	useEffect(() => {
		if (!isAppLoading) {
			if (!data) dispatch(selectCategoriesDonutChart());
		}
	}, [data, isAppLoading, dispatch]);

	return (
		<div style={{ width: 400, height: 300 }}>
			<ResponsivePie
				data={data || []}
				margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				colors={{ scheme: 'paired' }}
				borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor="#333333"
				// defs={[
				// 	{
				// 		id: 'dots',
				// 		type: 'patternDots',
				// 		background: 'inherit',
				// 		color: 'rgba(255, 255, 255, 0.3)',
				// 		size: 4,
				// 		padding: 1,
				// 		stagger: true,
				// 	},
				// 	{
				// 		id: 'lines',
				// 		type: 'patternLines',
				// 		background: 'inherit',
				// 		color: 'rgba(255, 255, 255, 0.3)',
				// 		rotation: -45,
				// 		lineWidth: 6,
				// 		spacing: 10,
				// 	},
				// ]}
				legends={[
					{
						anchor: 'right',
						direction: 'column',
						justify: false,
						translateX: 200,
						translateY: 0,
						itemsSpacing: 5,
						itemWidth: 250,
						itemHeight: 20,
						itemTextColor: '#999',
						itemDirection: 'left-to-right',
						itemOpacity: 1,
						symbolSize: 10,
						symbolShape: 'circle',
					},
				]}
			/>
		</div>
	);
};

export default DonutChart;
