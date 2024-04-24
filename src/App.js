import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import ShiftState from "./context/shifts/ShiftState";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import Availability from './components/Availability';
import AssignedShifts from './components/AssignedShifts';
import EmployeeAvailability from './components/EmployeeAvailability';
import ShiftCreation from './components/ShiftCreation';
function App() {
  return (
    <>
    <ShiftState>
    <Router>
      <Navbar />
      {/* <Alert alert={alert}/> */}
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/employee/availability" element={<Availability />} />
          <Route exact path="/employee/shifts" element={<AssignedShifts />} />
          <Route exact path="/admin/availability" element={<EmployeeAvailability />} />
          <Route exact path="/admin/shifts" element={<ShiftCreation />} />
          {/* <Route exact path="/about" element={<About/>} /> */}
          </Routes>
    </Router>
    </ShiftState>
    </>
  );
}

export default App;
