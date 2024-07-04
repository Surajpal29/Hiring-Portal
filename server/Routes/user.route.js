import express from "express";
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../Models/user.model.js";
import UserInfo from "../Models/userInfo.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
UserRoute.post("/login", async (req, res) => {
  // If authentication succeeds, this function will be called
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const firstName = userName;
    const userinfodata = await UserInfo.findOne({ firstName });
    console.log(userinfodata);
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect  username or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect  username or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        userinfodata,
        user,
      });
  } catch (error) {
    console.log(error);
  }
});

// Logout route
UserRoute.get("/logout", (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
  });
});

UserRoute.post("/UserInfoFormData", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      DOB,
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

    // Create a new UserInfo document
    const userInfo = new UserInfo({
      firstName,
      lastName,
      email,
      phoneNumber,
      DOB,
      gender,
      city,
      country,
      HighestQualification,
      skills,
      experience,
      DomainOfInterest,
      jobType,
      Resume,
    });

    // Save the new document to the database
    const result = await userInfo.save();

    res
      .status(201)
      .json({ message: "User information saved successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { UserRoute };
