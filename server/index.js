import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./DB/ConnectDb.DB.js";
import { UserRoute } from "./Routes/user.route.js";
import { ApiData } from "./Controlers/jobApi.controlers.js";
import { jobs } from "./Routes/savedByUser.route.js";
import { message } from "./Routes/Message.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/user", UserRoute);
app.use("/api", ApiData);
app.use("/job", jobs);
app.use("/userchats", message);

app.use("/", (req, res) => {
  res.send("Welcome!");
});

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`)
  );
});

export default app;
