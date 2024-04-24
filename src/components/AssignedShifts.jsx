import React from 'react'
import { useEffect,useState } from 'react'


export default function AssignedShifts() {
  const [shifts,setShifts]=useState([])
  async function fetchAssignedShifts(){
    const response=await fetch('http://localhost:5000/api/employee/shifts',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    const json=await response.json()
    setShifts(json)
    console.log(json)
  }
  function getDayFromDate(dateString) {
    const dateObj = new Date(dateString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = dateObj.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)
    return daysOfWeek[dayIndex];
}

  useEffect(()=>{
fetchAssignedShifts()
  },[])
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Assigned Shifts</h2>
            <p className="mt-1 text-sm text-gray-700">
              Employees can have a track of their assigned shifts below.
            </p>
          </div>
         
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Sl.No.</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        From
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        To
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {shifts?.map((shift,index) => (
                      <tr key={shift._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <p>{index+1}</p>
                            
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">{`${getDayFromDate(shift.date.substring(0,10))} (${shift.date.substring(0,10).split('-').reverse().join('-')})`}</div>
                          
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <b>{shift.startTime.substring(11,16)}</b>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          <b>{shift.endTime.substring(11,16)}</b>
                        </td>
                       
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
  )
}
