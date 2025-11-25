const likeRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { addLike, removeLike } = require("../controllers/likeController");

// user likes post or comment or reply
likeRouter.post("/", authMiddleware, addLike);

// unlike -> delete data from database by type
likeRouter.delete("/", authMiddleware, removeLike);

// exports
module.exports = likeRouter;
