const tryCatch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Helps distinguish operational errors from programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { tryCatch, AppError };
