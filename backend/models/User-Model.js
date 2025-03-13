import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: ["employer", "job-seeker"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    profile: {
      location: { type: String },
      education: { type: String },
      experience: { type: String },
      resume: { type: String }, // store file path for upload resumes
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
