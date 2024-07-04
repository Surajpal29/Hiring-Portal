import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    phoneNumber: "",
    gender: "",
    city: "",
    country: "",
    HighestQualification: "",
    skills: [],
    experience: "",
    DomainOfInterest: [],
    jobType: "",
    Resume: "",
  });
  const list = [
    "Personal Info",
    "Education & Qualification",
    "Skills & Experiences",
    "Last step",
  ];
  const educationList = [
    "10th or below 10th",
    "12th pass",
    "Deploma",
    "ITI",
    "Graduate",
    "Post Graduate",
  ];

  const [index, setIndex] = useState(0);
  function handleClickContinue() {
    if (index < 3) {
      setIndex(index + 1);
    }
  }
  function handleClickPrevious() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const [domainOfInterest, setDomainOfInterest] = useState([]);
  const [domainitem, setDomainitem] = useState("");

  const handleAppendData = () => {
    if (domainitem.trim() !== "") {
      setDomainOfInterest([...domainOfInterest, domainitem]);
      setFormData({
        ...formData,
        DomainOfInterest: [...formData.DomainOfInterest, domainitem], // Assuming formData has a property named 'skills' which is an array
      });
      // Clear the input field by setting domainitem to an empty string
      setDomainitem("");
      console.log("Domain of interest added:", domainOfInterest);
    } else {
      console.log("Please enter a valid domain of interest");
    }
  };

  const [skills, setSkills] = useState([]);
  const [skillsItem, setSkillItems] = useState();

  const handleappendskill = () => {
    if (skillsItem.trim() !== "") {
      setSkills([...skills, skillsItem]);
      setFormData({
        ...formData,
        skills: [...formData.skills, skillsItem], // Assuming formData has a property named 'skills' which is an array
      });
      // Clear the input field by setting domainitem to an empty string
      setSkillItems("");
      console.log("skills added:", skills);
    } else {
      console.log("Please enter a valid skill");
    }
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/user/UserInfoFormData",
        formData
      );

      console.log(response);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("catch", error);
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center pt-10 ">
        <h2 className="font-extrabold text-5xl">Jobnext</h2>
      </div>
      <div className="mt-10">
        <ul className="flex gap-10 justify-center">
          <li>
            <div
              className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer ${
                index == 0 ? ` scale-125 text-black` : ``
              }`}
              onClick={(e) => setIndex(0)}
            >
              <span>
                <InfoIcon />
              </span>
              <h6>{list[0]}</h6>
            </div>
          </li>
          <li>
            <div
              className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer ${
                index == 1 ? ` scale-125 text-black` : ``
              }`}
              onClick={(e) => setIndex(1)}
            >
              <span>
                <InfoIcon />
              </span>
              <h6>{list[1]}</h6>
            </div>
          </li>
          <li>
            <div
              className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer ${
                index == 2 ? ` scale-125 text-black` : ``
              }`}
              onClick={(e) => setIndex(2)}
            >
              <span>
                <InfoIcon />
              </span>
              <h6>{list[2]}</h6>
            </div>
          </li>
          <li>
            <div
              className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer${
                index == 3 ? ` scale-125 text-black` : ``
              }`}
              onClick={(e) => setIndex(3)}
            >
              <span>
                <InfoIcon />
              </span>
              <h6>{list[index]}</h6>
            </div>
          </li>
        </ul>
      </div>
      <hr className="w-full mt-5 h-1 bg-black" />
      <div className="flex items-center justify-center mt-10">
        <form action="">
          {index == 0 && (
            <div className="w-[50vw]  h-56 grid grid-cols-2 gap-4 content-around">
              <div>
                <label htmlFor="">First name {index}</label>
                <br />
                <input
                  type="text"
                  placeholder="enter first name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">last name</label>
                <br />
                <input
                  type="text"
                  placeholder="enter last name"
                  className="border"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="enter your Email id"
                  className="border"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">phone Number</label>
                <br />
                <input
                  type="text"
                  placeholder="enter phone number"
                  className="border"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Date of Birth</label>
                <br />
                <input
                  type="date"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, DOB: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 items-center justify-start">
                <label htmlFor="">Gender</label>
                <br />
                <input
                  type="radio"
                  id="Male"
                  value="Male"
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label htmlFor="">Male</label>
                <input
                  type="radio"
                  id="Female"
                  value="Female"
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label htmlFor="">Female</label>
                <input
                  type="radio"
                  id="Other"
                  value="other"
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label htmlFor="">Other</label>
              </div>
              <div>
                <label htmlFor="">City</label>
                <br />
                <input
                  type="text"
                  placeholder="enter City name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Country Name</label>
                <br />
                <input
                  type="text"
                  placeholder="enter country name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          {index == 1 && (
            <div>
              <h5 className="font-semibold text-4xl">Your Highest Education</h5>
              <div className="w-[40vw] flex gap-4 flex-wrap mt-10">
                {educationList.map(
                  (
                    education,
                    index // changed variable name
                  ) => (
                    <span
                      key={index}
                      onClick={(e) => {
                        e.currentTarget.className =
                          "bg-black text-white border w-fit rounded-lg py-1 px-3 flex  cursor-pointer";
                        setFormData({
                          ...formData,
                          HighestQualification: educationList[index],
                        });
                      }}
                      className="border w-fit rounded-lg border-green-400  py-1 px-3 flex  cursor-pointer"
                    >
                      {education} {/* changed from educationList[index] */}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
          {index == 2 && (
            <div>
              <div>
                <h5 className="font-semibold text-4xl">Skills</h5>
                <input
                  type="text"
                  placeholder="enter your skills"
                  className="border px-1 py-2 rounded-lg mr-2"
                  value={skillsItem} // Add value attribute to bind the input to the state
                  onChange={(e) => setSkillItems(e.target.value)} // Update the state with the input value
                />

                <AddIcon
                  className="bborder border-black bg-cyan-300 rounded-lg"
                  onClick={handleappendskill}
                />
                <div className="flex gap-3 mt-3">
                  {skills.length > 0 &&
                    skills.map((item, index) => (
                      <span
                        key={index}
                        className="border px-3 py-1  rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-4xl">
                  Do You Have Work Experience
                </h5>
                <div className="flex gap-4 mt-5">
                  <label
                    htmlFor=""
                    onClick={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value,
                      })
                    }
                  >
                    experience
                  </label>
                  <br />
                  <input
                    type="radio"
                    id="Yes"
                    value="Yes"
                    name="experience"
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                  <label htmlFor="">Yes</label>
                  <input
                    type="radio"
                    id="No"
                    value="No"
                    name="experience"
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                  <label htmlFor="">No</label>
                </div>
              </div>
            </div>
          )}
          {index === 3 && (
            <div>
              <div>
                <h5 className="font-semibold text-4xl">Domain Of Interest</h5>
                <input
                  type="text"
                  placeholder="enter your interest"
                  className="py-1 px-3 border mt-4 rounded-lg"
                  value={domainitem} // Bind input value to domainitem state
                  onChange={(e) => setDomainitem(e.target.value)} // Update domainitem state with input value
                />

                <span onClick={handleAppendData}>
                  <AddIcon />
                </span>
                <div className="flex gap-3 mt-3">
                  {domainOfInterest.length > 0 &&
                    domainOfInterest.map((item, index) => (
                      <span
                        key={index}
                        className="border px-3 py-1  rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex gap-4 items-center justify-start mt-5">
                <label htmlFor="" className="font-semibold ">
                  Job Type
                </label>
                <br />
                <input
                  type="radio"
                  id="Full time"
                  value="Full time"
                  name="jobtype"
                  onClick={(e) =>
                    setFormData({
                      ...formData,
                      jobType: e.target.value,
                    })
                  }
                />
                <label htmlFor="">Full time</label>
                <input
                  type="radio"
                  id="Part Time"
                  value="Part Time"
                  name="jobtype"
                  onClick={(e) =>
                    setFormData({
                      ...formData,
                      jobType: e.target.value,
                    })
                  }
                />
                <label htmlFor="">Part Time</label>
                <input
                  type="radio"
                  id="Internship"
                  value="Internship"
                  name="jobtype"
                  onClick={(e) =>
                    setFormData({
                      ...formData,
                      jobType: e.target.value,
                    })
                  }
                />
                <label htmlFor="">Internship</label>
              </div>
              <div>
                <h5 className=" text-2xl font-semibold mt-5 mb-3">
                  upload your Resume
                </h5>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0]; // Get the first file selected by the user
                    setFormData({ ...formData, Resume: file });
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </div>
      <div className=" mt-10 flex items-center relative justify-end gap-2 mx-28">
        {index != 0 && (
          <button
            className="border py-1 px-2 rounded-md  border-blue-500"
            onClick={handleClickPrevious}
          >
            <ArrowLeftIcon />
            previous
          </button>
        )}
        {index < 3 && (
          <button
            className="border py-1 px-2 rounded-md border-blue-500"
            onClick={handleClickContinue}
          >
            Next
            <ArrowRightIcon />
          </button>
        )}
        {index == 3 && (
          <button
            className="border py-1 px-2 rounded-md border-blue-500"
            onClick={handleClickSubmit}
          >
            submit
            <ArrowRightIcon onClick={handleClickSubmit} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;
