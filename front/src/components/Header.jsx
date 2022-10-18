import { NavLink } from "react-router-dom";
import "../styles/css/style.css";
import logo from "../logo/icon-left-font1.png";

function Header() {
  window.onscroll = function () {
    if (document.documentElement.scrollTop > 10) {
      document.getElementById("header").style.background = "white";
      document.getElementById("header").style.opacity = "1";
    } else {
      document.getElementById("header").style.background = "none";
      document.getElementById("header").style.color = "black";
    }
  };
  return (
    <header id="header" className="header">
      <div className="header__img">
        <NavLink to="/home">
          <img className="header__logo" src={logo} alt="groupomania logo" />
        </NavLink>
      </div>

      <nav className="header__nav">
        <div className="hamburger">
          <span>
            <i id="nav-icon" className=""></i>
          </span>
        </div>

        <div className="nav" id="nav-links">
          <div id="btn" className="nav__home">
            <ul>
              <li>
                <NavLink to="/home">Accueil</NavLink>
              </li>
            </ul>
          </div>
          <div id="btn" className="nav__create">
            <ul>
              <li>
                <NavLink to="/create">Publier</NavLink>
              </li>
            </ul>
          </div>
          <div id="btn" className="nav__signup">
            <ul>
              <li>
                <NavLink to="/signup">S'inscrire</NavLink>
              </li>
            </ul>
          </div>
          <div id="btn" className="nav__login">
            <ul>
              <li>
                <NavLink to="/login">Connexion</NavLink>
              </li>
            </ul>
          </div>
          <div id="btn" className="nav__logout">
            <ul>
              <li>
                <button>Déconnexion</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
