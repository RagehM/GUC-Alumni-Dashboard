import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import TotalCountOfAlumni from './TotalCountOfAlumni';
import EmploymentRate from './EmploymentRate';
import EmploymentRateFemales from './EmploymentRateFemales';
import EmploymentRateMales from './EmploymentRateMales';
import AvgYearsExperience from './AvgYearsExperience';
import styles from './Overview.module.css'

function Overview() {
  const [selectedValue, setSelectedValue] = useState('');
  const [graduatesCount, setGraduatesCount] = useState({
    "maleCount": 0,
    "femaleCount": 0
  });
  const [employmentRate, setEmploymentRate] = useState({
    males: { countOfEmployedGraduates: 0, countOfUnEmployedGraduates: 0 },
    females: { countOfEmployedGraduates: 0, countOfUnEmployedGraduates: 0 }
  });
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/graduates/batch/getGraduatesTotalCount/${selectedValue}`)
      .then(res => {
        setGraduatesCount(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [selectedValue]);
  useEffect(() => {
    axios.get(`http://localhost:3000/graduates/batch/getGraduatesEmploymentPercentage/${selectedValue}`)
      .then(res => {
        setEmploymentRate(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [selectedValue]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h3 className={styles.title}>Overview</h3>
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

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Total Alumni Count</h4>
        <div className={styles.row}>
          <div className={styles.item}>
            <TotalCountOfAlumni titleText={'Whole Batch'} bgColor={'#008080'} graduatesCount={graduatesCount} />
          </div>
          <div className={styles.group}>
            <div className={styles.item}>
              <TotalCountOfAlumni titleText={'Males'} bgColor={'#1E90FF'} graduatesCount={graduatesCount} />
            </div>
            <div className={styles.item}>
              <TotalCountOfAlumni titleText={'Females'} bgColor={'#FF6F61'} graduatesCount={graduatesCount} />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className={styles.insights}>
        <div className={styles.section}>
          <h4 className={styles.subtitle}>Employment Rates</h4>
          <div className={styles.row}>
            <div className={styles.item}>
              <EmploymentRate response={employmentRate} />
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                <EmploymentRateMales response={employmentRate} />
              </div>
              <div className={styles.item}>
                <EmploymentRateFemales response={employmentRate} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.special}>
          <h4 className={styles.subtitle}>Average Years of Experience</h4>
          <div className={styles.row}>
            <div className={styles.item}>
              <AvgYearsExperience />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Overview;
