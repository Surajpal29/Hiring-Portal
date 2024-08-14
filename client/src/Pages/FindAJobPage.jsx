import React, { useEffect, useId, useState } from "react";
import girlImage from "../assets/bd25e653-af0f-47e0-816d-76dd60b60ea5-removebg-preview.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Defaultimage from "/images/images.png";

const FindAJobPage = () => {
  const userData = useSelector((state) => state.userData);
  const profilepicImage =
    userData && userData[1] && userData[1].userinfodata?.profilepic
      ? `${userData[1].userinfodata.profilepic}`
      : Defaultimage;

  const navigate = useNavigate();
  const id = useId();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const jobresponse = await axios.get(
        //   "http://localhost:8000/user/alljob"
        // );
        // console.log(jobresponse.data);

        const response = await axios.get("http://localhost:8000/api/data");
        console.log("Fetched data:", response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Data is not an array:", response.data);
          setError("Unexpected data format. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleJobLink = (link) => {
    if (userData && userData[1]) window.open(link, "_blank");
    else {
      notify();
      navigate("/login");
    }
  };

  const notify = () => toast.info("Please login to apply for the job!");

  return (
    <>
      {/* top div */}
      <div className="w-full h-full flex gap-5 px-10 pt-20">
        {/* top left */}
        <div className="w-[80vw] h-[22vh] border-2 rounded-lg py-[-50px] flex items-center relative footer">
          <div className="w-[25%] h-[15rem] ml-5 absolute top-[-84px]">
            <img
              src={girlImage}
              alt=""
              className="w-full h-full hidden md:block"
            />
          </div>
          <div className="absolute right-10">
            <h4 className="text-xl md:text-3xl font-extrabold">
              Find Your Dream Job Here....
            </h4>
            <div className="flex gap-5 mt-2 md:mt-5">
              <input
                type="text"
                placeholder="Search job by name and location"
                className="md:text-xl px-4 py-1 rounded-xl md:w-[25vw] border border-black"
              />
              <input
                type="text"
                placeholder="location"
                className="md:text-xl px-4 py-1 rounded-xl border border-black"
              />
              <button className="text-xl px-4 py-1 rounded-xl font-bold bg-blue-500">
                Search
              </button>
            </div>
          </div>
        </div>
        {/* top right profile */}
        {userData && userData[1] && userData[1].userinfodata && (
          <div className="w-[20vw] h-[22vh] bg-purple-500 rounded-lg relative hidden lg:block md:flex items-center justify-center">
            <div className="w-[5vw] h-[5vw] rounded-full bg-cyan-300 absolute top-[-20%] left-[35%] border-4 border-white">
              <CheckCircleIcon className="text-blue-800 absolute right-0" />
              <div className="w-full h-full overflow-hidden border border-black rounded-full">
                <img
                  src={profilepicImage}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-3  flex flex-col items-center justify-center">
              <h4 className="font-bold text-lg">
                {userData[1].userinfodata.firstName}
                {userData[1].userinfodata.lastName}
              </h4>
              <h6 className="mb-2 flex gap-1">
                {userData[1].userinfodata.skills?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </h6>
              <button className="w-fit h-fit px-3 py-1 border border-white rounded-xl">
                <Link to="/profile">View Profile</Link>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        {/* bottom left div */}
        <div className="w-[94vw] border-y my-5 pt-5 pb-5 pl-1 md:pl-10 md:ml-10 ml-1 rounded-lg">
          <h4 className="font-bold text-2xl mb-3">Recommended Jobs</h4>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="w-full flex gap-2 flex-wrap items-center justify-center">
              {data.slice(0, 16).map((job, index) => (
                // <Card prop={{ job, index }} />
                <div
                  key={index}
                  className="w-full md:w-[45%] lg:w-[22.5%]  border-2 rounded-lg overflow-hidden p-3 shadow-lg flex flex-col hover:scale-105 hover:transition-all"
                >
                  <div className="w-full flex items-center justify-between">
                    {job.organization.logo_url && (
                      <div className="w-16 h-16 md:w-12 md:h-12 lg:w-8 lg:h-8 bg-purple-400 rounded-lg overflow-hidden">
                        <img
                          src={job.organization.logo_url}
                          alt="Company Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-grow px-2">
                      <h5 className="text-sm font-bold">{job.title}</h5>
                      <h6 className="text-xs">{job.organization.name}</h6>
                    </div>
                    <div className="w-8 h-8  rounded-lg bg-yellow-700 lg:block hidden">
                      <BookmarkBorderIcon className="mx-1" />
                    </div>
                  </div>
                  <div className="w-full my-3 grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-y-2">
                      <span className="flex gap-2 text-xs items-center">
                        <BusinessCenterOutlinedIcon /> <p>Full Time</p>
                      </span>
                      <span className="flex gap-2 text-xs items-center">
                        <WorkHistoryOutlinedIcon />
                        <p>
                          {job.min_experience}
                          <sup>+</sup> year
                        </p>
                      </span>
                      <span className="flex gap-2 text-xs items-center">
                        <CurrencyRupeeOutlinedIcon /> <p>{job.salary_detail}</p>
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <span className="flex gap-2 text-xs items-center">
                        <CalendarMonthOutlinedIcon /> <p>{job.last_updated}</p>
                      </span>
                      <span className=" flex gap-2 text-xs items-center">
                        <LocationOnOutlinedIcon />{" "}
                        <p className="w-[100%] h-5 overflow-hidden">
                          {job.address.line_1}
                        </p>
                      </span>
                      <span className="flex gap-2 text-xs items-center">
                        <GroupIcon /> <p>{job.no_of_openings}</p>
                      </span>
                    </div>
                  </div>
                  <div className="w-full font-bold flex items-center justify-between mt-3">
                    <button
                      className="w-fit my-1 py-1 flex items-center justify-center px-2 rounded-2xl bg-red-500"
                      onClick={() => handleJobLink(job.public_url)}
                    >
                      Apply Now
                    </button>
                    <button className="w-fit h-fit py-1 flex items-center justify-center px-2 rounded-2xl border border-red-500">
                      Apply Later
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindAJobPage;
