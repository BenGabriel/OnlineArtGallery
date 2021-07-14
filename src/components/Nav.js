import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { FaBars, FaTimes } from "react-icons/fa";
import SecondNav from "./SecondNav";
import AuthContext from "../context/AuthContext/AuthContext";

const Nav = () => {
  const token = localStorage.getItem("token");
  const { userAuth } = useContext(AuthContext);
  console.log(token);
  const navStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      {userAuth ? (
        <SecondNav />
      ) : (
        <nav className="nav">
          <Link
            style={navStyle}
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <h3>Online Art Gallery</h3>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes size={23} /> : <FaBars size={23} />}
          </div>
          <ul className={click ? "nav-ul active" : "nav-ul"}>
            <li onClick={closeMobileMenu}>
              <Link to="/drawings" className="nav-links">
                Drawings
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/paintings" className="nav-links">
                Paintings
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/photography" className="nav-links">
                Photography
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/sculpture" className="nav-links">
                Sculpture
              </Link>
            </li>

            <li onClick={closeMobileMenu}>
              <Link to="/signup" className="nav-links">
                Sign up
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Nav;
