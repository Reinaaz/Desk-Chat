import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Get auth header
    const authHeader = req.headers.authorization;

    // Check header presence and correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Extract token string
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded userId in token payload
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
