import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const FooterSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center footer p-7 bg-black text-white">
      <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between">
        <ol className="flex flex-col md:flex-row items-center gap-5 md:gap-10 font-bold text-center md:text-left">
          <NavLink to="/blog">BLOG</NavLink>
          <li>EXPLORE</li>
          <li>KNOWMORE</li>
          <NavLink to="/about">ABOUT</NavLink>
        </ol>
        <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-0">
          <button className="flex items-center justify-center bg-blue-600 w-full md:w-32 py-[.2rem] px-3 gap-2 rounded-lg">
            <FontAwesomeIcon icon={faGooglePlay} className="" />
            <div>
              <p className="text-[.8rem] ">GET IT ON</p>
              <h6 className="font-bold">GooglePlay</h6>
            </div>
          </button>
          <button className="flex items-center justify-center bg-blue-600 w-full md:w-32 py-[.2rem] px-3 gap-2 rounded-lg">
            <FontAwesomeIcon icon={faApple} className="" />
            <div>
              <p className="text-[.8rem] ">GET IT ON</p>
              <h6 className="font-bold">AppStore</h6>
            </div>
          </button>
        </div>
      </div>
      <span className="w-full md:w-[80%] h-[1px] bg-gray-500 my-7"></span>
      <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p>&copy; 2024 JobNest</p>
        <div className="flex gap-6 mt-5 md:mt-0">
          <FacebookOutlinedIcon />
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
