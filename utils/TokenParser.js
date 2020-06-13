const jwt = require("jsonwebtoken");

exports.tokenizer = async (payload, expiration = process.env.JWT_EXPIRES) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
};
