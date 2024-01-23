import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
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
          first_name: formData.name, // Map 'name' to 'first_name'
          last_name: formData.surname, // Map 'surname' to 'last_name'
          username: formData.username,
          password: formData.password,
          password2: formData.password, // Map 'password' to 'password2'
        }),
      });
      setFormData({
        name: "",
        surname: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          autoComplete="off"
          value={formData["name"]}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              [e.target.id]: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          id="surname"
          placeholder="Surname"
          autoComplete="off"
          value={formData["surname"]}
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
    </form>
  );
}

export default Signup;
