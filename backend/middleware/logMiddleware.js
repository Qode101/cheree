const winston = require("winston");
const { combine, timestamp, printf, errors } = winston.format;

/**
 * Custom log format function.
 * Formats log messages with a timestamp, log level, and message.
 * If there is an error stack, it includes the stack trace in the log output.
 *
 * @param {Object} info - The log information object.
 * @param {string} info.timestamp - The timestamp of the log message.
 * @param {string} info.level - The log level (e.g., info, error).
 * @param {string} info.message - The log message.
 * @param {string} [info.stack] - The stack trace if the log is for an error.
 * @returns {string} - The formatted log message.
 */
function myFormat(info) {
  if (info.stack) {
    return `[${info.timestamp}] ${info.level}: ${info.message}\n${info.stack}`;
  }
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: combine(
    errors({ stack: true }), // Enable stack trace formatting
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    printf(myFormat)
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "debug",
    }),
    new winston.transports.Console(),
  ],
});

/**
 * Determines the log level based on the HTTP status code.
 *
 * @param {number} statusCode - The HTTP status code of the response.
 * @returns {string} - The log level ("error", "warn", "info").
 */
function getLoggerLevel(statusCode) {
  const statusRanges = [
    { range: [500, Infinity], level: "error" },
    { range: [300, 499], level: "warn" },
    { range: [100, 299], level: "info" },
  ];

  const matchingRange = statusRanges.find(
    ({ range }) => statusCode >= range[0] && statusCode <= range[1]
  );

  return matchingRange ? matchingRange.level : "unknown";
}

/**
 * Middleware to log details of the HTTP response after it is sent.
 *
 * Logs the HTTP method, URL, status code, user ID (if available), and IP address
 * with a corresponding log level based on the status code.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
function logResponseDetails(req, res, next) {
  res.on("finish", () => {
    const userId = req.userId || "anonymous";
    const ipAddress = req.ip;
    const statusCode = res.statusCode;
    const url = req.originalUrl;

    const level = getLoggerLevel(statusCode);

    logger[level](
      `${req.method} ${url} ${statusCode}, User ID: ${userId}, IP Address: ${ipAddress}`
    );
  });

  next();
}

module.exports = { logResponseDetails, logger };
