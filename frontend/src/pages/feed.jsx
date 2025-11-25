import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feed.css";
import CreatePost from "../pages/create-post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access-token");

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/post", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login"); // redirect if not logged in
      return;
    }
    getPosts();
  }, []);

  return (
    <div className="feed-wrapper">
      <h1>Appify</h1>
      {/*create post component first*/}
      <CreatePost onPostCreated={getPosts} />
      {!posts || posts.length === 0 ? (
        <p className="no-posts">
          No posts yet. Create or follow someone to see posts!
        </p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-box">
            <h3>{post.userName}</h3>
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="post" />}
            <div className="post-actions">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;
