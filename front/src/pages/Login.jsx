import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserData, isLoggedIn } from "../utils/lib";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";

  useEffect(() => {
  	if(isLoggedIn()) {
  		navigate('/home');
  	}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!email.match(emailReg)) {
          alert("Le format de votre email est invalide");
        } else {
        	navigate("/home");
        	setUserData(res.data);
				}
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        alert("Vos identifiant sont incorrect");
      });
  };

  if (!isLoggedIn()) {
    return (
      <main>
        <h1>Se connecter</h1>
        <div className="container">
          <form className="login-form" onSubmit={handleSubmit}>
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
