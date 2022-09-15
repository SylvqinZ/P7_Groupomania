import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Logout from "./pages/Logout";
import Header from "./components/Header";

import "./styles/css/style.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin  />} />
        <Route path="/Logout" element={<Logout  />} />
      
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

