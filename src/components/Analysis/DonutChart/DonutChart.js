import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';

const COLORS = [
	'#6accbc',
	'#158fad',
	'#884dff',
	'#eb96eb',
	'#b8255f',
	'#e05194',
	'#ff8d85',
	'#ccac93',
	'#afb83b',
	'#ff9933',
	'#ff9933',
	'#28acc0',
];

const DonutChart = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
		},
		[setActiveIndex]
	);

	const renderActiveShape = (props) => {
		const {
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
			percent,
			value,
		} = props;

		return (
			<g>
				<text
					className="small"
					x={cx}
					y={cy - 15}
					dy={8}
					textAnchor="middle"
					fill={fill}>
					{payload.name}
				</text>
				<text
					className="small"
					x={cx}
					y={cy + 10}
					dy={8}
					textAnchor="middle"
					fill={fill}>
					{`${value} AZN (${(percent * 100).toFixed(2)}%)`}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
			</g>
		);
	};

	return (
		<ResponsiveContainer width="80%" height="80%">
			<PieChart width={100} height={100}>
				<Pie
					data={data || []}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={80}
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					onMouseEnter={onPieEnter}
					paddingAngle={5}
					dataKey="value">
					{data &&
						data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default DonutChart;
