const prisma = require("../db/prisma-client");

// user creates a post
const createPost = async (req, res) => {
  try {
    // catch the contents
    const { text, imageUrl } = req.body;
    const newPost = await prisma.post.create({
      data: {
        text,
        imageUrl,
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: "post created", post: newPost });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};
// all public posts and user private posts controller (feed page)
const feedPosts = async (req, res) => {
  // the code goes here
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [{ isPublic: true }, { userId: req.user.id }],
      },
      include: {
        user: true,
        // getting total likes and comments for a post
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
          orderBy: { createdAt: "desc" },
          include: {
            user: true,
            likes: {
              include: {
                user: true,
              },
            },
            replies: {
              orderBy: { createdAt: "desc" },
              include: {
                user: true,
                likes: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // format posts for easy rendering
    const formattedPosts = posts.map((p) => ({
      id: p.id,
      text: p.text,
      image: p.imageUrl,
      userName: p.user.firstName + " " + p.user.lastName,
      likes: p._count.likes,
      comments: p._count.comments,
    }));
    res.status(200).json({ posts: formattedPosts });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    console.log(err);
  }
};

// specific users posts controller
const userPosts = async (req, res) => {
  try {
    const id = req.params.userId;
    if (id !== req.user.id) {
      return res.status(403).json({ message: "access denied" });
    }
    const ownPosts = await prisma.post.findMany({
      where: {
        userId: id,
      },
      include: {
        comments: true,
        likes: true,
      },
    });
    res.status(200).json({ ownPosts });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//user's post by id
const postById = async (req, res) => {
  try {
    const Pid = req.params.postId;

    const post = await prisma.post.findUnique({
      where: {
        postId: Pid,
      },
      include: {
        comments: true,
        likes: true,
      },
    });
    if (!post) {
      return res.status(500).json({ message: "no such post available" });
    }
    // post in db.. so return to the user
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// update user post by id
const updatePost = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const Pid = req.params.postId;
    // check if post not found
    const post = await prisma.post.findUnique({
      where: {
        postId: Pid,
      },
    });
    if (!post) {
      return res.status(400).json({ error: "post not found" });
    }
    // check user id
    if (post.userId !== req.user.id) {
      return res.status(500).json({ error: "access denied" });
    }
    // all ok-> update post content
    const updatePost = await prisma.post.update({
      where: {
        postId: Pid,
        data: {
          text,
          imageUrl,
        },
      },
    });
    res.status(200).json({ message: "post edited with success" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};
// delete post by id controller
const deletePost = async (req, res) => {
  try {
    const Pid = req.params.postId;
    const post = await prisma.post.findUnique({
      where: {
        postId: Pid,
      },
    });

    if (!post) {
      return res.status(400).json({ error: "post not found" });
    }
    // check if valid user
    if (post.userId !== req.user.id) {
      return res.status(500).json({ error: "access denied" });
    }
    const delPost = await prisma.post.delete({
      where: {
        postId: Pid,
      },
    });
    res.status(200).json({ message: "post removed with success" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};
// exports
module.exports = {
  createPost,
  feedPosts,
  userPosts,
  postById,
  updatePost,
  deletePost,
};
