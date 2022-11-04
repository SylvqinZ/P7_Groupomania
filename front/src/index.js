import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Update from "./pages/Update";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import "./styles/css/style.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Update/:id" element={<Create />} />
      </Routes>
    
    </Router>
    <Footer />
  </React.StrictMode>
  
);
