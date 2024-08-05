import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const FooterSection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-7 bg-black text-white">
      {/* Navigation Links */}
      <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center justify-between mb-6">
        <ol className="flex flex-col md:flex-row items-center gap-5 md:gap-10 font-bold text-center md:text-left">
          <NavLink to="/blog" className="hover:underline">
            BLOG
          </NavLink>
          <li className="hover:underline cursor-pointer">EXPLORE</li>
          <li className="hover:underline cursor-pointer">KNOWMORE</li>
          <NavLink to="/about" className="hover:underline">
            ABOUT
          </NavLink>
        </ol>
        {/* App Download Buttons */}
        <div className="flex flex-col md:flex-row gap-5 mt-5 md:mt-0">
          <button className="flex items-center justify-center bg-blue-600 w-full md:w-40 py-2 px-3 gap-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FontAwesomeIcon icon={faGooglePlay} className="text-white" />
            <div>
              <p className="text-xs">GET IT ON</p>
              <h6 className="font-bold text-sm">GooglePlay</h6>
            </div>
          </button>
          <button className="flex items-center justify-center bg-blue-600 w-full md:w-40 py-2 px-3 gap-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FontAwesomeIcon icon={faApple} className="text-white" />
            <div>
              <p className="text-xs">GET IT ON</p>
              <h6 className="font-bold text-sm">AppStore</h6>
            </div>
          </button>
        </div>
      </div>
      {/* Divider Line */}
      <span className="w-full md:w-4/5 h-[.1vh] hidden md:block bg-gray-500 my-7"></span>
      {/* Footer Bottom Section */}
      <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm">&copy; 2024 JobNest</p>
        <div className=" flex gap-6 mt-5 md:mt-0">
          <FacebookOutlinedIcon className="text-white hover:text-gray-300 transition-colors cursor-pointer " />
          <XIcon className="text-white hover:text-gray-300 transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
