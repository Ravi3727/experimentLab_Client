import { createContext, useState } from 'react'
import './App.css'
import Dates from './component/Dates'
import ErrorBoundary from './component/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllEvents from './component/AllEvents';
import AllMeetings from './component/AllMeetings';
import SignUp from './component/Auth/SignUp';
import SignIn from './component/Auth/SignIn';
import Navbar from './component/Navbar';
export const AppContext = createContext();
function App() {
  const [user, setUser] = useState();



  return (
    <>

    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar/>
        <Routes>
          <Route  path="/" element={< Dates/>} />
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/signin" element={<SignIn />} />
          <Route  path="/events" element={<AllEvents />} />
          <Route  path="/meetings" element={<AllMeetings />} />
        </Routes>
    
      <div className=" border-1 w-full h-full border-black">
        <ErrorBoundary> 
        </ErrorBoundary>
      </div>
      </Router>
      </AppContext.Provider>
    </>
  )
}

export default App