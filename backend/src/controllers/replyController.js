const prisma = require("../db/prisma-client");

// adding reply to a comment
const addReply = async (req, res) => {
  try {
    const Cid = req.params.commentId;
    const { text } = req.body;
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(Cid),
      },
    });
    if (!comment) {
      return res.status(500).json({ message: "cannot reply to this comment" });
    }
    // add new comment to the post by user
    const newReply = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        commentId: Number(Cid),
      },
    });
    res.status(200).json({ message: "reply added", newReply });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

// export
module.exports = { addReply };
