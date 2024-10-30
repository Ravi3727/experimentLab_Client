import React from 'react'
import UpcomingEvents from './UpcomingEvents'

function Todos({dated,title, desc, time,id, activetab,selectDate}) {
  return (
    <>
      <div className='mt-3 w-full h-full mx-auto flex'>
        <div>
          <UpcomingEvents dated={dated} title={title} desc={desc} time = {time} id={id} activetab={activetab} selectDate={selectDate} />
        </div>
      </div>
    </>
  )
}

export default Todos