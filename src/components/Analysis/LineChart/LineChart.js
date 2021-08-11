import React from 'react';
import { LineChart, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const LineGraph = ({ data, children }) => (
	<ResponsiveContainer width="100%" height="100%">
		<LineChart data={data}>
			<XAxis stroke="#7b8794" dataKey="name" />
			<YAxis stroke="#7b8794" />
			<Legend />
			<Tooltip />
			{children}
		</LineChart>
	</ResponsiveContainer>
);

export default LineGraph;
