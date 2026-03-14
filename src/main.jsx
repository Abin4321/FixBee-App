// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Context
import { AuthProvider } from "./context/AuthContext.jsx";

// Router
import { BrowserRouter } from "react-router-dom";

// Global CSS (Tailwind)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);