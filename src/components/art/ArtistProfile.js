import React, { useState, useEffect } from "react";
import "../Main.css";
import image1 from "../../images/1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import Comment from "../Comment";
import { URL } from "../Dashboard/Helper";
import { FaRegComment } from "react-icons/fa";
import Loader from "../Loader";

const ArtistProfile = (props) => {
  const artistid = props.match.params.id;
  console.log(artistid);
  const [rnum, setRum] = useState(false);
  const [artistData, setArtistData] = useState(null);
  const [commentId, setCommentId] = useState("");

  const getArtistDetails = async () => {
    try {
      const res = await axios.get(`${URL}/users/${artistid}/`);
      console.log(res.data, "data");
      setArtistData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistDetails();
  }, []);

  const controlClick = (id) => {
    setCommentId(id);
    setRum(!rnum);
  };

  return (
    <div className="painting-container art-item">
      <div className="artist-profile-container">
        {artistData === null ? (
          <Loader />
        ) : (
          <>
            <div className="artist-details">
              <img src={image1} alt="" />
              <div className="artist-det">
                <p>Username: {artistData.username}</p>
                <p>
                  Name: {artistData.first_name} {artistData.last_name}
                </p>
                <p>Email: {artistData.email}</p>
                <p>Phone Number: {artistData.phone_number}</p>
                <p>Location: {artistData.city}</p>
              </div>
            </div>
            <div className="artist-works">
              {artistData.posts.map((image) => (
                <div key={image.id} className="painting-image-holder">
                  <Link to={`/art/${image.id}`}>
                    <img src={image.image} alt="" />
                  </Link>
                  <div className="likes-comment">
                    <p onClick={() => controlClick(image.id)}>
                      <FaRegComment color={"white"} size={14} />
                    </p>
                    <p onClick={() => controlClick(image.id)}>comment</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {rnum ? (
        <div className="comment-container">
          <Comment controlClick={controlClick} commentId={commentId} />
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default ArtistProfile;
