import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/css/style.css";


ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
