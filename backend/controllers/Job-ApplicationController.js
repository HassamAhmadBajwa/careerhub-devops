import { JobApplication } from "../models/Job-ApplicationModel.js";
import path from "path";
import fs from "fs";

export const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const file = req.file;

    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or jobId" });
    }
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume file is required" });
    }

    const alreadyApplied = await JobApplication.findOne({ userId, jobId });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied to this job" });
    }

    const newApp = new JobApplication({
      userId,
      jobId,
      resume: file.filename,
    });

    await newApp.save();

    res.status(201).json({ success: true, message: "Applied successfully" });
  } catch (err) {
    console.error("Apply Job Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const apps = await JobApplication.find({ userId })
      .populate("jobId", "companyName title location")
      .sort({ createdAt: -1 });
    res.status(200).json(apps);
  } catch (err) {
    console.error("Fetch Apps Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getApplicationByUserAndJob = async (req, res) => {
  try {
    const { userId, jobId } = req.params;
    await JobApplication.deleteMany({ jobId: null });
    const application = await JobApplication.findOne({ userId, jobId });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, application });
  } catch (err) {
    console.error("Get Application Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
