import React, { useState } from 'react';

function UpcomingEvents({ dated, task }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='w-[100px] rounded-lg overflow-x-hidden border-1 p-2 shadow-lg bg-purple-400 flex flex-col justify-center items-center content-center'>
      <h1 className='text-xl  text-white font-semibold sm:font-bold mt-4'>{dated}</h1>
      <p className={`text-sm font-thin text-white max-h-[80px] mt-1 w-[90%] p-1 overflow-y-auto overflow-x-hidden ${isExpanded ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden'}`}>
        {task}
      </p>
      {task.length > 50 && (
        <button
          className='text-white text-[10px] hover:text-gray-300 focus:outline-none mt-1'
          onClick={toggleExpand}
        >
          {isExpanded ? 'Read Less' : 'Read More...'}
        </button>
      )}
    </div>
  );
}

export default UpcomingEvents;
