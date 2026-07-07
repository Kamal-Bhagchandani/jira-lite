const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user to (without password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }
    
    // Attach user to request (without password)
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired, please login again"));
    }

    // custom errors
    if (error instanceof ApiError) {
        return next(error);
    }

    return next(new ApiError(401, "Not authorized, token invalid"));
  }
};

module.exports = { protect };
