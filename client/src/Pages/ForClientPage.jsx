import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import employeeImage from "../assets/employeeImage.png";

const ForClientPage = () => {
  return (
    <div className="w-full px-6 py-2 mt-5">
      <p className="sm:text-center lg:text-start px-10">For Client.</p>
      <h3 className="font-bold text-2xl sm:text-center lg:text-start my-5 px-10">
        ~Find the best Talent for your work
      </h3>
      <hr className="my-5 mx-10" />
      <div className="w-full flex flex-col md:flex-row gap-5 px-10">
        {/* left side div */}
        <div className="w-full md:w-[60%] flex flex-col">
          <div className="w-full border rounded-xl flex items-center gap-5 px-5 py-3 hover:scale-105 transition ease-in-out duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-full border flex items-center justify-center">
              <AddCircleOutlineIcon />
            </div>
            <div>
              <h5 className="text-xl font-bold">Create a Client Account</h5>
              <p className="text-gray-500">
                First you have to create account here...
              </p>
            </div>
          </div>
          <div className="w-full border rounded-xl flex items-center gap-5 px-5 py-3 mt-5 hover:scale-105 transition ease-in-out duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-full border flex items-center justify-center">
              <PostAddIcon />
            </div>
            <div>
              <h5 className="text-xl font-bold">Post a Job</h5>
              <p className="text-gray-500">To post a job click hire...</p>
            </div>
          </div>
          <div className="w-full border rounded-xl flex items-center gap-5 px-5 py-3 mt-5 hover:scale-105 transition ease-in-out duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-full border flex items-center justify-center">
              <TravelExploreIcon />
            </div>
            <div>
              <h5 className="text-xl font-bold">Hire a Talent for work</h5>
              <p className="text-gray-500">To hire click hire...</p>
            </div>
          </div>
        </div>
        {/* right side div */}
        <div className="w-full md:w-[50%] h-[20rem] flex items-center justify-center rounded-xl shadow-md">
          <img
            src={employeeImage}
            alt="employeeImage"
            className="sm:w-full lg:w-[70%] h-full"
          />
        </div>
      </div>

      {/* connect */}
      <div className="w-full mt-5 flex flex-col md:flex-row gap-5 justify-center">
        <div className="w-full md:w-[35%] border rounded-lg flex items-center justify-center px-5 py-3">
          <div className="flex flex-col items-center">
            <p className="text-gray-500">We Are Here For You</p>
            <h5 className="font-bold text-xl m-2">1800-570-2626</h5>
            <p className="text-gray-500">Monday-Saturday 11.00AM-06.00PM</p>
          </div>
          <div className="text-red-500 hover:scale-150 transition ease-in-out duration-300">
            <LocalPhoneIcon />
          </div>
        </div>
        <div className="w-full md:w-[35%] border rounded-lg flex items-center justify-center px-5 py-3">
          <div className="flex flex-col items-center">
            <p className="text-gray-500">We Are Here For You</p>
            <h5 className="font-bold text-xl m-2">1800-570-2626</h5>
            <p className="text-gray-500">Monday-Saturday 11.00AM-06.00PM</p>
          </div>
          <div className="text-green-500 hover:scale-150 transition ease-in-out duration-300">
            <WhatsAppIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForClientPage;
