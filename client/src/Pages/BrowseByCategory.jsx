import React from "react";
import StarIcon from "@mui/icons-material/Star";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import useId from "@mui/material/utils/useId";

const BrowseByCategory = () => {
  const id = useId();
  const CategoryData = [
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
    {
      id: id,
      categoryName: "Development & IT",
      rating: 4.5,
      totalSkillCnt: 459,
      skillIcon: "skillIcon",
    },
  ];

  return (
    <div className="w-full px-4 py-2">
      <h3 className="font-bold text-xl mb-3 px-10">~Browse By Category</h3>
      <p className="text-purple-500 mb-5 px-10">
        Looking for a job? Browse Job
      </p>
      <hr className="text-gray-600 mt-2 mx-10 mb-5" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ps-10 mr-10">
        {CategoryData.map((category, index) => (
          <div
            key={index}
            className="w-full h-[6rem] flex items-center justify-between rounded-xl bg-white shadow-xl px-7 py-3 hover:scale-105 transition ease-in-out duration-300"
          >
            <div>
              <h5 className="font-bold text-xl">{category.categoryName}</h5>
              <div className="flex items-center justify-between mt-2">
                <span className="flex gap-2">
                  <StarIcon className="text-blue-500" />
                  <h6>{category.rating}/5</h6>
                </span>
                <h6>{category.totalSkillCnt} skills</h6>
              </div>
            </div>
            <div>
              <DeveloperModeIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
