import { React, useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, LineChart, Line } from 'recharts';
import axios from 'axios';
import styles from './Academia.module.css';

const Postgraduation = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const [postGraduateData, setPostGraduationData] = useState({
    "maleCount": 0,
    "femaleCount": 0,
    "malesMasterHolders": 0,
    "femalesMasterHolders": 0,
    "malesPhdHolders": 0,
    "femalesPhdHolders": 0
  })
  const [totalPostGradData, setTotalPostGradData] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/graduates/batch/postgraduate-gender-percentage/${selectedValue}`)
      .then(res => {
        console.log(res.data)
        setPostGraduationData(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [selectedValue])
  useEffect(() => {
    axios.get('http://localhost:3000/graduates/batch/getTotalPostGraduation')
      .then(res => {
        setTotalPostGradData(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  const transformedChartData = Object.keys(totalPostGradData).map(year => ({
    year,
    count: totalPostGradData[year]
  }));
  const data = [
    {
      "gender": "Males",
      "Postgraduates Studies Count": postGraduateData.malesMasterHolders
    },
    {
      "gender": "Females",
      "Postgraduates Studies Count": postGraduateData.femalesMasterHolders
    }
  ];
  const colors = {
    Males: "#1E90FF",
    Females: "#FF6F61"
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Postgraduate Studies</h3>
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
      <div className={styles.totalPostGrad}>
        <div>
          <BarChart width={500} height={270} data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Legend
              payload={[{
                value: "Males", type: "square", color: colors.Males
              }, {
                value: "Females", type: "square", color: colors.Females
              }]}
            />
            <Bar dataKey="Postgraduates Studies Count">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[entry.gender]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          <LineChart width={700} height={350} data={transformedChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#008080" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Postgraduation;
