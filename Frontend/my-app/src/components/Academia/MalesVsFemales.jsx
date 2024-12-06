import { React, useEffect, useState } from "react";
import { Tooltip, Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Cell } from "recharts";
import axios from "axios";
import styles from './Academia.module.css';

function MalesVsFemales() {
  const [postGraduateData, setPostGraduateData] = useState({
    "maleCount": 0,
    "femaleCount": 0,
    "malesMasterHolders": 0,
    "femalesMasterHolders": 0,
    "malesPhdHolders": 0,
    "femalesPhdHolders": 0
  });
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/graduates/batch/postgraduate-gender-percentage/${selectedValue}`)
      .then(res => {
        setPostGraduateData(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  })
  const data = [
    {
      name: 'Masters',
      Males: postGraduateData.malesMasterHolders,
      Females: postGraduateData.femalesMasterHolders
    },
    {
      name: 'PhD',
      Males: postGraduateData.malesPhdHolders,
      Females: postGraduateData.femalesPhdHolders
    }
  ];
  const colors = {
    Males: "#1E90FF",
    Females: "#FF6F61"
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Master Vs Phd</h3>
        <select className={styles.custom} value={selectedValue} onChange={handleChange}>
          <option value="">All</option>
          <option value="2024-06-01">2024</option>
          <option value="2023-06-01">2023</option>
          <option value="2022-06-01">2022</option>
          <option value="2021-06-01">2021</option>
          <option value="2020-06-01">2020</option>
          <option value="2019-06-01">2019</option>
          <option value="2018-06-01">2018</option>
          <option value="2016-06-01">2016</option>
        </select>
      </div>
      <div className={styles.Comparison}>
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
  );
}

export default MalesVsFemales;
