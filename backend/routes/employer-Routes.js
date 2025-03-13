import express from "express";
import { postJob } from "../controllers/employer-controller.js";
import { isAuthenticated, isEmployer } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/post-job").post(isAuthenticated, isEmployer, postJob);

export default router;
