import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: mongodb://${conn.connection.host}:27017/testing`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
