import React from "react";
import Logo from "../assets/JobnestLogo.png";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="w-full h-20 bg-white flex items-center justify-between px-20 font-bold">
      {/* logo */}
      <div className="w-[10rem] h-[7rem] flex items-center justify-center ">
        <img src={Logo} alt="" />
      </div>
      {/* menu */}
      <div>
        <ol className="flex gap-10">
          <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? " border-b-[3px] border-b-blue-500" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/find-a-job"
              className={({ isActive }) =>
                `${isActive ? " border-b-[3px] border-b-blue-500" : ""}`
              }
            >
              Find a Job
            </NavLink>
          </li>
          {/* <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            Find Talent
          </li> */}
          {/* <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            Features
          </li> */}
          <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? " border-b-[3px] border-b-blue-500" : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li className="text-blue-500 cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${isActive ? " border-b-[3px] border-b-blue-500" : ""}`
              }
            >
              Login
            </NavLink>
          </li>
          <li className="w-fit h-fit px-2 py-1 bg-blue-200 text-blue-500 rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${isActive ? " border-b-[3px] border-b-blue-500" : ""}`
              }
            >
              Signup
            </NavLink>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default NavBar;
