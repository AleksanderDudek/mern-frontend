import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:5005/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.name) {
      // local storage takes string only
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter email"
        className="input-box"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="input-box"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" className="app-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
