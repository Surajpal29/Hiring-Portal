import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import profileImage from "../assets/76cd0b48-3b65-4579-8431-a24f854308f6_J25EM7 1.png";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="relative h-[80vh] w-full bgc flex flex-col md:flex-row justify-center items-center">
        {/* Left side view */}
        <div className="w-full md:w-[55%] h-full p-4 md:p-0 flex flex-col items-center justify-center">
          <h2 className="text-violet-500 md:text-4xl  font-bold text-center">
            Freelance Job And Talents <br /> at Your Fingertips
          </h2>
          <p className="mt-10 text-gray-600 text-center sm:text-sm md:text-lg">
            Connect with top freelancers and clients on our platform!
            <br />
            Find your perfect match for your next project.
          </p>

          <div className="w-full md:w-[50%] h-12 hidden mt-10">
            <input
              type="text"
              className="h-full w-[85%] px-2"
              placeholder="Search..."
            />
            <button className="w-[15%] h-full bg-cyan-500 flex items-center justify-center">
              <SearchIcon />
            </button>
          </div>
        </div>
        {/* Right side view */}
        <div className="w-full md:w-[45%] sm:w-[50%] h-full flex items-end justify-center">
          <img
            src={profileImage}
            className="md:w-[302px] md:h-[502px]  object-contain"
            alt="Profile"
          />
        </div>
      </div>
      <h6 className="mt-5 font-semibold text-gray-500">
        Trusted by 4,000+ companies
      </h6>
    </div>
  );
};

export default HomePage;
