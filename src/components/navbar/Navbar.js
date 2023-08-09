import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { Icon } from "semantic-ui-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      toast.success("Logout Success!", 3000);
      navigate("/login");
    });
  };
  useEffect(() => {
    const toggleButton = document.querySelector(".toggle-menu");
    const navBar = document.querySelector(".nav-bar");
    if (toggleButton && navBar) {
      toggleButton.addEventListener("click", () => {
        navBar.classList.toggle("toggle");
      });
    }
  }, []);

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="toggle-menu">
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-list-item">
                <button onClick={handleLogout}>
                  <Icon name="sign out alternate"></Icon>Sign Out
                </button>
              </li>
              <li className="nav-list-item">
                <Link to="/worklist" className="nav-link">
                  WorkList
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-list-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-list-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
