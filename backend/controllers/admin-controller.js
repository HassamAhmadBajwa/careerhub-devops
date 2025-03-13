import { User } from "../models/User-Model.js";
import { Admin } from "../models/Admin-Model.js";
import { Job } from "../models/Job-Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
// update user
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    await User.findByIdAndUpdate(id, { isActive });
    res.status(200).json({
      message: "User status updated",
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "user deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting user: ", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
// All Jobs
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
      message: "Server Error",
    });
  }
};

// Approve or reject a job

export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    job.status = status;
    await job.save();
    res.status(200).json({
      message: `Job ${status} Successfully`,
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// delete Job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    await Job.findByIdAndDelete(id);

    res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
