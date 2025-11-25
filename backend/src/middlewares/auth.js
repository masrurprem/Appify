const jwt = require("jsonwebtoken");
const prisma = require("../db/prisma-client");

//
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("no token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.secret_sauce);
    // fetch the user
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });
    req.user = user;
    next();
  } catch (e) {
    res.status(403).send("invalid or expired access token");
  }
};

module.exports = authMiddleware;
