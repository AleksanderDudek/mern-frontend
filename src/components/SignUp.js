import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState(localStorage.getItem("user")?.name || "");
  const [email, setEmail] = useState(localStorage.getItem("user")?.email || "");
  const [password, setPassword] = useState(
    localStorage.getItem("user")?.password || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    auth && navigate("/");
  }, []);

  // add env file
  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5005/register", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // persistent after closing, stores in browser
    localStorage.setItem("user", JSON.stringify(result));
    // session storage is only persistent when tab is opened
    //cookie timely holding
    navigate("/");
  };

  // todo add confirm password
  // sanitize inputs
  // use form library

  // add OAUTH logins

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-box"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-box"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="app-button" type="button" onClick={collectData}>
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
