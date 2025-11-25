const prisma = require("../db/prisma-client");

// user creates a new comment
const addComment = async (req, res) => {
  try {
    const Pid = req.params.postId;
    const { text } = req.body;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(Pid),
      },
    });
    if (!post) {
      return res.status(500).json({ message: "no such post available" });
    }
    // add new comment to the post by user
    const newComment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        postId: Number(Pid),
      },
    });
    res.status(200).json({ message: "comment added", newComment });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

// exports
module.exports = { addComment };
