const { decoder } = require("../utils/TokenParser");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("./async");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    next(new ErrorResponse("No token, authorization denied", 403));
  }

  const decoded = await decoder(token);

  req.user = decoded.user.id;
  next();
});

module.exports = auth;
