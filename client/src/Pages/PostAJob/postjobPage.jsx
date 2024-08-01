import React, { useEffect, useState } from "react";
import axios from "axios";

const PostJobPage = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    employMentType: "full time",
    workingSchedule: "day shift",
    salary: "",
    salaryType: "yearly",
    experience: 0,
    skills: [],
    companyName: "",
    companyLogo: "",
    location: "",
    link: "",
    NoOfOpenings: 0,
    postedDate: new Date(),
    createdBy: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setJobData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skill],
      }));
      setSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/user/jobpost",
        jobData
      );
      console.log(response.data);
      if (response.status === 200) console.log("Job post success");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="px-32 flex mb-1">
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        className="flex"
      >
        <div className="w-[50vw] border border-black border-y-0 p-2">
          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <span>
                <h4 className="font-semibold">Job Title</h4>
              </span>
              <span>
                <p className="text-gray-500">
                  A job title must describe one position only
                </p>
              </span>
            </div>
            <div className="w-[60%] ">
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleChange}
                className="border border-black w-[80%]"
                placeholder="e.g: web developer"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <h4 className="font-semibold">Job description</h4>
              <p className="w-[70%] text-gray-500">
                Provide a short description about the job. keep it short and to
                the point
              </p>
            </div>
            <div className="w-[60%]">
              <textarea
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                cols="40"
                rows="10"
                placeholder="job description"
                className="border border-black"
                spellCheck="true"
              ></textarea>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <h4 className="font-semibold">Employment Type</h4>
              <p className="text-gray-500">select the employment type</p>
            </div>
            <div className="w-[60%]">
              <select
                name="employMentType"
                value={jobData.employMentType}
                onChange={handleChange}
                className="w-[80%] border border-black"
              >
                <option value="full time">Full time</option>
                <option value="part time">Part time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <h4>Working schedule</h4>
              <p>You can select work schedule</p>
            </div>
            <div className="w-[60%]">
              <select
                name="workingSchedule"
                value={jobData.workingSchedule}
                onChange={handleChange}
                className="w-[80%] border border-black"
              >
                <option value="day shift">Day shift</option>
                <option value="night shift">Night shift</option>
                <option value="weekend available">Weekend availability</option>
              </select>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <h4>Salary</h4>
              <p>Select how much salary you want to pay </p>
            </div>
            <div className="w-[60%] flex gap-2">
              <input
                type="text"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                className="border border-black w-[55%]"
                placeholder="e.g: 5000000"
              />
              <select
                name="salaryType"
                value={jobData.salaryType}
                onChange={handleChange}
                className="border border-black"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[60%]">
              <h4>Experiences</h4>
              <p>Enter how many years of experience you have</p>
            </div>
            <div className="flex gap-2 w-[60%]">
              <input
                type="number"
                name="experience"
                value={jobData.experience}
                onChange={handleChange}
                max={10}
                min={0}
                className="border border-black w-[70%]"
              />
              year
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />
        </div>

        <div className="w-[50%] p-2 border border-black border-y-0">
          <div className="flex w-[100%] items-center flex-wrap justify-center gap-5">
            <div className="w-[100%] flex">
              <div className="w-[60%]">
                <h4>Skills</h4>
                <p>You can select multiple skills </p>
              </div>
              <div className="flex gap-2 w-[60%]">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Enter a skill"
                  className="border border-black w-[70%]"
                />
                <button
                  type="button"
                  className="border border-black px-2 py-1"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </div>
            </div>
            <ul className="flex gap-1 z-20">
              {skills.map((sk, index) => (
                <li className="border flex p-1 rounded-lg" key={index}>
                  {sk}
                </li>
              ))}
            </ul>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="flex w-[100%] items-center flex-wrap justify-center gap-5">
            <div className="w-[48%]">
              <h4>Company Name</h4>
              <p>Enter your company name</p>
            </div>
            <div className="w-[48%]">
              <input
                type="text"
                name="companyName"
                value={jobData.companyName}
                onChange={handleChange}
                placeholder="e.g: jobnest"
                className="border border-black w-[100%]"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="flex w-[100%] items-center flex-wrap justify-center gap-5">
            <div className="w-[48%]">
              <h4>Company logo</h4>
            </div>
            <div className="w-[48%]">
              <input
                type="file"
                name="companyLogo"
                onChange={(e) =>
                  setJobData({ ...jobData, companyLogo: e.target.files[0] })
                }
                className="border border-black w-[100%]"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="flex w-[100%] items-center justify-center gap-5">
            <div className="w-[50%]">
              <h4>Location</h4>
              <p>Enter your company address </p>
            </div>
            <div className="w-[50%]">
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="border w-[100%] border-black"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="flex w-[100%] items-center flex-wrap justify-center gap-5">
            <div className="w-[48%]">
              <h4>Company website Link</h4>
              <p>Enter your company website link</p>
            </div>
            <div className="w-[48%]">
              <input
                type="text"
                name="link"
                value={jobData.link}
                onChange={handleChange}
                placeholder="e.g: http://jobnest.com"
                className="border border-black w-[100%]"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="flex w-[100%] items-center flex-wrap justify-center gap-5">
            <div className="w-[48%]">
              <h4>Number of Openings</h4>
              <p>Enter how many people you want to hire</p>
            </div>
            <div className="w-[48%]">
              <input
                type="number"
                name="NoOfOpenings"
                value={jobData.NoOfOpenings}
                onChange={handleChange}
                placeholder="e.g:10"
                className="border border-black w-[100%]"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2 mt-5" />

          <div className="w-full flex items-center justify-end">
            <button
              type="submit"
              className="border border-black rounded-lg px-2 py-1 font-bold text-2xl shadow-lg hover:text-white hover:bg-black"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;
