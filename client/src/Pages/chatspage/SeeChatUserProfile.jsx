import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Close from "@mui/icons-material/Close";

const SeeChatUserProfile = ({ person, onData }) => {
  const [childData, setChildData] = useState(true);

  const sendDataToParent = () => {
    onData(childData);
  };
  const skills = person.skills;
  const ProfilePicImage = person.profilepic
    ? `/images/${person.profilepic}`
    : "/images/images.png";
  return (
    <div className="z-50  w-[60vw] h-[70vh]   bg-violet-100 absolute top-40 left-[25%] rounded-xl ">
      <div className="w-full p-1 flex items-center justify-end">
        <span
          onClick={sendDataToParent}
          className=" t-1 r-0 w-6 h-6 border flex items-center justify-center rounded-lg border-black hover:bg-red-600"
        >
          <Close />
        </span>
      </div>
      {/* left div */}
      <div className="flex items-center p-10">
        <div className="w-[50%] h-full flex flex-col items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full overflow-hidden mb-3">
            <img
              src={ProfilePicImage}
              alt="person profile pic"
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="font-bold text-2xl capitalize">
            {person.firstName + " " + person.lastName}
          </h3>
          <h4 className="flex items-end justify-center">
            <LocationOnOutlinedIcon />
            {person.city + ", " + person.country}
          </h4>
        </div>
        {/* right div */}
        <div>
          <span>
            <h5 className="font-semibold">phone no:</h5>
            <h6>{person.phoneNumber}</h6>
          </span>
          <span>
            <h5 className="font-semibold">email:</h5>
            <h6>{person.email}</h6>
          </span>
          <span>
            <h5 className="font-semibold">Skills:</h5>
            <ul className="flex gap-2">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeeChatUserProfile;
