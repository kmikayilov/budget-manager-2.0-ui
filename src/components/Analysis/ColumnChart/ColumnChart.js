import React from 'react';
import { BarChart, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

const ColumnChart = ({ data, children }) => (
	<ResponsiveContainer width="100%" height="100%">
		<BarChart
			// width={500}
			// height={300}
			data={data}>
			<XAxis dataKey="name" />
			<YAxis />
			<Legend />
			{children}
		</BarChart>
	</ResponsiveContainer>
);

export default ColumnChart;
