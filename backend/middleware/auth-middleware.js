import jwt from "jsonwebtoken";

// for verify users
export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET);
    req.userId = decode.userId;
    req.userRole = decode.role;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};
// to check user is an admin
export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      message: "Access denied. Only admin can access this acount",
      success: false,
    });
  }
  next();
};
// check employer role to post a job

export const isEmployer = (req, res, next) => {
  if (req.userRole !== "employer") {
    return res.status(403).json({
      message: "Access denied. only employer can access this route",
      success: false,
    });
  }
  next();
};

// check job seeker role for update the profile

export const isJobSeeker = (req, res, next) => {
  if (req.userRole !== "job-seeker") {
    return res.status(403).json({
      message: "Access Denied. Only job seeker can access this route",
      success: false,
    });
  }
  next();
};
