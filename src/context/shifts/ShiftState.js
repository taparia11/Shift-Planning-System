import ShiftContext from "./shiftContext";
import { useState } from "react";

const ShiftState = (props) =>{

    let availabilityInitial = []
    const getAvailability = async ()=>{
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/employee/availability`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setAvailability(json)
    }
    
    const getEmployeeList = async ()=>{
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/admin/availability`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setemployees(json)
    }
    const getEmployeeAvailabilityById = async (id)=>{
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/admin/availability/${id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
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