import React from "react";

const TrustedCompaniesList = () => {
  return (
    <div className="w-full h-auto md:h-16   flex flex-wrap mt-[-3.5rem] mb-3 gap-3 md:gap-10 items-center justify-center font-bold text-gray-500 text-xl">
      <span className="w-1/2 hidden md:block md:w-auto text-center">
        Spotify
      </span>
      <span className="w-1/2 hidden md:block md:w-auto text-center">Adobe</span>
      <span className="w-1/2 hidden md:block md:w-auto text-center">IBM</span>
      <span className="w-1/2 hidden md:block md:w-auto text-center">
        Infosys
      </span>
      <span className="w-1/2 hidden md:block md:w-auto text-center">
        WebFlow
      </span>
      <span className="w-1/2 hidden md:block md:w-auto text-center">Zoom</span>
    </div>
  );
};

export default TrustedCompaniesList;
