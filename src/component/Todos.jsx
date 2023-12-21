import React from 'react'
import UpcomingEvents from './UpcomingEvents'

function Todos({dated,task}) {
  return (
    <>
      <div className='mt-3'>
        <div>
          <UpcomingEvents dated={dated} task={task}/>
        </div>
      </div>
    </>
  )
}

export default Todos