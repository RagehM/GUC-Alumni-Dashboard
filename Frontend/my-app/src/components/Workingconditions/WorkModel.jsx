import { React, useEffect, useState } from "react";
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Cell } from "recharts";
import axios from "axios";
import styles from './WorkingConditions.module.css'
function WorkModel() {
	const [selectedValue, setSelectedValue] = useState('');
	const [workModeCount, setWorkModeCount] = useState({
		"maleResult": {
			"onSiteCount": 0,
			"hybridCount": 0,
			"remoteCount": 0
		},
		"femaleResult": {
			"onSiteCount": 0,
			"hybridCount": 0,
			"remoteCount": 0
		}
	})
	const handleChange = (e) => {
		setSelectedValue(e.target.value);
	};
	useEffect(() => {
		axios.get(`http://localhost:3000/graduates/batch/getWorkModeCount/${selectedValue}`)
			.then(res => {
				setWorkModeCount(res.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, [selectedValue])
	const data = [
		{
			name: 'On-site',
			Males: workModeCount.maleResult.onSiteCount,
			Females: workModeCount.femaleResult.onSiteCount
		},
		{
			name: 'Remote',
			Males: workModeCount.maleResult.remoteCount,
			Females: workModeCount.femaleResult.remoteCount
		},
		{
			name: 'Hybrid',
			Males: workModeCount.maleResult.hybridCount,
			Females: workModeCount.femaleResult.hybridCount
		}
	]
	const colors = {
		Males: "#1E90FF",
		Females: "#FF6F61"
	};
	return (
		<div className={styles.mainContainer}>
			<div className={styles.header}>
				<h3 className={styles.title}>Working Conditions</h3>
				<select className={styles.custom} value={selectedValue} onChange={handleChange}>
					<option value="">All</option>
					<option value="2024-06-01">2024</option>
					<option value="2023-06-01">2023</option>
					<option value="2022-06-01">2022</option>
					<option value="2021-06-01">2021</option>
					<option value="2020-06-01">2020</option>
					<option value="2019-06-01">2019</option>
					<option value="2018-06-01">2018</option>
				</select>
			</div>
			<div className={styles.workCondition}>
				<BarChart
					width={600}
					height={300}
					data={data}
				>
					<CartesianGrid strokeDasharray="2 2" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip
						contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }}
						formatter={(value, name) => [value, name === "Males" ? "Males" : "Females"]}
						labelStyle={{ color: '#333' }}
					/>
					<Legend
						payload={[
							{ value: "Males", type: "square", color: colors.Males },
							{ value: "Females", type: "square", color: colors.Females }
						]}
					/>
					<Bar dataKey="Males">
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={colors.Males} />
						))}
					</Bar>
					<Bar dataKey="Females">
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={colors.Females} />
						))}
					</Bar>
				</BarChart>
			</div>
		</div>
	)
}
export default WorkModel;