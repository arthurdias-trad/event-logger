const path = require("path");
const jwt = require("jsonwebtoken");
const User = require(path.join("..", "models", "User"));
const ErrorResponse = require(path.join("..", "utils", "ErrorResponse"));
const AsyncHandler = require(path.join("..", "middleware", "async"));

// @desc    Register user
// @route   POST /auth/register
// @access  Public
exports.register = AsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(
      new ErrorResponse(
        "This email is already associated with an existing user.",
        400
      )
    );
  }

  user = new User({ firstName, lastName, email, password });

  await user.save();

  const payload = { user: { id: user._id } };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return res.status(201).json({ success: true, token });
});
