// Video referred: https://youtu.be/S5EpsMjel-M?si=02E1v0dGRMCZsGsN

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;