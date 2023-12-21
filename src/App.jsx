import { useState } from 'react'
import './App.css'
import Dates from './component/Dates'
import ErrorBoundary from './component/ErrorBoundary';

function App() {
  const [click, setClick] = useState(false);
  const [value, setvalue] = useState(new Date());
  const clicked = (value) => {
    setClick(true);
    setvalue(value);
  }
  return (
    <>
    <div className="bg-gray-100 lg:w-4/12 border-1 lg:h-full w-full h-full border-black p-2 rounded-lg m-auto lg:mt-6 flex flex-col gap-2">
      <ErrorBoundary>
      <Dates/>
      </ErrorBoundary>
    </div>
    </>
  )
}

export default App