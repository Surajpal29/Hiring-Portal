import React, { useEffect, useState } from "react";
import Logo from "../assets/JobnestLogo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Defaultimage from "/images/images.png";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const userData = useSelector((state) => state.userData);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const profilepicImage =
    userData &&
    userData[1] &&
    userData[1].userinfodata &&
    userData[1].userinfodata.profilepic
      ? `${userData[1].userinfodata.profilepic}`
      : Defaultimage;

  useEffect(() => {
    setLoggedInUser(userData);
    console.log(loggedInUser);
  }, [userData]);

  const isUserLoggedIn =
    loggedInUser && loggedInUser[1]?.message === "Login successful";

  return (
    <div className="w-full sm:h-10 md:h-20 sm:overflow-hidden bg-cyan-10 flex items-center justify-between px-6 md:px-20 font-bold relative z-10">
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[10rem] h-[7rem] overflow-hidden bg-white flex items-center justify-center">
          <img
            src={Logo}
            alt="Jobnest Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="block md:hidden ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        className={`flex-col md:flex-row ${
          menuOpen ? "flex" : "hidden"
        } md:flex md:items-center absolute md:relative bg-white md:bg-transparent w-full md:w-auto top-20 md:top-0 left-0 md:left-auto z-20`}
      >
        <ol className="flex flex-col md:flex-row gap-10 md:gap-10 p-4 md:p-0 items-center">
          <li className="cursor-pointer hover:scale-105 transition ease-in-out duration-300 group">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-[3px] border-b-blue-500" : ""
                } flex items-center`
              }
              onClick={() => setMenuOpen(false)}
            >
              <HomeIcon className="mb-1 mr-2" />
              <span className="text-gray-600 text-sm font-thin">Home</span>
            </NavLink>
          </li>
          <li className="cursor-pointer group hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/find-a-job"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-[3px] border-b-blue-500" : ""
                } flex items-center`
              }
              onClick={() => setMenuOpen(false)}
            >
              <ContentPasteSearchIcon className="mb-1 mr-2" />
              <span className="text-gray-600 text-sm font-thin">Find Jobs</span>
            </NavLink>
          </li>
          <li className="cursor-pointer group hover:scale-105 transition ease-in-out duration-300">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "border-b-[3px] border-b-blue-500" : ""
                } flex items-center`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="p-1 rounded-s-full mb-2 rounded-t-full rounded-br-md border-2 text-sm border-black mr-2">
                A
              </span>
              <span className="text-gray-600 text-sm font-thin">About Us</span>
            </NavLink>
          </li>
          {isUserLoggedIn ? (
            <>
              <li className="group cursor-pointer flex items-center">
                <Link
                  to="/chats"
                  className="flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <ChatIcon className="mr-2" />
                  <span className="text-gray-600 text-sm font-thin">Chats</span>
                </Link>
              </li>
              <li className="w-9 h-9 cursor-pointer rounded-full border border-black overflow-hidden">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <img src={profilepicImage} alt="profile image" className="" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-blue-500 cursor-pointer hover:scale-105 transition ease-in-out duration-300">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${isActive ? "border-b-[3px] border-b-blue-500" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li className="w-fit h-fit px-2 py-1 bg-blue-200 text-blue-500 rounded-xl cursor-pointer hover:scale-105 transition ease-in-out duration-300">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${isActive ? "border-b-[3px] border-b-blue-500" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default NavBar;
