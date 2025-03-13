import { User } from "../models/User-Model.js";

// update job seeker profile

export const updateJobSeekerProfile = async (req, res) => {
  try {
    const { location, education, experience, username, email, phoneNumber } =
      req.body;
    const resume = req.file ? req.file.path : null;
    const jobSeekerId = req.userId;
    console.log(jobSeekerId);

    //find user by id
    let user = await User.findById(jobSeekerId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    // check user role job seeker

    if (user.role !== "job-seeker") {
      return res.status(403).json({
        message: "Access denied. Only job seeker update profile",
        success: false,
      });
    }
    // update only the provided fields
    if (location || education || experience || resume) {
      user.profile = {
        ...user.profile, // Keep existing values
        location: location || user.profile.location,
        username: username || user.profile.username,
        phoneNumber: phoneNumber || user.profile.phoneNumber,
        education: education || user.profile.education,
        experience: experience || user.profile.experience,
        resume: resume || user.profile.resume,
      };
    }

    // save the user with updated

    await user.save();

    return res.status(200).json({
      message: "profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Profile updated error", error);
    return res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

// get job seeker
export const getProfile = async (req, res) => {
  try {
    const jobSeekerId = req.userId; // Extract user ID from token
    const user = await User.findById(jobSeekerId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Ensure the user is a Job Seeker
    if (user.role !== "job-seeker") {
      return res.status(403).json({
        message: "Access denied. Only job seekers can view profiles.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
