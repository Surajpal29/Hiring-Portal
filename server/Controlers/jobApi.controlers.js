import express from "express";
import axios from "axios";

const ApiData = express();

ApiData.use(express.json());

// Endpoint to fetch data from an external API
ApiData.get("/data", async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get(
      "https://production.apna.co/user-profile-orchestrator/public/v1/jobs/?page_size=100&page=1&entity_type=JobTitle&entity_id=2788&text=React+Js+Developer&search=true&location_id=1&location_identifier=1&location_type=CustomLocation&location_name=All+Cities  "
    );
    const data = response.data;
    const apidata = data.results.jobs;
    // console.log(apidata);

    res.json(apidata);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { ApiData };
