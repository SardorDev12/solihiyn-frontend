import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import "../styles/header.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiDesktopMouse2 } from "react-icons/ci";

function Header({ userInfo, api }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const handleShowProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleClickOutsideMenu = (event) => {
    if (
      (profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)) ||
      event.target.classList.contains("menu-click")
    ) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/logout/`, {
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
          <div ref={profileMenuRef} className="profile-info">
            <div className="username">{userInfo.username}</div>
            <FaUser onClick={handleShowProfileMenu} className="user-img" />
            {showProfileMenu && (
              <ul className="profile-menu">
                <Link to="/" className="menu-item menu-click">
                  <FaHome />
                  <span className="menu-click">Home</span>
                </Link>
                <Link to="/add" className="menu-item menu-click">
                  <MdOutlineAddBox />
                  <span className="menu-click">Add</span>
                </Link>
                <hr />
                <Link to="/use" className="menu-item menu-click">
                  <CiDesktopMouse2 />
                  <span className="menu-click">How to use</span>
                </Link>
                <Link className="menu-item menu-click" onClick={handleLogout}>
                  <GoSignOut />
                  <span className="menu-click">Logout</span>
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
