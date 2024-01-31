import React, { useEffect, useState } from "react";
import Logout from "../Pages/Signout";
import { FaUser } from "react-icons/fa";
import "../styles/header.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAddBox } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";

function Header({ userInfo }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleShowProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Logout
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
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-title">
            SOLIHIYN
          </Link>
        </div>
        <div className="profile">
          {/* <div className="status">
            <button type="button">Active</button>
            <button type="button">Missed</button>
          </div> */}
          <div className="profile-info">
            <div className="username">{userInfo.username}</div>
            <FaUser onClick={handleShowProfileMenu} className="user-img" />
            {showProfileMenu && (
              <ul className="profile-menu">
                <Link to="/edit" className="menu-item">
                  <FiEdit />
                  <span>Edit</span>
                </Link>
                <Link to="/add" className="menu-item">
                  <MdOutlineAddBox />
                  <span>Add</span>
                </Link>
                <hr />
                <Link to="/profile" className="menu-item">
                  <CgProfile />
                  <span>Profile</span>
                </Link>
                <Link className="menu-item" onClick={handleLogout}>
                  <GoSignOut />
                  <span>Logout</span>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
