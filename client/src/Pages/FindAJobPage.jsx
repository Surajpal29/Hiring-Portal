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
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const FindAJobPage = () => {
  const userData = useSelector((state) => state.userData);
  // console.log(userData);
  const id = useId();
  const cardData = [
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
    {
      id: id,
      companyLogo: "logo",
      jobRole: "ui/UX designer",
      companyName: "stack company",
      jobType: "full time",
      jobPostedDate: "2-2-24",
      yearOfExperience: "2+ year",
      jobLocation: "noida",
      salary: "1000-10000",
      NumberOfApplicant: "23",
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your backend endpoint
        const response = await axios.get("http://localhost:8000/api/data");

        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleJobLink = (link) => {
    // Open the link in a new tab when the button is clicked
    window.open(link, "_blank");
  };
  return (
    <>
      {/* top div */}
      <div className="w-full h-full flex gap-5  px-10 pt-20 ">
        {/* top left */}
        <div className="w-[80vw] h-[22vh] border-2 rounded-lg py-[-50px] flex items-center  relative footer">
          <div className="w-[25%] h-[15rem]  ml-5 absolute top-[-84px]">
            <img src={girlImage} alt="" className="w-full h-full " />
          </div>
          <div className="absolute right-10">
            <h4 className="text-3xl font-extrabold">
              Find Your Dream Job Here....
            </h4>
            <div className="flex gap-5 mt-5">
              <input
                type="text"
                placeholder="Search job by name and location"
                className="text-xl px-4 py-1 rounded-xl w-[25vw] border border-black"
              />
              <input
                type="text"
                placeholder="location"
                className="text-xl px-4 py-1 rounded-xl border border-black"
              />
              <button className="text-xl px-4 py-1 rounded-xl font-bold bg-blue-500">
                search
              </button>
            </div>
          </div>
        </div>
        {/* top right profile wala */}
        <div className="w-[20vw] h-[22vh] bg-purple-500 rounded-lg relative flex items-center justify-center">
          <div className="w-[5vw] h-[5vw] rounded-full bg-cyan-300 absolute top-[-20%] left-[35%] border-4  border-white">
            <CheckCircleIcon className="text-blue-800 absolute right-0 " />
          </div>
          <div className="absolute bottom-3 flex flex-col items-center justify-center">
            <h4 className="font-bold text-lg">
              {userData[1].userinfodata.firstName}
              <span> </span>
              {userData[1].userinfodata.lastName}
            </h4>
            <h6 className="mb-2 flex gap-1">
              {userData[1].userinfodata.skills.map((item) => (
                <h6>{item}</h6>
              ))}
            </h6>
            <button className="w-fit h-fit px-3 py-1 border border-white rounded-xl">
              <Link to="/profile">view profile</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* bottom left div */}
        <div className="w-[94vw]  border my-5 pt-5  pl-10 ml-10 rounded-lg">
          <h4 className="font-bold text-2xl mb-3">Recommended Jobs</h4>
          {/* card */}
          <div className=" w-full flex gap-1 flex-wrap ">
            {data.slice(0, 15).map((data, index) => (
              <div
                key={index}
                className="w-[17.5vw]   bg-cyan-600 border-2 rounded-lg overflow-hidden pt-3 pl-3"
              >
                <div className="w-full h-[4vw]  flex items-center justify-between">
                  <div className="w-[4vw] h-[4vw] bg-purple-400 rounded-lg overflow-hidden">
                    {/* {data.organization.logo_url} */}
                    <img src={data.organization.logo_url} alt="" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">{data.title}</h5>
                    <h6 className="text-xs">{data.organization.name}</h6>
                  </div>
                  <div className="w-[3vw] h-[1.7vw] flex items-center justify-center rounded-s-lg bg-yellow-700">
                    <BookmarkBorderIcon />
                  </div>
                </div>
                <div className="w-full  my-3 pr-3 grid grid-cols-2 items-start">
                  <div className="w-[100%] gap-y-2  flex flex-col items-start">
                    <span className="flex gap-2 text-xs items-center justify-center">
                      <BusinessCenterOutlinedIcon /> <p>Full Time</p>
                    </span>

                    <span className="flex gap-2 text-xs items-center justify-center">
                      <WorkHistoryOutlinedIcon />{" "}
                      <p>
                        {data.min_experience}
                        <sup>+</sup>
                        year
                      </p>
                    </span>
                    <span className="flex gap-2 text-xs items-center justify-center">
                      <CurrencyRupeeOutlinedIcon /> <p>{data.salary_detail}</p>
                    </span>
                  </div>
                  <div className="w-[100%] flex gap-y-2 flex-col items-start ">
                    <span className="flex gap-2 text-xs items-center justify-center">
                      <CalendarMonthOutlinedIcon /> <p>{data.last_updated}</p>
                    </span>

                    <span className="flex gap-2 items-center justify-center text-xs">
                      <LocationOnOutlinedIcon />{" "}
                      <p>
                        {data.address.city.name},
                        {data.address.city.json_data.state}
                      </p>
                    </span>
                    <span className="flex gap-2 text-xs items-center justify-center">
                      <GroupIcon /> <p>{data.no_of_openings}</p>
                    </span>
                  </div>
                  <div className="w-[15vw] flex items-center justify-between mt-3">
                    <button
                      className="w-fit  py-1 px-2 rounded-2xl bg-red-500"
                      onClick={() => handleJobLink(data.public_url)}
                    >
                      Apply Now
                    </button>
                    <button className="w-fit h-fit py-1 px-2 rounded-2xl border border-red-500">
                      Apply Later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* bottom right div */}
        {/* <div className="w-[19vw] mr-10 mt-5 ml-5 rounded-lg p-5 h-full bg-cyan-100">
          checklist
        </div> */}
      </div>
    </>
  );
};

export default FindAJobPage;
