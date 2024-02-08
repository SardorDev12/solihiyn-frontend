import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signin.scss";

function Signin({ api }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const response = await fetch(`${api}/api/v1/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      window.location.href = "/";
      if (!response.ok) {
        console.error("Login failed");
        return;
      }

      const data = await response.json();
      const token = data.access;

      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="signin-section">
      <h1 className="section-title">SOLIHIYN</h1>

      <form onSubmit={handleSubmit} className="signin-form">
        <h1 className="form-title">Sign in</h1>
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="username"
            value={formData["username"]}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [e.target.id]: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="password"
            value={formData["password"]}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [e.target.id]: e.target.value,
              }))
            }
          />
        </div>
        <button className="form-submit" type="submit">
          Sign in
        </button>
        <p>
          If you don't have account,{" "}
          <Link to="/signup" className="form-redirect">
            Sign up.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
