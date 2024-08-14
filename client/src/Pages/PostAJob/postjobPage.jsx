import React, { useState } from "react";
import axios from "axios";

const PostJobPage = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true); // True for success, false for error

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
        "hiring-portal-virid.vercel.app/user/jobpost",
        jobData
      );
      if (response.status === 200) {
        setIsSuccess(true);
        setSuccessMessage("Job post successful!");
        console.log("Job post success");
        // Clear form fields
        setJobData({
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
        setSkills([]);
        setSuccessMessage("Job post successful!"); // Show success message
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setIsSuccess(false); // Set to false for error
      setSuccessMessage("Failed to post the job. Please try again.");
    }
  };

  return (
    <div className="px-4 sm:px-8 lg:px-32 flex mb-1">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col w-full lg:flex-row"
      >
        <div className="w-full lg:w-1/2 border border-black border-y-0 p-2">
          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Job Title</h4>
              <p className="text-gray-500">
                A job title must describe one position only
              </p>
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleChange}
                className="border border-black w-full mt-2"
                placeholder="e.g: web developer"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Job Description</h4>
              <p className="text-gray-500">
                Provide a short description about the job. Keep it short and to
                the point
              </p>
              <textarea
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                cols="40"
                rows="10"
                placeholder="Job description"
                className="border border-black w-full mt-2"
                spellCheck="true"
              ></textarea>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Employment Type</h4>
              <p className="text-gray-500">Select the employment type</p>
              <select
                name="employMentType"
                value={jobData.employMentType}
                onChange={handleChange}
                className="w-full border border-black mt-2"
              >
                <option value="full time">Full time</option>
                <option value="part time">Part time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Working Schedule</h4>
              <p className="text-gray-500">You can select work schedule</p>
              <select
                name="workingSchedule"
                value={jobData.workingSchedule}
                onChange={handleChange}
                className="w-full border border-black mt-2"
              >
                <option value="day shift">Day shift</option>
                <option value="night shift">Night shift</option>
                <option value="weekend available">Weekend availability</option>
              </select>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Salary</h4>
              <p className="text-gray-500">
                Select how much salary you want to pay
              </p>
              <div className="flex flex-col lg:flex-row lg:gap-2">
                <input
                  type="text"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  className="border border-black w-full lg:w-3/4 mt-2"
                  placeholder="e.g: 5000000"
                />
                <select
                  name="salaryType"
                  value={jobData.salaryType}
                  onChange={handleChange}
                  className="border border-black w-full lg:w-1/4 mt-2 lg:ml-2"
                >
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Experience</h4>
              <p className="text-gray-500">
                Enter how many years of experience you have
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="experience"
                  value={jobData.experience}
                  onChange={handleChange}
                  max={10}
                  min={0}
                  className="border border-black w-full"
                />
                <span>year</span>
              </div>
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />
        </div>

        <div className="w-full lg:w-1/2 border border-black border-y-0 p-2">
          <div className="flex flex-col mb-4">
            <h4 className="font-semibold">Skills</h4>
            <p className="text-gray-500">You can select multiple skills</p>
            <div className="flex flex-col lg:flex-row lg:gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Enter a skill"
                className="border border-black w-full lg:w-4/5 mt-2"
              />
              <button
                type="button"
                className="border border-black px-2 py-1 mt-2 lg:ml-2"
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((sk, index) => (
                <li className="border flex p-1 rounded-lg" key={index}>
                  {sk}
                </li>
              ))}
            </ul>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Company Name</h4>
              <p className="text-gray-500">Enter your company name</p>
              <input
                type="text"
                name="companyName"
                value={jobData.companyName}
                onChange={handleChange}
                placeholder="e.g: jobnest"
                className="border border-black w-full mt-2"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Company Logo</h4>
              <input
                type="file"
                name="companyLogo"
                onChange={(e) =>
                  setJobData({ ...jobData, companyLogo: e.target.files[0] })
                }
                className="border border-black w-full mt-2"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Location</h4>
              <p className="text-gray-500">Enter your company address</p>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="border w-full border-black mt-2"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Company Website Link</h4>
              <p className="text-gray-500">Enter your company website link</p>
              <input
                type="text"
                name="link"
                value={jobData.link}
                onChange={handleChange}
                placeholder="e.g: http://jobnest.com"
                className="border border-black w-full mt-2"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="flex flex-col lg:flex-row lg:gap-5 mb-4">
            <div className="w-full lg:w-1/2">
              <h4 className="font-semibold">Number of Openings</h4>
              <p className="text-gray-500">
                Enter how many people you want to hire
              </p>
              <input
                type="number"
                name="NoOfOpenings"
                value={jobData.NoOfOpenings}
                onChange={handleChange}
                placeholder="e.g: 10"
                className="border border-black w-full mt-2"
              />
            </div>
          </div>
          <hr className="h-1 bg-gray-500 rounded-full my-2" />

          <div className="w-full flex items-center justify-end">
            <button
              type="submit"
              className="border border-black rounded-lg px-2 py-1 font-bold text-2xl shadow-lg hover:text-white hover:bg-black mt-4"
            >
              Post
            </button>
          </div>
          {/* Success/Error Message */}
          {successMessage && (
            <div
              className={`mt-4 mx-auto p-4 max-w-md border-l-4 ${
                isSuccess
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
              } shadow-lg rounded-lg`}
            >
              <p
                className={`text-lg ${
                  isSuccess ? "text-green-800" : "text-red-800"
                } font-bold text-center`}
              >
                {successMessage}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;
