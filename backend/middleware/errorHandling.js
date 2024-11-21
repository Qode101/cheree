const { AppError } = require("../utils/tryCatch");

const handleErrors = (err, req, res, next) => {
  res.status(err.statusCode || 400).send({ message: err.message });
};

const handle404 = (req, res, next) => {
  const error = new AppError(
    `Endpoint ${req.method} ${req.originalUrl} doesn't exist`,
    404
  );
  next(error);
};

module.exports = { handleErrors, handle404 };
