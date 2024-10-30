import React, { useContext } from 'react'
import axios from "axios";
function Navbar() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? storedUser : null;
    const url = `http://localhost:3000/ravi/v1/users/logout`;
    const logoutUser = async () => {
        try {
            const Token1 = localStorage.getItem("accessToken");

            const response = await axios.post(url,{Token1},{withCredentials:true});
            console.log("Response: Profile vala : ", response);
            localStorage.removeItem("accessToken"); 
            localStorage.removeItem("refreshToken"); 
            if (response.status === 200) {
                navigate("/signin");
            }
        } catch (error) {
            console.error(`Error fetching current user  : ${error.message}`);
            console.error("Error fetching user details:", error);
        }
    }
    return (
        <nav className="flex bg-blue-400 justify-between items-center h-16  text-black relative shadow-sm font-mono" role="navigation">
            <a href="/" className="pl-8 text-2xl font-bold">Todo Calendar</a>
            <div className="pr-8 flex gap-2 justify-between items-center">
                {(user === undefined) && <button className='bg-purple-500 p-2 border-1 rounded-lg'>
                    <a href="/signin" className="p-4">Login</a>
                </button>}
                {(user !== undefined) && <button className='bg-purple-500 p-2 border-1 rounded-lg'>
                    <a onClick={logoutUser} className="p-4">Logout</a>
                </button>}
            </div>
        </nav>
    )
}
export default Navbar