import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Calendar";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Todos from "./Todos"
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spin from "./Spin";


export default function Dates() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [Task, setTask] = useState('');
  const [dated, setDate] = useState();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  const addEntry = async (e) => {
    e.preventDefault();

    try {
      const emailToSend = email.length > 0 ? email : "rk3727000@gmail.com";

      if (Task && dated) {
        setLoader(true);
        const dataToSend = { dated, Task, email: emailToSend };
         await Axios.post('https://todo-server-vp9b.onrender.com/ravi/v1/createtask', dataToSend);
        setLoader(false);
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), Task, dated },
        ]);

        toast.success("Task Created Successfully", {
          position: "top-center",
        });

        setEmail('');
        setTask('');
      } else {
        toast.error('Please Fill All Fields', {
          position: 'top-center',
        });
      }
    } catch (error) {
      // Handle specific Axios errors if needed
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      console.error(error);
    }
  };




  return (

    <div className="flex flex-col gap-10 p-4 overflow-x-hidden">
      <div className="w-full p-2">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-10 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className=" cursor-pointer hover:scale-105 transition-all select-none"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-black font-extrabold leading-1.1 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className=" grid grid-cols-7 ">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today
                        ? "bg-red-600 text-white"
                        : "",
                      selectDate
                        .toDate()
                        .toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-purple-900 text-white"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                      setDate(date.$D);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>



      <div className="h-96 w-96 sm:px-5">

        <div className="h-[2px] bg-gray-300 mt-4 lg:w-[410px] w-full "></div>

        {loader && <div className="items-center justify-center flex lg:ml-[80px] mr-12     lg:mr-0">
            <Spin />
          </div>
        }

        <form method="POST" onSubmit={addEntry}>
          <h1 className=" taxt-lg lg:text-xl font-bold text-black leading-1.1 select-none mb-2 mt-2">Upcoming Events</h1>
          <h1 className="text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
            {`Schedule for ${selectDate.toDate().toDateString()} `}
          </h1>

          <textarea value={Task} onChange={(e) => setTask(e.target.value)} id="task" rows="4" className="mt-1 block p-2.5 w-[280px] lg:w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100" placeholder="Set a Reminder..."  style={{ backgroundColor: loader ?'rgb(200,200,200)':'', color :loader?'rgb(0,0,0)':''}}></textarea>

          <div className="mt-2 flex flex-col w-[210px] lg:w-full">
            <label htmlFor="email" className="text-md font-semibold leading-1.2 border-solid border-black">Enter Email </label>
            <input type="email" placeholder="abc@xyz.com" value={email} onChange={(e) => setEmail(e.target.value)} className="p-1 rounded-lg border-1 mt-1 mb-1" style={{ backgroundColor: loader ?'rgb(200,200,200)':'', color :loader?'rgb(0,0,0)':''}} />

          </div>

          <div>
            <button className="border-2 shadow-lg rounded-lg bg-green-300 p-1 mt-3 lg:ml-0 select-none border-solid border-black w-[210px] lg:w-full sm:mt-2 " type="submit" >
              Add Task
            </button>
          </div>

        </form>

        <div className="flex flex-wrap gap-3">
          {
            tasks.map((TaskItem, index) => (
              <Todos task={TaskItem.Task} dated={TaskItem.dated} key={index} />
            ))
          }
        </div>


      </div>

      <ToastContainer />
    </div>

  );
}