import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hiring-portal-virid.vercel.app/user/register",
        formData
      );
      if (response && response.data.success) {
        const userId = response.data.newUser._id;
        navigate(`/UserInfoFormData/${userId}`);
        setFormData({
          userName: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
        notify();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      toast.error("Error during registration: " + error.message);
    }
  };

  const notify = () => toast.success("User registration successful 👍");

  return (
    <div>
      <section className="bg-red-50 shadow-2xl min-h-screen flex items-center justify-center">
        {/* Login Container */}
        <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5">
          {/* Form */}
          <div className="sm:w-1/2 px-8">
            <h2 className="font-bold text-2xl">Signup</h2>
            <p className="text-sm mt-4">
              Signup with us to get updated with new jobs.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="userName"
                value={formData.userName}
                placeholder="Username"
                onChange={handleChange}
                required
              />
              {errorMessage.userName && (
                <span className="text-red-600 z-10">
                  {errorMessage.userName}
                </span>
              )}

              <input
                className="p-2 rounded-xl border"
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              {errorMessage.email && (
                <span className="text-red-600">{errorMessage.email}</span>
              )}

              <input
                className="p-2 rounded-xl border"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="Phone Number"
                onChange={handleChange}
              />
              {errorMessage.phoneNumber && (
                <span className="text-red-600">{errorMessage.phoneNumber}</span>
              )}

              <input
                className="p-2 rounded-xl border"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errorMessage.password && (
                <span className="text-red-600">{errorMessage.password}</span>
              )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Signup
              </button>
            </form>

            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="flex justify-center">
              <h1>
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer">
                  <Link to="/login">Login</Link>
                </span>
              </h1>
            </div>
          </div>

          {/* Image */}
          <div className="w-1/2 sm:block hidden">
            <img
              className="rounded-xl"
              src="https://img.freepik.com/free-vector/creative-thinking-concept-illustration_114360-3507.jpg?w=740&t=st=1711075170~exp=1711075770~hmac=13d43fe102a958a64d18e413921b6f1942bfd035756372964b2a31a87a1f8465"
              alt="Signup Illustration"
            />
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
