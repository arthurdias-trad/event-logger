const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRES;

exports.tokenizer = async (payload, expiration = expires) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiration,
  });
};

exports.decoder = async (token) => {
  return jwt.verify(token, secret);
};
