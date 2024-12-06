import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home = () => {
  const [topHiring, setTopHiring] = useState([]);
  const [insights, setInsights] = useState([]);
  const [totalGraduates, setTotalGraduates] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/graduates/batch/getTopHiringCompany"
        );
        setTopHiring(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/graduates/batch/getInsights"
        );
        setInsights(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/graduates/batch/getGraduatesField/${selectedValue}`
        );
        setTotalGraduates(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedValue]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h1></h1>
        <select
          className={styles.custom}
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Software Development">Software Development</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Information Technology & Services">
            Information Technology & Services
          </option>
          <option value="Medical Equipment Manufacturing">
            Medical Equipment Manufacturing
          </option>
          <option value="Blockchain Services">Blockchain Services</option>
          <option value="E-Learning Providers">E-Learning Providers</option>
          <option value="Oil and Gas">Oil and Gas</option>
        </select>
      </div>

      <div className={styles.top}>
        <h2>
          About {totalGraduates.totalGraduates} Guc Graduate work in the{" "}
          {selectedValue} department
        </h2>
      </div>

      <div className={styles.top}>
        <h2>Top Hiring Companies</h2>
        <div className={styles.chart}>
          <BarChart width={1000} height={300} data={topHiring}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="graduateCount" fill="#008080" />
          </BarChart>
        </div>
      </div>

      <div className={styles.top}>
        <h2>Where Our Graduates Worked</h2>
        <div className={styles.chart}>
          <BarChart width={1000} height={300} data={insights}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="graduateCount" fill="#008080" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Home;
