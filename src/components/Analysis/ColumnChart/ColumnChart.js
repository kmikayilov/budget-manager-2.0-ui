import React from 'react';
import { BarChart, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const ColumnChart = ({ data, children }) => (
	<ResponsiveContainer width="100%" height="100%">
		<BarChart data={data}>
			<XAxis dataKey="name" stroke="#7b8794" />
			<YAxis stroke="#7b8794" />
			<Legend width={100} />
			<Tooltip />
			{children}
		</BarChart>
	</ResponsiveContainer>
);

export default ColumnChart;
