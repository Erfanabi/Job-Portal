import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "نام کامل یا نام شرکت الزامی است"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "company"],
      default: "user",
      required: true,
    },

    resume: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
