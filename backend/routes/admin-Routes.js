import express from "express";
import {
  getAllUser,
  updateUserStatus,
  deleteUser,
  getAllJobs,
  updateJobStatus,
  deleteJob,
} from "../controllers/admin-controller.js";
import { isAuthenticated, isAdmin } from "../middleware/auth-middleware.js";

const router = express.Router();

//admin manages usr account
router.route("/users").get(isAuthenticated, isAdmin, getAllUser);
router.route("/users/:id").put(isAuthenticated, isAdmin, updateUserStatus);
router.route("/users/:id").delete(isAuthenticated, isAdmin, deleteUser);
// job manage
router.route("/jobs").get(isAuthenticated, isAdmin, getAllJobs);
router.route("/jobs/:id").delete(isAuthenticated, isAdmin, deleteJob);
router.route("/jobs/:id").put(isAuthenticated, isAdmin, updateJobStatus);
export default router;
