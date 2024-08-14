import React, { useEffect, useState } from "react";
import useId from "@mui/material/utils/useId";
import axios from "axios";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobOppurtunity = () => {
  const id = useId();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your backend endpoint
        setLoading(true);
        const response = await axios.get(
          "hiring-portal-virid.vercel.app/api/data"
        );
        console.log("Fetched data:", response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Data is not an array:", response.data);
          setError("Unexpected data format. Please try again later.");
        }

        // console.log("data from joboppurtunity", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJobLink = (link) => {
    // Open the link in a new tab when the button is clicked
    if (userData && userData[1]) window.open(link, "_blank");
    else {
      notify();
      navigate("/login");
    }
  };
  const notify = () => toast.info("please login!....");

  return (
    <div className="w-full px-4 py-2">
      <h3 className="font-bold text-xl mb-3 px-10">
        ~Latest Job Opportunities
      </h3>
      <hr className="text-gray-400 mx-10 mb-2" />
      {loading ? (
        <p className="pl-20">Loading...</p>
      ) : (
        <div className="w-full pl-10 flex flex-wrap gap-4">
          {data.slice(0, 8).map((job, index) => (
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
  );
};

export default JobOppurtunity;
