import { React, useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import styles from './WorkingConditions.module.css'
import './Heatmap.css';

const Heatmap = () => {
  const getCountryCoordinates = (region) => {
    const coordinates = {
      'United States': [37.0902, -95.7129],
      'Honduras': [13.5000, -82.0000],
      'Brazil': [-14.2350, -51.9253],
      'Argentina': [-38.4161, -63.6167],
      'Germany': [51.1657, 10.4515],
      'France': [46.6034, 1.8883],
      'Spain': [40.4637, -3.7492],
      'South Africa': [-30.5595, 22.9375],
      'Nigeria': [9.0820, 8.6753],
      'Egypt': [26.8206, 30.8024],
      'India': [20.5937, 78.9629],
      'Japan': [36.2048, 138.2529],
      'China': [35.8617, 104.1954],
      'Australia': [-25.2744, 133.7751],
      'New Zealand': [-40.9006, 174.8860],
      'Saudi Arabia': [23.8859, 45.0792],
    };
    return coordinates[region] || [0, 0]; // Default to [0, 0] if country is not found
  };
  const getColor = (count, maxCount) => {
    const ratio = count / maxCount;
    const hue = (1 - ratio) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };
  // const [studentData, setStudentData] = useState([
  //   { region: '', count: 0 }
  // ])
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/graduates/batch/graduatesLocationAggregate`, { 'year': 2021 })
  //     .then(res => {
  //       setStudentData(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [selectedValue])
  const studentData = [
    {
      "region": "Germany",
      "count": 8
    },
    {
      "region": "Egypt",
      "count": 8
    },
    {
      "region": "Australia",
      "count": 2
    },
    {
      "region": "India",
      "count": 11
    },
    {
      "region": "Saudi Arabia",
      "count": 6
    },
    {
      "region": "United States",
      "count": 12
    }
  ]
  const maxCount = Math.max(...studentData.map(data => data.count));
  const sortedStudentData = studentData.sort((a, b) => b.count - a.count);
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
      <div className="heatmap-container">
        <div className="heatmap-legend">
          <h3>Graduates Distribution</h3>
          <div className="legend-grid">
            {sortedStudentData.map((data, index) => (
              <div key={index} className="legend-item">
                <span>{data.region}</span>
                <span className="legend-color" style={{ backgroundColor: getColor(data.count, maxCount) }}></span>
              </div>
            ))}
          </div>
        </div>
        <div className="map-wrapper">
          <MapContainer center={[20, 0]} zoom={1} style={{ height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {studentData.map((data, index) => (
              <CircleMarker
                key={index}
                center={getCountryCoordinates(data.region)}
                radius={Math.sqrt(data.count) * 4}
                fillOpacity={0.7}
                color={getColor(data.count, maxCount)}
              >
                <Popup>
                  <div>
                    <strong>{data.region}</strong><br />
                    {data.count} Graduates
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
