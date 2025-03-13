import express from "express";
import { getAllJobs, getSingleJob } from "../controllers/job-controller.js";

const router = express.Router();

router.route("/jobs").get(getAllJobs);
router.route("/job/:id").get(getSingleJob);
export default router;
