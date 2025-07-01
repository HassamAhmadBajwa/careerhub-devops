import express from "express";
import {
  applyJob,
  getUserApplications,
  getApplicationByUserAndJob,
} from "../controllers/Job-ApplicationController.js";
import upload from "../middleware/upload-middleware.js";

const router = express.Router();

router.route("/apply").post(upload, applyJob);
router.route("/user/:userId").get(getUserApplications);
router.route("/:userId/:jobId").get(getApplicationByUserAndJob);

export default router;
