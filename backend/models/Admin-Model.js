import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  fullname: { type: String, required: true }, // Fixed "requied" typo
  email: { type: String, required: true, unique: true }, // Fixed typo
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: "admin" },
});

// Hash the password before saving (only when registering through the app)
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Prevent double hashing
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);
