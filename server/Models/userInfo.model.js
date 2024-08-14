import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
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
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    length: 10,
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    // required: true,
    enum: ["Male", "Female", "Other"],
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  highestQualification: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
  },
  domainOfInterest: {
    type: [String],
    default: [],
  },
  jobType: {
    type: String,
  },
  resume: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  profilepic: {
    type: String,
    default: "/default/profilepic.jpg",
  },
});

userInfoSchema.index({ email: 1, phoneNumber: 1 });

const UserInfo = mongoose.model("UserInfos", userInfoSchema);
export default UserInfo;
