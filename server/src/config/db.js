import mongoose from "mongoose";

// برای جلوگیری از نمایش هشدارها در نسخه‌های آینده
mongoose.set("strictQuery", true);

const connectDB = async () => {
  // ۱. بررسی اینکه آیا از قبل متصل هستیم یا خیر
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/Job-Portal`);
    console.log("Database Connected Successfully");

    mongoose.connection.on("error", err => {
      console.error("MongoDB connection error:", err);
    });
  } catch (err) {
    console.error("Connection to database failed:", err);
    process.exit(1); // در صورت شکست اتصال، برنامه را متوقف کن
  }
};

export default connectDB;
