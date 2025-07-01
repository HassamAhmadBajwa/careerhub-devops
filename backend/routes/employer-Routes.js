import express from "express";
import {
  postJob,
  getEmployerJobs,
  updateJob,
  deleteJob,
} from "../controllers/employer-controller.js";
import {
  getEmployerApplications,
  updateApplicationStatus,
} from "../controllers/ViewApplicationController.js";

import { isAuthenticated, isEmployer } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/post-job").post(isAuthenticated, isEmployer, postJob);
router.route("/my-jobs").get(isAuthenticated, isEmployer, getEmployerJobs);
router.route("/update-job/:jobId").put(isAuthenticated, isEmployer, updateJob);
router
  .route("/delete-job/:jobId")
  .delete(isAuthenticated, isEmployer, deleteJob);
router
  .route("/applications")
  .get(isAuthenticated, isEmployer, getEmployerApplications);
router
  .route("/applications/:appId/status")
  .put(isAuthenticated, isEmployer, updateApplicationStatus);
export default router;
