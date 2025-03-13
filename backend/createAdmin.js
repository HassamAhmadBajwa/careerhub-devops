import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./models/Admin-Model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Admin.create({
  fullname: "Admin",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin",
  phoneNumber: "123456789",
});

console.log("Admin created successfully");
mongoose.disconnect();
