import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function AvgYearsExperience(prop) {
	const backendResponse = {
		averageExperience: 3,
		averageMaleExperience: 5,
		averageFemaleExperience: 2.5,
	};

	const data = [
		{ name: 'Whole Batch', value: backendResponse.averageExperience, color: '#008080' },
		{ name: 'Males', value: backendResponse.averageMaleExperience, color: '#1E90FF' },
		{ name: 'Females', value: backendResponse.averageFemaleExperience, color: '#FF6F61' },
	];

	return (
		<div style={{ width: '300px', height: '300px' }}>
			<PieChart width={300} height={300}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={100}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip formatter={(value) => value} />
				<Legend />
			</PieChart>
		</div>
	);
}

export default AvgYearsExperience;
