// imports
const prisma = require("../db/prisma-client");

// like adding controller
const addLike = async (req, res) => {
  try {
    const { type, targetId } = req.body;
    // targetID: postId/commnentId/replyId as per type
    let likeData = { userId: req.user.id };
    if (type === "post") {
      likeData.postId = targetId;
    } else if (type === "comment") {
      likeData.commentId = targetId;
    } else if (type === "reply") {
      likeData.replyId = targetId;
    } else {
      return res.status(400).json({ error: "invalid type" });
    }
    // insert data to db
    const newLike = await prisma.like.create({
      data: likeData,
    });
    res.status(200).json({ newLike });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};
// unlike post/comment/reply controller
const removeLike = async (req, res) => {
  try {
    const { type, targetId } = req.body;
    // targetID: postId/commnentId/replyId as per type
    let unlikeData = { userId: req.user.id };
    if (type === "post") {
      unlikeData.postId = targetId;
    } else if (type === "comment") {
      unlikeData.commentId = targetId;
    } else if (type === "reply") {
      unlikeData.replyId = targetId;
    } else {
      return res.status(400).json({ error: "invalid type" });
    }
    // insert data to db
    const unLike = await prisma.like.delete({
      data: unlikeData,
    });
    res.status(200).json({ unLike });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { addLike, removeLike };
