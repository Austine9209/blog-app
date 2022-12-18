import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Navigation = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <nav>
      <span>Anime Moments</span>
      <div>
        <ul className="nav-item">
          <Link to="/" style={{ textDecoration: "none" }}>
            <li
              className={`nav-link ${
                active === "home" ? "active" : ""
              }`}
              onClick={() => setActive("home")}
            >
              Home
            </li>
          </Link>
          <Link to="/compose" style={{ textDecoration: "none" }}>
            <li
              className={`nav-link ${
                active === "compose" ? "active" : ""
              }`}
              onClick={() => setActive("compose")}
            >
              Compose
            </li>
          </Link>

          <Link to="/contactUs" style={{ textDecoration: "none" }}>
            <li
              className={`nav-link ${
                active === "contactUs" ? "active" : ""
              }`}
              onClick={() => setActive("contactUs")}
            >
              Contact Us
            </li>
          </Link>

          <Link to="/about" style={{ textDecoration: "none" }}>
            <li
              className={`nav-link ${
                active === "about" ? "active" : ""
              }`}
              onClick={() => setActive("about")}
            >
              About
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="nav-item">
          {userId ? (
            <>
              <div className="profile-logo">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="logo"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginTop: "12px",
                  }}
                />
              </div>
              <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                {user?.displayName}
              </p>
              <li className="nav-link" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <li
                className={`nav-link ${
                  active === "login" ? "active" : ""
                }`}
                onClick={() => setActive("login")}
              >
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
