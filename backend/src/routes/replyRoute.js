const replyRouter = require("express").Router();
const { addReply } = require("../controllers/replyController");
const authMiddleware = require("../middlewares/auth");

// new comment created by the user
replyRouter.post("/:commentId", authMiddleware, addReply);

module.exports = replyRouter;
