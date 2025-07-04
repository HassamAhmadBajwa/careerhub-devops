import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";

import authRoutes from "./routes/auth-Routes.js";
import adminRoutes from "./routes/admin-Routes.js";
import employerRoutes from "./routes/employer-Routes.js";
import jobSeekerRoutes from "./routes/jobSeeker-Routes.js";
import getAllJobsRoutes from "./routes/job-Routes.js";
import getSingleJobRoutes from "./routes/job-Routes.js";
import jobApplicationRoutes from "./routes/Job-ApplicationRoute.js";
dotenv.config({});
const app = express();

// middleware for every project must use.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost',
  'http://127.0.0.1:5173',
  'http://frontend:5173' // if Docker service name is `frontend`
];


app.use(cors({
  origin: function (origin, callback) {
    console.log("🚨 Incoming request origin:", origin); // ← Add this line
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
      console.log("🚨 Incoming request origin:", origin);
    }
  },
  credentials: true
}));




app.use("/uploads/resume", express.static("uploads/resume"));

// connection of mongodb
connectDb();
// define port

const PORT = process.env.PORT || 6006;

//api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/employer", employerRoutes);
app.use("/api/v1/job-seeker", jobSeekerRoutes);
app.use("/api/v1", getAllJobsRoutes);
app.use("/api/v1", getSingleJobRoutes);
app.use("/api/v1/applications", jobApplicationRoutes);

app.get("/", (req, res) => {
  res.send("The api is working");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
