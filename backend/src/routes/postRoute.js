const postRouter = require("express").Router();
const {
  feedPosts,
  userPosts,
  postById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middlewares/auth");

// user creates a post with text and image
postRouter.post("/", authMiddleware, createPost);

// get all public and users own private posts to feed->protected
postRouter.get("/", authMiddleware, feedPosts);

// user gets all of his/her posts
postRouter.get("/:userId", authMiddleware, userPosts);

// user gets a post
postRouter.get("/:postId", authMiddleware, postById);

// user updates a post
postRouter.patch("/:postId", authMiddleware, updatePost);
// delete a user post
postRouter.delete("/:postId", authMiddleware, deletePost);

module.exports = postRouter;
