import { Link } from "react-router-dom";
import Logout from "../Pages/Signout";

function Header() {
  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">Home</Link>
        </div>
        <ul>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <Logout />
        </ul>
      </header>
    </div>
  );
}

export default Header;
