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
    axios
      .post("http://localhost:3000/api/auth/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (!email.match(emailReg)) {
          alert("Le format de votre email est invalide");
        } else navigate("/login");
        console.log(res);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const emailReg = "^[A-Za-z0-9._-]+[@][A-Za-z0-9.-_]+[.][a-zA-Z]{2,3}$";

  return (
    <main>
      <h1>S'inscrire</h1>
      <div className="container">
        <form className="signup-form" onSubmit={HandleSubmit}>
          <div className="signup-form__group">
            <label className="signup-form_username" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              id="name"
              formcontrolname="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="signup-form__group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              formcontrolname="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signup-form__group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              formcontrolname="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
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
