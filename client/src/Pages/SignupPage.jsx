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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",

        formData
      ); // Adjust the endpoint according to your backend API
      console.log(response.data);
      if (response) navigate("/UserInfoFormData");
      setFormData({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      notify();

      // Redirect user to home page or perform any other action upon successful registration
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const notify = () => toast("User registration successful 👍");
  return (
    <div>
      <section className="bg-red-50 shadow-2xl min-h-screen flex items-center justify-center">
        {/*Login Container */}
        <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5">
          {/*Form */}
          <div className="sm:w-1/2 px-8">
            <h2 className="font-bold text-2xl">Signup</h2>
            <p className="text-sm mt-4">
              Signup with us toh get updated with new jobs.
            </p>

            <form className="flex flex-col gap-4" method="post">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="userName"
                value={formData.userName}
                placeholder="userName"
                onChange={handleChange}
                required
              />
              <input
                className="p-2  rounded-xl border"
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="p-2  rounded-xl border"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="phone number"
                onChange={handleChange}
              />
              <input
                className="p-2 rounded-xl border"
                type="Password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                onClick={handleSubmit}
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
            <div className="flex justify-center  ">
              <h1>
                Already Have a account?{" "}
                <span className="text-blue-600 cursor-pointer">
                  <Link to="/login"> Login</Link>
                </span>
              </h1>
            </div>
          </div>
          {/*Image */}
          <div className="w-1/2  sm:block hidden">
            <img
              className="rounded-xl"
              src="https://img.freepik.com/free-vector/creative-thinking-concept-illustration_114360-3507.jpg?w=740&t=st=1711075170~exp=1711075770~hmac=13d43fe102a958a64d18e413921b6f1942bfd035756372964b2a31a87a1f8465"
            />
          </div>
        </div>
      </section>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
