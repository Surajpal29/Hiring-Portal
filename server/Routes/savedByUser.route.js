import express from "express";
import { Router } from "express";
import SavedByUser from "../Models/savedByUser.models.js"; // Ensure correct model import
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Define your routes
const jobs = Router();

jobs.post("/savedjobs", async (req, res) => {
  try {
    const {
      title,
      logo_url,
      name,
      min_experience,
      salary_details,
      last_updated,
      city_name,
      state,
      no_of_openings,
      job_url,
    } = req.body;

    const dataToSave = new SavedByUser({
      savedJobs: [
        {
          title,
          logo_url,
          name,
          min_experience,
          salary_details,
          last_updated,
          city_name,
          state,
          no_of_openings,
          job_url,
        },
      ],
    });

    const result = await dataToSave.save();

    res
      .status(201)
      .json({ message: "User job saved successfully", data: result });
  } catch (error) {
    console.error("Error during saving the jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// jobs.get("/getsavejob", async (req, res) => {
//   try {
//     const result = await savedJobs.find();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// });

export { jobs };
