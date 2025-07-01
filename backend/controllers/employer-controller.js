import { Job } from "../models/Job-Model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      requirements,
      salaryRange,
      jobType,
      applicationDeadline,
      category,
    } = req.body;
    if (
      !title ||
      !companyName ||
      !location ||
      !requirements ||
      !salaryRange ||
      !jobType ||
      !applicationDeadline ||
      !category
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // check only employer can post the job
    if (req.userRole !== "employer") {
      return res.status(401).json({
        message: "Access denied. Only employers can post jobs.",
        success: false,
      });
    }
    // create job
    const newJob = await Job.create({
      title,
      companyName,
      location,
      requirements,
      salaryRange,
      jobType,
      applicationDeadline,
      employer: req.userId,
      category,
    });
    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job: newJob,
    });
  } catch (error) {
    console.log("Error posting job: ", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
// For getting all jobs posted by the employer
// This function retrieves all jobs posted by the employer based on their user ID.
export const getEmployerJobs = async (req, res) => {
  try {
    if (req.userRole !== "employer") {
      return res.status(401).json({
        message: "Access denied. Only employers can view their jobs.",
        success: false,
      });
    }

    const jobs = await Job.find({ employer: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error fetching employer jobs: ", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// For updating a job posted by the employer
// Update Job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const updates = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Ensure only the job owner can update it
    if (job.employer.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    // Update fields
    Object.assign(job, updates);
    const updatedJob = await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// For deleting a job posted by the employer
// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Ensure only the job owner can delete it
    if (job.employer.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
