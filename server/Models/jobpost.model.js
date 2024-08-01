import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    // required: true,
  },
  jobDescription: {
    type: String,
    // required: true,
  },
  employMentType: {
    type: String,
    // required: true,
  },
  workingSchedule: {
    type: String,
  },
  salary: {
    amount: {
      type: String,
    },
    per: {
      type: String,
    },
  },
  experience: {
    type: Number,
  },
  skills: {
    type: [String],
  },
  companyName: {
    type: String,
    // required: true,
  },
  companyLogo: {
    type: String,
  },
  location: {
    type: String,
  },
  link: {
    type: String,
  },
  NoOfOpenings: {
    type: Number,
  },
  postedDate: {
    type: Date, // Example field for date type
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInfo",
  },
});
const jobpost = mongoose.model("JobPost", jobPostSchema);
export default jobpost;
