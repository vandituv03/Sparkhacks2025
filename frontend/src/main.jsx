import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/loginpage";
import RegisterPage from "./components/registerUser"
import Dashboard from "./components/Dashboard"
import ForumPage from "./components/Forum"
import ChatBot from "./components/ChatBot"
import About from "./components/landing";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Forum" element={<ForumPage />} />
        <Route path="/Chat" element={<ChatBot />} />
      </Routes>
    </Router>
  </React.StrictMode>
);