import React, { useState } from "react";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { bool } from "prop-types";

const UserInfoForm = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(0);
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
    Resume: null,
    profilepic: null, // Initialize profilepic as null
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
        DomainOfInterest: [...formData.DomainOfInterest, domainitem],
      });
      setDomainitem("");
      console.log("Domain of interest added:", domainOfInterest);
    } else {
      console.log("Please enter a valid domain of interest");
    }
  };

  const [skills, setSkills] = useState([]);
  const [skillsItem, setSkillItems] = useState("");

  const handleAppendSkill = () => {
    if (skillsItem.trim() !== "") {
      setSkills([...skills, skillsItem]);
      setFormData({
        ...formData,
        skills: [...formData.skills, skillsItem],
      });
      setSkillItems("");
      console.log("Skills added:", skills);
    } else {
      console.log("Please enter a valid skill");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilepic: file });
  };
  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resumeFile: file });
  };
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("profilepic", formData.profilepic);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("DOB", formData.DOB);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("country", formData.country);
      formDataToSend.append(
        "HighestQualification",
        formData.HighestQualification
      );
      formDataToSend.append("skills", JSON.stringify(formData.skills)); // Send as JSON string
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append(
        "DomainOfInterest",
        JSON.stringify(formData.DomainOfInterest)
      ); // Send as JSON string
      formDataToSend.append("jobType", formData.jobType);
      formDataToSend.append("Resume", formData.Resume);

      const response = await axios.post(
        "https://hiring-portal-virid.vercel.app/user/UserInfoFormData",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.status === 200 && isSuccess) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center pt-10 ">
        <h2 className="font-extrabold text-5xl">Jobnext</h2>
      </div>
      <div className="mt-10">
        <ul className="flex gap-10 justify-center">
          {list.map((item, idx) => (
            <li key={idx}>
              <div
                className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer ${
                  index === idx ? ` scale-125 text-black` : ``
                }`}
                onClick={() => setIndex(idx)}
              >
                <span>
                  <InfoIcon />
                </span>
                <h6>{item}</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="w-full mt-5 h-1 bg-black" />
      <div className="flex items-center justify-center mt-10">
        <form onSubmit={handleClickSubmit}>
          {index === 0 && (
            <div className="w-[50vw]  h-56 grid grid-cols-2 gap-4 content-around">
              <div>
                <label>First name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Last name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Email</label>
                <br />
                <input
                  type="email"
                  placeholder="Enter your Email ID"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Phone Number</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Date of Birth</label>
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
                <label>Gender</label>
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
                <label>Male</label>
                <input
                  type="radio"
                  id="Female"
                  value="Female"
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label>Female</label>
                <input
                  type="radio"
                  id="Other"
                  value="Other"
                  name="gender"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label>Other</label>
              </div>
              <div>
                <label>City</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter City name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Country Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter country name"
                  className="border"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          {index === 1 && (
            <div>
              <h5 className="font-semibold text-4xl">Your Highest Education</h5>
              <div className="w-[40vw] flex gap-4 flex-wrap mt-10">
                {educationList.map((education, idx) => (
                  <span
                    key={idx}
                    onClick={(e) => {
                      e.currentTarget.className =
                        "bg-black text-white border w-fit rounded-lg py-1 px-3 flex  cursor-pointer";
                      setFormData({
                        ...formData,
                        HighestQualification: education,
                      });
                    }}
                    className="bg-gray-300 text-black border w-fit rounded-lg py-1 px-3 flex  cursor-pointer"
                  >
                    {education}
                  </span>
                ))}
              </div>
            </div>
          )}
          {index === 2 && (
            <div>
              <div>
                <div>
                  <h5 className="font-semibold text-2xl">Skills</h5>
                  <input
                    type="text"
                    placeholder="Add your skills"
                    value={skillsItem}
                    onChange={(e) => setSkillItems(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-black text-white border py-1 px-3"
                    onClick={handleAppendSkill}
                  >
                    <AddIcon />
                  </button>
                  <br />
                </div>
                <div className="w-[40vw] flex gap-4 flex-wrap mt-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-black text-white border w-fit rounded-lg py-1 px-3 flex  cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <br />
              <div>
                <h5 className="font-semibold text-2xl">Domain of interest</h5>
                <input
                  type="text"
                  placeholder="Add your domain of interest"
                  value={domainitem}
                  onChange={(e) => setDomainitem(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-black text-white border py-1 px-3"
                  onClick={handleAppendData}
                >
                  <AddIcon />
                </button>
                <br />
                <div className="w-[40vw] flex gap-4 flex-wrap mt-2">
                  {domainOfInterest.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-black text-white border w-fit rounded-lg py-1 px-3 flex  cursor-pointer"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <div>
                  <label>Years of Experience</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Add your experience"
                    className="border"
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Resume</label>
                  <br />
                  <input
                    type="file"
                    placeholder="Add your resume"
                    className="border"
                    accept=".pdf,.docx"
                    onChange={(e) =>
                      setFormData({ ...formData, Resume: e.target.files[0] })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {index === 3 && (
            <div>
              <h5 className="font-semibold text-2xl">
                Select your preferred job type
              </h5>
              <div className="flex gap-4 items-center justify-start mt-10">
                <input
                  type="radio"
                  id="Permanent"
                  value="Permanent"
                  name="jobType"
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                />
                <label>Permanent</label>
                <input
                  type="radio"
                  id="Temporary"
                  value="Temporary"
                  name="jobType"
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                />
                <label>Temporary</label>
                <input
                  type="radio"
                  id="Contract"
                  value="Contract"
                  name="jobType"
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                />
                <label>Contract</label>
              </div>
              <br />
              <div>
                <label>Profile Picture</label>
                <br />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border"
                />
              </div>
            </div>
          )}
          <br />
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleClickPrevious}
              className="bg-black text-white border py-1 px-3"
            >
              <ArrowLeftIcon />
            </button>
            {index !== 3 ? (
              <button
                type="button"
                onClick={handleClickContinue}
                className="bg-black text-white border py-1 px-3"
              >
                <ArrowRightIcon />
              </button>
            ) : (
              <button
                onClick={() => setIsSuccess(1)}
                type="submit"
                className="bg-black text-white border py-1 px-3"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
