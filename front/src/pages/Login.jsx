import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!email.match(emailReg)) {
          alert("Le format de votre email est invalide");
        } else navigate("/home");
        // localStorage.setItem("userId", res.data.userId);
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("admin", res.data.admin);
        const dataUser = {
          userId: res.data.userId,
          token: res.data.token,
          admin: res.data.admin,
        };
        localStorage.setItem("userData", JSON.stringify(dataUser));

        console.log(res.data).catch((err) => {
          console.log("error");
          console.log(err);
          alert("ERROR");
        });
      });
  };

  let userData = JSON.parse(localStorage.getItem("userData"));
  let userId = "";
  let token = "";
  let admin = "";

  if (userData) {
    userId = userData.userId;
    token = userData.token;
    admin = userData.admin;
  }
  function isLoggedIn() {
    if (userData && userId && token && admin) {
      return isLoggedIn;
    }
  }

  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";
  if (!isLoggedIn()) {
    return (
      <main>
        <h1>Se connecter</h1>
        <div className="container">
          <form className="login-form" onSubmit={HandleSubmit}>
            <label htmlFor="email" className="login-form__group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                formcontrolname="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="password" className="login-form__group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                formcontrolname="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <div className="login-form__btn">
              <button className="btn" color="primary" type="submit">
                Se Connecter
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  } else {
  }
};

export default LoginForm;
