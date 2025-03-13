import { Job } from "../models/Job-Model.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      req.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
