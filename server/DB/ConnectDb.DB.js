import dotenv from "dotenv";
import mongoose from "mongoose";
// require("dotenv").config();
// process.env.DB_URL
dotenv.config();
async function connectDB() {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/job");
    console.log(
      `MongoDB Connected: mongodb://${conn.connection.host}:27017/testing`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;
