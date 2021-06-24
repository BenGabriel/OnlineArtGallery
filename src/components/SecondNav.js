import React, { useContext, useEffect } from "react";
import "../App.css";
import image from "../images/user1.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaBars, FaPenFancy, FaPlus, FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Loader from "./Loader";

const SecondNav = () => {
  const { userAuth, artist, getArtist, logout } = useContext(AuthContext);

  const history = useHistory();
  useEffect(() => {
    getArtist();
  }, [userAuth]);

  const navStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  };

  const logOut = () => {
    logout();
    history.push("/login");
  };
  return (
    <div>
      <input type="checkbox" id="check" />
      <div className="sidebar">
        <label htmlFor="check">
          <span id="side-btn">
            <FaBars size={21} />
          </span>
        </label>
        <center>
          <h2>Online Art Gallery</h2>
          {artist !== null ? (
            <>
              <img
                src={artist.avatar === "" ? image : artist.avatar}
                width="100"
                alt=""
              />
              {/* <h3>
                {artist.first_name} {artist.last_name}
              </h3>
              <p>{artist.email}</p>
              <p>{artist.phone_number}</p> */}
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
          <Link style={navStyle} className="nav-class" to="/user-profile">
            <FaUser size={18} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link style={navStyle} className="nav-class" to="/updateuser">
            <FaPenFancy size={18} />
            <span>Update User</span>
          </Link>
        </li>
        <li onClick={logOut}>
          <div className="nav-class">
            <RiLogoutBoxRLine size={18} />
            <span>Logout</span>
          </div>
        </li>
      </div>
    </div>
  );
};

export default SecondNav;
