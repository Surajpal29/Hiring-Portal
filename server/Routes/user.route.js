/* The above code is a Node.js application using Express framework to create API routes for user
registration, login, logout, user information form data submission, and job post creation. Here is a
summary of what each route does: */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import User from "../Models/user.model.js";
import UserInfo from "../Models/userInfo.model.js";
import jobpost from "../Models/jobpost.model.js";
import validate from "../helper/fieldsCheck.js";
import { error } from "console";

dotenv.config();

const UserRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../client/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadmul = multer({ storage: storage });

// Register route
UserRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    const required_fields = ["userName", "email", "phoneNumber", "password"];
    const validation = validate(required_fields, req.body);

    if (Object.keys(validation).length) {
      return res.status(400).json({
        success: false,
        message: validation,
        result: {},
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
        result: {},
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    if (newUser) {
      console.log("User created:", newUser);
      return res.status(201).json({ success: true, newUser });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create new user" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

// Login route
UserRoute.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const required_fields = ["userName", "password"];
    const validation = validate(required_fields, req.body);

    if (Object.keys(validation).length) {
      return res.status(400).json({
        success: false,
        message: validation,
        result: {},
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
        result: {},
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        result: {},
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect credentials",
        success: false,
      });
    }

    const userinfodata = await UserInfo.findOne({ userId: user._id });

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        success: true,
        userinfodata,
        user,
        token,
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});

// Logout route
UserRoute.get("/logout", (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logged out successfully." });
});

// User info form data route
UserRoute.post(
  "/UserInfoFormData/:userId",
  uploadmul.fields([
    { name: "profilepic", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Files received:", req.files);

      const {
        firstName,
        lastName,
        email,
        DOB,
        phoneNumber,
        gender,
        city,
        country,
        HighestQualification,
        skills,
        experience,
        domainOfInterest,
        jobType,
      } = req.body;

      let parsedSkills = [];
      let parsedDomainOfInterest = [];

      // Parse skills
      try {
        parsedSkills = Array.isArray(skills)
          ? skills
          : JSON.parse(skills || "[]");
      } catch (error) {
        console.error("Error parsing skills:", error);
        return res
          .status(400)
          .json({ success: false, message: "Invalid format for skills" });
      }

      // Parse domainOfInterest
      try {
        parsedDomainOfInterest = Array.isArray(domainOfInterest)
          ? domainOfInterest
          : JSON.parse(domainOfInterest || "[]");
      } catch (error) {
        console.error("Error parsing DomainOfInterest:", error);
        return res.status(400).json({
          success: false,
          message: "Invalid format for DomainOfInterest",
        });
      }

      // File paths
      const profilepic =
        req.files && req.files["profilepic"]
          ? req.files["profilepic"][0].path
          : null;

      const Resume =
        req.files && req.files["Resume"] ? req.files["Resume"][0].path : null;

      console.log("Profilepic path:", profilepic);
      console.log("Resume path:", Resume);

      const user = await User.findOne({ userName: req.body.userName });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      // Create user info
      const userInfo = await UserInfo.create({
        createdBy: user._id,
        firstName,
        lastName,
        email,
        DOB,
        phoneNumber,
        gender,
        city,
        country,
        HighestQualification,
        skills: parsedSkills,
        experience,
        domainOfInterest: parsedDomainOfInterest,
        jobType,
        Resume,
        profilepic,
      });

      res.status(200).json({
        success: true,
        message: "User information saved successfully",
        data: userInfo,
      });
    } catch (error) {
      console.error("Error saving user info:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save user information",
        error: error.message,
      });
    }
  }
);

// Job post route
UserRoute.post("/jobpost", uploadmul.single("profilepic"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const {
      jobTitle,
      jobDescription,
      employMentType,
      workingSchedule,
      salary,
      experience,
      skills,
      companyName,
      location,
      link,
      NoOfOpenings,
    } = req.body;

    // Validate required fields
    if (
      !jobTitle ||
      !jobDescription ||
      !employMentType ||
      !companyName ||
      !location ||
      !link
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Convert experience to a number by extracting digits
    const parsedExperience = experience ? parseInt(experience) : null;

    const parsedSkills = Array.isArray(skills)
      ? skills
      : skills
      ? JSON.parse(skills)
      : [];

    let companyLogo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFilename = req.file.filename + ext;
      const oldPath = path.join(req.file.destination, req.file.filename);
      const newPath = path.join(req.file.destination, newFilename);

      fs.renameSync(oldPath, newPath);

      companyLogo = `/images/${newFilename}`;
    }

    const newJobPost = new jobpost({
      jobTitle,
      jobDescription,
      employMentType,
      workingSchedule,
      salary: salary ? parseInt(salary) : null,
      experience: parsedExperience,
      skills: parsedSkills,
      companyName,
      link,
      location,
      NoOfOpenings: NoOfOpenings ? parseInt(NoOfOpenings) : null,
      companyLogo,
      postedDate: new Date(),
    });

    await newJobPost.save();

    return res
      .status(200)
      .json({ success: true, message: "Job post created successfully" });
  } catch (error) {
    console.error("Error posting job:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error posting job" });
    }
  }
});

// UserRoute.get("/jo", async (req, res) => {
//   console.log("Hello");

//   try {
//     const result = await jobpost.find();
//     console.log(result);

//     if (result) {
//       return res.status(200).json({
//         success: true,
//         data: result,
//         message: "All job data fetched successfully",
//       });
//     }

//     throw new Error("Unable to find jobpost");
//   } catch (error) {
//     console.error("Error fetching jobs:", error); // Improved error logging
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// });

export default UserRoute;
