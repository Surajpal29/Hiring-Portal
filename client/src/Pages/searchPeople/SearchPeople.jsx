import axios from "axios";
import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import AddressIcon from "@mui/icons-material/Place";
const SearchPeople = () => {
  const [searchRoll, setSearchRoll] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [userlist, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewUser, setViewUser] = useState("");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/userchats/allusers"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user list", error);
      }
    };
    fetchUserList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchRoll") setSearchRoll(value);
    if (name === "experience") setExperience(value);
    if (name === "qualification") setQualification(value);
    if (name === "skills") setSkills(value);

    const filteredItems = userlist.filter((user) => {
      const matchesDomain =
        user.DomainOfInterest &&
        typeof user.DomainOfInterest === "string" &&
        user.DomainOfInterest.toLowerCase().includes(searchRoll.toLowerCase());

      const matchesExperience =
        experience &&
        user.experience &&
        typeof user.experience === "string" &&
        user.experience.toLowerCase().includes(experience.toLowerCase());

      const matchesQualification =
        qualification &&
        user.qualification &&
        typeof user.qualification === "string" &&
        user.qualification.toLowerCase().includes(qualification.toLowerCase());

      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());

      const matchesSkills =
        skills &&
        user.skills &&
        Array.isArray(user.skills) &&
        skillsArray.every((skill) =>
          user.skills.some((userSkill) =>
            userSkill.toLowerCase().includes(skill)
          )
        );

      return (
        matchesDomain &&
        matchesExperience &&
        matchesQualification &&
        matchesSkills
      );
    });

    setFilteredUsers(filteredItems);
  };

  const handleselectuser = (user) => {
    setViewUser(user);
  };
  console.log(viewUser);

  return (
    <div className="w-[100%] h-[85vh] px-20">
      {/* upper div */}
      <div className="flex w-[100%] h-[20%] gap-3 mb-3">
        <div className="w-[30%] rounded-lg border border-gray-200 flex items-center justify-center">
          <h3 className="text-[2vw] font-bold capitalize">
            search talented people
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="searchRoll"
            className="border border-black px-2 py-2 rounded-lg"
            placeholder="enter domain of interest"
            value={searchRoll}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="experience"
            className="border border-black px-2 py-2 rounded-lg"
            placeholder="experience"
            value={experience}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="qualification"
            className="border border-black px-2 py-2 rounded-lg"
            placeholder="Qualification"
            value={qualification}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="skills"
            className="border border-black px-2 py-2 rounded-lg"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* lower div */}
      <div className="flex gap-2 max-h-[76%] ">
        <div className="w-[30%]  border border-gray-400 overflow-y-auto no-scrollbar bg-blue-50 rounded-lg">
          {(filteredUsers.length ? filteredUsers : userlist).map((user) => (
            <>
              <button
                onClick={() => handleselectuser(user)}
                key={user.id}
                className="w-[100%] flex items-center justify-center"
              >
                <div className="flex w-[100%] px-5 py-3 gap-2 items-center justify-around">
                  <span className="w-14 h-14 border border-black capitalize font-bold overflow-hidden text-xl rounded-full flex items-center justify-center">
                    {user && user.profilepic ? (
                      <img
                        src={user.profilepic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <h5 className="text-3xl ">{user && user.firstName[0]}</h5>
                    )}
                  </span>
                  <span>
                    <h5 className="text-m font-semibold capitalize">
                      {user.firstName + " " + (user.lastName || "No username")}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {user.skills
                        ? user.skills.slice(0, 2).join(", ")
                        : "No skills"}
                    </p>
                  </span>
                  <span className="flex flex-col text-sm text-gray-600 items-center justify-center">
                    <h6>experience</h6>
                    <p>
                      {user.experience
                        ? user.experience === "No"
                          ? "No experience"
                          : `${user.experience}+`
                        : "No experience"}
                    </p>
                  </span>
                </div>
              </button>
              <hr className="bg-black h-[1.2px] w-full" />
            </>
          ))}
          <hr className="bg-black h-[1.2px] w-full" />
        </div>
        {/* lower right div */}
        <div className="w-[70%] border border-gray-200 rounded-lg bg-blue-50 p-5">
          <div className="flex gap-10">
            <div className="flex flex-col gap-3 items-center justify-center">
              <div className="w-[17vw] h-[17vw] flex items-center justify-center border overflow-hidden border-black rounded-full shadow-md  shadow-blue-700">
                {viewUser && viewUser.profilepic ? (
                  <img
                    src={viewUser.profilepic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <h5 className="text-3xl ">
                    {viewUser && viewUser.firstName[0]}
                  </h5>
                )}
              </div>
              <div className="">
                <h5
                  className={
                    "text-m font-semibold capitalize text-3xl " +
                    (viewUser === "" ? " blur-sm" : "")
                  }
                >
                  {viewUser.firstName +
                    " " +
                    (viewUser.lastName || "no username")}
                </h5>
                <h6 className="flex gap-3">
                  <EmailIcon />
                  {viewUser.email}
                </h6>
                <h6 className="flex gap-3">
                  <CallIcon />
                  {viewUser.phoneNumber}
                </h6>
                <h6 className="flex gap-3">
                  <AddressIcon />
                  {viewUser.city + "," + " " + viewUser.country}
                </h6>
              </div>
            </div>
            <div className="pt-[5%] flex flex-col gap-3 ">
              <h6 className="flex flex-col">
                <span className="font-semibold">Qualificatoin:</span>
                {viewUser.HighestQualification}
              </h6>
              <h6 className="flex flex-col ">
                <span className="font-semibold">Intrested in:</span>
                {viewUser.DomainOfInterest}
              </h6>
              <p className=" flex flex-col ">
                <span className="font-semibold">Skills:</span>
                {viewUser.skills ? viewUser.skills.join(", ") : "No skills"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
