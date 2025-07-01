import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  resume: { type: String, required: true },
  status: { type: String, default: "Pending" },
  appliedAt: { type: Date, default: Date.now },
});

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
