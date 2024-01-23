import { useState } from "react";

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/login/", {
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

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>
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
      <button type="submit">Sign in</button>
    </form>
  );
}

export default Signin;
