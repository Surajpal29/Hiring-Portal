import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const FooterSection = () => {
  return (
    <div className="w-full h-30  flex flex-col items-center justify-center footer p-7 bg-black text-white">
      <div className="w-[80%] h-full flex items-center justify-between">
        <ol className="flex items-center gap-10 font-bold">
          <NavLink to="/blog">BLOG</NavLink>
          <li>EXPLORE</li>
          <li>KNOWMORE</li>
          <NavLink to="/about">ABOUT</NavLink>
        </ol>
        <div className="flex gap-5">
          <button className="flex items-center justify-center bg-blue-600 w-32 py-[.2rem] px-3 gap-2 rounded-lg">
            <FontAwesomeIcon icon={faGooglePlay} className="" />
            <div>
              <p className="text-[.8rem] ">GET IT ON</p>
              <h6 className="font-bold">GooglePlay</h6>
            </div>
          </button>
          <button className="flex items-center justify-center bg-blue-600 w-32 py-[.2rem] px-3 gap-2 rounded-lg">
            <FontAwesomeIcon icon={faApple} className="" />
            <div>
              <p className="text-[.8rem] ">GET IT ON</p>
              <h6 className="font-bold">AppStore</h6>
            </div>
          </button>
        </div>
      </div>
      <span className="w-[80%] h-[1px] bg-gray-500 my-7"></span>
      <div className=" w-[80%] flex items-center justify-between">
        <p>@copyright2024-JobNest</p>
        <div className="flex gap-6">
          <FacebookOutlinedIcon />
          <XIcon />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
