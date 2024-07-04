import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addDataToStore } from "../features/storeSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        formData
      );

      // console.log(response.data);

      const userData = response.data;
      console.log(userData);
      dispatch(addDataToStore(userData));

      setFormData({
        userName: "",
        password: "",
      });

      if (response.status === 200) {
        navigate("/");
        notify();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // User not found or incorrect credentials
        setErrorMessage(
          "Incorrect username or password. Please try again or register."
        );
        navigate("/register");
      } else {
        console.log("Error during login:", error);
      }
    }
  };

  const notify = () => toast("loged in successfully");
  return (
    <div>
      <section className="bg-red-50 shadow-2xl min-h-screen flex items-center justify-center">
        <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5">
          <div className="sm:w-1/2 px-8">
            <h2 className="font-bold text-2xl">Login</h2>
            <p className="text-sm mt-4">
              Log in with your data that you entered during your registration
            </p>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <form className="flex flex-col gap-4" method="post">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="userName"
                value={formData.userName}
                placeholder="UserName"
                onChange={handleChange}
              />
              <input
                className="p-2 rounded-xl border"
                type="Password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center">OR</p>
              <hr className="border-gray-500" />
            </div>
            <div className="flex justify-center  ">
              <h1>
                Don&apos;t Have a account?{" "}
                <span className="text-blue-600 cursor-pointer">
                  <Link to="/register">Register</Link>
                </span>
              </h1>
            </div>
          </div>
          <div className="w-1/2  sm:block hidden">
            <img
              className="rounded-xl"
              src="https://img.freepik.com/free-vector/creative-thinking-concept-illustration_114360-3507.jpg?w=740&t=st=1711075170~exp=1711075770~hmac=13d43fe102a958a64d18e413921b6f1942bfd035756372964b2a31a87a1f8465"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
