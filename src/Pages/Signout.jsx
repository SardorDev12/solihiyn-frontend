import React, { useState } from "react";

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState("");

  // Signout.jsx
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/v1/logout/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("authToken");
        window.location.href = "/signin";
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <li onClick={handleLogout}>Logout</li>
      <p>{logoutMessage}</p>
    </div>
  );
};

export default Logout;
