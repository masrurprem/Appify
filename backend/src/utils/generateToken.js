const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.secret_sauce,
    { expiresIn: "10m" }
  );
  return accessToken;
};
//
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.secret_refresh,
    { expiresIn: "5d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
