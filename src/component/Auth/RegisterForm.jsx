import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spin from "../Spin";

function RegisterForm() {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const url = "https://experimentlab-server-5.onrender.com/ravi/v1/users/register";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {fullName: formData.fullName, password: formData.password, email: formData.email, username: formData.username});
      console.log("register" + response);
      console.log("register" + response.data.success);
      if (response.data.success === true) {
        nevigate("/signin");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  return (
    <>
      <div className="max-w-md w-full space-y-8 bg-blue-400 border-1 rounded-md p-2 backdrop-filter backdrop-blur-lg select-none">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            SignUp Todo Calendar
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2 p-2">
            {/* Form Inputs */}
            <div>
              <label htmlFor="fullname" className="sr-only">
                Fullname
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="FullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            {loading ? (
              <button className='bg-blue-500 w-20 text-white font-semibold p-1 rounded-lg mt-2 hover:bg-blue-600'>
              {loader ? <Spin /> : "please wait..."}
            </button>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-1 p-2"
              >
                SignUp
              </button>
            )}
          </div>
        </form>

        <div>
            <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a
                href="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                >
                Login
                </a>
            </p>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;