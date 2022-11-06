import { NavLink } from "react-router-dom";
import "../styles/css/style.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo/icon-left-font1.png";

const Header = () => {
  window.onscroll = function () {
    if (document.documentElement.scrollTop > 10) {
      document.getElementById("header").style.background = "white";
      document.getElementById("header").style.opacity = "1";
    } else {
      document.getElementById("header").style.background = "none";
      document.getElementById("header").style.color = "black";
    }
  };

  const navigate = useNavigate();
  
  let userId = "";
  let token = "";
  let admin = "";
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    userId = userData.userId;
    token = userData.token;
    admin = userData.admin;
  }

  function isLoggedIn() {
    if ((userData, userId, token /*admin*/)) {
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    navigate("/login");
  };

  return (
    <header id="header" className="header">
      <div className="header__img">
        <NavLink to="/home">
          <img className="header__logo" src={logo} alt="groupomania logo" />
        </NavLink>
      </div>

      <nav className="header__nav">
        <div className="nav" id="nav-links">
          {isLoggedIn() && (
            <div id="btn" className="nav__home">
              <ul>
                <li>
                  <NavLink to="/home">Accueil</NavLink>
                </li>
              </ul>
            </div>
          )}
          {isLoggedIn() && (
            <div id="btn" className="nav__create">
              <ul>
                <li>
                  <NavLink to="/create">Publier</NavLink>
                </li>
              </ul>
            </div>
          )}
          {isLoggedIn() === false && (
            <div id="btn" className="nav__signup">
              <ul>
                <li>
                  <NavLink to="/signup">S'inscrire</NavLink>
                </li>
              </ul>
            </div>
          )}
          {isLoggedIn() === false && (
            <div id="btn" className="nav__login">
              <ul>
                <li>
                  <NavLink to="/login">Connexion</NavLink>
                </li>
              </ul>
            </div>
          )}
          {isLoggedIn() && (
            <div id="btn" className="nav__logout">
              <ul>
                <li>
                  <button type="click" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
