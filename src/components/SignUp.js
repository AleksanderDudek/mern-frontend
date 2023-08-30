import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = () => {
    console.log(name, email, password);
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
      <button className="register-button" type="button" onClick={collectData}>
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
