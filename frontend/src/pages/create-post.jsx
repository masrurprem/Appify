import "../styles/create-post.css";
import { useEffect, useState } from "react";

// component
function CreatePost({ onPostCreated }) {
  // state variable for input field handling
  const [inputs, setInputs] = useState({ text: "", imageUrl: "" });
  // state variable for response message
  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access-token");
      const response = await fetch("http://localhost:4001/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // clear text area
        setInputs({ text: "", imageUrl: "" });

        // notify parent to refresh feed
        onPostCreated();

        console.log(data);
      } else {
        setMessage("error creating post");
      }
    } catch (err) {
      console.log(err);
      alert("server error");
    }
  };
  // useEffect to make the message= data.message disappear after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setMessage(""), 1200);
    const clearTimer = () => {
      clearTimeout(timer);
    };
    return clearTimer;
  }, [message]);

  return (
    <div className="create-post-wrapper">
      <form className="create-post-box" onSubmit={handleSubmit}>
        <textarea
          placeholder="Post a Status!"
          name="text"
          value={inputs.text}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          name="imageUrl"
          value={inputs.imageUrl}
          onChange={changeHandler}
        />
        <button type="submit">Post</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreatePost;
