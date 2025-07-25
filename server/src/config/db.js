import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/Job-Portal`);
    console.log("Database Connected");

    mongoose.connection.on("error", err => {
      console.error("MongoDB connection error:", err);
    });
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

export default connectDB;
