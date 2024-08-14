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
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          "https://hiring-portal-virid.vercel.app/userchats/allusers"
        );
        console.log(response);

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

  const handleSelectUser = (user) => {
    setViewUser(user);
  };

  return (
    <div className="w-full h-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32">
      {/* Upper Div */}
      <div className="flex flex-col md:flex-row w-full h-auto gap-4 mb-4">
        <div className="w-full md:w-1/3 border border-gray-200 flex items-center justify-center rounded-lg">
          <h3 className="text-lg md:text-2xl font-bold capitalize">
            Search Talented People
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full md:w-2/3">
          <input
            type="text"
            name="searchRoll"
            className="border border-black px-2 py-2 rounded-lg w-full"
            placeholder="Enter domain of interest"
            value={searchRoll}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="experience"
            className="border border-black px-2 py-2 rounded-lg w-full"
            placeholder="Experience"
            value={experience}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="qualification"
            className="border border-black px-2 py-2 rounded-lg w-full"
            placeholder="Qualification"
            value={qualification}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="skills"
            className="border border-black px-2 py-2 rounded-lg w-full"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Lower Div */}
      <div className="flex flex-col md:flex-row gap-4 h-auto">
        <div className="w-full md:w-1/3 border border-gray-400 overflow-y-auto bg-blue-50 rounded-lg">
          {(Array.isArray(filteredUsers) && filteredUsers.length
            ? filteredUsers
            : Array.isArray(userlist)
            ? userlist
            : []
          ).map((user) => (
            <React.Fragment key={user.id}>
              <button
                onClick={() => handleSelectUser(user)}
                className="w-full flex items-center justify-center px-4 py-2 border-b"
              >
                <div className="flex w-full gap-4 items-center">
                  <span className="w-12 h-12 border border-black rounded-full flex items-center justify-center">
                    {user && user.profilepic ? (
                      <img
                        src={user.profilepic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <h5 className="text-xl">{user && user.firstName[0]}</h5>
                    )}
                  </span>
                  <div className="flex flex-col">
                    <h5 className="text-lg font-semibold capitalize">
                      {user.firstName + " " + (user.lastName || "No username")}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {user.skills
                        ? user.skills.slice(0, 2).join(", ")
                        : "No skills"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Experience:{" "}
                      {user.experience
                        ? user.experience + "+"
                        : "No experience"}
                    </p>
                  </div>
                </div>
              </button>
              <hr className="bg-black h-[1.2px] w-full" />
            </React.Fragment>
          ))}
        </div>

        {/* Lower Right Div */}
        <div className="w-full md:w-2/3 border border-gray-200 rounded-lg bg-blue-50 p-4">
          <div className="flex flex-col gap-4">
            {viewUser && (
              <>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 border overflow-hidden border-black rounded-full shadow-md">
                    {viewUser.profilepic ? (
                      <img
                        src={viewUser.profilepic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <h5 className="text-3xl">{viewUser.firstName[0]}</h5>
                    )}
                  </div>
                </div>
                <h5 className="text-xl font-semibold capitalize">
                  {viewUser.firstName +
                    " " +
                    (viewUser.lastName || "No username")}
                </h5>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <EmailIcon />
                    <p>{viewUser.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CallIcon />
                    <p>{viewUser.phoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AddressIcon />
                    <p>{viewUser.city + ", " + viewUser.country}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <p>
                    <span className="font-semibold">Qualification:</span>{" "}
                    {viewUser.HighestQualification}
                  </p>
                  <p>
                    <span className="font-semibold">Interested in:</span>{" "}
                    {viewUser.DomainOfInterest}
                  </p>
                  <p>
                    <span className="font-semibold">Skills:</span>{" "}
                    {viewUser.skills ? viewUser.skills.join(", ") : "No skills"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
