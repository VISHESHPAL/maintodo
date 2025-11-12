const error = (err, req, res, next) => {
  let error = { ...err };

  //   Only for the CastError

  if (err.name === `CastError`) {
    error.message = `Invalid ${error.kind}, Please Provide a valid ${error.path}`;
    error.statusCode = 400;
  }
  //   Global Error
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    object: err,
    stack: err.stack,
  });
};
export default error;
