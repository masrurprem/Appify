const userRouter = require("express").Router();
const { register, login, profile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

// user register: "/api/user/register"
userRouter.post("/register", register);

// user login: "/api/user/login"
userRouter.post("/login", login);

// get current user-> protected route
userRouter.get("/profile", authMiddleware, profile);

module.exports = userRouter;
