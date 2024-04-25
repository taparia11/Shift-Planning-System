import { useContext, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import ShiftContext from '../context/shifts/shiftContext';

function CreateAvailability() {
  const [date, setDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const context = useContext(ShiftContext);
  const { getAvailability } = context;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the start and end times
    const startDateTime = new Date(date + 'T' + startTime);
    const endDateTime = new Date(date + 'T' + endTime);

    // calculate diff and milisec to hour
    const timeDifference = endDateTime - startDateTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);


    if (hoursDifference >= 4) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/employee/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ date: date, startTime: startTime, endTime: endTime })
      });

      const json = await response.json();
      if (json.success) {
        toast.success("Available Time added");
        setDate('');
        setStartTime('');
        setEndTime('');
        getAvailability();
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Time range must be at least 4 hours apart.");
    }
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    const currentDate = new Date()
    const maxDate = new Date(currentDate.getTime() + (6 * 24 * 60 * 60 * 1000)) // 7 days from current date

    if (selectedDate > maxDate) {
      alert("You can't select a date more than 7 days from the current date.")
      return
    }
    setDate(e.target.value)
  }

  return (
    <>
      <div><Toaster /></div>
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Create Availability
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col items-center">
                <div>
                  <label htmlFor="" className="text-center mx-6 font-medium text-gray-900">
                    {' '}
                    Select Date{' '}
                  </label>
                  <div className="mt-2">
                    <input type="date"
                      className="flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      value={date} onChange={handleDateChange} min={getMinDate()} max={getMaxDate()} />
                  </div>
                </div>
                <div className='flex my-2'>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium text-gray-900">
                        {' '}
                        Start Time {' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input type="time"
                        className="flex h-10  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="" className="text-base font-medium text-gray-900">
                        {' '}
                        End Time {' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input type="time"
                        className="flex h-10  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center my-2 justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Availability
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

    </>
  )
}

// function to get the minimum selectable date from current date
const getMinDate = () => {
  const currentDate = new Date()
  const offset = currentDate.getTimezoneOffset() * 60 * 1000 
  const minDate = new Date(currentDate.getTime() - offset) 
  return minDate.toISOString().split('T')[0] // Format: YYYY-MM-DD
}

// function to get the maximum selectable date from current date (7 days)
const getMaxDate = () => {
  const currentDate = new Date()
  const maxDate = new Date(currentDate.getTime() + (6 * 24 * 60 * 60 * 1000)) 
  return maxDate.toISOString().split('T')[0] // Format: YYYY-MM-DD
}

export default CreateAvailability