import "../styles/login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component
function Login() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:4001/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("access token: ", data.accessToken);
        // save access token in local storage
        localStorage.setItem("access-token", data.accessToken);
        // navigate to feed
        navigate("/feed");
      } else {
        console.log("login failed", data.error);
        alert("invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("server error");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={submitHandler}>
        <h2>Appify Login</h2>

        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          required
          placeholder="Enter password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="login-link">
          New here? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
