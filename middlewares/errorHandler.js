

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }

  // Handle custom application-specific errors
  if (err.name === 'CustomErrorType') {
    return res.status(400).json({ error: 'Custom Error', details: err.message });
  }

  // Handle authentication errors
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({ error: 'Authentication error', details: err.message });
  }

  // Handle authorization errors
  if (err.name === 'AuthorizationError') {
    return res.status(403).json({ error: 'Authorization error', details: err.message });
  }

  // Handle other unknown errors
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;

  