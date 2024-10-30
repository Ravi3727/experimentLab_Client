import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./Calendar";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import AddEvents from "./AddEvents";

export default function Dates() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [dated, setDate] = useState();
  return (

    <div className="flex md:flex-row flex-col  justify-between p-2 md:p-4 overflow-x-hidden w-full md:w-11/12 mx-auto min-h-screen overflow-y-auto">
      <div className="max-w-10/12 border-1 h-full bg-blue-400 rounded-xl p-2 my-auto">
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

      <div className="bg-blue-400 w-full mt-4 md:mt-0 md:w-7/12 rounded-xl md:p-2  max-h-screen ">
        <AddEvents  selectDate={selectDate} />
      </div>

    </div>

  );
}