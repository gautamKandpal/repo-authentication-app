import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error from MongoDB: ${err.message}`);
    process.exit(1); // Indicates that the process ended due to an error.
  }
};
export default connectDB;
