import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar2 from './Sidebar2';
import Overview from '../overView/Overview';
import Companies from '../Companies/Companies';
import Home from '../Home/Home';
import Postgraduation from '../Academia/Postgraduation';
import MalesVsFemales from '../Academia/MalesVsFemales';
import Heatmap from '../Workingconditions/Heatmap';
import WorkModel from '../Workingconditions/WorkModel';
function Dashboard() {
  return (
    <Router>
      <SideBar2 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Overview' element={<Overview />} />
        <Route path='/Academia/PostGraduate Studies' element={<Postgraduation />} />
        <Route path='/Academia/Master Vs Phd' element={<MalesVsFemales />} />
        <Route path='/Working Conditions/WorkModel' element={<WorkModel />} />
        <Route path='/Working Conditions/Heatmap' element={<Heatmap />} />
        <Route path='/Companies' element={<Companies />} />
      </Routes>
    </Router>
  )
}
export default Dashboard;