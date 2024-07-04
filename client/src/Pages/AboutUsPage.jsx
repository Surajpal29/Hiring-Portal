import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import client1img from "../assets/happyclient1.avif";
import client2img from "../assets/happyclient2.jpeg";
import client3img from "../assets/happyclient3.jpg";
import bluebg from "../assets/bluebg.jpg";

const AboutUsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000");
        console.log(response.data.data);
        setJobs(response.data.data); // Assuming jobs are directly under 'jobs' key in the response
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full py-10">
      {/* <h3 className="text-4xl font-bold mt-5 pl-32">About JobNext </h3> */}
      <p className="to-gray-600 px-32 mt-5">{/* Your static content */}</p>
      <div className=" flex flex-col items-center justify-center content-center">
        <h6 className="text-2xl text-gray-600 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          WE <span className="text-red-700">❤️</span> WHAT WE DO.
        </h6>
        <h6 className="  text-4xl flex justify-center items-center font-bold pt-10">
          Our talented teams craft the best <br /> code and design amazing user{" "}
          <br />
          experiences or our clients.
        </h6>
      </div>
      <div className="bg-cyan-200 w-[95vw]  h-96 overflow-hidden rounded-tl-full rounded-bl-[70vw] mx-5 mt-10 border-b-black border-b-8">
        <img src={bluebg} alt="" className="w-full" />
      </div>
      <hr className="mt-1 h-2 bg-black w-[92.7vw] mx-14" />
      <div className="flex flex-col items-center justify-center mt-10">
        <h4 className="text-4xl font-bold">
          A nearshore experience like <br /> you'vd never had before.
        </h4>
        <p className="text-gray-600 mt-10 text-xl">
          We are professional transparent team with 2 years of experience
          building team and connections.
        </p>
        <p className="px-10 pt-10 text-gray-600">
          Welcome to Job Nest, where opportunities take flight! We are dedicated
          to revolutionizing the way job seekers connect with employers, making
          the process simple, efficient, and enjoyable. At Job Nest, we
          understand the challenges and frustrations that come with job hunting.
          That's why we've created a platform that streamlines the process,
          providing job seekers with access to a wide range of opportunities and
          empowering them to find their ideal career path. Our mission is to
          bridge the gap between talent and opportunity, helping individuals
          unlock their full potential while assisting companies in finding the
          perfect candidates to drive their success. With user-friendly
          features, personalized recommendations, and a commitment to
          excellence, Job Nest is your ultimate destination for all things
          career-related. Whether you're a seasoned professional or just
          starting your journey, we're here to support you every step of the
          way. Join Job Nest today and let's soar to new heights together!
        </p>
      </div>
      {/* Render your fetched jobs here */}
      {/* <div className="flex flex-col items-center gap-y-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="max-w-2xl p-6 bg-white shadow-lg rounded-lg"
          >
            <h4 className="text-xl font-bold">{job.slug}</h4>
            <p className="text-gray-600">Company: {job.company_name}</p>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">
              Employment Type: {job.employmentType}
            </p>
            <p className="text-gray-600">Date Posted: {job.datePosted}</p>
            <p className="text-gray-600">Salary Range: {job.salaryRange}</p>
            <p className="text-gray-600">Description: {job.description}</p>
            <a
              href={job.jobProviders[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AboutUsPage;
