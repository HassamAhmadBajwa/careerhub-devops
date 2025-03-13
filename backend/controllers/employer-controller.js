import { Job } from "../models/Job-Model.js";

//For job post

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
