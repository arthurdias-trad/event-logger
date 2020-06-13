const errorHandler = (err, req, res, next) => {
  let { message, stack, statusCode, name, code } = err;

  // Log to console for dev
  console.error(stack.red);

  // Mongoose bad OjbectId
  if (name === "CastError") {
    message = "Incorrect ID format";
    statusCode = 400;
  }

  // Mongoose duplicate key
  if (code === 11000) {
    message =
      "Duplicate value - there is already an event with the same name and start date";
    statusCode = 400;
  }

  // Mongoose validation error
  if (name === "ValidationError") {
    message = Object.values(err.errors).map((value) => value.message);
    statusCode = 400;
  }

  res.status(statusCode || 500).json({
    success: false,
    errors: message || "Server Error",
  });
};

module.exports = errorHandler;
