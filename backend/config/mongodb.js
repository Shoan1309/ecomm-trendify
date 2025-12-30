import mongoose from "mongoose";

const connectDB = async () => {
  // Use Mongoose's internal state check
  if (mongoose.connection.readyState >= 1) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // Disable buffering so it fails fast instead of hanging for 10s
    mongoose.set('bufferCommands', false);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "trendify",
      serverSelectionTimeoutMS: 5000, // Fail after 5s if DB is unreachable
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("CRITICAL: MongoDB connection failed:", error.message);
    // Throwing error ensures the API route returns a failure immediately
    throw new Error("Database connection failed");
  }
};

export default connectDB;