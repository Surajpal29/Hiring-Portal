import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./DB/ConnectDb.DB.js";
import { UserRoute } from "./Routes/user.route.js";
import { ApiData } from "./Controlers/jobApi.controlers.js";
import { jobs } from "./Routes/savedByUser.route.js";
import { message } from "./Routes/Message.route.js";
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/user", UserRoute);
app.use("/api", ApiData);
app.use("/job", jobs);
app.use("/userchats", message);

connectDB().then(() => {
  app.listen(8000, () => console.log("listening on port"));
});
