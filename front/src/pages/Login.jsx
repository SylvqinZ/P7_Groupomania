import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserData, isLoggedIn } from "../utils/lib";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailValidation = () => {
    const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";
    if (email.match(emailReg)) {
      setEmailError("");
      return true;
    } else if (!email.match(emailReg) && emailReg != "") {
      setEmailError("Votre email est invalide");
      return false;
    }
  };

  const passwordValidation = () => {
    const passwordReg = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{2,}).{8,100}$";
    if (password.match(passwordReg)) {
      setPasswordError("");
      return true;
    } else if (!password.match(passwordReg) && passwordReg != "") {
      setPasswordError("Votre mot de passe est invalide");
      return false;
    }
  };

  const validForm = () => {
    let isFormValid = true;

    if (emailValidation() === false) {
      isFormValid = false;
    }
    if (passwordValidation() === false) {
      isFormValid = false;
    }
    return isFormValid;
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = validForm();
    if (isFormValid === true) {
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
          if ((err.status = 401)) {
            alert("Vos identifiants sont incorrect");
          }
        });
    }
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
                placeholder="Saisissez votre email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="email-error">{emailError}</p>
            </label>
            <label htmlFor="password" className="login-form__group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Saisissez votre mot de passe"
                id="password"
                formcontrolname="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="password-error">{passwordError}</p>
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
  }
};

export default LoginForm;
