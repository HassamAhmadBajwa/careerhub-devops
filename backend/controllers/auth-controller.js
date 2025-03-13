import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User-Model.js";
import { Admin } from "../models/Admin-Model.js";

// For Register

export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body;
    // if fields empty return error missing fields.
    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Missing fields",
        success: false,
      });
    }
    // if user already exists return error.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    // passowrd hash for security.
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// For Login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!role) {
      return res.status(401).json({
        message: "Role is required",
        success: false,
      });
    }

    let user;
    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "employer" || role === "job-seeker") {
      user = await User.findOne({ email, role });
    } else {
      return res.status(400).json({
        message: "Invalid Role",
        success: false,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid User or Invalid Email",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id, role }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login Successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname || "Admin",
        email: user.email,
        role: role,
      },
      token: token,
      role: role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true, // Fix this
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
