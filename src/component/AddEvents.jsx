import Spin from "./Spin";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllEvents from "./AllEvents";
// import {AppContext} from "../App";
function AddEvents({ selectDate }) {
    // const {user} = useContext(AppContext);
    const [activetab, setActivetab] = useState("addevents");
    const [allEvents, setAllEvents] = useState([]);
    const [eventType, setEventType] = useState("events");
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('11:59');
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);
    const [period, setPeriod] = useState('AM');
    const [user, setUser] = useState();
    
    const handelSwitchTab = (tab) => {
        setActivetab(tab);
    }
    
    const getUser = () => {
        const url = `http://localhost:3000/ravi/v1/users`;
    
        try {
            // Retrieve and parse the user object from localStorage
            const storedUser = localStorage.getItem("user");
            const userId = storedUser ? storedUser : null;
    
            // Corrected condition: if no userId is found, log and return
            if (!userId) {
                console.log("No user ID found in localStorage.");
                return;
            }
    
            console.log("userId:", userId); // Log userId for debugging
    
            Axios.post(url, { userId }) // Pass userId directly
                .then((response) => {
                    console.log("Response:", response.data);
    
                    if (response.status === 200) {
                        console.log("User Data:", response.data.data);
                        setUser(response.data.data);
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching user data: ${error.message}`);
                });
        } catch (error) {
            console.error(`Error in getUser: ${error.message}`);
        }
    };
    
    // Ensure getUser runs on mount
    useEffect(() => {
        getUser();
    }, []);
    
    // Update allEvents when activetab changes and based on user data
    useEffect(() => {
        if (activetab === 'allevents') {
            setAllEvents(user?.events || []);
        } else if (activetab === 'allmeetings') {
            setAllEvents(user?.meetings || []);
        }
    }, [activetab, user]);
    
    const addEventEntry = async (e) => {
        e.preventDefault();
    
        const addEventURL = eventType === 'events'
            ? "http://localhost:3000/ravi/v1/events"
            : "http://localhost:3000/ravi/v1/meetings";
    
        try {
            const dated = selectDate.toDate().toDateString();
            const fullTime = `${time} ${period}`;
    
            if (title && dated && description && fullTime) {
                setLoader(true);
                const dataToSend = { dated, title, description, time: fullTime, id: user._id };
                console.log("Sending data: ", dataToSend);
    
                const response = await Axios.post(addEventURL, dataToSend);
                setLoader(false);
    
                setAllEvents((prevEvents) => [...prevEvents, response.data.data.events]);
                toast.success(`${eventType} Created Successfully`, { position: "top-center" });
    
                // Clear input fields
                setTitle('');
                setTime('11:59');
                setDescription('');
                getUser();
                window.location.reload();
            } else {
                toast.error('Please Fill All Fields', { position: 'top-center' });
            }
        } catch (error) {
            setLoader(false);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <>
            <div className="h-14 md:h-20 w-full  bg-gray-100 rounded-xl p-2 flex justify-evenly items-center">
                <div onClick={() => handelSwitchTab("addevents")} className={`${activetab === 'addevents' ? 'underline' : ''} hover:cursor-pointer text-sm md:text-2xl text-black font-semibold leading-4`}>
                    Add Events
                </div>
                <div onClick={() => handelSwitchTab("allevents")} className={`${activetab === 'allevents' ? 'underline' : ''} hover:cursor-pointer text-sm md:text-2xl text-black font-semibold leading-4`}>
                    All Events
                </div>
                <div onClick={() => handelSwitchTab("allmeetings")} className={`${activetab === 'allmeetings' ? 'underline' : ''} hover:cursor-pointer text-sm md:text-2xl text-black font-semibold leading-4`}>
                    All Meetings
                </div>
            </div>

            {activetab === 'addevents' && <div className=" w-full max-h-[80vh]">
                <form onSubmit={addEventEntry} className="border-1 rounded-xl mt-4 w-full md:w-10/12 p-2 h-full mx-auto flex flex-col">
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full justify-between items-center">
                                <h1 className="text-md md:text-xl font-bold text-black leading-4">
                                    What you want to add Events or Meetings?
                                </h1>
                                <div className="hover:cursor-pointer">
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg p-2.5 hover:bg-gray-200 hover:cursor-pointer"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option value="events">Events</option>
                                        <option value="meetings">Meetings</option>
                                    </select>
                                </div>
                            </div>
                            <div onClick={() => handelSwitchTab("addevents")} className={`hover:cursor-pointer text-2xl text-black font-semibold leading-4`}>
                                Add {eventType === 'events' ? 'Events' : 'Meetings'}
                            </div>
                        </div>
                        <h1 className="text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
                            {`Schedule for ${selectDate.toDate().toDateString()} `}
                        </h1>
                    </div>

                    <div className="mt-3">
                        <div className="flex w-[18rem]  items-center justify-between gap-1">
                            <label htmlFor="time" className="min-w-20  block mb-2 text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
                                Select time:
                            </label>
                            <input
                                type="time"
                                id="time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 hover:bg-gray-200 hover:cursor-pointer"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
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
                    </div>

                    <div>
                        <label htmlFor="title" className="text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
                            Title
                        </label>
                        <input
                            type="text"
                            className="mt-1 block p-2.5 w-full text-sm font-bold text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                            placeholder="Set a title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="description" className="text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            className="mt-1 block p-2.5 w-full text-sm font-semibold text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                            placeholder="Set a Reminder..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ backgroundColor: loader ? 'rgb(200,200,200)' : '', color: loader ? 'rgb(0,0,0)' : '' }}
                        ></textarea>
                    </div>

                    <div className="mt-3 mb-2">
                        <button
                            className="border-2 shadow-lg rounded-lg bg-green-300 p-1 mt-3 w-full border-solid border-black"
                            type="submit"
                        >
                            {loader ? "Adding..." : `Add ${eventType === 'events' ? 'Events' : 'Meetings'}`}
                        </button>
                    </div>
                </form>
            </div>
            }


            {(activetab === 'allevents' || activetab === 'allmeetings') && <div>
                {loader ? <div className="w-full flex justify-center h-[60vh] items-center"><Spin /></div> :
                    <div className="w-full h-full -mt-6 md:mt-0">
                        <AllEvents allEvents={allEvents} activetab={activetab} selectDate={selectDate} />
                    </div>
                }
            </div>}
            <ToastContainer />
        </>
    )
}

export default AddEvents