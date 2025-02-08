import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/loginpage";
import RegisterPage from "./components/registerUser"
import Dashboard from "./components/Dashboard"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);