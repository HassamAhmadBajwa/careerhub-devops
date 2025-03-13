import express from "express";
import {
  updateJobSeekerProfile,
  getProfile,
} from "../controllers/jobSeeker-controller.js";
import { isAuthenticated, isJobSeeker } from "../middleware/auth-middleware.js";
import uploadResumeMiddleware from "../middleware/upload-middleware.js";
const router = express.Router();

router
  .route("/profile/update")
  .patch(
    isAuthenticated,
    isJobSeeker,
    uploadResumeMiddleware,
    updateJobSeekerProfile
  );
router.route("/profile").get(isAuthenticated, isJobSeeker, getProfile);

export default router;
