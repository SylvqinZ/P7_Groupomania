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
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update/:id" element={<Create />} />
      </Routes>
    
    </Router>
    <Footer />
  </React.StrictMode>
  
);
