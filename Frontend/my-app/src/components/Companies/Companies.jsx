import CardT from "../Trials/CardT";
import { useState } from 'react';
import styles from './Companies.module.css'

function Companies() {
  const [selectedValue, setSelectedValue] = useState('All');
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Companies</h3>
        <select className={styles.custom} value={selectedValue} onChange={handleChange}>
          <option value="All">All</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  )
}
export default Companies;