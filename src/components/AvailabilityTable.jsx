import React, { useContext, useEffect } from 'react';
import ShiftContext from '../context/shifts/shiftContext';

const AvailabilityTable = () => {
    const context = useContext(ShiftContext);
    const { availability, getAvailability } = context;

    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Generate dates for the next 7 days
    const next7Days = Array.from({ length: 7 }, (_, index) => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + index);
        return nextDate;
    });

    useEffect(() => {
        getAvailability();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h2 className="text-lg font-semibold">My Availability</h2>
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
                                                        {` text-black-500 whitespace-nowrap px-4 py-4 text-sm ${available.date?.substring(0,10) === date.toISOString().split('T')[0] ? `bg-green-100` : ''}`}
                                                    >
                                                        {available.date?.substring(0,10) === date.toISOString().split('T')[0] ? `✅ ${available.startTime?.substring(11,16)} to ${available.endTime?.substring(11,16)}` : ""}
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

export default AvailabilityTable;
