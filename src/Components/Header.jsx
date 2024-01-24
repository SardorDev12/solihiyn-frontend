import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../Pages/Signout";

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header>
        <div className="logo"></div>
        <ul>
          <li className="dropdown" onClick={toggleDropdown}>
            <span>Menu</span>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
                <Link>
                  <Logout />
                </Link>
              </ul>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
