const commentRouter = require("express").Router();
const { addComment } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/auth");

// new comment created by the user
commentRouter.post("/:postId", authMiddleware, addComment);

module.exports = commentRouter;
