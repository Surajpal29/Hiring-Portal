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

const JobOppurtunity = () => {
  const id = useId();
  const userData = useSelector((state) => state.userData);
  console.log(userData);
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

  const cardData = [
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe ", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },

    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
    {
      id: id,
      companyLogo: "logo",
      companyName: "CompanyName",
      JobTitle: "Product Designer",
      skillsRequired: ["Adobe xd", "Figma", "Canva"],
      postedDate: "posted on 20/4/24",
      PaymentInRupees: 5000,
    },
  ];

  return (
    <div className="w-full px-4 py-2">
      <h3 className="font-bold text-xl mb-3 px-10">
        ~Latest Job Opportunities
      </h3>
      <hr className="text-gray-400 mx-10" />
      {/* card */}

      {/* <div className="w-full flex flex-wrap justify-center gap-4">
        {data.map((data) => (
          <div
            key={data.id}
            className="w-full max-w-[300px] border rounded-lg shadow-xl px-3 py-4 mt-4 hover:scale-105 transition ease-in-out duration-300"
          >
            <div className="flex justify-around items-center">
              <span className="w-12 h-12 bg-green-300 rounded-full"></span>
              <h5 className="font-semibold">{data.companyName}</h5>
            </div>
            <div className="mt-2">
              <h6 className="text-lg">{data.title}</h6>
            </div>
            <div className="mt-5">
              <ol className="flex gap-2 flex-wrap">
                {data.skillsRequired.map((skill, index) => (
                  <li key={index} className="bg-gray-300 py-1 px-2 rounded-2xl">
                    {skill}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center justify-between gap-3 mt-4">
              <hr className="w-8 h-[1px] text-gray-400" />
              <p>{data.postedDate}</p>
            </div>
            <div className="flex items-center justify-between mt-5">
              <h6>RS {data.PaymentInRupees}</h6>
              <button className="py-1 px-3 rounded-3xl bg-blue-400 flex items-center justify-center">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div> */}
      <div className={"w-full  pl-10 flex gap-4 flex-wrap "}>
        {data.slice(0, 8).map((data, index) => (
          <div
            key={index}
            className="w-[22.5vw]   bg-cyan-100 border-2 rounded-lg overflow-hidden pt-3 pl-3 shadow-lg"
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
                    {data.address.city.name},{data.address.city.json_data.state}
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
  );
};

export default JobOppurtunity;
