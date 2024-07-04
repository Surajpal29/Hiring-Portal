import axios from "axios";
import React, { useEffect } from "react";

const BlogPage = () => {
  useEffect(async () => {
    const apidata = await axios.get("https://jobicy.com/feed/newjobs");
    console.log(apidata);
  }, []);
  return (
    <div className="p-10">
      <h3 className="text-5xl font-bold">Blog Page</h3>
      <div className="my-10">
        {/* first blog block */}
        <div className="bg-cyan-400 h-[40vh] w-[90vw] p-5 flex">
          <div className="h-full w-[30vw] bg-green-400 ">image</div>
          <div className="p-10">
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
        {/* other blog block */}
        <div className="w-[90vw] h-96 bg-red-200 p-10">
          <div className="w-72 h-72 bg-yellow-50 overflow-hidden">
            <div className="w-full h-36 bg-blue-800">image</div>
            <h3 className="font-semibold text-2xl p-5">
              this is the blog heading
            </h3>
            <p className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              iste ullam accusantium, nihil repellat a sapiente modi cum dicta
              accusamus!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
