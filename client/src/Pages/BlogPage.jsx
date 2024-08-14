import axios from "axios";
import React, { useEffect } from "react";

const BlogPage = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(async () => {
    const apidata = await axios.get("https://jobicy.com/feed/newjobs");
    console.log(apidata);
  }, []);
  return (
    <div className="p-10 bg-gray-100">
      <div className="md:flex md:items-center md:justify-between mr-10">
        <h3 className="text-5xl font-bold">Blog Page</h3>
        <button className="w-fit h-fit p-2 border hover:bg-red-400 rounded-md">
          Add blogs
        </button>
      </div>
      <div className="my-10">
        {/* first blog block */}

        <div className="h-96 lg:h-[40vh] w-[90vw] p-5 flex border border-x-zinc-800 overflow-hidden mb-5">
          <div className=" h-[100%]  w-full md:w-[30vw] bg-green-400 ">
            image
          </div>
          <div className="p-5">
            <h3 className="text-3xl font-semibold ">
              this is the blog heading
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Necessitatibus animi possimus ipsa quo facere magnam doloribus
              sapiente magni! Voluptatibus aliquam magnam voluptate quibusdam
              itaque ullam quisquam repudiandae cumque quam? Incidunt?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
