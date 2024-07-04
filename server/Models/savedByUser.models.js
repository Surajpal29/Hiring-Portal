import mongoose from "mongoose";

const savedByUser = new mongoose.Schema(
  {
    savedJos: [
      {
        title: String,
        logo_url: String,
        name: String,
        min_experience: String,
        salary_details: String,
        last_updated: String,
        city_name: String,
        state: String,
        no_of_openings: String,
        job_url: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserInfo",
        },
      },
    ],
  },
  { timestamps: true }
);

const jobs = mongoose.model("savedJob", savedByUser);
export default jobs;
