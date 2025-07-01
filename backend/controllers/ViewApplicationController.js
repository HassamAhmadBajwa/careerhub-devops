// controllers/employerApplicationsController.js
import { JobApplication } from "../models/Job-ApplicationModel.js";
import { Job } from "../models/Job-Model.js";

export const getEmployerApplications = async (req, res) => {
  try {
    const employerId = req.userId;

    // Find jobs posted by this employer
    const jobs = await Job.find({ employer: employerId }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // Find all applications for those jobs
    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate("userId", "fullname email")
      .populate("jobId", "title location");

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error("Get Employer Applications Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findById(appId).populate("jobId");

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    if (application.jobId.employer.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    application.status = status;
    await application.save();

    res
      .status(200)
      .json({ success: true, message: "Status updated", application });
  } catch (err) {
    console.error("Update Status Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
