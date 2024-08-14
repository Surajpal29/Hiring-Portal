import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  employMentType: {
    type: String,
    required: true,
  },
  workingSchedule: {
    type: String,
  },
  salary: {
    amount: {
      type: String,
      required: true,
    },
    per: {
      type: String,
    },
  },
  experience: {
    type: String, // Changed from Number to String
  },
  skills: {
    type: [String],
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  NoOfOpenings: {
    type: Number,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfos",
  },
});

const JobPost = mongoose.model("JobPost", jobPostSchema);
export default JobPost;
