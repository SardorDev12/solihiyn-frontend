import React, { useState } from "react";

function Signup() {
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/register/", {
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
        window.location.href = "/signin";
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
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div>
        <label htmlFor="first_name">Name</label>
        <input
          type="text"
          id="first_name"
          placeholder="Name"
          autoComplete="off"
          value={formData["first_name"]}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.id]: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="last_name">Surname</label>
        <input
          type="text"
          id="last_name"
          placeholder="Surname"
          autoComplete="off"
          value={formData["last_name"]}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.id]: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          autoComplete="off"
          value={formData["username"]}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.id]: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="off"
          value={formData["password"]}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.id]: e.target.value,
            }))
          }
        />
      </div>
      <button type="submit">Sign up</button>
      <p>{errors}</p>
    </form>
  );
}

export default Signup;
