import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!password.match(passwordReg)) {
      alert("Le format de votre mot de passe est invalide");
    }
    if (!email.match(emailReg)) {
      alert("Le format de votre email est invalide");
    } 
    else {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          navigate("/login");
          console.log(res);
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    }
  };

  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";
  const passwordReg = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{2,}).{8,100}$";
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
          </label>

          <label htmlFor="email" className="signup-form__group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="bienvenue@groupomania.com"
              formcontrolname="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label htmlFor="password" className="signup-form__group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="(Doit contenir des majuscules, minuscules et chiffres)"
              formcontrolname="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
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
