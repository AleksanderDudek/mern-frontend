import React from "react";
import { Link, useNavigate } from "react-router-dom";

// add localization

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // it would be nice to reflect accessible links based on login type
  return (
    <div className="navbar">
      <ul className="header-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>
        <li>
          <Link to="/update">Update Product</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {!auth ? (
          <>
            <li>
              <Link to="/signup">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          // is this 'to' even needed?
          <li>
            <Link to="/signup" onClick={logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
