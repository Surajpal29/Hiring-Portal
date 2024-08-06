import express from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import UserInfo from "../Models/userInfo.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import uploadmul from "../Utils/multerConfig.js";
import path from "path";
import fs from "fs";
import jobpost from "../Models/jobpost.model.js";
import validate from "../helper/fieldsCheck.js";

dotenv.config();

const app = express();
app.use(express.json());

// Define your routes
const UserRoute = Router();

// Register route
UserRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    const required_fields = ["userName", "email", "phoneNumber", "password"];
    const validation = validate(required_fields, req.body);

    if (Object.keys(validation).length) {
      return res.json({
        success: 0,
        status_code: 500,
        message: validation,
        result: {},
      });
    }

    if (password && password.length < 6) {
      return res.json({
        success: 0,
        status_code: 500,
        message: "Password must be of 6 length",
        result: {},
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Check if the user was created
    if (newUser) {
      console.log("user created", newUser);
      return res.status(201).json({ newUser, success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create new user" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

UserRoute.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const required_fields = ["userName", "password"];
    const validation = validate(required_fields, req.body);
    // console.log(userName, password);

    if (Object.keys(validation).length) {
      return res.json({
        success: false,
        status_code: 500,
        message: validation,
        result: {},
      });
    }

    if (password && password.length < 6) {
      return res.json({
        success: 0,
        status_code: 500,
        message: "Password must be of 6 length",
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

      const required_fields = [
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "gender",
        "DOB",
        "city",
        "country",
        "highestQualification",
        "experience",
      ];
      const validation = validate(required_fields, req.body);

      if (Object.keys(validation).length) {
        return {
          success: 0,
          status_code: 500,
          message: validation,
          result: {},
        };
      }

      let profilepic = null;
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const newFilename = `${req.file.filename}${ext}`;
        const oldPath = path.join(req.file.destination, req.file.filename);
        const newPath = path.join(req.file.destination, newFilename);
        await fs.promises.rename(oldPath, newPath);
        profilepic = `/images/${newFilename}`;
      }

      const parsedSkills = JSON.parse(skills || "[]");
      const parsedDomainOfInterest = JSON.parse(DomainOfInterest || "[]");

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
        skills: parsedSkills,
        experience,
        DomainOfInterest: parsedDomainOfInterest,
        jobType,
        Resume,
        profilepic,
      });

      await userInfo.save();
      return res
        .status(200)
        .json({ success: true, message: "User info saved successfully" });
    } catch (error) {
      console.error("Error saving user info:", error);
      if (!res.headersSent) {
        return res
          .status(500)
          .json({ success: false, message: "Error saving user info" });
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
