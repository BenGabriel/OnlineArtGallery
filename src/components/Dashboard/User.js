import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Container } from "./Helper";
import image from "../../images/user1.png";
import "./user.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const User = () => {
  const { artist, getArtist } = useContext(AuthContext);

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <Container>
      <div className="user-profile">
        {artist === null ? (
          <Loader />
        ) : (
          <>
            <div className="user-profile-child">
              <img src={artist.avatar === "" ? image : artist.avatar} alt="" />
            </div>
            <div className="user-profile-child">
              <ul>
                <li>
                  name : {artist.first_name} {artist.last_name}
                </li>
                <li>username : {artist.username}</li>
                <li>email : {artist.email}</li>
                <li>location : {artist.city}</li>
                <li>phone number : {artist.phone_number}</li>
              </ul>
              <button>
                <Link
                  to="/updateuser"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Update User
                </Link>
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default User;
