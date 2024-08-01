import express from "express";
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../Models/user.model.js";
import UserInfo from "../Models/userInfo.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import uploadmul from "../Utils/multerConfig.js";
import path from "path";
import fs from "fs";
import jobpost from "../Models/jobpost.model.js";

dotenv.config();

const app = express();
app.use(express.json());

// Define your routes
const UserRoute = Router();

// Register route
// Register route
UserRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // This line is causing the error

    // Create a new user
    const newUser = new User({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    console.log("user created", newUser);
    res.status(201).json(newUser).send("new user created");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
// UserRoute.post("/login", async (req, res) => {
//   // If authentication succeeds, this function will be called
//   try {
//     const { userName, password } = req.body;
//     if (!userName || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//         success: false,
//       });
//     }
//     const firstName = userName;
//     const userinfodata = await UserInfo.findOne({ firstName });
//     console.log(userinfodata);
//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect  username or password",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Incorrect  username or password",
//         success: false,
//       });
//     }
//     const tokenData = {
//       userId: user._id,
//     };
//     const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         userinfodata,
//         user,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });
UserRoute.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    const userinfodata = await UserInfo.findOne({ firstName: userName });

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
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
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});

// Logout route
UserRoute.get("/logout", (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
  });
});
UserRoute.post(
  "/UserInfoFormData",
  uploadmul.single("profilepic"),
  async (req, res) => {
    try {
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
        DomainOfInterest,
        jobType,
        Resume,
      } = req.body;

      let profilepic = null;

      // Handle profile picture upload if available
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const newFilename = `${req.file.filename}${ext}`;
        const oldPath = path.join(req.file.destination, req.file.filename);
        const newPath = path.join(req.file.destination, newFilename);

        fs.renameSync(oldPath, newPath); // Rename the file with correct extension

        profilepic = `/images/${newFilename}`;
      }

      // Parse JSON strings to arrays
      const parsedSkills = JSON.parse(skills);
      const parsedDomainOfInterest = JSON.parse(DomainOfInterest);

      const userInfo = new UserInfo({
        firstName,
        lastName,
        email,
        DOB,
        phoneNumber,
        gender,
        city,
        country,
        HighestQualification,
        skills: parsedSkills, // Use parsed array
        experience,
        DomainOfInterest: parsedDomainOfInterest, // Use parsed array
        jobType,
        Resume,
        profilepic,
      });

      await userInfo.save();

      res.status(200).json({ message: "User info saved successfully" });
    } catch (error) {
      console.error(error);

      if (!res.headersSent) {
        res.status(500).json({ message: "Error saving user info" });
      }
    }
  }
);
UserRoute.post("/jobpost", uploadmul.single("profilepic"), async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the incoming request body
    console.log("Request file:", req.file); // Log the uploaded file

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
    console.log("Request body:", req.body);
    const parsedSkills = Array.isArray(skills)
      ? skills
      : skills
      ? JSON.parse(skills)
      : [];

    let companyLogo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const newFilename = `${req.file.filename}${ext}`;
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
      salary,
      experience,
      skills: parsedSkills,
      companyName,
      link,
      location,
      NoOfOpenings,
      companyLogo,
      postedDate: new Date(),
    });

    await newJobPost.save();

    res.status(200).json({ message: "Job Post created successfully" });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error posting a job" });
    }
  }
});

export { UserRoute };
