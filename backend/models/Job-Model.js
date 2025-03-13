import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    requirements: { type: String, required: true },
    salaryRange: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["Approved", "Rejected", "Pending"],
      default: "Pending",
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract"],
    },
    applicationDeadline: { type: Date, required: true },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
