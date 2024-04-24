import React, { useContext, useEffect } from 'react';
import ShiftContext from '../context/shifts/shiftContext';

const EmployeeAvailability = () => {
    const context = useContext(ShiftContext);
    const { availability, getAvailability,employees, getEmployeeList,getEmployeeAvailabilityById } = context;

    // Get the current date
    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Generate dates for the next 7 days
    const next7Days = Array.from({ length: 7 }, (_, index) => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + index);
        return nextDate;
    });

    useEffect(() => {
        // Fetch data from your API here
        // getAvailability();
        getEmployeeList();
    }, []);

    // Function to format ISO date string to hh:mm
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <h1>Select an Employee to know their Avaliability</h1>
                <select name="employee" id="employee" className='w-72 mb-4 border-2 border-black' onChange={(e)=>{
                    if(e.target.value==='select an employee') return
                    getEmployeeAvailabilityById(e.target.options[e.target.selectedIndex].id)
                    console.log(availability)
                    // console.log(e.target.options[e.target.selectedIndex].id)
                }}>
  <option value={'select an employee'}>Select an Employee</option>

                    {employees?.map(employee=>(
  <option value={employee.name} id={employee._id}>{employee.name}</option>
                    ))
                  
}
                </select>
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">Employee Availability</h2>
                    </div>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            {next7Days.map((date, index) => (
                                                <th key={index} scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-black-500">
                                                    {daysOfWeek[date.getDay()]} ({date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {availability.map((available) => (
                                            <tr key={available.date} className="divide-x divide-gray-200">
                                                {next7Days.map((date, index) => (
                                                    
                                                    <td key={index} className=
                                                        {` text-black-500 whitespace-nowrap px-4 py-4 text-sm ${available.date.substring(0,10) === date.toISOString().split('T')[0] ? `bg-green-100` : ''}`}
                                                    >
                                                        {available.date.substring(0,10) === date.toISOString().split('T')[0] ? `✅ ${available.startTime.substring(11,16)} to ${available.endTime.substring(11,16)}` : ""}
                                                    </td>
                                                 
                                                    
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmployeeAvailability;
