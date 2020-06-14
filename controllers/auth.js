const path = require("path");

const User = require(path.join("..", "models", "User"));
const ErrorResponse = require(path.join("..", "utils", "ErrorResponse"));
const AsyncHandler = require(path.join("..", "middleware", "async"));
const { tokenizer } = require(path.join("..", "utils", "TokenParser"));

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

  const token = await tokenizer(payload);

  return res.status(201).json({ success: true, token });
});

// @desc    Login user & return token
// @route   POST /auth/login
// @access  Public
exports.login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Wrong credentials.", 400));
  }

  let match = await user.isMatch(password);

  if (!match) {
    return next(new ErrorResponse("Wrong credentials.", 400));
  }

  const payload = { user: { id: user._id } };

  const token = await tokenizer(payload);

  return res
    .status(201)
    .cookie("JWT", token, { httpOnly: true })
    .json({ success: true, token });
});

// @desc    Delete user and events
// @route   DELETE auth/
// @access  Private
exports.deleteUser = AsyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user);

  if (!user) {
    return next(new ErrorResponse("Wrong credentials.", 403));
  }

  user.remove();

  return res.status(204).send();
});
