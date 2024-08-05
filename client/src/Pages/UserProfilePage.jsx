import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Defaultimage from "/images/images.png";

// importing icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import XIcon from "@mui/icons-material/X";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const UserProfilePage = () => {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  // Ensure userData[1] and userData[1].userinfodata are defined
  const userInfo = userData[1]?.userinfodata || {};
  const profilepicImage = userInfo.profilepic
    ? `${userInfo.profilepic}`
    : Defaultimage;

  const skillData = ["web Developer", "html", "CSS", "React", "Next.js"];
  const profileFeatureLinks = [
    "Skills",
    "Projects",
    "Experiences",
    "Resume",
    "Edit Information",
  ];
  const [profileFeatureLinksElement, setprofileFeatureLinksElement] = useState(
    profileFeatureLinks[0]
  );

  const handleClickOnMessage = () => {
    navigate("/chats");
  };

  return (
    <>
      <div className="flex justify-between items-center w-full  mb-6 lg:mt-10 lg:ml-10 lg:mb-0">
        <NavLink to="/">
          <KeyboardBackspaceIcon />
        </NavLink>
      </div>
      <div className="w-full flex items-center justify-center px-4 md:px-10 lg:px-20">
        <div className="w-full lg:w-3/4 py-10 flex flex-col lg:flex-row">
          {/* left profile image div */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="w-36 h-36 md:w-48 md:h-48 lg:w-60 lg:h-60 bg-yellow-300 border border-black rounded-full overflow-hidden flex items-center justify-center mb-4">
              <img
                src={profilepicImage}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-56 h-10 flex items-center justify-center bg-blue-400 rounded-full mb-6">
              Looking for work
            </div>
            <div className="flex items-center">
              <LocationOnOutlinedIcon />
              <span>
                {userInfo.city}, {userInfo.country}
              </span>
            </div>
          </div>
          {/* profile right top div */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-4">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center lg:text-left mb-2">
              {userInfo.firstName} <span>{userInfo.lastName}</span>
              {/* Check if userInfo exists before accessing userName */}
              <sup className="text-blue-500">
                <VerifiedOutlinedIcon />
              </sup>
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
              <span className="w-10 h-10 text-blue-600 rounded-full flex items-center justify-center border-2 border-gray-500 hover:border-gray-500 hover:z-10 hover:scale-105">
                <LinkedIn />
              </span>
              <span className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center border-2 border-gray-500 hover:border-gray-500 hover:z-10 hover:scale-105">
                <Instagram />
              </span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-500 hover:border-gray-500 hover:z-10 hover:scale-105">
                <XIcon />
              </span>
              <button
                onClick={handleClickOnMessage}
                className="w-fit h-fit px-3 py-1 border rounded-2xl flex items-center justify-center"
              >
                <MessageIcon /> Message
              </button>
              <button className="w-fit h-fit px-3 py-1 border rounded-2xl flex items-center justify-center">
                <ShareIcon /> Share
              </button>
            </div>
            <div className="flex gap-5 mb-4">
              <div>
                <h6 className="text-sm">Role</h6>
                <h5 className="text-lg font-semibold">
                  {userInfo.DomainOfInterest
                    ? userInfo.DomainOfInterest[0]
                    : "N/A"}
                </h5>
              </div>
              <div>
                <h6 className="text-sm">Experience</h6>
                <h5 className="text-lg font-semibold">
                  {userInfo.experience || "N/A"}
                </h5>
              </div>
            </div>
            <h5 className="mb-2">My Skills</h5>
            <div className="w-full flex flex-wrap gap-3 justify-center lg:justify-start">
              {userInfo.skills && userInfo.skills.length > 0 ? (
                userInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="w-fit h-fit px-3 py-1 cursor-pointer hover:shadow-sm hover:z-10 hover:scale-105 border rounded-2xl"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span>No skills available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
