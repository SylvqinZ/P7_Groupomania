import { NavLink } from "react-router-dom";
import "../styles/css/style.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo/icon-left-font1.png";
import { setUserData, isLoggedIn } from "../utils/lib";

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

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setUserData({});
    navigate("/login");
  };

  return (
    <header id="header" className="header">
      <div className="header__img" onClick={goToTop}>
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
