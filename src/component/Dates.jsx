import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Calendar";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Todos from "./Todos"
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Dates() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [Task, setTask] = useState('');
  const [dated, setDate] = useState();
  const [checked, setchecked] = useState(false);
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  const clickHandler = () => {
    setchecked(!checked);
  }


  let addEntry = async (e) => {
    e.preventDefault();
    try {
      const requestData = { Task, dated };

      // Add 'email' to the request data only if it is defined
      if (email) {
        requestData.email = email;
      }

      if (Task && dated) {
        await Axios.post('http://localhost:3000/ravi/v1/createtask', requestData);
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), Task, dated },
        ]);
        toast.success("Task Created Sucessfully", {
          position: "top-center"
        });
        setEmail('');
        setTask('');
      }
      else {
        toast.error('Please Fill All Fields', {
          position: 'top-center',
        });
      }
    }
    catch (e) {
      console.log(e);
    }
  }

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

            <form method="POST" onSubmit={addEntry}>
            <h1 className=" taxt-lg lg:text-xl font-bold text-black leading-1.1 select-none mb-2 mt-2">Upcoming Events</h1>
            <h1 className="text-sm font-bold text-gray-700 lg:ml-1 leading-1.1 select-none">
              {`Schedule for ${selectDate.toDate().toDateString()} `}
            </h1>

            <textarea value={Task} onChange={(e) => setTask(e.target.value)} id="task" rows="4" className="mt-1 block p-2.5 w-[280px] lg:w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-100" placeholder="Set a Reminder..."></textarea>


            {
              checked && <div className='flex gap-1 flex-col'>
                <label htmlFor="email" className='font-semibold text-md lg:text-lg leading-1.2'>Enter Email</label>
                <input className='text-md font-semibold leading-1.2 p-1 rounded-md' type="email" value={email} placeholder="abc@xyz.com" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
            }
            <button onClick={clickHandler} className="lg:mb-8 border-2 shadow-lg rounded-lg bg-purple-500 p-2 mt-2 select-none border-solid border-black sm:w-full sm:mt-2 lg:ml-1 " >
              Click To Send Your Task On Email
            </button>

            <div>
              <input type="submit" value="Submit" className='opacity-0' />
              <button className="border-2 shadow-lg rounded-lg bg-green-300 p-1 mt-3 lg:ml-1 select-none border-solid border-black w-[210px] lg:w-full sm:mt-2 " type="submit" onClick={addEntry} >
                Add Task
              </button>
            </div>
            
            </form> 

            <div className="flex flex-wrap gap-3">
              {
                tasks.map((TaskItem, index) => (
                  <Todos task={TaskItem.Task} dated={TaskItem.dated} index={index}/>
                ))
              }
            </div>
        
       
      </div> 

      <ToastContainer />
   </div>
    
  );
}