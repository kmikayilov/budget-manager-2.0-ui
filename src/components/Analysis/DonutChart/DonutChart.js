import React, { useState } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';

const COLORS = [
	'#afb83b',
	'#6accbc',
	'#158fad',
	'#884dff',
	'#eb96eb',
	'#b8255f',
	'#e05194',
	'#ff8d85',
	'#ccac93',
	'#ff9933',
	'#ff9933',
	'#28acc0',
];

const DonutChart = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const onPieEnter = (_, index) => setActiveIndex(index);

	const renderActiveShape = (props) => {
		const RADIAN = Math.PI / 180;
		const {
			cx,
			cy,
			midAngle,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
			percent,
			value,
		} = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
					{payload.name}
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
				<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
				<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
				<text
					x={ex + (cos >= 0 ? 1 : -1) * 12}
					y={ey}
					textAnchor={textAnchor}
					fill="#7b8794">
					{`${value} AZN (${(percent * 100).toFixed(2)}%)`}
				</text>
			</g>
		);
	};

	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data || []}
					innerRadius={60}
					outerRadius={80}
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					onMouseEnter={onPieEnter}
					cx="50%"
					cy="50%"
					labelLine={false}
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
