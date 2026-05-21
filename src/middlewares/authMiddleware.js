import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// ==========================================
// PROTECT MIDDLEWARE
// ==========================================

const protect = async (
  req,
  res,
  next
) => {
  try {
    let token;

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      // GET TOKEN
      token =
        req.headers.authorization.split(
          " "
        )[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // FIND USER
      req.user =
        await User.findById(
          decoded.id
        ).select("-password");

      // USER NOT FOUND
      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();

    } else {
      return res.status(401).json({
        message:
          "Not authorized, no token",
      });
    }

  } catch (error) {
    return res.status(401).json({
      message:
        "Not authorized, token failed",
    });
  }
};

export { protect };



// ==========================================
// ADMIN MIDDLEWARE
// ==========================================

export const admin = (
  req,
  res,
  next
) => {
  if (
    req.user &&
    req.user.isAdmin
  ) {
    next();

  } else {
    return res.status(403).json({
      message:
        "Not authorized as admin",
    });
  }
};



// ==========================================
// OPTIONAL:
// SELF OR ADMIN
// ==========================================

export const selfOrAdmin = (
  req,
  res,
  next
) => {
  if (
    req.user.isAdmin ||
    req.user._id.toString() ===
      req.params.id
  ) {
    next();

  } else {
    return res.status(403).json({
      message:
        "Access denied",
    });
  }
};