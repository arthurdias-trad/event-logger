const jwt = require("jsonwebtoken");

exports.tokenizer = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
