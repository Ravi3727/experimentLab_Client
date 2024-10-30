import React, { useState } from 'react';
import Axios from 'axios';
import Spin from "./Spin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpcomingEvents({ dated, title, desc, time, id, activetab, selectDate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(desc);
  const [currentTime, setCurrentTime] = useState(time);
  const [loader, setLoader] = useState(false);
  const [dloader, setDLoader] = useState(false);
  const [period, setPeriod] = useState('AM');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem("user");  // Retrieve user ID from localStorage
    const deleteUrl = `http://localhost:3000/ravi/v1/${activetab === 'allevents' ? 'events' : 'meetings'}/${id}?userId=${userId}`;

    try {
        setDLoader(true);
        await Axios.delete(deleteUrl);  // `userId` included in the URL as a query param
        setDLoader(false);
        toast.success(`${activetab === 'allevents' ? 'Event' : 'Meeting'} Deleted Successfully`, { position: "top-center" });
        window.location.reload();
    } catch (error) {
        console.error('Error deleting:', error.message);
        setDLoader(false);
    }
};

  const addEventEntry = async (e) => {
    e.preventDefault();

    const addEventURL = activetab === 'allevents'
      ? `http://localhost:3000/ravi/v1/events/${id}`  // Pass the event ID as a URL parameter
      : `http://localhost:3000/ravi/v1/meetings/${id}`;

    try {
      const updatedDate = selectDate?.toDate()?.toDateString();
      const fullTime = `${currentTime} ${period}`;

      if (currentTitle && updatedDate && currentDescription && fullTime) {
        setLoader(true);
        const userId = localStorage.getItem("user");  // Get user ID from local storage

        const dataToSend = {
          userId, // Send userId along with the event data
          dated: updatedDate,
          title: currentTitle,
          description: currentDescription,
          time: fullTime
        };

        console.log("Sending data: ", dataToSend);
        await Axios.patch(addEventURL, dataToSend); // Make sure you are using PATCH as intended

        setLoader(false);
        toast.success(`${activetab === 'allevents' ? 'Event' : 'Meeting'} Updated Successfully`, { position: "top-center" });

        // Exit edit mode after successful update
        setMode(false);
        window.location.reload();
      } else {
        toast.error('Please Fill All Fields', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error updating:', error.message);
      setLoader(false);
    }
  };


  return (
    <div className='w-full h-full'>
      {mode === false ? (
        <div className='w-40 md:w-full max-sm:max-h-44 overflow-y-auto  rounded-lg overflow-x-hidden border-1 md:p-2 shadow-lg bg-purple-400 flex flex-col justify-center items-center'>
          <h1 className='text-md md:text-xl text-white font-semibold sm:font-bold mt-4'>{title}</h1>
          <div className='flex flex-col w-full h-full justify-center items-center'>
            <h1 className='text-sm md:text-xl text-white font-semibold sm:font-bold mt-1 md:mt-4'>{dated}</h1>
            <h1 className='text-sm md:text-xl text-white font-semibold sm:font-bold mt-1 md:mt-4'>{time}</h1>
          </div>
          <p className={`text-sm font-thin text-white min-h-[70px] md:max-h-[120px]  mt-1 w-36 md:w-full p-2 flex items-start justify-center ${isExpanded ? 'whitespace-normal overflow-y-auto' : 'whitespace-nowrap overflow-hidden'}`}>
            {desc}
          </p>
          {desc.length > 40 && (
            <button className='text-white text-[10px] hover:text-gray-300 mt-1' onClick={toggleExpand}>
              {isExpanded ? 'Read Less' : 'Read More...'}
            </button>
          )}

          <div className='flex justify-between w-full p-1 gap-2'>
            <button onClick={() => setMode(true)} className='bg-blue-500 w-20 text-white font-semibold p-1 rounded-lg mt-2 hover:bg-blue-600'>
              {loader ? <Spin /> : "Edit"}
            </button>
            <button onClick={handleDelete} className='bg-red-500 w-20 text-white font-semibold p-1 rounded-lg mt-2 hover:bg-red-600'>
              {dloader ? <Spin /> : "Delete"}
            </button>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex items-center justify-center md:ml-[11rem] '>
          <form onSubmit={addEventEntry} className=" ml-3 md:ml-0 border-1 rounded-xl mt-4 w-[20rem]  md:w-full p-2 h-full mx-auto flex flex-col">
            <div className="flex flex-col gap-4 mt-4">
              <h1 className="text-2xl text-black font-semibold">
                Update {activetab === 'allevents' ? 'Event' : 'Meeting'}
              </h1>
              <h1 className="text-sm font-bold text-gray-700">
                {`Schedule for ${selectDate?.toDate()?.toDateString()} `}
              </h1>
            </div>

            <div className="flex w-72  items-center justify-between gap-1">
              <label htmlFor="time" className="w-28 md:min-w-20 block mb-2 text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
                Select time:
              </label>
              <input
                type="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 hover:bg-gray-200 hover:cursor-pointer"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                required
              />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <div className="mt-3">
              <label htmlFor="title" className="text-sm font-bold text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 bg-gray-100"
                placeholder="Set a title..."
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="description" className="text-sm font-bold text-gray-700">Description</label>
              <textarea
                id="description"
                rows="4"
                className="mt-1 block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 bg-gray-100"
                placeholder="Set a Reminder..."
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
              ></textarea>
            </div>

            <button className="border-2 shadow-lg rounded-lg bg-green-300 p-1 mt-3 w-full" type="submit">
              {
                loader ? <Spin /> : `Update ${activetab === 'allevents' ? 'Event' : 'Meeting'}`
              }
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>

  );
}
export default UpcomingEvents;