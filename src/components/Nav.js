import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import image from "../images/1.jpg";
import { FaPlus, FaBars, FaPenFancy, FaTimes } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import AuthContext from "../context/AuthContext/AuthContext";
import ArtistContext from "../context/ArtistContext/ArtistContext";
import Loader from "./Loader";

const Nav = () => {
  const { userAuth, logout, getArtist, artist } = useContext(AuthContext);
  const navStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  };

  useEffect(() => {
    getArtist();
    console.log("hi");
  }, [userAuth]);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  console.log(artist);
  return (
    <>
      {userAuth ? (
        <div>
          <input type="checkbox" id="check" />
          <div className="sidebar">
            <label htmlFor="check">
              <span id="side-btn">
                <FaBars size={21} />
              </span>
            </label>
            <center>
              <h2>Ifeoma</h2>
              {artist !== null ? (
                <>
                  <img
                    src={artist.avatar === "" ? image : artist.avatar}
                    width="100"
                    alt=""
                  />
                  <h3>
                    {artist.first_name} {artist.last_name}
                  </h3>
                  <p>{artist.email}</p>
                  <p>{artist.phone_number}</p>
                </>
              ) : (
                <Loader />
              )}
            </center>
            <li>
              <Link style={navStyle} className="nav-class" to="/dashboard">
                <AiFillDashboard size={18} />
                <span>DashBoard</span>
              </Link>
            </li>
            <li>
              <Link style={navStyle} className="nav-class" to="/addpost">
                <FaPlus size={18} />
                <span>Add</span>
              </Link>
            </li>
            <li>
              <Link style={navStyle} className="nav-class" to="/updateuser">
                <FaPenFancy size={18} />
                <span>Update User</span>
              </Link>
            </li>
            <li onClick={logout}>
              <div className="nav-class">
                <RiLogoutBoxRLine size={18} />
                <span>Logout</span>
              </div>
            </li>
          </div>
        </div>
      ) : (
        <nav className="nav">
          <Link
            style={navStyle}
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <h3>Ifeoma</h3>
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
              <Link to="/prints" className="nav-links">
                Prints
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
