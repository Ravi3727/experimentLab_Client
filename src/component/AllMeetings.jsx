import React from 'react'

function AllMeetings({ allevents }) {
    return (
        <>
            <div>
                <h1 className='text-3xl font-bold leading-10 text-black mt-6 flex items-center justify-center'>All Meetings</h1>
                <div>
                    {
                        (allevents.length > 0) ? (
                            <div className="h-96 w-96 sm:px-5">
                                <div className="flex flex-wrap gap-3">
                                    {
                                        allEvents.map((TaskItem, index) => (
                                            <Todos title={TaskItem.title} dated={TaskItem.dated} desc={TaskItem.description} time={TaskItem.time} key={index} />
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <h1 className='text-2xl font-semibold text-center h-full justify-center'>No Meetings Found</h1>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default AllMeetings