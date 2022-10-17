import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3000/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        navigate("/home")
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
        alert("EROR");
      });
  };

  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";

  function emailValidator(email) {
    if (!email.match(emailReg)) {
      alert("Votre email est invalide");
    }
    login();
  }
  return (
    <main>
      <h1>Se connecter</h1>
      <div className="container">
        <form className="login-form" onSubmit={(() => login, () => emailValidator(email))}>
          <div className="login-form__group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="login-email-input"
              formcontrolname="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="login-form__group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="login-password-input"
              formcontrolname="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="login-form__btn">
            <button className="btn" type="submit" color="primary">
              Se Connecter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupLogin;
