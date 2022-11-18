import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailValidation = () => {
    const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";
    if (email.match(emailReg)) {
      setEmailError("");
      return true;
    } else if (!email.match(emailReg) && emailReg != "") {
      setEmailError("Le format de votre email est invalide");
      return false;
    }
  };

  const passwordValidation = () => {
    const passwordReg = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{2,}).{8,100}$";
    if (password.match(passwordReg)) {
      setPasswordError("");
      return true;
    } else if (!password.match(passwordReg) && passwordReg != "") {
      setPasswordError("Le format de votre mot de passe est invalide");
      return false;
    }
  };

  const usernameValidation = () => {
    const usernameReg = "^[a-zA-Z0-9._-]{3,13}$";
    if (username.match(usernameReg)) {
      setUsernameError("");
      return true;
    } else if (!username.match(usernameReg) && usernameReg != "") {
      setUsernameError("Le format de votre nom est invalide");
      return false;
    }
  };

  const validForm = () => {
    let isFormValid = true;

    if (usernameValidation() === false) {
      isFormValid = false;
    }
    if (emailValidation() === false) {
      isFormValid = false;
    }
    if (passwordValidation() === false) {
      isFormValid = false;
    }
    return isFormValid;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = validForm();
    if (isFormValid === true) {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log("error");

          console.log(err);
          if ((err.status = 401)) {
            alert("Le nom d'utilisateur ou l'email est déjà utilisé");
          }
        });
    }
  };

  return (
    <main>
      <h1>S'inscrire</h1>
      <div className="container">
        <form className="signup-form" onSubmit={HandleSubmit}>
          <label htmlFor="name" className="signup-form__group">
            <label className="signup-form_username" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              id="name"
              placeholder="Saisissez votre nom d'utilisateur"
              formcontrolname="name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p className="username-error">{usernameError}</p>
          </label>

          <label htmlFor="email" className="signup-form__group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Bienvenue@groupomania.com"
              formcontrolname="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p className="email-error">{emailError}</p>
          </label>

          <label htmlFor="password" className="signup-form__group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Doit contenir des majuscules, minuscules et chiffres (minimum 8 caractère)"
              formcontrolname="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="password-error">{passwordError}</p>
          </label>

          <div className="signup-form__btn">
            <button className="btn" type="submit" color="primary">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
