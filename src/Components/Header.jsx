import React, { useState } from "react";
import Logout from "../Pages/Signout";
import { FaUser } from "react-icons/fa";
import "../styles/header.scss";

function Header({ userInfo }) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2 className="logo-title">SOLIHIYN</h2>
        </div>
        <div className="profile">
          <div className="status">
            <button type="button">Active</button>
            <button type="button">Missed</button>
          </div>
          <div className="profile-info">
            <div className="username">{userInfo.username}</div>
            <FaUser className="user-img" />
          </div>
          <Logout />
        </div>
      </div>
    </header>
  );
}

export default Header;
