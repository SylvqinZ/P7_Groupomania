import { Link } from "react-router-dom";
import "../styles/css/style.css";
import logo from "../logo/icon-left-font.svg";

function Header() {
  return (
    <header class="header">
      <a href="http://localhost:3000/">
        <img className="header__logo" src={logo} alt="groupomania logo" />
      </a>
      <nav class="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
