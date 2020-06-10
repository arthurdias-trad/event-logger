const router = require("express").Router();
const path = require("path");
const ErrorResponse = require(path.join("..", "utils", "ErrorResponse"));
const { check, validationResult } = require("express-validator");
const { register } = require(path.join("..", "controllers", "auth"));

router.route("/register").post([
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password requires at least 6 chars").isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msgs = [];
      errors.errors.forEach((error) => msgs.push(error.msg));
      return next(new ErrorResponse(msgs, 404));
    }

    register(req, res, next);
  },
]);

module.exports = router;
