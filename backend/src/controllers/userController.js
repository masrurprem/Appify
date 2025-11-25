const prisma = require("../db/prisma-client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const comPass = require("../utils/comparePass");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const authMiddleware = require("../middlewares/auth"); // for user auth

// user registration controller
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // hash the password
    const hashed_pass = await bcrypt.hash(password, 10);
    // store to db
    const newUser = await prisma.user.create({
      data: { firstName, lastName, email, password: hashed_pass },
    });
    res
      .status(200)
      .json({ message: "user registered with success", user: newUser });
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
    console.log(e);
  }
};

// user login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // fetch user by email to confirm existence
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).send("invalid login credentials");
    }
    // step-2: compare passwords
    const isMatch = await comPass(password, user.password);
    if (!isMatch) {
      return res.status(400).send("invalid login credentials");
    }
    // user verified with email and pass: gen token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // set refresh token as http-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    // send response
    res.status(200).json({
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    console.log(err);
  }
};

// user gets own profile-> protected route controller
const profile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};
//export modules
module.exports = { register, login, profile };
