// Global error handler
const errorHandler = (err, req, res, next) => {
  // In dev show stack
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = { errorHandler };