// middleware/errorMiddleware.js

// ==========================================
// NOT FOUND MIDDLEWARE
// ==========================================

export const notFound = (
  req,
  res,
  next
) => {
  const error = new Error(
    `Route Not Found - ${req.originalUrl}`
  );

  res.status(404);

  next(error);
};


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  let message = err.message;

  // MONGODB INVALID OBJECT ID
  if (err.name === "CastError") {
    statusCode = 404;

    message = "Resource not found";
  }

  // MONGODB DUPLICATE KEY
  if (err.code === 11000) {
    statusCode = 400;

    message =
      "Duplicate field value entered";
  }

  // JWT ERROR
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;

    message = "Invalid token";
  }

  // JWT EXPIRED
  if (err.name === "TokenExpiredError") {
    statusCode = 401;

    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,

    message,

    stack:
      process.env.NODE_ENV ===
      "production"
        ? null
        : err.stack,
  });
};