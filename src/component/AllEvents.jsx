import React from 'react'
import Todos from './Todos'

function AllEvents({allEvents,activetab,selectDate}) {
  return (
    <>
        <div>
                <h1 className='text-3xl font-bold leading-10 text-black mt-8 md:mt-6 flex items-center justify-center'>All {activetab === 'allevents' ? 'Events' : 'Meetings'}</h1>
                <div>
                    {
                        (allEvents?.length > 0) ? (
                            <div className="w-full h-full">
                                <div className="flex gap-2 md:gap-3">
                                    {
                                        allEvents.map((TaskItem, index) => (
                                            <Todos title={TaskItem?.title} dated={TaskItem?.dated} desc={TaskItem?.description} time={TaskItem?.time} key={index} id={TaskItem?._id} activetab={activetab} selectDate={selectDate}/>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <h1 className='text-2xl font-semibold  h-[60vh] items-center justify-center flex '>No {activetab === 'allevents' ? 'Events' : 'Meetings'} Found...</h1>
                        )
                    }
                </div>
            </div>
    
    
    
    
    </>
  )
}

export default AllEvents