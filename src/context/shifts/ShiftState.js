import ShiftContext from "./shiftContext";
import { useState } from "react";

const ShiftState = (props) =>{

    let availabilityInitial = []
    // Employee method to get their created availability
    const getAvailability = async ()=>{
        const host = process.env.REACT_APP_BACKEND_IP
        const response = await fetch(`${host}/api/employee/availability`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setAvailability(json)
    }
    
    // Admin method to get their Employee's list
    const getEmployeeList = async ()=>{
        const host = process.env.REACT_APP_BACKEND_IP
        const response = await fetch(`${host}/api/admin/availability`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setemployees(json)
    }

    // Admin method to get particular employee availability
    const getEmployeeAvailabilityById = async (id)=>{
        const host = process.env.REACT_APP_BACKEND_IP
        const response = await fetch(`${host}/api/admin/availability/${id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setAvailability(json)
    }
    
    const [employees, setemployees] = useState([]) 
    const [availability, setAvailability] = useState(availabilityInitial)

    return(
        <ShiftContext.Provider value={{availability, getAvailability, employees, getEmployeeList, getEmployeeAvailabilityById}}>
            {props.children}
        </ShiftContext.Provider>
    )

}

export default ShiftState;