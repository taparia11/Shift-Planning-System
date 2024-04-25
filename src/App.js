import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import ShiftState from "./context/shifts/ShiftState";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
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
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} /> {/*For login the employee and admin */}
            <Route exact path="/register" element={<Register />} /> {/*For Register the employee */}
            <Route exact path="/employee/availability" element={<Availability />} /> {/*For employee to make their availability*/}
            <Route exact path="/employee/shifts" element={<AssignedShifts />} />  {/*For employee to check their assigned shifts*/}
            <Route exact path="/admin/availability" element={<EmployeeAvailability />} /> {/*For Admin to check the employees availability */}
            <Route exact path="/admin/shifts" element={<ShiftCreation />} />  {/*For Admin to assign the shift to employees*/}
          </Routes>
        </Router>
      </ShiftState>
    </>
  );
}

export default App;
