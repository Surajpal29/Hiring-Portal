import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  HighestQualification: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
  },
  experience: {
    type: String,
    required: true,
  },
  DomainOfInterest: {
    type: Array,
  },
  jobType: {
    type: String,
  },
  Resume: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profilepic: {
    type: String,
    default: "/client/public/images",
  },
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);
export default UserInfo;
