import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Defaultimage from "/images/images.png";

// importing icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import XIcon from "@mui/icons-material/X";
import Linkdin from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const UserProfilePage = () => {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const profilepicImage =
    userData && userData[1] && userData[1].userinfodata.profilepic
      ? `${userData[1].userinfodata.profilepic}`
      : Defaultimage;
  console.log(" this is from profile page ", userData);
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
      <div className="w-full   pl-20 flex items-center justify-center ">
        <div className="w-[94%] h-[100vh]  py-10 flex   ">
          <NavLink to="/">
            <KeyboardBackspaceIcon />
          </NavLink>
          {/* left porfile image div */}
          <div className="w-[45vw]   flex flex-col items-center justify-center ">
            <div className="w-[15rem] h-[15rem] bg-yellow-300 border border-black rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={profilepicImage}
                alt="this is user image"
                className="w-full h-full object-cover "
              />
            </div>
            <div className="w-56 h-10 flex items-center justify-center bg-blue-400 rounded-full my-[-2rem] mb-[2rem]">
              Looking for work
            </div>
            <div>
              <LocationOnOutlinedIcon />
              <span>
                {userData[1].userinfodata.city},{" "}
                {userData[1].userinfodata.country}
              </span>
            </div>
          </div>
          {/* /profile right top div */}
          <div className="w-[30%]  h-30 flex flex-col gap-y-3 items-start justify-center">
            <h1 className="font-bold text-4xl">
              {userData[1].userinfodata.firstName}
              <span> </span>
              {userData[1].userinfodata.lastName}
              {/* Check if userData exists before accessing userName */}
              <sup className="text-blue-500">
                <VerifiedOutlinedIcon />
              </sup>
            </h1>
            <div className="flex gap-3">
              <span className="w-10 text-blue-600 h-10 rounded-full flex items-center justify-center border-2 border-x-gray-500 hover:border-y-gray-500 hover:border-x-0 hover:z-10 hover:scale-105">
                <Linkdin />
              </span>
              <span className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center border-2 border-x-gray-500 hover:border-y-gray-500 hover:border-x-0 hover:z-10 hover:scale-105">
                <Instagram />
              </span>
              <span className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-x-gray-500 hover:border-y-gray-500 hover:border-x-0 hover:z-10 hover:scale-105">
                <XIcon />
              </span>
              <button
                onClick={handleClickOnMessage}
                className="w-fit h-fit px-3 py-1 border rounded-2xl"
              >
                <MessageIcon /> Message
              </button>
              <button className="w-fit h-fit px-3 py-1 border rounded-2xl">
                <ShareIcon /> Share
              </button>
            </div>
            <div className="flex gap-5">
              <div>
                <h6 className="text-sm">Role</h6>
                <h5 className="text-lg font-semibold">
                  {userData[1].userinfodata.DomainOfInterest[0]}
                </h5>
              </div>
              <div>
                <h6 className="text-sm">Experience</h6>
                <h5 className="text-lg font-semibold">
                  {userData[1].userinfodata.experience}
                </h5>
              </div>
            </div>
            <h5 className="">My Skills</h5>
            <div className="w-[60vw] flex gap-3">
              {userData[1].userinfodata.skills.map((skill, index) => (
                <span
                  key={index}
                  className="w-fit h-fit px-3 py-1 cursor-pointer hover:shadow-sm hover:z-10 hover:scale-105  border rounded-2xl"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* center div which shows the list of features which we have to show in the profile page */}
      {/* <div className=" w-full  bg-cyan-400 flex items-center justify-center text-xl py-5">
        <ul className="flex gap-4">
          {profileFeatureLinks.map((feature, index) => (
            <li
              key={index}
              onClick={() => setprofileFeatureLinksElement(feature)}
              className="cursor-pointer"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div> */}
      {/* <div className="w-full flex  bg-red-400 ">
        <div className="w-[30vw] p-[5vw] h-64 bg-green-900">
          <h3 className="text-3xl">{profileFeatureLinksElement}</h3>
        </div>
        <div className="bg-blue-400 w-[70vw] h-64 p-10">
          {profileFeatureLinksElement === "Skills" &&
            userData[1].userinfodata.skills.map((item, index) => (
              <span key={index} className="p-5 uppercase">
                {item}
              </span>
            ))}
        </div>
      </div> */}
    </>
  );
};

export default UserProfilePage;
