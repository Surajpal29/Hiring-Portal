import dotenv from "dotenv";
import mongoose from "mongoose";
// require("dotenv").config();
dotenv.config();
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(
      `MongoDB Connected: mongodb://${conn.connection.host}:27017/testing`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;
