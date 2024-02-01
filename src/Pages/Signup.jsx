import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.scss";
import { useNavigate } from "react-router-dom";

function Signup({ api }) {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/api/v1/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (res.ok) {
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
        });
        navigate("/signin");
      } else if (res.status === 500) {
        setErrors(["User with this information already exists."]);
      } else {
        const data = await res.json();
        setErrors(data.errors || ["Something went wrong. Please try again."]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <h1 className="section-title">SOLIHIYN</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="form-title">Register</h1>
        <div className="form-input">
          <label htmlFor="first_name">Name</label>
          <input
            type="text"
            id="first_name"
            placeholder="Name"
            autoComplete="off"
            value={formData["first_name"]}
            required
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [e.target.id]: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="last_name">Surname</label>
          <input
            type="text"
            id="last_name"
            placeholder="Surname"
            autoComplete="off"
            value={formData["last_name"]}
            required
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [e.target.id]: e.target.value,
              }))
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="off"
            value={formData["username"]}
            required
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
            autoComplete="off"
            value={formData["password"]}
            required
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                [e.target.id]: e.target.value,
              }))
            }
          />
        </div>
        <button className="form-submit" type="submit">
          Register
        </button>
        <p>
          If you have an account,{" "}
          <Link to="/signin" className="form-redirect">
            Sign in.
          </Link>
        </p>
        <p>{errors}</p>
      </form>
    </div>
  );
}

export default Signup;
