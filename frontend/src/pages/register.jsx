import "../styles/register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// register component
function Register() {
  //state obj
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      if (response.ok) {
        // log data to the console
        console.log(data.message);
        // navigate to login page
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("server error");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-box" onSubmit={submitHandler}>
        <h2>Appify welcomes you</h2>

        <label>First Name</label>
        <input
          type="text"
          required
          placeholder="Enter first name"
          name="firstName"
          value={inputs.firstName}
          onChange={changeHandler}
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={inputs.lastName}
          onChange={changeHandler}
        />

        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Enter email"
          name="email"
          value={inputs.email}
          onChange={changeHandler}
        />

        <label>Password</label>
        <input
          type="password"
          required
          placeholder="Enter password"
          name="password"
          value={inputs.password}
          onChange={changeHandler}
        />

        <button type="submit">Register</button>

        <p className="login-link">
          Already here? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
