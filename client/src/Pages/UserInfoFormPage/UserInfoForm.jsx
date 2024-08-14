import React, { useState } from "react";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserInfoForm = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
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
    profilepic: null,
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
    "Diploma",
    "ITI",
    "Graduate",
    "Post Graduate",
  ];

  const handleClickContinue = () => {
    if (index === 0 && (!formData.firstName || !formData.email)) {
      alert("Please fill in your first name and email.");
      return;
    }
    if (index < 3) {
      setIndex(index + 1);
    }
  };

  const handleClickPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const [domainItem, setDomainItem] = useState("");
  const [skillItem, setSkillItem] = useState("");

  const handleAppendData = () => {
    if (domainItem.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        DomainOfInterest: [...prev.DomainOfInterest, domainItem],
      }));
      setDomainItem("");
    }
  };

  const handleAppendSkill = () => {
    if (skillItem.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillItem],
      }));
      setSkillItem("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilepic: file }));
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, Resume: file }));
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const handleDeleteDomain = (domainToDelete) => {
    setFormData((prev) => ({
      ...prev,
      DomainOfInterest: prev.DomainOfInterest.filter(
        (domain) => domain !== domainToDelete
      ),
    }));
  };

  const handleClickSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("createdBy", userId);
      formDataToSend.append("profilepic", formData.profilepic);
      formDataToSend.append("Resume", formData.Resume);
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
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append(
        "DomainOfInterest",
        JSON.stringify(formData.DomainOfInterest)
      );
      formDataToSend.append("jobType", formData.jobType);

      const response = await axios.post(
        `http://localhost:8000/user/UserInfoFormData/${userId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate(`/${userId}`);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to submit form: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 lg:px-16">
      <div className="w-full flex items-center justify-center md:mb-10">
        <h2 className="font-extrabold text-5xl md:text-5xl">Jobnext</h2>
      </div>
      <div className="md:mt-10">
        <ul className="flex flex-wrap gap-4 justify-center">
          {list.map((item, idx) => (
            <li key={idx} className="hidden items-center md:block">
              <div
                className={`flex flex-col items-center justify-center text-gray-500 cursor-pointer ${
                  index === idx ? `scale-105 text-black` : ``
                }`}
                onClick={() => setIndex(idx)}
              >
                <span>
                  <InfoIcon />
                </span>
                <h6 className="text-sm md:text-base">{item}</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="w-full md:mt-5 h-1 bg-black hidden md:block" />
      <div className="flex flex-col items-center mt-10">
        <form onSubmit={handleClickSubmit} className="w-full max-w-4xl">
          {index === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="border rounded-md p-2 w-full"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Last name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="border rounded-md p-2 w-full"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email ID"
                  className="border rounded-md p-2 w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="border rounded-md p-2 w-full"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="border rounded-md p-2 w-full"
                  value={formData.DOB}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, DOB: e.target.value }))
                  }
                />
              </div>
              <div className="flex w-full gap-4 md:items-center">
                <label className="block mb-1">Gender</label>
                <div className="flex md:items-center gap-4">
                  <div className="w-fit">
                    <label>
                      <input
                        type="radio"
                        id="Male"
                        value="Male"
                        name="gender"
                        checked={formData.gender === "Male"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      Male
                    </label>
                  </div>
                  <div className="w-fit">
                    <label>
                      <input
                        type="radio"
                        id="Female"
                        value="Female"
                        name="gender"
                        checked={formData.gender === "Female"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      Female
                    </label>
                  </div>
                  <div className="w-fit">
                    <label>
                      <input
                        type="radio"
                        id="Other"
                        value="Other"
                        name="gender"
                        checked={formData.gender === "Other"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="border rounded-md p-2 w-full"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Country</label>
                <input
                  type="text"
                  placeholder="Enter country"
                  className="border rounded-md p-2 w-full"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Profile Picture</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
            </div>
          )}

          {index === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Highest Qualification</label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={formData.HighestQualification}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      HighestQualification: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Qualification</option>
                  {educationList.map((edu, idx) => (
                    <option key={idx} value={edu}>
                      {edu}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Skills</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter a skill"
                    className="border rounded-md p-2 w-full"
                    value={skillItem}
                    onChange={(e) => setSkillItem(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAppendSkill}
                  >
                    Add Skill
                  </button>
                </div>
                <div className="mt-2">
                  {formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 rounded-md px-2 py-1 m-1 inline-block"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1">Experience (in years)</label>
                <input
                  type="text"
                  placeholder="Enter your experience"
                  className="border rounded-md p-2 w-full"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Domain of Interest</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter a domain"
                    className="border rounded-md p-2 w-full"
                    value={domainItem}
                    onChange={(e) => setDomainItem(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAppendData}
                  >
                    Add Domain
                  </button>
                </div>
                <div className="mt-2">
                  {formData.DomainOfInterest.map((domain, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-700 rounded-md px-2 py-1 m-1 inline-block"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1">Job Type</label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={formData.jobType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      jobType: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Resume</label>
                <input
                  type="file"
                  onChange={handleResumeFileChange}
                  className="border rounded-md p-2 w-full"
                />
              </div>
            </div>
          )}

          {index === 3 && (
            <div className="text-center">
              <p className="mb-4 text-lg font-semibold">
                You're almost done! Click "Submit" to complete the process.
              </p>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Submit
              </button>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {index > 0 && (
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded-md"
                onClick={handleClickPrevious}
              >
                <ArrowLeftIcon /> Previous
              </button>
            )}
            {index < 3 && (
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleClickContinue}
              >
                Continue <ArrowRightIcon />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
